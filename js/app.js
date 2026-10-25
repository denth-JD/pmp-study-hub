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

  /* ---------- router ---------- */
  function route() {
    clearInterval(timer);
    const [, r = "", sub] = location.hash.split("/");
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("on", a.dataset.r === (r || "home")));
    ({ "": home, notes: () => (sub ? note(sub) : notesList()), mindset: () => mindset(), cards, quiz: () => (sub ? quiz(sub) : quizList()), tools, resources }[r] || home)();
    window.scrollTo(0, 0);
  }
  addEventListener("hashchange", route);
  route();
})();
