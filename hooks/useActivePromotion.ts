'use client';

import { useEffect, useState } from 'react';
import type { Promotion } from '@/data/promotions';
import { getActivePromotion } from '@/lib/promotions';

/**
 * Promo vigente según el reloj del visitante. Devuelve null en el render del
 * servidor y en el primer render del cliente (las páginas son estáticas: si se
 * decidiera en el build, la promo quedaría congelada en el HTML). Se revisa
 * cada minuto para que desaparezca sola al terminar, sin recargar.
 */
export function useActivePromotion(): Promotion | null {
  const [promo, setPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    const check = () => setPromo(getActivePromotion());
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return promo;
}
