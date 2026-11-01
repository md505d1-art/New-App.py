// Course definitions and question generators.
import G from './gambits.js';
import { Chess } from '../vendor/chess.js';

const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const chunk = (a, n) => { const out = []; for (let i = 0; i < a.length; i += n) out.push(a.slice(i, i + n)); return out; };

/* ---------------- Chess ---------------- */

export function movesText(moves) {
  return moves.map((m, i) => (i % 2 === 0 ? `${i / 2 + 1}.${m}` : m)).join(' ');
}

function boardAfter(moves, side) {
  const c = new Chess();
  let last = null;
  for (const m of moves) last = c.move(m);
  return { board: c.board(), last: last ? [last.from, last.to] : [], flip: side === 'Black', turn: c.turn() };
}

const CHESS_UNITS = [
  { title: 'First Gambits', desc: 'Classic pawn offers every player meets', color: 'green',
    keys: ['kings_gambit', 'queens_gambit', 'danish_gambit', 'smith_morra', 'wing_gambit', 'blackmar_diemer'] },
  { title: 'Italian Fireworks', desc: 'Attack f7 with bishops and knights', color: 'purple',
    keys: ['evans_gambit', 'fried_liver', 'jerome', 'scotch_gambit', 'goring_gambit', 'halloween', 'urusov', 'nakhmanson', 'center_game'] },
  { title: 'Black Strikes Back', desc: 'Gambits for the second player', color: 'blue',
    keys: ['stafford_gambit', 'latvian_gambit', 'elephant_gambit', 'englund_gambit', 'budapest_gambit', 'albin_counter', 'benko_gambit', 'from_gambit', 'kieninger'] },
  { title: 'Romantic Era', desc: 'King hunts from the 1800s', color: 'red',
    keys: ['muzio', 'allgaier', 'kieseritzky', 'rice', 'cochrane', 'lisitsin'] },
  { title: 'Sharp Defenses', desc: 'Counterattacks and sneaky sidelines', color: 'yellow',
    keys: ['traxler', 'ulvestad', 'rousseau', 'jaenisch', 'marshall', 'riga', 'icelandic', 'portuguese', 'von_hennig', 'morra_declined', 'milner_barry', 'wing_french'] },
];

const ALL_KEYS = Object.keys(G).filter((k) => k !== 'calabrese'); // same moves as Rousseau

