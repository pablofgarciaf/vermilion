'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Star, ShieldCheck, Zap } from 'lucide-react';
import { HeroActions } from './hero/HeroActions';

const SPLASH_TEXTS: Record<string, {
  rating: string;
  expressBadge: string;
  headline: string;
  subheadline: string;
  worlds: [string, string, string, string];
}> = {
  es: {
    rating: '5.0 Excelencia en TripAdvisor',
    expressBadge: 'Viajes Relámpago • Salidas en 24h',
    headline: 'Los Mejores Tours Privados y a Medida de Ecuador & Galápagos',
    subheadline: 'Guías Nativos Certificados • Expediciones Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico'],
  },
  en: {
    rating: '5.0 Rating Excellence on TripAdvisor',
    expressBadge: 'Express Expeditions • 24h Departures',
    headline: 'The Best Private & Tailor-Made Tours in Ecuador & Galapagos',
    subheadline: 'Certified Native Guides • Exclusive Expeditions',
    worlds: ['Galapagos', 'Andes', 'Amazon', 'Pacific'],
  },
  fr: {
    rating: '5.0 Excellence sur TripAdvisor',
    expressBadge: 'Voyages Express • Départs en 24h',
    headline: 'Les Meilleurs Circuits Privés & Sur Mesure en Équateur et Galapagos',
    subheadline: 'Guides Locaux Certifiés • Expéditions Exclusives',
    worlds: ['Galapagos', 'Andes', 'Amazonie', 'Pacifique'],
  },
  de: {
    rating: '5.0 Spitzenbewertung auf TripAdvisor',
    expressBadge: 'Express-Reisen • Abreise in 24h',
    headline: 'Die besten privaten & maßgeschneiderten Touren in Ecuador & Galapagos',
    subheadline: 'Zertifizierte einheimische Guides • Exklusive Expeditionen',
    worlds: ['Galapagos', 'Anden', 'Amazonas', 'Pazifik'],
  },
  it: {
    rating: '5.0 Eccellenza su TripAdvisor',
    expressBadge: 'Viaggi Express • Partenze in 24h',
    headline: 'I Migliori Tour Privati e su Misura in Ecuador e Galapagos',
    subheadline: 'Guide Locali Certificate • Spedizioni Esclusive',
    worlds: ['Galapagos', 'Ande', 'Amazzonia', 'Pacifico'],
  },
  pt: {
    rating: '5.0 Excelência no TripAdvisor',
    expressBadge: 'Viagens Express • Partidas em 24h',
    headline: 'Os Melhores Passeios Privados e Sob Medida no Equador e Galápagos',
    subheadline: 'Guias Nativos Certificados • Expedições Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico'],
  },
  ja: {
    rating: 'TripAdvisor で5.0評価の卓越性',
    expressBadge: '即時出発対応 • 24時間以内に出発可能',
    headline: 'エクアドル＆ガラパゴス最高のプライベート＆オーダーメイドツアー',
    subheadline: '認定ネイティブガイド • 特別なプライベート探検',
    worlds: ['ガラパゴス', 'アンデス', 'アマゾン', '太平洋'],
  },
  zh: {
    rating: 'TripAdvisor与Google获5.0满分卓越好评',
    expressBadge: '特快极速出发 • 24小时内全套就绪',
    headline: '厄瓜多尔与加拉帕戈斯顶级私人定制旅行',
    subheadline: '专业持证本地向导 • 专属尊贵探险',
    worlds: ['加拉帕戈斯', '安第斯', '亚马逊', '太平洋'],
  },
};

const LETTERS: { text: string; color: string }[][] = [
  [{ text: 'A', color: '#FDB913' }, { text: 'L', color: '#F58220' }, { text: 'L', color: '#F05A28' }],
  [{ text: 'Y', color: '#EF4136' }, { text: 'O', color: '#ED1C24' }, { text: 'U', color: '#E6007E' }],
  [{ text: 'N', color: '#E91E63' }, { text: 'E', color: '#F06292' }, { text: 'E', color: '#CE93D8' }, { text: 'D', color: '#AB47BC' }],
  [{ text: 'I', color: '#42A5F5' }, { text: 'S', color: '#29B6F6' }],
];

