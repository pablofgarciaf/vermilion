import type { Metadata } from 'next';
import { Inter, Playfair_Display, Oswald } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { LuxuryThemeProvider } from '@/components/providers/LuxuryThemeProvider';
import '../globals.css';
import Script from 'next/script';
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { AffiliateTracker } from '@/components/affiliates/AffiliateTracker';
import { ConciergeWidgetLazy } from '@/components/ui/ConciergeWidgetLazy';
import { ConsentManager } from '@/components/privacy/ConsentManager';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const isEs = locale === 'es';
  const defaultTitle = isEs
    ? 'Vermilion Routes | Expediciones a Medida en Ecuador'
    : 'Vermilion Routes | Bespoke Nature Expeditions 24/7';
  const defaultDescription = isEs
    ? 'Operador boutique para expediciones a medida en Galápagos, la Amazonía y los Andes ecuatorianos. Confort, naturaleza y expertos locales 24/7.'
    : 'Boutique tour operator for bespoke expeditions to Galapagos, the Amazon and the Ecuadorian Andes. Nature, comfort, and local experts 24/7.';

  return {
    title: t('title') || defaultTitle,
    description: t('description') || defaultDescription,
    authors: [{ name: 'Vermilion Routes' }],
    creator: 'Vermilion Routes',
    publisher: 'Vermilion Routes',
    metadataBase: new URL('https://www.vermilionroutes.com'),
    openGraph: {
      title: t('title') || defaultTitle,
      description: t('description') || defaultDescription,
      url: `https://www.vermilionroutes.com/${locale}`,
      siteName: 'Vermilion Routes',
      images: [
        {
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
          secureUrl: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'Giant Tortoises Galapagos Island – Vermilion Routes Bespoke Nature Travel',
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
      site: '@vermilionroutes',
      creator: '@vermilionroutes',
      title: t('title') || defaultTitle,
      description: t('description') || defaultDescription,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp'],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-vermilion',
    },
    other: {
      ...(process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
        ? { 'facebook-domain-verification': process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
        ? { 'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID }
        : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TravelAgency', 'Organization'],
        '@id': 'https://www.vermilionroutes.com/#organization',
        name: 'Vermilion Routes - Agencia de Viajes Vermilion',
        alternateName: 'Vermilion Routes Bespoke Nature Travel',
        legalName: 'Agencia de Viajes Vermilion Cia. Ltda.',
        taxID: '1711992808001',
        identifier: [
          {
            '@type': 'PropertyValue',
            name: 'RUC Ecuador',
            value: '1711992808001',
          },
          {
            '@type': 'PropertyValue',
            name: 'Ministerio de Turismo Ecuador',
            value: '1793215456001',
          },
        ],
        description:
          'Premier boutique tour operator specializing in bespoke nature and comfort itineraries, Galapagos island cruises, Amazon lodges, and Andean expeditions in Ecuador.',
        url: 'https://www.vermilionroutes.com',
        logo: 'https://www.vermilionroutes.com/logo.png',
        image: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.webp',
        telephone: '+593960039156',
        email: 'info@vermilionroutes.com',
        priceRange: '$$$$',
        openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
        foundingLocation: {
          '@type': 'Place',
          name: 'Quito, Ecuador',
        },
        knowsAbout: [
          'Galapagos private tours',
          'Ecuador bespoke travel',
          'Amazon rainforest lodges',
          'Andes expedition design',
          'Nature travel in Ecuador',
        ],
        address: [
          {
            '@type': 'PostalAddress',
            name: 'Sede Ecuador (HQ)',
            streetAddress: 'Monteserrín, De los Lirios N45-206 y Julio Arellano, Tercer Piso',
            addressLocality: 'Quito',
            addressRegion: 'Pichincha',
            postalCode: '170503',
            addressCountry: 'EC',
          },
          {
            '@type': 'PostalAddress',
            name: 'Sede España (Coral Tour)',
            streetAddress: 'Calle Seco 3',
            addressLocality: 'Madrid',
            addressRegion: 'Madrid',
            postalCode: '28007',
            addressCountry: 'ES',
          },
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '-0.3015',
          longitude: '-78.4172',
        },
        areaServed: [
          'Galapagos Islands',
          'Ecuador',
          'Mainland Ecuador',
          'Amazon Rainforest',
          'Andes Mountains',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+593960039156',
            contactType: 'customer service',
            availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
            areaServed: ['EC', 'US', 'CA', 'GB', 'EU'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+593994048458',
            contactType: 'reservations',
            availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
            areaServed: ['EC', 'US', 'CA', 'GB', 'EU'],
          },
        ],
        sameAs: [
          'https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html',
          'https://www.instagram.com/vermilionsouthamericanroutes/',
          'https://www.tiktok.com/@vermilionsaroutes',
          'https://www.facebook.com/VermilionSouthAmericanRoutes',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.vermilionroutes.com/#website',
        url: 'https://www.vermilionroutes.com',
        name: 'Vermilion Routes',
        publisher: {
          '@id': 'https://www.vermilionroutes.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `https://www.vermilionroutes.com/${locale}/tours?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} ${oswald.variable} scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="paper-bg text-zinc-900 dark:text-zinc-50 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Script id="google-consent-default" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'granted',
                security_storage: 'granted'
              });
            `}
          </Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-D8ZNLYMCB0" strategy="lazyOnload" />

          <LuxuryThemeProvider>
          <CurrencyProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <ConditionalNavbar />
              <main className="flex-grow">
                {children}
              </main>
              <ConditionalFooter />
              <ConciergeWidgetLazy />
              <Suspense fallback={null}>
                <AffiliateTracker />
              </Suspense>
              <ConsentManager
                locale={locale}
                gaId="G-D8ZNLYMCB0"
                metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
                clarityProjectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}
              />
            </NextIntlClientProvider>
          </CurrencyProvider>
          </LuxuryThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
