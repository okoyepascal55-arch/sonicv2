import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';

const TEAM_STATS = [
  { value: '5,15', unit: 'Jahre', label: 'Ø Betriebszugehörigkeit' },
  { value: 'Dual', unit: 'Studium', label: 'Ausbildungspartner' },
  { value: 'B2B + D2C', unit: '', label: 'Kunden- & Agenturseite' },
];

export default function LeadershipTeam() {
  const tBadge = useText('about_leadership', 'about-leadership-badge', 'Das Team');
  const tHeading = useText('about_leadership', 'about-leadership-heading', 'Fachliche und menschliche Vielfalt.');
  const tSub = useText('about_leadership', 'about-leadership-sub', 'Bei Sonic treffen Expertisen aufeinander, die sich perfekt ergänzen.');
  const tCta = useText('about_leadership', 'about-leadership-cta', 'Offene Stellen');

  const { images } = useMediaStore('/images/Über uns/Über uns/3. Das Sonic Team');
  const teamPhoto = images[0]?.url || '/images/Über uns/Über uns/3. Das Sonic Team/Gruppenfoto-00336 Kopie.webp';

  const words = tHeading.trim().split(/\s+/);
  const headingMain = words.length > 1 ? words.slice(0, -1).join(' ') : tHeading;
  const headingAccent = words.length > 1 ? words[words.length - 1] : '';

  return (
    <section className="bg-white md:overflow-hidden py-14 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* ── HEADER ── */}
        <div className="max-w-[640px] mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
          </div>
          <h2 className="sonic-h2 text-foreground-950">
            {headingMain}{' '}
            <span className="v3-marker">{headingAccent}</span>
          </h2>
          <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[520px]">{tSub}</p>
        </div>

        {/* ── BOLD SPLIT: TEAM PHOTO + DARK STAT PANEL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-0 bg-white border border-[#E7E4D4] overflow-hidden">
          {/* Team group photo — aspect-ratio drives height, not a fixed min-h */}
          <div className="relative overflow-hidden bg-foreground-950" style={{ minHeight: '280px' }}>
            <img
              src={teamPhoto}
              alt="Das Sonic Team — vielfältige Fachkräfte aus unterschiedlichen Branchen"
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/80 via-[#0B0B0C]/5 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">
              Das Sonic Team
            </div>
          </div>

          {/* Dark ink panel */}
          <div className="bg-foreground-950 p-8 md:p-12 flex flex-col justify-between">
            {/* All 3 stats, always visible — stacked list, per brief */}
            <div className="grid grid-cols-1" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {TEAM_STATS.map((stat, i) => (
                <div key={i} className="py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <p className="text-3xl md:text-4xl font-black text-white leading-none mb-1.5" style={{ letterSpacing: '-0.035em' }}>
                    {stat.value}
                    {stat.unit && <span className="text-base md:text-lg text-primary-500 ml-2 font-black">{stat.unit}</span>}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Description — original Vielfalt copy */}
            <div className="pt-5 mt-6">
              <p className="text-white/55 text-[13px] leading-relaxed">
                Vielfalt zeichnet uns aus: Ex-Europa-CMOs, Field-Force-Projektmanager, Kreative, Telco-Experten, Programmierer, Digitalprofis, Eventprofis, Messebauer und Logistikprofis. Wir verstehen deine Herausforderungen, weil wir sie aus Kunden- und Agenturseite kennen.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-5 mt-2">
              <a
                href="/karriere"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.06em] hover:bg-white transition-colors whitespace-nowrap"
              >
                {tCta}
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}