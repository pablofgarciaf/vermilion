import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminDb: any = null;
let adminAuth: any = null;

export async function getAdminDb() {
  if (adminDb) return adminDb;

  const firebaseAdminConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  if (!getApps().length && firebaseAdminConfig.projectId && firebaseAdminConfig.clientEmail && firebaseAdminConfig.privateKey) {
    initializeApp({
      credential: cert(firebaseAdminConfig),
    });
  }

  adminDb = getFirestore();
  adminAuth = getAuth();
  return adminDb;
}

export async function getAdminAuth() {
  if (adminAuth) return adminAuth;
  await getAdminDb();
  return adminAuth;
}