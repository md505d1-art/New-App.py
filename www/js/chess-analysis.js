// Move classification and accuracy, shared by the game screen and the game review.
// Moves are rated chess.com-style by how much winning chance they give away; "Best" is the engine's top
// move, and a sound sacrifice of a piece is "Brilliant".
import { Chess } from '../vendor/chess.js';
export const MATE = 100000;

export const CLASS = {
  brilliant: { label: 'Brilliant', sym: '!!', color: '#1baca6' },
  book: { label: 'Book', sym: '📖', color: '#a88865' },
  best: { label: 'Best', sym: '★', color: '#81b64c' },
  excellent: { label: 'Excellent', sym: '!', color: '#5c9c3a' },
  good: { label: 'Good', sym: '✓', color: '#95b776' },
  inaccuracy: { label: 'Inaccuracy', sym: '?!', color: '#f0b429' },
  mistake: { label: 'Mistake', sym: '?', color: '#ff8f3d' },
  blunder: { label: 'Blunder', sym: '??', color: '#fa412d' },
};
export const CLASS_ORDER = ['brilliant', 'best', 'excellent', 'good', 'book', 'inaccuracy', 'mistake', 'blunder'];

const clamp = (s) => Math.max(-1500, Math.min(1500, s));
const wide = (s) => Math.max(-3000, Math.min(3000, s));

// Win chance (0-100) from a centipawn score (the curve Lichess publishes).
export const winPct = (cp) => 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * clamp(cp))) - 1);

// How bad a move was, in percentage points of winning chance lost.
// before: score of the position for the mover (best play). after: score after the move, for the opponent.
// Once a game is lopsided the win chance hardly moves, so throwing away lots of material still counts there
// (unless you were winning by a mile anyway).
export function moveLoss(before, after) {
  const drop = Math.max(0, winPct(before) - winPct(-after));
  const cp = Math.max(0, wide(before) + wide(after));
  const lopsided = Math.abs(before) > 700 && before < 1500;
  return lopsided ? Math.max(drop, Math.min(30, cp / 40)) : drop;
}

const PTS = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
// A real sacrifice: the moved piece (knight or bigger) can be taken, and the mover doesn't win enough back.
export function isSacrifice(fen, move) {
  try {
    const c = new Chess(fen);
    const mv = c.move({ from: move.from, to: move.to, promotion: move.promotion || 'q' });
    const moved = PTS[mv.promotion || mv.piece]; const gained = mv.captured ? PTS[mv.captured] : 0;
    if (moved < 3) return false;
    const takes = c.moves({ verbose: true }).filter((m) => m.to === mv.to);
    if (!takes.length) return false;
    const cheapest = takes.reduce((a, m) => (PTS[m.piece] < PTS[a.piece] ? m : a));
    c.move(cheapest);
    const back = c.moves({ verbose: true }).some((m) => m.to === mv.to) ? PTS[cheapest.piece] : 0;
    return moved - gained - back >= 2;
  } catch { return false; }
}

// fen + move (optional) let us spot brilliant sacrifices.
export function classifyMove({ before, after, san, bestSan, fen, move }) {
  const loss = moveLoss(before, after);
  let k;
  if (san === bestSan) k = 'best';
  else if (loss <= 2) k = 'excellent';
  else if (loss <= 5) k = 'good';
  else if (loss <= 10) k = 'inaccuracy';
  else if (loss <= 20) k = 'mistake';
  else k = 'blunder';
  // Brilliant: a sound sacrifice (best or nearly best) when you weren't already winning easily,
  // or one that forces checkmate.
  const forcesMate = -after > MATE / 2;
  if ((k === 'best' || k === 'excellent') && fen && move && (forcesMate || (winPct(before) < 92 && winPct(-after) >= 40)) && isSacrifice(fen, move)) k = 'brilliant';
  return k;
}

// Per-move accuracy (Lichess's formula, on the winning chance lost).
export function moveAccuracy(before, after) {
  return Math.max(0, Math.min(100, 103.1668 * Math.exp(-0.04354 * moveLoss(before, after)) - 3.1669));
}

