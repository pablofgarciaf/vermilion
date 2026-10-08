# Plan de crecimiento — Vermilion Routes

> Versión 1 · 2026-10-08 · Mercados: EE. UU., Reino Unido, Australia, España/LatAm (ES) · Idiomas operativos: EN y ES
> Presupuesto de referencia: ~US$400/mes · Estado: **borrador a validar** (precios, cuentas y APIs por confirmar)
> **Material listo en `docs/growth/`:** calendario de redes, Meta Ads, emails, afiliados, accesos y Genkit.

## 1. Punto de partida (datos reales)

| Dato | Valor | Fuente |
|---|---|---|
| Salud técnica del sitio | 100 / 100 | Ahrefs Webmaster (captura del usuario) |
| Páginas rastreadas | 833 (8 idiomas) | Ahrefs |
| Visitantes totales (30 d) | 617 | Ahrefs Web Analytics |
| Tráfico orgánico / keywords | 3.1 / 2 | Ahrefs |
| Dominios de referencia | 969 (+616 en 30 d) con DR 0 | Ahrefs. **Probable spam: no verificado**, la API devolvió "Insufficient plan" |
| Conectores con datos de Vermilion | Ninguno | Windsor solo tiene GA4 de otros proyectos |

**Lectura:** el sitio está bien construido técnicamente pero Google casi no lo conoce. El problema es visibilidad y confianza, no código ni precio.

> "Dominios de referencia" son **otros sitios web que enlazan al tuyo**, no páginas tuyas. Tus páginas son las 833 rastreadas (`/es/tours/...`, `/en/blog/...`, etc.).

## 2. Precios (hallazgo clave)

Tus tours de Galápagos **ya incluyen el vuelo doméstico Quito–Baltra–Quito** (`data/mock.ts`). Lo que **no** incluyen:

| Concepto | Monto (extranjero adulto) |
|---|---|
| Entrada al Parque Nacional Galápagos | US$ 200 (niños 2–11: US$ 100) |
| Tarjeta de Control de Tránsito (TCT/INGALA) | US$ 20 |
| Tasa muelle Isabela | US$ 10 |
| **Total a pagar aparte** | **~US$ 230 por adulto** |
| Vuelo internacional a Quito | no incluido |

Ecuador no cobra una "tasa de llegada" aeroportuaria general: lo que se paga aparte son la entrada al parque y la TCT. Hay que decirlo claro en cada ficha.

### Competencia (por persona, USD)

| Tour | Vermilion | Mercado |
|---|---|---|
| Galápagos terrestre 7 días | 2,050 | 2,259–2,907 (Galapagos Natural Life); 1,510–2,705 (Happy Gringo) |
| Ecuador + Galápagos 10–12 días | 2,590 | 3,265 (WeTravel, sin vuelo ni tasas); 5,125–7,900 (Rainforest Cruises) |

### Recomendación de precio con vuelo internacional

Se recomienda **no fusionar** el vuelo internacional en el precio base, por tres razones:
1. **Normativa:** en UE y Reino Unido, vender vuelo + hotel + tours se considera "paquete combinado" (Package Travel Directive / UK PTR 2018) y exige garantía de insolvencia y, en UK, ATOL. Consultar con un abogado antes de venderlo.
2. **Volatilidad:** la tarifa de ida y vuelta cambia por origen y fecha (NYC desde ~US$334–484; Londres desde ~£956; Madrid no verificado). Un precio fijo se queda desfasado.
3. **Margen:** el vuelo diluye tu margen y complica la comparación con competidores que publican "desde" sin vuelo.

**Propuesta:**
- Precio base visible: "**Desde US$ X** — incluye vuelo Quito–Galápagos–Quito. No incluye vuelo internacional, entrada al parque (US$ 200) ni TCT (US$ 20)".
- Cotización con vuelo (por WhatsApp o formulario): precio base + tarifa real del vuelo + comisión de gestión pactada. Referencia orientativa para el combinado de 12 días: ≈ US$ 2,950–3,500 con vuelo desde EE. UU., aún por debajo de los US$ 3,265 de WeTravel (sin vuelo) y de US$ 5,125+ de Rainforest Cruises. **A validar con cotización real de tu proveedor.**
- Alternativa sin riesgo legal: enlace de afiliado a un buscador de vuelos ("Vuelos desde tu ciudad").

