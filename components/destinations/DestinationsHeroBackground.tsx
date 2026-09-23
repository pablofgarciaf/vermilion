'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { HERO_SLIDES_DATA } from '@/components/home/hero/heroData';

const SLIDES = HERO_SLIDES_DATA.map((slide) => slide.desktopImage || slide.image).filter(Boolean);

export function DestinationsHeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {SLIDES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      {/* Keep the gradient legible over the photos */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/25 via-zinc-900/25 to-zinc-950/80" />
    </div>
  );
}