function chessQuestions(lesson) {
  const qs = [];
  const keys = lesson.keys;
  for (const k of keys) {
    const g = G[k];
    const others = ALL_KEYS.filter((x) => x !== k);

    // 1. Name that opening
    const nameOpts = shuffle([g.name, ...pick(others, 3).map((x) => G[x].name)]);
    qs.push({ type: 'mc', prompt: 'Which opening is this?', sub: movesText(g.moves),
      board: boardAfter(g.moves, g.side), options: nameOpts.map((label) => ({ label })), answer: nameOpts.indexOf(g.name) });

    // 2. Find the key move
    const pre = g.moves.slice(0, -1);
    const key = g.moves[g.moves.length - 1];
    const pos = new Chess(); pre.forEach((m) => pos.move(m));
    const alts = pick(pos.moves().filter((m) => m !== key), 3);
    const mvOpts = shuffle([key, ...alts]);
    const who = pos.turn() === 'w' ? 'White' : 'Black';
    qs.push({ type: 'mc', prompt: `${who} to move. Play the ${g.name}!`, sub: movesText(pre) || 'Starting position',
      board: boardAfter(pre, g.side), options: mvOpts.map((label) => ({ label })), answer: mvOpts.indexOf(key), mono: true });

    // 3. Build the move order (short lines) or pick the idea
    if (g.moves.length <= 8) {
      const extra = pick(new Chess().moves().filter((m) => !g.moves.includes(m)), 2);
      qs.push({ type: 'build', prompt: `Put the ${g.name} in order`, tiles: shuffle([...g.moves, ...extra]), answer: g.moves, mono: true });
    }
    const ideaOpts = shuffle([g.idea, ...pick(others, 2).map((x) => G[x].idea)]);
    qs.push({ type: 'mc', prompt: `What's the idea behind the ${g.name}?`, options: ideaOpts.map((label) => ({ label })), answer: ideaOpts.indexOf(g.idea) });
  }
  // Side question
  const sk = keys[Math.floor(Math.random() * keys.length)];
  qs.push({ type: 'pics', prompt: `Who plays the ${G[sk].name}?`,
    options: [{ label: 'White', emoji: '♔' }, { label: 'Black', emoji: '♚' }], answer: G[sk].side === 'White' ? 0 : 1 });
  // Match names to signature moves
  const mk = [...keys, ...pick(ALL_KEYS.filter((x) => !keys.includes(x)), Math.max(0, 4 - keys.length))].slice(0, 4);
  const seen = new Set();
  const pairs = mk.map((x) => [G[x].name, movesText(G[x].moves).split(' ').slice(-3).join(' ')])
    .filter((p) => !seen.has(p[1]) && seen.add(p[1]));
  qs.push({ type: 'match', prompt: 'Match each opening to its moves', pairs });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

function buildChess() {
  return CHESS_UNITS.map((u, ui) => ({
    title: u.title, desc: u.desc, color: u.color,
    guide: u.keys.map((k) => ({ term: G[k].name, def: `${movesText(G[k].moves)} — ${G[k].idea}` })),
    lessons: chunk(u.keys, 3).map((keys, li) => ({ id: `chess:${ui}:${li}`, title: keys.map((k) => G[k].name).join(', '), keys })),
  }));
}

/* ---------------- Spanish ---------------- */

const ES_UNITS = [
  { title: 'Basics', desc: 'Say hello and be polite', color: 'green', lessons: [
    { words: [['hola', 'hello', '👋'], ['adiós', 'goodbye', '🚪'], ['gracias', 'thank you', '🙏'], ['por favor', 'please', '🥺']],
      phrases: [['hello, thank you', 'hola, gracias'], ['goodbye, please', 'adiós, por favor']] },
    { words: [['sí', 'yes', '👍'], ['no', 'no', '👎'], ['buenos días', 'good morning', '🌅'], ['buenas noches', 'good night', '🌙']],
      phrases: [['yes, good morning', 'sí, buenos días'], ['no, thank you', 'no, gracias']] },
  ] },
  { title: 'Food', desc: 'Order like a local', color: 'yellow', lessons: [
    { words: [['el pan', 'the bread', '🍞'], ['el agua', 'the water', '💧'], ['la manzana', 'the apple', '🍎'], ['la leche', 'the milk', '🥛']],
      phrases: [['I drink water', 'yo bebo agua'], ['I eat bread', 'yo como pan']] },
    { words: [['el queso', 'the cheese', '🧀'], ['el café', 'the coffee', '☕'], ['el huevo', 'the egg', '🥚'], ['la naranja', 'the orange', '🍊']],
      phrases: [['the coffee is hot', 'el café está caliente'], ['I want an orange', 'quiero una naranja']] },
  ] },
  { title: 'Animals', desc: 'Pets and farm friends', color: 'blue', lessons: [
    { words: [['el gato', 'the cat', '🐱'], ['el perro', 'the dog', '🐶'], ['el pájaro', 'the bird', '🐦'], ['el pez', 'the fish', '🐟']],
      phrases: [['the cat drinks milk', 'el gato bebe leche'], ['I have a dog', 'tengo un perro']] },
    { words: [['el caballo', 'the horse', '🐴'], ['la vaca', 'the cow', '🐮'], ['el cerdo', 'the pig', '🐷'], ['la oveja', 'the sheep', '🐑']],
      phrases: [['the cow is big', 'la vaca es grande'], ['the horse eats', 'el caballo come']] },
  ] },
  { title: 'Family', desc: 'Talk about the people you love', color: 'purple', lessons: [
    { words: [['la madre', 'the mother', '👩'], ['el padre', 'the father', '👨'], ['el hermano', 'the brother', '👦'], ['la hermana', 'the sister', '👧']],
      phrases: [['my mother is kind', 'mi madre es amable'], ['I have a sister', 'tengo una hermana']] },
    { words: [['el abuelo', 'the grandfather', '👴'], ['la abuela', 'the grandmother', '👵'], ['el bebé', 'the baby', '👶'], ['la familia', 'the family', '👨‍👩‍👧']],
      phrases: [['the baby sleeps', 'el bebé duerme'], ['my family is big', 'mi familia es grande']] },
  ] },
];
const ES_ALL = ES_UNITS.flatMap((u) => u.lessons.flatMap((l) => l.words));
const ES_FILLER = ['el', 'la', 'es', 'yo', 'un', 'mi', 'come', 'bebe', 'pequeño', 'tengo', 'está', 'muy'];

function spanishQuestions(lesson) {
  const qs = [];
  const words = lesson.words;
  for (const w of words) {
    const others = ES_ALL.filter((x) => x[0] !== w[0]);
    const pics = shuffle([w, ...pick(others, 3)]);
    qs.push({ type: 'pics', prompt: `Which one is “${w[0]}”?`, speak: w[0],
      options: pics.map((x) => ({ label: x[0], emoji: x[2], speak: x[0] })), answer: pics.indexOf(w) });
    const tr = shuffle([w, ...pick(others, 3)]);
    if (Math.random() < 0.5) {
      qs.push({ type: 'mc', prompt: `How do you say “${w[1]}”?`, options: tr.map((x) => ({ label: x[0], speak: x[0] })), answer: tr.indexOf(w) });
    } else {
      qs.push({ type: 'mc', prompt: 'What do you hear?', listen: w[0], options: tr.map((x) => ({ label: x[1] })), answer: tr.indexOf(w) });
    }
  }
  for (const [en, es] of lesson.phrases) {
    const toks = es.replace(',', ' ,').split(' ').filter((t) => t !== ',');
    qs.push({ type: 'build', prompt: 'Translate this sentence', sub: en, speak: es,
      tiles: shuffle([...toks, ...pick(ES_FILLER.filter((f) => !toks.includes(f)), 3)]), answer: toks });
  }
  qs.push({ type: 'match', prompt: 'Tap the matching pairs', pairs: words.map((w) => [w[0], w[1]]) });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

function buildSpanish() {
  return ES_UNITS.map((u, ui) => ({
    title: u.title, desc: u.desc, color: u.color,
    guide: u.lessons.flatMap((l) => l.words.map((w) => ({ term: `${w[2]} ${w[0]}`, def: w[1] }))),
    lessons: u.lessons.map((l, li) => ({ id: `es:${ui}:${li}`, title: l.words.map((w) => w[0]).join(', '), ...l })),
  }));
}

export const COURSES = {
  chess: { id: 'chess', name: 'Chess Openings', icon: '♞', units: buildChess(), questions: chessQuestions },
  es: { id: 'es', name: 'Spanish', icon: '🇪🇸', units: buildSpanish(), questions: spanishQuestions },
};
