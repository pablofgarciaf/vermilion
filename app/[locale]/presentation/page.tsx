import type { Metadata } from 'next';
import { PresentationClient } from '@/components/affiliates/PresentationClient';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  const title = isEs
    ? 'Vermilion Routes | Programa de Embajadores y Afiliados'
    : 'Vermilion Routes | Luxury Travel Ambassador Program';
  const description = isEs
    ? 'Gane comisiones del 10% recomendando viajes de lujo en Galápagos y Ecuador. Únase a la red exclusiva de embajadores de Vermilion Routes 24/7.'
    : 'Earn 10% commission on bespoke luxury Galapagos & Ecuador expeditions. Join the exclusive Vermilion Routes travel ambassador and partner network.';

  return {
    title,
    description,
    alternates: getSeoAlternates('/presentation', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}/presentation`,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
  };
}

export default async function PresentationPage({
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const vid = resolvedSearchParams.vid;
  const ref = resolvedSearchParams.ref;
  const login = resolvedSearchParams.login;

  const initialRef = typeof vid === 'string' ? vid : typeof ref === 'string' ? ref : '';
  const initialLogin = login === 'true';

  return <PresentationClient initialRef={initialRef} initialLogin={initialLogin} />;
}
