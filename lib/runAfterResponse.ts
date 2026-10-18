import { after } from 'next/server';

/**
 * Programa trabajo secundario (correos, webhooks) para DESPUÉS de responder.
 *
 * Usa `after()` de Next (en Vercel alarga la función con waitUntil). Si `after` no está
 * disponible (fuera de una petición, p. ej. en tests), lo lanza en segundo plano.
 * Nunca lanza: el lead ya está guardado y un 500 aquí haría que el formulario
 * reintentara por su vía de respaldo y duplicara la solicitud.
 */
export function runAfterResponse(task: () => Promise<unknown>): void {
  const safeTask = () =>
    task().catch((err: unknown) => {
      const e = err as { name?: string; code?: string; message?: string };
      console.error('[runAfterResponse] Tarea posterior falló', { name: e?.name, code: e?.code, message: e?.message });
    });

  try {
    after(safeTask);
  } catch {
    void safeTask();
  }
}
