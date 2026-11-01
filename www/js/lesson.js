// The lesson player: one question card at a time, instant feedback, combos, Hana reacting in the corner.
import { mascot } from './mascot.js';
import { COLORS } from './art.js';
import { esc, sfx, speak, canSpeak, burst, floatText } from './store.js';

const PIECES = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const CHEERS = ['Nice!', 'Yes!', 'Great job!', 'Nailed it!', 'You got it!', 'Brilliant!'];
const OOPS = ['Not quite.', 'Almost!', 'Close one.', 'Let\'s learn this one.'];
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

let L = null;

export function startLesson(course, lesson, callbacks) {
  const qs = course.questions(lesson).map((q, i) => ({ ...q, _i: i }));
  L = { course, lesson, cb: callbacks, queue: qs, total: qs.length, idx: 0, pips: qs.map(() => 'todo'),
    wrong: 0, firstTry: 0, combo: 0, bestCombo: 0, started: Date.now(), locked: false, built: [], match: null, sel: null };
  renderQ();
}
export const lessonActive = () => !!L;

function boardHTML(b) {
  if (!b) return '';
  const rows = b.flip ? [...b.board].reverse().map((r) => [...r].reverse()) : b.board;
  let cells = '';
  rows.forEach((row, ri) => row.forEach((sq, ci) => {
    const file = b.flip ? 7 - ci : ci; const rank = b.flip ? ri + 1 : 8 - ri;
    const name = 'abcdefgh'[file] + rank;
    const hl = b.last.includes(name) ? ' hl' : '';
    const piece = sq ? `<span class="pc ${sq.color}">${PIECES[sq.type]}︎</span>` : '';
    cells += `<div class="sq ${(file + rank) % 2 ? 'l' : 'd'}${hl}">${piece}</div>`;
  }));
  return `<div class="board mini" aria-label="Chess board">${cells}</div>`;
}

const tts = () => L.course.tts;
const voiced = () => !!tts() && canSpeak(tts());
const nat = (q) => (q.native && L.course.tts ? ` lang="${L.course.tts}" dir="auto"` : '');
const speakBtn = (text, big = false) => (voiced() ? `<button class="speak ${big ? 'big' : ''}" data-speak="${esc(text)}" aria-label="Play audio"><svg viewBox="0 0 24 24" width="${big ? 34 : 20}" height="${big ? 34 : 20}"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8q3 4 0 8M18.5 5.5q5 6.5 0 13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg></button>` : '');

