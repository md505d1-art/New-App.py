import { COURSES, CATEGORIES, gambitStart, GAMBITS, GCSE_MFL } from './courses.js';
import { avatarSVG, AV_OPTIONS, AV_LABELS, DEFAULT_AVATAR, randomAvatar } from './avatar.js';
import { hanaSay, bitSay, hanaRandom, bitRandom } from './voice.js';
import { learnLesson, recordAnswer, dueCount, buildReview, memoryScore } from './srs.js';
import { showReview } from './review.js';
import { startCall, callActive } from './call.js';
import { englishVoices, hanaVoice, voicesReady, canListen } from './speech.js';
import { onSpeaking, HANA_PITCH } from './voice.js';
import { mascot, bitIcon } from './mascot.js';
import { badge, icon, thumb, medal, sun, plant, col } from './art.js';
import { S, save, reset, addXP, addTime, streakAlive, today, dayOffset, esc, sfx, burst, countUp, toast } from './store.js';
import { startLesson, lessonActive } from './lesson.js';
import { startGame, gameActive } from './game.js';

const $app = document.getElementById('app');
let openCourse = null;
let lastKey = ''; let lastTab = 0;
let period = 'week';
let openAvatar = false; let avTab = 'hair'; let draftAv = null; let lastGame = null;
const myAvatar = (size) => avatarSVG(S.avatar || DEFAULT_AVATAR, size);
const glyphOf = (c) => c.flag || c.glyph;
const boardPills = (c) => (c.boards ? `<span class="boards">${c.boards.map((b) => `<i class="bp-${b.toLowerCase()}">${b}</i>`).join('')}</span>` : '');

