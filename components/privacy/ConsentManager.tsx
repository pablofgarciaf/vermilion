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
    body: 'Puedes aceptar cookies para ayudarnos a mejorar la web o rechazar las que no son necesarias. Las cookies necesarias se mantienen porque permiten que el sitio funcione.',
    accept: 'Aceptar cookies',
    essential: 'Rechazar no necesarias',
    manage: 'Cookies',
    policy: 'Ver política de privacidad',
  },
  en: {
    title: 'Cookies and privacy',
    body: 'You can accept cookies to help us improve the website or reject the ones that are not necessary. Necessary cookies remain because they keep the site working.',
    accept: 'Accept cookies',
    essential: 'Reject non-essential',
    manage: 'Cookies',
    policy: 'View privacy policy',
  },
  fr: {
    title: 'Cookies et confidentialité',
    body: 'Vous pouvez accepter les cookies pour nous aider à améliorer le site ou refuser ceux qui ne sont pas nécessaires. Les cookies nécessaires restent actifs pour faire fonctionner le site.',
    accept: 'Accepter les cookies',
    essential: 'Refuser les non nécessaires',
    manage: 'Cookies',
    policy: 'Voir la politique de confidentialité',
  },
  de: {
    title: 'Cookies und Datenschutz',
    body: 'Sie können Cookies akzeptieren, um die Website zu verbessern, oder nicht notwendige Cookies ablehnen. Notwendige Cookies bleiben aktiv, damit die Website funktioniert.',
    accept: 'Cookies akzeptieren',
    essential: 'Nicht notwendige ablehnen',
    manage: 'Cookies',
    policy: 'Datenschutz ansehen',
  },
  zh: {
    title: 'Cookie 与隐私',
    body: '您可以接受 Cookie 来帮助我们改进网站，也可以拒绝非必要 Cookie。必要 Cookie 会保留，因为它们用于保持网站正常运行。',
    accept: '接受 Cookie',
    essential: '拒绝非必要 Cookie',
    manage: 'Cookies',
    policy: '查看隐私政策',
  },
  it: {
    title: 'Cookie e privacy',
    body: 'Puoi accettare i cookie per aiutarci a migliorare il sito oppure rifiutare quelli non necessari. I cookie necessari restano attivi perché fanno funzionare il sito.',
    accept: 'Accetta cookie',
    essential: 'Rifiuta non necessari',
    manage: 'Cookies',
    policy: 'Vedi privacy policy',
  },
  pt: {
    title: 'Cookies e privacidade',
    body: 'Pode aceitar cookies para nos ajudar a melhorar o site ou rejeitar os que não são necessários. Os cookies necessários permanecem porque mantêm o site funcionando.',
    accept: 'Aceitar cookies',
    essential: 'Rejeitar não necessários',
    manage: 'Cookies',
    policy: 'Ver política de privacidade',
  },
  ja: {
    title: 'Cookie とプライバシー',
    body: 'サイト改善のために Cookie を許可するか、不要な Cookie を拒否できます。必要な Cookie はサイト運営のため保持されます。',
    accept: 'Cookie を許可',
    essential: '不要な Cookie を拒否',
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
