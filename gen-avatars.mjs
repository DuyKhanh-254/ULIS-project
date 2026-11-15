import {writeFileSync} from 'node:fs';

// Tạo asset cho các nhân vật Nữ (girl) và Mascot (cat, rabbit, bear, frog)
// Tất cả đều có khung 160x196, cùng phong cách viền stroke 3.1px, nét bo tròn, màu pastel ấm áp

const AVATARS = [
  {
    id: 'girl',
    name: 'Nữ Sinh (Girl)',
    headColor: '#f7c9b0',
    hairColor: '#5c3a2e',
    hairExtra: `
      <!-- Twin tails / Bow -->
      <path d="M28 36 Q18 48 24 64 Q32 72 38 60 Q34 46 36 38 Z" fill="#5c3a2e" stroke="#353b4a" stroke-width="3"/>
      <path d="M124 38 Q126 46 122 60 Q128 72 136 64 Q142 48 132 36 Z" fill="#5c3a2e" stroke="#353b4a" stroke-width="3"/>
      <!-- Pink hair clips -->
      <circle cx="38" cy="38" r="5" fill="#ff758f" stroke="#353b4a" stroke-width="1.8"/>
      <circle cx="122" cy="38" r="5" fill="#ff758f" stroke="#353b4a" stroke-width="1.8"/>
    `,
    ears: '',
    whiskers: ''
  },
  {
    id: 'cat',
    name: 'Bé Mèo (Cat)',
    headColor: '#ffdfba',
    hairColor: '#e07a5f',
    hairExtra: `
      <!-- Cat patch -->
      <path d="M60 14 Q78 12 88 18 Q68 28 60 14 Z" fill="#e07a5f" opacity=".8"/>
    `,
    ears: `
      <!-- Cat ears -->
      <polygon points="40,24 24,2 54,14" fill="#ffdfba" stroke="#353b4a" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="38,20 28,6 48,15" fill="#ffadad"/>
      <polygon points="120,24 136,2 106,14" fill="#ffdfba" stroke="#353b4a" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="122,20 132,6 112,15" fill="#ffadad"/>
    `,
    whiskers: `
      <!-- Cat whiskers -->
      <line x1="40" y1="62" x2="26" y2="59" stroke="#353b4a" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="66" x2="27" y2="68" stroke="#353b4a" stroke-width="2" stroke-linecap="round"/>
      <line x1="120" y1="62" x2="134" y2="59" stroke="#353b4a" stroke-width="2" stroke-linecap="round"/>
      <line x1="120" y1="66" x2="133" y2="68" stroke="#353b4a" stroke-width="2" stroke-linecap="round"/>
      <!-- Cat nose -->
      <polygon points="78,61 82,61 80,64" fill="#ff758f"/>
    `
  },
  {
    id: 'rabbit',
    name: 'Bé Thỏ (Rabbit)',
    headColor: '#fff5eb',
    hairColor: '#fcd5ce',
    hairExtra: ``,
    ears: `
      <!-- Bunny ears -->
      <g stroke="#353b4a" stroke-width="3" stroke-linejoin="round">
        <path d="M42 22 C36 -12 62 -14 56 16 Z" fill="#fff5eb"/>
        <path d="M44 18 C40 -4 56 -6 52 14 Z" fill="#ffb4a2" stroke="none"/>
        <path d="M104 16 C98 -14 124 -12 118 22 Z" fill="#fff5eb"/>
        <path d="M108 14 C104 -6 120 -4 116 18 Z" fill="#ffb4a2" stroke="none"/>
      </g>
    `,
    whiskers: `
      <!-- Bunny nose -->
      <polygon points="78,60 82,60 80,63" fill="#ff758f"/>
    `
  },
  {
    id: 'bear',
    name: 'Bé Gấu (Bear)',
    headColor: '#c9966b',
    hairColor: '#8a532a',
    hairExtra: ``,
    ears: `
      <!-- Bear round ears -->
      <circle cx="36" cy="22" r="14" fill="#c9966b" stroke="#353b4a" stroke-width="3"/>
      <circle cx="36" cy="22" r="7" fill="#ffd8be"/>
      <circle cx="124" cy="22" r="14" fill="#c9966b" stroke="#353b4a" stroke-width="3"/>
      <circle cx="124" cy="22" r="7" fill="#ffd8be"/>
    `,
    whiskers: `
      <!-- Bear muzzle -->
      <ellipse cx="80" cy="63" rx="14" ry="10" fill="#ffd8be" stroke="#353b4a" stroke-width="2"/>
      <ellipse cx="80" cy="59" rx="4" ry="3" fill="#4a2810"/>
    `
  },
  {
    id: 'frog',
    name: 'Bé Ếch (Frog)',
    headColor: '#95d57b',
    hairColor: '#6da653',
    hairExtra: ``,
    ears: `
      <!-- Big frog eyes on top of head -->
      <g stroke="#353b4a" stroke-width="3">
        <circle cx="48" cy="18" r="16" fill="#95d57b"/>
        <circle cx="48" cy="18" r="10" fill="#ffffff" stroke="none"/>
        <circle cx="50" cy="18" r="4.5" fill="#292d39" stroke="none"/>
        <circle cx="112" cy="18" r="16" fill="#95d57b"/>
        <circle cx="112" cy="18" r="10" fill="#ffffff" stroke="none"/>
        <circle cx="110" cy="18" r="4.5" fill="#292d39" stroke="none"/>
      </g>
    `,
    whiskers: ``
  }
];

