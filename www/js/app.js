import { COURSES } from './courses.js';
import { mascot } from './mascot.js';

/* ================= State ================= */
const KEY = 'sprout.v1';
const MAX_HEARTS = 5;
const HEART_MS = 20 * 60 * 1000;
const today = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayOffset = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return today(d); };

const DEFAULT = {
  onboarded: false, course: 'chess', tab: 'learn',
  xp: 0, gems: 500, hearts: MAX_HEARTS, heartsAt: Date.now(),
  streak: 0, lastDay: null, xpByDay: {}, done: {}, chests: {},
  dailyGoal: 20, sound: true,
  habits: [
    { id: 'h1', name: 'Drink water', emoji: '💧', color: 'blue', log: {} },
    { id: 'h2', name: 'Read 10 pages', emoji: '📚', color: 'purple', log: {} },
    { id: 'h3', name: 'Stretch', emoji: '🧘', color: 'green', log: {} },
  ],
};
let S;
try { S = { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { S = { ...DEFAULT }; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage unavailable */ } };

function regenHearts() {
  if (S.hearts >= MAX_HEARTS) { S.heartsAt = Date.now(); return; }
  const gained = Math.floor((Date.now() - S.heartsAt) / HEART_MS);
  if (gained > 0) { S.hearts = Math.min(MAX_HEARTS, S.hearts + gained); S.heartsAt += gained * HEART_MS; }
}
function streakAlive() { return S.lastDay === today() || S.lastDay === dayOffset(-1); }
function addXP(n) {
  S.xp += n;
  S.xpByDay[today()] = (S.xpByDay[today()] || 0) + n;
  if (S.lastDay !== today()) { S.streak = S.lastDay === dayOffset(-1) ? S.streak + 1 : 1; S.lastDay = today(); }
  save();
}

/* ================= Sound & haptics ================= */
let AC;
function tone(notes) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    let t = AC.currentTime;
    for (const [f, d, type = 'sine'] of notes) {
      const o = AC.createOscillator(); const g = AC.createGain();
      o.type = type; o.frequency.value = f; o.connect(g); g.connect(AC.destination);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.start(t); o.stop(t + d + 0.02); t += d * 0.8;
    }
  } catch { /* no audio */ }
}
const sfx = {
  good: () => { tone([[660, 0.12], [990, 0.22]]); navigator.vibrate?.(20); },
  bad: () => { tone([[220, 0.18, 'square'], [170, 0.25, 'square']]); navigator.vibrate?.([40, 40, 40]); },
  tap: () => tone([[520, 0.05, 'triangle']]),
  win: () => tone([[523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.35]]),
};
function speak(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; u.rate = 0.9;
    speechSynthesis.speak(u);
  } catch { /* no tts */ }
}

/* ================= Helpers ================= */
const $app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const course = () => COURSES[S.course] || COURSES.chess;
const allLessons = (c = course()) => c.units.flatMap((u, ui) => u.lessons.map((l, li) => ({ ...l, ui, li, unit: u })));
function currentLessonId(c = course()) { const l = allLessons(c).find((x) => !S.done[x.id]); return l ? l.id : null; }
function lessonUnlocked(id, c = course()) {
  const list = allLessons(c); const i = list.findIndex((x) => x.id === id);
  return i === 0 || !!S.done[list[i - 1].id];
}
const PIECES = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };

function boardHTML(b) {
  if (!b) return '';
  const rows = b.flip ? [...b.board].reverse().map((r) => [...r].reverse()) : b.board;
  let cells = '';
  rows.forEach((row, ri) => row.forEach((sq, ci) => {
    const file = b.flip ? 7 - ci : ci; const rank = b.flip ? ri + 1 : 8 - ri;
    const name = 'abcdefgh'[file] + rank;
    const light = (file + rank) % 2 === 1;
    const hl = b.last.includes(name) ? ' hl' : '';
    const piece = sq ? `<span class="pc ${sq.color}">${PIECES[sq.type]}︎</span>` : '';
    cells += `<div class="sq ${light ? 'l' : 'd'}${hl}">${piece}</div>`;
  }));
  return `<div class="board" aria-label="Chess board">${cells}</div>`;
}

