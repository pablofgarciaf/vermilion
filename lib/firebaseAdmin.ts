import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDK — SERVER ONLY.
 * Never import this file from a Client Component or expose it to the browser.
 * Credentials come from Vercel environment variables (never committed to git):
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 */

let adminApp: App | undefined;

function getAdminApp(): App {
  if (adminApp) return adminApp;

  const existing = getApps();
  if (existing.length > 0) {
    adminApp = existing[0];
    return adminApp;
  }

  let projectId = process.env.FIREBASE_PROJECT_ID?.trim();
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
      privateKey = privateKey.slice(1, -1).replace(/\\n/g, '\n').trim();
    }
  }

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin credentials are missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY or FIREBASE_SERVICE_ACCOUNT_JSON in your environment variables.'
    );
  }

  adminApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return adminApp;
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
