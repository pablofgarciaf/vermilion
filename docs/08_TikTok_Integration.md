# 📱 Integración TikTok Developer (Login Kit + Content Posting API)

Este documento registra la arquitectura técnica, configuración de Sandbox, empaquetado de servidor y resiliencia de la integración con TikTok en **Vermilion Routes**.

---

## 🗺️ Arquitectura de la Integración

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrador (/admin/tiktok)
    participant Server as Next.js API Routes (Node.js)
    participant Firestore as Firebase Admin SDK
    participant TikTok as TikTok Open APIs

    Admin->>Server: POST /api/admin/tiktok/connect
    Server->>TikTok: Genera URL de autorización con OAuth State firmado
    Server-->>Admin: Retorna URL de login TikTok + Cookie STATE_COOKIE
    Admin->>TikTok: Autoriza en Sandbox (con usuario en whitelist)
    TikTok->>Server: GET /api/tiktok/callback?code=...&state=...
    Server->>TikTok: Canjea authorization_code por tokens
    TikTok-->>Server: Retorna access_token y refresh_token
    Server->>Firestore: Guarda conexión en `integrations/tiktok`
    Server-->>Admin: Redirige a /[locale]/admin/tiktok?tiktok=connected
    Admin->>Server: POST /api/admin/tiktok/upload (inicia borrador)
    Server->>TikTok: Inicializa subida en bandeja de entrada
    Server-->>Admin: URL directa de subida o relay por partes
```

---

## 🔑 Configuración del Entorno Sandbox ("Pruebas")

- **App ID:** `7695706754587346951`
- **Client Key:** `sbawai89zpk0sbyr8h` (prefijo `sb` identifica entorno Sandbox)
- **Client Secret:** `xUFaaa0Zb6HyM0t5MYJ6oucNMvQmsFuE`
- **Redirect URI:** `https://www.vermilionroutes.com/api/tiktok/callback`
- **Alcances (Scopes):** `user.info.basic`, `video.upload`

### Campos obligatorios del formulario Sandbox en TikTok Developer Portal:
1. **Descripción de la aplicación (≤ 120 caracteres):**
   `Vermilion Routes: gestión y subida de videos y expediciones turísticas en Ecuador y Galápagos.`
2. **URL de Términos de Servicio:**
   `https://www.vermilionroutes.com/es/terms`
3. **URL de Política de Privacidad:**
   `https://www.vermilionroutes.com/es/privacy-policy`
4. **Usuarios Objetivo (Target Users / Whitelist):**
   En la sección *Configuración de Sandbox* -> *Usuarios objetivo*, agregar el `@usuario` de TikTok con el que se realizarán las pruebas.

---

## 🛡️ Resiliencia y Empaquetado Serverless (Vercel)

1. **`firebase-admin` en `dependencies`:**
   Movido de `devDependencies` a `dependencies` en `package.json` para garantizar que el SDK esté disponible en el runtime Serverless de Vercel.
2. **`serverExternalPackages` en `next.config.mjs`:**
   Configurado `serverExternalPackages: ['firebase-admin']` para evitar conflictos de empaquetado nativo con Turbopack/Webpack.
3. **Unificación de SDKs de Firebase Admin:**
   `lib/firebase-admin.ts` reexporta directamente desde `lib/firebaseAdmin.ts`, garantizando un único punto de verdad compatible con `FIREBASE_SERVICE_ACCOUNT_JSON`.
4. **Runtime Node.js Forzado:**
   Todos los endpoints de la API de TikTok declaran explícitamente `export const runtime = 'nodejs';` y `export const dynamic = 'force-dynamic';`.
5. **Cero Caídas por Estado Inicial (Fail-Safe):**
   El endpoint `/api/admin/tiktok` captura cualquier excepción de consulta y responde con código 200 `{ configured, connected: false }`, permitiendo que la interfaz de usuario cargue limpiamente el botón de conexión.
