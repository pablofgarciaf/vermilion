/**
 * Borrador de primer seguimiento humano para un lead (lo envía una persona desde su correo).
 * Basado en la plantilla de Jhayro: agradece, ofrece ayuda, menciona lo que descargó/pidió
 * y termina con una pregunta fácil. Español si el lead llegó desde la web en español; inglés en el resto.
 */
export interface FollowUpInput {
  name: string;
  email: string;
  locale?: string;
  /** Tours o cosas que pidió (todas las descargas del mismo correo). */
  items: string[];
}

const PROPER = new Set(['ecuador', 'galápagos', 'galapagos', 'andes', 'amazonía', 'amazonia', 'quito', 'cotopaxi', 'quilotoa', 'isabela', 'santa', 'cruz', 'san', 'cristóbal', 'cristobal', 'pacífico', 'pacifico', 'otavalo', 'baños', 'mindo', 'papallacta', 'cuenca', 'guayaquil', 'vermilion']);

/** "De Los Andes Al Encanto De Galápagos" -> "De los Andes al encanto de Galápagos" (solo títulos en español). */
export function titleToSentenceCase(t: string): string {
  if (/\b(The|And|With|Of|Ultimate|Tour)\b/.test(t)) return t; // título en inglés: se deja tal cual
  return t
    .split(/(\s+)/)
    .map((w, i) => {
      if (/^\s+$/.test(w) || w === '') return w;
      const bare = w.toLowerCase().replace(/[.,:;]/g, '');
      if (i === 0 || PROPER.has(bare)) return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      return w.toLowerCase();
    })
    .join('');
}

const clean = (s: string) =>
  titleToSentenceCase(s.replace(/^Descargó el itinerario en PDF:\s*/i, '').replace(/^Pidió /i, '').trim());

function firstName(name: string): string {
  const n = (name || '').trim().split(/\s+/)[0] || '';
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function list(items: string[], and: string): string {
  const u = [...new Set(items.map(clean).filter(Boolean))];
  if (u.length <= 1) return u[0] || '';
  return `${u.slice(0, -1).join(', ')} ${and} ${u[u.length - 1]}`;
}

export function buildFollowUpDraft({ name, locale, items }: FollowUpInput): { subject: string; body: string } {
  const fn = firstName(name);
  const isEs = (locale || '').startsWith('es');
  const tours = list(items, isEs ? 'y' : 'and');
  if (isEs) {
    return {
      subject: 'Tu viaje a Ecuador y Galápagos – Vermilion Routes',
      body:
        `Hola ${fn},\n\n` +
        `Gracias por descargar ${tours ? `el itinerario de ${tours}` : 'nuestros itinerarios de Ecuador y Galápagos'}.\n\n` +
        `Soy Jhayro, gerente de Vermilion Routes. Llevo más de 25 años ayudando a viajeros a descubrir Ecuador y me encantaría ayudarte a planificar un viaje inolvidable.\n\n` +
        `Nuestros tours se adaptan a tus fechas, intereses y presupuesto: los Andes, la Amazonía, la costa del Pacífico o las Islas Galápagos.\n\n` +
        `¿Qué tipo de viaje estás pensando y para qué fechas? Si prefieres, lo hablamos por WhatsApp (+593 96 003 9156) o en una videollamada corta.\n\n` +
        `Solo responde a este correo y te preparo una propuesta.\n\n` +
        `Un saludo,\n\nJhayro Ludeña\nGerente | Vermilion Routes\nvermilionroutes.com`,
    };
  }
  return {
    subject: 'Your Ecuador & Galápagos trip – Vermilion Routes',
    body:
      `Hi ${fn},\n\n` +
      `Thank you for downloading ${tours ? `the ${tours} itinerary` : 'our Ecuador and Galápagos tour itineraries'}!\n\n` +
      `I'm Jhayro, the manager of Vermilion Routes. I've been helping travelers discover Ecuador for over 25 years, and I'd be happy to help you plan a memorable trip.\n\n` +
      `Our tours can be tailored to your travel dates, interests, and budget, whether you're dreaming of exploring the Andes, the Amazon rainforest, Ecuador's Pacific coast, or the Galápagos Islands.\n\n` +
      `May I ask what kind of trip you're planning, and when you're hoping to visit Ecuador? If you prefer, we can talk on WhatsApp (+593 96 003 9156) or on a short video call.\n\n` +
      `Simply reply to this email. I'd be happy to help you find the best itinerary for your trip.\n\n` +
      `Best regards,\n\nJhayro Ludeña\nManager | Vermilion Routes\nvermilionroutes.com`,
  };
}

export function followUpMailto(input: FollowUpInput): string {
  const { subject, body } = buildFollowUpDraft(input);
  return `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
