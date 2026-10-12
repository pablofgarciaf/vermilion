# Plan de trabajo con Claude — Vermilion Routes

Léelo primero. Resume lo que Claude hizo en la nube y lo que falta.
La nube no tiene acceso a tu PC, a tus `.env`, a Vercel por dentro ni a TikTok. Por eso estos pasos se hacen aquí, en tu computador.

## Estado actual

| Tema | Estado |
|---|---|
| Ahrefs Web Analytics | Hecho y publicado (PR #1). |
| Integración TikTok en el panel | Código listo en la rama `claude/tiktok-integration`, **PR #2 sin publicar**. |
| Revisión de la app de TikTok | Falta la demostración en video y enviar a revisión. |
| Skill de videos (reels de las 3 empresas) | En `herramientas/skill-videos/`, falta instalarla. |

## Qué hace la integración de TikTok (PR #2)

- **Panel:** `/[locale]/admin/tiktok`, para roles super y admin. Hay un enlace "TikTok" en el menú del CRM.
- **Conectar con TikTok** (Login Kit, permiso `user.info.basic`). Al volver muestra el nombre y la foto de la cuenta.
- **Enviar a borradores de TikTok** (Content Posting API, permiso `video.upload`). El video llega a la bandeja de TikTok y se publica desde la app.
- **Código:**
  - `lib/tiktok.ts`
  - `app/api/admin/tiktok/*`
  - `app/api/tiktok/callback/route.ts`
  - `app/[locale]/admin/tiktok/page.tsx`
  - textos en `messages/*.json` (8 idiomas)
  - pruebas en `__tests__/tiktok.test.ts`
- **Tokens:** se guardan en Firestore `integrations/tiktok`; las reglas actuales no los exponen al navegador.
- **Variables:**
  - `TIKTOK_CLIENT_KEY` y `TIKTOK_CLIENT_SECRET`
  - `TIKTOK_REDIRECT_URI` es opcional; por defecto `https://www.vermilionroutes.com/api/tiktok/callback`.
- **Verificado:** `npm run build` (425/425) y 6 pruebas nuevas en verde. Las 2 pruebas de `aiConcierge` ya fallaban antes.

## Pendiente, en orden

### 1. Publicar
En https://github.com/pablofgarciaf/vermilion/pull/2 pulsa **Merge pull request** → **Confirm merge**. Vercel publica solo.
Después, en tu PC: `git pull`.

### 2. Unir los `.env` en uno solo
En PowerShell, dentro de esta carpeta:
```
py scripts/tiktok/unificar_env.py
```
- **Une:** junta todos los `.env` en un único `.env.local` y guarda un respaldo de los originales fuera del proyecto.
- **Corrige:** las líneas escritas a mano como `tiktok client key XXXX` quedan como `TIKTOK_CLIENT_KEY=XXXX`.
- **Quita:** la línea `tiktok-developers-site-verification=...` no va en el `.env`. Es un registro **TXT** en el DNS del dominio.
- **Copia:** deja copiado el texto para pegar en Vercel. Nunca muestra las claves en pantalla.

### 3. Claves del Sandbox de TikTok
Mientras TikTok no apruebe la app, las claves de Production no sirven. Usa las del **Sandbox**:
1. developers.tiktok.com → app **VermilionRoutes** → arriba, pestaña **Sandbox** (créalo si lo pide).
2. Copia la **Client key** y el **Client secret** del Sandbox.
3. **Products:** deja solo **Login Kit** y **Content Posting API**.
4. **Scopes:** deja solo `user.info.basic` y `video.upload`.
5. **Login Kit → Redirect URI:** `https://www.vermilionroutes.com/api/tiktok/callback`
6. **Target users:** agrega la cuenta de TikTok de Vermilion.

### 4. Vercel
Proyecto Vermilion → **Settings → Environment Variables**:
- `TIKTOK_CLIENT_KEY` = Client key del Sandbox
- `TIKTOK_CLIENT_SECRET` = Client secret del Sandbox

Después: **Deployments → Redeploy**.

### 5. Video de demostración para la revisión
```
py -m pip install playwright imageio-ffmpeg
py -m playwright install chromium
py scripts/tiktok/grabar_demo_tiktok.py "C:\ruta\a\un\video-corto.mp4"
```
1. Prepara un video de prueba corto, de menos de 4 MB.
2. Corre el script. Tú solo escribes tus contraseñas (panel y TikTok).
3. El script graba el flujo completo y deja `demo_tiktok_vermilion.mp4`.
4. Graba con el celular cómo llega el borrador a TikTok.
5. Sube los dos videos en el formulario de TikTok y pulsa **Submit for review**.

### 6. Cuando TikTok apruebe
Cambia en Vercel las claves del Sandbox por las de **Production** y redeploy.
Desde entonces, cada video que se envía desde el panel llega como borrador. Tú le pones un sonido de moda y lo publicas.

## Skill de videos (reels de Modulares GM, EnergyEngine y Vermilion)

Está en `herramientas/skill-videos/`. Genera reels verticales 1080x1920, en versión muda y con voz y música, usando las fotos y el logo de cada empresa.

**Instalar en tu PC (una vez):**
1. Copia la carpeta a `%USERPROFILE%\.claude\skills\videos`.
2. Instala lo necesario:
   ```
   py -m pip install pillow numpy edge-tts
   winget install Gyan.FFmpeg
   ```
3. Pídele a Claude, por ejemplo, "haz un video de Vermilion para TikTok".

**Para usarla en todas tus sesiones:** comprímela en zip y súbela en claude.ai → Configuración → Capacidades → Skills.

**Voces:**
- Modulares GM: Jorge (`es-MX-JorgeNeural`).
- EnergyEngine: Álvaro (`es-ES-AlvaroNeural`).
- Vermilion: Guy, en inglés (`en-US-GuyNeural`).

La voz de Microsoft funciona en tu PC. En la nube de Claude está bloqueada y usa una voz de respaldo.

## Otras empresas (contexto)

**Modulares GM** (repo `pavelo88/modularesgm`). Ya publicado:
- medición GA4, píxel de Meta y Ahrefs;
- número de WhatsApp corregido y aviso de leads por correo;
- página `/precios` y barra de la campaña de Navidad (hasta el 13 de noviembre);
- pestaña Analítica en el panel.

Pendiente en Modulares GM:
- **Analítica del panel:** activar la Google Analytics Data API y dar acceso de Lector, en GA4, al correo de la cuenta de servicio que muestra el panel.
- **Google Business Profile:** crear la ficha con fotos.

**EnergyEngine** (repo `pavelo88/energyengine`): Ahrefs instalado.

## Reglas para la próxima sesión de Claude

- **Claves:** nunca pegarlas en el chat. Van en `.env.local`, que no se sube a GitHub, y en Vercel.
- **Reglas del repo:** respetar `AGENTS.md` de este repo (8 idiomas, `npm run build` sin errores antes de cada commit).
- **Producción:** no publicar en `master` sin que Pablo lo apruebe.
