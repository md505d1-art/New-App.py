import { COURSES, CATEGORIES, gambitStart, GAMBITS, movesText } from './courses.js';
import { mascot } from './mascot.js';
import { badge, homeScene, isNight, plant, waves, icon, COLORS } from './art.js';
import { S, save, reset, addXP, streakAlive, today, dayOffset, esc, sfx, burst, countUp, toast } from './store.js';
import { startLesson } from './lesson.js';
import { startGame } from './game.js';

const $app = document.getElementById('app');
let openCourse = null; // id of the course screen being shown, if any
let lastKey = '';

/* ================= Course helpers ================= */
const lessonsOf = (c) => c.units.flatMap((u, ui) => u.lessons.map((l, li) => ({ ...l, ui, li, unit: u })));
const progressOf = (c) => { const ls = lessonsOf(c); const done = ls.filter((l) => S.done[l.id]).length; return { done, total: ls.length, pct: ls.length ? done / ls.length : 0 }; };
const nextLesson = (c) => lessonsOf(c).find((l) => !S.done[l.id]) || null;
const unlocked = (c, id) => { const ls = lessonsOf(c); const i = ls.findIndex((x) => x.id === id); return i === 0 || !!S.done[ls[i - 1]?.id]; };
const started = () => Object.values(COURSES).filter((c) => progressOf(c).done > 0);
const starsOf = (id) => +S.done[id] || 0;
const starRow = (n) => `<span class="stars">${[1, 2, 3].map((k) => `<i class="${k <= n ? 'on' : ''}">★</i>`).join('')}</span>`;
const colorVars = (color) => { const [c, d] = COLORS[color] || COLORS.green; return `--c:${c};--cd:${d}`; };

