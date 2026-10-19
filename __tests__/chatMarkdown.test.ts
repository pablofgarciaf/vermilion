import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChatMarkdown } from '@/components/ui/ChatMarkdown';

const render = (content: string) => renderToStaticMarkup(createElement(ChatMarkdown, { content }));

// La salida del bot es texto no fiable: un enlace solo puede apuntar a una
// ruta interna ("/es/tours") o a una URL http(s) explícita.
describe('ChatMarkdown: enlaces', () => {
  it('convierte en enlace una ruta interna', () => {
    expect(render('[Tours](/es/tours)')).toContain('href="/es/tours"');
  });

  it('convierte en enlace WhatsApp', () => {
    expect(render('[WhatsApp](https://wa.me/593960039156)')).toContain('href="https://wa.me/593960039156"');
  });

  it('no convierte en enlace una URL relativa al protocolo (//dominio)', () => {
    expect(render('[Paga aquí](//sitio-falso.com/pago)')).not.toContain('href=');
  });

  it('no convierte en enlace una ruta con barra invertida (/\\dominio)', () => {
    expect(render('[Paga aquí](/\\sitio-falso.com)')).not.toContain('href=');
  });

  it('no convierte en enlace un javascript:', () => {
    expect(render('[clic](javascript:alert(1))')).not.toContain('href=');
  });
});
