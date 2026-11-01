// Hana — Sprout's guide: teal braided hair with flowers, orange jacket, overalls, freckles,
// and Bit, her little floating triangle robot. Drawn as inline SVG.
// mood: 'happy' | 'cheer' | 'sad' | 'think' | 'wave'
let uid = 0;

const C = {
  hair: '#1d6b72', hairD: '#124a51', hairL: '#2f909a', skin: '#f6c7a4', skinD: '#e4a582', blush: '#f08a7c',
  line: '#1b1820', iris: '#e29a2c', irisD: '#9c5512', jacket: '#ec7a2b', jacketD: '#c75d16', jacketL: '#f6a058',
  shirt: '#1f8a83', strap: '#3b3631', metal: '#b9bec4', glove: '#2b2a30', mouth: '#6b1d2a',
  bot: '#f4ecdc', botEdge: '#ec7a2b', screen: '#2a2440', glow: '#a982ff', cyan: '#43e4ff',
};

function bot(mood) {
  const happy = mood !== 'sad';
  return `<g class="bot">
    <ellipse class="bot-glow" cx="22" cy="54" rx="13" ry="3.6" fill="${C.glow}" opacity=".55"/>
    <path d="M22 12 L37 30 L22 48 L7 30 Z" fill="${C.bot}" stroke="${C.botEdge}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M22 12 L37 30 L22 30 Z" fill="#ffffff" opacity=".55"/>
    <path d="M7 30 L22 48 L22 30 Z" fill="#000" opacity=".06"/>
    <rect x="12.5" y="24.5" width="19" height="11" rx="4.5" fill="${C.screen}"/>
    <circle cx="18" cy="29.5" r="1.9" fill="${C.cyan}"/><circle cx="26" cy="29.5" r="1.9" fill="${C.cyan}"/>
    <path d="${happy ? 'M19 32.2 Q22 34.6 25 32.2' : 'M19 33.6 Q22 31.8 25 33.6'}" stroke="${C.cyan}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <path class="shard" d="M40 10 L48 15 L41 21 Z" fill="${C.bot}" stroke="${C.botEdge}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M42.5 14 L45 15.5 L43 17.5 Z" fill="${C.glow}"/>
  </g>`;
}

