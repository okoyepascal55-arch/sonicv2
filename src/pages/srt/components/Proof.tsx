import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { WoodIcon, WindowBar, ProductGrid, Mono } from './SrtKit';

const STATS = [
  { value: '1.000', prefix: '>', label: 'Stores betreut', sublabel: 'In Sonic-Projekten', icon: 'ri-store-2-line', sys: 'Stores', trend: 'Im Handel' },
  { value: '2 Mrd.', prefix: '>', label: 'Umsatz generiert', sublabel: 'In Euro', icon: 'ri-money-euro-circle-line', sys: 'Umsatz', trend: 'Für unsere Kunden' },
  { value: '1,3 Mio.', prefix: '>', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', icon: 'ri-map-pin-2-line', sys: 'Einsätze', trend: 'Im SRT' },
  { value: '1.800', prefix: '>', label: 'Menschen im Talentpool', sublabel: 'Aktiv', icon: 'ri-team-line', sys: 'Talentpool', trend: 'DACH-weit' },
];

export default function Proof() {
  const { images: woodIcons } = useMediaStore('srt_proof_wood_icons');
  const tBadge   = useText('srt_proof', 'srt-proof-badge',   'SRT in Zahlen');
  const tHeading = useText('srt_proof', 'srt-proof-heading', 'Die Bilanz spricht für sich.');
  // Dashboard → Text → SRT → „SRT — In Zahlen: Kennzahlen“
  const pt = useReviewText('srt_proof_stats');
  // Dashboard → Text → SRT → „SRT — Kurzlabels (Problem & Zahlen)“
  const lb = useReviewText('srt_short_labels');
  const stats = STATS.map((st, i) => ({
    ...st,
    value: pt[`s${i + 1}-value`] ?? st.value,
    label: pt[`s${i + 1}-label`] ?? st.label,
    sublabel: pt[`s${i + 1}-sublabel`] ?? st.sublabel,
    trend: pt[`s${i + 1}-trend`] ?? st.trend,
    sys: lb[`proof-${i + 1}`] || st.sys,
  }));
  const tSub     = useText('srt_proof', 'srt-proof-sub',     'Kennzahlen aus unseren Projekten – im Handel erreicht, im SRT erfasst.');

  return (
    <section id="srt-proof" className="sonic-section-md px-4 md:px-6 bg-foreground-950 relative overflow-hidden">
      <ProductGrid />
      <div className="sonic-container relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="sonic-h2 text-white">{tHeading}</h2>
            <p className="text-[15px] text-white/60 leading-relaxed md:text-right md:max-w-sm md:ml-auto">{tSub}</p>
          </div>
        </div>

        {/* KPI widgets (22.10.2026): each figure as a dashboard tile — same figures and labels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => {
            const woodIcon = woodIcons[i]?.url ? resolveImageUrl(woodIcons[i].url) : null;
            return (
              <div key={i} className="group flex flex-col" style={{ background: 'oklch(0.155 0.006 118)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <WindowBar title={stat.sys} />
                <div className="flex flex-col flex-1 p-6 md:p-7">
                  <div className="flex items-start justify-between mb-6">
                    {woodIcon
                      ? <WoodIcon src={woodIcon} alt="" size={52} delay={i * 140} />
                      : <span className="w-[52px] h-[52px] flex items-center justify-center" style={{ border: '1px solid oklch(0.81 0.19 115 / 0.25)', background: 'oklch(0.81 0.19 115 / 0.08)' }}><i className={`${stat.icon} text-xl text-primary-500`} aria-hidden="true" /></span>}
                    <Mono dim>KPI 0{i + 1}</Mono>
                  </div>
                  <div className="font-black leading-none mb-3 whitespace-nowrap" style={{ fontSize: 'clamp(30px, 2.9vw, 44px)', letterSpacing: '-0.04em' }}>
                    <span className="text-primary-500">{stat.prefix}</span>
                    <span className="text-white">{stat.value}</span>
                  </div>
                  <p className="text-[14px] font-black text-white/80 mb-1">{stat.label}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex-1">{stat.sublabel}</p>
                  <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <Mono>{stat.trend}</Mono>
                    <i className="ri-arrow-right-up-line text-primary-500" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
