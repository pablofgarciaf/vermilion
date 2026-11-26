'use client';

import { Sparkles } from 'lucide-react';

type QuoteTier = 'comfort' | 'premium' | 'luxury';
type Props = {
  open: boolean;
  onClose: () => void;
  tour: string; onTourChange: (value: string) => void;
  pax: number; onPaxChange: (value: number) => void;
  tier: QuoteTier; onTierChange: (value: QuoteTier) => void;
  privateFlight: boolean; onPrivateFlightChange: (value: boolean) => void;
  subtotal: number; discountAmount: number; total: number; affiliateCommission: number; operatorFee: number; netProfit: number; marginPercent: number;
};

export function QuickQuoteModal(props: Props) {
  if (!props.open) return null;
  const sendQuote = () => {
    const msg = `Propuesta Exclusiva Vermilion Routes:\nTour: ${props.tour}\nPasajeros: ${props.pax}\nCategoría: ${props.tier.toUpperCase()}\nTotal Final: $${props.total.toLocaleString('en-US')} USD\nIncluye: Concierge, Chofer Privado y Amenities Pakari.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"><div className="w-full max-w-lg bg-[#0B1A12] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
    <div className="flex items-center justify-between pb-3 border-b border-emerald-950"><h3 className="font-serif text-lg font-bold text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-400" /><span>Cotizador Rápido de Expediciones VIP</span></h3><button onClick={props.onClose} className="text-zinc-400 hover:text-white text-xs">✕ Cerrar</button></div>
    <div className="space-y-4 text-xs"><div><label className="text-zinc-400 block mb-1">Expedición Base:</label><select value={props.tour} onChange={e => props.onTourChange(e.target.value)} className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"><option value="Galapagos Luxury Island Hopping">Galapagos Luxury Island Hopping (8D/7N)</option><option value="Ecuador Avenue of the Volcanoes">Ecuador Avenue of the Volcanoes & Haciendas (10D/9N)</option><option value="Amazon & Choco Andino Private">Amazon & Chocó Andino Private Expedition (6D/5N)</option></select></div>
    <div className="grid grid-cols-2 gap-3"><div><label className="text-zinc-400 block mb-1">Pasajeros (Pax):</label><input type="number" min="1" max="16" value={props.pax} onChange={e => props.onPaxChange(Number(e.target.value) || 1)} className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white" /></div><div><label className="text-zinc-400 block mb-1">Categoría Hotelera:</label><select value={props.tier} onChange={e => props.onTierChange(e.target.value as QuoteTier)} className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"><option value="comfort">Comfort Boutique (3*)</option><option value="premium">Premium Relais & Châteaux (4*)</option><option value="luxury">Luxury Grand Cruise (5*)</option></select></div></div>
    <div className="flex items-center gap-2 pt-2"><input type="checkbox" id="flight" checked={props.privateFlight} onChange={e => props.onPrivateFlightChange(e.target.checked)} className="rounded text-amber-500" /><label htmlFor="flight" className="text-zinc-300">Incluir Chárter Aéreo Privado VIP (+ $1,200/pax)</label></div>
    <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-2 font-mono text-xs"><div className="flex justify-between text-zinc-400"><span>Subtotal Tarifa Bruta:</span><span>${props.subtotal.toLocaleString('en-US')} USD</span></div><div className="flex justify-between text-emerald-400"><span>Descuento Código Embajador (10%):</span><span>-${props.discountAmount.toLocaleString('en-US')} USD</span></div><div className="flex justify-between text-white font-extrabold text-sm pt-1 border-t border-emerald-950"><span>PRECIO FINAL PASAJERO:</span><span className="text-[#D4AF37]">${props.total.toLocaleString('en-US')} USD</span></div><div className="flex justify-between text-amber-300 pt-1 text-[11px]"><span>Comisión Directa Embajador (10%):</span><span>${props.affiliateCommission.toLocaleString('en-US')} USD</span></div><div className="flex justify-between text-teal-300 text-[11px]"><span>Honorario Estimado Guía/Operador:</span><span>${props.operatorFee.toLocaleString('en-US')} USD</span></div><div className="flex justify-between text-emerald-400 text-xs font-bold pt-1 border-t border-emerald-950"><span>Margen Neto para Vermilion Routes:</span><span>+${props.netProfit.toLocaleString('en-US')} USD ({props.marginPercent}%)</span></div></div></div>
    <button onClick={sendQuote} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg cursor-pointer">Enviar Cotización por WhatsApp</button>
  </div></div>;
}
