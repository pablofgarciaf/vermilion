/**
 * Datos de contacto que el propio visitante ya escribió en esta web (formulario
 * "Planifica tu viaje" o contacto). Se guardan solo en SU navegador (localStorage)
 * para rellenar los campos la próxima vez; nunca salen de su dispositivo por aquí.
 * Todo va en try/catch: en modo privado o con almacenamiento bloqueado simplemente
 * no se recuerda nada.
 */
export interface VisitorContact {
  name: string;
  email: string;
  phone: string;
}

const KEY = 'vr:visitor-contact';

export function loadVisitorContact(): Partial<VisitorContact> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Partial<VisitorContact>;
    return {
      name: typeof data.name === 'string' ? data.name.slice(0, 120) : undefined,
      email: typeof data.email === 'string' ? data.email.slice(0, 200) : undefined,
      phone: typeof data.phone === 'string' ? data.phone.slice(0, 40) : undefined,
    };
  } catch {
    return {};
  }
}

export function saveVisitorContact(contact: Partial<VisitorContact>): void {
  if (typeof window === 'undefined') return;
  try {
    const merged = { ...loadVisitorContact(), ...Object.fromEntries(Object.entries(contact).filter(([, v]) => v)) };
    window.localStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    /* almacenamiento no disponible: no pasa nada */
  }
}
