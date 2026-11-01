// Hana — Sprout's original chibi anime-girl mascot, drawn as inline SVG.
// Her ahoge (the hair strand on top) is a little sprout.
// mood: 'happy' | 'cheer' | 'sad' | 'think'
let uid = 0;
export function mascot(mood = 'happy', size = 120) {
  const id = `h${++uid}`;
  const HAIR = '#2f3b63', HAIR_HI = '#4a5d94', LINE = '#1c2140', SKIN = '#ffe6d8', SKIN_S = '#f7c9b5';

  const eye = (cx, dir) => {
    if (mood === 'cheer') return `<path d="M${cx - 9} ${60} Q${cx} ${50} ${cx + 9} ${60}" stroke="${LINE}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    const lx = mood === 'think' ? 2.5 : 0; const ly = mood === 'think' ? -2 : mood === 'sad' ? 1.5 : 0;
    return `<ellipse cx="${cx}" cy="59" rx="9" ry="11" fill="#fff"/>
      <ellipse cx="${cx + lx}" cy="${60 + ly}" rx="7.4" ry="9.6" fill="url(#${id}i)"/>
      <ellipse cx="${cx + lx}" cy="${61 + ly}" rx="3.6" ry="4.8" fill="#163a1c"/>
      <circle cx="${cx + lx - 3}" cy="${56 + ly}" r="3" fill="#fff"/>
      <circle cx="${cx + lx + 3}" cy="${64 + ly}" r="1.5" fill="#fff" opacity=".9"/>
      <path d="M${cx - 10} ${51} Q${cx} ${44} ${cx + 10} ${50}" stroke="${LINE}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M${dir < 0 ? cx - 10 : cx + 10} ${dir < 0 ? 51 : 50} l${dir * 3} -2.5" stroke="${LINE}" stroke-width="2.4" stroke-linecap="round"/>`;
  };
  const brows = mood === 'sad'
    ? `<path d="M38 42 L52 46" stroke="${HAIR}" stroke-width="2.4" stroke-linecap="round"/><path d="M82 42 L68 46" stroke="${HAIR}" stroke-width="2.4" stroke-linecap="round"/>`
    : mood === 'think' ? `<path d="M38 45 Q45 41 52 44" stroke="${HAIR}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M68 42 Q75 39 82 43" stroke="${HAIR}" stroke-width="2.2" fill="none" stroke-linecap="round"/>` : '';
  const mouth = {
    happy: `<path d="M55 75 Q60 80 65 75" stroke="${LINE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    cheer: `<path d="M53 72 Q60 84 67 72 Z" fill="#8a2a3b"/><path d="M56 78 Q60 81 64 78 Q60 76 56 78Z" fill="#ff8fa3"/>`,
    sad: `<path d="M55 78 Q57.5 75 60 77 Q62.5 75 65 78" stroke="${LINE}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    think: `<ellipse cx="64" cy="76" rx="2.6" ry="2.2" fill="#8a2a3b"/>`,
  }[mood];
  const extra = mood === 'sad'
    ? '<path d="M37 68 Q34 74 37 77 Q40 74 37 68Z" fill="#7cc8ff"/>'
    : mood === 'think' ? `<path d="M92 30 q4 6 0 9 q-4 -3 0 -9Z" fill="#7cc8ff" opacity=".9"/>` : '';
  const arms = mood === 'cheer'
    ? `<path d="M40 104 Q26 94 22 78" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="21" cy="75" r="6" fill="${SKIN}" stroke="${SKIN_S}" stroke-width="1.5"/>
       <path d="M80 104 Q94 94 98 78" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="99" cy="75" r="6" fill="${SKIN}" stroke="${SKIN_S}" stroke-width="1.5"/>`
    : '';

  return `<svg class="mascot mascot-${mood}" width="${size}" height="${size}" viewBox="0 0 120 130" role="img" aria-label="Hana, the Sprout guide">
    <defs>
      <linearGradient id="${id}i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f6b2a"/><stop offset=".55" stop-color="#3fbf3a"/><stop offset="1" stop-color="#a6ef5a"/></linearGradient>
      <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HAIR_HI}"/><stop offset=".5" stop-color="${HAIR}"/></linearGradient>
    </defs>
    <ellipse cx="60" cy="126" rx="30" ry="3.5" fill="rgba(0,0,0,.12)"/>
    <path d="M24 50 Q20 14 60 11 Q100 14 96 50 L101 106 Q92 114 83 104 L84 76 L36 76 L37 104 Q28 114 19 106 Z" fill="url(#${id}h)"/>
    <rect x="54" y="82" width="12" height="12" rx="3" fill="${SKIN_S}"/>
    <path d="M36 126 Q36 98 60 93 Q84 98 84 126 Z" fill="#fff" stroke="#dfe6ee" stroke-width="2"/>
    <path d="M43 97 L60 114 L77 97 Q70 92.5 60 92.5 Q50 92.5 43 97Z" fill="#58cc02" stroke="#46a302" stroke-width="2" stroke-linejoin="round"/>
    <path d="M52 108 L60 112 L52 116Z M68 108 L60 112 L68 116Z" fill="#ff4b4b"/><circle cx="60" cy="112" r="2.6" fill="#ea2b2b"/>
    ${arms}
    <path d="M31 50 Q31 81 60 86 Q89 81 89 50 Q89 22 60 22 Q31 22 31 50Z" fill="${SKIN}"/>
    <ellipse cx="38" cy="71" rx="6.5" ry="3.6" fill="#ff9eb0" opacity=".65"/><ellipse cx="82" cy="71" rx="6.5" ry="3.6" fill="#ff9eb0" opacity=".65"/>
    <path d="M35 70 l2 -3 M39 70 l2 -3 M79 70 l2 -3 M83 70 l2 -3" stroke="#ff7f98" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
    ${eye(45, -1)}${eye(75, 1)}
    ${mouth}${extra}
    <path d="M27 54 Q24 17 60 15 Q96 17 93 54 L87 40 L82 46 L76 31 L68 43 L61 27 L54 43 L45 31 L39 46 L33 39 Z" fill="url(#${id}h)"/>
    <path d="M44 22 Q56 17 70 21" stroke="${HAIR_HI}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M28 44 Q21 72 29 92 Q36 84 35 60Z" fill="${HAIR}"/>
    <path d="M92 44 Q99 72 91 92 Q84 84 85 60Z" fill="${HAIR}"/>
    ${brows}
    <circle cx="34" cy="36" r="3.4" fill="#ffc800" stroke="#e5a500" stroke-width="1.2"/>
    <path d="M60 16 Q58 9 61 3" stroke="#46a302" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path class="leaf-l" d="M61 5 Q47 -4 41 6 Q51 13 61 5Z" fill="#89e219" stroke="#46a302" stroke-width="2" stroke-linejoin="round"/>
    <path class="leaf-r" d="M61 5 Q75 -4 81 6 Q71 13 61 5Z" fill="#89e219" stroke="#46a302" stroke-width="2" stroke-linejoin="round"/>
  </svg>`;
}
