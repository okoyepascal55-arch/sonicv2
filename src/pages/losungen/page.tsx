import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenDivider from '@/components/base/WoodenDivider';
import ClientProof from '../../components/feature/ClientProof';
import { useText } from '@/hooks/useText';

/* ───────────────────────────────────────────────────────────
   SOLUTION DATA — unchanged from original, all functionality kept
─────────────────────────────────────────────────────────── */
const SOLUTIONS = {
  markteintritt: {
    id: 'markteintritt',
    label: 'Markteintritt',
    icon: 'ri-rocket-line',
    title: 'Neu im Markt. Maximale Sichtbarkeit',
    subtitle: 'Wir machen Erklärungsbedürftiges erlebbar',
    description: 'Dein Produkt ist kaufbereit, aber noch unbekannt? Wir ändern das: Mit Menschen, die deine Marke verstehen und sie am POS, per Video und bei Events zum Leben erwecken. Datenbasiert geplant, live reportet, messbar erfolgreich.',
    challenges: [
      { icon: 'ri-shield-cross-line', title: 'Kein Vertrauen', desc: 'Konsumenten greifen zu dem, was sie kennen. Neue Marken müssen Vertrauen erst aufbauen: persönlich, erklärend, überzeugend.' },
      { icon: 'ri-eye-off-line', title: 'Kein Regalplatz im Kopf', desc: 'Sichtbarkeit im Regal garantiert keinen Abverkauf. Neue Marken und Produkte sind nicht im Relevant Set der Konsumenten. Noch nicht.' },
      { icon: 'ri-feedback-line', title: 'Keine Feedback-Schleife', desc: 'Wer beim Launch am POS nicht misst, welche Argumentationen in welchen Outlets funktionieren, arbeitet im Blindflug.' },
    ],
    deliverables: [
      { icon: 'ri-user-star-line', title: 'Brand Ambassadors am POS', desc: 'Geschulte Markenbotschafter aus unserem Talentepool. Festangestellt, keine Freelancer. Trainiert auf dein Produkt, leidenschaftlich im Kundenkontakt.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-presentation-line', title: 'Verkäuferschulungen', desc: 'Deine Handelspartner sollen Fans deiner Marke werden. Wir begeistern sie mit Schulungen, die im Gedächtnis bleiben.', img: '' },
      { icon: 'ri-calendar-event-line', title: 'Launch-Events & Promotions', desc: 'Wir inszenieren deinen Auftritt: Roadshows, Instore-Events, Produkt-Demos. Konzept, Personal, Logistik: alles aus einer Hand.', img: '' },
      { icon: 'ri-video-line', title: 'Videocontent & Live-Beratung', desc: 'Erklärvideos, Social Content und Live-Video-Calls. Damit dein Produkt auch digital erlebbar ist.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/3. Bild Kopie.webp' },
      { icon: 'ri-store-2-line', title: 'POS-Design & Aufbau', desc: 'Displays, Shop-in-Shops, Collateral, Give-aways: Wir gestalten und bestücken deine Fläche. End-to-end.', img: '' },
      { icon: 'ri-bar-chart-box-line', title: 'Datenbasierte Planung', desc: 'Über das SRT identifizieren wir Märkte und Standorte mit dem größten Potenzial für deinen Launch.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-dashboard-line', title: 'Live-Reporting', desc: 'Vom ersten Einsatztag an siehst du in Echtzeit, was passiert: Kontakte, Verkäufe, Feedback, Zielerreichung.', img: '' },
    ],
    steps: [
      { num: '01', title: 'Briefing & Markenverständnis', desc: 'Wir lernen dein Produkt kennen, als wäre es unseres: Positionierung, Zielgruppe, Wettbewerbsumfeld. Wir verstehen, was dein Produkt besonders macht.' },
      { num: '02', title: 'Standort- & Einsatzplanung', desc: 'Das SRT liefert die Datenbasis: Wo ist das Potenzial am größten? Du bekommst einen datenbasierten Rollout-Plan.' },
      { num: '03', title: 'Team-Aufbau & Schulung', desc: 'Wir rekrutieren und schulen dein Launch-Team aus unserem Pool von 2.000 Talenten. Festangestellt und motiviert.' },
      { num: '04', title: 'Launch & Aktivierung', desc: 'POS-Aufbau, Promotions, Events, Videoproduktion: Dein Markteintritt, orchestriert über alle Retail-Touchpoints.' },
      { num: '05', title: 'Tracking & Optimierung', desc: 'Live-Dashboards ab Tag 1. Was funktioniert, wird skaliert. Was nicht performt, wird angepasst.' },
    ],
    stats: [
      { value: '>120', label: 'Produktlaunches' },
      { value: '>2.000', label: 'Talente im Pool' },
      { value: '>30', label: 'Neue Marken' },
      { value: '100 %', label: 'Echtzeit ab Tag 1' },
    ],
    testimonial: {
      quote: 'Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter.',
      author: 'Dana Eichinger', role: 'Director Marketing DACH, Garmin',
    },
    finalCta: 'Bereit für deinen Markteintritt? Lass uns in 30 Minuten klären, wie dein Launch aussehen kann.',
    ctaLabel: 'Markteintritt planen',
    heroStatValue: '>120',
    heroStatLabel: 'Erfolgreiche Launches',
    barLabels: ['2021', '2022', '2023', '2024'],
    facts: [
      { value: '>2.000', label: 'Talente im Pool' },
      { value: '>30', label: 'Neue Marken eingeführt' },
      { value: '100%', label: 'Live-Transparenz ab Tag 1' },
    ],
  },
  absatz: {
    id: 'absatz',
    label: 'Absatz steigern',
    icon: 'ri-line-chart-line',
    title: 'Produkt im Regal. Sell-out über Plan',
    subtitle: 'Profitabel Verkaufsziele erreichen.',
    description: 'Dein Produkt ist im Markt, aber der Abverkauf bleibt unter Plan? Wir sorgen für Bewegung: Mit Promoter-Power, Händlerschulungen und datengetriebener Aktivierung, die konvertiert.',
    challenges: [
      { icon: 'ri-shopping-cart-line', title: 'Kaufimpuls fehlt', desc: 'Sichtbarkeit im Regal reicht nicht. Konsumenten brauchen den richtigen Moment, die richtige Ansprache, die richtige Empfehlung.' },
      { icon: 'ri-user-unfollow-line', title: 'Händler kennen das Produkt nicht', desc: 'Wer im Handel nicht bekannt ist, wird nicht empfohlen. Handelsstaffeln ohne Training verpuffen.' },
      { icon: 'ri-line-chart-line', title: 'Keine Stellhebel bekannt', desc: 'Ohne Daten keine Optimierung. Wer nicht weiß, welche Outlets underperformen, kann nicht gezielt eingreifen.' },
    ],
    deliverables: [
      { icon: 'ri-user-star-line', title: 'Promoter-Aktivierungen', desc: 'Unser Netzwerk aus 20.000+ Promotern aktiviert deinen Sell-out an den relevanten POS — bundesweit, jederzeit skalierbar.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-presentation-line', title: 'Handelstraining', desc: 'Wir schulen das Fachpersonal deiner Handelspartner. Wer das Produkt kennt und liebt, empfiehlt es.', img: '' },
      { icon: 'ri-dashboard-line', title: 'SRT Performance-Tracking', desc: 'Echtzeit-Sicht auf Sell-out nach Outlet, Region, Produkt. Optimierung passiert live, nicht beim Quartals-Review.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-store-2-line', title: 'POS-Refresh', desc: 'Neue Displays, Platzierungen, Sonderaktionen. Wir holen das Maximum aus deiner vorhandenen Handelsfläche.', img: '' },
      { icon: 'ri-money-euro-circle-line', title: 'ROI-Reporting', desc: 'Wir berichten nicht nur Aktivitäten, sondern Ergebnisse: Kontakte, Konversion, generierter Umsatz.', img: '' },
    ],
    steps: [
      { num: '01', title: 'Ist-Analyse & Potenzialidentifikation', desc: 'Wir analysieren deinen aktuellen POS-Footprint und identifizieren mit dem SRT die Outlets mit dem größten Sell-out-Potenzial.' },
      { num: '02', title: 'Maßnahmenplan', desc: 'Auf Basis der Daten entwickeln wir ein Maßnahmenpaket: Promoter-Einsätze, Schulungen, POS-Optimierungen — priorisiert nach ROI.' },
      { num: '03', title: 'Aktivierung & Skalierung', desc: 'Wir setzen um: schnell, koordiniert, skalierbar. Dein Sell-out bewegt sich innerhalb von Wochen.' },
      { num: '04', title: 'Live-Optimierung', desc: 'Kein Blindflug. Wir optimieren laufend auf Basis von Echtzeit-Daten aus dem SRT.' },
    ],
    stats: [
      { value: '+340%', label: 'Durchschnittliche Conversion' },
      { value: '20.000+', label: 'Aktive Promoter' },
      { value: '100K+', label: 'POS-Einsätze' },
      { value: '>2 Mrd. €', label: 'Umsatz generiert' },
    ],
    testimonial: {
      quote: 'Die Sell-out-Steigerung war signifikant spürbar — und vor allem messbar. Das SRT hat uns erstmals einen echten Echtzeit-Blick auf unsere POS-Performance gegeben.',
      author: 'Marketing Manager', role: 'Top-10-CE-Marke, Deutschland',
    },
    finalCta: 'Bereit für mehr Sell-out? Lass uns konkret werden.',
    ctaLabel: 'Absatz steigern',
    heroStatValue: '+340%',
    heroStatLabel: 'Ø Conversion-Steigerung',
    barLabels: ['Q1', 'Q2', 'Q3', 'Q4'],
    facts: [
      { value: '20.000+', label: 'Aktive Promoter' },
      { value: '100K+', label: 'POS-Einsätze' },
      { value: '>2 Mrd. €', label: 'Umsatz generiert' },
    ],
  },
  omnichannel: {
    id: 'omnichannel',
    label: 'Omnichannel',
    icon: 'ri-global-line',
    title: 'Retail. Video. Events. Aus einer Hand.',
    subtitle: 'Konsistente Markenerlebnisse über alle Kanäle.',
    description: 'Deine Marke muss überall konsistent und überzeugend sein: Am POS, im Video-Call, auf der Messe. Wir orchestrieren alle Touchpoints — mit einem Team, einer Datenbasis, einem Bericht.',
    challenges: [
      { icon: 'ri-links-line', title: 'Silos zwischen Kanälen', desc: 'POS-Agentur, Video-Dienstleister, Event-Agentur: drei Dienstleister, drei Briefings, drei Reportings. Das kostet Zeit, Geld und Konsistenz.' },
      { icon: 'ri-palette-line', title: 'Inkonsistente Markenerlebnisse', desc: 'Was am POS gesagt wird, stimmt nicht mit dem überein, was im Video erklärt oder auf der Messe gezeigt wird.' },
      { icon: 'ri-eye-off-line', title: 'Keine kanalübergreifende Sicht', desc: 'Ohne ein zentrales Reporting-Tool sieht niemand das Gesamtbild. Optimierung ist unmöglich.' },
    ],
    deliverables: [
      { icon: 'ri-store-2-line', title: 'POS-Aktivierung', desc: 'Promoter, Displays, Schulungen am Point of Sale — vollständig in das Gesamtkonzept integriert.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-video-line', title: 'Live-Video-Beratung', desc: 'Hochwertige Live-Video-Beratung aus unserem Campus-Studio: für Kunden, die nicht in den Store kommen können.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/3. Bild Kopie.webp' },
      { icon: 'ri-calendar-event-line', title: 'Events & Messen', desc: 'Messestände, Roadshows, Brand-Activations: Wir planen und besetzen deine Live-Events.', img: '' },
      { icon: 'ri-film-line', title: 'Content-Produktion', desc: 'Video, Social Content, Produktfotos aus unserem Campus-Studio. Ein Dreh, viele Kanäle.', img: '' },
      { icon: 'ri-dashboard-line', title: 'Zentrales Omnichannel-Reporting', desc: 'Alle Kanäle in einem Dashboard. Verkäufe, Kontakte, Reichweite, Kundenfeedback — kanalübergreifend aggregiert.', img: '/images/losungen/dashboard.webp' },
    ],
    steps: [
      { num: '01', title: 'Kanal-Audit & Strategie', desc: 'Welche Touchpoints nutzt deine Zielgruppe? Wo sind die Lücken? Wir analysieren und entwickeln eine integrierte Strategie.' },
      { num: '02', title: 'Konzept & Synchronisation', desc: 'Ein einheitliches Markenerlebnis für alle Kanäle: gleiche Botschaft, angepasst an das Medium.' },
      { num: '03', title: 'Kanalübergreifende Aktivierung', desc: 'Gleichzeitiger Rollout über POS, Video und Events — koordiniert aus einer Hand.' },
      { num: '04', title: 'Zentrales Reporting & Optimierung', desc: 'Ein Dashboard, alle Kanäle. Wir optimieren kanalübergreifend auf Basis von Echtzeit-Daten.' },
    ],
    stats: [
      { value: '3 in 1', label: 'POS + Video + Events' },
      { value: '>500', label: 'Omnichannel-Projekte' },
      { value: '100%', label: 'Kanalübergreifend reportet' },
      { value: 'DACH', label: 'Marktabdeckung' },
    ],
    testimonial: {
      quote: 'Erstmals hatten wir einen echten 360°-Blick auf unsere Marktaktivitäten — POS, Video und Events in einem Reporting. Das hat unsere Planung revolutioniert.',
      author: 'Head of Marketing', role: 'Premium-CE-Marke',
    },
    finalCta: 'Bereit für konsistente Markenerlebnisse über alle Kanäle?',
    ctaLabel: 'Omnichannel planen',
    heroStatValue: '>500',
    heroStatLabel: 'Omnichannel-Projekte',
    barLabels: ['POS', 'Video', 'Events', 'Gesamt'],
    facts: [
      { value: '3 Kanäle', label: 'Aus einer Hand' },
      { value: '100%', label: 'Zentrales Reporting' },
      { value: 'DACH', label: 'Marktabdeckung' },
    ],
  },
};

