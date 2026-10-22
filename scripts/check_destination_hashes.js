const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const content = fs.readFileSync('data/destinationsData.ts', 'utf8');
const regex = /['"](\/images\/[^'"]+)['"]/g;
let match;
const imagePaths = new Set();
while ((match = regex.exec(content)) !== null) {
  imagePaths.add(match[1]);
}

console.log('Found total unique image paths referenced:', imagePaths.size);

const hashes = new Map();
const duplicates = [];

for (const relPath of imagePaths) {
  const fullPath = path.join('public', relPath);
  if (fs.existsSync(fullPath)) {
    const buf = fs.readFileSync(fullPath);
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    if (hashes.has(hash)) {
      duplicates.push({ original: hashes.get(hash), duplicate: relPath });
    } else {
      hashes.set(hash, relPath);
    }
  } else {
    console.log('Missing file:', relPath);
  }
}

console.log('Duplicates found by MD5 hash:', duplicates.length);
duplicates.forEach(d => console.log('  Duplicate:', d.duplicate, '=== Original:', d.original));
