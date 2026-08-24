import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';

export default function OriginStory() {
  const { images: focusImages } = useMediaStore('/images/Über uns/Über uns/2. Marken im Herzen. Erfolg im Fokus');

  const tHeading = useText('about_origin', 'about-origin-heading', 'Marken im Herzen.');
  const tHeadingAccent = useText('about_origin', 'about-origin-heading-accent', 'Erfolg im Fokus.');
  const tBody1 = useText('about_origin', 'about-origin-body-1', 'Wir sind eine unabhängige Marketing- und Sales-Agentur.');
  const tBody2 = useText('about_origin', 'about-origin-body-2', 'Seit 2007 leben wir Marken und machen sie erfolgreich.');
  const tBody3 = useText('about_origin', 'about-origin-body-3', 'Unsere Strategie: Ärmel hoch und anpacken!');
  const tCtaLabel = useText('about_origin', 'about-origin-cta', 'Unsere Lösungen entdecken');

  const img = focusImages[0]?.url;

  return (
    <section style={{ background: '#fff', padding: '112px 40px 96px' }}>
      <div className="mx-auto grid md:grid-cols-2 gap-24 items-center" style={{ maxWidth: '1280px' }}>

        {/* Image column */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'oklch(0.9 0.003 110)' }}>
            {img ? (
              <img src={img} alt="Sonic Group seit 2007" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'oklch(0.92 0.004 110)' }} />
            )}
            <div style={{ position: 'absolute', top: '20px', left: '20px', padding: '8px 14px', background: 'rgba(12,13,11,0.4)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>Seit 2007</div>
          </div>
          {/* Floating stat card */}
          <div style={{ position: 'absolute', right: '-32px', bottom: '-32px', width: '224px', padding: '28px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(24px) saturate(1.4)', WebkitBackdropFilter: 'blur(24px) saturate(1.4)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '52px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'oklch(0.16 0.006 118)' }}>17+</p>
            <p style={{ margin: '0 0 16px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.5, color: 'oklch(0.5 0.006 260)' }}>Jahre Markenerfolg im DACH-Raum</p>
            <span style={{ display: 'block', width: '40px', height: '3px', background: 'oklch(0.81 0.19 115)' }} />
          </div>
        </div>

        {/* Text column */}
        <div>
          <div className="v3-eyebrow">
            <span className="v3-eyebrow-line" />
            <span className="v3-eyebrow-label">Über uns</span>
          </div>

          <h2 className="v3-h2 mb-8">
            {tHeading}<br />
            <span className="v3-marker">{tHeadingAccent}</span>
          </h2>

          <div className="flex flex-col gap-5 mb-11" style={{ maxWidth: '480px' }}>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.7, color: 'oklch(0.42 0.006 260)' }}>{tBody1}</p>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.7, color: 'oklch(0.42 0.006 260)' }}>{tBody2}</p>
            <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.7, fontWeight: 700, color: 'oklch(0.16 0.006 118)' }}>{tBody3}</p>
          </div>

          <a
            href="/losungen"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '17px 32px', background: 'oklch(0.16 0.006 118)', color: '#fff', fontSize: '12px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.81 0.19 115)'; (e.currentTarget as HTMLElement).style.color = 'oklch(0.16 0.006 118)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.16 0.006 118)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          >
            {tCtaLabel} <i className="ri-arrow-right-line" style={{ fontSize: '15px' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
