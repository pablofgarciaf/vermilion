'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Bot, BookOpen, Compass, Sparkles } from 'lucide-react';
import { openPlanTrip } from '@/data/planTrip';
import { openReservations, showsMobileTabBar } from '@/data/mobileTabBar';
import { useChatPanelOpen } from '@/hooks/useChatPanelOpen';

const WHATSAPP_NUMBER = '593960039156';

const ITEM =
  'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[10px] font-semibold leading-tight text-zinc-600 transition-colors active:scale-95 dark:text-zinc-300';

/**
 * Menú inferior tipo app (solo móvil): Asistente IA a la izquierda, WhatsApp a la
 * derecha y "Planificar" destacado en el centro. Deja un espaciador del mismo alto
 * para que el pie de página no quede tapado.
 */
export function MobileTabBar() {
  const t = useTranslations('tabBar');
  const tNav = useTranslations('nav');
  const tWa = useTranslations('whatsapp');
  const locale = useLocale();
  const pathname = usePathname();
  const chatOpen = useChatPanelOpen();

  if (!showsMobileTabBar(pathname)) return null;

  const toursHref = `/${locale}/tours`;
  const onTours = pathname?.startsWith(toursHref);
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tWa('defaultMessage'))}`;

  return (
    <>
      <div aria-hidden="true" className="h-[72px] md:hidden" />
      <nav
        aria-label={t('ariaLabel')}
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-300 dark:border-white/10 dark:bg-zinc-950/95 ${chatOpen ? 'translate-y-[calc(100%+32px)] pointer-events-none' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex h-16 max-w-md items-stretch px-1">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-concierge-chat'))}
            className={ITEM}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-emerald-600 text-white">
              <Bot className="h-4 w-4" />
            </span>
            <span className="max-w-full truncate">{t('ai')}</span>
          </button>

          <Link href={toursHref} className={`${ITEM} ${onTours ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>
            <Compass className="h-6 w-6" />
            <span className="max-w-full truncate">{tNav('tours')}</span>
          </Link>

          {/* Acción principal: sobresale de la barra, como en las apps */}
          <div className="flex min-w-0 flex-1 justify-center">
            <button
              type="button"
              onClick={() => openPlanTrip()}
              data-lead-placement="mobile_tab_plan_trip"
              className="-mt-5 flex flex-col items-center gap-0.5 text-[10px] font-extrabold leading-tight text-red-600 active:scale-95 dark:text-red-400"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-xl shadow-red-900/40 ring-4 ring-white dark:ring-zinc-950">
                <Sparkles className="h-6 w-6" />
              </span>
              <span className="max-w-[80px] truncate">{t('plan')}</span>
            </button>
          </div>

          <button type="button" onClick={openReservations} className={ITEM}>
            <BookOpen className="h-6 w-6" />
            <span className="max-w-full truncate">{t('reservations')}</span>
          </button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-lead-placement="mobile_tab_whatsapp"
            aria-label={tWa('ariaLabel')}
            className={ITEM}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
            <span className="max-w-full truncate">{t('whatsapp')}</span>
          </a>
        </div>
      </nav>
    </>
  );
}
