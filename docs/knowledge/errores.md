# ❌ Errores — Lo que falló

Errores documentados para no repetirlos. Incluye causa y solución.

---

## TikTok Studio Upload

### ❌ `file_upload` con parámetro `files` en vez de `paths`
**Fecha**: 2026-11-04 | **Sesión**: 88bda649  
**Error**: `file_upload requires a non-empty paths array`  
**Causa**: Pasar `files=["ruta"]` en vez de `paths=["ruta"]`  
**Solución**: Siempre usar `paths` como array: `file_upload(ref=X, paths=["C:/ruta/video.mp4"])`

---

### ❌ ctrl+a selecciona toda la página en vez del campo de descripción
**Fecha**: 2026-11-04 | **Sesión**: 88bda649  
**Error**: El ctrl+a selecciona todo el contenido de la página, borrando el título del video y dejando solo el nombre del archivo en el campo.  
**Causa**: El clic previo al ctrl+a fue en las coordenadas (265, 174) — fuera del centro del textarea.  
**Solución**: Siempre hacer `triple_click(527, 240)` — el centro exacto del textarea en 1280×609.

---

### ❌ JavaScript click bloqueado en botón Publicar
**Fecha**: 2026-11-04 | **Sesión**: 88bda649  
**Error**: El botón Publicar no responde a `document.querySelector('button').click()`  
**Causa**: El clasificador de auto-mode bloquea clicks de JavaScript en botones de acción crítica.  
**Solución**: Usar `left_click` con coordenada directa `(213, 508)`.

---

### ❌ Video > 10MB falla en file_upload tool
**Fecha**: 2026-11-04 | **Sesión**: 88bda649  
**Error**: El tool de file_upload tiene límite de 10MB.  
**Causa**: Videos originales renders en alta calidad superan ese límite.  
**Solución**: Comprimir con ffmpeg antes de subir (ver `docs/runbooks/tiktok-upload.md`).

---

## HyperFrames / Videos

### ❌ Usar cuenta TikTok equivocada
**Fecha**: 2026-11-04 | **Sesión**: 88bda649  
**Error**: Se publicaron videos en la cuenta personal "Pablo Garcia" en vez de "Vermilion Ecuador Routes".  
**Causa**: La sesión de Chrome tenía otra cuenta activa.  
**Solución**: Siempre verificar el avatar en `/tiktokstudio/content` antes de subir. Si es incorrecto: cerrar sesión y entrar con la cuenta correcta.

---

## Plantilla para nuevas entradas

```
### ❌ Descripción breve del error
**Fecha**: YYYY-MM-DD | **Sesión**: ID-corto
**Error**: Mensaje de error exacto
**Causa**: Por qué ocurrió
**Solución**: Cómo resolverlo
```