## 3. Fases

### Fase 0 — Diagnóstico y medición (días 1–3)
- Conectar Search Console y GA4 de Vermilion; revisar y, si procede, **desautorizar los backlinks de spam** (Google Disavow).
- Eventos GA4/GTM: `view_item`, `generate_lead`, `begin_checkout`, `purchase`, clic en WhatsApp.
- Skills: `searchfit-seo:seo-audit`, `searchfit-seo:technical-seo`, `data:analyze`.

### Fase 1 — Inteligencia de mercado (días 2–6)
- Keywords por mercado (EN: *galapagos tour*, *ecuador galapagos combined*; ES: *viaje a galápagos desde españa*), competidores y brecha de contenido.
- Skills: `searchfit-seo:keyword-clustering`, `searchfit-seo:content-strategy`, `marketing:competitive-brief`.

### Fase 2 — Conversión del sitio (días 4–14)
- Precio "Desde US$ X" visible; bloque "qué incluye / qué no incluye" con los US$ 230 de tasas.
- CTA doble: reservar y "cotizar por WhatsApp"; sellos de confianza (Reg. Min. Turismo 1793215456001, reseñas TripAdvisor).
- Landings: Galápagos terrestre 7 días y Ecuador + Galápagos combinado (EN/ES).
- Respetar los 12 mandamientos de `AGENTS.md` (H1 45–65 caracteres, title 50–60, `npm run build` antes de cada commit). **Cualquier cambio que toque Hero Slider/GSAP se describe antes de ejecutarse.**
- Skills: `herald-growth-engineering`, `design:ux-copy`, `searchfit-seo:on-page-seo`.

### Fase 3 — SEO orgánico y visibilidad en IA (semanas 2–12)
- 2 artículos/semana con cápsula de respuesta, FAQ y esquema `BlogPosting` + `FAQPage`.
- Esquema `TouristTrip`/`Offer` con precio, enlazado interno blog → tour.
- Skills: `searchfit-seo:create-content`, `searchfit-seo:schema-markup`, `searchfit-seo:ai-visibility`.
- Expectativa realista: resultados orgánicos medibles a los 3–6 meses.

### Fase 4 — Canales de venta rápida (semanas 1–4)
- Google Business Profile completo, TripAdvisor, y evaluar Viator/GetYourGuide (comisión alta, pero tráfico inmediato).
- Meta click-to-WhatsApp (prueba pequeña, ES/España) y retargeting EN.
- Skills: `marketing:campaign-plan`.

### Fase 5 — Redes sociales (semanas 1–4, continuo)
- Calendario de 30 días: 3 Reels/semana (fauna, "qué incluye", precio vs. mercado), stories de testimonios, publicación EN y ES.
- Skills: `marketing:content-creation`, `postiz:postiz`, `rw-generate-video`.

### Fase 6 — Email y nurturing (semanas 2–6)
- Secuencia de 5 correos para leads (EN/ES): bienvenida → itinerario → prueba social → oferta → recordatorio.
- Skills: `marketing:email-sequence`.

### Fase 7 — Afiliados y vendedores (semanas 2–8)
- Página de reclutamiento y kit del afiliado (enlaces con `?ref=`, materiales, comisión clara).
- Captación en comunidades de viajes, guías y agentes freelance.
- Pendiente: confirmar % de comisión y esquema (el repo tiene red 10-3-2; revisar legalidad de estructuras multinivel en cada país antes de promocionarla).

### Fase 8 — Medición (continuo)
- Reporte semanal: visitas, leads, conversaciones de WhatsApp, costo por lead, reservas.
- Skills: `marketing:performance-report`.

## 4. Presupuesto orientativo (US$400/mes)

| Partida | US$/mes | Nota |
|---|---|---|
| Meta click-to-WhatsApp (ES) | 60–120 | Empezar con US$1–2/día y escalar solo si hay conversaciones reales |
| Retargeting EN (Meta) | 60–100 | A visitantes del sitio |
| Herramientas (vídeo, diseño) | 50–80 | Ajustar a lo que ya pagues |
| Reserva para pruebas | resto | Google Ads de marca o TripAdvisor |

