'use client';

import React from 'react';
import { Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TourItineraryHeaderProps {
  tourTitle?: string;
}

export function TourItineraryHeader({ tourTitle }: TourItineraryHeaderProps) {
  const t = useTranslations('tourItinerary');
  const shortName = tourTitle ? tourTitle.split(' - ')[0].split(':')[0].trim() : '';

  return (
    <div className="space-y-2 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 uppercase tracking-wider">
        <Compass className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
        <span>{t('kicker')}</span>
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
        {shortName ? t('headingWithTour', { tour: shortName }) : t('headingDefault')}
      </h2>
    </div>
  );
}
