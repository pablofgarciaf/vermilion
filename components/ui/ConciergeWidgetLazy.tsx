'use client';

import dynamic from 'next/dynamic';

const ConciergeWidget = dynamic(
  () => import('@/components/ui/ConciergeWidget').then((m) => ({ default: m.ConciergeWidget })),
  { ssr: false, loading: () => null }
);

export function ConciergeWidgetLazy() {
  return <ConciergeWidget />;
}
