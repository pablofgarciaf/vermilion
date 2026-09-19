'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LuxuryContextType {
  isLuxuryMode: boolean;
  setLuxuryMode: (isLuxury: boolean) => void;
}

const LuxuryContext = createContext<LuxuryContextType | undefined>(undefined);

const STORAGE_KEY = 'vermilion:luxury-mode';

/**
 * Rutas donde el modo VIP se ve. El estado vive en toda la app (para que la
 * eleccion sobreviva al navegar del tour al booking y de ahi al pago), pero el
 * aspecto dorado solo se pinta donde el cliente esta decidiendo y pagando.
 */
function isLuxurySurface(pathname: string | null): boolean {
  if (!pathname) return false;
  return /\/(booking|checkout)(\/|$)/.test(pathname) || /\/tours\/[^/]+/.test(pathname);
}

export function LuxuryThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLuxuryMode, setLuxuryModeState] = useState(false);
  const pathname = usePathname();

  // Recupera la eleccion si el cliente recarga o llega al checkout en una carga nueva.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setLuxuryModeState(true);
    } catch {
      /* sessionStorage puede fallar en modo privado: el modo VIP no persiste y ya */
    }
  }, []);

  const setLuxuryMode = (value: boolean) => {
    setLuxuryModeState(value);
    try {
      if (value) sessionStorage.setItem(STORAGE_KEY, '1');
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* sin persistencia, pero el modo sigue activo en esta pagina */
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-luxury', isLuxuryMode && isLuxurySurface(pathname));
    return () => {
      root.classList.remove('theme-luxury');
    };
  }, [isLuxuryMode, pathname]);

  return (
    <LuxuryContext.Provider value={{ isLuxuryMode, setLuxuryMode }}>
      {children}
    </LuxuryContext.Provider>
  );
}

export function useLuxury() {
  const context = useContext(LuxuryContext);
  if (context === undefined) {
    return {
      isLuxuryMode: false,
      setLuxuryMode: () => {},
    };
  }
  return context;
}
