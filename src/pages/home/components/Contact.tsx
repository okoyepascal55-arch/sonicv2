import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const handleNav = (path: string) => navigate(path);

  return (
    <section className="py-12 md:py-14 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Subtle texture lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 64px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-px bg-foreground-200">

          {/* ── Box 1: ÜBER DIE SONIC GROUP — BLACK ──────────────────────── */}
          <div className="group bg-foreground-950 px-6 sm:px-9 md:px-12 py-9 md:py-11 flex flex-col justify-between transition-all duration-500 hover:bg-[#161600] relative overflow-hidden">
            {/* Glow orb */}
            <div
              className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/6 rounded-full blur-[90px] pointer-events-none"
              aria-hidden="true"
            />
            {/* Top lime bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8D400] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />
            {/* Left accent */}
            <div
              className="absolute top-0 left-0 bottom-0 w-[3px]"
              style={{ background: 'linear-gradient(180deg, #C8D400 0%, rgba(200,212,0,0.2) 100%)' }}
              aria-hidden="true"
            />

            <div>
              {/* Eyebrow */}
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-500 mb-4">
                Was uns antreibt
              </p>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white leading-[1.05] mb-2 relative inline-block">
                ÜBER DIE
                <br />
                SONIC GROUP
                <span
                  className="absolute left-0 bottom-[-4px] h-[5px] w-full"
                  style={{ background: 'linear-gradient(90deg, #C8D400 0%, rgba(200,212,0,0.3) 100%)' }}
                  aria-hidden="true"
                />
              </h2>

              {/* Divider */}
              <div className="mt-5 mb-5 h-px bg-white/10" aria-hidden="true" />

              {/* Body */}
              <p className="text-sm text-foreground-400 leading-relaxed max-w-xl">
                Als Sales- und Marketing-Agentur mit Schwerpunkten rund um Personalprojekte
                sowie mit eigener Software verbinden wir Kreativität mit Performance, Daten mit
                Menschen und Marken mit Konsumenten. Für deinen messbaren Markenerfolg.
              </p>

              {/* Tags — single inline line */}
              <p className="text-[13px] font-bold text-white/60 mt-5">
                #Doing new things
                <span className="mx-2 text-primary-500/40" aria-hidden="true">·</span>
                #Doing things better
                <span className="mx-2 text-primary-500/40" aria-hidden="true">·</span>
                #Doing things
              </p>

              {/* ── DarumSonic integration: Daten Liefern Fakten (single row) ── */}
              <div className="mt-5 pt-5 border-t border-white/8">
                <div className="flex items-baseline gap-x-3 gap-y-1.5 flex-wrap">
                  <span
                    className="text-[20px] font-black leading-none flex-shrink-0"
                    style={{ color: 'rgba(200,212,0,0.12)' }}
                    aria-hidden="true"
                  >
                    01
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary-500 whitespace-nowrap">
                    Daten Liefern Fakten
                  </p>
                  <p className="text-sm font-black text-white whitespace-nowrap">
                    Datenbasierte Vorhersagen
                  </p>
                  <span className="text-xs text-foreground-500 leading-relaxed">
                    — Absatzprognosen auf Basis echter Marktdaten, Sell-out-Historien und
                    KI-Modellen, angedockt an deine Software.
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {['Forecasting', 'Marktdaten', 'Performance'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold text-primary-500/40 border border-primary-500/15 px-2 py-0.5 transition-all duration-300 group-hover:text-primary-500/70 group-hover:border-primary-500/35"
                        style={{ borderRadius: 0 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={() => handleNav('/ueber-uns')}
                className="inline-flex items-center gap-3 border-2 border-primary-500 text-primary-500 px-7 py-3 font-black text-[13px] uppercase tracking-wider hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:scale-95"
                style={{ borderRadius: 0 }}
              >
                Mehr über Sonic
                <i className="ri-arrow-right-line text-base" />
              </button>
            </div>
          </div>

          {/* ── Box 2: KARRIERE — WHITE ───────────────────────────────────── */}
          <div className="group bg-white px-6 sm:px-9 md:px-12 py-9 md:py-11 flex flex-col justify-between transition-all duration-500 hover:bg-[#FAFDF5] relative overflow-hidden">
            {/* Top lime bar on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8D400] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />
            {/* Right accent */}
            <div
              className="absolute top-0 right-0 bottom-0 w-[3px]"
              style={{ background: 'linear-gradient(180deg, #C8D400 0%, rgba(200,212,0,0.2) 100%)' }}
              aria-hidden="true"
            />

            <div>
              {/* Eyebrow */}
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-500 mb-4">
                Menschen mit Energie gesucht
              </p>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-foreground-950 leading-[1.05] mb-2 relative inline-block">
                KARRIERE
                <span
                  className="absolute left-0 bottom-[-4px] h-[5px] w-full"
                  style={{ background: 'linear-gradient(90deg, #C8D400 0%, rgba(200,212,0,0.3) 100%)' }}
                  aria-hidden="true"
                />
              </h2>

              {/* Divider */}
              <div className="mt-5 mb-5 h-px bg-foreground-100" aria-hidden="true" />

              {/* Body */}
              <p className="text-sm text-foreground-600 leading-relaxed max-w-xl">
                Zeige was du kannst, und freue dich auf gemeinsame Erfolge. Wichtig ist für uns
                deine Einstellung zum Job und was du erreichen willst – nicht nur das, was du
                schon erreicht hast.
              </p>

              {/* Feature pills */}
              <div className="flex flex-col gap-2.5 mt-5">
                {[
                  { icon: 'ri-star-line', text: 'Work with world-class brands' },
                  { icon: 'ri-rocket-2-line', text: 'Attitude over credentials' },
                  { icon: 'ri-team-line', text: 'Ein Team, das wie Familie ist' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <i className={`${item.icon} text-base`} />
                    </div>
                    <span className="text-sm text-foreground-500">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* ── DarumSonic integration: Mensch. Der Unterschied. (single row) ── */}
              <div className="mt-5 pt-5 border-t border-foreground-100">
                <div className="flex items-baseline gap-x-3 gap-y-1.5 flex-wrap">
                  <span
                    className="text-[20px] font-black leading-none flex-shrink-0 transition-colors duration-500"
                    style={{ color: 'rgba(200,212,0,0.18)' }}
                    aria-hidden="true"
                  >
                    02
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary-500 whitespace-nowrap">
                    Mensch. Der Unterschied.
                  </p>
                  <p className="text-sm font-black text-foreground-950 whitespace-nowrap">
                    2.000 Talente im Pool
                  </p>
                  <span className="text-xs text-foreground-400 leading-relaxed">
                    — Festangestellt, leidenschaftlich und mit Live-Einblick in die
                    Zielerreichung, deine Marke in besten Händen.
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {['Festangestellt', 'Live-Einblick', 'Motivation'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-bold text-primary-500/60 border border-primary-500/20 px-2 py-0.5 transition-all duration-300 group-hover:text-primary-500 group-hover:border-primary-500/40"
                        style={{ borderRadius: 0 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={() => handleNav('/karriere')}
                className="inline-flex items-center gap-3 bg-primary-500 text-white px-7 py-3 font-black text-[13px] uppercase tracking-wider hover:bg-foreground-950 hover:text-primary-500 transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                style={{ borderRadius: 0 }}
              >
                Mehr dazu
                <i className="ri-arrow-right-line text-base" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}