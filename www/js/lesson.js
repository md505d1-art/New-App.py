// The lesson player: read the key idea, then "Check your understanding" one question at a time.
import { mascot } from './mascot.js';
import { col, icon, ideaScene } from './art.js';
import { GAMBITS, movesText } from './courses.js';
import { S, save, esc, sfx, speak, canSpeak, burst, toast } from './store.js';

const PIECES = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const LETTERS = 'ABCDEFGH';
const CHEERS = ['Correct!', 'Nice one!', 'Exactly right!', 'You got it!', 'Spot on!'];
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];
const arrow = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

let L = null;

export function startLesson(course, lesson, callbacks) {
  const qs = course.questions(lesson).map((q, i) => ({ ...q, _i: i }));
  L = { course, lesson, cb: callbacks, phase: 'learn', queue: qs, total: qs.length, idx: 0, solved: 0,
    wrong: 0, firstTry: 0, combo: 0, bestCombo: 0, started: Date.now(), checked: false, sel: null, built: [], match: null, missed: new Set() };
  renderLearn();
}
export const lessonActive = () => !!L;

const tts = () => L.course.tts;
const voiced = () => !!tts() && canSpeak(tts());
const langAttr = (on) => (on && L.course.tts ? ` lang="${L.course.tts}" dir="auto"` : '');
const speakBtn = (text, big = false) => (voiced() ? `<button class="speak ${big ? 'big' : ''}" data-speak="${esc(text)}" aria-label="Play audio"><svg viewBox="0 0 24 24" width="${big ? 30 : 18}" height="${big ? 30 : 18}"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8q3 4 0 8M18.5 5.5q5 6.5 0 13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>` : '');

function shell(main, foot) {
  const pct = L.phase === 'learn' ? 0 : Math.round((L.solved / L.total) * 100);
  const [c, d, p] = col(L.course.color);
  document.getElementById('app').innerHTML = `<div class="lsn" style="--c:${c};--cd:${d};--cp:${p}">
    <header class="lsn-head">
      <button class="nav-ic" data-l="quit" aria-label="Leave lesson"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <b>Lesson ${L.cb.index} of ${L.cb.count}</b>
      <button class="nav-ic" data-l="menu" aria-label="Sound on or off">•••</button>
    </header>
    <div class="lsn-prog"><span class="bar"><i style="width:${pct}%"></i></span><em>${pct}%</em></div>
    <main class="lsn-body" id="lsn-body">${main}</main>
    <footer class="lsn-foot">${foot}</footer>
  </div>`;
}

/* ---------- Key idea ---------- */
function ideaContent() {
  const l = L.lesson;
  if (l.words) return { text: `Learn these ${l.words.length} words first.${voiced() ? ' Tap a word to hear it.' : ''}`,
    list: l.words.map((w) => `<button class="idea-row word" ${voiced() ? `data-speak="${esc(w.t)}"` : ''}><span class="i-emoji">${w.emoji}</span>
      <span class="i-main"><b${langAttr(true)}>${esc(w.t)}</b>${w.rom ? `<small>${esc(w.rom)}</small>` : ''}</span><span class="i-side">${esc(w.en)}</span></button>`).join('') };
  if (l.qs) return { text: 'Learn these key terms, then check your understanding.',
    list: l.terms.map(([t, d]) => `<div class="idea-row"><span class="i-main"><b>${esc(t)}</b><small>${esc(d)}</small></span></div>`).join('') };
  if (l.items) return { text: 'Here are the key events. Read them, then answer the questions.',
    list: l.items.map((it) => `<div class="idea-row"><span class="i-year">${esc(it.year)}</span><span class="i-main"><b>${esc(it.event)}</b><small>${esc(it.detail)}</small></span></div>`).join('') };
  if (l.keys) return { text: 'Review these openings before the quiz.',
    list: l.keys.map((k) => `<div class="idea-row"><span class="i-main"><b>${esc(GAMBITS[k].name)}</b><small class="mono">${esc(movesText(GAMBITS[k].moves))}</small><small>${esc(GAMBITS[k].idea)}</small></span></div>`).join('') };
  return { text: 'Read carefully, then answer the questions.', list: '' };
}

