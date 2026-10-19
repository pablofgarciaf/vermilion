import React from 'react';

/**
 * Markdown mínimo y SEGURO para los mensajes del concierge (texto que genera la IA).
 * Construye nodos de React; nunca usa dangerouslySetInnerHTML, así que un mensaje
 * con HTML o <script> se muestra como texto y no se ejecuta.
 *
 * Soporta: **negrita**, __negrita__, *cursiva*, [texto](https://enlace),
 * viñetas ("- " / "* " / "• ") y títulos ("# ", "## ", "### ").
 */

const INLINE = /(\*\*[^*\n]+\*\*|__[^_\n]+__|\[[^\]\n]+\]\((?:https?:\/\/[^\s)]+|\/(?!\/|\\)[^\s)]+)\)|\*[^*\s][^*\n]*\*)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(INLINE);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return <strong key={key} className="font-semibold text-amber-200">{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(((?:https?:\/\/[^\s)]+|\/(?!\/|\\)[^\s)]+))\)$/.exec(part);
    if (link) {
      const label = link[1];
      const href = link[2];
      const isWa = href.includes('wa.me');
      const isTour = href.startsWith('/') || href.includes('vermilionroutes.com/tours') || href.includes('/tours/');

      if (isWa) {
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-100 border border-emerald-500/40 hover:border-emerald-400 font-semibold text-xs transition-all shadow-xs active:scale-95 group"
          >
            <span>💬</span>
            <span>{label}</span>
            <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
        );
      }

      if (isTour) {
        return (
          <a
            key={key}
            href={href}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-xl bg-gradient-to-r from-amber-500/25 to-amber-600/15 hover:from-amber-500/35 hover:to-amber-600/25 text-amber-200 hover:text-amber-100 border border-amber-500/40 hover:border-amber-400 font-semibold text-xs transition-all shadow-xs active:scale-95 group"
          >
            <span className="text-amber-400">🧭</span>
            <span>{label}</span>
            <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        );
      }

      if (href.startsWith('/')) {
        return (
          <a
            key={key}
            href={href}
            className="inline-flex items-center gap-1 px-2 py-0.5 my-0.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-medium transition-all shadow-xs active:scale-95"
          >
            <span>{label}</span>
            <span className="text-zinc-400">→</span>
          </a>
        );
      }

      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-medium"
        >
          {label} ↗
        </a>
      );
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

export function ChatMarkdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((rawLine, i) => {
        const line = rawLine.trimEnd();
        if (!line.trim()) return <div key={i} className="h-1" aria-hidden="true" />;

        const heading = /^#{1,6}\s+(.*)$/.exec(line);
        if (heading) {
          return <p key={i} className="font-semibold text-amber-100">{renderInline(heading[1], `h${i}`)}</p>;
        }

        const bullet = /^\s*(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line);
        if (bullet) {
          return (
            <p key={i} className="flex gap-2 pl-1">
              <span aria-hidden="true" className="text-amber-400">•</span>
              <span>{renderInline(bullet[1], `b${i}`)}</span>
            </p>
          );
        }

        return <p key={i}>{renderInline(line, `p${i}`)}</p>;
      })}
    </div>
  );
}
