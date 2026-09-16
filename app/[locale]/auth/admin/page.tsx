'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    errorParam === 'invalid_role'
      ? (isEs ? 'ACCESO DENEGADO (403): Tu cuenta no dispone de permisos corporativos.' : 'ACCESS DENIED (403): Unauthorized.')
      : ''
  );

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email && !errorParam) {
        try {
          const cleanEmail = user.email.toLowerCase().trim();
          
          const isMaster =
            cleanEmail === 'pablofgarciaf@gmail.com' ||
            cleanEmail === 'info@vermilionroutes.com' ||
            cleanEmail === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vermilionroutes.com').toLowerCase().trim();

          if (isMaster) {
            router.replace(`/${locale}/admin`);
            return;
          }

          const userSnap = await getDoc(doc(db, 'usuarios', cleanEmail));
          if (!userSnap.exists()) {
            await signOut(auth);
            return;
          }

          const userData = userSnap.data();
          const role = String(userData?.role || '').toLowerCase().trim();
          const allowedInternalRoles = ['super', 'admin', 'operator', 'sales', 'financial', 'concierge', 'editor'];
          
          if (allowedInternalRoles.includes(role)) {
            router.replace(`/${locale}/admin`);
          } else {
            await signOut(auth);
          }
        } catch (err) {}
      }
    });
    return () => unsubscribe();
  }, [locale, router, errorParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg(isEs ? 'Ingresa tus credenciales.' : 'Enter your credentials.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(isEs ? 'Credenciales incorrectas o cuenta inexistente.' : 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07110B] text-zinc-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-950/80 border border-emerald-900/40 rounded-3xl p-8 shadow-2xl shadow-emerald-950/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold">{isEs ? 'Portal de Administración' : 'Admin Portal'}</h1>
          <p className="text-xs text-zinc-400 mt-2 text-center">
            {isEs ? 'Acceso exclusivo para personal autorizado.' : 'Exclusive access for authorized personnel.'}
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-400 text-xs mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              {isEs ? 'Correo Corporativo' : 'Corporate Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="admin@vermilionroutes.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              {isEs ? 'Contraseña' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (isEs ? 'Verificando...' : 'Verifying...') : (isEs ? 'Iniciar Sesión' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href={`/${locale}`} className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isEs ? 'Volver al Sitio Principal' : 'Back to Main Site'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