function renderLearn() {
  const { text, list } = ideaContent();
  shell(`<h1 class="lsn-title">${esc(L.lesson.title)}</h1>
    <p class="lsn-sub">${esc(L.course.name)} · ${esc(L.lesson.unit?.desc || '')}</p>
    <section class="idea-card">
      <div class="idea-top"><span class="idea-ic">${icon('book', 'purple', 26)}</span><div><b>Key idea</b><p>${esc(text)}</p></div></div>
      <div class="idea-list">${list}</div>
      ${ideaScene(L.course.color)}
    </section>
    ${L.course.note ? `<p class="lsn-note">${esc(L.course.note)}</p>` : ''}`,
  `<button class="primary-btn" data-l="begin">Start questions ${arrow}</button>`);
}

/* ---------- Questions ---------- */
function boardHTML(b) {
  if (!b) return '';
  const rows = b.flip ? [...b.board].reverse().map((r) => [...r].reverse()) : b.board;
  let cells = '';
  rows.forEach((row, ri) => row.forEach((sq, ci) => {
    const file = b.flip ? 7 - ci : ci; const rank = b.flip ? ri + 1 : 8 - ri;
    const name = 'abcdefgh'[file] + rank;
    const piece = sq ? `<span class="pc ${sq.color}">${PIECES[sq.type]}︎</span>` : '';
    cells += `<div class="sq ${(file + rank) % 2 ? 'l' : 'd'}${b.last.includes(name) ? ' hl' : ''}">${piece}</div>`;
  }));
  return `<div class="board mini" aria-label="Chess board">${cells}</div>`;
}

