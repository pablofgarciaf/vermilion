'use client';

import React, { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ItineraryDay } from '@/types';
import { Utensils, Hotel, Bus, Footprints, Mountain } from 'lucide-react';
import { getLocalizedText } from '@/utils/i18nHelper';
import { TourItineraryHeader } from './itinerary/TourItineraryHeader';
import { TourItineraryDay } from './itinerary/TourItineraryDay';
import type { ItineraryChip } from './itinerary/TourItineraryChips';
import { resolveDayImage } from './itinerary/itineraryImages';
import { removeRepeatedDayPrefix, resolveDayText, splitParagraphs } from './itinerary/itineraryHelpers';
import { useTimelineProgress } from './itinerary/useItineraryMotion';

interface TourItineraryProps {
  itinerary: ItineraryDay[];
  tourTitle?: string;
  tourId?: string;
}

export function TourItinerary({ itinerary, tourTitle, tourId }: TourItineraryProps) {
  const locale = useLocale();
  const t = useTranslations('tourItinerary');
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const reachedCount = useTimelineProgress(listRef, fillRef);

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <section className="w-full space-y-6">
      <TourItineraryHeader tourTitle={tourTitle} />

      <ol ref={listRef} className="relative pt-2">
        {/* Línea de tiempo: pista y relleno que sigue la lectura (aria-hidden, decorativo) */}
        <span aria-hidden="true" className="pointer-events-none absolute top-2 left-4 w-px -translate-x-1/2 bg-emerald-200 dark:bg-emerald-900 md:left-1/2" style={{ bottom: 'var(--timeline-end, 0px)' }} />
        <span
          ref={fillRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-2 left-4 w-px -translate-x-1/2 origin-top bg-emerald-600 md:left-1/2"
          style={{ transform: 'scaleY(0)', bottom: 'var(--timeline-end, 0px)' }}
        />
        {itinerary.map((item, index) => {
          const { title, description } = resolveDayText(item, tourId, locale);
          const dayLabel = t('dayLabel', { day: item.day });
          const meals = item.meals ? getLocalizedText(item.meals, locale) : '';
          const stay = item.accommodation ? getLocalizedText(item.accommodation, locale) : '';
          const transport = item.transportation ? getLocalizedText(item.transportation, locale) : '';
          const activity = item.activity ? getLocalizedText(item.activity, locale) : '';
          const altitude = item.altitude ? getLocalizedText(item.altitude, locale) : '';

          const chips: ItineraryChip[] = [
            meals && { key: 'meals', icon: Utensils, label: t('meals'), value: meals },
            stay && { key: 'stay', icon: Hotel, label: t('stay'), value: stay },
            transport && { key: 'transport', icon: Bus, label: t('transport'), value: transport },
            activity && { key: 'activity', icon: Footprints, label: t('activity'), value: activity },
            altitude && { key: 'altitude', icon: Mountain, label: t('altitude'), value: altitude },
          ].filter(Boolean) as ItineraryChip[];

          const highlights = (item.highlights ?? [])
            .map((hl) => getLocalizedText(hl, locale))
            .filter(Boolean);

          return (
            <TourItineraryDay
              key={item.day}
              dayNumber={item.day}
              dayLabel={dayLabel}
              title={removeRepeatedDayPrefix(title, dayLabel) || title}
              description={splitParagraphs(description).join('\n\n')}
              highlightsLabel={t('highlights')}
              highlights={highlights}
              chips={chips}
              image={resolveDayImage(item, title, description) || undefined}
              imageSide={index % 2 === 0 ? 'left' : 'right'}
              revealed={index < reachedCount}
            />
          );
        })}
      </ol>
    </section>
  );
}
