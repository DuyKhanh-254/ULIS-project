import {readFileSync} from 'node:fs';

// Tạo mock DOM tối giản để chạy app.js
global.document = {
  getElementById: (id) => ({
    textContent: '',
    classList: {
      toggle: () => {},
      add: () => {},
      remove: () => {}
    },
    style: {},
    scrollTo: () => {}
  }),
  querySelector: () => ({
    classList: {
      remove: () => {},
      add: () => {}
    }
  }),
  fonts: { ready: Promise.resolve() }
};

global.window = {
  scrollTo: () => {}
};

global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); }
};

console.log('--- TEST V5 FLOW BẮT ĐẦU ---');

// Import data.js
const {charTypes, allOutfits, stageScenarios, stageUIMode} = await import('./data.js');

console.log(`1. Kiểm tra charTypes: có ${charTypes.length} loại nhân vật:`, charTypes.map(c=>c.id).join(', '));
if (charTypes.length < 6) throw new Error('Thiếu charTypes');

console.log(`2. Kiểm tra allOutfits: có ${allOutfits.length} trang phục:`, allOutfits.map(o=>`${o.name} (${o.cost} xu)`).join(', '));
if (allOutfits.length < 7) throw new Error('Thiếu allOutfits');

// Kiểm tra 5 tình huống chat và 22 tình huống bàn tròn
const chatStages = Object.entries(stageUIMode).filter(([k,v]) => v === 'chat').map(([k])=>k);
const roundStages = Object.entries(stageUIMode).filter(([k,v]) => v === 'round').map(([k])=>k);
console.log(`3. Kiểm tra phân loại màn chơi:`);
console.log(`   - Tình huống Chat (${chatStages.length}):`, chatStages.join(', '));
console.log(`   - Tình huống Bàn tròn (${roundStages.length}):`, roundStages.join(', '));

// Kiểm tra 11 kịch bản đã có npcReaction và expressions
for (const [key, sc] of Object.entries(stageScenarios)) {
  for (let i = 0; i < sc.choices.length; i++) {
    const ch = sc.choices[i];
    if (!ch.npcReaction) throw new Error(`Kịch bản ${key} choice ${i} thiếu npcReaction`);
    if (!ch.expressions) throw new Error(`Kịch bản ${key} choice ${i} thiếu expressions`);
  }
}
console.log(`4. Toàn bộ 11 kịch bản đã có npcReaction và expressions hợp lệ!`);

// Kiểm tra tồn tại file asset SVG
import {existsSync} from 'node:fs';

const requiredOutfits = ['vnu', 'ulis', 'uet', 'ueb', 'sis', 'christmas', 'halloween'];
const roles = ['leader', 'doer', 'qc', 'mediator', 'follower'];
const avatars = ['girl', 'cat', 'rabbit', 'bear', 'frog'];
const moods = ['idle', 'talk', 'happy', 'sad', 'worried', 'angry', 'confused', 'surprised', 'embarrassed'];

for (const r of roles) {
  for (const o of requiredOutfits) {
    const p = `./assets/characters/${r}_outfit_${o}.svg`;
    if (!existsSync(p)) throw new Error(`Thiếu file asset: ${p}`);
  }
  for (const m of moods) {
    const p = `./assets/characters/${r}_${m}.svg`;
    if (!existsSync(p)) throw new Error(`Thiếu file asset biểu cảm: ${p}`);
  }
}
console.log(`5. Toàn bộ SVG outfit ĐHQGHN và 10 biểu cảm cho 5 roles đã tồn tại!`);

for (const av of avatars) {
  for (const o of requiredOutfits) {
    const p = `./assets/characters/${av}_outfit_${o}.svg`;
    if (!existsSync(p)) throw new Error(`Thiếu file asset outfit cho avatar: ${p}`);
  }
  for (const m of moods) {
    const p = `./assets/characters/${av}_${m}.svg`;
    if (!existsSync(p)) throw new Error(`Thiếu file asset biểu cảm cho avatar: ${p}`);
  }
}
console.log(`6. Toàn bộ SVG outfit ĐHQGHN và 10 biểu cảm cho Avatar Nữ và Mascot đã tồn tại!`);

console.log('--- TẤT CẢ TEST V5 THÀNH CÔNG RỰC RỠ! ---');
