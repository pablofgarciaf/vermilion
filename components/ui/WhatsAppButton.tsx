'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useChatPanelOpen } from '@/hooks/useChatPanelOpen';

const PHONE_NUMBER = '593960039156';

/** Áreas privadas donde no tiene sentido el botón de contacto. */
const INTERNAL_PATH = /\/(admin|cpanel|affiliates|operator|auth)(\/|$)/;

/**
 * Botón flotante de WhatsApp, global (montado en app/[locale]/layout.tsx).
 * Va apilado JUSTO ENCIMA del lanzador del concierge (móvil: bottom-4 right-3, 48px;
 * desde sm: bottom-6 right-6, 56px) y se oculta
 * mientras el menú o el chat del concierge están abiertos, para no solaparse.
 * El evento generate_lead del clic lo lanza WhatsAppClickTracker (data-lead-placement).
 */
export function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  const pathname = usePathname() || '';
  const conciergeOpen = useChatPanelOpen();

  if (INTERNAL_PATH.test(pathname) || conciergeOpen) return null;

  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(t('defaultMessage'))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-lead-placement="floating_button"
      className="group fixed bottom-[76px] right-3 z-50 flex h-12 w-12 items-center sm:bottom-24 sm:right-6 sm:h-14 sm:w-14 justify-center rounded-full border-2 border-white/30 bg-[#25D366] text-white shadow-2xl shadow-emerald-900/40 transition-transform duration-300 hover:scale-110 active:scale-95"
      aria-label={t('ariaLabel')}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>

      {/* Etiqueta al pasar el ratón (solo escritorio) */}
      <span className="pointer-events-none absolute right-[68px] hidden whitespace-nowrap rounded-xl border border-emerald-500/40 bg-zinc-950/95 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {t('tooltip')}
      </span>
    </a>
  );
}
