'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, formatUsd } from '@/data/bookingTerms';

interface TourMobileBookingBarProps {
  locale: string;
  tourId: string;
  tourTitle: string;
  tierLabel: string;
  priceFrom: number;
  isDailyTour: boolean;
}

/** Atributo en <html> que usan otros elementos fijos (p. ej. la píldora de cookies) para subir. */
const BAR_ATTR = 'vrBottomBar';

/**
 * Barra fija inferior en móvil: precio desde, "Reservar con 30%" y WhatsApp.
 * Aparece al bajar del bloque de precios para que el CTA nunca desaparezca en itinerarios largos.
 * Deja libre la esquina derecha para la pila flotante (WhatsApp/concierge) del layout.
 */
export function TourMobileBookingBar({ locale, tourId, tourTitle, tierLabel, priceFrom, isDailyTour }: TourMobileBookingBarProps) {
  const t = useTranslations('bookingConversion');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.dataset[BAR_ATTR] = 'md';
    else delete root.dataset[BAR_ATTR];
    return () => {
      delete root.dataset[BAR_ATTR];
    };
  }, [visible]);

  const bookHref = isDailyTour ? `/${locale}/booking?addTour=${tourId}` : `/${locale}/booking?addTour=${tourId}&tier=club`;
  const waText = t('waMessage', { tour: tourTitle, tier: tierLabel, date: t('dateTbd'), adults: 2, children: 0 });
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* pr-[68px]: hueco para el botón flotante del concierge (48px + margen) */}
      <div className="flex items-center gap-2 py-2.5 pl-3 pr-[68px]">
        <div className="min-w-0 shrink-0 leading-tight">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">{t('barFrom')}</p>
          <p className="text-base font-extrabold text-zinc-900 dark:text-white whitespace-nowrap">
            ${formatUsd(priceFrom)}
            <span className="ml-0.5 text-[10px] font-semibold text-zinc-500">{t('barPerPerson')}</span>
          </p>
        </div>
        <Link
          href={bookHref}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-11 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 px-2 text-[13px] font-bold text-white shadow-md shadow-emerald-900/20 active:scale-95"
        >
          {t('ctaDepositShort')}
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          data-lead-placement="tour_mobile_bar"
          aria-label={t('whatsappAria')}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 text-[#128C7E]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
