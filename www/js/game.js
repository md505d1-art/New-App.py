// Play chess against Hana, chess.com style: drag or tap to move, board sounds, eval bar,
// move ratings as you play, and a full record for the game review.
import { Chess } from '../vendor/chess.js';
import { mascot } from './mascot.js';
import { chessSound, soundFor } from './chess-sound.js';
import { hanaSay, bitSay } from './voice.js';
import { CLASS, classifyMove, sideAccuracy, whiteScore, evalText, whiteBar, material, arrowSVG } from './chess-analysis.js';

const LEVEL_NAME = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pieceImg = (code, cls = 'cp') => `<img class="${cls}" src="img/pieces/${code}.svg" alt="" draggable="false">`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---- two engine workers: one plays, one analyses ---- */
function makeEngine() {
  const w = new Worker(new URL('./engine-worker.js', import.meta.url), { type: 'module' });
  const waiting = new Map(); let seq = 0;
  w.onmessage = (e) => { const r = waiting.get(e.data.id); if (r) { waiting.delete(e.data.id); r(e.data); } };
  return { ask: (msg) => new Promise((res) => { const id = ++seq; waiting.set(id, res); w.postMessage({ ...msg, id }); }) };
}
let player = null; let analyst = null;
export function engines() { player = player || makeEngine(); analyst = analyst || makeEngine(); return { player, analyst }; }

let G = null; let api = null;

export function startGame(opts, callbacks) {
  api = callbacks; engines();
  const c = new Chess(opts.fen || undefined);
  G = { c, startFen: c.fen(), startTurn: c.turn(), side: opts.side || 'w', level: opts.level || 1, title: opts.title || 'Free play', idea: opts.idea || '',
    prefix: opts.prefix || [], lessonId: opts.lessonId || null, moves: [], evals: [], classes: [], gen: 0, pending: new Set(),
    sel: null, targets: [], last: null, hint: null, thinking: false, over: null, flip: false, promo: null,
    coach: { mood: 'happy', html: opts.intro || 'Good luck!' }, started: Date.now() };
  chessSound.start();
  draw();
  queueEval(0);
  if (c.turn() !== G.side) aiTurn();
}
export const gameActive = () => !!G;

/* ---------- rendering ---------- */
function squaresHTML() {
  const { c, sel, targets, last, hint } = G;
  const b = c.board(); const flip = (G.side === 'b') !== G.flip;
  const kingSq = c.inCheck() ? findKing(b, c.turn()) : null;
  let html = '';
  for (let ri = 0; ri < 8; ri++) for (let ci = 0; ci < 8; ci++) {
    const r = flip ? 7 - ri : ri; const f = flip ? 7 - ci : ci;
    const sq = b[r][f]; const name = 'abcdefgh'[f] + (8 - r);
    const cls = ['csq', (f + r) % 2 ? 'd' : 'l'];
    if (last && (last.from === name || last.to === name)) cls.push('hl');
    if (sel === name) cls.push('hl');
    if (hint && (hint.from === name || hint.to === name)) cls.push('hint');
    if (kingSq === name) cls.push('chk');
    const t = targets.includes(name) ? `<i class="${sq ? 'ring' : 'dot'}"></i>` : '';
    const coords = `${ci === 0 ? `<em class="rk">${8 - r}</em>` : ''}${ri === 7 ? `<em class="fl">${'abcdefgh'[f]}</em>` : ''}`;
    html += `<div class="${cls.join(' ')}" data-sq="${name}">${coords}${sq ? pieceImg(sq.color + sq.type) : ''}${t}</div>`;
  }
  return html;
}
function findKing(b, color) {
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) { const p = b[r][f]; if (p && p.type === 'k' && p.color === color) return 'abcdefgh'[f] + (8 - r); }
  return null;
}
const flipped = () => (G.side === 'b') !== G.flip;

