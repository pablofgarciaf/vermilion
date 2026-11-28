'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useFooterVisibility } from '@/hooks/useFooterVisibility';

const INTERNAL = /\/(admin|cpanel|affiliates|operator|auth|checkout)(\/|$)/;

export function FloatingPlanButton() {
  const locale = useLocale();
  const pathname = usePathname() || '';
  const t = useTranslations('planTrip');
  const isFooterVisible = useFooterVisibility();
  if (INTERNAL.test(pathname)) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-plan-trip'))}
      className={`fixed bottom-[5.75rem] right-4 z-50 hidden h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-amber-400 text-zinc-950 shadow-2xl shadow-amber-900/30 transition-all duration-300 hover:scale-110 active:scale-95 sm:right-6 md:flex ${
        isFooterVisible
          ? 'pointer-events-none translate-y-3 opacity-0'
          : 'pointer-events-auto translate-y-0 opacity-100'
      }`}
      aria-label={t('title')}
      title={t('title')}
      data-locale={locale}
    >
      <Sparkles className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
