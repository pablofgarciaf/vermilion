'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { getAuth, applyActionCode, checkActionCode, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shield, Key, Loader2, CheckCircle2, Lock, User, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

type ProcessStep = 'verifying' | 'setPassword' | 'loading' | 'success' | 'error';

function VerifyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');

  const [step, setStep] = useState<ProcessStep>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Data State
  const [verifiedEmail, setVerifiedEmail] = useState('');
  
  // Form State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!oobCode || mode !== 'verifyEmail') {
      // Not a valid Firebase verification link
      setErrorMsg('Enlace de verificación inválido o ausente. Asegúrate de copiar el enlace completo desde tu correo.');
      setStep('error');
      return;
    }

    const auth = getAuth();
    
    const verifyCode = async () => {
      try {
        setStep('verifying');
        
        // 1. Check what the code is for and get the user's email
        const info = await checkActionCode(auth, oobCode);
        const email = info.data.email;
        if (!email) throw new Error("No se pudo obtener el correo del enlace.");
        
        setVerifiedEmail(email);

        // 2. Apply the code to verify the email in Firebase Auth
        await applyActionCode(auth, oobCode);

        // 3. Update the Firestore document to reflect verification
        if (db) {
          // Buscamos el documento por ID (el correo en minúsculas)
          const cleanEmail = email.toLowerCase().trim();
          const q = query(collection(db, 'affiliates'), where('email', '==', cleanEmail));
          const snap = await getDocs(q);
          
          if (!snap.empty) {
            const docRef = doc(db, 'affiliates', snap.docs[0].id);
            await updateDoc(docRef, { isEmailVerified: true });
          }
        }

        // Ya está verificado. Ahora le pedimos que asigne su clave definitiva.
        setStep('setPassword');

      } catch (error: any) {
        console.error("Verification Error:", error);
        if (error.code === 'auth/invalid-action-code') {
          setErrorMsg('El enlace de verificación ya expiró o ya fue utilizado. Tu correo posiblemente ya está verificado.');
        } else {
          setErrorMsg(error.message || 'Error al verificar el correo.');
        }
        setStep('error');
      }
    };

    verifyCode();
  }, [oobCode, mode]);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      setStep('error');
      return;
    }
    
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      setStep('error');
      return;
    }

    setStep('loading');
    setErrorMsg('');

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      // Para cambiar la contraseña con updatePassword, el usuario debe estar autenticado.
      // Si el usuario se acaba de registrar en el mismo navegador, currentUser existirá.
      if (currentUser && currentUser.email === verifiedEmail) {
         await updatePassword(currentUser, password);
      } else {
         // Si abrió el link en otro dispositivo, no estará autenticado.
         // En el registro original, la cédula se usó como contraseña temporal.
         // No tenemos la cédula aquí, así que lo ideal sería pedirla, o simplemente mandarlo a "Forgot Password".
         throw new Error("Por seguridad, debes iniciar sesión con tu cédula como contraseña temporal para poder establecer la nueva.");
      }

      // Marcar que ya no se le fuerce el cambio
      if (db && verifiedEmail) {
          const q = query(collection(db, 'affiliates'), where('email', '==', verifiedEmail.toLowerCase().trim()));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const docRef = doc(db, 'affiliates', snap.docs[0].id);
            await updateDoc(docRef, { forcePasswordChange: false });
          }
      }

      setStep('success');
      
      setTimeout(() => {
        router.push(`/${locale}/affiliates/dashboard`);
      }, 3000);
      
    } catch (error: any) {
      console.error("Password Set Error:", error);
      setErrorMsg(error.message || 'Ocurrió un error al establecer tu contraseña.');
      setStep('error');
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center py-24 bg-[#07110B] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-amber-500 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Verificación de Identidad</h1>
          <p className="text-white/60 text-xs">Asegura tu cuenta de Embajador Vermilion</p>
        </div>

        <div className="bg-[#0F1E2E]/80 backdrop-blur-2xl border border-[#1B3C28] rounded-[32px] p-8 shadow-2xl shadow-emerald-950/60">
          
          {step === 'error' && (
            <div className="mb-6 p-4 bg-rose-950/50 border border-rose-600/40 rounded-xl">
              <div className="flex items-start gap-2 text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-xs">{errorMsg}</p>
              </div>
              <button 
                onClick={() => router.push(`/${locale}/auth/affiliates`)}
                className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline block"
              >
                Ir a Iniciar Sesión
              </button>
            </div>
          )}

          {(step === 'verifying' || step === 'loading') && (
            <div className="py-12 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
              <p className="text-white/60 text-xs animate-pulse">
                {step === 'verifying' ? 'Verificando enlace seguro...' : 'Guardando credenciales...'}
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-xl text-white font-bold mb-2">¡Cuenta Activada!</h2>
              <p className="text-white/60 text-xs mb-6">
                Tu contraseña ha sido establecida. Entrando al portal de embajador...
              </p>
            </div>
          )}

          {(step === 'setPassword' || (step === 'error' && verifiedEmail && !errorMsg.includes('inválido'))) && (
            <form onSubmit={handleSetPassword} className="space-y-4 text-xs animate-in fade-in duration-500">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 mb-2 bg-emerald-950/50 border border-emerald-600/40 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Identidad Confirmada</span>
                </div>
                <p className="text-white/60 text-xs mt-2">
                  Verificamos tu correo <b className="text-white">{verifiedEmail}</b>. 
                  Ahora crea una contraseña definitiva para tu portal.
                </p>
              </div>

              <div>
                <label className="block font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Nueva Contraseña</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-zinc-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-amber-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50" />
                  <input
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/40 border border-zinc-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-amber-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all mt-6"
              >
                Establecer y Entrar
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}

export default function AffiliateVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#07110B] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    }>
      <VerifyFormContent />
    </Suspense>
  );
}
