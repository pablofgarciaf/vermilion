import React from 'react';

/**
 * Markdown mínimo y SEGURO para los mensajes del concierge (texto que genera la IA).
 * Construye nodos de React; nunca usa dangerouslySetInnerHTML, así que un mensaje
 * con HTML o <script> se muestra como texto y no se ejecuta.
 *
 * Soporta: **negrita**, __negrita__, *cursiva*, [texto](https://enlace),
 * viñetas ("- " / "* " / "• ") y títulos ("# ", "## ", "### ").
 */

const INLINE = /(\*\*[^*\n]+\*\*|__[^_\n]+__|\[[^\]\n]+\]\(https?:\/\/[^\s)]+\)|\*[^*\s][^*\n]*\*)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(INLINE);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return <strong key={key} className="font-semibold text-amber-200">{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-300 underline underline-offset-2">
          {link[1]}
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
