'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Hotel, Sparkles, MessageCircle, Phone, ChevronDown } from 'lucide-react';
import { Tour } from '@/types';

interface TourSubNavProps {
  title: string;
  duration: string;
  tour: Tour;
  locale: string;
}

const SUBNAV_I18N: Record<string, { reviews: string; club: string; vip: string; book: string; contact: string; whatsapp: string; call: string }> = {
  es: { reviews: 'opiniones verificadas', club: 'Club (3★)', vip: 'VIP (4★)', book: 'Reservar', contact: 'Contacto', whatsapp: 'WhatsApp', call: 'Llamar' },
  en: { reviews: 'verified reviews', club: 'Club (3★)', vip: 'VIP (4★)', book: 'Book', contact: 'Contact', whatsapp: 'WhatsApp', call: 'Call' },
  fr: { reviews: 'avis vérifiés', club: 'Club (3★)', vip: 'VIP (4★)', book: 'Réserver', contact: 'Contact', whatsapp: 'WhatsApp', call: 'Appeler' },
  de: { reviews: 'verifizierte Bewertungen', club: 'Club (3★)', vip: 'VIP (4★)', book: 'Buchen', contact: 'Kontakt', whatsapp: 'WhatsApp', call: 'Anrufen' },
  it: { reviews: 'recensioni verificate', club: 'Club (3★)', vip: 'VIP (4★)', book: 'Prenota', contact: 'Contatto', whatsapp: 'WhatsApp', call: 'Chiama' },
  pt: { reviews: 'avaliações verificadas', club: 'Club (3★)', vip: 'VIP (4★)', book: 'Reservar', contact: 'Contato', whatsapp: 'WhatsApp', call: 'Ligar' },
  ja: { reviews: '認証済みレビュー', club: 'Club (3★)', vip: 'VIP (4★)', book: '予約する', contact: '連絡先', whatsapp: 'WhatsApp', call: '電話' },
  zh: { reviews: '条真实住客点评', club: 'Club (3★)', vip: 'VIP (4★)', book: '预订', contact: '联系我们', whatsapp: 'WhatsApp', call: '拨打电话' },
};

