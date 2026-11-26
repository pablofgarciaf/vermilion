# 🎬 ANTIGRAVITY — Plan de videos TikTok Black Friday · Vermilion Routes

> Pega este archivo completo en Antigravity. Contiene todo lo necesario para generar los 3 videos y publicarlos.

---

## Contexto del proyecto

**Empresa:** Vermilion Routes — tours privados de lujo en Ecuador y Galápagos  
**Objetivo:** 3 videos cortos para TikTok/Reels promocionando Black Friday  
**Formato:** Vertical 1080×1920 px (9:16), 15 segundos cada uno  
**Motor:** HyperFrames 0.9.6 (ya instalado en esta máquina)  
**Carpeta de trabajo:** `C:\Users\pablo\AppData\Local\Temp\claude\...\scratchpad\bf-videos\`

---

## Paleta de marca

| Token | Hex | Uso |
|-------|-----|-----|
| Crimson | `#C0392B` | Badges, acentos, porcentaje |
| Gold | `#F0C040` | Texto de marca, CTA border, líneas |
| White | `#FFFFFF` | Texto principal |
| Black deep | `#0A0A0A` | Fondo base |

**Tipografía:** Georgia (display/títulos) · Arial (cuerpo/detalles)

---

## VIDEO 1 — Black Friday Announcement (ya creado)

📁 Ruta: `bf-videos/bf-announcement/index.html`  
**Duración:** 15 s | **Estilo:** Motion graphic elegante, dark/gold

**Secuencia de animación:**
1. `0.1 s` → "VERMILION ROUTES" fade-in desde arriba (dorado)
2. `0.4 s` → Líneas doradas horizontales se expanden (arriba y abajo del frame)
3. `1.2 s` → Badge rojo "BLACK FRIDAY" punch-in con bounce
4. `2.0 s` → "30% OFF" enorme, blur-to-focus desde grande a tamaño
5. `3.2 s` → "Private Expeditions / Ecuador & Galápagos" slide up
6. `4.5 s` → "Galapagos · Amazon · Andes | Luxury. Adventure. Nature." fade
7. `6.0 s` → Botón "BOOK NOW" con borde dorado, bounce in + pulso suave
8. `14.2 s` → Fade out general

**Comando para renderizar:**
```
cd bf-videos\bf-announcement
npm run check   ← primero lint
npm run render  ← genera el MP4
```

---

## VIDEO 2 — Urgency Countdown (crear desde cero)

📁 Ruta: `bf-videos\bf-countdown\`  
**Duración:** 15 s | **Estilo:** Fast-cut urgency, rojo dominante

**Para inicializar:**
```
cd bf-videos
npx hyperframes init bf-countdown --portrait
```

**Diseño del HTML (composition-id: "bf-countdown"):**

```
ESTRUCTURA VISUAL (1080×1920):

[0–2s]   Flash rojo full-screen → texto "⚠ OFERTA LIMITADA" blanco grande
[2–5s]   Fondo negro. Número grande: "48H" en crimson, subtítulo "quedan para el precio especial"
[5–9s]   Split layout:
          IZQUIERDA: foto/gradiente Galápagos (usar background CSS gradient azul-océano)
          DERECHA: "30% OFF" vertical en crimson bold
[9–13s]  Lista rápida con stagger (cada ítem aparece 0.3s después del anterior):
          ✓ Galápagos privado
          ✓ Amazonía exclusiva  
          ✓ Andes de lujo
[13–15s] CTA: "vermilionroutes.com" + "RESERVA ANTES QUE SE AGOTE"
```

**GSAP timeline clave:**
- Flash inicial: `tl.fromTo("#flash", {opacity:1}, {opacity:0, duration:0.3}, 0)`
- "48H": `tl.fromTo("#hours", {scale:2, opacity:0}, {scale:1, opacity:1, duration:0.5, ease:"power4.out"}, 2)`
- Lista stagger: `tl.fromTo(".item", {x:-60, opacity:0}, {x:0, opacity:1, stagger:0.25, duration:0.4}, 9)`

---

## VIDEO 3 — Testimonial Style (crear desde cero)

📁 Ruta: `bf-videos\bf-testimonial\`  
**Duración:** 15 s | **Estilo:** UGC orgánico, handheld feel

**Para inicializar:**
```
cd bf-videos
npx hyperframes init bf-testimonial --portrait
```

**Diseño del HTML (composition-id: "bf-testimonial"):**

```
ESTRUCTURA VISUAL (1080×1920):

