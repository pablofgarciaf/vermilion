# 🤖 Guía de IA para Vermilion Routes

Este archivo es el punto de entrada para cualquier IA (Claude, GPT, Gemini, Haiku, etc.)
que trabaje en este proyecto. Léelo primero.

## Índice de recursos para IA

| Archivo | Para qué sirve |
|---------|---------------|
| `docs/runbooks/tiktok-upload.md` | Subir videos a TikTok paso a paso |
| `docs/runbooks/create-video-hf.md` | Crear videos con HyperFrames |
| `docs/runbooks/create-video-simple.md` | Crear variantes de videos desde templates (para modelos pequeños) |
| `docs/runbooks/facebook-publish.md` | Publicar posts/fotos/videos en Facebook (Page Access Token) |
| `docs/knowledge/aciertos.md` | Lo que funcionó — no reinventar la rueda |
| `docs/knowledge/errores.md` | Lo que falló — no repetir errores |
| `docs/knowledge/sesiones.md` | Historial de sesiones importantes con ID |
| `scripts/tiktok/upload.js` | Script de upload automatizado |
| `scripts/videos/generate-from-template.js` | Genera MP4 desde template HTML |
| `scripts/social/facebook-publish.js` | Publica posts/fotos/videos en Facebook vía Graph API |

## Modelos recomendados por tarea

| Tarea | Modelo mínimo | Notas |
|-------|--------------|-------|
| Subir video a TikTok | **Haiku 4.5** | Seguir runbook exactamente |
| Publicar post en Facebook | **Haiku 4.5** | Usar script facebook-publish.js |
| Crear variante de video existente | **Haiku 4.5** | Usar script generate-from-template.js |
| Crear video nuevo desde cero | **Sonnet 4.5+** | Requiere HyperFrames skills |
| Diagnóstico de errores complejos | **Sonnet 4.5+** | — |
| Responder preguntas del sitio | **Haiku 4.5** | — |

## Convención de tracking

Cuando una IA crea algo importante (video, feature, fix):
1. Registrar en `docs/knowledge/sesiones.md` con el ID de conversación
2. Anotar el modelo usado y la fecha
3. Marcar si fue acierto o error

## Stack del proyecto

- **Framework**: Next.js (ver AGENTS.md para breaking changes)
- **Videos**: HyperFrames + GSAP + ffmpeg
- **Audio**: Kokoro TTS / Gemini TTS
- **DB**: Firebase/Firestore
- **Deploy**: Vercel
- **Social**: TikTok Studio (cuenta: Vermilion Ecuador Routes)
- **8 idiomas**: es, en, fr, de, zh, it, pt, ja

## ⚠️ Reglas críticas

1. **Solo un `.env`** en la raíz — nunca crear `.env.local` ni copias
2. **Ningún archivo > 500 líneas** — modularizar si se supera
3. **Sin películas oscuras** sobre imágenes (ver CLAUDE.md)
4. **Sin texto hardcodeado** — todo en `messages/*.json`
5. **Nunca imprimir secretos** en chat ni logs
