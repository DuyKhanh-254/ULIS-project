import {readFileSync, writeFileSync} from 'node:fs';

const roles = ['leader', 'doer', 'qc', 'mediator', 'follower'];

// 10 trạng thái theo yêu cầu V5
// idle, talk, walk (đã có), happy, sad, worried, angry, confused, surprised, embarrassed

function generateExpressionSVG(baseContent, mood, role) {
  let svg = baseContent;

  // Xóa miệng và má hồng mặc định để vẽ lại theo biểu cảm
  // Mắt mặc định:
  // <circle cx="66" cy="53" r="2.6" fill="#292d39"/><circle cx="95" cy="53" r="2.6" fill="#292d39"/>
  // Miệng mặc định:
  // <path d="M73 64 q4 3 8 0" fill="none" stroke="#a45d62" stroke-width="2.4" stroke-linecap="round"/>

  const defaultEyesRegex = /<circle cx="66" cy="53"[^>]*><\/circle>|<circle cx="66" cy="53"[^>]*\/>/g;
  const defaultEyesRegex2 = /<circle cx="95" cy="53"[^>]*><\/circle>|<circle cx="95" cy="53"[^>]*\/>/g;
  const defaultMouthRegex = /<path d="M73 64 q4 3 8 0"[^>]*\/>/g;

  // Lớp vẽ biểu cảm chi tiết
  let faceElements = '';

  switch (mood) {
    case 'happy':
      // Mắt cười cong hình trăng khuyết, miệng cười tươi lộ răng, má hồng đậm, lấp lánh
      faceElements = `
      <!-- Happy Face -->
      <path d="M61 54 Q66 48 71 54" fill="none" stroke="#292d39" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M90 54 Q95 48 100 54" fill="none" stroke="#292d39" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M71 63 Q77 74 83 63 Z" fill="#e75a6c" stroke="#364357" stroke-width="1.8"/>
      <path d="M73 64 Q77 67 81 64" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Extra blush & sparkles -->
      <circle cx="51" cy="65" r="7.5" fill="#ff6b7b" opacity=".4"/>
      <circle cx="109" cy="65" r="7.5" fill="#ff6b7b" opacity=".4"/>
      <polygon points="120,40 122,45 127,47 122,49 120,54 118,49 113,47 118,45" fill="#ffd13b" stroke="#e0a300" stroke-width="0.8"/>
      `;
      break;

    case 'sad':
      // Lông mày xuôi, mắt ươn ướt cụp xuống, khóe miệng trĩu xuống, giọt nước mắt
      faceElements = `
      <!-- Sad Face -->
      <path d="M59 47 Q65 50 71 52" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M89 52 Q95 50 101 47" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="66" cy="54" r="2.5" fill="#292d39"/>
      <circle cx="95" cy="54" r="2.5" fill="#292d39"/>
      <path d="M72 67 Q77 62 82 67" fill="none" stroke="#8b4d52" stroke-width="2.4" stroke-linecap="round"/>
      <!-- Tear drop -->
      <ellipse cx="61" cy="61" rx="2.5" ry="4" fill="#6ad2ff" stroke="#2381b8" stroke-width="0.8"/>
      <circle cx="60.5" cy="59.5" r="0.8" fill="#fff"/>
      `;
      break;

    case 'worried':
      // Lông mày nhăn lo lắng, mắt mở to nhìn nghiêng, miệng lượn sóng run rẩy, giọt mồ hôi thái dương
      faceElements = `
      <!-- Worried Face -->
      <path d="M60 48 Q66 45 71 49" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M89 49 Q94 45 100 48" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="66" cy="53" r="2.6" fill="#292d39"/>
      <circle cx="95" cy="53" r="2.6" fill="#292d39"/>
      <path d="M72 66 Q75 63 77 66 Q79 69 82 65" fill="none" stroke="#8b4d52" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Sweatdrop on forehead -->
      <path d="M112 40 C112 40 117 46 117 49 A3.5 3.5 0 1 1 110 49 C110 46 112 40 112 40 Z" fill="#88e0ff" stroke="#2575a5" stroke-width="1.1"/>
      `;
      break;

    case 'angry':
      // Lông mày nhíu xếch nhọn, mắt trợn sắc, miệng nghiến răng cáu kỉnh, dấu giận dữ đỏ góc trán
      faceElements = `
      <!-- Angry Face -->
      <path d="M59 47 L72 52" stroke="#292d39" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M101 47 L88 52" stroke="#292d39" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="66" cy="54" r="2.5" fill="#292d39"/>
      <circle cx="95" cy="54" r="2.5" fill="#292d39"/>
      <path d="M71 66 L83 66" stroke="#a43d42" stroke-width="3" stroke-linecap="round"/>
      <!-- Anger vein symbol -->
      <g transform="translate(112, 34) scale(0.7)">
        <path d="M0 6 L12 6 M6 0 L6 12" stroke="#e63946" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M2 2 L10 10 M10 2 L2 10" stroke="#e63946" stroke-width="2" stroke-linecap="round"/>
      </g>
      `;
      break;

    case 'confused':
      // Một mày xếch cao, một mày trĩu xuống, miệng lệch nghiêng, dấu hỏi xoay nghiêng
      faceElements = `
      <!-- Confused Face -->
      <path d="M60 46 Q66 42 71 45" fill="none" stroke="#353b4a" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M89 51 Q95 53 101 50" fill="none" stroke="#353b4a" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="66" cy="53" r="2.6" fill="#292d39"/>
      <circle cx="95" cy="53" r="2.6" fill="#292d39"/>
      <path d="M72 66 Q77 62 82 65" fill="none" stroke="#8b4d52" stroke-width="2.4" stroke-linecap="round"/>
      <!-- Question mark float -->
      <text x="115" y="44" font-family="'Baloo 2', Arial, sans-serif" font-weight="900" font-size="16" fill="#7849b8" stroke="#ffffff" stroke-width="1" paint-order="stroke">?</text>
      `;
      break;

    case 'surprised':
      // Mắt tròn xoe to, miệng chữ O kinh ngạc, hai tay hơi co
      faceElements = `
      <!-- Surprised Face -->
      <path d="M60 45 Q66 42 72 45" fill="none" stroke="#353b4a" stroke-width="2" stroke-linecap="round"/>
      <path d="M88 45 Q94 42 100 45" fill="none" stroke="#353b4a" stroke-width="2" stroke-linecap="round"/>
      <circle cx="66" cy="53" r="3.6" fill="#292d39"/>
      <circle cx="67" cy="51.5" r="1.2" fill="#fff"/>
      <circle cx="95" cy="53" r="3.6" fill="#292d39"/>
      <circle cx="96" cy="51.5" r="1.2" fill="#fff"/>
      <ellipse cx="77" cy="65" rx="4" ry="5.5" fill="#583138" stroke="#292d39" stroke-width="1.8"/>
      <!-- Exclamation mark -->
      <text x="114" y="44" font-family="'Baloo 2', Arial, sans-serif" font-weight="900" font-size="16" fill="#f77f00" stroke="#ffffff" stroke-width="1" paint-order="stroke">!</text>
      `;
      break;

    case 'embarrassed':
      // Mắt nhìn tránh sang bên, má đỏ bừng có vạch chéo ngượng ngùng, miệng méo cười trừ
      faceElements = `
      <!-- Embarrassed Face -->
      <circle cx="64" cy="53" r="2.5" fill="#292d39"/>
      <circle cx="93" cy="53" r="2.5" fill="#292d39"/>
      <path d="M72 65 Q77 68 82 64" fill="none" stroke="#a45d62" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Heavy blush with hatching -->
      <ellipse cx="51" cy="64" rx="8" ry="5" fill="#ff4d6d" opacity=".5"/>
      <line x1="47" y1="62" x2="55" y2="66" stroke="#c9184a" stroke-width="1"/>
      <line x1="49" y1="60" x2="57" y2="64" stroke="#c9184a" stroke-width="1"/>
      <ellipse cx="109" cy="64" rx="8" ry="5" fill="#ff4d6d" opacity=".5"/>
      <line x1="105" y1="62" x2="113" y2="66" stroke="#c9184a" stroke-width="1"/>
      <line x1="107" y1="60" x2="115" y2="64" stroke="#c9184a" stroke-width="1"/>
      <!-- Small sweat drop -->
      <path d="M112 46 C112 46 115 50 115 52 A2.5 2.5 0 1 1 110 52 C110 50 112 46 112 46 Z" fill="#88e0ff" stroke="#2575a5" stroke-width="0.8"/>
      `;
      break;

    default:
      return baseContent;
  }

  // Thay thế mắt và miệng mặc định bằng cụm biểu cảm mới
  let output = svg;
  output = output.replace(defaultEyesRegex, '');
  output = output.replace(defaultEyesRegex2, '');
  output = output.replace(defaultMouthRegex, '');

  // Chèn faceElements vào ngay trước phần thân áo (trước <path d="M45 95 hoặc trước thẻ </svg>)
  if (output.includes('<path d="M45 95')) {
    output = output.replace('<path d="M45 95', `${faceElements}\n<path d="M45 95`);
  } else {
    output = output.replace('</svg>', `${faceElements}\n</svg>`);
  }

  return output;
}

const moods = ['happy', 'sad', 'worried', 'angry', 'confused', 'surprised', 'embarrassed'];

for (const role of roles) {
  const baseIdle = readFileSync(`./assets/characters/${role}_idle.svg`, 'utf8');

  for (const mood of moods) {
    const expSvg = generateExpressionSVG(baseIdle, mood, role);
    writeFileSync(`./assets/characters/${role}_${mood}.svg`, expSvg);
  }
  console.log(`${role}: đã tạo xong 7 file biểu cảm (happy, sad, worried, angry, confused, surprised, embarrassed)`);
}

// Tạo biểu cảm cho cả 3 học sinh NPC student-a, student-b, student-c
for (const npc of ['student-a', 'student-b', 'student-c']) {
  const base = readFileSync(`./assets/characters/${npc}_idle.svg`, 'utf8');
  for (const mood of moods) {
    const expSvg = generateExpressionSVG(base, mood, npc);
    writeFileSync(`./assets/characters/${npc}_${mood}.svg`, expSvg);
  }
  console.log(`${npc}: đã tạo xong 7 file biểu cảm`);
}

console.log('Toàn bộ biểu cảm 10 trạng thái đã sẵn sàng!');
