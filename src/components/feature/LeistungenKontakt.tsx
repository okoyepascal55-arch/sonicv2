import { openCalendly } from '@/components/feature/CalendlyWidget';
import { useCtaText } from '@/hooks/useCtaText';

interface CheckItem {
  text: string;
}

interface LeistungenKontaktProps {
  headline: string;
  headlineAccent: string;
  subline?: string;
  /** @deprecated no longer rendered (CTA review 30.09.2026) */
  checkItems?: CheckItem[];
  ctaLabel: string;
  ctaMailSubject: string;
  ctaIcon?: string;
}

export default function LeistungenKontakt({
  headline,
  headlineAccent,
  subline,
  ctaLabel,
  ctaMailSubject,
  ctaIcon = 'ri-calendar-line',
}: LeistungenKontaktProps) {
  const cta = useCtaText();
  return (
    <>
      <section id="kontakt" className="bg-white py-10 md:py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border border-foreground-950/[0.1] bg-white p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-3xl pointer-events-none translate-x-16 -translate-y-16" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C8D400]/60 via-[#C8D400]/20 to-transparent" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="sonic-h2 text-foreground-950 mb-4">
                  {headline}<br />
                  <span className="text-primary-500">{headlineAccent}</span>
                </h2>

                {subline && <p className="text-foreground-950/55 text-base leading-relaxed">{subline}</p>}

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
                <p className="text-foreground-950/40 text-xs mt-3 font-semibold">{cta.microline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Messen uses the six-column desktop solution strip in the approved DC.
          Mobile retains the existing responsive stack/scroll behavior. */}
      <style>{`
        @media (min-width: 1024px) {
          section#loesung:has(p[class*="text-foreground-950/45"]) .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </>
  );
}
