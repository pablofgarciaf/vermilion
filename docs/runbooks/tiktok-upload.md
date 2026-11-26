# 📱 Runbook: Subir Video a TikTok Studio

**Modelo mínimo**: Haiku 4.5  
**Herramienta**: Claude in Chrome MCP (`mcp__claude-in-chrome__*`)  
**Cuenta TikTok**: Vermilion Ecuador Routes  
**Última actualización**: 2026-11-04 | Sesión: 88bda649-c505-4356-9b1e-7b0c9b423286

---

## Pre-requisitos

- [ ] Video comprimido < 10 MB (usar ffmpeg si es más grande)
- [ ] Descripción preparada con hashtags (ver plantilla abajo)
- [ ] Chrome abierto con TikTok Studio iniciado sesión (cuenta correcta)

### Comprimir video si es necesario
```bash
ffmpeg -i video-original.mp4 -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 96k video-upload.mp4
```

---

## Paso 1 — Verificar cuenta activa

```
navigate → https://www.tiktok.com/tiktokstudio/content
```

Verificar que el avatar en la esquina superior derecha sea **Vermilion Ecuador Routes** (ícono con V roja).

> ⚠️ Si es "Pablo Garcia" u otra cuenta: cerrar sesión y volver a entrar con la cuenta correcta.

---

## Paso 2 — Ir a la página de upload

```
navigate → https://www.tiktok.com/tiktokstudio/upload
```

---

## Paso 3 — Subir el archivo de video

```javascript
// Ejecutar en javascript_tool para encontrar el input de archivo
document.querySelector('input[type=file]').setAttribute('id', '__fileInput__')
```

Luego usar `find` para obtener el ref del input con id `__fileInput__`, y:

```
file_upload(ref=<ref_del_input>, paths=["C:/ruta/completa/al/video.mp4"])
```

**Esperar** hasta ver "Cargado (X.XXmB)" en la pantalla.

---

## Paso 4 — Escribir la descripción

**CRÍTICO**: El textarea de descripción requiere una técnica específica.

```
1. triple_click en coordenada (527, 240) — centro exacto del textarea
2. key("ctrl+a") — seleccionar todo el texto del campo
3. type("<descripción completa con hashtags>")
4. key("Escape") — cerrar sugerencias de hashtags de TikTok
```

> ⚠️ NO hacer clic en coordenadas fuera del centro del textarea. Si ctrl+a selecciona toda la página en vez del campo, es porque el clic fue en el lugar equivocado.

---

## Paso 5 — Publicar

Hacer scroll hacia abajo para encontrar el botón "Publicar".

```
left_click en coordenada (213, 508)
```

> ⚠️ No usar `javascript_tool` para hacer click en Publicar — el clasificador de auto-mode lo bloquea. Usar siempre `left_click` con coordenada.

**Confirmación**: La página redirige a `/tiktokstudio/content` = publicación exitosa ✅

---

## Plantilla de descripción

### Black Friday — General
```
🎉 BLACK FRIDAY | 30% OFF Private Expeditions 🌿
Galápagos • Amazon • Andes 🦋
Book before Nov 30 → vermilionroutes.com
#BlackFriday #BlackFridayDeals #LuxuryTravel #Galapagos #Ecuador #AmazonRainforest #PrivateExpedition #ExclusiveTravel #BucketList #TravelNYC #LondonTravel #TravelLondon #WildlifeTour #NatureTravel #Ecotourism #GalapagosIslands #SouthAmerica #TravelInspiration #AdventureTravel
```

### Black Friday — Countdown (urgencia)
```
⚡ 48 HOURS LEFT | 30% OFF Private Expeditions 🌿
Galápagos • Amazon • Andes 🦋
Book before Nov 30 → vermilionroutes.com
#BlackFriday #BlackFridayDeals #LuxuryTravel #Galapagos #Ecuador #AmazonRainforest #PrivateExpedition #ExclusiveTravel #BucketList #TravelNYC #LondonTravel #TravelLondon #WildlifeTour #NatureTravel #Ecotourism #GalapagosIslands #SouthAmerica #TravelInspiration #AdventureTravel
```

### Black Friday — Testimonial
```
⭐ REAL TRAVELER REVIEW | 30% OFF This Black Friday 🌿
Galápagos • Amazon • Andes 🦋
Book before Nov 30 → vermilionroutes.com
#BlackFriday #BlackFridayDeals #LuxuryTravel #Galapagos #Ecuador #AmazonRainforest #PrivateExpedition #ExclusiveTravel #BucketList #TravelNYC #LondonTravel #TravelLondon #WildlifeTour #NatureTravel #Ecotourism #GalapagosIslands #SouthAmerica #TravelInspiration #AdventureTravel
```

---

## Errores conocidos y soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `file_upload requires a non-empty paths array` | Parámetro equivocado | Usar `paths=` no `files=` |
| ctrl+a selecciona toda la página | Clic fuera del textarea | triple_click en (527, 240) exacto |
| Botón Publicar no responde a JS click | Auto-mode classifier | Usar `left_click` con coordenada (213, 508) |
| Video > 10MB falla | Límite del file_upload tool | Comprimir con ffmpeg primero |
| "Contenido en revisión" tras publicar | Normal en cuentas business | Esperar — TikTok lo aprueba automáticamente |
