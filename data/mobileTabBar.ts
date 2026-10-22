/**
 * Barra inferior tipo app en móvil (components/layout/MobileTabBar.tsx).
 *
 * No se muestra donde ya hay una barra de reserva propia abajo (ficha de tour,
 * reserva, pago) ni en áreas privadas. En esas rutas el asistente de IA y
 * WhatsApp siguen como botones flotantes; en el resto viven dentro de la barra.
 */
const HIDDEN = /\/(tours\/[^/]+|booking|checkout|admin|cpanel|affiliates|operator|auth)(\/|$)/;

export function showsMobileTabBar(pathname: string | null | undefined): boolean {
  return !HIDDEN.test(pathname || '');
}

/** La cabecera escucha este evento para abrir el menú con "Mis reservas" desplegado. */
export const OPEN_RESERVATIONS_EVENT = 'vr:open-reservations';

export function openReservations(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_RESERVATIONS_EVENT));
}
