import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

export default function SRTHeroReference() {
  // Dashboard-controlled hero image
  const { images: heroImages } = useMediaStore('srt_hero_images');
  const heroImageUrl = heroImages[0]?.url
    ? resolveImageUrl(heroImages[0].url)
    : 'https://readdy.ai/api/search-image?query=professional%20field%20force%20retail%20team%20meeting%20enterprise%20workspace%20modern%20office%20dark%20atmosphere%20screens%20dashboards%20data%20analytics%20lime%20green%20accent%20lighting%20premium%20corporate%20photography%20wide%20angle%20dramatic&width=1920&height=1080&seq=srt-hero-bg-01&orientation=landscape';

  const badge     = useText('srt_hero', 'srt-hero-badge',        'Sonic-eigene Software');
  const h1_1      = useText('srt_hero', 'srt-hero-h1-1',         'SONIC');
  const h1_2      = useText('srt_hero', 'srt-hero-h1-2',         'REPORTING');
  const h1_3      = useText('srt_hero', 'srt-hero-h1-3',         'TOOL.');
  const sub       = useText('srt_hero', 'srt-hero-sub',          'Echtzeit-Dashboards, GPS-Tracking, Forecasting und Live-KPIs für Field Force und Retail Activation.');
  const tagline   = useText('srt_hero', 'srt-hero-tagline',      'Field-Force-ERP-System · Seit 2008 · Seit 2024 mit KI');
  const primary   = useText('srt_hero', 'srt-hero-cta-primary',  'Beratungsgespräch buchen');
  const secondary = useText('srt_hero', 'srt-hero-cta-secondary','Features entdecken');
  const navLabel  = useText('srt_hero', 'srt-hero-nav-label',    'Direkt zu:');
  const chips = [
    useText('srt_hero', 'srt-hero-chip-1', 'All-in-Software'),
    useText('srt_hero', 'srt-hero-chip-2', 'Funktionsumfang'),
    useText('srt_hero', 'srt-hero-chip-3', 'Team-App'),
    useText('srt_hero', 'srt-hero-chip-4', 'Branchen'),
    useText('srt_hero', 'srt-hero-chip-5', 'Kundenstimmen'),
  ];
  const ids = ['features', 'funktionsumfang', 'team-app', 'branchen', 'srt-proof'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden bg-foreground-950"
      style={{ paddingTop: 'clamp(56px, 14vw, 80px)' }}
    >
      {/* Dashboard-controlled background image */}
      <img
        src={heroImageUrl}
        alt="SRT — Sonic Reporting Tool"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />

      {/* Dark veil — bottom-heavy, same as Leistungen reference */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(11,11,12,0.45) 0%, rgba(11,11,12,0.30) 40%, rgba(11,11,12,0.92) 100%)' }}
        aria-hidden="true"
      />

      {/* Lime 3px top accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-500 via-primary-500/60 to-transparent z-20" />

      {/* Content — bottom-anchored */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 pb-10 md:pb-14">
        <div className="max-w-[640px]">
          {/* Eyebrow — lime dash + label, matches site standard */}
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{badge}</span>
          </div>

          {/* H1 */}
          <h1 className="sonic-h1 mb-5 uppercase">
            <span className="text-white">{h1_1}</span>{' '}
            <span className="text-primary-500">{h1_2}</span>{' '}
            <span className="text-white">{h1_3}</span>
          </h1>

          <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-[480px] mb-2">{sub}</p>
          <p className="text-white/25 text-[11px] font-black uppercase tracking-[0.25em] mb-8">{tagline}</p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary-500 text-foreground-950 text-xs font-black uppercase cursor-pointer hover:bg-white transition-colors"
            >
              <i className="ri-calendar-line" />{primary}<i className="ri-arrow-right-line" />
            </a>
            <button
              type="button"
              onClick={() => scrollTo('features')}
              className="inline-flex items-center gap-2.5 px-5 py-3 border border-white/20 text-white/65 text-xs font-bold cursor-pointer hover:border-primary-500/50 hover:text-primary-500 transition-colors"
            >
              <i className="ri-apps-line" />{secondary}<i className="ri-arrow-down-line" />
            </button>
          </div>

          {/* Quick-nav chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/35 mr-1">{navLabel}</span>
            {chips.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollTo(ids[i])}
                className="px-3 py-1.5 border border-white/15 bg-white/8 text-white/65 text-[11px] font-black uppercase cursor-pointer hover:border-primary-500/50 hover:text-primary-500 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