Las cifras de costo por clic y por lead **no están verificadas**: se miden en las dos primeras semanas antes de escalar.

## 5. CRM sin riesgo de bloqueo

Tu panel `/admin` ya tiene pipeline de ventas y concierge de WhatsApp sobre Firestore. Para conectarlo sin que te baneen:

| Canal | Vía segura | Evitar |
|---|---|---|
| WhatsApp | **WhatsApp Business Platform (Cloud API)** de Meta | Librerías no oficiales (whatsapp-web.js, Baileys): la prohibición es por número y puede ser permanente |
| Instagram / Facebook | Graph API / Messenger Platform | Mensajes masivos o a personas que no te escribieron |
| Leads de anuncios | Webhook de Meta Lead Ads → Firestore | Compra de listas |

Reglas: responder dentro de las 24 h de la última escritura del cliente; usar plantillas aprobadas fuera de esa ventana; pedir consentimiento (RGPD/CCPA); número dedicado de WhatsApp Business.

## 6. Lo que debes confirmarme mañana

1. **Precios finales** y qué incluye cada tour (¿entrada al parque y TCT quedan fuera? ¿lo mismo con hotel de 3★ y 4★?).
2. **Anuncio de Expedia:** el resultado de búsqueda mostraba una oferta de 9 días (≈US$3,000, con vuelo a Galápagos, sin entrada al parque) y no pude verificar que sea tuya; la página no abrió desde esta sesión. Confirma si es tu listado.
3. **Meta Business:** acceso a la cuenta publicitaria, página de Facebook, Instagram y número de WhatsApp Business.
4. **Search Console y GA4** de Vermilion.
5. **Backlinks:** ¿los compraste o los generó un tercero?
6. **Comisión de afiliados** y esquema.
7. **Proveedor de vuelos** (o decisión de usar afiliado).

Las claves y tokens se cargan en variables de entorno o en el conector, **nunca** se pegan en el chat.


## 7. Actualización v1.1 (2026-10-08, noche)

### Precios por categoría de hotel
El tour **no cambia**; solo cambia la categoría. Precios del repo (por confirmar):

| Tour | 3★ | 4★ | Diferencia |
|---|---|---|---|
| Galápagos 6 días | 1,790 | 2,199 | 409 |
| Galápagos 7 días | 2,050 | 2,399 | 349 |
| Galápagos 8 días | 2,200 | 2,600 | 400 |
| Ecuador + Galápagos 11 días | 2,290 | 2,450 | 160 |
| Ecuador + Galápagos 12 días | 2,590 | 2,750 | 160 |

Palanca comercial: en los combinados, 4★ cuesta solo US$160 más. Las publicaciones se separan por categoría (ver `docs/growth/01_social_calendar_30d.md`).

### GA4: aclaración
La captura que enviaste es de la propiedad **`andicot-web-2`**, que es otro proyecto. Para Vermilion necesitamos el ID de medición del flujo web de vermilionroutes.com.

### Genkit
Se puede instalar en tu computador como **fábrica de contenido**, fuera del sitio. Detalle en `docs/growth/06_genkit_content_factory.md`.

### Entregables por fase

| Fase | Entregable listo | Archivo |
|---|---|---|
| 0 Medición | Checklist de accesos | `05_api_keys_checklist.md` |
| 1 Mercado | Pendiente de datos de Search Console | — |
| 2 Sitio | Cambios descritos en este plan; se ejecutan con tu aprobación | este archivo |
| 3 SEO | Genkit `blogDraftFlow` | `06_genkit_content_factory.md` |
| 4 Canales | Meta Ads + WhatsApp | `02_meta_ads_whatsapp.md` |
| 5 Redes | 12 captions, calendario | `01_social_calendar_30d.md` |
| 6 Email | Secuencia de 5 correos | `03_email_sequence.md` |
| 7 Afiliados | Kit y reglas | `04_affiliate_kit.md` |
| 8 Medición | Informe semanal tras conectar GA4 | — |