/* ================= Shell ================= */
const TABS = [['today', 'Today', 'M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z'], ['learn', 'Learn', 'M4 5h7a3 3 0 013 3v12a2 2 0 00-2-2H4zM20 5h-7a3 3 0 00-3 3v12a2 2 0 012-2h8z'],
  ['garden', 'Garden', 'M11 21v-7.2C6.5 13.6 4 11 4 7c4 0 7 2.3 7.6 5.6C12.5 8 15.5 5 20 5c0 5-3 8.4-7 8.9V21z'], ['me', 'Me', 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-7 8-7s8 3 8 7z']];

function render() {
  if (!S.onboarded) return renderOnboarding();
  const key = openCourse ? `course:${openCourse}` : `tab:${S.tab}`;
  const body = openCourse ? courseScreen(COURSES[openCourse]) : { today: todayScreen, learn: learnScreen, garden: gardenScreen, me: meScreen }[S.tab]();
  const ti = TABS.findIndex((t) => t[0] === S.tab);
  $app.innerHTML = `<div class="shell">
    <main class="main ${key !== lastKey ? 'screen-in' : ''}" id="main">${body}</main>
    ${openCourse ? '' : `<nav class="dock" aria-label="Main"><div class="dock-in" style="--x:${ti}"><span class="dock-blob"></span>
      ${TABS.map(([id, label, d]) => `<button class="dock-btn ${S.tab === id ? 'on' : ''}" data-tab="${id}" aria-label="${label}"><svg viewBox="0 0 24 24" width="24" height="24"><path d="${d}" fill="currentColor"/></svg><small>${label}</small></button>`).join('')}
    </div></nav>`}
  </div>`;
  if (key !== lastKey) document.getElementById('main').scrollTop = 0;
  lastKey = key;
  countUp($app);
  if (openCourse) requestAnimationFrame(() => document.querySelector('.lt.next')?.scrollIntoView({ block: 'center', behavior: 'smooth' }));
}

/* ================= Onboarding ================= */
function renderOnboarding() {
  $app.innerHTML = `<div class="onboard2 screen-in">
    <div class="ob-scene">${homeScene()}<div class="ob-hana">${mascot('wave', 150)}</div></div>
    <div class="ob-body">
      <h1>Hi, I'm Hana!</h1>
      <p class="muted">Pick something to grow first. You can add more later.</p>
      <div class="ob-grid">
        ${[['school', 'School', 'GCSE subjects from your notes', 'literature', 'purple'], ['language', 'Languages', `${CATEGORIES[1].blurb}`, 'english', 'blue'],
          ['chess', 'Chess', 'Play gambits against me', 'chess', 'green'], ['habits', 'Habits', 'Daily streaks and a bookshelf', 'habit', 'yellow']]
          .map(([id, t, s, ic, col], i) => `<button class="ob-tile" data-ob="${id}" style="${colorVars(col)};--i:${i}"><span class="ob-ic">${icon(ic, col, 44)}</span><b>${t}</b><small>${s}</small></button>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ================= Today ================= */
function greeting() { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; }
const dayLetter = (d) => 'SMTWTFS'[new Date(d + 'T12:00').getDay()];

function todayScreen() {
  const t = today();
  const xpToday = S.xpByDay[t] || 0; const pct = Math.min(1, xpToday / S.dailyGoal);
  const week = [...Array(7)].map((_, k) => dayOffset(k - 6));
  const cont = S.course && COURSES[S.course] ? COURSES[S.course] : started()[0];
  const nl = cont && nextLesson(cont);
  const line = pct >= 1 ? 'Daily goal done. Your garden loves you!' : xpToday ? `${S.dailyGoal - xpToday} XP to reach today's goal.` : 'Ready for a quick lesson?';
  const habits = S.habits; const doneN = habits.filter((h) => h.log[t]).length;
  const suggest = Object.values(COURSES).filter((c) => !progressOf(c).done && c.id !== cont?.id);
  const picks = [...suggest.filter((c) => c.cat === 'school').slice(0, 3), ...suggest.filter((c) => c.cat === 'language').slice(0, 3)];
  const R = 34; const C = 2 * Math.PI * R;
  return `<div class="today">
    <section class="hero ${isNight() ? 'night' : ''}">${homeScene()}
      <div class="hero-text"><small>${new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</small>
        <h1>${greeting()}${S.name ? `, ${esc(S.name)}` : ''}!</h1><p>${line}</p></div>
      <div class="hero-hana">${mascot('wave', 118)}</div>
    </section>

    <div class="row2 rise" style="--i:1">
      <div class="card goal-card">
        <svg class="ring" viewBox="0 0 80 80" width="80" height="80"><circle cx="40" cy="40" r="${R}" class="ring-bg"/><circle cx="40" cy="40" r="${R}" class="ring-fg" style="--len:${C};--off:${C * (1 - pct)}"/></svg>
        <div class="ring-label"><b data-count="${xpToday}">0</b><small>/ ${S.dailyGoal} XP</small></div>
        <span class="card-cap">Daily goal</span>
      </div>
      <div class="card streak-card">
        <div class="flame ${streakAlive() && S.streak ? 'lit' : ''}">🔥</div>
        <b class="big" data-count="${streakAlive() ? S.streak : 0}">0</b><span class="card-cap">day streak</span>
        <div class="week">${week.map((d) => `<i class="${S.xpByDay[d] ? 'on' : ''} ${d === t ? 'today' : ''}">${dayLetter(d)}</i>`).join('')}</div>
      </div>
    </div>

    ${cont ? `<button class="continue rise" style="${colorVars(cont.color)};--i:2" data-open="${cont.id}">
        ${badge(cont, 58)}<span class="cont-text"><small>${nl ? 'Continue' : 'Course complete'}</small><b>${esc(cont.name)}</b><span>${esc(nl ? nl.title : 'Practise any lesson again')}</span>
        <span class="bar"><i style="width:${progressOf(cont).pct * 100}%"></i></span></span><span class="play-dot" aria-hidden="true">▶</span></button>`
      : `<button class="continue rise empty" style="${colorVars('blue')};--i:2" data-tab="learn">${icon('book', 'blue', 46)}<span class="cont-text"><small>Start here</small><b>Choose your first course</b><span>School, languages or chess</span></span><span class="play-dot">▶</span></button>`}

    <section class="card list-card rise" style="--i:3">
      <header><h2>Today's habits</h2><span class="pill">${doneN}/${habits.length}</span><button class="link" data-act="addhabit">+ Add</button></header>
      ${habits.length ? habits.map((h) => {
        let n = 0; let k = h.log[t] ? 0 : -1; while (h.log[dayOffset(k)]) { n++; k--; }
        return `<div class="hrow" style="${colorVars(h.color)}"><span class="h-ico">${h.emoji}</span><span class="h-txt"><b>${esc(h.name)}</b><small>🔥 ${n} day${n === 1 ? '' : 's'}</small></span>
          <button class="h-del" data-delhabit="${h.id}" aria-label="Delete ${esc(h.name)}">✕</button>
          <button class="check ${h.log[t] ? 'on' : ''}" data-habit="${h.id}" aria-label="Mark ${esc(h.name)} done"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
      }).join('') : '<p class="muted pad">No habits yet. Add one to start a streak.</p>'}
    </section>

    <section class="card list-card rise" style="--i:4">
      <header><h2>Bookshelf</h2><span class="pill">${S.books.filter((b) => b.status === 'done').length} read</span><button class="link" data-act="addbook">+ Add book</button></header>
      ${S.books.length ? S.books.map((b) => `<div class="brow"><span class="spine s-${b.status}"></span><span class="h-txt"><b>${esc(b.title)}</b><small>${esc(b.author || 'Unknown author')}${b.notes ? ` · ${esc(b.notes)}` : ''}</small></span>
          <button class="status st-${b.status}" data-book="${b.id}">${{ want: 'Want to read', reading: 'Reading', done: 'Finished' }[b.status]}</button>
          <button class="h-del" data-delbook="${b.id}" aria-label="Remove ${esc(b.title)}">✕</button></div>`).join('')
        : '<p class="muted pad">Track what you\'re reading, like your Reading Dashboard note. Tap a book\'s status to move it along.</p>'}
    </section>

    ${picks.length ? `<section class="rise" style="--i:5"><h2 class="sec-h">Try something new</h2>
      <div class="hscroll">${picks.map((c) => `<button class="mini-course" data-open="${c.id}" style="${colorVars(c.color)}">${badge(c, 52)}<b>${esc(c.name)}</b><small>${esc(c.sub || '')}</small></button>`).join('')}</div></section>` : ''}
  </div>`;
}

/* ================= Learn (library) ================= */
function learnScreen() {
  const cats = S.lib === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.id === S.lib);
  return `<div class="library">
    <header class="page-head"><h1>Library</h1><p class="muted">${Object.keys(COURSES).length} courses. Every one grows a plant in your garden.</p></header>
    <label class="search"><svg viewBox="0 0 24 24" width="20" height="20"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>
      <input id="lib-q" type="search" placeholder="Search subjects and languages" autocomplete="off" aria-label="Search courses"></label>
    <div class="chips">${[['all', 'All'], ...CATEGORIES.map((c) => [c.id, c.name])].map(([id, n]) => `<button class="chip-btn ${S.lib === id ? 'on' : ''}" data-lib="${id}">${n}</button>`).join('')}</div>
    ${cats.map((cat) => {
      const list = Object.values(COURSES).filter((c) => c.cat === cat.id);
      return `<section class="cat" data-cat="${cat.id}"><h2 class="sec-h">${cat.name} <small>${cat.blurb}</small></h2>
        <div class="cgrid">${list.map((c, i) => { const p = progressOf(c); return `<button class="ccard" data-open="${c.id}" data-name="${esc(`${c.name} ${c.sub || ''}`.toLowerCase())}" style="${colorVars(c.color)};--i:${Math.min(i, 12)}">
          ${badge(c, 56)}<b>${esc(c.name)}</b><small>${esc(c.sub || '')}</small>
          <span class="cc-foot"><span class="bar"><i style="width:${p.pct * 100}%"></i></span><em>${p.done}/${p.total}</em></span></button>`; }).join('')}</div></section>`;
    }).join('')}
    <p class="muted empty-search" id="no-results" hidden>No courses match that search.</p>
  </div>`;
}

/* ================= Course ================= */
function courseScreen(c) {
  const p = progressOf(c); const nl = nextLesson(c);
  const catName = CATEGORIES.find((x) => x.id === c.cat)?.name || '';
  let n = 0;
  return `<div class="course2" style="${colorVars(c.color)}">
    <header class="c-hero">
      <button class="icon-btn back" data-act="back" aria-label="Back">←</button>
      <div class="c-hero-main">${badge(c, 84)}<div><small>${esc(catName)}</small><h1>${esc(c.name)}</h1><p>${esc(c.sub || '')}</p></div></div>
      <div class="c-progress"><span class="bar"><i style="width:${p.pct * 100}%"></i></span><b>${p.done}/${p.total} lessons</b></div>
      ${waves(c.color)}
    </header>
    ${c.note ? `<p class="course-note">📓 ${esc(c.note)}</p>` : ''}
    ${c.id === 'chess' ? `<div class="card free rise" style="--i:0"><div class="free-top">${mascot('happy', 60)}<div><b>Free play vs Hana</b><small>A full game from move one. I grade every move.</small></div></div>
      <div class="seg">${[1, 2, 3].map((lv) => `<button data-free="${lv}">${['', 'Easy', 'Medium', 'Hard'][lv]}</button>`).join('')}</div></div>` : ''}
    ${c.units.map((u, ui) => `<section class="chapter rise" style="${colorVars(u.color)};--i:${ui + 1}">
        <div class="ch-head"><div><span class="ch-tag">Chapter ${ui + 1}</span><h2>${esc(u.title)}</h2><p>${esc(u.desc)}</p></div>
          <button class="guide-btn" data-guide="${ui}" aria-label="Chapter guide">${icon('book', u.color, 26)}<span>Guide</span></button></div>
        <div class="ltiles">${u.lessons.map((l) => {
          n++;
          const st = S.done[l.id] ? 'done' : l.id === nl?.id ? 'next' : unlocked(c, l.id) ? 'open' : 'locked';
          const glyph = st === 'locked' ? '🔒' : l.kind === 'play' ? '♞' : l.kind === 'quiz' ? '✎' : n;
          return `<button class="lt ${st} ${l.kind === 'play' ? 'play' : ''}" data-lesson="${l.id}" aria-label="${esc(l.title)}">
            ${st === 'next' ? '<span class="go-tag">GO</span>' : ''}<span class="lt-g">${glyph}</span>${st === 'done' ? starRow(starsOf(l.id)) : `<span class="lt-n">${l.kind === 'play' ? esc(GAMBITS[l.play.key].name.split(' ')[0]) : ''}</span>`}</button>`;
        }).join('')}</div>
      </section>`).join('')}
    <p class="muted end-note">More chapters are growing. 🌱</p>
  </div>`;
}

/* ================= Garden ================= */
function gardenScreen() {
  const list = started();
  const stage = (c) => { const p = progressOf(c).pct; return p >= 1 ? 4 : p >= 0.5 ? 3 : p >= 0.2 ? 2 : 1; };
  const blooms = list.filter((c) => stage(c) === 4).length;
  return `<div class="garden">
    <header class="page-head"><h1>Your garden</h1><p class="muted">Every course you start grows a plant. Finish its lessons to make it bloom.</p></header>
    <div class="g-stats rise" style="--i:0">
      <div><b data-count="${list.length}">0</b><small>plants</small></div><div><b data-count="${blooms}">0</b><small>in bloom</small></div>
      <div><b data-count="${S.xp}">0</b><small>☀️ XP</small></div><div><b data-count="${S.seeds}">0</b><small>🌱 seeds</small></div>
    </div>
    <div class="bed rise" style="--i:1">
      <div class="bed-sky"><span class="g-cloud a"></span><span class="g-cloud b"></span></div>
      <div class="plots">
        ${list.map((c, i) => `<button class="plot" data-open="${c.id}" style="--i:${i}">${plant(stage(c), c.color, 70)}<b>${c.flag ? `${c.flag} ` : ''}${esc(c.name)}</b><small>${Math.round(progressOf(c).pct * 100)}%</small></button>`).join('')}
        <button class="plot empty" data-tab="learn">${plant(0, 'green', 70)}<b>Plant a seed</b><small>Start a course</small></button>
      </div>
    </div>
    <p class="muted center-note">Seeds pay for chess hints and take-backs. Earn them by finishing lessons and winning games.</p>
  </div>`;
}

/* ================= Me ================= */
function meScreen() {
  const days = [...Array(7)].map((_, k) => dayOffset(k - 6));
  const vals = days.map((d) => S.xpByDay[d] || 0); const max = Math.max(S.dailyGoal, ...vals);
  const lessons = Object.keys(S.done).length;
  const badges = [
    ['🔥', 'Spark', '3-day streak', S.streak >= 3], ['🌸', 'First bloom', 'Finish a whole course', Object.values(COURSES).some((c) => progressOf(c).pct >= 1)],
    ['💯', 'Flawless', 'Three stars on a lesson', Object.values(S.done).some((v) => +v >= 3)], ['♚', 'Checkmate', 'Beat Hana at chess', S.wins >= 1],
    ['🎓', 'Scholar', 'Lessons in 3 school subjects', Object.values(COURSES).filter((c) => c.cat === 'school' && progressOf(c).done).length >= 3],
    ['🌍', 'Polyglot', 'Start 3 languages', Object.values(COURSES).filter((c) => c.cat === 'language' && progressOf(c).done).length >= 3],
    ['📚', 'Bookworm', 'Finish a book', S.books.some((b) => b.status === 'done')], ['🌳', 'Evergreen', '1,000 XP', S.xp >= 1000],
  ];
  return `<div class="me">
    <header class="me-head rise" style="--i:0"><div class="avatar">${mascot('happy', 76)}</div>
      <div><h1>${esc(S.name || 'Your profile')}</h1><p class="muted">${started().length} courses growing · ${lessons} lessons done</p></div></header>
    <div class="stats4 rise" style="--i:1">
      <div class="stat"><span>🔥</span><b data-count="${streakAlive() ? S.streak : 0}">0</b><small>Streak</small></div>
      <div class="stat"><span>☀️</span><b data-count="${S.xp}">0</b><small>Total XP</small></div>
      <div class="stat"><span>📘</span><b data-count="${lessons}">0</b><small>Lessons</small></div>
      <div class="stat"><span>♚</span><b data-count="${S.wins}">0</b><small>Chess wins</small></div>
    </div>
    <section class="card rise" style="--i:2"><h2 class="card-h">This week</h2>
      <div class="chart">${days.map((d, k) => `<div class="bar-col"><em>${vals[k] || ''}</em><i style="--h:${(vals[k] / max) * 100}%;--i:${k}"></i><small>${dayLetter(d)}</small></div>`).join('')}</div></section>
    <section class="rise" style="--i:3"><h2 class="sec-h">Badges</h2>
      <div class="badges2">${badges.map(([e, n, d, ok]) => `<div class="bdg ${ok ? 'got' : ''}"><span>${e}</span><b>${n}</b><small>${d}</small></div>`).join('')}</div></section>
    <section class="card list-card rise" style="--i:4"><header><h2>Chess game review</h2></header>
      ${S.games.length ? S.games.slice(0, 6).map((g) => `<div class="grow"><span class="res-chip r-${g.result}">${{ win: 'Won', draw: 'Draw', loss: 'Lost' }[g.result]}</span>
          <span class="h-txt"><b>${esc(g.title)}</b><small>${esc(g.date)} · ${['', 'Easy', 'Medium', 'Hard'][g.level]} · ${g.accuracy}% accuracy</small>
          ${g.worst ? `<small class="worst">Avoid next time: <span class="mono">${esc(g.worst.move)}${esc(g.worst.san)}</span> (${esc(g.worst.label)})${g.worst.best ? `, <span class="mono">${esc(g.worst.best)}</span> was better` : ''}</small>` : '<small class="worst ok">No big mistakes. Nice!</small>'}</span></div>`).join('')
        : '<p class="muted pad">Play a chess game and it will show up here, with the one mistake to avoid next time.</p>'}
    </section>
    <section class="card rise" style="--i:5"><h2 class="card-h">Settings</h2>
      <div class="settings2">
        <label class="set-row" for="set-name">Your name<input id="set-name" maxlength="24" placeholder="Optional" value="${esc(S.name)}"></label>
        <div class="set-row">Daily goal<div class="seg sm">${[10, 20, 30, 50].map((g) => `<button class="${S.dailyGoal === g ? 'on' : ''}" data-goal="${g}">${g}</button>`).join('')}</div></div>
        <button class="set-row" data-act="sound">Sound effects<b>${S.sound ? 'On' : 'Off'}</b></button>
        ${installPrompt ? '<button class="set-row" data-act="install">Install Sprout<b>Add to home screen</b></button>' : ''}
        <button class="set-row danger" data-act="reset">Reset all progress</button>
      </div></section>
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

function lessonSheet(c, id) {
  const l = lessonsOf(c).find((x) => x.id === id);
  let preview = '';
  if (l.words) preview = `<div class="word-chips"${c.tts ? ` lang="${c.tts}"` : ''}>${l.words.map((w) => `<span class="wchip"><em>${w.emoji}</em><b dir="auto">${esc(w.t)}</b><small>${esc(w.rom || w.en)}</small></span>`).join('')}</div>`;
  else if (l.kind === 'play') { const g = GAMBITS[l.play.key]; preview = `<p class="mono moves-line">${esc(movesText(g.moves))}</p><p>${esc(g.idea)}</p><p class="muted">You play ${g.side} · Hana is ${l.play.levelName}. Win or draw to pass.</p>`; }
  else if (l.qs) preview = `<p class="muted">${l.qs.length + 2} questions, including key terms:</p><div class="word-chips">${l.terms.map(([t]) => `<span class="wchip"><b>${esc(t)}</b></span>`).join('')}</div>`;
  else if (l.items) preview = `<div class="tl">${l.items.map((it) => `<div><b>${esc(it.year)}</b><span>${esc(it.event)}</span></div>`).join('')}</div>`;
  else if (l.keys) preview = `<p class="muted">Review quiz on ${l.keys.map((k) => esc(GAMBITS[k].name)).join(', ')}.</p>`;
  const st = starsOf(id);
  sheet(`<div class="ls-head" style="${colorVars(l.unit.color)}"><span class="ch-tag">Chapter ${l.ui + 1}</span><h2>${esc(l.title)}</h2>${st ? starRow(st) : ''}</div>
    ${preview}
    <button class="btn wide" style="${colorVars(c.color)}" data-start="${id}">${st ? 'Practise again' : l.kind === 'play' ? 'Play' : 'Start'}</button>`);
}

function guideSheet(c, ui) {
  const u = c.units[ui];
  sheet(`<h2>Chapter ${ui + 1}: ${esc(u.title)}</h2><p class="muted">${esc(u.desc)}</p>
    <div class="guide">${u.guide.map((g) => `<div class="g-row"><b dir="auto">${esc(g.term)}</b><span>${esc(g.def)}</span></div>`).join('')}</div>
    <button class="btn wide" style="${colorVars(u.color)}" data-close>Got it</button>`);
}

const EMOJIS = ['💧', '📚', '🧘', '🏃', '🥗', '😴', '🎸', '✍️', '🧹', '💊', '🚶', '♟️', '🗣️', '🌞', '📵', '🦷'];
const HCOLORS = ['green', 'blue', 'purple', 'red', 'yellow'];
function addHabitSheet() {
  sheet(`<h2>New habit</h2><form id="habit-form" class="form">
    <label for="h-name">Name</label><input id="h-name" maxlength="40" placeholder="e.g. Practise guitar" required autocomplete="off">
    <span class="lbl">Icon</span><div class="emoji-grid">${EMOJIS.map((e, k) => `<button type="button" class="emo ${k === 0 ? 'on' : ''}" data-emo="${e}">${e}</button>`).join('')}</div>
    <span class="lbl">Colour</span><div class="color-row">${HCOLORS.map((c, k) => `<button type="button" class="sw ${k === 0 ? 'on' : ''}" style="${colorVars(c)}" data-col="${c}" aria-label="${c}"></button>`).join('')}</div>
    <button class="btn wide" type="submit">Add habit</button></form>`);
  setTimeout(() => document.getElementById('h-name')?.focus(), 60);
}
function addBookSheet() {
  sheet(`<h2>Add a book</h2><form id="book-form" class="form">
    <label for="b-title">Title</label><input id="b-title" maxlength="80" required autocomplete="off" placeholder="e.g. An Inspector Calls">
    <label for="b-author">Author</label><input id="b-author" maxlength="60" autocomplete="off" placeholder="Optional">
    <label for="b-notes">Key idea or favourite quote</label><input id="b-notes" maxlength="120" autocomplete="off" placeholder="Optional">
    <button class="btn wide" type="submit" style="${colorVars('purple')}">Add to bookshelf</button></form>`);
  setTimeout(() => document.getElementById('b-title')?.focus(), 60);
}
function confirmSheet(text, act, mood = 'sad') {
  sheet(`<div class="center">${mascot(mood, 84)}<h2>${text}</h2>
    <button class="btn wide" style="${colorVars('red')}" data-act="${act}">Yes</button><button class="btn ghost wide" data-close>Cancel</button></div>`);
}

/* ================= Lessons & games ================= */
let pendingQuit = null;
const quitter = (clear) => { pendingQuit = clear; confirmSheet('Leave now? This won\'t count.', 'quit-yes'); };

function begin(courseId, lessonId) {
  const c = COURSES[courseId]; const l = lessonsOf(c).find((x) => x.id === lessonId);
  S.course = courseId; save(); closeSheet();
  if (l.kind === 'play') {
    const g = gambitStart(l.play.key);
    return startGame({ fen: g.fen, side: g.side, level: l.play.level, title: g.name, idea: g.idea, prefix: g.moves, lessonId: l.id,
      intro: `Let's play the <b>${esc(g.name)}</b>. You're ${g.side === 'w' ? 'White' : 'Black'}.<br><small>${esc(g.idea)}</small>` }, gameCallbacks);
  }
  startLesson(c, l, { onDone: (r) => lessonDone(c, l, r), onQuit: quitter });
}

function nextAfter(c, id) { const ls = lessonsOf(c); const i = ls.findIndex((x) => x.id === id); return ls[i + 1] || null; }

function lessonDone(c, l, r) {
  const first = !S.done[l.id];
  S.done[l.id] = Math.max(starsOf(l.id), r.stars);
  if (r.stars === 3) S.perfect = true;
  const xp = 10 + r.stars * 2 + (r.bestCombo >= 5 ? 5 : 0);
  const seeds = first ? 5 + r.stars : 1;
  S.seeds += seeds; addXP(xp); sfx.win();
  const nx = nextAfter(c, l.id);
  doneScreen({ title: r.stars === 3 ? 'Flawless!' : 'Lesson complete!', stars: r.stars, mood: 'cheer', color: c.color,
    chips: [['☀️', 'XP', xp, ''], ['🎯', 'First try', r.accuracy, '%'], ['🔥', 'Best combo', r.bestCombo, ''], ['🌱', 'Seeds', seeds, '']],
    buttons: [nx ? `<button class="btn wide" style="${colorVars(c.color)}" data-start-next="${c.id}|${nx.id}">Next lesson</button>` : '',
      `<button class="btn ${nx ? 'ghost' : ''} wide" style="${colorVars(c.color)}" data-act="to-course" data-course="${c.id}">Back to ${esc(c.name)}</button>`] });
}

function doneScreen({ title, sub = '', stars = 0, mood, color, chips, buttons, confetti = true }) {
  $app.innerHTML = `<div class="done2" style="${colorVars(color)}">
    ${confetti ? `<div class="confetti">${[...Array(32)].map((_, k) => `<i style="--l:${(k * 37) % 100}%;--d:${(k % 8) * 0.12}s;--r:${(k * 47) % 360}deg;--c:${['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff'][k % 5]}"></i>`).join('')}</div>` : ''}
    <div class="done-hana">${mascot(mood, 150)}</div>
    ${stars ? `<div class="big-stars">${[1, 2, 3].map((k) => `<i class="${k <= stars ? 'on' : ''}" style="--i:${k}">★</i>`).join('')}</div>` : ''}
    <h1>${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ''}
    <div class="dchips">${chips.map(([e, label, v, suf], i) => `<div class="dchip" style="--i:${i}"><span>${e}</span><b data-count="${v}" data-suffix="${suf}">0</b><small>${label}</small></div>`).join('')}</div>
    <div class="done-btns">${buttons.join('')}</div>
  </div>`;
  countUp($app);
}

const gameCallbacks = {
  seeds: () => S.seeds,
  sfx,
  spendSeeds(n) { if (S.seeds < n) { toast('Not enough seeds. Finish lessons or win games to earn more.'); return false; } S.seeds -= n; save(); return true; },
  onQuit: quitter,
  onFinish: gameDone,
};

function startFree(level) {
  const side = Math.random() < 0.5 ? 'w' : 'b';
  closeSheet();
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
  S.seeds += seeds; addXP(xp);
  if (pass) sfx.win(); else sfx.bad();
  const c = COURSES.chess; const nx = r.lessonId ? nextAfter(c, r.lessonId) : null;
  doneScreen({ title: r.result === 'win' ? 'You won!' : r.result === 'draw' ? 'Draw!' : 'Hana won this one', sub: `${esc(r.how)} · ${r.moves} moves`,
    mood: pass ? 'cheer' : 'sad', color: pass ? 'green' : 'red', confetti: pass,
    chips: [['☀️', 'XP', xp, ''], ['🎯', 'Accuracy', r.accuracy, '%'], ['⭐', 'Best moves', r.grades.best, ''], ['🌱', 'Seeds', seeds, '']],
    buttons: [
      r.worst ? `<p class="review-note">Watch out for <span class="mono">${esc(r.worst.move)}${esc(r.worst.san)}</span> (${esc(r.worst.label)})${r.worst.best ? `. <span class="mono">${esc(r.worst.best)}</span> was better.` : '.'}</p>` : '',
      r.lessonId && !pass ? `<button class="btn wide" data-start-next="chess|${r.lessonId}">Try again</button>` : '',
      r.lessonId && pass && nx ? `<button class="btn wide" data-start-next="chess|${nx.id}">Next game</button>` : '',
      !r.lessonId ? `<button class="btn wide" data-free="${r.level}">Play again</button>` : '',
      `<button class="btn ghost wide" data-act="${r.lessonId ? 'to-course' : 'home'}" data-course="chess">Continue</button>`] });
}

/* ================= Events ================= */
let installPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt = e; });

