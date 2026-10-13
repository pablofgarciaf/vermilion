import { getAdminDb as getAdminDbSync, getAdminAuth as getAdminAuthSync } from './firebaseAdmin';

export async function getAdminDb() {
  return getAdminDbSync();
}

export async function getAdminAuth() {
  return getAdminAuthSync();
}