// Game review: Hana analyses every position, rates every move for both players,
// and lets you step through the game with the best move drawn as an arrow.
import { Chess } from '../vendor/chess.js';
import { mascot } from './mascot.js';
import { engines } from './game.js';
import { chessSound, soundFor } from './chess-sound.js';
import { hanaSay } from './voice.js';
import { CLASS, CLASS_ORDER, classifyMove, sideAccuracy, whiteScore, evalText, whiteBar, winPct, arrowSVG } from './chess-analysis.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pieceImg = (code) => `<img class="cp" src="img/pieces/${code}.svg" alt="" draggable="false">`;
let R = null;

export async function showReview(rec, opts) {
  R = { rec, opts, ply: 0, flip: rec.side === 'b', positions: [] };
  const c = new Chess(rec.startFen); R.positions.push(c.fen());
  rec.moves.forEach((m) => { c.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' }); R.positions.push(c.fen()); });
  const missing = R.positions.map((_, i) => i).filter((i) => !rec.evals[i]);
  if (missing.length) {
    let done = 0;
    progress(0, missing.length);
    for (const i of missing) {
      const mine = R;
      const r = await engines().analyst.ask({ type: 'eval', fen: R.positions[i], ms: 380 });
      if (R !== mine) return; // closed (or another review opened) while analysing
      rec.evals[i] = { score: r.score, best: r.best }; progress(++done, missing.length);
    }
  }
  rec.moves.forEach((m, i) => { if (!rec.classes[i]) rec.classes[i] = classifyMove({ before: rec.evals[i].score, after: rec.evals[i + 1].score, san: m.san, bestSan: rec.evals[i].best?.san }); });
  R.ply = 0; render(true);
}
export const reviewActive = () => !!R;

function progress(n, total) {
  document.getElementById('app').innerHTML = `<div class="review loading"><header class="cg-head"><button class="nav-ic" data-rv="back" aria-label="Stop the review">✕</button><div class="cg-title"><b>Game review</b></div><span class="nav-ic ghost"></span></header><div class="rv-load">${mascot('think', 140)}
    <h2>Hana is reviewing your game…</h2><p class="muted">Checking every position (${n} of ${total})</p>
    <span class="bar"><i style="width:${(n / total) * 100}%;animation:none"></i></span></div></div>`;
}

function summaryHTML() {
  const { rec } = R; const opp = rec.side === 'w' ? 'b' : 'w';
  const acc = { me: sideAccuracy(rec, rec.side), ai: sideAccuracy(rec, opp) };
  const count = (color) => { const o = {}; rec.classes.forEach((cl, i) => { if (rec.moves[i].color === color) o[cl] = (o[cl] || 0) + 1; }); return o; };
  const cm = count(rec.side); const ca = count(opp);
  const line = acc.me == null ? 'Short game!' : acc.me >= 90 ? 'Brilliant game. You played like a master!' : acc.me >= 75 ? 'Solid game with some strong moves.' : acc.me >= 55 ? 'A decent game. Let\'s look at the key moments.' : 'A tough one. The review will show you what to fix.';
  return `<section class="rv-sum">
    <div class="rv-coach">${mascot(acc.me >= 75 ? 'cheer' : acc.me >= 55 ? 'happy' : 'think', 72)}<div class="cg-say">${line}</div></div>
    <div class="rv-acc">
      <div class="acc-card"><span class="pb-av me">${R.opts.avatar(44)}</span><small>${esc(R.opts.name())}</small><b>${acc.me ?? '–'}</b><em>Accuracy</em></div>
      <div class="acc-card dark"><span class="pb-av ai">${mascot('happy', 44, { bit: false })}</span><small>Hana</small><b>${acc.ai ?? '–'}</b><em>Accuracy</em></div>
    </div>
    <div class="rv-table">${CLASS_ORDER.filter((k) => k !== 'book').map((k) => `<div class="rv-trow"><span>${cm[k] || 0}</span><b style="--k:${CLASS[k].color}"><i>${CLASS[k].sym}</i>${CLASS[k].label}</b><span>${ca[k] || 0}</span></div>`).join('')}</div>
  </section>`;
}

function graphHTML() {
  const { rec } = R; const n = rec.evals.length; const W = 320; const H = 72;
  const pts = rec.evals.map((e, i) => [n > 1 ? (i / (n - 1)) * W : 0, H - (winPct(whiteScore(e.score, i, rec.startTurn)) / 100) * H]);
  if (pts.length === 1) pts.push([W, pts[0][1]]); // a game with no moves: draw a flat line
  const area = `0,${H} ${pts.map((p) => p.join(',')).join(' ')} ${W},${H}`;
  const marks = rec.classes.map((cl, i) => (['blunder', 'mistake', 'inaccuracy'].includes(cl) ? `<circle cx="${pts[i + 1][0]}" cy="${pts[i + 1][1]}" r="3.2" fill="${CLASS[cl].color}" stroke="#fff" stroke-width="1"/>` : '')).join('');
  const x = n > 1 ? (R.ply / (n - 1)) * W : 0;
  return `<svg class="rv-graph" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" id="rv-graph"><rect width="${W}" height="${H}" fill="#3c3a37"/>
    <polygon points="${area}" fill="#f2f2f2"/><line x1="0" y1="${H / 2}" x2="${W}" y2="${H / 2}" stroke="#8a8784" stroke-width=".6"/>${marks}
    <line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#5b3fd6" stroke-width="2"/></svg>`;
}

function boardHTML() {
  const { rec, ply } = R; const c = new Chess(R.positions[ply]); const b = c.board(); const flip = R.flip;
  const m = ply > 0 ? rec.moves[ply - 1] : null; const cl = ply > 0 ? rec.classes[ply - 1] : null;
  let html = '';
  for (let ri = 0; ri < 8; ri++) for (let ci = 0; ci < 8; ci++) {
    const r = flip ? 7 - ri : ri; const f = flip ? 7 - ci : ci; const sq = b[r][f]; const name = 'abcdefgh'[f] + (8 - r);
    const hl = m && (m.from === name || m.to === name) ? ' hl' : '';
    const badge = m && m.to === name && cl ? `<b class="sq-badge" style="--k:${CLASS[cl].color}">${CLASS[cl].sym}</b>` : '';
    const coords = `${ci === 0 ? `<em class="rk">${8 - r}</em>` : ''}${ri === 7 ? `<em class="fl">${'abcdefgh'[f]}</em>` : ''}`;
    html += `<div class="csq ${(f + r) % 2 ? 'd' : 'l'}${hl}">${coords}${sq ? pieceImg(sq.color + sq.type) : ''}${badge}</div>`;
  }
  const alt = ply > 0 && !['best', 'book'].includes(cl) ? rec.evals[ply - 1].best : null;
  const ws = whiteScore(rec.evals[ply].score, ply, rec.startTurn);
  return `<div class="cg-boardrow"><div class="evalbar ${flip ? 'flip' : ''}"><i style="height:${whiteBar(ws)}%"></i><span class="${ws >= 0 ? 'w' : 'b'}">${evalText(ws)}</span></div>
    <div class="cboard-wrap"><div class="cboard">${html}</div><svg class="arrows" viewBox="0 0 8 8">${alt ? arrowSVG(alt.from, alt.to, 'rgba(129,182,76,.9)', flip) : ''}</svg></div></div>`;
}

function explainHTML() {
  const { rec, ply } = R;
  if (ply === 0) return `<div class="rv-explain">${mascot('happy', 52, { bit: false })}<p>${rec.prefix.length ? `The game started from the <b>${esc(rec.title)}</b>. Step through with the arrows.` : 'Starting position. Step through the game with the arrows.'}</p></div>`;
  const m = rec.moves[ply - 1]; const cl = rec.classes[ply - 1]; const info = CLASS[cl]; const best = rec.evals[ply - 1].best;
  const who = m.color === rec.side ? 'You' : 'Hana';
  const an = /^[aeiou]/i.test(info.label) ? 'an' : 'a';
  const tail = cl === 'best' ? 'That was the best move.' : best ? `The best move was <b class="mono">${esc(best.san)}</b> (green arrow).` : '';
  return `<div class="rv-explain">${mascot(['mistake', 'blunder'].includes(cl) ? 'sad' : cl === 'inaccuracy' ? 'think' : 'cheer', 52, { bit: false })}
    <p><span class="cls-pill" style="--k:${info.color}">${info.sym} ${info.label}</span> ${who} played <b class="mono">${esc(m.san)}</b>${cl === 'best' ? '' : `, ${an} ${info.label.toLowerCase()}`}. ${tail}</p></div>`;
}

function movesHTML() {
  const { rec } = R; let html = '';
  rec.moves.forEach((m, i) => {
    const abs = rec.prefix.length + i;
    if (abs % 2 === 0 || i === 0) html += `<span class="mn">${Math.floor(abs / 2) + 1}${abs % 2 ? '...' : '.'}</span>`;
    const info = CLASS[rec.classes[i]];
    html += `<button class="mv ${R.ply === i + 1 ? 'cur' : ''}" data-rv-ply="${i + 1}"><b class="cls" style="--k:${info.color}">${info.sym}</b>${esc(m.san)}</button>`;
  });
  return html;
}

function render(first = false) {
  document.getElementById('app').innerHTML = `<div class="review">
    <header class="cg-head"><button class="nav-ic" data-rv="back" aria-label="Back">✕</button><div class="cg-title"><b>Game review</b><small>${esc(R.rec.title)} · ${esc(R.rec.how)}</small></div><button class="nav-ic" data-rv="flip" aria-label="Flip board">🔄</button></header>
    <div class="rv-body">
      ${first ? summaryHTML() : `<div id="rv-sum-slot">${summaryHTML()}</div>`}
      ${graphHTML()}
      ${boardHTML()}
      <div id="rv-explain">${explainHTML()}</div>
      <div class="rv-ctrl"><button data-rv="first" aria-label="First move">⏮</button><button data-rv="prev" aria-label="Previous move">◀</button><button data-rv="next" aria-label="Next move">▶</button><button data-rv="last" aria-label="Last move">⏭</button></div>
      <div class="cg-moves rv-moves" id="rv-moves">${movesHTML()}</div>
    </div></div>`;
  document.querySelector('.rv-moves .cur')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  if (first) { const a = sideAccuracy(R.rec, R.rec.side); hanaSay(a == null ? 'Here is your game.' : `Your accuracy was ${Math.round(a)} percent. Let's look at the key moments.`); }
}

function go(ply) {
  const n = R.rec.moves.length; const p = Math.max(0, Math.min(n, ply));
  if (p === R.ply) return;
  const forward = p === R.ply + 1; R.ply = p;
  const keepScroll = document.querySelector('.rv-body')?.scrollTop;
  render(); if (keepScroll != null) document.querySelector('.rv-body').scrollTop = keepScroll;
  if (forward && p > 0) { const c = new Chess(R.positions[p]); soundFor({ ...R.rec.moves[p - 1], captured: /x/.test(R.rec.moves[p - 1].san) }, c.inCheck()); } else chessSound.move();
}

document.addEventListener('click', (e) => {
  if (!R) return;
  const t = e.target.closest('button, #rv-graph'); if (!t) return;
  if (t.id === 'rv-graph') { const r = t.getBoundingClientRect(); return go(Math.round(((e.clientX - r.left) / r.width) * R.rec.moves.length)); }
  if (t.dataset.rvPly) return go(+t.dataset.rvPly);
  const a = t.dataset.rv;
  if (a === 'back') { const o = R.opts; R = null; return o.onBack(); }
  if (a === 'flip') { R.flip = !R.flip; return render(); }
  if (a === 'first') return go(0);
  if (a === 'prev') return go(R.ply - 1);
  if (a === 'next') return go(R.ply + 1);
  if (a === 'last') return go(R.rec.moves.length);
});
document.addEventListener('keydown', (e) => {
  if (!R) return;
  if (e.key === 'ArrowRight') go(R.ply + 1);
  if (e.key === 'ArrowLeft') go(R.ply - 1);
});
