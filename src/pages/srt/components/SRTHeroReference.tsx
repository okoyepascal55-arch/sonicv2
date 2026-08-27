import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

export default function SRTHeroReference() {
  const badge = useText('srt_hero', 'srt-hero-badge', 'Sonic-eigene Software');
  const h1_1 = useText('srt_hero', 'srt-hero-h1-1', 'SONIC');
  const h1_2 = useText('srt_hero', 'srt-hero-h1-2', 'REPORTING');
  const h1_3 = useText('srt_hero', 'srt-hero-h1-3', 'TOOL.');
  const sub = useText('srt_hero', 'srt-hero-sub', 'Echtzeit-Dashboards, GPS-Tracking, Forecasting und Live-KPIs für Field Force und Retail Activation.');
  const tagline = useText('srt_hero', 'srt-hero-tagline', 'Field-Force-ERP-System · Seit 2008 · Seit 2024 mit KI');
  const primary = useText('srt_hero', 'srt-hero-cta-primary', 'Beratungsgespräch buchen');
  const secondary = useText('srt_hero', 'srt-hero-cta-secondary', 'Features entdecken');
  const navLabel = useText('srt_hero', 'srt-hero-nav-label', 'Direkt zu:');
  const chips = [
    useText('srt_hero', 'srt-hero-chip-1', 'All-in-Software'),
    useText('srt_hero', 'srt-hero-chip-2', 'Funktionsumfang'),
    useText('srt_hero', 'srt-hero-chip-3', 'Team-App'),
    useText('srt_hero', 'srt-hero-chip-4', 'Branchen'),
    useText('srt_hero', 'srt-hero-chip-5', 'Kundenstimmen'),
  ];
  const ids = ['features', 'funktionsumfang', 'team-app', 'branchen', 'kundenstimmen'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-foreground-950" style={{ padding: '130px 40px 60px' }}>
      <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none" style={{ background: 'linear-gradient(135deg, transparent 25%, oklch(0.81 0.19 115 / 0.06) 100%)', clipPath: 'polygon(15% 0,100% 0,100% 100%,0% 100%)' }} />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-500 via-primary-500/60 to-transparent" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="max-w-[680px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-500/[0.18] border border-primary-500/[0.35] mb-6">
            <span className="w-1.5 h-1.5 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-500">{badge}</span>
          </div>
          <h1 className="mb-6 font-black uppercase leading-[0.92] tracking-[-0.03em] text-[clamp(54px,6.4vw,92px)]">
            <span className="text-white">{h1_1}</span>{' '}<span className="text-primary-500">{h1_2}</span>{' '}<span className="text-white">{h1_3}</span>
          </h1>
          <p className="text-white/55 text-[15px] leading-[1.7] max-w-[480px] mb-2">{sub}</p>
          <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.25em] mb-8">{tagline}</p>
          <div className="flex flex-wrap gap-3.5 mb-8">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary-500 text-foreground-950 text-xs font-black uppercase cursor-pointer hover:bg-white transition-colors"><i className="ri-calendar-line" />{primary}<i className="ri-arrow-right-line" /></a>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`} className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/12 text-white/60 text-xs font-bold cursor-pointer hover:border-primary-500/60 hover:text-primary-500 transition-colors"><i className="ri-play-circle-line" />{secondary}</a>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mr-1">{navLabel}</span>
            {chips.map((label, i) => <button key={label} type="button" onClick={() => scrollTo(ids[i])} className="px-3 py-1.5 border border-white/20 bg-white/10 text-white/75 text-[11px] font-black uppercase cursor-pointer hover:border-primary-500/60 hover:text-primary-500 transition-colors">{label}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
