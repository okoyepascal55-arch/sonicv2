import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const STATS = [
  { value: '>3,7 Mio.', label: 'Produkte verkauft', sublabel: 'Seit Gründung 2008', icon: 'ri-shopping-cart-2-line' },
  { value: '>2 Mrd.', label: 'Umsatz generiert', sublabel: 'In Euro', icon: 'ri-money-euro-circle-line' },
  { value: '>1,35 Mio.', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', icon: 'ri-map-pin-2-line' },
  { value: '>2000', label: 'Talente im Pool', sublabel: 'Festangestellt', icon: 'ri-team-line' },
];

export default function Proof() {
  const { images: woodIcons } = useMediaStore('srt_proof_wood_icons');
  const tBadge = useText('srt_proof', 'srt-proof-badge', 'SRT in Zahlen');
  const tHeading = useText('srt_proof', 'srt-proof-heading', 'Die Bilanz spricht für sich.');
  const tSub = useText('srt_proof', 'srt-proof-sub', 'Tatsächlich gemessene Ergebnisse aus über 15 Jahren Retail-Aktivierungen.');

  return (
    <section id="srt-proof" className="sonic-section-md px-4 md:px-6 bg-white">
      <div className="sonic-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span></div>
            <h2 className="sonic-h2 text-foreground-950 uppercase">{tHeading}</h2>
          </div>
          <p className="text-xs text-foreground-950/40 max-w-[260px] md:text-right leading-relaxed">{tSub}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-foreground-950/[0.08]">
          {STATS.map((stat, i) => {
            const woodIcon = woodIcons[i]?.url ? resolveImageUrl(woodIcons[i].url) : null;
            return (
              <div key={stat.label} className={`p-7 text-center ${i < STATS.length - 1 ? 'border-r border-foreground-950/[0.08]' : ''} ${i === 1 ? 'max-lg:border-r-0' : ''} ${i < 2 ? 'max-lg:border-b border-foreground-950/[0.08]' : ''}`}>
                <div className="flex justify-center mb-3">
                  {woodIcon
                    ? <img src={woodIcon} alt="" aria-hidden="true" className="w-10 h-10 object-cover" loading="lazy" />
                    : <i className={`${stat.icon} text-2xl text-primary-500/40`} />}
                </div>
                <div className="text-[30px] md:text-[34px] font-black text-foreground-950 leading-none"><span className="text-primary-500">&gt;</span>{stat.value.slice(1)}</div>
                <p className="mt-1 text-xs font-black text-foreground-950">{stat.label}</p>
                <p className="mt-0.5 text-[9px] font-bold uppercase text-foreground-950/35">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
