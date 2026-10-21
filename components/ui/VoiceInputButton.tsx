'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

/** Idioma de reconocimiento por locale de la web. */
const SPEECH_LANG: Record<string, string> = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', pt: 'pt-BR', ja: 'ja-JP', zh: 'zh-CN',
};

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: any) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

interface Props {
  locale: string;
  /** Recibe el texto dictado (final) para añadirlo al campo. */
  onText: (text: string) => void;
  labelStart: string;
  labelStop: string;
  disabled?: boolean;
}

/**
 * Botón de dictado: habla y el texto aparece en el campo del chat.
 * Usa el reconocimiento de voz del navegador (Chrome, Edge, Safari). Si el navegador
 * no lo tiene (p. ej. Firefox), el botón no se muestra.
 */
export function VoiceInputButton({ locale, onText, labelStart, labelStop, disabled }: Props) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recRef = useRef<Recognition | null>(null);

  useEffect(() => {
    const w = window as any;
    setSupported(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
    return () => recRef.current?.stop();
  }, []);

  if (!supported) return null;

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const w = window as any;
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    const rec: Recognition = new Ctor();
    rec.lang = SPEECH_LANG[locale] || 'en-US';
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const text = Array.from(e.results as ArrayLike<any>)
        .map((r) => r[0]?.transcript || '')
        .join(' ')
        .trim();
      if (text) onText(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      aria-pressed={listening}
      aria-label={listening ? labelStop : labelStart}
      title={listening ? labelStop : labelStart}
      className={`p-2.5 rounded-xl border transition-colors shrink-0 flex items-center justify-center disabled:opacity-50 ${
        listening
          ? 'bg-red-600 border-red-500 text-white animate-pulse'
          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500'
      }`}
    >
      {listening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
}
