'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ItineraryDay } from '@/types';
import {
  Utensils,
  Hotel,
  Sparkles,
  Bus,
  Footprints,
  Mountain,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { isBotOrCrawler } from '@/utils/isBot';

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
  es: 'Diario de Expedición Día a Día',
  en: 'Day-by-Day Expedition Journal',
  fr: 'Journal d\'Expédition Jour par Jour',
  de: 'Tägliches Expeditions-Journal',
  it: 'Diario di Spedizione Giorno per Giorno',
  pt: 'Diário de Expedição Dia a Dia',
  ja: '日別遠征ジャーナル',
  zh: '每日探险日志',
};

const DAY_WORD: Record<string, string> = {
  es: 'Día',
  en: 'Day',
  fr: 'Jour',
  de: 'Tag',
  it: 'Giorno',
  pt: 'Dia',
  ja: '日目',
  zh: '第',
};

const DAY_WORD_SUFFIX: Record<string, string> = {
  zh: '天',
  ja: '日目',
  default: '',
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
  const prefix = DAY_WORD[locale] || DAY_WORD['en'];
  const suffix = DAY_WORD_SUFFIX[locale] || '';
  if (locale === 'zh' || locale === 'ja') {
    return `${prefix}${day}${suffix}`;
  }
  return `${prefix} ${day}`;
}

export function TourItinerary({ itinerary, tourTitle }: TourItineraryProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale();
  const totalDays = itinerary.length;

  // Rotación automática inteligente
  useEffect(() => {
    if (isHovered || totalDays <= 1 || isBotOrCrawler()) return;

    const interval = setInterval(() => {
      setActiveDay((prev) => (prev >= totalDays ? 1 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [totalDays, isHovered, activeDay]);

  if (!itinerary || totalDays === 0) {
    return null;
  }

  const currentItem = itinerary.find((item) => item.day === activeDay) || itinerary[0];
  const dayTitle = getLocalizedText(currentItem.title, locale);
  const dayDesc = getLocalizedText(currentItem.description, locale);
  const dayMeals = currentItem.meals ? getLocalizedText(currentItem.meals, locale) : '';
  const dayAcc = currentItem.accommodation ? getLocalizedText(currentItem.accommodation, locale) : '';
  const dayTrans = currentItem.transportation ? getLocalizedText(currentItem.transportation, locale) : '';
  const dayAct = currentItem.activity ? getLocalizedText(currentItem.activity, locale) : '';
  const dayAlt = currentItem.altitude ? getLocalizedText(currentItem.altitude, locale) : '';

  const paragraphs = dayDesc.includes('\n')
    ? dayDesc.split(/\n\s*\n|\r\n\r\n|\n/).map(p => p.trim()).filter(Boolean)
    : [dayDesc];

  const handlePrevDay = () => {
    setActiveDay((prev) => (prev <= 1 ? totalDays : prev - 1));
  };

  const handleNextDay = () => {
    setActiveDay((prev) => (prev >= totalDays ? 1 : prev + 1));
  };

  return (
    <div className="space-y-6 w-full">
      {/* Encabezado Superior con Flechas y Contador */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bitácora de Viaje</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {tourTitle
              ? `${ITINERARY_PREFIX[locale] || 'Itinerary:'} ${tourTitle.split(' - ')[0].split(':')[0].trim()}`
              : (DEFAULT_ITINERARY_TITLE[locale] || 'Day-by-Day Expedition Journal')}
          </h2>
        </div>

        {/* Controles de Flechas y Contador */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-500">
            {locale === 'es' ? `Día ${activeDay} de ${totalDays}` : `Day ${activeDay} of ${totalDays}`}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevDay}
              aria-label="Día anterior"
              className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextDay}
              aria-label="Día siguiente"
              className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Escenario Principal Integrado (Sin botones de pestañas abajo) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white dark:bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl transition-all duration-700 space-y-6 relative overflow-hidden"
      >
        {/* Título del Día Integrado Directamente Arriba (Como pediste en la imagen) */}
        <div className="space-y-2.5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50">
              {formatDayBadge(currentItem.day, locale)} • Expedición Vermilion
            </span>
            {dayMeals && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                <Utensils className="w-3 h-3 text-emerald-600" />
                {dayMeals}
              </span>
            )}
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-zinc-900 dark:text-white tracking-tight leading-snug">
            {formatDayBadge(currentItem.day, locale)} – {dayTitle}
          </h3>
        </div>

        {/* Grid Principal: Foto Izquierda + Texto Derecha (Con tipografía más compacta y elegante) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Fotografía Cinemática */}
          {(currentItem.image || (currentItem.images && currentItem.images.length > 0)) && (
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 shadow-xl group">
              <Image
                src={currentItem.image || (currentItem.images && currentItem.images[0]) || ''}
                alt={dayTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-emerald-400" />
                  <span>Bitácora Oficial • {formatDayBadge(currentItem.day, locale)}</span>
                </span>
                <span className="text-emerald-300 font-bold uppercase tracking-wider">Vermilion</span>
              </div>
            </div>
          )}

          {/* Narrativa Literaria Compacta */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-3 leading-relaxed">
              {paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className={`text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed ${pIdx === 0
                      ? 'first-letter:font-serif first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-emerald-700 dark:first-letter:text-emerald-400 first-letter:leading-none'
                      : ''
                    }`}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Puntos Clave / Highlights */}
            {currentItem.highlights && currentItem.highlights.length > 0 && (
              <div className="bg-emerald-950/5 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{DAY_HIGHLIGHTS_TEXT[locale] || DAY_HIGHLIGHTS_TEXT['en']}</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                  {currentItem.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span>{getLocalizedText(hl, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Sellos de Pasaporte / Logística de Expedición */}
        <div className="flex flex-wrap items-center gap-2.5 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-semibold">
          {dayAcc && (
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-sm">
              <Hotel className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{STAY_TEXT[locale] || STAY_TEXT['en']} {dayAcc}</span>
            </div>
          )}
          {dayTrans && (
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-sm">
              <Bus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{TRANSPORT_TEXT[locale] || TRANSPORT_TEXT['en']} {dayTrans}</span>
            </div>
          )}
          {dayAct && (
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-sm">
              <Footprints className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{ACTIVITY_TEXT[locale] || ACTIVITY_TEXT['en']} {dayAct}</span>
            </div>
          )}
          {dayAlt && (
            <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-sm">
              <Mountain className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{ALTITUDE_TEXT[locale] || ALTITUDE_TEXT['en']} {dayAlt}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}