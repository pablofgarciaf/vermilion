import React from 'react';
import type { Metadata } from 'next';
import { Compass, HeartHandshake, Leaf, Users, MapPin, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { getSeoAlternates, SUPPORTED_SEO_LOCALES, BASE_CANONICAL_URL } from '@/utils/seoHelper';

export const dynamicParams = false;
export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.map((locale) => ({ locale }));
}

/**
 * Manifiesto de cómo viajamos. Página propia, un principio por bloque, 8
 * principios en total. Sirve tanto para posicionar la marca como filtro de
 * clientes ("mi tipo de operador") como para SEO de intención informativa.
 */

interface Principle {
  icon: React.ComponentType<{ className?: string }>;
  title: Record<string, string>;
  body: Record<string, string>;
}

const PRINCIPLES: Principle[] = [
  {
    icon: Users,
    title: { es: 'Grupos pequeños, siempre', en: 'Small groups, always', fr: 'Petits groupes, toujours', de: 'Immer kleine Gruppen', it: 'Sempre gruppi piccoli', pt: 'Grupos pequenos, sempre', ja: '常に少人数', zh: '始终小团出行' },
    body: {
      es: 'Máximo 8 viajeros por expedición. El páramo, la selva y las islas se sienten distintos con cuatro parejas que con un bus de treinta. La logística es más costosa; el recuerdo, incomparable.',
      en: 'Maximum 8 travellers per expedition. The páramo, the jungle, and the islands feel different with four couples than with a bus of thirty. The logistics cost more; the memory is incomparable.',
      fr: 'Huit voyageurs maximum par expédition. Le páramo, la jungle et les îles se vivent autrement à quatre couples qu’en bus de trente. La logistique coûte plus cher ; le souvenir n’a pas de prix.',
      de: 'Höchstens 8 Reisende pro Expedition. Páramo, Dschungel und Inseln fühlen sich mit vier Paaren anders an als mit einem Bus voller Dreißig. Die Logistik kostet mehr; die Erinnerung ist unbezahlbar.',
      it: 'Massimo 8 viaggiatori per spedizione. Il páramo, la giungla e le isole si vivono diversamente con quattro coppie che con un bus da trenta. La logistica costa di più; il ricordo non ha prezzo.',
      pt: 'No máximo 8 viajantes por expedição. O páramo, a selva e as ilhas se sentem diferente com quatro casais do que num ônibus de trinta. A logística custa mais; a lembrança é incomparável.',
      ja: '1回の旅につき最大8名まで。パラモ、ジャングル、諸島は、30人のバスではなく4組の夫婦で訪れると別の顔を見せます。手間もコストもかかりますが、記憶はかけがえのないものになります。',
      zh: '每次探险最多八人。四对夫妇的旅程与三十人大巴车的感受截然不同——高山草甸、雨林与群岛，唯有小团方能倾诉真容。成本更高，但记忆无价。',
    },
  },
  {
    icon: MapPin,
    title: { es: 'Guías nativos, no traducidos', en: 'Native guides, not translated', fr: 'Guides natifs, non traduits', de: 'Einheimische Guides, keine Übersetzer', it: 'Guide native, non tradotte', pt: 'Guias nativos, não traduzidos', ja: '通訳ではなく現地ガイド', zh: '土生土长的向导，而非二手翻译' },
    body: {
      es: 'Nuestros guías nacieron en los lugares que muestran. Un guía de Otavalo te lleva a la Plaza de Ponchos el sábado que es; un guía de Puerto Ayora sabe qué vecina vende cerveza artesanal. Eso no se aprende en un curso.',
      en: 'Our guides were born in the places they show. An Otavalo guide takes you to Plaza de Ponchos on the right Saturday; a Puerto Ayora guide knows which neighbour sells the good craft beer. That is not taught in any course.',
      fr: 'Nos guides sont nés dans les lieux qu’ils partagent. Un guide d’Otavalo vous emmène à la Plaza de Ponchos le bon samedi ; un guide de Puerto Ayora sait quelle voisine vend la bière artisanale. Cela ne s’apprend pas.',
      de: 'Unsere Guides sind an den Orten geboren, die sie zeigen. Ein Otavalo-Guide führt dich am richtigen Samstag zur Plaza de Ponchos; ein Puerto-Ayora-Guide weiß, welche Nachbarin das gute Craft-Bier verkauft. Das lernt man in keinem Kurs.',
      it: 'Le nostre guide sono nate nei luoghi che mostrano. Una guida di Otavalo ti porta a Plaza de Ponchos il sabato giusto; una guida di Puerto Ayora sa quale vicina vende la birra artigianale. Non lo insegna nessun corso.',
      pt: 'Nossos guias nasceram nos lugares que mostram. Um guia de Otavalo te leva à Plaza de Ponchos no sábado certo; um guia de Puerto Ayora sabe qual vizinha vende cerveja artesanal. Isso não se ensina em curso.',
      ja: '当社のガイドはその地で生まれ育っています。オタバロのガイドは市場が最も賑わう土曜へ案内し、プエルト・アヨラのガイドは美味しい地ビールを売る家を知っています。研修では身につかない知識です。',
      zh: '我们的向导都出生在他们所展示的土地上。奥塔瓦洛的向导知道哪个周六才是庞乔广场最热闹的日子；圣克鲁斯的向导知道邻居家哪位在卖手工啤酒。这不是任何课程能教出来的。',
    },
  },
  {
    icon: Leaf,
    title: { es: 'Ritmo lento, más días, mejor sueño', en: 'Slow pace, more days, better sleep', fr: 'Rythme lent, plus de jours, meilleur sommeil', de: 'Langsames Tempo, mehr Tage, besserer Schlaf', it: 'Ritmo lento, più giorni, sonno migliore', pt: 'Ritmo lento, mais dias, melhor sono', ja: 'ゆったりとした日程、じゅうぶんな睡眠', zh: '慢节奏，多留几天，睡得更香' },
    body: {
      es: 'No hacemos Galápagos en tres días. Un buen itinerario deja espacio para volver dos veces al mismo mirador, o para no ir. La aclimatación a la altura no es opcional; el jet lag tampoco.',
      en: 'We do not do Galápagos in three days. A good itinerary leaves room to return twice to the same viewpoint, or to skip it. Acclimatising to altitude is not optional; neither is jet lag.',
      fr: 'On ne fait pas les Galápagos en trois jours. Un bon itinéraire laisse le temps de revenir deux fois au même belvédère, ou de ne pas y aller. L’acclimatation à l’altitude n’est pas optionnelle ; le jet lag non plus.',
      de: 'Wir machen Galápagos nicht in drei Tagen. Ein gutes Programm lässt Raum, zweimal zum selben Aussichtspunkt zurückzukehren – oder gar nicht. Höhenanpassung ist nicht optional; Jetlag auch nicht.',
      it: 'Non facciamo le Galápagos in tre giorni. Un buon itinerario lascia spazio per tornare due volte allo stesso belvedere, o per saltarlo. L’acclimatamento all’altitudine non è opzionale; neanche il jet lag.',
      pt: 'Não fazemos Galápagos em três dias. Um bom itinerário deixa espaço para voltar duas vezes ao mesmo mirante, ou para pular. Aclimatação à altitude não é opcional; jet lag também não.',
      ja: '当社は3日でガラパゴスを回りません。良い旅程には同じ展望台にもう一度戻る、あるいは行かない余裕があります。高地順応は選択制ではありませんし、時差ボケも同じです。',
      zh: '我们不会用三天走完加拉帕戈斯。好行程要留出重返同一处观景台的余地，或者索性略过。高原适应从来不是选项，时差也不是。',
    },
  },
  {
    icon: Compass,
    title: { es: 'Itinerarios a medida', en: 'Tailored itineraries', fr: 'Itinéraires sur mesure', de: 'Maßgeschneiderte Reiseverläufe', it: 'Itinerari su misura', pt: 'Itinerários sob medida', ja: 'オーダーメイドの旅程', zh: '量身定制的行程' },
    body: {
      es: 'Ningún viaje sale igual dos veces. Antes de proponerte un itinerario preguntamos qué te hace ilusión, qué no aguantas, si duermes mal en altura y a qué hora te gusta desayunar. Después diseñamos.',
      en: 'No trip goes out the same twice. Before proposing an itinerary we ask what excites you, what you cannot stand, whether you sleep poorly at altitude, and when you like breakfast. Then we design.',
      fr: 'Aucun voyage ne se répète. Avant de proposer un itinéraire, on demande ce qui vous fait rêver, ce que vous ne supportez pas, si vous dormez mal en altitude et à quelle heure vous aimez petit-déjeuner. Ensuite on conçoit.',
      de: 'Keine Reise gleicht der anderen. Bevor wir ein Programm vorschlagen, fragen wir, worauf du dich freust, was du nicht ausstehen kannst, ob du in der Höhe schlecht schläfst und wann du frühstücken willst. Dann gestalten wir.',
      it: 'Nessun viaggio esce uguale due volte. Prima di proporti un itinerario chiediamo cosa ti entusiasma, cosa non sopporti, se dormi male in quota e a che ora ami fare colazione. Poi progettiamo.',
      pt: 'Nenhuma viagem sai igual duas vezes. Antes de propor um itinerário perguntamos o que te empolga, o que você não suporta, se dorme mal na altitude e a que horas gosta de tomar café. Depois desenhamos.',
      ja: '同じ旅は二度と作りません。旅程をご提案する前に、心惹かれること、苦手なこと、高地での睡眠、朝食の時間帯までお伺いします。設計はそのあとです。',
      zh: '每次旅程都独一无二。在为您规划行程之前，我们先会问您最期待什么、最受不了什么、是否在高海拔难以入睡、习惯几点用早餐。答案清晰之后，我们才动笔设计。',
    },
  },
  {
    icon: HeartHandshake,
    title: { es: 'Precios transparentes', en: 'Transparent pricing', fr: 'Prix transparents', de: 'Transparente Preise', it: 'Prezzi trasparenti', pt: 'Preços transparentes', ja: '明瞭な料金', zh: '价格透明' },
    body: {
      es: 'Publicamos qué está incluido y qué no. La entrada al Parque Nacional Galápagos (200 USD), la tarjeta de tránsito (20 USD) y la tasa municipal de Isabela (10 USD) van aparte y lo decimos antes de que te enamores del precio.',
      en: 'We publish what is included and what is not. The Galápagos National Park entry (USD 200), the transit card (USD 20), and the Isabela municipal fee (USD 10) are separate, and we say so before you fall in love with the price.',
      fr: 'On publie ce qui est inclus et ce qui ne l’est pas. L’entrée au parc national des Galápagos (200 USD), la carte de transit (20 USD) et la taxe municipale d’Isabela (10 USD) sont à part, et on le dit avant que vous tombiez amoureux du prix.',
      de: 'Wir veröffentlichen, was inbegriffen ist und was nicht. Der Eintritt zum Galápagos-Nationalpark (200 USD), die Transitkarte (20 USD) und die Kommunalgebühr Isabela (10 USD) sind separat – und wir sagen es, bevor du dich in den Preis verliebst.',
      it: 'Pubblichiamo cosa è incluso e cosa no. L’ingresso al Parco Nazionale Galápagos (200 USD), la carta di transito (20 USD) e la tassa municipale di Isabela (10 USD) sono a parte, e lo diciamo prima che ti innamori del prezzo.',
      pt: 'Publicamos o que está incluído e o que não. A entrada ao Parque Nacional Galápagos (USD 200), a carteira de trânsito (USD 20) e a taxa municipal de Isabela (USD 10) vão à parte, e avisamos antes de você se apaixonar pelo preço.',
      ja: '含まれるもの・含まれないものを明記します。ガラパゴス国立公園入園料（200米ドル）、通行管理カード（20米ドル）、イサベラ島の入島料（10米ドル）は別途、価格に恋する前にお伝えします。',
      zh: '我们公开哪些包含、哪些不包含。加拉帕戈斯国家公园门票（200美元）、通行卡（20美元）与伊莎贝拉岛入岛费（10美元）均需另付——在您对报价心动之前，我们就会告诉您。',
    },
  },
  {
    icon: ShieldCheck,
    title: { es: 'Sostenibilidad honesta', en: 'Honest sustainability', fr: 'Durabilité honnête', de: 'Ehrliche Nachhaltigkeit', it: 'Sostenibilità onesta', pt: 'Sustentabilidade honesta', ja: '正直なサステナビリティ', zh: '诚实的可持续' },
    body: {
      es: 'Trabajamos con posadas de dueños locales, evitamos el plástico de un solo uso, apoyamos programas de tortugas y cóndor. No nos llamamos ecolodge cuando no lo somos, y no plantamos árboles para compensar vuelos que no bajarían igual.',
      en: 'We work with locally-owned lodges, avoid single-use plastic, and support tortoise and condor programmes. We do not call ourselves eco-lodge when we are not, and we do not plant trees to offset flights that would not shrink anyway.',
      fr: 'Nous travaillons avec des hébergements de propriétaires locaux, évitons le plastique jetable, soutenons les programmes de tortues et de condors. On ne se dit pas éco-lodge quand on ne l’est pas, et on ne plante pas d’arbres pour compenser des vols qui ne rétréciraient pas.',
      de: 'Wir arbeiten mit lokal geführten Unterkünften, vermeiden Einwegplastik und unterstützen Schildkröten- und Kondor-Programme. Wir nennen uns nicht Öko-Lodge, wenn wir keine sind, und pflanzen keine Bäume, um Flüge auszugleichen, die dadurch nicht kürzer werden.',
      it: 'Lavoriamo con strutture di proprietà locale, evitiamo la plastica monouso, sosteniamo programmi di tartarughe e condor. Non ci chiamiamo eco-lodge quando non lo siamo, e non piantiamo alberi per compensare voli che non si accorcerebbero comunque.',
      pt: 'Trabalhamos com pousadas de donos locais, evitamos plástico descartável, apoiamos programas de tartarugas e condor. Não nos chamamos eco-lodge quando não somos, e não plantamos árvores para compensar voos que não encolheriam de qualquer forma.',
      ja: '地元オーナーの宿と組み、使い捨てプラスチックを避け、ゾウガメとコンドルの保護プログラムを支援します。エコロッジでないのにそう名乗ることはせず、飛行機の便を減らせないのに植樹で埋め合わせもしません。',
      zh: '我们与本地业主的客栈合作，避免一次性塑料，支持陆龟与安第斯神鹰保护项目。不是生态旅社就不假称，也不会以种树抵消那些本可以少飞的航班。',
    },
  },
  {
    icon: Clock,
    title: { es: 'Respondemos rápido', en: 'We reply quickly', fr: 'On répond vite', de: 'Wir antworten schnell', it: 'Rispondiamo in fretta', pt: 'Respondemos rápido', ja: '迅速に返信', zh: '快速回复' },
    body: {
      es: 'Menos de doce horas de martes a domingo, siempre por una persona con nombre y cara. Los correos automáticos son necesarios, pero no se contesta con ellos.',
      en: 'Less than twelve hours from Tuesday to Sunday, always by a person with a name and a face. Automated emails are necessary, but you are not answered with them.',
      fr: 'Moins de douze heures du mardi au dimanche, toujours par une personne avec un nom et un visage. Les emails automatiques sont utiles, mais on ne répond pas avec eux.',
      de: 'Weniger als zwölf Stunden, Dienstag bis Sonntag, immer von einer Person mit Namen und Gesicht. Automatische Mails sind nötig, aber damit antwortet man nicht.',
      it: 'Meno di dodici ore da martedì a domenica, sempre da una persona con nome e volto. Le email automatiche servono, ma non si risponde con esse.',
      pt: 'Menos de doze horas de terça a domingo, sempre por uma pessoa com nome e rosto. E-mails automáticos são necessários, mas não se responde com eles.',
      ja: '火曜から日曜の間、12時間以内に、名前と顔のある担当者が必ず返信します。自動送信メールは必要ですが、それで返事にはしません。',
      zh: '周二至周日十二小时内回复，永远由一位有名字、有面孔的同事亲自作答。自动邮件必要，但绝不用它来回复您。',
    },
  },
  {
    icon: Sparkles,
    title: { es: 'Después del viaje', en: 'After the trip', fr: 'Après le voyage', de: 'Nach der Reise', it: 'Dopo il viaggio', pt: 'Depois da viagem', ja: '旅の後も', zh: '旅程之后' },
    body: {
      es: 'Al regresar te enviamos un enlace con las fotos que tomó tu guía, un breve informe de tu viaje y una invitación a un chat con nosotros para la próxima ruta. Los viajeros que repiten son nuestra reputación real.',
      en: 'On your return we send a link with the photos your guide took, a brief trip report, and an invitation to chat with us about the next route. Repeat travellers are our real reputation.',
      fr: 'À votre retour, on envoie un lien avec les photos prises par votre guide, un court compte-rendu et une invitation à discuter du prochain itinéraire. Les voyageurs qui reviennent sont notre vraie réputation.',
      de: 'Bei deiner Rückkehr senden wir den Link zu den Fotos deines Guides, einen kurzen Reisebericht und eine Einladung zum Gespräch über die nächste Route. Wiederkehrende Reisende sind unser echter Ruf.',
      it: 'Al ritorno ti mandiamo un link con le foto della tua guida, un breve resoconto e un invito a parlare della prossima rotta. I viaggiatori che tornano sono la nostra vera reputazione.',
      pt: 'Ao voltar, mandamos um link com as fotos do seu guia, um breve relatório da viagem e um convite para conversarmos sobre a próxima rota. Viajantes que voltam são nossa reputação real.',
      ja: 'ご帰国後、ガイドが撮った写真リンクと簡潔な旅行レポート、次の旅程を話し合うためのご招待をお送りします。リピーターの皆さまこそ、当社の本当の評判です。',
      zh: '归程之后，我们会寄上向导拍摄的照片链接、一份简短的旅程小结，以及关于下一段旅程的私聊邀请。愿意再度启程的旅人，才是我们真正的口碑。',
    },
  },
];

