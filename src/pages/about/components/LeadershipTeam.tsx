import { useEffect, useState } from 'react';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';

const TEAM_STATS = [
  { value: '5,15', unit: 'Jahre', label: 'Ø Betriebszugehörigkeit' },
  { value: 'Dual', unit: 'Studium', label: 'Ausbildungspartner' },
  { value: 'B2B + D2C', unit: '', label: 'Kunden- & Agenturseite' },
];

export default function LeadershipTeam() {
  const tBadge = useText('about_leadership', 'about-leadership-badge', 'Das Team');
  const tHeading = useText('about_leadership', 'about-leadership-heading', 'FACHLICHE UND MENSCHLICHE VIELFALT.');
  const tSub = useText('about_leadership', 'about-leadership-sub', 'Bei Sonic treffen Expertisen aufeinander, die sich perfekt ergänzen.');
  const tCta = useText('about_leadership', 'about-leadership-cta', 'Offene Stellen');

  const { images } = useMediaStore('/images/Über uns/Über uns/3. Das Sonic Team');
  const teamPhoto = images[0]?.url || '/images/Über uns/Über uns/3. Das Sonic Team/Gruppenfoto-00336 Kopie.webp';

  const [activeStatIndex, setActiveStatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % TEAM_STATS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const words = tHeading.trim().split(/\s+/);
  const headingMain = words.length > 1 ? words.slice(0, -1).join(' ') : tHeading;
  const headingAccent = words.length > 1 ? words[words.length - 1] : '';

  return (
    <section className="bg-white py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* ── HEADER ── */}
        <div className="max-w-[640px] mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-[0.06em] px-3.5 py-[7px] mb-5">
            <span className="w-1.5 h-1.5 bg-foreground-950 flex-shrink-0" />
            {tBadge}
          </div>
          <h2 className="sonic-h2 text-foreground-950">
            {headingMain}{' '}
            <span className="text-primary-500">{headingAccent}</span>
          </h2>
          <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[520px]">{tSub}</p>
        </div>

        {/* ── BOLD SPLIT: TEAM PHOTO + DARK STAT PANEL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-0 bg-white border border-[#E7E4D4] overflow-hidden">
          {/* Team group photo */}
          <div className="relative overflow-hidden min-h-[240px] sm:min-h-[360px] lg:min-h-[580px] bg-foreground-950">
            <img
              src={teamPhoto}
              alt="Das Sonic Team — vielfältige Fachkräfte aus unterschiedlichen Branchen"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/80 via-[#0B0B0C]/5 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">
              Das Sonic Team
            </div>
          </div>

          {/* Dark ink panel */}
          <div className="bg-foreground-950 p-8 md:p-12 flex flex-col justify-between">
            {/* Rotating stat */}
            <div className="flex-1 flex flex-col justify-center">
              <div key={activeStatIndex} className="animate-fadeSlideIn">
                <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                  {String(activeStatIndex + 1).padStart(2, '0')} / {String(TEAM_STATS.length).padStart(2, '0')}
                </div>
                <div className="text-4xl md:text-5xl font-black text-white leading-none">
                  {TEAM_STATS[activeStatIndex].value}
                  {TEAM_STATS[activeStatIndex].unit && (
                    <span className="text-lg md:text-xl text-primary-500 ml-2 font-black">{TEAM_STATS[activeStatIndex].unit}</span>
                  )}
                </div>
                <div className="text-[11px] text-white/40 font-bold uppercase tracking-wider mt-3">
                  {TEAM_STATS[activeStatIndex].label}
                </div>
              </div>

              {/* Stat dots */}
              <div className="flex gap-2 mt-7">
                {TEAM_STATS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStatIndex(i)}
                    aria-label={`Statistik ${i + 1} von ${TEAM_STATS.length}`}
                    aria-pressed={activeStatIndex === i}
                    className={`transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] ${
                      activeStatIndex === i ? 'w-7 h-1.5 bg-primary-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description — original Vielfalt copy */}
            <div className="border-t border-white/10 pt-5 mt-6">
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