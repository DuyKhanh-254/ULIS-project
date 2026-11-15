import {readFileSync, writeFileSync} from 'node:fs';

const avatars = ['girl', 'cat', 'rabbit', 'bear', 'frog'];
const v5Outfits = [
  { id: 'vnu', shirtHex: '#1b6e42', logoText: 'VNU', logoColor: '#ffffff', logoStroke: '#0d4023' },
  { id: 'ulis', shirtHex: '#1a447a', logoText: 'ULIS', logoColor: '#ffffff', logoStroke: '#0e294d' },
  { id: 'uet', shirtHex: '#e8f4fc', logoText: 'UET', logoColor: '#005ea2', logoStroke: '#ffffff' },
  { id: 'ueb', shirtHex: '#8b1e2b', logoText: 'UEB', logoColor: '#ffd700', logoStroke: '#4d0b13' },
  { id: 'sis', shirtHex: '#182b49', logoText: 'SIS', logoColor: '#f5b041', logoStroke: '#0d1829' },
  { id: 'christmas', shirtHex: '#c0272d', logoText: '❄ NOEL', logoColor: '#ffffff', logoStroke: '#6d0b0f' },
  { id: 'halloween', shirtHex: '#3b1c54', logoText: '🎃 BOO', logoColor: '#ff9234', logoStroke: '#1c082b' }
];

const SRC_HEX = '#1a447a';

for (const av of avatars) {
  const base = readFileSync(`./assets/characters/${av}_idle.svg`, 'utf8');
  for (const ofit of v5Outfits) {
    let content = base.split(SRC_HEX).join(ofit.shirtHex);
    const logoRegex = /<text x="80" y="134"[^>]*>.*?<\/text>/s;
    const newLogo = `<text x="80" y="134" text-anchor="middle" font-family="'Baloo 2', Arial, sans-serif" font-weight="800" font-size="8.5" fill="${ofit.logoColor}" stroke="${ofit.logoStroke}" stroke-width="0.8" paint-order="stroke" letter-spacing="0.3">${ofit.logoText}</text>`;
    if (logoRegex.test(content)) {
      content = content.replace(logoRegex, newLogo);
    } else {
      content = content.replace('</svg>', `${newLogo}\n</svg>`);
    }
    writeFileSync(`./assets/characters/${av}_outfit_${ofit.id}.svg`, content);
  }
}
console.log('Đã tạo xong trang phục cho tất cả Avatar!');
