'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { DownloadPDFButton } from './DownloadPDFButton';
import { Tour } from '@/types';
import Link from 'next/link';

interface TourSubNavProps {
  title: string;
  duration: string;
  tour: Tour;
  locale: string;
}

const FROM_PREFIX: Record<string, string> = {
  es: 'Desde',
  en: 'From',
  fr: 'À partir de',
  de: 'Ab',
  it: 'Da',
  pt: 'A partir de',
  ja: '料金',
  zh: '起价',
};

const ADD_TO_BOOKING_LABEL: Record<string, string> = {
  es: 'Añadir a mi expedición',
  en: 'Add to my expedition',
  fr: 'Ajouter à mon expédition',
  de: 'Zur Expedition hinzufügen',
  it: 'Aggiungi alla mia spedizione',
  pt: 'Adicionar à minha expedição',
  ja: '遠征プランに追加する',
  zh: '添加至我的定制行程',
};

const CONTACT_LABEL: Record<string, string> = {
  es: 'Contáctanos',
  en: 'Contact Specialist',
  fr: 'Contactez-nous',
  de: 'Kontaktieren',
  it: 'Contattaci',
  pt: 'Fale Conosco',
  ja: 'お問い合わせ',
  zh: '联系专属管家',
};

export function TourSubNav({ title, duration, tour, locale }: TourSubNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky bar when user scrolls past 320px (when hero title begins leaving viewport)
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const priceValue = tour.priceFromUSD || tour.price || 1000;
  const fromText = FROM_PREFIX[locale] || 'From';
  const ctaText = ADD_TO_BOOKING_LABEL[locale] || 'Add to my expedition';
  const contactText = CONTACT_LABEL[locale] || 'Contact Specialist';

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 shadow-2xl backdrop-blur-2xl bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
          {/* Tour Title & Meta Line */}
          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight line-clamp-1 leading-snug">
              {title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{duration}</span>
              </span>

              <span>&bull;</span>

              <span className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tour.rating}</span>
                {tour.reviewsCount && (
                  <span className="text-zinc-500 font-normal">
                    ({tour.reviewsCount})
                  </span>
                )}
              </span>

              <span>&bull;</span>

              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                {fromText} ${priceValue.toLocaleString('en-US')} USD
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={`https://wa.me/593994048458?text=${encodeURIComponent(
                locale === 'es'
                  ? `Hola Vermilion Routes, deseo información personalizada para reservar el tour: ${title}`
                  : `Hello Vermilion Routes, I would like customized details and book the tour: ${title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{contactText}</span>
            </a>

            <DownloadPDFButton tour={tour} variant="outline" size="md" />

            <Link
              href={`/${locale}/booking?addTour=${tour.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 border-none"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
