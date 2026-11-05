'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ShieldCheck,
  Award,
  Sparkles,
  Globe
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { useLocale } from 'next-intl';
import { getLocalizedText } from '@/utils/i18nHelper';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

import {
  TRIPADVISOR_REVIEW_COUNT,
  TRIPADVISOR_URL,
  MINTUR_LICENSE_NUMBER,
  US_CONCIERGE_PHONE,
  EC_WHATSAPP_PHONE,
  EC_OFFICE_PHONE,
} from '@/data/bookingTerms';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    topDestinations: "Top Destinations", galapagos: "Galapagos Islands", ecuador: "Mainland Ecuador", fullDay: "Full Day Excursions", amazon: "Ecuadorian Amazon", volcanoes: "Avenue of Volcanoes",
    company: "Company", about: "About Us", packages: "Tour Packages", contact: "Contact Specialist",
    updates: "Get Travel Updates", subscribeText: "Subscribe for curated Galapagos cruise promotions and bespoke Ecuador expedition guides.", emailPlaceholder: "Your email address", subscribeBtn: "Subscribe",
    licensed: "Fully Licensed & Certified Tour Operator in Ecuador & Galapagos", support: "24/7 Dedicated Trip Specialist Support En Route", secure: "Secure Bookings & 100% Satisfaction Guarantee",
    privacy: "Privacy Policy", terms: "Terms of Service",
    footerDescription: "Premier boutique tour operator specializing in custom-crafted luxury itineraries across Ecuador and the Galapagos Islands.",
    paymentVerified: "Verified & Protected Payment Methods",
    paymentHeading: "Secure Checkout & Protected Deposits",
    paymentDesc: "Official PayPal Protected Checkout, direct Citibank (USA) wire transfers, Zelle payments, and Banco Produbanco. Fully backed by official booking guarantees and certified travel vouchers.",
    badgePayPal: "PayPal Protected Checkout",
    badgeCitibank: "Citibank USA & Zelle",
    badgeProdubanco: "Banco Produbanco Official",
    badgeSSL: "SSL 256-Bit Encrypted",
    affiliateProgram: "Affiliate Program",
    officeReservations: "Office / Reservations:",
    hqEcuador: "Ecuador Headquarters (HQ)",
    officeSpain: "Spain Branch (Coral Tour)",
    internationalLanguages: "International / Languages:",
    usConcierge: "US Direct Line / SMS:",
    bilingualOperators: "Our Ecuador tour leaders are 100% bilingual in English with official tourism licenses, backed by dedicated care in the US.",
    sealTripAdvisor: "TripAdvisor 5.0 (52 Verified Reviews)",
    sealMintur: "Official Mintur License #1793215456001",
    sealDepositGuarantee: "100% Deposit Protection Guarantee"
  },
  es: {
    topDestinations: "Destinos Principales", galapagos: "Islas Galápagos", ecuador: "Ecuador Continental", fullDay: "Excursiones Full Day", amazon: "Amazonía Ecuatoriana", volcanoes: "Avenida de los Volcanes",
    company: "Empresa", about: "Sobre Nosotros", packages: "Paquetes Turísticos", contact: "Contactar Especialista",
    updates: "Recibe Novedades", subscribeText: "Suscríbete para recibir promociones exclusivas y guías de viaje seleccionadas.", emailPlaceholder: "Tu correo electrónico", subscribeBtn: "Suscribirse",
    licensed: "Operador Turístico Certificado en Ecuador y Galápagos", support: "Soporte Especializado 24/7 Durante el Viaje", secure: "Reservas Seguras y Satisfacción Garantizada al 100%",
    privacy: "Política de Privacidad", terms: "Términos de Servicio",
    footerDescription: "Operador turístico boutique especializado en itinerarios de viaje luxury a medida por las maravillas de Ecuador y Galápagos.",
    paymentVerified: "Métodos de Pago Verificados y Protegidos",
    paymentHeading: "Pago Seguro y Depósito Protegido",
    paymentDesc: "Pago protegido oficial vía PayPal, transferencias directas con Citibank (EE.UU.), transferencias Zelle y Banco Produbanco. Garantía oficial de viaje y comprobantes certificados.",
    badgePayPal: "Protección al Comprador PayPal",
    badgeCitibank: "Citibank EE.UU. & Zelle",
    badgeProdubanco: "Banco Produbanco Oficial",
    badgeSSL: "Encriptación SSL 256 Bits",
    affiliateProgram: "Programa de Afiliados",
    officeReservations: "Oficina / Reservas:",
    hqEcuador: "Sede Ecuador (HQ)",
    officeSpain: "Sede España (Coral Tour)",
    internationalLanguages: "Internacional / Idiomas:",
    usConcierge: "Línea Directa EE.UU. / SMS:",
    bilingualOperators: "Nuestros operadores en Ecuador son 100% bilingües en inglés con licencia turística oficial y soporte de atención en EE.UU.",
    sealTripAdvisor: "TripAdvisor 5.0 (52 Verified Reviews)",
    sealMintur: "Licencia Oficial Mintur #1793215456001",
    sealDepositGuarantee: "100% Deposit Protection Guarantee"
  },
  fr: {
    topDestinations: "Meilleures Destinations", galapagos: "Îles Galapagos", ecuador: "Équateur Continental", fullDay: "Excursions Full Day", amazon: "Amazonie Équatorienne", volcanoes: "Avenue des Volcans",
    company: "Entreprise", about: "À Propos", packages: "Forfaits", contact: "Contacter un Spécialiste",
    updates: "Actualités", subscribeText: "Abonnez-vous pour recevoir des promotions de croisières et des guides de voyage.", emailPlaceholder: "Votre e-mail", subscribeBtn: "S'abonner",
    licensed: "Voyagiste Certifié en Équateur et aux Galapagos", support: "Assistance Spécialisée 24/7", secure: "Réservations Sécurisées et Satisfaction Garantie",
    privacy: "Confidentialité", terms: "Conditions",
    footerDescription: "Voyagiste boutique de premier ordre spécialisé dans les itinéraires de voyage haut de gamme sur mesure à travers l'Équateur et les Galapagos.",
    paymentVerified: "Moyens de Paiement Vérifiés & Protégés",
    paymentHeading: "Paiement Sécurisé & Protection PayPal",
    paymentDesc: "Paiement officiel sécurisé par PayPal, virements bancaires officiels Citibank (USA), Zelle et Banco Produbanco. Garantie officielle et bons de voyage certifiés.",
    badgePayPal: "Paiement Protégé PayPal",
    badgeCitibank: "Citibank USA & Zelle",
    badgeProdubanco: "Banco Produbanco Officiel",
    badgeSSL: "Crypté SSL 256 Bits",
    affiliateProgram: "Programme d'Affiliation",
    officeReservations: "Bureau / Réservations:",
    hqEcuador: "Siège Équateur (HQ)",
    officeSpain: "Filiale Espagne (Coral Tour)",
    internationalLanguages: "International / Langues:",
    usConcierge: "Ligne Directe USA / SMS :",
    bilingualOperators: "Nos opérateurs en Équateur sont 100% bilingues en anglais avec licence touristique officielle et support aux États-Unis.",
    sealTripAdvisor: "TripAdvisor 5.0 (52 Avis Vérifiés)",
    sealMintur: "Licence Officielle Mintur #1793215456001",
    sealDepositGuarantee: "Garantie de Dépôt Protégé à 100%"
  },
  de: {
    topDestinations: "Top-Reiseziele", galapagos: "Galapagos-Inseln", ecuador: "Ecuador Festland", fullDay: "Tagesausflüge (Full Day)", amazon: "Ecuadorianischer Amazonas", volcanoes: "Straße der Vulkane",
    company: "Unternehmen", about: "Über Uns", packages: "Reisepakete", contact: "Kontaktieren",
    updates: "Reise-Updates", subscribeText: "Abonnieren Sie für exklusive Kreuzfahrt-Angebote und Reiseführer.", emailPlaceholder: "Ihre E-Mail", subscribeBtn: "Abonnieren",
    licensed: "Zertifizierter Reiseveranstalter in Ecuador & Galapagos", support: "24/7 Spezialisten-Support auf der Reise", secure: "Sichere Buchungen & 100% Zufriedenheitsgarantie",
    privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen",
    footerDescription: "Boutique-Reiseveranstalter, spezialisiert auf maßgeschneiderte Premium-Reiserouten zu den kultigsten Wunderwelten von Ecuador und Galapagos.",
    paymentVerified: "Verifizierte & Geschützte Zahlungsmethoden",
    paymentHeading: "Sicherer Checkout & Schutzgarantie",
    paymentDesc: "Offizieller PayPal-Käuferschutz, offizielle Citibank (USA) Überweisungen, Zelle und Banco Produbanco. Offizielle Garantie und Reisezertifikate.",
    badgePayPal: "PayPal Käuferschutz",
    badgeCitibank: "Citibank USA & Zelle",
    badgeProdubanco: "Banco Produbanco Offiziell",
    badgeSSL: "SSL 256-Bit-Verschlüsselung",
    affiliateProgram: "Partnerprogramm",
    officeReservations: "Büro / Reservierungen:",
    hqEcuador: "Hauptsitz Ecuador (HQ)",
    officeSpain: "Niederlassung Spanien (Coral Tour)",
    internationalLanguages: "International / Sprachen:",
    usConcierge: "USA Direktleitung / SMS:",
    bilingualOperators: "Unsere Expeditionsleiter in Ecuador sind zu 100% zweisprachig (Englisch) mit offizieller Lizenz und Betreuungsservice in den USA.",
    sealTripAdvisor: "TripAdvisor 5.0 (52 Verifizierte Bewertungen)",
    sealMintur: "Offizielle Mintur-Lizenz #1793215456001",
    sealDepositGuarantee: "100% Anzahlungsschutz-Garantie"
  },
  it: {
    topDestinations: "Destinazioni Top", galapagos: "Isole Galapagos", ecuador: "Ecuador Continentale", fullDay: "Escursioni Full Day", amazon: "Amazzonia Ecuadoriana", volcanoes: "Viale dei Vulcani",
    company: "Azienda", about: "Chi Siamo", packages: "Pacchetti", contact: "Contatta",
    updates: "Aggiornamenti", subscribeText: "Iscriviti per ricevere promozioni per crociere e guide di viaggio.", emailPlaceholder: "La tua email", subscribeBtn: "Iscriviti",
    licensed: "Tour Operator Certificato in Ecuador e Galapagos", support: "Assistenza Specializzata 24/7", secure: "Prenotazioni Sicure e Soddisfazione Garantita",
    privacy: "Privacy", terms: "Termini",
    footerDescription: "Tour operator boutique di alto livello specializzato in itinerari di viaggio premium su misura attraverso le meraviglie di Ecuador e Galapagos.",
    paymentVerified: "Metodi di Pagamento Verificati e Protetti",
    paymentHeading: "Pagamento Sicuro & Garanzia PayPal",
    paymentDesc: "Pagamenti ufficiali protetti tramite PayPal, bonifici ufficiali Citibank (USA), Zelle e Banco Produbanco. Garanzia ufficiale e voucher certificati.",
    badgePayPal: "Protezione Acquirenti PayPal",
    badgeCitibank: "Citibank USA & Zelle",
    badgeProdubanco: "Banco Produbanco Ufficiale",
    badgeSSL: "Crittografia SSL a 256 Bit",
    affiliateProgram: "Programma di Affiliazione",
    officeReservations: "Ufficio / Prenotazioni:",
    hqEcuador: "Sede Ecuador (HQ)",
    officeSpain: "Sede Spagna (Coral Tour)",
    internationalLanguages: "Internazionale / Lingue:",
    usConcierge: "Linea Diretta USA / SMS:",
    bilingualOperators: "I nostri operatori in Ecuador sono al 100% bilingui in inglese con licenza turistica ufficiale e supporto dedicato negli Stati Uniti.",
    sealTripAdvisor: "TripAdvisor 5.0 (52 Recensioni Verificate)",
    sealMintur: "Licenza Ufficiale Mintur #1793215456001",
    sealDepositGuarantee: "Garanzia Protezione Deposito al 100%"
  },
  pt: {
    topDestinations: "Principais Destinos", galapagos: "Ilhas Galápagos", ecuador: "Equador Continental", fullDay: "Excursões Full Day", amazon: "Amazônia Equatoriana", volcanoes: "Avenida dos Vulcões",
    company: "Empresa", about: "Sobre Nós", packages: "Pacotes", contact: "Contatar",
    updates: "Atualizaciones", subscribeText: "Inscreva-se para receber promoções de cruzeiros e guias de viagem.", emailPlaceholder: "Seu e-mail", subscribeBtn: "Inscrever-se",
    licensed: "Operador Turístico Certificado no Equador e Galápagos", support: "Suporte Especializado 24/7", secure: "Reservas Seguras e 100% de Satisfação Garantida",
    privacy: "Privacidade", terms: "Termos",
    footerDescription: "Operador turístico boutique especializado em itinerários de viagem premium sob medida pelas maravilhas mais icônicas do Equador e Galápagos.",
    paymentVerified: "Métodos de Pagamento Verificados e Protegidos",
    paymentHeading: "Checkout Seguro e Proteção PayPal",
    paymentDesc: "Aceitamos pagamentos protegidos oficiais via PayPal, transferências oficiais Citibank (EUA), Zelle e Banco Produbanco. Garantia oficial e vouchers certificados.",
    badgePayPal: "Proteção ao Comprador PayPal",
    badgeCitibank: "Citibank EUA & Zelle",
    badgeProdubanco: "Banco Produbanco Oficial",
    badgeSSL: "Criptografia SSL de 256 Bits",
    affiliateProgram: "Programa de Afiliados",
    officeReservations: "Escritório / Reservas:",
    hqEcuador: "Sede Equador (HQ)",
    officeSpain: "Sede Espanha (Coral Tour)",
    internationalLanguages: "Internacional / Idiomas:",
    usConcierge: "Linha Direta EUA / SMS:",
    bilingualOperators: "Nossos operadores no Equador são 100% bilíngues em inglês com licença turística oficial e suporte dedicado nos Estados Unidos.",
    sealTripAdvisor: "TripAdvisor 5.0 (52 Avaliações Verificadas)",
    sealMintur: "Licença Oficial Mintur #1793215456001",
    sealDepositGuarantee: "Garantia de Depósito 100% Protegido"
  },
  ja: {
    topDestinations: "人気の目的地", galapagos: "ガラパゴス諸島", ecuador: "エクアドル本土", fullDay: "日帰りツアー（Full Day）", amazon: "エクアドル・アマゾン", volcanoes: "火山の道",
    company: "会社概要", about: "私たちについて", packages: "ツアープラン", contact: "連絡する",
    updates: "最新情報", subscribeText: "クルーズのプロモーションや旅行ガイドを受け取るために購読してください。", emailPlaceholder: "メールアドレス", subscribeBtn: "購読する",
    licensed: "エクアドルとガラパゴスの認定旅行会社", support: "24時間365日の専門家サポート", secure: "安全な予約と100%の満足保証",
    privacy: "プライバシーポリシー", terms: "利用規約",
    footerDescription: "エクアドルとガラパゴスの象徴的な見どころを巡るオーダーメイドのプレミアム旅行を専門とするブティック旅行会社です。",
    paymentVerified: "認証済み安全な決済方法",
    paymentHeading: "安全な暗号化チェックアウト＆保証",
    paymentDesc: "公式PayPal買い手保護決済、米国Citibank公式送金、Zelle、Produbanco銀行送金に対応。公式保証および正規旅行バウチャーを発行します。",
    badgePayPal: "PayPal 公式買い手保護",
    badgeCitibank: "米国シティバンク & Zelle",
    badgeProdubanco: "エクアドル Produbanco 銀行",
    badgeSSL: "256ビット SSL 暗号化保護",
    affiliateProgram: "アフィリエイト・プログラム",
    officeReservations: "オフィス / 予約:",
    hqEcuador: "エクアドル本社 (HQ)",
    officeSpain: "スペイン支社 (Coral Tour)",
    internationalLanguages: "グローバル / 言語を選択:",
    usConcierge: "米国直通ライン / SMS:",
    bilingualOperators: "エクアドルの現地オペレーターは全員、公認観光ライセンスを保持する英語完全対応ガイドであり、米国サポートデスクと連携しています。",
    sealTripAdvisor: "TripAdvisor 5.0 (52件の認証済みレビュー)",
    sealMintur: "エクアドル観光省公式認定 #1793215456001",
    sealDepositGuarantee: "100%手付金保護保証制度"
  },
  zh: {
    topDestinations: "热门目的地", galapagos: "加拉帕戈斯群岛", ecuador: "厄瓜多尔大陆", fullDay: "全天一日游", amazon: "厄瓜多尔亚马逊", volcanoes: "火山大道",
    company: "公司信息", about: "关于我们", packages: "旅游套餐", contact: "联系专家",
    updates: "获取旅游更新", subscribeText: "订阅以接收游轮促销活动和精选旅游指南。", emailPlaceholder: "您的电子邮箱", subscribeBtn: "订阅",
    licensed: "厄瓜多尔和加拉帕戈斯的认证旅行社", support: "24/7 专业旅行支持", secure: "安全预订和100%满意保证",
    privacy: "隐私政策", terms: "服务条款",
    footerDescription: "精品旅行社，专注于在厄瓜多尔和加拉帕戈斯群岛打造定制的尊享精品旅行行程。",
    paymentVerified: "官方权威认证安全支付方式",
    paymentHeading: "全流程银行级安全加密与定金保障",
    paymentDesc: "支持通过官方 PayPal 买家保障支付、美国花旗银行（Citibank）官方电汇、Zelle 以及厄瓜多尔 Produbanco 银行转账。提供官方合同担保与正规旅行凭据。",
    badgePayPal: "PayPal 官方买家保护",
    badgeCitibank: "美国花旗银行 & Zelle",
    badgeProdubanco: "Produbanco 银行官方渠道",
    badgeSSL: "256位 SSL 顶级加密",
    affiliateProgram: "联盟伙伴计划",
    officeReservations: "办公室 / 预订专线:",
    hqEcuador: "厄瓜多尔总部 (HQ)",
    officeSpain: "西班牙分部 (Coral Tour)",
    internationalLanguages: "国际多语言切换:",
    usConcierge: "美国直拨专线 / SMS:",
    bilingualOperators: "我们在厄瓜多尔的探险领队与运营团队均持有官方旅游从业执照且具备100%流利英语双语能力，并配备美国本土专属客服团队。",
    sealTripAdvisor: "TripAdvisor 5.0 (52条真实认证好评)",
    sealMintur: "厄瓜多尔旅游部官方特许执照 #1793215456001",
    sealDepositGuarantee: "100%定金与付款信托保护保证"
  }
};

