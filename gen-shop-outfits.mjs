// Sinh thêm bộ trang phục Shop: lấy file "<role>_outfit_blue.svg" làm gốc (giữ nguyên
// đầu tóc, quần, cặp sách của từng vai trò) và chỉ đổi màu áo (#4c90df, xuất hiện đúng
// 3 lần trong mỗi file gốc) sang màu mới — cùng kỹ thuật đang dùng cho 5 outfit có sẵn.
import {readFileSync, writeFileSync} from 'node:fs';

const roles = ['leader', 'doer', 'qc', 'mediator', 'follower'];
const SRC_HEX = '#4c90df';
const skins = [
  {id: 'vitamin', hex: '#ff9a52'},
  {id: 'crimson', hex: '#e8524f'},
  {id: 'teal', hex: '#2f9e8f'},
  {id: 'neon', hex: '#ff4fa3'},
  {id: 'noir', hex: '#3a3f4b'},
  {id: 'silver', hex: '#9aa7b5'},
];

for (const role of roles) {
  const base = readFileSync(`./assets/characters/${role}_outfit_blue.svg`, 'utf8');
  const count = (base.match(new RegExp(SRC_HEX, 'g')) || []).length;
  if (count !== 3) { console.error(`! ${role}: expected 3 occurrences of ${SRC_HEX}, found ${count} — skip`); continue; }
  for (const skin of skins) {
    const out = base.split(SRC_HEX).join(skin.hex);
    writeFileSync(`./assets/characters/${role}_outfit_${skin.id}.svg`, out);
  }
  console.log(`${role}: generated ${skins.length} shop outfits`);
}
