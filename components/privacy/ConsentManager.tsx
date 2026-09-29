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
    body: 'Puedes aceptar cookies opcionales para mejorar la web o rechazarlas. Si las rechazas, no activamos analítica, anuncios, Meta Pixel ni Clarity; solo queda lo técnico necesario para que el sitio funcione.',
    accept: 'Aceptar cookies',
    essential: 'Rechazar cookies opcionales',
    manage: 'Cookies',
    policy: 'Ver política de privacidad',
  },
  en: {
    title: 'Cookies and privacy',
    body: 'You can accept optional cookies to improve the website or reject them. If you reject them, we do not enable analytics, ads, Meta Pixel, or Clarity; only the technical essentials remain.',
    accept: 'Accept cookies',
    essential: 'Reject optional cookies',
    manage: 'Cookies',
    policy: 'View privacy policy',
  },
  fr: {
    title: 'Cookies et confidentialité',
    body: 'Vous pouvez accepter les cookies optionnels pour améliorer le site ou les refuser. En cas de refus, nous n’activons pas l’analyse, les annonces, Meta Pixel ni Clarity.',
    accept: 'Accepter les cookies',
    essential: 'Refuser les cookies optionnels',
    manage: 'Cookies',
    policy: 'Voir la politique de confidentialité',
  },
  de: {
    title: 'Cookies und Datenschutz',
    body: 'Sie können optionale Cookies zur Verbesserung der Website akzeptieren oder ablehnen. Bei Ablehnung aktivieren wir keine Analyse, Anzeigen, Meta Pixel oder Clarity.',
    accept: 'Cookies akzeptieren',
    essential: 'Optionale Cookies ablehnen',
    manage: 'Cookies',
    policy: 'Datenschutz ansehen',
  },
  zh: {
    title: 'Cookie 与隐私',
    body: '您可以接受可选 Cookie 来改进网站，也可以拒绝它们。拒绝后，我们不会启用分析、广告、Meta Pixel 或 Clarity，只保留网站运行所需的技术项目。',
    accept: '接受 Cookie',
    essential: '拒绝可选 Cookie',
    manage: 'Cookies',
    policy: '查看隐私政策',
  },
  it: {
    title: 'Cookie e privacy',
    body: 'Puoi accettare i cookie opzionali per migliorare il sito oppure rifiutarli. Se li rifiuti, non attiviamo analisi, annunci, Meta Pixel o Clarity.',
    accept: 'Accetta cookie',
    essential: 'Rifiuta cookie opzionali',
    manage: 'Cookies',
    policy: 'Vedi privacy policy',
  },
  pt: {
    title: 'Cookies e privacidade',
    body: 'Pode aceitar cookies opcionais para melhorar o site ou rejeitá-los. Se rejeitar, não ativamos análise, anúncios, Meta Pixel ou Clarity.',
    accept: 'Aceitar cookies',
    essential: 'Rejeitar cookies opcionais',
    manage: 'Cookies',
    policy: 'Ver política de privacidade',
  },
  ja: {
    title: 'Cookie とプライバシー',
    body: 'サイト改善のために任意 Cookie を許可するか拒否できます。拒否した場合、分析、広告、Meta Pixel、Clarity は有効にしません。',
    accept: 'Cookie を許可',
    essential: '任意 Cookie を拒否',
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
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-3xl border border-white/15 bg-zinc-950/95 p-5 text-white shadow-2xl backdrop-blur-md md:inset-x-auto md:right-10 md:bottom-28 md:mx-0 md:max-w-md md:p-4 xl:right-16 xl:bottom-32"
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h2 className="text-base font-semibold tracking-wide">{t.title}</h2>
          <p className="text-sm leading-relaxed text-zinc-200">{t.body}</p>
          <a href={policyHref} className="text-sm font-semibold text-emerald-300 underline-offset-4 hover:underline">
            {t.policy}
          </a>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
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
