import { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Reserva tu Expedición a Medida 24/7',
    en: 'Vermilion Routes | Book Your Bespoke Nature Journey',
    fr: 'Vermilion Routes | Réservez Votre Voyage sur Mesure',
    de: 'Vermilion Routes | Buchen Sie Ihre Reise nach Maß',
    it: 'Vermilion Routes | Prenota la Tua Spedizione Unica',
    pt: 'Vermilion Routes | Reserve sua Viagem sob Medida',
    ja: 'Vermilion Routes | 自然旅行のご予約',
    zh: 'Vermilion Routes | 在线预订自然探险行程',
  };
  const descriptions: Record<string, string> = {
    es: 'Reserve su expedición a medida en Galápagos y Ecuador con Vermilion Routes. Naturaleza, confort, asesoría 24/7 y cotizaciones exclusivas garantizadas.',
    en: 'Book your bespoke nature and comfort expedition to Galapagos and Ecuador with Vermilion Routes. Dedicated 24/7 travel designers and custom quotes.',
    fr: 'Réservez votre expédition sur mesure aux Galápagos et en Équateur avec Vermilion Routes. Nature, confort, conseillers dédiés 24/7 et devis exclusifs.',
    de: 'Buchen Sie Ihre maßgeschneiderte Naturexpedition nach Galápagos und Ecuador mit Vermilion Routes. 24/7 persönliche Reiseberatung und Angebote.',
    it: 'Prenota la tua spedizione su misura alle Galápagos ed in Ecuador con Vermilion Routes. Natura, comfort, consulenti dedicati 24/7 e preventivi diretti.',
    pt: 'Reserve sua expedição sob medida em Galápagos e no Equador com a Vermilion Routes. Natureza, conforto, consultoria dedicada 24/7 e cotações diretas.',
    ja: 'ガラパゴス諸島とエクアドル本土へのオーダーメイド自然体験ツアーをご予約ください。専任トラベルデザイナーが24時間体制で見積もりを作成します。',
    zh: '在线预约定制专属的厄瓜多尔与加拉帕戈斯自然探险。24/7私人旅行设计师提供一对一行程规划。',
  };

  const title = titles[locale] || titles['en'];
  const description = descriptions[locale] || descriptions['en'];

  return {
    title,
    description,
    alternates: getSeoAlternates('/booking', locale),
  };
}

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  // Title translations for all supported locales
  const titleTexts: Record<string, string> = {
    es: 'Reserva tu Expedición a Medida en Ecuador y Galápagos',
    en: 'Book Your Bespoke Nature Expedition in Galapagos & Andes',
    fr: 'Réservez votre expédition sur mesure aux Galápagos et aux Andes',
    de: 'Buchen Sie Ihre maßgeschneiderte Naturexpedition in Galápagos & Anden',
    it: 'Prenota la tua spedizione su misura a Galápagos e Ande',
    pt: 'Reserve sua expedição sob medida em Galápagos e Andes',
    ja: 'ガラパゴスとアンデスのカスタム自然遠征を予約する',
    zh: '预订加拉帕戈斯和安第斯的定制自然探险'
  };

  // Paragraph translations for all supported locales
  const paragraphTexts: Record<string, string> = {
    es: 'Planifique su viaje exclusivo por Galápagos y Ecuador con asistencia personalizada 24/7.',
    en: 'Customize your private journey across Galapagos & Ecuador with 24/7 dedicated travel designers.',
    fr: 'Personnalisez votre voyage privé à travers les Galápagos & l\'Équateur avec des concepteurs de voyage dédiés 24/7.',
    de: 'Gestalten Sie Ihre private Reise durch Galápagos & Ecuador mit 24/7 dedizierten Reiseplanern.',
    it: 'Personalizza il tuo viaggio privato tra Galápagos & Ecuador con designer di viaggio dedicati 24/7.',
    pt: 'Personalize sua viagem privada entre Galápagos & Equador com designers de viagem dedicados 24/7.',
    ja: 'ガラパゴスとエクアドルのプライベート旅行を24/7の旅行デザイナーと共にカスタマイズ',
    zh: '使用24/7专属旅行设计师定制加拉帕戈斯和厄瓜多尔的私人行程。'
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0B1622] relative -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] pt-[100px] sm:pt-[120px] lg:pt-[150px] transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-emerald-900/15 via-emerald-900/5 to-transparent -z-10 pointer-events-none" />
      <div className="pb-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static SSR H1 Header - Guarantees H1 is first heading in DOM */}
        {/* Visually Hidden H1 for SEO compliance (45-65 chars) */}
        <h1 className="sr-only">
          {locale === 'es' ? 'Reserva tu Expedición Exclusiva en Galápagos y Ecuador' : 
           locale === 'en' ? 'Book Your Exclusive Expedition in Galapagos and Ecuador' :
           locale === 'fr' ? 'Réservez votre Expédition Exclusive aux Galapagos et Equateur' :
           locale === 'de' ? 'Buchen Sie Ihre exklusive Expedition auf den Galapagos-Inseln' :
           locale === 'it' ? 'Prenota la tua Spedizione Esclusiva alle Galapagos e Ecuador' :
           locale === 'pt' ? 'Reserve sua Expedição Exclusiva em Galápagos e no Equador' :
           locale === 'ja' ? 'ガラパゴス諸島とエクアドルの特別なエクスペディションを予約する' :
           '预订加拉帕戈斯群岛和厄瓜多尔的专属探险之旅'}
        </h1>
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-emerald-700 font-semibold animate-pulse">{isEs ? 'Iniciando cotizador premium...' : 'Loading booking wizard...'}</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </main>
  );
}
