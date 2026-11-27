'use client';

import Image from 'next/image';
import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { EC_OFFICE_PHONE, EC_WHATSAPP_PHONE, US_CONCIERGE_PHONE } from '@/data/bookingTerms';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/userProfile';

type FooterCopy = { explore: string; about: string; work: string; contact: string; newsletter: string; newsletterText: string; subscribe: string; privacy: string; terms: string; cookies: string; cancellation: string; affiliates: string; copyright: string };

const COPY: Record<string, FooterCopy> = {
  es: { explore: 'Explora Ecuador', about: 'Sobre Vermilion', work: 'Trabaja con nosotros', contact: 'Contacto', newsletter: 'Recibe novedades de viaje', newsletterText: 'Guías y novedades seleccionadas, directamente en tu correo.', subscribe: 'Suscribirme', privacy: 'Privacidad', terms: 'Términos', cookies: 'Cookies', cancellation: 'Cancelaciones y reembolsos', affiliates: 'Condiciones de embajadores', copyright: 'Todos los derechos reservados.' },
  en: { explore: 'Explore Ecuador', about: 'About Vermilion', work: 'Work with us', contact: 'Contact', newsletter: 'Travel updates', newsletterText: 'Curated guides and travel updates in your inbox.', subscribe: 'Subscribe', privacy: 'Privacy', terms: 'Terms', cookies: 'Cookies', cancellation: 'Cancellations and refunds', affiliates: 'Ambassador terms', copyright: 'All rights reserved.' },
  fr: { explore: 'Explorer l’Équateur', about: 'À propos de Vermilion', work: 'Travaillez avec nous', contact: 'Contact', newsletter: 'Actualités voyage', newsletterText: 'Guides et actualités sélectionnés dans votre boîte mail.', subscribe: 'S’abonner', privacy: 'Confidentialité', terms: 'Conditions', cookies: 'Cookies', cancellation: 'Annulations et remboursements', affiliates: 'Conditions ambassadeurs', copyright: 'Tous droits réservés.' },
  de: { explore: 'Ecuador entdecken', about: 'Über Vermilion', work: 'Mit uns arbeiten', contact: 'Kontakt', newsletter: 'Reise-Updates', newsletterText: 'Ausgewählte Guides und Neuigkeiten per E-Mail.', subscribe: 'Abonnieren', privacy: 'Datenschutz', terms: 'Bedingungen', cookies: 'Cookies', cancellation: 'Stornierungen und Erstattungen', affiliates: 'Botschafter-Bedingungen', copyright: 'Alle Rechte vorbehalten.' },
  it: { explore: 'Esplora l’Ecuador', about: 'Vermilion', work: 'Collabora con noi', contact: 'Contatti', newsletter: 'Novità di viaggio', newsletterText: 'Guide e novità selezionate nella tua email.', subscribe: 'Iscriviti', privacy: 'Privacy', terms: 'Termini', cookies: 'Cookie', cancellation: 'Cancellazioni e rimborsi', affiliates: 'Termini ambasciatori', copyright: 'Tutti i diritti riservati.' },
  pt: { explore: 'Explore o Equador', about: 'Sobre a Vermilion', work: 'Trabalhe conosco', contact: 'Contato', newsletter: 'Novidades de viagem', newsletterText: 'Guias e novidades selecionadas no seu e-mail.', subscribe: 'Inscrever-se', privacy: 'Privacidade', terms: 'Termos', cookies: 'Cookies', cancellation: 'Cancelamentos e reembolsos', affiliates: 'Termos de embaixadores', copyright: 'Todos os direitos reservados.' },
  ja: { explore: 'エクアドルを探す', about: 'Vermilionについて', work: '提携について', contact: 'お問い合わせ', newsletter: '旅行ニュース', newsletterText: '厳選したガイドと最新情報をメールでお届けします。', subscribe: '購読する', privacy: 'プライバシー', terms: '利用規約', cookies: 'Cookie', cancellation: 'キャンセルと返金', affiliates: 'アンバサダー規約', copyright: '無断転載を禁じます。' },
  zh: { explore: '探索厄瓜多尔', about: '关于 Vermilion', work: '与我们合作', contact: '联系我们', newsletter: '旅行资讯', newsletterText: '精选指南与旅行资讯将发送到您的邮箱。', subscribe: '订阅', privacy: '隐私政策', terms: '服务条款', cookies: 'Cookie', cancellation: '取消与退款', affiliates: '大使条款', copyright: '版权所有。' },
};

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return <div><h2 className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">{title}</h2><ul className="mt-3 space-y-2 text-sm text-emerald-50/80">{links.map((link) => <li key={`${link.href}-${link.label}`}><a className="transition hover:text-white" href={link.href}>{link.label}</a></li>)}</ul></div>;
}