function eye(cx, look, id, mood) {
  if (mood === 'cheer') return `<path d="M${cx - 9} 63 Q${cx} 54 ${cx + 9} 63" stroke="${C.line}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
  const [dx, dy] = look;
  const flick = cx < 72 ? `M${cx - 9} 60.5 l-3.5 -2.5` : `M${cx + 9} 60.5 l3.5 -2.5`;
  return `<g class="eye">
    <path d="M${cx - 9} 62 Q${cx} 52.5 ${cx + 9} 61 Q${cx} 68.5 ${cx - 9} 62Z" fill="#fff"/>
    <ellipse cx="${cx + dx}" cy="${62 + dy}" rx="4.6" ry="5.4" fill="url(#${id}i)"/>
    <ellipse cx="${cx + dx}" cy="${62.6 + dy}" rx="2.1" ry="3" fill="#3a1d0c"/>
    <circle cx="${cx + dx - 1.6}" cy="${60 + dy}" r="1.5" fill="#fff"/>
    <path d="M${cx - 10} 61.5 Q${cx} 51 ${cx + 10} 60" stroke="${C.line}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="${flick}" stroke="${C.line}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M${cx - 6} 66.4 Q${cx} 68 ${cx + 6} 65.6" stroke="${C.line}" stroke-width="1" fill="none" opacity=".55"/>
  </g>`;
}

export function mascot(mood = 'happy', size = 120) {
  const id = `m${++uid}`;
  const look = { happy: [2, 0], wave: [1.5, 0], sad: [2.6, 0.5], think: [2.4, -1.6], cheer: [0, 0] }[mood] || [0, 0];
  const brows = {
    happy: 'M50 48 Q58 43.5 66 46.5 M78 46 Q86 43 94 47',
    wave: 'M50 48 Q58 43.5 66 46.5 M78 46 Q86 43 94 47',
    cheer: 'M50 47 Q58 42 66 45.5 M78 45 Q86 41.5 94 46',
    think: 'M50 49 Q58 46 66 47.5 M78 45 Q86 41 94 45',
    sad: 'M50 51 Q58 49 66 50 M78 44.5 Q86 40.5 94 46',
  }[mood];
  const mouth = {
    happy: `<path d="M60 77 Q73 92 87 76 Q73 80.5 60 77Z" fill="${C.mouth}"/><path d="M61.5 77.6 Q73 81.4 85.5 76.8 L84.4 79.3 Q73 83 62.6 79.8Z" fill="#fff"/><ellipse cx="74" cy="86" rx="5" ry="2.2" fill="#ef7f8d"/>`,
    wave: `<path d="M60 77 Q73 92 87 76 Q73 80.5 60 77Z" fill="${C.mouth}"/><path d="M61.5 77.6 Q73 81.4 85.5 76.8 L84.4 79.3 Q73 83 62.6 79.8Z" fill="#fff"/><ellipse cx="74" cy="86" rx="5" ry="2.2" fill="#ef7f8d"/>`,
    cheer: `<path d="M58 75 Q73 96 89 74 Q73 79 58 75Z" fill="${C.mouth}"/><path d="M59.6 75.7 Q73 80 87.4 74.8 L86.2 77.8 Q73 82 60.8 78.3Z" fill="#fff"/><ellipse cx="74" cy="87.5" rx="6" ry="2.6" fill="#ef7f8d"/>`,
    think: `<path d="M64 79.5 Q75 83.5 84 75.5" stroke="${C.mouth}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    sad: `<path d="M67 80.5 Q72 77 78 80 Q72.5 85 67 80.5Z" fill="${C.mouth}"/>`,
  }[mood];
  const hand = mood === 'think'
    ? `<g><path d="M80 104 Q82 94 88 90" stroke="${C.jacket}" stroke-width="12" fill="none" stroke-linecap="round"/>
        <rect x="80" y="80" width="17" height="15" rx="6" fill="${C.glove}"/>
        <ellipse cx="84" cy="80.5" rx="2.6" ry="3.4" fill="${C.skin}"/><ellipse cx="89" cy="80" rx="2.6" ry="3.4" fill="${C.skin}"/><ellipse cx="94" cy="81" rx="2.4" ry="3.2" fill="${C.skin}"/>
        <rect x="81" y="93" width="15" height="4" rx="2" fill="#4a474f"/></g>`
    : mood === 'wave'
      ? `<g class="wave-arm"><path d="M104 132 Q114 116 113 98" stroke="${C.jacket}" stroke-width="13" fill="none" stroke-linecap="round"/>
          <g transform="translate(-9 0)"><path d="M116 90 q-1 -12 2 -14 q3 -1 3 6 l1 -9 q1 -4 4 -3 q2 1 1 6 l1 -5 q1 -3 3.5 -2 q2 1 1 5 l-.5 5 q1 -3 3 -2 q2 1 0 7 l-3 10 q-3 6 -10 5 q-6 -1 -6 -9z" fill="${C.skin}"/>
          <path d="M116 92 q8 4 18 -2 l-2 9 q-3 6 -10 5 q-6 -1 -6 -9z" fill="${C.glove}"/>
          <rect x="114" y="96" width="16" height="5" rx="2.5" fill="#4a474f" transform="rotate(-8 122 98)"/></g></g>`
      : '';
  const flower = (x, y, col) => `<g transform="translate(${x} ${y})"><circle r="2.4" cx="0" cy="-2.6" fill="${col}"/><circle r="2.4" cx="2.5" cy="-.8" fill="${col}"/><circle r="2.4" cx="1.6" cy="2.2" fill="${col}"/><circle r="2.4" cx="-1.6" cy="2.2" fill="${col}"/><circle r="2.4" cx="-2.5" cy="-.8" fill="${col}"/><circle r="1.3" fill="#ffd34d"/></g>`;
  const braidSegs = [[101, 84], [102, 92], [103, 100], [103.5, 108], [103, 116], [102, 123]];

  return `<svg class="mascot mascot-${mood}" width="${size}" height="${size}" viewBox="0 0 140 140" role="img" aria-label="Hana, your Sprout guide">
    <defs>
      <linearGradient id="${id}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.irisD}"/><stop offset=".6" stop-color="${C.iris}"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>
      <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.hairL}"/><stop offset=".55" stop-color="${C.hair}"/><stop offset="1" stop-color="${C.hairD}"/></linearGradient>
    </defs>
    ${bot(mood)}
    <path d="M40 66 C30 44 44 14 73 13 C102 13 116 40 106 66 L112 84 L101 78 L104 94 L93 84 L54 84 L44 94 L45 79 L33 85 Z" fill="url(#${id}h)"/>
    <rect x="64" y="84" width="17" height="22" rx="6" fill="${C.skinD}"/>
    <path d="M30 140 Q32 110 56 102 L72 112 L88 102 Q112 110 114 140 Z" fill="${C.shirt}"/>
    <path d="M24 140 Q26 110 52 100 L62 120 L56 140 Z" fill="${C.jacket}"/>
    <path d="M120 140 Q118 110 92 100 L82 120 L88 140 Z" fill="${C.jacket}"/>
    <path d="M52 100 L43 92 L49 112 L62 120 Z" fill="${C.jacketL}"/><path d="M92 100 L101 92 L95 112 L82 120 Z" fill="${C.jacketL}"/>
    <path d="M52 100 L62 120 L58 140 L54 140 L50 116Z" fill="${C.jacketD}" opacity=".5"/>
    <rect x="54" y="112" width="7.5" height="30" rx="2" fill="${C.strap}" transform="rotate(-6 58 126)"/>
    <rect x="83" y="112" width="7.5" height="30" rx="2" fill="${C.strap}" transform="rotate(6 86 126)"/>
    <rect x="53.5" y="124" width="9" height="6" rx="1.5" fill="${C.metal}" transform="rotate(-6 58 127)"/><rect x="82.5" y="124" width="9" height="6" rx="1.5" fill="${C.metal}" transform="rotate(6 87 127)"/>
    <path d="M64 95 Q72 112 81 95" stroke="#2a2a2a" stroke-width="1.2" fill="none"/>
    <g transform="translate(72.5 108)"><circle r="5" fill="#f0a030" stroke="#b86a14" stroke-width="1.4" stroke-dasharray="2.2 1.2"/><circle r="1.8" fill="${C.shirt}"/></g>
    ${braidSegs.map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="5.6" ry="5" fill="${i % 2 ? C.hair : C.hairL}" stroke="${C.hairD}" stroke-width="1.4"/>`).join('')}
    <path d="M100 126 q2 6 -1 10 M102 127 q3 5 2 9" stroke="${C.hair}" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${flower(98, 90, '#f08a2a')}${flower(106, 104, '#b48cff')}${flower(99, 118, '#ff8fb1')}
    <ellipse cx="45" cy="64" rx="5" ry="7" fill="${C.skin}"/><ellipse cx="100" cy="64" rx="5" ry="7" fill="${C.skin}"/>
    <circle cx="100.5" cy="72.5" r="2.6" fill="none" stroke="#e0b04a" stroke-width="1.3"/><circle cx="44.5" cy="72.5" r="2.6" fill="none" stroke="#e0b04a" stroke-width="1.3"/>
    <path d="M47 52 C47 80 58 92 73 92 C88 92 99 80 99 52 C99 32 47 32 47 52Z" fill="${C.skin}"/>
    <ellipse cx="55" cy="72" rx="6" ry="3.4" fill="${C.blush}" opacity=".45"/><ellipse cx="91" cy="72" rx="6" ry="3.4" fill="${C.blush}" opacity=".45"/>
    <g fill="#c47a58" opacity=".85"><circle cx="58" cy="70" r=".9"/><circle cx="61" cy="72.2" r=".8"/><circle cx="55.5" cy="73" r=".7"/><circle cx="85" cy="70.4" r=".9"/><circle cx="88" cy="72.4" r=".8"/><circle cx="90.5" cy="69.8" r=".7"/></g>
    <path d="M72 69.5 q2.4 2.2 0 3.6" stroke="${C.skinD}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    ${eye(60, look, id, mood)}${eye(85, look, id, mood)}
    ${mouth}
    <path d="M45 56 C40 30 58 15 77 17 C97 18 108 34 101 57 L97 44 L93 52 L90 37 L82 47 L80 32 L72 45 L67 30 L60 44 L57 33 L51 50 L49 40 Z" fill="url(#${id}h)"/>
    <path d="M58 22 Q66 17 76 18 M84 21 Q92 24 96 31" stroke="${C.hairL}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".9"/>
    <path d="M61 16 L57 9 L66 14 M74 14 L77 7 L81 15 M88 17 L95 13 L92 20 M45 40 L38 38 L46 46 M101 40 L108 37 L100 47" fill="${C.hair}" stroke="${C.hair}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${brows}" stroke="${C.line}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <g transform="translate(92 33) rotate(18) scale(.85)"><rect x="-4" y="-5" width="2.6" height="10" rx="1" fill="${C.jacket}"/><rect x="1.4" y="-5" width="2.6" height="10" rx="1" fill="${C.jacket}"/><rect x="-4" y="-1" width="8" height="2.4" rx="1" fill="${C.jacket}"/><rect x="-6" y="-7" width="11" height="2" rx="1" fill="#9f6bff"/></g>
    ${hand}
  </svg>`;
}
