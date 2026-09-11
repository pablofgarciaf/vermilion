import type { Metadata } from 'next';
import { PresentationClient } from '@/components/affiliates/PresentationClient';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Programa de Embajadores de Lujo 24/7',
    en: 'Vermilion Routes | Luxury Travel Ambassador Network 24/7',
    fr: 'Vermilion Routes | Programme Ambassadeurs de Luxe 24/7',
    de: 'Vermilion Routes | Exklusives Luxus-Botschafterprogramm',
    it: 'Vermilion Routes | Programma Ambasciatori di Lusso 24/7',
    pt: 'Vermilion Routes | Programa de Embaixadores de Luxo 24/7',
    ja: 'Vermilion Routes | 豪華旅行公式アンバサダー募集',
    zh: 'Vermilion Routes | 顶级奢华旅行大使与分销合作计划',
  };
  const descriptions: Record<string, string> = {
    es: 'Gane comisiones del 10% recomendando viajes de lujo en Galápagos y Ecuador. Únase a la red exclusiva de embajadores de Vermilion Routes 24/7.',
    en: 'Earn 10% commission on bespoke luxury Galapagos & Ecuador expeditions. Join the exclusive Vermilion Routes travel ambassador and partner network.',
    fr: 'Gagnez 10% de commission en recommandant des voyages de luxe aux Galápagos et en Équateur. Rejoignez le réseau officiel d\'ambassadeurs Vermilion.',
    de: 'Verdienen Sie 10% Provision mit maßgeschneiderten Luxusreisen nach Galápagos und Ecuador. Werden Sie Teil des exklusiven Botschafter-Netzwerks 24/7.',
    it: 'Guadagna il 10% di commissione raccomandando viaggi di lusso alle Galápagos ed in Ecuador. Entra nella rete esclusiva di ambasciatori Vermilion.',
    pt: 'Ganhe 10% de comissão recomendando viagens de luxo em Galápagos e no Equador. Junte-se à rede exclusiva de embaixadores da Vermilion Routes 24/7.',
    ja: 'ガラパゴス諸島やエクアドルの豪華旅行を紹介して10%の手数料を獲得。Vermilion Routesの公式アンバサダーネットワークに今すぐご参加ください。',
    zh: '推荐厄瓜多尔与加拉帕戈斯顶级奢华探险行程，尊享高达10%丰厚佣金回报。立即加入Vermilion Routes官方旅行大使与精英合作伙伴网络。',
  };

  const title = titles[locale] || titles['en'];
  const description = descriptions[locale] || descriptions['en'];

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
