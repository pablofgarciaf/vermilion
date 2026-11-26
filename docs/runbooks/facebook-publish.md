# 📘 Runbook: Publicar en Facebook (Vermilion Routes)

**Script**: `scripts/social/facebook-publish.js`  
**App Meta**: SinergIA (ID `1640010274492424`) — dev_mode  
**Última actualización**: 2026-11-05

---

## ⚙️ Configuración inicial (SOLO la primera vez)

Necesitas generar un **Page Access Token permanente** de Vermilion Routes.

### Paso 1 — Obtener User Access Token con permisos de página

1. Ir a **https://developers.facebook.com/tools/explorer**
2. Seleccionar app **SinergIA** (arriba a la derecha)
3. En "User or Page" seleccionar **"Get User Access Token"**
4. Marcar estos permisos:
   - ✅ `pages_manage_posts`
   - ✅ `pages_show_list`
   - ✅ `pages_read_engagement`
   - ✅ `read_insights`
5. Clic **"Generate Access Token"** → autorizar con tu cuenta de Facebook
6. Copiar el token generado (empieza con `EAA...`)

### Paso 2 — Extender a token largo (60 días → permanente para páginas)

Reemplazar `{APP_ID}`, `{APP_SECRET}` y `{SHORT_TOKEN}` en esta URL y abrirla en el navegador:

```
https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_TOKEN}
```

- **APP_ID**: `1640010274492424`
- **APP_SECRET**: lo encuentras en Meta for Developers > SinergIA > Configuración > Información básica
- Respuesta: un token largo que empieza con `EAA...` y dura 60 días

### Paso 3 — Obtener el Page Access Token permanente

Con el token largo del paso anterior, abrir en el navegador:

```
https://graph.facebook.com/v21.0/me/accounts?access_token={LONG_LIVED_TOKEN}
```

La respuesta incluye todas las páginas que administras. Busca **"Vermilion Routes"** y copia:
- `id` → es el `FACEBOOK_PAGE_ID`
- `access_token` → es el **Page Access Token permanente**

### Paso 4 — Guardar en .env

```env
FACEBOOK_PAGE_ACCESS_TOKEN="EAAxxxxxxxxxxxxxxxxx..."
FACEBOOK_PAGE_ID="123456789012345"
```

> ⚠️ Nunca commitear el .env. El Page Access Token es permanente pero si la página lo revoca hay que regenerarlo.

---

## 🚀 Uso del script

### Post de texto simple
```bash
node scripts/social/facebook-publish.js \
  --type post \
  --message "🌿 Galápagos te espera. Tours privados desde $2,490. 🐢\n\nEscríbenos por WhatsApp o reserva en vermilionroutes.com"
```

### Post con imagen
```bash
node scripts/social/facebook-publish.js \
  --type post \
  --message "Expedición privada a las Islas Galápagos 🐢" \
  --image "C:\Users\pablo\OneDrive\Imágenes\Vermilion\galapagos-01.jpg"
```

### Video
```bash
node scripts/social/facebook-publish.js \
  --type video \
  --title "Tour Privado Galápagos - Vermilion Routes" \
  --description "Expediciones a medida en Ecuador y Galápagos desde $2,490" \
  --video "C:\Users\pablo\OneDrive\Desktop\Redes Sociales\Vermilion Routes\TikTok_Campañas\galapagos-tour.mp4"
```

---

## 📋 Parámetros

| Parámetro | Descripción | Requerido |
|-----------|-------------|-----------|
| `--type` | `post` o `video` | Sí |
| `--message` | Texto del post | Para posts de texto/foto |
| `--image` | Ruta de imagen (< 4MB, JPG/PNG) | Para posts con foto |
| `--video` | Ruta del video MP4 | Para videos |
| `--title` | Título del video | Para videos |
| `--description` | Descripción del video | Para videos |

---

## ❌ Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Error validating access token` | Token expirado o revocado | Regenerar token (Paso 1-3) |
| `Object does not exist` | PAGE_ID incorrecto | Verificar ID en `/me/accounts` |
| `(#200) permissions` | Falta `pages_manage_posts` | Regenerar token con ese permiso |
| `form-data not found` | npm install pendiente | `npm install` en la raíz |
| App en dev_mode | Solo el admin puede publicar | Normal — no es un error |

---

## 🔄 Automatización futura

Para que Haiku 4.5 pueda publicar sin Sonnet:
1. Tener el token configurado en `.env`
2. Llamar directamente: `node scripts/social/facebook-publish.js --type post --message "..."`
3. Ver `docs/AI_GUIDE.md` para el flujo completo

---

## 🔗 Links útiles

- **Graph API Explorer**: https://developers.facebook.com/tools/explorer
- **Token Debugger**: https://developers.facebook.com/tools/debug/accesstoken
- **SinergIA app**: https://developers.facebook.com/apps/1640010274492424
- **Docs Pages API**: https://developers.facebook.com/docs/pages-api/

---

## 📝 Sesión de referencia

Configuración inicial realizada en sesión `88bda649-c505-4356-9b1e-7b0c9b423286` (2026-11-05).  
Use case `PAGES_API` agregado a SinergIA via MCP Meta DevTools.
