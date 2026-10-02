const fs = require('fs');

const file = 'c:\\Users\\pablo\\OneDrive\\Desktop\\proyectos web\\vermilion\\components\\layout\\Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the end tag for licensed
content = content.replace(
  /<span className="text-\[10px\] text-emerald-400\/80 dark:text-zinc-500 font-mono">Reg\. No: 1793215456001 [^<]+<\/span>\s*<\/div>/g,
  '<span className="text-[10px] text-emerald-400/80 dark:text-zinc-500 font-mono">Reg. No: 1793215456001 • Ministerio de Turismo EC</span>\n            </a>'
);

// Replace the secure div
content = content.replace(
  /<div className="flex items-center gap-2 bg-emerald-900\/40 dark:bg-zinc-900\/50 border border-emerald-800\/60 dark:border-zinc-800 px-4 py-2\.5 rounded-2xl">\s*<Sparkles className="w-4 h-4 text-emerald-400 dark:text-amber-400" \/>\s*<span className="text-white font-medium">\{t\.secure\}<\/span>\s*<\/div>/g,
  '<a href="/Ruc.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl hover:bg-emerald-900/60 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">\n              <Sparkles className="w-4 h-4 text-emerald-400 dark:text-amber-400" />\n              <span className="text-white font-medium">{t.secure}</span>\n            </a>'
);

fs.writeFileSync(file, content, 'utf8');
