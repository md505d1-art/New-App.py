// Build-your-own character: a bust drawn as SVG from simple choices.
export const AV_OPTIONS = {
  skin: ['#fde3cf', '#f6c7a4', '#e8ab82', '#c98a5e', '#9a6240', '#6b4128'],
  hair: ['messy', 'long', 'bob', 'bun', 'curly', 'short', 'buzz', 'braids'],
  hairColor: ['#1d6b72', '#2a2320', '#5a3a24', '#a8612a', '#e3bd62', '#d9548a', '#7d5cf0', '#d9dbe6', '#3b7be8'],
  eyes: ['#3a2a1e', '#6b4423', '#2f7bbd', '#2f9e6a', '#e29a2c', '#8a5cd6'],
  mouth: ['smile', 'grin', 'calm', 'smirk'],
  outfit: ['hoodie', 'jacket', 'tee', 'blazer'],
  outfitColor: ['#5b3fd6', '#ec7a2b', '#22a46b', '#ef5a5a', '#3b82f6', '#2b2a30', '#f0c23a', '#ff8fb1'],
  extra: ['none', 'glasses', 'headphones', 'cap', 'flower', 'earrings', 'bandana', 'freckles'],
  bg: ['#ece7ff', '#e3eefe', '#e1f5ea', '#fde6e4', '#fff1d6', '#f1edfd', '#2a2440'],
};
export const AV_LABELS = { skin: 'Skin', hair: 'Hair', hairColor: 'Hair colour', eyes: 'Eyes', mouth: 'Smile', outfit: 'Outfit', outfitColor: 'Outfit colour', extra: 'Extras', bg: 'Background' };
export const DEFAULT_AVATAR = { skin: 1, hair: 0, hairColor: 2, eyes: 1, mouth: 0, outfit: 0, outfitColor: 0, extra: 0, bg: 0 };

