'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isTourDetail = !!pathname?.match(/^\/(en|es|fr|de|zh|it|pt|ja)\/tours\/[^/]+$/);
  // No mostrar el navbar en las rutas internas (affiliates, admin, cpanel, operator, auth, checkout)
  if (
    pathname?.includes('/affiliates') || 
    pathname?.includes('/admin') || 
    pathname?.includes('/cpanel') || 
    pathname?.includes('/operator') || 
    pathname?.includes('/auth') ||
    pathname?.includes('/checkout')
  ) return null;

  // Los detalles de tour usan TourSubNav como su única barra contextual.
  // Conservamos el portal para que el componente cliente pueda montarse sin
  // renderizar también la navegación global.
  if (isTourDetail) {
    return <div id="tour-subnav-portal" />;
  }

  // Las páginas con Hero Banner a pantalla completa (Home y Detalle de Tour)
  // inician en top: 0 detrás del navbar transparente; no requieren espaciador.
  const isFullBleedHero = 
    pathname === '/' || 
    !!pathname?.match(/^\/(en|es|fr|de|zh|it|pt|ja)\/?$/) ||
    isTourDetail;

  return (
    <>
      <Navbar />
      {/* Spacer so main content doesn't hide under fixed Navbar, except on full-bleed hero pages */}
      {!isFullBleedHero && <div className="h-20 sm:h-24 md:h-28 lg:h-[120px]" />}
    </>
  );
}
