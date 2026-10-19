'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useChatPanelOpen } from '@/hooks/useChatPanelOpen';

type ConsentChoice = 'accepted' | 'essential';

type ConsentManagerProps = {
  locale: string;
  gaId: string | string[];
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
  // En móvil la píldora "Cookies" tapaba el campo de texto del chat: se oculta mientras está abierto.
  const chatOpen = useChatPanelOpen();
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
      const gaIds = Array.isArray(gaId) ? gaId : [gaId];
      gaIds.forEach((id) => {
        if (id) {
          window.gtag?.('config', id, {
            anonymize_ip: true,
            allow_google_signals: false,
          });
        }
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
    if (!hasSavedChoice || chatOpen) return null;

    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
      className="fixed bottom-4 left-4 z-[70] rounded-full border border-zinc-700 bg-zinc-950/90 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md transition hover:border-emerald-400 hover:text-emerald-300 max-md:[html[data-vr-bottom-bar=md]_&]:bottom-[84px] max-lg:[html[data-vr-bottom-bar=lg]_&]:bottom-[140px]"
        aria-label={t.title}
      >
        {t.manage}
      </button>
    );
  }

  return (
    // Franja compacta abajo: no tapa la galería ni el contenido. Las dos opciones tienen
    // exactamente el mismo estilo (mismo peso visual), como exige el consentimiento libre.
    <section
      aria-label={t.title}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-zinc-950/95 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-3 md:flex-row md:items-center md:gap-6">
        <p className="text-xs leading-snug text-zinc-200 md:text-[13px]">
          <span className="font-semibold text-white">{t.title}.</span>{' '}
          {t.body}{' '}
          <a href={policyHref} className="font-semibold text-emerald-300 underline underline-offset-2 hover:text-emerald-200">
            {t.policy}
          </a>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
          <button
            type="button"
            onClick={() => saveChoice('essential')}
            className="min-h-10 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 md:whitespace-nowrap"
          >
            {t.essential}
          </button>
          <button
            type="button"
            onClick={() => saveChoice('accepted')}
            className="min-h-10 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 md:whitespace-nowrap"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </section>
  );
}
