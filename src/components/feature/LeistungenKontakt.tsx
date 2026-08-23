import { openCalendly } from '@/components/feature/CalendlyWidget';

interface CheckItem {
  text: string;
}

interface LeistungenKontaktProps {
  headline: string;
  headlineAccent: string;
  subline?: string;
  checkItems?: CheckItem[];
  ctaLabel: string;
  ctaMailSubject: string;
  ctaIcon?: string;
}

export default function LeistungenKontakt({
  headline,
  headlineAccent,
  subline,
  checkItems,
  ctaLabel,
  ctaMailSubject,
  ctaIcon = 'ri-calendar-line',
}: LeistungenKontaktProps) {
  return (
    <section id="kontakt" className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="border border-foreground-950/[0.1] bg-white p-10 md:p-14 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-3xl pointer-events-none translate-x-16 -translate-y-16" />
          {/* Accent line top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C8D400]/60 via-[#C8D400]/20 to-transparent" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-foreground-950/12 px-3 py-1 mb-5">
                <i className="ri-calendar-check-line text-foreground-950/50 text-xs"></i>
                <span className="text-xs font-black text-foreground-950/50 uppercase tracking-widest">Jetzt starten</span>
              </div>

              <h2 className="sonic-h2 text-foreground-950 mb-4">
                {headline}<br />
                <span className="text-primary-500">{headlineAccent}</span>
              </h2>

              {subline && (
                <p className="text-foreground-950/55 text-base mb-6 leading-relaxed">{subline}</p>
              )}

              {checkItems && checkItems.length > 0 && (
                <div className="space-y-3">
                  {checkItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center bg-primary-500 flex-shrink-0">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                      <span className="text-foreground-950/70 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center md:text-right">
              <button
                type="button"
                onClick={() => openCalendly()}
                className="inline-flex items-center gap-3 bg-foreground-950 text-white px-10 py-5 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm rounded-none"
              >
                <i className={`${ctaIcon} text-base`}></i>
                {ctaLabel}
              </button>
              <p className="text-foreground-950/30 text-xs mt-3 font-semibold">
                Kostenfreies 30-Min-Gespräch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
