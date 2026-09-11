/**
 * 🛠️ VERMILION ROUTES — GOOGLE PHOTOS ALBUM SYNC UTILITY
 * 
 * Extracts high-resolution photo URLs and dimensions from any public Google Photos album
 * without needing API keys or OAuth setups.
 * 
 * Usage:
 *   node scripts/syncGooglePhotosAlbum.js <albumUrl> <destinationKey>
 * 
 * Example:
 *   node scripts/syncGooglePhotosAlbum.js "https://photos.google.com/share/..." galapagos
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const albumUrl = process.argv[2];
const destinationKey = process.argv[3] || 'galapagos';

if (!albumUrl) {
  console.log('Usage: node scripts/syncGooglePhotosAlbum.js <albumUrl> [destinationKey]');
  process.exit(1);
}

console.log(`\n🔍 Fetching Google Photos album: ${albumUrl}`);
console.log(`🎯 Target Destination: ${destinationKey}`);

https.get(albumUrl, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log(`Redirecting to: ${res.headers.location}`);
    // Handle redirect
    https.get(res.headers.location, handleResponse);
    return;
  }
  handleResponse(res);
}).on('error', (err) => {
  console.error('Network error:', err.message);
});

function handleResponse(res) {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Received ${body.length} bytes of HTML.`);

    const key = "key: 'ds:1'";
    const idx = body.indexOf(key);
    if (idx === -1) {
      console.error('Could not find data chunk ds:1 in album page.');
      process.exit(1);
    }

    const end = body.indexOf(');</script>', idx);
    const raw = body.slice(idx, end);

    const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/pw\/[^"]+)",(\d+),(\d+)/g;
    let m;
    const photos = [];
    while ((m = regex.exec(raw)) !== null) {
      const baseUrl = m[1];
      const width = parseInt(m[2], 10);
      const height = parseInt(m[3], 10);
      const isPortrait = height > width;

      photos.push({
        id: `photo_${photos.length + 1}`,
        destination: destinationKey,
        baseUrl,
        width,
        height,
        isPortrait,
        aspectRatio: (width / height).toFixed(2),
        url16x9: `${baseUrl}=w1920-h1080-c`,
        url9x16: `${baseUrl}=w1080-h1920-c`,
        thumb: `${baseUrl}=w800-h600-c`,
        original: `${baseUrl}=w2400`
      });
    }

    console.log(`✅ Extracted ${photos.length} photos!`);
    const catalogPath = path.join(__dirname, '..', 'data', 'googlePhotosCatalog.json');
    
    let existing = [];
    if (fs.existsSync(catalogPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      } catch {}
    }

    // Merge or replace
    const filteredExisting = existing.filter(p => p.destination !== destinationKey);
    const combined = [...filteredExisting, ...photos];

    fs.writeFileSync(catalogPath, JSON.stringify(combined, null, 2));
    console.log(`💾 Saved ${combined.length} total photos to ${catalogPath}`);
  });
}