export function Hero() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const welcome = SPLASH_TEXTS[locale] || SPLASH_TEXTS.en;

  const getLabel = (key: 'explore' | 'plan', fallbackMap: Record<string, string>) => {
    try {
      const val = t(`cta.${key}`);
      return !val || val.includes(`hero.cta.${key}`) ? fallbackMap[locale] || fallbackMap.en : val;
    } catch {
      return fallbackMap[locale] || fallbackMap.en;
    }
  };
  const exploreLabel = getLabel('explore', {
    es: 'Explorar Rutas', en: 'Explore Routes', fr: 'Explorer les itinéraires', de: 'Routen erkunden',
    it: 'Esplora i percorsi', pt: 'Explorar rotas', ja: 'ルートを探す', zh: '探索路线',
  });
  const planLabel = getLabel('plan', {
    es: 'Planifica Tu Viaje', en: 'Plan Your Trip', fr: 'Planifiez Votre Voyage', de: 'Planen Sie Ihre Reise',
    it: 'Pianifica Il Tuo Viaggio', pt: 'Planeje Sua Viagem', ja: '旅行を計画する', zh: '规划您的行程',
  });

  return (
    <div className="relative w-full h-[100svh] min-h-[580px] sm:min-h-[620px] md:min-h-[650px] overflow-hidden bg-zinc-950 text-white font-sans select-none z-0">
      {/* Fixed background image — 4K high-res splash */}
      <Image
        src="/splash-4-worlds-original.webp"
        alt="Vermilion Routes — Ecuador & Galapagos"
        fill
        priority
        fetchPriority="high"
        quality={95}
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/55 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:items-start md:text-left md:pl-[30px] lg:pl-[60px] pb-24 sm:pb-28 md:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* VIP Trust & Express Departure Badges */}
        <div className="mb-2.5 flex flex-wrap items-center justify-center md:justify-start gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold shadow-2xl">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-zinc-200">|</span>
            <span className="tracking-wide">{welcome.rating}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-400/50 text-emerald-300 text-xs sm:text-sm font-semibold shadow-2xl">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="tracking-wide">{welcome.expressBadge}</span>
          </div>
        </div>

        {/* "ALL YOU NEED IS" Vibrant Oswald Decorative Brand Art */}
        <div aria-hidden="true" className="flex flex-col items-center justify-center md:items-start mb-2.5 select-none pointer-events-none">
          <span className="flex gap-2 sm:gap-3 md:gap-4 font-oswald font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] [text-shadow:0_3px_10px_rgba(0,0,0,0.9)]">
            {LETTERS.map((word, wi) => (
              <span key={wi} className="flex">
                {word.map((l, li) => (
                  <span key={li} style={{ color: l.color }}>{l.text}</span>
                ))}
              </span>
            ))}
          </span>
        </div>

        <h1 className="sr-only">{welcome.headline}</h1>

        {/* Logo Glass Card */}
        <div className="relative w-[230px] h-[78px] sm:w-[290px] sm:h-[98px] md:w-[340px] md:h-[112px] mb-3 bg-gradient-to-r from-emerald-950/45 via-cyan-900/35 to-emerald-950/45 backdrop-blur-lg rounded-full p-2.5 sm:p-3 border border-white/35 shadow-[0_12px_40px_rgba(0,0,0,0.75)] flex items-center justify-center">
          <Image
            src="/logo_blanco.png"
            alt="Vermilion Routes"
            width={340}
            height={112}
            quality={85}
            className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
            priority
          />
        </div>

        {/* Headline & Subheadline */}
        <div className="mb-3 space-y-0.5 text-center md:text-left max-w-lg">
          <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white tracking-wide drop-shadow-md">
            {welcome.headline}
          </p>
          <p className="text-xs sm:text-sm text-emerald-300 font-medium tracking-wider uppercase flex items-center justify-center md:justify-start gap-2 drop-shadow">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{welcome.subheadline}</span>
          </p>
        </div>

        {/* 4 Worlds Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-white/90 font-medium tracking-[0.18em] uppercase text-[10px] sm:text-xs drop-shadow-md pt-2 border-t border-white/15 max-w-lg">
          {welcome.worlds.map((w, i) => (
            <React.Fragment key={w}>
              {i > 0 && <span className="w-1 h-1 rounded-full bg-emerald-400" />}
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{w}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <HeroActions exploreLabel={exploreLabel} planLabel={planLabel} />
    </div>
  );
}
