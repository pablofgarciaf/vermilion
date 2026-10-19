'use client';

import { useEffect } from 'react';
import { trackGenerateLead } from '@/lib/analytics/trackLead';

const WHATSAPP_LINK = 'a[href*="wa.me/"], a[href*="api.whatsapp.com/"], a[href^="whatsapp:"]';

/**
 * Un solo listener delegado que convierte CUALQUIER clic en un enlace de WhatsApp
 * (botón flotante, fichas de tour, blog, contacto...) en un evento `generate_lead`.
 * Así no hay que tocar cada enlace `wa.me` del sitio. El origen se toma de
 * `data-lead-placement` si el enlace lo tiene, o de la primera parte de la ruta.
 * Los `window.open(wa.me)` no pasan por aquí: esos llaman a trackGenerateLead directamente.
 */
export function WhatsAppClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.(WHATSAPP_LINK) as HTMLAnchorElement | null;
      if (!link) return;

      // /es/tours/galapagos-cruise -> "tours"; /es -> "home"
      const section = window.location.pathname.split('/').filter(Boolean)[1] || 'home';
      trackGenerateLead({
        method: 'whatsapp',
        placement: link.dataset.leadPlacement || section,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
