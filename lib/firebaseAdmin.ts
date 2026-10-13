import type { App } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import type { Auth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDK — SERVER ONLY.
 * Never import this file from a Client Component or expose it to the browser.
 * Credentials come from Vercel environment variables (never committed to git):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 *
 * Carga PEREZOSA: `firebase-admin` se requiere al primer uso, no al importar este archivo.
 * Con un `import` estatico, si el paquete no carga en el runtime (version de Node, empaquetado
 * del bundle) la funcion muere antes de ejecutar cualquier try/catch y el cliente solo ve un
 * 500 mudo. Asi el fallo cae dentro del try/catch de cada ruta y se reporta con su causa.
 */

/** El SDK de Firebase Admin no pudo cargarse en este runtime (no es un problema de credenciales). */
export class FirebaseAdminUnavailableError extends Error {
  readonly code = 'FIREBASE_ADMIN_UNAVAILABLE';
  /** Causa resumida y sin secretos, segura para devolver en la respuesta. */
  readonly detail: string;

  constructor(cause: unknown, module: string) {
    const raw = cause instanceof Error ? `${cause.name}: ${cause.message}` : String(cause);
    // Quita rutas absolutas del servidor y limita el largo.
    const detail = `${module} | node ${process.version} | ${raw}`
      .replace(/(\/var\/task|\/vercel\/path\d+|[A-Za-z]:\\)[^\s'")]*/g, '<ruta>')
      .slice(0, 300);
    super(`Firebase Admin could not be loaded (${detail})`);
    this.name = 'FirebaseAdminUnavailableError';
    this.detail = detail;
  }
}

function loadAdminModule<T>(name: 'firebase-admin/app' | 'firebase-admin/firestore' | 'firebase-admin/auth'): T {
  try {
    /* eslint-disable @typescript-eslint/no-require-imports */
    switch (name) {
      case 'firebase-admin/app':
        return require('firebase-admin/app') as T;
      case 'firebase-admin/firestore':
        return require('firebase-admin/firestore') as T;
      case 'firebase-admin/auth':
        return require('firebase-admin/auth') as T;
    }
    /* eslint-enable @typescript-eslint/no-require-imports */
  } catch (err) {
    console.error(`[Firebase Admin] No se pudo cargar ${name}:`, err);
    throw new FirebaseAdminUnavailableError(err, name);
  }
}

let adminApp: App | undefined;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  const { initializeApp, getApps, cert } = loadAdminModule<typeof import('firebase-admin/app')>('firebase-admin/app');

  const existing = getApps();
  if (existing.length > 0) {
    adminApp = existing[0];
    return adminApp;
  }

  let projectId = process.env.FIREBASE_PROJECT_ID?.trim() || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  let clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  let privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (rawJson) {
    try {
      let cleaned = rawJson;
      if ((cleaned.startsWith("'") && cleaned.endsWith("'")) || (cleaned.startsWith('"') && cleaned.endsWith('"'))) {
        cleaned = cleaned.slice(1, -1).trim();
      }
      if (!cleaned.startsWith('{') && !cleaned.startsWith('[')) {
        try {
          const decoded = Buffer.from(cleaned, 'base64').toString('utf8').trim();
          if (decoded.startsWith('{')) cleaned = decoded;
        } catch {}
      }
      const sa = JSON.parse(cleaned);
      projectId = projectId || sa.project_id || sa.projectId;
      clientEmail = clientEmail || sa.client_email || sa.clientEmail;
      const rawKey = sa.private_key || sa.privateKey;
      if (rawKey && !privateKey) {
        privateKey = String(rawKey).replace(/\\n/g, '\n').trim();
      }
    } catch (err) {
      console.error('[Firebase Admin] Error parsing FIREBASE_SERVICE_ACCOUNT_JSON:', err);
    }
  }

  if (privateKey) {
    if ((privateKey.startsWith('"') && privateKey.endsWith('"')) || (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
      privateKey = privateKey.slice(1, -1).trim();
    }
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (!projectId || !clientEmail || !privateKey) {
    // Solo nombres de variables, nunca valores.
    const missing = [
      !projectId && 'FIREBASE_PROJECT_ID',
      !clientEmail && 'FIREBASE_CLIENT_EMAIL',
      !privateKey && 'FIREBASE_PRIVATE_KEY',
    ].filter(Boolean);
    throw new FirebaseAdminUnavailableError(
      new Error(
        `Firebase Admin credentials are missing (${missing.join(', ')}). Set them, or FIREBASE_SERVICE_ACCOUNT_JSON, in the environment variables.`
      ),
      'credentials'
    );
  }

  adminApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return adminApp;
}

export function getAdminDb(): Firestore {
  const { getFirestore } = loadAdminModule<typeof import('firebase-admin/firestore')>('firebase-admin/firestore');
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  const { getAuth } = loadAdminModule<typeof import('firebase-admin/auth')>('firebase-admin/auth');
  return getAuth(getAdminApp());
}
