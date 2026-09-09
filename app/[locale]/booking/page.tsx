import { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'Vermilion Routes | Reserva tu Expedición de Lujo a Medida'
      : 'Vermilion Routes | Book Your Bespoke Luxury Vacation',
    description: isEs
      ? 'Reserve su expedición de lujo a medida en Galápagos y Ecuador con Vermilion Routes. Asesoría de viaje personalizada 24/7 y cotizaciones exclusivas.'
      : 'Book your bespoke luxury expedition to the Galapagos Islands & Ecuador with Vermilion Routes. Dedicated 24/7 travel designers & custom quotes.',
    alternates: getSeoAlternates('/booking', locale),
  };
}

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === 'es';

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#07130C] relative -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-[120px] pt-[100px] sm:pt-[120px] lg:pt-[150px] transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-emerald-900/15 via-emerald-900/5 to-transparent -z-10 pointer-events-none" />
      <div className="pb-16 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static SSR H1 Header - Guarantees H1 is first heading in DOM */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-zinc-900 dark:text-white tracking-tight">
            {isEs ? 'Reserva tu Expedición de Lujo a Medida' : 'Book Your Bespoke Luxury Expedition'}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm max-w-xl mx-auto">
            {isEs
              ? 'Planifique su viaje exclusivo por Galápagos y Ecuador con asistencia personalizada 24/7.'
              : 'Customize your private journey across Galapagos & Ecuador with 24/7 dedicated travel designers.'}
          </p>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-emerald-700 font-semibold animate-pulse">{isEs ? 'Iniciando cotizador premium...' : 'Loading booking wizard...'}</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </main>
  );
}