function renderQ(say) {
  const q = L.queue[L.idx];
  L.locked = false; L.built = []; L.sel = null;
  if (q.type === 'match') L.match = { left: shuffleIdx(q.pairs.length), right: shuffleIdx(q.pairs.length), picked: null, solved: 0 };
  const listen = q.listen && voiced();
  const prompt = q.listen && !listen ? q.fallback : q.prompt;
  const [c, d] = COLORS[L.course.color] || COLORS.green;
  const opts = (cls) => q.options.map((o, k) => `<button class="${cls}" data-opt="${k}" style="--i:${k}">
      ${o.emoji ? `<span class="pic-e">${o.emoji}</span>` : `<kbd>${k + 1}</kbd>`}
      <span class="o-txt"><span${o.native ? ` lang="${L.course.tts}" dir="auto"` : ''}>${esc(o.label)}</span>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</span></button>`).join('');
  let body = '';
  if (q.type === 'mc') body = `${boardHTML(q.board)}<div class="opts">${opts('opt')}</div>`;
  if (q.type === 'pics') body = `<div class="pics n${q.options.length}">${opts('pic')}</div>`;
  if (q.type === 'build') body = `<div class="slot-line" id="built"${nat(q)}><span class="slot-hint">Tap the tiles below</span></div>
      <div class="tiles" id="bank"${nat(q)}>${q.tiles.map((t, k) => `<button class="tile ${q.mono ? 'mono' : ''}" data-tile="${k}" style="--i:${k}">${esc(t)}</button>`).join('')}</div>`;
  if (q.type === 'match') body = `<div class="match">
      <div class="col"${nat(q)}>${L.match.left.map((k, n) => `<button class="tile mt" data-ml="${k}" style="--i:${n}">${esc(q.pairs[k][0])}</button>`).join('')}</div>
      <div class="col">${L.match.right.map((k, n) => `<button class="tile mt" data-mr="${k}" style="--i:${n}">${esc(q.pairs[k][1])}</button>`).join('')}</div></div>`;
  const sub = q.sub && !(q.listen && listen) ? `<p class="q-sub ${q.mono ? 'mono' : ''}">${q.speak ? speakBtn(q.speak) : ''}<span>${esc(q.sub)}</span></p>`
    : q.speak && !q.sub ? `<p class="q-sub">${speakBtn(q.speak)}</p>` : '';
  document.getElementById('app').innerHTML = `<div class="lsn" style="--c:${c};--cd:${d}">
    <header class="lsn-top">
      <button class="icon-btn" data-l="quit" aria-label="Quit lesson">✕</button>
      <div class="pips">${L.pips.map((p, i) => `<i class="${p} ${i === q._i ? 'now' : ''}"></i>`).join('')}</div>
      <div class="combo ${L.combo >= 2 ? 'on' : ''}" id="combo">🔥 ×${L.combo}</div>
    </header>
    <main class="lsn-stage">
      <article class="qcard" id="qcard">
        <span class="kicker">${esc(q.kicker || 'Question')}</span>
        ${q.emoji ? `<div class="q-emoji">${q.emoji}</div>` : ''}
        ${listen ? `<div class="listen-row">${speakBtn(q.listen, true)}<button class="speak slow" data-speak="${esc(q.listen)}" data-slow="1" aria-label="Play slowly">🐢</button></div>` : ''}
        <h2 class="q-prompt"${q.native && /“/.test(prompt) ? ' dir="auto"' : ''}>${esc(prompt)}</h2>
        ${sub}${body}
        <div class="explain" id="explain" hidden></div>
      </article>
    </main>
    <footer class="lsn-foot">
      <div class="hana-mini" id="hana">${mascot(say?.mood || (q.type === 'build' ? 'think' : 'happy'), 60)}<span class="hana-say" id="say">${esc(say?.text || hint(q))}</span></div>
      <button class="go-btn" id="go" data-l="go" hidden>Done</button>
    </footer>
  </div>`;
  if (listen) setTimeout(() => speak(q.listen, tts()), 300);
}
function hint(q) {
  return { mc: 'Tap an answer.', pics: 'Tap the right picture.', build: 'Tap tiles in order.', match: 'Tap one on each side.' }[q.type];
}
function shuffleIdx(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function setHana(mood, text) {
  const h = document.getElementById('hana'); if (!h) return;
  h.innerHTML = `${mascot(mood, 60)}<span class="hana-say pop-in">${esc(text)}</span>`;
}

function resolve(ok, answerText, el) {
  const q = L.queue[L.idx];
  L.locked = true;
  const card = document.getElementById('qcard');
  const go = document.getElementById('go');
  if (ok) {
    L.combo++; L.bestCombo = Math.max(L.bestCombo, L.combo);
    if (L.pips[q._i] === 'todo') L.firstTry++;
    L.pips[q._i] = L.pips[q._i] === 'miss' ? 'fixed' : 'ok';
    card.classList.add('good');
    if (L.combo >= 3) sfx.combo(L.combo); else sfx.good();
    burst(el || card); floatText(el || card, '+1');
    const cb = document.getElementById('combo');
    if (cb) { cb.textContent = `🔥 ×${L.combo}`; cb.classList.toggle('on', L.combo >= 2); cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump'); }
    setHana('cheer', L.combo >= 3 ? `${L.combo} in a row!` : pickOne(CHEERS));
  } else {
    L.combo = 0; L.wrong++;
    L.pips[q._i] = 'miss';
    L.queue.push(q);
    card.classList.add('bad');
    sfx.bad();
    document.getElementById('combo')?.classList.remove('on');
    setHana('sad', pickOne(OOPS));
  }
  const pip = document.querySelectorAll('.pips i')[q._i]; if (pip) pip.className = `${L.pips[q._i]} now`;
  const ex = document.getElementById('explain');
  const parts = [];
  if (!ok && answerText) parts.push(`<b>Answer:</b> <span${nat(q)}>${esc(answerText)}</span>`);
  if (q.explain) parts.push(esc(q.explain));
  if (parts.length) { ex.innerHTML = parts.join('<br>'); ex.hidden = false; ex.className = `explain ${ok ? 'ok' : 'no'} pop-in`; }
  if (ok && !q.explain) { setTimeout(() => { if (L && L.locked && L.queue[L.idx] === q) next(); }, 850); go.hidden = true; }
  else { go.hidden = false; go.textContent = 'Next'; go.className = `go-btn ${ok ? '' : 'red'} pop-in`; go.focus({ preventScroll: true }); }
}

function next() {
  L.idx++;
  if (L.idx >= L.queue.length) return finish();
  const card = document.getElementById('qcard');
  if (card) { card.classList.add('leave'); setTimeout(() => L && renderQ(), 180); } else renderQ();
}

function finish() {
  const stars = L.wrong === 0 ? 3 : L.wrong <= 2 ? 2 : 1;
  const res = { stars, wrong: L.wrong, total: L.total, firstTry: L.firstTry, bestCombo: L.bestCombo,
    accuracy: Math.round((L.firstTry / L.total) * 100), secs: Math.round((Date.now() - L.started) / 1000) };
  const cb = L.cb; L = null; cb.onDone(res);
}

function updateBuilt() {
  const q = L.queue[L.idx];
  const line = document.getElementById('built');
  line.innerHTML = L.built.length ? L.built.map((k, pos) => `<button class="tile in ${q.mono ? 'mono' : ''}" data-unbuild="${pos}">${esc(q.tiles[k])}</button>`).join('') : '<span class="slot-hint">Tap the tiles below</span>';
  document.querySelectorAll('[data-tile]').forEach((b) => b.classList.toggle('used', L.built.includes(+b.dataset.tile)));
  const go = document.getElementById('go'); go.hidden = L.built.length === 0; go.textContent = 'Check'; go.className = 'go-btn';
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
    m.solved++; sfx.pop(); burst(t);
    if (m.solved === q.pairs.length) resolve(true, '', t);
  } else {
    [a.el, t].forEach((b) => { b.classList.remove('sel'); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 450); });
    sfx.bad(); setHana('think', 'Try another pair.');
  }
}

