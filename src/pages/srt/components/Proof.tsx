import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { SrtHeader, HAIR, MUTED } from './SrtKit';

const STATS = [
  { value: '1.000', prefix: '>', label: 'Stores betreut', sublabel: 'In Sonic-Projekten', icon: 'ri-store-2-line', sys: 'Stores', trend: 'Im Handel' },
  { value: '2 Mrd.', prefix: '>', label: 'Umsatz generiert', sublabel: 'In Euro', icon: 'ri-money-euro-circle-line', sys: 'Umsatz', trend: 'Für unsere Kunden' },
  { value: '1,3 Mio.', prefix: '>', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', icon: 'ri-map-pin-2-line', sys: 'Einsätze', trend: 'Im SRT' },
  { value: '1.800', prefix: '>', label: 'Menschen im Talentpool', sublabel: 'Aktiv', icon: 'ri-team-line', sys: 'Talentpool', trend: 'DACH-weit' },
];

export default function Proof() {
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

  // Super minimal (22.10.2026): four figures in one row, one small label each, hairlines — nothing else
  return (
    <section id="srt-proof" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="sonic-container">
        <SrtHeader eyebrow={tBadge} title={tHeading} side={<p className="md:text-right md:max-w-sm md:ml-auto">{tSub}</p>} />
        <dl className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${HAIR}` }}>
          {stats.map((stat, i) => (
            <div key={i} className={`pt-8 ${i % 2 === 1 ? 'pl-6 border-l' : 'pr-6'} ${i >= 2 ? 'mt-8 lg:mt-0' : ''} lg:px-10 ${i === 0 ? 'lg:pl-0' : 'lg:border-l'} ${i === 3 ? 'lg:pr-0' : ''}`} style={{ borderColor: HAIR }}>
              <dd className="font-black text-foreground-950 leading-none whitespace-nowrap" style={{ fontSize: 'clamp(27px, 4vw, 56px)', letterSpacing: '-0.045em' }}>
                {stat.prefix}{stat.value}
              </dd>
              <dt className="mt-3 text-[14px]" style={{ color: MUTED }}>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
