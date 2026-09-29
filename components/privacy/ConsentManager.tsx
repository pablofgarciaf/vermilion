'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type ConsentChoice = 'accepted' | 'essential';

type ConsentManagerProps = {
  locale: string;
  gaId: string;
  metaPixelId?: string;
  clarityProjectId?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = 'vr_privacy_consent_v1';

const copy: Record<string, {
  title: string;
  body: string;
  accept: string;
  essential: string;
  manage: string;
  policy: string;
}> = {
  es: {
    title: 'Cookies y privacidad',
    body: 'Usamos cookies necesarias para que la web funcione. Con tu permiso, también usamos cookies opcionales para entender visitas, mejorar la experiencia y optimizar campañas.',
    accept: 'Aceptar cookies opcionales',
    essential: 'Solo cookies necesarias',
    manage: 'Cookies',
    policy: 'Ver política de privacidad',
  },
  en: {
    title: 'Cookies and privacy',
    body: 'We use necessary cookies to keep the website working. With your permission, we also use optional cookies to understand visits, improve the experience, and optimize campaigns.',
    accept: 'Accept optional cookies',
    essential: 'Necessary cookies only',
    manage: 'Cookies',
    policy: 'View privacy policy',
  },
  fr: {
    title: 'Cookies et confidentialité',
    body: 'Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord, nous utilisons aussi des cookies optionnels pour améliorer l’expérience et les campagnes.',
    accept: 'Accepter les cookies optionnels',
    essential: 'Cookies nécessaires seulement',
    manage: 'Cookies',
    policy: 'Voir la politique de confidentialité',
  },
  de: {
    title: 'Cookies und Datenschutz',
    body: 'Wir verwenden notwendige Cookies für den Betrieb der Website. Mit Ihrer Zustimmung nutzen wir optionale Cookies, um Besuche zu verstehen und Kampagnen zu verbessern.',
    accept: 'Optionale Cookies akzeptieren',
    essential: 'Nur notwendige Cookies',
    manage: 'Cookies',
    policy: 'Datenschutz ansehen',
  },
  zh: {
    title: 'Cookie 与隐私',
    body: '我们使用必要 Cookie 保持网站正常运行。经您同意后，我们也会使用可选 Cookie 来了解访问、改善体验并优化广告活动。',
    accept: '接受可选 Cookie',
    essential: '仅必要 Cookie',
    manage: 'Cookies',
    policy: '查看隐私政策',
  },
  it: {
    title: 'Cookie e privacy',
    body: 'Usiamo cookie necessari per far funzionare il sito. Con il tuo consenso usiamo anche cookie opzionali per capire le visite, migliorare l’esperienza e ottimizzare le campagne.',
    accept: 'Accetta cookie opzionali',
    essential: 'Solo cookie necessari',
    manage: 'Cookies',
    policy: 'Vedi privacy policy',
  },
  pt: {
    title: 'Cookies e privacidade',
    body: 'Usamos cookies necessários para o site funcionar. Com a sua permissão, também usamos cookies opcionais para entender visitas, melhorar a experiência e otimizar campanhas.',
    accept: 'Aceitar cookies opcionais',
    essential: 'Só cookies necessários',
    manage: 'Cookies',
    policy: 'Ver política de privacidade',
  },
  ja: {
    title: 'Cookie とプライバシー',
    body: 'サイト運営に必要な Cookie を使用します。同意いただいた場合のみ、任意 Cookie を使って訪問状況を理解し、体験とキャンペーンを改善します。',
    accept: '任意 Cookie を許可',
    essential: '必要な Cookie のみ',
    manage: 'Cookies',
    policy: 'プライバシーポリシー',
  },
};

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtagShim(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

function loadExternalScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function ConsentManager({ locale, gaId, metaPixelId, clarityProjectId }: ConsentManagerProps) {
  const [visible, setVisible] = useState(false);
  const [hasSavedChoice, setHasSavedChoice] = useState(false);
  const t = useMemo(() => copy[locale] || copy.en, [locale]);
  const policyHref = `/${locale}/privacy-policy`;

  const applyConsent = useCallback((choice: ConsentChoice) => {
    ensureGtag();

    if (choice === 'accepted') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
      window.gtag?.('js', new Date());
      window.gtag?.('config', gaId, {
        anonymize_ip: true,
        allow_google_signals: false,
      });

      if (metaPixelId && !window.fbq) {
        loadExternalScript('vr-meta-pixel', 'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq = function fbqShim(...args: unknown[]) {
          (window.fbq as { queue?: unknown[] }).queue = (window.fbq as { queue?: unknown[] }).queue || [];
          (window.fbq as { queue?: unknown[] }).queue?.push(args);
        };
        window.fbq('init', metaPixelId);
        window.fbq('track', 'PageView');
      }

      if (clarityProjectId && !window.clarity) {
        window.clarity = function clarityShim(...args: unknown[]) {
          (window.clarity as { q?: unknown[] }).q = (window.clarity as { q?: unknown[] }).q || [];
          (window.clarity as { q?: unknown[] }).q?.push(args);
        };
        loadExternalScript('vr-microsoft-clarity', `https://www.clarity.ms/tag/${clarityProjectId}`);
      }
    } else {
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }
  }, [clarityProjectId, gaId, metaPixelId]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;

    if (saved === 'accepted' || saved === 'essential') {
      applyConsent(saved);
      setHasSavedChoice(true);
      return;
    }

    setVisible(true);
  }, [applyConsent]);

  const saveChoice = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    window.localStorage.setItem(`${STORAGE_KEY}_record`, JSON.stringify({
      choice,
      updatedAt: new Date().toISOString(),
      version: 1,
    }));
    applyConsent(choice);
    setHasSavedChoice(true);
    setVisible(false);
  };

  if (!visible) {
    if (!hasSavedChoice) return null;

    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="fixed bottom-4 left-4 z-[70] rounded-full border border-zinc-700 bg-zinc-950/90 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md transition hover:border-emerald-400 hover:text-emerald-300"
        aria-label={t.title}
      >
        {t.manage}
      </button>
    );
  }

  return (
    <section
      aria-label={t.title}
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-3xl border border-white/15 bg-zinc-950/95 p-5 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-base font-semibold tracking-wide">{t.title}</h2>
          <p className="text-sm leading-relaxed text-zinc-200">{t.body}</p>
          <a href={policyHref} className="text-sm font-semibold text-emerald-300 underline-offset-4 hover:underline">
            {t.policy}
          </a>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          <button
            type="button"
            onClick={() => saveChoice('accepted')}
            className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-300"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => saveChoice('essential')}
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            {t.essential}
          </button>
        </div>
      </div>
    </section>
  );
}