/* ================= Helpers ================= */
const lessonsOf = (c) => c.units.flatMap((u, ui) => u.lessons.map((l, li) => ({ ...l, ui, li, unit: u })));
const progressOf = (c) => { const ls = lessonsOf(c); const done = ls.filter((l) => S.done[l.id]).length; return { done, total: ls.length, pct: ls.length ? done / ls.length : 0 }; };
const nextLesson = (c) => lessonsOf(c).find((l) => !S.done[l.id]) || null;
const unlocked = (c, id) => { const ls = lessonsOf(c); const i = ls.findIndex((x) => x.id === id); return i === 0 || !!S.done[ls[i - 1]?.id]; };
const started = () => Object.values(COURSES).filter((c) => progressOf(c).done > 0);
const starsOf = (id) => +S.done[id] || 0;
const starRow = (n) => `<span class="stars">${[1, 2, 3].map((k) => `<i class="${k <= n ? 'on' : ''}">★</i>`).join('')}</span>`;
const cv = (name) => { const [c, d, p] = col(name); return `--c:${c};--cd:${d};--cp:${p}`; };
const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const chev = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const checkSvg = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const fmtTime = (secs) => { const m = Math.round(secs / 60); return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`; };
const mastered = () => Object.values(COURSES).flatMap((c) => c.units.filter((u) => u.lessons.every((l) => S.done[l.id])).map((u) => ({ c, u })));

/* ================= Shell ================= */
const TABS = [
  ['home', 'Home', 'M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4.5v-6h-5v6H5a1 1 0 01-1-1z'],
  ['explore', 'Explore', 'M10.5 4a6.5 6.5 0 110 13 6.5 6.5 0 010-13zM15.5 15.5L20 20'],
  ['progress', 'Progress', 'M6 20V12M12 20V5M18 20v-9'],
  ['profile', 'Profile', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5c.8-3.6 3.9-6 7.5-6s6.7 2.4 7.5 6'],
];

function render() {
  if (!S.onboarded) return renderOnboarding();
  if (openAvatar) return renderAvatarBuilder();
  const key = openCourse ? `course:${openCourse}` : `tab:${S.tab}`;
  const ti = TABS.findIndex((t) => t[0] === S.tab);
  const anim = key === lastKey ? '' : openCourse ? 'push-in' : lastKey.startsWith('course:') ? 'pop-in-screen' : ti > lastTab ? 'slide-l' : ti < lastTab ? 'slide-r' : 'screen-in';
  lastTab = ti;
  const screens = { home: homeScreen, explore: exploreScreen, progress: progressScreen, profile: profileScreen };
  const body = openCourse ? courseScreen(COURSES[openCourse]) : (screens[S.tab] || homeScreen)();
  $app.innerHTML = `<div class="shell">
    <main class="main ${anim} ${openCourse ? 'no-nav' : ''}" id="main">${body}</main>
    ${openCourse ? '' : `<nav class="tabbar" aria-label="Main" style="--x:${ti}"><span class="tab-pill"></span>${TABS.map(([id, label, d]) => `<button class="tab ${S.tab === id ? 'on' : ''}" data-tab="${id}">
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="${d}" fill="${id === 'home' && S.tab === id ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><small>${label}</small></button>`).join('')}</nav>`}
  </div>`;
  if (key !== lastKey) document.getElementById('main').scrollTop = 0;
  lastKey = key;
  countUp($app);
  armReveal();
}

/* ================= Onboarding ================= */
function renderOnboarding() {
  $app.innerHTML = `<div class="onboard screen-in">
    <div class="ob-art">${thumb('purple')}<div class="ob-hana">${mascot('wave', 190)}</div></div>
    <div class="ob-body">
      <p class="eyebrow">Welcome to Sprout</p>
      <h1>Hi, I'm Hana!</h1>
      <p class="muted">This is Bit, my robot. We'll help you learn a little every day. What do you want to start with?</p>
      <div class="ob-grid">
        ${[['school', 'School', 'GCSE subjects', 'literature', 'purple'], ['language', 'Languages', `${CATEGORIES[1].blurb}`, 'english', 'blue'],
          ['chess', 'Chess', 'Play against Hana', 'chess', 'green'], ['habits', 'Habits', 'Streaks and books', 'habit', 'red']]
          .map(([id, t, s, ic, c], i) => `<button class="topic" data-ob="${id}" style="${cv(c)};--i:${i}"><span class="topic-ic">${icon(ic, c, 30)}</span><b>${t}</b><small>${s}</small></button>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ================= Home ================= */
function greeting() { const h = new Date().getHours(); return h < 12 ? 'Good morning,' : h < 18 ? 'Good afternoon,' : 'Good evening,'; }
function weekDays() { const d = new Date(); const back = (d.getDay() + 6) % 7; return [...Array(7)].map((_, k) => dayOffset(k - back)); }

function hanaLine() {
  const due = dueCount(); const s = streakAlive() ? S.streak : 0;
  if (due) return `You have ${due} fact${due === 1 ? '' : 's'} ready to revise. Let's keep them fresh!`;
  if (s >= 3) return `${s} days in a row! Bit is doing a happy dance.`;
  return 'Pick up where you left off, or try something new today.';
}
function reviewCard() {
  const learned = Object.keys(S.mem || {}).length; if (!learned) return '';
  const due = dueCount();
  return `<button class="revise-card rise" style="--i:2" data-act="revise">${bitIcon(54)}<span class="rv-txt"><b>Smart revise</b><small>${due ? `${due} fact${due === 1 ? '' : 's'} due today` : 'All caught up. Practise your weakest facts.'}</small></span><span class="start-pill">${due ? 'Revise' : 'Practise'}</span></button>`;
}

function homeScreen() {
  const t = today(); const streak = streakAlive() ? S.streak : 0;
  const cont = S.course && COURSES[S.course] ? COURSES[S.course] : started()[0];
  const nl = cont && nextLesson(cont); const ls = cont ? lessonsOf(cont) : [];
  const p = cont ? progressOf(cont) : null;
  const suggest = Object.values(COURSES).filter((c) => !progressOf(c).done && c.id !== cont?.id);
  const picks = [suggest.find((c) => c.cat === 'school'), suggest.find((c) => c.cat === 'language'), suggest.find((c) => c.cat === 'chess') || suggest.filter((c) => c.cat === 'school')[1]].filter(Boolean);
  const habits = S.habits;
  return `<div class="home">
    <div class="aurora" aria-hidden="true"><i></i><i></i><i></i><span class="sparks">${'<b></b>'.repeat(10)}</span></div>
    <header class="home-head">
      <div><p class="hello">${greeting()}${S.name ? ` ${esc(S.name)}` : ''}</p><h1 class="headline">${streak ? 'Keep going!' : 'Let\'s begin!'} ${sun(36)}</h1>
        <p class="lead">A little progress each day leads to big results.</p></div>
      <div class="head-btns"><button class="call-btn" data-act="call" aria-label="Call Hana"><span class="pulse"></span>📞</button>
        <button class="avatar-btn" data-tab="profile" aria-label="Your profile">${myAvatar(60)}</button></div>
    </header>

    <section class="streak-card rise" style="--i:1">
      <div class="streak-top"><span class="flame-ic">${icon('flame', 'red', 30, true)}</span>
        <div class="streak-num"><b data-count="${streak}">0</b><span>day streak</span></div>
        <div class="days">${weekDays().map((d) => `<span><small>${'MTWTFSS'[(new Date(d + 'T12:00').getDay() + 6) % 7]}</small><i class="${S.xpByDay[d] ? 'on' : ''} ${d === t ? 'today' : ''}">${S.xpByDay[d] ? checkSvg : ''}</i></span>`).join('')}</div></div>
      <p>${streak > 1 ? `Awesome! You've been learning for ${streak} days in a row.` : streak === 1 ? 'Great start! Come back tomorrow to grow your streak.' : 'Finish a lesson today to start your streak.'}</p>
    </section>

    <section class="hana-card rise" style="--i:1">${mascot('happy', 92)}<div class="hc-bubble"><b>Hana</b><p>${esc(hanaLine())}</p>
      <button class="hc-call" data-act="call"><span>📞</span> Call me. I'll teach you anything</button></div></section>
    <div class="quick rise" style="--i:1">
      <button data-act="call"><span>📞</span>Call Hana</button>
      <button data-act="revise"><span>🧠</span>Revise</button>
      <button data-open="chess"><span>♞</span>Chess</button>
      <button data-tab="explore"><span>🔎</span>Explore</button>
    </div>

    ${reviewCard()}

    <div class="sec-row rise" style="--i:2"><h2>Continue learning</h2><button class="see-all" data-tab="explore">See all ${arrow}</button></div>
    ${cont ? `<button class="continue-card rise" style="--i:2;${cv(cont.color)}" data-open="${cont.id}">
        <span class="cc-thumb">${thumb(cont.color)}${glyphOf(cont) ? `<span class="cc-flag">${glyphOf(cont)}</span>` : ''}</span>
        <span class="cc-body"><b>${esc(cont.name)}</b><small>${nl ? `Lesson ${ls.indexOf(ls.find((x) => x.id === nl.id)) + 1} of ${ls.length}` : 'All lessons done'}</small>
          <span class="cc-prog"><span class="bar"><i style="width:${p.pct * 100}%"></i></span><em>${Math.round(p.pct * 100)}%</em></span></span>
        <span class="round-btn">${chev}</span></button>`
      : `<button class="continue-card empty rise" style="--i:2;${cv('purple')}" data-tab="explore"><span class="cc-thumb">${thumb('purple')}</span><span class="cc-body"><b>Pick your first course</b><small>School, languages or chess</small></span><span class="round-btn">${chev}</span></button>`}

    <div class="sec-row rise" style="--i:3"><h2>Explore new topics</h2><button class="see-all" data-tab="explore">See all ${arrow}</button></div>
    <div class="topics rise" style="--i:3">${picks.map((c, i) => `<button class="topic" data-open="${c.id}" style="${cv(c.color)};--i:${i}">
        <span class="topic-ic">${glyphOf(c) ? `<span class="flag-badge">${glyphOf(c)}</span>` : icon(c.icon, c.color, 30)}</span><b>${esc(c.name)}</b><small>${lessonsOf(c).length} lessons</small></button>`).join('')}</div>

    <div class="sec-row rise" style="--i:4"><h2>Today's habits</h2><button class="see-all" data-act="addhabit">+ Add</button></div>
    <section class="list-card rise" style="--i:4">
      ${habits.length ? habits.map((h) => {
        let n = 0; let k = h.log[t] ? 0 : -1; while (h.log[dayOffset(k)]) { n++; k--; }
        return `<div class="row" style="${cv(h.color)}"><span class="row-ic">${h.emoji}</span><span class="row-txt"><b>${esc(h.name)}</b><small>${n ? `🔥 ${n} day${n === 1 ? '' : 's'}` : 'Not started yet'}</small></span>
          <button class="x-btn" data-delhabit="${h.id}" aria-label="Delete ${esc(h.name)}">✕</button>
          <button class="tick ${h.log[t] ? 'on' : ''}" data-habit="${h.id}" aria-label="Mark ${esc(h.name)} done">${checkSvg}</button></div>`;
      }).join('') : '<p class="muted pad">No habits yet. Add one to start a streak.</p>'}
    </section>
  </div>`;
}

/* ================= Explore ================= */
function mflSection() {
  const list = GCSE_MFL.filter((m) => S.board === 'all' || m.boards.includes(S.board));
  return `<div class="sec-row sub"><h2>GCSE languages</h2><span class="muted small">Opens the matching language course</span></div>
    <div class="topics grid">${list.map((m) => { const id = m.course || (m.code ? `lang:${m.code}` : null); const c = id && COURSES[id];
      return `<button class="topic ${c ? '' : 'soon'}" ${c ? `data-open="${id}"` : 'disabled'} data-name="${esc(`${m.name} gcse`.toLowerCase())}" style="${cv(c ? c.color : 'purple')}">
        <span class="topic-ic">${c ? (glyphOf(c) ? `<span class="flag-badge">${glyphOf(c)}</span>` : icon(c.icon, c.color, 30)) : '<span class="flag-badge">🗣️</span>'}</span><b>${esc(m.name)}</b><small>${c ? 'GCSE language' : 'Course coming soon'}</small>${boardPills(m)}</button>`; }).join('')}</div>`;
}

function exploreScreen() {
  const cats = S.lib === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.id === S.lib);
  return `<div class="explore">
    <header class="page-head"><h1>Explore</h1><p class="lead">${Object.keys(COURSES).length} courses for school, languages and chess.</p></header>
    <label class="search"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
      <input id="lib-q" type="search" placeholder="Search subjects and languages" autocomplete="off" aria-label="Search courses"></label>
    <div class="seg-tabs">${[['all', 'All'], ...CATEGORIES.map((c) => [c.id, c.name])].map(([id, n]) => `<button class="${S.lib === id ? 'on' : ''}" data-lib="${id}">${n}</button>`).join('')}</div>
    ${cats.map((cat) => `<section class="cat" data-cat="${cat.id}"><div class="sec-row"><h2>${cat.name}</h2><span class="muted small">${cat.blurb}</span></div>
      ${cat.id === 'school' ? `<div class="board-row"><span class="muted small">Exam board</span><div class="seg-tabs small">${['all', 'AQA', 'Edexcel', 'Eduqas'].map((b) => `<button class="${S.board === b ? 'on' : ''}" data-board="${b}">${b === 'all' ? 'All' : b}</button>`).join('')}</div></div>` : ''}
      <div class="topics grid">${Object.values(COURSES).filter((c) => c.cat === cat.id && (cat.id !== 'school' || S.board === 'all' || c.boards?.includes(S.board))).map((c, i) => { const p = progressOf(c); return `<button class="topic" data-open="${c.id}" data-name="${esc(`${c.name} ${c.sub || ''}`.toLowerCase())}" style="${cv(c.color)};--i:${Math.min(i, 12)}">
        <span class="topic-ic">${glyphOf(c) ? `<span class="flag-badge">${glyphOf(c)}</span>` : icon(c.icon, c.color, 30)}</span><b>${esc(c.name)}</b><small>${p.done ? `${p.done} of ${p.total} lessons` : `${p.total} lessons`}</small>
        ${c.cat === 'school' ? boardPills(c) : ''}${p.done ? `<span class="bar thin"><i style="width:${p.pct * 100}%"></i></span>` : ''}</button>`; }).join('')}</div>
      ${cat.id === 'school' ? mflSection() : ''}</section>`).join('')}
    <p class="muted empty-search" id="no-results" hidden>No courses match that search.</p>
  </div>`;
}

/* ================= Course ================= */
function lessonMeta(l) {
  if (l.kind === 'play') return `vs Hana · ${l.play.levelName}`;
  if (l.kind === 'quiz') return 'Review quiz';
  if (l.words) return l.words.map((w) => w.t).join(', ');
  if (l.qs) return `${l.qs.length + 2} questions · ${l.terms.length} key terms`;
  if (l.items) return `${l.items.length} key events`;
  if (l.signs) return l.signs.map((x) => x.word).join(', ');
  return '';
}

function courseScreen(c) {
  const p = progressOf(c); const nl = nextLesson(c);
  let n = 0;
  return `<div class="course" style="${cv(c.color)}">
    <header class="bar-head"><button class="nav-ic" data-act="back" aria-label="Back"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <b>${esc(CATEGORIES.find((x) => x.id === c.cat)?.name || '')}</b><span class="nav-ic ghost"></span></header>
    <section class="course-hero rise">
      <div class="ch-art">${thumb(c.color)}${glyphOf(c) ? `<span class="cc-flag big">${glyphOf(c)}</span>` : `<span class="ch-ico">${badge(c, 54)}</span>`}</div>
      <div class="ch-text"><h1>${esc(c.name)}</h1><p>${esc(c.sub || '')}</p>${boardPills(c)}${memoryScore(c) != null ? `<span class="mem-chip">🧠 Memory ${memoryScore(c)}%</span>` : ''}
        <span class="cc-prog"><span class="bar"><i style="width:${p.pct * 100}%"></i></span><em>${p.done}/${p.total}</em></span></div>
    </section>
    ${c.note ? `<p class="note">${esc(c.note)}</p>` : ''}
    ${c.id === 'chess' ? `<section class="list-card free rise" style="--i:1"><div class="free-top">${mascot('think', 64)}<div><b>Free play vs Hana</b><small>A full game from move one. I'll grade every move you make.</small></div></div>
      <div class="seg-tabs">${[1, 2, 3].map((lv) => `<button data-free="${lv}">${['', 'Easy', 'Medium', 'Hard'][lv]}</button>`).join('')}</div></section>` : ''}
    ${c.units.map((u, ui) => `<section class="chapter rise" style="${cv(u.color)};--i:${ui + 2}">
      <div class="chap-head"><span class="chap-num">${ui + 1}</span><div><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></div>
        <button class="guide-btn" data-guide="${ui}">Guide</button></div>
      <div class="lessons">${u.lessons.map((l) => {
        n++;
        const st = S.done[l.id] ? 'done' : l.id === nl?.id ? 'next' : unlocked(c, l.id) ? 'open' : 'locked';
        const mark = st === 'done' ? checkSvg : st === 'locked' ? '<svg viewBox="0 0 24 24" width="16" height="16"><rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" stroke-width="2.4" fill="none"/></svg>' : l.kind === 'play' ? '♞' : n;
        return `<button class="lesson-row ${st}" data-lesson="${l.id}"><span class="lr-mark">${mark}</span>
          <span class="lr-txt"><b>${esc(l.title)}</b><small${c.tts && l.words ? ` lang="${c.tts}"` : ''}>${esc(lessonMeta(l))}</small></span>
          ${st === 'done' ? starRow(starsOf(l.id)) : st === 'next' ? `<span class="start-pill">${l.kind === 'play' ? 'Play' : 'Start'}</span>` : `<span class="lr-chev">${chev}</span>`}</button>`;
      }).join('')}</div>
    </section>`).join('')}
  </div>`;
}

/* ================= Progress ================= */
function series() {
  const secsOn = (d) => S.timeByDay[d] || 0;
  if (period === 'week') {
    const days = weekDays(); const prev = days.map((d) => { const x = new Date(d + 'T12:00'); x.setDate(x.getDate() - 7); return today(x); });
    return { label: 'total this week', vs: 'from last week', bars: days.map((d) => ({ l: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(new Date(d + 'T12:00').getDay() + 6) % 7], v: secsOn(d), cur: d === today() })),
      prev: prev.reduce((a, d) => a + secsOn(d), 0) };
  }
  if (period === 'month') {
    const bars = [3, 2, 1, 0].map((w) => { let v = 0; for (let k = 0; k < 7; k++) v += secsOn(dayOffset(-(w * 7 + k))); const s = new Date(); s.setDate(s.getDate() - (w * 7 + 6)); return { l: s.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }), v, cur: w === 0 }; });
    let prev = 0; for (let k = 28; k < 56; k++) prev += secsOn(dayOffset(-k));
    return { label: 'total in the last 4 weeks', vs: 'from the 4 weeks before', bars, prev };
  }
  const now = new Date();
  const bars = [5, 4, 3, 2, 1, 0].map((m) => { const d = new Date(now.getFullYear(), now.getMonth() - m, 1); const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return { l: d.toLocaleDateString(undefined, { month: 'short' }), v: Object.entries(S.timeByDay).filter(([k]) => k.startsWith(key)).reduce((a, [, v]) => a + v, 0), cur: m === 0 }; });
  return { label: 'total in the last 6 months', bars, prev: null };
}

function progressScreen() {
  const s = series(); const total = s.bars.reduce((a, b) => a + b.v, 0);
  const maxMin = Math.max(30, ...s.bars.map((b) => b.v / 60)); const top = Math.ceil(maxMin / 30) * 30;
  const change = s.prev ? Math.round(((total - s.prev) / s.prev) * 100) : null;
  const lessons = Object.keys(S.done).length; const m = mastered(); const plants = started();
  const stage = (c) => { const p = progressOf(c).pct; return p >= 1 ? 4 : p >= 0.5 ? 3 : p >= 0.2 ? 2 : 1; };
  return `<div class="progress">
    <header class="prog-head"><div><h1>Your progress</h1><p class="lead">Consistency creates change.</p></div><div class="medal-wrap">${medal(lessons ? 'Great job!' : 'Let\'s go!', 116)}</div></header>
    <div class="seg-tabs big">${[['week', 'Week'], ['month', 'Month'], ['all', 'All time']].map(([id, n]) => `<button class="${period === id ? 'on' : ''}" data-period="${id}">${n}</button>`).join('')}</div>
    <section class="card activity rise" style="--i:1">
      <div class="act-top"><div><span class="card-label">Learning activity</span><b class="big-num">${fmtTime(total)}</b><small>${s.label}</small></div>
        ${change !== null ? `<div class="change ${change < 0 ? 'down' : ''}"><span>${change < 0 ? '↓' : '↑'} ${Math.abs(change)}%</span><small>${s.vs}</small></div>` : ''}</div>
      <div class="chart"><div class="y-axis"><span>${top}m</span><span>${top / 2}m</span><span>0m</span></div>
        <div class="bars">${s.bars.map((b, i) => `<div class="bcol"><i class="${b.cur ? 'cur' : ''}" style="--h:${Math.max(2, (b.v / 60 / top) * 100)}%;--i:${i}" title="${fmtTime(b.v)}"></i><small>${esc(b.l)}</small></div>`).join('')}</div></div>
    </section>
    <div class="stat-pair rise" style="--i:2">
      <div class="card stat"><span class="stat-ic" style="${cv('red')}">${icon('book', 'red', 28)}</span><div><b data-count="${lessons}">0</b><small>lessons completed</small></div></div>
      <div class="card stat"><span class="stat-ic" style="${cv('blue')}">${icon('target', 'blue', 28)}</span><div><b data-count="${m.length}">0</b><small>topics mastered</small></div></div>
    </div>
    <div class="sec-row rise" style="--i:3"><h2>Mastered topics</h2><button class="see-all" data-tab="explore">Explore ${arrow}</button></div>
    <section class="list-card rise" style="--i:3">${m.length ? m.slice(0, 8).map(({ c, u }) => `<button class="row" data-open="${c.id}">${badge(c, 46)}<span class="row-txt"><b>${esc(u.title)}</b><small>${u.lessons.length} lessons · ${esc(c.name)}</small></span><span class="ok-dot">${checkSvg}</span></button>`).join('')
      : '<p class="muted pad">Finish every lesson in a chapter to master it. Mastered topics show up here.</p>'}</section>
    ${plants.length ? `<div class="sec-row rise" style="--i:4"><h2>Your garden</h2><span class="muted small">One plant per course</span></div>
      <section class="garden rise" style="--i:4">${plants.map((c, i) => `<button class="plot" data-open="${c.id}" style="--i:${i}">${plant(stage(c), c.color, 56)}<b>${c.flag ? `${c.flag} ` : ''}${esc(c.name)}</b><small>${Math.round(progressOf(c).pct * 100)}%</small></button>`).join('')}</section>` : ''}
    <div class="sec-row rise" style="--i:5"><h2>Chess game review</h2></div>
    <section class="list-card rise" style="--i:5">${S.games.length ? S.games.slice(0, 6).map((g) => `<div class="row"><span class="res-chip r-${g.result}">${{ win: 'Won', draw: 'Draw', loss: 'Lost' }[g.result]}</span>
        <span class="row-txt"><b>${esc(g.title)}</b><small>${esc(g.date)} · ${['', 'Easy', 'Medium', 'Hard'][g.level]} · ${g.accuracy}% accuracy</small>
        ${g.worst ? `<small class="worst">Avoid next time: <span class="mono">${esc(g.worst.move)}${esc(g.worst.san)}</span> (${esc(g.worst.label)})${g.worst.best ? `, <span class="mono">${esc(g.worst.best)}</span> was better` : ''}</small>` : '<small class="worst ok">No big mistakes. Nice!</small>'}</span></div>`).join('')
      : '<p class="muted pad">Play a chess game and it will show up here, with the one mistake to avoid next time.</p>'}</section>
  </div>`;
}

/* ================= Profile ================= */
function profileScreen() {
  const badges = [
    ['🔥', 'Spark', '3-day streak', S.streak >= 3], ['🌸', 'First bloom', 'Finish a course', Object.values(COURSES).some((c) => progressOf(c).pct >= 1)],
    ['💯', 'Flawless', '3 stars on a lesson', Object.values(S.done).some((v) => +v >= 3)], ['♚', 'Checkmate', 'Beat Hana at chess', S.wins >= 1],
    ['🎓', 'Scholar', '3 school subjects', Object.values(COURSES).filter((c) => c.cat === 'school' && progressOf(c).done).length >= 3],
    ['🌍', 'Polyglot', 'Start 3 languages', Object.values(COURSES).filter((c) => c.cat === 'language' && progressOf(c).done).length >= 3],
    ['📚', 'Bookworm', 'Finish a book', S.books.some((b) => b.status === 'done')], ['🌳', 'Evergreen', '1,000 XP', S.xp >= 1000],
  ];
  return `<div class="profile">
    <section class="profile-card rise"><div class="pc-av">${myAvatar(108)}</div>
      <div class="pc-text"><h1>${esc(S.name || 'Your profile')}</h1><p>${started().length} courses · ${Object.keys(S.done).length} lessons</p>
        <div class="chips"><span>🔥 ${streakAlive() ? S.streak : 0} day streak</span><span>⚡ ${S.xp} XP</span><span>🌱 ${S.seeds} seeds</span></div>
        <button class="edit-av" data-act="avatar">✏️ Edit your character</button></div></section>
    <div class="sec-row rise" style="--i:1"><h2>Badges</h2></div>
    <div class="badges rise" style="--i:1">${badges.map(([e, n, d, ok]) => `<div class="bdg ${ok ? 'got' : ''}"><span>${e}</span><b>${n}</b><small>${d}</small></div>`).join('')}</div>
    <div class="sec-row rise" style="--i:2"><h2>Bookshelf</h2><button class="see-all" data-act="addbook">+ Add book</button></div>
    <section class="list-card rise" style="--i:2">${S.books.length ? S.books.map((b) => `<div class="row"><span class="spine s-${b.status}"></span><span class="row-txt"><b>${esc(b.title)}</b><small>${esc(b.author || 'Unknown author')}${b.notes ? ` · ${esc(b.notes)}` : ''}</small></span>
        <button class="status st-${b.status}" data-book="${b.id}">${{ want: 'Want to read', reading: 'Reading', done: 'Finished' }[b.status]}</button>
        <button class="x-btn" data-delbook="${b.id}" aria-label="Remove ${esc(b.title)}">✕</button></div>`).join('')
      : '<p class="muted pad">Track what you\'re reading. Tap a book\'s status to move it along.</p>'}</section>
    <div class="sec-row rise" style="--i:3"><h2>Settings</h2></div>
    <section class="list-card settings rise" style="--i:3">
      <label class="set-row" for="set-name"><span>Your name</span><input id="set-name" maxlength="24" placeholder="Optional" value="${esc(S.name)}"></label>
      <div class="set-row"><span>Daily goal</span><div class="seg-tabs small">${[10, 20, 30, 50].map((g) => `<button class="${S.dailyGoal === g ? 'on' : ''}" data-goal="${g}">${g} XP</button>`).join('')}</div></div>
      <div class="set-row"><span>Exam board</span><div class="seg-tabs small">${['all', 'AQA', 'Edexcel', 'Eduqas'].map((b) => `<button class="${S.board === b ? 'on' : ''}" data-board="${b}">${b === 'all' ? 'All' : b}</button>`).join('')}</div></div>
      <button class="set-row" data-act="sound"><span>Sound effects</span><b>${S.sound ? 'On' : 'Off'}</b></button>
      <button class="set-row" data-act="voice"><span>Hana and Bit's voices</span><b>${S.voice ? 'On' : 'Off'}</b></button>
      <div class="set-row col"><span>Hana's voice</span>
        <select id="set-hvoice" aria-label="Hana's voice"><option value="">Automatic (most like Kimberly)</option>${englishVoices().map((v) => `<option value="${esc(v.name)}" ${S.hanaVoice === v.name ? 'selected' : ''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}</select>
        <div class="seg-tabs small">${Object.keys(HANA_PITCH).map((p) => `<button class="${S.hanaPitch === p ? 'on' : ''}" data-pitch="${p}">${p[0].toUpperCase() + p.slice(1)}</button>`).join('')}<button data-act="preview-voice">▶ Preview</button></div>
        <small class="muted">Now using: ${esc(hanaVoice(S.hanaVoice)?.name || 'your phone\'s default voice')}</small></div>
      <button class="set-row" data-act="handsfree"><span>Hands-free calls</span><b>${S.handsFree ? 'On' : 'Off'}</b></button>
      <div class="set-row col"><span>Hana AI (online, optional)</span>
        <small class="muted">Add your own Anthropic API key and Hana can chat about anything using Claude when you're online. The key stays on this device and is only sent to Anthropic. Anthropic charges you for usage. Without a key, calls use the offline tutor.</small>
        <input id="set-aikey" type="password" autocomplete="off" placeholder="sk-ant-…" value="${esc(S.aiKey)}" aria-label="Anthropic API key">
        <div class="seg-tabs small"><button class="${S.aiOn ? 'on' : ''}" data-act="ai-toggle">${S.aiOn ? 'On' : 'Off'}</button><button data-act="ai-test">Test key</button></div></div>
      <div class="set-row"><span>Offline learning</span><b class="${navigator.onLine ? '' : 'off'}" id="offline-state">${offlineText()}</b></div>
      ${installPrompt ? '<button class="set-row" data-act="install"><span>Install Sprout</span><b>Add to home screen</b></button>' : ''}
      <button class="set-row danger" data-act="reset"><span>Reset all progress</span></button>
    </section>
  </div>`;
}

/* ================= Sheets ================= */
function sheet(html) {
  document.querySelector('.sheet-back')?.remove();
  const el = document.createElement('div');
  el.className = 'sheet-back'; el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><span class="grabber"></span>${html}</div>`;
  el.addEventListener('click', (e) => { if (e.target === el || e.target.closest('[data-close]')) closeSheet(); });
  document.body.appendChild(el);
}
function closeSheet() { const s = document.querySelector('.sheet-back'); if (!s) return; s.classList.add('closing'); setTimeout(() => s.remove(), 160); }

function guideSheet(c, ui) {
  const u = c.units[ui];
  sheet(`<h2>${esc(u.title)}</h2><p class="muted">${esc(u.desc)}</p>
    <div class="guide">${u.guide.map((g) => `<div class="g-row"><b dir="auto">${esc(g.term)}</b><span>${esc(g.def)}</span></div>`).join('')}</div>
    <button class="primary-btn" data-close>Got it</button>`);
}
const EMOJIS = ['💧', '📚', '🧘', '🏃', '🥗', '😴', '🎸', '✍️', '🧹', '💊', '🚶', '♟️', '🗣️', '🌞', '📵', '🦷'];
const HCOLORS = ['purple', 'blue', 'green', 'red', 'yellow'];
function addHabitSheet() {
  sheet(`<h2>New habit</h2><form id="habit-form" class="form">
    <label for="h-name">Name</label><input id="h-name" maxlength="40" placeholder="e.g. Practise guitar" required autocomplete="off">
    <span class="lbl">Icon</span><div class="emoji-grid">${EMOJIS.map((e, k) => `<button type="button" class="emo ${k === 0 ? 'on' : ''}" data-emo="${e}">${e}</button>`).join('')}</div>
    <span class="lbl">Colour</span><div class="color-row">${HCOLORS.map((c, k) => `<button type="button" class="sw ${k === 0 ? 'on' : ''}" style="${cv(c)}" data-col="${c}" aria-label="${c}"></button>`).join('')}</div>
    <button class="primary-btn" type="submit">Add habit</button></form>`);
  setTimeout(() => document.getElementById('h-name')?.focus(), 60);
}
function addBookSheet() {
  sheet(`<h2>Add a book</h2><form id="book-form" class="form">
    <label for="b-title">Title</label><input id="b-title" maxlength="80" required autocomplete="off" placeholder="e.g. An Inspector Calls">
    <label for="b-author">Author</label><input id="b-author" maxlength="60" autocomplete="off" placeholder="Optional">
    <label for="b-notes">Key idea or favourite quote</label><input id="b-notes" maxlength="120" autocomplete="off" placeholder="Optional">
    <button class="primary-btn" type="submit">Add to bookshelf</button></form>`);
  setTimeout(() => document.getElementById('b-title')?.focus(), 60);
}
function confirmSheet(text, act) {
  sheet(`<div class="center">${mascot('sad', 96)}<h2>${text}</h2>
    <button class="primary-btn danger" data-act="${act}">Yes</button><button class="text-btn" data-close>Cancel</button></div>`);
}

/* ================= Lessons, games, results ================= */
let pendingQuit = null;
const quitter = (clear) => { pendingQuit = clear; confirmSheet('Leave this lesson? Your progress in it won\'t be saved.', 'quit-yes'); };

function begin(courseId, lessonId) {
  const c = COURSES[courseId]; const ls = lessonsOf(c); const l = ls.find((x) => x.id === lessonId);
  S.course = courseId; save(); closeSheet();
  if (l.kind === 'play') {
    const g = gambitStart(l.play.key);
    return startGame({ fen: g.fen, side: g.side, level: l.play.level, title: g.name, idea: g.idea, prefix: g.moves, lessonId: l.id,
      intro: `Let's play the <b>${esc(g.name)}</b>. You're ${g.side === 'w' ? 'White' : 'Black'}.<br><small>${esc(g.idea)}</small>` }, gameCallbacks);
  }
  startLesson(c, l, { onDone: (r) => lessonDone(c, l, r), onQuit: quitter, onAnswer: (q, ok) => q.fact && S.mem?.[q.fact] && recordAnswer(q.fact, ok), index: ls.indexOf(l) + 1, count: ls.length });
}
function nextAfter(c, id) { const ls = lessonsOf(c); const i = ls.findIndex((x) => x.id === id); return ls[i + 1] || null; }

function lessonDone(c, l, r) {
  const first = !S.done[l.id];
  S.done[l.id] = Math.max(starsOf(l.id), r.stars);
  learnLesson(c, l);
  hanaSay(r.stars === 3 ? 'Perfect lesson! Amazing!' : 'Lesson complete! Great work.');
  const xp = 10 + r.stars * 2 + (r.bestCombo >= 5 ? 5 : 0); const seeds = first ? 5 + r.stars : 1;
  S.seeds += seeds; addXP(xp); addTime(r.secs); sfx.win();
  const nx = nextAfter(c, l.id);
  results({ title: r.stars === 3 ? 'Perfect lesson!' : 'Lesson complete!', sub: esc(l.title), stars: r.stars, color: c.color,
    stats: [['⚡', 'XP earned', xp, ''], ['🎯', 'First try', r.accuracy, '%'], ['⏱', 'Time', Math.max(1, Math.round(r.secs / 60)), ' min']],
    buttons: [nx ? `<button class="primary-btn" data-start-next="${c.id}|${nx.id}">Next lesson ${arrow}</button>` : '',
      `<button class="text-btn" data-act="to-course" data-course="${c.id}">Back to ${esc(c.name)}</button>`] });
}

function results({ title, sub = '', stars = 0, color = 'purple', stats, buttons, good = true, note = '' }) {
  $app.innerHTML = `<div class="results" style="${cv(color)}">
    ${good ? `<div class="confetti">${[...Array(30)].map((_, k) => `<i style="--l:${(k * 37) % 100}%;--d:${(k % 8) * 0.12}s;--r:${(k * 47) % 360}deg;--c:${['#6c4ce0', '#ffb02e', '#ef5a5a', '#2fa36b', '#3b82f6'][k % 5]}"></i>`).join('')}</div>` : ''}
    <div class="res-art"><div class="res-medal">${medal(good ? 'Great job!' : 'Try again!', 150)}</div><div class="res-hana">${mascot(good ? 'cheer' : 'sad', 120)}</div></div>
    <h1>${title}</h1>${sub ? `<p class="lead">${sub}</p>` : ''}
    ${stars ? `<div class="big-stars">${[1, 2, 3].map((k) => `<i class="${k <= stars ? 'on' : ''}" style="--i:${k}">★</i>`).join('')}</div>` : ''}
    <div class="res-stats">${stats.map(([e, label, v, suf], i) => `<div class="card" style="--i:${i}"><span>${e}</span><b data-count="${v}" data-suffix="${suf}">0</b><small>${label}</small></div>`).join('')}</div>
    ${note}
    <div class="res-btns">${buttons.join('')}</div>
  </div>`;
  countUp($app);
}

const gameCallbacks = {
  seeds: () => S.seeds, sfx, avatar: (size) => myAvatar(size), name: () => S.name || 'You',
  spendSeeds(n) { if (S.seeds < n) { toast('Not enough seeds. Finish lessons or win games to earn more.'); return false; } S.seeds -= n; save(); return true; },
  onQuit: quitter, onFinish: gameDone,
};
function startFree(level) {
  const side = Math.random() < 0.5 ? 'w' : 'b';
  startGame({ side, level, title: 'Free play', intro: `New game! You're ${side === 'w' ? 'White, so you move first' : 'Black, so I move first'}.` }, gameCallbacks);
}
function gameDone(r) {
  const pass = r.result !== 'loss';
  const xp = r.result === 'win' ? 15 + r.level * 5 : r.result === 'draw' ? 10 : 3;
  let seeds = r.result === 'win' ? 10 * r.level : r.result === 'draw' ? 3 : 0;
  if (r.lessonId && pass) { if (!S.done[r.lessonId]) seeds += 10; S.done[r.lessonId] = Math.max(starsOf(r.lessonId), r.result === 'win' ? (r.accuracy >= 80 ? 3 : 2) : 1); }
  if (r.result === 'win') S.wins = (S.wins || 0) + 1;
  S.games.unshift({ date: new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' }), title: r.title, result: r.result, accuracy: r.accuracy, level: r.level, worst: r.worst });
  S.games = S.games.slice(0, 20);
  S.seeds += seeds; addXP(xp); addTime(r.secs);
  lastGame = r;
  if (pass) sfx.win(); else sfx.bad();
  const nx = r.lessonId ? nextAfter(COURSES.chess, r.lessonId) : null;
  results({ title: r.result === 'win' ? 'You won!' : r.result === 'draw' ? 'It\'s a draw!' : 'Hana won this one', sub: `${esc(r.how)} · ${r.moves} moves`, good: pass, color: pass ? 'green' : 'red',
    stats: [['⚡', 'XP earned', xp, ''], ['🎯', 'Accuracy', r.accuracy, '%'], ['🌱', 'Seeds', seeds, '']],
    note: r.worst ? `<p class="review-note">Watch out for <span class="mono">${esc(r.worst.move)}${esc(r.worst.san)}</span> (${esc(r.worst.label)})${r.worst.best ? `. <span class="mono">${esc(r.worst.best)}</span> was better.` : '.'}</p>` : '',
    buttons: [
      `<button class="primary-btn review-btn" data-act="game-review">🔍 Game review</button>`,
      r.lessonId && !pass ? `<button class="primary-btn ghost-btn" data-start-next="chess|${r.lessonId}">Try again ${arrow}</button>` : '',
      r.lessonId && pass && nx ? `<button class="primary-btn ghost-btn" data-start-next="chess|${nx.id}">Next game ${arrow}</button>` : '',
      !r.lessonId ? `<button class="primary-btn ghost-btn" data-free="${r.level}">Play again ${arrow}</button>` : '',
      `<button class="text-btn" data-act="${r.lessonId ? 'to-course' : 'home'}" data-course="chess">Continue</button>`] });
}

/* ================= Character creator ================= */
function renderAvatarBuilder() {
  const opts = AV_OPTIONS[avTab]; const isColor = /color|skin|eyes|bg/i.test(avTab);
  $app.innerHTML = `<div class="avb">
    <header class="bar-head"><button class="nav-ic" data-act="av-cancel" aria-label="Cancel">✕</button><b>Your character</b><button class="text-link" data-act="av-save">Save</button></header>
    <div class="avb-preview">${avatarSVG(draftAv, 200)}<button class="dice" data-act="av-random" aria-label="Random character">🎲 Surprise me</button></div>
    <div class="avb-tabs">${Object.keys(AV_OPTIONS).map((k) => `<button class="${avTab === k ? 'on' : ''}" data-avtab="${k}">${AV_LABELS[k]}</button>`).join('')}</div>
    <div class="avb-grid ${isColor ? 'colors' : ''}">${opts.map((v, i) => isColor
      ? `<button class="swatch ${draftAv[avTab] === i ? 'on' : ''}" data-av="${avTab}:${i}" style="background:${v}" aria-label="${AV_LABELS[avTab]} ${i + 1}"></button>`
      : `<button class="av-opt ${draftAv[avTab] === i ? 'on' : ''}" data-av="${avTab}:${i}">${avatarSVG({ ...draftAv, [avTab]: i }, 72)}<small>${v}</small></button>`).join('')}</div>
    <div class="avb-foot"><button class="primary-btn" data-act="av-save">Save character</button></div>
  </div>`;
}

/* ================= Call Hana ================= */
function openCall() {
  startCall({
    onEnd: (secs) => { if (secs) addTime(secs); toast(`Call ended · ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`); render(); },
    onLessonDone: ({ c, l, stars }) => { const first = !S.done[l.id]; S.done[l.id] = Math.max(starsOf(l.id), stars); learnLesson(c, l); S.seeds += first ? 5 : 1; addXP(10 + stars * 2); },
    chess: () => { S.tab = 'explore'; openCourse = 'chess'; render(); },
    revise: () => startRevise(),
  });
}

/* ================= Smart revise ================= */
function startRevise() {
  const r = buildReview(10);
  if (!r) return toast('Finish a lesson first, then its facts appear here.');
  bitSay('Beep! Smart revise mode activated.');
  startLesson(r.course, r.lesson, { onDone: (res) => reviseDone(res, r), onQuit: quitter, onAnswer: (q, ok) => recordAnswer(q.fact, ok) });
}
function reviseDone(res, r) {
  const xp = 5 + res.stars * 3; S.seeds += 3; addXP(xp); addTime(res.secs); sfx.win();
  hanaSay('Revision done! Those facts will stick now.');
  results({ title: 'Revision done!', sub: `${r.count} facts reviewed`, stars: res.stars, color: 'purple',
    stats: [['⚡', 'XP earned', xp, ''], ['🎯', 'First try', res.accuracy, '%'], ['🧠', 'Still due', dueCount(), '']],
    buttons: [dueCount() ? '<button class="primary-btn" data-act="revise">Keep revising</button>' : '', '<button class="text-btn" data-act="home">Back home</button>'] });
}

function offlineText() {
  const sw = 'serviceWorker' in navigator && navigator.serviceWorker.controller;
  if (!navigator.onLine) return 'Offline now, still working';
  return sw || !location.protocol.startsWith('http') ? 'Ready ✓' : 'Ready after first visit';
}
window.addEventListener('online', () => { const el = document.getElementById('offline-state'); if (el) el.textContent = offlineText(); });
window.addEventListener('offline', () => { const el = document.getElementById('offline-state'); if (el) el.textContent = offlineText(); toast('You\'re offline. Everything still works.'); });

/* ================= Motion helpers ================= */
// Cards further down the page animate in as they scroll into view.
let io = null;
function armReveal() {
  if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  io?.disconnect();
  const root = document.getElementById('main'); if (!root) return;
  io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.remove('pending'); en.target.classList.add('in'); io.unobserve(en.target); } }), { root, threshold: 0.08 });
  const h = root.clientHeight;
  root.querySelectorAll('.rise, .topic, .lesson-row, .chapter, .bdg').forEach((el) => { if (el.getBoundingClientRect().top > h + 10) { el.classList.add('pending'); io.observe(el); } });
}
// Material-style ripple on tappable things.
document.addEventListener('pointerdown', (e) => {
  const el = e.target.closest('.primary-btn, .topic, .lesson-row, .row, .tab, .cc, .gbtn, .opt, .pic, .quick button, .continue-card, .revise-card, .call-btn, .hc-call');
  if (!el || el.disabled) return;
  const r = el.getBoundingClientRect(); const d = Math.max(r.width, r.height) * 2;
  const s = document.createElement('span'); s.className = 'ripple';
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  el.style.overflow = 'hidden'; el.appendChild(s); setTimeout(() => s.remove(), 650);
}, { passive: true });
// Gentle 3D tilt on topic tiles (mouse and trackpad only).
if (window.matchMedia?.('(hover: hover)').matches) {
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest('.topic, .continue-card'); if (!el) return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`); el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`); el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
  });
  document.addEventListener('pointerout', (e) => { const el = e.target.closest?.('.topic, .continue-card'); if (el && !el.contains(e.relatedTarget)) { el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); } });
}
// Hana "talks": her picture bobs and glows while she speaks anywhere in the app.
onSpeaking((who, on) => document.body.classList.toggle(`${who}-talking`, on));
voicesReady.then(() => { if (S.tab === 'profile' && !openCourse && !openAvatar && !callActive() && !lessonActive() && !gameActive()) render(); });