const FAQS = [
  { q: 'Wie schnell können wir starten?', a: 'Nach einem initialen Briefing-Gespräch können wir in der Regel innerhalb von 2–4 Wochen mit ersten Einsätzen starten. Für komplexe Launches planen wir gemeinsam einen realistischen Vorlauf.' },
  { q: 'Arbeitet ihr auch außerhalb von Deutschland?', a: 'Unser primärer Markt ist der DACH-Raum (Deutschland, Österreich, Schweiz). Für internationale Projekte können wir auf unser Partnernetzwerk zurückgreifen.' },
  { q: 'Wie funktioniert das Reporting?', a: 'Über das Sonic Reporting Tool (SRT) hast du in Echtzeit Zugriff auf alle relevanten KPIs: Einsätze, Kontakte, Verkäufe, Kundenfeedback — nach Outlet, Region und Produkt filterbar.' },
  { q: 'Sind eure Promoter festangestellt?', a: 'Ja. Alle Brand Ambassadors und Promoter in unserem Netzwerk sind fest bei uns angestellt oder über definierte Rahmenverträge gebunden — keine Freelancer-Plattform.' },
  { q: 'Welche Mindestlaufzeit gibt es?', a: 'Das hängt vom Projekt ab. Kurzfristige Aktivierungen starten bereits ab einigen Wochen; für strategische Partnerschaften empfehlen wir mindestens 3–6 Monate für messbare Ergebnisse.' },
  { q: 'Könnt ihr mehrere Marken gleichzeitig betreuen?', a: 'Absolut. Multi-Brand-Aktivierung ist eine unserer Kernkompetenzen — wie etwa die parallele Betreuung von Krups, Rowenta und Tefal für Groupe SEB.' },
  { q: 'Wie sieht ein typischer Onboarding-Prozess aus?', a: 'Briefing → Konzept → Teamaufbau & Schulung → Kickoff → Live-Aktivierung → Optimierungsloop. Wir führen dich durch jeden Schritt.' },
  { q: 'Was kostet eine Zusammenarbeit mit Sonic?', a: 'Das hängt vom Umfang ab. Wir erstellen ein maßgeschneidertes Angebot nach einem kostenlosen 30-Minuten-Gespräch. Transparente Kalkulation ist für uns selbstverständlich.' },
];