function topBar() {
  regenHearts();
  const c = course();
  return `<header class="topbar">
    <button class="chip" data-act="courses" aria-label="Change course"><span class="flag">${c.icon}</span></button>
    <div class="chip stat ${streakAlive() && S.streak ? 'fire' : 'off'}" title="Day streak">🔥 <b>${streakAlive() ? S.streak : 0}</b></div>
    <div class="chip stat gem" title="Gems">💎 <b>${S.gems}</b></div>
    <button class="chip stat heart" data-act="hearts" title="Hearts">❤️ <b>${S.hearts}</b></button>
  </header>`;
}

function navBar() {
  const items = [['learn', '🏠', 'Learn'], ['habits', '✅', 'Habits'], ['profile', '🌱', 'Profile']];
  return `<nav class="nav">${items.map(([id, ic, lb]) => `<button class="nav-btn ${S.tab === id ? 'on' : ''}" data-tab="${id}"><span>${ic}</span><small>${lb}</small></button>`).join('')}</nav>`;
}

/* ================= Screens ================= */
function render() {
  if (!S.onboarded) return renderOnboarding();
  const body = S.tab === 'habits' ? habitsView() : S.tab === 'profile' ? profileView() : learnView();
  $app.innerHTML = `<div class="shell">${topBar()}<main class="main">${body}</main>${navBar()}</div>`;
  if (S.tab === 'learn') requestAnimationFrame(() => document.querySelector('.node.current')?.scrollIntoView({ block: 'center', behavior: 'instant' }));
}

function renderOnboarding() {
  $app.innerHTML = `<div class="onboard">
    <div class="ob-hero">${mascot('cheer', 150)}</div>
    <h1>Hi, I'm Pip!</h1>
    <p class="muted">Tiny lessons, every day. What do you want to grow first?</p>
    <div class="ob-list">
      <button class="pick" data-ob="chess"><span class="pick-ic">♞</span><span><b>Chess Openings</b><small>43 gambits from your Meridium library</small></span></button>
      <button class="pick" data-ob="es"><span class="pick-ic">🇪🇸</span><span><b>Spanish</b><small>Words, phrases and listening</small></span></button>
      <button class="pick" data-ob="habits"><span class="pick-ic">✅</span><span><b>Daily Habits</b><small>Build streaks for the things you care about</small></span></button>
    </div>
  </div>`;
}

function learnView() {
  const c = course(); const cur = currentLessonId(c);
  const offs = [0, 44, 66, 44, 0, -44, -66, -44];
  let i = 0;
  const units = c.units.map((u, ui) => {
    const nodes = u.lessons.map((l, li) => {
      const done = !!S.done[l.id]; const open = lessonUnlocked(l.id, c); const isCur = l.id === cur;
      const st = done ? 'done' : isCur ? 'current' : open ? 'open' : 'locked';
      const x = offs[i++ % offs.length];
      const icon = done ? '★' : st === 'locked' ? '🔒' : c.id === 'chess' ? '♞' : '★';
      let html = `<div class="node-wrap" style="--x:${x}px">
        ${isCur ? '<div class="start-tip">START</div>' : ''}
        <button class="node ${st} c-${u.color}" data-lesson="${l.id}" ${st === 'locked' ? 'aria-disabled="true"' : ''} aria-label="${esc(l.title)}">${icon}</button>
      </div>`;
      if (li === u.lessons.length - 1) {
        const cid = `${c.id}:${ui}`; const unitDone = u.lessons.every((x) => S.done[x.id]);
        const x2 = offs[i++ % offs.length];
        html += `<div class="node-wrap" style="--x:${x2}px"><button class="chest ${S.chests[cid] ? 'opened' : unitDone ? 'ready' : ''}" data-chest="${cid}" aria-label="Treasure chest">${S.chests[cid] ? '📭' : '🎁'}</button></div>`;
      }
      return html;
    }).join('');
    const side = ui % 2 === 0 ? 'right' : 'left';
    return `<section class="unit">
      <div class="unit-banner c-${u.color}">
        <div><small>UNIT ${ui + 1}</small><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></div>
        <button class="guide-btn" data-guide="${ui}" aria-label="Unit guide">📖<span>GUIDE</span></button>
      </div>
      <div class="path">${nodes}<div class="path-mascot ${side}">${mascot(ui % 2 ? 'think' : 'happy', 96)}</div></div>
    </section>`;
  }).join('');
  return `<div class="learn">${units}<p class="end-note muted">More units are growing. Check back soon! 🌱</p></div>`;
}

