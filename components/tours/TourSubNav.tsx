'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Star, MessageCircle } from 'lucide-react';
import { DownloadPDFButton } from './DownloadPDFButton';
import { Tour } from '@/types';

interface TourSubNavProps {
  title: string;
  duration: string;
  tour: Tour;
  locale: string;
}

const SUBNAV_I18N: Record<string, { reviews: string; contactUs: string; waPrefix: string }> = {
  es: {
    reviews: 'opiniones verificadas',
    contactUs: 'Contáctanos',
    waPrefix: 'Hola Vermilion Routes, deseo información personalizada y reservar el tour:',
  },
  en: {
    reviews: 'verified reviews',
    contactUs: 'Contact Us',
    waPrefix: 'Hello Vermilion Routes, I would like custom information and book the tour:',
  },
  fr: {
    reviews: 'avis vérifiés',
    contactUs: 'Contactez-nous',
    waPrefix: 'Bonjour Vermilion Routes, je souhaite des informations personnalisées et réserver le tour :',
  },
  de: {
    reviews: 'verifizierte Bewertungen',
    contactUs: 'Kontaktieren Sie uns',
    waPrefix: 'Hallo Vermilion Routes, ich wünsche individuelle Informationen und Buchung der Tour:',
  },
  it: {
    reviews: 'recensioni verificate',
    contactUs: 'Contattaci',
    waPrefix: 'Ciao Vermilion Routes, desidero informazioni personalizzate e prenotare il tour:',
  },
  pt: {
    reviews: 'avaliações verificadas',
    contactUs: 'Contate-nos',
    waPrefix: 'Olá Vermilion Routes, desejo informações personalizadas e reservar o tour:',
  },
  ja: {
    reviews: '認証済みレビュー',
    contactUs: 'お問い合わせ',
    waPrefix: 'Vermilion Routes様、以下のツアーのカスタム相談と予約を希望します:',
  },
  zh: {
    reviews: '条真实住客点评',
    contactUs: '联系我们',
    waPrefix: '您好 Vermilion Routes，我希望了解专属定制信息并预订行程：',
  },
};

export function TourSubNav({ title, duration, tour, locale }: TourSubNavProps) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = document.getElementById('tour-subnav-portal');
    if (node) {
      setPortalNode(node);
    }

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!portalNode) return null;

  const t = SUBNAV_I18N[locale] || SUBNAV_I18N['en'];

  return createPortal(
    <div
      className={`w-full bg-[#FAF8F5]/98 dark:bg-stone-950/98 backdrop-blur-2xl border-b border-zinc-200/90 dark:border-white/10 py-2.5 transition-all duration-300 shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none h-0 py-0 border-none overflow-hidden'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <Link
              href={`/${locale}`}
              aria-label="Vermilion Routes Home"
              className="shrink-0 group flex items-center notranslate"
            >
              <div className="relative w-[120px] h-[32px] sm:w-[145px] sm:h-[36px]">
                <Image
                  src="/logo_inicio.png"
                  alt="Vermilion Routes"
                  width={145}
                  height={36}
                  className="w-auto h-full object-contain block dark:hidden"
                  priority
                />
                <Image
                  src="/logo_blanco.png"
                  alt="Vermilion Routes"
                  width={145}
                  height={36}
                  className="w-auto h-full object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>

            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 hidden md:block shrink-0" />

            <div className="space-y-0.5 min-w-0">
              <div className="font-serif text-sm sm:text-base lg:text-lg font-bold text-zinc-900 dark:text-white tracking-tight truncate max-w-xs sm:max-w-md lg:max-w-xl">
                {title}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-[#D4AF37] dark:text-[#F3E5AB]" />
                  <span>{duration}</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                  <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>{tour.rating}</span>
                  {tour.reviewsCount && (
                    <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                      ({tour.reviewsCount} {t.reviews})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <a
              href={`https://wa.me/593994048458?text=${encodeURIComponent(`${t.waPrefix} ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:from-[#E5C158] hover:to-[#B59049] text-stone-950 shadow-md shadow-amber-900/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.contactUs}</span>
            </a>
            <DownloadPDFButton tour={tour} variant="outline" size="sm" />
          </div>
        </div>
      </div>
    </div>,
    portalNode
  );
}
