import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { useMediaStore } from '@/lib/mediaStore';

/* ── Brand data ── */
const BRANDS = [
  {
    id: 'garmin',
    name: 'Garmin',
    category: 'Wearables & Navigation',
    since: '2021',
    metric: '+116%',
    metricLabel: 'Sell-out Steigerung',
    overview: 'Seit 2021 verbindet Garmin und Sonic eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Geschulte Brand Ambassadors sorgen für messbar höhere Konversionsraten.',
    pill0Value: '3 Jahre', pill0Label: 'Partnerschaft',
    pill1Value: '>500', pill1Label: 'Einsätze',
    pill2Value: '+116%', pill2Label: 'Sell-out',
    quote: 'Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter.',
    author: 'Dana Eichinger', role: 'Director Marketing DACH, Garmin',
    trend: [42, 58, 72, 88],
    modules: [
      { title: 'Brand Ambassadors', icon: 'ri-user-star-line', desc: 'Geschulte Markenbotschafter aus unserem Talentepool, leidenschaftlich im Kundenkontakt.', tags: ['POS', 'Schulung', 'Sales'] },
      { title: 'Verkäuferschulungen', icon: 'ri-presentation-line', desc: 'Handelspartner zu Fans machen — mit Schulungen, die im Gedächtnis bleiben.', tags: ['Training', 'Retail'] },
      { title: 'Live-Reporting', icon: 'ri-dashboard-line', desc: 'Echtzeit-Dashboards mit allen relevanten KPIs täglich aktualisiert.', tags: ['SRT', 'Daten'] },
    ],
    galleryPath: '/images/Case Studies -Fallbsp/Garmin',
    logoBg: "url('https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX') no-repeat center / contain",
  },
  {
    id: 'groupeseb',
    name: 'Groupe SEB',
    category: 'Mehrmarken (Krups, Rowenta, Tefal)',
    since: '2019',
    metric: '+130%',
    metricLabel: 'Umsatzwachstum YoY',
    overview: 'Multi-Brand-Aktivierung für Groupe SEB: Wir betreuen die Marken Krups, Rowenta und Tefal gleichzeitig mit spezialisierten Teams und markenspezifischen Konzepten.',
    pill0Value: '3 Marken', pill0Label: 'Gleichzeitig',
    pill1Value: '>1.000', pill1Label: 'POS-Einsätze',
    pill2Value: '+130%', pill2Label: 'Wachstum',
    quote: 'Die Fähigkeit von Sonic, mehrere unserer Marken gleichzeitig zu betreuen — mit individuell zugeschnittenen Konzepten und einem einheitlichen Reportingstandard — ist außergewöhnlich.',
    author: 'Marketing Director', role: 'Groupe SEB Deutschland',
    trend: [35, 55, 78, 95],
    modules: [
      { title: 'Multi-Brand-Strategie', icon: 'ri-stack-line', desc: 'Drei Marken, ein Partner — koordiniert durch unser zentrales Projektmanagement.', tags: ['Strategie', 'Koordination'] },
      { title: 'POS-Aktivierungen', icon: 'ri-store-2-line', desc: 'Simultane Aktivierungen in über 200 Outlets bundesweit.', tags: ['POS', 'Bundesweit'] },
      { title: 'SRT-Reporting', icon: 'ri-bar-chart-box-line', desc: 'Ein Dashboard für alle drei Marken — nach Marke und Standort filterbar.', tags: ['SRT', 'Analytics'] },
    ],
    galleryPath: '/images/Case Studies -Fallbsp/Groupe SEB',
    logoBg: "url('https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX') no-repeat center / contain",
  },
  {
    id: 'philips',
    name: 'Philips',
    category: 'Unterhaltungselektronik',
    since: '2020',
    metric: '+54%',
    metricLabel: 'Conversion Rate Steigerung',
    overview: 'Philips vertraut Sonic für die Aktivierung komplexer, erklärungsbedürftiger Produktsortimente am POS. Unsere Ambassadors erklären — und verkaufen.',
    pill0Value: '4 Jahre', pill0Label: 'Partnerschaft',
    pill1Value: '>800', pill1Label: 'Einsätze',
    pill2Value: '+54%', pill2Label: 'Conversion',
    quote: 'Sonic hat verstanden, was unsere Produkte können — und das auch unseren Kunden erklärt. Das schlägt sich direkt in den Verkaufszahlen nieder.',
    author: 'Brand Manager', role: 'Philips Deutschland',
    trend: [40, 52, 65, 78],
    modules: [
      { title: 'Produktschulung', icon: 'ri-book-open-line', desc: 'Tiefgreifendes Produktwissen für alle Ambassadors — individuell auf Philips zugeschnitten.', tags: ['Schulung', 'Expertise'] },
      { title: 'Demo-Aktivierungen', icon: 'ri-hand-coin-line', desc: 'Live-Demos am POS, die Kaufentscheidungen auslösen.', tags: ['Demo', 'POS'] },
      { title: 'Feedback-Loops', icon: 'ri-feedback-line', desc: 'Strukturiertes Kundenfeedback direkt vom POS ins SRT.', tags: ['Daten', 'Optimierung'] },
    ],
    galleryPath: '/images/Case Studies -Fallbsp/Philips',
    logoBg: "url('https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887') no-repeat center / contain",
  },
  {
    id: 'avoury',
    name: 'Avoury',
    category: 'Premium Teesystem — Markteintritt',
    since: '2022',
    metric: '+1.187%',
    metricLabel: 'Umsatz nach Launch',
    overview: 'Der spektakulärste Launch in unserer Geschichte: Avoury by Meßmer. Von null auf Marktpräsenz in 12 Wochen — dank unserem Full-Service-Launch-Paket.',
    pill0Value: '12 Wochen', pill0Label: 'Rollout',
    pill1Value: '>150', pill1Label: 'Outlets',
    pill2Value: '+1.187%', pill2Label: 'Umsatz',
    quote: 'Mit Sonic haben wir in 12 Wochen eine Marktpräsenz aufgebaut, für die andere Jahre brauchen. Das Team hat geliefert — weit über unsere Erwartungen.',
    author: 'Geschäftsführung', role: 'Avoury — The Tea',
    trend: [10, 28, 62, 100],
    modules: [
      { title: 'Launch-Strategie', icon: 'ri-rocket-line', desc: 'Von der Nulllinie zur Marktpräsenz in 12 Wochen — vollständig geplant und umgesetzt.', tags: ['Strategie', 'Launch'] },
      { title: 'POS-Aufbau', icon: 'ri-layout-grid-line', desc: 'Displays, Shop-in-Shops und Collateral in über 150 Outlets.', tags: ['POS', 'Design'] },
      { title: 'Ambassador-Netzwerk', icon: 'ri-team-line', desc: 'Über 80 geschulte Ambassadors bundesweit im Einsatz.', tags: ['Staffing', 'Schulung'] },
    ],
    galleryPath: '/images/Case Studies -Fallbsp/Avoury',
    logoBg: "url('https://cdn.brandfetch.io/avoury.de/theme/dark/logo.svg') no-repeat center / contain",
  },
];

