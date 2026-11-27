import React from 'react';
import Image from 'next/image';
import { getLocalizedText } from '@/utils/i18nHelper';
import { SlideData } from '@/types';
import { ShieldCheck } from 'lucide-react';

interface HeroDetailsProps {
  initialData: SlideData;
  locale: string;
}

const SPLASH_TEXTS: Record<string, {
  rating: string;
  mintur: string;
  depositGuarantee: string;
  tailorMade: string;
  headline: string;
  subheadline: string;
  worlds: [string, string, string, string];
}> = {
  es: {
    rating: 'TripAdvisor · 52 reseñas',
    mintur: 'Mintur #1793215456001',
    depositGuarantee: 'Depósito protegido 100%',
    tailorMade: 'Viajes a medida',
    headline: 'Los Mejores Tours Privados en Ecuador y Galápagos',
    subheadline: 'Guías Nativos Certificados • Expediciones Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  en: {
    rating: 'TripAdvisor · 52 reviews',
    mintur: 'Mintur #1793215456001',
    depositGuarantee: '100% deposit protected',
    tailorMade: 'Tailor-made journeys',
    headline: 'The Best Private Tours in\nEcuador & Galapagos',
    subheadline: 'Certified Native Guides • Exclusive Expeditions',
    worlds: ['Galapagos', 'Andes', 'Amazon', 'Pacific']
  },
  fr: {
    rating: 'TripAdvisor · 52 avis',
    mintur: 'Mintur #1793215456001',
    depositGuarantee: 'Acompte protégé à 100 %',
    tailorMade: 'Voyages sur mesure',
    headline: 'Les Meilleurs Circuits Privés en Équateur et Galapagos',
    subheadline: 'Guides Locaux Certifiés • Expéditions Exclusives',
    worlds: ['Galapagos', 'Andes', 'Amazonie', 'Pacifique']
  },
  de: {
    rating: 'TripAdvisor · 52 Bewertungen',
    mintur: 'Mintur #1793215456001',
    depositGuarantee: 'Anzahlung 100 % geschützt',
    tailorMade: 'Maßgeschneiderte Reisen',
    headline: 'Die besten privaten Touren in Ecuador & Galapagos',
    subheadline: 'Einheimische Guides • Exklusive Expeditionen',
    worlds: ['Galapagos', 'Anden', 'Amazonas', 'Pazifik']
  },
  it: {
    rating: 'TripAdvisor · 52 recensioni',
    mintur: 'Mintur #1793215456001',
    depositGuarantee: 'Acconto protetto al 100%',
    tailorMade: 'Viaggi su misura',
    headline: 'I Migliori Tour Privati in\nEcuador e Galapagos',
    subheadline: 'Guide Locali Certificate • Spedizioni Esclusive',
    worlds: ['Galapagos', 'Ande', 'Amazzonia', 'Pacifico']
  },
  pt: {
    rating: 'TripAdvisor · 52 avaliações',
    mintur: 'Mintur #1793215456001',
    depositGuarantee: 'Depósito protegido 100%',
    tailorMade: 'Viagens sob medida',
    headline: 'Os Melhores Passeios Privados no Equador e Galápagos',
    subheadline: 'Guias Nativos Certificados • Expedições Exclusivas',
    worlds: ['Galápagos', 'Andes', 'Amazonas', 'Pacífico']
  },
  ja: {
    rating: 'TripAdvisor · 52件のレビュー',
    mintur: 'エクアドル観光省公式認定 #1793215456001',
    depositGuarantee: '手付金を100%保護',
    tailorMade: 'オーダーメイドの旅',
    headline: 'エクアドルとガラパゴスの最高のプライベートツアー',
    subheadline: '認定ネイティブガイド • 特別な探検',
    worlds: ['ガラパゴス', 'アンデス', 'アマゾン', '太平洋']
  },
  zh: {
    rating: 'TripAdvisor · 52条好评',
    mintur: '厄瓜多尔旅游部官方特许执照 #1793215456001',
    depositGuarantee: '定金100%保护',
    tailorMade: '量身定制旅程',
    headline: '厄瓜多尔与加拉帕戈斯顶级私人旅行',
    subheadline: '专业持证本地向导 • 专属探险',
    worlds: ['加拉帕戈斯', '安第斯', '亚马逊', '太平洋']
  }
};

