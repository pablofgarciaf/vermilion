import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { mockTours } from '../data/mock';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function main() {
  console.log('🚀 Connecting to Firebase project:', config.projectId);
  const app = initializeApp(config, 'admin-sync');
  const auth = getAuth(app);
  
  const email = process.env.ADMIN_EMAIL || 'admin@vermilionroutes.com';
  const password = process.env.ADMIN_PASSWORD || 'Vermilion2026*';
  console.log('🔐 Authenticating as admin:', email);
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  console.log('✅ Authenticated successfully! UID:', userCred.user.uid);

  const db = getFirestore(app);
  const toursRef = collection(db, 'tours');
  const snapshot = await getDocs(toursRef);

  console.log(`📊 Found ${snapshot.size} existing docs in Firestore.`);
  const validIds = new Set(mockTours.map(t => t.id));

  // 1. Delete legacy / invalid docs
  for (const docSnap of snapshot.docs) {
    if (!validIds.has(docSnap.id)) {
      console.log(`🗑️  DELETING obsolete doc: ${docSnap.id}`);
      await deleteDoc(doc(db, 'tours', docSnap.id));
      console.log(`   Deleted: ${docSnap.id}`);
    }
  }

  // 2. Write / update all 16 official mockTours
  for (const tour of mockTours) {
    console.log(`💾 Writing official tour: ${tour.id} (${tour.durationDays}d | 3★: $${tour.price3Star} | 4★: $${tour.price4Star})`);
    await setDoc(doc(db, 'tours', tour.id), tour, { merge: false });
  }

  // Verify final count
  const finalSnap = await getDocs(toursRef);
  console.log(`\n🎉 Verification: Now ${finalSnap.size} tours in Firestore.`);
  finalSnap.forEach(d => {
    const data = d.data();
    console.log(` - ${d.id}: 3★=$${data.price3Star}, 4★=$${data.price4Star}, Days=${data.durationDays}`);
  });
  console.log('\n✅ ALL TOURS IN FIRESTORE ARE 100% SYNCED AND OBSOLETE DOCS PURGED!');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error during sync:', err);
  process.exit(1);
});
