import { Sparkles } from 'lucide-react';

export type BookingTier = 'club' | 'vip';

interface BookingComfortTierSelectorProps {
  locale: string;
  selectedTier: BookingTier;
  onSelectTier: (tier: BookingTier) => void;
}

const COPY: Record<string, { title: string; badge: string; clubDescription: string; vipDescription: string }> = {
  es: { title: '2. Categoría de Hospedaje', badge: 'Personaliza tu Confort', clubDescription: 'Hotelería seleccionada, desayuno incluido y logística privada integral.', vipDescription: 'Suites de confort superior, VIP Amenities y Concierge 24/7 dedicado.' },
  en: { title: '2. Hotel & Comfort Category', badge: 'Tailor your Comfort', clubDescription: 'Certified boutique hotels, breakfast & private logistics.', vipDescription: 'Superior comfort suites, VIP Amenities & 24/7 Concierge.' },
  fr: { title: "2. Catégorie d'Hébergement", badge: 'Personnalisez votre confort', clubDescription: 'Hôtels boutique sélectionnés, petit-déjeuner et logistique privée.', vipDescription: 'Suites confort supérieur, services VIP et concierge 24/7.' },
  de: { title: '2. Hotel- & Komfortkategorie', badge: 'Komfort personalisieren', clubDescription: 'Ausgewählte Boutique-Hotels, Frühstück und private Logistik.', vipDescription: 'Komfort-Suiten, VIP-Annehmlichkeiten und Concierge rund um die Uhr.' },
  it: { title: '2. Categoria di Alloggio', badge: 'Personalizza il comfort', clubDescription: 'Hotel boutique selezionati, colazione e logistica privata.', vipDescription: 'Suite superior, servizi VIP e concierge 24/7.' },
  pt: { title: '2. Categoria de Hospedagem', badge: 'Personalize seu conforto', clubDescription: 'Hotéis boutique selecionados, café da manhã e logística privada.', vipDescription: 'Suítes superiores, comodidades VIP e concierge 24/7.' },
  ja: { title: '2. 宿泊・快適クラスの選択', badge: '快適さをカスタマイズ', clubDescription: '厳選ブティックホテル、朝食、専用ロジスティクスを含みます。', vipDescription: '上質なスイート、VIPアメニティ、24時間コンシェルジュ。' },
  zh: { title: '2. 住宿与舒适等级', badge: '定制舒适体验', clubDescription: '精选精品酒店、早餐及全程私人交通安排。', vipDescription: '高级舒适套房、VIP礼遇及24/7专属礼宾服务。' },
};

export function BookingComfortTierSelector({ locale, selectedTier, onSelectTier }: BookingComfortTierSelectorProps) {
  const copy = COPY[locale] || COPY.en;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{copy.title}</span>
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">{copy.badge}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button type="button" onClick={() => onSelectTier('club')} aria-pressed={selectedTier === 'club'} className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer shadow-md ${selectedTier === 'club' ? 'border-emerald-500 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 shadow-emerald-900/30' : 'border-emerald-800/50 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 opacity-80 hover:opacity-100 hover:brightness-110'}`}>
          <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-emerald-200 flex items-center justify-center shrink-0">{selectedTier === 'club' && <div className="w-2 h-2 rounded-full bg-emerald-200" />}</div>
          <div><div className="flex items-center gap-2"><span className="font-bold text-sm text-white">Vermilion Club</span><span className="px-1.5 py-0.5 rounded bg-white/15 text-[10px] font-semibold text-emerald-100">3★ Boutique</span></div><p className="text-[11px] text-emerald-100 mt-1 leading-snug">{copy.clubDescription}</p></div>
        </button>

        <button type="button" onClick={() => onSelectTier('vip')} aria-pressed={selectedTier === 'vip'} className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-md ${selectedTier === 'vip' ? 'border-amber-400/65 bg-gradient-to-r from-[#DFBA62] via-[#F2D88E] to-[#C7A048] shadow-amber-500/20' : 'border-amber-500/45 bg-gradient-to-r from-[#C7A048] via-[#DFBA62] to-[#B58C32] opacity-80 hover:opacity-100 hover:brightness-105'}`}>
          <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-zinc-950 flex items-center justify-center shrink-0">{selectedTier === 'vip' && <div className="w-2 h-2 rounded-full bg-zinc-950" />}</div>
          <div><div className="flex items-center gap-2"><span className="font-bold text-sm text-zinc-950">Vermilion VIP</span><span className="px-1.5 py-0.5 rounded bg-white/30 text-[10px] font-bold text-zinc-950 border border-amber-700/30">4★ Superior</span></div><p className="text-[11px] text-zinc-900 mt-1 leading-snug">{copy.vipDescription}</p></div>
        </button>
      </div>
    </div>
  );
}
