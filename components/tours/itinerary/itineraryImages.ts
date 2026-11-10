import { ItineraryDay } from '@/types';

/** Devuelve una imagen existente del proyecto para el día (o '' si no hay una verificada). */
export function resolveDayImage(item: ItineraryDay, title: string, desc: string): string {
  if (item.image) return item.image;
  if (item.images && item.images.length > 0 && item.images[0]) return item.images[0];
  const combined = `${title} ${desc}`.toLowerCase();
  if (combined.includes('quilotoa')) return '/images/tours/16-9/laguna-quilotoa-16-9.webp';
  if (combined.includes('cotopaxi')) return '/images/tours/16-9/cotopaxi-volcano-16-9.webp';
  if (combined.includes('chimborazo')) return '/images/tours/16-9/chimborazo-volcano-16-9.webp';
  if (combined.includes('baños') || combined.includes('banos') || combined.includes('pailón') || combined.includes('pailon') || combined.includes('cauldron')) return '/images/tours/16-9/pailon-del-diablo-16-9.webp';
  if (combined.includes('papallacta') || combined.includes('termas') || combined.includes('thermal')) return '/images/tours/16-9/papallacta-laguna-16-9.webp';
  if (combined.includes('mindo') || combined.includes('colibr') || combined.includes('orquíd') || combined.includes('cloud forest')) return '/images/tours/16-9/mindo-16-9.webp';
  if (combined.includes('antisana') || combined.includes('cóndor') || combined.includes('condor')) return '/images/tours/16-9/antisana-16-9.webp';
  if (combined.includes('otavalo') || combined.includes('peguche') || combined.includes('ponchos')) return '/images/tours/16-9/otavalo-market-16-9.webp';
  if (combined.includes('cuenca') || combined.includes('tomebamba')) return '/images/tours/16-9/cuenca-colonial-16-9.webp';
  if (combined.includes('cajas')) return '/images/tours/16-9/parque-nacional-el-cajas-16-9.webp';
  if (combined.includes('amazon') || combined.includes('puyo') || combined.includes('selva') || combined.includes('cuyabeno') || combined.includes('rainforest')) return '/images/tours/16-9/amazon-river-16-9.webp';
  if (combined.includes('mitad del mundo') || combined.includes('intiñan') || combined.includes('intinan') || combined.includes('equatorial') || combined.includes('ecuatorial')) return '/images/tours/16-9/mitad-del-mundo-16-9.webp';
  if (combined.includes('quito') || combined.includes('san francisco') || combined.includes('colonial') || combined.includes('plaza grande') || combined.includes('compañía') || combined.includes('compania')) return '/images/tours/16-9/quito-colonial-16-9.webp';
  if (combined.includes('isabela') || combined.includes('tintoreras') || combined.includes('sierra negra')) return '/images/tours/16-9/galapagos-tintoreras16-9.webp';
  if (combined.includes('tortuga') || combined.includes('santa cruz') || combined.includes('charles darwin')) return '/images/tours/16-9/galapagos-tortuga-gigante-16-9.1.webp';
  if (combined.includes('grietas') || combined.includes('puerto ayora')) return '/images/tours/16-9/galapagos-las-grietas-16-9.webp';
  if (combined.includes('baltra')) return '/images/tours/16-9/galapagos-tortuga-bay-16-9.1.webp';
  if (combined.includes('santa fe') || combined.includes('lobo marino') || combined.includes('sea lion')) return '/images/tours/16-9/galapagos-lobo-marino-16-9.webp';
  // No verified photo exists for these locations: omit the image rather than show an unrelated one.
  if (combined.includes('guayaquil')) return '';
  return '/images/tours/16-9/chimborazo-volcano-16-9.webp';
}
