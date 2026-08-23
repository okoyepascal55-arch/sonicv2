import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

const highlights = [
  { icon: 'ri-bar-chart-2-line', number: '01', title: 'Datenbasierte Optimierung', desc: 'Jede Kampagne wird durch Echtzeit-KPI gesteuert — Tagesumsätze, Outlet-Matching, Personalwahl.' },
  { icon: 'ri-team-line', number: '02', title: 'Eigene Field Force', desc: 'Über 2.000 geschulte Promoter aus unserem Talentpool — sofort verfügbar im gesamten DACH-Raum.' },
  { icon: 'ri-trophy-line', number: '03', title: 'Bewiesene Ergebnisse', desc: 'Über 500 Projekte, 1,35 Mio. Einsätze, 100.000+ POS-Umsetzungen — mit dokumentierten Wachstumskurven.' },
];

function HighlightCard({ item }: { item: typeof highlights[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative overflow-hidden cursor-default transition-all duration-500"
      style={{
        borderRadius: 0,
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        background: isHovered ? 'oklch(var(--foreground-950))' : '#ffffff',
        boxShadow: isHovered
          ? '0 24px 50px rgba(0,0,0,0.18), 0 0 0 1px rgba(200,212,0,0.3)'
          : '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 transition-all duration-500" style={{ height: isHovered ? '3px' : '2px', background: isHovered ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.2)', boxShadow: isHovered ? '0 0 16px rgba(200,212,0,0.5)' : 'none' }} />
      <div className="absolute left-0 top-3 bottom-3 w-0.5 transition-all duration-500" style={{ background: isHovered ? 'oklch(var(--primary-500))' : 'transparent' }} />
      <div className={`absolute top-3 left-3 w-4 h-4 border-t border-l transition-all duration-300 ${isHovered ? 'opacity-100 border-primary-500/50' : 'opacity-0 border-primary-500'}`} />
      <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r transition-all duration-300 ${isHovered ? 'opacity-100 border-primary-500/50' : 'opacity-0 border-primary-500'}`} />
      <div className={`absolute bottom-3 left-3 w-4 h-4 border-b border-l transition-all duration-300 ${isHovered ? 'opacity-100 border-primary-500/50' : 'opacity-0 border-primary-500'}`} />
      <div className={`absolute bottom-3 right-3 w-4 h-4 border-b border-r transition-all duration-300 ${isHovered ? 'opacity-100 border-primary-500/50' : 'opacity-0 border-primary-500'}`} />
      <div className="absolute bottom-4 right-5 font-black leading-none select-none pointer-events-none transition-all duration-500" style={{ fontSize: '4rem', opacity: 0.035, color: isHovered ? 'oklch(var(--primary-500))' : '#000', letterSpacing: '-0.04em' }}>{item.number}</div>
      <div className="p-8 relative z-10">
        <div className="w-13 h-13 flex items-center justify-center mb-5 transition-all duration-500" style={{ width: '52px', height: '52px', background: isHovered ? 'rgba(200,212,0,0.15)' : '#f5f5f0', boxShadow: isHovered ? '0 4px 16px rgba(200,212,0,0.2)' : 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
          <i className={`${item.icon} text-xl transition-colors duration-500`} style={{ color: 'oklch(var(--primary-500))' }}></i>
        </div>
        <h4 className="text-sm font-black mb-3 uppercase tracking-wide transition-colors duration-500" style={{ color: isHovered ? '#fff' : '#111' }}>{item.title}</h4>
        <div className="h-px mb-3 transition-all duration-500" style={{ background: isHovered ? 'rgba(200,212,0,0.15)' : 'rgba(0,0,0,0.07)' }} />
        <p className="text-sm leading-relaxed transition-colors duration-500" style={{ color: isHovered ? 'rgba(255,255,255,0.65)' : '#6B7280' }}>{item.desc}</p>
      </div>
    </div>
  );
}

export default function FeaturedCases() {
  const tBadge = useText('casestudies_intro', 'casestudies-intro-badge', 'Performance Marketing für Retail');
  const tP = useText('casestudies_intro', 'casestudies-intro-p', 'Das bedeutet für uns, gemeinsam mit und für unsere Kunden messbare Erfolge zu erzielen.');

  const [activeCase, setActiveCase] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const cases = [
    {
      id: 'garmin',
      brand: 'Garmin',
      logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      category: 'Retail Activation & POS Full-Service',
      since: '2021',
      challenge: 'Garmin benötigte eine starke Retail-Präsenz im DACH-Raum, um Wearables und GPS-Produkte erlebbar zu machen und Endkunden direkt am POS für die Marke zu begeistern.',
      solution: 'Sonic übernahm Full-Service-Promotions in Deutschland und Österreich, entwickelte interaktive POS-Möbel, schult Verkäufer-Teams in Krefeld und liefert komplette Lager- und Logistikleistungen.',
      results: [
        { label: 'Umsatzwachstum 2021–2024', value: '+116%' },
        { label: 'Märkte', value: 'DE + AT' },
        { label: 'Module', value: '5' },
      ],
      images: [
        '/images/Case Studies -Fallbsp/Garmin/210330_Banner_Kacheln_310x150px_Seite_13_Reporting (1).webp',
        '/images/Case Studies -Fallbsp/Garmin/210330_Banner_Kacheln_310x150px_Seite_13_Reporting.webp',
        '/images/Case Studies -Fallbsp/Garmin/5243_190035993.webp',
        '/images/Case Studies -Fallbsp/Garmin/5243_190036664.webp',
        '/images/Case Studies -Fallbsp/Garmin/5279_10060291 (1).webp',
        '/images/Case Studies -Fallbsp/Garmin/5279_10060291.webp',
        '/images/Case Studies -Fallbsp/Garmin/5315_195525779.webp',
        '/images/Case Studies -Fallbsp/Garmin/5431_162510371 (1).webp',
        '/images/Case Studies -Fallbsp/Garmin/5431_162510371.webp',
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_1000_A26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_1000_B26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_600_A26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_1000_A26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_600_A26_Front.webp',
        '/images/Case Studies -Fallbsp/Garmin/MM Chemnitz_Rene G.webp',
        '/images/Case Studies -Fallbsp/Garmin/MM Hückelhoven_Chris L (1).webp',
        '/images/Case Studies -Fallbsp/Garmin/MM Hückelhoven_Chris L.webp',
        '/images/Case Studies -Fallbsp/Garmin/Saturn Frankfurt_Redouan B.webp',
        '/images/Case Studies -Fallbsp/Garmin/Tacx_Neu (1).webp',
        '/images/Case Studies -Fallbsp/Garmin/Tacx_Neu.webp'
      ],
      testimonial: 'Seit 2021 verbindet GARMIN und Sonic eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Besonders schätzen wir die partnerschaftliche Zusammenarbeit auf Augenhöhe — stets lösungsorientiert und engagiert.',
      author: 'Dana Eichinger',
      authorRole: 'Director Marketing DACH, Garmin Deutschland GmbH',
    },
    {
      id: 'groupe-seb',
      brand: 'Groupe SEB',
      logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      category: 'Multi-Brand Field Force & Live-Video',
      since: '2019',
      challenge: 'Für vier Topmarken (Tefal, Rowenta, Krups, WMF) waren gleichzeitig Effizienz, Markenseparation und anhaltend hohe Abverkaufsleistung gefragt — mit klarer Datentransparenz.',
      solution: 'Sonic setzt auf Live-Video-Beratung aus dem eigenen Studio, Live-Cooking am POS, eine mehrmarkenfähige Airstream-Roadshow sowie tagesgenaues Reporting über das SRT-Tool.',
      results: [
        { label: 'Umsatzwachstum pro Einsatztag', value: '+130%' },
        { label: 'Marken', value: '4' },
        { label: 'Module', value: '6' },
      ],
      images: [
        '/images/Case Studies -Fallbsp/SEB/20250604_205405_187.webp',
        '/images/Case Studies -Fallbsp/SEB/Außenansicht.webp',
        '/images/Case Studies -Fallbsp/SEB/Bild_NecafeDolceGusto.webp',
        '/images/Case Studies -Fallbsp/SEB/Gruppe Braun (37).webp',
        '/images/Case Studies -Fallbsp/SEB/Gruppe Gold (5).webp',
        '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (13).webp',
        '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (26).webp',
        '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (34).webp',
        '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (37).webp',
        '/images/Case Studies -Fallbsp/SEB/Optigrill Tisch.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam1.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam12.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam2.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam4.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam5.webp',
        '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam7.webp',
        '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2020-07-30 at 15.11.27.webp',
        '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2020-07-31 at 12.12.37 (2).webp',
        '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2020-07-31 at 12.12.39.webp',
        '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2024-02-22 at 11.50.47.webp',
        '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2026-03-03 at 13.11.27 (7).webp',
        '/images/Case Studies -Fallbsp/SEB/image10.webp',
        '/images/Case Studies -Fallbsp/SEB/image12.webp',
        '/images/Case Studies -Fallbsp/SEB/image16.webp',
        '/images/Case Studies -Fallbsp/SEB/image17.webp',
        '/images/Case Studies -Fallbsp/SEB/image7.webp'
      ],
      testimonial: 'Hier finde ich, ohne großes Excel Kung-Fu, das was ich für die Vorbereitung von Meetings benötige — mit wenigen Klicks und Exportfunktion. Das SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit.',
      author: 'Ramin Dirinpur',
      authorRole: 'Sales Promotion & Sales Training Manager, Groupe SEB Deutschland GmbH',
    },
    {
      id: 'philips',
      brand: 'Philips',
      logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887',
      category: 'Field Force, Training & Digital',
      since: '2021',
      challenge: 'Philips TV & Sound benötigte einen End-to-End-Partner, der Schulungen, Field Force und digitale Kampagnen nahtlos bündelt — mit dem Ziel, Deutschland zum stärksten EU-Markt zu machen.',
      solution: 'Sonic liefert Cashback-Aktionen, saisonale POS-Promotions, die TVundSound.Academy, Messestandbau sowie einen digitalen 3D-Homeplaner — alles vollständig im Full-Service.',
      results: [
        { label: 'Absatzwachstum pro Einsatztag', value: '+54%' },
        { label: 'Marktposition Europa', value: '#1 EU' },
        { label: 'Module', value: '6' },
      ],
      images: [
        '/images/Case Studies -Fallbsp/Philips/5589_23290336.webp',
        '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (1).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (2).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (3).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (4).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2.webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (1).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (2).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (3).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (4).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT.webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_Media Markt Ingolstadt - Eriagstr. 28 - 85046 Ingolstadt1 (1).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_Media Markt Ingolstadt - Eriagstr. 28 - 85046 Ingolstadt1 (2).webp',
        '/images/Case Studies -Fallbsp/Philips/ALW6_Media Markt Ingolstadt - Eriagstr. 28 - 85046 Ingolstadt1.webp',
        '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-30 at 15.11.27 (1).webp',
        '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-30 at 15.11.27.webp',
        '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.37 (2) (1).webp',
        '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.37 (2).webp',
        '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.39 (1).webp',
        '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.39.webp'
      ],
      testimonial: 'Durch das SRT können wir live in unsere Projekte mit Sonic reinschauen und jederzeit sehen, wie unsere Erwartungen erfüllt werden.',
      author: 'Murat Yatkin',
      authorRole: 'Managing Director DACH, Philips TV & Sound @TP Vision',
    },
    {
      id: 'avoury',
      brand: 'Avoury',
      logo: 'https://cdn.brandfetch.io/melitta.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      category: 'Field Force, Recruiting & Datenoptimierung',
      since: '2021',
      challenge: 'Die Avoury One (Teemaschine von Melitta) brauchte beim Markteintritt eine Field Force mit maximaler Konversionsrate — aufgebaut aus Null, optimiert durch Daten.',
      solution: 'Sonic rekrutierte gezielt aus dem eigenen Talentpool, schulte auf dem Campus Krefeld und optimierte laufend: Personalauswahl, Outlet-Matching und Tagesplanung — alles datenbasiert via SRT.',
      results: [
        { label: 'Umsatzwachstum pro Einsatztag 2021–2023', value: '+1.187%' },
        { label: 'Marke', value: 'Melitta' },
        { label: 'Module', value: '5' },
      ],
      images: [
        '/images/Case Studies -Fallbsp/Avoury/0c841385-a52b-4462-a08e-42922772ffa7.webp',
        '/images/Case Studies -Fallbsp/Avoury/2.webp',
        '/images/Case Studies -Fallbsp/Avoury/46a17f65-5760-48a1-9d54-6269a08b705f.webp',
        '/images/Case Studies -Fallbsp/Avoury/Banner_Skyscraper_2_160x600.webp',
        '/images/Case Studies -Fallbsp/Avoury/Banner_Skyscraper_3_160x600.webp',
        '/images/Case Studies -Fallbsp/Avoury/IMG-20230928-WA0000.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_01.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_05.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_07.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_08.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_02.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_06.webp',
        '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_MASSE_THEKE.webp',
        '/images/Case Studies -Fallbsp/Avoury/b111db44-a0cf-4eea-b5b7-5a0fd48e1762.webp',
        '/images/Case Studies -Fallbsp/Avoury/ce8dc1a9-9db2-48e8-bc91-de257f9c7da7.webp',
        '/images/Case Studies -Fallbsp/Avoury/d131a95d-592d-41a8-beb7-a893c1b2faa6.webp',
        '/images/Case Studies -Fallbsp/Avoury/d3b2ba5d-0462-4429-ad76-536f27b6a445.webp',
        '/images/Case Studies -Fallbsp/Avoury/f2d4262a-2c1b-4abd-b0a3-406901a73db0.webp'
      ],
      testimonial: 'Dank Tracking und Logging aller Einsätze und Umsätze im Sonic Reporting Tool werden Erfolge und Potenziale sichtbar — und gezielt ausgebaut.',
      author: 'Avoury by Melitta',
      authorRole: 'Projektteam, Sonic Group',
    },
  ];

  return (
    <section className="sonic-section-lg px-4 md:px-6 bg-background-100 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-primary-500/6 blur-3xl pointer-events-none"></div>

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionBadge text="Deep Dive" variant="dark" className="mb-6" />
          <h2 className="sonic-h2 text-foreground-950 mb-4">UNSERE 4 ERFOLGSPARTNERSCHAFTEN</h2>
          <p className="text-base text-foreground-600 max-w-2xl mx-auto">Echte Zahlen, echte Zitate, echte Ergebnisse — aus laufenden Langzeitpartnerschaften im DACH-Raum</p>
        </div>

        {/* Brand Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {cases.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveCase(index)}
              className={`px-6 py-3 font-black text-sm uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCase === index
                  ? 'bg-primary-500 text-white scale-105'
                  : 'bg-white text-foreground-700 hover:border-primary-500 hover:text-[oklch(var(--foreground-950))] border border-foreground-200'
              }`}
              style={{ borderRadius: 0 }}
            >
              {item.brand}
            </button>
          ))}
        </div>

        {/* Main Showcase */}
        <div
          className="relative overflow-hidden group mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ borderRadius: 0 }}
        >
          <div className={`absolute inset-0 border-4 transition-all duration-500 pointer-events-none z-20 ${isHovered ? 'border-primary-500' : 'border-foreground-100'}`}></div>

          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-[240px] sm:h-[340px] lg:h-[520px]">
              <img
                src={cases[activeCase].images[0]}
                alt={cases[activeCase].brand}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20"></div>

              {/* Corner accents */}
              <div className={`absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary-500 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary-500 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block bg-primary-500 text-white px-4 py-1.5 font-black text-xs uppercase tracking-wider mb-3" style={{ borderRadius: 0 }}>
                  {cases[activeCase].category}
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-12 bg-white/12 flex items-center justify-center px-1 py-0.5 flex-shrink-0">
                    <img
                      src={cases[activeCase].logo}
                      alt={cases[activeCase].brand}
                      className="w-full h-full object-contain"
                      style={{ filter: 'brightness(0) invert(1)' }}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="sonic-h2 text-white">{cases[activeCase].brand}</h3>
                </div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wide mt-1">Partnerschaft seit {cases[activeCase].since}</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-10 bg-white flex flex-col justify-between relative">
              <div className={`absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary-500 transition-all duration-500 hidden lg:block ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary-500 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-black text-primary-500 uppercase tracking-widest mb-2">Die Herausforderung</h4>
                  <p className="text-foreground-700 text-sm leading-relaxed">{cases[activeCase].challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-primary-500 uppercase tracking-widest mb-2">Unsere Lösung</h4>
                  <p className="text-foreground-700 text-sm leading-relaxed">{cases[activeCase].solution}</p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-xs font-black text-primary-500 uppercase tracking-widest mb-3">Ergebnisse</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cases[activeCase].results.map((result, idx) => (
                      <div key={idx} className="bg-foreground-50 p-3 text-center border border-foreground-100" style={{ borderRadius: 0 }}>
                        <div className="text-lg font-black text-[oklch(var(--foreground-950))] leading-tight font-sans tabular-nums">{result.value}</div>
                        <div className="text-[10px] text-foreground-500 mt-1 leading-tight">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-primary-500/8 p-5 border-l-4 border-primary-500" style={{ borderRadius: 0 }}>
                  <p className="text-foreground-700 italic text-sm leading-relaxed mb-3">"{cases[activeCase].testimonial}"</p>
                  <div>
                    <p className="text-xs font-black text-[oklch(var(--foreground-950))] uppercase tracking-wide">— {cases[activeCase].author}</p>
                    <p className="text-[10px] text-foreground-500 mt-0.5">{cases[activeCase].authorRole}</p>
                  </div>
                </div>
              </div>

              <a
                href="#case-studies-carousel"
                onClick={(e) => { e.preventDefault(); document.getElementById('case-studies-carousel')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="mt-6 w-full bg-primary-500 text-white px-8 py-4 font-black uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap flex items-center justify-center cursor-pointer text-sm border-2 border-primary-500 hover:border-[oklch(var(--foreground-950))]"
                style={{ borderRadius: 0 }}
              >
                Vollständige Story lesen
                <i className="ri-arrow-down-line ml-2 animate-bounce"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, index) => (
            <HighlightCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}