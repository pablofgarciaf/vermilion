# Mapa del administrador

Este directorio reúne todo el panel administrativo y operativo. La intención es que cada cambio tenga una
ubicación obvia y que la pantalla principal solo coordine módulos pequeños.

## Rutas

| Necesidad | Ruta | Componente o API responsable |
| --- | --- | --- |
| Administración y operaciones | `/[locale]/admin` | `EnterpriseDashboard.tsx` |
| Rendimiento comercial | `/[locale]/admin/analytics` | `../admin/CommercialPerformancePanel.tsx` |
| Actividad de WhatsApp y chat | API | `app/api/admin/crm-activity/route.ts` |
| Métricas comerciales agregadas | API | `app/api/admin/commercial-performance/route.ts` |

## División objetivo del CRM

| Área | Archivo destino | Qué se cambia allí |
| --- | --- | --- |
| Orquestación, sesión y pestaña activa | `EnterpriseDashboard.tsx` | Solo estado compartido y composición de módulos. |
| Navegación y roles | `dashboard/CrmNavigation.tsx` | Menú móvil/escritorio y permisos por rol. |
| Resumen ejecutivo | `dashboard/OverviewPanel.tsx` | GMV, cobros, operaciones y embajadores. |
| Pipeline | `dashboard/SalesPipelinePanel.tsx` | Filtros, etapas del lead y ficha del pasajero. |
| Operación y amenities | `dashboard/OperationsPanel.tsx` | Run-sheets y entregas Pakari. |
| Finanzas y afiliados | `dashboard/FinanceAndAffiliatePanel.tsx` | P&L, comisiones y genealogía. |
| Concierge y equipo | `dashboard/ConciergeAndTeamPanel.tsx` | Plantillas y colaboradores. |
| Diálogos | `dashboard/CrmModals.tsx` | Cotizador, pasajero, run-sheet, pago y usuario. |
| Sincronización Firestore | `hooks/crm/` | Mapeadores, estado inicial y `useCrmData`. |

## Regla de edición

No añadir secciones completas dentro de `EnterpriseDashboard.tsx`. Una vista nueva
debe ser un panel propio dentro de `dashboard/`, con menos de 500 líneas, y el
archivo principal solo la importa.
