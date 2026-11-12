'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { setConsentCookie, type ConsentRegion } from '@/lib/consent/constants';

/** 'essential' se mantiene por compatibilidad con la clave guardada en localStorage. */
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

function readSavedChoice(): ConsentChoice | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'accepted' || saved === 'essential' ? saved : null;
  } catch {
    return null;
  }
}

/** Región (UE/Reino Unido/Suiza/EEE o resto del mundo) y Global Privacy Control desde el servidor. */
async function fetchConsentContext(locale: string): Promise<{ region: ConsentRegion; gpc: boolean }> {
  try {
    const res = await fetch(`/api/consent/context?locale=${encodeURIComponent(locale)}`, { cache: 'no-store' });
    const json = (await res.json()) as { region?: string; gpc?: boolean };
    return { region: json.region === 'notice' ? 'notice' : 'optin', gpc: json.gpc === true };
  } catch {
    // Si no se puede saber el país, se aplica la regla más estricta (consentimiento previo).
    return { region: 'optin', gpc: false };
  }
}

function browserSendsGpc(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function ConsentManager({ locale, gaId, metaPixelId, clarityProjectId }: ConsentManagerProps) {
  const t = useTranslations('consent');
  const [visible, setVisible] = useState(false);
  const [region, setRegion] = useState<ConsentRegion>('optin');
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

      // Notificar a dataLayer para que GTM registre el evento de consentimiento aceptado
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cookie_consent_accepted',
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
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cookie_consent_rejected',
      });
    }
  }, [clarityProjectId, gaId, metaPixelId]);

  const saveChoice = useCallback((choice: ConsentChoice, source: 'user' | 'gpc', regionUsed: ConsentRegion) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
      window.localStorage.setItem(`${STORAGE_KEY}_record`, JSON.stringify({
        choice,
        source,
        region: regionUsed,
        updatedAt: new Date().toISOString(),
        version: 2,
      }));
    } catch {
      // Sin almacenamiento local el consentimiento vale solo para esta visita.
    }
    setConsentCookie(choice === 'accepted' ? 'accepted' : 'rejected');
    applyConsent(choice);
    setVisible(false);
  }, [applyConsent]);

  useEffect(() => {
    const saved = readSavedChoice();
    if (saved) {
      setConsentCookie(saved === 'accepted' ? 'accepted' : 'rejected');
      applyConsent(saved);
      return;
    }

    let cancelled = false;
    fetchConsentContext(locale).then(({ region: detected, gpc }) => {
      if (cancelled) return;
      setRegion(detected);
      // Global Privacy Control se trata como rechazo: no se muestra el aviso y no se guarda nada.
      if (gpc || browserSendsGpc()) {
        saveChoice('essential', 'gpc', detected);
        return;
      }
      setVisible(true);
    });
    return () => {
      cancelled = true;
    };
  }, [applyConsent, locale, saveChoice]);

  // Tras elegir no queda ningún botón flotante: el enlace "Cookies" del pie (Footer.tsx) dispara
  // este evento para volver a abrir el aviso.
  useEffect(() => {
    const open = () => {
      fetchConsentContext(locale).then(({ region: detected }) => {
        setRegion(detected);
        setVisible(true);
      });
    };
    window.addEventListener('vr-open-consent', open);
    return () => window.removeEventListener('vr-open-consent', open);
  }, [locale]);

  if (!visible) return null;

  const body = region === 'optin' ? t('bodyOptIn') : t('bodyNotice');

  return (
    // Franja compacta abajo: no tapa la galería ni el contenido. Las dos opciones tienen
    // exactamente el mismo estilo (mismo peso visual), como exige el consentimiento libre.
    <section
      aria-label={t('title')}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-zinc-950/95 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2.5 px-4 py-3 md:flex-row md:items-center md:gap-6">
        <p className="text-xs leading-snug text-zinc-200 md:text-[13px]">
          <span className="font-semibold text-white">{t('title')}.</span>{' '}
          {body}{' '}
          <a href={policyHref} className="font-semibold text-emerald-300 underline underline-offset-2 hover:text-emerald-200">
            {t('policy')}
          </a>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
          <button
            type="button"
            onClick={() => saveChoice('essential', 'user', region)}
            className="min-h-10 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 md:whitespace-nowrap"
          >
            {t('reject')}
          </button>
          <button
            type="button"
            onClick={() => saveChoice('accepted', 'user', region)}
            className="min-h-10 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 md:whitespace-nowrap"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </section>
  );
}
