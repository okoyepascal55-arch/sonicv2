import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { useMediaStore } from '@/lib/mediaStore';

/* ─────────────────────────────────────────
   LEISTUNGEN IM EINSATZ — split image + content panel
───────────────────────────────────────── */
function LeistungenImEinsatz({ modules, brand }: { modules: ServiceModule[]; brand: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const handleChange = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setFade(true);
    }, 200);
  };

  const mod = modules[activeIdx];

  return (
    <div className="mb-14">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-primary-500"></div>
        <div>
          <p className="text-xs font-black text-foreground-400 uppercase tracking-widest mb-0.5">Leistungen im Einsatz</p>
          <h3 className="text-xl font-black text-[#1a1a1a] uppercase tracking-wide">{brand} — Was wir eingesetzt haben</h3>
        </div>
      </div>

      {/* Tab buttons */}
      <div
        className="flex gap-0 overflow-x-auto mb-0 border border-b-0 border-foreground-200"
        style={{ scrollbarWidth: 'none' }}
        role="tablist"
        aria-label={`Leistungen im Einsatz — ${brand}`}
      >
        {modules.map((d, idx) => (
          <button
            key={idx}
            onClick={() => handleChange(idx)}
            role="tab"
            aria-selected={activeIdx === idx}
            aria-controls={`module-panel-${idx}`}
            id={`module-tab-${idx}`}
            className={`flex items-center gap-2 px-4 md:px-5 py-3 transition-all duration-200 cursor-pointer text-xs md:text-sm font-bold whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] border-r border-foreground-200 last:border-r-0 ${
              activeIdx === idx
                ? 'bg-[#1a1a1a] text-primary-500 border-b-2 border-b-[#C8D400]'
                : 'bg-white text-foreground-500 hover:bg-[#FAFDF5] hover:text-[#1a1a1a]'
            }`}
            style={{ borderRadius: 0 }}
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-black flex-shrink-0 ${
                activeIdx === idx ? 'bg-primary-500 text-[#1a1a1a]' : 'bg-foreground-200 text-foreground-500'
              }`}
              style={{ borderRadius: 0 }}
            >
              {d.num}
            </span>
            <span className="hidden sm:inline">{d.title}</span>
            <span className="sm:hidden">{d.num}</span>
          </button>
        ))}
      </div>

      {/* Split panel */}
      <div
        id={`module-panel-${activeIdx}`}
        role="tabpanel"
        aria-labelledby={`module-tab-${activeIdx}`}
        className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-foreground-200 overflow-hidden"
        style={{ borderRadius: 0, transition: 'opacity 0.2s ease', opacity: fade ? 1 : 0, minHeight: '380px' }}
      >
        {/* LEFT — image (3 cols) */}
        <div className="lg:col-span-3 relative overflow-hidden" style={{ minHeight: '280px' }}>
          <img
            src={mod.img}
            alt={`${mod.title} — ${brand}`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Tag chips bottom-left */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-10">
            {mod.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#1a1a1a]/75 border border-white/20 text-white"
                style={{ borderRadius: 0 }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — content panel (2 cols) */}
        <div className="lg:col-span-2 bg-[#1a1a1a] flex flex-col justify-between p-6 md:p-8">
          <div>
            {/* Module number + title */}
            <div className="flex items-start gap-3 mb-5">
              <div
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary-500 mt-0.5"
                style={{ borderRadius: 0 }}
              >
                <span className="text-[#1a1a1a] font-black text-sm tabular-nums">{mod.num}</span>
              </div>
              <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-wide leading-snug">
                {mod.title}
              </h4>
            </div>

            {/* Lime divider */}
            <div className="w-10 h-0.5 bg-primary-500 mb-5"></div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              {mod.desc}
            </p>
          </div>

          {/* Dot navigator + counter */}
          <div className="flex items-center gap-2 mt-8">
            <div className="flex items-center gap-1.5 flex-1 flex-wrap">
              {modules.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChange(idx)}
                  role="tab"
                  aria-selected={activeIdx === idx}
                  aria-label={`Modul ${m.num}: ${m.title}`}
                  className={`transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8D400] ${
                    activeIdx === idx
                      ? 'w-7 h-2 bg-primary-500'
                      : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                  }`}
                  style={{ borderRadius: 0 }}
                  title={m.title}
                />
              ))}
            </div>
            <span className="text-[11px] font-black text-white/35 uppercase tracking-widest tabular-nums flex-shrink-0">
              {activeIdx + 1}/{modules.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServiceModule {
  num: string;
  title: string;
  desc: string;
  img: string;
  tags: string[];
}

interface CaseStudy {
  id: string;
  slug: string;
  brand: string;
  woodIcon: string;
  metric: string;
  metricLabel: string;
  headline: string;
  subline: string;
  campaignType: string;
  since: string;
  quote: string;
  author: string;
  role: string;
  woodStats: { label: string; value: string; progress: number }[];
  woodPills: { label: string; value: string }[];
  monthlyTrend: number[];
  overview: string;
  modules: ServiceModule[];
  gallery: string[];
  bentoImages: { src: string; span: string; label: string }[];
  relatedStories: string[];
}

export default function CaseStudiesPage() {
  useSEO({
    title: 'Fallbeispiele | Sonic Group — Garmin, Philips, Groupe SEB, Avoury',
    description: 'Bewiesene Ergebnisse: Sonic Group Fallbeispiele — Garmin +116%, Philips +54%, Groupe SEB +130%, Avoury +1.187% Umsatzwachstum im DACH-Raum.',
    keywords: 'Sonic Group Fallbeispiele, Garmin Retail Activation, Philips TV Sound, Groupe SEB, Avoury, DACH Retail Ergebnisse',
    canonical: 'https://sonic-group.de/fallbeispiele',
    ogTitle: 'Fallbeispiele — Sonic Group DACH',
    ogDescription: 'Garmin +116%, Philips +54%, Groupe SEB +130%, Avoury +1.187% — echte Markenerfolge mit Sonic Group.',
  });

  const navigate = useNavigate();
  const { images: woodTextures } = useMediaStore('losungen_wood_textures');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'garmin',
      slug: 'garmin',
      brand: 'Garmin',
      woodIcon: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      metric: '+116%',
      metricLabel: 'Umsatzwachstum 2021–2024',
      headline: 'Sportlich nach vorn',
      subline: '#beatyesterday: Seit 2021 — Retail-Partnerschaft mit Garmin im DACH-Raum',
      campaignType: 'Retail Activation & POS Full-Service',
      since: '2021',
      quote: 'Seit 2021 verbindet GARMIN und Sonic eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Im Jahr 2024 entwickelte und realisierte Sonic ein innovatives, interaktives POS-Möbel- und Servicekonzept für GARMIN. Mit hoher Qualität, Professionalität und einem ausgeprägten Markenverständnis überzeugt Sonic auf ganzer Linie. Besonders schätzen wir die partnerschaftliche Zusammenarbeit auf Augenhöhe – stets lösungsorientiert und engagiert. Wir empfehlen Sonic uneingeschränkt weiter und freuen uns auf die weitere gemeinsame Erfolgsgeschichte.',
      author: 'Dana Eichinger',
      role: 'Director Marketing DACH, Garmin Deutschland GmbH',
      woodStats: [
        { label: 'Umsatzwachstum 2021–2024', value: '+116%', progress: 87 },
        { label: 'Märkte', value: 'DE + AT + Sport', progress: 70 },
        { label: 'Partnerschaft seit', value: '2021', progress: 55 },
      ],
      woodPills: [
        { label: 'Start', value: '2021' },
        { label: 'Märkte', value: 'DE + AT' },
        { label: 'Module', value: '5' },
      ],
      monthlyTrend: [42, 48, 50, 55, 60, 62, 68, 72, 70, 78, 82, 88],
      overview: 'Seit 2021 unterstützen wir mit unseren Team Garmin im Retail dabei, Endkunden für Wearables zu begeistern und Verkäufe zu steigern: als erfolgreiche Partnerschaft mit gebündeltem Know-how, klarer Kommunikation und einem gemeinsamen Fokus auf Qualität und Innovation. Start: Promotions in Deutschland. Heute zusätzlich: Promotions Österreich und Sport, POS OneWorld, POS Service, Lager.',
      modules: [
        { num: '01', title: 'Promotions', desc: 'Beispiel: Aktivierung am POS per Rabatt-Aktion. Full-Service-Umsetzung durch unsere Field Force.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', tags: ['POS', 'Field Force', 'DACH'] },
        { num: '02', title: 'Aktionen', desc: 'Beispiel: Smoothie-Verkostungsaktion am POS als niederschwelliger Gesprächseinstieg.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', tags: ['Live-Aktion', 'Verkostung', 'POS'] },
        { num: '03', title: 'POS-Möbel', desc: 'Eigens entwickeltes, modulares Präsentationsmöbel mit digitalen Elementen.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', tags: ['Design', 'Modular', 'Digital'] },
        { num: '04', title: 'Training', desc: 'Wir schulen die Sales-Teams, bei uns in Krefeld und mobil in ganz Deutschland.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', tags: ['Schulung', 'Krefeld', 'Zertifizierung'] },
        { num: '05', title: 'Lager & Logistik', desc: 'POS-Ausstattung wird bei Sonic produziert, gelagert und versendet.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', tags: ['Lager', 'Logistik', 'Versand'] },
      ],
      gallery: [
        'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png',
        'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
      ],
      bentoImages: [
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', span: 'md:col-span-2 md:row-span-2', label: 'POS Activation' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', span: 'md:col-span-1 md:row-span-1', label: 'POS-Möbel 2024' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', span: 'md:col-span-1 md:row-span-1', label: 'Training Krefeld' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', span: 'md:col-span-2 md:row-span-1', label: 'Lager & Logistik' },
      ],
      relatedStories: ['philips', 'groupe-seb'],
    },
    {
      id: 'groupe-seb',
      slug: 'groupe-seb',
      brand: 'Groupe SEB',
      woodIcon: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      metric: '+130%',
      metricLabel: 'Umsatzwachstum pro Einsatztag 2019–2024',
      headline: 'Partnerschaft mit Performance',
      subline: 'Tefal, Rowenta, Krups, WMF — Multi-Brand-Aktivierung seit 2019',
      campaignType: 'Multi-Brand Field Force & Live-Video',
      since: '2019',
      quote: 'Hier finde ich, ohne großes Excel Kung-Fu, dass was ich für die Vorbereitung von Meetings benötige, das Ganze mit wenigen Klicks und mit Exportfunktion. Das SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit.',
      author: 'Ramin Dirinpur',
      role: 'Sales Promotion & Sales Training Manager, Groupe SEB Deutschland GmbH',
      woodStats: [
        { label: 'Umsatzwachstum pro Einsatztag', value: '+130%', progress: 88 },
        { label: 'Laufzeit', value: '2019–2024', progress: 75 },
        { label: 'Marken', value: '4', progress: 60 },
      ],
      woodPills: [
        { label: 'Start', value: '2019' },
        { label: 'Marken', value: '4' },
        { label: 'Module', value: '6' },
      ],
      monthlyTrend: [38, 44, 48, 52, 58, 62, 66, 70, 74, 78, 84, 90],
      overview: 'Die Zusammenarbeit zwischen Sonic und Groupe SEB ist ein echtes Erfolgsmodell, seit 2019: Mit Vertrauen, Effizienz sowie Leidenschaft für starke Marken und zufriedene Kunden begeistern wir Kunden für Top-Marken wie Tefal, Rowenta, Krups und WMF. Ausdauer lohnt sich: Dank laufender Optimierung ist der Tagesumsatz der Promoter massiv gestiegen.',
      modules: [
        { num: '01', title: 'Live-Video-Beratung', desc: 'Aus den Sonic-Studios. Digital am POS und im Online-Shop. Für Rowenta, Tefal, Krups und WMF.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', tags: ['Live-Video', 'Studio', 'Digital'] },
        { num: '02', title: 'Aktionen', desc: 'Beispiel: verkaufsstarkes Live-Cooking am POS, betreut von unseren Foodies in der Field Force.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', tags: ['Live-Cooking', 'POS', 'Field Force'] },
        { num: '03', title: 'Roadshow', desc: 'Die rollende mehrmarkenfähige Trainings-Roadshow mit Foodtruck-Funktion: Airstream-Trailer als Showmobil.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', tags: ['Roadshow', 'Airstream', 'Mobile'] },
        { num: '04', title: 'Verkauf, POS-Pflege, Warenpräsentation', desc: 'Unsere Sales-Activation-Fachleute als Markenbotschafter, Verkäufer und Servicekräfte am POS.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', tags: ['POS-Pflege', 'Präsentation', 'Verkauf'] },
        { num: '05', title: 'Sales-Training', desc: 'Wir schulen Verkäufer der Handelsketten und unsere Field Force an unserem Campus in Krefeld sowie per Video-Webinar.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', tags: ['Training', 'Krefeld', 'Zertifizierung'] },
        { num: '06', title: 'Reporting', desc: 'Tägliche Einsatzkosten und generierte Umsätze sind tag- und standortgenau auswertbar.', img: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', tags: ['SRT', 'Analytics', 'KPI'] },
      ],
      gallery: [
        'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg',
      ],
      bentoImages: [
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', span: 'md:col-span-2 md:row-span-2', label: 'Live-Video Studio' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', span: 'md:col-span-1 md:row-span-1', label: 'Airstream Roadshow' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', span: 'md:col-span-1 md:row-span-1', label: 'Live-Cooking' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', span: 'md:col-span-2 md:row-span-1', label: 'Tägliches Reporting' },
      ],
      relatedStories: ['garmin', 'avoury'],
    },
    {
      id: 'philips',
      slug: 'philips',
      brand: 'Philips',
      woodIcon: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887',
      metric: '+54%',
      metricLabel: 'Absatzwachstum pro Einsatztag 2021–2024',
      headline: 'Erfolgreichster europäischer Markt',
      subline: 'End-to-End von Schulung über Field Force bis Digital — seit 2021',
      campaignType: 'Field Force, Training & Digital',
      since: '2021',
      quote: 'Durch das SRT können wir live in unsere Projekte mit Sonic reinschauen und jederzeit sehen, wie unsere Erwartungen erfüllt werden.',
      author: 'Murat Yatkin',
      role: 'Managing Director DACH, Philips TV & Sound @TP Vision',
      woodStats: [
        { label: 'Absatzwachstum pro Einsatztag 2021–2024', value: '+54%', progress: 82 },
        { label: 'Marktposition Europa', value: '#1', progress: 95 },
        { label: 'Aktivierungsmodule', value: '6', progress: 90 },
      ],
      woodPills: [
        { label: 'Start', value: '2021' },
        { label: 'Markt', value: '#1 EU' },
        { label: 'Module', value: '6' },
      ],
      monthlyTrend: [48, 52, 55, 58, 60, 63, 65, 68, 70, 73, 76, 82],
      overview: 'Seit 2021 unterstützen wir Philips TV & Sound beim Verkaufserfolg, End-to-End von der Schulung von Handelsmitarbeitern über den Einsatz von Field Force bis zu digitalen Projekten und Saleskampagnen. Mittels ständig optimierter Strategien stieg der Geräteabsatz je Promotiontag deutlich an, für ein spürbares Absatzplus.',
      modules: [
        { num: '01', title: 'Kampagnen', desc: '(Online-)Gewinnspiele, Zugabe-Promotions, Cashback-Aktionen: komplett umgesetzt durch Sonic.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', tags: ['Online', 'Cashback', 'Promotion'] },
        { num: '02', title: 'Promotion', desc: 'Beispiel: Saisonale Abverkaufspromotion am POS im Rahmen großer Fußballereignisse.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', tags: ['POS', 'Seasonal', 'Football'] },
        { num: '03', title: '(Sales) Content Creation', desc: 'Beispiel: TVundSound.Academy, das ist (Live) Premium-Video-Schulungs-Infotainment für Mitarbeiter des Handels.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', tags: ['Academy', 'Video', 'Retail-Training'] },
        { num: '04', title: 'Messen', desc: 'Messestände, durch uns konzipiert, gebaut, geliefert und bespielt. Im Full Service, eingebunden in die Markenwelt.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', tags: ['Messe', 'Full Service', 'Stand-Bau'] },
        { num: '05', title: 'Sales-Training', desc: 'Schulungen für Verkäufer der Handelsketten und unsere Field Force, bei uns und regional.', img: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', tags: ['Training', 'Regional', 'Zertifizierung'] },
        { num: '06', title: 'Digitaler Homeplaner', desc: 'Durch Sonic erstellt: Ein digitaler Online-3D-Raumplaner für ein Preview, wie das TV-Gerät zuhause aussehen wird.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', tags: ['Digital', '3D', 'UX'] },
      ],
      gallery: [
        'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
      ],
      bentoImages: [
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', span: 'md:col-span-2 md:row-span-2', label: 'POS Promotion' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', span: 'md:col-span-1 md:row-span-1', label: 'TVundSound Academy' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', span: 'md:col-span-1 md:row-span-1', label: 'Messen' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', span: 'md:col-span-2 md:row-span-1', label: 'Digitaler Homeplaner' },
      ],
      relatedStories: ['garmin', 'avoury'],
    },
    {
      id: 'avoury',
      slug: 'avoury',
      brand: 'Avoury',
      woodIcon: 'https://cdn.brandfetch.io/melitta.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      metric: '+1.187%',
      metricLabel: 'Umsatzwachstum pro Einsatztag 2021–2023',
      headline: 'Heißes Wachstum mit Tee',
      subline: 'Avoury One by Melitta — datenbasiertes Matching für maximalen Absatz',
      campaignType: 'Field Force, Recruiting & Datenoptimierung',
      since: '2021',
      quote: 'Dank datenbasierter Optimierungen und dem Sonic SRT konnten wir Geräteabsatz und Gesamtumsatz massiv steigern. Die Ergebnisse haben unsere Erwartungen weit übertroffen.',
      author: 'Projektteam Avoury by Melitta',
      role: 'In Zusammenarbeit mit der Sonic Group',
      woodStats: [
        { label: 'Umsatzwachstum pro Einsatztag 2021–2023', value: '+1.187%', progress: 99 },
        { label: 'Optimierungsmodule', value: '5', progress: 85 },
        { label: 'Partnerschaft seit', value: '2021', progress: 70 },
      ],
      woodPills: [
        { label: 'Start', value: '2021' },
        { label: 'Marke', value: 'Melitta' },
        { label: 'Module', value: '5' },
      ],
      monthlyTrend: [20, 30, 42, 55, 65, 72, 78, 84, 88, 92, 96, 99],
      overview: 'Seit der Einführung der Avoury One, einer Teemaschine von Melitta Single Portions, konnten erhebliche Wachstumsimpulse gesetzt werden. Die Schlüssel zum Erfolg: Das gewinnbringende Matching von Verkäufern, Einsatzorten und Einsatztagen, plus Cross-Selling. Dank datengestützter Optimierungen konnten Geräteabsatz und Gesamtumsatz massiv gesteigert werden.',
      modules: [
        { num: '01', title: 'Recruiting', desc: 'Zum Start: Zusammenstellung Field Force Team aus eigenem Pool plus aus Recruiting.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', tags: ['Recruiting', 'Talentpool', 'Matching'] },
        { num: '02', title: 'Schulungen', desc: 'Vor den Einsätzen: Schulungen der Fachberater an unserem Campus in Krefeld.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', tags: ['Campus Krefeld', 'Schulung', 'Zertifizierung'] },
        { num: '03', title: 'Sales Promotions', desc: 'Umsetzung des Field-Force-Einsatzes mit unseren Fachberatern.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', tags: ['POS', 'Fachberater', 'Sales'] },
        { num: '04', title: 'Reporting', desc: 'Dank Tracking und Logging aller Einsätze und Umsätze im Sonic Reporting Tool werden Erfolge und Potenziale sichtbar.', img: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', tags: ['SRT', 'Daten', 'KPI'] },
        { num: '05', title: 'Laufende Optimierungen', desc: 'Personalauswahl, Outlet- und Tagesauswahl, Einsatzplanung etc. wurden erfolgreich datenbasiert optimiert.', img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', tags: ['Optimierung', 'Datenbasiert', 'Matching'] },
      ],
      gallery: [
        'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg',
        'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
      ],
      bentoImages: [
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg', span: 'md:col-span-2 md:row-span-2', label: 'POS Demo' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', span: 'md:col-span-1 md:row-span-1', label: 'Schulungen Krefeld' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', span: 'md:col-span-1 md:row-span-1', label: 'Reporting & Daten' },
        { src: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', span: 'md:col-span-2 md:row-span-1', label: 'Avoury One — Melitta' },
      ],
      relatedStories: ['groupe-seb', 'philips'],
    },
  ];

  const handleBrandClick = (index: number) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    setExpandedStory(null);
    const el = document.getElementById('case-studies-carousel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReadFullStory = (slug: string) => {
    const idx = caseStudies.findIndex((s) => s.slug === slug);
    if (idx !== -1) setCurrentSlide(idx);
    setExpandedStory(slug);
    setTimeout(() => {
      if (expandedRef.current) expandedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
    setExpandedStory(null);
  };

  const handleCollapseStory = () => {
    setExpandedStory(null);
    const el = document.getElementById('case-studies-carousel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);

  const openLightbox = (items: LightboxItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const current = caseStudies[currentSlide];
  const expanded = caseStudies.find((s) => s.id === expandedStory);

  return (
    <div className="min-h-[100dvh] bg-white">

      {/* Lightbox */}
      <Lightbox
        items={lightboxItems}
        activeIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length)}
      />

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden -mt-20" style={{ minHeight: 'clamp(320px, 50vw, 440px)' }}>
        <div className="absolute inset-0">
          <img
            src="https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg"
            alt="Erfolgsgeschichten"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center h-full" style={{ minHeight: 'clamp(320px, 50vw, 440px)', paddingTop: '5rem', paddingBottom: '3rem' }}>
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-primary-500/20">
              <i className="ri-trophy-line text-xl text-primary-500"></i>
            </div>
            <span className="text-primary-500 text-xs font-black uppercase tracking-widest">Fallbeispiele</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 md:mb-5">
            ERFOLGS<span className="text-primary-500">GESCHICHTEN</span>
          </h1>
          <p className="text-2xl md:text-3xl font-black text-white/90 mb-3">Sonic performt</p>
        </div>
      </section>


      {/* ── UNIFIED SECTION: Tabs + Intro + Balanced Blade Card ── */}
      <section id="case-studies-carousel" className="relative overflow-hidden bg-white">

        {/* Brand tabs — full-bleed dark bar */}
        <div className="bg-foreground-950 border-b border-primary-500/20">
          <div className="max-w-full max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="flex items-center justify-start md:justify-center gap-3 flex-nowrap md:flex-wrap overflow-x-auto py-5 md:py-8 scrollbar-hide" role="tablist" aria-label="Fallbeispiele nach Marke">
              {caseStudies.map((study, index) => (
                <button
                  key={study.brand}
                  onClick={() => handleBrandClick(index)}
                  role="tab"
                  aria-selected={currentSlide === index}
                  aria-label={`${study.brand} — ${study.metric} ${study.metricLabel}`}
                  className={`px-6 py-2.5 font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer flex-shrink-0 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                    currentSlide === index
                      ? 'bg-primary-500 text-[#1a1a1a]'
                      : 'bg-transparent text-foreground-400 border border-white/20 hover:border-primary-500/60 hover:text-white'
                  }`}
                  title={study.brand}
                >
                  {study.brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Intro block — eyebrow + copy left, 4 stats right */}
        <div className="max-w-full max-w-[1200px] mx-auto px-6 md:px-10 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4" style={{ background: 'oklch(var(--primary-500) / 0.15)', border: '1px solid oklch(var(--primary-500) / 0.30)' }}>
                <span className="w-1.5 h-1.5" style={{ background: 'oklch(var(--primary-500))' }}></span>
                <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap text-foreground-950">Performance Marketing für Retail</span>
              </div>
              <p className="text-sm md:text-base text-foreground-700 leading-relaxed max-w-xl">
                Das bedeutet für uns, gemeinsam mit und für unsere Kunden messbare Erfolge zu erzielen. Da unsere Arbeitsweise datengetrieben ist und dadurch Optimierungen ermöglicht, werden die Erfolge in jedem weiteren Jahr der Zusammenarbeit noch größer.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
              {[
                { value: '>500', label: 'Projekte' },
                { value: '>1,35 Mio.', label: 'Einsätze' },
                { value: '>100.000', label: 'POS' },
                { value: '2007', label: 'Seit' },
              ].map((stat, i) => (
                <div key={i} className="pl-3 border-l-2 border-primary-500 min-w-0 overflow-hidden">
                  <div className="text-lg md:text-xl font-black text-foreground-950 font-sans tabular-nums leading-none whitespace-nowrap">{stat.value}</div>
                  <div className="text-xs text-foreground-600 font-bold uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Balanced Blade card */}
        <div className="max-w-full max-w-[1200px] mx-auto px-6 md:px-10 pb-14 md:pb-20">
          <div
            className="relative overflow-hidden rounded-none"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(200,212,0,0.06)' }}
          >
            {/* Wood texture — actual image, matching the Lösungen card */}
            <div className="absolute inset-0">
              {(woodTextures[0] && woodTextures[0].url) ? (
                <img
                  src={woodTextures[0].url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/50" />
            </div>

            {/* Fine grain overlay */}
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 2px, transparent 4px)' }} />

            {/* Signature blade — one wide diagonal light-blade (~18°) on the right */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-40 md:w-64 h-[120%]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(200,212,0,0.20) 50%, transparent 100%)', transform: 'rotate(-18deg)', filter: 'blur(26px)' }} />
            </div>

            <div key={current.id} className="relative z-10 p-5 md:p-8 lg:p-9" style={{ animation: 'brandFadeIn 0.3s ease-out forwards' }}>
              {/* 1. Card header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-7">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 overflow-hidden bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <img src={current.woodIcon} alt={`${current.brand} Logo`} className="w-full h-full object-contain p-1.5" loading="lazy" decoding="async" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-none">{current.brand}</h2>
                    <p className="text-primary-500 font-bold text-xs uppercase tracking-wide mt-1.5">{current.campaignType}</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-none border border-white/15 bg-white/5 px-4 py-2">
                  <i className="ri-award-line text-primary-500 text-sm"></i>
                  <span className="text-white/75 text-xs font-bold whitespace-nowrap">Partnerschaft seit {current.since} · {current.woodPills[1]?.value ?? ''}</span>
                </div>
              </div>

              {/* 2. Two-column hero row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Left — hero stat + description */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="text-6xl md:text-7xl lg:text-8xl font-black text-primary-500 font-sans tabular-nums leading-none drop-shadow-lg">{current.metric}</div>
                  <p className="text-white/75 text-sm md:text-base font-bold uppercase tracking-wide mt-3">{current.metricLabel}</p>
                  <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-md">{current.overview}</p>
                </div>

                {/* Right — chart panel */}
                <div className="lg:col-span-7 bg-black/30 border border-white/10 backdrop-blur-[2px] p-6 md:p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white/85 text-xs font-black uppercase tracking-wide">Performance-Trend</span>
                    <span className="text-primary-500 text-xs font-sans tabular-nums font-black bg-white/10 rounded-none px-3 py-1">{current.since}–{(current.metricLabel.match(/20\d{2}/g) || []).pop() || '2024'}</span>
                  </div>
                  <div className="flex-1 flex items-end gap-1.5 md:gap-2 min-h-[130px]">
                    {current.monthlyTrend.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <div className="w-full bg-gradient-to-t from-[#C8D400]/60 to-[#C8D400] transition-all duration-700" style={{ height: `${(h / 100) * 100}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                      <span key={i} className="text-white/40 flex-1 text-center text-[10px] md:text-xs">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Fact row — 3 compact tiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {current.woodPills.map((pill, idx) => (
                  <div key={idx} className="bg-black/25 border border-white/10 p-4 md:p-5 text-center">
                    <div className="text-primary-500 font-sans tabular-nums font-black text-lg md:text-2xl mb-1">{pill.value}</div>
                    <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-wide">{pill.label}</div>
                  </div>
                ))}
              </div>

              {/* 4. CTA row */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
                <button
                  onClick={() => handleReadFullStory(current.slug)}
                  className="inline-flex items-center gap-2 rounded-none bg-primary-500 text-[#1a1a1a] px-7 py-3 font-black uppercase tracking-wider hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 cursor-pointer whitespace-nowrap text-xs md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Vollständige Story
                  <i className="ri-arrow-down-line text-sm"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-none flex items-center justify-center border border-white/25 text-white hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Nächste Erfolgsgeschichte"
                >
                  <i className="ri-arrow-right-line text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPANDED STORY ── */}
      {expanded && (
        <section
          ref={expandedRef}
          className="bg-white"
          style={{ animation: 'expandIn 0.4s ease-out' }}
        >
          {/* Dark hero */}
          <div className="relative bg-[#1a1a1a] overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <img
                src="https://www.sonic-group.de/wp-content/uploads/2023/02/NEXARO01.jpg"
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
            {/* Subtle lime ambient glow */}
            <div className="absolute top-1/3 right-1/4 w-96 h-48 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-full max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col items-start">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-1.5 h-10 bg-primary-500"></div>
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                  {expanded.brand} <span className="text-primary-500">Fallstudie</span>
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-white/80 font-bold mb-6 max-w-2xl">{expanded.headline}</p>
              <div className="max-w-3xl">
                <div className="bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.06] p-5 rounded-sm">
                  <p className="text-white/65 leading-relaxed text-base">{expanded.overview}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-full max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24">

            {/* ── LEISTUNGEN IM EINSATZ ── */}
            <LeistungenImEinsatz modules={expanded.modules} brand={expanded.brand} />

            {/* Bento Grid */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary-500"></div>
                <div>
                  <p className="text-xs font-black text-foreground-400 uppercase tracking-widest mb-0.5">Bildergalerie</p>
                  <h3 className="text-xl font-black text-[#1a1a1a] uppercase tracking-wide">{expanded.brand} — Impressionen</h3>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-4 mb-14">
              {expanded.bentoImages.map((item, i) => {
                  const bentoLightboxItems: LightboxItem[] = expanded.bentoImages.map((b) => ({
                    image: b.src,
                    title: b.label,
                    category: expanded.brand,
                    description: `${b.label} — ${expanded.brand} Fallbeispiel`,
                  }));
                  return (
                    <div
                      key={i}
                      className={`relative overflow-hidden group cursor-pointer h-48 md:h-auto ${item.span}`}
                      style={{ borderRadius: 0 }}
                      onClick={() => openLightbox(bentoLightboxItems, i)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${item.label} vergrößern — ${expanded.brand} Fallbeispiel`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(bentoLightboxItems, i);
                        }
                      }}
                    >
                      <img
                        src={item.src}
                        alt={`${item.label} — ${expanded.brand} Fallbeispiel`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-400"></div>
                      {/* Expand icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary-500/85 backdrop-blur-[2px] rounded-sm">
                          <i className="ri-zoom-in-line text-white text-lg"></i>
                        </div>
                      </div>
                      {/* Label chip */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block bg-primary-500 text-white text-xs font-black px-3 py-1 uppercase tracking-wide">{item.label}</span>
                      </div>
                      {/* Lime corner accent */}
                      <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-12 transition-all duration-500"></div>
                      <div className="absolute top-0 left-0 w-0.5 h-0 bg-primary-500 group-hover:h-12 transition-all duration-500"></div>
                    </div>
                  );
                })}
              </div>

            {/* Related stories */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary-500"></div>
                <h3 className="text-xl font-black text-[#1a1a1a] uppercase tracking-wide">Weitere Erfolgsgeschichten</h3>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                {expanded.relatedStories.map((relSlug) => {
                  const rel = caseStudies.find((s) => s.id === relSlug);
                  if (!rel) return null;
                  return (
                    <div
                      key={relSlug}
                      onClick={() => handleReadFullStory(relSlug)}
                      className="flex items-start gap-5 p-6 border border-foreground-200 hover:border-primary-500 transition-all duration-300 cursor-pointer group bg-white hover:bg-[#FAFDF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 overflow-hidden"
                      style={{ borderRadius: 0 }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleReadFullStory(relSlug); }}
                    >
                      <div className="flex-shrink-0 w-28 text-left">
                        <div className="text-2xl font-black text-primary-500 font-sans tabular-nums leading-none">{rel.metric}</div>
                        <div className="text-[10px] text-foreground-500 font-bold mt-1.5 leading-snug">{rel.metricLabel}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-[#1a1a1a] group-hover:text-primary-500 transition-colors text-base mb-1">{rel.brand}</h4>
                        <p className="text-[11px] text-foreground-500 font-bold uppercase tracking-wide mb-2">{rel.campaignType}</p>
                        <p className="text-sm text-foreground-500 leading-relaxed line-clamp-2">{rel.headline} — {rel.subline}</p>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <i className="ri-arrow-right-line text-primary-500 text-xl group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inline CTA — convert impressed readers */}
            <div className="mb-10 bg-[#1a1a1a] border-2 border-primary-500/30 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-primary-500 text-xs font-black uppercase tracking-widest mb-2">{expanded.metric} {expanded.metricLabel}</p>
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                    Auch für Ihre Marke möglich?
                  </h3>
                  <p className="text-foreground-400 text-sm mt-2">
                    Lassen Sie uns besprechen, wie Sonic ähnliche Ergebnisse für Ihr Unternehmen erzielen kann.
                  </p>
                </div>
                <a
                  href="https://calendly.com/sonic-group/beratungsgespraech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-white font-black uppercase tracking-wider hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 cursor-pointer whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-calendar-line text-base"></i>
                  Beratungsgespräch buchen
                </a>
              </div>
            </div>

            {/* Next story CTA */}
            <div className="text-center pt-6 border-t border-foreground-100">
              <button
                onClick={() => {
                  const nextIdx = (caseStudies.findIndex((s) => s.id === expanded.id) + 1) % caseStudies.length;
                  setExpandedStory(null);
                  setCurrentSlide(nextIdx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => setExpandedStory(caseStudies[nextIdx].slug), 500);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white font-black uppercase tracking-wider hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
                style={{ borderRadius: 0 }}
              >
                Nächste Story
                <i className="ri-arrow-right-line text-lg"></i>
              </button>
            </div>
          </div>
        </section>
      )}

      <WoodenDivider />

      {/* ── CTA ── */}
      <section className="sonic-section-md md:bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/10 blur-3xl pointer-events-none"></div>
        <div className="max-w-full max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-primary-500 text-xs font-black uppercase tracking-widest mb-2 block">Lass uns sprechen</span>
              <h2 className="text-xl md:text-2xl font-black text-white mb-1">Deine Marke. Unser Einsatz.</h2>
              <p className="text-sm text-white/60 max-w-md">
                Wir bringen deine Marke dort zum Leuchten, wo die Kaufentscheidung fällt.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => { navigate('/'); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 300); }}
                className="px-6 py-3 bg-primary-500 text-white font-black uppercase tracking-wider text-xs hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                style={{ borderRadius: 0 }}
              >
                Gespräch buchen
              </button>
              <button
                onClick={() => navigate('/leistungen')}
                className="px-6 py-3 bg-transparent text-white font-black uppercase tracking-wider text-xs border border-white/30 hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
                style={{ borderRadius: 0 }}
              >
                Leistungen ansehen
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes expandIn { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes brandFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}