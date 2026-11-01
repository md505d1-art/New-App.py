// British Sign Language basics: fingerspelling vowels, numbers 1–5 and everyday signs.
// Signs vary by region; the course points learners to Deaf teachers and BSL SignBank for video.

const SKIN = '#f6c7a4'; const EDGE = '#c98a5e';
// Finger bases and tips for an open hand (thumb, index, middle, ring, little).
const F = [[[33, 80], [15, 57]], [[39, 52], [34, 15]], [[51, 50], [51, 8]], [[62, 52], [65, 13]], [[72, 58], [81, 30]]];

// raised: which fingers are up. tip: which fingertip is being touched (vowels).
export function handSVG({ raised = [1, 1, 1, 1, 1], tip = -1, size = 110 } = {}) {
  const seg = (i) => {
    const [[bx, by], [tx, ty]] = F[i];
    const k = raised[i] ? 1 : 0.32; const ex = bx + (tx - bx) * k; const ey = by + (ty - by) * k;
    return [bx, by, ex, ey];
  };
  const fingers = F.map((_, i) => seg(i));
  const outline = fingers.map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="${EDGE}" stroke-width="15" stroke-linecap="round"/>`).join('');
  const fill = fingers.map(([a, b, c, d]) => `<path d="M${a} ${b} L${c} ${d}" stroke="${SKIN}" stroke-width="11" stroke-linecap="round"/>`).join('');
  const nails = fingers.map(([, , c, d], i) => (raised[i] ? `<ellipse cx="${c}" cy="${d + 1}" rx="3" ry="2.4" fill="#fbe1cf"/>` : '')).join('');
  let point = '';
  if (tip >= 0) {
    const [, , c, d] = fingers[tip];
    point = `<circle class="tip-ring" cx="${c}" cy="${d}" r="10" fill="none" stroke="#5b3fd6" stroke-width="3.5"/>
      <path d="M${c + 30} ${d - 18} L${c + 10} ${d - 4}" stroke="#5b3fd6" stroke-width="3.5" stroke-linecap="round"/><path d="M${c + 10} ${d - 4} l9 -1 M${c + 10} ${d - 4} l2 -8" stroke="#5b3fd6" stroke-width="3.5" stroke-linecap="round"/>`;
  }
  return `<svg class="hand" width="${size}" height="${size}" viewBox="0 0 110 110" aria-hidden="true">
    <rect x="29" y="46" width="49" height="54" rx="18" fill="${EDGE}"/>${outline}<rect x="31" y="48" width="45" height="50" rx="16" fill="${SKIN}"/>${fill}${nails}${point}</svg>`;
}

const VOWELS = [['A', 0, 'Touch the tip of your thumb'], ['E', 1, 'Touch the tip of your index finger'], ['I', 2, 'Touch the tip of your middle finger'], ['O', 3, 'Touch the tip of your ring finger'], ['U', 4, 'Touch the tip of your little finger']];
const NUMBERS = [['1', [0, 1, 0, 0, 0], 'Index finger up'], ['2', [0, 1, 1, 0, 0], 'Index and middle fingers up'], ['3', [1, 1, 1, 0, 0], 'Thumb, index and middle fingers up'], ['4', [0, 1, 1, 1, 1], 'Four fingers up, thumb tucked in'], ['5', [1, 1, 1, 1, 1], 'All five fingers spread']];

export const SIGNS = [
  { word: 'hello', emoji: '👋', desc: 'Flat hand near your forehead moves outwards, like a small salute.' },
  { word: 'thank you', emoji: '🙏', desc: 'Fingertips of a flat hand touch your chin, then the hand moves forward and down.' },
  { word: 'please', emoji: '🥺', desc: 'Very like thank you: a flat hand moves forward from your chin.' },
  { word: 'yes', emoji: '✅', desc: 'A closed fist nods up and down, like a nodding head.' },
  { word: 'no', emoji: '❌', desc: 'Flat hands, palms down, sweep outwards to the sides.' },
  { word: 'good', emoji: '👍', desc: 'Thumb up.' },
  { word: 'bad', emoji: '👎', desc: 'Little finger up.' },
  { word: 'deaf', emoji: '🧏', desc: 'Index and middle fingers touch your ear.' },
  { word: 'name', emoji: '🏷️', desc: 'Index and middle fingers touch the side of your forehead, then move away.' },
  { word: 'drink', emoji: '🥤', desc: 'A C-shaped hand tips towards your mouth, like holding a cup.' },
  { word: 'eat', emoji: '🍽️', desc: 'Bunched fingertips move to your mouth a couple of times.' },
  { word: 'help', emoji: '🤝', desc: 'A thumbs-up hand rests on your other flat palm; both move forward together.' },
  { word: 'friend', emoji: '🧑‍🤝‍🧑', desc: 'Clasp your hands together and shake them slightly.' },
  { word: 'mum', emoji: '👩', desc: 'Fingerspell M (three fingers laid on your other palm), tapped twice.' },
];

export const BSL = {
  id: 'bsl', name: 'British Sign Language', sub: 'BSL basics', glyph: '🤟', color: 'purple', cat: 'language', icon: 'english',
  note: 'Signs vary by region, and pictures can only show so much. Watch real signs on BSL SignBank or with a Deaf BSL teacher to learn the movements properly.',
  units: [
    { title: 'Fingerspelling: vowels', desc: 'Point to a fingertip on your other hand', color: 'purple',
      items: VOWELS.map(([letter, tip, desc]) => ({ word: letter, desc, svg: (s) => handSVG({ tip, size: s }) })) },
    { title: 'Numbers 1–5', desc: 'Count on one hand', color: 'blue',
      items: NUMBERS.map(([n, raised, desc]) => ({ word: n, desc, svg: (s) => handSVG({ raised, size: s }) })) },
    { title: 'Everyday signs', desc: 'Greetings and manners', color: 'green', items: SIGNS.slice(0, 7) },
    { title: 'People and needs', desc: 'Talking about yourself and others', color: 'red', items: SIGNS.slice(7) },
  ],
};
