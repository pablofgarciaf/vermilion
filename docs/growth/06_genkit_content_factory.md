# Genkit: fábrica de contenido y asistente de leads

Repo: https://github.com/genkit-ai/genkit (Apache-2.0). Framework de código abierto del equipo de Firebase para construir apps con IA.
Lenguajes: JavaScript/TypeScript y Go (producción), Python (beta), Dart (preview).
Trae: flujos (*flows*), llamada a herramientas, RAG, **Developer UI local** para probar y ver trazas, y modelos de Google, OpenAI, Anthropic y Ollama.

## ¿Se puede instalar en tu computador? Sí
Es una librería de desarrollo, no un programa con ventanas. Requisitos: Node.js 20+ (las guías mencionan 18 o 20; verificar) y una API key de Gemini.

```bash
npm install -g genkit-cli
mkdir vermilion-content-factory && cd vermilion-content-factory
npm init -y && npm install genkit @genkit-ai/google-genai tsx
export GOOGLE_GENAI_API_KEY="..."        # en Windows: setx / archivo .env
genkit start -- npx tsx src/index.ts       # abre la Developer UI (normalmente localhost:4000)
```
> El nombre del paquete del plugin cambió entre versiones (`@genkit-ai/googleai` y `@genkit-ai/google-genai`). Comprobar en la documentación oficial antes de instalar.

**Va en una carpeta aparte, fuera del sitio.** No se añade al `package.json` de Vermilion, para no tocar el build ni las 230 páginas.

## Qué le damos de trabajo

| Flujo | Entrada | Salida | Salvaguarda |
|---|---|---|---|
| `captionFlow` | id del tour, categoría 3★/4★, idioma, red social | Caption, hashtags, texto alternativo | El **precio y lo incluido se leen de `data/mock.ts`**, el modelo no los inventa |
| `leadQualifyFlow` | Mensaje de WhatsApp | Idioma, tour de interés, categoría, fechas, borrador de respuesta | Un humano aprueba antes de enviar |
| `blogDraftFlow` | Palabra clave | Borrador con cápsula de respuesta, FAQ y JSON-LD | Revisión humana, datos verificados |
| `reviewReplyFlow` | Reseña (TripAdvisor/Google) | Borrador de respuesta | Humano publica |

## Límites honestos
- Genkit es una herramienta para desarrolladores, no un marketing automático. Alguien debe escribir y mantener los flujos.
- Traducir a 8 idiomas con IA requiere revisión nativa. Tú manejas EN y ES; los demás idiomas se publican tras revisión.
- Nunca publica solo: todo pasa por aprobación.
- El costo depende de tu plan de Gemini; verificar el plan gratuito y sus límites antes de depender de él.
- Ya existe un chat concierge en `app/api/concierge/chat`; Genkit sería una capa aparte para producir contenido, no lo sustituye.

## Orden recomendado
1. Instalar y correr `captionFlow` en local (1 día).
2. Generar el calendario de 30 días con precios reales y revisarlo (1 día).
3. Conectar `leadQualifyFlow` al webhook oficial de WhatsApp cuando tengas la Cloud API (semana 2).
