import { NextResponse } from 'next/server';
import { sendNewsletterVerificationEmail, generateNewsletterToken } from '@/lib/email';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { isValidEmail } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, affiliateId, _hp_trap, website_url } = body;

    // 🛡️ Honeypot Trap Detection (Python Bot / Form Spammer Neutralizer)
    if (_hp_trap || website_url) {
      console.warn('[SECURITY] Bot trapped in newsletter honeypot.');
      return NextResponse.json({ success: true, message: 'Correo enviado' });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido' }, { status: 400 });
    }

    // 1. Generate token
    const token = generateNewsletterToken(email, affiliateId || null);
    
    // 2. Save pending lead in Firebase
    if (db) {
      try {
        const leadsRef = collection(db, 'clientes_destacados');
        await addDoc(leadsRef, {
          email,
          affiliateId: affiliateId || null,
          status: 'verificacion_pendiente',
          createdAt: serverTimestamp(),
          source: 'newsletter_form',
        });
      } catch (dbError) {
        console.error('Error saving to Firebase:', dbError);
        // We can throw so the user knows something failed, or just log.
      }
    } else {
      console.warn('Firebase DB is not initialized. Skipping Firestore save for newsletter.');
    }

    // 3. Send email
    await sendNewsletterVerificationEmail(email, token);

    return NextResponse.json({ success: true, message: 'Correo enviado' });
  } catch (error: any) {
    console.error('Error in newsletter route:', error);
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}