const H1_HEADLINES: Record<string, string> = {
  es: 'Tours Privados por Ecuador y Galápagos',
  en: 'Private Tours Across\nEcuador and Galapagos',
  fr: 'Voyages Privés en Équateur et aux Galápagos',
  de: 'Private Touren durch Ecuador und die Galápagos',
  it: 'Viaggi Privati in\nEcuador e Galápagos',
  pt: 'Viagens Privadas pelo Equador e Galápagos',
  ja: 'エクアドルとガラパゴスを巡るプライベート旅行',
  zh: '厄瓜多尔与加拉帕戈斯私人旅行体验',
};

export function getHeroCommercialCopy(locale: string) {
  return SPLASH_TEXTS[locale] || SPLASH_TEXTS.en;
}

export function getStandardTemplateHTML(slide: SlideData, locale: string): string {
  const place = getLocalizedText(slide.place, locale);
  // El viaje y la propuesta comercial permanecen fijos; cada escena solo aporta
  // su destino y una breve línea editorial. No se modifica heroData.
  const heroCopy = getHeroCommercialCopy(locale);
  // El molde que GSAP inyecta debe usar exactamente el mismo titular visual
  // que el panel React. El H1 SEO vive solo en la bienvenida y no debe cambiar
  // la altura del texto entre una escena y otra.
  const title = heroCopy.headline;
  const title2 = heroCopy.subheadline;
  const desc = getLocalizedText(slide.description, locale);

  return `
    <div class="h-auto mb-1.5 pt-0">
      <div class="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center text-center md:items-start md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        <div class="w-8 h-[2px] bg-white rounded-full mb-2 mx-auto md:mx-0"></div>
        <span class="notranslate">${place}</span>
      </div>
    </div>

    <div class="h-auto mt-1 flex w-full max-w-[min(88vw,980px)] flex-col items-center text-center md:items-start md:text-left">
    <h2 class="title-1 font-oswald font-extrabold text-[30px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] uppercase leading-[1.04] tracking-tight whitespace-pre-line break-words m-0 p-0 text-center md:text-left text-white" style="text-shadow: 0px 2px 4px rgba(0,0,0,0.8), 0px 0px 2px rgba(0,0,0,0.6);"><span class="notranslate">${title}</span></h2>
    </div>

    <div class="h-auto mt-2 flex w-full max-w-[min(88vw,760px)] flex-col items-center text-center md:items-start md:text-left">
      <h3 class="title-2 font-sans font-semibold text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] uppercase leading-snug tracking-wide text-emerald-200 whitespace-normal m-0 p-0 text-center md:text-left" style="text-shadow: 0px 2px 4px rgba(0,0,0,0.8), 0px 0px 2px rgba(0,0,0,0.6);"><span class="notranslate">${title2}</span></h3>
    </div>

    <div class="h-auto mt-2 md:mt-3 flex flex-col items-center text-center md:items-start md:text-left w-full max-w-lg mx-auto md:mx-0">
      <div class="desc flex flex-col items-center text-center md:items-start md:text-left w-full">
        <p class="hero-desc-text text-[16px] sm:text-[17px] lg:text-[18px] text-white/95 leading-snug font-medium text-center md:text-left mx-auto md:mx-0" style="text-shadow: 0px 1px 3px rgba(0,0,0,0.8);">
          ${desc}
        </p>
      </div>

    </div>
  `;
}

