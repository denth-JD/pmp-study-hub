/* PMP Study Hub — study content.
   Written in my own words, aligned to the PMI PMP Examination Content Outline (2026).
   Callout classes: .key (key point), .trap (exam trap), .mind (PM mindset). <mark> = highlight. */

const EXAM = {
  target: "2027-12-01",
  facts: [
    ["Questions", "180 (170 scored + 10 unscored pretest)"],
    ["Time", "240 minutes, with 2 optional 10-minute breaks"],
    ["Approach mix", "≈ 40% predictive, ≈ 60% agile / hybrid — blended into every domain"],
    ["Question types", "Single answer, multiple response, matching, hotspot, fill-in, scenario-based"],
    ["Passing", "PMI does not publish a pass mark; results are given as performance bands per domain (Above Target / Target / Below Target / Needs Improvement)"],
    ["Outline in force", "New Examination Content Outline from July 2026 — this is the one you will sit in Dec 2027"],
  ],
  domains: [
    { k: "people", name: "People", pct: 33, was: 42 },
    { k: "process", name: "Process", pct: 41, was: 50 },
    { k: "biz", name: "Business Environment", pct: 26, was: 8 },
  ],
};

const ROADMAP = [
  { when: "Nov – Dec 2026", title: "Phase 0 · Set up & orientation",
    items: ["Read this hub's Module 0 & 1 at a gentle pace (your SSS course runs 23 Nov – 4 Dec)",
            "Download the free official PMP Examination Content Outline (ECO) from pmi.org",
            "Start an experience log: list every project you led/directed since 2019 (dates, role, outcomes)",
            "Decide on PMI membership (gives a free digital PMBOK® Guide and a lower exam fee)"] },
  { when: "Jan – Mar 2027", title: "Phase 1 · 35 contact hours",
    items: ["Complete a 35-hour PMP course (required before you apply) — keep the certificate",
            "Do one module of this hub per week alongside the course",
            "Train the mindset: 2 scenarios a day in the Mindset tab"] },
  { when: "Apr – Jun 2027", title: "Phase 2 · Deep study",
    items: ["Read PMBOK® Guide 8th ed. + Agile Practice Guide (skim, don't memorise)",
            "Finish all 4 quiz sets here; redo any set scoring < 80%",
            "Flashcards 10 min daily — formulas, agile terms, contract types"] },
  { when: "Jul – Aug 2027", title: "Phase 3 · Apply",
    items: ["Submit the PMP application on pmi.org (allow time for a possible random audit)",
            "Write experience descriptions in PM language: initiating → closing, outcomes, value",
            "After approval you have 1 year and 3 attempts — schedule the exam for early Dec 2027"] },
  { when: "Sep – Nov 2027", title: "Phase 4 · Question bank & mocks",
    items: ["Practise 1,000+ questions from a reputable simulator",
            "Take 3–4 full 180-question timed mocks; aim for a consistent 75%+",
            "Log every wrong answer: why the right answer is right, why yours was wrong"] },
  { when: "Dec 2027", title: "Phase 5 · Exam month",
    items: ["Light review only: mindset rules, formulas, your mistake log",
            "Sleep, plan the route or online-proctor set-up, ID ready",
            "Pass 🎉 — then plan PDUs (60 every 3 years)"] },
];