function playerBar(color) {
  const isMe = color === G.side;
  const m = material(G.c.board());
  const took = m.took[color]; const adv = color === 'w' ? m.diff : -m.diff;
  const thinking = !isMe && G.thinking;
  return `<div class="pbar ${G.c.turn() === color && !G.over ? 'to-move' : ''}">
    <span class="pb-av ${isMe ? 'me' : 'ai'}">${isMe ? api.avatar(40) : mascot('happy', 40, { bit: false })}</span>
    <span class="pb-name"><b>${isMe ? esc(api.name()) : 'Hana'}</b><small>${isMe ? (color === 'w' ? 'White' : 'Black') : `AI · ${LEVEL_NAME[G.level]}`}${thinking ? ' · thinking<span class="dots3"><i>.</i><i>.</i><i>.</i></span>' : ''}</small></span>
    <span class="pb-took">${took.map((p) => pieceImg(p, 'tk')).join('')}${adv > 0 ? `<em>+${adv}</em>` : ''}</span>
  </div>`;
}

function evalBarHTML() {
  const k = latestEvalIndex();
  const ws = k < 0 ? 0 : whiteScore(G.evals[k].score, k, G.startTurn);
  const pct = whiteBar(ws);
  return `<div class="evalbar ${flipped() ? 'flip' : ''}" id="evalbar"><i style="height:${pct}%"></i><span class="${ws >= 0 ? 'w' : 'b'}">${evalText(ws)}</span></div>`;
}
function latestEvalIndex() { for (let i = G.moves.length; i >= 0; i--) if (G.evals[i]) return i; return -1; }

function movesHTML() {
  let html = '';
  G.prefix.forEach((san, i) => { if (i % 2 === 0) html += `<span class="mn">${i / 2 + 1}.</span>`; html += `<span class="mv book">${esc(san)}</span>`; });
  G.moves.forEach((m, i) => {
    const absPly = G.prefix.length + i;
    if (absPly % 2 === 0) html += `<span class="mn">${absPly / 2 + 1}.</span>`;
    const cl = G.classes[i]; const info = cl ? CLASS[cl] : null;
    html += `<span class="mv ${i === G.moves.length - 1 ? 'cur' : ''}">${info ? `<b class="cls" style="--k:${info.color}">${info.sym}</b>` : ''}${esc(m.san)}</span>`;
  });
  return html || '<span class="mn">Starting position</span>';
}

function coachHTML() {
  return `${mascot(G.coach.mood, 58)}<div class="cg-say">${G.coach.html}</div>`;
}

function draw() {
  const app = document.getElementById('app');
  const myTurn = !G.over && !G.thinking && G.c.turn() === G.side;
  const top = flipped() ? 'w' : 'b'; const bottom = top === 'w' ? 'b' : 'w';
  app.innerHTML = `<div class="cgame">
    <header class="cg-head"><button class="nav-ic" data-g="quit" aria-label="Leave game">✕</button>
      <div class="cg-title"><b>${esc(G.title)}</b><small>vs Hana · ${LEVEL_NAME[G.level]}</small></div><span class="cg-seeds">🌱 ${api.seeds()}</span></header>
    <div class="cg-main">
      ${playerBar(top)}
      <div class="cg-boardrow">${evalBarHTML()}
        <div class="cboard-wrap"><div class="cboard" id="cboard">${squaresHTML()}</div>
          <svg class="arrows" viewBox="0 0 8 8" aria-hidden="true">${G.hint ? arrowSVG(G.hint.from, G.hint.to, 'rgba(255,170,0,.85)', flipped()) : ''}</svg>
          ${G.promo ? promoHTML() : ''}</div></div>
      ${playerBar(bottom)}
      <div class="cg-coach" id="cg-coach">${coachHTML()}</div>
      <div class="cg-moves" id="cg-moves">${movesHTML()}</div>
    </div>
    <footer class="cg-foot">
      <button class="gbtn" data-g="hint" ${myTurn ? '' : 'disabled'}><span>💡</span>Hint<small>🌱 10</small></button>
      <button class="gbtn" data-g="undo" ${myTurn && G.moves.length >= 2 ? '' : 'disabled'}><span>↩️</span>Undo<small>🌱 10</small></button>
      <button class="gbtn" data-g="flip"><span>🔄</span>Flip<small>&nbsp;</small></button>
      <button class="gbtn" data-g="resign" ${G.over ? 'disabled' : ''}><span>🏳️</span>Resign<small>&nbsp;</small></button>
    </footer>
  </div>`;
  const mv = document.getElementById('cg-moves'); if (mv) mv.scrollLeft = mv.scrollWidth;
  if (G.anim) { slide(G.anim); G.anim = null; }
}

