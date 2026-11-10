'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Radio del nodo del día (h-8 = 32px): la línea "toca" el nodo por su centro. */
const NODE_CENTER_OFFSET = 16;
/** Punto de corte de escritorio (md de Tailwind): el nodo se centra en el bloque del día. */
const DESKTOP_QUERY = '(min-width: 768px)';

/** Centro vertical del nodo dentro de su bloque (en px desde el borde superior del bloque). */
function nodeCenterInItem(item: HTMLElement, desktop: boolean): number {
  return desktop ? item.offsetHeight / 2 : NODE_CENTER_OFFSET;
}

/**
 * Progreso de lectura de la línea de tiempo (0 a 1) y número de días alcanzados.
 * La línea termina en el nodo del último día: la distancia desde su extremo
 * inferior se guarda en la variable CSS --timeline-end del contenedor.
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

    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const desktop = desktopQuery.matches;
      const nodes = Array.from(container.children).filter(
        (el): el is HTMLElement => el instanceof HTMLLIElement,
      );

      // Extremo inferior de la línea: el centro del nodo del último día (no el final del bloque).
      const last = nodes[nodes.length - 1];
      const lineBottom = last
        ? Math.max(container.offsetHeight - (last.offsetTop + nodeCenterInItem(last, desktop)), 0)
        : 0;
      container.style.setProperty('--timeline-end', `${lineBottom}px`);

      const fillTop = fill.offsetTop;
      const fillHeight = Math.max(fill.offsetHeight, 1);
      const rect = container.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.6;
      const raw = (readingLine - rect.top - fillTop) / fillHeight;
      const progress = Math.min(1, Math.max(0, raw));
      fill.style.transform = `scaleY(${progress})`;

      // Extremo visible del relleno, en coordenadas del contenedor (misma escala que el transform).
      const lineEnd = fillTop + progress * fillHeight;
      let count = 1;
      nodes.forEach((node, index) => {
        if (node.offsetTop + nodeCenterInItem(node, desktop) <= lineEnd) count = Math.max(count, index + 1);
      });
      setReachedCount(count);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    // Las fotos cargan después y cambian la altura de los bloques: se vuelve a medir.
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(requestUpdate) : null;
    observer?.observe(container);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerRef, fillRef]);

  return reachedCount;
}
