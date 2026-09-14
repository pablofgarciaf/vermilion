'use client';

import React, { useState } from 'react';
import { ItineraryDay } from '@/types';
import {
  Calendar,
  ChevronDown,
  Utensils,
  Hotel,
  Sparkles,
  Compass,
  Bus,
  Footprints,
  Mountain
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';

interface TourItineraryProps {
  itinerary: ItineraryDay[];
  tourTitle?: string;
}

const ITINERARY_PREFIX: Record<string, string> = {
  es: 'Itinerario:',
  en: 'Itinerary:',
  fr: 'Itinéraire:',
  de: 'Reiseverlauf:',
  it: 'Itinerario:',
  pt: 'Roteiro:',
  ja: '詳細旅程:',
  zh: '详细行程:',
};

const DEFAULT_ITINERARY_TITLE: Record<string, string> = {
  es: 'Itinerario Detallado Día a Día',
  en: 'Detailed Day-by-Day Itinerary',
  fr: 'Itinéraire Détaillé Jour par Jour',
  de: 'Detaillierter Reiseverlauf Tag für Tag',
  it: 'Itinerario Dettagliato Giorno per Giorno',
  pt: 'Roteiro Detalhado Dia a Dia',
  ja: '日別詳細旅程',
  zh: '每日详细行程',
};

const ITINERARY_SUBTITLE: Record<string, string> = {
  es: 'Explora las actividades diarias, logística de transporte y visitas guiadas con naturalistas.',
  en: 'Explore verbatim daily activities, transport logistics, and naturalist-guided visits.',
  fr: 'Découvrez le détail des journées, transports et visites guidées avec naturalistes.',
  de: 'Entdecken Sie tägliche Aktivitäten, Transportlogistik und geführte Natur-Touren.',
  it: 'Esplora le attività giornaliere, la logistica dei trasporti e le visite guidate con naturalisti.',
  pt: 'Explore as atividades diárias, logística de transporte e visitas guiadas por naturalistas.',
  ja: '毎日のアクティビティ、移動ロジスティクス、ナチュラリストガイドによるツアーをご案内します。',
  zh: '探索每日精彩行程安排、交通后勤以及由专业自然向导带领的尊享体验。',
};

const EXPAND_ALL_TEXT: Record<string, string> = {
  es: 'Expandir Todo',
  en: 'Expand All',
  fr: 'Tout Développer',
  de: 'Alle Ausklappen',
  it: 'Espandi Tutto',
  pt: 'Expandir Tudo',
  ja: 'すべて展開',
  zh: '展开全部',
};

const COLLAPSE_ALL_TEXT: Record<string, string> = {
  es: 'Contraer Todo',
  en: 'Collapse All',
  fr: 'Tout Réduire',
  de: 'Alle Einklappen',
  it: 'Comprimer Tutto',
  pt: 'Recolher Tudo',
  ja: 'すべて折りたたむ',
  zh: '折叠全部',
};

const DAY_HIGHLIGHTS_TEXT: Record<string, string> = {
  es: 'Puntos Clave del Día:',
  en: 'Day Highlights:',
  fr: 'Points Forts du Jour:',
  de: 'Tages-Highlights:',
  it: 'Punti Salienti del Giorno:',
  pt: 'Destaques do Dia:',
  ja: '本日のハイライト:',
  zh: '每日行程亮点:',
};

const STAY_TEXT: Record<string, string> = {
  es: 'Alojamiento:',
  en: 'Stay:',
  fr: 'Hébergement:',
  de: 'Unterkunft:',
  it: 'Alloggio:',
  pt: 'Hospedagem:',
  ja: '宿泊:',
  zh: '住宿安排:',
};

const TRANSPORT_TEXT: Record<string, string> = {
  es: 'Transporte:',
  en: 'Transport:',
  fr: 'Transport:',
  de: 'Transport:',
  it: 'Trasporto:',
  pt: 'Transporte:',
  ja: '移動手段:',
  zh: '交通安排:',
};

const ACTIVITY_TEXT: Record<string, string> = {
  es: 'Actividad:',
  en: 'Activity:',
  fr: 'Activité:',
  de: 'Aktivität:',
  it: 'Attività:',
  pt: 'Atividade:',
  ja: 'アクティビティ:',
  zh: '活动内容:',
};

const ALTITUDE_TEXT: Record<string, string> = {
  es: 'Altitud:',
  en: 'Altitude:',
  fr: 'Altitud:',
  de: 'Höhe:',
  it: 'Altitudine:',
  pt: 'Altitude:',
  ja: '高度:',
  zh: '海拔高度:',
};

function formatDayBadge(day: number, locale: string): string {
  switch (locale) {
    case 'es': return `Día ${day}`;
    case 'fr': return `Jour ${day}`;
    case 'de': return `Tag ${day}`;
    case 'it': return `Giorno ${day}`;
    case 'pt': return `Dia ${day}`;
    case 'ja': return `${day}日目`;
    case 'zh': return `第${day}天`;
    case 'en':
    default: return `Day ${day}`;
  }
}

export function TourItinerary({ itinerary, tourTitle }: TourItineraryProps) {
  const [openDays, setOpenDays] = useState<number[]>([1]); // Day 1 open by default
  const locale = useLocale();

  const toggleDay = (day: number) => {
    if (openDays.includes(day)) {
      setOpenDays(openDays.filter((d) => d !== day));
    } else {
      setOpenDays([...openDays, day]);
    }
  };

  const expandAll = () => {
    setOpenDays(itinerary.map((item) => item.day));
  };

  const collapseAll = () => {
    setOpenDays([]);
  };

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with quick actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-1">
          <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>
              {tourTitle
                ? `${ITINERARY_PREFIX[locale] || 'Itinerary:'} ${tourTitle.split(' - ')[0].split(':')[0].trim()}`
                : (DEFAULT_ITINERARY_TITLE[locale] || 'Detailed Day-by-Day Itinerary')}
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {ITINERARY_SUBTITLE[locale] || ITINERARY_SUBTITLE['en']}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={expandAll}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer transition-colors"
          >
            {EXPAND_ALL_TEXT[locale] || EXPAND_ALL_TEXT['en']}
          </button>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <button
            onClick={collapseAll}
            className="text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-medium cursor-pointer transition-colors"
          >
            {COLLAPSE_ALL_TEXT[locale] || COLLAPSE_ALL_TEXT['en']}
          </button>
        </div>
      </div>

      {/* Accordion Days List */}
      <div className="space-y-3.5">
        {itinerary.map((item) => {
          const isOpen = openDays.includes(item.day);
          const dayTitle = getLocalizedText(item.title, locale);
          const dayDesc = getLocalizedText(item.description, locale);
          const dayMeals = item.meals ? getLocalizedText(item.meals, locale) : '';
          const dayAcc = item.accommodation ? getLocalizedText(item.accommodation, locale) : '';
          const dayTrans = item.transportation ? getLocalizedText(item.transportation, locale) : '';
          const dayAct = item.activity ? getLocalizedText(item.activity, locale) : '';
          const dayAlt = item.altitude ? getLocalizedText(item.altitude, locale) : '';

          const paragraphs = dayDesc.includes('\n')
            ? dayDesc.split(/\n\s*\n|\r\n\r\n|\n/).map(p => p.trim()).filter(Boolean)
            : [dayDesc];

          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-emerald-500/40 bg-white dark:bg-stone-900 shadow-md shadow-emerald-950/5'
                  : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 hover:bg-white dark:hover:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                  {/* Day Badge */}
                  <span
                    className={`shrink-0 px-3 h-11 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                      isOpen
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 group-hover:bg-emerald-50 group-hover:text-emerald-700 dark:group-hover:bg-emerald-950 dark:group-hover:text-emerald-300'
                    }`}
                  >
                    {formatDayBadge(item.day, locale)}
                  </span>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {dayTitle}
                    </h3>
                    {dayMeals && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
                        <Utensils className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        {dayMeals}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-stone-500 dark:text-stone-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-stone-100 dark:bg-stone-800 group-hover:bg-stone-200 dark:group-hover:bg-stone-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 text-sm text-stone-700 dark:text-stone-300 border-t border-stone-100 dark:border-stone-800 space-y-4 animate-in fade-in duration-200">
                  {/* Multi-paragraph descriptions */}
                  <div className="space-y-3 leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-stone-700 dark:text-stone-300 text-sm md:text-base">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Highlights if available */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-100/80 dark:border-emerald-900/40 space-y-2">
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider block">
                        {DAY_HIGHLIGHTS_TEXT[locale] || DAY_HIGHLIGHTS_TEXT['en']}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                        {item.highlights.map((hl, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{getLocalizedText(hl, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Comprehensive Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs font-medium">
                    {dayAcc && (
                      <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
                        <Hotel className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{STAY_TEXT[locale] || STAY_TEXT['en']} {dayAcc}</span>
                      </div>
                    )}

                    {dayTrans && (
                      <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
                        <Bus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{TRANSPORT_TEXT[locale] || TRANSPORT_TEXT['en']} {dayTrans}</span>
                      </div>
                    )}

                    {dayAct && (
                      <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
                        <Footprints className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{ACTIVITY_TEXT[locale] || ACTIVITY_TEXT['en']} {dayAct}</span>
                      </div>
                    )}

                    {dayAlt && (
                      <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200">
                        <Mountain className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{ALTITUDE_TEXT[locale] || ALTITUDE_TEXT['en']} {dayAlt}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

