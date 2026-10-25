/* PMP Study Hub — app logic (no build step, no dependencies). */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $("#app");
  const LETTERS = "ABCDEFGH";
  const TAGS = { people: "People", process: "Process", biz: "Business Env.", agile: "Agile", exam: "Exam", foundation: "Foundation", mindset: "Mindset", formulas: "Formulas" };

  /* ---------- storage (per-viewer convenience only) ---------- */
  const KEY = "pmp-hub-v1";
  let store = { done: {}, best: {}, mind: {}, known: {}, theme: "" };
  try { Object.assign(store, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };

  /* ---------- theme ---------- */
  const applyTheme = () => { if (store.theme) document.documentElement.dataset.theme = store.theme; else delete document.documentElement.dataset.theme; };
  applyTheme();
  $("#themeBtn").onclick = () => {
    const dark = store.theme ? store.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    store.theme = dark ? "light" : "dark"; save(); applyTheme();
  };

  /* ---------- countdown ---------- */
  const daysLeft = () => Math.max(0, Math.ceil((new Date(EXAM.target) - new Date()) / 864e5));
  $("#countdown").textContent = `⏳ ${daysLeft()} days to Dec 2027`;

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const pill = (t) => `<span class="pill ${t}">${TAGS[t] || t}</span>`;
  let timer = null;

  /* ---------- views ---------- */
  function home() {
    const nDone = MODULES.filter((m) => store.done[m.id]).length;
    const sets = QUIZ.filter((s) => store.best[s.id] != null);
    const avg = sets.length ? Math.round(sets.reduce((t, s) => t + store.best[s.id], 0) / sets.length) : 0;
    const mindN = Object.keys(store.mind).length;
    const nowMonth = new Date();
    const phaseIdx = ROADMAP.findIndex((p, i) => {
      const starts = [new Date(2026, 10), new Date(2027, 0), new Date(2027, 3), new Date(2027, 6), new Date(2027, 8), new Date(2027, 11)];
      return nowMonth >= starts[i] && (i === starts.length - 1 || nowMonth < starts[i + 1]);
    });
    app.innerHTML = `
      <section class="hero">
        <h1>Think like a project manager 🎯</h1>
        <p>Your PMP journey to <b>December 2027</b> — notes aligned to the 2026 exam outline, mindset drills, flashcards and practice exams.</p>
        <div class="stats">
          <div class="stat"><b>${daysLeft()}</b>days to go</div>
          <div class="stat"><b>${nDone}/${MODULES.length}</b>modules done</div>
          <div class="stat"><b>${mindN}/${MINDSET.length}</b>mindset drills</div>
          <div class="stat"><b>${sets.length ? avg + "%" : "—"}</b>avg best quiz</div>
        </div>
      </section>

      <div class="card">
        <h2 style="margin-top:0">Exam at a glance (2026 outline)</h2>
        <div class="weights">${EXAM.domains.map((d) => `<div class="w-${d.k}" style="width:${d.pct}%">${d.name.split(" ")[0]} ${d.pct}%</div>`).join("")}</div>
        <p class="small muted">Was People 42% · Process 50% · Business Env 8% before July 2026.</p>
        <div class="tbl"><table>${EXAM.facts.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</table></div>
      </div>

      <h2>Where to start today</h2>
      <div class="grid">
        <a class="tile" href="#/notes/m0"><div class="ico">📘</div><h3>Read Module 0</h3><p>How the exam works & how to study.</p></a>
        <a class="tile" href="#/mindset"><div class="ico">🧠</div><h3>2 mindset drills</h3><p>Train the "what would a PM do?" reflex.</p></a>
        <a class="tile" href="#/cards"><div class="ico">🃏</div><h3>10 flashcards</h3><p>Formulas & terms, tap to flip.</p></a>
        <a class="tile" href="#/quiz"><div class="ico">✅</div><h3>Take a quiz set</h3><p>15 questions with justifications.</p></a>
        <a class="tile" href="#/log"><div class="ico">📒</div><h3>Experience log</h3><p>Build your 36 months for the application.</p></a>
      </div>

      <h2>Your 14-month roadmap</h2>
      <div class="card"><ul class="timeline">
        ${ROADMAP.map((p, i) => `<li class="${i === phaseIdx ? "now" : ""}"><div class="when">${p.when}${i === phaseIdx ? " · YOU ARE HERE" : ""}</div><h3>${p.title}</h3><ul class="small">${p.items.map((x) => `<li>${x}</li>`).join("")}</ul></li>`).join("")}
      </ul></div>`;
  }

  function notesList() {
    app.innerHTML = `<h1>Study notes</h1>
      <p class="muted">Eight modules mapped to the 2026 ECO. Inside each, use <b>⭐ Key points only</b> for fast revision.</p>
      <div class="grid">${MODULES.map((m) => `
        <a class="tile" href="#/notes/${m.id}">${store.done[m.id] ? '<span class="done">✓</span>' : ""}
          <div class="ico">${m.ico}</div><h3>${m.title}</h3><p>${m.blurb}</p>
          <p class="small" style="margin-top:6px">${pill(m.tag)}<span class="pill">~${m.mins} min</span></p></a>`).join("")}
      </div>`;
  }

  function note(id) {
    const i = MODULES.findIndex((m) => m.id === id);
    if (i < 0) return notesList();
    const m = MODULES[i], prev = MODULES[i - 1], next = MODULES[i + 1];
    app.innerHTML = `<p class="small"><a href="#/notes">← All modules</a></p>
      <h1>${m.ico} ${m.title}</h1>
      <div class="toolbar">
        <button class="toggle" id="keyOnly">⭐ Key points only</button>
        <button class="toggle ${store.done[m.id] ? "on" : ""}" id="doneBtn">${store.done[m.id] ? "✓ Completed" : "Mark complete"}</button>
      </div>
      <div class="toc" id="toc"></div>
      <article class="note" id="noteBody">${m.html}</article>
      <div class="row spread" style="margin-top:24px">
        ${prev ? `<a class="btn ghost" href="#/notes/${prev.id}">← ${prev.title.split(":")[0]}</a>` : "<span></span>"}
        ${next ? `<a class="btn" href="#/notes/${next.id}">${next.title.split(":")[0]} →</a>` : `<a class="btn" href="#/quiz">Test yourself →</a>`}
      </div>`;
    $("#toc").innerHTML = [...app.querySelectorAll(".note h2")].map((h) => `<a href="javascript:void 0" data-t="${h.id}">${h.textContent}</a>`).join("");
    $("#toc").onclick = (e) => { const t = e.target.dataset.t; if (t) document.getElementById(t).scrollIntoView({ behavior: "smooth", block: "start" }); };
    $("#keyOnly").onclick = (e) => { $("#noteBody").classList.toggle("keyonly"); e.currentTarget.classList.toggle("on"); };
    $("#doneBtn").onclick = () => { store.done[m.id] = !store.done[m.id]; save(); note(id); };
  }

  function mindset(idx) {
    idx = idx == null ? (MINDSET.findIndex((_, i) => store.mind[i] == null) + MINDSET.length) % MINDSET.length : idx;
    const src = MINDSET[idx], ord = shuffle(src.o.map((_, i) => i));
    const s = { ...src, o: ord.map((i) => src.o[i]), a: ord.indexOf(src.a) };
    app.innerHTML = `<h1>🧠 Mindset trainer</h1>
      <p class="muted">Real-world scenarios (many from a construction setting). Pick what a PMI-minded PM would do — every option explains itself.</p>
      <div class="card">
        <div class="qhead"><span>Scenario ${idx + 1} of ${MINDSET.length}</span><span>${Object.keys(store.mind).length} answered</span></div>
        <p style="font-weight:600">${s.s}</p>
        <div id="opts">${s.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="lt">${LETTERS[i]}</span>${o[0]}</button>`).join("")}</div>
        <div id="fb"></div>
        <div class="row spread" style="margin-top:12px">
          <button class="btn ghost" id="prev" ${idx === 0 ? "disabled" : ""}>← Prev</button>
          <button class="btn" id="next">${idx === MINDSET.length - 1 ? "Start over" : "Next →"}</button>
        </div>
      </div>`;
    const reveal = (pick) => {
      app.querySelectorAll(".opt").forEach((b, i) => {
        b.disabled = true;
        if (i === s.a) b.classList.add("right"); else if (i === pick) b.classList.add("wrong");
        b.insertAdjacentHTML("beforeend", `<div class="small muted" style="margin-top:4px">${s.o[i][1]}</div>`);
      });
      $("#fb").innerHTML = `<div class="why ${pick === s.a ? "ok" : "no"}"><b>${pick === s.a ? "✔ That's the PM mindset." : "✘ Not quite."}</b> Rule: <b>${s.rule}</b></div>`;
    };
    $("#opts").onclick = (e) => { const b = e.target.closest(".opt"); if (!b || b.disabled) return; const p = +b.dataset.i; store.mind[idx] = p === s.a; save(); reveal(p); };
    $("#prev").onclick = () => mindset(idx - 1);
    $("#next").onclick = () => mindset((idx + 1) % MINDSET.length);
  }

  let deck = null, deckPos = 0, deckCat = "all";
  function cards() {
    if (!deck) deck = FLASH.map((_, i) => i);
    const list = deck.filter((i) => deckCat === "all" || FLASH[i][0] === deckCat);
    if (deckPos >= list.length) deckPos = 0;
    const c = FLASH[list[deckPos]];
    const knownN = list.filter((i) => store.known[i]).length;
    const cats = ["all", "formula", "term", "people", "agile"];
    app.innerHTML = `<h1>🃏 Flashcards</h1>
      <div class="chips">${cats.map((k) => `<button class="chip ${k === deckCat ? "on" : ""}" data-c="${k}">${k === "all" ? "All" : k[0].toUpperCase() + k.slice(1)}</button>`).join("")}
        <button class="chip" id="shuf">🔀 Shuffle</button></div>
      <div class="qhead" style="margin-top:12px"><span>Card ${deckPos + 1} / ${list.length}</span><span>${knownN} marked known</span></div>
      <div class="bar"><i style="width:${(knownN / list.length) * 100}%"></i></div>
      <div class="flip" id="flip"><div class="flip-inner">
        <div class="face"><div class="term">${esc(c[1])}</div><div class="hint">tap to flip</div></div>
        <div class="face back"><div>${esc(c[2])}</div><div class="hint">${store.known[list[deckPos]] ? "✓ known" : "tap to flip back"}</div></div>
      </div></div>
      <div class="row spread">
        <button class="btn ghost" id="cPrev">← Prev</button>
        <div class="row"><button class="btn ghost" id="again">↻ Again</button><button class="btn" id="know">✓ Know it</button></div>
        <button class="btn ghost" id="cNext">Next →</button>
      </div>`;
    const go = (d) => { deckPos = (deckPos + d + list.length) % list.length; cards(); };
    $("#flip").onclick = () => $("#flip").classList.toggle("flipped");
    $("#cPrev").onclick = () => go(-1);
    $("#cNext").onclick = () => go(1);
    $("#know").onclick = () => { store.known[list[deckPos]] = true; save(); go(1); };
    $("#again").onclick = () => { delete store.known[list[deckPos]]; save(); go(1); };
    $("#shuf").onclick = () => { deck = shuffle(deck); deckPos = 0; cards(); };
    app.querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => { deckCat = b.dataset.c; deckPos = 0; cards(); }));
  }

  function quizList() {
    const total = QUIZ.reduce((t, s) => t + s.qs.length, 0);
    app.innerHTML = `<h1>✅ Practice exams</h1>
      <p class="muted">${total} original questions. <b>Practice mode</b> shows the answer and justification after each question. <b>Mock exam</b> is timed at the real pace (≈ 1.3 min per question) and reviewed at the end.</p>
      <div class="grid">
        ${QUIZ.map((s) => `<a class="tile" href="#/quiz/${s.id}">${store.best[s.id] != null ? `<span class="done">${store.best[s.id]}%</span>` : ""}
          <div class="ico">📝</div><h3>${s.title}</h3><p>${s.qs.length} questions · practice mode</p><p class="small" style="margin-top:6px">${pill(s.tag)}</p></a>`).join("")}
        <a class="tile" href="#/quiz/mock">${store.best.mock != null ? `<span class="done">${store.best.mock}%</span>` : ""}
          <div class="ico">⏱️</div><h3>Mixed mock exam</h3><p>30 random questions from all sets · 40 minutes · review at the end</p><p class="small" style="margin-top:6px"><span class="pill">Timed</span></p></a>
      </div>
      <div class="card small"><b>Target:</b> 80%+ on each set before Phase 4. In the real exam, aim for a consistent 75%+ on full mocks from a reputable simulator.</div>`;
  }

  function quiz(id) {
    const mock = id === "mock";
    const set = mock ? { id: "mock", title: "Mixed mock exam", qs: shuffle(QUIZ.flatMap((s) => s.qs)).slice(0, 30) } : QUIZ.find((s) => s.id === id);
    if (!set) return quizList();
    // shuffle option order so the answer letter can't be memorised
    const qs = set.qs.map((q) => { const ord = shuffle(q.o.map((_, i) => i)); return { ...q, o: ord.map((i) => q.o[i]), a: ord.indexOf(q.a) }; });
    const ans = new Array(qs.length).fill(null);
    let pos = 0, secs = mock ? 40 * 60 : 0;

    const tick = () => {
      const t = $("#tmr"); if (!t) return clearInterval(timer);
      secs += mock ? -1 : 1;
      if (mock && secs <= 0) { clearInterval(timer); return finish(); }
      t.textContent = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
    };
    clearInterval(timer); timer = setInterval(tick, 1000);

    function render() {
      const q = qs[pos], picked = ans[pos], shown = !mock && picked != null;
      app.innerHTML = `<p class="small"><a href="#/quiz">← All sets</a></p><h1>${set.title}</h1>
        <div class="card">
          <div class="qhead"><span>Question ${pos + 1} / ${qs.length}</span><span class="timer" id="tmr">${mock ? "40:00" : "00:00"}</span></div>
          <div class="bar" style="margin:6px 0 10px"><i style="width:${((pos + 1) / qs.length) * 100}%"></i></div>
          <p style="font-weight:600">${q.q}</p>
          <div id="opts">${q.o.map((o, i) => {
            let c = ""; if (shown) c = i === q.a ? "right" : i === picked ? "wrong" : ""; else if (picked === i) c = "sel";
            return `<button class="opt ${c}" data-i="${i}" ${shown ? "disabled" : ""}><span class="lt">${LETTERS[i]}</span>${o}</button>`;
          }).join("")}</div>
          ${shown ? `<div class="why ${picked === q.a ? "ok" : "no"}"><b>${picked === q.a ? "✔ Correct." : `✘ Answer: ${LETTERS[q.a]}.`}</b> ${q.w}</div>` : ""}
          <div class="row spread" style="margin-top:12px">
            <button class="btn ghost" id="qPrev" ${pos === 0 ? "disabled" : ""}>← Prev</button>
            ${pos < qs.length - 1 ? `<button class="btn" id="qNext" ${!mock && picked == null ? "disabled" : ""}>Next →</button>` : `<button class="btn" id="qEnd" ${ans.includes(null) && !mock ? "disabled" : ""}>Finish ✓</button>`}
          </div>
        </div>`;
      $("#opts").onclick = (e) => { const b = e.target.closest(".opt"); if (!b || b.disabled) return; ans[pos] = +b.dataset.i; render(); };
      $("#qPrev").onclick = () => { pos--; render(); };
      if ($("#qNext")) $("#qNext").onclick = () => { pos++; render(); };
      if ($("#qEnd")) $("#qEnd").onclick = () => { if (mock && ans.includes(null) && !confirm("Some questions are unanswered. Finish anyway?")) return; finish(); };
    }

    function finish() {
      clearInterval(timer);
      const right = qs.filter((q, i) => ans[i] === q.a).length;
      const pct = Math.round((right / qs.length) * 100);
      store.best[set.id] = Math.max(store.best[set.id] || 0, pct); save();
      const band = pct >= 80 ? ["Above Target", "good"] : pct >= 65 ? ["Target", "good"] : pct >= 50 ? ["Below Target", "badc"] : ["Needs Improvement", "badc"];
      app.innerHTML = `<p class="small"><a href="#/quiz">← All sets</a></p><h1>${set.title} — result</h1>
        <div class="card" style="text-align:center">
          <div class="score-big ${band[1]}">${pct}%</div>
          <div>${right} of ${qs.length} correct · indicative band: <b>${band[0]}</b></div>
          <div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="retry">Retry</button><a class="btn ghost" href="#/quiz">Other sets</a></div>
        </div>
        <h2>Review</h2>
        <div class="card">${qs.map((q, i) => `<div class="review-item">
          <div class="small muted">Q${i + 1} · ${ans[i] === q.a ? '<b class="good">✔ correct</b>' : `<b class="badc">✘ ${ans[i] == null ? "unanswered" : "you chose " + LETTERS[ans[i]]}</b>`}</div>
          <div style="font-weight:600">${q.q}</div>
          <div class="small"><b>Answer ${LETTERS[q.a]}:</b> ${q.o[q.a]}</div>
          <div class="small muted">${q.w}</div></div>`).join("")}</div>`;
      $("#retry").onclick = () => quiz(set.id);
    }
    render();
  }

  function tools() {
    app.innerHTML = `<h1>🧮 Practice calculators</h1>
      <div class="card"><h2 style="margin-top:0">Earned Value</h2>
        <div class="form">
          <label>BAC<input id="bac" type="number" value="100000"></label>
          <label>PV<input id="pv" type="number" value="45000"></label>
          <label>EV<input id="ev" type="number" value="40000"></label>
          <label>AC<input id="ac" type="number" value="50000"></label>
        </div><div class="out" id="evOut"></div>
        <p class="small muted">Change any number and read the interpretation. Try making EV > AC to see "under budget".</p></div>
      <div class="card"><h2 style="margin-top:0">Three-point estimate</h2>
        <div class="form">
          <label>Optimistic (O)<input id="o" type="number" value="4"></label>
          <label>Most likely (M)<input id="m" type="number" value="6"></label>
          <label>Pessimistic (P)<input id="p" type="number" value="14"></label>
        </div><div class="out" id="pOut"></div></div>
      <div class="card"><h2 style="margin-top:0">Communication channels</h2>
        <div class="form"><label>People (n)<input id="n" type="number" value="10"></label></div><div class="out" id="nOut"></div></div>`;
    const v = (id) => parseFloat($("#" + id).value) || 0;
    const f = (x) => (isFinite(x) ? Math.round(x * 100) / 100 : "—").toLocaleString();
    const calc = () => {
      const bac = v("bac"), pv = v("pv"), ev = v("ev"), ac = v("ac");
      const cpi = ev / ac, spi = ev / pv, eac = bac / cpi;
      const out = [["CV = EV − AC", ev - ac, ev - ac >= 0 ? "under / on budget" : "over budget"],
        ["SV = EV − PV", ev - pv, ev - pv >= 0 ? "ahead / on schedule" : "behind schedule"],
        ["CPI = EV/AC", cpi, cpi >= 1 ? "cost-efficient" : "over budget"],
        ["SPI = EV/PV", spi, spi >= 1 ? "ahead / on schedule" : "behind schedule"],
        ["EAC = BAC/CPI", eac, "forecast final cost"], ["ETC = EAC − AC", eac - ac, "still to spend"],
        ["VAC = BAC − EAC", bac - eac, bac - eac >= 0 ? "expected underrun" : "expected overrun"],
        ["TCPI = (BAC−EV)/(BAC−AC)", (bac - ev) / (bac - ac), "efficiency needed to hit BAC"]];
      $("#evOut").innerHTML = out.map(([k, x, t]) => `<div><span class="small muted">${k}</span><b>${f(x)}</b><span class="small ${/over|behind/.test(t) ? "badc" : "good"}">${t}</span></div>`).join("");
      const o = v("o"), m = v("m"), p = v("p");
      $("#pOut").innerHTML = `<div><span class="small muted">Beta / PERT</span><b>${f((o + 4 * m + p) / 6)}</b></div><div><span class="small muted">Triangular</span><b>${f((o + m + p) / 3)}</b></div><div><span class="small muted">Std dev σ</span><b>${f((p - o) / 6)}</b></div>`;
      const n = v("n"); $("#nOut").innerHTML = `<div><span class="small muted">n(n−1)/2</span><b>${f((n * (n - 1)) / 2)}</b></div>`;
    };
    app.querySelectorAll("input").forEach((i) => (i.oninput = calc)); calc();
  }

  function resources() {
    app.innerHTML = `<h1>🔗 Sources & mentors</h1>
      <div class="card small"><b>About these notes:</b> PMI's exam outline, PMBOK® Guide and trainers' courses are copyrighted, so this hub doesn't copy them. The notes here are my own summaries of the concepts, aligned to the ECO. Use the links below for the originals. Verify anything about eligibility, fees or exam rules on pmi.org.</div>
      ${RESOURCES.map((g) => `<div class="card"><h2 style="margin-top:0">${g.group}</h2><ul>${g.items.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}</a></li>`).join("")}</ul></div>`).join("")}
      <div class="card"><h2 style="margin-top:0">Reset progress</h2><p class="small muted">Progress is saved only in this browser on this device.</p>
      <button class="btn ghost" id="reset">Reset all progress</button></div>`;
    $("#reset").onclick = () => { if (confirm("Reset all progress on this device?")) { store = { done: {}, best: {}, mind: {}, known: {}, theme: store.theme }; save(); home(); location.hash = "#/"; } };
  }

  /* ---------- experience log (kept only on this device) ---------- */
  const LOGKEY = "pmp-hub-explog-v1";
  let xlog = { apply: "2027-08", projects: [] };
  try { Object.assign(xlog, JSON.parse(localStorage.getItem(LOGKEY)) || {}); } catch (e) {}
  const saveLog = () => { try { localStorage.setItem(LOGKEY, JSON.stringify(xlog)); } catch (e) {} };
  const mIdx = (ym) => { const [y, m] = ym.split("-").map(Number); return y * 12 + (m - 1); };
  const ymOf = (i) => `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, "0")}`;
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtYm = (ym) => (ym ? `${MON[+ym.slice(5) - 1]} ${ym.slice(0, 4)}` : "");
  const thisYm = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; };
  const words = (s) => (s.trim().match(/\S+/g) || []).length;
  const PHASES = ["Initiating", "Planning", "Executing", "Monitoring & Controlling", "Closing"];
  const FIELDS = [
    ["title", "Project title", "text", "e.g. Upgrading of Jalan … (Package 2)"],
    ["org", "Organisation", "text", "Company you worked for"],
    ["client", "Client / owner", "text", "e.g. JKR Sarawak"],
    ["role", "Your job title", "text", "e.g. Site Engineer / Project Engineer"],
    ["verifier", "Verifier (name & position)", "text", "Supervisor / PD who can confirm if audited"],
    ["vcontact", "Verifier contact", "text", "Email or phone"],
    ["start", "Start month", "month"], ["end", "End month (blank = ongoing)", "month"],
    ["team", "Team size", "text", "e.g. 25"], ["budget", "Budget (approx.)", "text", "e.g. RM 12 mil"],
  ];

  function coverage() {
    const end = mIdx(xlog.apply), start = end - 95; // 8-year window = 96 months
    const cover = new Map();
    xlog.projects.forEach((p, k) => {
      if (!p.start) return;
      const a = mIdx(p.start), b = mIdx(p.end || thisYm());
      for (let i = Math.max(a, start); i <= Math.min(b, end); i++) (cover.get(i) || cover.set(i, []).get(i)).push(k);
    });
    return { start, end, cover, months: cover.size };
  }

  function explog() {
    const c = coverage(), pct = Math.min(100, (c.months / 36) * 100);
    const years = []; for (let y = Math.floor(c.start / 12); y <= Math.floor(c.end / 12); y++) years.push(y);
    const grid = years.map((y) => `<div class="mrow"><span class="yr">${y}</span>${MON.map((m, i) => {
      const idx = y * 12 + i, inWin = idx >= c.start && idx <= c.end, ps = c.cover.get(idx);
      const cls = !inWin ? "out" : ps ? (ps.length > 1 ? "ovl" : "on") : "";
      return `<i class="${cls}" title="${m} ${y}${ps ? " · " + ps.map((k) => esc(xlog.projects[k].title || "Untitled")).join(", ") : ""}"></i>`;
    }).join("")}</div>`).join("");

    app.innerHTML = `<h1>📒 Experience log</h1>
      <p class="muted">Record the projects you <b>led or directed</b>. You need <b>36 unique months</b> inside the 8 years before you apply. Overlapping months count once.</p>
      <div class="card small">🔒 <b>Private to this device.</b> Entries are saved only in this browser and never uploaded. Use <b>Backup</b> regularly, and <b>Restore</b> to move the log to another phone or laptop.</div>

      <div class="card">
        <div class="row spread"><h2 style="margin:0">${c.months} / 36 months</h2>
          <label class="small muted">Planned application <input type="month" id="applyAt" value="${xlog.apply}" class="inl"></label></div>
        <div class="bar" style="height:12px;margin:10px 0"><i style="width:${pct}%;${c.months >= 36 ? "" : "background:var(--accent)"}"></i></div>
        <p class="small" style="margin:0">${c.months >= 36 ? `✅ Requirement met — ${c.months - 36} months of margin. Keep 3–6 months spare in case PMI questions a project.` : `Counting window: <b>${fmtYm(ymOf(c.start))} – ${fmtYm(ymOf(c.end))}</b>. <b>${36 - c.months} more months</b> needed.`}</p>
        <div class="mgrid">${grid}</div>
        <p class="small muted"><span class="lg on"></span> counted <span class="lg ovl"></span> overlap (counted once) <span class="lg"></span> gap <span class="lg out"></span> outside window. Ongoing projects count up to this month.</p>
      </div>

      <div class="row spread"><h2>Projects (${xlog.projects.length})</h2><button class="btn" id="addP">＋ Add project</button></div>
      ${xlog.projects.length ? "" : `<div class="card muted">No projects yet. Start with your longest project where you planned and controlled the work.</div>`}
      ${xlog.projects.map((p, k) => {
        const n = words(p.desc || ""), mo = p.start ? mIdx(p.end || thisYm()) - mIdx(p.start) + 1 : 0;
        const done = (p.phases || []).length;
        return `<div class="card">
          <div class="row spread"><div><b>${esc(p.title || "Untitled project")}</b><div class="small muted">${esc(p.role || "")}${p.org ? " · " + esc(p.org) : ""}</div></div>
            <div class="row"><button class="btn ghost" data-edit="${k}">Edit</button><button class="btn ghost" data-del="${k}" aria-label="Delete">🗑</button></div></div>
          <p class="small" style="margin:6px 0 0">📅 ${fmtYm(p.start) || "?"} – ${p.end ? fmtYm(p.end) : "ongoing"} (${mo} mo) · 📝 ${n} words ${n < 200 ? '<span class="badc">(aim 200–500)</span>' : n > 500 ? '<span class="badc">(over 500)</span>' : '<span class="good">✓</span>'} · 🔁 ${done}/5 phases ${p.verifier ? "· ✔ verifier" : '· <span class="badc">no verifier</span>'}</p>
        </div>`; }).join("")}

      <div class="card"><h2 style="margin-top:0">Backup & export</h2>
        <div class="row">
          <button class="btn ghost" id="bk">⬇ Backup (.json)</button>
          <label class="btn ghost" style="cursor:pointer">⬆ Restore<input type="file" id="rs" accept=".json,application/json" hidden></label>
          <button class="btn ghost" id="cp">📋 Copy as text</button>
        </div>
        <p class="small muted">"Copy as text" gives a clean version you can paste into Word, email to yourself, or use when filling the PMI form.</p></div>

      <details class="reveal"><summary>✍️ How to write a strong description (with example)</summary>
        <p class="small">Write <b>what you did</b>, using "I" and PM verbs, across the life cycle. Use one or two sentences per phase, then the outcome. Keep it to 200–500 words and say "I", not "we".</p>
        <div class="small" style="background:var(--surface);border-radius:10px;padding:10px">
          <b>Objective:</b> Construct a 2.4 km dual-carriageway upgrade with drainage and a box culvert within 30 months.<br>
          <b>Initiating:</b> I reviewed the contract scope and drawings with the PD, identified key stakeholders (client's representative, utility agencies, local council) and helped set the project's success criteria.<br>
          <b>Planning:</b> I developed the work breakdown and the baseline programme in Primavera P6, planned resources and plant, and prepared method statements and the traffic management plan. I also identified risks such as monsoon flooding and utility clashes, with mitigation measures.<br>
          <b>Executing:</b> I led a team of 3 supervisors and 4 subcontractors, coordinated daily site activities, and ran weekly coordination meetings.<br>
          <b>Monitoring & Controlling:</b> I tracked progress against the baseline, prepared monthly reports, and evaluated variations through the change procedure. I recovered a 6-week delay by resequencing the culvert works, and I controlled quality through ITPs and inspections.<br>
          <b>Closing:</b> I obtained the CPC, closed out defects, handed over as-built records, and documented lessons learned.<br>
          <b>Outcome:</b> Completed 3 weeks ahead of the revised completion date, within budget, with zero lost-time injuries.
        </div>
        <p class="small muted">This is an example only. Replace it with your real facts. Never exaggerate, because your verifier must be able to confirm it.</p>
      </details>`;

    $("#applyAt").onchange = (e) => { if (e.target.value) { xlog.apply = e.target.value; saveLog(); explog(); } };
    $("#addP").onclick = () => editProject(-1);
    app.querySelectorAll("[data-edit]").forEach((b) => (b.onclick = () => editProject(+b.dataset.edit)));
    app.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => {
      const p = xlog.projects[+b.dataset.del];
      if (confirm(`Delete "${p.title || "Untitled project"}"? Back up first if unsure.`)) { xlog.projects.splice(+b.dataset.del, 1); saveLog(); explog(); }
    }));
    $("#bk").onclick = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(xlog, null, 2)], { type: "application/json" }));
      a.download = `pmp-experience-log-${thisYm()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    $("#rs").onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then((t) => {
        const d = JSON.parse(t);
        if (!Array.isArray(d.projects)) throw new Error("bad file");
        if (confirm(`Replace the current log with ${d.projects.length} project(s) from this backup?`)) { xlog = { apply: d.apply || xlog.apply, projects: d.projects }; saveLog(); explog(); }
      }).catch(() => alert("That file doesn't look like an experience-log backup."));
    };
    $("#cp").onclick = () => {
      const t = xlog.projects.map((p, k) => [`PROJECT ${k + 1}: ${p.title || ""}`,
        `Organisation: ${p.org || ""} | Client: ${p.client || ""}`, `Role: ${p.role || ""}`,
        `Dates: ${fmtYm(p.start)} – ${p.end ? fmtYm(p.end) : "ongoing"} | Approach: ${p.approach || ""} | Team: ${p.team || ""} | Budget: ${p.budget || ""}`,
        `Verifier: ${p.verifier || ""} (${p.vcontact || ""})`, `Phases covered: ${(p.phases || []).join(", ")}`,
        `Objective: ${p.objective || ""}`, `Outcome: ${p.outcome || ""}`, `Description:\n${p.desc || ""}`].join("\n")).join("\n\n---\n\n");
      const done = () => { $("#cp").textContent = "✓ Copied"; setTimeout(() => ($("#cp").textContent = "📋 Copy as text"), 1500); };
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(done, () => prompt("Copy the text below:", t));
    };
  }

  function editProject(k) {
    const p = k >= 0 ? { ...xlog.projects[k] } : { phases: [] };
    app.innerHTML = `<p class="small"><a href="#/log" id="back">← Experience log</a></p>
      <h1>${k >= 0 ? "Edit" : "Add"} project</h1>
      <form class="card" id="pf">
        <div class="form">${FIELDS.map(([f, l, t, ph]) => `<label>${l}<input name="${f}" type="${t}" value="${esc(p[f] || "")}" ${ph ? `placeholder="${esc(ph)}"` : ""}></label>`).join("")}
          <label>Approach<select name="approach" class="sel">${["Predictive", "Hybrid", "Agile"].map((a) => `<option ${p.approach === a ? "selected" : ""}>${a}</option>`).join("")}</select></label>
        </div>
        <h3>Phases you personally led</h3>
        <div class="chips">${PHASES.map((ph) => `<label class="chip ${(p.phases || []).includes(ph) ? "on" : ""}"><input type="checkbox" name="phases" value="${ph}" hidden ${(p.phases || []).includes(ph) ? "checked" : ""}>${ph}</label>`).join("")}</div>
        <p class="small muted">You don't need all five on every project, but across your projects try to show all of them.</p>
        <div class="form" style="grid-template-columns:1fr">
          <label>Project objective (1–2 sentences)<textarea name="objective" rows="2">${esc(p.objective || "")}</textarea></label>
          <label>Outcome (time / cost / quality / safety result)<textarea name="outcome" rows="2">${esc(p.outcome || "")}</textarea></label>
          <label>Your role & responsibilities, in PM language <span id="wc" class="small"></span><textarea name="desc" rows="10" placeholder="Initiating: I… Planning: I… Executing: I… Monitoring & Controlling: I… Closing: I…">${esc(p.desc || "")}</textarea></label>
        </div>
        <div class="small muted" style="margin:6px 0">Tap to insert a verb: <span class="chips" id="verbs" style="display:inline-flex">${["Planned", "Developed", "Led", "Coordinated", "Monitored", "Controlled", "Evaluated", "Negotiated", "Mitigated", "Reported", "Resolved", "Handed over"].map((v) => `<button type="button" class="chip">${v}</button>`).join("")}</span></div>
        <div class="row spread" style="margin-top:12px"><button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn" type="submit">Save project</button></div>
      </form>`;
    const ta = app.querySelector("[name=desc]"), wc = $("#wc");
    const upd = () => { const n = words(ta.value); wc.innerHTML = `· ${n} words ${n < 200 ? '<span class="badc">aim 200–500</span>' : n > 500 ? '<span class="badc">over 500</span>' : '<span class="good">✓ good length</span>'}`; };
    ta.oninput = upd; upd();
    $("#verbs").onclick = (e) => {
      if (e.target.tagName !== "BUTTON") return;
      const s = ta.selectionStart ?? ta.value.length, ins = (s && !/\s$/.test(ta.value.slice(0, s)) ? " " : "") + e.target.textContent + " ";
      ta.value = ta.value.slice(0, s) + ins + ta.value.slice(s); ta.focus(); ta.selectionStart = ta.selectionEnd = s + ins.length; upd();
    };
    app.querySelectorAll(".chips label.chip").forEach((l) => (l.onclick = (e) => { e.preventDefault(); const cb = l.querySelector("input"); cb.checked = !cb.checked; l.classList.toggle("on", cb.checked); }));
    $("#cancel").onclick = explog;
    $("#back").onclick = (e) => { e.preventDefault(); explog(); };
    $("#pf").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target), out = {};
      for (const [f] of FIELDS) out[f] = (fd.get(f) || "").trim();
      ["approach", "objective", "outcome", "desc"].forEach((f) => (out[f] = (fd.get(f) || "").trim()));
      out.phases = fd.getAll("phases");
      if (!out.start) return alert("Please enter at least the start month.");
      if (out.end && out.end < out.start) return alert("End month is before start month.");
      if (k >= 0) xlog.projects[k] = out; else xlog.projects.push(out);
      saveLog(); explog(); window.scrollTo(0, 0);
    };
  }

  /* ---------- router ---------- */
  function route() {
    clearInterval(timer);
    const [, r = "", sub] = location.hash.split("/");
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("on", a.dataset.r === (r || "home")));
    ({ "": home, notes: () => (sub ? note(sub) : notesList()), mindset: () => mindset(), cards, quiz: () => (sub ? quiz(sub) : quizList()), tools, resources, log: explog }[r] || home)();
    window.scrollTo(0, 0);
  }
  addEventListener("hashchange", route);
  route();
})();
