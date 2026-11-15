// 1) Bỏ hình cà vạt (giống nhau tuyệt đối ở mọi pose/role/outfit) để áo trông giống
//    áo polo thật hơn. 2) Thêm chữ "ULIS" nhỏ ở ngực áo (giữa, dưới cổ áo) — dùng
//    fill trắng + viền xanh đậm mỏng để đọc được trên mọi màu áo (kể cả áo đen/bạc).
import {readdirSync, readFileSync, writeFileSync} from 'node:fs';

const DIR = './assets/characters';
const TIE = '<path d="M79 116 L73 135 L81 143 L89 133 L84 116" fill="#345c8f" stroke-width="2"/>';
const LOGO = '<text x="80" y="134" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="9" fill="#ffffff" stroke="#2b3a52" stroke-width="0.7" paint-order="stroke" letter-spacing="0.4">ULIS</text>';

let changed = 0, skipped = 0;
for (const file of readdirSync(DIR)) {
  if (!file.endsWith('.svg')) continue;
  const p = `${DIR}/${file}`;
  const src = readFileSync(p, 'utf8');
  if (!src.includes(TIE)) { skipped++; continue; }
  const out = src.replace(TIE, '').replace('</svg>', `${LOGO}\n</svg>`);
  writeFileSync(p, out);
  changed++;
}
console.log(`Đã sửa ${changed} file (bỏ cà vạt + thêm chữ ULIS), bỏ qua ${skipped} file không có cà vạt.`);
