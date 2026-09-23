# Arquitectura de Componentes — Feature-Sliced Design (FSD Lite)

## Estructura

```
components/
│
├── features/               ← Componentes agrupados por DOMINIO DE NEGOCIO
│   ├── home/               
│   │   └── index.ts        ← Barrel: re-exporta todos los componentes de la home
│   ├── admin/              
│   │   └── index.ts        ← Barrel: re-exporta todos los componentes del panel admin
│   └── tours/              
│       └── index.ts        ← Barrel: re-exporta TourGallery, TourModal, etc.
│
├── shared/                 ← Componentes REUTILIZABLES entre features
│   ├── ui/                 
│   │   └── index.ts        ← Barrel: Button, TourCard, ConciergeWidget, etc.
│   └── layout/             
│       └── index.ts        ← Barrel: Navbar, Footer, ConditionalFooter
│
│── admin/                  ← (LEGACY) Implementaciones reales — no mover aún
├── home/                   ← (LEGACY) Implementaciones reales — no mover aún
├── layout/                 ← (LEGACY) Implementaciones reales — no mover aún
├── tours/                  ← (LEGACY) Implementaciones reales — no mover aún
├── ui/                     ← (LEGACY) Implementaciones reales — no mover aún
└── providers/              ← Providers de React context (ThemeProvider, etc.)
```

## Reglas de importación

### ✅ Forma nueva (preferida en código nuevo)
```ts
// Importar desde el barrel de la feature
import { HeroSlider, FeaturedTours } from '@/components/features/home';
import { AdminDashboard } from '@/components/features/admin';
import { Button, TourCard } from '@/components/shared/ui';
import { Navbar } from '@/components/shared/layout';
```

### ✅ Forma legacy (sigue siendo válida — no romper)
```ts
// Los imports directos siguen funcionando
import { HeroSlider } from '@/components/home/HeroSlider';
import { Button } from '@/components/ui/Button';
```

## Migración gradual

Los directorios `legacy` (`components/home/`, `components/admin/`, etc.) contienen
las implementaciones reales. Los directorios FSD (`features/`, `shared/`) son
**barrel-only** — únicamente re-exportan desde legacy.

La migración completa (mover los archivos físicos) debe hacerse de forma incremental,
feature por feature, con un PR dedicado por dominio para facilitar el code review.

## Convenciones FSD

| Capa | Directorio | Puede importar de |
|------|------------|-------------------|
| `features/*` | Dominio de negocio | `shared/*` |
| `shared/ui` | Primitivos de UI | Nada de `features` |
| `shared/layout` | Chrome de la app | `shared/ui` |

> **Regla de oro:** Las capas inferiores nunca importan de capas superiores.
> `shared` no sabe nada de `features`.

## Referencia Rápida de Archivos y Componentes

Para consultar la matriz completa de componentes visuales vs. archivos y llaves i18n, revise la **Sección 8 de [`ARCHITECTURE_MAP.md`](file:///c:/Users/pablo/Desktop/clon-vermilion/vermilion/ARCHITECTURE_MAP.md)**.

### Mapeo Rápido de Tours, Booking y Pagos

| Componente | Ruta Física | Función Principal |
| :--- | :--- | :--- |
| **`TourPricingTiersCard`** | `components/tours/TourPricingTiersCard.tsx` | Comparativa lado a lado de categorías: **Vermilion Club** ($1,050 USD base) vs **Vermilion VIP** ($1,190 USD base), nota de ocupación doble base y suplemento de 50% para viajeros individuales. 100% traducido a 8 idiomas sin ternarios binarios. |
| **`TourSubNav`** | `components/tours/TourSubNav.tsx` | Barra contextual sticky en scroll (>200px) que reemplaza al Navbar en `top: 0` con el logo de la marca. Activa en `/tours/[id]` y `/booking`. |
| **`TourItinerary`** | `components/tours/TourItinerary.tsx` | Acordeón día a día con soporte para los 8 idiomas oficiales (`Día X`, `Jour X`, `Tag X`, etc.), insignias de transporte y régimen de comidas. |
| **`BookingWizard`** | `components/booking/BookingWizard.tsx` | Asistente de reserva en 4 pasos (Pasajeros, Fechas, Categorías, Pasajero Principal). Integra el SubNav reemplazante y traducciones en 8 idiomas. |
| **`PriceCalculator`** | `components/booking/PriceCalculator.tsx` | Calculador reactivo en tiempo real: cálculo de suplemento individual (+50%), descuentos para niños (-20%), descuentos de embajador (-10%) y desglose fiduciario. |
| **`BookingSidebar`** | `components/tours/BookingSidebar.tsx` | Tarjeta lateral de reserva en tour individual: precio base ($1,050 USD), distintivos de confianza, contacto WhatsApp concierge y botón "Personalizar Viaje". |
| **`PayPalCheckoutButton`** | `components/checkout/PayPalCheckoutButton.tsx` | Botón transaccional oficial de PayPal SDK con fallback integrado, validación segura de email y soporte multilenguaje. |
| **`CheckoutPaymentPage`** | `app/[locale]/checkout/payment/page.tsx` | Pantalla de pago minimalista de impacto visual único: formulario de datos del pasajero principal (Nombre, Email, Teléfono), resumen fiduciario y pestañas de pago (PayPal / Tarjetas y Transferencia Internacional). |
| **`ConditionalNavbar`** | `components/layout/ConditionalNavbar.tsx` | Lógica de `isFullBleedHero`: en la Home y en `/tours/[id]`, el Hero Banner arranca en `top: 0` detrás del Navbar transparente (sin espaciador de 120px). |
