import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, CalendarDays, Mountain, MapPin, ChevronRight } from 'lucide-react';
import { getSeoAlternates, SUPPORTED_SEO_LOCALES } from '@/utils/seoHelper';
import {
  GALAPAGOS_ACTIVITIES,
  BASE_TOURS_GALAPAGOS,
  MONTH_NAMES,
} from '@/data/galapagosActivitiesData';
import { ACTIVITY_PAGES, ACTIVITY_PAGE_UI, getActivityPage } from '@/data/galapagosActivityPages';
import { GalapagosHubCtas } from '@/components/galapagos/GalapagosHubCtas';

const BASE = 'https://www.vermilionroutes.com';

export async function generateStaticParams() {
  return SUPPORTED_SEO_LOCALES.flatMap((locale) => ACTIVITY_PAGES.map((p) => ({ locale, slug: p.slug })));
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const pick = (r: Record<string, string> | undefined, locale: string) => (r ? r[locale] || r.en || r.es || '' : '');
const shorten = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);
const noParens = (s: string) => s.replace(/\s*\([^)]*\)/g, '').trim();

function load(locale: string, slug: string) {
  const entry = getActivityPage(slug);
  const activity = entry && GALAPAGOS_ACTIVITIES.find((a) => a.id === entry.activityId);
  if (!entry || !activity) return null;
  return { entry, activity };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = load(locale, slug);
  if (!data) return {};
  const { entry, activity } = data;
  const name = noParens(pick(activity.name, locale));
  const islandName = pick(activity.islandName, locale);
  const brand = ' | Vermilion Routes';
  const cutAt = (n: number) => (name.length <= n ? name : name.slice(0, n).replace(/\s+\S*$/, '').replace(/[\s,:;–-]+$/, ''));
  // Título de 50-60 caracteres: se prueba con cortes cada vez más largos y, si hace falta, con la isla.
  let title = `${cutAt(40)}${brand}`;
  for (const n of [40, 42, 44, 46, 48]) {
    const base = cutAt(n);
    const candidates = [`${base}${brand}`, `${base} · ${islandName}${brand}`];
    const hit = candidates.find((c) => c.length >= 50 && c.length <= 60);
    if (hit) { title = hit; break; }
  }
  // Descripción de 120-155 caracteres: resumen + dato útil (época y duración) si hace falta.
  const uiMeta = ACTIVITY_PAGE_UI[locale] || ACTIVITY_PAGE_UI.en;
  let description = pick(activity.shortDescription, locale).trim();
  if (description.length < 120) {
    const extra = ` ${uiMeta.duration}: ${pick(activity.duration, locale)}. ${uiMeta.island}: ${islandName}.`;
    description = `${description}${description.endsWith('.') ? '' : '.'}${extra}`;
  }
  if (description.length > 155) {
    description = description.slice(0, 154).replace(/\s+\S*$/, '').replace(/[\s,;:–-]+$/, '') + '…';
  }
  const url = `${BASE}/${locale}/galapagos-activities/${slug}`;
  const image = `${BASE}${entry.image}`;
  return {
    title,
    description,
    alternates: getSeoAlternates(`/galapagos-activities/${slug}`, locale),
    openGraph: { title, description, url, siteName: 'Vermilion Routes', type: 'article', images: [{ url: image, width: 1200, height: 630, alt: entry.imageAlt }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const data = load(locale, slug);
  if (!data) notFound();
  const { entry, activity } = data;
  const ui = ACTIVITY_PAGE_UI[locale] || ACTIVITY_PAGE_UI.en;

  const name = pick(activity.name, locale);
  const short = pick(activity.shortDescription, locale);
  const desc = pick(activity.description, locale);
  const islandName = pick(activity.islandName, locale);
  const duration = pick(activity.duration, locale);
  const difficulty = ui[activity.difficulty] || pick(activity.difficultyName, locale);
  const wildlife = activity.keyWildlife.map((w) => pick(w, locale)).filter(Boolean);
  const highlights = activity.highlights.map((h) => pick(h, locale)).filter(Boolean);
  const seasonNote = pick(activity.seasonalityNotes, locale);
  const months = activity.bestMonths.length >= 12 || activity.seasons.includes('all-year')
    ? ui.allYear
    : activity.bestMonths
        .map((m) => pick(MONTH_NAMES.find((x) => x.month === m)?.name, locale))
        .filter(Boolean)
        .join(', ') || ui.allYear;
  const tours = BASE_TOURS_GALAPAGOS.filter((t) => t.id !== 'none' && t.includedActivityIds.includes(activity.id));
  const hasTours = tours.length > 0;
  const tourNames = tours.map((t) => pick(t.name, locale));

  const faq = [
    { q: ui.qWhen, a: `${months}.${seasonNote ? ` ${seasonNote}` : ''}` },
    { q: ui.qLong, a: duration },
    { q: ui.qSee, a: wildlife.join(', ') },
    { q: ui.qHard, a: difficulty },
    { q: ui.qTour, a: hasTours ? `${ui.aTourYes} ${tourNames.join('; ')}.` : ui.aTourNo },
  ].filter((f) => f.a && f.a.trim() && f.a.trim() !== '.');

  const pageUrl = `${BASE}/${locale}/galapagos-activities/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristAttraction',
        '@id': `${pageUrl}#attraction`,
        name: noParens(name),
        description: short,
        image: `${BASE}${entry.image}`,
        url: pageUrl,
        touristType: 'Nature and wildlife travelers',
        containedInPlace: { '@type': 'Place', name: `${islandName}, Galápagos, Ecuador` },
        geo: { '@type': 'GeoCoordinates', latitude: -0.9538, longitude: -90.9656 },
        provider: { '@type': 'TravelAgency', name: 'Vermilion Routes', url: BASE },
        inLanguage: locale,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: ui.home, item: `${BASE}/${locale}` },
          { '@type': 'ListItem', position: 2, name: ui.parent, item: `${BASE}/${locale}/galapagos-activities` },
          { '@type': 'ListItem', position: 3, name: noParens(name), item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  const stat = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-emerald-700 dark:text-emerald-400">{icon}</span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="text-sm font-semibold text-zinc-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <main className="bg-[#FAFAF7] dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative min-h-[70svh] flex items-end overflow-hidden">
        <Image src={entry.image} alt={entry.imageAlt} fill priority sizes="100vw" className="object-cover" />
        {/* Degradado solo en la franja del texto */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-40 space-y-4 text-white">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-white/85">
            <Link href={`/${locale}`} className="hover:underline">{ui.home}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${locale}/galapagos-activities`} className="hover:underline">{ui.parent}</Link>
          </nav>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight max-w-4xl">{name}</h1>
          <p className="text-base sm:text-lg text-white/95 max-w-3xl">{short}</p>
        </div>
      </section>

      <aside aria-label="Quick Summary" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl p-5 sm:p-6">
          <h2 className="sr-only">{ui.summary}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stat(<CalendarDays className="w-5 h-5" />, ui.bestTime, months)}
            {stat(<Clock className="w-5 h-5" />, ui.duration, duration)}
            {stat(<Mountain className="w-5 h-5" />, ui.difficulty, difficulty)}
            {stat(<MapPin className="w-5 h-5" />, ui.island, islandName)}
          </div>
        </div>
      </aside>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <section className="space-y-4">
          <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-base sm:text-lg">{desc}</p>
          {seasonNote && <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{seasonNote}</p>}
        </section>

        {wildlife.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">{ui.whatYouSee}</h2>
            <ul className="flex flex-wrap gap-2">
              {wildlife.map((w) => (
                <li key={w} className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 text-sm text-emerald-900 dark:text-emerald-200">{w}</li>
              ))}
            </ul>
          </section>
        )}

        {highlights.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">{ui.highlights}</h2>
            <ul className="space-y-2 list-disc pl-5 text-zinc-800 dark:text-zinc-200">
              {highlights.map((h) => (<li key={h}>{h}</li>))}
            </ul>
          </section>
        )}

        {hasTours && (
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">{ui.toursTitle}</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {tours.map((t) => (
                <li key={t.id}>
                  <Link href={`/${locale}/tours/${t.id}`} className="block rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 hover:border-emerald-500 transition-colors">
                    <span className="font-serif font-bold text-zinc-900 dark:text-white">{pick(t.name, locale)}</span>
                    <span className="block text-xs text-zinc-600 dark:text-zinc-400 mt-1">{pick(t.duration, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">{ui.faqTitle}</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 group">
                <summary className="cursor-pointer font-semibold text-zinc-900 dark:text-white">{f.q}</summary>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-emerald-950 to-teal-900 text-white p-8 sm:p-10 space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">{ui.ctaTitle}</h2>
          <p className="text-white/90 max-w-2xl">{ui.ctaText}</p>
          <GalapagosHubCtas
            planLabel={ui.ctaPlan}
            callLabel={ui.ctaCall}
            detail={{ destination: 'galapagos', tourTitle: noParens(name) }}
            placement={`activity_${activity.id}`}
          />
        </section>

        <p>
          <Link href={`/${locale}/galapagos-activities`} className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
            ← {ui.seeAll}
          </Link>
        </p>
      </div>
    </main>
  );
}