import { BrandLogo } from '@/components/ui/BrandLogo';

export function Footer() {
  const { settings } = useSettings();
  const locale = useLocale();
  const pathname = usePathname();
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const stored = getStoredUserProfile();
    if (stored.email) setNewsletterEmail(stored.email);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    ...targetIds: string[]
  ) => {
    const isHomePage =
      pathname === `/${locale}` ||
      pathname === `/${locale}/` ||
      pathname === '/' ||
      !pathname;

    if (isHomePage) {
      for (const id of targetIds) {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          try {
            window.history.pushState(null, '', `#${id}`);
          } catch {}
          return;
        }
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-emerald-950 via-[#032118] to-[#021812] dark:from-black dark:via-zinc-950 dark:to-black text-zinc-100 pt-8 pb-6 border-t border-emerald-900/80 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ── FRANJA SUPERIOR: MENÚ HORIZONTAL Y DESTINOS (ESTILO INTERSTATE) ── */}
        <div className="pb-5 border-b border-emerald-900/60 dark:border-zinc-800 space-y-2.5">
          {/* Fila 1: Menú Principal */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-zinc-300">
            <a href={`/${locale}`} className="hover:text-emerald-400 transition-colors">
              {locale === 'es' ? 'Inicio' : 'Home'}
            </a>
            <a href={`/${locale}/about`} className="hover:text-emerald-400 transition-colors">
              {t.about}
            </a>
            <a href={`/${locale}/tours`} className="hover:text-emerald-400 transition-colors">
              {t.packages}
            </a>
            <a href={`/${locale}/blog`} className="hover:text-emerald-400 transition-colors">
              Blog &amp; Travel Guides
            </a>
            <a href={`/${locale}#contact`} onClick={(e) => handleAnchorClick(e, 'contact')} className="hover:text-emerald-400 transition-colors">
              {t.contact}
            </a>
            <a href={`/${locale}#affiliate`} onClick={(e) => handleAnchorClick(e, 'affiliate')} className="hover:text-emerald-400 transition-colors">
              {t.affiliateProgram}
            </a>
          </nav>

          {/* Fila 2: Destinos Clave */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5 text-xs text-zinc-400 font-medium">
            <span className="text-emerald-500 font-bold uppercase tracking-wider text-[11px]">
              {t.topDestinations}:
            </span>
            <a href={`/${locale}/tours#galapagos`} className="hover:text-white transition-colors">
              {t.galapagos}
            </a>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
              {t.ecuador}
            </a>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <a href={`/${locale}/tours#diarios`} className="hover:text-white transition-colors">
              {t.fullDay}
            </a>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
              {t.amazon}
            </a>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
              {t.volcanoes}
            </a>
          </div>
        </div>

        {/* ── BLOQUE PRINCIPAL EN 3 COLUMNAS (1. MARCA/SELLOS | 2. ATENCIÓN/PAGOS | 3. NOVEDADES/LEGAL) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* COLUMNA 1: MARCA Y SELLOS OFICIALES (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-4 justify-between">
              <div>
                <a href={`/${locale}`} aria-label="Vermilion Routes Home" className="inline-block">
                  <div className="relative w-[180px] h-[45px] shrink-0">
                    <Image
                      src="/logo_blanco.png"
                      alt="Vermilion Routes"
                      width={220}
                      height={55}
                      className="w-auto h-full object-contain drop-shadow-md"
                    />
                  </div>
                </a>

                <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed mt-2.5 max-w-sm">
                  {(() => {
                    const custom: any = settings?.footer?.description;
                    if (custom && typeof custom === 'object') {
                      return getLocalizedText(custom, locale) || t.footerDescription;
                    }
                    if (typeof custom === 'string' && custom.trim().length > 0) {
                      return custom;
                    }
                    return t.footerDescription;
                  })()}
                </p>
              </div>

              {/* Redes Sociales: 5 Canales Oficiales */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <a
                  href="https://www.youtube.com/@VermilionSouthAmericanRoutes"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all active:scale-95"
                  aria-label="YouTube"
                  title="YouTube Vermilion Routes"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href={TRIPADVISOR_URL}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-amber-400 transition-all active:scale-95"
                  aria-label="TripAdvisor"
                  title="TripAdvisor Vermilion Routes"
                >
                  <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
                  </svg>
                </a>
                <a
                  href={settings?.contact?.instagram || 'https://www.instagram.com/vermilionsouthamericanroutes/'}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all active:scale-95"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={settings?.contact?.tiktok || 'https://www.tiktok.com/@vermilionsaroutes'}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all active:scale-95"
                  aria-label="TikTok"
                  title="TikTok Vermilion Routes"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
                <a
                  href={settings?.contact?.facebook || 'https://www.facebook.com/VermilionSouthAmericanRoutes'}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-lg bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all active:scale-95"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Sub-Columna: 3 Sellos Fiduciarios Verticales Compactos */}
            <div className="pt-2 grid grid-cols-1 gap-2 text-xs">
              <a
                href={TRIPADVISOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-900/30 dark:bg-zinc-900/60 border border-emerald-800/40 hover:border-amber-400/60 transition-colors"
              >
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="leading-tight">
                  <span className="text-white font-bold block text-[11px]">{t.sealTripAdvisor}</span>
                  <span className="text-[10px] text-amber-300/80">TripAdvisor Travelers' Choice Winner</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-900/30 dark:bg-zinc-900/60 border border-emerald-800/40">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="leading-tight">
                  <span className="text-white font-bold block text-[11px]">{t.sealMintur}</span>
                  <span className="text-[10px] text-emerald-300/80">Ministerio de Turismo del Ecuador</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-900/30 dark:bg-zinc-900/60 border border-emerald-800/40">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="leading-tight">
                  <span className="text-white font-bold block text-[11px]">{t.sealDepositGuarantee}</span>
                  <span className="text-[10px] text-cyan-300/80">Fiduciary Protection &amp; Flexible Refund</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: GARANTÍA, ATENCIÓN 24/7 Y PAGO SEGURO (CAJA INTERSTATE) (4 cols) */}
          <div className="lg:col-span-4 bg-emerald-950/60 dark:bg-zinc-900/80 border border-emerald-800/60 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{locale === 'es' ? 'Garantía y Atención 24/7' : 'Warranty & 24/7 Concierge'}</span>
              </p>
              
              <div className="mt-2.5 space-y-2 text-xs text-zinc-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-zinc-400 text-[11px]">WhatsApp 24/7:</span>
                  <a href={`tel:${EC_WHATSAPP_PHONE.replace(/[^0-9+]/g, '')}`} className="font-semibold text-white hover:text-emerald-300 transition-colors">
                    {EC_WHATSAPP_PHONE}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-zinc-400 text-[11px]">{t.usConcierge}</span>
                  <a href={`tel:${US_CONCIERGE_PHONE.replace(/[^0-9+]/g, '')}`} className="font-semibold text-amber-300 hover:text-amber-200 transition-colors">
                    {US_CONCIERGE_PHONE}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="mailto:info@vermilionroutes.com" className="hover:text-emerald-300 transition-colors">
                    <span>info</span>
                    <span className="text-emerald-400 font-bold">&#64;</span>
                    <span>vermilionroutes.com</span>
                  </a>
                </p>
                <p className="flex items-start gap-2 text-zinc-400 text-[11px] pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Quito: Monteserrín N45-206 · Madrid: C. Seco 3</span>
                </p>
              </div>
            </div>

            {/* Separador sutil */}
            <div className="border-t border-emerald-900/60 dark:border-zinc-800 pt-3 space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.paymentHeading}</span>
              </span>
              <p className="text-[11px] text-zinc-400 leading-tight">
                {t.paymentDesc}
              </p>
              {/* Badges Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-900/50 border border-emerald-800/60 text-[10px] font-semibold text-emerald-300">
                  {t.badgePayPal}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-900/50 border border-emerald-800/60 text-[10px] font-semibold text-emerald-300">
                  {t.badgeCitibank}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-900/50 border border-emerald-800/60 text-[10px] font-semibold text-emerald-300">
                  {t.badgeProdubanco}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-900/50 border border-emerald-800/60 text-[10px] font-semibold text-amber-300">
                  {t.badgeSSL}
                </span>
              </div>
            </div>

            {/* Botón Acción Rápida tipo Interstate */}
            <a
              href="https://wa.me/593994048458?text=Hola%20Vermilion%20Routes,%20deseo%20planificar%20un%20viaje%20a%20medida"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-95 transition-all text-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{locale === 'es' ? 'Escribir a Especialista 24/7' : 'Chat with Specialist 24/7'}</span>
            </a>
          </div>

          {/* COLUMNA 3: SUSCRIPCIÓN COMPACTA Y LEGALES (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Caja de Suscripción */}
            <div className="bg-emerald-950/40 dark:bg-zinc-900/50 border border-emerald-800/50 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <p className="font-serif font-bold text-base text-white tracking-wide">
                {t.updates}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {t.subscribeText}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) {
                    saveStoredUserProfile({ email: newsletterEmail.trim() });
                    alert(locale === 'es' ? '¡Gracias! Has sido registrado como Cliente VIP. Pronto recibirás nuestras mejores promociones.' : 'Thank you! You have been registered as a VIP Client.');
                  }
                }}
                className="space-y-2"
              >
                <div className="relative">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {t.emailPlaceholder || "Email"}
                  </label>
                  <input
                    type="email"
                    id="footer-newsletter-email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      saveStoredUserProfile({ email: e.target.value });
                    }}
                    aria-label={t.emailPlaceholder || "Email"}
                    placeholder={t.emailPlaceholder}
                    suppressHydrationWarning
                    className="w-full bg-emerald-950/90 dark:bg-zinc-900/90 border border-emerald-800/80 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                  suppressHydrationWarning
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.subscribeBtn}</span>
                </button>
              </form>
            </div>

            {/* Enlaces Legales en Columna 3 */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 dark:bg-zinc-900/40 border border-emerald-900/40 space-y-1.5 text-xs text-zinc-400">
              <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                {locale === 'es' ? 'Políticas y Legal' : 'Policies & Legal'}
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a href={`/${locale}/privacy-policy`} className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-600/60">
                  {t.privacy}
                </a>
                <a href={`/${locale}/terms`} className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-600/60">
                  {t.terms}
                </a>
                <a
                  href={`/${locale}#affiliate`}
                  onClick={(e) => handleAnchorClick(e, 'affiliate')}
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-600/60 cursor-pointer"
                >
                  {t.affiliateProgram}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── BARRA INFERIOR DELGADA (COPYRIGHT) ── */}
        <div className="pt-4 border-t border-emerald-900/60 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-zinc-400">
          <p>
            {getLocalizedText(settings?.footer?.copyright, locale) || `© ${new Date().getFullYear()} Agencia de Viajes Vermilion Cia. Ltda. (RUC 1711992808001). All Rights Reserved.`}
          </p>
          <p className="text-[10px] text-zinc-500">
            {locale === 'es' ? 'Plataforma oficial para expediciones en Galápagos y Ecuador' : 'Official bespoke expedition platform for Galapagos & Ecuador'}
          </p>
        </div>

      </div>
    </footer>
  );
}
