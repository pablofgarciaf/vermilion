import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSlider } from '@/components/home/HeroSlider';
import { StatsSection } from '@/components/home/StatsSection';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { CombinedExperienceSection } from '@/components/home/CombinedExperienceSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { HomeBlogSection } from '@/components/home/HomeBlogSection';
import { AlsoAskedFaq } from '@/components/home/AlsoAskedFaq';
import { ContactSection } from '@/components/home/ContactSection';
import AffiliateRegistration from '@/components/home/AffiliateRegistration';
import { LazySection } from '@/components/ui/LazySection';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Viajes de Lujo y Expediciones a Medida',
    en: 'Vermilion Routes | Bespoke Ecuador & Galapagos Luxury Tours',
    fr: 'Vermilion Routes | Voyages de Luxe & Circuits en Équateur',
    de: 'Vermilion Routes | Luxusreisen nach Ecuador & Galápagos 24/7',
    it: 'Vermilion Routes | Viaggi di Lusso su Misura alle Galápagos',
    pt: 'Vermilion Routes | Viagens de Luxo no Equador e Galápagos',
    ja: 'Vermilion Routes | ガラパゴス諸島＆エクアドル豪華オーダーメイド旅行',
    zh: 'Vermilion Routes | 厄瓜多尔与加拉帕戈斯群岛顶级私人定制旅行',
  };

  const descriptions: Record<string, string> = {
    es: 'Descubra Ecuador y Galápagos con viajes de lujo a medida, cruceros exclusivos, lodges en la Amazonía y volcanes andinos. Reserve con guías expertos 24/7.',
    en: 'Experience Ecuador and Galapagos with bespoke private itineraries, luxury boutique cruises, Amazon lodges, and Andean volcanic treks with 24/7 concierges.',
    fr: 'Vivez l’Équateur et les Galápagos lors de voyages de luxe sur mesure, croisières intimes, lodges amazoniens et treks andins avec conciergerie privée 24/7.',
    de: 'Erleben Sie Ecuador und Galápagos auf maßgeschneiderten Luxusreisen, Boutique-Kreuzfahrten, Amazonas-Lodges und Anden-Vulkantreks mit 24/7-Concierge.',
    it: 'Vivi l’Ecuador e le Galápagos con viaggi di lusso su misura, crociere boutique, lodge in Amazzonia e trekking andini assistiti da concierge dedicati 24/7.',
    pt: 'Viva o Equador e Galápagos em viagens de luxo sob medida, cruzeiros exclusivos, lodges na Amazônia e vulcões andinos com concierges dedicados 24/7.',
    ja: 'ガラパゴス諸島とエクアドル本土を巡る最高峰の豪華オーダーメイド旅行。専任ナチュラリストガイドと24時間体制のコンシェルジュが特別な体験をお届けします。',
    zh: '探索厄瓜多尔与加拉帕戈斯群岛的非凡奢华探险之旅。配备官方认证私人自然学向导与24/7全天候专属礼宾管家，为您量身打造毕生难忘的私享假期。',
  };

  const title = titles[locale] || titles['en'];
  const description = descriptions[locale] || descriptions['en'];

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
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
          width: 1200,
          height: 630,
          alt: 'Vermilion Routes - Bespoke Luxury Journeys',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
  };
}

const FluidBackgroundCursor = dynamic(
  () => import('@/components/home/FluidBackgroundCursor'),
  {
    loading: () => null,
  }
);

export default function Home() {
  return (
    <div className="space-y-8 pb-12 relative -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px]">
      {/* Dynamic Fluid WebGL Shader Background & Custom Mouse Cursor */}
      <FluidBackgroundCursor />

      {/* 1. Critical Above-the-Fold Viewport */}
      <div>
        <HeroSlider />
        <StatsSection />
      </div>

      {/* 2. Top Destinations Grid (Direct SSR - 0.00 CLS) */}
      <DestinationsGrid />

      {/* 3. Combined Trust & Expertise Section (Lazy Section) */}
      <LazySection minHeightClass="min-h-[420px]">
        <CombinedExperienceSection />
      </LazySection>

      {/* 4. Featured Tours Carousel (Lazy Section) */}
      <LazySection minHeightClass="min-h-[580px]">
        <FeaturedTours />
      </LazySection>

      {/* 5. Travel Blog & Video Expeditions (Lazy Section) */}
      <LazySection minHeightClass="min-h-[450px]">
        <HomeBlogSection />
      </LazySection>

      {/* 6. Frequently Asked Questions (Lazy Section) */}
      <LazySection minHeightClass="min-h-[400px]">
        <AlsoAskedFaq />
      </LazySection>

      {/* Join the Team / Affiliate Program (Lazy Section) */}
      <LazySection minHeightClass="min-h-[320px]">
        <AffiliateRegistration />
      </LazySection>

      {/* 7. Contact & Tailor-Made Quotation Form (Lazy Section) */}
      <LazySection minHeightClass="min-h-[550px]">
        <ContactSection />
      </LazySection>
    </div>
  );
}
