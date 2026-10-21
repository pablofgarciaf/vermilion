export const SUPPORTED_SEO_LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'it', 'pt', 'ja'] as const;
export const BASE_CANONICAL_URL = 'https://www.vermilionroutes.com';

/**
 * Genera el conjunto canónico y de hreflang perfecto para cualquier ruta del sitio.
 * Garantiza:
 * 1. Dominio canónico con https://www.vermilionroutes.com
 * 2. Código de respuesta 200 directo (cero 301/308 redirects)
 * 3. Hreflang en los 8 idiomas soportados + x-default
 * 4. El canonical coincide exactamente con la versión del idioma actual
 */
export function getSeoAlternates(path: string, currentLocale: string) {
  const normalizedPath = path
    ? (path.startsWith('/') ? path : `/${path}`).replace(/\/$/, '')
    : '';

  const languages: Record<string, string> = {};
  for (const loc of SUPPORTED_SEO_LOCALES) {
    languages[loc] = `${BASE_CANONICAL_URL}/${loc}${normalizedPath}`;
  }
  languages['x-default'] = `${BASE_CANONICAL_URL}/en${normalizedPath}`;

  return {
    canonical: `${BASE_CANONICAL_URL}/${currentLocale}${normalizedPath}`,
    languages,
  };
}

export const DEFAULT_OG_IMAGE = `${BASE_CANONICAL_URL}/images/tours/16-9/galapagos-tortuga-gigante-rostro-16-9.webp`;

const OG_LOCALES: Record<string, string> = {
  es: 'es_LA',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_BR',
  ja: 'ja_JP',
  zh: 'zh_CN',
};

interface BuildOpenGraphInput {
  locale: string;
  /** Ruta sin idioma, ej. '/terms' o '/destinations/galapagos'. Debe ser la misma que se pasa a getSeoAlternates. */
  path: string;
  title: string;
  description: string;
  /** URL absoluta de la imagen. Por defecto, la imagen de marca (tortuga gigante). */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}

/**
 * Open Graph completo y consistente con el canonical.
 *
 * Next.js REEMPLAZA el objeto `openGraph` del layout cuando una pagina define el suyo
 * (no lo fusiona campo a campo), asi que cada pagina debe entregar url, siteName, type,
 * locale e images. Esta funcion garantiza que `og:url` sea siempre igual al canonical,
 * que es lo que auditan Ahrefs y Screaming Frog.
 */
export function buildOpenGraph({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
}: BuildOpenGraphInput) {
  return {
    title,
    description,
    url: getSeoAlternates(path, locale).canonical,
    siteName: 'Vermilion Routes',
    locale: OG_LOCALES[locale] || 'en_US',
    type,
    images: [
      {
        url: image,
        secureUrl: image,
        width: 1200,
        height: 630,
        alt: imageAlt || title,
      },
    ],
  } as NonNullable<import('next').Metadata['openGraph']>;
}

const CJK_CHAR = /[぀-ヿ㐀-鿿]/;
const SENTENCE_END = /[.!?。！？…]$/;
// En escritura latina exige espacio tras el punto (no parte "1.5" ni "24/7."); en CJK no hay espacios.
const SENTENCE_SPLIT = /(?<=[.!?])\s+|(?<=[。！？])/;

function terminateSentence(text: string): string {
  return SENTENCE_END.test(text) ? text : `${text}${CJK_CHAR.test(text) ? '。' : '.'}`;
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = CJK_CHAR.test(text) ? -1 : cut.lastIndexOf(' ');
  const base = space > max * 0.6 ? cut.slice(0, space) : cut;
  return `${base.replace(/[\s,;:、，]+$/, '')}…`;
}

/**
 * Compone una meta description dentro del rango recomendado (120-155 caracteres)
 * a partir de varias frases en orden de prioridad, sin modificar los datos de origen.
 * Anade frases completas mientras quepan; si la primera frase por si sola excede el
 * maximo, la recorta en un limite de palabra.
 */
export function fitMetaDescription(
  parts: Array<string | undefined | null>,
  min = 120,
  max = 155,
): string {
  const clean = parts
    .map((p) => (p || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  let out = '';
  for (const part of clean) {
    if (out.length >= min) break;
    for (const sentence of part.split(SENTENCE_SPLIT).filter(Boolean)) {
      if (out.length >= min) break;
      const candidate = out
        ? `${terminateSentence(out)}${CJK_CHAR.test(sentence) ? '' : ' '}${sentence}`
        : sentence;
      if (candidate.length <= max) {
        out = candidate;
      } else {
        if (out.length < min) out = candidate;
        break;
      }
    }
  }

  return truncateAtWord(out, max);
}

/**
 * Cierre de marca localizado. En chino y japones una frase de 40-70 caracteres es
 * completa pero queda por debajo del minimo que auditan Ahrefs/Screaming Frog;
 * esta cola la lleva al rango sin repetir contenido.
 */
const BRAND_META_TAIL: Record<string, string> = {
  es: 'Vermilion Routes: expediciones privadas a medida en Ecuador y Galápagos con asistencia personal 24/7.',
  en: 'Vermilion Routes: private bespoke expeditions in Ecuador and the Galapagos with personal 24/7 support.',
  fr: 'Vermilion Routes : expéditions privées sur mesure en Équateur et aux Galápagos, avec assistance 24/7.',
  de: 'Vermilion Routes: private Maßreisen in Ecuador und auf den Galápagos mit persönlicher 24/7-Betreuung.',
  it: 'Vermilion Routes: spedizioni private su misura in Ecuador e alle Galápagos con assistenza 24/7.',
  pt: 'Vermilion Routes: expedições privativas sob medida no Equador e em Galápagos com suporte 24/7.',
  ja: 'Vermilion Routesは、エクアドルとガラパゴス諸島でオーダーメイドのプライベート探検をご提案します。専任デザイナーが24時間体制でサポートします。行程は現地の専門チームが設計し、ガイドから手配まで一貫して対応します。',
  zh: 'Vermilion Routes 专注于厄瓜多尔与加拉帕戈斯的私人定制探险旅程。支持灵活调整行程、透明报价，并提供全天候 24/7 专属服务。行程由本地专家团队设计，每一步均配有向导与后勤保障。',
};

/** Devuelve la descripcion intacta si ya cumple el rango; si es corta le anade la cola de marca. */
export function withBrandTail(description: string, locale: string): string {
  const clean = description.replace(/\s+/g, ' ').trim();
  if (clean.length >= 110 && clean.length <= 155) return clean;
  return fitMetaDescription([clean, BRAND_META_TAIL[locale] || BRAND_META_TAIL.en]);
}