function habitsView() {
  const t = today(); const habits = S.habits;
  const doneN = habits.filter((h) => h.log[t]).length;
  const pct = habits.length ? doneN / habits.length : 0;
  const days = [...Array(7)].map((_, k) => dayOffset(k - 6));
  const dayLetter = (d) => 'SMTWTFS'[new Date(d + 'T12:00').getDay()];
  const streakOf = (h) => { let n = 0; let k = h.log[t] ? 0 : -1; while (h.log[dayOffset(k)]) { n++; k--; } return n; };
  const cards = habits.map((h) => `<div class="habit c-${h.color}">
      <div class="h-emoji">${h.emoji}</div>
      <div class="h-body"><b>${esc(h.name)}</b>
        <div class="h-meta">🔥 ${streakOf(h)} day${streakOf(h) === 1 ? '' : 's'}</div>
        <div class="dots">${days.map((d) => `<span class="dot ${h.log[d] ? 'on' : ''} ${d === t ? 'today' : ''}" title="${d}">${dayLetter(d)}</span>`).join('')}</div>
      </div>
      <div class="h-actions">
        <button class="check ${h.log[t] ? 'on' : ''}" data-habit="${h.id}" aria-label="Mark ${esc(h.name)} done today">✓</button>
        <button class="h-del" data-delhabit="${h.id}" aria-label="Delete ${esc(h.name)}">✕</button>
      </div>
    </div>`).join('');
  return `<div class="habits">
    <div class="h-hero">
      <div class="ring" style="--p:${pct}"><div>${doneN}/${habits.length}</div></div>
      <div><h2>Today's habits</h2><p class="muted">${doneN === habits.length && habits.length ? 'All done. Pip is proud of you!' : 'Each check-in earns 5 XP and keeps your streak alive.'}</p></div>
    </div>
    ${cards || `<div class="empty">${mascot('think', 90)}<p>No habits yet. Add one below.</p></div>`}
    <button class="btn blue wide" data-act="addhabit">+ ADD A HABIT</button>
  </div>`;
}