// rec: { moves:[{color}], evals:[{score}], classes:[] } → accuracy (0-100) for one colour, or null.
export function sideAccuracy(rec, color) {
  const accs = [];
  rec.moves.forEach((m, i) => {
    if (m.color !== color || !rec.evals[i] || !rec.evals[i + 1]) return;
    accs.push(moveAccuracy(rec.evals[i].score, rec.evals[i + 1].score));
  });
  if (!accs.length) return null;
  // Like Lichess: average the plain mean with a harmonic mean, so a few blunders aren't hidden by many easy moves.
  const mean = accs.reduce((a, b) => a + b, 0) / accs.length;
  const harmonic = accs.length / accs.reduce((a, x) => a + 1 / Math.max(10, x), 0);
  return Math.round(((mean + harmonic) / 2) * 10) / 10;
}

// Score from White's point of view, given the score for the side to move at ply index i.
export const whiteScore = (score, ply, startTurn) => (((ply % 2 === 0) === (startTurn === 'w')) ? score : -score);

export function evalText(scoreWhite) {
  if (Math.abs(scoreWhite) > MATE - 1000) { const plies = MATE - Math.abs(scoreWhite); return `${scoreWhite > 0 ? '' : '-'}M${Math.max(1, Math.ceil(plies / 2))}`; }
  const v = scoreWhite / 100; return `${v > 0 ? '+' : ''}${v.toFixed(1)}`;
}
// Eval bar fill for White (0-100).
export const whiteBar = (scoreWhite) => (Math.abs(scoreWhite) > MATE - 1000 ? (scoreWhite > 0 ? 100 : 0) : Math.max(4, Math.min(96, winPct(scoreWhite))));

const START = { p: 8, n: 2, b: 2, r: 2, q: 1 };
const VAL = { p: 1, n: 3, b: 3, r: 5, q: 9 };
// Pieces each side has captured, and material balance (White minus Black).
export function material(board) {
  const have = { w: { p: 0, n: 0, b: 0, r: 0, q: 0 }, b: { p: 0, n: 0, b: 0, r: 0, q: 0 } };
  board.flat().forEach((sq) => { if (sq && sq.type !== 'k') have[sq.color][sq.type]++; });
  const took = { w: [], b: [] }; let diff = 0;
  for (const t of ['q', 'r', 'b', 'n', 'p']) {
    for (let k = have.b[t]; k < START[t]; k++) took.w.push(`b${t}`);
    for (let k = have.w[t]; k < START[t]; k++) took.b.push(`w${t}`);
    diff += (have.w[t] - have.b[t]) * VAL[t];
  }
  return { took, diff };
}

// An arrow over the board, in square units (0-8). flip = board seen from Black.
export function arrowSVG(from, to, color = 'rgba(255,170,0,.85)', flip = false) {
  const xy = (sq) => { let f = sq.charCodeAt(0) - 97; let r = 8 - +sq[1]; if (flip) { f = 7 - f; r = 7 - r; } return [f + 0.5, r + 0.5]; };
  const [x1, y1] = xy(from); const [x2, y2] = xy(to);
  const ang = Math.atan2(y2 - y1, x2 - x1); const len = Math.hypot(x2 - x1, y2 - y1) - 0.35;
  const ex = x1 + Math.cos(ang) * len; const ey = y1 + Math.sin(ang) * len;
  const h = 0.32; const w = 0.26;
  const p1 = [ex - Math.cos(ang) * h + Math.sin(ang) * w, ey - Math.sin(ang) * h - Math.cos(ang) * w];
  const p2 = [ex - Math.cos(ang) * h - Math.sin(ang) * w, ey - Math.sin(ang) * h + Math.cos(ang) * w];
  const tip = [x1 + Math.cos(ang) * (len + 0.3), y1 + Math.sin(ang) * (len + 0.3)];
  return `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width=".18" stroke-linecap="round"/>
    <polygon points="${tip.join(',')} ${p1.join(',')} ${p2.join(',')}" fill="${color}"/>`;
}