export function randomAvatar() {
  const a = {}; for (const [k, v] of Object.entries(AV_OPTIONS)) a[k] = Math.floor(Math.random() * v.length); return a;
}

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16); const f = (c) => Math.max(0, Math.min(255, Math.round(c + amt * 255)));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => f(c).toString(16).padStart(2, '0')).join('')}`;
};

let uid = 0;
export function avatarSVG(av = DEFAULT_AVATAR, size = 120, { bg = true } = {}) {
  const o = (k) => AV_OPTIONS[k][av[k] ?? 0] ?? AV_OPTIONS[k][0];
  const id = `av${++uid}`;
  const skin = o('skin'); const skinD = shade(skin, -0.1); const hc = o('hairColor'); const hd = shade(hc, -0.14); const hl = shade(hc, 0.12);
  const eye = o('eyes'); const style = o('hair'); const out = o('outfit'); const oc = o('outfitColor'); const od = shade(oc, -0.14); const extra = o('extra');
  const line = '#1f1a24';

  const back = {
    messy: `<path d="M40 66 C30 44 44 14 73 13 C102 13 116 40 106 66 L112 84 L101 78 L104 94 L93 84 L54 84 L44 94 L45 79 L33 85 Z" fill="url(#${id}h)"/>`,
    long: `<path d="M38 60 C34 26 54 12 73 12 C94 12 112 26 108 60 L114 130 L32 130 Z" fill="url(#${id}h)"/>`,
    bob: `<path d="M38 62 C34 28 54 13 73 13 C94 13 112 28 108 62 L110 96 Q92 102 84 92 L62 92 Q52 102 36 96 Z" fill="url(#${id}h)"/>`,
    bun: `<circle cx="73" cy="14" r="13" fill="${hd}"/><path d="M44 58 C42 30 56 18 73 18 C92 18 104 30 102 58 Z" fill="url(#${id}h)"/>`,
    curly: [[44, 40], [54, 26], [68, 19], [82, 19], [96, 26], [104, 40], [108, 56], [40, 56], [42, 74], [106, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="${hc}"/>`).join(''),
    short: `<path d="M44 60 C40 30 56 16 73 16 C92 16 106 30 102 60 Z" fill="url(#${id}h)"/>`,
    buzz: '',
    braids: `<path d="M40 62 C34 28 54 14 73 14 C94 14 112 28 106 62 Z" fill="url(#${id}h)"/>
      ${[[40, 76], [39, 86], [39, 96], [40, 106]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="5.4" fill="${i % 2 ? hc : hl}" stroke="${hd}" stroke-width="1.3"/>`).join('')}
      ${[[106, 76], [107, 86], [107, 96], [106, 106]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="5.4" fill="${i % 2 ? hc : hl}" stroke="${hd}" stroke-width="1.3"/>`).join('')}`,
  }[style];
  const front = {
    messy: `<path d="M45 56 C40 30 58 15 77 17 C97 18 108 34 101 57 L97 44 L93 52 L90 37 L82 47 L80 32 L72 45 L67 30 L60 44 L57 33 L51 50 L49 40 Z" fill="url(#${id}h)"/>`,
    long: `<path d="M46 58 C42 28 60 16 76 17 C96 18 108 32 102 58 C96 44 86 34 72 32 C62 36 52 44 46 58Z" fill="url(#${id}h)"/>`,
    bob: `<path d="M46 52 C44 28 60 17 74 17 C92 17 104 28 101 52 L46 52Z" fill="url(#${id}h)"/>`,
    bun: `<path d="M47 50 C48 32 60 24 74 24 C90 24 100 34 99 50 C90 40 80 36 72 37 C62 38 54 42 47 50Z" fill="url(#${id}h)"/>`,
    curly: [[52, 34], [62, 28], [74, 26], [86, 28], [96, 34], [50, 46], [98, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${hl}"/>`).join(''),
    short: `<path d="M47 50 C46 30 60 20 74 20 C90 20 102 30 100 50 L92 40 L84 46 L78 36 L70 44 L62 37 L54 46Z" fill="url(#${id}h)"/>`,
    buzz: `<path d="M47 52 C46 30 60 22 73 22 C88 22 100 30 99 52 C92 40 82 35 73 35 C64 35 54 40 47 52Z" fill="${hc}" opacity=".55"/>`,
    braids: `<path d="M46 54 C44 28 60 18 73 18 C90 18 104 28 101 54 C96 40 86 32 73 31 L73 22 L72 31 C62 32 52 40 46 54Z" fill="url(#${id}h)"/>`,
  }[style];

  const body = {
    hoodie: `<path d="M26 140 Q28 108 56 100 L72 108 L88 100 Q116 108 118 140 Z" fill="${oc}"/><path d="M52 98 Q72 120 92 98 Q88 112 72 114 Q56 112 52 98Z" fill="${od}"/><path d="M64 112 v16 M80 112 v16" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>`,
    jacket: `<path d="M30 140 Q32 110 56 102 L72 112 L88 102 Q112 110 114 140 Z" fill="#1f8a83"/><path d="M24 140 Q26 110 52 100 L62 120 L56 140 Z" fill="${oc}"/><path d="M120 140 Q118 110 92 100 L82 120 L88 140 Z" fill="${oc}"/><path d="M52 100 L43 92 L49 112 L62 120 Z" fill="${shade(oc, 0.1)}"/><path d="M92 100 L101 92 L95 112 L82 120 Z" fill="${shade(oc, 0.1)}"/>`,
    tee: `<path d="M26 140 Q28 108 58 100 Q72 108 86 100 Q116 108 118 140 Z" fill="${oc}"/><path d="M58 100 Q72 110 86 100" stroke="${od}" stroke-width="3" fill="none"/>`,
    blazer: `<path d="M30 140 Q32 110 58 102 L72 120 L86 102 Q112 110 114 140 Z" fill="#fff"/><path d="M66 106 L72 112 L78 106 L76 140 L68 140Z" fill="${shade(oc, -0.05)}"/><path d="M24 140 Q26 110 54 100 L66 128 L60 140 Z" fill="#2b2f45"/><path d="M120 140 Q118 110 90 100 L78 128 L84 140 Z" fill="#2b2f45"/><circle cx="62" cy="130" r="2" fill="#d9b44a"/>`,
  }[out];

  const mouth = {
    smile: `<path d="M64 77 Q73 84 82 77" stroke="#6b1d2a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    grin: `<path d="M61 76 Q73 90 85 76 Q73 79.5 61 76Z" fill="#6b1d2a"/><path d="M62.5 76.6 Q73 80 83.5 76.6 L82.6 78.6 Q73 81.6 63.4 78.8Z" fill="#fff"/>`,
    calm: `<path d="M67 78 Q73 80 79 78" stroke="#6b1d2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    smirk: `<path d="M65 79 Q75 82 83 75.5" stroke="#6b1d2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  }[o('mouth')];

  const eyeAt = (cx) => `<g class="eye"><path d="M${cx - 8.5} 62 Q${cx} 53 ${cx + 8.5} 61 Q${cx} 68 ${cx - 8.5} 62Z" fill="#fff"/>
    <ellipse cx="${cx + 1}" cy="62" rx="4.4" ry="5.2" fill="${eye}"/><ellipse cx="${cx + 1}" cy="62.6" rx="2" ry="2.8" fill="#1a1210"/><circle cx="${cx - 0.5}" cy="60" r="1.4" fill="#fff"/>
    <path d="M${cx - 9.5} 61.5 Q${cx} 52 ${cx + 9.5} 60" stroke="${line}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`;

  const extras = {
    none: '', freckles: '<g fill="#c47a58" opacity=".85"><circle cx="58" cy="70" r=".9"/><circle cx="61" cy="72.2" r=".8"/><circle cx="55.5" cy="73" r=".7"/><circle cx="85" cy="70.4" r=".9"/><circle cx="88" cy="72.4" r=".8"/><circle cx="90.5" cy="69.8" r=".7"/></g>',
    glasses: `<g fill="none" stroke="${line}" stroke-width="2.2"><circle cx="60" cy="62" r="9.5"/><circle cx="86" cy="62" r="9.5"/><path d="M69.5 62 h7 M50.5 60 l-4 -2 M95.5 60 l4 -2"/></g>`,
    headphones: `<path d="M42 60 C40 26 106 26 104 60" stroke="#2b2a30" stroke-width="6" fill="none"/><rect x="36" y="56" width="12" height="20" rx="5" fill="${oc}"/><rect x="98" y="56" width="12" height="20" rx="5" fill="${oc}"/>`,
    cap: `<path d="M44 40 C46 18 100 18 102 40 Z" fill="${oc}"/><path d="M44 40 Q73 34 116 42 Q100 48 44 44Z" fill="${od}"/><circle cx="73" cy="20" r="3" fill="${od}"/>`,
    flower: `<g transform="translate(92 34)">${[0, 72, 144, 216, 288].map((r) => `<ellipse rx="3.4" ry="6" cy="-5" fill="#ff8fb1" transform="rotate(${r})"/>`).join('')}<circle r="3" fill="#ffd34d"/></g>`,
    earrings: '<circle cx="45" cy="73" r="3" fill="none" stroke="#e0b04a" stroke-width="1.6"/><circle cx="100.5" cy="73" r="3" fill="none" stroke="#e0b04a" stroke-width="1.6"/>',
    bandana: `<path d="M45 44 Q73 30 101 44 L100 50 Q73 38 46 50Z" fill="${oc}"/><path d="M100 46 l10 6 -4 8 -8 -8z" fill="${od}"/>`,
  }[extra];
  const overHair = ['glasses', 'headphones', 'cap', 'flower', 'bandana'].includes(extra);

  return `<svg class="avatar" width="${size}" height="${size}" viewBox="0 0 140 140" role="img" aria-label="Your character">
    <defs><linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hl}"/><stop offset=".6" stop-color="${hc}"/><stop offset="1" stop-color="${hd}"/></linearGradient>
      <clipPath id="${id}c"><circle cx="70" cy="70" r="70"/></clipPath></defs>
    <g clip-path="url(#${id}c)">
    ${bg ? `<rect width="140" height="140" fill="${o('bg')}"/>` : ''}
    ${back}
    <rect x="64" y="84" width="17" height="22" rx="6" fill="${skinD}"/>
    ${body}
    <ellipse cx="45" cy="64" rx="5" ry="7" fill="${skin}"/><ellipse cx="100" cy="64" rx="5" ry="7" fill="${skin}"/>
    <path d="M47 52 C47 80 58 92 73 92 C88 92 99 80 99 52 C99 32 47 32 47 52Z" fill="${skin}"/>
    <ellipse cx="55" cy="72" rx="6" ry="3.4" fill="#f08a7c" opacity=".35"/><ellipse cx="91" cy="72" rx="6" ry="3.4" fill="#f08a7c" opacity=".35"/>
    <path d="M72 69.5 q2.4 2.2 0 3.6" stroke="${skinD}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    ${eyeAt(60)}${eyeAt(86)}${mouth}
    ${overHair ? '' : extras}
    ${front}
    <path d="M51 48 Q58 44 66 46.5 M80 46 Q88 43.5 95 47.5" stroke="${hd}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${overHair ? extras : ''}
    </g>
  </svg>`;
}
