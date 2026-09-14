'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ItineraryDay } from '@/types';
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Hotel,
  Sparkles,
  Compass,
  Bus,
  Footprints,
  Mountain,
  Camera,
  Eye,
  X
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
  es: 'Explora las actividades diarias, logística de transporte, visitas guiadas y fotografías de cada destino.',
  en: 'Explore verbatim daily activities, transport logistics, naturalist-guided visits, and destination photos.',
  fr: 'Découvrez le détail des journées, transports, visites guidées et photographies de chaque étape.',
  de: 'Entdecken Sie tägliche Aktivitäten, Transportlogistik, Naturführungen und Fotos jedes Ziels.',
  it: 'Esplora le attività giornaliere, la logistica dei trasporti, le visite guidate e le foto di ogni tappa.',
  pt: 'Explore as atividades diárias, logística de transporte, visitas guiadas e fotos de cada destino.',
  ja: '毎日のアクティビティ、移動ロジスティクス、ナチュラリストガイドによるツアー、現地の写真をご案内します。',
  zh: '探索每日精彩行程安排、交通后勤、由专业自然向导带领的尊享体验及目的地实景照片。',
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
  // Days start collapsed by default as requested
  const [openDays, setOpenDays] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null);
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

  const dayLabel = DAY_PREFIX[locale] || 'Day';

  return (
    <div className="space-y-6">
      {/* Header with quick actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-1">
          <h2 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>
              {tourTitle
                ? `${ITINERARY_PREFIX[locale] || 'Itinerary:'} ${tourTitle.split(' - ')[0].split(':')[0].trim()}`
                : (DEFAULT_ITINERARY_TITLE[locale] || 'Detailed Day-by-Day Itinerary')}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            {ITINERARY_SUBTITLE[locale] || ITINERARY_SUBTITLE['en']}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs shrink-0">
          <button
            onClick={expandAll}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
          >
            {EXPAND_ALL_TEXT[locale] || EXPAND_ALL_TEXT['en']}
          </button>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <button
            onClick={collapseAll}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {COLLAPSE_ALL_TEXT[locale] || COLLAPSE_ALL_TEXT['en']}
          </button>
        </div>
      </div>

      {/* Accordion Days List */}
      <div className="space-y-4">
        {itinerary.map((item) => {
          const isOpen = openDays.includes(item.day);
          const dayTitle = getLocalizedText(item.title, locale);
          const dayDesc = getLocalizedText(item.description, locale);
          const dayMeals = item.meals ? getLocalizedText(item.meals, locale) : '';
          const dayAcc = item.accommodation ? getLocalizedText(item.accommodation, locale) : '';
          const dayTrans = item.transportation ? getLocalizedText(item.transportation, locale) : '';
          const dayAct = item.activity ? getLocalizedText(item.activity, locale) : '';
          const dayAlt = item.altitude ? getLocalizedText(item.altitude, locale) : '';
          const dayPhotos = getDayPhotos(item);

          const paragraphs = dayDesc.includes('\n')
            ? dayDesc.split(/\n\s*\n|\r\n\r\n|\n/).map((p) => p.trim()).filter(Boolean)
            : [dayDesc];

          return (
            <div
              key={item.day}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-emerald-500/50 bg-white dark:bg-zinc-900/95 shadow-xl shadow-emerald-950/5 ring-1 ring-emerald-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full p-4 sm:p-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                  {/* Day Badge */}
                  <span
                    className={`shrink-0 px-3 h-11 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                      isOpen
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-700/25 scale-105 ring-2 ring-emerald-400/40'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-emerald-50 group-hover:text-emerald-700 dark:group-hover:bg-emerald-950 dark:group-hover:text-emerald-300'
                    }`}
                  >
                    {formatDayBadge(item.day, locale)}
                  </span>

                  {/* Title & Micro Highlights */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <h3 className="font-serif font-semibold text-zinc-900 dark:text-zinc-100 text-base sm:text-lg leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {dayTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2">
                      {dayMeals && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                          <Utensils className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          {dayMeals}
                        </span>
                      )}

                      {dayPhotos.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-0.5 rounded-full">
                          <Camera className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          {dayPhotos.length} {dayPhotos.length === 1 ? 'foto' : 'fotos'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all duration-300 shrink-0 ${
                    isOpen
                      ? 'rotate-180 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-4 pb-6 sm:px-6 sm:pb-8 pt-3 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-100 dark:border-zinc-800/80 space-y-6 animate-in fade-in duration-300">
                  {/* Multi-Photo Grid for Destinations of that day */}
                  {dayPhotos.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                        <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Destinos y Paisajes del Día:</span>
                      </div>

                      <div className={`grid gap-3 ${dayPhotos.length === 1 ? 'grid-cols-1' : dayPhotos.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                        {dayPhotos.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() => setSelectedPhoto(photo)}
                            className="group/photo relative aspect-video rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
                          >
                            <Image
                              src={photo.src}
                              alt={photo.caption}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-90 transition-opacity" />
                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                              <span className="text-xs font-medium line-clamp-1 drop-shadow-sm">
                                {photo.caption}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shrink-0 ml-1">
                                <Eye className="w-3.5 h-3.5 text-white/90" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Multi-paragraph description */}
                  <div className="space-y-3 leading-relaxed">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
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
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 font-medium">
                        {item.highlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                              ✓
                            </div>
                            <span>{getLocalizedText(hl, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Comprehensive Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-medium">
                    {dayAcc && (
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                        <Hotel className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{STAY_TEXT[locale] || STAY_TEXT['en']} {dayAcc}</span>
                      </div>
                    )}

                    {dayTrans && (
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                        <Bus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{TRANSPORT_TEXT[locale] || TRANSPORT_TEXT['en']} {dayTrans}</span>
                      </div>
                    )}

                    {dayAct && (
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                        <Footprints className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{ACTIVITY_TEXT[locale] || ACTIVITY_TEXT['en']} {dayAct}</span>
                      </div>
                    )}

                    {dayAlt && (
                      <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
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

      {/* Lightbox / Full Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl space-y-3 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-white">
              <span className="font-serif text-sm sm:text-base font-medium">{selectedPhoto.caption}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

