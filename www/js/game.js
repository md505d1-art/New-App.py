// Play chess against Hana (the AI). Used by chess lessons and Free play.
import { Chess } from '../vendor/chess.js';
import { mascot } from './mascot.js';

const PIECES = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const LEVEL_NAME = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---- engine worker with a promise API ---- */
let worker = null; let seq = 0; const waiting = new Map();
function ask(msg) {
  if (!worker) {
    worker = new Worker(new URL('./engine-worker.js', import.meta.url), { type: 'module' });
    worker.onmessage = (e) => { const r = waiting.get(e.data.id); if (r) { waiting.delete(e.data.id); r(e.data); } };
  }
  const id = ++seq;
  return new Promise((res) => { waiting.set(id, res); worker.postMessage({ ...msg, id }); });
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---- grading ---- */
function gradeOf(loss) {
  if (loss <= 20) return { k: 'best', label: 'Best move!', icon: '⭐', mood: 'cheer' };
  if (loss <= 60) return { k: 'good', label: 'Good move', icon: '👍', mood: 'happy' };
  if (loss <= 150) return { k: 'inacc', label: 'Inaccuracy', icon: '🤔', mood: 'think' };
  if (loss <= 300) return { k: 'mistake', label: 'Mistake', icon: '❗', mood: 'sad' };
  return { k: 'blunder', label: 'Blunder', icon: '💥', mood: 'sad' };
}

let G = null; // active game
let api = null; // callbacks into the app: { onFinish(result), onQuit(), spendGems(n) -> bool, sfx, gems() }

export function startGame(opts, callbacks) {
  api = callbacks;
  const c = new Chess(opts.fen || undefined);
  G = {
    c, side: opts.side || 'w', level: opts.level || 1, title: opts.title || 'Free play', idea: opts.idea || '',
    prefix: opts.prefix || [], lessonId: opts.lessonId || null,
    sel: null, targets: [], last: null, hint: null, thinking: false, over: null,
    grades: { best: 0, good: 0, inacc: 0, mistake: 0, blunder: 0 },
    coach: { mood: 'happy', text: opts.intro || `You're ${opts.side === 'b' ? 'Black' : 'White'}. Good luck!` },
    started: Date.now(),
  };
  draw();
  if (c.turn() !== G.side) aiMove();
}

export function gameActive() { return !!G; }

function boardHTML() {
  const { c, side, sel, targets, last, hint } = G;
  const b = c.board();
  const flip = side === 'b';
  const kingSq = c.inCheck() ? findKing(b, c.turn()) : null;
  let cells = '';
  for (let ri = 0; ri < 8; ri++) for (let ci = 0; ci < 8; ci++) {
    const r = flip ? 7 - ri : ri; const f = flip ? 7 - ci : ci;
    const sq = b[r][f]; const name = 'abcdefgh'[f] + (8 - r);
    const light = (f + (8 - r)) % 2 === 1;
    const cls = ['sq', light ? 'l' : 'd'];
    if (last && (last.from === name || last.to === name)) cls.push('hl');
    if (sel === name) cls.push('selsq');
    if (hint && (hint.from === name || hint.to === name)) cls.push('hint');
    if (kingSq === name) cls.push('check');
    const tgt = targets.includes(name) ? `<i class="${sq ? 'cap' : 'dot'}"></i>` : '';
    const coordF = ri === 7 ? `<em class="cf">${'abcdefgh'[f]}</em>` : '';
    const coordR = ci === 0 ? `<em class="cr">${8 - r}</em>` : '';
    const piece = sq ? `<span class="pc ${sq.color}">${PIECES[sq.type]}︎</span>` : '';
    cells += `<button class="${cls.join(' ')}" data-sq="${name}" aria-label="${name}${sq ? ' ' + sq.color + sq.type : ''}">${piece}${tgt}${coordF}${coordR}</button>`;
  }
  return `<div class="board play">${cells}</div>`;
}
function findKing(b, color) {
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) { const p = b[r][f]; if (p && p.type === 'k' && p.color === color) return 'abcdefgh'[f] + (8 - r); }
  return null;
}

function movesHTML() {
  const hist = G.c.history();
  const all = [...G.prefix, ...hist];
  // Figure out move numbers: the prefix always starts from the initial position.
  let html = ''; let ply = 0;
  for (const m of all) {
    if (ply % 2 === 0) html += `<span class="mn">${ply / 2 + 1}.</span>`;
    html += `<span class="${ply < G.prefix.length ? 'pre' : ''}">${esc(m)}</span>`;
    ply++;
  }
  return html || '<span class="pre">Starting position</span>';
}

