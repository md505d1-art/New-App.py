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

const UNIT_LEVEL = [1, 1, 2, 2, 3];
const LEVEL_NAME = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

// Every opening is a game against the AI that starts from the gambit position.
// Each unit ends with one short quiz to review the move orders.
function buildChess() {
  return CHESS_UNITS.map((u, ui) => ({
    title: u.title, desc: u.desc, color: u.color,
    guide: u.keys.map((k) => ({ term: G[k].name, def: `${movesText(G[k].moves)} — ${G[k].idea}` })),
    lessons: [
      ...u.keys.map((k) => ({ id: `chess2:${k}`, title: `Play the ${G[k].name}`, kind: 'play',
        play: { key: k, level: UNIT_LEVEL[ui], levelName: LEVEL_NAME[UNIT_LEVEL[ui]] } })),
      { id: `chess2:quiz:${ui}`, title: `${u.title} review quiz`, kind: 'quiz', keys: u.keys.slice(0, 3) },
    ],
  }));
}

export function gambitStart(key) {
  const g = G[key];
  const c = new Chess(); g.moves.forEach((m) => c.move(m));
  return { fen: c.fen(), moves: g.moves, side: g.side === 'White' ? 'w' : 'b', name: g.name, idea: g.idea };
}
export { G as GAMBITS };

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

/* ---------------- GCSE History: Cold War (from your "Cold War Revision Starter" note) ---------------- */

const CW_UNITS = [
  { title: 'Origins of the Cold War', desc: '1945–1949: from allies to rivals', color: 'red', lessons: [
    { items: [
      { year: '1945', event: 'Yalta Conference', detail: 'Feb 1945: Stalin, Roosevelt and Churchill agree to split Germany into four zones.' },
      { year: 'Jul 1945', event: 'Potsdam Conference', detail: 'Truman and Attlee now attend; arguments over Poland and German reparations.' },
      { year: '1946', event: 'Iron Curtain speech', detail: 'Churchill warns that an "iron curtain" has come down across Europe.' },
      { year: '1947', event: 'Truman Doctrine', detail: 'The USA promises to help countries resist communism (containment).' },
    ], whys: [
      { q: 'Why did relations worsen after World War II?', a: 'Rival ideologies, plus disputes over Germany and Poland once the common enemy was gone',
        wrong: ['The USA and USSR both wanted to restore the Russian Tsar', 'Britain refused to join the United Nations'] },
    ] },
    { items: [
      { year: '1947', event: 'Marshall Plan', detail: 'About $13 billion of US aid to rebuild Europe and stop communism spreading.' },
      { year: '1948', event: 'Berlin Blockade begins', detail: 'Stalin cuts road, rail and canal links to West Berlin (June 1948).' },
      { year: '1949', event: 'NATO established', detail: 'A Western military alliance: an attack on one is an attack on all.' },
      { year: 'Aug 1949', event: 'USSR tests an atomic bomb', detail: 'The US nuclear monopoly ends and the arms race begins.' },
    ], whys: [
      { q: 'What caused the Berlin Blockade?', a: 'The West merged its zones and introduced a new currency, the Deutschmark, in 1948',
        wrong: ['The Berlin Wall was built across the city', 'The USSR wanted to join NATO'] },
      { q: 'How did the West respond to the Berlin Blockade?', a: 'The Berlin Airlift flew supplies into West Berlin for about 11 months',
        wrong: ['It invaded East Germany', 'It handed West Berlin to the USSR'] },
    ] },
  ] },
  { title: 'Crisis Points', desc: '1955–1968: walls, missiles and tanks', color: 'blue', lessons: [
    { items: [
      { year: '1955', event: 'Warsaw Pact formed', detail: 'Soviet-led military alliance, set up after West Germany joined NATO.' },
      { year: '1956', event: 'Hungarian Uprising', detail: 'Soviet tanks crush Imre Nagy\'s attempt to leave the Warsaw Pact.' },
      { year: '1961', event: 'Berlin Wall built', detail: 'August 1961: built to stop East Germans escaping to the West.' },
      { year: '1962', event: 'Cuban Missile Crisis', detail: 'October 1962: 13 days of stand-off over Soviet missiles in Cuba.' },
    ], whys: [
      { q: 'Why was the Cuban Missile Crisis significant?', a: 'It was the closest the world came to nuclear war, and it led to the hotline and the 1963 Test Ban Treaty',
        wrong: ['It ended the Cold War immediately', 'It caused the Berlin Blockade'] },
      { q: 'Why was the Berlin Wall built?', a: 'To stop skilled East Germans fleeing to the West through Berlin',
        wrong: ['To keep NATO troops out of West Germany', 'To celebrate the end of World War II'] },
    ] },
    { items: [
      { year: '1963', event: 'Hotline and Test Ban Treaty', detail: 'A direct Washington–Moscow link, and a ban on nuclear tests in the atmosphere.' },
      { year: '1968', event: 'Prague Spring', detail: 'Dubček\'s reforms in Czechoslovakia are crushed by Warsaw Pact troops.' },
      { year: 'Nov 1968', event: 'Brezhnev Doctrine', detail: 'The USSR claims the right to intervene if communism is threatened in Eastern Europe.' },
      { year: '1972', event: 'SALT 1 signed', detail: 'The first agreement to limit nuclear weapons, during détente.' },
    ], whys: [
      { q: 'How did Kennedy respond to missiles in Cuba?', a: 'A naval blockade ("quarantine") of Cuba, while negotiating with Khrushchev',
        wrong: ['He immediately bombed Moscow', 'He removed all US troops from Europe'] },
    ] },
  ] },
  { title: 'The End of the Cold War', desc: '1979–1991: the USSR collapses', color: 'purple', lessons: [
    { items: [
      { year: '1979', event: 'Soviet invasion of Afghanistan', detail: 'Ends détente; the USA boycotts the 1980 Moscow Olympics.' },
      { year: '1985', event: 'Gorbachev becomes Soviet leader', detail: 'Introduces glasnost (openness) and perestroika (restructuring).' },
      { year: '1987', event: 'INF Treaty', detail: 'Reagan and Gorbachev scrap intermediate-range nuclear missiles.' },
      { year: '1989', event: 'Berlin Wall falls', detail: '9 November 1989: East Germans cross freely; revolutions sweep Eastern Europe.' },
      { year: '1991', event: 'Soviet Union dissolves', detail: 'December 1991: the USSR breaks into 15 independent states.' },
    ], whys: [
      { q: 'How did the Cold War end?', a: 'Gorbachev\'s reforms, Soviet economic weakness and the 1989 revolutions in Eastern Europe',
        wrong: ['A nuclear war between the USA and USSR', 'The USA joined the Warsaw Pact'] },
    ] },
  ] },
];
const CW_ALL = CW_UNITS.flatMap((u) => u.lessons.flatMap((l) => l.items));
const yr = (y) => +y.replace(/\D/g, '');