document.addEventListener('click', (e) => {
  const t = e.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.ob) {
    S.onboarded = true;
    if (d.ob === 'habits') S.tab = 'today';
    else if (d.ob === 'chess') { S.tab = 'learn'; openCourse = 'chess'; }
    else { S.tab = 'learn'; S.lib = d.ob; }
    save(); return render();
  }
  if (d.tab) { S.tab = d.tab; openCourse = null; save(); sfx.tap(); return render(); }
  if (d.open) { openCourse = d.open; S.course = d.open; save(); sfx.tap(); return render(); }
  if (d.lib) { S.lib = d.lib; save(); return render(); }
  if (d.guide) return guideSheet(COURSES[openCourse], +d.guide);
  if (d.lesson) {
    const c = COURSES[openCourse];
    if (!unlocked(c, d.lesson)) { t.classList.remove('nope'); void t.offsetWidth; t.classList.add('nope'); return toast('Finish the lesson before this one to unlock it'); }
    sfx.tap(); return lessonSheet(c, d.lesson);
  }
  if (d.start) return begin(openCourse, d.start);
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
    case 'home': openCourse = null; return render();
    case 'addhabit': return addHabitSheet();
    case 'addbook': return addBookSheet();
    case 'sound': S.sound = !S.sound; save(); return render();
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
      sec.querySelectorAll('.ccard').forEach((cd) => { const hit = !q || cd.dataset.name.includes(q); cd.hidden = !hit; if (hit) n++; });
      sec.hidden = n === 0; if (n) any = true;
    });
    document.getElementById('no-results').hidden = any;
  }
  if (e.target.id === 'set-name') { S.name = e.target.value.trim(); save(); }
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'habit-form') {
    const name = document.getElementById('h-name').value.trim(); if (!name) return;
    S.habits.push({ id: `h${Date.now()}`, name, emoji: document.querySelector('.emo.on')?.dataset.emo || '⭐', color: document.querySelector('.sw.on')?.dataset.col || 'green', log: {} });
  }
  if (e.target.id === 'book-form') {
    const title = document.getElementById('b-title').value.trim(); if (!title) return;
    S.books.unshift({ id: `b${Date.now()}`, title, author: document.getElementById('b-author').value.trim(), notes: document.getElementById('b-notes').value.trim(), status: 'reading' });
  }
  save(); closeSheet(); S.tab = 'today'; openCourse = null; render();
});

render();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* not available here */ });
}
