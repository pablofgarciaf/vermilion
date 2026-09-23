'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight, Percent, Sparkles, Award } from 'lucide-react';

const AFFILIATE_CONTENT: Record<string, {
  ambassadors: string;
  subtitle: string;
  b1_title: string;
  b1_desc: string;
  b2_title: string;
  b2_desc: string;
  b3_title: string;
  b3_desc: string;
  cta: string;
}> = {
  es: {
    ambassadors: "Embajadores",
    subtitle: "El programa de comisiones y participaciones globales más justo de Sudamérica.",
    b1_title: "10% OFF a Clientes",
    b1_desc: "Tus referidos obtienen automáticamente un 10% de descuento en todos los tours con tu código.",
    b2_title: "10% de Comisión",
    b2_desc: "Ganas el 10% en efectivo por cada venta directa. Sin topes, en dólares.",
    b3_title: "Fondo Global (6%)",
    b3_desc: "Recibe acciones acumulables de las ventas globales de la empresa ($3k, $7k y $15k).",
    cta: "Descubre el Plan de Pagos"
  },
  en: {
    ambassadors: "Ambassadors",
    subtitle: "The fairest commissions and global revenue-share program in South America.",
    b1_title: "10% OFF for Clients",
    b1_desc: "Your referrals automatically receive a 10% discount on all tours using your code.",
    b2_title: "10% Direct Commission",
    b2_desc: "Earn 10% cash for every direct sale. No limits, paid in USD.",
    b3_title: "Global Fund Pool (6%)",
    b3_desc: "Receive cumulative shares from the company's global sales milestones ($3k, $7k, and $15k).",
    cta: "Discover the Payment Plan"
  },
  fr: {
    ambassadors: "Ambassadeurs",
    subtitle: "Le programme de commissions et de participation mondiale le plus équitable d'Amérique du Sud.",
    b1_title: "10% de Réduction Clients",
    b1_desc: "Vos filleuls bénéficient automatiquement de 10% de réduction sur tous les circuits avec votre code.",
    b2_title: "10% de Commission Directe",
    b2_desc: "Gagnez 10% en espèces pour chaque vente directe. Sans plafond, payé en USD.",
    b3_title: "Fonds Global (6%)",
    b3_desc: "Recevez des parts cumulatives des ventes mondiales de l'entreprise ($3k, $7k et $15k).",
    cta: "Découvrir le Plan de Rémunération"
  },
  de: {
    ambassadors: "Botschafter",
    subtitle: "Das fairste Provisions- und globale Beteiligungsprogramm Südamerikas.",
    b1_title: "10% Rabatt für Kunden",
    b1_desc: "Ihre Empfehlungen erhalten mit Ihrem Code automatisch 10% Rabatt auf alle Touren.",
    b2_title: "10% Direkte Provision",
    b2_desc: "Verdienen Sie 10% Bargeld für jeden Direktverkauf. Ohne Obergrenze, in USD.",
    b3_title: "Globaler Fonds (6%)",
    b3_desc: "Erhalten Sie kumulative Anteile an den weltweiten Verkäufen ($3k, $7k und $15k).",
    cta: "Vergütungsplan Entdecken"
  },
  it: {
    ambassadors: "Ambasciatori",
    subtitle: "Il programma di commissioni e partecipazione globale più equo del Sud America.",
    b1_title: "10% di Sconto per i Clienti",
    b1_desc: "I tuoi invitati ricevono automaticamente il 10% di sconto su tutti i tour con il tuo codice.",
    b2_title: "10% di Commissione Diretta",
    b2_desc: "Guadagni il 10% in contanti per ogni vendita diretta. Senza limiti, in USD.",
    b3_title: "Fondo Globale (6%)",
    b3_desc: "Ricevi quote cumulative dalle vendite globali dell'azienda ($3k, $7k e $15k).",
    cta: "Scopri il Piano Compensi"
  },
  pt: {
    ambassadors: "Embaixadores",
    subtitle: "O programa de comissões e participações globais mais justo da América do Sul.",
    b1_title: "10% OFF para Clientes",
    b1_desc: "Seus indicados recebem automaticamente 10% de desconto em todos os tours com seu código.",
    b2_title: "10% de Comissão Direta",
    b2_desc: "Ganhe 10% em dinheiro por cada venda direta. Sem limites, pago em USD.",
    b3_title: "Fundo Global (6%)",
    b3_desc: "Receba cotas cumulativas das vendas globais da empresa ($3k, $7k e $15k).",
    cta: "Descubra o Plano de Pagamentos"
  },
  ja: {
    ambassadors: "公式アンバサダー",
    subtitle: "南米で最も透明で公平な高還元コミッション＆グローバルレベニューシェアプログラム。",
    b1_title: "紹介客へ 10% 割引",
    b1_desc: "あなたの紹介コードを利用するお客様は、全ツアーで自動的に10%の割引を受けられます。",
    b2_title: "10% 直接現金コミッション",
    b2_desc: "直接成約ごとに10%の現金を獲得。上限なし、米ドル（USD）で確実にお支払い。",
    b3_title: "グローバル売上基金（6%）",
    b3_desc: "会社のグローバル売上マイルストーン（$3k, $7k, $15k）に応じて累積株式シェアを分配。",
    cta: "報酬プラン＆シミュレーターを見る"
  },
  zh: {
    ambassadors: "品牌大使",
    subtitle: "南美洲最公正透明的高佣金与全球收益分红计划。",
    b1_title: "为客户提供 10% 专属折扣",
    b1_desc: "使用您的专属推广码，受邀客户在所有旅游线路上均可立享 10% 折扣。",
    b2_title: "10% 直接销售佣金",
    b2_desc: "每笔成功订单均可获得 10% 现金奖励，无业绩上限，以美元直接结算。",
    b3_title: "全球销售分红基金 (6%)",
    b3_desc: "随公司全球业绩阶梯（$3k、$7k 和 $15k）共享可累积的全球利润分红份额。",
    cta: "查看佣金与收益分成方案"
  }
};

export default function AffiliateRegistration() {
  const locale = useLocale();
  const c = AFFILIATE_CONTENT[locale] || AFFILIATE_CONTENT['en'];

  return (
    <section id="affiliate" className="relative py-16 md:py-20 overflow-hidden bg-stone-950 border-t border-white/5 scroll-mt-20">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4 tracking-tight">
              {c.ambassadors} <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Vermilion</span>
            </h2>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto">
              {c.subtitle}
            </p>
          </div>

          {/* 3-Column Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Beneficio 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4">
                <Percent className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{c.b1_title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {c.b1_desc}
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{c.b2_title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {c.b2_desc}
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{c.b3_title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {c.b3_desc}
              </p>
            </div>

          </div>

          {/* CTA Button -> Redirige a la nueva presentación & simulador */}
          <div className="flex justify-center">
            <Link href={`/${locale}/presentation`} className="block w-full sm:w-auto">
              <button className="w-full sm:w-auto relative group overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 p-[1px] shadow-2xl shadow-amber-900/30 cursor-pointer">
                <div className="relative bg-zinc-950 hover:bg-black/0 transition-colors duration-500 py-4 px-10 rounded-[15px] flex items-center justify-center gap-3">
                  <span className="text-white font-bold tracking-wide uppercase text-sm">{c.cta}</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