function WoodCard({ brand }: { brand: typeof BRANDS[0] }) {
  const [activeModule, setActiveModule] = useState(0);
  const { images: galleryImages } = useMediaStore(brand.galleryPath);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid oklch(0.885 0.004 110)' }}>
      {/* Wood texture background */}
      <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.22 0.03 60)' }} />
      <div className="v3-wood-overlay" />

      <div style={{ position: 'relative', zIndex: 10, padding: '48px' }}>
        {/* Brand header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', paddingBottom: '32px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ width: '52px', height: '52px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px' }}>
              <span role="img" aria-label={brand.name} style={{ width: '100%', height: '100%', backgroundImage: brand.logoBg, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', filter: 'brightness(0) invert(1)', display: 'block' }} />
            </span>
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>{brand.category}</p>
              <p style={{ margin: 0, fontSize: '26px', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff' }}>{brand.name}</p>
            </div>
          </div>
          <span style={{ padding: '11px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>Seit {brand.since}</span>
        </div>

        {/* Metric + chart */}
        <div className="grid" style={{ gridTemplateColumns: '5fr 7fr', gap: '48px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(56px,6vw,76px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'oklch(0.81 0.19 115)', fontVariantNumeric: 'tabular-nums' }}>{brand.metric}</p>
            <p style={{ margin: '0 0 24px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{brand.metricLabel}</p>
            <p style={{ margin: 0, maxWidth: '420px', fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)' }}>{brand.overview}</p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.12)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Performance-Trend</span>
              <span style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: 900, color: 'oklch(0.81 0.19 115)' }}>{brand.since}–2024</span>
            </div>
            <div style={{ flex: 1, minHeight: '130px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              {brand.trend.map((h, i) => (
                <div key={i} className="v3-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Pills */}
        <div className="grid grid-cols-3" style={{ gap: '2px', marginTop: '40px' }}>
          {[
            { value: brand.pill0Value, label: brand.pill0Label },
            { value: brand.pill1Value, label: brand.pill1Label },
            { value: brand.pill2Value, label: brand.pill2Label },
          ].map((p, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)', padding: '22px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, letterSpacing: '-0.03em', color: 'oklch(0.81 0.19 115)', fontVariantNumeric: 'tabular-nums' }}>{p.value}</p>
              <p style={{ margin: 0, fontSize: '10px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{p.label}</p>
            </div>
          ))}
        </div>

        {/* Quote + CTA */}
        <div style={{ marginTop: '32px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px' }}>
          <div style={{ maxWidth: '620px' }}>
            <i className="ri-double-quotes-l" style={{ fontSize: '22px', color: 'oklch(0.81 0.19 115 / 0.5)', display: 'block', marginBottom: '8px' }} />
            <p style={{ margin: '0 0 8px', fontSize: '15px', lineHeight: 1.7, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>„{brand.quote}"</p>
            <p style={{ margin: 0, fontSize: '10px', fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>{brand.author} — {brand.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeistungenImEinsatz({ brand }: { brand: typeof BRANDS[0] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const { images } = useMediaStore(brand.galleryPath);

  const handleChange = (idx: number) => {
    setFade(false);
    setTimeout(() => { setActiveIdx(idx); setFade(true); }, 200);
  };

  const mod = brand.modules[activeIdx];
  const img = images[activeIdx]?.url;

  return (
    <div style={{ border: '1px solid oklch(0.885 0.004 110)' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid oklch(0.885 0.004 110)', overflowX: 'auto' }}>
        {brand.modules.map((m, i) => (
          <button
            key={i}
            onClick={() => handleChange(i)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '18px 14px', border: 'none', borderRight: '1px solid oklch(0.885 0.004 110)',
              fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
              background: activeIdx === i ? 'oklch(0.16 0.006 118)' : '#fff',
            }}
          >
            <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, background: activeIdx === i ? 'oklch(0.81 0.19 115)' : 'oklch(0.92 0.004 110)', color: activeIdx === i ? 'oklch(0.16 0.006 118)' : 'oklch(0.5 0.006 260)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 900, color: activeIdx === i ? '#fff' : 'oklch(0.42 0.006 260)' }}>{m.title}</span>
          </button>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: '3fr 2fr' }}>
        <div style={{ position: 'relative', minHeight: '380px', overflow: 'hidden' }}>
          {img && <img src={img} alt={mod.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: fade ? 1 : 0, transition: 'opacity 0.2s' }} />}
          <div style={{ position: 'absolute', left: '20px', bottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {mod.tags.map(t => (
              <span key={t} style={{ padding: '6px 11px', background: 'rgba(12,13,11,0.75)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ background: 'oklch(0.13 0.005 118)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <span style={{ width: '40px', height: '40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'oklch(0.81 0.19 115)' }}>
                <span style={{ fontSize: '13px', fontWeight: 900, color: 'oklch(0.16 0.006 118)' }}>{String(activeIdx + 1).padStart(2, '0')}</span>
              </span>
              <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff' }}>{mod.title}</h4>
            </div>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>{mod.desc}</p>
          </div>
          <p style={{ margin: '28px 0 0', fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{String(activeIdx + 1).padStart(2, '0')} / {brand.modules.length}</p>
        </div>
      </div>
    </div>
  );
}

function BentoGallery({ brand }: { brand: typeof BRANDS[0] }) {
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { images } = useMediaStore(brand.galleryPath);

  const openLightbox = (idx: number) => {
    setLightboxItems(images.map(img => ({ src: img.url, caption: img.alt || brand.name })));
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '3px' }}>
        {images.slice(0, 6).map((img, i) => (
          <div
            key={i}
            className="v3-gallery-item"
            style={{ aspectRatio: i === 0 ? '16/9' : '4/3', cursor: 'pointer', gridColumn: i === 0 ? 'span 2 / span 2' : undefined }}
            onClick={() => openLightbox(i)}
          >
            <img src={img.url} alt={img.alt || brand.name} />
            <div className="v3-gallery-corner" />
          </div>
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          startIndex={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

export default function CaseStudiesPage() {
  useSEO({
    title: 'Fallbeispiele | Sonic Group — Erfolgsgeschichten im DACH-Markt',
    description: 'Garmin +116%, Philips +54%, Groupe SEB +130%, Avoury +1.187%: Sonic Group liefert messbare Ergebnisse für führende Marken am POS, im Video und bei Events.',
    keywords: 'Case Studies Sonic Group, Garmin POS, Philips Promotionen, Erfolgsgeschichten Sales Promotion',
    canonical: 'https://sonic-group.de/fallbeispiele',
    ogTitle: 'Fallbeispiele — Sonic Group Erfolgsgeschichten',
    ogDescription: 'Echte Ergebnisse für echte Marken. Garmin +116%, Philips +54%, Groupe SEB +130%, Avoury +1.187%.',
    ogType: 'website',
  });

  const [activeBrand, setActiveBrand] = useState(0);
  const brand = BRANDS[activeBrand];

  return (
    <div className="bg-white">
      <main id="main-content">

        {/* ── HERO ── */}
        <section style={{ position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'oklch(0.13 0.005 118)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.45) 40%, rgba(11,11,12,0.92) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 40px 56px' }}>
            <div className="v3-eyebrow" style={{ marginBottom: '24px' }}>
              <span className="v3-eyebrow-line" />
              <span className="v3-eyebrow-label--light" style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>Fallbeispiele</span>
            </div>
            <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(52px,6vw,76px)', fontWeight: 900, lineHeight: 0.96, letterSpacing: '-0.038em', textTransform: 'uppercase', color: '#fff' }}>
              Erfolgs<span style={{ color: 'oklch(0.81 0.19 115)' }}>geschichten</span>
            </h1>
            <p style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Garmin +116% · Philips +54% · Groupe SEB +130% · Avoury +1.187%</p>
          </div>
        </section>

        {/* ── BRAND TABS + WOOD CARD ── */}
        <section id="carousel" style={{ background: '#fff', padding: '56px 40px 0' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div style={{ maxWidth: '760px', marginBottom: '40px' }}>
              <div className="v3-eyebrow">
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label">Deep Dive</span>
              </div>
              <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.7, color: 'oklch(0.42 0.006 260)' }}>
                Gemeinsam mit unseren Kunden erzielen wir messbare Erfolge. Unsere datengetriebene Arbeitsweise ermöglicht laufende Optimierungen — die Ergebnisse wachsen mit jeder Zusammenarbeit.
              </p>
            </div>

            {/* Brand tab switcher */}
            <div style={{ display: 'flex', border: '1px solid oklch(0.885 0.004 110)', borderBottom: 'none' }}>
              {BRANDS.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(i)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    padding: '20px', border: 'none', borderRight: i < BRANDS.length - 1 ? '1px solid oklch(0.885 0.004 110)' : 'none',
                    fontFamily: 'inherit', cursor: 'pointer',
                    background: activeBrand === i ? 'oklch(0.16 0.006 118)' : '#fff',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: activeBrand === i ? 'oklch(0.81 0.19 115)' : 'oklch(0.42 0.006 260)' }}>{b.name}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: activeBrand === i ? 'rgba(255,255,255,0.6)' : 'oklch(0.55 0.08 115)' }}>{b.metric}</span>
                </button>
              ))}
            </div>

            <WoodCard brand={brand} />
          </div>
        </section>

        <WoodenDivider />

        {/* ── LEISTUNGEN IM EINSATZ ── */}
        <section style={{ background: '#fff', padding: '88px 40px 0' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div style={{ maxWidth: '780px', marginBottom: '48px' }}>
              <div className="v3-eyebrow">
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label">Leistungen im Einsatz</span>
              </div>
              <h2 className="v3-h2">
                {brand.name} — <span className="v3-marker">Was wir eingesetzt haben</span>
              </h2>
            </div>
            <LeistungenImEinsatz brand={brand} />
          </div>
        </section>

        {/* ── BILDERGALERIE ── */}
        <section style={{ background: '#fff', padding: '88px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px', marginBottom: '32px' }}>
              <div>
                <div className="v3-eyebrow">
                  <span className="v3-eyebrow-line" />
                  <span className="v3-eyebrow-label">Bildergalerie</span>
                </div>
                <h2 className="v3-h2">{brand.name} — <span className="v3-marker">in Aktion</span></h2>
              </div>
            </div>
            <BentoGallery brand={brand} />
          </div>
        </section>

        <WoodenDivider />

        {/* ── CLOSING CTA ── */}
        <section style={{ background: 'oklch(0.13 0.005 118)', padding: '88px 40px' }}>
          <div className="mx-auto text-center" style={{ maxWidth: '780px' }}>
            <div className="v3-eyebrow justify-center">
              <span className="v3-eyebrow-line" />
              <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>Dein Projekt</span>
              <span className="v3-eyebrow-line" />
            </div>
            <h2 style={{ fontSize: 'clamp(36px,4vw,52px)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.035em', color: '#fff', marginBottom: '24px' }}>
              Bereit für deine <span style={{ color: 'oklch(0.81 0.19 115)' }}>Erfolgsgeschichte?</span>
            </h2>
            <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
              Lass uns in einem kostenlosen 30-Minuten-Gespräch besprechen, wie wir auch für deine Marke messbare Ergebnisse erzielen.
            </p>
            <a
              href="/kontakt"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '17px 36px', background: 'oklch(0.81 0.19 115)', color: 'oklch(0.16 0.006 118)', fontSize: '12px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Jetzt Gespräch buchen <i className="ri-arrow-right-line" style={{ fontSize: '15px' }} />
            </a>
          </div>
        </section>

        <WoodenDivider />
      </main>
    </div>
  );
}
