'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HERO_SLIDES_DATA } from '@/components/home/hero/heroData';

export function ToursBackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % HERO_SLIDES_DATA.length;
        setLoadedIndices((current) => {
          const updated = new Set(current);
          updated.add(next);
          updated.add((next + 1) % HERO_SLIDES_DATA.length);
          return updated;
        });
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      {HERO_SLIDES_DATA.map((slide, idx) => {
        const isLoaded = loadedIndices.has(idx);
        const isCurrent = idx === currentIndex;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {isLoaded && (
              <Image
                src={slide.desktopImage || slide.image}
                alt="Background"
                fill
                sizes="100vw"
                className="object-cover"
                priority={idx === 0}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                quality={idx === 0 ? 75 : 60}
              />
            )}
          </div>
        );
      })}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-90 pointer-events-none" />
    </div>
  );
}
