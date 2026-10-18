'use client';

import { useEffect, useState } from 'react';

/**
 * Estado compartido "¿está abierto el panel de chat del concierge?".
 *
 * ConciergeWidget lo publica con `setChatPanelOpen()`; los botones flotantes
 * (WhatsApp, píldora de Cookies) lo leen con `useChatPanelOpen()` para ocultarse
 * y no tapar el campo de texto del chat en móvil.
 */
const EVENT_NAME = 'vr:chat-panel';
const ATTR = 'vrChatOpen';

export function setChatPanelOpen(open: boolean): void {
  if (typeof window === 'undefined') return;
  if (open) document.documentElement.dataset[ATTR] = 'true';
  else delete document.documentElement.dataset[ATTR];
  window.dispatchEvent(new CustomEvent<boolean>(EVENT_NAME, { detail: open }));
}

export function useChatPanelOpen(): boolean {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(document.documentElement.dataset[ATTR] === 'true');
    const onChange = (e: Event) => setOpen(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener(EVENT_NAME, onChange);
    return () => window.removeEventListener(EVENT_NAME, onChange);
  }, []);

  return open;
}