export function HeroDetails({ initialData, locale }: HeroDetailsProps) {
  const welcomeText = getHeroCommercialCopy(locale);
  const h1Text = H1_HEADLINES[locale] || H1_HEADLINES.en;

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
            className={`absolute left-0 w-full px-4 sm:px-6 md:px-0 md:w-auto md:left-[30px] lg:left-[60px] bottom-[145px] sm:bottom-[150px] md:bottom-auto md:top-[145px] lg:top-[150px] xl:top-[165px] flex flex-col items-center text-center md:items-start md:text-left pointer-events-none max-w-xl md:max-w-[980px] ${opacityClass}`}
          >
            {isWelcomeSlide ? (
              /* ── BIENVENIDA EXCLUSIVA (Centrada en móvil, a la izquierda en desktop) ── */
              <div className="welcome-container flex flex-col items-center text-center md:items-start md:text-left w-full">
                {/* "ALL YOU NEED IS" Vibrant Oswald Decorative Brand Art */}
                <div aria-hidden="true" className="welcome-title flex flex-col items-center justify-center md:items-start mb-2.5 select-none pointer-events-none">
                  <span className="flex gap-2 sm:gap-3 md:gap-4 font-oswald font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] [text-shadow:0_3px_10px_rgba(0,0,0,0.9)]">
                    <span className="flex">
                      <span className="text-[#FDB913]">A</span>
                      <span className="text-[#F58220]">L</span>
                      <span className="text-[#F05A28]">L</span>
                    </span>
                    <span className="flex">
                      <span className="text-[#EF4136]">Y</span>
                      <span className="text-[#ED1C24]">O</span>
                      <span className="text-[#E6007E]">U</span>
                    </span>
                    <span className="flex">
                      <span className="text-[#E91E63]">N</span>
                      <span className="text-[#F06292]">E</span>
                      <span className="text-[#CE93D8]">E</span>
                      <span className="text-[#AB47BC]">D</span>
                    </span>
                    <span className="flex">
                      <span className="text-[#42A5F5]">I</span>
                      <span className="text-[#29B6F6]">S</span>
                    </span>
                  </span>
                </div>

                {/* Clean Semantic 50-60 char H1 for SEO */}
                <h1 className="sr-only">{h1Text}</h1>

                {/* Logo Glass Card - Centered under ALL YOU NEED IS */}
                <div className="welcome-logo-card relative w-[230px] h-[78px] sm:w-[290px] sm:h-[98px] md:w-[340px] md:h-[112px] mb-3 flex items-center justify-center mx-auto md:mx-0 md:ml-[82px] lg:ml-[95px] xl:ml-[105px]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/logo_blanco.png"
                      alt="Vermilion Routes"
                      width={340}
                      height={112}
                      quality={85}
                      className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]"
                      priority
                      fetchPriority="high"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Headline & Subheadline */}
                <div className="welcome-headline mb-3 space-y-0.5 text-center md:text-left max-w-lg mx-auto md:mx-0">
                  <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-white tracking-wide drop-shadow-md">
                    {welcomeText.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-300 font-medium tracking-wider uppercase flex items-center justify-center md:justify-start gap-2 drop-shadow">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{welcomeText.subheadline}</span>
                  </p>
                </div>

                {/* 4 Worlds Pills (Pacífico oculto en móviles para ahorrar una línea) */}
                <div className="welcome-worlds flex flex-wrap items-center justify-center md:justify-start gap-2 text-white/90 font-medium tracking-[0.18em] uppercase text-[10px] sm:text-xs drop-shadow-md pt-2 border-t border-white/15 max-w-lg mx-auto md:mx-0 mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[0]}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[1]}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[2]}</span>
                  <span className="hidden md:inline-block w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">{welcomeText.worlds[3]}</span>
                </div>

              </div>
            ) : (
              /* ── MOLDE ESTÁNDAR (Con clases estándar para GSAP, vacío en inicio) ── */
              <>
                {/* Destino Subtítulo */}
                <div className="h-auto mb-1.5 pt-0">
                  <div className="text text-white font-medium tracking-widest uppercase text-base md:text-sm pt-1 relative flex flex-col items-center text-center md:items-start md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <div className="w-8 h-[2px] bg-white rounded-full mb-2 mx-auto md:mx-0" />
                    <span className="notranslate"></span>
                  </div>
                </div>

                {/* Line 1 (title - h2 tour slide title) */}
                <div className="h-auto mt-1 flex w-full max-w-[min(88vw,980px)] flex-col items-center text-center md:items-start md:text-left">
                  <h2 className="title-1 font-oswald font-extrabold text-[30px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] uppercase leading-[1.04] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-pre-line break-words m-0 p-0 text-center md:text-left">
                    <span className="notranslate"></span>
                  </h2>
                </div>

                {/* Line 2 (title2 - h3 tour slide subtitle) */}
                <div className="h-auto mt-2 flex w-full max-w-[min(88vw,760px)] flex-col items-center text-center md:items-start md:text-left">
                  <h3 className="title-2 font-sans font-semibold text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] uppercase leading-snug tracking-wide text-emerald-200 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] whitespace-normal m-0 p-0 text-center md:text-left">
                    <span className="notranslate"></span>
                  </h3>
                </div>

                <div className="h-auto mt-2 md:mt-3 flex flex-col items-center text-center md:items-start md:text-left w-full max-w-lg mx-auto md:mx-0">
                  <div className="desc flex flex-col items-center text-center md:items-start md:text-left w-full">
                    <p className="hero-desc-text text-[16px] sm:text-[17px] lg:text-[18px] text-white/95 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium text-center md:text-left mx-auto md:mx-0"></p>
                  </div>

                  {/* 3 VIP Badges Cluster under Description */}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
