import { describe, it, expect } from 'vitest';
import { separateMarkdownBlocks } from '@/lib/blogMarkdown';

describe('separateMarkdownBlocks', () => {
  it('separa el título de su lista sin partir las viñetas', () => {
    const src = '### Tips:\n* **A:** uno.\n* **B:** dos.\n* **C:** tres.';
    const blocks = separateMarkdownBlocks(src).split('\n\n');
    expect(blocks).toEqual(['### Tips:', '* **A:** uno.\n* **B:** dos.\n* **C:** tres.']);
  });

  it('separa un párrafo pegado a una lista', () => {
    const src = '### Nota\nQuito es urbano.\n* To witness condors.\n* To observe birds.';
    expect(separateMarkdownBlocks(src).split('\n\n')).toEqual([
      '### Nota',
      'Quito es urbano.',
      '* To witness condors.\n* To observe birds.',
    ]);
  });

  it('no toca los títulos #### con su párrafo ni el contenido ya separado', () => {
    const src = '#### 1. Santa Cruz\n* **Rancho:** tortugas.\n\nTexto.';
    expect(separateMarkdownBlocks(src)).toBe(src);
  });
});
