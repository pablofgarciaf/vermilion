# Pendientes para Antigravity (dejado por Claude, 22-oct-2026)

El dueño revisó producción y pidió que se corrija esto. En orden de prioridad:

## 1. Página /galapagos-activities (concepto bueno, presentación mala)
- **Imágenes repetidas**: muchas tarjetas usan la misma foto (fragata, lobo marino, Isabela, Las Grietas).
  Regla: cada actividad con su foto propia. Si no hay foto real del lugar (p. ej. Cráteres Gemelos),
  NO poner una foto de otro animal: usar una foto propia de `C:\Users\pablo\OneDrive\Imágenes\Vermilion`
  o dejar un fondo neutro con icono. Nada de fotos de stock.
- **Tarjetas demasiado grandes**: hacerlas compactas (imagen pequeña, título, 1 línea, botón), varias por fila.
  Revisar en móvil.
- Datos: `data/galapagosActivitiesData.ts` · componente: `components/tours/GalapagosActivitiesExplorer.tsx`.
- Ya se añadió el enlace "Actividades en Galápagos" en el menú Destinos (commit de este traspaso).

## 2. Botones flotantes (IA izquierda, WhatsApp derecha)
- En la home aparecen abajo; en otras páginas (p. ej. /tours/galapagos-7days) se ven a media pantalla.
  Revisar `components/ui/ConciergeWidget.tsx`, `components/ui/WhatsAppButton.tsx` y `data/mobileTabBar.ts`
  (en rutas sin barra inferior se suben a `bottom-[84px] sm:bottom-24` por la barra de reserva; en escritorio
  deben quedar abajo `md:bottom-6`).

## 3. "(Con Transfers UIO)" en títulos de tours
- Se quitó de `data/mock.ts` (6 idiomas). Si producción sigue mostrándolo, el título viene de Firestore
  (colección de tours): editarlo allí en los 8 idiomas.

## 4. Ficha de tour: espacio en blanco a la derecha
- En /tours/galapagos-7days, bajo la galería, la columna derecha queda vacía junto a precios y botones.
  Rellenarla (resumen, incluye/no incluye, o la caja de dudas) o pasar a una columna.

## 5. Galerías de destinos
- Se corrigieron duplicados en Santa Cruz e Isabela (`data/destinationsData.ts`). Revisar el resto con hash de archivo:
  hay archivos distintos con la misma imagen (p. ej. `*-16-9.1.webp` = `*-16-9.2.webp`).

## Ya hecho hoy (no rehacer)
- Barra inferior tipo app en móvil, "Planifica" a la izquierda en la cabecera.
- Descarga de PDF pide celular, avisa al equipo y envía correo al cliente (`/api/leads/itinerary`).
- CRM muestra qué pidió cada lead y si salió el correo.
- Suscripción del blog arreglada (antes daba 404).

Reglas del proyecto: AGENTS.md (8 idiomas, `npm run build` en verde, un solo `.env`, sin secretos).