function shuffleIdx(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function renderQ() {
  const q = L.queue[L.idx];
  L.checked = false; L.sel = null; L.built = [];
  if (q.type === 'match') L.match = { left: shuffleIdx(q.pairs.length), right: shuffleIdx(q.pairs.length), picked: null, solved: 0 };
  const listen = q.listen && voiced();
  const prompt = q.listen && !listen ? q.fallback : q.prompt;
  const optText = (o) => `<span class="o-txt"><span${o.native ? langAttr(true) : ''}>${esc(o.label)}</span>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</span>`;
  let body = '';
  if (q.type === 'mc') body = `${boardHTML(q.board)}<div class="opts">${q.options.map((o, k) => `<button class="opt" data-opt="${k}" style="--i:${k}"><span class="letter">${LETTERS[k]}</span>${o.emoji ? `<span class="o-emoji">${o.emoji}</span>` : ''}${optText(o)}<span class="o-mark"></span></button>`).join('')}</div>`;
  if (q.type === 'pics') body = `<div class="pics">${q.options.map((o, k) => `<button class="pic" data-opt="${k}" style="--i:${k}"><span class="letter">${LETTERS[k]}</span><span class="pic-e">${o.emoji}</span>${optText(o)}</button>`).join('')}</div>`;
  if (q.type === 'build') body = `<div class="slot-line" id="built"${langAttr(q.native)}><span class="slot-hint">Tap the tiles in order</span></div>
    <div class="tiles" id="bank"${langAttr(q.native)}>${q.tiles.map((t, k) => `<button class="tile ${q.mono ? 'mono' : ''}" data-tile="${k}" style="--i:${k}">${esc(t)}</button>`).join('')}</div>`;
  if (q.type === 'match') body = `<div class="match">
      <div class="col"${langAttr(q.native)}>${L.match.left.map((k, n) => `<button class="tile mt" data-ml="${k}" style="--i:${n}">${esc(q.pairs[k][0])}</button>`).join('')}</div>
      <div class="col">${L.match.right.map((k, n) => `<button class="tile mt" data-mr="${k}" style="--i:${n}">${esc(q.pairs[k][1])}</button>`).join('')}</div></div>`;
  const sub = q.sub && !listen ? `<p class="q-sub ${q.mono ? 'mono' : ''}">${q.speak ? speakBtn(q.speak) : ''}<span${langAttr(q.native && !q.mono && q.type !== 'build')}>${esc(q.sub)}</span></p>`
    : q.speak && !q.sub ? `<p class="q-sub">${speakBtn(q.speak)}</p>` : '';
  shell(`<div class="q-head"><h2>Check your understanding</h2><span>${L.idx + 1} of ${L.queue.length}</span></div>
    <article class="qcard" id="qcard">
      ${q.kicker ? `<span class="kicker">${esc(q.kicker)}</span>` : ''}
      ${q.emoji ? `<div class="q-emoji">${q.emoji}</div>` : ''}
      ${listen ? `<div class="listen-row">${speakBtn(q.listen, true)}<button class="speak slow" data-speak="${esc(q.listen)}" data-slow="1" aria-label="Play slowly">🐢</button></div>` : ''}
      <p class="q-text">${esc(prompt)}</p>
      ${sub}${body}
    </article>
    <div id="fb"></div>`,
  q.type === 'match' ? `<p class="foot-hint">Tap a word on each side to pair them.</p>`
    : `<button class="primary-btn" id="go" data-l="check" disabled>Check answer ${arrow}</button>`);
  if (listen) setTimeout(() => speak(q.listen, tts()), 300);
}

function setGo(text, cls = '') {
  const foot = document.querySelector('.lsn-foot');
  foot.innerHTML = `<button class="primary-btn ${cls} pop-in" id="go" data-l="next">${text} ${arrow}</button>`;
  document.getElementById('go').focus({ preventScroll: true });
}

function resolve(ok, answerText, el) {
  const q = L.queue[L.idx];
  L.checked = true;
  if (ok) {
    L.solved++; L.combo++; L.bestCombo = Math.max(L.bestCombo, L.combo);
    if (!L.missed.has(q._i)) L.firstTry++;
    if (L.combo >= 3) sfx.combo(L.combo); else sfx.good();
    burst(el || document.getElementById('qcard'));
  } else {
    L.combo = 0; L.wrong++; L.missed.add(q._i);
    L.queue.push(q);
    sfx.bad();
    document.getElementById('qcard')?.classList.add('bad');
  }
  const bar = document.querySelector('.lsn-prog i'); const pct = Math.round((L.solved / L.total) * 100);
  if (bar) { bar.style.width = `${pct}%`; document.querySelector('.lsn-prog em').textContent = `${pct}%`; }
  const lines = [];
  if (!ok && answerText) lines.push(`Correct answer: <b${langAttr(q.native)}>${esc(answerText)}</b>`);
  if (q.explain) lines.push(esc(q.explain));
  if (ok && L.combo >= 3) lines.push(`🔥 ${L.combo} in a row!`);
  document.getElementById('fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${mascot(ok ? 'cheer' : 'sad', 64)}
    <div><b>${ok ? pickOne(CHEERS) : 'Not quite.'}</b>${lines.map((x) => `<p>${x}</p>`).join('')}${ok ? '' : '<p class="fb-small">This one will come back later.</p>'}</div></div>`;
  setGo('Continue', ok ? 'ok' : 'no');
  requestAnimationFrame(() => document.getElementById('fb')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
}

function next() {
  L.idx++;
  if (L.idx >= L.queue.length) return finish();
  renderQ();
}

function finish() {
  const stars = L.wrong === 0 ? 3 : L.wrong <= 2 ? 2 : 1;
  const res = { stars, wrong: L.wrong, total: L.total, bestCombo: L.bestCombo,
    accuracy: Math.round((L.firstTry / L.total) * 100), secs: Math.round((Date.now() - L.started) / 1000) };
  const cb = L.cb; L = null; cb.onDone(res);
}

function updateBuilt() {
  const q = L.queue[L.idx];
  document.getElementById('built').innerHTML = L.built.length
    ? L.built.map((k, pos) => `<button class="tile in ${q.mono ? 'mono' : ''}" data-unbuild="${pos}">${esc(q.tiles[k])}</button>`).join('')
    : '<span class="slot-hint">Tap the tiles in order</span>';
  document.querySelectorAll('[data-tile]').forEach((b) => b.classList.toggle('used', L.built.includes(+b.dataset.tile)));
  document.getElementById('go').disabled = L.built.length === 0;
}

function matchTap(t, d) {
  const q = L.queue[L.idx]; const m = L.match;
  const side = d.ml !== undefined ? 'l' : 'r'; const k = +(d.ml ?? d.mr);
  if (side === 'l' && q.native) speak(q.pairs[k][0], tts());
  if (!m.picked || m.picked.side === side) {
    document.querySelectorAll('.mt.sel').forEach((b) => b.classList.remove('sel'));
    t.classList.add('sel'); m.picked = { side, k, el: t }; sfx.tap(); return;
  }
  const a = m.picked; m.picked = null;
  if (a.k === k) {
    [a.el, t].forEach((b) => { b.classList.remove('sel'); b.classList.add('solved'); });
    m.solved++; sfx.pop();
    if (m.solved === q.pairs.length) resolve(true, '', t);
  } else {
    [a.el, t].forEach((b) => { b.classList.remove('sel'); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 450); });
    sfx.bad();
  }
}

document.addEventListener('click', (e) => {
  if (!L) return;
  const t = e.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.speak) { e.stopPropagation(); return speak(d.speak, tts(), d.slow ? 0.5 : 0.85); }
  if (d.l === 'quit') return L.cb.onQuit(() => { L = null; });
  if (d.l === 'menu') { S.sound = !S.sound; save(); return toast(`Sound effects ${S.sound ? 'on' : 'off'}`); }
  if (d.l === 'begin') { L.phase = 'quiz'; sfx.tap(); return renderQ(); }
  if (d.l === 'next') return next();
  if (d.l === 'check' && !L.checked) {
    const q = L.queue[L.idx];
    if (q.type === 'build') {
      const j = q.join ?? ' '; const ok = L.built.map((k) => q.tiles[k]).join(j) === q.answer.join(j);
      document.querySelectorAll('#built .tile').forEach((b) => b.classList.add(ok ? 'right' : 'wrong'));
      document.querySelectorAll('[data-tile]').forEach((b) => { b.disabled = true; });
      return resolve(ok, q.answer.join(j), document.getElementById('built'));
    }
    if (L.sel === null) return;
    const ok = L.sel === q.answer;
    document.querySelectorAll('[data-opt]').forEach((b) => {
      b.disabled = true; b.classList.remove('sel');
      if (+b.dataset.opt === q.answer) b.classList.add('right');
      else if (+b.dataset.opt === L.sel) b.classList.add('wrong');
    });
    return resolve(ok, q.options[q.answer].label, document.querySelector('[data-opt].right'));
  }
  if (L.checked) return;
  const q = L.queue[L.idx];
  if (d.opt !== undefined) {
    L.sel = +d.opt; sfx.tap();
    document.querySelectorAll('[data-opt]').forEach((b) => b.classList.toggle('sel', b === t));
    document.getElementById('go').disabled = false;
    if (q.options[L.sel].speak) speak(q.options[L.sel].speak, tts());
    return;
  }
  if (d.tile !== undefined) { if (!L.built.includes(+d.tile)) { L.built.push(+d.tile); sfx.tap(); updateBuilt(); } return; }
  if (d.unbuild !== undefined) { L.built.splice(+d.unbuild, 1); sfx.tap(); updateBuilt(); return; }
  if (d.ml !== undefined || d.mr !== undefined) return matchTap(t, d);
});

document.addEventListener('keydown', (e) => {
  if (!L || document.querySelector('.sheet-back')) return;
  if (e.key === 'Enter') { const g = document.getElementById('go'); if (g && !g.disabled) { e.preventDefault(); g.click(); } }
  if (/^[1-4]$/.test(e.key) && !L.checked) document.querySelector(`[data-opt="${+e.key - 1}"]`)?.click();
});