document.addEventListener('click', (e) => {
  if (!L) return;
  const t = e.target.closest('button'); if (!t) return;
  const d = t.dataset;
  if (d.speak) { e.stopPropagation(); return speak(d.speak, tts(), d.slow ? 0.5 : 0.85); }
  if (d.l === 'quit') return L.cb.onQuit(() => { L = null; });
  if (d.l === 'go') {
    if (!L.locked && L.queue[L.idx].type === 'build') {
      const q = L.queue[L.idx]; const j = q.join ?? ' ';
      const ok = L.built.map((k) => q.tiles[k]).join(j) === q.answer.join(j);
      document.querySelectorAll('#built .tile').forEach((b) => b.classList.add(ok ? 'right' : 'wrong'));
      return resolve(ok, q.answer.join(j), document.getElementById('built'));
    }
    if (L.locked) return next();
    return;
  }
  if (L.locked) return;
  const q = L.queue[L.idx];
  if (d.opt !== undefined) {
    const k = +d.opt; const o = q.options[k];
    if (o.speak) speak(o.speak, tts());
    const ok = k === q.answer;
    document.querySelectorAll('[data-opt]').forEach((b) => { b.disabled = true; if (+b.dataset.opt === q.answer) b.classList.add('right'); });
    if (!ok) t.classList.add('wrong');
    return resolve(ok, q.options[q.answer].label, t);
  }
  if (d.tile !== undefined) { if (!L.built.includes(+d.tile)) { L.built.push(+d.tile); sfx.tap(); updateBuilt(); } return; }
  if (d.unbuild !== undefined) { L.built.splice(+d.unbuild, 1); sfx.tap(); updateBuilt(); return; }
  if (d.ml !== undefined || d.mr !== undefined) return matchTap(t, d);
});

document.addEventListener('keydown', (e) => {
  if (!L || document.querySelector('.sheet-back')) return;
  if (e.key === 'Enter') { const g = document.getElementById('go'); if (g && !g.hidden) { e.preventDefault(); g.click(); } }
  if (/^[1-4]$/.test(e.key) && !L.locked) document.querySelector(`[data-opt="${+e.key - 1}"]`)?.click();
});
