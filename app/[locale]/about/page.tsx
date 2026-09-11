import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSeoAlternates } from '@/utils/seoHelper';
import { AboutGallerySection } from '@/components/about/AboutGallerySection';
import {
  Compass,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Users,
  HeartHandshake,
  Globe2,
  ArrowRight,
  Star
} from 'lucide-react';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'de' },
    { locale: 'it' },
    { locale: 'pt' },
    { locale: 'ja' },
    { locale: 'zh' },
  ];
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const TITLES: Record<string, string> = {
  es: 'Vermilion Routes | Sobre Nosotros y Expediciones VIP',
  en: 'Vermilion Routes | About Us & Bespoke Expeditions 24/7',
  fr: 'Vermilion Routes | À Propos & Expéditions Privées 24/7',
  de: 'Vermilion Routes | Über Uns & Luxus-Expeditionen 24/7',
  it: 'Vermilion Routes | Chi Siamo & Spedizioni di Lusso 24/7',
  pt: 'Vermilion Routes | Sobre Nós & Expedições de Luxo 24/7',
  ja: 'Vermilion Routes | 会社概要とガラパゴス特注遠征 24/7',
  zh: 'Vermilion Routes | 关于我们与加拉帕戈斯定制探险 24/7',
};

const DESCRIPTIONS: Record<string, string> = {
  es: 'Conozca la historia, guías naturalistas y filosofía boutique de Vermilion Routes. Expediciones a medida y confort en Galápagos y Ecuador 24/7.',
  en: 'Discover the heritage, naturalist guides, and bespoke nature philosophy of Vermilion Routes. Tailor-made expeditions in Galapagos and Ecuador 24/7.',
  fr: 'Découvrez l’histoire, les guides naturalistes et la philosophie de Vermilion Routes. Expéditions sur mesure aux Galápagos et en Équateur 24/7.',
  de: 'Erfahren Sie mehr über Vermilion Routes, unsere Naturführer und maßgeschneiderten Naturexpeditionen auf den Galápagos-Inseln und in Ecuador 24/7.',
  it: 'Scopri la storia, le guide naturalistiche e la filosofia su misura di Vermilion Routes. Spedizioni su misura e comfort alle Galápagos 24/7.',
  pt: 'Conheça a história, guias naturalistas e filosofia exclusiva da Vermilion Routes. Expedições sob medida em Galápagos e no Equador 24/7.',
  ja: '2005年設立のVermilion Routes。専任ナチュラリストガイド、24時間コンシェルジュによるガラパゴスとエクアドルの完全オーダーメイド自然遠征。',
  zh: '始于2005年的高端探险定制品牌Vermilion Routes。专属自然向导与24小时专属管家为您打造加拉帕戈斯及厄瓜多尔顶级自然旅程。',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = TITLES[locale] || TITLES.en;
  const description = DESCRIPTIONS[locale] || DESCRIPTIONS.en;

  return {
    title,
    description,
    alternates: getSeoAlternates('/about', locale),
    openGraph: {
      title,
      description,
      url: `https://www.vermilionroutes.com/${locale}/about`,
      siteName: 'Vermilion Routes',
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
      images: [
        {
          url: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
          secureUrl: 'https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'Vermilion Routes Bespoke Nature Expeditions',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@vermilionroutes',
      creator: '@vermilionroutes',
      title,
      description,
      images: ['https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg'],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  // Localized Content Dictionary for all 8 languages
  const I18N_CONTENT: Record<string, {
    h1: string;
    heroSubtitle: string;
    heroBadge: string;
    heritageHeading: string;
    heritageP1: string;
    heritageP2: string;
    pillarsHeading: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    hubsHeading: string;
    ecuadorHubTitle: string;
    ecuadorHubSubtitle: string;
    spainHubTitle: string;
    spainHubSubtitle: string;
    trustHeading: string;
    licenseLabel: string;
    licenseValue: string;
    ratingLabel: string;
    ratingValue: string;
    supportLabel: string;
    supportValue: string;
    ctaHeading: string;
    ctaSubtitle: string;
    ctaButton: string;
  }> = {
    es: {
      h1: "Sobre Nosotros y Expediciones Vermilion Routes",
      heroSubtitle: "Operador turístico boutique pionero en expediciones privadas de naturaleza y confort, conservación activa y diseño de itinerarios a medida en Ecuador y Galápagos desde 2005.",
      heroBadge: "Operador Boutique Certificado • Desde 2005",
      heritageHeading: "Nuestra Historia y Filosofía de Expedición",
      heritageP1: "Vermilion Routes nació con una convicción inquebrantable: los ecosistemas más extraordinarios del planeta no deben experimentarse de forma masiva ni superficial. Desde nuestro origen en Quito, hemos dedicado más de dos décadas a diseñar expediciones profundamente respetuosas con la vida silvestre, con una atención al detalle artesanal y con un ritmo verdaderamente pausado.",
      heritageP2: "Combinamos la exclusividad del servicio privado con el conocimiento científico de biólogos y guías naturalistas locales. Nuestro objetivo es que cada viajero regrese transformado, sintiéndose testigo y custodio de la maravilla natural.",
      pillarsHeading: "Los Tres Pilares de Nuestra Distinción",
      p1Title: "Guías Naturalistas Nivel III",
      p1Desc: "Expediciones lideradas exclusivamente por biólogos y naturalistas nativos certificados por el Parque Nacional Galápagos, con lectura experta del comportamiento animal.",
      p2Title: "Logística y Pacing a Medida",
      p2Desc: "Itinerarios sin prisas, catamaranes y yates boutique seleccionados a mano, y vehículos privados con agua de cortesía y amenidades exclusivas.",
      p3Title: "Regeneración y Pakari Experience",
      p3Desc: "Cada expedición incluye degustaciones de chocolate orgánico de origen y apoya directamente a artesanos locales y proyectos de conservación ecológica.",
      hubsHeading: "Nuestras Dos Sedes Internacionales",
      ecuadorHubTitle: "Sede Principal en Quito (Ecuador)",
      ecuadorHubSubtitle: "Centro neurálgico de operaciones de campo, coordinación de guías, logística aeroportuaria y asistencia en tiempo real 24/7.",
      spainHubTitle: "Sede Europea en Madrid (Coral Tour)",
      spainHubSubtitle: "Enlace directo con viajeros de Europa, asesoría personalizada en huso horario europeo y diseño previo de rutas exclusivas.",
      trustHeading: "Acreditaciones Oficiales y Respaldo",
      licenseLabel: "Registro Oficial de Turismo",
      licenseValue: "Ministerio de Turismo del Ecuador • RUC 1711992808001",
      ratingLabel: "Calificación de Viajeros",
      ratingValue: "5.0 / 5.0 (51 Reseñas Verificadas en TripAdvisor)",
      supportLabel: "Concierge Personal en Ruta",
      supportValue: "Soporte dedicado 24/7 vía WhatsApp y canal privado",
      ctaHeading: "¿Listo para Diseñar su Viaje a Medida?",
      ctaSubtitle: "Converse hoy mismo con un diseñador de expediciones y reciba una propuesta personalizada en menos de 24 horas.",
      ctaButton: "Contactar a un Diseñador de Viajes",
    },
    en: {
      h1: "About Vermilion Routes Bespoke Nature Expeditions",
      heroSubtitle: "Pioneering boutique tour operator crafting bespoke private nature expeditions, active conservation journeys, and tailor-made travel across Ecuador and the Galapagos since 2005.",
      heroBadge: "Certified Boutique Tour Operator • Since 2005",
      heritageHeading: "Our Heritage & Expedition Philosophy",
      heritageP1: "Vermilion Routes was founded on a simple conviction: the most fragile and wondrous ecosystems on Earth should never be experienced through hurried, mass tourism. Rooted in Quito, we have spent two decades perfecting private, respectful wildlife expeditions characterized by artisanal attention to detail and unhurried pacing.",
      heritageP2: "We marry boutique exclusivity with the deep scientific rigor of local naturalist biologists. Our goal is for every traveler to return profoundly transformed, having touched the pulse of evolution.",
      pillarsHeading: "The Three Pillars of Our Distinction",
      p1Title: "Level III Naturalist Guides",
      p1Desc: "Led exclusively by certified naturalist biologists born and raised in the islands, providing unparalleled insight into endemic wildlife behavior.",
      p2Title: "Bespoke Pacing & Private Charters",
      p2Desc: "No crowded buses or generic schedules. Handpicked boutique catamarans, private comfortable transfers, and itineraries customized to your rhythm.",
      p3Title: "Regeneration & Pakari Experience",
      p3Desc: "Every expedition features single-origin organic chocolate tastings and directly funds local artisan cooperatives and coastal conservation.",
      hubsHeading: "Our Two Global Headquarters",
      ecuadorHubTitle: "Quito Headquarters (Ecuador)",
      ecuadorHubSubtitle: "Field operations headquarters, naturalist guide coordination, seamless flight connections, and 24/7 en-route concierge.",
      spainHubTitle: "Madrid European Hub (Coral Tour)",
      spainHubSubtitle: "European concierge liaison, localized travel planning in European time zones, and tailored consultation for discerning international guests.",
      trustHeading: "Official Accreditations & Trust Signals",
      licenseLabel: "Official Tourism License",
      licenseValue: "Ecuador Ministry of Tourism • Tax ID (RUC) 1711992808001",
      ratingLabel: "Traveler Satisfaction Rating",
      ratingValue: "5.0 / 5.0 (51 Verified TripAdvisor Reviews)",
      supportLabel: "Dedicated Field Concierge",
      supportValue: "24/7 private WhatsApp specialist assistance on the ground",
      ctaHeading: "Ready to Craft Your Bespoke Journey?",
      ctaSubtitle: "Connect directly with our senior expedition designers to create your personalized itinerary within 24 hours.",
      ctaButton: "Connect with an Expedition Specialist",
    },
    fr: {
      h1: "À Propos des Expéditions Privées Vermilion Routes",
      heroSubtitle: "Voyagiste d'exception pionnier des expéditions privées haut de gamme et de la conservation en Équateur et aux îles Galápagos depuis 2005.",
      heroBadge: "Opérateur Boutique Certifié • Depuis 2005",
      heritageHeading: "Notre Histoire et Philosophie d'Expédition",
      heritageP1: "Vermilion Routes est né d'une conviction inaltérable : les écosystèmes les plus précieux de la planète méritent un voyage respectueux, loin du tourisme de masse. Depuis nos origines à Quito, nous concevons des voyages privés façonnés sur mesure.",
      heritageP2: "Nous associons le raffinement d'un service personnalisé à la rigueur scientifique de guides naturalistes passionnés.",
      pillarsHeading: "Les Trois Piliers de Notre Excellence",
      p1Title: "Guides Naturalistes Niveau III",
      p1Desc: "Expéditions guidées par des biologistes certifiés par le Parc National des Galápagos pour une immersion inégalée.",
      p2Title: "Rythme Sur Mesure et Yachts Privés",
      p2Desc: "Des catamarans d'exception, des transferts privés confortables et un itinéraire ajusté à vos envies.",
      p3Title: "Régénération & Expérience Pakari",
      p3Desc: "Dégustation de chocolat biologique d'origine et soutien concret aux communautés artisanales locales.",
      hubsHeading: "Nos Deux Pôles Internationaux",
      ecuadorHubTitle: "Siège de Quito (Équateur)",
      ecuadorHubSubtitle: "Centre logistique, coordination des guides et conciergerie 24/7 sur le terrain.",
      spainHubTitle: "Pôle Européen de Madrid (Coral Tour)",
      spainHubSubtitle: "Accompagnement dédié pour les voyageurs européens aux horaires locaux.",
      trustHeading: "Agréments Officiels et Notoriété",
      licenseLabel: "Licence Officielle de Tourisme",
      licenseValue: "Ministère du Tourisme de l'Équateur • RUC 1711992808001",
      ratingLabel: "Note des Voyageurs",
      ratingValue: "5,0 / 5,0 (51 avis vérifiés sur TripAdvisor)",
      supportLabel: "Conciergerie Dédiée 24/7",
      supportValue: "Assistance continue en temps réel durant tout votre séjour",
      ctaHeading: "Prêt à Créer Votre Voyage d'Exception ?",
      ctaSubtitle: "Échangez avec nos spécialistes pour recevoir votre itinéraire sur mesure sous 24 heures.",
      ctaButton: "Contacter un Spécialiste de Voyage",
    },
    de: {
      h1: "Über Vermilion Routes und Exklusive Expeditionen",
      heroSubtitle: "Pionier für maßgeschneiderte Luxusreisen, echten Naturschutz und individuelle Privatreisen auf den Galápagos-Inseln und in Ecuador seit 2005.",
      heroBadge: "Zertifizierter Boutique-Reiseveranstalter • Seit 2005",
      heritageHeading: "Unsere Geschichte & Philosophie",
      heritageP1: "Vermilion Routes entstand aus dem Anspruch, sensible Ökosysteme achtsam und ohne Massentourismus erlebbar zu machen. Mit Wurzeln in Quito gestalten wir seit zwei Jahrzehnten persönliche Reisen mit handverlesenen Details.",
      heritageP2: "Wir verbinden exklusiven Komfort mit fundierter Fachkompetenz einheimischer Naturforscher.",
      pillarsHeading: "Unsere Drei Leitprinzipien",
      p1Title: "Zertifizierte Naturführer Stufe III",
      p1Desc: "Erfahrene Biologen und vom Nationalpark Galápagos zertifizierte Guides bringen Ihnen die Tierwelt näher.",
      p2Title: "Individuelles Reisetempo & Privatcharter",
      p2Desc: "Handverlesene Luxuskatamarane, private Transfers und stressfreie Routen für höchste Privatsphäre.",
      p3Title: "Nachhaltigkeit & Pakari-Erlebnis",
      p3Desc: "Verkostung bester Bioschokolade und direkte Förderung lokaler Naturschutzprojekte.",
      hubsHeading: "Unsere Zwei Internationalen Standorte",
      ecuadorHubTitle: "Hauptsitz in Quito (Ecuador)",
      ecuadorHubSubtitle: "Operative Zentrale, Guides-Koordination und 24/7 Vor-Ort-Betreuung.",
      spainHubTitle: "Europa-Büro in Madrid (Coral Tour)",
      spainHubSubtitle: "Persönliche Reiseberatung in europäischen Zeitzonen für anspruchsvolle Gäste.",
      trustHeading: "Offizielle Zertifizierungen & Bewertungen",
      licenseLabel: "Offizielle Tourismuslizenz",
      licenseValue: "Tourismusministerium Ecuador • Steuernummer 1711992808001",
      ratingLabel: "Gästebewertung",
      ratingValue: "5.0 / 5.0 (51 verifizierte TripAdvisor-Bewertungen)",
      supportLabel: "VIP-Concierge Vor Ort",
      supportValue: "Engagierte 24/7 Betreuung via WhatsApp während Ihrer gesamten Reise",
      ctaHeading: "Bereit für Ihre Traumreise?",
      ctaSubtitle: "Sprechen Sie mit unseren Reiseexperten und erhalten Sie binnen 24 Stunden Ihr individuelles Angebot.",
      ctaButton: "Expeditionsexperten Kontaktieren",
    },
    it: {
      h1: "Chi Siamo e Spedizioni Esclusive Vermilion Routes",
      heroSubtitle: "Operatore boutique pionieristico specializzato in viaggi privati su misura, conservazione attiva e lusso autentico in Ecuador e Galápagos dal 2005.",
      heroBadge: "Operatore Boutique Certificato • Dal 2005",
      heritageHeading: "La Nostra Storia e Filosofia",
      heritageP1: "Vermilion Routes nasce dalla convinzione che le meraviglie della Terra debbano essere scoperte con profondo rispetto, senza fretta e lontano dal turismo di massa.",
      heritageP2: "Uniamo esclusività sartoriale alla conoscenza scientifica di guide naturaliste indigene certificate.",
      pillarsHeading: "I Tre Pilastri della Nostra Eccellenza",
      p1Title: "Guide Naturaliste Livello III",
      p1Desc: "Biologi certificati dal Parco Nazionale Galápagos per una lettura profonda degli habitat.",
      p2Title: "Ritmo Sartoriale e Yacht Privati",
      p2Desc: "Catamarani boutique d'eccezione, trasferimenti riservati e orari plasmati sulle vostre esigenze.",
      p3Title: "Rigenerazione e Gusto Pakari",
      p3Desc: "Assaggio di cioccolato biologico monorigine e sostegno concreto alle comunità artigiane.",
      hubsHeading: "Le Nostre Due Sedi nel Mondo",
      ecuadorHubTitle: "Sede Centrale a Quito (Ecuador)",
      ecuadorHubSubtitle: "Base operativa di campo, coordinamento guide e assistenza 24/7 durante il viaggio.",
      spainHubTitle: "Polo Europeo a Madrid (Coral Tour)",
      spainHubSubtitle: "Consulenza dedicata per i viaggiatori europei in fuso orario continentale.",
      trustHeading: "Certificazioni Ufficiali e Fiducia",
      licenseLabel: "Licenza Turistica Ufficiale",
      licenseValue: "Ministero del Turismo dell'Ecuador • RUC 1711992808001",
      ratingLabel: "Valutazione dei Viaggiatori",
      ratingValue: "5.0 / 5.0 (51 Recensioni Verificate TripAdvisor)",
      supportLabel: "Assistenza Concierge VIP",
      supportValue: "Supporto WhatsApp 24/7 dedicato durante tutto il tragitto",
      ctaHeading: "Pronto a Disegnare la Tua Spedizione?",
      ctaSubtitle: "Contatta i nostri travel designer e ricevi una proposta su misura in meno di 24 ore.",
      ctaButton: "Parla con uno Specialista",
    },
    pt: {
      h1: "Sobre a Vermilion Routes e Expedições Exclusivas",
      heroSubtitle: "Operador turístico boutique pioneiro em viagens privadas sob medida, conservação ativa e experiências de luxo nas Galápagos e no Equador desde 2005.",
      heroBadge: "Operador Boutique Certificado • Desde 2005",
      heritageHeading: "Nossa História e Filosofia de Viagem",
      heritageP1: "A Vermilion Routes nasceu com a missão de proporcionar expedições autênticas e respeitosas, totalmente distantes do turismo de massa.",
      heritageP2: "Combinamos o conforto de serviços privativos com a paixão e rigor de guias naturalistas locais.",
      pillarsHeading: "Os Três Pilares de Nossa Excelência",
      p1Title: "Guias Naturalistas Nível III",
      p1Desc: "Biólogos e naturalistas certificados pelo Parque Nacional Galápagos.",
      p2Title: "Ritmo Personalizado e Catamarãs Privados",
      p2Desc: "Logística impecável com veículos privativos e embarcações boutique selecionadas.",
      p3Title: "Regeneração e Experiência Pakari",
      p3Desc: "Degustações de chocolate orgânico e incentivo direto a cooperativas artesanais locais.",
      hubsHeading: "Nossas Duas Sedes Internacionais",
      ecuadorHubTitle: "Sede Central em Quito (Equador)",
      ecuadorHubSubtitle: "Coordenação de operações de campo, logística e suporte dedicado 24/7.",
      spainHubTitle: "Sede Europeia em Madri (Coral Tour)",
      spainHubSubtitle: "Atendimento personalizado para viajantes da Europa em fuso horário local.",
      trustHeading: "Registros Oficiais e Confiança",
      licenseLabel: "Registro Oficial de Turismo",
      licenseValue: "Ministério do Turismo do Equador • RUC 1711992808001",
      ratingLabel: "Avaliação dos Viajantes",
      ratingValue: "5.0 / 5.0 (51 Avaliações Verificadas no TripAdvisor)",
      supportLabel: "Concierge Especializado",
      supportValue: "Atendimento dedicado 24/7 via WhatsApp durante toda a rota",
      ctaHeading: "Pronto para Criar Sua Expedição?",
      ctaSubtitle: "Converse com nossos especialistas e receba um roteiro personalizado em até 24 horas.",
      ctaButton: "Falar com um Especialista",
    },
    ja: {
      h1: "Vermilion Routes 会社概要とガラパゴス特注遠征",
      heroSubtitle: "2005年設立。ガラパゴス諸島とエクアドル本土を巡る完全プライベート特注豪華遠征、自然保護ツーリズムのパイオニア。",
      heroBadge: "公認ブティック旅行会社 • 2005年創設",
      heritageHeading: "歴史と遠征哲学",
      heritageP1: "Vermilion Routesは、地球上で最も貴重な生態系を大量消費的な観光ではなく、深く敬意を払ったプライベートな旅で体験していただきたいという想いから設立されました。",
      heritageP2: "専任ナチュラリストガイドの高度な科学的知見と、上質なブティックホテルやプライベートカタマランの快適さを融合させています。",
      pillarsHeading: "私たちが誇る3つの柱",
      p1Title: "レベルIII公認ナチュラリストガイド",
      p1Desc: "ガラパゴス国立公園公式認定の生物学者が同行し、固有種の生態を深く解説。",
      p2Title: "完全オーダーメイドの旅程設計",
      p2Desc: "混雑を避けた静かな航路、贅沢なプライベート専用車と厳選ブティック船。",
      p3Title: "環境再生とパカリ体験",
      p3Desc: "有機カカオのテイスティングと、地元先住民族コミュニティへの直接支援。",
      hubsHeading: "世界2大拠点ネットワーク",
      ecuadorHubTitle: "キト本部（エクアドル）",
      ecuadorHubSubtitle: "現地オペレーション総括、専任ガイド配備、24時間オンサイトサポート。",
      spainHubTitle: "マドリード欧州拠点（Coral Tour）",
      spainHubSubtitle: "ヨーロッパの旅行者様向け相談窓口、時差のないスムーズなプランニング。",
      trustHeading: "公式認定と信頼の実績",
      licenseLabel: "公式観光省登録",
      licenseValue: "エクアドル観光省公式認定 • 納税者番号 RUC 1711992808001",
      ratingLabel: "旅行者評価",
      ratingValue: "5.0 / 5.0（TripAdvisor 51件の認証済みレビュー）",
      supportLabel: "専属24時間コンシェルジュ",
      supportValue: "滞在中いつでもWhatsApp等で日本語・英語にて迅速サポート",
      ctaHeading: "あなただけの特別な旅を創りませんか？",
      ctaSubtitle: "専任の遠征デザイナーが24時間以内にオーダーメイドの旅程をご提案いたします。",
      ctaButton: "遠征スペシャリストに相談する",
    },
    zh: {
      h1: "Vermilion Routes 官方品牌档案与定制探险",
      heroSubtitle: "始于2005年，专注于厄瓜多尔与加拉帕戈斯群岛的顶级私人定制奢华探险、深度生态保育与极致私密行程设计。",
      heroBadge: "官方认证精品探险营运商 • 始于2005",
      heritageHeading: "品牌传承与探险哲学",
      heritageP1: "Vermilion Routes秉持对地球脆弱生态的至深敬畏，致力于彻底摒弃走马观花式的传统大众旅游，专注打造兼具深度科考价值与顶级舒适享受的私人定制远征。",
      heritageP2: "我们将精品奢华服务与驻地自然学者生物学家的深厚造诣融为一体，让每一次抵达都成为直击心灵的生命探索。",
      pillarsHeading: "卓越品质的三大核心支柱",
      p1Title: "三级国家公园认证自然向导",
      p1Desc: "由加拉帕戈斯国家公园官方认证的高级学者向导带队，解读奇妙生命演化史。",
      p2Title: "专属私人巡航与定制节奏",
      p2Desc: "严选顶级精品双体帆船与游艇，全程专车专导，时间完全由您掌控。",
      p3Title: "生态再生与帕卡里庄园体验",
      p3Desc: "品鉴顶级单一产区有机巧克力，收益直接反哺当地自然保护区与原住民工坊。",
      hubsHeading: "全球双运营中心枢纽",
      ecuadorHubTitle: "厄瓜多尔基多全球总部",
      ecuadorHubSubtitle: "驻地运营指挥中心、向导调度、机场贵宾通道协调及24/7全天候管家服务。",
      spainHubTitle: "西班牙马德里欧洲分部 (Coral Tour)",
      spainHubSubtitle: "面向欧美高端贵宾的本地化时区尊享咨询与定制行程设计。",
      trustHeading: "官方资质与信誉背书",
      licenseLabel: "官方旅游资质",
      licenseValue: "厄瓜多尔旅游部官方注册编号 • RUC 1711992808001",
      ratingLabel: "旅行者卓越评价",
      ratingValue: "5.0 / 5.0 (猫途鹰TripAdvisor 51条真实满分好评)",
      supportLabel: "行中专属私人管家",
      supportValue: "旅途全程提供专属WhatsApp私人联络通道与24/7多语种保障",
      ctaHeading: "开启专属于您的极致私享之旅",
      ctaSubtitle: "即刻与我们的资深远征设计师沟通，24小时内为您量身定制专属方案。",
      ctaButton: "预约资深探险旅行顾问",
    },
  };

  const t = I18N_CONTENT[locale] || I18N_CONTENT.en;

  // JSON-LD Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t.h1,
    "description": DESCRIPTIONS[locale] || DESCRIPTIONS.en,
    "url": `https://www.vermilionroutes.com/${locale}/about`,
    "mainEntity": {
      "@type": "TravelAgency",
      "name": "Vermilion Routes - Agencia de Viajes Vermilion",
      "legalName": "Agencia de Viajes Vermilion",
      "foundingDate": "2005",
      "taxID": "1711992808001",
      "telephone": "+593994048458",
      "email": "info@vermilionroutes.com",
      "url": "https://www.vermilionroutes.com",
      "image": "https://www.vermilionroutes.com/images/tours/16-9/galapagos-tortuga-gigante-16-9.jpg",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Monteserrín, De los Lirios N45-206 y Julio Arellano, Tercer Piso",
          "addressLocality": "Quito",
          "postalCode": "170503",
          "addressCountry": "EC"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Calle Seco 3",
          "addressLocality": "Madrid",
          "postalCode": "28007",
          "addressCountry": "ES"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "51",
        "bestRating": "5"
      },
      "award": "TripAdvisor Travelers' Choice 2026"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Schema.org Injected */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="/images/tours/16-9/galapagos-baltra-island-16-9.jpg"
            alt="Galapagos Seascape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-emerald-950/50">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight leading-tight">
            {t.h1}
          </h1>

          <p className="text-zinc-300 text-base sm:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs sm:text-sm text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Ministerio de Turismo No. 1793215456001</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>TripAdvisor Travelers&apos; Choice (5.0/5.0)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Soporte 24/7 En Ruta</span>
            </span>
          </div>
        </div>
      </section>

      {/* HERITAGE & ORIGIN SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Our Heritage Since 2005</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {t.heritageHeading}
            </h2>
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>{t.heritageP1}</p>
              <p>{t.heritageP2}</p>
            </div>
            <div className="pt-2 flex items-center gap-6">
              <div>
                <div className="text-3xl font-serif font-bold text-emerald-400">20+</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wide mt-1">Years of Crafting Journeys</div>
              </div>
              <div className="h-10 w-px bg-zinc-800" />
              <div>
                <div className="text-3xl font-serif font-bold text-emerald-400">51</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wide mt-1">Verified 5.0 Reviews</div>
              </div>
              <div className="h-10 w-px bg-zinc-800" />
              <div>
                <div className="text-3xl font-serif font-bold text-emerald-400">100%</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wide mt-1">Private &amp; Carbon Neutral</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/tours/16-9/galapagos-lobo-marino-16-9.jpg"
                  alt="Sea Lions and Naturalist Guide in Galapagos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800">
                <p className="text-xs text-zinc-400 italic">
                  &ldquo;We don&apos;t just guide trips; we safeguard the timeless wonder of these islands for future generations.&rdquo;
                </p>
                <p className="text-xs text-emerald-400 font-semibold mt-2">
                  — Vermilion Expedition Naturalist Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 PILLARS SECTION */}
      <section className="py-16 bg-zinc-900/50 border-y border-zinc-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Excellence Standard</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {t.pillarsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-7 space-y-4 transition-all hover:shadow-xl hover:shadow-emerald-950/30">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                {t.p1Title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t.p1Desc}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-7 space-y-4 transition-all hover:shadow-xl hover:shadow-emerald-950/30">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                {t.p2Title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t.p2Desc}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-7 space-y-4 transition-all hover:shadow-xl hover:shadow-emerald-950/30">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                {t.p3Title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t.p3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL GLOBAL HUBS SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>Dual Global Presence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t.hubsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ecuador HQ Card */}
          <div className="bg-zinc-900/80 border border-emerald-900/60 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
                Headquarters (Ecuador)
              </span>
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">
                {t.ecuadorHubTitle}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t.ecuadorHubSubtitle}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Monteserrín, De los Lirios N45-206 y Julio Arellano, Tercer Piso, Quito (CP 170503)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+593994048458" className="hover:text-white transition-colors">
                  +593-994-048-458
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <span>info</span><span className="text-emerald-400">&#64;</span><span>vermilionroutes.com</span>
                </span>
              </p>
            </div>
          </div>

          {/* Spain Hub Card */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
                European Hub (Coral Tour)
              </span>
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">
                {t.spainHubTitle}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {t.spainHubSubtitle}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Calle Seco 3, 28007 Madrid, España</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+593994048458" className="hover:text-white transition-colors">
                  +593-994-048-458 (Direct WhatsApp VIP)
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>CET Timezone Consultations (09:00 - 19:00)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTOGRAPHY SHOWCASE SECTION */}
      <section className="py-16 bg-zinc-900/40 border-y border-zinc-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AboutGallerySection locale={locale} />
        </div>
      </section>

      {/* TRUST & ACCREDITATIONS SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-zinc-900 border border-emerald-800/50 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified &amp; Verified</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {t.trustHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-800">
            <div className="space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">{t.licenseLabel}</span>
              <p className="text-sm sm:text-base font-medium text-white">{t.licenseValue}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">{t.ratingLabel}</span>
              <p className="text-sm sm:text-base font-medium text-amber-400">{t.ratingValue}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-semibold">{t.supportLabel}</span>
              <p className="text-sm sm:text-base font-medium text-emerald-400">{t.supportValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          {t.ctaHeading}
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.ctaSubtitle}
        </p>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/593994048458"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-950/50"
          >
            <span>{t.ctaButton}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 border border-zinc-700"
          >
            <span>Explore Tour Packages</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
