import fs from 'fs';
import path from 'path';

const filesToInspect = [
  'gal1.webp', 'gal2.webp', 'gal3.webp', 'gal4.webp', 'gal5.webp', 'gal6.webp',
  'galatoursopt-01.webp', 'galatoursopt-02.webp', 'galatoursopt-03.webp', 'galatoursopt-04.webp',
  'galatoursopt-05.webp', 'galatoursopt-06.webp', 'galatoursopt-07.webp', 'galatoursopt-08.webp',
  '16as-03.webp', '16as-04.webp', '16as-05.webp', '16as-06.webp',
  '16as-07-1.webp', '16as-08.webp', '16as-09-1.webp', '16as-10-1.webp', '16as-11-1.webp',
  'nrew-01.webp', 'nrew-02.webp', 'nrew-03.webp', 'nrew-04.webp', 'nrew-05.webp', 'nrew-06.webp',
  'nrew-07.webp', 'nrew-08.webp', 'nrew-09.webp', 'nrew-10.webp', 'nrew-11.webp', 'nrew-12.webp',
  'ecu1.webp', 'ecu2.webp', 'ecu3.webp', 'ecu5.webp', 'ecu6.webp',
  'bloggala1.webp', 'blogquito1.webp', 'blogvolcan1.webp', 'blogvermi1.webp',
  'SAN-CRISTOBAL-GALAPAGOS-2.webp', 'plaza-san-francisco-casco-antiguo-quito-ecuador-1-2.webp',
  'cuyabeno.webp', 'ponchos.webp', 'nv.webp', 'lgk.webp', 'quito1.webp', 'quito2.webp'
];

console.log('=== FINDING EXACT TITLES & CAPTIONS FOR EACH IMAGE IN WP ===');

const wpDir = 'C:\\Users\\pablo\\Desktop\\clon-vermilion\\vermilionroutes.com';
const allHtml = fs.readdirSync(wpDir).filter(f => f.endsWith('.html'));

filesToInspect.forEach(imgName => {
  let foundCaptions = new Set();
  allHtml.forEach(htmlFile => {
    const content = fs.readFileSync(path.join(wpDir, htmlFile), 'utf-8');
    if (content.includes(imgName)) {
      // Find elementor widget or heading near image
      const regex = new RegExp(`([^<]*?${imgName}[^>]*?>[\\s\\S]{0,300})`, 'gi');
      let m;
      while ((m = regex.exec(content)) !== null) {
        const snippet = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (snippet.length > 5) foundCaptions.add(snippet.substring(0, 100));
      }
    }
  });
  console.log(`\n📷 ${imgName}:`);
  if (foundCaptions.size === 0) {
    console.log('   (No caption snippet found)');
  } else {
    foundCaptions.forEach(c => console.log(`   - "${c}"`));
  }
});
