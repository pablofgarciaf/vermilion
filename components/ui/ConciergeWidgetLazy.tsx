'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const ConciergeWidget = dynamic(
  () => import('@/components/ui/ConciergeWidget').then((m) => ({ default: m.ConciergeWidget })),
  { ssr: false, loading: () => null }
);

// El panel de administración (/{locale}/admin y subrutas) no muestra el asistente flotante.
const ADMIN_ROUTE = /^\/(en|es|fr|de|zh|it|pt|ja)\/admin(\/|$)/;

export function ConciergeWidgetLazy() {
  const pathname = usePathname();
  if (pathname && ADMIN_ROUTE.test(pathname)) return null;
  return <ConciergeWidget />;
}
