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
  policy: string;
}> = {
  es: {
    title: 'Tu privacidad importa',
    body: 'Usamos cookies esenciales para operar el sitio. Con tu permiso, activamos analítica y medición publicitaria para mejorar la experiencia y medir campañas.',
    accept: 'Aceptar medición',
    essential: 'Solo esenciales',
    policy: 'Ver política de privacidad',
  },
  en: {
    title: 'Your privacy matters',
    body: 'We use essential cookies to operate the site. With your permission, we enable analytics and advertising measurement to improve the experience and measure campaigns.',
    accept: 'Accept measurement',
    essential: 'Essentials only',
    policy: 'View privacy policy',
  },
  fr: {
    title: 'Votre confidentialité compte',
    body: 'Nous utilisons des cookies essentiels au fonctionnement du site. Avec votre accord, nous activons l’analyse et la mesure publicitaire.',
    accept: 'Accepter la mesure',
    essential: 'Essentiels seulement',
    policy: 'Voir la politique de confidentialité',
  },
  de: {
    title: 'Ihre Privatsphäre zählt',
    body: 'Wir verwenden notwendige Cookies für den Betrieb der Website. Mit Ihrer Zustimmung aktivieren wir Analyse- und Werbemessung.',
    accept: 'Messung akzeptieren',
    essential: 'Nur erforderliche',
    policy: 'Datenschutz ansehen',
  },
  zh: {
    title: '我们重视您的隐私',
    body: '我们使用必要 Cookie 来运行网站。经您同意后，我们会启用分析和广告衡量，以改善体验并衡量活动效果。',
    accept: '接受衡量',
    essential: '仅必要项',
    policy: '查看隐私政策',
  },
  it: {
    title: 'La tua privacy conta',
    body: 'Usiamo cookie essenziali per far funzionare il sito. Con il tuo consenso abilitiamo analisi e misurazione pubblicitaria.',
    accept: 'Accetta misurazione',
    essential: 'Solo essenziali',
    policy: 'Vedi privacy policy',
  },
  pt: {
    title: 'A sua privacidade importa',
    body: 'Usamos cookies essenciais para operar o site. Com a sua permissão, ativamos análise e medição publicitária.',
    accept: 'Aceitar medição',
    essential: 'Só essenciais',
    policy: 'Ver política de privacidade',
  },
  ja: {
    title: 'プライバシーを尊重します',
    body: 'サイト運営に必要な Cookie を使用します。同意いただいた場合のみ、分析と広告測定を有効にします。',
    accept: '測定を許可',
    essential: '必須のみ',
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
      return;
    }

    setVisible(true);
  }, [applyConsent]);

  const saveChoice = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

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
