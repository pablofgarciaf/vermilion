# 🎬 Runbook: Crear Video desde Template (Haiku-friendly)

**Modelo mínimo**: Haiku 4.5  
**Script**: `scripts/videos/generate-from-template.js`  
**Última actualización**: 2026-11-05 | Sesión: 88bda649

> Este runbook permite a **cualquier modelo pequeño** crear variantes de video sin necesitar entender HyperFrames, GSAP, ni audio carve.

---

## ¿Cuándo usar este runbook?

- Crear un nuevo video cambiando solo texto/fechas de un video existente
- Hacer una variante de campaña (Cyber Monday, Navidad, etc.) basada en BF
- Reutilizar una composición que ya funciona

---

## Paso 1 — Verificar que existe el template

Los templates están en `scripts/videos/templates/`. Listar:

```
ls scripts/videos/templates/
```

Templates disponibles (nov 2026):
- `bf-announcement/` → 30% OFF con 3 imágenes de Galápagos
- `bf-countdown/` → "X HOURS LEFT" con urgencia
- `bf-testimonial/` → Review de viajero con precio

> Si el template que necesitas no existe, pedir a Sonnet que cree uno nuevo con HyperFrames.

---

## Paso 2 — Identificar las variables del template

Abrir el `index.html` del template y buscar `{{nombre}}`:

```
cat scripts/videos/templates/bf-announcement/index.html | grep "{{"
```

Variables típicas:
- `{{headline}}` → Texto principal (ej: "30% OFF")
- `{{subheadline}}` → Subtexto (ej: "Private Expeditions")
- `{{deadline}}` → Fecha límite (ej: "Nov 30")
- `{{price}}` → Precio desde (ej: "$2,490")
- `{{reviewer_name}}` → Nombre del reseñador (solo en testimonial)
- `{{review_text}}` → Texto de la reseña (solo en testimonial)

---

## Paso 3 — Ejecutar el script

```bash
node scripts/videos/generate-from-template.js \
  --template bf-announcement \
  --vars '{"headline":"CYBER MONDAY","subheadline":"40% OFF Private Expeditions","deadline":"Dec 2"}'
```

> El video se guarda automáticamente en `C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\TikTok_Campañas\`

### Parámetros:
| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `--template` | Nombre del template (carpeta en `templates/`) | `bf-announcement` |
| `--output` | Ruta del video de salida | `public/videos/mi-video.mp4` |
| `--vars` | JSON con variables a reemplazar | `'{"headline":"SALE"}'` |

---

## Paso 4 — Verificar output

El script imprime al final la ruta del video listo para subir:
```
📤 Usar para subir a TikTok: public/videos/cyber-monday-announcement.mp4
```

Si el video era > 9.5 MB, también crea uno comprimido:
```
📤 Usar este archivo para subir a TikTok: public/videos/cyber-monday-announcement-upload.mp4
```

**Usar siempre el archivo `-upload.mp4`** si existe.

---

## Paso 5 — Subir a TikTok

Seguir el runbook: [tiktok-upload.md](./tiktok-upload.md)

---

## Ejemplos de campañas

### Cyber Monday
```bash
node scripts/videos/generate-from-template.js \
  --template bf-announcement \
  --vars '{"headline":"CYBER MONDAY","subheadline":"40% OFF Private Expeditions","deadline":"Dec 2"}'
```

### Navidad / Christmas
```bash
node scripts/videos/generate-from-template.js \
  --template bf-announcement \
  --vars '{"headline":"CHRISTMAS SALE","subheadline":"30% OFF Galápagos Expeditions","deadline":"Dec 25"}'
```

### Año Nuevo / New Year
```bash
node scripts/videos/generate-from-template.js \
  --template bf-countdown \
  --vars '{"headline":"NEW YEAR SALE","subheadline":"Last 24 Hours","deadline":"Jan 1"}'
```

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Template no encontrado` | El nombre del template no existe | Revisar `ls scripts/videos/templates/` |
| `npx hyperframes not found` | HyperFrames no instalado | `npm install` en la raíz del proyecto |
| `ffmpeg not found` | ffmpeg no en PATH | Instalar ffmpeg o usar video sin comprimir |
| Variables sin reemplazar (`{{headline}}`) | La variable existe en el template pero no se pasó en `--vars` | Agregar la variable al JSON de `--vars` |

---

## Cuándo NO usar este runbook

Si necesitas:
- **Cambiar imágenes de fondo** → Pedir a Sonnet con HyperFrames
- **Agregar nueva animación** → Pedir a Sonnet con HyperFrames  
- **Crear un template desde cero** → Pedir a Sonnet con hyperframes-core + hyperframes-audio
- **Cambiar música o voiceover** → Pedir a Sonnet con hyperframes-audio

Este runbook es SOLO para variantes de texto/datos en templates existentes.