function profileView() {
  const days = [...Array(7)].map((_, k) => dayOffset(k - 6));
  const vals = days.map((d) => S.xpByDay[d] || 0); const max = Math.max(S.dailyGoal, ...vals);
  const lessons = Object.keys(S.done).length;
  const todayXP = S.xpByDay[today()] || 0;
  const badges = [
    ['🔥', 'Spark', '3-day streak', S.streak >= 3], ['🏆', 'Scholar', '10 lessons', lessons >= 10],
    ['💯', 'Perfectionist', 'Finish a lesson with no mistakes', !!S.perfect], ['🌳', 'Evergreen', '1,000 XP', S.xp >= 1000],
  ];
  return `<div class="profile">
    <div class="p-head">${mascot('happy', 84)}<div><h2>Your garden</h2><p class="muted">Learning ${esc(course().name)}</p></div></div>
    <div class="stats">
      <div class="stat-card"><span>🔥</span><b>${streakAlive() ? S.streak : 0}</b><small>Day streak</small></div>
      <div class="stat-card"><span>⚡</span><b>${S.xp}</b><small>Total XP</small></div>
      <div class="stat-card"><span>📘</span><b>${lessons}</b><small>Lessons</small></div>
      <div class="stat-card"><span>💎</span><b>${S.gems}</b><small>Gems</small></div>
    </div>
    <h3>Daily goal · ${todayXP}/${S.dailyGoal} XP</h3>
    <div class="goalbar"><i style="width:${Math.min(100, (todayXP / S.dailyGoal) * 100)}%"></i></div>
    <div class="seg">${[10, 20, 30, 50].map((g) => `<button class="${S.dailyGoal === g ? 'on' : ''}" data-goal="${g}">${g} XP</button>`).join('')}</div>
    <h3>This week</h3>
    <div class="chart">${days.map((d, k) => `<div class="bar"><i style="height:${(vals[k] / max) * 100}%"></i><small>${'SMTWTFS'[new Date(d + 'T12:00').getDay()]}</small><em>${vals[k] || ''}</em></div>`).join('')}</div>
    <h3>Achievements</h3>
    <div class="badges">${badges.map(([e, n, d, ok]) => `<div class="badge ${ok ? 'got' : ''}"><span>${e}</span><b>${n}</b><small>${d}</small></div>`).join('')}</div>
    <h3>Settings</h3>
    <div class="settings">
      <button class="row" data-act="sound">🔊 Sound effects <b>${S.sound ? 'On' : 'Off'}</b></button>
      <button class="row" data-act="courses">📚 Switch course <b>${esc(course().name)}</b></button>
      ${installPrompt ? '<button class="row" data-act="install">📲 Install Sprout <b>Add to home screen</b></button>' : ''}
      <button class="row danger" data-act="reset">🗑️ Reset all progress</button>
    </div>
  </div>`;
}

