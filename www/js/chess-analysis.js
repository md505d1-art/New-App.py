// Move classification and accuracy, shared by the game screen and the game review.
export const MATE = 100000;

export const CLASS = {
  book: { label: 'Book', sym: '📖', color: '#a88865' },
  best: { label: 'Best', sym: '★', color: '#81b64c' },
  excellent: { label: 'Excellent', sym: '!', color: '#5c9c3a' },
  good: { label: 'Good', sym: '✓', color: '#95b776' },
  inaccuracy: { label: 'Inaccuracy', sym: '?!', color: '#f0b429' },
  mistake: { label: 'Mistake', sym: '?', color: '#ff8f3d' },
  blunder: { label: 'Blunder', sym: '??', color: '#fa412d' },
};
export const CLASS_ORDER = ['best', 'excellent', 'good', 'book', 'inaccuracy', 'mistake', 'blunder'];

const clamp = (s) => Math.max(-1500, Math.min(1500, s));

// before: score of the position for the mover (best play). after: score after the move, for the opponent.
export function classifyMove({ before, after, san, bestSan }) {
  const loss = clamp(before) + clamp(after);
  if (san === bestSan || loss <= 10) return 'best';
  if (loss <= 35) return 'excellent';
  if (loss <= 90) return 'good';
  if (loss <= 190) return 'inaccuracy';
  if (loss <= 380) return 'mistake';
  return 'blunder';
}

// Win chance from a centipawn score, and per-move accuracy (the formula Lichess publishes).
export const winPct = (cp) => 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * clamp(cp))) - 1);
export function moveAccuracy(before, after) {
  const drop = Math.max(0, winPct(before) - winPct(-after));
  return Math.max(0, Math.min(100, 103.1668 * Math.exp(-0.04354 * drop) - 3.1669));
}

// rec: { moves:[{color}], evals:[{score}], classes:[] } → accuracy (0-100) for one colour, or null.
export function sideAccuracy(rec, color) {
  const accs = [];
  rec.moves.forEach((m, i) => {
    if (m.color !== color || !rec.evals[i] || !rec.evals[i + 1]) return;
    accs.push(moveAccuracy(rec.evals[i].score, rec.evals[i + 1].score));
  });
  return accs.length ? Math.round((accs.reduce((a, b) => a + b, 0) / accs.length) * 10) / 10 : null;
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