/* ================= Events ================= */
let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; });

document.addEventListener('click', (e) => {
  const who = e.target.closest('[data-hana], [data-bit]');
  if (who && !e.target.closest('#cboard')) {
    const box = who.closest('.mascot, .bit-solo'); box?.classList.remove('talk'); void box?.offsetWidth; box?.classList.add('talk');
    if (who.dataset.bit) { bitSay(bitRandom()); toast(`Bit: ${bitRandom()}`); } else { const line = hanaRandom(); hanaSay(line); toast(`Hana: ${line}`); }
    return;
  }
  const t = e.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.av !== undefined) { const [k, v] = d.av.split(':'); draftAv[k] = +v; sfx.tap(); return renderAvatarBuilder(); }
  if (d.avtab) { avTab = d.avtab; return renderAvatarBuilder(); }
  if (d.board) { S.board = d.board; save(); return render(); }
  if (d.pitch) { S.hanaPitch = d.pitch; save(); hanaSay('How about this?', { force: true }); return render(); }
  if (d.ob) {
    S.onboarded = true;
    if (d.ob === 'habits') S.tab = 'home';
    else if (d.ob === 'chess') { S.tab = 'explore'; openCourse = 'chess'; }
    else { S.tab = 'explore'; S.lib = d.ob; }
    save(); return render();
  }
  if (d.tab) { S.tab = d.tab; openCourse = null; save(); sfx.tap(); return render(); }
  if (d.open) { openCourse = d.open; S.course = d.open; save(); sfx.tap(); return render(); }
  if (d.lib) { S.lib = d.lib; save(); return render(); }
  if (d.period) { period = d.period; return render(); }
  if (d.guide) return guideSheet(COURSES[openCourse], +d.guide);
  if (d.lesson) {
    const c = COURSES[openCourse];
    if (!unlocked(c, d.lesson)) { t.classList.remove('nope'); void t.offsetWidth; t.classList.add('nope'); return toast('Finish the lesson before this one to unlock it'); }
    sfx.tap(); return begin(openCourse, d.lesson);
  }
  if (d.startNext) { const [cid, lid] = d.startNext.split('|'); openCourse = cid; return begin(cid, lid); }
  if (d.free) return startFree(+d.free);
  if (d.goal) { S.dailyGoal = +d.goal; save(); return render(); }
  if (d.habit) {
    const h = S.habits.find((x) => x.id === d.habit); const t0 = today();
    if (h.log[t0]) { delete h.log[t0]; save(); } else { h.log[t0] = true; sfx.good(); burst(t); addXP(5); }
    return render();
  }
  if (d.delhabit) { S.habits = S.habits.filter((x) => x.id !== d.delhabit); save(); return render(); }
  if (d.book) {
    const b = S.books.find((x) => x.id === d.book); b.status = { want: 'reading', reading: 'done', done: 'want' }[b.status];
    if (b.status === 'done') { sfx.win(); burst(t); addXP(10); toast('Finished a book! +10 XP'); }
    save(); return render();
  }
  if (d.delbook) { S.books = S.books.filter((x) => x.id !== d.delbook); save(); return render(); }
  if (d.emo) { document.querySelectorAll('.emo').forEach((b) => b.classList.toggle('on', b === t)); return; }
  if (d.col) { document.querySelectorAll('.sw').forEach((b) => b.classList.toggle('on', b === t)); return; }
  switch (d.act) {
    case 'back': openCourse = null; return render();
    case 'to-course': openCourse = d.course; return render();
    case 'home': openCourse = null; S.tab = 'home'; return render();
    case 'addhabit': return addHabitSheet();
    case 'addbook': return addBookSheet();
    case 'sound': S.sound = !S.sound; save(); return render();
    case 'voice': S.voice = !S.voice; save(); if (S.voice) hanaSay('Hi! I can talk now.'); return render();
    case 'avatar': openAvatar = true; draftAv = { ...(S.avatar || DEFAULT_AVATAR) }; avTab = 'hair'; return render();
    case 'av-random': draftAv = randomAvatar(); sfx.pop(); return renderAvatarBuilder();
    case 'av-save': S.avatar = { ...draftAv }; save(); openAvatar = false; sfx.win(); hanaSay('Looking great!'); toast('Character saved'); return render();
    case 'av-cancel': openAvatar = false; return render();
    case 'revise': return startRevise();
    case 'call': return openCall();
    case 'handsfree': S.handsFree = !S.handsFree; save(); return render();
    case 'preview-voice': hanaSay('Hi! I\'m Hana. This is how I sound. Ready to learn?', { force: true }); return;
    case 'ai-toggle': if (!S.aiKey && !S.aiOn) return toast('Add your API key first'); S.aiOn = !S.aiOn; save(); return render();
    case 'ai-test': { if (!S.aiKey) return toast('Add your API key first'); toast('Testing…'); import('./hana-ai.js').then((m) => m.testKey()).then((r) => { S.aiOn = true; save(); toast(`Hana AI works: "${r}"`); render(); }).catch((err) => toast(err?.message === 'key' ? 'That key didn\'t work. Check it and try again.' : 'Couldn\'t reach Anthropic. Are you online?')); return; }
    case 'game-review': if (lastGame) { const g = lastGame; showReview(g.record, { avatar: (sz) => myAvatar(sz), name: () => S.name || 'You', onBack: () => { openCourse = g.lessonId ? 'chess' : null; render(); } }); } return;
    case 'install': installPrompt?.prompt(); installPrompt = null; return;
    case 'reset': return confirmSheet('Reset all progress?', 'reset-yes');
    case 'reset-yes': reset(); openCourse = null; closeSheet(); return render();
    case 'quit-yes': closeSheet(); pendingQuit?.(); pendingQuit = null; return render();
  }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'lib-q') {
    const q = e.target.value.trim().toLowerCase(); let any = false;
    document.querySelectorAll('.cat').forEach((sec) => {
      let n = 0;
      sec.querySelectorAll('.topic').forEach((cd) => { const hit = !q || cd.dataset.name.includes(q); cd.hidden = !hit; if (hit) n++; });
      sec.hidden = n === 0; if (n) any = true;
    });
    document.getElementById('no-results').hidden = any;
  }
  if (e.target.id === 'set-name') { S.name = e.target.value.trim(); save(); }
  if (e.target.id === 'set-aikey') { S.aiKey = e.target.value.trim(); if (!S.aiKey) S.aiOn = false; save(); }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'set-hvoice') { S.hanaVoice = e.target.value; save(); hanaSay('Hi! This is my new voice.', { force: true }); }
});

document.addEventListener('submit', (e) => {
  if (e.defaultPrevented) return;
  e.preventDefault();
  if (e.target.id === 'habit-form') {
    const name = document.getElementById('h-name').value.trim(); if (!name) return;
    S.habits.push({ id: `h${Date.now()}`, name, emoji: document.querySelector('.emo.on')?.dataset.emo || '⭐', color: document.querySelector('.sw.on')?.dataset.col || 'purple', log: {} });
    S.tab = 'home';
  }
  if (e.target.id === 'book-form') {
    const title = document.getElementById('b-title').value.trim(); if (!title) return;
    S.books.unshift({ id: `b${Date.now()}`, title, author: document.getElementById('b-author').value.trim(), notes: document.getElementById('b-notes').value.trim(), status: 'reading' });
    S.tab = 'profile';
  }
  save(); closeSheet(); openCourse = null; render();
});

render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* not available here */ });
}
