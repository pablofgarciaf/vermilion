import React from 'react';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';
import { useTranslations } from 'next-intl';
import { FULL_DAY_FROM_PRICE, MULTI_DAY_FROM_PRICE } from '@/data/startingPrices';

const TRIPADVISOR_URL =
  'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html';

interface HeroDetailsProps {
  initialData: SlideData;
  locale: string;
}

const EXPRESS_BADGES: Record<string, string> = {
  es: 'Viajes Relámpago • Salidas en 24h',
  en: 'Express Journeys • 24h Departures',
  fr: 'Voyages Express • Départs en 24h',
  de: 'Express-Reisen • Abreise in 24h',
  it: 'Viaggi Espresso • Partenze in 24h',
  pt: 'Viagens Relâmpago • Saídas em 24h',
  ja: 'エクスプレス旅行 • 24時間以内に出発',
  zh: '闪电行程 • 24小时内极速启程',
};

const SPLASH_TEXTS: Record<string, {
  rating: string;
  headline: string;
  subheadline: string;
  worlds: [string, string, string, string];
}> = {
  es: {
    rating: '5.0 Excelencia en TripAdvisor',
    headline: 'Los Mejores Tours Privados y a Medida de Ecuador & Galápagos',
    subheadline: 'Guías Nativos Certificados • Expediciones Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  en: {
    rating: '5.0 Rating Excellence on TripAdvisor',
    headline: 'The Best Private & Tailor-Made Tours in Ecuador & Galapagos',
    subheadline: 'Certified Native Guides • Exclusive Expeditions',
    worlds: ['Galapagos', 'Andes', 'Amazon', 'Pacific']
  },
  fr: {
    rating: '5.0 Excellence sur TripAdvisor',
    headline: 'Les Meilleurs Circuits Privés & Sur Mesure en Équateur et Galapagos',
    subheadline: 'Guides Locaux Certifiés • Expéditions Exclusives',
    worlds: ['Galapagos', 'Andes', 'Amazonie', 'Pacifique']
  },
  de: {
    rating: '5.0 Spitzenbewertung auf TripAdvisor',
    headline: 'Die besten privaten & maßgeschneiderten Touren in Ecuador & Galapagos',
    subheadline: 'Zertifizierte einheimische Guides • Exklusive Expeditionen',
    worlds: ['Galapagos', 'Anden', 'Amazonas', 'Pazifik']
  },
  it: {
    rating: '5.0 Eccellenza su TripAdvisor',
    headline: 'I Migliori Tour Privati e su Misura in Ecuador e Galapagos',
    subheadline: 'Guide Locali Certificate • Spedizioni Esclusive',
    worlds: ['Galapagos', 'Ande', 'Amazzonia', 'Pacifico']
  },
  pt: {
    rating: '5.0 Excelência no TripAdvisor ',
    headline: 'Os Melhores Passeios Privados e Sob Medida no Equador e Galápagos',
    subheadline: 'Guias Nativos Certificados • Expedições Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  ja: {
    rating: 'TripAdvisor で5.0評価の卓越性',
    headline: 'エクアドル＆ガラパゴス最高のプライベート＆オーダーメイドツアー',
    subheadline: '認定ネイティブガイド • 特別なプライベート探検',
    worlds: ['ガラパゴス', 'アンデス', 'アマゾン', '太平洋']
  },
  zh: {
    rating: 'TripAdvisor与Google获5.0满分卓越好评',
    headline: '厄瓜多尔与加拉帕戈斯顶级私人定制旅行',
    subheadline: '专业持证本地向导 • 专属尊贵探险',
    worlds: ['加拉帕戈斯', '安第斯', '亚马逊', '太平洋']
  }
};

const H1_HEADLINES: Record<string, string> = {
  es: 'Tours Privados y Expediciones a Medida en Ecuador y Galápagos',
  en: 'Private & Bespoke Tours in Ecuador & Galapagos Islands',
  fr: 'Circuits Privés et Voyages sur Mesure en Équateur et Galápagos',
  de: 'Private & Maßgeschneiderte Reisen nach Ecuador & Galápagos',
  it: 'Tour Privati e Viaggi su Misura in Ecuador e Galápagos',
  pt: 'Tours Privados e Expedições sob Medida no Equador e Galápagos',
  ja: 'エクアドル＆ガラパゴス諸島 プライベートオーダーメイド自然旅行',
  zh: '厄瓜多尔与加拉帕戈斯群岛私人专属定制探险之旅',
};

export function getStandardTemplateHTML(slide: SlideData, locale: string): string {
  const place = getLocalizedText(slide.place, locale);
  const title = getLocalizedText(slide.title, locale);
  const title2 = getLocalizedText(slide.title2, locale);
  const desc = getLocalizedText(slide.description, locale);

  return `
    

    <div class="h-auto mb-1.5 pt-6 sm:pt-8 md:pt-0">
      <div class="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center text-center md:items-start md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        <div class="w-10 h-[2px] bg-[#C9A961] rounded-full mb-2 mx-auto md:mx-0"></div>
        <span class="notranslate">${place}</span>
      </div>
    </div>

    <div class="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
      <h2 class="title-1 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-[32px] lg:text-[43px] xl:text-[58px] uppercase leading-[0.95] tracking-tight whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
        <span class="notranslate hero-slider-title-text">${title}</span>
      </h2>
    </div>

    <div class="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
      <h3 class="title-2 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-[32px] lg:text-[43px] xl:text-[58px] uppercase leading-[0.95] tracking-tight whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
        <span class="notranslate hero-slider-title-gold">${title2}</span>
      </h3>
    </div>

    <div class="h-auto mt-3 md:mt-4 flex flex-col items-center text-center md:items-start md:text-left w-full max-w-lg mx-auto md:mx-0">
      <div class="desc flex flex-col items-center text-center md:items-start md:text-left w-full">
        <p class="hero-desc-text text-[16px] sm:text-[17px] md:text-[15px] lg:text-[16px] text-white/90 leading-relaxed max-w-lg font-medium text-center md:text-left mx-auto md:mx-0" style="text-shadow: 0px 1px 3px rgba(0,0,0,0.8);">
          ${desc}
        </p>
      </div>
    </div>
  `;
}

