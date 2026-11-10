'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TikTokAvatarProps {
  /** URL de la foto de la cuenta conectada; null si TikTok no devolvió ninguna. */
  src: string | null;
  /** Nombre visible de la cuenta (alt de la foto y del logo de respaldo). */
  name: string;
}

/**
 * Foto de la cuenta de TikTok del panel admin. Si no hay foto o la imagen
 * remota falla (onError), muestra el logo local de Vermilion en su lugar.
 * El componente se remonta con key={src} cuando cambia la cuenta.
 */
export function TikTokAvatar({ src, name }: TikTokAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#0B1622]">
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src ?? undefined}
          alt={name}
          width={56}
          height={56}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-2.5">
          <Image
            src="/logo_blanco.png"
            alt={name}
            width={1024}
            height={370}
            className="h-auto w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
