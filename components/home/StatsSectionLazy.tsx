'use client';

import dynamic from 'next/dynamic';

const StatsSection = dynamic(
  () => import('@/components/home/StatsSection').then((m) => ({ default: m.StatsSection })),
  { ssr: false, loading: () => null }
);

export function StatsSectionLazy() {
  return <StatsSection />;
}
