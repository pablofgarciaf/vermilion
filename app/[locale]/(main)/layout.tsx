import React, { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full relative">{children}</main>
      {/* El ConciergeWidget ya lo monta app/[locale]/layout.tsx: montarlo aquí lo duplicaba. */}
      <ConditionalFooter />
    </>
  );
}
