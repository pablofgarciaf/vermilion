import React from 'react';
import Link from 'next/link';

type PageKey =
  | 'terms'
  | 'privacy-policy'
  | 'cancellation'
  | 'wildlife-photography-expeditions'
  | 'couples-anniversary-galapagos'
  | 'family-friendly-ecuador'
  | 'tours'
  | 'destinations';

type Labels = Record<string, string>;

const LABELS: Record<PageKey, Labels> = {
  terms: {
    es: 'Términos y condiciones', en: 'Terms & Conditions', fr: 'Conditions générales',
    de: 'Allgemeine Geschäftsbedingungen', it: 'Termini e condizioni', pt: 'Termos e condições',
    ja: '利用規約', zh: '服务条款',
  },
  'privacy-policy': {
    es: 'Política de privacidad', en: 'Privacy Policy', fr: 'Politique de confidentialité',
    de: 'Datenschutzerklärung', it: 'Informativa sulla privacy', pt: 'Política de privacidade',
    ja: 'プライバシーポリシー', zh: '隐私政策',
  },
  cancellation: {
    es: 'Cancelaciones y reembolsos', en: 'Cancellation & Refunds', fr: 'Annulation et remboursement',
    de: 'Stornierung und Erstattung', it: 'Cancellazione e rimborso', pt: 'Cancelamento e reembolso',
    ja: 'キャンセル・返金', zh: '取消与退款',
  },
  'wildlife-photography-expeditions': {
    es: 'Fotografía de fauna', en: 'Wildlife photography', fr: 'Photographie animalière',
    de: 'Tierfotografie', it: 'Fotografia naturalistica', pt: 'Fotografia de vida selvagem',
    ja: '野生動物写真', zh: '野生动物摄影',
  },
  'couples-anniversary-galapagos': {
    es: 'Viajes románticos', en: 'Romantic getaways', fr: 'Séjours romantiques',
    de: 'Romantikreisen', it: 'Viaggi romantici', pt: 'Viagens românticas',
    ja: '記念日・ハネムーン', zh: '蜜月与浪漫之旅',
  },
  'family-friendly-ecuador': {
    es: 'Viajes en familia', en: 'Family travel', fr: 'Voyages en famille',
    de: 'Familienreisen', it: 'Viaggi in famiglia', pt: 'Viagens em família',
    ja: '家族旅行', zh: '亲子旅行',
  },
  tours: {
    es: 'Todos los tours', en: 'All tours', fr: 'Tous les circuits',
    de: 'Alle Reisen', it: 'Tutti i tour', pt: 'Todos os tours',
    ja: 'すべてのツアー', zh: '全部行程',
  },
  destinations: {
    es: 'Destinos', en: 'Destinations', fr: 'Destinations',
    de: 'Reiseziele', it: 'Destinazioni', pt: 'Destinos',
    ja: '目的地', zh: '目的地',
  },
};

const NAV_LABEL: Labels = {
  es: 'Páginas relacionadas', en: 'Related pages', fr: 'Pages associées',
  de: 'Verwandte Seiten', it: 'Pagine correlate', pt: 'Páginas relacionadas',
  ja: '関連ページ', zh: '相关页面',
};

const GROUPS: Record<'legal' | 'experiences', PageKey[]> = {
  legal: ['terms', 'privacy-policy', 'cancellation'],
  experiences: [
    'wildlife-photography-expeditions',
    'couples-anniversary-galapagos',
    'family-friendly-ecuador',
    'tours',
    'destinations',
  ],
};

interface RelatedPagesNavProps {
  locale: string;
  group: 'legal' | 'experiences';
  /** Pagina actual: se excluye de la lista para no enlazarse a si misma. */
  current: PageKey;
  /** `dark` para paginas con fondo oscuro fijo (legales); `adaptive` sigue el tema claro/oscuro. */
  tone?: 'dark' | 'adaptive';
}

/**
 * Enlaces internos entre paginas hermanas. Renderiza <a> reales con prefijo de idioma
 * (/{locale}/...) en el HTML inicial, sin encabezados, para repartir autoridad interna
 * y evitar paginas con un unico enlace entrante (aviso de Ahrefs).
 */
export function RelatedPagesNav({ locale, group, current, tone = 'adaptive' }: RelatedPagesNavProps) {
  const items = GROUPS[group].filter((key) => key !== current);
  const linkClass =
    tone === 'dark'
      ? 'text-emerald-400 hover:text-emerald-300'
      : 'text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300';

  return (
    <nav
      aria-label={NAV_LABEL[locale] || NAV_LABEL.en}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
        {items.map((key) => (
          <li key={key}>
            <Link href={`/${locale}/${key}`} className={`underline-offset-4 hover:underline ${linkClass}`}>
              {LABELS[key][locale] || LABELS[key].en}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