const HEADINGS: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  es: { eyebrow: 'Cómo viajamos', title: 'Ocho maneras de hacer las cosas', subtitle: 'No somos para todo el mundo, y está bien. Estos son los principios que ordenan cada viaje que sale por nuestra puerta.' },
  en: { eyebrow: 'How we travel', title: 'Eight ways of doing things', subtitle: 'We are not for everyone, and that is fine. These are the principles that shape every trip that leaves our door.' },
  fr: { eyebrow: 'Comment nous voyageons', title: 'Huit façons de faire les choses', subtitle: 'Nous ne sommes pas pour tout le monde, et c’est bien ainsi. Voici les principes qui structurent chaque voyage.' },
  de: { eyebrow: 'Wie wir reisen', title: 'Acht Arten, die Dinge zu tun', subtitle: 'Wir sind nicht für alle, und das ist gut so. Das sind die Prinzipien, die jede Reise prägen, die unsere Tür verlässt.' },
  it: { eyebrow: 'Come viaggiamo', title: 'Otto modi di fare le cose', subtitle: 'Non siamo per tutti, e va bene. Questi sono i principi che modellano ogni viaggio che esce dalla nostra porta.' },
  pt: { eyebrow: 'Como viajamos', title: 'Oito maneiras de fazer as coisas', subtitle: 'Não somos para todos, e tudo bem. Estes são os princípios que ordenam cada viagem que sai da nossa porta.' },
  ja: { eyebrow: '私たちの旅の流儀', title: '8つの方針', subtitle: '万人向けではありません。それでよいのです。当社の扉から出る旅すべてに宿る、8つの原則をご紹介します。' },
  zh: { eyebrow: '我们如何旅行', title: '八条准则', subtitle: '我们不为所有人服务，这也无妨。以下是每一段从我们门口出发的旅程所遵循的准则。' },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const h = HEADINGS[locale] || HEADINGS.en;
  return {
    title: `${h.title} | Vermilion Routes`,
    description: h.subtitle,
    alternates: getSeoAlternates('/manifiesto', locale),
    openGraph: {
      title: `${h.title} | Vermilion Routes`,
      description: h.subtitle,
    },
  };
}

export default async function ManifestoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const h = HEADINGS[locale] || HEADINGS.en;
  const l = (m: Record<string, string>) => m[locale] || m.en;

  return (
    <>
      <section className="relative bg-gradient-to-b from-emerald-950 via-zinc-900 to-zinc-950 pt-32 pb-14 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-4">
            {h.eyebrow}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            {h.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-200 max-w-3xl">{h.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10">
        {PRINCIPLES.map((p, i) => {
          const Icon = p.icon;
          return (
            <article
              key={i}
              className="grid sm:grid-cols-[auto,1fr] gap-5 items-start rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {String(i + 1).padStart(2, '0')} · {l(p.title)}
                </h2>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{l(p.body)}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
