import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const STATS = [
  { value: '3,7 Mio.', prefix: '>', label: 'Produkte verkauft', sublabel: 'Seit Gründung 2008', icon: 'ri-shopping-cart-2-line', sys: 'SALES.VOLUME', trend: '+18% YoY' },
  { value: '2 Mrd.', prefix: '>', label: 'Umsatz generiert', sublabel: 'In Euro', icon: 'ri-money-euro-circle-line', sys: 'REVENUE.TOTAL', trend: 'In EUR' },
  { value: '1,35 Mio.', prefix: '>', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', icon: 'ri-map-pin-2-line', sys: 'DEPLOYMENTS', trend: 'Seit 2008' },
  { value: '2.000', prefix: '>', label: 'Talente im Pool', sublabel: 'Festangestellt', icon: 'ri-team-line', sys: 'TALENT.POOL', trend: 'DACH-weit' },
];

export default function Proof() {
  const { images: woodIcons } = useMediaStore('srt_proof_wood_icons');
  const tBadge   = useText('srt_proof', 'srt-proof-badge',   'SRT in Zahlen');
  const tHeading = useText('srt_proof', 'srt-proof-heading', 'Die Bilanz spricht für sich.');
  const tSub     = useText('srt_proof', 'srt-proof-sub',     'Tatsächlich gemessene Ergebnisse aus über 15 Jahren Retail-Aktivierungen.');

  return (
    <section id="srt-proof" className="sonic-section-md px-4 md:px-6 bg-foreground-950">
      <div className="sonic-container">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="sonic-h2 text-white">{tHeading}</h2>
            <p className="text-sm text-white/45 leading-relaxed md:text-right md:max-w-sm md:ml-auto">{tSub}</p>
          </div>
        </div>

        {/* Telemetry grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {STATS.map((stat, i) => {
            const woodIcon = woodIcons[i]?.url ? resolveImageUrl(woodIcons[i].url) : null;
            return (
              <div key={stat.label}
                className={[
                  'relative p-6 md:p-8 text-center border-white/[0.08]',
                  i < 2 ? 'border-b lg:border-b-0' : '',            // 2×2 on mobile: divide rows
                  i % 2 === 0 ? 'border-r' : '',                    // divide columns in the 2×2 grid
                  i === 1 ? 'lg:border-r' : '',                     // 1×4 on desktop: divide all four
                ].join(' ')}>
                {/* Sys label */}
                <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: 'oklch(0.81 0.19 115 / 0.35)' }}>{stat.sys}</p>

                {/* Wood icon */}
                <div className="flex justify-center mb-5">
                  {woodIcon
                    ? <img src={woodIcon} alt="" aria-hidden="true" className="w-12 h-12 object-cover opacity-80" loading="lazy" />
                    : <div className="w-12 h-12 flex items-center justify-center" style={{ border: '1px solid oklch(0.81 0.19 115 / 0.25)', background: 'oklch(0.81 0.19 115 / 0.08)' }}>
                        <i className={`${stat.icon} text-xl text-primary-500/60`} />
                      </div>}
                </div>

                {/* Value */}
                <div className="font-black leading-none mb-2" style={{ fontSize: 'clamp(32px, 4vw, 44px)', letterSpacing: '-0.04em' }}>
                  <span className="text-primary-500">{stat.prefix}</span>
                  <span className="text-white">{stat.value}</span>
                </div>

                <p className="text-[12px] font-black text-white/60 mb-1">{stat.label}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">{stat.sublabel}</p>

                {/* Trend chip */}
                <div className="mt-4 inline-block text-[8px] font-bold px-2 py-0.5" style={{ background: 'oklch(0.81 0.19 115 / 0.10)', border: '1px solid oklch(0.81 0.19 115 / 0.20)', color: 'oklch(0.81 0.19 115)' }}>
                  {stat.trend}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
