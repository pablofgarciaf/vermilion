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
  const isEs = locale === 'es';

  const title = isEs
    ? 'Vermilion Routes | Viajes de Lujo y Naturaleza en Ecuador'
    : 'Vermilion Routes | Bespoke Ecuador & Galapagos Tours';

  const description = isEs
    ? 'Descubra Ecuador y Galápagos con viajes de lujo a medida, cruceros exclusivos, lodges en la Amazonía y volcanes andinos. Reserve con guías expertos 24/7.'
    : 'Experience Ecuador and Galapagos with bespoke travel itineraries, nature and comfort cruises, Amazon lodges, and Andean volcanic treks 24/7.';

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
