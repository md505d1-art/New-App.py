// Small alpha-beta chess engine running in a Web Worker so the UI never freezes.
// Messages in:  { id, type: 'best', fen, level }   -> { id, move: {from,to,promotion,san}, score }
//               { id, type: 'eval', fen, ms }      -> { id, score, best }   (score for the side to move, centipawns)
//               { id, type: 'grade', fen, move }   -> { id, loss, best: san }   (loss in centipawns for the mover)
import { Chess } from '../vendor/chess.js';

const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
// Piece-square tables from White's point of view (a8..h1 order, as board() returns).
const PST = {
  p: [0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10, 5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5, 5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0],
  n: [-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30, -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30, -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50],
  b: [-20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10, -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10, -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20],
  r: [0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0],
  q: [-20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10, -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10, -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20],
  k: [-30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10, 20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20],
};
const MATE = 100000;

// Static evaluation from the side to move's point of view.
function evaluate(c) {
  let s = 0;
  const b = c.board();
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
    const p = b[r][f]; if (!p) continue;
    const idx = p.color === 'w' ? r * 8 + f : (7 - r) * 8 + f;
    const v = VAL[p.type] + PST[p.type][idx];
    s += p.color === 'w' ? v : -v;
  }
  return c.turn() === 'w' ? s : -s;
}

function ordered(c, capturesOnly = false) {
  const ms = c.moves({ verbose: true });
  const list = capturesOnly ? ms.filter((m) => m.captured || m.promotion) : ms;
  return list.map((m) => ({ m, k: (m.captured ? 10 * VAL[m.captured] - VAL[m.piece] : 0) + (m.promotion ? 800 : 0) + (m.san.includes('+') ? 50 : 0) }))
    .sort((a, b) => b.k - a.k).map((x) => x.m);
}

let nodes = 0;
let deadline = Infinity;
const TIMEOUT = {};
function quiesce(c, alpha, beta, depth) {
  const stand = evaluate(c);
  if (stand >= beta) return beta;
  if (stand > alpha) alpha = stand;
  if (depth === 0) return alpha;
  for (const m of ordered(c, true)) {
    c.move(m); const sc = -quiesce(c, -beta, -alpha, depth - 1); c.undo();
    if (sc >= beta) return beta;
    if (sc > alpha) alpha = sc;
  }
  return alpha;
}

function negamax(c, depth, alpha, beta, ply) {
  if ((++nodes & 255) === 0 && Date.now() > deadline) throw TIMEOUT;
  if (depth === 0) return quiesce(c, alpha, beta, 2);
  const moves = ordered(c);
  if (!moves.length) return c.inCheck() ? -MATE + ply : 0;
  for (const m of moves) {
    c.move(m); const sc = -negamax(c, depth - 1, -beta, -alpha, ply + 1); c.undo();
    if (sc >= beta) return beta;
    if (sc > alpha) alpha = sc;
  }
  return alpha;
}

// Root search. Moves within `margin` of the best get exact-ish scores; worse ones are cut off early.
function search(c, depth, margin) {
  const out = [];
  let best = -MATE - 1;
  for (const m of ordered(c)) {
    const alpha = Math.max(-MATE - 1, best - margin);
    c.move(m); const sc = -negamax(c, depth - 1, -MATE - 1, -alpha, 1); c.undo();
    if (sc > best) best = sc;
    out.push({ m, sc });
  }
  return out.sort((a, b) => b.sc - a.sc);
}

// Iterative deepening under a time budget; returns the deepest completed result.
function think(c, maxDepth, margin, ms) {
  deadline = Date.now() + ms;
  let res = null;
  for (let d = 1; d <= maxDepth; d++) {
    try { res = search(c, d, margin); } catch (err) { if (err !== TIMEOUT) throw err; break; }
  }
  deadline = Infinity;
  return res;
}

const LEVELS = { 1: { depth: 1, noise: 120, ms: 600 }, 2: { depth: 2, noise: 35, ms: 1500 }, 3: { depth: 3, noise: 0, ms: 2500 } };

self.onmessage = (e) => {
  const { id, type, fen } = e.data;
  const c = new Chess(fen);
  nodes = 0;
  if (type === 'best') {
    const lv = LEVELS[e.data.level] || LEVELS[2];
    const scored = (think(c, lv.depth, lv.noise * 2 + 1, lv.ms) || [])
      .map((x) => ({ ...x, n: x.sc + (Math.random() * 2 - 1) * lv.noise }))
      .sort((a, b) => b.n - a.n);
    const best = scored[0];
    self.postMessage({ id, move: best ? { from: best.m.from, to: best.m.to, promotion: best.m.promotion, san: best.m.san } : null, score: best?.sc ?? 0 });
  } else if (type === 'eval') {
    // Score of the position for the side to move, and the best move (used for the eval bar and game review).
    const moves = c.moves();
    if (!moves.length) { self.postMessage({ id, score: c.inCheck() ? -MATE : 0, best: null, over: true }); return; }
    const scored = think(c, e.data.depth || 3, 1, e.data.ms || 500) || [];
    const b = scored[0];
    self.postMessage({ id, score: b ? b.sc : 0, best: b ? { san: b.m.san, from: b.m.from, to: b.m.to, promotion: b.m.promotion } : null });
  } else if (type === 'grade') {
    // How much worse was the played move than the best one (2-ply + captures)?
    const scored = think(c, 2, 400, 1500) || [];
    const best = scored[0];
    const played = scored.find((x) => x.m.san === e.data.move) || best;
    self.postMessage({ id, loss: best ? Math.max(0, best.sc - played.sc) : 0, best: best?.m.san });
  }
};