/* ================= Modals ================= */
function sheet(html, cls = '') {
  closeSheet();
  const el = document.createElement('div');
  el.className = 'sheet-back'; el.innerHTML = `<div class="sheet ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  el.addEventListener('click', (e) => { if (e.target === el || e.target.closest('[data-close]')) closeSheet(); });
  document.body.appendChild(el);
}
function closeSheet() { document.querySelector('.sheet-back')?.remove(); }

function coursesSheet() {
  sheet(`<h2>Choose a course</h2><div class="ob-list">${Object.values(COURSES).map((c) => {
    const n = allLessons(c).filter((l) => S.done[l.id]).length; const tot = allLessons(c).length;
    return `<button class="pick ${S.course === c.id ? 'sel' : ''}" data-course="${c.id}"><span class="pick-ic">${c.icon}</span><span><b>${c.name}</b><small>${n}/${tot} lessons</small></span></button>`;
  }).join('')}</div>`);
}
function heartsSheet(blocking = false) {
  regenHearts();
  const mins = Math.ceil((HEART_MS - (Date.now() - S.heartsAt)) / 60000);
  sheet(`<div class="center">${mascot(S.hearts ? 'happy' : 'sad', 90)}
    <h2>${S.hearts ? `You have ${S.hearts} hearts` : "You're out of hearts"}</h2>
    <div class="hearts-row">${[...Array(MAX_HEARTS)].map((_, k) => `<span class="${k < S.hearts ? '' : 'empty'}">❤️</span>`).join('')}</div>
    <p class="muted">${S.hearts >= MAX_HEARTS ? 'Full! Every mistake costs one heart.' : `Next heart in ${mins} min.`}</p>
    ${S.hearts < MAX_HEARTS ? `<button class="btn blue wide" data-act="refill" ${S.gems < 350 ? 'disabled' : ''}>REFILL · 💎 350</button>` : ''}
    <button class="btn ghost wide" data-close>${blocking ? 'NO THANKS' : 'CLOSE'}</button></div>`);
}
function guideSheet(ui) {
  const u = course().units[ui];
  sheet(`<h2>Unit ${ui + 1}: ${esc(u.title)}</h2><p class="muted">${esc(u.desc)}</p>
    <div class="guide">${u.guide.map((g) => `<div class="g-row"><b>${esc(g.term)}</b><span>${esc(g.def)}</span></div>`).join('')}</div>
    <button class="btn green wide" data-close>GOT IT</button>`);
}
const EMOJIS = ['💧', '📚', '🧘', '🏃', '🥗', '😴', '🎸', '✍️', '🧹', '💊', '🚶', '♟️', '🗣️', '🌞', '📵', '🦷'];
const COLORS = ['green', 'blue', 'purple', 'red', 'yellow'];
function addHabitSheet() {
  sheet(`<h2>New habit</h2>
    <form id="habit-form" class="form">
      <label for="h-name">Name</label><input id="h-name" maxlength="40" placeholder="e.g. Practice guitar" required autocomplete="off">
      <label>Icon</label><div class="emoji-grid">${EMOJIS.map((e, k) => `<button type="button" class="emo ${k === 0 ? 'on' : ''}" data-emo="${e}">${e}</button>`).join('')}</div>
      <label>Color</label><div class="color-row">${COLORS.map((c, k) => `<button type="button" class="sw c-${c} ${k === 0 ? 'on' : ''}" data-col="${c}" aria-label="${c}"></button>`).join('')}</div>
      <button class="btn green wide" type="submit">ADD HABIT</button>
    </form>`);
  setTimeout(() => document.getElementById('h-name')?.focus(), 50);
}
function confirmSheet(text, act) {
  sheet(`<div class="center">${mascot('sad', 80)}<h2>${text}</h2>
    <button class="btn red wide" data-act="${act}">YES, DO IT</button><button class="btn ghost wide" data-close>CANCEL</button></div>`);
}

/* ================= Lesson ================= */
let L = null; // active lesson

function startLesson(id) {
  regenHearts();
  if (S.hearts <= 0) return heartsSheet(true);
  const lesson = allLessons().find((l) => l.id === id);
  const qs = course().questions(lesson);
  L = { id, lesson, queue: qs, total: qs.length, idx: 0, correct: 0, wrong: 0, sel: null, built: [], checked: false, started: Date.now(), match: null };
  renderQuestion();
}

function renderQuestion() {
  const q = L.queue[L.idx];
  L.sel = null; L.built = []; L.checked = false;
  if (q.type === 'match') L.match = { left: shuffleIdx(q.pairs.length), right: shuffleIdx(q.pairs.length), picked: null, solved: new Set() };
  const progress = (L.correct / L.total) * 100;
  const bubble = q.type === 'match' ? '' : `<div class="prompt-row">${mascot(q.type === 'build' ? 'think' : 'happy', 74)}<div class="bubble">
      ${q.listen ? `<button class="speak big" data-speak="${esc(q.listen)}" aria-label="Play audio">🔊</button>` : ''}
      ${q.sub ? `<span class="${q.mono ? 'mono' : ''}">${q.speak ? `<button class="speak" data-speak="${esc(q.speak)}" aria-label="Play audio">🔊</button> ` : ''}${esc(q.sub)}</span>` : q.speak && q.type !== 'pics' ? `<button class="speak" data-speak="${esc(q.speak)}">🔊</button>` : (q.listen ? '' : '<span>Pick the right answer</span>')}
    </div></div>`;
  let body = '';
  if (q.type === 'mc') body = `${boardHTML(q.board)}<div class="opts">${q.options.map((o, k) => `<button class="opt ${q.mono ? 'mono' : ''}" data-opt="${k}"><kbd>${k + 1}</kbd>${esc(o.label)}</button>`).join('')}</div>`;
  if (q.type === 'pics') body = `<div class="pics n${q.options.length}">${q.options.map((o, k) => `<button class="pic" data-opt="${k}"><span class="pic-e">${o.emoji}</span><span>${esc(o.label)}</span></button>`).join('')}</div>`;
  if (q.type === 'build') body = `<div class="answer-line" id="built"></div><div class="tiles" id="bank">${q.tiles.map((t, k) => `<button class="tile ${q.mono ? 'mono' : ''}" data-tile="${k}">${esc(t)}</button>`).join('')}</div>`;
  if (q.type === 'match') body = `<div class="match">
      <div class="col">${L.match.left.map((k) => `<button class="tile mt" data-ml="${k}">${esc(q.pairs[k][0])}</button>`).join('')}</div>
      <div class="col">${L.match.right.map((k) => `<button class="tile mt mono-ish" data-mr="${k}">${esc(q.pairs[k][1])}</button>`).join('')}</div></div>`;
  $app.innerHTML = `<div class="lesson">
    <header class="l-top"><button class="x" data-act="quit" aria-label="Quit lesson">✕</button>
      <div class="pbar"><i style="width:${progress}%"></i></div><div class="l-hearts">❤️ ${S.hearts}</div></header>
    <div class="l-body"><h2 class="q-title">${esc(q.prompt)}</h2>${bubble}${body}</div>
    <footer class="l-foot" id="foot"><div class="foot-inner">
      ${q.type === 'match' ? '<button class="btn ghost" data-act="skip">SKIP</button>' : '<span></span>'}
      <button class="btn green" id="check" data-act="check" ${q.type === 'match' ? 'hidden' : 'disabled'}>CHECK</button>
    </div></footer></div>`;
  if (q.speak && q.type === 'pics') setTimeout(() => speak(q.speak), 250);
  if (q.listen) setTimeout(() => speak(q.listen), 250);
}
function shuffleIdx(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function updateBuilt() {
  const q = L.queue[L.idx];
  document.getElementById('built').innerHTML = L.built.map((k, pos) => `<button class="tile ${q.mono ? 'mono' : ''}" data-unbuild="${pos}">${esc(q.tiles[k])}</button>`).join('');
  document.querySelectorAll('[data-tile]').forEach((b) => b.classList.toggle('used', L.built.includes(+b.dataset.tile)));
  document.getElementById('check').disabled = L.built.length === 0;
}

function check() {
  if (L.checked) return next();
  const q = L.queue[L.idx];
  let ok; let answerText;
  if (q.type === 'build') {
    ok = L.built.map((k) => q.tiles[k]).join(' ') === q.answer.join(' ');
    answerText = q.answer.join(' ');
  } else {
    if (L.sel === null) return;
    ok = L.sel === q.answer; answerText = q.options[q.answer].label;
  }
  feedback(ok, answerText);
}

function feedback(ok, answerText) {
  const q = L.queue[L.idx];
  L.checked = true;
  if (ok) { L.correct++; sfx.good(); } else {
    L.wrong++; sfx.bad(); S.hearts = Math.max(0, S.hearts - 1); if (S.hearts === MAX_HEARTS - 1) S.heartsAt = Date.now(); save();
    L.queue.push(q); // retry later, Duolingo-style
  }
  document.querySelectorAll('[data-opt]').forEach((b) => {
    b.disabled = true;
    if (b.classList.contains('sel')) { b.classList.remove('sel'); if (!ok) b.classList.add('miss'); }
    if (+b.dataset.opt === q.answer) b.classList.add('right');
  });
  const praise = ['Nice!', 'Great job!', 'Awesome!', 'Correct!', 'You got it!'][Math.floor(Math.random() * 5)];
  document.querySelector('.l-hearts').textContent = `❤️ ${S.hearts}`;
  document.querySelector('.pbar i').style.width = `${(L.correct / L.total) * 100}%`;
  const foot = document.getElementById('foot');
  foot.className = `l-foot ${ok ? 'ok' : 'no'}`;
  foot.innerHTML = `<div class="foot-inner"><div class="fb"><span class="fb-ic">${ok ? '✔' : '✖'}</span><div><b>${ok ? praise : 'Correct answer:'}</b>${ok ? '' : `<p class="${q.mono ? 'mono' : ''}">${esc(answerText)}</p>`}</div></div>
    <button class="btn ${ok ? 'green' : 'red'}" id="check" data-act="check">${S.hearts <= 0 && !ok ? 'END LESSON' : 'CONTINUE'}</button></div>`;
}

function next() {
  if (S.hearts <= 0) { L = null; render(); return heartsSheet(true); }
  L.idx++;
  if (L.idx >= L.queue.length) return finish();
  renderQuestion();
}

function finish() {
  const perfect = L.wrong === 0;
  const xp = 10 + (perfect ? 5 : 0);
  const first = !S.done[L.id];
  S.done[L.id] = true; if (perfect) S.perfect = true;
  S.gems += first ? 10 : 2;
  addXP(xp);
  const acc = Math.round((L.correct / (L.correct + L.wrong)) * 100);
  const secs = Math.round((Date.now() - L.started) / 1000);
  sfx.win();
  $app.innerHTML = `<div class="done-screen">
    <div class="confetti">${[...Array(28)].map((_, k) => `<i style="--l:${(k * 37) % 100}%;--d:${(k % 7) * 0.15}s;--c:${['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff'][k % 5]}"></i>`).join('')}</div>
    ${mascot('cheer', 160)}
    <h1>${perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
    <div class="results">
      <div class="res y"><small>TOTAL XP</small><b>⚡ ${xp}</b></div>
      <div class="res g"><small>${acc >= 90 ? 'AMAZING' : 'ACCURACY'}</small><b>🎯 ${acc}%</b></div>
      <div class="res b"><small>TIME</small><b>⏱ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div>
    </div>
    <p class="muted">🔥 ${S.streak} day streak · +${first ? 10 : 2} 💎</p>
    <button class="btn green wide" data-act="home">CONTINUE</button></div>`;
  L = null;
}

/* ================= Events ================= */
let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; });

document.addEventListener('click', (e) => {
  const t = e.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.speak) { e.stopPropagation(); return speak(d.speak); }
  if (d.ob) { S.onboarded = true; if (d.ob === 'habits') S.tab = 'habits'; else { S.course = d.ob; S.tab = 'learn'; } save(); return render(); }
  if (d.tab) { S.tab = d.tab; save(); sfx.tap(); return render(); }
  if (d.course) { S.course = d.course; S.tab = 'learn'; save(); closeSheet(); return render(); }
  if (d.guide) return guideSheet(+d.guide);
  if (d.goal) { S.dailyGoal = +d.goal; save(); return render(); }
  if (d.lesson) {
    if (t.getAttribute('aria-disabled')) return toast('Finish the lessons above to unlock this one');
    return startLesson(d.lesson);
  }
  if (d.chest) {
    if (S.chests[d.chest]) return toast('Already opened');
    const [cid, ui] = d.chest.split(':'); const u = COURSES[cid].units[+ui];
    if (!u.lessons.every((l) => S.done[l.id])) return toast('Finish this unit to open the chest');
    S.chests[d.chest] = true; S.gems += 50; save(); sfx.win(); render(); return toast('+50 💎 from the chest!');
  }
  if (d.habit) {
    const h = S.habits.find((x) => x.id === d.habit); const t0 = today();
    if (h.log[t0]) { delete h.log[t0]; save(); } else { h.log[t0] = true; sfx.good(); addXP(5); }
    return render();
  }
  if (d.delhabit) { S.habits = S.habits.filter((x) => x.id !== d.delhabit); save(); return render(); }
  if (d.emo) { document.querySelectorAll('.emo').forEach((b) => b.classList.toggle('on', b === t)); return; }
  if (d.col) { document.querySelectorAll('.sw').forEach((b) => b.classList.toggle('on', b === t)); return; }

  if (L && !L.checked) {
    const q = L.queue[L.idx];
    if (d.opt !== undefined) { L.sel = +d.opt; sfx.tap(); document.querySelectorAll('[data-opt]').forEach((b) => b.classList.toggle('sel', b === t)); document.getElementById('check').disabled = false; const o = q.options[L.sel]; if (o.speak) speak(o.speak); return; }
    if (d.tile !== undefined) { if (!L.built.includes(+d.tile)) { L.built.push(+d.tile); sfx.tap(); updateBuilt(); } return; }
    if (d.unbuild !== undefined) { L.built.splice(+d.unbuild, 1); updateBuilt(); return; }
    if (d.ml !== undefined || d.mr !== undefined) return matchTap(t, d);
  }

  switch (d.act) {
    case 'courses': return coursesSheet();
    case 'hearts': return heartsSheet();
    case 'refill': if (S.gems >= 350) { S.gems -= 350; S.hearts = MAX_HEARTS; save(); closeSheet(); render(); toast('Hearts refilled!'); } return;
    case 'addhabit': return addHabitSheet();
    case 'sound': S.sound = !S.sound; save(); return render();
    case 'install': installPrompt?.prompt(); installPrompt = null; return;
    case 'reset': return confirmSheet('Reset all progress?', 'reset-yes');
    case 'reset-yes': try { localStorage.removeItem(KEY); } catch { /* ignore */ } S = structuredClone(DEFAULT); closeSheet(); return render();
    case 'check': return check();
    case 'skip': L.correct++; return next();
    case 'quit': return confirmSheet('Quit? You\'ll lose this lesson\'s progress.', 'quit-yes');
    case 'quit-yes': L = null; closeSheet(); return render();
    case 'home': return render();
  }
});

function matchTap(t, d) {
  const q = L.queue[L.idx]; const m = L.match;
  if (t.classList.contains('solved')) return;
  const side = d.ml !== undefined ? 'l' : 'r'; const k = +(d.ml ?? d.mr);
  if (side === 'l' && q.pairs[k] && /[a-záéíóúñ]/.test(q.pairs[k][0]) && S.course === 'es') speak(q.pairs[k][0]);
  if (!m.picked || m.picked.side === side) {
    document.querySelectorAll('.mt.sel').forEach((b) => b.classList.remove('sel'));
    t.classList.add('sel'); m.picked = { side, k, el: t }; sfx.tap(); return;
  }
  const a = m.picked; m.picked = null;
  if (a.k === k) {
    [a.el, t].forEach((b) => { b.classList.remove('sel'); b.classList.add('solved'); }); m.solved.add(k); sfx.good();
    if (m.solved.size === q.pairs.length) feedback(true, '');
  } else {
    [a.el, t].forEach((b) => { b.classList.remove('sel'); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 400); });
    sfx.bad();
  }
}

document.addEventListener('submit', (e) => {
  if (e.target.id !== 'habit-form') return;
  e.preventDefault();
  const name = document.getElementById('h-name').value.trim(); if (!name) return;
  S.habits.push({ id: 'h' + Date.now(), name, emoji: document.querySelector('.emo.on')?.dataset.emo || '⭐', color: document.querySelector('.sw.on')?.dataset.col || 'green', log: {} });
  save(); closeSheet(); S.tab = 'habits'; render();
});

document.addEventListener('keydown', (e) => {
  if (!L || document.querySelector('.sheet-back')) return;
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('check')?.click(); }
  if (/^[1-4]$/.test(e.key)) document.querySelector(`[data-opt="${+e.key - 1}"]`)?.click();
});

let toastT;
function toast(msg) {
  document.querySelector('.toast')?.remove(); clearTimeout(toastT);
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; document.body.appendChild(el);
  toastT = setTimeout(() => el.remove(), 2200);
}

setInterval(() => { if (!L && S.onboarded && S.hearts < MAX_HEARTS) { const h = S.hearts; regenHearts(); if (h !== S.hearts) { save(); render(); } } }, 60000);

render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* not available here */ });
}
