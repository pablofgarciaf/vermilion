'use client';

import { useEffect } from 'react';

const CONSENT_KEY = 'vr_privacy_consent_v1';
const SESSION_KEY = 'vr_device_session_recorded_v1';

function getDevice(): 'mobile' | 'tablet' | 'desktop' {
  if (window.innerWidth < 768) return 'mobile';
  if (window.innerWidth < 1024) return 'tablet';
  return 'desktop';
}

function recordVisit(): void {
  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted' || window.sessionStorage.getItem(SESSION_KEY)) return;
    window.sessionStorage.setItem(SESSION_KEY, 'true');
    void fetch('/api/analytics/device-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device: getDevice() }),
      keepalive: true,
    });
  } catch {
    // La medición nunca debe impedir el uso del sitio.
  }
}

/** Cuenta sesiones consentidas por tamaño de pantalla, sin conservar identificadores. */
export function DeviceVisitTracker() {
  useEffect(() => {
    recordVisit();
    window.addEventListener('vr-consent-changed', recordVisit);
    return () => window.removeEventListener('vr-consent-changed', recordVisit);
  }, []);

  return null;
}

