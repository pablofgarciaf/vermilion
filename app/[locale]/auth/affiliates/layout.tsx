import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { getSeoAlternates } from '@/utils/seoHelper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    es: 'Vermilion Routes | Portal de Embajadores y Afiliados',
    en: 'Vermilion Routes | Travel Ambassador & Partner Portal',
    fr: 'Vermilion Routes | Portail des Ambassadeurs Partenaires',
    de: 'Vermilion Routes | Botschafter- und Partnerportal 24/7',
    it: 'Vermilion Routes | Portale Ambasciatori e Partner 24/7',
    pt: 'Vermilion Routes | Portal de Embaixadores e Parceiros',
    ja: 'Vermilion Routes | 公式アンバサダー＆パートナー専用ポータル',
    zh: 'Vermilion Routes | 官方旅行大使与合作伙伴专属门户',
  };

  const descriptions: Record<string, string> = {
    es: 'Acceda o regístrese en el portal oficial de embajadores de Vermilion Routes. Gestione sus comisiones, enlaces de recomendación y soporte VIP 24/7.',
    en: 'Access or register for the official Vermilion Routes ambassador portal. Manage your commissions, bespoke referral links, and 24/7 VIP support.',
    fr: 'Accédez ou inscrivez-vous sur le portail officiel des ambassadeurs de Vermilion Routes. Gérez vos commissions, liens de parrainage et support VIP.',
    de: 'Registrieren oder melden Sie sich im offiziellen Vermilion Routes Botschafterportal an. Verwalten Sie Provisionen, Empfehlungslinks und VIP-Support.',
    it: 'Accedi o registrati al portale ufficiale degli ambasciatori di Vermilion Routes. Gestisci commissioni, link di riferimento e supporto VIP 24/7.',
    pt: 'Acesse ou registre-se no portal oficial de embaixadores da Vermilion Routes. Gerencie suas comissões, links de indicação e suporte VIP 24/7.',
    ja: 'Vermilion Routes公式アンバサダーポータル。コミッション管理、紹介リンクの生成、24時間VIPコンシェルジュサポートをご利用いただけます。',
    zh: '登录或注册Vermilion Routes官方旅行大使门户。管理您的推荐佣金、生成专属分销链接并享受24/7全天候一对一VIP客户支持。',
  };

  const title = titles[locale] || titles['en'];
  const description = descriptions[locale] || descriptions['en'];

  return {
    title,
    description,
    alternates: getSeoAlternates('/auth/affiliates', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}/auth/affiliates`,
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
      images: [
        {
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
          width: 1200,
          height: 675,
          alt: 'Vermilion Routes Ambassador Portal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function AffiliatesAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