function refreshSide() {
  const mv = document.getElementById('cg-moves'); if (mv) { mv.innerHTML = movesHTML(); mv.scrollLeft = mv.scrollWidth; }
  const eb = document.getElementById('evalbar'); if (eb) eb.outerHTML = evalBarHTML();
  const co = document.getElementById('cg-coach'); if (co) co.innerHTML = coachHTML();
}

function promoHTML() {
  const col = G.side;
  return `<div class="promo">${['q', 'r', 'b', 'n'].map((p) => `<button data-promo="${p}">${pieceImg(col + p)}</button>`).join('')}<button class="promo-x" data-promo="x">✕</button></div>`;
}

function slide({ from, to }) {
  const a = document.querySelector(`[data-sq="${from}"]`); const b = document.querySelector(`[data-sq="${to}"]`);
  const pc = b?.querySelector('.cp');
  if (!a || !pc || !pc.animate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const ra = a.getBoundingClientRect(); const rb = b.getBoundingClientRect();
  pc.animate([{ transform: `translate(${ra.left - rb.left}px, ${ra.top - rb.top}px)` }, { transform: 'none' }], { duration: 180, easing: 'cubic-bezier(.2,.8,.3,1)' });
}

function say(mood, html) { G.coach = { mood, html }; }

/* ---------- moves ---------- */
function tryMove(from, to, promotion) {
  const legal = G.c.moves({ square: from, verbose: true }).filter((m) => m.to === to);
  if (!legal.length) { chessSound.illegal(); G.sel = null; G.targets = []; return draw(); }
  if (legal[0].promotion && !promotion) { G.promo = { from, to }; return draw(); }
  const mv = G.c.move({ from, to, promotion: promotion || 'q' });
  afterMove(mv, true, false);
}

function afterMove(mv, isUser, animate = true) {
  G.moves.push({ san: mv.san, from: mv.from, to: mv.to, color: mv.color, flags: mv.flags, promotion: mv.promotion });
  G.last = mv; G.sel = null; G.targets = []; G.hint = null; G.promo = null;
  if (animate) G.anim = { from: mv.from, to: mv.to };
  soundFor(mv, G.c.inCheck());
  queueEval(G.moves.length);
  if (G.c.isGameOver()) { draw(); return finishByRules(); }
  if (isUser) return aiTurn();
  G.thinking = false;
  if (G.c.inCheck()) { say('think', `Check! I played <b class="mono">${esc(mv.san)}</b>. Protect your king.`); hanaSay('Check!'); }
  draw();
}

async function aiTurn() {
  G.thinking = true; draw();
  const game = G; const gen = G.gen;
  const [res] = await Promise.all([engines().player.ask({ type: 'best', fen: G.c.fen(), level: G.level }), wait(550)]);
  // Ignore replies for a game that was left, restarted or undone while Hana was thinking.
  if (G !== game || gen !== G.gen || !res?.move || G.over) return;
  const mv = G.c.move({ from: res.move.from, to: res.move.to, promotion: res.move.promotion || 'q' });
  afterMove(mv, false);
}

function queueEval(k) {
  const game = G; const gen = G.gen; const fen = G.c.fen();
  const job = engines().analyst.ask({ type: 'eval', fen, ms: 450 }).then((r) => {
    game.pending.delete(job);
    if (G !== game || gen !== G.gen || !r) return;
    G.evals[k] = { score: r.score, best: r.best };
    classify(k - 1); classify(k);
    refreshSide();
  });
  game.pending.add(job);
}

function classify(i) {
  if (i < 0 || !G.moves[i] || !G.evals[i] || !G.evals[i + 1] || G.classes[i]) return;
  const m = G.moves[i];
  G.classes[i] = classifyMove({ before: G.evals[i].score, after: G.evals[i + 1].score, san: m.san, bestSan: G.evals[i].best?.san });
  if (m.color === G.side && i === lastIndexOf(G.side)) feedback(i);
}
const lastIndexOf = (color) => { for (let i = G.moves.length - 1; i >= 0; i--) if (G.moves[i].color === color) return i; return -1; };

function feedback(i) {
  const cl = G.classes[i]; const info = CLASS[cl]; const san = G.moves[i].san; const best = G.evals[i].best?.san;
  const tag = `<span class="cls-pill" style="--k:${info.color}">${info.sym} ${info.label}</span>`;
  const better = best && best !== san ? ` <b class="mono">${esc(best)}</b> was ${cl === 'blunder' ? 'much ' : ''}better.` : '';
  const lines = {
    best: ['cheer', `${tag} <b class="mono">${esc(san)}</b> is the top engine move!`],
    excellent: ['happy', `${tag} <b class="mono">${esc(san)}</b> is a strong move.`],
    good: ['happy', `${tag} <b class="mono">${esc(san)}</b> is fine.${better}`],
    inaccuracy: ['think', `${tag} <b class="mono">${esc(san)}</b> isn't quite right.${better}`],
    mistake: ['sad', `${tag} <b class="mono">${esc(san)}</b> gives away some advantage.${better}`],
    blunder: ['sad', `${tag} Oh no, <b class="mono">${esc(san)}</b> loses material or the game.${better}`],
  }[cl];
  if (!G.thinking || cl === 'mistake' || cl === 'blunder' || cl === 'best') say(lines[0], lines[1]);
  if (cl === 'best' && Math.random() < 0.5) bitSay('Boop! Best move!');
  if (cl === 'mistake') hanaSay(`That's a mistake. ${best ? `${best} was better.` : ''}`);
  if (cl === 'blunder') hanaSay(`Oh no, a blunder! ${best ? `${best} was much better.` : ''}`);
}

function finishByRules() {
  const c = G.c;
  if (c.isCheckmate()) return endGame(c.turn() === G.side ? 'loss' : 'win', 'by checkmate');
  return endGame('draw', c.isStalemate() ? 'by stalemate' : c.isThreefoldRepetition() ? 'by repetition' : c.isInsufficientMaterial() ? 'by insufficient material' : 'by the 50-move rule');
}

function endGame(result, how) {
  G.over = result; G.thinking = false; // Hana's pending reply is ignored because the game is over
  chessSound.end();
  say(result === 'win' ? 'cheer' : result === 'draw' ? 'happy' : 'sad', result === 'win' ? 'You beat me! Let\'s look at your game.' : result === 'draw' ? 'A draw. Well fought!' : 'I win this time. Let\'s review it together.');
  hanaSay(result === 'win' ? 'You beat me! Amazing!' : result === 'draw' ? 'A draw. Well played!' : 'Good game! Let\'s review it together.');
  draw();
  // Let the last positions finish being analysed (so accuracy is right), then show the results,
  // unless the player has already left or started another game.
  const game = G;
  Promise.all([Promise.race([Promise.all([...game.pending]), wait(2500)]), wait(1400)]).then(() => {
    if (G !== game) return;
    G = null; api.onFinish(summaryOf(game, result, how));
  });
}
function summaryOf(G, result, how) {
  const record = { startFen: G.startFen, startTurn: G.startTurn, prefix: G.prefix, moves: G.moves, evals: G.evals.slice(), classes: G.classes.slice(), side: G.side, title: G.title, level: G.level, result, how };
  const counts = {}; G.classes.forEach((cl, i) => { if (G.moves[i].color === G.side) counts[cl] = (counts[cl] || 0) + 1; });
  const worstI = G.classes.reduce((w, cl, i) => (G.moves[i].color !== G.side ? w : (['blunder', 'mistake', 'inaccuracy'].indexOf(cl) > -1 && (w < 0 || ['blunder', 'mistake', 'inaccuracy'].indexOf(cl) < ['blunder', 'mistake', 'inaccuracy'].indexOf(G.classes[w])) ? i : w)), -1);
  const worst = worstI >= 0 ? { san: G.moves[worstI].san, best: G.evals[worstI]?.best?.san, label: CLASS[G.classes[worstI]].label, move: `${Math.floor((G.prefix.length + worstI) / 2) + 1}${(G.prefix.length + worstI) % 2 ? '...' : '.'}` } : null;
  const acc = sideAccuracy(record, G.side);
  return { result, how, accuracy: acc == null ? null : Math.round(acc), counts, level: G.level, lessonId: G.lessonId, title: G.title, worst, record,
    moves: G.moves.length, secs: Math.round((Date.now() - G.started) / 1000) };
}

/* ---------- input: tap or drag ---------- */
let drag = null;
document.addEventListener('pointerdown', (e) => {
  if (!G || G.over || G.promo) return;
  const sqEl = e.target.closest('[data-sq]'); if (!sqEl || !sqEl.closest('#cboard')) return;
  if (G.thinking || G.c.turn() !== G.side) return;
  const sq = sqEl.dataset.sq;
  if (G.sel && G.targets.includes(sq)) { e.preventDefault(); return tryMove(G.sel, sq); }
  const p = G.c.get(sq);
  if (p && p.color === G.side) {
    e.preventDefault();
    G.sel = sq; G.targets = G.c.moves({ square: sq, verbose: true }).map((m) => m.to);
    draw();
    const img = document.querySelector(`[data-sq="${sq}"] .cp`);
    drag = { from: sq, x: e.clientX, y: e.clientY, img, ghost: null, size: img?.getBoundingClientRect().width || 40 };
  } else if (G.sel) { G.sel = null; G.targets = []; draw(); }
});
document.addEventListener('pointermove', (e) => {
  if (!drag) return;
  if (!drag.ghost) {
    if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6 || !drag.img) return;
    drag.ghost = drag.img.cloneNode(); drag.ghost.className = 'drag-ghost'; drag.ghost.style.width = `${drag.size * 1.15}px`;
    document.body.appendChild(drag.ghost); drag.img.style.opacity = '0.3';
  }
  drag.ghost.style.left = `${e.clientX}px`; drag.ghost.style.top = `${e.clientY}px`;
  document.querySelectorAll('.csq.over').forEach((x) => x.classList.remove('over'));
  const under = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-sq]'); if (under) under.classList.add('over');
});
document.addEventListener('pointerup', (e) => {
  if (!drag) return;
  const d = drag; drag = null;
  if (!d.ghost) return;
  d.ghost.remove();
  const under = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-sq]');
  if (under && G && G.targets.includes(under.dataset.sq)) tryMove(d.from, under.dataset.sq);
  else if (G) { if (d.img) d.img.style.opacity = ''; document.querySelectorAll('.csq.over').forEach((x) => x.classList.remove('over')); }
});