export function TourSubNav({ title, duration, tour, locale }: TourSubNavProps) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);

  useEffect(() => {
    const node = document.getElementById('tour-subnav-portal');
    if (node) {
      setPortalNode(node);
    }

    const handleScroll = () => {
      const shouldShowContextualNav = window.scrollY > 200;
      setIsVisible(shouldShowContextualNav);
      if (!shouldShowContextualNav) setShowContactMenu(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!portalNode) return null;

  const t = SUBNAV_I18N[locale] || SUBNAV_I18N['en'];
  const priceClub = tour.price3Star || tour.price || 1050;
  const priceVip = tour.price4Star || Math.round(priceClub * 1.15);
  const isDailyTour = tour.durationDays === 1 || (typeof tour.duration === 'object' && String(tour.duration?.en || '').includes('1 DAY'));
  const tierButtonTextSize = isDailyTour ? 'text-[10px] sm:text-xs' : 'text-[11px] sm:text-sm';
  const desktopTierButtonTextSize = isDailyTour ? 'text-[10px] lg:text-[11px]' : 'text-[10px] lg:text-xs';

  const whatsappUrl = `https://wa.me/593960039156?text=${encodeURIComponent(
    locale === 'es'
      ? `Hola, deseo información sobre el tour: ${title}`
      : `Hello, I would like information about the tour: ${title}`
  )}`;

  return createPortal(
    <div
      className={`w-full bg-[#FAF8F5]/98 dark:bg-stone-950/98 backdrop-blur-2xl border-b border-zinc-200/90 dark:border-white/10 py-2 transition-all duration-300 shadow-2xl ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none h-0 py-0 border-none overflow-hidden'
        }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden">
          <div className="flex items-start justify-between gap-3 sm:gap-5">

          {/* Lado Izquierdo: Logo imponente y Títulos a escala perfecta */}
          <div className="flex items-start gap-3 sm:gap-6 min-w-0">
            <Link
              href={`/${locale}`}
              aria-label="Vermilion Routes Home"
              className="shrink-0 group flex items-center notranslate"
            >
              <div className="relative w-[92px] h-[32px] sm:w-[160px] sm:h-[46px] lg:w-[180px] lg:h-[48px]">
                <Image quality={95}
                  src="/logo_inicio.png"
                  alt="Vermilion Routes"
                  width={210}
                  height={56}
                  className="w-auto h-full object-contain block dark:hidden"
                  priority
                />
                <Image quality={95}
                  src="/logo_blanco.png"
                  alt="Vermilion Routes"
                  width={210}
                  height={56}
                  className="w-auto h-full object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>

            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700 hidden lg:block shrink-0" />

            <div className="space-y-1 min-w-0">
              <div className="font-serif text-sm sm:text-base lg:text-lg font-bold text-zinc-900 dark:text-white tracking-tight leading-tight whitespace-normal break-words">
                {title}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-sm text-zinc-500 font-medium">
                <span>{duration}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                  <Star className="w-4 h-4 fill-[#D4AF37]" /> {tour.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Contacto siempre accesible; las tarifas van en la segunda fila. */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowContactMenu(!showContactMenu)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-white/95 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 text-[11px] sm:text-sm font-bold transition-all shadow-md shadow-emerald-900/10 hover:shadow-emerald-600/20 cursor-pointer dark:bg-zinc-900 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.contact}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showContactMenu ? 'rotate-180' : ''}`} />
            </button>

            {showContactMenu && (
              <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl py-2 z-50 animate-in fade-in duration-200">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setShowContactMenu(false)} className="flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.whatsapp} (+593 96 003 9156)</span>
                </a>
                <a href="tel:+593960039156" onClick={() => setShowContactMenu(false)} className="flex items-center gap-3 px-4 py-3 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 transition-colors border-t border-zinc-100 dark:border-zinc-800">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{t.call} (+593 96 003 9156)</span>
                </a>
              </div>
            )}
          </div>
          </div>

          <div className={`mt-2 ${isDailyTour ? '' : 'grid grid-cols-2 gap-2 sm:flex sm:justify-end sm:gap-3'}`}>
            {isDailyTour ? (
              <Link href={`/${locale}/booking?addTour=${tour.id}`} className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] px-4 py-2.5 text-xs font-bold text-zinc-950 shadow-sm shadow-amber-500/20 transition-all hover:brightness-105">
                <Sparkles className="w-4 h-4 fill-zinc-950" />
                <span>{t.book}</span>
              </Link>
            ) : <>
            <Link
              href={`/${locale}/booking?addTour=${tour.id}&tier=club`}
              className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:brightness-110 transition-all ${tierButtonTextSize} font-bold text-white shadow-sm shadow-emerald-900/30`}
            >
              <Hotel className="w-4 h-4 text-emerald-200" />
              <span>{t.club}</span>
              <span className="text-emerald-100 font-extrabold text-sm sm:text-base">${priceClub}</span>
            </Link>

            <Link
              href={`/${locale}/booking?addTour=${tour.id}&tier=vip`}
              className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-2xl border border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] hover:brightness-105 transition-all ${tierButtonTextSize} font-bold text-zinc-950 shadow-md shadow-amber-500/20`}
            >
              <Sparkles className="w-4 h-4 text-zinc-950 fill-zinc-950" />
              <span>{t.vip}</span>
              <span className="font-extrabold text-sm sm:text-base">${priceVip}</span>
            </Link>
            </>}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between gap-5">
          <div className="flex items-center gap-6 min-w-0 flex-1">
            <Link
              href={`/${locale}`}
              aria-label="Vermilion Routes Home"
              className="shrink-0 group flex items-center notranslate"
            >
              <div className="relative w-[180px] h-[48px]">
                <Image quality={95}
                  src="/logo_inicio.png"
                  alt="Vermilion Routes"
                  width={210}
                  height={56}
                  className="w-auto h-full object-contain block dark:hidden"
                  priority
                />
                <Image quality={95}
                  src="/logo_blanco.png"
                  alt="Vermilion Routes"
                  width={210}
                  height={56}
                  className="w-auto h-full object-contain hidden dark:block"
                  priority
                />
              </div>
            </Link>

            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-700 shrink-0" />

            <div className="space-y-0.5 min-w-0">
              <div className="font-serif text-base lg:text-lg font-bold text-zinc-900 dark:text-white tracking-tight leading-tight truncate">
                {title}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs lg:text-sm text-zinc-500 font-medium">
                <span>{duration}</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" /> {tour.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isDailyTour ? (
              <Link href={`/${locale}/booking?addTour=${tour.id}`} className="flex items-center justify-center gap-1.5 rounded-xl border border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] px-4 py-2.5 whitespace-nowrap text-xs font-bold text-zinc-950 shadow-sm shadow-amber-500/20 transition-all hover:brightness-105">
                <Sparkles className="w-3.5 h-3.5 fill-zinc-950" />
                <span>{t.book}</span>
              </Link>
            ) : <>
            <Link
              href={`/${locale}/booking?addTour=${tour.id}&tier=club`}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:brightness-110 transition-all whitespace-nowrap ${desktopTierButtonTextSize} font-bold text-white shadow-sm shadow-emerald-900/30`}
            >
              <Hotel className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t.club}</span>
              <span className="text-emerald-100 font-extrabold text-xs lg:text-sm">${priceClub}</span>
            </Link>

            <Link
              href={`/${locale}/booking?addTour=${tour.id}&tier=vip`}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] hover:brightness-105 transition-all whitespace-nowrap ${desktopTierButtonTextSize} font-bold text-zinc-950 shadow-md shadow-amber-500/20`}
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-950 fill-zinc-950" />
              <span>{t.vip}</span>
              <span className="font-extrabold text-xs lg:text-sm">${priceVip}</span>
            </Link>
            </>}

            {/* Botón de Contacto ubicado al lado de VIP */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowContactMenu(!showContactMenu)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-emerald-200 bg-white/95 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 text-xs lg:text-sm font-bold transition-all shadow-md shadow-emerald-900/10 hover:shadow-emerald-600/20 cursor-pointer dark:bg-zinc-900 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.contact}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showContactMenu ? 'rotate-180' : ''}`} />
              </button>

              {showContactMenu && (
                <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl py-2 z-50 animate-in fade-in duration-200">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setShowContactMenu(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 transition-colors">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>{t.whatsapp} (+593 96 003 9156)</span>
                  </a>
                  <a href="tel:+593960039156" onClick={() => setShowContactMenu(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 transition-colors border-t border-zinc-100 dark:border-zinc-800">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{t.call} (+593 96 003 9156)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalNode
  );
}
