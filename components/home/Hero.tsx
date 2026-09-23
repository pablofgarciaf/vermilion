'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { HeroActions } from './hero/HeroActions';

const SPLASH_TEXTS: Record<string, {
  headline: string;
  subheadline: string;
  worlds: [string, string, string, string];
}> = {
  es: {
    headline: 'Los Mejores Tours Privados y a Medida de Ecuador & Galápagos',
    subheadline: 'Guías Nativos Certificados • Expediciones Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico'],
  },
  en: {
    headline: 'The Best Private & Tailor-Made Tours in Ecuador & Galapagos',
    subheadline: 'Certified Native Guides • Exclusive Expeditions',
    worlds: ['Galapagos', 'Andes', 'Amazon', 'Pacific'],
  },
  fr: {
    headline: 'Les Meilleurs Circuits Privés & Sur Mesure en Équateur et Galapagos',
    subheadline: 'Guides Locaux Certifiés • Expéditions Exclusives',
    worlds: ['Galapagos', 'Andes', 'Amazonie', 'Pacifique'],
  },
  de: {
    headline: 'Die besten privaten & maßgeschneiderten Touren in Ecuador & Galapagos',
    subheadline: 'Zertifizierte einheimische Guides • Exklusive Expeditionen',
    worlds: ['Galapagos', 'Anden', 'Amazonas', 'Pazifik'],
  },
  it: {
    headline: 'I Migliori Tour Privati e su Misura in Ecuador e Galapagos',
    subheadline: 'Guide Locali Certificate • Spedizioni Esclusive',
    worlds: ['Galapagos', 'Ande', 'Amazzonia', 'Pacifico'],
  },
  pt: {
    headline: 'Os Melhores Passeios Privados e Sob Medida no Equador e Galápagos',
    subheadline: 'Guias Nativos Certificados • Expedições Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico'],
  },
  ja: {
    headline: 'エクアドル＆ガラパゴス最高のプライベート＆オーダーメイドツアー',
    subheadline: '認定ネイティブガイド • 特別なプライベート探検',
    worlds: ['ガラパゴス', 'アンデス', 'アマゾン', '太平洋'],
  },
  zh: {
    headline: '厄瓜多尔与加拉帕戈斯顶级私人定制旅行',
    subheadline: '专业持证本地向导 • 专属尊贵探险',
    worlds: ['加拉帕戈斯', '安第斯', '亚马逊', '太平洋'],
  },
};

const LETTERS: { text: string; color: string }[][] = [
  [{ text: 'A', color: '#D4AF37' }, { text: 'L', color: '#D4AF37' }, { text: 'L', color: '#D4AF37' }],
  [{ text: 'Y', color: '#D4AF37' }, { text: 'O', color: '#D4AF37' }, { text: 'U', color: '#D4AF37' }],
  [{ text: 'N', color: '#D4AF37' }, { text: 'E', color: '#D4AF37' }, { text: 'E', color: '#D4AF37' }, { text: 'D', color: '#D4AF37' }],
  [{ text: 'I', color: '#D4AF37' }, { text: 'S', color: '#D4AF37' }],
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
        quality={100}
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/55 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:items-start md:text-left md:pl-[30px] lg:pl-[60px] pb-24 sm:pb-28 md:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* No badges on home hero - clean look */}
        <div className="mb-6 h-0" />

        {/* "ALL YOU NEED IS" Golden Oswald Decorative Brand Art */}
        <div aria-hidden="true" className="flex flex-col items-center justify-center md:items-start mb-3 select-none pointer-events-none">
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
            quality={100}
            className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
            priority
          />
        </div>

        {/* Headline & Subheadline - Sand/Beige color for subheadline */}
        <div className="mb-3 space-y-0.5 text-center md:text-left max-w-lg">
          <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white tracking-wide drop-shadow-md">
            {welcome.headline}
          </p>
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase flex items-center justify-center md:justify-start gap-2 drop-shadow" style={{ color: '#C9A961' }}>
            <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#C9A961' }} />
            <span>{welcome.subheadline}</span>
          </p>
        </div>

        {/* 4 Worlds Pills - Sand/Beige color */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 font-medium tracking-[0.18em] uppercase text-[10px] sm:text-xs drop-shadow-md pt-2 border-t border-white/15 max-w-lg" style={{ color: '#C9A961' }}>
          {welcome.worlds.map((w, i) => (
            <React.Fragment key={w}>
              {i > 0 && <span className="w-1 h-1 rounded-full bg-yellow-600" />}
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{w}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <HeroActions exploreLabel={exploreLabel} planLabel={planLabel} />
    </div>
  );
}
