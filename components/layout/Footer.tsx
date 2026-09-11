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

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    topDestinations: "Top Destinations", galapagos: "Galapagos Islands", ecuador: "Mainland Ecuador", fullDay: "Full Day Excursions", amazon: "Ecuadorian Amazon", volcanoes: "Avenue of Volcanoes",
    company: "Company", about: "About Us", packages: "Tour Packages", contact: "Contact Specialist",
    updates: "Get Travel Updates", subscribeText: "Subscribe to receive seasonal Galapagos premium cruise promotions and curated travel guides.", emailPlaceholder: "Your email address", subscribeBtn: "Subscribe",
    licensed: "Fully Licensed & Certified Tour Operator in Ecuador & Galapagos", support: "24/7 Dedicated Trip Specialist Support En Route", secure: "Secure Bookings & 100% Satisfaction Guarantee",
    privacy: "Privacy Policy", terms: "Terms of Service",
    footerDescription: "Premier boutique tour operator specializing in custom-crafted premium travel itineraries across Ecuador and Galapagos's most iconic wonders.",
    paymentVerified: "Verified & Secure Payment Methods",
    paymentHeading: "Secure Checkout & Encrypted Payments",
    paymentDesc: "We accept secure encrypted card payments via Stripe, official Citibank (USA) wire transfers, Zelle payments, and Banco Produbanco. Official guarantee and certified travel vouchers.",
    badgeStripe: "Stripe Payments",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "SSL 256-Bit Encrypted",
    affiliateProgram: "Affiliate Program"
  },
  es: {
    topDestinations: "Destinos Principales", galapagos: "Islas Galápagos", ecuador: "Ecuador Continental", fullDay: "Excursiones Full Day", amazon: "Amazonía Ecuatoriana", volcanoes: "Avenida de los Volcanes",
    company: "Empresa", about: "Sobre Nosotros", packages: "Paquetes Turísticos", contact: "Contactar Especialista",
    updates: "Recibe Novedades", subscribeText: "Suscríbete para recibir promociones de cruceros y guías de viaje seleccionadas.", emailPlaceholder: "Tu correo", subscribeBtn: "Suscribirse",
    licensed: "Operador Turístico Certificado en Ecuador y Galápagos", support: "Soporte Especializado 24/7 Durante el Viaje", secure: "Reservas Seguras y Satisfacción Garantizada al 100%",
    privacy: "Política de Privacidad", terms: "Términos de Servicio",
    footerDescription: "Operador turístico boutique especializado en itinerarios de viaje premium a medida a través de las maravillas más icónicas de Ecuador y Galápagos.",
    paymentVerified: "Métodos de Pago Verificados y Seguros",
    paymentHeading: "Pago Seguro y Encriptado",
    paymentDesc: "Aceptamos pagos directos y encriptados con tarjeta mediante Stripe, transferencias oficiales vía Citibank (EE.UU.), transferencias Zelle y Banco Produbanco. Garantía oficial y comprobantes certificados.",
    badgeStripe: "Pagos con Stripe",
    badgeCitibank: "Citibank EE.UU. & Zelle",
    badgeSSL: "Encriptación SSL de 256 Bits",
    affiliateProgram: "Programa de Afiliados"
  },
  fr: {
    topDestinations: "Meilleures Destinations", galapagos: "Îles Galapagos", ecuador: "Équateur Continental", fullDay: "Excursions Full Day", amazon: "Amazonie Équatorienne", volcanoes: "Avenue des Volcans",
    company: "Entreprise", about: "À Propos", packages: "Forfaits", contact: "Contacter un Spécialiste",
    updates: "Actualités", subscribeText: "Abonnez-vous pour recevoir des promotions de croisières et des guides de voyage.", emailPlaceholder: "Votre e-mail", subscribeBtn: "S'abonner",
    licensed: "Voyagiste Certifié en Équateur et aux Galapagos", support: "Assistance Spécialisée 24/7", secure: "Réservations Sécurisées et Satisfaction Garantie",
    privacy: "Confidentialité", terms: "Conditions",
    footerDescription: "Voyagiste boutique de premier ordre spécialisé dans les itinéraires de voyage haut de gamme sur mesure à travers l'Équateur et les Galapagos.",
    paymentVerified: "Moyens de Paiement Vérifiés & Sécurisés",
    paymentHeading: "Paiement Sécurisé & Crypté",
    paymentDesc: "Nous acceptons les paiements sécurisés par carte via Stripe, virements Citibank (USA), Zelle et Produbanco. Garantie officielle et bons de voyage certifiés.",
    badgeStripe: "Paiements Stripe",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "Crypté SSL 256 Bits",
    affiliateProgram: "Programme d'Affiliation"
  },
  de: {
    topDestinations: "Top-Reiseziele", galapagos: "Galapagos-Inseln", ecuador: "Ecuador Festland", fullDay: "Tagesausflüge (Full Day)", amazon: "Ecuadorianischer Amazonas", volcanoes: "Straße der Vulkane",
    company: "Unternehmen", about: "Über Uns", packages: "Reisepakete", contact: "Kontaktieren",
    updates: "Reise-Updates", subscribeText: "Abonnieren Sie, um Kreuzfahrt-Angebote und Reiseführer zu erhalten.", emailPlaceholder: "Ihre E-Mail", subscribeBtn: "Abonnieren",
    licensed: "Zertifizierter Reiseveranstalter in Ecuador & Galapagos", support: "24/7 Spezialisten-Support auf der Reise", secure: "Sichere Buchungen & 100% Zufriedenheitsgarantie",
    privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen",
    footerDescription: "Boutique-Reiseveranstalter, spezialisiert auf maßgeschneiderte Premium-Reiserouten zu den kultigsten Wunderwelten von Ecuador und Galapagos.",
    paymentVerified: "Verifizierte & Sichere Zahlungsmethoden",
    paymentHeading: "Sicherer & Verschlüsselter Checkout",
    paymentDesc: "Wir akzeptieren sichere Kartenzahlungen über Stripe, offizielle Citibank (USA) Überweisungen, Zelle und Produbanco. Offizielle Garantie und Reisezertifikate.",
    badgeStripe: "Stripe-Zahlungen",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "SSL 256-Bit-Verschlüsselung",
    affiliateProgram: "Partnerprogramm"
  },
  it: {
    topDestinations: "Destinazioni Top", galapagos: "Isole Galapagos", ecuador: "Ecuador Continentale", fullDay: "Escursioni Full Day", amazon: "Amazzonia Ecuadoriana", volcanoes: "Viale dei Vulcani",
    company: "Azienda", about: "Chi Siamo", packages: "Pacchetti", contact: "Contatta",
    updates: "Aggiornamenti", subscribeText: "Iscriviti per ricevere promozioni per crociere e guide di viaggio.", emailPlaceholder: "La tua email", subscribeBtn: "Iscriviti",
    licensed: "Tour Operator Certificato in Ecuador e Galapagos", support: "Assistenza Specializzata 24/7", secure: "Prenotazioni Sicure e Soddisfazione Garantita",
    privacy: "Privacy", terms: "Termini",
    footerDescription: "Tour operator boutique di alto livello specializzato in itinerari di viaggio premium su misura attraverso le meraviglie di Ecuador e Galapagos.",
    paymentVerified: "Metodi di Pagamento Verificati e Sicuri",
    paymentHeading: "Pagamento Sicuro e Crittografato",
    paymentDesc: "Accettiamo pagamenti sicuri con carta tramite Stripe, bonifici ufficiali Citibank (USA), Zelle e Produbanco. Garanzia ufficiale e voucher certificati.",
    badgeStripe: "Pagamenti Stripe",
    badgeCitibank: "Citibank USA & Zelle",
    badgeSSL: "Crittografia SSL a 256 Bit",
    affiliateProgram: "Programma di Affiliazione"
  },
  pt: {
    topDestinations: "Principais Destinos", galapagos: "Ilhas Galápagos", ecuador: "Equador Continental", fullDay: "Excursões Full Day", amazon: "Amazônia Equatoriana", volcanoes: "Avenida dos Vulcões",
    company: "Empresa", about: "Sobre Nós", packages: "Pacotes", contact: "Contatar",
    updates: "Atualizaciones", subscribeText: "Inscreva-se para receber promoções de cruzeiros e guias de viagem.", emailPlaceholder: "Seu e-mail", subscribeBtn: "Inscrever-se",
    licensed: "Operador Turístico Certificado no Equador e Galápagos", support: "Suporte Especializado 24/7", secure: "Reservas Seguras e 100% de Satisfação Garantida",
    privacy: "Privacidade", terms: "Termos",
    footerDescription: "Operador turístico boutique especializado em itinerários de viagem premium sob medida pelas maravilhas mais icônicas do Equador e Galápagos.",
    paymentVerified: "Métodos de Pagamento Verificados e Seguros",
    paymentHeading: "Checkout Seguro e Criptografado",
    paymentDesc: "Aceitamos pagamentos seguros com cartão via Stripe, transferências Citibank (EUA), Zelle e Produbanco. Garantia oficial e vouchers certificados.",
    badgeStripe: "Pagamentos Stripe",
    badgeCitibank: "Citibank EUA & Zelle",
    badgeSSL: "Criptografia SSL de 256 Bits",
    affiliateProgram: "Programa de Afiliados"
  },
  ja: {
    topDestinations: "人気の目的地", galapagos: "ガラパゴス諸島", ecuador: "エクアドル本土", fullDay: "日帰りツアー（Full Day）", amazon: "エクアドル・アマゾン", volcanoes: "火山の道",
    company: "会社概要", about: "私たちについて", packages: "ツアープラン", contact: "連絡する",
    updates: "最新情報", subscribeText: "クルーズのプロモーションや旅行ガイドを受け取るために購読してください。", emailPlaceholder: "メールアドレス", subscribeBtn: "購読する",
    licensed: "エクアドルとガラパゴスの認定旅行会社", support: "24時間365日の専門家サポート", secure: "安全な予約と100%の満足保証",
    privacy: "プライバシーポリシー", terms: "利用規約",
    footerDescription: "エクアドルとガラパゴスの象徴的な見どころを巡るオーダーメイドのプレミアム旅行を専門とするブティック旅行会社です。",
    paymentVerified: "認証済み安全な決済方法",
    paymentHeading: "安全な暗号化チェックアウト＆決済",
    paymentDesc: "Stripeによる安全な暗号化カード決済、米国Citibank公式送金、Zelle、Produbanco銀行送金に対応。公式保証および正規旅行バウチャーを発行します。",
    badgeStripe: "Stripe カード決済",
    badgeCitibank: "米国シティバンク & Zelle",
    badgeSSL: "256ビット SSL 暗号化保護",
    affiliateProgram: "アフィリエイト・プログラム"
  },
  zh: {
    topDestinations: "热门目的地", galapagos: "加拉帕戈斯群岛", ecuador: "厄瓜多尔大陆", fullDay: "全天一日游", amazon: "厄瓜多尔亚马逊", volcanoes: "火山大道",
    company: "公司信息", about: "关于我们", packages: "旅游套餐", contact: "联系专家",
    updates: "获取旅游更新", subscribeText: "订阅以接收游轮促销活动和精选旅游指南。", emailPlaceholder: "您的电子邮箱", subscribeBtn: "订阅",
    licensed: "厄瓜多尔和加拉帕戈斯的认证旅行社", support: "24/7 专业旅行支持", secure: "安全预订和100%满意保证",
    privacy: "隐私政策", terms: "服务条款",
    footerDescription: "精品旅行社，专注于在厄瓜多尔和加拉帕戈斯群岛打造定制的尊享精品旅行行程。",
    paymentVerified: "官方权威认证安全支付方式",
    paymentHeading: "全流程 256 位银行级安全加密支付",
    paymentDesc: "支持通过 Stripe 进行安全银行卡支付、美国花旗银行（Citibank）官方电汇、Zelle 以及厄瓜多尔 Produbanco 银行转账。提供官方合同担保与正规旅行凭据。",
    badgeStripe: "Stripe 国际银行卡支付",
    badgeCitibank: "美国花旗银行 & Zelle",
    badgeSSL: "256位 SSL 顶级加密",
    affiliateProgram: "联盟伙伴计划"
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
    <footer className="bg-gradient-to-b from-emerald-950 via-[#032118] to-[#021812] dark:from-black dark:via-zinc-950 dark:to-black text-zinc-100 pt-16 pb-8 border-t border-emerald-900/80 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <a href={`/${locale}`} aria-label="Vermilion Routes Home" className="flex items-center gap-3">
              <div className="relative w-[160px] h-[40px] md:w-[220px] md:h-[55px] shrink-0">
                <Image
                  src="/logo_blanco.png"
                  alt="Vermilion Routes"
                  width={220}
                  height={55}
                  className="w-auto h-full object-contain drop-shadow-md"
                />
              </div>
            </a>

            <p className="text-zinc-200 text-sm leading-relaxed max-w-sm">
              {(() => {
                const custom: any = settings?.footer?.description;
                if (custom && typeof custom === 'object') {
                  return getLocalizedText(custom, locale) || t.footerDescription;
                }
                if (typeof custom === 'string') {
                  const str = custom as string;
                  if (str.includes('Premier boutique') || str.includes('South America specialists') || str.includes('tour operator')) {
                    return t.footerDescription;
                  }
                  if (str.trim().length > 0) {
                    return str;
                  }
                }
                return t.footerDescription;
              })()}
            </p>

            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a
                href={settings?.contact?.facebook || 'https://www.facebook.com/VermilionSouthAmericanRoutes'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings?.contact?.instagram || 'https://www.instagram.com/vermilionsouthamericanroutes/'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.contact?.tiktok || 'https://www.tiktok.com/@vermilionsaroutes'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="TikTok"
                title="TikTok Vermilion Routes"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@VermilionSouthAmericanRoutes"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-zinc-200 transition-all hover:scale-105 active:scale-95"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g294308-d26260308-Reviews-Vermilion_Routes-Quito_Pichincha_Province.html"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-9 h-9 rounded-xl bg-emerald-900/50 hover:bg-emerald-600 hover:text-white border border-emerald-800/60 flex items-center justify-center text-amber-400 transition-all hover:scale-105 active:scale-95"
                aria-label="TripAdvisor"
                title="TripAdvisor Vermilion Routes"
              >
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.4c1.8 0 3.4.6 4.7 1.6-1.2.8-2.9 1.4-4.7 1.4s-3.5-.6-4.7-1.4C8.6 5 10.2 4.4 12 4.4zM6.8 9.2c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2S3.6 14.2 3.6 12.4s1.4-3.2 3.2-3.2zm10.4 0c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.2-1.4-3.2-3.2 1.4-3.2 3.2-3.2zm-10.4 1.6c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zm10.4 0c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6-.7-1.6-1.6-1.6zM12 11.5c.8 0 1.5.4 1.7 1.1-.5.3-1.1.4-1.7.4s-1.2-.1-1.7-.4c.2-.7.9-1.1 1.7-1.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <p className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.topDestinations}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a href={`/${locale}/tours#galapagos`} className="hover:text-white transition-colors">
                  {t.galapagos}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
                  {t.ecuador}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#diarios`} className="hover:text-white transition-colors">
                  {t.fullDay}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
                  {t.amazon}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours#continental`} className="hover:text-white transition-colors">
                  {t.volcanoes}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="font-serif font-semibold text-lg text-white tracking-wide">
              {t.company}
            </p>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              <li>
                <a
                  href={`/${locale}/about`}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a href={`/${locale}/tours`} className="hover:text-white transition-colors">
                  {t.packages}
                </a>
              </li>
              <li>
                <a href={`/${locale}/blog`} className="hover:text-white transition-colors">
                  Blog &amp; Travel Guides
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}#contact`}
                  onClick={(e) => handleAnchorClick(e, 'contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quick Contact */}
          <div className="space-y-4">
            <p className="font-serif font-semibold text-lg text-white tracking-wide">
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
                  alert(locale === 'es' ? '¡Gracias! Has sido registrado como Cliente Premium. Pronto recibirás nuestras mejores ofertas.' : 'Thank you! You have been registered as a Premium Client. You will receive our best offers soon.');
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
                  className="w-full bg-emerald-950/80 dark:bg-zinc-900/80 border border-emerald-800/80 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-emerald-400 dark:focus:border-amber-400 focus:ring-1 focus:ring-emerald-400 dark:focus:ring-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
                suppressHydrationWarning
              >
                <Send className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span>{t.subscribeBtn}</span>
              </button>
            </form>

            <div className="pt-2 space-y-2 text-xs text-zinc-200">
              <p className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+593994048458" className="hover:text-emerald-300 transition-colors">
                  {getLocalizedText(settings?.contact?.phone, locale) || '+593 99 404 8458'}
                </a>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:info@vermilionroutes.com" className="hover:text-emerald-300 transition-colors">
                  <span>info</span>
                  <span className="text-emerald-400 font-bold">&#64;</span>
                  <span>vermilionroutes.com</span>
                </a>
              </p>

              {/* Sedes Oficiales Internacionales */}
              <div className="pt-2 space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sede Ecuador (HQ)</span>
                  </div>
                  <p className="text-zinc-300 pl-5">
                    Monteserrín, De los Lirios N45-206 y Julio Arellano, Tercer Piso, Quito (CP 170503)
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] leading-snug">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sede España (Coral Tour)</span>
                  </div>
                  <p className="text-zinc-300 pl-5">
                    Calle Seco 3, 28007 Madrid, España
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-10 border-b border-emerald-900/60 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {t.paymentVerified}
              </span>
              <p className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                {t.paymentHeading}
              </p>
              <p className="text-xs text-zinc-300 max-w-2xl mt-1">
                {t.paymentDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 text-xs font-semibold text-emerald-300">
                {t.badgeStripe}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 text-xs font-semibold text-emerald-300">
                {t.badgeCitibank}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 text-xs font-semibold text-emerald-300 dark:text-amber-400">
                {t.badgeSSL}
              </span>
            </div>
          </div>
        </div>

        {/* Guarantees & Badges */}
        <div className="py-8 flex flex-wrap justify-between items-center gap-4 border-b border-emerald-900/60 dark:border-zinc-900 text-xs text-zinc-200">
          <div className="flex flex-col gap-1 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-amber-400" />
              <span className="text-white font-medium">{t.licensed}</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 dark:text-zinc-500 font-mono">Reg. No: 1793215456001 • Ministerio de Turismo EC</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl">
            <Award className="w-4 h-4 text-emerald-400 dark:text-amber-400" />
            <span className="text-white font-medium">{t.support}</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/40 dark:bg-zinc-900/50 border border-emerald-800/60 dark:border-zinc-800 px-4 py-2.5 rounded-2xl">
            <Sparkles className="w-4 h-4 text-emerald-400 dark:text-amber-400" />
            <span className="text-white font-medium">{t.secure}</span>
          </div>
        </div>

        {/* International Language Hub - 8 Supported Locales */}
        <div className="py-6 border-b border-emerald-900/60 dark:border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400/90 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>International / Idiomas:</span>
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { code: 'en', label: 'English', flag: '/flags/us.svg' },
              { code: 'es', label: 'Español', flag: '/flags/es.svg' },
              { code: 'fr', label: 'Français', flag: '/flags/fr.svg' },
              { code: 'de', label: 'Deutsch', flag: '/flags/de.svg' },
              { code: 'pt', label: 'Português', flag: '/flags/pt.svg' },
              { code: 'it', label: 'Italiano', flag: '/flags/it.svg' },
              { code: 'ja', label: '日本語', flag: '/flags/jp.svg' },
              { code: 'zh', label: '中文', flag: '/flags/cn.svg' },
            ].map((lang) => (
              <a
                key={lang.code}
                href={`/${lang.code}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  locale === lang.code
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-zinc-300 hover:text-white border border-emerald-800/40'
                }`}
              >
                <img src={lang.flag} alt={lang.label} width={16} height={12} className="w-3.5 h-2.5 object-cover rounded-[1px]" />
                <span>{lang.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-300">
          <p>{getLocalizedText(settings?.footer?.copyright, locale) || `© ${new Date().getFullYear()} Agencia de Viajes Vermilion (RUC 1711992808001). All Rights Reserved.`}</p>
          <div className="flex gap-6">
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
    </footer>
  );
}
