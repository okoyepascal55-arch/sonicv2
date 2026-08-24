import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';

const VOICES = [
  {
    name: 'Pascal Okoye',
    role: 'CEO & Gründer',
    tenure: 'Seit 2007',
    quoteKey: 'about_mgmt_quote_1',
    quoteDefault: 'Wir haben nie auf Perfektion gewartet — wir haben angefangen, geliefert, und dabei gelernt, wie man Marken wirklich erfolgreich macht.',
    metricValue: '17+',
    metricLabel: 'Jahre Führungserfahrung',
  },
  {
    name: 'Führungsperson 2',
    role: 'COO',
    tenure: 'Seit 2012',
    quoteKey: 'about_mgmt_quote_2',
    quoteDefault: 'Exzellenz entsteht nicht durch Zufall. Sie entsteht durch klare Prozesse, motivierte Menschen und den unbedingten Willen, besser zu werden.',
    metricValue: '500+',
    metricLabel: 'Projekte erfolgreich abgeschlossen',
  },
  {
    name: 'Führungsperson 3',
    role: 'CCO',
    tenure: 'Seit 2015',
    quoteKey: 'about_mgmt_quote_3',
    quoteDefault: 'Unsere Kunden vertrauen uns, weil wir liefern — nicht nur versprechen. Dieses Vertrauen ist unser wertvollstes Kapital.',
    metricValue: '>2 Mrd.',
    metricLabel: 'Umsatz generiert',
  },
  {
    name: 'Führungsperson 4',
    role: 'CTO',
    tenure: 'Seit 2018',
    quoteKey: 'about_mgmt_quote_4',
    quoteDefault: 'Daten machen uns schneller, smarter und transparenter. Das SRT gibt uns und unseren Kunden eine Echtzeit-Sicht auf alles, was zählt.',
    metricValue: '100K+',
    metricLabel: 'POS-Einsätze live getrackt',
  },
  {
    name: 'Führungsperson 5',
    role: 'CMO',
    tenure: 'Seit 2019',
    quoteKey: 'about_mgmt_quote_5',
    quoteDefault: 'Marken entstehen in den Köpfen der Konsumenten — wir sind diejenigen, die dort den ersten Eindruck prägen.',
    metricValue: '20.000+',
    metricLabel: 'Talente im Netzwerk',
  },
];

export default function ManagementVoices() {
  const { images: leadershipImages } = useMediaStore('/images/Über uns/Leadership Perspectives');

  return (
    <section id="management-voices" style={{ background: '#fff', padding: '96px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>

        <div className="mb-16">
          <div className="v3-eyebrow">
            <span className="v3-eyebrow-line" />
            <span className="v3-eyebrow-label">Führungsperspektiven</span>
          </div>
          <h2 className="v3-h2">
            Stimmen der <span className="v3-marker">Führung</span>
          </h2>
        </div>

        {VOICES.map((voice, i) => {
          const img = leadershipImages[i]?.url;
          const isRight = i % 2 === 1;
          return (
            <div
              key={i}
              className="v3-voice-row"
              style={{
                gridTemplateColumns: '80px 240px 1fr',
                display: 'grid',
                gap: '40px',
                alignItems: 'start',
                padding: '48px 0',
                borderBottom: '1px solid oklch(0.88 0.004 110)',
              }}
            >
              {/* Ghost numeral */}
              <div className="v3-voice-num" aria-hidden="true">
                0{i + 1}
              </div>

              {/* Portrait */}
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: 'oklch(0.9 0.003 110)' }}>
                  {img ? (
                    <img src={img} alt={voice.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'oklch(0.92 0.004 110)' }}>
                      <i className="ri-user-3-line" style={{ fontSize: '40px', color: 'oklch(0.7 0.006 260)' }} />
                    </div>
                  )}
                </div>
                <div style={{ marginTop: '16px' }}>
                  <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 900, letterSpacing: '-0.01em', color: 'oklch(0.16 0.006 118)' }}>{voice.name}</p>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 700, color: 'oklch(0.55 0.08 115)' }}>{voice.role}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'oklch(0.6 0.006 260)' }}>{voice.tenure}</p>
                </div>
              </div>

              {/* Quote + metric */}
              <div style={{ paddingTop: '8px' }}>
                <i className="ri-double-quotes-l" style={{ fontSize: '28px', color: 'oklch(0.81 0.19 115 / 0.4)', display: 'block', marginBottom: '16px' }} />
                <p className="v3-voice-quote" style={{ marginBottom: '32px' }}>
                  „{voice.quoteDefault}"
                </p>
                <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '20px 28px', background: 'oklch(0.975 0.002 110)', borderLeft: '3px solid oklch(0.81 0.19 115)' }}>
                  <span style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em', color: 'oklch(0.16 0.006 118)', lineHeight: 1 }}>{voice.metricValue}</span>
                  <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(0.55 0.006 260)', marginTop: '8px' }}>{voice.metricLabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
