'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Radio del nodo del día (h-8 = 32px): la línea "toca" el nodo por su centro. */
const NODE_CENTER_OFFSET = 16;

/**
 * Progreso de lectura de la línea de tiempo (0 a 1) y número de días alcanzados.
 * Escribe el transform del relleno directamente en el DOM. Solo re-renderiza
 * cuando cambia la cantidad de días alcanzados, no en cada frame de scroll.
 * Un día está alcanzado cuando el extremo del relleno llega a su nodo.
 * Con prefers-reduced-motion se usa el mismo cálculo, sin transiciones (CSS).
 */
export function useTimelineProgress(
  containerRef: RefObject<HTMLElement | null>,
  fillRef: RefObject<HTMLElement | null>,
): number {
  // El primer día siempre está alcanzado (la línea nace en su nodo), así el HTML inicial ya muestra el día 1.
  const [reachedCount, setReachedCount] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.6;
      const raw = (readingLine - rect.top) / Math.max(rect.height, 1);
      const progress = Math.min(1, Math.max(0, raw));
      fill.style.transform = `scaleY(${progress})`;

      // Extremo visible del relleno, en coordenadas del contenedor (misma escala que el transform).
      const lineEnd = fill.offsetTop + progress * fill.offsetHeight;
      const nodes = Array.from(container.children).filter(
        (el): el is HTMLElement => el instanceof HTMLLIElement,
      );
      let count = 1;
      nodes.forEach((node, index) => {
        if (node.offsetTop + NODE_CENTER_OFFSET <= lineEnd) count = Math.max(count, index + 1);
      });
      setReachedCount(count);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerRef, fillRef]);

  return reachedCount;
}