const MODULES = [
/* ---------------------------------------------------------------- */
{ id: "m0", ico: "🎯", tag: "exam", title: "Exam, eligibility & study strategy", mins: 15,
  blurb: "What the PMP is, who can sit it, how it's scored, and how to study smart.",
  html: `
<div class="sec">
<h2 id="m0-1">What the exam really tests</h2>
<p>The PMP is <mark>not a memory test of the PMBOK® Guide</mark>. It is a situational-judgement test: you read a short project scenario and choose what an experienced, ethical, servant-leader project manager would do <i>next</i>.</p>
<div class="key"><p>The exam is built from the <b>Examination Content Outline (ECO)</b>, not from any one book. PMBOK® Guide, the Agile Practice Guide and other PMI standards are <i>references</i>. Study the ECO tasks first.</p></div>
<p>From July 2026 the ECO has three domains:</p>
<ul>
<li><b>People (33%)</b> — leading the team, stakeholders, communication, conflict.</li>
<li><b>Process (41%)</b> — planning and delivering scope, schedule, cost, quality, resources, procurement, closing.</li>
<li><b>Business Environment (26%)</b> — governance, compliance, risk, change control, issues, organisational change, benefits.</li>
</ul>
<div class="trap"><p>Business Environment jumped from 8% to 26%. Older prep books (2021 ECO) under-weight it — risk and change control now sit here, so expect many governance/risk questions.</p></div>
</div>

<div class="sec">
<h2 id="m0-2">Eligibility (check pmi.org before applying)</h2>
<div class="tbl"><table>
<tr><th>Education</th><th>Project experience</th><th>Training</th></tr>
<tr><td>4-year degree (or global equivalent)</td><td>36 months leading projects within the last 8 years</td><td rowspan="2">35 contact hours of PM education (or CAPM)</td></tr>
<tr><td>Secondary school / diploma</td><td>60 months leading projects within the last 8 years</td></tr>
</table></div>
<div class="key"><p>Experience must be <b>leading and directing</b> projects — not just being on one. Your site engineer years count where you planned, coordinated, controlled and closed work packages. Describe them with PM verbs (initiated, planned, executed, monitored, closed).</p></div>
<p class="muted small">Requirements and fees change; always confirm on the official PMI certification page.</p>
</div>

<div class="sec">
<h2 id="m0-3">How to study (the method that works)</h2>
<ol>
<li><b>Understand → apply → test.</b> Read a module, do its mindset scenarios, then quiz.</li>
<li><b>Learn the mindset early</b> — most wrong answers are "technically possible" actions taken in the wrong order.</li>
<li><b>Keep a mistake log.</b> For every miss write: the clue word in the question, the right principle, and why your answer was wrong.</li>
<li><b>Do volume late.</b> 1,000+ realistic questions in the final 3 months beats re-reading.</li>
</ol>
<div class="mind"><p>Read the <b>last sentence</b> of a question first ("What should the PM do <u>first</u>?", "…<u>best</u>?", "…<u>next</u>?"). Then read the scenario looking for: the approach (agile/predictive/hybrid), where we are in the lifecycle, and who has authority.</p></div>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m1", ico: "🏗️", tag: "foundation", title: "Foundations: projects, value & life cycles", mins: 25,
  blurb: "Project vs program vs portfolio, value delivery, org structures, PMO, predictive/agile/hybrid.",
  html: `
<div class="sec">
<h2 id="m1-1">Project, program, portfolio, operations</h2>
<ul>
<li><b>Project</b> — temporary endeavour creating a unique product, service or result.</li>
<li><b>Program</b> — related projects managed together to get benefits not available separately.</li>
<li><b>Portfolio</b> — projects/programs/operations grouped to meet <i>strategic</i> objectives (they may be unrelated).</li>
<li><b>Operations</b> — ongoing, repetitive work that sustains the business.</li>
</ul>
<div class="key"><p>Projects exist to <mark>deliver value / business benefits</mark>, not just outputs. The PM keeps asking: "Does this still support the business case?"</p></div>
</div>

<div class="sec">
<h2 id="m1-2">Business documents</h2>
<ul>
<li><b>Business case</b> — why the project is worth doing (benefits, cost, options). Owned by the sponsor/business.</li>
<li><b>Benefits management plan</b> — what benefits, when, how measured, who owns them (often realised <i>after</i> the project closes).</li>
<li><b>Project charter</b> — formally authorises the project and <mark>names the PM and their authority</mark>. Issued by the sponsor.</li>
</ul>
<div class="trap"><p>No charter = no authority. If a scenario says work has started without a charter, the right move is usually to get the charter signed by the sponsor.</p></div>
</div>

<div class="sec">
<h2 id="m1-3">Organisational structures — who holds power?</h2>
<div class="tbl"><table>
<tr><th>Structure</th><th>PM authority</th><th>Resources managed by</th></tr>
<tr><td>Functional</td><td>Little / none (often a coordinator)</td><td>Functional manager</td></tr>
<tr><td>Weak matrix</td><td>Low</td><td>Functional manager</td></tr>
<tr><td>Balanced matrix</td><td>Low–moderate (shared)</td><td>Shared</td></tr>
<tr><td>Strong matrix</td><td>Moderate–high</td><td>Mostly PM</td></tr>
<tr><td>Projectized</td><td>High / full</td><td>PM</td></tr>
</table></div>
<div class="mind"><p>In any matrix, resources have two bosses. When a functional manager pulls your people, <b>negotiate</b> using the resource agreement and the impact on objectives — don't go straight to the sponsor.</p></div>
<p><b>PMO types:</b> <i>Supportive</i> (templates, low control) · <i>Controlling</i> (compliance, medium control) · <i>Directive</i> (directly manages projects, high control).</p>
</div>

<div class="sec">
<h2 id="m1-4">Development approaches & life cycles</h2>
<div class="tbl"><table>
<tr><th>Approach</th><th>Best when</th><th>Delivery</th></tr>
<tr><td><b>Predictive</b> (waterfall)</td><td>Requirements clear & stable; high cost of change (e.g. building a structure)</td><td>Single delivery at the end</td></tr>
<tr><td><b>Iterative</b></td><td>Refine the product through repeated prototypes</td><td>Feedback on unfinished work</td></tr>
<tr><td><b>Incremental</b></td><td>Deliver usable pieces in sequence</td><td>Frequent smaller deliveries</td></tr>
<tr><td><b>Agile</b> (iterative + incremental)</td><td>High uncertainty, evolving requirements, fast feedback</td><td>Frequent value, every 1–4 weeks</td></tr>
<tr><td><b>Hybrid</b></td><td>Mix: stable parts predictive, uncertain parts agile</td><td>Tailored</td></tr>
</table></div>
<div class="key"><p><b>Tailoring</b> is expected: choose and adapt the approach, processes and artifacts to fit the project, organisation and environment. "One size fits all" is never the PMI answer.</p></div>
<p>Example from construction: the civil/structural works run predictively (fixed design, CCB-controlled changes) while a client-facing smart-building app is built in sprints — a <b>hybrid</b> project.</p>
</div>

<div class="sec">
<h2 id="m1-5">PMBOK® Guide 8th edition (Nov 2025) — the big picture</h2>
<p>The 8th edition re-combines the principle-based view of the 7th edition with practical process guidance. It is organised around:</p>
<ul>
<li><b>Principles</b> of project management (e.g. holistic/systems view, focus on value, stewardship, quality, accountability).</li>
<li><b>Seven performance domains</b>: Governance, Scope, Schedule, Finance, Stakeholders, Resources, Risk.</li>
<li><b>Five focus areas</b> — the familiar Initiating, Planning, Executing, Monitoring & Controlling, Closing — containing non-prescriptive processes.</li>
</ul>
<p class="muted small">Check names against your own copy of the Guide — I've summarised the structure, not reproduced it.</p>
<div class="key"><p>Remember the flow: <b>Initiating</b> (charter, stakeholders) → <b>Planning</b> (the "how") → <b>Executing</b> (do the work, manage team & stakeholders) → <b>Monitoring & Controlling</b> (compare to plan, control changes) → <b>Closing</b> (acceptance, release resources, lessons learned).</p></div>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m2", ico: "🤝", tag: "people", title: "People domain (33%)", mins: 40,
  blurb: "Servant leadership, team building, conflict, motivation, stakeholders, communication.",
  html: `
<div class="sec">
<h2 id="m2-0">What the People domain covers</h2>
<p>Paraphrasing the 2026 ECO focus: build a shared vision; lead and empower the team; manage conflict and promote collaboration; engage stakeholders and align expectations; plan and keep communication transparent; ensure knowledge transfer.</p>
</div>

<div class="sec">
<h2 id="m2-1">Servant leadership</h2>
<p>The servant leader puts the team first: <mark>removes impediments, shields the team from distractions, coaches, and enables</mark> them to self-organise.</p>
<div class="key"><p>On the exam the PM <b>facilitates</b> rather than dictates. Answers like "tell the team what to do", "assign the task yourself" or "report the member to HR" are usually wrong when a coaching or facilitating option exists.</p></div>
<p>Leadership styles you may see: <i>laissez-faire, transactional, transformational, charismatic, interactional, servant</i>. Adapt style to the situation (situational leadership: directing → coaching → supporting → delegating as team maturity grows).</p>
</div>

<div class="sec">
<h2 id="m2-2">Team development (Tuckman)</h2>
<p><b>Forming → Storming → Norming → Performing → Adjourning.</b></p>
<ul>
<li>Forming: polite, unclear roles → give direction, create the <b>team charter</b> (values, working agreements, decision rules, ground rules).</li>
<li>Storming: conflict over approach → coach, facilitate, refer back to the team charter.</li>
<li>Norming: habits form → support.</li>
<li>Performing: high trust → delegate, remove obstacles.</li>
</ul>
<div class="trap"><p>Storming is <b>normal</b>. Don't replace team members or escalate just because a new team argues — facilitate.</p></div>
<p><b>Team charter / working agreement</b> is the first tool for most team-behaviour problems (late to meetings, rude comments, unclear decisions). <b>Co-location / virtual tools</b> and <b>recognition & rewards</b> build cohesion.</p>
</div>

<div class="sec">
<h2 id="m2-3">Conflict management (5 techniques)</h2>
<div class="tbl"><table>
<tr><th>Technique</th><th>What it is</th><th>Result</th></tr>
<tr><td><b>Collaborate / problem-solve</b></td><td>Open dialogue, find root cause, consensus</td><td>Win-win — <mark>best, lasting</mark></td></tr>
<tr><td>Compromise / reconcile</td><td>Each side gives something</td><td>Lose-lose, temporary</td></tr>
<tr><td>Smooth / accommodate</td><td>Emphasise agreement, downplay differences</td><td>Temporary, keeps harmony</td></tr>
<tr><td>Force / direct</td><td>One view wins (authority)</td><td>Win-lose; only for emergencies/safety/ethics</td></tr>
<tr><td>Withdraw / avoid</td><td>Postpone, retreat</td><td>Lose-lose; OK to cool down</td></tr>
</table></div>
<div class="mind"><p>Conflict order: let the team try to resolve it themselves → PM facilitates a private, face-to-face discussion focusing on the issue, not the person → escalate only if it can't be resolved at your level.</p></div>
</div>

<div class="sec">
<h2 id="m2-4">Motivation & emotional intelligence</h2>
<ul>
<li><b>Maslow</b> — physiological → safety → social → esteem → self-actualisation.</li>
<li><b>Herzberg</b> — <i>hygiene factors</i> (salary, conditions, policies) prevent dissatisfaction; <i>motivators</i> (achievement, recognition, growth) create satisfaction.</li>
<li><b>McGregor</b> — Theory X (people need control) vs Theory Y (people are self-motivated). PMI leans Y.</li>
<li><b>McClelland</b> — needs for achievement, affiliation, power.</li>
<li><b>Vroom expectancy</b> — effort → performance → reward must feel achievable and valued.</li>
</ul>
<div class="key"><p><b>Emotional intelligence</b>: self-awareness, self-management, social awareness, relationship management. High-EI PMs read the room and respond, not react.</p></div>
</div>

<div class="sec">
<h2 id="m2-5">Stakeholder engagement</h2>
<ol><li><b>Identify</b> early and continuously → <b>stakeholder register</b>.</li>
<li><b>Analyse</b> — power/interest grid, salience model (power, legitimacy, urgency).</li>
<li><b>Plan engagement</b> — engagement assessment matrix: <i>Unaware, Resistant, Neutral, Supportive, Leading</i>; C = current, D = desired.</li>
<li><b>Manage & monitor</b> engagement — adjust strategies.</li></ol>
<div class="mind"><p>New stakeholder appears mid-project? <b>Add to the register, analyse their needs, then engage</b>. A resistant stakeholder? Meet them, understand concerns, show how the project serves their interests.</p></div>
<div class="trap"><p>Do not "ignore", "work around" or immediately "escalate" a difficult stakeholder. Engagement is your job.</p></div>
</div>

<div class="sec">
<h2 id="m2-6">Communication</h2>
<ul>
<li>Channels: <code>n(n − 1) / 2</code> — 10 people → 45 channels.</li>
<li>Methods: <b>interactive</b> (meetings, calls — best for complex/sensitive issues), <b>push</b> (emails, reports), <b>pull</b> (intranet, dashboards, information radiators).</li>
<li>Communications management plan — who needs what, when, how, from whom.</li>
<li>Agile: daily stand-up, information radiators (burndown, Kanban board), osmotic communication via co-location.</li>
</ul>
<div class="key"><p>For sensitive or conflict issues choose <b>face-to-face / interactive</b>, privately. Don't solve people problems by email.</p></div>
</div>

<div class="sec">
<h2 id="m2-7">Negotiation, virtual teams & knowledge transfer</h2>
<ul>
<li>Negotiate for win-win; know your BATNA (best alternative to a negotiated agreement).</li>
<li>Virtual / distributed teams: agree core overlap hours, shared tools, explicit working agreements, more frequent check-ins, cultural awareness.</li>
<li>Knowledge transfer: lessons learned register (updated <i>throughout</i>, not only at the end), pairing, documentation, retrospectives.</li>
</ul>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m3", ico: "⚙️", tag: "process", title: "Process domain (41%)", mins: 60,
  blurb: "Integrated plan, scope, schedule, cost & EVM, quality, resources, procurement, closing.",
  html: `
<div class="sec">
<h2 id="m3-0">What the Process domain covers</h2>
<p>Paraphrasing the 2026 ECO: develop an integrated PM plan; define and manage scope; deliver value throughout the life cycle; plan and manage resources, procurement and finances; plan and optimise quality; manage the schedule; evaluate performance with data; manage artifacts; close the project or phase.</p>
</div>

<div class="sec">
<h2 id="m3-1">Integration — the PM's core job</h2>
<p>The <b>project management plan</b> integrates all subsidiary plans (scope, schedule, cost, quality, resource, communications, risk, procurement, stakeholder) and the <b>baselines</b> (scope, schedule, cost = performance measurement baseline).</p>
<div class="key"><p>Baselines change <mark>only through approved change requests</mark>. The PM integrates — specialists may plan their part, but the PM puts it together and owns the whole.</p></div>
</div>

<div class="sec">
<h2 id="m3-2">Scope</h2>
<ul>
<li><b>Requirements</b> → collect via interviews, workshops, prototypes; trace with a <b>requirements traceability matrix</b>.</li>
<li><b>Scope statement</b> → deliverables, acceptance criteria, exclusions.</li>
<li><b>WBS</b> → decomposition of the total scope into deliverables; lowest level = <mark>work package</mark>. 100% rule. WBS dictionary describes each element.</li>
<li><b>Scope baseline</b> = scope statement + WBS + WBS dictionary.</li>
<li><b>Validate scope</b> = customer formally <i>accepts</i> deliverables. <b>Control quality</b> = checking deliverables are <i>correct</i> (done before validation).</li>
</ul>
<div class="trap"><p><b>Gold plating</b> (adding extras nobody asked for) is bad even if the client would like it. <b>Scope creep</b> = uncontrolled changes. Both are avoided by change control.</p></div>
<p><b>Agile scope:</b> product backlog of user stories, prioritised by the Product Owner; <b>Definition of Done</b> (team-wide quality checklist) and <b>acceptance criteria</b> (per story).</p>
</div>

<div class="sec">
<h2 id="m3-3">Schedule</h2>
<ul>
<li>Define activities → sequence (dependencies FS, SS, FF, SF; leads & lags) → estimate durations → develop schedule.</li>
<li><b>Critical path</b> = longest path, zero total float; determines the shortest project duration.</li>
<li><b>Total float</b> = LS − ES (or LF − EF). <b>Free float</b> = delay possible without delaying the next activity.</li>
<li>Estimating: analogous (top-down, quick), parametric (rate × quantity), <b>three-point</b>: triangular <code>(O + M + P) / 3</code>, beta/PERT <code>(O + 4M + P) / 6</code>, σ ≈ <code>(P − O) / 6</code>.</li>
</ul>
<div class="key"><p>Schedule compression: <b>Fast tracking</b> = do activities in parallel (adds <i>risk/rework</i>, no extra cost). <b>Crashing</b> = add resources to critical-path activities (adds <i>cost</i>). Crash the cheapest critical activity first.</p></div>
<p><b>Agile schedule:</b> timeboxed iterations, velocity (points per sprint), release planning, burndown/burnup charts. Remaining sprints ≈ remaining points ÷ average velocity.</p>
<p>Your P6 experience helps directly here — CPM, float, constraints and resource levelling are the same concepts.</p>
</div>

<div class="sec">
<h2 id="m3-4">Finance — cost & Earned Value</h2>
<p>Cost baseline = sum of work package estimates + <b>contingency reserve</b> (for known risks, PM controls). <b>Budget</b> = cost baseline + <b>management reserve</b> (for unknown-unknowns, management controls).</p>
<div class="tbl"><table>
<tr><th>Term</th><th>Formula</th><th>Read it as</th></tr>
<tr><td>PV</td><td>planned % × BAC</td><td>Value of work scheduled to date</td></tr>
<tr><td>EV</td><td>actual % complete × BAC</td><td>Value of work actually done</td></tr>
<tr><td>AC</td><td>—</td><td>What it actually cost</td></tr>
<tr><td>CV</td><td><code>EV − AC</code></td><td>negative = over budget</td></tr>
<tr><td>SV</td><td><code>EV − PV</code></td><td>negative = behind schedule</td></tr>
<tr><td>CPI</td><td><code>EV / AC</code></td><td>&lt; 1 over budget</td></tr>
<tr><td>SPI</td><td><code>EV / PV</code></td><td>&lt; 1 behind schedule</td></tr>
<tr><td>EAC (typical)</td><td><code>BAC / CPI</code></td><td>Current cost trend continues</td></tr>
<tr><td>EAC (atypical)</td><td><code>AC + (BAC − EV)</code></td><td>Variance was a one-off</td></tr>
<tr><td>EAC (CPI & SPI)</td><td><code>AC + (BAC − EV) / (CPI × SPI)</code></td><td>Both drive the future</td></tr>
<tr><td>ETC</td><td><code>EAC − AC</code></td><td>Cost still to come</td></tr>
<tr><td>VAC</td><td><code>BAC − EAC</code></td><td>Expected overrun (−) / underrun (+)</td></tr>
<tr><td>TCPI</td><td><code>(BAC − EV) / (BAC − AC)</code></td><td>Efficiency needed to finish on BAC</td></tr>
</table></div>
<div class="key"><p>Memory hook: <b>EV is always first</b> in CV, SV, CPI and SPI. Negative variance / index below 1 = bad. Try the EVM calculator in <a href="#/tools">Tools</a>.</p></div>
</div>

<div class="sec">
<h2 id="m3-5">Quality</h2>
<ul>
<li><b>Quality</b> = conformance to requirements & fitness for use. <b>Grade</b> = category of features (low grade isn't a problem; low quality is).</li>
<li><b>Cost of quality</b>: <i>conformance</i> (prevention — training, design reviews; appraisal — testing, inspection) vs <i>non-conformance</i> (internal failure — rework, scrap; external failure — warranty, lost reputation).</li>
<li><b>Manage quality</b> (process: audits, are we following the plan?) vs <b>Control quality</b> (product: inspections, testing).</li>
<li>Tools: cause-and-effect (fishbone), <b>Pareto</b> (80/20 — vital few causes), control charts (rule of seven, control vs spec limits), histograms, scatter, checklists.</li>
</ul>
<div class="key"><p>Prevention over inspection. Quality is planned in, not inspected in. In agile: built-in quality, frequent reviews, retrospectives, DoD.</p></div>
</div>

<div class="sec">
<h2 id="m3-6">Resources</h2>
<ul>
<li>Resource management plan, <b>RACI</b> chart (Responsible, Accountable — only one, Consulted, Informed), resource histogram, resource calendars.</li>
<li>Resource levelling (may extend the schedule) vs resource smoothing (within float only).</li>
<li>Acquire → develop (training, team building) → manage (performance, conflict) the team.</li>
</ul>
</div>

<div class="sec">
<h2 id="m3-7">Procurement & contracts</h2>
<div class="tbl"><table>
<tr><th>Contract</th><th>Seller risk</th><th>Use when</th></tr>
<tr><td>Firm Fixed Price (FFP)</td><td><mark>Highest</mark></td><td>Scope well defined</td></tr>
<tr><td>Fixed Price Incentive Fee (FPIF)</td><td>High</td><td>Defined scope, reward performance</td></tr>
<tr><td>Fixed Price w/ Economic Price Adjustment</td><td>Medium-high</td><td>Long contracts, inflation/currency</td></tr>
<tr><td>Time & Material (T&amp;M)</td><td>Medium</td><td>Small, quick, staff augmentation, unclear scope</td></tr>
<tr><td>Cost Plus Incentive / Award / Fixed Fee</td><td>Low</td><td>Uncertain scope, R&amp;D</td></tr>
<tr><td>Cost Plus Percentage of Cost</td><td>Lowest (buyer worst)</td><td>Rarely acceptable</td></tr>
</table></div>
<ul>
<li>Documents: SOW, RFI / RFQ / RFP, source selection criteria, make-or-buy analysis.</li>
<li>Bidder conferences: all sellers get the same information (fairness).</li>
<li>Contract changes follow the contract's change clause; disputes → negotiation first, then ADR/claims.</li>
<li>Agile contracts: fixed time & budget, variable scope; incremental delivery; "money for nothing, change for free" clauses.</li>
</ul>
<div class="trap"><p>The contract is legally binding. Even if a seller's extra work is "obviously needed", don't let them do it outside the contract — process it as a contract change.</p></div>
</div>

<div class="sec">
<h2 id="m3-8">Closing</h2>
<ol><li>Confirm all work done & <b>formal acceptance</b> obtained.</li>
<li>Close contracts (procurement audits, settle claims).</li>
<li>Transfer the product to operations; hand over documents.</li>
<li>Finalise lessons learned; archive records (OPA updates).</li>
<li>Release resources; celebrate.</li></ol>
<div class="key"><p>Projects terminated early still go through closing — document why, capture lessons learned, release resources.</p></div>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m4", ico: "🏛️", tag: "biz", title: "Business Environment domain (26%)", mins: 45,
  blurb: "Governance, compliance, risk, change control, issues & impediments, org change, benefits.",
  html: `
<div class="sec">
<h2 id="m4-0">What the domain covers (2026)</h2>
<p>Paraphrasing the ECO: define and establish project governance (structure, rules, reporting, ethics, success metrics, escalation paths); plan and manage compliance (security, health &amp; safety, sustainability, regulatory); manage and control changes; plan and manage risk; remove impediments and manage issues; support organisational change; evaluate external factors (technology, regulation, market); continuous improvement.</p>
<div class="key"><p>This domain is now <b>a quarter of the exam</b>. Risk management and change control moved here — master them.</p></div>
</div>

<div class="sec">
<h2 id="m4-1">Governance</h2>
<ul>
<li>Governance = the framework for decisions: who approves what, reporting lines, phase gates, escalation paths, policies (OPAs).</li>
<li>Typical bodies: sponsor, steering committee, change control board (CCB), PMO.</li>
<li>Define <b>success criteria & metrics</b> up front (in the charter / business case) so everyone agrees what "done and successful" means.</li>
</ul>
<div class="mind"><p>Know your authority. Inside it → act. Outside it (budget beyond reserve, baseline change, strategic decision) → follow the governance path: prepare analysis and options, then escalate.</p></div>
</div>

<div class="sec">
<h2 id="m4-2">Compliance (safety, security, sustainability, regulatory)</h2>
<ul>
<li>Identify applicable laws, standards and policies early; build them into requirements, quality and risk plans.</li>
<li>Assign compliance owners; audit regularly; record evidence.</li>
<li>New regulation mid-project → analyse impact → change request → update plans.</li>
</ul>
<div class="trap"><p>Compliance and safety are <b>never</b> traded away to save time or money — even if the sponsor asks. Ethically and legally, the PM must comply and escalate the conflict.</p></div>
<p>Your OSH/SSS background is a real asset here: HIRARC thinking maps directly to risk and compliance planning.</p>
</div>

<div class="sec">
<h2 id="m4-3">Change control — predictive vs agile</h2>
<p><b>Predictive — the integrated change control sequence:</b></p>
<ol>
<li>Change identified (by anyone).</li>
<li><mark>Evaluate impact</mark> on scope, schedule, cost, quality, risk, resources.</li>
<li>Identify options; raise a formal <b>change request</b>.</li>
<li>CCB (or authorised person per the change management plan) approves/rejects.</li>
<li>If approved: update plans, baselines, documents; communicate; implement.</li>
<li>Verify the change was implemented correctly.</li>
</ol>
<p><b>Agile:</b> change is welcome. New requests go to the <b>Product Owner</b>, who adds them to the backlog and prioritises. The current sprint goal is protected.</p>
<div class="trap"><p>Never implement a change "because the customer asked" without the process, and never refuse change outright. Evaluate first. In agile, the team doesn't change sprint scope on a stakeholder's request — redirect to the PO.</p></div>
</div>

<div class="sec">
<h2 id="m4-4">Risk management</h2>
<p><b>Risk</b> = uncertain event that could affect objectives — negative (<i>threat</i>) or positive (<i>opportunity</i>).</p>
<ol><li>Plan risk management (methodology, roles, risk appetite & thresholds, probability-impact scales).</li>
<li>Identify risks (brainstorming, checklists, SWOT, assumption analysis, prompt lists like PESTLE) → <b>risk register</b>.</li>
<li>Qualitative analysis — probability × impact matrix; prioritise.</li>
<li>Quantitative analysis — EMV, decision trees, Monte Carlo, sensitivity (tornado).</li>
<li>Plan responses — assign a <b>risk owner</b>.</li>
<li>Implement responses.</li>
<li>Monitor risks — reassess, risk audits, track triggers.</li></ol>
<div class="tbl"><table>
<tr><th>Threat responses</th><th>Opportunity responses</th></tr>
<tr><td><b>Avoid</b> — remove the cause / change the plan</td><td><b>Exploit</b> — make sure it happens</td></tr>
<tr><td><b>Mitigate</b> — reduce probability or impact</td><td><b>Enhance</b> — increase probability or impact</td></tr>
<tr><td><b>Transfer</b> — insurance, warranties, fixed-price contract</td><td><b>Share</b> — partner/JV with someone better placed</td></tr>
<tr><td colspan="2"><b>Escalate</b> (outside PM's authority/scope) · <b>Accept</b> — active (contingency reserve) or passive (do nothing)</td></tr>
</table></div>
<ul>
<li><b>EMV</b> = probability × impact (threats negative, opportunities positive). Sum for overall exposure.</li>
<li><b>Residual risk</b> remains after a response; <b>secondary risk</b> is created by the response.</li>
<li><b>Contingency reserve</b> → known-unknowns (identified risks). <b>Management reserve</b> → unknown-unknowns.</li>
<li><b>Workaround</b> = unplanned response to an unidentified risk that occurred.</li>
</ul>
<div class="mind"><p>An identified risk occurs → the <b>risk owner implements the planned response</b>. An unidentified one occurs → workaround, then add it to the register. Risk management is continuous — review the register at every status meeting / retrospective.</p></div>
</div>

<div class="sec">
<h2 id="m4-5">Issues & impediments</h2>
<ul>
<li><b>Issue</b> = a current problem (a risk that happened, or something unexpected). Log it in the <b>issue log</b> with owner and due date.</li>
<li><b>Impediment</b> (agile) = anything blocking the team. The servant leader removes it — ideally the same day.</li>
</ul>
<div class="key"><p>Issue → <b>log it, assign an owner, analyse root cause, resolve or escalate</b>. Don't let issues sit; don't let them silently become schedule slips.</p></div>
</div>

<div class="sec">
<h2 id="m4-6">Organisational change & benefits</h2>
<ul>
<li>Projects change how people work. Plan the transition: communication, training, champions, support after go-live. Models: <b>ADKAR</b> (Awareness, Desire, Knowledge, Ability, Reinforcement), Kotter's 8 steps.</li>
<li>Re-check the <b>business case</b> when the environment shifts (market, technology, regulation). If the project no longer delivers value → inform the sponsor, recommend re-baselining or termination.</li>
<li>Continuous improvement: lessons learned, retrospectives, Kaizen, PDCA.</li>
</ul>
</div>

<div class="sec">
<h2 id="m4-7">Ethics — PMI Code of Ethics & Professional Conduct</h2>
<p>Four values: <b>Responsibility, Respect, Fairness, Honesty</b>.</p>
<ul><li>Report accurate status (no "watermelon" green-outside, red-inside reporting).</li>
<li>Disclose conflicts of interest; decline significant gifts; follow local law and company policy.</li>
<li>Respect cultural differences; don't take credit for others' work.</li></ul>
<div class="trap"><p>If an answer involves hiding information, bending a rule "just this once", or bribery dressed as "local custom" — it's wrong.</p></div>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m5", ico: "🔄", tag: "agile", title: "Agile & hybrid essentials", mins: 40,
  blurb: "Manifesto, Scrum, Kanban, XP, user stories, estimating, metrics, hybrid tailoring.",
  html: `
<div class="sec">
<h2 id="m5-1">Agile mindset</h2>
<p>The Agile Manifesto values (paraphrased): <b>people & interactions</b> over processes & tools; <b>working product</b> over comprehensive documentation; <b>customer collaboration</b> over contract negotiation; <b>responding to change</b> over following a plan — the items on the right still matter, the left matters more.</p>
<div class="key"><p>About <b>60% of the exam</b> is agile or hybrid. Even "predictive" questions reward collaboration, transparency and continuous improvement.</p></div>
</div>

<div class="sec">
<h2 id="m5-2">Scrum</h2>
<div class="tbl"><table>
<tr><th>Roles</th><th>Events (timeboxed)</th><th>Artifacts</th></tr>
<tr><td><b>Product Owner</b> — owns & prioritises the backlog, maximises value<br><b>Scrum Master</b> — servant leader, coach, removes impediments<br><b>Developers</b> — cross-functional, self-managing</td>
<td><b>Sprint</b> (1–4 wks)<br><b>Sprint planning</b> — what & how<br><b>Daily scrum</b> — 15 min, plan the next 24 h<br><b>Sprint review</b> — demo to stakeholders, get feedback<br><b>Retrospective</b> — improve the process</td>
<td><b>Product backlog</b><br><b>Sprint backlog</b><br><b>Increment</b> (meets Definition of Done)</td></tr>
</table></div>
<div class="trap"><p>Daily stand-up is <b>not a status report to the PM</b> and not a problem-solving session. Long discussions go to a follow-up ("parking lot") after the stand-up.</p></div>
<div class="trap"><p>Review = the <b>product</b> (with stakeholders). Retrospective = the <b>process</b> (team only).</p></div>
</div>

<div class="sec">
<h2 id="m5-3">Kanban, Lean & XP</h2>
<ul>
<li><b>Kanban</b> — visualise work, <mark>limit work in progress (WIP)</mark>, manage flow, pull system. Metrics: lead time, cycle time, throughput, cumulative flow diagram.</li>
<li><b>Lean</b> — eliminate waste (partially done work, extra features, handoffs, delays, task switching, defects); value stream mapping.</li>
<li><b>XP</b> — pair programming, test-driven development, continuous integration, refactoring, small releases.</li>
</ul>
</div>

<div class="sec">
<h2 id="m5-4">User stories & estimating</h2>
<ul>
<li>Format: <i>As a &lt;role&gt;, I want &lt;goal&gt; so that &lt;benefit&gt;.</i></li>
<li><b>INVEST</b>: Independent, Negotiable, Valuable, Estimable, Small, Testable.</li>
<li>Epics → features → stories → tasks. Spikes = timeboxed research.</li>
<li>Relative estimating: <b>story points</b>, planning poker (Fibonacci), T-shirt sizes, affinity estimating.</li>
<li>Prioritisation: MoSCoW (Must, Should, Could, Won't), Kano, value vs effort.</li>
<li><b>MVP</b> — smallest release that lets you learn / validate value. <b>MMF</b> — minimum marketable feature.</li>
</ul>
<div class="key"><p>Velocity is the team's own planning tool — <b>never compare velocities between teams</b> and never use it to judge individuals. Unfinished stories earn <b>zero</b> points.</p></div>
</div>

<div class="sec">
<h2 id="m5-5">Agile metrics & charts</h2>
<ul>
<li><b>Burndown</b> — work remaining vs time. Flat line = no work completed (investigate impediments). Line rising = scope added.</li>
<li><b>Burnup</b> — work completed and total scope on one chart (shows scope change clearly).</li>
<li><b>Cumulative flow diagram</b> — widening band = bottleneck.</li>
<li>Information radiators — big visible charts so anyone can pull status.</li>
</ul>
</div>

<div class="sec">
<h2 id="m5-6">Hybrid & tailoring</h2>
<ul>
<li>Use predictive where requirements are fixed and change is expensive; agile where uncertainty is high.</li>
<li>Common hybrids: predictive phases with agile delivery inside; agile development with predictive deployment/regulatory gates.</li>
<li>Transitioning a team to agile: train, coach, start with a pilot, adjust gradually.</li>
</ul>
<div class="mind"><p>When a scenario describes an organisation new to agile, the answer is usually <b>educate and coach</b> stakeholders about agile practices — not "force Scrum on everyone" and not "abandon agile".</p></div>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m6", ico: "🧭", tag: "mindset", title: "The PM mindset — think like PMI", mins: 20,
  blurb: "The decision rules behind most correct answers. Learn these before doing questions.",
  html: `
<div class="sec">
<h2 id="m6-1">The 15 mindset rules</h2>
<p>These rules summarise what experienced PMP trainers (e.g. the widely shared "PMP mindset" teaching) and PMI's own guides keep returning to. Written here in my own words.</p>
<ol>
<li><b>Assess before you act.</b> Gather facts, check the plan/register, evaluate impact — then act.</li>
<li><b>Solve at your level first.</b> Escalate only when it's beyond your authority or you've tried.</li>
<li><b>Talk to the person directly</b>, privately, face-to-face (or video) — especially for conflict or performance.</li>
<li><b>Follow the process.</b> Changes → change control. Risks → register & owner. Issues → issue log.</li>
<li><b>Be a servant leader.</b> Coach, facilitate, remove impediments; let the team decide how.</li>
<li><b>Be proactive.</b> Anticipate risks and stakeholder concerns; don't wait for them to explode.</li>
<li><b>Value over output.</b> Keep checking the business case and benefits.</li>
<li><b>Never compromise ethics, safety, quality or compliance</b> — not even for the sponsor.</li>
<li><b>Be transparent.</b> Report honest status early, especially bad news, with options.</li>
<li><b>Engage stakeholders</b> rather than avoiding or working around them.</li>
<li><b>Respect roles.</b> PO owns the backlog; sponsor owns the business case; CCB approves changes; team owns the "how".</li>
<li><b>Prevention over inspection</b>, continuous improvement over blame.</li>
<li><b>Tailor</b> the approach to the context.</li>
<li><b>Update documents</b> after decisions (registers, plans, lessons learned).</li>
<li><b>Never "do nothing"</b> unless accepting a risk is the deliberate, documented strategy.</li>
</ol>
</div>

<div class="sec">
<h2 id="m6-2">Answer-elimination tactics</h2>
<div class="key"><p>Usually wrong: <b>escalate immediately · ignore · fire/replace someone · go to HR first · let the customer decide everything · implement the change now · cut quality/testing · email when a conversation is needed · blame the team</b>.</p></div>
<div class="key"><p>Usually right: <b>review the plan/register · analyse impact · meet & discuss · coach · facilitate the team to decide · submit a change request · update the documents · inform the sponsor with options</b>.</p></div>
<div class="trap"><p>"First" vs "best" vs "next": several answers may be good; pick the one in the right sequence. Analysis comes before action; action comes before escalation; documentation updates come last.</p></div>
</div>

<div class="sec">
<h2 id="m6-3">Translate from site reality to PMI language</h2>
<div class="tbl"><table>
<tr><th>On site we say…</th><th>PMI answer thinks…</th></tr>
<tr><td>"Just get the sub to do it, we'll sort the VO later."</td><td>Evaluate impact → change request → approval → then instruct.</td></tr>
<tr><td>"Client is boss, do what they want."</td><td>Collaborate with the customer within the agreed scope and governance.</td></tr>
<tr><td>"Push the boys harder."</td><td>Understand root cause; remove impediments; motivate; re-plan realistically.</td></tr>
<tr><td>"Report on-schedule, we'll catch up."</td><td>Report true status with a recovery plan (ethics: honesty).</td></tr>
<tr><td>"Bring it to the progress meeting next month."</td><td>Address it now with the right person; log and track it.</td></tr>
</table></div>
</div>`},

/* ---------------------------------------------------------------- */
{ id: "m7", ico: "📐", tag: "formulas", title: "Formula & framework cheat sheet", mins: 10,
  blurb: "Every formula and list you must know cold, on one page.",
  html: `
<div class="sec">
<h2 id="m7-1">Formulas</h2>
<div class="tbl"><table>
<tr><th>Name</th><th>Formula</th></tr>
<tr><td>Cost variance</td><td><code>CV = EV − AC</code></td></tr>
<tr><td>Schedule variance</td><td><code>SV = EV − PV</code></td></tr>
<tr><td>Cost performance index</td><td><code>CPI = EV / AC</code></td></tr>
<tr><td>Schedule performance index</td><td><code>SPI = EV / PV</code></td></tr>
<tr><td>Estimate at completion</td><td><code>BAC / CPI</code> · <code>AC + (BAC − EV)</code> · <code>AC + (BAC − EV)/(CPI×SPI)</code> · <code>AC + bottom-up ETC</code></td></tr>
<tr><td>Estimate to complete</td><td><code>ETC = EAC − AC</code></td></tr>
<tr><td>Variance at completion</td><td><code>VAC = BAC − EAC</code></td></tr>
<tr><td>To-complete performance index</td><td><code>(BAC − EV)/(BAC − AC)</code> or <code>(BAC − EV)/(EAC − AC)</code></td></tr>
<tr><td>PERT (beta)</td><td><code>(O + 4M + P) / 6</code>, σ = <code>(P − O)/6</code></td></tr>
<tr><td>Triangular</td><td><code>(O + M + P) / 3</code></td></tr>
<tr><td>Total float</td><td><code>LS − ES</code> = <code>LF − EF</code></td></tr>
<tr><td>Communication channels</td><td><code>n(n − 1)/2</code></td></tr>
<tr><td>Expected monetary value</td><td><code>EMV = P × I</code></td></tr>
<tr><td>Point of total assumption (FPIF)</td><td><code>(Ceiling − Target price)/Buyer share + Target cost</code></td></tr>
<tr><td>ROI · NPV · IRR · Payback</td><td>Pick the higher ROI/NPV/IRR and the shorter payback</td></tr>
</table></div>
<div class="key"><p>σ ranges: ±1σ ≈ 68.3%, ±2σ ≈ 95.5%, ±3σ ≈ 99.7%. Six Sigma ≈ 3.4 defects per million.</p></div>
</div>

<div class="sec">
<h2 id="m7-2">Lists to know</h2>
<ul>
<li>Tuckman: Forming · Storming · Norming · Performing · Adjourning</li>
<li>Conflict: Collaborate · Compromise · Smooth · Force · Withdraw</li>
<li>Threats: Avoid · Mitigate · Transfer · Escalate · Accept</li>
<li>Opportunities: Exploit · Enhance · Share · Escalate · Accept</li>
<li>Engagement levels: Unaware · Resistant · Neutral · Supportive · Leading</li>
<li>INVEST · MoSCoW · ADKAR · RACI</li>
<li>Code of Ethics: Responsibility · Respect · Fairness · Honesty</li>
</ul>
</div>`},
];

/* ---------------------------------------------------------------- */
const MINDSET = [
  { s: "Your concrete supplier tells you the next pour will be delayed two days because of a plant breakdown. The slab is on the critical path.",
    o: [
      ["Tell the client immediately that the project will be two days late.", "Premature — you haven't assessed impact or options yet. Reporting is right, but not first."],
      ["Check the schedule and risk register, assess the impact, and look for options such as an alternative supplier or resequencing.", "✔ Assess first. Is there float? A planned response? Then act and report with options."],
      ["Order the site team to work overtime to make up the two days.", "Jumps to a solution (crashing) without analysis — and overtime doesn't help if concrete can't arrive."],
    ], a: 1, rule: "Assess before you act." },
  { s: "Two engineers are openly arguing in the site office about the formwork method, and other staff are getting uncomfortable.",
    o: [
      ["Decide the method yourself to end the argument.", "Forcing — quick but win-lose; the root cause isn't addressed."],
      ["Report both to their functional manager.", "Escalation before you've tried to resolve it at your level."],
      ["Meet both privately, understand each view and facilitate a joint decision based on technical criteria.", "✔ Collaborate / problem-solve, privately and face to face."],
    ], a: 2, rule: "Talk directly, privately; collaborate." },
  { s: "The client's representative asks your team on site to add an extra drainage sump that is not in the drawings. 'It's small, just do it.'",
    o: [
      ["Do it — it's small and keeps the client happy.", "Scope creep. Even small changes need evaluation and approval."],
      ["Refuse — it's not in the contract.", "Change isn't bad; refusing outright damages the relationship."],
      ["Evaluate the impact and process it as a change request / variation through the agreed procedure.", "✔ Follow integrated change control."],
    ], a: 2, rule: "Follow the process." },
  { s: "The sponsor asks you to show the project as 'green' in the monthly report because a board visit is coming, although you are three weeks behind.",
    o: [
      ["Report green this month and fix it next month.", "Dishonest — violates the Code of Ethics."],
      ["Report the true status, and present a recovery plan with options to the sponsor before the board visit.", "✔ Honest, transparent, and constructive."],
      ["Refuse to produce the report.", "Unprofessional; you still have a duty to report."],
    ], a: 1, rule: "Never compromise ethics; bring bad news early with options." },
  { s: "In your agile design team, the daily stand-up keeps running 40 minutes as people solve problems in detail.",
    o: [
      ["Cancel the stand-ups and use weekly meetings.", "Removes a core agile practice instead of fixing the behaviour."],
      ["Coach the team to keep the stand-up to 15 minutes and move detailed discussions to a follow-up with only the people needed.", "✔ Servant leader coaching; timebox respected."],
      ["Run the stand-up yourself and ask each person for a status report.", "Turns the stand-up into a status meeting for the PM."],
    ], a: 1, rule: "Coach and facilitate." },
  { s: "A new JKR inspector joins mid-project and seems unhappy with the reporting format you agreed with the previous one.",
    o: [
      ["Keep the existing format — it was already agreed.", "Ignores a new stakeholder's needs; engagement will drop."],
      ["Add the inspector to the stakeholder register, meet to understand their requirements, and update the communications plan as appropriate.", "✔ Identify, analyse, engage — continuously."],
      ["Ask the sponsor to tell the inspector to accept the format.", "Escalation instead of engagement."],
    ], a: 1, rule: "Engage stakeholders; update documents." },
  { s: "A risk you identified (heavy monsoon rain flooding the excavation) occurs. A response plan with pumps and a risk owner was documented.",
    o: [
      ["Call an emergency meeting to brainstorm what to do.", "The response is already planned — no need to start from scratch."],
      ["The risk owner implements the planned response; you monitor and update the risk register.", "✔ Use the plan you made. Then update registers and lessons learned."],
      ["Use the management reserve to hire a dewatering specialist.", "Management reserve is for unknown risks; this one is known and has contingency."],
    ], a: 1, rule: "Follow the process; risk owner acts." },
  { s: "A team member who is usually reliable has missed three deadlines this month.",
    o: [
      ["Issue a formal warning letter.", "Punitive before understanding the cause."],
      ["Reassign their work to others quietly.", "Avoids the problem and overloads others."],
      ["Talk with them privately to understand what's happening and agree on support or adjustments.", "✔ Root cause first, privately; servant leadership."],
    ], a: 2, rule: "Talk to the person directly." },
  { s: "A stakeholder approaches a developer mid-sprint and asks for a new dashboard feature 'by Friday'.",
    o: [
      ["The developer adds it to the sprint because the stakeholder is senior.", "Breaks sprint protection and bypasses the Product Owner."],
      ["Direct the stakeholder to the Product Owner, who will evaluate and prioritise it in the product backlog.", "✔ Respect roles — the PO owns priorities."],
      ["Tell the stakeholder changes are not allowed once a project starts.", "Agile welcomes change; it just goes through the backlog."],
    ], a: 1, rule: "Respect roles." },
  { s: "Halfway through, a new state regulation requires additional fire-safety provisions that will affect design and cost.",
    o: [
      ["Ignore it until the authority enforces it.", "Non-compliance — never acceptable."],
      ["Analyse the impact, consult the relevant authority/specialists, raise a change request and update plans once approved.", "✔ Compliance is mandatory; process it properly."],
      ["Implement the provisions immediately and tell the client later.", "Right intent, but skips impact analysis and approval of cost/schedule changes."],
    ], a: 1, rule: "Never compromise compliance; follow the process." },
  { s: "A subcontractor offers you a high-value hamper and a weekend resort stay 'for good cooperation' while their claim is under evaluation.",
    o: [
      ["Accept — it's normal practice during festive season.", "Conflict of interest; influences a pending decision."],
      ["Politely decline, follow company policy on gifts and disclose the offer if required.", "✔ Fairness & honesty — avoid conflicts of interest."],
      ["Accept but share it with the team.", "Still a conflict of interest."],
    ], a: 1, rule: "Ethics first." },
  { s: "Your functional manager wants to pull your best QS off the project for two weeks for another job, which would delay the interim valuation.",
    o: [
      ["Escalate to the sponsor immediately.", "Escalation before negotiating at your level."],
      ["Discuss with the functional manager, explain the impact using the resource plan, and negotiate options (timing, partial availability, a replacement).", "✔ Negotiate at your level first, with facts."],
      ["Accept and absorb the delay.", "Passive — doesn't protect project objectives."],
    ], a: 1, rule: "Solve at your level first." },
];

/* ---------------------------------------------------------------- */
const FLASH = [
  ["formula", "CPI", "EV ÷ AC — below 1 means over budget"],
  ["formula", "SPI", "EV ÷ PV — below 1 means behind schedule"],
  ["formula", "CV", "EV − AC — negative = over budget"],
  ["formula", "SV", "EV − PV — negative = behind schedule"],
  ["formula", "EAC (typical)", "BAC ÷ CPI — current cost performance continues"],
  ["formula", "EAC (atypical)", "AC + (BAC − EV) — past variance was a one-off"],
  ["formula", "VAC", "BAC − EAC"],
  ["formula", "TCPI", "(BAC − EV) ÷ (BAC − AC) — efficiency needed to finish on budget"],
  ["formula", "PERT estimate", "(O + 4M + P) ÷ 6"],
  ["formula", "Communication channels", "n(n − 1) ÷ 2"],
  ["formula", "EMV", "Probability × Impact (threats −, opportunities +)"],
  ["formula", "Total float", "LS − ES or LF − EF"],
  ["term", "Project charter", "Formally authorises the project and gives the PM authority; issued by the sponsor"],
  ["term", "Work package", "Lowest level of the WBS; can be estimated, scheduled and assigned"],
  ["term", "Scope baseline", "Approved scope statement + WBS + WBS dictionary"],
  ["term", "Validate scope vs Control quality", "Validate = customer acceptance; Control quality = correctness (done first)"],
  ["term", "Fast tracking", "Doing activities in parallel — adds risk, not cost"],
  ["term", "Crashing", "Adding resources to critical-path activities — adds cost"],
  ["term", "Contingency reserve", "For identified (known-unknown) risks; part of the cost baseline; PM uses it"],
  ["term", "Management reserve", "For unknown-unknowns; outside the cost baseline; management approves use"],
  ["term", "Workaround", "Unplanned response to a risk that wasn't identified"],
  ["term", "Secondary risk", "A new risk created by implementing a risk response"],
  ["term", "Residual risk", "Risk left after a response is implemented"],
  ["term", "Gold plating", "Adding features not requested — avoid"],
  ["term", "RACI", "Responsible, Accountable (only one), Consulted, Informed"],
  ["term", "Cost of quality", "Conformance (prevention + appraisal) + non-conformance (internal + external failure)"],
  ["term", "Firm Fixed Price", "Seller carries the most cost risk"],
  ["term", "Cost Plus % of Cost", "Worst for the buyer — seller profits from spending more"],
  ["people", "Tuckman stages", "Forming → Storming → Norming → Performing → Adjourning"],
  ["people", "Best conflict technique", "Collaborate / problem-solve — win-win, lasting"],
  ["people", "Herzberg hygiene factors", "Salary, working conditions, policies — prevent dissatisfaction but don't motivate"],
  ["people", "Servant leadership", "Remove impediments, shield the team, coach, enable self-organisation"],
  ["people", "Engagement assessment matrix", "Unaware · Resistant · Neutral · Supportive · Leading (C = current, D = desired)"],
  ["people", "Code of Ethics values", "Responsibility · Respect · Fairness · Honesty"],
  ["agile", "Product Owner", "Owns and prioritises the backlog; maximises value"],
  ["agile", "Definition of Done", "Team-wide checklist for when an increment is complete"],
  ["agile", "Sprint review vs retrospective", "Review = product with stakeholders; Retro = process, team only"],
  ["agile", "INVEST", "Independent · Negotiable · Valuable · Estimable · Small · Testable"],
  ["agile", "WIP limit", "Kanban cap on items in a column — improves flow, exposes bottlenecks"],
  ["agile", "Velocity", "Story points completed per sprint; for that team's planning only"],
  ["agile", "MVP", "Smallest release that validates value / learning"],
  ["agile", "Burndown flat line", "No work being completed — look for impediments"],
  ["agile", "Spike", "Timeboxed research to reduce uncertainty"],
  ["agile", "MoSCoW", "Must · Should · Could · Won't (this time)"],
];

/* ---------------------------------------------------------------- */
const RESOURCES = [
  { group: "Official PMI (the source of truth)", items: [
    ["PMP certification page — eligibility, fees, application", "https://www.pmi.org/certifications/project-management-pmp"],
    ["What's new in the updated PMP exam (2026)", "https://www.pmi.org/certifications/project-management-pmp/new-exam"],
    ["PMBOK® Guide (8th edition) — free digital copy for PMI members", "https://www.pmi.org/standards/pmbok"],
    ["PMI Code of Ethics and Professional Conduct (free)", "https://www.pmi.org/about/ethics/code"],
    ["PMI Study Hall — official practice questions (paid)", "https://www.pmi.org/shop"],
  ]},
  { group: "Free videos from well-known PMP mentors", items: [
    ["Andrew Ramdayal (TIA) — \"PMP mindset\" lessons and question walkthroughs", "https://www.youtube.com/results?search_query=Andrew+Ramdayal+PMP+mindset"],
    ["David McLachlan — free PMP practice questions & full exam walkthroughs", "https://www.youtube.com/results?search_query=David+McLachlan+PMP+exam+questions"],
    ["Ricardo Vargas — PMBOK explained, free videos and process flows", "https://www.youtube.com/results?search_query=Ricardo+Vargas+PMBOK"],
    ["Mike Clayton (OnlinePMCourses) — PM concepts explained simply", "https://www.youtube.com/results?search_query=Mike+Clayton+project+management"],
    ["Scrum Guide (free, official Scrum definition)", "https://scrumguides.org/"],
    ["Agile Manifesto & 12 principles (free)", "https://agilemanifesto.org/"],
  ]},
  { group: "Widely used paid options (decide later)", items: [
    ["35-contact-hour courses on Udemy (e.g. Andrew Ramdayal, Joseph Phillips) — often on sale", "https://www.udemy.com/courses/search/?q=pmp"],
    ["Question simulators: PMI Study Hall, TIA exam simulator, PrepCast, Pocket Prep", "https://www.pocketprep.com/posts/whats-changing-on-the-pmp-exam-in-2026/"],
  ]},
];
