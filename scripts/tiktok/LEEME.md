# TikTok: lo que falta (para hacer en tu PC)

La conexión con TikTok ya está en el código (panel `/[locale]/admin/tiktok`). Faltan estos pasos, en orden.

## 1. Publicar
Haz merge de https://github.com/pablofgarciaf/vermilion/pull/2 → **Merge pull request** → **Confirm merge**.
Vercel publica solo en unos 2 minutos. Después, en tu PC: `git pull`.

## 2. Unir los .env en uno solo
En PowerShell, dentro de la carpeta de Vermilion:

```
py scripts/tiktok/unificar_env.py
```

- Junta todos los `.env` en un único `.env.local` y guarda un respaldo de los originales fuera del proyecto.
- Convierte líneas escritas a mano como `tiktok client key XXXX` a `TIKTOK_CLIENT_KEY=XXXX`.
- La línea `tiktok-developers-site-verification=...` no va en el .env: va en el DNS del dominio (registro TXT).
- Al final deja copiado el texto para Vercel.

## 3. Claves del Sandbox de TikTok
Mientras TikTok no apruebe la app, usa las claves del **Sandbox** (no las de Production):

1. En developers.tiktok.com → tu app → arriba **Sandbox**.
2. Copia la **Client key** y el **Client secret** del Sandbox.
3. **Login Kit → Redirect URI:** `https://www.vermilionroutes.com/api/tiktok/callback`
4. **Target users:** agrega la cuenta de TikTok de Vermilion.

## 4. Vercel
Proyecto Vermilion → **Settings → Environment Variables**:

- `TIKTOK_CLIENT_KEY` = Client key del Sandbox
- `TIKTOK_CLIENT_SECRET` = Client secret del Sandbox

Después: **Deployments → Redeploy**.

## 5. Grabar el video de demostración
```
py -m pip install playwright imageio-ffmpeg
py -m playwright install chromium
py scripts/tiktok/grabar_demo_tiktok.py "C:\ruta\a\un\video-corto.mp4"
```

- El video de prueba debe ser corto, de menos de 4 MB.
- Tú solo escribes tus contraseñas (panel de Vermilion y TikTok). El script graba el resto y deja `demo_tiktok_vermilion.mp4`.
- Graba también con el celular cómo llega el borrador a TikTok.
- Sube los dos videos en el formulario de revisión de TikTok y pulsa **Submit for review**.
