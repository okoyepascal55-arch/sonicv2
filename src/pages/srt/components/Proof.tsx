import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const STATS = [
  { value: '>3,7 Mio.', label: 'Produkte verkauft', sublabel: 'Seit Gründung 2008', icon: 'ri-shopping-cart-2-line', sys: 'SALES.VOLUME' },
  { value: '>2 Mrd.', label: 'Umsatz generiert', sublabel: 'In Euro', icon: 'ri-money-euro-circle-line', sys: 'REVENUE.TOTAL' },
  { value: '>1,35 Mio.', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', icon: 'ri-map-pin-2-line', sys: 'DEPLOYMENTS' },
  { value: '>2000', label: 'Talente im Pool', sublabel: 'Festangestellt', icon: 'ri-team-line', sys: 'TALENT.POOL' },
];

export default function Proof() {
  const { images: woodIcons } = useMediaStore('srt_proof_wood_icons');
  const tBadge   = useText('srt_proof', 'srt-proof-badge',   'SRT in Zahlen');
  const tHeading = useText('srt_proof', 'srt-proof-heading', 'Die Bilanz spricht für sich.');
  const tSub     = useText('srt_proof', 'srt-proof-sub',     'Tatsächlich gemessene Ergebnisse aus über 15 Jahren Retail-Aktivierungen.');

  return (
    <section id="srt-proof" className="relative overflow-hidden bg-foreground-950" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      {/* Subtle data grid */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(oklch(0.81 0.19 115) 1px, transparent 1px), linear-gradient(90deg, oklch(0.81 0.19 115) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true" />

      {/* Lime left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary-500/30" aria-hidden="true" />

      <div className="sonic-container relative z-10 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-background-50 uppercase">{tHeading}</h2>
          </div>
          <p className="text-xs text-white/30 max-w-[240px] leading-relaxed md:text-right">{tSub}</p>
        </div>

        {/* Stats — telemetry grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {STATS.map((stat, i) => {
            const woodIcon = woodIcons[i]?.url ? resolveImageUrl(woodIcons[i].url) : null;
            return (
              <div key={stat.label}
                className="relative p-7 md:p-8 text-center group transition-all duration-300 hover:bg-white/[0.025]"
                style={{
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : undefined,
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : undefined,
                }}>
                {/* Top lime indicator — appears on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* System label */}
                <p className="text-[8px] font-black uppercase tracking-[0.25em] text-primary-500/40 mb-4">{stat.sys}</p>

                {/* Wood icon */}
                <div className="flex justify-center mb-4">
                  {woodIcon
                    ? <img src={woodIcon} alt="" aria-hidden="true" className="w-10 h-10 object-cover" loading="lazy" />
                    : <i className={`${stat.icon} text-2xl text-primary-500/30`} />}
                </div>

                {/* Big number — the telemetric focus */}
                <div className="font-black leading-none mb-2" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', letterSpacing: '-0.04em' }}>
                  <span className="text-primary-500">&gt;</span>
                  <span className="text-background-50">{stat.value.slice(1)}</span>
                </div>

                <p className="text-[12px] font-black text-white/70 mb-1">{stat.label}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/25">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
