'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  ShieldCheck,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  Sparkles,
} from 'lucide-react';

export default function AdminAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';
  const errorParam = searchParams.get('error');

  const [tab, setTab] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    errorParam === 'invalid_role'
      ? (isEs ? 'ACCESO DENEGADO (403): Tu cuenta no dispone de permisos corporativos.' : 'ACCESS DENIED (403): Unauthorized.')
      : ''
  );
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email && !errorParam) {
        try {
          const cleanEmail = user.email.toLowerCase().trim();

          const isMaster =
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
        } catch (err) {
          console.warn('[Admin Auth State Check]', err);
        }
      }
    });
    return () => unsubscribe();
  }, [locale, router, errorParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg(isEs ? 'Ingresa tus credenciales corporativas.' : 'Enter your corporate credentials.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(isEs ? 'Credenciales incorrectas o cuenta corporativa inexistente.' : 'Invalid credentials or account does not exist.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = (forgotEmail || email).trim().toLowerCase();
    if (!targetEmail) {
      setErrorMsg(isEs ? 'Ingresa tu correo electrónico corporativo registrado.' : 'Please enter your registered corporate email.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (auth) {
        await sendPasswordResetEmail(auth, targetEmail);
      }
      setSuccessMsg(
        isEs
          ? `Enviamos un enlace oficial de recuperación a ${targetEmail}. Revisa tu bandeja de entrada o carpeta de spam.`
          : `Password reset link sent to ${targetEmail}. Please check your inbox or spam folder.`
      );
    } catch (err: any) {
      console.error('[Admin Forgot Password Error]', err);
      setErrorMsg(
        err.message?.includes('user-not-found')
          ? (isEs ? 'No existe una cuenta registrada con este correo.' : 'No account found with this email.')
          : (isEs ? 'Error al enviar el correo de recuperación. Verifica la dirección.' : 'Error sending reset email. Check address.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07110B] text-zinc-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header */}
      <header className="p-6 flex items-center justify-between max-w-6xl mx-auto w-full z-10">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-[#07130C] rounded-[14px] flex items-center justify-center">
              <Image src="/icon.png" alt="Vermilion Routes" width={24} height={24} className="object-contain" priority />
            </div>
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-white block">
              VERMILION <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
              {isEs ? 'Portal Oficial de Administración & Operaciones' : 'Official Administration & Operations Portal'}
            </span>
          </div>
        </Link>

        <Link
          href={`/${locale}`}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-wider font-semibold"
        >
          {isEs ? '← Volver al Sitio' : '← Back to Website'}
        </Link>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-[#0B1A12]/80 backdrop-blur-2xl border border-[#1B3C28] rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-emerald-950/60 space-y-6">

          {/* Brand Icon Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto p-2.5 shadow-lg shadow-amber-500/10 text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
              {tab === 'login' && (isEs ? 'Portal de Administración' : 'Admin Portal')}
              {tab === 'forgot' && (isEs ? 'Recuperar Contraseña' : 'Reset Password')}
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {tab === 'login' && (isEs ? 'Acceso exclusivo y seguro para operadores y directivos autorizados.' : 'Exclusive secure access for authorized directors & operators.')}
              {tab === 'forgot' && (isEs ? 'Te enviaremos un enlace oficial de restablecimiento a tu correo corporativo.' : 'We will send an official reset link to your verified corporate email.')}
            </p>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-600/40 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-600/40 text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{successMsg}</span>
            </div>
          )}

          {/* ── TAB 1: LOGIN FORM ── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEs ? 'Correo Corporativo *' : 'Corporate Email *'}</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vermilionroutes.com"
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isEs ? 'Contraseña *' : 'Password *'}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setTab('forgot');
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="text-[11px] text-amber-400/90 hover:text-amber-300 underline font-semibold transition-colors cursor-pointer"
                  >
                    {isEs ? '¿Olvidaste tu contraseña?' : 'Forgot password?'}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 pr-10 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:brightness-105 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isEs ? 'Ingresar al CRM Corporativo' : 'Sign In to Corporate CRM'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── TAB 2: FORGOT PASSWORD FORM ── */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEs ? 'Correo Corporativo Registrado *' : 'Registered Corporate Email *'}</span>
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@vermilionroutes.com"
                  className="w-full px-4 py-3 bg-black/40 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => { setTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className="text-zinc-400 hover:text-white underline text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  {isEs ? '← Volver al Inicio de Sesión' : '← Back to Sign In'}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:brightness-105 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>{isEs ? 'Enviar Enlace' : 'Send Link'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-2 border-t border-zinc-800/80 text-center">
            <Link
              href={`/${locale}/auth/affiliates`}
              className="text-[11px] text-zinc-400 hover:text-amber-400 transition-colors"
            >
              {isEs ? '¿Eres Embajador o Afiliado? ' : 'Are you an Ambassador? '}
              <span className="text-amber-400 font-semibold underline">{isEs ? 'Ingresa aquí' : 'Click here'}</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[10px] text-zinc-600 z-10">
        {isEs
          ? '© 2026 Vermilion Routes South America. Acceso restringido y monitoreado.'
          : '© 2026 Vermilion Routes South America. Restricted & monitored access.'}
      </footer>
    </div>
  );
}