export function Footer() {
  const locale = useLocale();
  const copy = COPY[locale] || COPY.en;
  const [email, setEmail] = useState('');
  useEffect(() => { setEmail(getStoredUserProfile().email || ''); }, []);
  const prefix = `/${locale}`;
  // Estas son las dos páginas indexables disponibles: el resto de idiomas
  // se dirige a la versión inglesa en vez de recibir una ruta 404.
  const travelTradeHref = locale === 'es' ? '/es/alianzas-comerciales' : '/en/travel-trade';
  const submitNewsletter = (event: React.FormEvent) => { event.preventDefault(); if (email.trim()) saveStoredUserProfile({ email: email.trim() }); };
  const localized = (es: string, en: string) => locale === 'es' ? es : en;

  return <footer id="site-footer" className="border-t border-emerald-950 bg-[#02120c] text-zinc-100"><div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
    <div className="grid gap-10 lg:grid-cols-4">
      <div className="space-y-4"><a href={prefix} className="inline-block" aria-label="Vermilion Routes home"><Image src="/logo_blanco.png" alt="Vermilion Routes" width={210} height={54} className="h-auto w-[190px]" /></a><p className="max-w-xs text-sm leading-6 text-zinc-300 lg:hidden">{localized('Viajes privados y a medida por Ecuador y Galápagos, diseñados por especialistas locales.', 'Private, tailor-made journeys across Ecuador and the Galapagos, designed by local specialists.')}</p><div className="space-y-2 text-sm text-zinc-300"><a className="flex items-center gap-2 hover:text-white" href={`https://wa.me/${EC_WHATSAPP_PHONE.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 text-emerald-400" />WhatsApp Ecuador: {EC_WHATSAPP_PHONE}</a><a className="flex items-center gap-2 hover:text-white" href={`tel:${EC_OFFICE_PHONE.replace(/[^0-9+]/g, '')}`}><Phone className="h-4 w-4 text-emerald-400" />Ecuador: {EC_OFFICE_PHONE}</a><a className="flex items-center gap-2 hover:text-white" href={`tel:${US_CONCIERGE_PHONE.replace(/[^0-9+]/g, '')}`}><Phone className="h-4 w-4 text-emerald-400" />USA: {US_CONCIERGE_PHONE}</a><a className="flex items-center gap-2 hover:text-white" href="mailto:info@vermilionroutes.com"><Mail className="h-4 w-4 text-emerald-400" />info@vermilionroutes.com</a></div></div>
      <FooterColumn title={copy.explore} links={[{ label: 'Galápagos', href: `${prefix}/tours#galapagos` }, { label: localized('Ecuador continental', 'Mainland Ecuador'), href: `${prefix}/tours#continental` }, { label: 'Ecuador + Galápagos', href: `${prefix}/tours#combined` }, { label: 'Full Day', href: `${prefix}/tours#diarios` }, { label: localized('Amazonía', 'Amazon'), href: `${prefix}/tours#continental` }, { label: localized('Andes y volcanes', 'Andes & Volcanoes'), href: `${prefix}/tours#continental` }]} />
      <FooterColumn title={copy.about} links={[{ label: localized('Nosotros', 'About us'), href: `${prefix}/about` }, { label: 'Blog', href: `${prefix}/blog` }, { label: localized('Guías de viaje', 'Travel guides'), href: `${prefix}/blog` }, { label: localized('Viaje responsable', 'Responsible travel'), href: `${prefix}/about` }, { label: copy.contact, href: `${prefix}#contact` }, { label: 'FAQs', href: `${prefix}#faq` }]} />
      <FooterColumn title={copy.work} links={[{ label: 'Travel Trade', href: travelTradeHref }, { label: 'Ecuador DMC', href: travelTradeHref }, { label: localized('Alianzas B2B', 'B2B partnerships'), href: travelTradeHref }, { label: localized('Programa de embajadores', 'Ambassador program'), href: `${prefix}/ambassadors` }]} />
    </div>
    <div className="mt-10 grid gap-4 border-t border-emerald-900/70 pt-5 text-xs text-zinc-400 lg:grid-cols-[1fr_auto] lg:items-end">
      <form onSubmit={submitNewsletter} className="max-w-sm">
        <label className="font-bold text-emerald-200" htmlFor="footer-email">{copy.newsletter}</label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input id="footer-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" className="min-w-0 flex-1 rounded-lg border border-emerald-800 bg-emerald-950/40 px-3 py-2 text-sm outline-none focus:border-emerald-400" />
          <button type="submit" className="flex w-full shrink-0 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 font-bold text-white hover:bg-emerald-500 sm:w-auto"><Send className="h-3.5 w-3.5" />{copy.subscribe}</button>
        </div>
      </form>
      <nav className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-end" aria-label="Legal"><a href={`${prefix}/privacy-policy`} className="hover:text-white">{copy.privacy}</a><a href={`${prefix}/terms`} className="hover:text-white">{copy.terms}</a><a href={`${prefix}#cookies`} className="hover:text-white">{copy.cookies}</a><a href={`${prefix}/terms`} className="hover:text-white">{copy.cancellation}</a><a href={`${prefix}/ambassadors`} className="hover:text-white">{copy.affiliates}</a></nav>
      <p className="lg:col-span-2">© {new Date().getFullYear()} SinergIA Tech. {copy.copyright}</p>
    </div>
  </div></footer>;
}