function draw() {
  const app = document.getElementById('app');
  const lv = LEVEL_NAME[G.level];
  const myTurn = !G.over && !G.thinking && G.c.turn() === G.side;
  app.innerHTML = `<div class="game">
    <header class="l-top"><button class="x" data-g="quit" aria-label="Leave game">✕</button>
      <div class="g-title"><b>${esc(G.title)}</b><small>vs Hana · ${lv}</small></div>
      <div class="g-gems">💎 ${api.gems()}</div></header>
    <div class="g-body">
      <div class="opp"><div class="opp-av">${mascot(G.thinking ? 'think' : 'happy', 44)}</div>
        <div><b>Hana</b><small>${G.thinking ? 'Thinking<span class="dots3"><i>.</i><i>.</i><i>.</i></span>' : `AI · ${lv}`}</small></div>
        <span class="turn ${myTurn ? 'you' : ''}">${G.over ? 'Game over' : myTurn ? 'Your move' : 'Hana to move'}</span></div>
      ${boardHTML()}
      <div class="moves" id="moves">${movesHTML()}</div>
      <div class="coach">${mascot(G.coach.mood, 64)}<div class="bubble">${G.coach.text}</div></div>
    </div>
    <footer class="g-foot">
      <button class="gbtn" data-g="hint" ${myTurn ? '' : 'disabled'}><span>💡</span>Hint<small>💎 10</small></button>
      <button class="gbtn" data-g="undo" ${myTurn && G.c.history().length >= 2 ? '' : 'disabled'}><span>↩️</span>Take back<small>💎 10</small></button>
      <button class="gbtn" data-g="resign" ${G.over ? 'disabled' : ''}><span>🏳️</span>Resign<small>&nbsp;</small></button>
    </footer>
  </div>`;
  const mv = document.getElementById('moves'); if (mv) mv.scrollLeft = mv.scrollWidth;
}

function say(mood, text) { G.coach = { mood, text }; }

async function playerMove(from, to) {
  const before = G.c.fen();
  let mv;
  try { mv = G.c.move({ from, to, promotion: 'q' }); } catch { return; }
  G.sel = null; G.targets = []; G.hint = null; G.last = mv;
  api.sfx.tap();
  if (checkOver()) return;
  G.thinking = true;
  say('think', 'Hmm, let me look at that…');
  draw();
  const [grade] = await Promise.all([ask({ type: 'grade', fen: before, move: mv.san }), wait(250)]);
  if (!G) return;
  const g = gradeOf(grade.loss);
  G.grades[g.k]++;
  const better = grade.best && grade.best !== mv.san && g.k !== 'best' && g.k !== 'good' ? ` <b class="mono">${esc(grade.best)}</b> was stronger.` : '';
  say(g.mood, `<span class="grade g-${g.k}">${g.icon} ${g.label}</span> <span class="mono">${esc(mv.san)}</span>.${better}`);
  if (g.k === 'best') api.sfx.good(); else if (g.k === 'mistake' || g.k === 'blunder') api.sfx.bad();
  await aiMove(true);
}

async function aiMove(keepCoach = false) {
  G.thinking = true;
  if (!keepCoach) say('think', G.idea ? `Remember the idea: ${esc(G.idea)}` : 'My turn!');
  draw();
  const [res] = await Promise.all([ask({ type: 'best', fen: G.c.fen(), level: G.level }), wait(450)]);
  if (!G || !res.move) return;
  G.last = G.c.move({ from: res.move.from, to: res.move.to, promotion: res.move.promotion || 'q' });
  G.thinking = false;
  if (checkOver()) return;
  if (G.c.inCheck()) say('think', `Check! I played <span class="mono">${esc(G.last.san)}</span>. Protect your king.`);
  draw();
}

function checkOver() {
  const c = G.c;
  if (!c.isGameOver()) return false;
  let result;
  if (c.isCheckmate()) result = c.turn() === G.side ? 'loss' : 'win';
  else result = 'draw';
  endGame(result, c.isCheckmate() ? 'by checkmate' : c.isStalemate() ? 'by stalemate' : 'by draw rules');
  return true;
}

function endGame(result, how) {
  G.over = result; G.thinking = false;
  const total = Object.values(G.grades).reduce((a, b) => a + b, 0);
  const accuracy = total ? Math.round(((G.grades.best + G.grades.good * 0.8 + G.grades.inacc * 0.4) / total) * 100) : 0;
  say(result === 'win' ? 'cheer' : result === 'draw' ? 'happy' : 'sad',
    result === 'win' ? 'You beat me! Amazing!' : result === 'draw' ? 'A draw. Well fought!' : 'I win this time. Let\'s try again!');
  draw();
  const summary = { result, how, accuracy, grades: { ...G.grades }, level: G.level, lessonId: G.lessonId, moves: G.c.history().length, secs: Math.round((Date.now() - G.started) / 1000) };
  setTimeout(() => { const s = summary; G = null; api.onFinish(s); }, 1300);
}

document.addEventListener('click', (e) => {
  if (!G) return;
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.sq) {
    if (G.over || G.thinking || G.c.turn() !== G.side) return;
    const sq = t.dataset.sq;
    if (G.sel && G.targets.includes(sq)) return void playerMove(G.sel, sq);
    const p = G.c.get(sq);
    if (p && p.color === G.side) {
      G.sel = sq; G.targets = G.c.moves({ square: sq, verbose: true }).map((m) => m.to);
    } else { G.sel = null; G.targets = []; }
    return draw();
  }
  const a = t.dataset.g; if (!a) return;
  if (a === 'quit') return api.onQuit(() => { G = null; });
  if (a === 'resign') return endGame('loss', 'by resignation');
  if (a === 'hint') {
    if (!api.spendGems(10)) return;
    G.thinking = true; draw();
    ask({ type: 'best', fen: G.c.fen(), level: 3 }).then((r) => {
      if (!G) return;
      G.thinking = false; G.hint = r.move; say('think', `Try <b class="mono">${esc(r.move.san)}</b>. Look at the highlighted squares.`); draw();
    });
    return;
  }
  if (a === 'undo') {
    if (!api.spendGems(10)) return;
    G.c.undo(); G.c.undo(); G.last = null; G.sel = null; G.targets = []; G.hint = null;
    say('happy', 'Okay, take another look.'); return draw();
  }
});
