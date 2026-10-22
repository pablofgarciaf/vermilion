'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { openPlanTrip } from '@/data/planTrip';
import { useChatPanelOpen } from '@/hooks/useChatPanelOpen';

/**
 * Botón fijo "Planifica tu viaje" en móvil, abajo en el centro: el asistente de IA
 * queda a la izquierda y WhatsApp a la derecha. En escritorio ya está en la cabecera.
 * No se muestra donde ya hay una barra de reserva propia (ficha de tour) ni en
 * reserva, pago o áreas privadas.
 */
const HIDDEN = /\/(tours\/[^/]+|booking|checkout|admin|cpanel|affiliates|operator|auth)(\/|$)/;

export function MobilePlanTripButton() {
  const t = useTranslations('planTrip');
  const pathname = usePathname() || '';
  const chatOpen = useChatPanelOpen();
  if (HIDDEN.test(pathname) || chatOpen) return null;

  return (
    <button
      type="button"
      onClick={() => openPlanTrip()}
      data-lead-placement="mobile_sticky_plan_trip"
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 inline-flex h-12 max-w-[calc(100vw-140px)] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 text-[13px] font-extrabold uppercase tracking-wide text-white shadow-xl shadow-red-900/40 ring-2 ring-white/40 active:scale-95"
    >
      <Sparkles className="w-4 h-4 shrink-0" />
      <span className="truncate">{t('cta')}</span>
    </button>
  );
}
