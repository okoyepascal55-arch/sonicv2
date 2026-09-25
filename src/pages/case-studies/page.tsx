import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/lib/textStore';


/* ─────────────────────────────────────────────
   TV & SOUND — Three-mandate visual comparison
───────────────────────────────────────────── */
interface Mandate {
  num: string;
  period: string;
  label: string;
  headlineValue: string;
  headlineLabel: string;
  stats: { value: string; label: string }[];
  services: string[];
  isActive?: boolean;
  timelineStart: number;
  timelineEnd: number;
}

const TL_START = 2009;
const TL_END   = 2026;
const TL_SPAN  = TL_END - TL_START;

function MandateComparison({ mandates }: { mandates: Mandate[] }) {
  const yearFrac = (y: number) => (y - TL_START) / TL_SPAN;
  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-primary-500 flex-shrink-0" />
        <div>
          <p className="text-xs font-black text-foreground-400 uppercase tracking-widest mb-0.5">Drei Mandate</p>
          <h3 className="text-xl font-black text-foreground-950 uppercase tracking-wide">TV &amp; Sound — Ein roter Faden seit 2009</h3>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] font-black text-foreground-400 uppercase tracking-widest">2009</span>
          <span className="text-[10px] font-black text-foreground-400 uppercase tracking-widest">2026</span>
        </div>
        <div className="relative h-9 bg-foreground-100 overflow-hidden">
          {mandates.map((m, i) => (
            <div key={i} className="absolute top-0 bottom-0 flex items-center overflow-hidden"
              style={{
                left: `${m.timelineStart * 100}%`,
                width: `${(m.timelineEnd - m.timelineStart) * 100}%`,
                background: m.isActive ? 'oklch(var(--primary-500))' : i === 0 ? 'oklch(var(--primary-500) / 0.85)' : 'oklch(var(--primary-500) / 0.6)',
                borderRight: i < mandates.length - 1 ? '2px solid white' : 'none',
              }}>
              <span className="text-[9px] font-black uppercase tracking-widest text-foreground-950 px-2 truncate hidden sm:block">{m.period}</span>
            </div>
          ))}
        </div>
        <div className="relative h-5 mt-px" style={{ background: 'oklch(0.13 0.005 118)' }}>
          {[2009, 2012, 2015, 2018, 2021, 2024].map(yr => (
            <div key={yr} className="absolute top-0 flex flex-col items-center"
              style={{ left: `${yearFrac(yr) * 100}%`, transform: 'translateX(-50%)' }}>
              <div className="w-px h-1.5 bg-white/20" />
              <span className="text-[9px] text-white/30 font-bold tabular-nums">{yr}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Three panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]" style={{ background: 'rgba(255,255,255,0.08)' }}>
        {mandates.map((m, i) => (
          <div key={i} className="relative flex flex-col"
            style={{ background: m.isActive ? 'oklch(0.16 0.006 118)' : 'oklch(0.13 0.005 118)', padding: 'clamp(20px,3vw,32px) clamp(18px,2.5vw,28px)' }}>
            <div className="absolute top-0 left-0 right-0"
              style={{ height: '3px', background: m.isActive ? 'oklch(var(--primary-500))' : 'oklch(var(--primary-500) / 0.35)' }} />
            <div className="flex items-start justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'oklch(var(--primary-500) / 0.7)' }}>{m.num}</span>
              {m.isActive && <span className="text-[9px] font-black uppercase tracking-[0.18em] bg-primary-500 text-foreground-950 px-2 py-0.5">Aktiv</span>}
            </div>
            <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{m.period}</p>
            <h4 className="font-black text-white leading-snug mb-6" style={{ fontSize: 'clamp(14px,1.5vw,17px)' }}>{m.label}</h4>
            <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="font-black text-primary-500 tabular-nums leading-none mb-1.5"
                style={{ fontSize: 'clamp(26px,3.5vw,42px)', letterSpacing: '-0.04em' }}>{m.headlineValue}</div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-snug">{m.headlineLabel}</div>
            </div>
            {/* Stats — value-hero cards */}
            <div className="grid grid-cols-2 gap-[2px] mb-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {m.stats.map((stat, si) => (
                <div key={si} className="flex flex-col p-3" style={{ background: 'oklch(0.12 0.004 118)' }}>
                  <span className="font-black text-primary-500 tabular-nums leading-none mb-1.5"
                    style={{ fontSize: 'clamp(15px,2vw,20px)', letterSpacing: '-0.03em' }}>{stat.value}</span>
                  <span className="text-[9px] font-bold text-white/35 uppercase tracking-[0.18em] leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {m.services.map(s => (
                <span key={s} className="text-[9px] font-black uppercase tracking-[0.12em] text-primary-500 px-2 py-1"
                  style={{ border: '1px solid oklch(var(--primary-500) / 0.28)' }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-foreground-400 mt-4 italic leading-relaxed">
        Alle Markennamen auf Kundenwunsch anonymisiert. Werte aus internem Reporting Sonic Group.
        Mandat 3 (ab 2025): laufendes Projekt — Kennzahlen beziehen sich auf das erste Projektjahr.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   LEISTUNGEN IM EINSATZ — split image + content panel
───────────────────────────────────────── */
function LeistungenImEinsatz({ modules, brand }: { modules: ServiceModule[]; brand: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const handleChange = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setFade(true);
    }, 200);
  };

  const mod = modules[activeIdx];

  return (
    <div className="mb-14">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-primary-500"></div>
        <div>
          <p className="text-xs font-black text-foreground-400 uppercase tracking-widest mb-0.5">Leistungen im Einsatz</p>
          <h3 className="text-xl font-black text-foreground-950 uppercase tracking-wide">{brand} — Was wir eingesetzt haben</h3>
        </div>
      </div>

      {/* Tab buttons */}
      <div
        className="flex gap-0 overflow-x-auto mb-0 border border-b-0 border-foreground-200"
        style={{ scrollbarWidth: 'none' }}
        role="tablist"
        aria-label={`Leistungen im Einsatz — ${brand}`}
      >
        {modules.map((d, idx) => (
          <button
            key={idx}
            onClick={() => handleChange(idx)}
            role="tab"
            aria-selected={activeIdx === idx}
            aria-controls={`module-panel-${idx}`}
            id={`module-tab-${idx}`}
            className={`flex items-center gap-2 px-4 md:px-5 py-3 transition-all duration-200 cursor-pointer text-xs md:text-sm font-bold whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 border-r border-foreground-200 last:border-r-0 ${
              activeIdx === idx
                ? 'bg-foreground-950 text-primary-500 border-b-2 border-b-primary-500'
                : 'bg-white text-foreground-500 hover:bg-background-50 hover:text-foreground-950'
            }`}
            style={{ borderRadius: 0 }}
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-black flex-shrink-0 ${
                activeIdx === idx ? 'bg-primary-500 text-foreground-950' : 'bg-foreground-200 text-foreground-500'
              }`}
              style={{ borderRadius: 0 }}
            >
              {d.num}
            </span>
            <span className="hidden sm:inline">{d.title}</span>
            <span className="sm:hidden">{d.num}</span>
          </button>
        ))}
      </div>

      {/* Split panel */}
      <div
        id={`module-panel-${activeIdx}`}
        role="tabpanel"
        aria-labelledby={`module-tab-${activeIdx}`}
        className="grid grid-cols-1 md:grid-cols-5 border border-foreground-200 overflow-hidden"
        style={{ borderRadius: 0, transition: 'opacity 0.2s ease', opacity: fade ? 1 : 0, minHeight: 'clamp(200px, 45vw, 380px)' }}
      >
        {/* LEFT — image (3 cols) */}
        <div className="lg:col-span-3 relative overflow-hidden" style={{ minHeight: 'clamp(160px, 36vw, 280px)' }}>
          <img
            src={mod.img}
            alt={`${mod.title} — ${brand}`}
            className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 20%' }}
          />
          {/* Tag chips bottom-left */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-10">
            {mod.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-foreground-950/75 border border-white/20 text-white"
                style={{ borderRadius: 0 }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — content panel (2 cols) */}
        <div className="lg:col-span-2 bg-foreground-950 flex flex-col justify-between p-6 md:p-8">
          <div>
            {/* Module number + title */}
            <div className="flex items-start gap-3 mb-5">
              <div
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary-500 mt-0.5"
                style={{ borderRadius: 0 }}
              >
                <span className="text-foreground-950 font-black text-sm tabular-nums">{mod.num}</span>
              </div>
              <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-wide leading-snug">
                {mod.title}
              </h4>
            </div>

            {/* Lime divider */}
            <div className="w-10 h-0.5 bg-primary-500 mb-5"></div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              {mod.desc}
            </p>
          </div>

          {/* Dot navigator + counter */}
          <div className="flex items-center gap-2 mt-8">
            <div className="flex items-center gap-1.5 flex-1 flex-wrap">
              {modules.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChange(idx)}
                  role="tab"
                  aria-selected={activeIdx === idx}
                  aria-label={`Modul ${m.num}: ${m.title}`}
                  className={`transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 ${
                    activeIdx === idx
                      ? 'w-7 h-2 bg-primary-500'
                      : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                  }`}
                  style={{ borderRadius: 0 }}
                  title={m.title}
                />
              ))}
            </div>
            <span className="text-[11px] font-black text-white/35 uppercase tracking-widest tabular-nums flex-shrink-0">
              {activeIdx + 1}/{modules.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServiceModule {
  num: string;
  title: string;
  desc: string;
  img: string;
  tags: string[];
}

interface CaseStudy {
  id: string;
  slug: string;
  brand: string;
  woodIcon: string;
  metric: string;
  metricLabel: string;
  headline: string;
  subline: string;
  campaignType: string;
  since: string;
  quote: string;
  author: string;
  role: string;
  woodStats: { label: string; value: string; progress: number }[];
  woodPills: { label: string; value: string }[];
  monthlyTrend: number[];
  overview: string;
  modules: ServiceModule[];
  gallery: string[];
  bentoImages: { src: string; span: string; label: string }[];
  imageGroups: { title: string; mediaKey: string; fallbacks: string[] }[];
  relatedStories: string[];
  comparisonMandates?: Mandate[];
}


// ── Grouped Impressionen Gallery ────────────────────────────────────────────
function GroupedImpressionenGallery({
  groups,
  brand,
  openLightbox,
}: {
  groups: { title: string; mediaKey: string; fallbacks: string[] }[];
  brand: string;
  openLightbox: (items: LightboxItem[], startIndex: number) => void;
}) {
  // Collect images from media store for each group
  const allMediaKeys = [
    'case_garmin_gallery_1','case_garmin_gallery_2','case_garmin_gallery_3','case_garmin_gallery_4',
    'case_seb_gallery_1','case_seb_gallery_2',
    'case_tvsound_gallery_1','case_tvsound_gallery_2',
    'case_avoury_gallery_1','case_avoury_gallery_2',
  ] as const;

  // Fetch all possible store sections upfront (hooks cannot be conditional)
  const g1 = useMediaStore('case_garmin_gallery_1');
  const g2 = useMediaStore('case_garmin_gallery_2');
  const g3 = useMediaStore('case_garmin_gallery_3');
  const g4 = useMediaStore('case_garmin_gallery_4');
  const s1 = useMediaStore('case_seb_gallery_1');
  const s2 = useMediaStore('case_seb_gallery_2');
  const tv1 = useMediaStore('case_tvsound_gallery_1');
  const tv2 = useMediaStore('case_tvsound_gallery_2');
  const a1 = useMediaStore('case_avoury_gallery_1');
  const a2 = useMediaStore('case_avoury_gallery_2');
  const a3 = useMediaStore('case_avoury_gallery_3');
  const a4 = useMediaStore('case_avoury_gallery_4');
  const s3 = useMediaStore('case_seb_gallery_3');
  const s4 = useMediaStore('case_seb_gallery_4');
  const tv3 = useMediaStore('case_tvsound_gallery_3');
  const tv4 = useMediaStore('case_tvsound_gallery_4');

  const storeMap: Record<string, ReturnType<typeof useMediaStore>> = {
    'case_garmin_gallery_1': g1, 'case_garmin_gallery_2': g2,
    'case_garmin_gallery_3': g3, 'case_garmin_gallery_4': g4,
    'case_seb_gallery_1': s1, 'case_seb_gallery_2': s2,
    'case_tvsound_gallery_1': tv1, 'case_tvsound_gallery_2': tv2,
    'case_avoury_gallery_1': a1, 'case_avoury_gallery_2': a2,
    'case_avoury_gallery_3': a3, 'case_avoury_gallery_4': a4,
    'case_seb_gallery_3': s3, 'case_seb_gallery_4': s4,
    'case_tvsound_gallery_3': tv3, 'case_tvsound_gallery_4': tv4,
  };

  const getGroupImages = (group: typeof groups[0]): string[] => {
    const store = storeMap[group.mediaKey];
    const storeUrls = store?.images?.filter(img => img.url).map(img => resolveImageUrl(img.url)) ?? [];
    return storeUrls.length > 0 ? storeUrls : group.fallbacks;
  };

  // Build flat lightbox array across all groups for navigation
  const allItems: LightboxItem[] = groups.flatMap(group =>
    getGroupImages(group).map(src => ({
      image: src,
      title: group.title,
      category: brand,
      description: `${group.title} — ${brand} Fallbeispiel`,
    }))
  );

  let globalIdx = 0;

  return (
    <div className="mb-14">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-8 bg-primary-500 flex-shrink-0" />
        <div>
          <p className="text-xs font-black text-foreground-400 uppercase tracking-widest mb-0.5">Bildergalerie</p>
          <h3 className="text-xl font-black text-foreground-950 uppercase tracking-wide">
            {brand} — <span className="v3-marker">Impressionen</span>
          </h3>
        </div>
      </div>

      {/* Groups — each with editorial layout */}
      <div className="flex flex-col gap-12">
        {groups.map((group) => {
          const images = getGroupImages(group);
          if (!images.length) return null;

          const groupStartIdx = globalIdx;
          globalIdx += images.length;

          return (
            <div key={group.mediaKey}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em]"
                  style={{ color: 'oklch(0.55 0.08 115)' }}>
                  <span className="w-3 h-0.5 bg-primary-500 flex-shrink-0" />
                  {group.title}
                </span>
                <div className="flex-1 h-px" style={{ background: 'oklch(0.55 0.08 115 / 0.15)' }} />
              </div>

              {/* Bento grid — 4-col base, featured col-span-2 row-span-2, rest fill */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-[3px]"
                style={{ background: 'oklch(0.90 0.003 110)', gridAutoRows: '140px' }}
              >
                {images.map((src, imgIdx) => {
                  const isFeatured = imgIdx === 0 && images.length > 1;
                  const lightboxIdx = groupStartIdx + imgIdx;
                  return (
                    <GalleryThumb
                      key={imgIdx}
                      src={src}
                      alt={`${group.title} — ${brand}`}
                      lightboxIdx={lightboxIdx}
                      allItems={allItems}
                      openLightbox={openLightbox}
                      className={isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Reusable gallery thumbnail with consistent hover behaviour */
function GalleryThumb({
  src, alt, lightboxIdx, allItems, openLightbox, className = '',
}: {
  src: string; alt: string; lightboxIdx: number;
  allItems: LightboxItem[];
  openLightbox: (items: LightboxItem[], idx: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      onClick={() => openLightbox(allItems, lightboxIdx)}
      role="button" tabIndex={0}
      aria-label={`${alt} — vergrößern`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(allItems, lightboxIdx); } }}
    >
      <img src={src} alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        loading="lazy" />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-foreground-950/0 group-hover:bg-foreground-950/35 transition-colors duration-300" />
      {/* Expand icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-11 h-11 flex items-center justify-center bg-primary-500">
          <i className="ri-zoom-in-line text-foreground-950 text-lg font-bold" />
        </div>
      </div>
      {/* Lime top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300" />
    </div>
  );
}

export default function CaseStudiesPage() {
  useSEO({
    title: 'Fallbeispiele | Sonic Group — Garmin, Groupe SEB, Avoury, TV & Sound',
    description: 'Bewiesene Ergebnisse: Sonic Group Fallbeispiele — Garmin +116%, Groupe SEB +130%, Avoury +1.187%, TV & Sound 1,72 Mrd. €. 187% Umsatzwachstum im DACH-Raum.',
    keywords: 'Sonic Group Fallbeispiele, Garmin Retail Activation, TV & Sound, Groupe SEB, Avoury, DACH Retail Ergebnisse',
    canonical: 'https://sonic-group.de/fallbeispiele',
    ogTitle: 'Fallbeispiele — Sonic Group DACH',
    ogDescription: 'Garmin +116%, Groupe SEB +130%, Avoury +1.187%, TV & Sound 1,72 Mrd. € — echte Markenerfolge mit Sonic Group.',
  });

  const navigate = useNavigate();
  const { images: woodTextures } = useMediaStore('losungen_wood_textures');
  const { images: heroImages } = useMediaStore('case_studies_hero_images');

  // ── Module image hooks — dashboard-controllable ──
  const { images: gMod1 } = useMediaStore('case_garmin_module_1');
  const { images: gMod2 } = useMediaStore('case_garmin_module_2');
  const { images: gMod3 } = useMediaStore('case_garmin_module_3');
  const { images: gMod4 } = useMediaStore('case_garmin_module_4');
  const { images: gMod5 } = useMediaStore('case_garmin_module_5');
  const { images: sMod1 } = useMediaStore('case_seb_module_1');
  const { images: sMod2 } = useMediaStore('case_seb_module_2');
  const { images: sMod3 } = useMediaStore('case_seb_module_3');
  const { images: sMod4 } = useMediaStore('case_seb_module_4');
  const { images: sMod5 } = useMediaStore('case_seb_module_5');
  const { images: sMod6 } = useMediaStore('case_seb_module_6');
  const { images: aMod1 } = useMediaStore('case_avoury_module_1');
  const { images: aMod2 } = useMediaStore('case_avoury_module_2');
  const { images: aMod3 } = useMediaStore('case_avoury_module_3');
  const { images: aMod4 } = useMediaStore('case_avoury_module_4');
  const { images: aMod5 } = useMediaStore('case_avoury_module_5');
  const { images: tvMod1 } = useMediaStore('case_tvsound_module_1');
  const { images: tvMod2 } = useMediaStore('case_tvsound_module_2');
  const { images: tvMod3 } = useMediaStore('case_tvsound_module_3');

  const moduleImgMap: Record<string, ReturnType<typeof useMediaStore>['images'][]> = {
    'garmin':     [gMod1, gMod2, gMod3, gMod4, gMod5],
    'groupe-seb': [sMod1, sMod2, sMod3, sMod4, sMod5, sMod6],
    'avoury':     [aMod1, aMod2, aMod3, aMod4, aMod5],
    'tv-sound':   [tvMod1, tvMod2, tvMod3],
  };

  const getModuleImg = (caseId: string, modIdx: number, fallback: string): string => {
    const dashImg = moduleImgMap[caseId]?.[modIdx]?.[0];
    return dashImg?.url ? resolveImageUrl(dashImg.url) : fallback;
  };
  // Dashboard-editable text via textStore (Dashboard → Fallbeispiele)
  const tGarminHeadline  = useText('case_garmin_text', 'garmin-headline', 'Sieben Module. Ein Partner. Fünf Jahre Wachstum.');
  const tGarminSubline   = useText('case_garmin_text', 'garmin-subline',  'Garmin #BEATYESTERDAY — Partner seit 2021.');
  const tGarminOverview  = useText('case_garmin_text', 'garmin-overview', 'Vertrauen wächst, wenn Ergebnisse folgen. Mit Garmin starteten wir 2021 mit einem klaren Auftrag: Promotion in Deutschland.');
  const tGarminQuote     = useText('case_garmin_text', 'garmin-quote',    'Gemeinsam mehr erreichen — das ist unser Motto mit Sonic.');
  const tGarminAuthor    = useText('case_garmin_text', 'garmin-author',   'Projektteam Garmin Deutschland');
  const tGarminRole      = useText('case_garmin_text', 'garmin-role',     'In Zusammenarbeit mit der Sonic Group');

  const tSebHeadline     = useText('case_seb_text',    'seb-headline',    'Derselbe Markt. Mehr Ertrag pro Tag.');
  const tSebSubline      = useText('case_seb_text',    'seb-subline',     'Groupe SEB — Tefal, Rowenta, Krups, WMF. Partner seit 2019.');
  const tSebOverview     = useText('case_seb_text',    'seb-overview',    'Derselbe Markt. Dieselben Stores. Vier Marken. Und der Umsatz pro Einsatztag wächst von Jahr zu Jahr.');
  const tSebQuote        = useText('case_seb_text',    'seb-quote',       'Sonic bringt unsere Marken durch gezielte Verkaufsunterstützung direkt zu den Menschen.');
  const tSebAuthor       = useText('case_seb_text',    'seb-author',      'Projektleitung: Carina');
  const tSebRole         = useText('case_seb_text',    'seb-role',        'Sonic Group — Projektverantwortung Groupe SEB');

  const tAvouryHeadline  = useText('case_avoury_text', 'avoury-headline', 'Wenn Cross-Selling zum System wird.');
  const tAvourySubline   = useText('case_avoury_text', 'avoury-subline',  'Avoury One by Melitta — Partner seit 2021.');
  const tAvouryOverview  = useText('case_avoury_text', 'avoury-overview', 'Nicht jede Wachstumskurve sieht gleich aus. Die von Avoury sieht aus wie ein Aufstieg — und dann wie eine senkrechte Wand.');
  const tAvouryQuote     = useText('case_avoury_text', 'avoury-quote',    'Dank datenbasierter Optimierungen und dem Sonic SRT konnten wir Geräteabsatz und Gesamtumsatz massiv steigern.');
  const tAvouryAuthor    = useText('case_avoury_text', 'avoury-author',   'Projektteam Avoury by Melitta');
  const tAvouryRole      = useText('case_avoury_text', 'avoury-role',     'In Zusammenarbeit mit der Sonic Group');

  const tTvHeadline      = useText('case_tvsound_text','tvsound-headline','Vom Launch zur Marktführerschaft.');
  const tTvSubline       = useText('case_tvsound_text','tvsound-subline', 'Drei Mandate · Drei Unternehmen · Ein roter Faden — seit 2009.');
  const tTvOverview      = useText('case_tvsound_text','tvsound-overview','Drei Unternehmen. Drei völlig unterschiedliche Ausgangssituationen. Eines gemeinsam: Sie haben uns ihren wichtigsten Vertriebskanal anvertraut.');
  const tTvQuote         = useText('case_tvsound_text','tvsound-quote',   'Im TV-Segment sind wir seit 2009. Was wir dabei gelernt haben: Der Markt belohnt nicht den Lautesten — er belohnt den Zuverlässigsten.');
  const tTvAuthor        = useText('case_tvsound_text','tvsound-author',  'Sonic Group');
  const tTvRole          = useText('case_tvsound_text','tvsound-role',    'TV & Sound — Projektüberblick DACH');

  // Dashboard-editable metrics via textStore
  const tGarminMetric  = useText('case_garmin',   'case-garmin-metric',         '+116%');
  const tGarminLabel   = useText('case_garmin',   'case-garmin-metric-label',   'Umsatzwachstum 2021–2024');
  const tSebMetric     = useText('case_seb',      'case-seb-metric',            '+130%');
  const tSebLabel      = useText('case_seb',      'case-seb-metric-label',      'Umsatz je Einsatztag 2019–2024');
  const tAvouryMetric  = useText('case_avoury',   'case-avoury-metric',         '+1.187%');
  const tAvouryLabel   = useText('case_avoury',   'case-avoury-metric-label',   'Abverkauf pro Einsatztag 2021–2023');
  const tTvMetric      = useText('case_tvsound',  'case-tvsound-metric',        '1,72 Mrd. €');
  const tTvLabel       = useText('case_tvsound',  'case-tvsound-metric-label',  'Kumulierter Umsatz, längstes Mandat');

  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'garmin',
      slug: 'garmin',
      brand: 'Garmin',
      woodIcon: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      metric: tGarminMetric,
      metricLabel: tGarminLabel,
      headline: 'Sportlich nach vorn',
      subline: '#beatyesterday: Seit 2021 — Retail-Partnerschaft mit Garmin im DACH-Raum',
      campaignType: 'Retail Activation & POS Full-Service',
      since: '2021',
      quote: 'Seit 2021 verbindet GARMIN und Sonic eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Im Jahr 2024 entwickelte und realisierte Sonic ein innovatives, interaktives POS-Möbel- und Servicekonzept für GARMIN. Mit hoher Qualität, Professionalität und einem ausgeprägten Markenverständnis überzeugt Sonic auf ganzer Linie. Besonders schätzen wir die partnerschaftliche Zusammenarbeit auf Augenhöhe – stets lösungsorientiert und engagiert. Wir empfehlen Sonic uneingeschränkt weiter und freuen uns auf die weitere gemeinsame Erfolgsgeschichte.',
      author: 'Dana Eichinger',
      role: 'Director Marketing DACH, Garmin Deutschland GmbH',
      woodStats: [
        { label: 'Umsatzwachstum 2021–2024', value: '+116%', progress: 87 },
        { label: 'Märkte', value: 'DE + AT + Sport', progress: 70 },
        { label: 'Partnerschaft seit', value: '2021', progress: 55 },
      ],
      woodPills: [
        { label: 'Start', value: '2021' },
        { label: 'Märkte', value: 'DE + AT' },
        { label: 'Module', value: '7' },
      ],
      monthlyTrend: [38, 41, 44, 47, 54, 61, 67, 72, 77, 82, 90, 99], // 2021→2025 cumulative growth index
      overview: tGarminOverview, // was: 'Vertrauen wächst, wenn Ergebnisse folgen. Mit Garmin starteten wir 2021 mit einem klaren Auftrag: Promotion in Deutschland. Jedes Jahr hat Garmin den Leistungsumfang ausgebaut — weil die Ergebnisse stimmten. Heute verantworten wir sieben Bereiche: Promotion DE, Promotion AT, Promotion Sport, POS One World, POS-Service, Lager und Möbelbau & Logistik. Die Partnerschaft zeigt, was passiert, wenn Qualität Konsequenzen hat.',
      modules: [
        { num: '01', title: 'Promotions', desc: 'Beispiel: Aktivierung am POS per Rabatt-Aktion. Full-Service-Umsetzung durch unsere Field Force.', img: '/images/Case Studies -Fallbsp/Garmin/5243_190035993.webp', tags: ['POS', 'Field Force', 'DACH'] },
        { num: '02', title: 'Aktionen', desc: 'Beispiel: Smoothie-Verkostungsaktion am POS als niederschwelliger Gesprächseinstieg.', img: '/images/Case Studies -Fallbsp/Garmin/5243_190036664.webp', tags: ['Live-Aktion', 'Verkostung', 'POS'] },
        { num: '03', title: 'POS-Möbel', desc: 'Eigens entwickeltes, modulares Präsentationsmöbel mit digitalen Elementen.', img: '/images/Case Studies -Fallbsp/Garmin/5279_10060291.webp', tags: ['Design', 'Modular', 'Digital'] },
        { num: '04', title: 'Training', desc: 'Wir schulen die Sales-Teams, bei uns in Krefeld und mobil in ganz Deutschland.', img: '/images/Case Studies -Fallbsp/Garmin/5315_195525779.webp', tags: ['Schulung', 'Krefeld', 'Zertifizierung'] },
        { num: '05', title: 'Lager & Logistik', desc: 'POS-Ausstattung wird bei Sonic produziert, gelagert und versendet.', img: '/images/Case Studies -Fallbsp/Garmin/5431_162510371.webp', tags: ['Lager', 'Logistik', 'Versand'] },
      ],
      gallery: [
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_600_A26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_600_A26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/MM Hückelhoven_Chris L.webp',
      ],
      bentoImages: [
        { src: '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_1000_A26_Front.webp', span: 'md:col-span-2 md:row-span-2', label: 'POS Activation' },
        { src: '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_1000_A26_Front.webp', span: 'md:col-span-1 md:row-span-1', label: 'POS-Möbel 2024' },
        { src: '/images/Case Studies -Fallbsp/Garmin/MM Chemnitz_Rene G.webp', span: 'md:col-span-1 md:row-span-1', label: 'Training Krefeld' },
        { src: '/images/Case Studies -Fallbsp/Garmin/Saturn Frankfurt_Redouan B.webp', span: 'md:col-span-2 md:row-span-1', label: 'Lager & Logistik' },
      ],

      imageGroups: [
        { title: 'POS Aktivierung', mediaKey: 'case_garmin_gallery_1', fallbacks: ['/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_1000_A26_Front.webp', '/images/Case Studies -Fallbsp/Garmin/5243_190035993.webp', '/images/Case Studies -Fallbsp/Garmin/Saturn Frankfurt_Redouan B.webp'] },
        { title: 'POS-Möbel & Displays', mediaKey: 'case_garmin_gallery_2', fallbacks: ['/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_1000_A26_Front.webp', '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_600_A26_Front.webp'] },
        { title: 'Training & Team', mediaKey: 'case_garmin_gallery_3', fallbacks: ['/images/Case Studies -Fallbsp/Garmin/MM Chemnitz_Rene G.webp', '/images/Case Studies -Fallbsp/Garmin/5315_195525779.webp', '/images/Case Studies -Fallbsp/Garmin/MM Hückelhoven_Chris L.webp'] },
        { title: 'Lager & Logistik', mediaKey: 'case_garmin_gallery_4', fallbacks: ['/images/Case Studies -Fallbsp/Garmin/5431_162510371.webp'] },
      ],
      relatedStories: ['groupe-seb', 'avoury'],
    },
    {
      id: 'groupe-seb',
      slug: 'groupe-seb',
      brand: 'Groupe SEB',
      woodIcon: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      metric: tSebMetric,
      metricLabel: tSebLabel,
      headline: 'Partnerschaft mit Performance',
      subline: 'Tefal, Rowenta, Krups, WMF — Multi-Brand-Aktivierung seit 2019',
      campaignType: 'Multi-Brand Field Force & Live-Video',
      since: '2019',
      quote: 'Hier finde ich, ohne großes Excel Kung-Fu, dass was ich für die Vorbereitung von Meetings benötige, das Ganze mit wenigen Klicks und mit Exportfunktion. Das SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit.',
      author: 'Ramin Dirinpur',
      role: 'Sales Promotion & Sales Training Manager, Groupe SEB Deutschland GmbH',
      woodStats: [
        { label: 'Umsatzwachstum pro Einsatztag', value: '+130%', progress: 88 },
        { label: 'Laufzeit', value: '2019–2024', progress: 75 },
        { label: 'Marken', value: '4', progress: 60 },
      ],
      woodPills: [
        { label: 'Start', value: '2019' },
        { label: 'Marken', value: '4' },
        { label: 'Module', value: '6' },
      ],
      monthlyTrend: [40, 42, 45, 55, 66, 70, 80, 92, 91, 91, 95, 99], // 2019→2025 €/Einsatztag (947→2363)
      overview: 'Derselbe Markt. Dieselben Stores. Vier Marken. Und der Umsatz pro Einsatztag wächst von Jahr zu Jahr. Seit 2019 begleiten wir die Groupe SEB mit Tefal, Rowenta, Krups und WMF. Der Tagesumsatz hat sich von 947 € (2019) auf 2.178 € (2024) mehr als verdoppelt — nicht durch mehr Personal, sondern durch bessere Methode. Roadshows, Live-Cooking, Video-Beratung aus unseren Studios, POS-Aktivierung, Trainings und tagesgenauer Reporting-Loop: alles aus einer Hand, alles messbar.',
      modules: [
        { num: '01', title: 'Live-Video-Beratung', desc: 'Aus den Sonic-Studios. Digital am POS und im Online-Shop. Für Rowenta, Tefal, Krups und WMF.', img: '/images/Case Studies -Fallbsp/SEB/20250604_205405_187.webp', tags: ['Live-Video', 'Studio', 'Digital'] },
        { num: '02', title: 'Aktionen', desc: 'Beispiel: verkaufsstarkes Live-Cooking am POS, betreut von unseren Foodies in der Field Force.', img: '/images/Case Studies -Fallbsp/SEB/Bild_NecafeDolceGusto.webp', tags: ['Live-Cooking', 'POS', 'Field Force'] },
        { num: '03', title: 'Roadshow', desc: 'Die rollende mehrmarkenfähige Trainings-Roadshow mit Foodtruck-Funktion: Airstream-Trailer als Showmobil.', img: '/images/Case Studies -Fallbsp/SEB/Gruppe Braun (37).webp', tags: ['Roadshow', 'Airstream', 'Mobile'] },
        { num: '04', title: 'Verkauf, POS-Pflege, Warenpräsentation', desc: 'Unsere Sales-Activation-Fachleute als Markenbotschafter, Verkäufer und Servicekräfte am POS.', img: '/images/Case Studies -Fallbsp/SEB/Gruppe Gold (5).webp', tags: ['POS-Pflege', 'Präsentation', 'Verkauf'] },
        { num: '05', title: 'Sales-Training', desc: 'Wir schulen Verkäufer der Handelsketten und unsere Field Force an unserem Campus in Krefeld sowie per Video-Webinar.', img: '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (13).webp', tags: ['Training', 'Krefeld', 'Zertifizierung'] },
        { num: '06', title: 'Reporting', desc: 'Tägliche Einsatzkosten und generierte Umsätze sind tag- und standortgenau auswertbar.', img: '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (26).webp', tags: ['SRT', 'Analytics', 'KPI'] },
      ],
      gallery: [
        '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (34).webp',
        '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (37).webp',
        '/images/Case Studies -Fallbsp/SEB/image16.webp',
      ],
      bentoImages: [
        { src: '/images/Case Studies -Fallbsp/SEB/Optigrill Tisch.webp', span: 'md:col-span-2 md:row-span-2', label: 'Live-Video Studio' },
        { src: '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam.webp', span: 'md:col-span-1 md:row-span-1', label: 'Airstream Roadshow' },
        { src: '/images/Case Studies -Fallbsp/SEB/image10.webp', span: 'md:col-span-1 md:row-span-1', label: 'Live-Cooking' },
        { src: '/images/Case Studies -Fallbsp/SEB/image12.webp', span: 'md:col-span-2 md:row-span-1', label: 'Tägliches Reporting' },
      ],

      imageGroups: [
        { title: 'Live-Cooking & Verkostung', mediaKey: 'case_seb_gallery_1', fallbacks: ['/images/Case Studies -Fallbsp/SEB/Optigrill Tisch.webp', '/images/Case Studies -Fallbsp/SEB/image10.webp'] },
        { title: 'Roadshow & Video-Studio', mediaKey: 'case_seb_gallery_2', fallbacks: ['/images/Case Studies -Fallbsp/SEB/Shooting_Miriam.webp'] },
        { title: 'POS & Retail', mediaKey: 'case_seb_gallery_3', fallbacks: [] },
        { title: 'Events & Messen', mediaKey: 'case_seb_gallery_4', fallbacks: [] },
      ],
      relatedStories: ['garmin', 'avoury'],
    },
    {
      id: 'avoury',
      slug: 'avoury',
      brand: 'Avoury',
      woodIcon: 'https://cdn.brandfetch.io/melitta.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      metric: tAvouryMetric,
      metricLabel: tAvouryLabel,
      headline: tAvouryHeadline,
      subline: tAvourySubline, // was: 'Avoury One — die Form der Kurve ändert sich, wenn die Methode stimmt.',
      campaignType: 'Field Force, Recruiting & Datenoptimierung',
      since: '2021',
      quote: 'Dank datenbasierter Optimierungen und dem Sonic SRT konnten wir Geräteabsatz und Gesamtumsatz massiv steigern. Die Ergebnisse haben unsere Erwartungen weit übertroffen.',
      author: 'Projektteam Avoury by Melitta',
      role: 'In Zusammenarbeit mit der Sonic Group',
      woodStats: [
        { label: 'Abverkauf/Einsatztag 2021–2023', value: '+1.187%', progress: 99 },
        { label: 'Schlüssel zum Erfolg', value: 'Cross-Selling', progress: 85 },
        { label: 'Partnerschaft seit', value: '2021', progress: 70 },
      ],
      woodPills: [
        { label: 'Start', value: '2021' },
        { label: 'Marke', value: 'Melitta' },
        { label: 'Module', value: '5' },
      ],
      monthlyTrend: [3, 3, 4, 4, 13, 22, 25, 48, 72, 83, 92, 99], // 2021→2025 cumulative Abverkauf/Tag (hockey-stick)
      overview: 'Nicht jede Wachstumskurve sieht gleich aus. Die von Avoury sieht aus wie ein Aufstieg — und dann wie eine senkrechte Wand. Seit 2021 unterstützen wir Melitta Single Portions am POS der Avoury One. Das zweite Jahr (+13 %) war solide. Das dritte Jahr war der Beweis: Wenn Gerätedemonstration, Personalauswahl und Cross-Selling auf Kapseln und Zubehör zum System werden, verändert sich die Dynamik grundlegend. Nicht weil mehr Promoter eingesetzt wurden — sondern weil die richtigen, am richtigen Ort, mit der richtigen Methode eingesetzt werden. Daten machen den Unterschied.',
      modules: [
        { num: '01', title: 'Recruiting', desc: 'Zum Start: Zusammenstellung Field Force Team aus eigenem Pool plus aus Recruiting. Gezieltes Matching auf Profil, Standort und Verkaufsstärke.', img: '/images/Case Studies -Fallbsp/Avoury/IMG-20230928-WA0000.webp', tags: ['Recruiting', 'Talentpool', 'Matching'] },
        { num: '02', title: 'Schulungen', desc: 'Vor den Einsätzen: Schulungen der Fachberater an unserem Campus in Krefeld — Produktwissen, Gesprächsführung, Cross-Selling-Methode.', img: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_01.webp', tags: ['Campus Krefeld', 'Schulung', 'Zertifizierung'] },
        { num: '03', title: 'Sales Promotions', desc: 'Nicht Verkauf per Zufall — Verkauf per System. Gerätedemonstration, gezieltes Cross-Selling auf Kapseln und Zubehör, nach unserer Methode.', img: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_05.webp', tags: ['POS', 'Cross-Selling', 'Methode'] },
        { num: '04', title: 'Reporting', desc: 'Was gemessen wird, wird besser. Das SRT zeigt tages- und standortgenau: wer verkauft, wo, wie viel — und warum. Das ist der Motor hinter der Kurve.', img: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_07.webp', tags: ['SRT', 'Daten', 'Analyse'] },
        { num: '05', title: 'Laufende Optimierungen', desc: 'Personalauswahl, Outlet-Auswahl, Einsatztage — alles datenbasiert optimiert. Das Ergebnis gibt jedes Jahr recht.', img: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_08.webp', tags: ['Optimierung', 'Datenbasiert', 'Matching'] },
      ],
      gallery: [
        '/images/Case Studies -Fallbsp/Avoury/b111db44-a0cf-4eea-b5b7-5a0fd48e1762.webp',
        '/images/Case Studies -Fallbsp/Avoury/ce8dc1a9-9db2-48e8-bc91-de257f9c7da7.webp',
        '/images/Case Studies -Fallbsp/Avoury/d131a95d-592d-41a8-beb7-a893c1b2faa6.webp',
      ],
      bentoImages: [
        { src: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_02.webp', span: 'md:col-span-2 md:row-span-2', label: 'POS Demo' },
        { src: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_06.webp', span: 'md:col-span-1 md:row-span-1', label: 'Schulungen Krefeld' },
        { src: '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_MASSE_THEKE.webp', span: 'md:col-span-1 md:row-span-1', label: 'Reporting & Daten' },
        { src: '/images/Case Studies -Fallbsp/Avoury/2.webp', span: 'md:col-span-2 md:row-span-1', label: 'Avoury One — Melitta' },
      ],
      imageGroups: [
        { title: 'Kampagnen-Aktivierung', mediaKey: 'case_avoury_gallery_1', fallbacks: [] },
        { title: 'Weitere Impressionen',  mediaKey: 'case_avoury_gallery_2', fallbacks: [] },
        { title: 'Events & Erlebnisse',   mediaKey: 'case_avoury_gallery_3', fallbacks: [] },
        { title: 'POS & Retail',          mediaKey: 'case_avoury_gallery_4', fallbacks: [] },
      ],
      relatedStories: ['garmin', 'groupe-seb'],
    },
    {
      id: 'tv-sound',
      slug: 'tv-sound',
      brand: 'TV & Sound',
      woodIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8v2H8v2h8v-2h-3v-2h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 14H4V4h16v12z'/%3E%3C/svg%3E",
      metric: tTvMetric,
      metricLabel: tTvLabel,
      headline: tTvHeadline,
      subline: tTvSubline, // was: 'Drei Mandate · Drei Unternehmen · Ein roter Faden — seit 2009.',
      campaignType: 'Field Force, POS-Möbel, Training, Digital & Messen',
      since: '2009',
      quote: 'Im TV-Segment sind wir seit 2009. Was wir dabei gelernt haben: Der Markt belohnt nicht den Lautesten — er belohnt den Zuverlässigsten. Drei Mandate. Drei Unternehmen. Derselbe Anspruch.',
      author: 'Sonic Group',
      role: 'TV & Sound — Projektüberblick DACH',
      woodStats: [
        { label: 'Kumulierter Umsatz Mandat 1 (2009–2019)', value: '1,72 Mrd. €', progress: 99 },
        { label: 'Kumulierter Umsatz Mandat 2 (2020–2024)', value: '239,8 Mio. €', progress: 72 },
        { label: 'Umsatzwachstum Mandat 3 · Jahr 1',        value: '+75 %',        progress: 88 },
      ],
      woodPills: [
        { label: 'Seit',    value: '2009' },
        { label: 'Mandate', value: '3' },
        { label: 'Markt',   value: 'DE' },
      ],
      monthlyTrend: [8, 18, 40, 60, 82, 99, 92, 72, 28, 48, 65, 88], // 2009→2026 drei Mandate arc
      overview: 'Drei Unternehmen. Drei völlig unterschiedliche Ausgangssituationen. Eines gemeinsam: Sie haben uns ihren wichtigsten Vertriebskanal anvertraut — den deutschen Handel. Für einen globalen Konzern wurden wir über zehn Jahre zum unverzichtbaren POS-Partner. Für einen europäischen Hersteller haben wir Deutschland zu seinem erfolgreichsten Markt auf dem Kontinent gemacht. Für einen internationalen Herausforderer gingen wir binnen sechs Wochen von null auf Vollbetrieb. Drei Mandate, drei Definitionen von Erfolg — und Sonic hat alle drei geliefert. Markennamen auf Kundenwunsch anonymisiert.',
      modules: [
        { num: '01', title: 'Gründungskunde · 2009–2019',        desc: '10 Jahre Partnerschaft: von der Markteinführung zum Peak. 1,72 Mrd. € kumulierter Umsatz. Im Spitzenjahr 2018: 45.380 Einsatztage. Im Projektverlauf übernimmt Sonic sukzessive weitere Produktkategorien.', img: '', tags: ['Promotion', 'POS-Möbel', 'Trainings', 'Roadshows', 'Lager'] },
        { num: '02', title: 'Europäischer Hersteller · 2020–2024', desc: 'Deutschland war nicht Plan A. Vier Jahre später war es der erfolgreichste europäische Markt des Kunden. +61 % Umsatzwachstum 2021→2024. +40 % Absatz 2020→2024. Sonic lieferte Field Force, 3D-Raumplaner-Konzept und laufendes Kampagnenmanagement.', img: '', tags: ['Field Force', '3D-Raumplaner', 'Digital', 'Kampagnen', 'Training'] },
        { num: '03', title: 'Laufendes Mandat · Ab 2025',         desc: 'Von null auf Vollbetrieb in sechs Wochen. Im ersten Projektjahr: +75 % Umsatz, +66 % Absatz, 10 % ISS. Mandat läuft.', img: '', tags: ['Launch', 'Rapid Scale', 'POS', 'Messen', 'Digital'] },
      ],
      gallery: ['', '', ''],
      bentoImages: [
        { src: '', span: 'md:col-span-2 md:row-span-2', label: 'POS Activation' },
        { src: '', span: 'md:col-span-1 md:row-span-1', label: 'Messe & Roadshow' },
        { src: '', span: 'md:col-span-1 md:row-span-1', label: 'Training' },
        { src: '', span: 'md:col-span-2 md:row-span-1', label: '3D-Raumplaner' },
      ],
      imageGroups: [
        { title: 'POS & Retail',       mediaKey: 'case_tvsound_gallery_1', fallbacks: [] },
        { title: 'Messen & Roadshows', mediaKey: 'case_tvsound_gallery_2', fallbacks: [] },
        { title: 'Training & Team',    mediaKey: 'case_tvsound_gallery_3', fallbacks: [] },
        { title: 'Digital & Kampagnen',mediaKey: 'case_tvsound_gallery_4', fallbacks: [] },
      ],
      comparisonMandates: [
        {
          num: '01 / 03', period: '2009–2019', label: 'Gründungskunde — 10 Jahre, ein Markt, ein Partner.',
          headlineValue: '1,72 Mrd. €', headlineLabel: 'Kumulierter Umsatz',
          stats: [
            { value: '45.380',  label: 'Einsatztage im Spitzenjahr 2018' },
            { value: '10 Jahre',label: 'Laufzeit der Partnerschaft' },
            { value: '+Multi',  label: 'Produktkategorien im Projektverlauf übernommen' },
          ],
          services: ['Promotion', 'POS-Möbel', 'Trainings', 'Roadshows', 'Lager'],
          isActive: false, timelineStart: 0, timelineEnd: 10 / 17,
        },
        {
          num: '02 / 03', period: '2020–2024', label: 'Deutschland war nicht Plan A — bis wir kamen.',
          headlineValue: '239,8 Mio. €', headlineLabel: 'Kumulierter Umsatz',
          stats: [
            { value: '+61 %',  label: 'Umsatzwachstum 2021 → 2024' },
            { value: '+40 %',  label: 'Absatzwachstum 2020 → 2024' },
            { value: '# 1',    label: 'Erfolgreichster europ. Markt des Kunden' },
          ],
          services: ['Field Force', '3D-Raumplaner', 'Digital', 'Kampagnen', 'Training'],
          isActive: false, timelineStart: 11 / 17, timelineEnd: 15 / 17,
        },
        {
          num: '03 / 03', period: 'Ab 2025', label: 'Von null auf Vollbetrieb in sechs Wochen.',
          headlineValue: '+75 %', headlineLabel: 'Umsatzwachstum · Jahr 1',
          stats: [
            { value: '+66 %',    label: 'Absatzwachstum Jahr 1' },
            { value: '10 %',     label: 'ISS binnen eines Jahres' },
            { value: '6 Wochen', label: 'Von Briefing bis Vollbetrieb' },
          ],
          services: ['Launch', 'Rapid Scale', 'POS', 'Messen', 'Digital'],
          isActive: true, timelineStart: 16 / 17, timelineEnd: 1,
        },
      ],
      relatedStories: ['garmin', 'avoury'],
    },
  ];

  const handleBrandClick = (index: number) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    setExpandedStory(null);
    const el = document.getElementById('case-studies-carousel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReadFullStory = (slug: string) => {
    const idx = caseStudies.findIndex((s) => s.slug === slug);
    if (idx !== -1) setCurrentSlide(idx);
    setExpandedStory(slug);
    setTimeout(() => {
      if (expandedRef.current) expandedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
    setExpandedStory(null);
  };

  const handleCollapseStory = () => {
    setExpandedStory(null);
    const el = document.getElementById('case-studies-carousel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);

  const openLightbox = (items: LightboxItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const current = caseStudies[currentSlide];
  const expanded = caseStudies.find((s) => s.id === expandedStory);

  return (
    <div className="min-h-[100dvh] bg-white">

      {/* Lightbox */}
      <Lightbox
        items={lightboxItems}
        activeIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length)}
      />

      {/* ── HERO BANNER ── */}
      <section
        className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden bg-foreground-950"
        style={{ paddingTop: 'clamp(56px, 14vw, 80px)' }}
      >
        <img
          src={heroImages[0]?.url ? resolveImageUrl(heroImages[0].url) : "/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_02.webp0-07-31 at 12.12.39 (1).webp"}
          alt="Erfolgsgeschichten"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(11,11,12,0.30) 0%, rgba(11,11,12,0.20) 45%, rgba(11,11,12,0.82) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 sonic-container pb-6 md:pb-10">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>Fallbeispiele</span>
          </div>
          <h1 className="leist-h1-hub text-white mb-4 md:mb-5">
            ERFOLGS<span className="text-primary-500">GESCHICHTEN</span>
          </h1>

        </div>
      </section>

      {/* ── BRAND SELECTOR + CARD ── */}
      <section id="case-studies-carousel" className="relative overflow-hidden bg-white">

        {/* Intro — single-column paragraph only (the wood card below already carries the stats) */}
        <div className="sonic-container py-6 md:py-8 border-b border-foreground-100">
          <p className="text-foreground-600 w-full" style={{ fontSize: '19px', lineHeight: '1.7' }}>
            Gemeinsam mit unseren Kunden erzielen wir messbare Erfolge. Unsere datengetriebene Arbeitsweise ermöglicht laufende Optimierungen — die Ergebnisse wachsen mit jeder weiteren Zusammenarbeit.
          </p>
        </div>

        {/* ── ELEVATED BLADE CARD ── */}
        <div className="sonic-container py-8 md:py-12">
          {/* Brand tabs — framed hairline row, joins directly into the wood card below.
              Mobile: natural width + horizontal scroll so "Groupe SEB" doesn't get crushed. */}
          <div
            className="flex overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden"
            style={{ border: '1px solid oklch(0.885 0.004 110)', borderBottom: 'none', scrollbarWidth: 'none' }}
            role="tablist"
            aria-label="Fallbeispiele nach Marke"
          >
            {caseStudies.map((study, index) => (
              <button
                key={study.brand}
                onClick={() => handleBrandClick(index)}
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`${study.brand} — ${study.metric} ${study.metricLabel}`}
                className={`flex-shrink-0 md:flex-1 px-4 md:px-5 py-3 font-black uppercase tracking-wider text-xs transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  currentSlide === index
                    ? 'bg-foreground-950 text-white'
                    : 'bg-white text-foreground-500 hover:text-foreground-950'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {study.brand}
                  {currentSlide === index && <span className="text-primary-500 font-bold">{study.metric}</span>}
                </span>
              </button>
            ))}
          </div>
          <div
            className="relative overflow-hidden"
            style={{ border: '1px solid oklch(0.885 0.004 110)' }}
          >
            {/* Wood texture bg */}
            <div className="absolute inset-0">
              {(woodTextures[0] && woodTextures[0].url) ? (
                <img src={woodTextures[0].url} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              ) : <div className="w-full h-full bg-foreground-950" />}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.58) 100%)' }} />
            </div>

            <div key={current.id} className="relative z-10 p-6 md:p-12" style={{ animation: 'brandFadeIn 0.3s ease-out forwards' }}>

              {/* ── ROW 1: Brand identity + campaign badge ── */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
                <div className="flex items-center gap-4">
                  <div className="overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 p-2" style={{ width: '52px', height: '52px' }}>
                    <img src={current.woodIcon} alt={`${current.brand}`} className="w-full h-full object-contain" loading="lazy" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div>
                    <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.25em] mb-1">{current.campaignType}</p>
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-none">{current.brand}</h2>
                    <p className="text-white/50 text-xs mt-1.5">{current.subline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start border border-white/15 bg-white/5 px-3 py-1.5 flex-shrink-0">
                  <i className="ri-calendar-line text-primary-500 text-xs" />
                  <span className="text-white/60 text-xs font-bold whitespace-nowrap">Seit {current.since}</span>
                </div>
              </div>

              {/* ── ROW 2: Hero metric + chart (5fr/7fr desktop, stacked mobile) ── */}
              <div className="grid md:grid-cols-[5fr_7fr] gap-6 md:gap-10 items-stretch mb-6">
                {/* Left — metric + overview */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black text-primary-500 font-sans tabular-nums" style={{ lineHeight: 0.9, letterSpacing: '-0.04em' }}>{current.metric}</div>
                    <p className="text-white/60 text-xs font-black uppercase tracking-wide mb-4 mt-2">{current.metricLabel}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{current.overview}</p>
                  </div>
                </div>

                {/* Right — performance chart */}
                <div className="bg-black/30 border border-white/10 p-5 md:p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70 text-xs font-black uppercase tracking-wide">Performance-Trend</span>
                    <span className="text-primary-500 text-xs font-black bg-white/10 px-2.5 py-1">{current.since}–{(current.metricLabel.match(/20\d{2}/g) || []).pop() || '2024'}</span>
                  </div>
                  <div className="flex-1 flex items-end gap-1 min-h-[120px] md:min-h-[140px]">
                    {current.monthlyTrend.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className="w-full transition-all duration-700"
                          style={{
                            height: `${(h / 100) * 100}%`,
                            background: h > 80 ? 'oklch(var(--primary-500))' : h > 60 ? 'oklch(var(--primary-500) / 0.75)' : 'oklch(var(--primary-500) / 0.45)',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                      <span key={i} className="text-white/30 flex-1 text-center text-[9px]">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── ROW 3: 3 fact pills ── */}
              <div className="grid grid-cols-3 mb-6" style={{ gap: '2px' }}>
                {current.woodPills.map((pill, idx) => (
                  <div key={idx} className="bg-black/25 border border-white/10 px-2 py-2.5 sm:px-3 sm:py-3 md:p-4 text-center">
                    <div className="text-primary-500 font-sans tabular-nums font-black text-sm sm:text-base md:text-xl mb-0.5 leading-tight">{pill.value}</div>
                    <div className="text-white/50 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wide leading-snug">{pill.label}</div>
                  </div>
                ))}
              </div>

              {/* ── ROW 4: Quote + CTA, combined in one row ── */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                <div className="min-w-0">
                  <i className="ri-double-quotes-l text-2xl text-primary-500/40 block mb-2" />
                  <p className="text-white/65 text-sm leading-relaxed italic line-clamp-2 max-w-xl">{current.quote}</p>
                  <p className="text-primary-500 text-[10px] font-black uppercase tracking-widest mt-2">{current.author} — {current.role}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleReadFullStory(current.slug)}
                    className="inline-flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 px-6 py-3 font-black uppercase tracking-wider hover:bg-white transition-all duration-300 cursor-pointer whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto"
                  >
                    Vollständige Story lesen
                    <i className="ri-arrow-down-line text-sm" />
                  </button>
                  <span className="text-white/30 text-xs font-bold">{currentSlide + 1} / {caseStudies.length}</span>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 flex-shrink-0"
                    aria-label="Nächste Erfolgsgeschichte"
                  >
                    <i className="ri-arrow-right-line text-base" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── EXPANDED STORY ── */}
      {expanded && (
        <section
          ref={expandedRef}
          className="bg-white"
          style={{ animation: 'expandIn 0.4s ease-out' }}
        >
          {/* Dark hero — tighter, better anchored */}
          <div className="relative bg-foreground-950 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src="/images/Case Studies -Fallbsp/Garmin/Tacx_Neu.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(11,11,12,0.9) 100%)' }} />
            <div className="relative z-10 sonic-container py-12 md:py-16">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-1.5 h-12 bg-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{expanded.metric} {expanded.metricLabel}</p>
                  <h2 className="leist-h2 text-white">
                    {expanded.brand} <span className="text-primary-500">Fallstudie</span>
                  </h2>
                  <p className="text-white/60 text-base font-bold mt-2 max-w-xl">{expanded.headline} — {expanded.subline}</p>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed max-w-2xl mt-5 pl-5 border-l border-white/10">{expanded.overview}</p>
            </div>
          </div>

          <div className="sonic-container py-12 md:py-16">

            {/* ── MODULES or MANDATE COMPARISON ── */}
            {expanded.comparisonMandates ? (
              <MandateComparison mandates={expanded.comparisonMandates} />
            ) : (
              <LeistungenImEinsatz
                modules={expanded.modules.map((mod, idx) => ({
                  ...mod,
                  img: getModuleImg(expanded.id, idx, mod.img),
                }))}
                brand={expanded.brand}
              />
            )}

            <GroupedImpressionenGallery
              groups={expanded.imageGroups}
              brand={expanded.brand}
              openLightbox={openLightbox}
            />

            {/* Related stories */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary-500"></div>
                <h3 className="text-xl font-black text-foreground-950 uppercase tracking-wide">Weitere Erfolgsgeschichten</h3>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                {expanded.relatedStories.map((relSlug) => {
                  const rel = caseStudies.find((s) => s.id === relSlug);
                  if (!rel) return null;
                  return (
                    <div
                      key={relSlug}
                      onClick={() => handleReadFullStory(relSlug)}
                      className="flex items-start gap-5 p-6 border border-foreground-200 hover:border-primary-500 transition-all duration-300 cursor-pointer group bg-white hover:bg-background-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 overflow-hidden"
                      style={{ borderRadius: 0 }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleReadFullStory(relSlug); }}
                    >
                      <div className="flex-shrink-0 w-28 text-left">
                        <div className="text-2xl font-black text-primary-500 font-sans tabular-nums leading-none">{rel.metric}</div>
                        <div className="text-[10px] text-foreground-500 font-bold mt-1.5 leading-snug">{rel.metricLabel}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-foreground-950 group-hover:text-primary-500 transition-colors text-base mb-1">{rel.brand}</h4>
                        <p className="text-[11px] text-foreground-500 font-bold uppercase tracking-wide mb-2">{rel.campaignType}</p>
                        <p className="text-sm text-foreground-500 leading-relaxed line-clamp-2">{rel.headline} — {rel.subline}</p>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <i className="ri-arrow-right-line text-primary-500 text-xl group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inline CTA — convert impressed readers */}
            <div className="mb-10 bg-foreground-950 border border-primary-500/30 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-primary-500 text-xs font-black uppercase tracking-widest mb-2">{expanded.metric} {expanded.metricLabel}</p>
                  <h3 className="sonic-h3 text-white">
                    Auch für deine Marke möglich?
                  </h3>
                  <p className="text-foreground-400 text-sm mt-2">
                    Lass uns besprechen, wie Sonic ähnliche Ergebnisse für dein Unternehmen erzielen kann.
                  </p>
                </div>
                <a
                  href="https://calendly.com/sonic-group/beratungsgespraech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-3 px-7 py-3.5 bg-primary-500 text-foreground-950 font-black uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                >
                  <i className="ri-calendar-line text-base" />
                  Beratungsgespräch buchen
                </a>
              </div>
            </div>

            {/* Next story CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-foreground-100">
              <button
                onClick={handleCollapseStory}
                className="inline-flex items-center gap-2 text-foreground-400 hover:text-foreground-950 transition-colors text-xs font-bold uppercase tracking-wide cursor-pointer"
              >
                <i className="ri-arrow-up-line" />
                Zurück zur Übersicht
              </button>
              <button
                onClick={() => {
                  const nextIdx = (caseStudies.findIndex((s) => s.id === expanded.id) + 1) % caseStudies.length;
                  setExpandedStory(null);
                  setCurrentSlide(nextIdx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => setExpandedStory(caseStudies[nextIdx].slug), 500);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground-950 text-white font-black uppercase tracking-wider hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
              >
                Nächste Story
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </section>
      )}

      <WoodenDivider />

      {/* ── CTA ── */}
      <section className="sonic-section-md bg-foreground-950 relative overflow-hidden">
        <div className="sonic-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-primary-500 text-xs font-black uppercase tracking-widest mb-2 block">Lass uns sprechen</span>
              <h2 className="leist-h2 text-white mb-2">Deine Marke. <span className="text-primary-500">Unser Einsatz.</span></h2>
              <p className="text-sm text-white/50 max-w-md">
                Wir bringen deine Marke dort zum Leuchten, wo die Kaufentscheidung fällt.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => { navigate('/'); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 300); }}
                className="px-6 py-3 bg-primary-500 text-foreground-950 font-black uppercase tracking-wider text-xs hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
              >
                Gespräch buchen
              </button>
              <button
                onClick={() => navigate('/leistungen')}
                className="px-6 py-3 bg-transparent text-white font-black uppercase tracking-wider text-xs border border-white/30 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
              >
                Leistungen ansehen
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes expandIn { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes brandFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}