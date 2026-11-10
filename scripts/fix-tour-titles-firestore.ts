/**
 * Quita el sufijo "(... Transfers ...)" de los títulos de tours en Firestore, en todos los idiomas.
 * Solo toca el campo `title`. No reescribe ningún otro dato.
 *
 * Uso:
 *   node_modules/.bin/tsx scripts/fix-tour-titles-firestore.ts          → solo muestra los cambios (dry-run)
 *   node_modules/.bin/tsx scripts/fix-tour-titles-firestore.ts --apply  → escribe en Firestore
 */
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const APPLY = process.argv.includes('--apply');
// Paréntesis que contienen "transfer" (cualquier idioma), p. ej. "(With Quito Transfers)", "(Con Transfers UIO)"
const SUFFIX = /\s*\([^()]*transfers?[^()]*\)\s*$/i;

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function main() {
  const app = initializeApp(config, 'title-fix');
  const auth = getAuth(app);
  await signInWithEmailAndPassword(
    auth,
    process.env.ADMIN_EMAIL || 'admin@vermilionroutes.com',
    process.env.ADMIN_PASSWORD || ''
  );
  const db = getFirestore(app);
  const snap = await getDocs(collection(db, 'tours'));
  let changes = 0;

  for (const d of snap.docs) {
    const title: Record<string, string> = d.data().title || {};
    const next: Record<string, string> = { ...title };
    for (const [lang, value] of Object.entries(title)) {
      if (typeof value === 'string' && SUFFIX.test(value)) next[lang] = value.replace(SUFFIX, '').trim();
    }
    const diffLangs = Object.keys(next).filter(k => next[k] !== title[k]);
    if (diffLangs.length === 0) continue;
    changes++;
    console.log(`📝 ${d.id}`);
    for (const k of diffLangs) console.log(`   [${k}] "${title[k]}" → "${next[k]}"`);
    if (APPLY) await updateDoc(doc(db, 'tours', d.id), { title: next });
  }

  console.log(APPLY ? `\n✅ Escritos ${changes} tours.` : `\n🔎 Dry-run: ${changes} tours cambiarían. Usa --apply para escribir.`);
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