document.addEventListener('click', (e) => {
  if (!G) return;
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.promo) {
    const p = t.dataset.promo; const pr = G.promo; G.promo = null;
    if (p === 'x' || !pr) return draw();
    return tryMove(pr.from, pr.to, p);
  }
  const a = t.dataset.g; if (!a) return;
  if (a === 'quit') return api.onQuit(() => { G.gen++; G = null; });
  if (a === 'resign') return endGame('loss', 'by resignation');
  if (a === 'flip') { G.flip = !G.flip; return draw(); }
  if (a === 'hint') {
    if (!api.spendSeeds(10)) return;
    const game = G; const k = G.moves.length; const show = (best) => { if (G !== game || !best) return; G.hint = best; say('think', `Try <b class="mono">${esc(best.san)}</b>. Follow the arrow.`); chessSound.notify(); bitSay(`Try ${best.san}!`); draw(); };
    if (G.evals[k]?.best) return show(G.evals[k].best);
    G.thinking = true; draw();
    engines().analyst.ask({ type: 'eval', fen: G.c.fen(), ms: 700 }).then((r) => { if (G !== game) return; G.thinking = false; show(r?.best); });
    return;
  }
  if (a === 'undo') {
    if (!api.spendSeeds(10)) return;
    G.c.undo(); G.c.undo(); G.moves.length -= 2; G.gen++;
    G.evals.length = G.moves.length + 1; G.classes.length = G.moves.length;
    G.last = null; G.sel = null; G.targets = []; G.hint = null;
    say('happy', 'Okay, take another look.'); return draw();
  }
});
