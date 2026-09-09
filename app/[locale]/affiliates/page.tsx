import type { Metadata } from 'next';
import { AffiliatesRedirectClient } from '@/components/affiliates/AffiliatesRedirectClient';

export const metadata: Metadata = {
  title: 'Vermilion Routes | Portal de Embajadores',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliatesRootPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center gap-4">
      <h1 className="text-white text-lg font-serif">Redirigiendo al portal de embajadores...</h1>
      <AffiliatesRedirectClient />
    </main>
  );
}