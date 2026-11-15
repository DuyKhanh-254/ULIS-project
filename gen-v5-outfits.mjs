import {readFileSync, writeFileSync} from 'node:fs';

const roles = ['leader', 'doer', 'qc', 'mediator', 'follower'];

// 7 bộ trang phục V5 theo tài liệu đặc tả
const v5Outfits = [
  {
    id: 'vnu',
    name: 'VNU Cơ Bản',
    shirtHex: '#1b6e42',     // Xanh lá nhận diện VNU
    logoText: 'VNU',
    logoColor: '#ffffff',
    logoStroke: '#0d4023'
  },
  {
    id: 'ulis',
    name: 'ULIS Xanh Navy',
    shirtHex: '#1a447a',     // Xanh dương đậm polo ULIS
    logoText: 'ULIS',
    logoColor: '#ffffff',
    logoStroke: '#0e294d'
  },
  {
    id: 'uet',
    name: 'UET Trắng Phối Xanh',
    shirtHex: '#e8f4fc',     // Trắng phối xanh công nghệ UET
    logoText: 'UET',
    logoColor: '#005ea2',
    logoStroke: '#ffffff'
  },
  {
    id: 'ueb',
    name: 'UEB Đỏ Đô',
    shirtHex: '#8b1e2b',     // Đỏ đô nhận diện UEB Shop
    logoText: 'UEB',
    logoColor: '#ffd700',
    logoStroke: '#4d0b13'
  },
  {
    id: 'sis',
    name: 'SIS Navy Phối Vàng',
    shirtHex: '#182b49',     // Xanh navy nhận diện SIS
    logoText: 'SIS',
    logoColor: '#f5b041',
    logoStroke: '#0d1829'
  },
  {
    id: 'christmas',
    name: 'Giáng Sinh Ấm Áp',
    shirtHex: '#c0272d',     // Đỏ lễ hội giáng sinh
    logoText: '❄ NOEL',
    logoColor: '#ffffff',
    logoStroke: '#6d0b0f'
  },
  {
    id: 'halloween',
    name: 'Halloween Bí Ngô',
    shirtHex: '#3b1c54',     // Tím huyền bí Halloween
    logoText: '🎃 BOO',
    logoColor: '#ff9234',
    logoStroke: '#1c082b'
  }
];

// SRC_HEX trong các file gốc thường là #4c90df (blue)
const SRC_HEX = '#4c90df';

for (const role of roles) {
  let base = readFileSync(`./assets/characters/${role}_outfit_blue.svg`, 'utf8');

  for (const outfit of v5Outfits) {
    let content = base.split(SRC_HEX).join(outfit.shirtHex);

    // Thay thế text logo cũ "ULIS" nếu có
    const logoRegex = /<text x="80" y="134"[^>]*>.*?<\/text>/s;
    const newLogo = `<text x="80" y="134" text-anchor="middle" font-family="'Baloo 2', Arial, sans-serif" font-weight="800" font-size="8.5" fill="${outfit.logoColor}" stroke="${outfit.logoStroke}" stroke-width="0.8" paint-order="stroke" letter-spacing="0.3">${outfit.logoText}</text>`;

    if (logoRegex.test(content)) {
      content = content.replace(logoRegex, newLogo);
    } else {
      content = content.replace('</svg>', `${newLogo}\n</svg>`);
    }

    writeFileSync(`./assets/characters/${role}_outfit_${outfit.id}.svg`, content);
  }
  console.log(`${role}: đã tạo xong 7 trang phục V5`);
}
console.log('Hoàn thành sinh bộ trang phục V5.');
