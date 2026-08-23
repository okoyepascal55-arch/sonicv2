import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import type { MediaItem } from '@/lib/mediaStore';

interface SRTHeroProps {
  onScrollToFeatures: () => void;
  heroIcons: MediaItem[];
}

export default function SRTHero({ onScrollToFeatures, heroIcons }: SRTHeroProps) {

  // ── Text Store hooks ──
  const tBadge = useText('srt_hero', 'srt-hero-badge', 'Sonic-eigene Software');
  const tH1_1 = useText('srt_hero', 'srt-hero-h1-1', 'SONIC');
  const tH1_2 = useText('srt_hero', 'srt-hero-h1-2', 'REPORTING');
  const tH1_3 = useText('srt_hero', 'srt-hero-h1-3', 'TOOL.');
  const tSub = useText('srt_hero', 'srt-hero-sub', '');
  const tTagline = useText('srt_hero', 'srt-hero-tagline', 'Field-Force-ERP-System · Seit 2008 · Seit 2024 mit KI');
  const tCtaPrimary = useText('srt_hero', 'srt-hero-cta-primary', 'Beratungsgespräch buchen');
  const tCtaSecondary = useText('srt_hero', 'srt-hero-cta-secondary', 'Features entdecken');
  const tNavLabel = useText('srt_hero', 'srt-hero-nav-label', 'Direkt zu:');
  const tChip1 = useText('srt_hero', 'srt-hero-chip-1', 'All-in-Software');
  const tChip2 = useText('srt_hero', 'srt-hero-chip-2', 'Funktionsumfang');
  const tChip3 = useText('srt_hero', 'srt-hero-chip-3', 'Team-App');
  const tChip4 = useText('srt_hero', 'srt-hero-chip-4', 'Branchen');
  const tChip5 = useText('srt_hero', 'srt-hero-chip-5', 'Kundenstimmen');

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  }

  return (
    <section className="relative flex flex-col overflow-hidden bg-foreground-950 min-h-[520px] md:min-h-[600px]" style={{ paddingTop: '80px', paddingBottom: '0' }}>

      {/* Diagonal lime glow */}
      <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
        style={{ background: 'linear-gradient(135deg, transparent 25%, oklch(var(--primary-500) / 0.05) 100%)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }} />

      {/* Top lime line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-500 via-primary-500/60 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 w-full pb-10 md:pb-14">
        <div className="max-w-[640px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#C8D400] text-[#0B0B0C] text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6">
          <span className="w-1.5 h-1.5 bg-[#0B0B0C]" />
          {tBadge}
        </div>

        {/* Mega headline */}
        <h1 className="text-[clamp(32px,5vw,58px)] font-black leading-[1.06] tracking-tight uppercase mb-5 md:mb-6">
          <span className="text-background-50">{tH1_1}</span>{' '}
          <span className="text-primary-500">{tH1_2}</span>{' '}
          <span className="text-background-50">{tH1_3}</span>
        </h1>

        <p className="text-background-50/55 text-sm md:text-base leading-relaxed max-w-[480px] mb-2 font-normal">
          {tSub}
        </p>
        <p className="text-background-50/20 text-[10px] uppercase tracking-[0.25em] font-black mb-6 md:mb-8">
          {tTagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Beratungsgespr%C3%A4ch`}
            className="inline-flex items-center gap-3 bg-primary-500 text-foreground-950 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-background-50 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer group"
          >
            <i className="ri-calendar-line text-base" />
            {tCtaPrimary}
            <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button
            onClick={onScrollToFeatures}
            className="inline-flex items-center gap-3 border border-background-50/12 text-background-50/55 px-8 py-4 font-bold text-xs hover:border-primary-500/50 hover:text-primary-500 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-play-circle-line text-base" />
            {tCtaSecondary}
          </button>
        </div>

        </div>

        {/* Section nav chips */}
        <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-8">
          <span className="text-[9px] font-black text-background-50/40 uppercase tracking-[0.2em] mr-1 hidden sm:inline">{tNavLabel}</span>
          {[
            { id: 'features', label: tChip1 },
            { id: 'funktionsumfang', label: tChip2 },
            { id: 'team-app', label: tChip3 },
            { id: 'branchen', label: tChip4 },
            { id: 'kundenstimmen', label: tChip5 },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => scrollTo(chip.id)}
              className="px-3 py-1.5 border border-background-50/20 bg-background-50/10 text-background-50/75 text-[10px] font-black hover:border-primary-500/60 hover:text-primary-500 hover:bg-primary-500/12 transition-all duration-200 cursor-pointer whitespace-nowrap uppercase tracking-wider"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}