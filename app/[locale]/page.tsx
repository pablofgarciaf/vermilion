import React from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HeroSlider } from '@/components/home/HeroSlider';
import FluidBackgroundCursor from '@/components/home/FluidBackgroundCursor';
import { StatsSection } from '@/components/home/StatsSection';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { CombinedExperienceSection } from '@/components/home/CombinedExperienceSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { QuoteCtaBand } from '@/components/home/QuoteCtaBand';
import { QuickQuoteStrip } from '@/components/home/QuickQuoteStrip';
import { HomeBlogSection } from '@/components/home/HomeBlogSection';
import { AlsoAskedFaq } from '@/components/home/AlsoAskedFaq';
import { ContactSection } from '@/components/home/ContactSection';
import AffiliateRegistration from '@/components/home/AffiliateRegistration';
import { getSeoAlternates, withBrandTail } from '@/utils/seoHelper';
import { defaultSettings } from '@/lib/seed';
import { getLocalizedText } from '@/utils/i18nHelper';

export async function generateStaticParams() {
  return ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Expediciones a Medida en Ecuador',
    en: 'Vermilion Routes | Bespoke Nature Expeditions 24/7',
    fr: 'Vermilion Routes | Voyages sur Mesure en Équateur 24/7',
    de: 'Vermilion Routes | Reisen nach Ecuador & Galápagos 24/7',
    it: 'Vermilion Routes | Viaggi su Misura alle Galápagos 24/7',
    pt: 'Vermilion Routes | Viagens sob Medida no Equador 24/7',
    ja: 'Vermilion Routes | エクアドル＆ガラパゴス自然旅行',
    zh: 'Vermilion Routes | 定制厄瓜多尔与加拉帕戈斯之旅',
  };

  const descriptions: Record<string, string> = {
    es: 'Descubra Ecuador y Galápagos con viajes a medida, confort supremo, cruceros selectos, lodges en la Amazonía y volcanes andinos. Expertos 24/7.',
    en: 'Experience Ecuador and Galapagos with bespoke private itineraries, nature cruises, Amazon lodges, and Andean volcanic treks with 24/7 concierges.',
    fr: 'Vivez l’Équateur et les Galápagos lors de voyages sur mesure, croisières intimes, lodges amazoniens et treks andins avec conciergerie privée 24/7.',
    de: 'Erleben Sie Ecuador und Galápagos auf maßgeschneiderten Reisen, Naturkreuzfahrten, Amazonas-Lodges und Anden-Vulkantreks mit 24/7-Concierge.',
    it: 'Vivi l’Ecuador e le Galápagos con viaggi su misura, crociere boutique, lodge in Amazzonia e trekking andini assistiti da concierge dedicati 24/7.',
    pt: 'Viva o Equador e Galápagos em viagens sob medida, cruzeiros exclusivos, lodges na Amazônia e vulcões andinos com concierges dedicados 24/7.',
    ja: 'ガラパゴス諸島とエクアドル本土を巡るオーダーメイド自然旅行。専任ナチュラリストガイドと24時間体制のコンシェルジュが特別な体験をお届けします。',
    zh: '探索厄瓜多尔与加拉帕戈斯群岛的自然探险之旅。配备官方认证私人自然学向导与24/7全天候专属礼宾管家，为您量身打造安全舒适的私享假期。',
  };

  const title = titles[locale] || titles['en'];
  const description = withBrandTail(descriptions[locale] || descriptions['en'], locale);

  return {
    title,
    description,
    alternates: getSeoAlternates('', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}`,
      siteName: 'Vermilion Routes',
      images: [
        {
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
          width: 1200,
          height: 630,
          alt: 'Vermilion Routes - Bespoke Nature Journeys',
        },
      ],
      locale: {
        es: 'es_LA',
        en: 'en_US',
        fr: 'fr_FR',
        de: 'de_DE',
        it: 'it_IT',
        pt: 'pt_BR',
        ja: 'ja_JP',
        zh: 'zh_CN',
      }[locale] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp'],
    },
  };
}


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Fija el idioma para next-intl sin leer headers(): permite servir la home como HTML estático cacheable.
  setRequestLocale(locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (defaultSettings.faq || []).map((item) => ({
      '@type': 'Question',
      name: getLocalizedText(item.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedText(item.answer, locale),
      },
    })),
  };

  return (
    <div className="space-y-8 pb-12 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Fondo WebGL y cursor: solo escritorio con ratón y sin prefers-reduced-motion. */}
      <FluidBackgroundCursor />

      {/* 1. Hero + franja de confianza (TripAdvisor 5.0) renderizada en el servidor */}
      <div>
        <HeroSlider />
        {/* Formulario corto de cotización justo debajo del hero */}
        <QuickQuoteStrip />
        <StatsSection />
      </div>

      {/* 2. Qué vendemos y desde cuánto: destinos con precio "Desde $X" */}
      <div className="home-deferred-section">
        <DestinationsGrid />
      </div>

      {/* 3. Tours concretos con precio */}
      <div className="home-deferred-section">
        <FeaturedTours />
      </div>

      {/* 4. Confianza: reseñas TripAdvisor y quiénes somos (#about / #experience) */}
      <div className="home-deferred-section">
        <CombinedExperienceSection />
      </div>

      {/* 5. Atajo a la cotización a mitad de página */}
      <div className="home-deferred-section">
        <QuoteCtaBand locale={locale} />
      </div>

      {/* 6. Dudas frecuentes (coincide con el JSON-LD de arriba) */}
      <div className="home-deferred-section">
        <AlsoAskedFaq />
      </div>

      {/* 7. Formulario de cotización (#contact) */}
      <div className="home-deferred-section">
        <ContactSection />
      </div>

      {/* 8. Contenido secundario: guías del blog, siguen en el HTML inicial */}
      <div className="home-deferred-section">
        <HomeBlogSection />
      </div>

      {/* 9. Programa de embajadores al pie, fuera del embudo del viajero (ancla #affiliate del footer) */}
      <div className="home-deferred-section">
        <AffiliateRegistration />
      </div>
    </div>
  );
}

