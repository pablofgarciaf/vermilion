import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('public/temp_catalog');
const photos = [
  'banner-01.webp', 'banner-02.webp', 'banner-03.webp', 'banner-04.webp', 'banner-05.webp',
  'banner-06.webp', 'banner-08.webp', 'banner-09.webp', 'banner-10.webp', 'banner_aboutus-2.webp',
  'imgbanner-01.webp', 'imgbanner-02.webp', 'imgbanner-03.webp', 'imgbanner-04.webp',
  'imgbanner-05.webp', 'imgbanner-06.webp', 'imgbanner-07.webp', 'imgbanner-08.webp',
  'nrew-01.webp', 'nrew-02.webp', 'nrew-03.webp', 'nrew-04.webp', 'nrew-05.webp', 'nrew-06.webp',
  'nrew-07.webp', 'nrew-08.webp', 'nrew-09.webp', 'nrew-10.webp', 'nrew-11.webp', 'nrew-12.webp',
  'gal1.webp', 'gal2.webp', 'gal3.webp', 'gal4.webp', 'gal5.webp', 'gal6.webp', 'gal7.webp', 'gal8.webp',
  'galatoursopt-01.webp', 'galatoursopt-03.webp', 'galatoursopt-05.webp', 'galatoursopt-07.webp',
  '16as-01-2.webp', '16as-02.webp', '16as-03.webp', '16as-04.webp', '16as-05.webp', '16as-06.webp',
  '16as-07-1.webp', '16as-08.webp', '16as-09-1.webp', '16as-10-1.webp', '16as-11-1.webp',
  'bloggala1.webp', 'blogquito1.webp', 'blogvermi1.webp', 'blogvolcan1.webp',
  'plaza-san-francisco-casco-antiguo-quito-ecuador-1-2.webp', 'SAN-CRISTOBAL-GALAPAGOS-2.webp',
  'piquero-1.webp', '20170406_104637-2.webp', '20170406_104916-2.webp'
];

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Real WP Images Visual Inspector</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .card { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
    img { width: 100%; height: 200px; object-fit: cover; display: block; }
    .name { padding: 10px; font-size: 13px; font-weight: bold; color: #38bdf8; word-break: break-all; }
  </style>
</head>
<body>
  <h1>All Real Company Photos from WordPress</h1>
  <div class="grid">
`;

photos.forEach(p => {
  if (fs.existsSync(path.join(tempDir, p))) {
    html += `
      <div class="card">
        <img src="/temp_catalog/${p}" />
        <div class="name">${p}</div>
      </div>
    `;
  }
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('public/wp_inspector.html', html);
console.log('Created public/wp_inspector.html');
