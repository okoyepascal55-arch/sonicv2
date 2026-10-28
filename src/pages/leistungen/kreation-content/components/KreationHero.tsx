import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { openCalendly } from '@/components/feature/CalendlyWidget';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useMotionPaused } from '@/lib/motion';
import { useText } from '@/hooks/useText';
import { useLeistungenText } from '@/hooks/useLeistungenText';
import { useCtaText } from '@/hooks/useCtaText';
import { CAROUSEL_FALLBACKS } from './kreationFallbacks';

/* Hero as a manifesto (28.10.2026): dark, left-aligned statement, with the carousel tiles
   (Media → Kreation — Carousel Tiles, labels: Text → 3D-Karussell) running behind it as a
   slow contact-sheet wall. Texts unchanged: Hero, Hero Kennzahlen & Button. */
const TILE_COUNT = 9;

type Tile = { key: string; src: string; label: string };

function TileCard({ tile }: { tile: Tile }) {
  return (
    <figure className="relative overflow-hidden bg-[#1a1b18] flex-shrink-0" style={{ aspectRatio: '4 / 5' }}>
      <img src={tile.src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} />
      <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent text-[10px] font-bold uppercase tracking-[0.12em] text-white/80">
        {tile.label}
      </figcaption>
    </figure>
  );
}

export default function KreationHero() {
  const motionPaused = useMotionPaused();
  const cta = useCtaText();
  const { images } = useMediaStore('leistungen_kreation_carousel_images');
  const tCar = useLeistungenText('leistungen_kreation_carousel');
  const tStats = useLeistungenText('leistungen_kreation_hero_stats');
  const tShow = useLeistungenText('leistungen_kreation_showcase');

  const tBadge = useText('leistungen_kreation', 'kreation-hero-badge', 'Inhouse Kreation & Content');
  const tLine1 = useText('leistungen_kreation', 'kreation-hero-heading-line1', 'Kreation,');
  const tAccent = useText('leistungen_kreation', 'kreation-hero-heading-accent', 'die Marken formt.');
  const tSubtitle = useText('leistungen_kreation', 'kreation-hero-subtitle', 'Von Konzeption und CI bis Layout, POS und innovativen Formaten — Kreation als strategischer Prozess.');

  const labelsKey = Array.from({ length: TILE_COUNT }, (_, i) => tCar[`tile${i + 1}`] ?? '').join('|');
  const tiles: Tile[] = useMemo(() => labelsKey.split('|').map((label, i) => ({
    key: `tile-${i}`,
    label,
    src: images[i]?.url ? resolveImageUrl(images[i].url) : CAROUSEL_FALLBACKS[i],
  })).filter((t) => t.src), [images, labelsKey]);

  // Three wall columns, each a different slice of the tiles, doubled for a seamless loop
  const columns = [0, 1, 2].map((c) => tiles.filter((_, i) => i % 3 === c));
  const stats = [1, 2, 3].map((n) => ({ value: tStats[`s${n}-value`] ?? '', label: tStats[`s${n}-label`] ?? '' })).filter((s) => s.value);

  return (
    <section
      className={`relative overflow-hidden px-4 md:px-6 ${motionPaused ? 'kr-paused' : ''}`}
      style={{ background: 'oklch(0.13 0.005 118)', paddingTop: 'clamp(104px, 10vw, 140px)' }}
    >
      {/* Contact-sheet wall — right half on desktop */}
      <div className="hidden lg:grid absolute top-0 bottom-0 right-0 w-[48%] grid-cols-3 gap-3 pr-6 pointer-events-none" aria-hidden="true">
        {columns.map((col, c) => (
          <div key={c} className="relative overflow-hidden" style={{ marginTop: c === 1 ? '-120px' : 0 }}>
            <div className={`flex flex-col gap-3 ${c === 1 ? 'kr-wall-down' : 'kr-wall-up'}`}>
              {[...col, ...col, ...col, ...col].map((tile, i) => <TileCard key={`${tile.key}-${i}`} tile={tile} />)}
            </div>
          </div>
        ))}
        {/* Fade the wall into the page on all sides */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, oklch(0.13 0.005 118) 0%, oklch(0.13 0.005 118 / 0.55) 22%, transparent 55%), linear-gradient(180deg, oklch(0.13 0.005 118) 0%, transparent 18%, transparent 80%, oklch(0.13 0.005 118) 100%)' }} />
      </div>

      <div className="relative z-10 sonic-container pb-14 md:pb-20 lg:min-h-[640px] flex flex-col justify-center">
        <div className="max-w-[760px] lg:max-w-[54%]">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/leistungen" className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-white">Leistungen</Link>
            <i className="ri-arrow-right-s-line text-white/30 text-sm" aria-hidden="true" />
            <span className="text-primary-500 text-xs font-black uppercase tracking-widest">{tBadge}</span>
          </div>

          <h1 className="text-white font-black uppercase leading-[0.9] mb-8" style={{ fontSize: 'clamp(2.6rem, 5.4vw, 5.4rem)', letterSpacing: '-0.035em' }}>
            {tLine1}
            <br />
            <span className="inline-block mt-2" style={{ background: 'oklch(0.81 0.19 115)', color: 'oklch(0.16 0.006 118)', padding: '0.04em 0.12em 0' }}>{tAccent}</span>
          </h1>

          <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-[520px] mb-10">{tSubtitle}</p>

          {stats.length > 0 && (
            <dl className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pl-4" style={{ borderLeft: '2px solid oklch(0.81 0.19 115)' }} aria-label="Kreation Kennzahlen">
              {stats.map((s, i) => (
                <div key={i}>
                  <dt className="text-white text-xl md:text-2xl font-black leading-none">{s.value}</dt>
                  <dd className="text-white/45 text-xs mt-1.5">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => openCalendly()} className="inline-flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 px-7 py-3.5 font-black text-sm hover:bg-white transition-colors cursor-pointer">
              <i className="ri-calendar-line" aria-hidden="true" />{cta.book}
            </button>
            <Link to="/leistungen/live-video" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-6 py-3 font-black text-sm hover:border-primary-500 hover:text-primary-500 transition-colors">
              {tStats['btn-secondary']}<i className="ri-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>

          {/* Scroll cue into the showcase (label = Showcase eyebrow from the dashboard) */}
          {tShow['eyebrow'] && (
            <a href="#konzept" className="group inline-flex items-center gap-3 mt-12 text-white/50 hover:text-primary-500 text-xs font-bold uppercase tracking-[0.2em] transition-colors">
              <span className="w-9 h-9 flex items-center justify-center border border-white/20 group-hover:border-primary-500"><i className="ri-arrow-down-line" aria-hidden="true" /></span>
              {tShow['eyebrow']}
            </a>
          )}
        </div>
      </div>

      {/* Mobile / tablet: the same tiles as one running strip */}
      <div className="lg:hidden relative -mx-4 md:-mx-6 pb-10 overflow-hidden" aria-hidden="true">
        <div className="flex gap-3 w-max kr-row-left">
          {[...tiles, ...tiles].map((tile, i) => <div key={`${tile.key}-m-${i}`} className="w-[150px] md:w-[190px]"><TileCard tile={tile} /></div>)}
        </div>
      </div>
    </section>
  );
}