export function HeroDetails({ initialData, locale }: HeroDetailsProps) {
  const welcomeText = SPLASH_TEXTS[locale] || SPLASH_TEXTS.en;
  const h1Text = H1_HEADLINES[locale] || H1_HEADLINES.en;
  const t = useTranslations('homeFunnel.hero');
  const heroText = {
    trustBadge: t('trustBadge'),
    trustAria: t('trustAria'),
    audience: t('audience'),
    priceLine: t('priceLine', { fullDay: FULL_DAY_FROM_PRICE, multiDay: MULTI_DAY_FROM_PRICE }),
  };

  return (
    <>
      {[0, 1].map((isOdd) => {
        const id = isOdd ? 'details-odd' : 'details-even';
        const isWelcomeSlide = !isOdd && initialData.isWelcome;
        const opacityClass = isOdd ? 'opacity-0 z-[12]' : 'opacity-100 z-[22]';

        return (
          <div
            key={id}
            id={id}
            className={`absolute left-0 w-full px-4 sm:px-6 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] bottom-[210px] sm:bottom-[215px] md:bottom-auto md:top-[175px] lg:top-[185px] xl:top-[195px] flex flex-col items-center text-center md:items-start md:text-left pointer-events-none max-w-xl ${opacityClass}`}
          >
            {isWelcomeSlide ? (
              /* ── BIENVENIDA EXCLUSIVA (Centrada en móvil, a la izquierda en desktop) ── */
              <div className="welcome-container flex flex-col items-center text-center md:items-start md:text-left w-full">
                {/* Prueba de confianza visible desde el primer frame */}
                <a
                  href={TRIPADVISOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={heroText.trustAria}
                  className="pointer-events-auto inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-emerald-400/40 text-white text-xs sm:text-sm font-semibold shadow-lg hover:border-emerald-300 transition-colors"
                >
                  <span aria-hidden="true" className="text-amber-400 tracking-tight">★★★★★</span>
                  <span>{heroText.trustBadge}</span>
                </a>

                {/* Titular SEO visible (45-65 caracteres, 8 idiomas). Sin clases .title-*: GSAP no lo toca. */}
                <h1 className="font-serif font-bold text-white text-[28px] sm:text-[34px] md:text-[34px] lg:text-[40px] leading-[1.08] tracking-tight mb-3 max-w-xl [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
                  {h1Text}
                </h1>

                {/* Para quien es y desde cuanto */}
                <div className="welcome-headline mb-3 space-y-1.5 text-center md:text-left max-w-lg mx-auto md:mx-0">
                  <p className="text-[15px] sm:text-base md:text-[15px] lg:text-base font-medium text-white/95 leading-snug [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
                    {heroText.audience}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#F3D27A] tracking-wide [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
                    {heroText.priceLine}
                  </p>
                </div>

                {/* 4 Worlds Pills */}
                <div className="welcome-worlds flex flex-wrap items-center justify-center md:justify-start gap-2 text-[#C9A961] font-medium tracking-[0.18em] uppercase text-[10px] sm:text-xs drop-shadow-md pt-2 border-t border-white/15 max-w-lg mx-auto md:mx-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[0]}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C9A961]" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[1]}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C9A961]" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[2]}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C9A961]" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[3]}</span>
                </div>
              </div>
            ) : (
              /* ── MOLDE ESTÁNDAR (Con clases estándar para GSAP, vacío en inicio) ── */
              <>
                

                {/* Destino Subtítulo */}
                <div className="h-auto mb-1.5 pt-6 sm:pt-8 md:pt-0">
                  <div className="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center text-center md:items-start md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <div className="w-10 h-[2px] bg-[#C9A961] rounded-full mb-2 mx-auto md:mx-0" />
                    <span className="notranslate"></span>
                  </div>
                </div>

                {/* Line 1 (title - h2 tour slide title) */}
                <div className="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
                  <h2 className="title-1 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-[32px] lg:text-[43px] xl:text-[58px] uppercase leading-[0.95] tracking-tight whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
                    <span className="notranslate hero-slider-title-text"></span>
                  </h2>
                </div>

                {/* Line 2 (title2 - h3 tour slide subtitle) */}
                <div className="h-auto md:min-h-[50px] lg:min-h-[60px] mt-1 flex flex-col items-center text-center md:items-start md:text-left">
                  <h3 className="title-2 font-oswald font-extrabold text-[36px] sm:text-[46px] md:text-[32px] lg:text-[43px] xl:text-[58px] uppercase leading-[0.95] tracking-tight whitespace-normal md:whitespace-nowrap m-0 p-0 text-center md:text-left">
                    <span className="notranslate hero-slider-title-gold"></span>
                  </h3>
                </div>

                <div className="h-auto mt-3 md:mt-4 flex flex-col items-center text-center md:items-start md:text-left w-full max-w-lg mx-auto md:mx-0">
                  <div className="desc flex flex-col items-center text-center md:items-start md:text-left w-full">
                    <p className="hero-desc-text text-[16px] sm:text-[17px] md:text-[15px] lg:text-[16px] text-white/90 leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium text-center md:text-left mx-auto md:mx-0"></p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
