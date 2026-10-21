/**
 * El blog parte el contenido por líneas en blanco ("\n\n") y decide el tipo de bloque
 * por cómo empieza. Algunos artículos traen el título (## / ###) o el párrafo pegados a su
 * lista con un solo salto de línea, y entonces la lista entera se pintaba como título.
 * Esta función añade la línea en blanco que falta entre un título y lo que le sigue, y
 * entre un párrafo y una lista (o al revés), sin separar las viñetas de una misma lista.
 */
export function separateMarkdownBlocks(text: string): string {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const kind = (l: string) =>
    l.trim() === '' ? 'blank' : /^#{2,4} /.test(l) ? 'heading' : /^\* /.test(l) ? 'list' : 'text';

  lines.forEach((line, i) => {
    if (i > 0) {
      const prev = kind(lines[i - 1]);
      const cur = kind(line);
      const needsGap =
        prev !== 'blank' &&
        cur !== 'blank' &&
        (prev === 'heading' || (prev !== cur && (prev === 'list' || cur === 'list')));
      // Los títulos #### se quedan con su párrafo: el blog ya los pinta juntos.
      if (needsGap && !/^#### /.test(lines[i - 1])) out.push('');
    }
    out.push(line);
  });
  return out.join('\n');
}