type SolKey = keyof typeof SOLUTIONS;

function WoodCard({ sol }: { sol: typeof SOLUTIONS.markteintritt }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid oklch(0.885 0.004 110)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.22 0.03 60)' }} />
      <div className="v3-wood-overlay" />
      <div style={{ position: 'relative', zIndex: 10, padding: '48px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', paddingBottom: '32px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span style={{ width: '52px', height: '52px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'oklch(0.81 0.19 115 / 0.15)', border: '1px solid oklch(0.81 0.19 115 / 0.4)' }}>
              <i className={sol.icon} style={{ fontSize: '22px', color: 'oklch(0.81 0.19 115)' }} />
            </span>
            <div>
              <p style={{ margin: '0 0 6px', fontSize: '10px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>Sonic Lösung</p>
              <p style={{ margin: 0, fontSize: '26px', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff' }}>{sol.label}</p>
            </div>
          </div>
          <span style={{ padding: '11px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>Sonic Group · Seit 2007</span>
        </div>

        {/* Metric + chart */}
        <div className="grid" style={{ gridTemplateColumns: '5fr 7fr', gap: '48px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ margin: '0 0 14px', fontSize: 'clamp(60px,6vw,84px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'oklch(0.81 0.19 115)', fontVariantNumeric: 'tabular-nums' }}>{sol.heroStatValue}</p>
            <p style={{ margin: '0 0 24px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{sol.heroStatLabel}</p>
            <p style={{ margin: 0, maxWidth: '420px', fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)' }}>{sol.description}</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.12)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Performance-Trend</span>
              <span style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: 900, color: 'oklch(0.81 0.19 115)' }}>2021–2024</span>
            </div>
            <div style={{ flex: 1, minHeight: '150px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              {[42, 58, 72, 88].map((h, i) => (
                <div key={i} className="v3-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              {sol.barLabels.map((l, i) => (
                <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Fact pills */}
        <div className="grid grid-cols-3" style={{ gap: '2px', marginTop: '40px' }}>
          {sol.facts.map((f, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.12)', padding: '24px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '26px', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: 'oklch(0.81 0.19 115)', fontVariantNumeric: 'tabular-nums' }}>{f.value}</p>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)' }}>{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliverablePanel({ sol }: { sol: typeof SOLUTIONS.markteintritt }) {
  const [active, setActive] = useState(0);
  const d = sol.deliverables[active];

  return (
    <div className="grid" style={{ border: '1px solid oklch(0.885 0.004 110)', background: '#fff', gridTemplateColumns: '400px 1fr' }}>
      {/* List */}
      <div style={{ borderRight: '1px solid oklch(0.885 0.004 110)' }}>
        {sol.deliverables.map((del, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '18px 22px',
              background: active === i ? 'oklch(0.975 0.002 110)' : '#fff',
              border: 'none', borderLeft: `4px solid ${active === i ? 'oklch(0.81 0.19 115)' : 'transparent'}`,
              borderBottom: '1px solid oklch(0.93 0.004 110)', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer',
            }}
          >
            <span style={{ width: '22px', flexShrink: 0, fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: active === i ? 'oklch(0.55 0.08 115)' : 'oklch(0.7 0.006 260)', fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ width: '32px', height: '32px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active === i ? 'oklch(0.81 0.19 115 / 0.15)' : 'oklch(0.95 0.002 110)' }}>
              <i className={del.icon} style={{ fontSize: '14px', color: active === i ? 'oklch(0.55 0.08 115)' : 'oklch(0.6 0.006 260)' }} />
            </span>
            <span style={{ flex: 1, fontSize: '13px', fontWeight: 900, lineHeight: 1.35, color: active === i ? 'oklch(0.16 0.006 118)' : 'oklch(0.42 0.006 260)' }}>{del.title}</span>
          </button>
        ))}
      </div>
      {/* Detail */}
      <div style={{ position: 'relative', minHeight: '560px', overflow: 'hidden', background: 'oklch(0.13 0.005 118)' }}>
        {d.img && <img src={d.img} alt={d.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,9,0.92) 0%, rgba(10,11,9,0.4) 50%, rgba(10,11,9,0.1) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '44px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <span style={{ width: '48px', height: '48px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'oklch(0.81 0.19 115)' }}>
              <i className={d.icon} style={{ fontSize: '20px', color: 'oklch(0.16 0.006 118)' }} />
            </span>
            <h4 style={{ margin: 0, fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff' }}>{d.title}</h4>
          </div>
          <p style={{ margin: 0, maxWidth: '520px', fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)' }}>{d.desc}</p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="v3-bg-off-white" style={{ padding: '96px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '48px' }}>
          <div className="v3-eyebrow">
            <span className="v3-eyebrow-line" />
            <span className="v3-eyebrow-label">FAQ</span>
          </div>
          <h2 className="v3-h2" style={{ marginBottom: '16px' }}>Häufig gestellte Fragen</h2>
          <p style={{ margin: 0, maxWidth: '600px', fontSize: '17px', lineHeight: 1.65, color: 'oklch(0.48 0.006 260)' }}>
            Alles, was du über unsere Lösungen, unsere Arbeitsweise und den Start einer Zusammenarbeit wissen musst.
          </p>
        </div>
        <div style={{ borderTop: '1px solid oklch(0.16 0.006 118)', background: '#fff' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid oklch(0.9 0.004 110)' }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px',
                  width: '100%', padding: '26px 28px', background: openIdx === i ? 'oklch(0.975 0.002 110)' : '#fff',
                  border: 'none', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em', color: 'oklch(0.16 0.006 118)' }}>{faq.q}</span>
                <span style={{ width: '36px', height: '36px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: openIdx === i ? 'oklch(0.81 0.19 115)' : 'oklch(0.955 0.004 110)' }}>
                  <i className={openIdx === i ? 'ri-subtract-line' : 'ri-add-line'} style={{ fontSize: '19px', color: openIdx === i ? 'oklch(0.16 0.006 118)' : 'oklch(0.5 0.006 260)' }} />
                </span>
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 28px 28px 28px' }}>
                  <p style={{ margin: 0, maxWidth: '760px', fontSize: '15px', lineHeight: 1.8, color: 'oklch(0.45 0.006 260)' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: '24px 28px', border: '1px solid oklch(0.885 0.004 110)' }}>
          <p style={{ margin: 0, fontSize: '14px', color: 'oklch(0.5 0.006 260)' }}>Noch Fragen offen? Wir beantworten sie gerne persönlich.</p>
          <a href="mailto:info@sonic-group.de" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'oklch(0.55 0.08 115)', textDecoration: 'none' }}>
            <i className="ri-mail-line" style={{ fontSize: '15px' }} /> Frage stellen
          </a>
        </div>
      </div>
    </section>
  );
}

export default function LosungenPage() {
  useSEO({
    title: 'Lösungen | Sonic Group — Retail Activation DACH',
    description: 'Markteintritt, Absatzsteigerung oder Omnichannel: Sonic Group hat die Menschen, Daten und Lösungen für deinen DACH-Erfolg. Über 120 Launches, >2 Mrd. € Umsatz generiert.',
    keywords: 'Retail Activation DACH, Markteintritt Deutschland, POS Promotion, Omnichannel Sales',
    canonical: 'https://sonic-group.de/losungen',
    ogTitle: 'Drei Wege durch die Retail-Schallmauer — Sonic Group',
    ogDescription: 'Markteintritt, Absatz steigern, Omnichannel: Unsere Lösungen für den DACH-Retail-Markt.',
    ogType: 'website',
  });

  const [activeKey, setActiveKey] = useState<SolKey>('markteintritt');
  const sol = SOLUTIONS[activeKey];
  const { images: heroImages } = useMediaStore('/images/losungen');

  return (
    <div className="bg-white">
      <main id="main-content">

        {/* ── HERO ── */}
        <section style={{ position: 'relative', minHeight: '640px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'oklch(0.13 0.005 118)' }}>
          {heroImages[0]?.url && (
            <img src={heroImages[0].url} alt="Lösungen Hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,11,9,0.92) 0%, rgba(10,11,9,0.6) 55%, rgba(10,11,9,0.25) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,11,9,0.75) 0%, transparent 45%)' }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 40px 64px' }}>
            <div style={{ maxWidth: '780px' }}>
              <div className="v3-eyebrow" style={{ marginBottom: '28px' }}>
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label--light" style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>Lösungen</span>
              </div>
              <h1 style={{ margin: '0 0 32px', fontSize: 'clamp(52px,7vw,88px)', fontWeight: 900, lineHeight: 0.96, letterSpacing: '-0.038em', textTransform: 'uppercase', color: '#fff' }}>
                Drei Wege<br /><span style={{ color: 'oklch(0.81 0.19 115)' }}>durch die</span><br />Retail-Schallmauer.
              </h1>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', maxWidth: '620px', paddingLeft: '20px', borderLeft: '2px solid oklch(0.81 0.19 115)' }}>
                <div>
                  <p style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 900, letterSpacing: '-0.015em', color: '#fff' }}>Die richtige Lösung für jede Phase deiner Retail-Strategie.</p>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>Markteintritt, Absatzsteigerung oder Omnichannel — wir haben die Menschen, die Daten und die Erfolgslösungen für den DACH-Markt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOLUTION TABS + WOOD CARD ── */}
        <section id="losungen-carousel" style={{ background: '#fff', padding: '88px 40px 96px' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
              <div className="v3-eyebrow">
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label">Lösungen für den DACH-Markt</span>
              </div>
              <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.7, color: 'oklch(0.42 0.006 260)' }}>
                Ganz gleich ob du neu im Markt bist, deinen Absatz skalieren willst oder deine Omnichannel-Strategie zum Fliegen bringen musst: Wir haben die Menschen, die Daten und die Erfolgslösungen.
              </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', border: '1px solid oklch(0.885 0.004 110)', borderBottom: 'none' }}>
              {(Object.entries(SOLUTIONS) as [SolKey, typeof SOLUTIONS.markteintritt][]).map(([key, s], i, arr) => (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    padding: '20px', border: 'none', borderRight: i < arr.length - 1 ? '1px solid oklch(0.885 0.004 110)' : 'none',
                    fontFamily: 'inherit', cursor: 'pointer',
                    background: activeKey === key ? 'oklch(0.16 0.006 118)' : '#fff',
                  }}
                >
                  <i className={s.icon} style={{ fontSize: '17px', color: activeKey === key ? 'oklch(0.81 0.19 115)' : 'oklch(0.6 0.006 260)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: activeKey === key ? 'oklch(0.81 0.19 115)' : 'oklch(0.42 0.006 260)' }}>{s.label}</span>
                </button>
              ))}
            </div>

            <WoodCard sol={sol} />

            {/* Title + challenges */}
            <div style={{ border: '1px solid oklch(0.885 0.004 110)', borderTop: 'none', padding: '56px 48px', background: 'oklch(0.985 0.002 110)' }}>
              <div style={{ maxWidth: '780px', marginBottom: '48px' }}>
                <h2 className="v3-h2" style={{ marginBottom: '12px' }}>{sol.title}</h2>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'oklch(0.55 0.08 115)' }}>{sol.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2px' }}>
                {sol.challenges.map((c, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid oklch(0.9 0.004 110)', padding: '32px 28px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', marginBottom: '24px', background: 'oklch(0.81 0.19 115 / 0.12)', border: '1px solid oklch(0.81 0.19 115 / 0.3)' }}>
                      <i className={c.icon} style={{ fontSize: '19px', color: 'oklch(0.55 0.08 115)' }} />
                    </span>
                    <p style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', color: 'oklch(0.16 0.006 118)' }}>{c.title}</p>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.7, color: 'oklch(0.48 0.006 260)' }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WoodenDivider />

        {/* ── DELIVERABLES ── */}
        <section style={{ background: 'oklch(0.975 0.002 110)', padding: '96px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div style={{ maxWidth: '700px', marginBottom: '48px' }}>
              <div className="v3-eyebrow">
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label">Was du bekommst</span>
              </div>
              <h2 className="v3-h2">Leistungen im <span className="v3-marker">Detail</span></h2>
            </div>
            <DeliverablePanel sol={sol} />
          </div>
        </section>

        {/* ── PROCESS STEPS ── */}
        <section style={{ background: '#fff', padding: '96px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div style={{ maxWidth: '700px', marginBottom: '64px' }}>
              <div className="v3-eyebrow">
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label">So arbeiten wir</span>
              </div>
              <h2 className="v3-h2">Von Briefing zu <span className="v3-marker">messbaren Ergebnissen</span></h2>
            </div>
            <div className="flex flex-col" style={{ gap: 0 }}>
              {sol.steps.map((step, i) => (
                <div key={i} className="grid" style={{ gridTemplateColumns: '80px 1fr', gap: '40px', alignItems: 'start', padding: '48px 0', borderBottom: i < sol.steps.length - 1 ? '1px solid oklch(0.9 0.004 110)' : undefined }}>
                  <div style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', color: 'oklch(0.92 0.004 110)' }} aria-hidden="true">{step.num}</div>
                  <div style={{ paddingTop: '8px' }}>
                    <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', color: 'oklch(0.16 0.006 118)' }}>{step.title}</h3>
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.75, color: 'oklch(0.48 0.006 260)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WoodenDivider />

        {/* ── TESTIMONIAL ── */}
        <ClientProof />

        <WoodenDivider />

        {/* ── FAQ ── */}
        <FAQSection />

        <WoodenDivider />

        {/* ── FINAL CTA ── */}
        <section style={{ background: 'oklch(0.13 0.005 118)', padding: '88px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: '780px', textAlign: 'center' }}>
            <div className="v3-eyebrow justify-center">
              <span className="v3-eyebrow-line" />
              <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>Nächster Schritt</span>
              <span className="v3-eyebrow-line" />
            </div>
            <h2 style={{ fontSize: 'clamp(36px,4vw,52px)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.035em', color: '#fff', marginBottom: '24px' }}>
              {sol.finalCta.split('?')[0]}?
            </h2>
            <a
              href="/kontakt"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '17px 36px', background: 'oklch(0.81 0.19 115)', color: 'oklch(0.16 0.006 118)', fontSize: '12px', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              {sol.ctaLabel} <i className="ri-arrow-right-line" style={{ fontSize: '15px' }} />
            </a>
          </div>
        </section>

        <WoodenDivider />
      </main>
    </div>
  );
}
