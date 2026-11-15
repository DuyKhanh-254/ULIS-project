// Sinh demo-standalone.html và demo-offline.html TỪ index.html + styles.css + app.js + data.js
// để 2 bản "mở trực tiếp không cần server" không bao giờ bị lệch khỏi bản nguồn nữa.
// Chạy: node build-standalone.mjs
import {readFileSync, writeFileSync} from 'node:fs';

const styles = readFileSync('./styles.css', 'utf8');
const dataJs = readFileSync('./data.js', 'utf8').replace(/^export\s+const\s+/gm, 'const ');
const appJs = readFileSync('./app.js', 'utf8').replace(/^import\s*\{[^}]*\}\s*from\s*['"]\.\/data\.js['"];\s*\n/, '');

const script = `${dataJs}\n${appJs}`;

const page = (title) => `<!doctype html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,interactive-widget=resizes-content"><meta name="theme-color" content="#90d9ef"><meta name="color-scheme" content="light"><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@500;700;800&display=swap" rel="stylesheet"><style>
${styles}
</style></head><body><div id="app"></div><div id="toast" role="status" class="toast"></div><script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script><script>
${script}
</script></body></html>
`;

writeFileSync('./demo-standalone.html', page('TEAM-CRAFT Simulator | Bản chạy trực tiếp (standalone)'));
writeFileSync('./demo-offline.html', page('TEAM-CRAFT Simulator | Bản chạy ngoại tuyến (offline)'));
console.log('Đã sinh lại demo-standalone.html và demo-offline.html từ app.js/data.js/styles.css hiện tại.');
