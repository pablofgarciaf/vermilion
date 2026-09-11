'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, X, Check } from 'lucide-react';
import { useLocale } from 'next-intl';

export const AFFILIATE_STORAGE_KEY = 'vermilion_vid';

/**
 * Helper to get the currently stored affiliate VID (from localStorage or cookie)
 */
export function getStoredAffiliateRef(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const local = localStorage.getItem(AFFILIATE_STORAGE_KEY);
    if (local) return local.toLowerCase().trim();

    // Fallback: check cookie
    const match = document.cookie.match(new RegExp('(^| )' + AFFILIATE_STORAGE_KEY + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]).toLowerCase().trim();
  } catch (e) {
    console.warn('Could not read affiliate vid from storage', e);
  }
  return null;
}

/**
 * Helper to store affiliate VID for 30 days
 */
export function setStoredAffiliateRef(ref: string) {
  if (typeof window === 'undefined' || !ref) return;
  const clean = ref.toLowerCase().trim();
  try {
    localStorage.setItem(AFFILIATE_STORAGE_KEY, clean);
    // Cookie valid for 30 days (2592000 seconds)
    document.cookie = `${AFFILIATE_STORAGE_KEY}=${encodeURIComponent(clean)}; path=/; max-age=2592000; SameSite=Lax`;
  } catch (e) {
    console.warn('Could not write affiliate vid to storage', e);
  }
}

export function isBookingCode(val: string): boolean {
  if (!val) return false;
  const clean = val.trim();
  return /^r-\d{4}-/i.test(clean) || /^vr-/i.test(clean) || /^\d+(\.\d+)?-\d{4}-\d+/i.test(clean);
}

/**
 * Global component that captures ?vid= (Vermilion ID) in the URL,
 * saves it to storage (localStorage + 30-day cookie), and shows a VIP discount notice.
 * Also supports legacy ?ref= and ?affiliate= for backwards compatibility.
 */
export function AffiliateTracker() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // 1. Check URL params — vid= is the canonical param, affiliate/code are fallbacks
    const explicitAffiliate = searchParams.get('vid') || searchParams.get('affiliate') || searchParams.get('code') || searchParams.get('affiliateCode');
    const refParam = searchParams.get('ref');
    
    let candidateRef = explicitAffiliate;
    if (!candidateRef && refParam && !isBookingCode(refParam)) {
      candidateRef = refParam;
    }
    
    // Ignore internal order/booking reference codes like VR-... or 1.1-2026-0001
    if (candidateRef && !isBookingCode(candidateRef)) {
      const clean = candidateRef.toLowerCase().trim();
      setStoredAffiliateRef(clean);
      setActiveRef(clean);
      setBannerVisible(true);
      return;
    }

    // 2. Check existing storage (also verify it's not a legacy saved booking code)
    const stored = getStoredAffiliateRef();
    if (stored && !isBookingCode(stored)) {
      setActiveRef(stored);
    } else if (stored && isBookingCode(stored)) {
      // Clear invalid booking code from localStorage/cookie
      try {
        localStorage.removeItem(AFFILIATE_STORAGE_KEY);
        document.cookie = `${AFFILIATE_STORAGE_KEY}=; path=/; max-age=0`;
      } catch (e) {}
    }
  }, [searchParams]);


  // Auto-dismiss banner after 6 seconds
  useEffect(() => {
    if (bannerVisible) {
      const timer = setTimeout(() => {
        setBannerVisible(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [bannerVisible]);

  if (!bannerVisible || !activeRef) return null;

  const vipTexts = {
    es: {
      title: '¡10% de Descuento VIP Activo!',
      desc: `Recomendado por @${activeRef}. Tu descuento se aplicará automáticamente al reservar.`
    },
    en: {
      title: '10% VIP Discount Active!',
      desc: `Referred by @${activeRef}. Your discount will apply automatically upon booking.`
    },
    fr: {
      title: 'Remise VIP de 10% Activée !',
      desc: `Recommandé par @${activeRef}. Votre réduction sera appliquée automatiquement.`
    },
    de: {
      title: '10% VIP-Rabatt Aktiviert!',
      desc: `Empfohlen von @${activeRef}. Ihr Rabatt wird automatisch angewendet.`
    },
    it: {
      title: 'Sconto VIP del 10% Attivo!',
      desc: `Consigliato da @${activeRef}. Il tuo sconto verrà applicato automaticamente.`
    },
    pt: {
      title: '10% de Desconto VIP Ativo!',
      desc: `Recomendado por @${activeRef}. Seu desconto será aplicado automaticamente.`
    },
    ja: {
      title: '10% VIP割引が適用されました！',
      desc: `@${activeRef} からの紹介。予約時に自動的に割引が適用されます。`
    },
    zh: {
      title: '10% VIP专属折扣已激活！',
      desc: `来自 @${activeRef} 的推荐。预订时将自动扣减优惠。`
    }
  }[locale] || {
    title: '10% VIP Discount Active!',
    desc: `Referred by @${activeRef}. Your discount will apply automatically upon booking.`
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in max-w-sm">
      <div className="bg-stone-950/95 text-white border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-bold text-amber-400">
            {vipTexts.title}
          </p>
          <p className="text-zinc-300 mt-0.5 leading-relaxed">
            {vipTexts.desc}
          </p>
        </div>
        <button
          onClick={() => setBannerVisible(false)}
          className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
