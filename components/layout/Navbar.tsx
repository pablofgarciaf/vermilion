'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Globe,
  Sparkles,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import Image from 'next/image';

import { getLocalizedText } from '@/utils/i18nHelper';
import dynamic from 'next/dynamic';

const AffiliateClubModal = dynamic(
  () => import('@/components/auth/AffiliateClubModal').then((m) => m.AffiliateClubModal),
  { ssr: false }
);
import { useCurrency, CURRENCIES, CurrencyCode } from '@/context/CurrencyContext';
import { BrandLogo } from '@/components/ui/BrandLogo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { settings } = useSettings();
  const locale = useLocale();
  const t = useTranslations('contact');
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showGTranslate, setShowGTranslate] = useState(false);
  const { theme, setTheme } = useTheme();

  const LOCALES = [
    { code: 'en', label: 'English', flagUrl: '/flags/us.svg' },
    { code: 'es', label: 'Español', flagUrl: '/flags/es.svg' },
    { code: 'fr', label: 'Français', flagUrl: '/flags/fr.svg' },
    { code: 'de', label: 'Deutsch', flagUrl: '/flags/de.svg' },
    { code: 'zh', label: '中文', flagUrl: '/flags/cn.svg' },
    { code: 'it', label: 'Italiano', flagUrl: '/flags/it.svg' },
    { code: 'pt', label: 'Português', flagUrl: '/flags/pt.svg' },
    { code: 'ja', label: '日本語', flagUrl: '/flags/jp.svg' },
  ];

  const currentLocaleObj = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  const changeLanguage = (newLocale: string) => {
    setLangOpen(false);
    if (newLocale === 'other') {
      setShowGTranslate(true);
      return;
    }

    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const isSubNavRoute = Boolean((pathname?.includes('/tours/') && !pathname?.endsWith('/tours')) || pathname?.includes('/booking'));
  const [isSubNavScrolled, setIsSubNavScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsSubNavScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tNav = useTranslations('nav');

  const navLinks = [
    { name: tNav('home'), href: `/${locale}` },
    {
      name: tNav('destinations'),
      href: `/${locale}/destinations`,
      hasDropdown: true,
      subItems: [
        { name: tNav('galapagos'), href: `/${locale}#galapagos`, desc: 'Premium Cruises & Island Hopping' },
        { name: tNav('ecuador'), href: `/${locale}#ecuador`, desc: 'Avenue of Volcanoes & Amazon' },
        { name: tNav('fullday'), href: `/${locale}#fullday`, desc: 'Galapagos & Mainland 1-Day Tours' },
      ],
    },
    { name: tNav('tours'), href: `/${locale}/tours` },
    {
      name:
        {
          zh: '博客',
          ja: 'ブログ',
          en: 'Blog',
          es: 'Blog',
          fr: 'Blog',
          de: 'Blog',
          it: 'Blog',
          pt: 'Blog',
        }[locale] || 'Blog',
      href: `/${locale}/blog`,
    },
    { name: tNav('about'), href: `/${locale}/about` },
    { name: tNav('contact'), href: `/${locale}` + '#contact', isAnchorToHome: true },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string, isAnchorToHome?: boolean) => {
    if (href.includes('#')) {
      const hash = href.split('#')[1];

      // Smart destination filters link handling
      const destFilterMap: Record<string, string> = {
        galapagos: 'Galapagos',
        ecuador: 'Ecuador',
        fullday: 'FullDay',
        'full-day': 'FullDay',
        combined: 'Combined'
      };

      if (destFilterMap[hash.toLowerCase()]) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('selectDestinationFilter', { detail: destFilterMap[hash.toLowerCase()] }));
        const toursEl = document.getElementById('tours');
        if (toursEl) {
          toursEl.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
        setDestinationsOpen(false);
        return;
      }

      // If contact link and not on home page, redirect to home with anchor
      if (hash === 'contact' && isAnchorToHome && !pathname.startsWith(`/${locale}`)) {
        e.preventDefault();
        router.push(`/${locale}#contact`);
        setMobileMenuOpen(false);
        setDestinationsOpen(false);
        return;
      }

      const el = document.getElementById(hash) || (hash === 'about' ? document.getElementById('experience') : null) || (hash === 'experience' ? document.getElementById('about') : null);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
        setDestinationsOpen(false);
        return;
      }

      // If element not found on current page (e.g., contact on /blog), redirect to home with anchor
      if (hash === 'contact' && isAnchorToHome) {
        e.preventDefault();
        router.push(`/${locale}#contact`);
        setMobileMenuOpen(false);
        setDestinationsOpen(false);
        return;
      }
    }
    setMobileMenuOpen(false);
    setDestinationsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col">
      {/* Top Banner (Desaparece al hacer scroll hacia abajo) */}
      <div
        className={`transition-all duration-500 overflow-hidden border-b bg-gradient-to-r from-emerald-950/90 via-emerald-900/85 to-emerald-800/90 backdrop-blur-md text-white border-emerald-800/60 ${isScrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-24 sm:max-h-16 opacity-100 py-1.5 sm:py-2 px-4 sm:px-8 pb-1.5 sm:pb-2'
          }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${getLocalizedText(settings?.contact?.phone, locale) || '+593960039156'}`}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-white">{getLocalizedText(settings?.contact?.phone, locale) || '+593 96 003 9156'}</span>
            </a>
            <a
              href="mailto:info@vermilionroutes.com"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors hidden sm:flex"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-white">
                <span>info</span>
                <span className="text-emerald-300 font-bold">&#64;</span>
                <span>vermilionroutes.com</span>
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-100 hidden lg:inline">
              {tNav('banner.tagline')}
            </span>
            <div className="hidden md:flex items-center gap-1 text-emerald-100 font-medium bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-700/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>{tNav('banner.badge')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Main Sticky Header 
      */}
      <header
        className={`transition-all duration-300 border-b ${
          isSubNavRoute && isSubNavScrolled
            ? 'pt-0 border-none bg-transparent shadow-none'
            : isScrolled || mobileMenuOpen
            ? 'pt-2 sm:pt-2.5 shadow-md bg-white/80 dark:bg-black/80 backdrop-blur-xl border-zinc-200/80 dark:border-white/10'
            : 'pt-2.5 sm:pt-3 bg-transparent border-transparent shadow-none backdrop-blur-none'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isSubNavRoute && isSubNavScrolled
              ? 'max-h-0 opacity-0 py-0 overflow-hidden pointer-events-none -translate-y-2'
              : 'pb-2 sm:pb-1.5 opacity-100 translate-y-0'
          }`}
        >
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="Vermilion Routes Inicio" className="flex items-center gap-3 relative z-10 group notranslate">
            <div className="relative w-[165px] h-[40px] sm:w-[180px] sm:h-[45px] md:w-[220px] md:h-[55px] shrink-0">
              {/* Full Logo */}
              <div className="w-full h-full absolute inset-0">
                <Image quality={100}
                  src="/logo_inicio.png"
                  alt="Vermilion Routes"
                  width={220}
                  height={55}
                  className="w-auto h-full object-contain transition-transform group-hover:scale-105 block dark:hidden"
                  priority
                />
                <Image quality={100}
                  src="/logo_blanco.png"
                  alt="Vermilion Routes"
                  width={220}
                  height={55}
                  className="w-auto h-full object-contain transition-transform group-hover:scale-105 hidden dark:block"
                  priority
                />
              </div>
              </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-sans">
            {navLinks.map((link) => {
              const isActive = (pathname === link.href) || (link.href !== `/${locale}` && pathname.startsWith(link.href));
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setDestinationsOpen(true)}
                    onMouseLeave={() => setDestinationsOpen(false)}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className={`flex items-center gap-1 px-3 py-2 text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                          : 'text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${destinationsOpen ? 'rotate-180 text-emerald-600' : ''
                          }`}
                      />
                    </a>

                    {/* Dropdown Menu */}
                    {destinationsOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-zinc-200/80 dark:border-white/10 ring-1 ring-black/5">
                          {link.subItems?.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              onClick={(e) => handleAnchorClick(e, sub.href)}
                              className="flex flex-col gap-0.5 p-3 rounded-xl hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 text-zinc-800 dark:text-zinc-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors group"
                            >
                              <span className="text-sm font-semibold flex items-center justify-between">
                                {sub.name}
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-emerald-600" />
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                                {sub.desc}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href, (link as any).isAnchorToHome)}
                  className={`px-3 py-2 text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <div className="flex items-center gap-3 animate-in fade-in duration-700">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  suppressHydrationWarning
                  className="p-2 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 bg-white/70 dark:bg-black/60 backdrop-blur-md border border-zinc-200/70 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors shadow-xs"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <div className="relative">
                  <button
                    suppressHydrationWarning
                    onClick={() => { setLangOpen(!langOpen); if (langOpen) setShowGTranslate(false); }}
                    aria-label="Cambiar idioma / Change language"
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white/70 dark:bg-black/60 backdrop-blur-md text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors shadow-xs"
                    title="Cambiar idioma / Change language"
                  >
                    <img
                      src={currentLocaleObj.flagUrl}
                      alt={currentLocaleObj.label}
                      width={16}
                      height={12}
                      className="w-4 h-3 object-cover rounded-xs shadow-xs"
                    />
                    <span className="font-bold uppercase tracking-wider">{locale}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${langOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>
                  <div className={`absolute top-full right-0 pt-2 w-52 z-50 notranslate ${langOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-zinc-200/80 dark:border-white/10 max-h-[70vh] overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        {LOCALES.map((l) => {
                          const targetHref = `/${l.code}${pathname.replace(new RegExp(`^/${locale}`), '') || ''}`;
                          return (
                            <a
                              key={l.code}
                              href={targetHref}
                              onClick={(e) => {
                                e.preventDefault();
                                changeLanguage(l.code);
                              }}
                              className={`flex items-center gap-3 text-sm text-left px-3 py-2.5 rounded-lg font-medium transition-colors ${locale === l.code
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                            >
                              <img src={l.flagUrl} alt={l.label} width={20} height={15} className="w-5 h-auto rounded-[2px] shadow-sm" />
                              <span>{l.label}</span>
                            </a>
                          );
                        })}
                      </div>
                      <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                        <button
                          onClick={() => setShowGTranslate(true)}
                          className={`w-full text-xs text-center px-3 py-2 rounded-lg font-semibold text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${showGTranslate ? 'hidden' : 'block'}`}
                        >
                          More Languages...
                        </button>

                        <div className={`p-1 animate-in fade-in duration-300 ${showGTranslate ? 'block' : 'hidden'}`}>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-2 text-center">Powered by Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Currency Switcher (Temporarily commented out) */}
                {/* 
                <div className="relative">
                  <button
                    suppressHydrationWarning
                    onClick={() => setCurrencyOpen(!currencyOpen)}
                    aria-label="Cambiar moneda / Change currency"
                    className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-bold bg-white dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-xl cursor-pointer transition-colors shadow-xs"
                    title="Change Currency"
                  >
                    <span>{CURRENCIES[currency]?.symbol || '$'} {currency}</span>
                    <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${currencyOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>

                  {currencyOpen && (
                    <div className="absolute top-full right-0 pt-2 w-36 z-50 animate-fade-in">
                      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-1.5 shadow-2xl border border-zinc-200/90 dark:border-zinc-800">
                        {Object.values(CURRENCIES).map((c) => (
                          <button
                            key={c.code}
                            onClick={() => {
                              setCurrency(c.code);
                              setCurrencyOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                              currency === c.code
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                          >
                            <span>{c.code}</span>
                            <span className="font-mono text-zinc-400">{c.symbol}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currencyOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setCurrencyOpen(false)}
                    />
                  )}
                </div>
                */}

                {/* Backdrop to close menu when clicking outside */}
                {langOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => { setLangOpen(false); setShowGTranslate(false); }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <div className="flex items-center gap-2 animate-in fade-in duration-700">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  suppressHydrationWarning
                  className="p-2 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 bg-white/70 dark:bg-black/60 backdrop-blur-md border border-zinc-200/70 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors shadow-xs"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="relative">
                  <button
                    onClick={() => { setLangOpen(!langOpen); if (langOpen) setShowGTranslate(false); }}
                    suppressHydrationWarning
                    className="flex items-center gap-1.5 p-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white/70 dark:bg-black/60 backdrop-blur-md border border-zinc-200/70 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-900 rounded-xl cursor-pointer transition-colors shadow-xs"
                  >
                    <img
                      src={currentLocaleObj.flagUrl}
                      alt={currentLocaleObj.label}
                      width={16}
                      height={12}
                      className="w-4 h-3 object-cover rounded-xs shadow-xs"
                    />
                    <span className="font-bold uppercase">{locale}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${langOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>
                  <div className={`absolute top-full right-0 pt-2 w-52 z-50 notranslate ${langOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-zinc-200/80 dark:border-white/10 max-h-[70vh] overflow-y-auto">
                      <div className="flex flex-col gap-1">
                        {LOCALES.map((l) => {
                          const targetHref = `/${l.code}${pathname.replace(new RegExp(`^/${locale}`), '') || ''}`;
                          return (
                            <a
                              key={l.code}
                              href={targetHref}
                              onClick={(e) => {
                                e.preventDefault();
                                changeLanguage(l.code);
                              }}
                              className={`flex items-center gap-3 text-sm text-left px-3 py-2.5 rounded-lg font-medium transition-colors ${locale === l.code
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                }`}
                            >
                              <img src={l.flagUrl} alt={l.label} width={20} height={15} className="w-5 h-auto rounded-[2px] shadow-sm" />
                              <span>{l.label}</span>
                            </a>
                          );
                        })}
                      </div>
                      <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                        <button
                          onClick={() => setShowGTranslate(true)}
                          className={`w-full text-xs text-center px-3 py-2 rounded-lg font-semibold text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${showGTranslate ? 'hidden' : 'block'}`}
                        >
                          More Languages...
                        </button>

                        <div className={`p-1 animate-in fade-in duration-300 ${showGTranslate ? 'block' : 'hidden'}`}>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-2 text-center">Powered by Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-200 bg-white/70 dark:bg-black/60 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200/70 dark:border-white/10 cursor-pointer shadow-xs transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl px-4 pt-3 pb-6 mt-2 space-y-3 shadow-2xl">

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = (pathname === link.href) || (link.href !== `/${locale}` && pathname.startsWith(link.href));
                return (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href, (link as any).isAnchorToHome)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400'
                    }`}
                  >
                    {link.name}
                  </a>
                  {link.subItems && (
                    <div className="ml-2 pl-2 flex flex-col gap-0.5 mt-1">
                      {link.subItems.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={(e) => handleAnchorClick(e, sub.href)}
                          className="block px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2.5">
            </div>
          </div>
        )}
        <div id="tour-subnav-portal"></div>
      </header>

      {clubModalOpen && (
        <AffiliateClubModal
          isOpen={clubModalOpen}
          onClose={() => setClubModalOpen(false)}
        />
      )}
    </div>
  );
}