Fondo: degradado de foto naturaleza simulado con CSS radial-gradient
  (azul-turquesa #0B3D5E → verde #1A4D2E → negro)

[0–3s]   Texto overlay estilo subtítulo:
          "Llevamos 6 años explorando Galápagos con Vermilion" 
          (tipografía cursiva/italic, blanco, 48px, fondo semi-transparente)

[3–7s]   Slide foto-card: fondo visual cambia a verde Amazonía
          Badge pequeño: ⭐⭐⭐⭐⭐ + "TripAdvisor"
          Texto: "La mejor expedición privada de mi vida"

[7–11s]  Panel central con precio:
          "PRECIO NORMAL: $4,200" (tachado)
          "BLACK FRIDAY: $2,940" (verde brillante grande)
          Subtexto: "Solo hasta el 30 de noviembre"

[11–15s] CTA final:
          Logo VERMILION ROUTES (texto dorado)
          "vermilionroutes.com"
          Flecha animada pulsando hacia abajo ↓
```

**GSAP highlights:**
- Subtítulos tipo UGC: `ease: "none"` para que aparezcan como subtítulos de video real
- Precio tachado: `tl.fromTo("#oldprice", {opacity:0}, {opacity:1, duration:0.3}, 7)` luego `tl.to("#oldprice", {textDecoration:"line-through"}, 8)`
- Flecha pulse: `tl.to("#arrow", {y:15, repeat:-1, yoyo:true, duration:0.6, ease:"sine.inOut"}, 12)`

---

## Reglas HyperFrames que DEBES respetar

1. **No CSS `transform` inicial + GSAP tween** en el mismo elemento. Usa solo `fromTo` para posicionar.
2. **No animar `.clip` directo** con `autoAlpha` ni `visibility`. Anima siempre un hijo.
3. **`window.__timelines["<id>"]`** debe coincidir exactamente con el `data-composition-id` del root.
4. **`tl.seek(0)` al final** del script, después de registrar el timeline.
5. **No `crossorigin`** en `<video>` o `<audio>`.
6. **Fuentes externas** necesitan `@font-face` local o usar las del sistema (Georgia, Arial OK).
7. **`data-duration` en el root** define la duración total del render, no el timeline.

---

## Checklist por video

```
[ ] npx hyperframes check   → 0 findings (lint + layout + contrast)
[ ] npx hyperframes preview → revisar visualmente en browser
[ ] npx hyperframes render  → genera MP4 en /dist/
[ ] Verificar que el MP4 tenga audio (si se añadió) y resolución 1080×1920
```

---

## Publicación en TikTok

Una vez renderizados los 3 MP4:

1. Abre TikTok for Business → **Contenido Orgánico** (no Ads)
2. Sube cada MP4 directamente desde `/dist/`
3. **Copies sugeridas:**

**Video 1 (Announcement):**
```
🚨 BLACK FRIDAY llegó a Vermilion Routes 🚨
30% OFF en expediciones privadas a Ecuador y Galápagos
🐢 Galápagos · 🌿 Amazonía · 🏔 Andes
Link en bio → vermilionroutes.com
#BlackFriday #Galapagos #Ecuador #TravelDeals #LuxuryTravel
```

**Video 2 (Countdown):**
```
⏰ Solo 48 horas para aprovechar este precio
30% OFF expediciones de lujo ¿Cuándo más verás esto?
Reserva antes que se agote 👇
#BlackFriday2026 #OfertaViajes #Galapagos
```

**Video 3 (Testimonial):**
```
"La mejor expedición privada de mi vida" ⭐⭐⭐⭐⭐
Este Black Friday lo hacemos posible para más familias
Solo hasta el 30 de noviembre · vermilionroutes.com
#Testimonial #Galapagos #LuxuryExpedition
```

---

## Plan de publicidad UK (TikTok Ads · £1/día)

Una vez publicados los videos orgánicos:

1. Ve a **TikTok Ads Manager** → Spark Ads
2. Selecciona los posts orgánicos recién publicados
3. Campaña: **Awareness** o **Traffic** (no Conversions con £1/día)
4. Targeting:
   - País: **United Kingdom**
   - Edad: 28–55
   - Intereses: Adventure travel, Luxury travel, Wildlife, Ecotourism
5. Presupuesto: **£1/día** por cada video (3 videos = £3/día total para test)
6. Duración: 7 días → evaluar CTR y CPM
7. Si CTR > 1.5%: escalar a £5–10/día

---

## Pendiente Meta / SinergIA App (paralelo)

App ID: `1640010274492424`  
Business: VERMILION SOUTHAMERICAN ROUTES SAS (verificado)

Para habilitar publicación en FB/IG/WhatsApp via API:
1. Ir a `developers.facebook.com/apps/1640010274492424/roles`
2. Añadir el usuario del MCP de Meta como Developer/Tester
3. Grabar el video de App Review (ver script en sesión anterior de Claude)
4. Enviar a revisión los permisos: `pages_manage_posts`, `instagram_content_publish`, `whatsapp_business_messaging`

---

*Generado por Claude Sonnet 4.6 — sesión TikTok Black Friday · Vermilion Routes*  
*Fecha: 2026-11-02*
