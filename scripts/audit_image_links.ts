import fs from 'fs';
import path from 'path';

const SOURCE_ROOTS = ['app', 'components', 'data', 'lib', 'scripts'];
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx']);
const IMAGE_REFERENCE = /\/images\/[^\s"'>,;)}\]]+\.(?:avif|gif|jpe?g|png|svg|webp)/gi;
const EMPTY_IMAGE_REFERENCE = /(?:src|image|imageUrl|mobileImage|desktopImage)\s*[:=]\s*(?:\{\s*)?["']\s*["']/g;

function collectSourceFiles(directory: string, files: string[] = []): string[] {
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(entryPath, files);
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

const sourceFiles = SOURCE_ROOTS.flatMap((root) => collectSourceFiles(root));
const references = new Map<string, Set<string>>();
const emptyReferences: string[] = [];

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const imagePaths = content.match(IMAGE_REFERENCE) || [];

  for (const imagePath of imagePaths) {
    const normalizedPath = imagePath.replace(/\\/g, '/');
    const sourceSet = references.get(normalizedPath) || new Set<string>();
    sourceSet.add(file);
    references.set(normalizedPath, sourceSet);
  }

  content.split(/\r?\n/).forEach((line, index) => {
    EMPTY_IMAGE_REFERENCE.lastIndex = 0;
    const isIntentionalAdminPlaceholder = file.endsWith('AdminSettingsPanel.tsx') && line.includes('const newSlide');
    if (EMPTY_IMAGE_REFERENCE.test(line) && !isIntentionalAdminPlaceholder) {
      emptyReferences.push(`${file}:${index + 1}`);
    }
  });
}

const missing = [...references.entries()].filter(([imagePath]) => {
  const publicPath = path.join('public', imagePath.replace(/^\//, ''));
  return !fs.existsSync(publicPath) || fs.statSync(publicPath).size === 0;
});

console.log(`AUDIT SUMMARY: ${references.size} unique image references.`);
console.log(`VALID: ${references.size - missing.length}`);
console.log(`MISSING OR EMPTY FILES: ${missing.length}`);
console.log(`EMPTY IMAGE VALUES: ${emptyReferences.length}`);

for (const [imagePath, sourceSet] of missing) {
  console.error(`MISSING: ${imagePath}`);
  for (const source of sourceSet) console.error(`  referenced by ${source}`);
}

for (const source of emptyReferences) {
  console.error(`EMPTY VALUE: ${source}`);
}

if (missing.length > 0 || emptyReferences.length > 0) {
  process.exitCode = 1;
}
