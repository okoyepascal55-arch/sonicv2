import { openCalendly } from '@/components/feature/CalendlyWidget';
import { useCtaText } from '@/hooks/useCtaText';

interface RatgeberCTAProps {
  headline: string;
  headlineAccent: string;
  subline: string;
}

export default function RatgeberCTA({ headline, headlineAccent, subline }: RatgeberCTAProps) {
  // Button + micro-line: Dashboard → CTAs — Button-Texte
  const cta = useCtaText();
  return (
    <section className="sonic-section-lg bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="border border-foreground-950/15 bg-white p-10 md:p-14 relative overflow-hidden" style={{ borderRadius: 0 }}>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="sonic-h2 text-foreground-950 mb-4">
                {headline}<br />
                <span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{headlineAccent}</span>
              </h2>

              <p className="text-foreground-950/55 text-base leading-relaxed">{subline}</p>
            </div>

            <div className="text-center md:text-right">
              <button
                type="button"
                onClick={() => openCalendly()}
                className="inline-flex items-center gap-3 bg-foreground-950 text-white px-10 py-5 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm uppercase tracking-wider"
                style={{ borderRadius: 0 }}
              >
                <i className="ri-calendar-line text-base"></i>
                {cta.book}
              </button>
              {cta.microline && (
                <p className="text-foreground-950/30 text-xs mt-3 font-semibold">
                  {cta.microline}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}