function buildAvatarSVG(av, mood = 'idle') {
  // Biểu cảm mắt / miệng theo mood
  let eyesMouth = '';
  switch (mood) {
    case 'happy':
      eyesMouth = `
        <path d="M61 54 Q66 48 71 54" fill="none" stroke="#292d39" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M90 54 Q95 48 100 54" fill="none" stroke="#292d39" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M71 63 Q77 74 83 63 Z" fill="#e75a6c" stroke="#364357" stroke-width="1.8"/>
        <circle cx="51" cy="65" r="7.5" fill="#ff6b7b" opacity=".4"/>
        <circle cx="109" cy="65" r="7.5" fill="#ff6b7b" opacity=".4"/>
        <polygon points="120,40 122,45 127,47 122,49 120,54 118,49 113,47 118,45" fill="#ffd13b" stroke="#e0a300" stroke-width="0.8"/>
      `;
      break;
    case 'sad':
      eyesMouth = `
        <path d="M59 47 Q65 50 71 52" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M89 52 Q95 50 101 47" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="66" cy="54" r="2.5" fill="#292d39"/>
        <circle cx="95" cy="54" r="2.5" fill="#292d39"/>
        <path d="M72 67 Q77 62 82 67" fill="none" stroke="#8b4d52" stroke-width="2.4" stroke-linecap="round"/>
        <ellipse cx="61" cy="61" rx="2.5" ry="4" fill="#6ad2ff" stroke="#2381b8" stroke-width="0.8"/>
      `;
      break;
    case 'worried':
      eyesMouth = `
        <circle cx="66" cy="53" r="2.6" fill="#292d39"/>
        <circle cx="95" cy="53" r="2.6" fill="#292d39"/>
        <path d="M72 66 Q75 63 77 66 Q79 69 82 65" fill="none" stroke="#8b4d52" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M112 40 C112 40 117 46 117 49 A3.5 3.5 0 1 1 110 49 C110 46 112 40 112 40 Z" fill="#88e0ff" stroke="#2575a5" stroke-width="1.1"/>
      `;
      break;
    case 'angry':
      eyesMouth = `
        <path d="M59 47 L72 52" stroke="#292d39" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M101 47 L88 52" stroke="#292d39" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="66" cy="54" r="2.5" fill="#292d39"/>
        <circle cx="95" cy="54" r="2.5" fill="#292d39"/>
        <path d="M71 66 L83 66" stroke="#a43d42" stroke-width="3" stroke-linecap="round"/>
        <g transform="translate(112, 34) scale(0.7)">
          <path d="M0 6 L12 6 M6 0 L6 12" stroke="#e63946" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      `;
      break;
    case 'confused':
      eyesMouth = `
        <circle cx="66" cy="53" r="2.6" fill="#292d39"/>
        <circle cx="95" cy="53" r="2.6" fill="#292d39"/>
        <path d="M72 66 Q77 62 82 65" fill="none" stroke="#8b4d52" stroke-width="2.4" stroke-linecap="round"/>
        <text x="115" y="44" font-family="'Baloo 2', Arial, sans-serif" font-weight="900" font-size="16" fill="#7849b8" stroke="#ffffff" stroke-width="1" paint-order="stroke">?</text>
      `;
      break;
    case 'surprised':
      eyesMouth = `
        <circle cx="66" cy="53" r="3.6" fill="#292d39"/>
        <circle cx="95" cy="53" r="3.6" fill="#292d39"/>
        <ellipse cx="77" cy="65" rx="4" ry="5.5" fill="#583138" stroke="#292d39" stroke-width="1.8"/>
        <text x="114" y="44" font-family="'Baloo 2', Arial, sans-serif" font-weight="900" font-size="16" fill="#f77f00" stroke="#ffffff" stroke-width="1" paint-order="stroke">!</text>
      `;
      break;
    case 'embarrassed':
      eyesMouth = `
        <circle cx="64" cy="53" r="2.5" fill="#292d39"/>
        <circle cx="93" cy="53" r="2.5" fill="#292d39"/>
        <path d="M72 65 Q77 68 82 64" fill="none" stroke="#a45d62" stroke-width="2.2" stroke-linecap="round"/>
        <ellipse cx="51" cy="64" rx="8" ry="5" fill="#ff4d6d" opacity=".5"/>
        <ellipse cx="109" cy="64" rx="8" ry="5" fill="#ff4d6d" opacity=".5"/>
      `;
      break;
    case 'talk':
      eyesMouth = `
        <circle cx="66" cy="53" r="2.6" fill="#292d39"/>
        <circle cx="95" cy="53" r="2.6" fill="#292d39"/>
        <path d="M72 62 Q77 71 82 62 Z" fill="#9e3b4a" stroke="#353b4a" stroke-width="1.8"/>
      `;
      break;
    default: // idle / walk
      eyesMouth = `
        <circle cx="66" cy="53" r="2.6" fill="#292d39"/>
        <circle cx="95" cy="53" r="2.6" fill="#292d39"/>
        <path d="M73 64 q4 3 8 0" fill="none" stroke="#a45d62" stroke-width="2.4" stroke-linecap="round"/>
      `;
      break;
  }

  // Nếu là frog thì mắt ở trên đỉnh đầu nên trong mặt chỉ cần miệng
  if (av.id === 'frog') {
    if (mood === 'happy') {
      eyesMouth = `<path d="M68 62 Q77 75 86 62 Z" fill="#e75a6c" stroke="#364357" stroke-width="2"/>`;
    } else if (mood === 'sad') {
      eyesMouth = `<path d="M68 68 Q77 60 86 68" fill="none" stroke="#353b4a" stroke-width="3" stroke-linecap="round"/>`;
    } else if (mood === 'talk') {
      eyesMouth = `<path d="M68 61 Q77 73 86 61 Z" fill="#9e3b4a" stroke="#353b4a" stroke-width="2"/>`;
    } else {
      eyesMouth = `<path d="M69 65 Q77 70 85 65" fill="none" stroke="#353b4a" stroke-width="2.8" stroke-linecap="round"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 196" width="160" height="196">
<ellipse cx="79" cy="183" rx="49" ry="8" fill="#395d6e" opacity=".17"/>
${av.ears}
<g stroke="#353b4a" stroke-width="3.1" stroke-linejoin="round" stroke-linecap="round">
<!-- large chibi head block -->
<path d="M42 34 Q41 17 65 14 L112 19 Q126 21 126 41 L125 75 Q124 94 106 99 L61 98 Q39 96 38 73 Z" fill="${av.headColor}"/>
<path d="M110 22 Q126 24 126 43 L125 76 Q123 93 105 97 L106 70 Z" fill="#000000" opacity=".12" stroke="none"/>
${av.id === 'girl' ? `
<path d="M39 39 Q42 14 64 12 L96 11 Q124 10 127 35 Q124 50 113 48 L109 33 Q100 38 89 36 L84 27 Q73 40 58 38 L44 49 Z" fill="${av.hairColor}"/>
<path d="M44 38 Q40 56 43 64 L34 61 Q33 44 39 33 Z" fill="${av.hairColor}"/>
<path d="M117 42 L126 36 L126 62 L119 66 Z" fill="${av.hairColor}"/>
` : ''}
${av.hairExtra}
</g>
${eyesMouth}
<circle cx="52" cy="66" r="6" fill="#ed8b8e" opacity=".27"/>
<circle cx="108" cy="67" r="6" fill="#ed8b8e" opacity=".24"/>
${av.whiskers}
<!-- Bag -->
<path d="M45 95 Q24 95 28 113 L37 147 L46 151 Z" fill="#e77c66" stroke="#3a4052" stroke-width="3"/>
<!-- Uniform body (Polo VNU / ULIS style) -->
<g stroke="#364357" stroke-linejoin="round" stroke-width="3.4">
<path d="M58 100 L103 101 Q118 107 119 125 L118 153 L46 151 L47 123 Q48 106 58 100Z" fill="#1a447a"/>
<path d="M102 102 Q115 109 118 126 L117 150 L100 150Z" fill="#000" opacity=".12" stroke="none"/>
<path d="M68 102 L80 118 L92 102" fill="none" stroke="#fff" stroke-width="8"/>
<path d="M45 114 L34 124 L38 144 L48 146 L56 126Z" fill="#1a447a"/>
<path d="M118 113 L130 127 L124 145 L115 146 L108 127Z" fill="#1a447a"/>
<path d="M36 140 L46 141 L47 153 Q40 160 34 151 Z" fill="${av.headColor}"/>
<path d="M115 141 L125 141 L126 153 Q116 160 114 151 Z" fill="${av.headColor}"/>
<path d="M53 151 L82 152 L80 174 L56 173Z" fill="#35547e"/>
<path d="M83 152 L111 151 L109 174 L84 173Z" fill="#35547e"/>
<path d="M54 174 L80 174 L80 183 Q64 190 51 183Z" fill="#493c49"/>
<path d="M83 174 L110 174 L112 183 Q98 190 82 183Z" fill="#493c49"/>
</g>
<text x="80" y="134" text-anchor="middle" font-family="'Baloo 2', Arial, sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" stroke="#0e294d" stroke-width="0.8" paint-order="stroke" letter-spacing="0.3">ULIS</text>
</svg>`;
}

const allMoods = ['idle', 'talk', 'walk_a', 'walk_b', 'happy', 'sad', 'worried', 'angry', 'confused', 'surprised', 'embarrassed'];

for (const av of AVATARS) {
  for (const m of allMoods) {
    const content = buildAvatarSVG(av, m);
    writeFileSync(`./assets/characters/${av.id}_${m}.svg`, content);
  }
  console.log(`${av.id}: đã tạo xong ${allMoods.length} tư thế & biểu cảm`);
}
console.log('Hoàn thành sinh avatar Nữ và Mascot!');