function factsQuestions(lesson) {
  const qs = [];
  const items = lesson.items;
  for (const it of items) {
    const others = CW_ALL.filter((x) => x.event !== it.event);
    const evOpts = shuffle([it, ...pick(others.filter((x) => yr(x.year) !== yr(it.year)), 3)]);
    qs.push({ type: 'mc', prompt: `What happened in ${it.year}?`, options: evOpts.map((x) => ({ label: x.event })), answer: evOpts.indexOf(it), explain: it.detail });
    const years = [...new Set(CW_ALL.map((x) => String(yr(x.year))))].filter((y) => y !== String(yr(it.year)));
    const yOpts = shuffle([String(yr(it.year)), ...pick(years, 3)]);
    qs.push({ type: 'mc', prompt: `When was the ${it.event}?`, sub: it.detail.replace(/\d{4}/g, '____'), options: yOpts.map((label) => ({ label })), answer: yOpts.indexOf(String(yr(it.year))), explain: it.detail });
  }
  for (const w of lesson.whys) {
    const o = shuffle([w.a, ...w.wrong]);
    qs.push({ type: 'mc', prompt: w.q, options: o.map((label) => ({ label })), answer: o.indexOf(w.a) });
  }
  const uniq = items.filter((x, i) => items.findIndex((y) => yr(y.year) === yr(x.year)) === i);
  const ordered = [...uniq].sort((a, b) => yr(a.year) - yr(b.year)).map((x) => x.event);
  qs.push({ type: 'build', prompt: 'Put these events in time order', sub: 'Earliest first', tiles: shuffle(ordered), answer: ordered, vertical: true });
  qs.push({ type: 'match', prompt: 'Match each year to its event', pairs: uniq.map((x) => [String(yr(x.year)), x.event]) });
  return shuffle(qs.slice(0, -1)).concat(qs.slice(-1));
}

function buildFacts(prefix, units) {
  return units.map((u, ui) => ({
    title: u.title, desc: u.desc, color: u.color,
    guide: u.lessons.flatMap((l) => l.items.map((it) => ({ term: `${it.year} · ${it.event}`, def: it.detail }))),
    lessons: u.lessons.map((l, li) => ({ id: `${prefix}:${ui}:${li}`, title: l.items.map((x) => x.event).join(', '), ...l })),
  }));
}

export const COURSES = {
  chess: { id: 'chess', name: 'Chess', icon: '♞', units: buildChess(), questions: chessQuestions },
  history: { id: 'history', name: 'GCSE History', icon: '📜', units: buildFacts('cw', CW_UNITS), questions: factsQuestions,
    note: 'Built from your Cold War Revision Starter note. Check it against your AQA specification.' },
  es: { id: 'es', name: 'Spanish', icon: '🇪🇸', units: buildSpanish(), questions: spanishQuestions },
};
