'use client';

import { useEffect } from 'react';

type TrackerFn = (...args: unknown[]) => void;
type TrackerWindow = Window & { gtag?: TrackerFn; fbq?: TrackerFn };

const WHATSAPP_SELECTOR = 'a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]';

/**
 * Reports WhatsApp link clicks as `generate_lead` (GA4) and `Contact` (Meta Pixel).
 * Both calls are no-ops until the visitor accepts cookies (consent mode + ConsentManager),
 * so no data is sent without consent.
 */
export function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.(WHATSAPP_SELECTOR);
      if (!link) return;

      const w = window as TrackerWindow;
      w.gtag?.('event', 'generate_lead', {
        method: 'whatsapp',
        page_path: window.location.pathname,
      });
      w.fbq?.('track', 'Contact');
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
