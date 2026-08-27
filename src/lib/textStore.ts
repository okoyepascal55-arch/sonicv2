export interface TextEntry {
  id: string;
  label: string;
  description: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'label' | 'cta' | 'badge' | 'stat' | 'stat-label' | 'link' | 'list-item' | 'quote' | 'caption' | 'tag' | 'nav-label' | 'footer-heading' | 'footer-link';
  value: string;
  multiline?: boolean;
}

export interface TextSection {
  key: string;
  label: string;
  pageGroupId: string;
  pagePath: string;
  description: string;
  entries: TextEntry[];
}

export const TEXT_PAGE_GROUPS = [
  { id: 'home', label: 'Home', icon: 'ri-home-line' },
  { id: 'losungen', label: 'Lösungen', icon: 'ri-lightbulb-line' },
  { id: 'leistungen', label: 'Leistungen', icon: 'ri-stack-line' },
  { id: 'about', label: 'Über uns', icon: 'ri-building-line' },
  { id: 'case_studies', label: 'Fallbeispiele', icon: 'ri-file-chart-line' },
  { id: 'blog', label: 'Blog', icon: 'ri-article-line' },
  { id: 'careers', label: 'Karriere', icon: 'ri-briefcase-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-mail-send-line' },
  { id: 'team', label: 'Team', icon: 'ri-team-line' },
  { id: 'industries', label: 'Industries', icon: 'ri-building-2-line' },
  { id: 'jobs', label: 'Jobs', icon: 'ri-briefcase-4-line' },
  { id: 'ratgeber', label: 'Ratgeber', icon: 'ri-book-open-line' },
  { id: 'srt', label: 'SRT', icon: 'ri-pie-chart-2-line' },
  { id: 'common', label: 'Common Components', icon: 'ri-puzzle-line' },
] as const;

/* ─────────────────────────────────────────────
   DEFAULT TEXT SECTIONS — verified live content
   Extracted directly from page components
───────────────────────────────────────────── */
export const DEFAULT_TEXT_SECTIONS: TextSection[] = [
  /* ════════════════════════════════════════════ HOME ════════════════════ */
  {
    key: 'home_hero', label: 'Hero — HeroRevamp Section',
    pageGroupId: 'home', pagePath: '/',
    description: 'Main hero with dynamic keyword headline, dual CTA panels, and 4 stats.',
    entries: [
      { id: 'home-hero-h1-line1', label: 'H1 Line 1', description: 'First line of H1', type: 'heading', value: 'WE HAVE A' },
      { id: 'home-hero-h1-line2', label: 'H1 Line 2', description: 'Second line of H1', type: 'heading', value: 'STRATEGIC PLAN.' },
      { id: 'home-hero-h1-line3', label: 'H1 Line 3', description: 'Third line with dynamic keyword', type: 'heading', value: "IT'S CALLED DOING" },
      { id: 'home-hero-subtitle', label: 'Subtitle', description: 'Below H1', type: 'paragraph', value: 'People powered. Data proven.' },
      { id: 'home-hero-left-badge', label: 'Left Panel Badge', description: 'Brand CTA badge text', type: 'label', value: 'Daten Liefern Fakten.' },
      { id: 'home-hero-left-h3', label: 'Left Panel H3 Line 1', description: 'Brand CTA heading', type: 'heading', value: 'SUCHST DU EINE' },
      { id: 'home-hero-left-h3-accent', label: 'Left Panel H3 Accent', description: 'Brand CTA accent word', type: 'heading', value: 'AGENTUR' },
      { id: 'home-hero-left-h3-line3', label: 'Left Panel H3 Line 3', description: 'Brand CTA ending', type: 'heading', value: 'MIT POWER?' },
      { id: 'home-hero-left-desc', label: 'Left Panel Description', description: 'Brand CTA description', type: 'paragraph', value: 'Dein Full-Service-Partner für Performance Marketing, Retail-Aktivierung und nachhaltiges Markenwachstum.' },
      { id: 'home-hero-left-btn', label: 'Left Panel Button', description: 'Brand CTA button', type: 'cta', value: 'Starte deinen Markteintritt' },
      { id: 'home-hero-right-badge', label: 'Right Panel Badge', description: 'Talent CTA badge', type: 'label', value: 'Mensch. Der Unterschied.' },
      { id: 'home-hero-right-h3', label: 'Right Panel H3 Line 1', description: 'Talent CTA heading', type: 'heading', value: 'SUCHST DU EINEN' },
      { id: 'home-hero-right-h3-accent', label: 'Right Panel H3 Accent', description: 'Talent CTA accent word', type: 'heading', value: 'JOB' },
      { id: 'home-hero-right-h3-line3', label: 'Right Panel H3 Line 3', description: 'Talent CTA ending', type: 'heading', value: 'MIT ENERGIE?' },
      { id: 'home-hero-right-desc', label: 'Right Panel Description', description: 'Talent CTA description', type: 'paragraph', value: 'Arbeite für die größten Marken Deutschlands — und mach sie noch erfolgreicher.' },
      { id: 'home-hero-right-btn', label: 'Right Panel Button', description: 'Talent CTA button', type: 'cta', value: 'Komm zu Sonic' },
      { id: 'home-hero-stat-1-label', label: 'Stat 1 Label', description: 'Produkte verkauft', type: 'stat-label', value: 'Produkte verkauft' },
      { id: 'home-hero-stat-2-label', label: 'Stat 2 Label', description: 'Umsatz generiert', type: 'stat-label', value: 'Umsatz generiert' },
      { id: 'home-hero-stat-3-label', label: 'Stat 3 Label', description: 'Einsätze', type: 'stat-label', value: 'Einsätze' },
      { id: 'home-hero-stat-4-label', label: 'Stat 4 Label', description: 'Live Video Calls', type: 'stat-label', value: '1:1 Live Video Calls' },
    ],
  },
  {
    key: 'home_truststrip', label: 'TrustStrip — Brand Logos Bar',
    pageGroupId: 'home', pagePath: '/',
    description: 'The Industry Leaders badge and 12 brand logo grid.',
    entries: [
      { id: 'home-trust-badge', label: 'Trust Badge', description: 'Industry Leaders badge', type: 'badge', value: 'Industry Leaders' },
    ],
  },
  {
    key: 'home_brandintro', label: 'BrandIntro — Introduction Section',
    pageGroupId: 'home', pagePath: '/',
    description: 'Brand intro with slideshow — MARKEN IM HERZEN.',
    entries: [
      { id: 'home-intro-heading', label: 'Main Heading', description: 'Section H2', type: 'heading', value: 'MARKEN IM HERZEN.' },
      { id: 'home-intro-heading-2', label: 'Heading Line 2', description: 'Second H2 line', type: 'heading', value: 'ERFOLG IM FOKUS.' },
      { id: 'home-intro-p1', label: 'Paragraph 1', description: 'First intro paragraph', type: 'paragraph', value: 'Wir sind eine unabhängige Marketing- und Sales-Agentur mit Schwerpunkten rund um die Konzeption, Kreation und Koordination von Kundenprojekten – ob am Point of Sale, im Studio, auf Messen oder Events in den Bereichen B2B, B2B2C und D2C. Seit 2007 leben wir Marken und machen sie erfolgreich – unabhängig von Größe, Branche und Zielgruppe. Dabei arbeiten wir stets geprägt von den Werten Mensch, Motivation, Daten und Werkzeug. Wir glauben daran, dass der Mensch den Unterschied macht, und leben eine familiäre, persönliche Firmenkultur.', multiline: true },
      { id: 'home-intro-p2', label: 'Paragraph 2', description: 'Second intro paragraph', type: 'paragraph', value: 'Unsere Strategie: Ärmel hoch und anpacken! Echtes Handwerk – von Anfang bis Ende mit 100 % Leidenschaft und vollem Einsatz für die Ziele unserer Kunden. Mit Partnern wie Philips, Rowenta, Krups, Nexaro, Vorwerk, Canon, Garmin oder L\'Oréal. Mit der Erfahrung aus über 500 Projekten, 650.000 Manntagen und mehr als 100.000 Umsetzungen am POS. Mit einem Team aus Experten aller Bereiche – und mit dem Erfolg deiner Marke jederzeit im Fokus.', multiline: true },
    ],
  },
  {
    key: 'home_showcase', label: 'Showcase — Service Tab Switcher',
    pageGroupId: 'home', pagePath: '/',
    description: '5-service showcase with tab switcher and metric cards.',
    entries: [
      { id: 'home-showcase-badge', label: 'Section Badge', description: 'Our Services badge', type: 'badge', value: 'Our Services' },
      { id: 'home-showcase-heading', label: 'Main Heading', description: 'Section H2', type: 'heading', value: 'LASSEN WIR TATEN SPRECHEN' },
      { id: 'home-showcase-subtitle', label: 'Subtitle', description: 'Section subtitle', type: 'paragraph', value: 'Ein Einblick in das, was rauskommt, wenn du bei uns reinschaust' },
      { id: 'home-showcase-tab-1', label: 'Tab — Staff', description: 'Staff tab', type: 'label', value: 'Staff' },
      { id: 'home-showcase-tab-1-title', label: 'Staff Title', description: 'Staff full title', type: 'heading', value: 'STAFF SERVICE' },
      { id: 'home-showcase-tab-1-desc', label: 'Staff Description', description: 'Staff description', type: 'paragraph', value: 'Rundum-Service beim Personal. Beim Personal für deine Aktivitäten übernehmen wir den kompletten Service: Wir suchen die passenden Leute aus, koordinieren die Teams und schicken sie ins Feld.' },
      { id: 'home-showcase-tab-1-detail', label: 'Staff Detail', description: 'Staff detail text', type: 'paragraph', value: 'Dein Personal steht noch nicht einmal auf deinem Payroll, das übernehmen wir. So hast du jederzeit volle Kostenkontrolle und volle Flexibilität.' },
      { id: 'home-showcase-tab-2', label: 'Tab — POS', description: 'POS tab', type: 'label', value: 'POS' },
      { id: 'home-showcase-tab-2-title', label: 'POS Title', description: 'POS full title', type: 'heading', value: 'POINT OF SALE' },
      { id: 'home-showcase-tab-2-desc', label: 'POS Description', description: 'POS description', type: 'paragraph', value: 'POS: Immer auf den Punkt. Egal, ob du einen Wobbler fürs Regal, interaktive Displays oder einen ganzen Shop im Shop benötigst.' },
      { id: 'home-showcase-tab-2-detail', label: 'POS Detail', description: 'POS detail text', type: 'paragraph', value: 'Wir übernehmen die komplette Abwicklung von Kreation über Produktion und Organisation bis hin zur Pflege und Logistik. Jedes Detail wird von uns sorgfältig geplant und umgesetzt.' },
      { id: 'home-showcase-tab-3', label: 'Tab — SRT', description: 'SRT tab', type: 'label', value: 'SRT' },
      { id: 'home-showcase-tab-3-title', label: 'SRT Title', description: 'SRT full title', type: 'heading', value: 'SONIC REPORTING TOOL' },
      { id: 'home-showcase-tab-3-desc', label: 'SRT Description', description: 'SRT description', type: 'paragraph', value: 'Wir sind „Lower Funnel". Mit der SRT ermöglichen wir ein Live-Zugriff auf die Daten unserer Performance.' },
      { id: 'home-showcase-tab-3-detail', label: 'SRT Detail', description: 'SRT detail text', type: 'paragraph', value: 'Ob tägliche, wöchentliche oder monatliche Auswertungen, wir liefern Handlungsempfehlungen basierend auf Echtzeit-Daten.' },
      { id: 'home-showcase-tab-4', label: 'Tab — LVP', description: 'LVP tab', type: 'label', value: 'LVP' },
      { id: 'home-showcase-tab-4-title', label: 'LVP Title', description: 'LVP full title', type: 'heading', value: 'LIVE VIDEO SERVICE' },
      { id: 'home-showcase-tab-4-desc', label: 'LVP Description', description: 'LVP description', type: 'paragraph', value: 'Über den Tellerrand hinausschauen. Genau das machen wir. Warum sich ausschließlich auf den stationären Verkauf konzentrieren?' },
      { id: 'home-showcase-tab-4-detail', label: 'LVP Detail', description: 'LVP detail text', type: 'paragraph', value: 'Daher haben wir unseren Live Video Service ins Leben gerufen - die Brücke zwischen physischem und digitalem Retail.' },
      { id: 'home-showcase-tab-5', label: 'Tab — Events', description: 'Events tab', type: 'label', value: 'Events' },
      { id: 'home-showcase-tab-5-title', label: 'Events Title', description: 'Events full title', type: 'heading', value: 'MESSE & EVENT' },
      { id: 'home-showcase-tab-5-desc', label: 'Events Description', description: 'Events description', type: 'paragraph', value: 'Nach dem Event ist vor dem Event. Bei Events und Messen zählt jede Gelegenheit, um sich zu präsentieren.' },
      { id: 'home-showcase-tab-5-detail', label: 'Events Detail', description: 'Events detail text', type: 'paragraph', value: 'Wir verstehen das und setzen alles daran, dass dein Stand oder Event eine echte Erfolgsgeschichte wird.' },
      { id: 'home-showcase-learn-more', label: 'Learn More Button', description: 'Learn More CTA on each service', type: 'cta', value: 'Learn More' },
      { id: 'home-showcase-metric-1-title', label: 'Key Metric Card — Expert Talent', description: 'Expert Talent card heading', type: 'heading', value: 'Expert Talent Network' },
      { id: 'home-showcase-metric-1-desc', label: 'Key Metric Card — Expert Talent Desc', description: 'Expert Talent card text', type: 'paragraph', value: '20,000+ trained promoters ready to represent your brand' },
      { id: 'home-showcase-metric-2-title', label: 'Key Metric Card — Coverage', description: 'Coverage card heading', type: 'heading', value: 'Nationwide Coverage' },
      { id: 'home-showcase-metric-2-desc', label: 'Key Metric Card — Coverage Desc', description: 'Coverage card text', type: 'paragraph', value: 'Seamless execution across all major retail channels in DACH' },
      { id: 'home-showcase-metric-3-title', label: 'Key Metric Card — Results', description: 'Results card heading', type: 'heading', value: 'Proven Results' },
      { id: 'home-showcase-metric-3-desc', label: 'Key Metric Card — Results Desc', description: 'Results card text', type: 'paragraph', value: '€2.19B in sales generated for our brand partners' },
    ],
  },
  {
    key: 'home_services_grid', label: 'ServicesGrid — Leistungen Overview',
    pageGroupId: 'home', pagePath: '/',
    description: 'The grid of service cards on the home page.',
    entries: [
      { id: 'home-services-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Leistungen' },
      { id: 'home-services-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Unsere Leistungen im Überblick' },
      { id: 'home-services-card-1', label: 'Card 1 — Events', description: 'Events card', type: 'heading', value: 'Events & Messen' },
      { id: 'home-services-card-1-desc', label: 'Card 1 Description', description: 'Events description', type: 'paragraph', value: 'Von der Konzeption bis zur Durchführung: Wir machen deine Marke auf Messen und Events erlebbar.' },
      { id: 'home-services-card-2', label: 'Card 2 — Content', description: 'Content card', type: 'heading', value: 'Content' },
      { id: 'home-services-card-2-desc', label: 'Card 2 Description', description: 'Content description', type: 'paragraph', value: 'Premium Content Creation: Foto, Video und CGI aus unserem eigenen Studio.' },
      { id: 'home-services-card-3', label: 'Card 3 — Schulungen', description: 'Schulungen card', type: 'heading', value: 'Schulungen' },
      { id: 'home-services-card-3-desc', label: 'Card 3 Description', description: 'Schulungen description', type: 'paragraph', value: 'Produktschulungen, Verkaufstrainings und Coaching für dein Team.' },
      { id: 'home-services-card-4', label: 'Card 4 — POS', description: 'POS card', type: 'heading', value: 'Point of Sale' },
      { id: 'home-services-card-4-desc', label: 'Card 4 Description', description: 'POS description', type: 'paragraph', value: 'POS-Materialien, Shop-in-Shop Systeme und Verkaufsflächen-Management.' },
      { id: 'home-services-card-5', label: 'Card 5 — Studios', description: 'Studios card', type: 'heading', value: 'Unsere Studios' },
      { id: 'home-services-card-5-desc', label: 'Card 5 Description', description: 'Studios description', type: 'paragraph', value: 'Moderne Video- und Foto-Studios für Live-Beratung und Content-Produktion.' },
    ],
  },
  {
    key: 'home_sonicdna', label: 'SonicDNA — Values Section',
    pageGroupId: 'home', pagePath: '/',
    description: 'The DNA/values section with 4 core value cards.',
    entries: [
      { id: 'home-dna-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Sonic DNA' },
      { id: 'home-dna-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Was Sonic besonders macht' },
      { id: 'home-dna-card-1', label: 'Card 1 — Phygital', description: 'Phygital Pioneers', type: 'heading', value: 'Phygital Pioneers' },
      { id: 'home-dna-card-1-desc', label: 'Card 1 Description', description: 'Phygital description', type: 'paragraph', value: 'Wir verbinden die physische und digitale Welt — für nahtlose Kundenerlebnisse an jedem Touchpoint.' },
      { id: 'home-dna-card-2', label: 'Card 2 — Creative', description: 'Creative Execution', type: 'heading', value: 'Creative Execution' },
      { id: 'home-dna-card-2-desc', label: 'Card 2 Description', description: 'Creative description', type: 'paragraph', value: 'Kreative Exzellenz trifft operative Präzision — von der ersten Idee bis zur letzten Sekunde am POS.' },
      { id: 'home-dna-card-3', label: 'Card 3 — Data', description: 'Data-Driven Results', type: 'heading', value: 'Data-Driven Results' },
      { id: 'home-dna-card-3-desc', label: 'Card 3 Description', description: 'Data description', type: 'paragraph', value: 'Jede Entscheidung basiert auf Echtzeit-Daten — für messbare Performance und kontinuierliche Optimierung.' },
      { id: 'home-dna-card-4', label: 'Card 4 — Market', description: 'Market Expertise', type: 'heading', value: 'Market Expertise' },
      { id: 'home-dna-card-4-desc', label: 'Card 4 Description', description: 'Market description', type: 'paragraph', value: '18 Jahre Erfahrung, über 300 aktive Projekte und tiefe Kenntnis jedes relevanten Handelskanals.' },
    ],
  },
  {
    key: 'home_clientsuccess', label: 'ClientSuccess — Brand Results',
    pageGroupId: 'home', pagePath: '/',
    description: 'The brand-specific success metrics section.',
    entries: [
      { id: 'home-clientsuccess-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Client Success' },
      { id: 'home-clientsuccess-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Was unsere Kunden erreicht haben' },
    ],
  },
  {
    key: 'home_philosophy', label: 'PhilosophySection — Mission & Approach',
    pageGroupId: 'home', pagePath: '/',
    description: 'The philosophy/mission section with core principles.',
    entries: [
      { id: 'home-phil-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Philosophie' },
      { id: 'home-phil-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Unsere Philosophie' },
      { id: 'home-phil-principle-1', label: 'Principle 1 — Mensch', description: 'Human-first principle', type: 'heading', value: 'Der Mensch im Mittelpunkt' },
      { id: 'home-phil-principle-1-desc', label: 'Principle 1 Description', description: 'Human-first description', type: 'paragraph', value: 'Technologie ist unser Werkzeug, aber der Mensch macht den Unterschied. Wir setzen auf Empathie, Begeisterung und echte Verbindungen.' },
      { id: 'home-phil-principle-2', label: 'Principle 2 — Antrieb', description: 'Drive principle', type: 'heading', value: 'Immer in Bewegung' },
      { id: 'home-phil-principle-2-desc', label: 'Principle 2 Description', description: 'Drive description', type: 'paragraph', value: 'Stillstand ist Rückschritt. Wir denken voraus, hinterfragen Routinen und entwickeln uns jeden Tag weiter.' },
      { id: 'home-phil-principle-3', label: 'Principle 3 — Daten', description: 'Data principle', type: 'heading', value: 'Daten als Kompass' },
      { id: 'home-phil-principle-3-desc', label: 'Principle 3 Description', description: 'Data description', type: 'paragraph', value: 'Jede Entscheidung basiert auf validen Daten — nicht auf Bauchgefühl. Das macht unsere Arbeit messbar und nachhaltig erfolgreich.' },
      { id: 'home-phil-principle-4', label: 'Principle 4 — Werkzeug', description: 'Tools principle', type: 'heading', value: 'Das richtige Werkzeug' },
      { id: 'home-phil-principle-4-desc', label: 'Principle 4 Description', description: 'Tools description', type: 'paragraph', value: 'Von eigener Software bis zu modernsten Studios — wir investieren in die beste Infrastruktur für unsere Kunden.' },
    ],
  },
  {
    key: 'home_challenge', label: 'ChallengeSection — 3 Solution Paths',
    pageGroupId: 'home', pagePath: '/',
    description: 'The 3-path challenge/solution section.',
    entries: [
      { id: 'home-challenge-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Deine Challenge' },
      { id: 'home-challenge-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Drei Wege. Ein Partner.' },
      { id: 'home-challenge-path-1', label: 'Path 1 — Markteintritt', description: 'Market entry path title', type: 'heading', value: 'Markteintritt' },
      { id: 'home-challenge-path-1-desc', label: 'Path 1 Description', description: 'Market entry description', type: 'paragraph', value: 'Deine Marke kommt neu in den DACH-Raum? Wir bringen dich mit der richtigen Strategie und den besten Leuten in die Fläche.' },
      { id: 'home-challenge-path-2', label: 'Path 2 — Absatz steigern', description: 'Sales growth path', type: 'heading', value: 'Absatz steigern' },
      { id: 'home-challenge-path-2-desc', label: 'Path 2 Description', description: 'Sales growth description', type: 'paragraph', value: 'Deine Sales-Performance stagniert? Mit datenbasierter Planung und operativer Exzellenz heben wir deine Zahlen auf das nächste Level.' },
      { id: 'home-challenge-path-3', label: 'Path 3 — Omnichannel', description: 'Omnichannel path', type: 'heading', value: 'Omnichannel' },
      { id: 'home-challenge-path-3-desc', label: 'Path 3 Description', description: 'Omnichannel description', type: 'paragraph', value: 'Online und offline verschmelzen? Wir bauen die Brücke — mit Live-Video, QR-Codes und nahtlosen Customer Journeys.' },
    ],
  },
  {
    key: 'home_dualcta', label: 'DualCTA — Bottom CTA Split',
    pageGroupId: 'home', pagePath: '/',
    description: 'The split CTA section at page bottom.',
    entries: [
      { id: 'home-dualcta-left', label: 'Left Panel — Brands', description: 'Brands CTA heading', type: 'cta', value: 'Für Marken' },
      { id: 'home-dualcta-left-desc', label: 'Left Panel Description', description: 'Brands CTA description', type: 'paragraph', value: 'Bereit für mehr Sales? Lass uns gemeinsam deine Vertriebsstrategie auf das nächste Level heben.' },
      { id: 'home-dualcta-left-btn', label: 'Left Panel Button', description: 'Brands CTA button', type: 'cta', value: 'Jetzt Beratung anfragen' },
      { id: 'home-dualcta-right', label: 'Right Panel — Talent', description: 'Talent CTA heading', type: 'cta', value: 'Für Talente' },
      { id: 'home-dualcta-right-desc', label: 'Right Panel Description', description: 'Talent CTA description', type: 'paragraph', value: 'Werde Teil der Sonic Family! Entdecke spannende Karrieremöglichkeiten in einem dynamischen Umfeld.' },
      { id: 'home-dualcta-right-btn', label: 'Right Panel Button', description: 'Talent CTA button', type: 'cta', value: 'Karriere entdecken' },
    ],
  },

  /* ════════════════════════════════════════════ COMMON ════════════════════ */
  {
    key: 'common_navigation', label: 'Navigation — Main Nav Bar',
    pageGroupId: 'common', pagePath: '(all pages)',
    description: 'Main site navigation bar — all nav labels, dropdowns, and CTAs. Verified from Navigation.tsx.',
    entries: [
      { id: 'nav-home', label: 'Nav — Home', description: 'Home link', type: 'nav-label', value: 'Home' },
      { id: 'nav-loesungen', label: 'Nav — Lösungen', description: 'Lösungen link', type: 'nav-label', value: 'Lösungen' },
      { id: 'nav-leistungen', label: 'Nav — Leistungen', description: 'Leistungen dropdown trigger', type: 'nav-label', value: 'Leistungen' },
      { id: 'nav-leistungen-all', label: 'Nav — Alle Leistungen', description: 'All services overview link', type: 'nav-label', value: 'Alle Leistungen' },
      { id: 'nav-cat-pos', label: 'Nav — Category: AM POS VERKAUFEN', description: 'Category header', type: 'tag', value: 'AM POS VERKAUFEN' },
      { id: 'nav-pos', label: 'Nav — POS Full Service', description: 'POS link', type: 'nav-label', value: 'POS Full Service' },
      { id: 'nav-lvp', label: 'Nav — Live Video Promotion', description: 'LVP link', type: 'nav-label', value: 'Live Video Promotion' },
      { id: 'nav-events', label: 'Nav — Events & Messen', description: 'Events link', type: 'nav-label', value: 'Events & Messen' },
      { id: 'nav-cat-team', label: 'Nav — Category: TEAM AUFBAUEN', description: 'Category header', type: 'tag', value: 'TEAM AUFBAUEN' },
      { id: 'nav-staff', label: 'Nav — Staff as a Service', description: 'Staff link', type: 'nav-label', value: 'Staff as a Service' },
      { id: 'nav-talentpool', label: 'Nav — Talentepool', description: 'Talentpool link', type: 'nav-label', value: 'Talentepool' },
      { id: 'nav-warehouse', label: 'Nav — Warehouse & Logistik', description: 'Warehouse link', type: 'nav-label', value: 'Warehouse & Logistik' },
      { id: 'nav-cat-data', label: 'Nav — Category: DATEN & INSIGHTS', description: 'Category header', type: 'tag', value: 'DATEN & INSIGHTS' },
      { id: 'nav-srt', label: 'Nav — SRT', description: 'SRT link', type: 'nav-label', value: 'SRT — Sonic Reporting Tool' },
      { id: 'nav-forecasting', label: 'Nav — Forecasting', description: 'Forecasting link', type: 'nav-label', value: 'Forecasting' },
      { id: 'nav-cat-brand', label: 'Nav — Category: MARKE AUFBAUEN', description: 'Category header', type: 'tag', value: 'MARKE AUFBAUEN' },
      { id: 'nav-kreation', label: 'Nav — Kreation & Content', description: 'Kreation link', type: 'nav-label', value: 'Kreation & Content' },
      { id: 'nav-about', label: 'Nav — Über uns', description: 'About dropdown trigger', type: 'nav-label', value: 'Über uns' },
      { id: 'nav-about-cat', label: 'Nav — About category label', description: 'About dropdown category', type: 'tag', value: 'Über Sonic' },
      { id: 'nav-about-about', label: 'Nav — Über uns page', description: 'About page link', type: 'nav-label', value: 'Über uns' },
      { id: 'nav-about-reels', label: 'Nav — Sonic Reels', description: 'Reels link', type: 'nav-label', value: 'Sonic Reels' },
      { id: 'nav-cases', label: 'Nav — Fallbeispiele', description: 'Case studies link', type: 'nav-label', value: 'Fallbeispiele' },
      { id: 'nav-blog', label: 'Nav — Blog', description: 'Blog link', type: 'nav-label', value: 'Blog' },
      { id: 'nav-careers', label: 'Nav — Karriere', description: 'Careers link', type: 'nav-label', value: 'Karriere' },
      { id: 'nav-contact', label: 'Nav — Kontakt Button', description: 'Contact CTA button', type: 'cta', value: 'Kontakt' },
      { id: 'nav-phone', label: 'Nav — Phone', description: 'Phone number in mobile menu', type: 'label', value: '+49 2151 479 444 0' },
    ],
  },
  {
    key: 'common_footer', label: 'Footer — Site Footer',
    pageGroupId: 'common', pagePath: '(all pages)',
    description: 'Footer with brand info, link columns, and legal. Verified from Footer.tsx.',
    entries: [
      { id: 'footer-company', label: 'Company Name', description: 'Company name', type: 'label', value: 'Sonic Sales Support GmbH' },
      { id: 'footer-address', label: 'Address', description: 'Full address', type: 'label', value: 'Campus Fichtenhain 46' },
      { id: 'footer-city', label: 'City', description: 'City line', type: 'label', value: '47807 Krefeld, Germany' },
      { id: 'footer-phone', label: 'Phone', description: 'Phone number', type: 'label', value: '+49 2151 479 444 0' },
      { id: 'footer-email', label: 'Email', description: 'Email address', type: 'label', value: 'info@sonic-group.de' },
      { id: 'footer-sales-badge', label: 'Sales Badge', description: 'Sales badge text', type: 'label', value: 'Part of €2B+ in influenced sales' },
      { id: 'footer-col-leistungen', label: 'Column — Leistungen Heading', description: 'Footer column heading', type: 'footer-heading', value: '— Leistungen' },
      { id: 'footer-link-staff', label: 'Footer Link — Staff as a Service', description: 'Staff link', type: 'footer-link', value: 'Staff as a Service' },
      { id: 'footer-link-pos', label: 'Footer Link — POS Full Service', description: 'POS link', type: 'footer-link', value: 'POS Full Service' },
      { id: 'footer-link-events', label: 'Footer Link — Events & Messen', description: 'Events link', type: 'footer-link', value: 'Events & Messen' },
      { id: 'footer-link-kreation', label: 'Footer Link — Kreation & Content', description: 'Kreation link', type: 'footer-link', value: 'Kreation & Content' },
      { id: 'footer-link-warehouse', label: 'Footer Link — Warehouse & Logistik', description: 'Warehouse link', type: 'footer-link', value: 'Warehouse & Logistik' },
      { id: 'footer-link-srt', label: 'Footer Link — SRT Technologie', description: 'SRT link', type: 'footer-link', value: 'SRT Technologie' },
      { id: 'footer-link-lvp', label: 'Footer Link — Live Video Promotion', description: 'LVP link', type: 'footer-link', value: 'Live Video Promotion' },
      { id: 'footer-col-company', label: 'Column — Unternehmen Heading', description: 'Footer column heading', type: 'footer-heading', value: '— Unternehmen' },
      { id: 'footer-link-about', label: 'Footer Link — Über uns', description: 'About link', type: 'footer-link', value: 'Über uns' },
      { id: 'footer-link-careers', label: 'Footer Link — Karriere', description: 'Careers link', type: 'footer-link', value: 'Karriere' },
      { id: 'footer-link-sales-jobs', label: 'Footer Link — Sonic Sales Jobs', description: 'Sales jobs link', type: 'footer-link', value: 'Sonic Sales – Jobs' },
      { id: 'footer-link-staff-jobs', label: 'Footer Link — Sonic Staff Jobs', description: 'Staff jobs link', type: 'footer-link', value: 'Sonic Staff – Jobs' },
      { id: 'footer-link-cases', label: 'Footer Link — Fallbeispiele', description: 'Cases link', type: 'footer-link', value: 'Fallbeispiele' },
      { id: 'footer-link-reels', label: 'Footer Link — Sonic Reels', description: 'Reels link', type: 'footer-link', value: 'Sonic Reels' },
      { id: 'footer-link-ratgeber', label: 'Footer Link — Ratgeber', description: 'Ratgeber link', type: 'footer-link', value: 'Ratgeber' },
      { id: 'footer-col-legal', label: 'Column — Rechtliches Heading', description: 'Footer column heading', type: 'footer-heading', value: '— Rechtliches' },
      { id: 'footer-link-kontakt', label: 'Footer Link — Kontakt', description: 'Kontakt link', type: 'footer-link', value: 'Kontakt' },
      { id: 'footer-link-impressum', label: 'Footer Link — Impressum', description: 'Impressum link', type: 'footer-link', value: 'Impressum' },
      { id: 'footer-link-datenschutz', label: 'Footer Link — Datenschutz', description: 'Datenschutz link', type: 'footer-link', value: 'Datenschutz' },
      { id: 'footer-link-admin', label: 'Footer Link — Admin', description: 'Admin link', type: 'footer-link', value: 'Admin' },
      { id: 'footer-copyright', label: 'Copyright', description: 'Copyright text', type: 'label', value: '© {year} Sonic Sales Support GmbH. Alle Rechte vorbehalten.' },
      { id: 'footer-builtby', label: 'Built By', description: 'Built by attribution', type: 'label', value: 'Built by Reezan Digital' },
      { id: 'footer-iso', label: 'ISO Badge', description: 'ISO certification badge', type: 'label', value: 'ISO Certified' },
      { id: 'footer-gdpr', label: 'GDPR Badge', description: 'GDPR compliance badge', type: 'label', value: 'GDPR Compliant' },
    ],
  },

  /* ════════════════════════════════════════════ ABOUT ════════════════════ */
  {
    key: 'about_hero', label: 'About Hero — Header Section',
    pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'The about page hero. Verified from about/page.tsx.',
    entries: [
      { id: 'about-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Über Sonic' },
      { id: 'about-hero-h1', label: 'H1 Line 1', description: 'Hero H1', type: 'heading', value: 'MARKEN IM HERZEN.' },
      { id: 'about-hero-h1-line2', label: 'H1 Line 2', description: 'Hero H1 line 2', type: 'heading', value: 'ERFOLG IM FOKUS.' },
      { id: 'about-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Unabhängige Marketing- und Sales-Agentur — von Konzeption bis Koordination, am POS, im Studio, auf Messen und Events. Seit 2007 mit vollem Einsatz für deine Marke.' },
      { id: 'about-hero-scroll-label', label: 'Scroll Label', description: 'Scroll down label', type: 'label', value: 'Unsere Geschichte' },
    ],
  },
  {
    key: 'about_values', label: 'ValuesVisual — Impact Numbers',
    pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'The key numbers section.',
    entries: [
      { id: 'about-stat-1-value', label: 'Stat — Projekte', description: 'Projects count', type: 'stat', value: '500+' },
      { id: 'about-stat-1-label', label: 'Stat Label — Projekte', description: 'Projects label', type: 'stat-label', value: 'Projekte' },
      { id: 'about-stat-2-value', label: 'Stat — Manntage', description: 'Manntage', type: 'stat', value: '650.000+' },
      { id: 'about-stat-2-label', label: 'Stat Label — Manntage', description: 'Manntage label', type: 'stat-label', value: 'Manntage' },
      { id: 'about-stat-3-value', label: 'Stat — Umsetzungen', description: 'POS Implementations', type: 'stat', value: '100.000+' },
      { id: 'about-stat-3-label', label: 'Stat Label — Umsetzungen', description: 'POS label', type: 'stat-label', value: 'POS-Umsetzungen' },
      { id: 'about-stat-4-value', label: 'Stat — Marken', description: 'Brands served', type: 'stat', value: '50+' },
      { id: 'about-stat-4-label', label: 'Stat Label — Marken', description: 'Brands label', type: 'stat-label', value: 'Marken betreut' },
    ],
  },

  /* ════════════════════════════════════════════ KONTAKT ════════════════════ */
  {
    key: 'kontakt_page', label: 'Kontakt — Contact Page',
    pageGroupId: 'kontakt', pagePath: '/kontakt',
    description: 'The contact page hero and details. Verified from kontakt/page.tsx.',
    entries: [
      { id: 'kontakt-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Kein Commitment. Nur ein gutes Gespräch.' },
      { id: 'kontakt-hero-h1', label: 'H1 Line 1', description: 'Hero H1', type: 'heading', value: 'LASS UNS' },
      { id: 'kontakt-hero-h1-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'REDEN.' },
      { id: 'kontakt-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Ob Produktlaunch, Markteintritt im DACH-Raum oder Retail-Activation — wir hören zu und liefern Lösungen. Schreib uns oder ruf direkt an.' },
      { id: 'kontakt-detail-address-label', label: 'Detail — Adresse Label', description: 'Address label', type: 'label', value: 'Adresse' },
      { id: 'kontakt-detail-address', label: 'Detail — Adresse', description: 'Full address', type: 'label', value: 'Campus Fichtenhain 46\n47807 Krefeld, Deutschland' },
      { id: 'kontakt-detail-phone-label', label: 'Detail — Telefon Label', description: 'Phone label', type: 'label', value: 'Telefon' },
      { id: 'kontakt-detail-phone', label: 'Detail — Telefon', description: 'Phone number', type: 'label', value: '+49 2151 479 444 0' },
      { id: 'kontakt-detail-email-label', label: 'Detail — E-Mail Label', description: 'Email label', type: 'label', value: 'E-Mail' },
      { id: 'kontakt-detail-email', label: 'Detail — E-Mail', description: 'Email address', type: 'label', value: 'info@sonic-group.de' },
      { id: 'kontakt-detail-hours-label', label: 'Detail — Erreichbarkeit Label', description: 'Hours label', type: 'label', value: 'Erreichbarkeit' },
      { id: 'kontakt-detail-hours', label: 'Detail — Erreichbarkeit', description: 'Hours', type: 'label', value: 'Mo–Fr: 09:00–17:00 Uhr' },
      { id: 'kontakt-calendly-label', label: 'Calendly Label', description: 'Calendly section heading', type: 'label', value: 'Direkt Termin wählen' },
      { id: 'kontakt-calendly-sub', label: 'Calendly Sub', description: 'Calendly subtext', type: 'label', value: 'Kostenlos · Unverbindlich · 30 Minuten' },
      { id: 'kontakt-stat-response', label: 'Stat — Response Time', description: 'Response time', type: 'stat', value: '< 24h' },
      { id: 'kontakt-stat-response-label', label: 'Stat Label — Response Time', description: 'Response label', type: 'stat-label', value: 'Antwortzeit' },
      { id: 'kontakt-stat-experience', label: 'Stat — Experience', description: 'Experience', type: 'stat', value: '20+' },
      { id: 'kontakt-stat-experience-label', label: 'Stat Label — Experience', description: 'Experience label', type: 'stat-label', value: 'Jahre Erfahrung' },
      { id: 'kontakt-stat-clients', label: 'Stat — Clients', description: 'Clients', type: 'stat', value: '100+' },
      { id: 'kontakt-stat-clients-label', label: 'Stat Label — Clients', description: 'Clients label', type: 'stat-label', value: 'Kunden' },
      { id: 'kontakt-office-h3', label: 'Office H3', description: 'Office section heading', type: 'heading', value: 'Sonic Group' },
      { id: 'kontakt-office-address', label: 'Office Address', description: 'Office full address', type: 'label', value: 'Campus Fichtenhain 46\n47807 Krefeld, Deutschland' },
      { id: 'kontakt-office-route', label: 'Route Button', description: 'Route button', type: 'cta', value: 'Route planen' },
      { id: 'kontakt-office-call', label: 'Call Button', description: 'Call button', type: 'cta', value: 'Anrufen' },
    ],
  },

  /* ════════════════════════════════════════════ SRT ════════════════════ */
  {
    key: 'srt_hero', label: 'SRT Hero — Header Section',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The SRT product page hero. Verified from SRTHero.tsx.',
    entries: [
      { id: 'srt-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Sonic-eigene Software' },
      { id: 'srt-hero-h1-1', label: 'H1 — SONIC', description: 'H1 first word', type: 'heading', value: 'SONIC' },
      { id: 'srt-hero-h1-2', label: 'H1 — REPORTING', description: 'H1 accent word', type: 'heading', value: 'REPORTING' },
      { id: 'srt-hero-h1-3', label: 'H1 — TOOL.', description: 'H1 last word', type: 'heading', value: 'TOOL.' },
      { id: 'srt-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Das SRT liefert Echtzeit-Zugriff auf Performance-Daten, Reportings und integriert Recruiting, Projektmanagement und Abrechnung — alles in einer Plattform.' },
      { id: 'srt-hero-tagline', label: 'Hero Tagline', description: 'Tagline below subtitle', type: 'label', value: 'Field-Force-ERP-System · Seit 2008 · Seit 2024 mit KI' },
      { id: 'srt-hero-cta-primary', label: 'CTA Primary', description: 'Primary CTA button', type: 'cta', value: 'Beratungsgespräch buchen' },
      { id: 'srt-hero-cta-secondary', label: 'CTA Secondary', description: 'Secondary CTA button', type: 'cta', value: 'Features entdecken' },
      { id: 'srt-hero-nav-label', label: 'Nav Label', description: 'Direkt zu label', type: 'label', value: 'Direkt zu:' },
      { id: 'srt-hero-chip-1', label: 'Chip — All-in-Software', description: 'Nav chip', type: 'label', value: 'All-in-Software' },
      { id: 'srt-hero-chip-2', label: 'Chip — Funktionsumfang', description: 'Nav chip', type: 'label', value: 'Funktionsumfang' },
      { id: 'srt-hero-chip-3', label: 'Chip — Team-App', description: 'Nav chip', type: 'label', value: 'Team-App' },
      { id: 'srt-hero-chip-4', label: 'Chip — Branchen', description: 'Nav chip', type: 'label', value: 'Branchen' },
      { id: 'srt-hero-chip-5', label: 'Chip — Kundenstimmen', description: 'Nav chip', type: 'label', value: 'Kundenstimmen' },
    ],
  },
  {
    key: 'srt_features', label: 'SRT Features — Feature Cards',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The feature cards section.',
    entries: [
      { id: 'srt-features-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Features' },
      { id: 'srt-features-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Alles in einer Plattform' },
      { id: 'srt-feature-1', label: 'Feature 1 — Dashboard', description: 'Dashboard feature', type: 'heading', value: 'Live Dashboard' },
      { id: 'srt-feature-1-desc', label: 'Feature 1 Description', description: 'Dashboard description', type: 'paragraph', value: 'Alle KPIs in Echtzeit — Umsätze, Contacts, Conversion Rates und mehr.' },
      { id: 'srt-feature-2', label: 'Feature 2 — Performance', description: 'Performance feature', type: 'heading', value: 'Performance Tracking' },
      { id: 'srt-feature-2-desc', label: 'Feature 2 Description', description: 'Performance description', type: 'paragraph', value: 'Vergleiche Standorte, Teams und Zeiträume. Erkenne Trends, bevor sie entstehen.' },
      { id: 'srt-feature-3', label: 'Feature 3 — Team', description: 'Team feature', type: 'heading', value: 'Team Management' },
      { id: 'srt-feature-3-desc', label: 'Feature 3 Description', description: 'Team description', type: 'paragraph', value: 'Einsatzplanung, Schichtpläne und Stundenerfassung für dein gesamtes Field Force Team.' },
      { id: 'srt-feature-4', label: 'Feature 4 — Reports', description: 'Reports feature', type: 'heading', value: 'Automatisierte Reports' },
      { id: 'srt-feature-4-desc', label: 'Feature 4 Description', description: 'Reports description', type: 'paragraph', value: 'Tages-, Wochen- und Monatsreports automatisch generiert — direkt in dein Postfach.' },
      { id: 'srt-feature-5', label: 'Feature 5 — Mobile', description: 'Mobile feature', type: 'heading', value: 'Mobile App' },
      { id: 'srt-feature-5-desc', label: 'Feature 5 Description', description: 'Mobile description', type: 'paragraph', value: 'Für Promoter und Area Manager — Check-ins, Produktinfos und Live-Daten direkt aufs Smartphone.' },
      { id: 'srt-feature-6', label: 'Feature 6 — Security', description: 'Security feature', type: 'heading', value: 'Datenschutz & Sicherheit' },
      { id: 'srt-feature-6-desc', label: 'Feature 6 Description', description: 'Security description', type: 'paragraph', value: 'GDPR-konform, DSGVO-zertifiziert, gehostet in deutschen Rechenzentren.' },
    ],
  },

  /* ════════════════════════════════════════════ RATGEBER ════════════════════ */
  {
    key: 'ratgeber_hero', label: 'Ratgeber — Header Section',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber',
    description: 'The knowledge hub hero. Verified from ratgeber/page.tsx.',
    entries: [
      { id: 'ratgeber-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Content Hub' },
      { id: 'ratgeber-hero-h1-1', label: 'H1 Line 1', description: 'SONIC GROUP', type: 'heading', value: 'SONIC GROUP' },
      { id: 'ratgeber-hero-h1-accent', label: 'H1 Accent', description: 'RATGEBER', type: 'heading', value: 'RATGEBER' },
      { id: 'ratgeber-hero-sub1', label: 'Subtitle 1', description: 'Hero bold subtitle', type: 'paragraph', value: 'Praxiswissen für Markenaktivierung, Vertrieb und Kundenerlebnis' },
      { id: 'ratgeber-hero-sub2', label: 'Subtitle 2', description: 'Hero description', type: 'paragraph', value: '11 fundierte Ratgeber-Artikel, geschrieben aus 19 Jahren Erfahrung in der Markenaktivierung. Von Krefeld über NRW bis in den gesamten DACH-Raum — lokal verankert, national wirksam, international ausgerichtet.' },
    ],
  },
  {
    key: 'ratgeber_intro', label: 'Ratgeber — Hub Intro',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber',
    description: 'The hub intro section and stats.',
    entries: [
      { id: 'ratgeber-intro-badge', label: 'Intro Badge', description: 'Section badge', type: 'badge', value: 'Expertenwissen' },
      { id: 'ratgeber-intro-heading', label: 'Intro Heading', description: 'Main intro heading', type: 'heading', value: 'Alles, was Sie über moderne Markenaktivierung wissen müssen' },
      { id: 'ratgeber-intro-text', label: 'Intro Text', description: 'Hub intro paragraph', type: 'paragraph', value: 'Unser Ratgeber-Hub bündelt fundiertes Praxiswissen zu allen Facetten der Markenaktivierung — von der strategischen Planung über die operative Umsetzung bis zur Erfolgsmessung. Jeder Artikel basiert auf über 19 Jahren Erfahrung mit internationalen Marken und liefert konkrete, umsetzbare Handlungsempfehlungen. Wählen Sie Ihr Thema und vertiefen Sie Ihr Wissen.', multiline: true },
      { id: 'ratgeber-stat-1-value', label: 'Stat — Artikel', description: 'Number of articles', type: 'stat', value: '11' },
      { id: 'ratgeber-stat-1-label', label: 'Stat Label — Artikel', description: 'Articles label', type: 'stat-label', value: 'Ratgeber-Artikel' },
      { id: 'ratgeber-stat-2-value', label: 'Stat — Geo', description: 'Geo levels', type: 'stat', value: '4' },
      { id: 'ratgeber-stat-2-label', label: 'Stat Label — Geo', description: 'Geo label', type: 'stat-label', value: 'Geo-Ebenen' },
      { id: 'ratgeber-stat-3-value', label: 'Stat — FAQ', description: 'FAQ count', type: 'stat', value: '77+' },
      { id: 'ratgeber-stat-3-label', label: 'Stat Label — FAQ', description: 'FAQ label', type: 'stat-label', value: 'FAQ-Antworten' },
      { id: 'ratgeber-stat-4-value', label: 'Stat — Jahre', description: 'Years expertise', type: 'stat', value: '19+' },
      { id: 'ratgeber-stat-4-label', label: 'Stat Label — Jahre', description: 'Years label', type: 'stat-label', value: 'Jahre Expertise' },
    ],
  },
  {
    key: 'ratgeber_geo', label: 'Ratgeber — Geo Context Section',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber',
    description: 'The local/regional/national/international geo section.',
    entries: [
      { id: 'ratgeber-geo-badge', label: 'Geo Badge', description: 'Section badge', type: 'badge', value: 'Reichweite' },
      { id: 'ratgeber-geo-heading', label: 'Geo Heading', description: 'Geo heading', type: 'heading', value: 'Lokal, regional, national, international' },
      { id: 'ratgeber-geo-text', label: 'Geo Text', description: 'Geo description', type: 'paragraph', value: 'Unsere Ratgeber decken alle vier geografischen Ebenen ab — von der lokalen Markenaktivierung in Krefeld über die regionale Verankerung in NRW bis zur nationalen und internationalen Strategie für den gesamten DACH-Raum. So finden Sie für jede Herausforderung den passenden Ratgeber.', multiline: true },
      { id: 'ratgeber-geo-local', label: 'Geo — Lokal', description: 'Local heading', type: 'heading', value: 'Lokal' },
      { id: 'ratgeber-geo-local-desc', label: 'Geo — Lokal Desc', description: 'Local description', type: 'paragraph', value: 'Krefeld und Umgebung — lokale Marktkenntnis mit persönlicher Note.' },
      { id: 'ratgeber-geo-regional', label: 'Geo — Regional', description: 'Regional heading', type: 'heading', value: 'Regional' },
      { id: 'ratgeber-geo-regional-desc', label: 'Geo — Regional Desc', description: 'Regional description', type: 'paragraph', value: 'NRW und Rheinland — das wirtschaftliche Herz Deutschlands.' },
      { id: 'ratgeber-geo-national', label: 'Geo — National', description: 'National heading', type: 'heading', value: 'National' },
      { id: 'ratgeber-geo-national-desc', label: 'Geo — National Desc', description: 'National description', type: 'paragraph', value: 'Bundesweite Strategien für alle Metropolregionen.' },
      { id: 'ratgeber-geo-international', label: 'Geo — International', description: 'International heading', type: 'heading', value: 'International' },
      { id: 'ratgeber-geo-international-desc', label: 'Geo — International Desc', description: 'International description', type: 'paragraph', value: 'DACH-Raum und darüber hinaus — globale Perspektive.' },
    ],
  },
  {
    key: 'ratgeber_cta', label: 'Ratgeber — CTA Section',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber',
    description: 'The bottom CTA section.',
    entries: [
      { id: 'ratgeber-cta-badge', label: 'CTA Badge', description: 'Contact badge', type: 'badge', value: 'Kontakt' },
      { id: 'ratgeber-cta-heading', label: 'CTA Heading', description: 'CTA heading', type: 'heading', value: 'Sie haben ein konkretes Projekt vor Augen?' },
      { id: 'ratgeber-cta-desc', label: 'CTA Description', description: 'CTA description', type: 'paragraph', value: 'Sprechen Sie mit uns über Ihre Markenaktivierung. Wir beraten Sie kostenfrei und unverbindlich — persönlich in Krefeld oder digital.' },
      { id: 'ratgeber-cta-btn', label: 'CTA Button', description: 'CTA button text', type: 'cta', value: 'Jetzt anfragen' },
      { id: 'ratgeber-cta-footer', label: 'CTA Footer', description: 'CTA footer text', type: 'label', value: 'Kostenfreies Erstgespräch' },
    ],
  },

  /* ════════════════════════════════════════════ SONIC REELS ════════════════════ */
  {
    key: 'sonicreels_page', label: 'Sonic Reels — Page & Era Content',
    pageGroupId: 'about', pagePath: '/sonic-reels',
    description: 'All text on the Sonic Reels page. Verified from sonic-reels/page.tsx.',
    entries: [
      { id: 'reels-splash-sub', label: 'Splash Subtitle', description: 'Hero subtitle', type: 'label', value: '2007 — Present' },
      { id: 'reels-page-title', label: 'H1 — Sonic', description: 'H1 first word', type: 'heading', value: 'Sonic' },
      { id: 'reels-page-title-accent', label: 'H1 Accent — Reels', description: 'H1 accent word', type: 'heading', value: 'Reels' },
      { id: 'reels-page-subtitle', label: 'Page Subtitle', description: 'Page subtitle', type: 'paragraph', value: 'Nearly two decades of retail activation — told through the moments that defined us.' },
      { id: 'reels-countdown-label', label: 'Countdown Label', description: 'Film countdown label', type: 'label', value: 'SONIC REELS · ARCHIV' },
      { id: 'reels-era-1-label', label: 'Era 1 — 2007–2015 Label', description: 'Era label', type: 'label', value: '2007–2015' },
      { id: 'reels-era-1-tagline', label: 'Era 1 Tagline', description: 'The Genesis', type: 'heading', value: 'The Genesis' },
      { id: 'reels-era-2-label', label: 'Era 2 — 2015–2019 Label', description: 'Era label', type: 'label', value: '2015–2019' },
      { id: 'reels-era-2-tagline', label: 'Era 2 Tagline', description: 'The Momentum', type: 'heading', value: 'The Momentum' },
      { id: 'reels-era-3-label', label: 'Era 3 — 2019–2022 Label', description: 'Era label', type: 'label', value: '2019–2022' },
      { id: 'reels-era-3-tagline', label: 'Era 3 Tagline', description: 'The Resilience', type: 'heading', value: 'The Resilience' },
      { id: 'reels-era-4-label', label: 'Era 4 — 2022–2023 Label', description: 'Era label', type: 'label', value: '2022–2023' },
      { id: 'reels-era-4-tagline', label: 'Era 4 Tagline', description: 'The Acceleration', type: 'heading', value: 'The Acceleration' },
      { id: 'reels-era-5-label', label: 'Era 5 — 2024 Label', description: 'Era label', type: 'label', value: '2024' },
      { id: 'reels-era-5-tagline', label: 'Era 5 Tagline', description: 'The Edge', type: 'heading', value: 'The Edge' },
      { id: 'reels-era-6-label', label: 'Era 6 — 2025 Label', description: 'Era label', type: 'label', value: '2025' },
      { id: 'reels-era-6-tagline', label: 'Era 6 Tagline', description: 'The Peak', type: 'heading', value: 'The Peak' },
      { id: 'reels-era-7-label', label: 'Era 7 — 2026 Label', description: 'Era label', type: 'label', value: '2026' },
      { id: 'reels-era-7-tagline', label: 'Era 7 Tagline', description: 'The Horizon', type: 'heading', value: 'The Horizon' },
      { id: 'reels-end-label', label: 'End Card Label', description: 'End card tagline', type: 'label', value: 'The story continues' },
      { id: 'reels-end-text-line1', label: 'End Card Text Line 1', description: 'End card text', type: 'paragraph', value: 'Every era added a chapter. Every campaign wrote a sentence.' },
      { id: 'reels-end-text-line2', label: 'End Card Text Line 2', description: 'End card text', type: 'paragraph', value: 'The next line starts with you.' },
      { id: 'reels-end-cta', label: 'End Card CTA', description: 'End card CTA button', type: 'cta', value: 'Start the Next Chapter' },
      { id: 'reels-era-1-quote', label: 'Era 1 Quote', description: '2007–2015 quote', type: 'quote', value: 'We started in a backroom with two desks and one conviction — a well-trained person beats a well-placed poster every time. By 2013 there were fifty of us.' },
      { id: 'reels-era-1-attribution', label: 'Era 1 Attribution', description: '2007–2015 attribution', type: 'label', value: 'Björn Bourdin · Co-founder, 2007' },
      { id: 'reels-era-1-caption', label: 'Era 1 Caption', description: '2007–2015 photo caption', type: 'caption', value: 'First desk, first client — the backroom years.' },
      { id: 'reels-era-2-quote', label: 'Era 2 Quote', description: '2015–2019 quote', type: 'quote', value: 'Samsung landed overnight and two hundred specialists landed on our shoulders. So we built the systems to carry them — training, certification, real-time comms.' },
      { id: 'reels-era-2-attribution', label: 'Era 2 Attribution', description: '2015–2019 attribution', type: 'label', value: 'Jo Heitkämper · Co-founder, 2015' },
      { id: 'reels-era-2-caption', label: 'Era 2 Caption', description: '2015–2019 photo caption', type: 'caption', value: 'Two hundred specialists. One rollout.' },
      { id: 'reels-era-3-quote', label: 'Era 3 Quote', description: '2019–2022 quote', type: 'quote', value: 'Seventy-two hours to rebuild the entire playbook. When the stores reopened we were already standing inside — and we didn\'t lose a single client.' },
      { id: 'reels-era-3-attribution', label: 'Era 3 Attribution', description: '2019–2022 attribution', type: 'label', value: 'Lucas Kreiten · Managing Director, 2020' },
      { id: 'reels-era-3-caption', label: 'Era 3 Caption', description: '2019–2022 photo caption', type: 'caption', value: 'Closed doors. Open playbook.' },
      { id: 'reels-era-4-quote', label: 'Era 4 Quote', description: '2022–2023 quote', type: 'quote', value: 'Five global brands running at once, two billion in activated sales, and not one metric missed. That pressure is what finally made us build our own platform.' },
      { id: 'reels-era-4-attribution', label: 'Era 4 Attribution', description: '2022–2023 attribution', type: 'label', value: 'Lucas Kreiten · Managing Director, 2023' },
      { id: 'reels-era-4-caption', label: 'Era 4 Caption', description: '2022–2023 photo caption', type: 'caption', value: 'Five brands. Zero missed metrics.' },
      { id: 'reels-era-5-quote', label: 'Era 5 Quote', description: '2024 quote', type: 'quote', value: 'For the first time our clients could watch their investment work in real time. Garmin grew 130% — and the data finally proved what we always knew.' },
      { id: 'reels-era-5-attribution', label: 'Era 5 Attribution', description: '2024 attribution', type: 'label', value: 'Björn Bourdin · Co-founder, 2024' },
      { id: 'reels-era-5-caption', label: 'Era 5 Caption', description: '2024 photo caption', type: 'caption', value: 'The data finally saw what we saw.' },
      { id: 'reels-era-6-quote', label: 'Era 6 Quote', description: '2025 quote', type: 'quote', value: 'Two thousand specialists, a 98% retention rate, and the best year we\'ve ever had. We allowed ourselves exactly one evening to celebrate it.' },
      { id: 'reels-era-6-attribution', label: 'Era 6 Attribution', description: '2025 attribution', type: 'label', value: 'Jo Heitkämper · Co-founder, 2025' },
      { id: 'reels-era-6-caption', label: 'Era 6 Caption', description: '2025 photo caption', type: 'caption', value: '2,000 strong — the top of the mountain.' },
      { id: 'reels-era-7-quote', label: 'Era 7 Quote', description: '2026 quote', type: 'quote', value: 'The DACH market is won. The only question left is what European retail looks like when we\'re the ones defining it.' },
      { id: 'reels-era-7-attribution', label: 'Era 7 Attribution', description: '2026 attribution', type: 'label', value: 'Björn Bourdin · Co-founder, 2026' },
      { id: 'reels-era-7-caption', label: 'Era 7 Caption', description: '2026 photo caption', type: 'caption', value: 'Next stop: Europe.' },
    ],
  },

  /* ════════════════════════════════════════════ CAREERS ════════════════════ */
  {
    key: 'careers_hero', label: 'KarriereHero — Hero Section',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The careers page hero. Verified from careers/page.tsx.',
    entries: [
      { id: 'careers-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Karriere' },
      { id: 'careers-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Werde Teil der Sonic Family' },
      { id: 'careers-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Karriere bei Deutschlands führender Retail Activation Agentur. Entdecke spannende Jobs, echte Perspektiven und ein Team, das dich wachsen lässt.' },
      { id: 'careers-hero-stat-1-value', label: 'Stat — Kununu', description: 'Kununu score', type: 'stat', value: '4,4' },
      { id: 'careers-hero-stat-1-label', label: 'Stat Label — Kununu', description: 'Kununu label', type: 'stat-label', value: 'Kununu Score' },
      { id: 'careers-hero-stat-2-value', label: 'Stat — Tenure', description: 'Average tenure', type: 'stat', value: '4,2 Jahre' },
      { id: 'careers-hero-stat-2-label', label: 'Stat Label — Tenure', description: 'Tenure label', type: 'stat-label', value: 'Ø Betriebszugehörigkeit' },
      { id: 'careers-hero-stat-3-value', label: 'Stat — Talentpool', description: 'Talent pool size', type: 'stat', value: '2.000+' },
      { id: 'careers-hero-stat-3-label', label: 'Stat Label — Talentpool', description: 'Talent label', type: 'stat-label', value: 'Talente im Netzwerk' },
    ],
  },
  {
    key: 'careers_campus', label: 'Careers — Campus Section',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The office tour section. Verified from careers/page.tsx.',
    entries: [
      { id: 'careers-campus-badge', label: 'Campus Badge', description: 'Section badge', type: 'badge', value: 'Unser Campus' },
      { id: 'careers-campus-heading', label: 'Campus Heading', description: 'Section heading', type: 'heading', value: 'BÜRO ERKUNDEN' },
      { id: 'careers-campus-sub', label: 'Campus Subtitle', description: 'Section subtitle', type: 'paragraph', value: '360°-Rundgang durch unseren Hauptsitz in Krefeld — Campus Fichtenhain 46.' },
      { id: 'careers-campus-address', label: 'Campus Address', description: 'Address line', type: 'label', value: 'Campus Fichtenhain 46' },
      { id: 'careers-campus-city', label: 'Campus City', description: 'City line', type: 'label', value: '47807 Krefeld, Deutschland' },
      { id: 'careers-campus-route', label: 'Route Button', description: 'Route button', type: 'cta', value: 'Route planen' },
      { id: 'careers-campus-tip-1', label: 'Tour Tip 1', description: 'Dragging tip', type: 'label', value: 'Klicken & Ziehen zum Umsehen' },
      { id: 'careers-campus-tip-2', label: 'Tour Tip 2', description: 'Walking tip', type: 'label', value: 'Kreise klicken zum Bewegen' },
      { id: 'careers-campus-tip-3', label: 'Tour Tip 3', description: 'Fullscreen tip', type: 'label', value: 'Vollbild für beste Erfahrung' },
    ],
  },

  /* ════════════════════════════════════════════ LEISTUNGEN ════════════════════ */
  {
    key: 'leistungen_main_hero', label: 'Leistungen — Main Page Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen',
    description: 'The main Leistungen overview page hero.',
    entries: [
      { id: 'leistungen-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Leistungen' },
      { id: 'leistungen-hero-heading', label: 'Hero Heading', description: 'Main hero heading', type: 'heading', value: 'Alle Retail-Leistungen aus einer Hand' },
      { id: 'leistungen-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Von POS-Promotion über Live Video bis zu Warehouse & Logistik — wir decken die gesamte Wertschöpfungskette am Point of Sale ab.' },
    ],
  },

  /* ════════════════════ LEISTUNGEN SUB-PAGES ════════════════════ */
  {
    key: 'leistungen_events', label: 'Events & Messen — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/events-messen',
    description: 'Events & Messen sub-page hero.',
    entries: [
      { id: 'events-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Events & Messen' },
      { id: 'events-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'Live‑Kommunikation,' },
      { id: 'events-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'die begeistert.' },
      { id: 'events-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Konzept. Personal. Logistik. Wir präsentieren deine Marke da, wo deine Zielgruppe ist.' },
      { id: 'events-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Events, Messen, Roadshows und mehr. Vor Ort, auf Tour und hybrid.' },
    ],
  },
  {
    key: 'leistungen_pos', label: 'POS Full Service — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/pos-full-service',
    description: 'POS Full Service sub-page hero.',
    entries: [
      { id: 'pos-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'POS Full Service' },
      { id: 'pos-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'End-to-end-Partner' },
      { id: 'pos-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'für den POS.' },
      { id: 'pos-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Alles aus einer Hand. Design, Displays, Möbel, Collateral, Give-aways, Logistik, Manntage.' },
      { id: 'pos-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Durchgetaktet. Von der Kreation bis zum letzten Handgriff übernehmen wir alle Leistungen.' },
    ],
  },
  {
    key: 'leistungen_staff', label: 'Staff as a Service — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/staff-as-a-service',
    description: 'Staff as a Service sub-page hero.',
    entries: [
      { id: 'staff-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Staff as a Service' },
      { id: 'staff-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'Rundum-Service' },
      { id: 'staff-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'beim Personal.' },
      { id: 'staff-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Markenfans anheuern: Für Sell-out, Sell-in, Schulungen, Brand Activation und mehr.' },
      { id: 'staff-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Wir übernehmen Recruiting, Payroll und Steuerung, bspw. via Arbeitnehmerüberlassung.' },
    ],
  },
  {
    key: 'leistungen_video', label: 'Live Video — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/video',
    description: 'Live Video sub-page hero.',
    entries: [
      { id: 'video-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: '(Live) Video' },
      { id: 'video-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'Live verkaufen.' },
      { id: 'video-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'Digital begeistern.' },
      { id: 'video-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Erlebbar werden — Videocontent und Live-Video-Kanäle mit unseren Markenbotschaftern.' },
      { id: 'video-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Für Produktberatung, Sales und Service-Support. E-Commerce, Retail-Display, QR-Code — alles aus einer Hand.' },
    ],
  },
  {
    key: 'leistungen_kreation', label: 'Kreation & Content — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/kreation-content',
    description: 'Kreation & Content sub-page hero.',
    entries: [
      { id: 'kreation-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Inhouse Kreation & Content' },
      { id: 'kreation-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'Kreation,' },
      { id: 'kreation-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'die verkauft.' },
      { id: 'kreation-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Von Kampagnenkonzept bis Rollout — Foto, Video, CGI und POS-Design aus einer Hand.' },
    ],
  },
  {
    key: 'leistungen_talentpool', label: 'Talentpool — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/talentpool',
    description: 'Talentpool sub-page hero.',
    entries: [
      { id: 'talentpool-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Talentepool' },
      { id: 'talentpool-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: '>2.000 Talente.' },
      { id: 'talentpool-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'Festangestellt.' },
      { id: 'talentpool-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Keine Freelancer. Keine Zeitarbeit. Echte Markenbotschafter.' },
      { id: 'talentpool-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Unser Talentepool umfasst über 2.000 handverlesene, festangestellte Markenbotschafter deutschlandweit — trainiert, motiviert und live in ihrer eigenen Zielerreichung getrackt.' },
    ],
  },
  {
    key: 'leistungen_forecasting', label: 'Forecasting — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/forecasting',
    description: 'Forecasting sub-page hero.',
    entries: [
      { id: 'forecasting-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Forecasting' },
      { id: 'forecasting-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'Plausible' },
      { id: 'forecasting-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'Prognosen.' },
      { id: 'forecasting-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Bevor der erste Einsatz startet, weißt du schon, was du erwarten kannst.' },
      { id: 'forecasting-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Auf Basis von historischen Sell-out-Daten, Standort‑Performance und Marktintelligenz prognostizieren wir deine Ergebnisse — datenbasiert, nachvollziehbar, belastbar.' },
    ],
  },
  {
    key: 'leistungen_warehouse', label: 'Warehouse & Logistik — Hero',
    pageGroupId: 'leistungen', pagePath: '/leistungen/warehouse-logistik',
    description: 'Warehouse & Logistik sub-page hero.',
    entries: [
      { id: 'warehouse-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Warehouse & Logistik' },
      { id: 'warehouse-hero-heading-line1', label: 'H1 Line 1', description: 'Hero H1 first line', type: 'heading', value: 'Ware zur richtigen Zeit' },
      { id: 'warehouse-hero-heading-accent', label: 'H1 Accent', description: 'Hero H1 accent', type: 'heading', value: 'am richtigen Ort.' },
      { id: 'warehouse-hero-subtitle', label: 'Hero Subtitle', description: 'Hero bold subtitle', type: 'paragraph', value: 'Phygital? Können wir. Mit 250 eigenen Paletten-Stellplätzen für Assets, Messestände und Ware.' },
      { id: 'warehouse-hero-description', label: 'Hero Description', description: 'Hero secondary description', type: 'paragraph', value: 'Mit Fulfillment-Services und Schnittstellen. Europaweit.' },
    ],
  },

  /* ════════════════════════════════════════════ CASE STUDIES, BLOG, JOBS, etc. ════════════ */
  {
    key: 'casestudies_hero', label: 'Case Studies Hero',
    pageGroupId: 'case_studies', pagePath: '/fallbeispiele',
    description: 'The case studies listing page hero.',
    entries: [
      { id: 'casestudies-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Fallbeispiele' },
      { id: 'casestudies-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Erfolgsgeschichten, die für sich sprechen' },
      { id: 'casestudies-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Entdecke, wie wir Marken wie Samsung, Garmin, Philips und Groupe SEB zu messbaren Erfolgen am POS verholfen haben.' },
    ],
  },
  {
    key: 'blog_hero', label: 'Blog — Header Section',
    pageGroupId: 'blog', pagePath: '/blog',
    description: 'The blog listing page.',
    entries: [
      { id: 'blog-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Blog' },
      { id: 'blog-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Insights & Stories' },
      { id: 'blog-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Retail-Trends, Best Practices und spannende Einblicke aus der Welt der Markenaktivierung.' },
    ],
  },
  {
    key: 'jobs_hero', label: 'Jobs — Header Section',
    pageGroupId: 'jobs', pagePath: '/jobs',
    description: 'The jobs listing page.',
    entries: [
      { id: 'jobs-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Jobs' },
      { id: 'jobs-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Finde deinen Job bei Sonic' },
      { id: 'jobs-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Entdecke offene Stellen in Sales, Staff, Events und mehr — und werde Teil der Sonic Family.' },
    ],
  },
  {
    key: 'industries_hero', label: 'Industries Hero',
    pageGroupId: 'industries', pagePath: '/industries',
    description: 'The industries page hero.',
    entries: [
      { id: 'industries-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Branchen' },
      { id: 'industries-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Branchenexpertise, die den Unterschied macht' },
      { id: 'industries-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Von Consumer Electronics bis Beauty — wir kennen die Besonderheiten deiner Branche und setzen sie in messbare Ergebnisse um.' },
    ],
  },
  {
    key: 'team_hero', label: 'Team Hero — Header Section',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The team page hero.',
    entries: [
      { id: 'team-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Team' },
      { id: 'team-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Das Sonic Team' },
      { id: 'team-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Über 2.000 Menschen, eine Mission: Retail Activation neu definieren.' },
    ],
  },
  {
    key: 'losungen_hero', label: 'Lösungen Hero — Header Section',
    pageGroupId: 'losungen', pagePath: '/losungen',
    description: 'The solutions overview page hero.',
    entries: [
      { id: 'losungen-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Lösungen' },
      { id: 'losungen-hero-heading', label: 'Main Heading', description: 'Hero heading', type: 'heading', value: 'Drei Wege. Ein Partner.' },
      { id: 'losungen-hero-subtitle', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Egal ob Markteintritt, Absatzsteigerung oder Omnichannel — wir haben die passende Lösung für deine Retail-Strategie.' },
    ],
  },

  /* ════════════════════════════════════════════ ABOUT — Additional Sections ════════════════════ */
  {
    key: 'about_origin_story', label: 'OriginStory — Company Story Section',
    pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'The origin story and ticker stats section.',
    entries: [
      { id: 'about-origin-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Über uns' },
      { id: 'about-origin-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'MARKEN IM HERZEN. ERFOLG IM FOKUS.' },
      { id: 'about-origin-p1', label: 'Paragraph 1', description: 'First paragraph', type: 'paragraph', value: 'Wir sind eine unabhängige Marketing- und Sales-Agentur mit Schwerpunkten rund um die Konzeption, Kreation und Koordination von Kundenprojekten – ob am Point of Sale, im Studio, auf Messen oder Events in den Bereichen B2B, B2B2C und D2C.', multiline: true },
      { id: 'about-origin-p2', label: 'Paragraph 2', description: 'Second paragraph', type: 'paragraph', value: 'Seit 2007 leben wir Marken und machen sie erfolgreich – unabhängig von Größe, Branche und Zielgruppe. Dabei arbeiten wir stets geprägt von den Werten Mensch, Motivation, Daten und Werkzeug.', multiline: true },
      { id: 'about-origin-p3', label: 'Paragraph 3', description: 'Third paragraph', type: 'paragraph', value: 'Unsere Strategie: Ärmel hoch und anpacken! Echtes Handwerk – von Anfang bis Ende mit 100 % Leidenschaft und vollem Einsatz für die Ziele unserer Kunden.', multiline: true },
      { id: 'about-origin-cta', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Unsere Lösungen entdecken' },
    ],
  },
  {
    key: 'about_timeline', label: 'Timeline — Innovation Section',
    pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'The timeline with #Doing new things, #Doing things better, #Doing things tabs.',
    entries: [
      { id: 'about-timeline-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: '#Doing' },
      { id: 'about-timeline-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'WAS UNS ANTREIBT' },
      { id: 'about-timeline-tab-1', label: 'Tab — New Things', description: 'New things tab', type: 'label', value: '#Doing new things' },
      { id: 'about-timeline-tab-2', label: 'Tab — Better Things', description: 'Better tab', type: 'label', value: '#Doing things better' },
      { id: 'about-timeline-tab-3', label: 'Tab — Doing Things', description: 'Doing tab', type: 'label', value: '#Doing things' },
    ],
  },
  {
    key: 'about_leadership', label: 'LeadershipTeam — Team Diversity Section',
    pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'The leadership team diversity section with rotating stats.',
    entries: [
      { id: 'about-leadership-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Das Team' },
      { id: 'about-leadership-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'FACHLICHE UND MENSCHLICHE VIELFALT.' },
      { id: 'about-leadership-sub', label: 'Subtitle', description: 'Section subtitle', type: 'paragraph', value: 'Bei Sonic treffen Expertisen aufeinander, die sich perfekt ergänzen.' },
      { id: 'about-leadership-cta', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Offene Stellen' },
    ],
  },
  {
    key: 'about_management_voices', label: 'ManagementVoices — Leadership Interviews',
    pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'The management voices interview section with executives.',
    entries: [
      { id: 'about-voices-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Führungsperspektiven' },
      { id: 'about-voices-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Die Stimmen hinter Sonic.' },
      { id: 'about-voices-sub', label: 'Subtitle', description: 'Section subtitle', type: 'paragraph', value: 'Strategie, Kreation und Betrieb — drei Perspektiven, eine Überzeugung.' },
      { id: 'about-voices-cta', label: 'CTA Text', description: 'Bottom CTA', type: 'cta', value: 'Beratungsgespräch buchen' },
    ],
  },

  /* ════════════════════════════════════════════ CAREERS — Additional Sections ════════════════════ */
  {
    key: 'careers_culture', label: 'KarriereCulture — Darum Sonic + Werte',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The unified culture section with Darum Sonic, Ausgezeichnet, and Sonic-Werte.',
    entries: [
      { id: 'careers-culture-badge', label: 'Culture Badge', description: 'Darum Sonic badge', type: 'badge', value: 'Darum Sonic' },
      { id: 'careers-culture-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'STARKE MENSCHEN FÜR STARKE MARKEN' },
      { id: 'careers-culture-p1', label: 'Paragraph 1', description: 'First paragraph', type: 'paragraph', value: 'Wir lieben und leben Marken, insbesondere am Point of Sale, auf Messen, bei Events, auf Roadshows und per Video aus unseren Studios an unserem Campus in Krefeld.', multiline: true },
      { id: 'careers-culture-p2', label: 'Paragraph 2', description: 'Second paragraph', type: 'paragraph', value: 'Energiegeladen und sympathisch: Diese Beschreibung passt auf die Menschen, die bei Sonic arbeiten. Passt sie auch auf dich?', multiline: true },
      { id: 'careers-culture-award-heading', label: 'Award Heading', description: 'Ausgezeichnet heading', type: 'heading', value: 'Kultur? Leben wir.' },
      { id: 'careers-culture-award-text', label: 'Award Text', description: 'Award description', type: 'paragraph', value: 'Die Auszeichnung zur "Kununu Top Company" haben wir 2022, 2023, 2024, 2025 und 2026 erhalten.', multiline: true },
      { id: 'careers-culture-values-heading', label: 'Values Heading', description: 'Values heading', type: 'heading', value: 'DIESE WERTE LEBEN WIR' },
      { id: 'careers-culture-value-1', label: 'Value — Gemeinschaftlich', description: 'Value 1', type: 'heading', value: 'Gemeinschaftlich' },
      { id: 'careers-culture-value-1-desc', label: 'Value 1 Desc', description: 'Value 1 desc', type: 'paragraph', value: 'Nur als Team sind wir Sonic. Wir unterstützen uns gegenseitig und lernen voneinander.' },
      { id: 'careers-culture-value-2', label: 'Value — Menschlich', description: 'Value 2', type: 'heading', value: 'Menschlich' },
      { id: 'careers-culture-value-2-desc', label: 'Value 2 Desc', description: 'Value 2 desc', type: 'paragraph', value: 'Wir wollen, dass du erfolgreich sein kannst. Das beginnt bei uns mit gegenseitiger Wertschätzung.' },
      { id: 'careers-culture-value-3', label: 'Value — Flexibel', description: 'Value 3', type: 'heading', value: 'Flexibel' },
      { id: 'careers-culture-value-3-desc', label: 'Value 3 Desc', description: 'Value 3 desc', type: 'paragraph', value: 'Wir finden uns gern in neue Situationen ein und bestärken uns darin, Neues auszuprobieren.' },
      { id: 'careers-culture-value-4', label: 'Value — Einfachheit', description: 'Value 4', type: 'heading', value: 'Einfachheit' },
      { id: 'careers-culture-value-4-desc', label: 'Value 4 Desc', description: 'Value 4 desc', type: 'paragraph', value: 'Klarer Fokus auf das Wesentliche: gute Strukturen, kurze Wege, praktische Tools.' },
      { id: 'careers-culture-value-5', label: 'Value — Verantwortung', description: 'Value 5', type: 'heading', value: 'Verantwortung' },
      { id: 'careers-culture-value-5-desc', label: 'Value 5 Desc', description: 'Value 5 desc', type: 'paragraph', value: 'Unsere Stärken und Fähigkeiten setzen wir verantwortungsbewusst ein.' },
      { id: 'careers-culture-value-6', label: 'Value — Arbeitsumfeld', description: 'Value 6', type: 'heading', value: 'Arbeitsumfeld' },
      { id: 'careers-culture-value-6-desc', label: 'Value 6 Desc', description: 'Value 6 desc', type: 'paragraph', value: 'Aufgaben, die zu deiner Persönlichkeit passen. Menschen, mit denen man gerne zusammenarbeitet.' },
    ],
  },
  {
    key: 'careers_paths', label: 'KarrierepfadeSection — Two Career Paths',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The two career paths: Sonic Sales Family and Sonic Staff Family.',
    entries: [
      { id: 'careers-paths-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Karrierepfade' },
      { id: 'careers-paths-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'ZWEI WEGE. EIN ZIEL.' },
      { id: 'careers-paths-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Ob intern am Campus oder flexibel im Außendienst — bei Sonic gibt es einen Weg für dich.' },
      { id: 'careers-paths-sales-badge', label: 'Sales Badge', description: 'Sales path badge', type: 'badge', value: 'Internes Team' },
      { id: 'careers-paths-sales-headline', label: 'Sales Headline', description: 'Sales headline', type: 'heading', value: 'Bürobasierte Karriere in Krefeld' },
      { id: 'careers-paths-sales-desc', label: 'Sales Description', description: 'Sales description', type: 'paragraph', value: 'Klare Aufstiegspfade, Mentoring, Hybridarbeit und eine echte Community.' },
      { id: 'careers-paths-staff-badge', label: 'Staff Badge', description: 'Staff path badge', type: 'badge', value: 'Field Team' },
      { id: 'careers-paths-staff-headline', label: 'Staff Headline', description: 'Staff headline', type: 'heading', value: 'Flexibler Einsatz DACH-weit' },
      { id: 'careers-paths-staff-desc', label: 'Staff Description', description: 'Staff description', type: 'paragraph', value: '150+ Premium-Brands, Top-Incentives und maximale Flexibilität.' },
      { id: 'careers-paths-cta', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Alle Stellen ansehen' },
    ],
  },
  {
    key: 'careers_family', label: 'SonicFamily — Spirit & Faces',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The Sonic Spirit & Faces section with team member stories.',
    entries: [
      { id: 'careers-family-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Echte Menschen. Echte Geschichten.' },
      { id: 'careers-family-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Sonic Spirit & Faces' },
      { id: 'careers-family-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Persönliche Geschichten, ehrliche Interviews und die Werte, die unsere Kultur ausmachen.' },
      { id: 'careers-family-cta-heading', label: 'CTA Heading', description: 'Bottom CTA heading', type: 'heading', value: 'Deine Geschichte bei Sonic Spirit & Faces?' },
      { id: 'careers-family-cta-btn', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Mitmachen' },
    ],
  },
  {
    key: 'careers_events', label: 'SonicTeamEvents — Event Categories',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The team events section: Content Creation, Team Events, Promoter Events.',
    entries: [
      { id: 'careers-events-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Sonic Team Events' },
      { id: 'careers-events-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'WIR ARBEITEN HART. WIR FEIERN NOCH MEHR.' },
      { id: 'careers-events-tab-1', label: 'Tab — Content Creation', description: 'Content tab', type: 'label', value: 'Content Creation' },
      { id: 'careers-events-tab-2', label: 'Tab — Team Events', description: 'Team tab', type: 'label', value: 'Team Events' },
      { id: 'careers-events-tab-3', label: 'Tab — Promoter Events', description: 'Promoter tab', type: 'label', value: 'Promoter Events' },
    ],
  },
  {
    key: 'careers_jobs', label: 'StellenangeboteSection — Jobs CTA',
    pageGroupId: 'careers', pagePath: '/karriere',
    description: 'The jobs listing section with Tanja CTA.',
    entries: [
      { id: 'careers-jobs-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Aktuelle Stellenangebote' },
      { id: 'careers-jobs-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'DEIN NÄCHSTER KARRIERESCHRITT' },
      { id: 'careers-jobs-tanja-heading', label: 'Tanja Heading', description: 'Tanja question', type: 'heading', value: 'Unsicher, welche Stelle zu dir passt?' },
      { id: 'careers-jobs-tanja-desc', label: 'Tanja Description', description: 'Tanja description', type: 'paragraph', value: 'Tanja aus unserem HR-Team nimmt sich gerne Zeit für ein unverbindliches Gespräch.' },
      { id: 'careers-jobs-tanja-cta', label: 'Tanja CTA', description: 'Tanja CTA button', type: 'cta', value: 'Mit Tanja sprechen' },
      { id: 'careers-jobs-initiativ-cta', label: 'Initiativ CTA', description: 'Initiativ button', type: 'cta', value: 'Initiativbewerbung' },
    ],
  },

  /* ════════════════════════════════════════════ SRT — Additional Sections ════════════════════ */
  {
    key: 'srt_problem', label: 'TheProblem — 3 Data Pain Points',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The three core data problems: data silos, no dashboards, late insights.',
    entries: [
      { id: 'srt-problem-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Deine Herausforderung' },
      { id: 'srt-problem-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Datenquellen zusammenführen' },
      { id: 'srt-problem-p1', label: 'Paragraph 1', description: 'First paragraph', type: 'paragraph', value: 'Für effizientes Performance-Marketing müssen Daten aus vielen Quellen in Echtzeit zusammenlaufen. Genau daran scheitern die meisten Unternehmen.' },
      { id: 'srt-problem-cta', label: 'CTA Text', description: 'CTA strip text', type: 'cta', value: 'Das SRT löst alle drei Probleme.' },
      { id: 'srt-problem-cta-sub', label: 'CTA Subtitle', description: 'CTA subtext', type: 'label', value: 'Eine Plattform. Alle Daten. Echtzeit.' },
      { id: 'srt-problem-cta-btn', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Lösung ansehen' },
    ],
  },
  {
    key: 'srt_functionality', label: 'FunctionalityOverview — 6 Modules',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The six core SRT modules: Planung, Talentpool, GPS, externe Daten, Document Intelligence, Routenplanung.',
    entries: [
      { id: 'srt-func-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Funktionsumfang' },
      { id: 'srt-func-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Alles, was Field-Force-Management braucht.' },
      { id: 'srt-func-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Von der Einsatzplanung bis zur KI-gestützten Dokumentenverarbeitung — sechs Module, eine Plattform.' },
      { id: 'srt-func-demo-cta', label: 'Demo CTA', description: 'Demo CTA text', type: 'cta', value: 'Demo anfragen' },
    ],
  },
  {
    key: 'srt_employee_app', label: 'EmployeeApp — Field Force Mobile',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The employee mobile app: Aufgaben, Check-in, Ziele, Abrechnung.',
    entries: [
      { id: 'srt-app-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'SRT aus Mitarbeitersicht' },
      { id: 'srt-app-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Die Einsatz-App für die Field Force' },
      { id: 'srt-app-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Alles was Außendienstmitarbeiter im Einsatz brauchen — direkt auf dem Smartphone. iOS & Android, offline-fähig.' },
    ],
  },
  {
    key: 'srt_datapaths', label: 'DataPaths — Data Flow Diagram',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The interactive data flow diagram: Sonic, SRT, Kunde, Mitarbeiter, externe Daten.',
    entries: [
      { id: 'srt-data-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Datenfluss' },
      { id: 'srt-data-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'So fließen die Daten durch das SRT.' },
      { id: 'srt-data-p1', label: 'Paragraph 1', description: 'First paragraph', type: 'paragraph', value: 'Das SRT ist das zentrale Nervensystem — es verbindet Sonic, Kunden, Mitarbeiter und externe Systeme in einer einzigen, synchronen Datenbasis.' },
    ],
  },
  {
    key: 'srt_proof', label: 'Proof — SRT in Zahlen',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The proof section with animated stats from 15+ years.',
    entries: [
      { id: 'srt-proof-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'SRT in Zahlen' },
      { id: 'srt-proof-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Die Bilanz spricht für sich.' },
      { id: 'srt-proof-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Tatsächlich gemessene Ergebnisse aus über 15 Jahren Retail-Aktivierungen.' },
      { id: 'srt-proof-cta', label: 'CTA', description: 'CTA text', type: 'cta', value: 'SRT Demo anfragen' },
    ],
  },
  {
    key: 'srt_industries', label: 'Industries — Use Cases & Config',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The industries section with use cases across retail categories.',
    entries: [
      { id: 'srt-industries-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Branchen & Use Cases' },
      { id: 'srt-industries-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Von Retail Execution bis Healthcare.' },
      { id: 'srt-industries-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Das SRT ist bereit für jedes Projekt, bei dem Menschen zielorientiert und koordiniert eingesetzt werden.' },
      { id: 'srt-industries-cta', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Deine SRT-Konfiguration finden' },
    ],
  },
  {
    key: 'srt_pricing', label: 'PricingAndAccess — Pricing Tiers',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The pricing tiers: Starter, Professional, Enterprise.',
    entries: [
      { id: 'srt-pricing-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Preise & Zugang' },
      { id: 'srt-pricing-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'Transparente Preise. Direkter Zugang.' },
      { id: 'srt-pricing-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Drei Stufen, klarer Mehrwert, keine versteckten Kosten.' },
      { id: 'srt-pricing-tier-1', label: 'Tier — Starter', description: 'Starter tier', type: 'heading', value: 'Starter' },
      { id: 'srt-pricing-tier-2', label: 'Tier — Professional', description: 'Professional tier', type: 'heading', value: 'Professional' },
      { id: 'srt-pricing-tier-3', label: 'Tier — Enterprise', description: 'Enterprise tier', type: 'heading', value: 'Enterprise' },
      { id: 'srt-pricing-access-heading', label: 'Access Heading', description: 'Access heading', type: 'heading', value: 'Bereit für volle Transparenz?' },
      { id: 'srt-pricing-btn', label: 'CTA Button', description: 'CTA button', type: 'cta', value: 'Beratungsgespräch buchen' },
    ],
  },
  {
    key: 'srt_zusammenarbeit', label: 'Zusammenarbeit — 6-Step Process',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The six-step collaboration process: KPI, Datenintegration, Dashboard, Team, Abrechnung, Reportings.',
    entries: [
      { id: 'srt-collab-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Zusammenarbeit' },
      { id: 'srt-collab-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'So funktioniert das SRT' },
      { id: 'srt-collab-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Von der ersten KPI-Definition bis zum laufenden Reporting — in 6 strukturierten Schritten.' },
      { id: 'srt-collab-step-1', label: 'Step 1 — KPI', description: 'KPI definition', type: 'heading', value: 'KPI-Definition' },
      { id: 'srt-collab-step-2', label: 'Step 2 — Daten', description: 'Data integration', type: 'heading', value: 'Datenintegration' },
      { id: 'srt-collab-step-3', label: 'Step 3 — Dashboard', description: 'Dashboard setup', type: 'heading', value: 'Dashboard-Setup' },
      { id: 'srt-collab-step-4', label: 'Step 4 — Team', description: 'Team management', type: 'heading', value: 'Team-Management' },
      { id: 'srt-collab-step-5', label: 'Step 5 — Abrechnung', description: 'Payroll', type: 'heading', value: 'Abrechnung' },
      { id: 'srt-collab-step-6', label: 'Step 6 — Reportings', description: 'Reporting', type: 'heading', value: 'Reportings' },
    ],
  },
  {
    key: 'srt_video_showcase', label: 'VideoShowcase — SRT in Action',
    pageGroupId: 'srt', pagePath: '/srt',
    description: 'The video showcase: Live Reporting, Dashboard, Team-Performance, Einsatzplanung, Forecasting, Analytics.',
    entries: [
      { id: 'srt-video-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'SRT in Aktion' },
      { id: 'srt-video-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'SIEH DAS SRT LIVE.' },
      { id: 'srt-video-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Jede Funktion demonstriert. Wähle eine Funktion und sieh zu.' },
    ],
  },

  /* ════════════════════════════════════════════ LÖSUNGEN — Additional Sections ════════════════════ */
  /* ════════════════════════════════════════════ CASE STUDIES — Additional Sections ════════════════════ */
  {
    key: 'casestudies_intro', label: 'Case Studies Intro — Performance Section',
    pageGroupId: 'case_studies', pagePath: '/fallbeispiele',
    description: 'The performance intro section with stats.',
    entries: [
      { id: 'casestudies-intro-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Performance Marketing für Retail' },
      { id: 'casestudies-intro-p', label: 'Intro Text', description: 'Performance intro', type: 'paragraph', value: 'Das bedeutet für uns, gemeinsam mit und für unsere Kunden messbare Erfolge zu erzielen.' },
      { id: 'casestudies-intro-stat-1', label: 'Stat — Projekte', description: 'Projects', type: 'stat', value: '>500' },
      { id: 'casestudies-intro-stat-1-label', label: 'Stat Label', description: 'Projects label', type: 'stat-label', value: 'Projekte' },
      { id: 'casestudies-intro-stat-2', label: 'Stat — Einsätze', description: 'Assignments', type: 'stat', value: '>1,35 Mio.' },
      { id: 'casestudies-intro-stat-2-label', label: 'Stat Label', description: 'Assignments label', type: 'stat-label', value: 'Einsätze' },
      { id: 'casestudies-intro-stat-3', label: 'Stat — POS', description: 'POS count', type: 'stat', value: '>100.000' },
      { id: 'casestudies-intro-stat-3-label', label: 'Stat Label', description: 'POS label', type: 'stat-label', value: 'POS' },
    ],
  },
  {
    key: 'casestudies_cta', label: 'Case Studies CTA — Bottom Action',
    pageGroupId: 'case_studies', pagePath: '/fallbeispiele',
    description: 'The bottom CTA section.',
    entries: [
      { id: 'casestudies-cta-badge', label: 'CTA Badge', description: 'Badge', type: 'badge', value: 'Lass uns sprechen' },
      { id: 'casestudies-cta-heading', label: 'CTA Heading', description: 'Heading', type: 'heading', value: 'Deine Marke. Unser Einsatz.' },
      { id: 'casestudies-cta-sub', label: 'CTA Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Wir bringen deine Marke dort zum Leuchten, wo die Kaufentscheidung fällt.' },
      { id: 'casestudies-cta-btn-1', label: 'CTA Button 1', description: 'Primary CTA', type: 'cta', value: 'Gespräch buchen' },
      { id: 'casestudies-cta-btn-2', label: 'CTA Button 2', description: 'Secondary CTA', type: 'cta', value: 'Leistungen ansehen' },
    ],
  },

  /* ════════════════════════════════════════════ TEAM — Additional Sections ════════════════════ */
  {
    key: 'team_stats', label: 'TeamStats — Numbers Section',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The team statistics section with key numbers.',
    entries: [
      { id: 'team-stats-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Our Numbers' },
      { id: 'team-stats-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'ZAHLEN, DIE SPRECHEN' },
      { id: 'team-stats-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Über ein Jahrzehnt Erfahrung mit den größten Marken' },
    ],
  },
  {
    key: 'team_corevalues', label: 'CoreValues — Four Values',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The four core values: Mensch, Motivation, Daten, Werkzeug.',
    entries: [
      { id: 'team-values-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Our Values' },
      { id: 'team-values-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'UNSERE WERTE' },
      { id: 'team-values-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Vier Säulen, die unsere Arbeitsweise definieren' },
    ],
  },
  {
    key: 'team_meet_the_team', label: 'MeetTheTeam — Team Profiles',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The meet the team section with 6 profiles.',
    entries: [
      { id: 'team-mtt-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Our People' },
      { id: 'team-mtt-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'MEET THE TEAM' },
      { id: 'team-mtt-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Real people, real stories, real impact' },
    ],
  },
  {
    key: 'team_training', label: 'TrainingDevelopment — Growth Section',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The training and development section.',
    entries: [
      { id: 'team-training-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Growth & Development' },
      { id: 'team-training-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'TRAINING & ENTWICKLUNG' },
      { id: 'team-training-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Wir investieren kontinuierlich in die Entwicklung unserer Mitarbeiter.' },
    ],
  },
  {
    key: 'team_recruitment', label: 'RecruitmentPhilosophy — Hiring Section',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The recruitment philosophy: Einstellung über alles.',
    entries: [
      { id: 'team-recruit-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'EINSTELLUNG ÜBER ALLES' },
      { id: 'team-recruit-p1', label: 'Paragraph 1', description: 'First paragraph', type: 'paragraph', value: 'Wir suchen Leute, die zusammen mit uns anpacken wollen. Dabei ist uns deine Einstellung zum Job wichtiger als die Aufstellung deiner beruflichen Stationen.', multiline: true },
      { id: 'team-recruit-card-1', label: 'Card — Leidenschaft', description: 'Passion', type: 'heading', value: 'Leidenschaft' },
      { id: 'team-recruit-card-2', label: 'Card — Teamgeist', description: 'Team spirit', type: 'heading', value: 'Teamgeist' },
      { id: 'team-recruit-card-3', label: 'Card — Ambition', description: 'Ambition', type: 'heading', value: 'Ambition' },
    ],
  },
  {
    key: 'team_clienttrust', label: 'ClientTrust — Brand Trust Section',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The client trust section with brand logos.',
    entries: [
      { id: 'team-trust-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'VERTRAUEN VON WELTMARKEN' },
      { id: 'team-trust-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Unsere Teams arbeiten täglich mit den größten Marken der Welt.' },
    ],
  },
  {
    key: 'team_cta', label: 'TeamCTA — Join the Team',
    pageGroupId: 'team', pagePath: '/team',
    description: 'The team CTA: Bereit anzupacken?',
    entries: [
      { id: 'team-cta-badge', label: 'CTA Badge', description: 'Section badge', type: 'badge', value: 'Werde Teil des Teams' },
      { id: 'team-cta-heading', label: 'CTA Heading', description: 'Main heading', type: 'heading', value: 'BEREIT ANZUPACKEN?' },
      { id: 'team-cta-sub', label: 'CTA Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Wenn du Lust hast, bei uns wirklich etwas zu bewegen, dann bewirb dich jetzt.' },
      { id: 'team-cta-btn-1', label: 'CTA Button 1', description: 'Jobs button', type: 'cta', value: 'Offene Stellen ansehen' },
      { id: 'team-cta-btn-2', label: 'CTA Button 2', description: 'Initiativ button', type: 'cta', value: 'Initiativbewerbung' },
    ],
  },

  /* ════════════════════════════════════════════ INDUSTRIES — Additional Sections ════════════════════ */
  {
    key: 'industries_grid', label: 'IndustryGrid — 6 Industry Cards',
    pageGroupId: 'industries', pagePath: '/industries',
    description: 'The industry grid section with 6 industry cards.',
    entries: [
      { id: 'industries-grid-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Unsere Sektoren' },
      { id: 'industries-grid-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'BRANCHEN-EXPERTISE.' },
      { id: 'industries-grid-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Bewährte Erfolge in verschiedenen Sektoren mit maßgeschneiderten Strategien.' },
    ],
  },
  {
    key: 'industries_expertise', label: 'IndustryExpertise — What Sets Us Apart',
    pageGroupId: 'industries', pagePath: '/industries',
    description: 'The expertise grid with 6 differentiators.',
    entries: [
      { id: 'industries-expertise-badge', label: 'Section Badge', description: 'Section badge', type: 'badge', value: 'Unsere Kompetenz' },
      { id: 'industries-expertise-heading', label: 'Main Heading', description: 'Main heading', type: 'heading', value: 'WAS UNS UNTERSCHEIDET' },
      { id: 'industries-expertise-sub', label: 'Subtitle', description: 'Subtitle', type: 'paragraph', value: '17+ Jahre Branchen-Expertise mit nachweisbaren Ergebnissen für führende Marken.' },
    ],
  },
  {
    key: 'industries_cta', label: 'IndustryCTA — Contact Section',
    pageGroupId: 'industries', pagePath: '/industries',
    description: 'The industries CTA: Lass uns deine Branche besprechen.',
    entries: [
      { id: 'industries-cta-badge', label: 'CTA Badge', description: 'Badge', type: 'badge', value: 'Kein Commitment. Nur ein Gespräch.' },
      { id: 'industries-cta-heading', label: 'CTA Heading', description: 'Main heading', type: 'heading', value: 'LASS UNS DEINE BRANCHE BESPRECHEN.' },
      { id: 'industries-cta-sub', label: 'CTA Subtitle', description: 'Subtitle', type: 'paragraph', value: 'Produktlaunch, Markteintritt oder Optimierung — wir haben die Branchenexpertise.' },
      { id: 'industries-cta-btn-1', label: 'CTA Button 1', description: 'Consult button', type: 'cta', value: 'Beratung anfragen' },
    ],
  },

  /* ════════════════════════════════════════════ JOBS — Additional Section ════════════════════ */
  {
    key: 'jobs_cta', label: 'Jobs CTA — Initiativbewerbung Strip',
    pageGroupId: 'jobs', pagePath: '/jobs',
    description: 'The bottom CTA strip for the jobs page.',
    entries: [
      { id: 'jobs-cta-badge', label: 'CTA Badge', description: 'Badge', type: 'badge', value: 'Keine passende Stelle dabei?' },
      { id: 'jobs-cta-heading', label: 'CTA Heading', description: 'Main heading', type: 'heading', value: 'Initiativbewerbung jederzeit willkommen.' },
      { id: 'jobs-cta-btn', label: 'CTA Button', description: 'Button text', type: 'cta', value: 'Initiativ bewerben' },
    ],
  },

  /* ════════════════════ RATGEBER ARTICLES — 11 Sub-Pages ════════════════════ */
  {
    key: 'ratgeber_markenaktivierung', label: 'Ratgeber — Markenaktivierung',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/markenaktivierung',
    description: 'Markenaktivierung article: hero, answer-first, section titles, and CTA.',
    entries: [
      { id: 'rgba-ma-hero-badge', label: 'Hero Badge', description: 'Hero badge', type: 'badge', value: 'Markenaktivierung' },
      { id: 'rgba-ma-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'MARKEN' },
      { id: 'rgba-ma-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'AKTIVIERUNG' },
      { id: 'rgba-ma-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie Marken vom Logo zum Erlebnis werden — der strategische Prozess der Aktivierung' },
      { id: 'rgba-ma-hero-summary', label: 'Hero Summary', description: 'Hero summary text', type: 'paragraph', value: 'Markenaktivierung beschreibt den strategischen Prozess, eine Marke aus ihrer passiven Existenz in die aktive, erlebbare Welt zu überführen.', multiline: true },
      { id: 'rgba-ma-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Aktivieren Sie das volle' },
      { id: 'rgba-ma-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Potenzial Ihrer Marke' },
      { id: 'rgba-ma-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Entwickeln Sie mit uns Ihre individuelle Markenaktivierungs-Strategie. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_retail_merch', label: 'Ratgeber — Retail Merchandising',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/retail-merchandising',
    description: 'Retail Merchandising article: hero, answer-first, and CTA.',
    entries: [
      { id: 'rgba-rm-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'RETAIL' },
      { id: 'rgba-rm-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'MERCHANDISING' },
      { id: 'rgba-rm-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie professionelle Warenpräsentation Abverkäufe messbar steigert und Regallücken verhindert' },
      { id: 'rgba-rm-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Maximieren Sie Ihre' },
      { id: 'rgba-rm-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Regal-Performance' },
      { id: 'rgba-rm-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Sprechen Sie mit uns über Ihre Merchandising-Strategie. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_promopersonal', label: 'Ratgeber — Promotionspersonal',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/promotionspersonal',
    description: 'Promotionspersonal article: hero, answer-first, and CTA.',
    entries: [
      { id: 'rgba-pp-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'PROMOTIONS' },
      { id: 'rgba-pp-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'PERSONAL' },
      { id: 'rgba-pp-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie Sie die richtigen Markenbotschafter finden, schulen und erfolgreich einsetzen' },
      { id: 'rgba-pp-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Finden Sie die richtigen' },
      { id: 'rgba-pp-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Markenbotschafter' },
      { id: 'rgba-pp-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Sprechen Sie mit uns über Ihr Personalprofil und Ihren Bedarf. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_messe_event', label: 'Ratgeber — Messe- & Eventmarketing',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/messe-eventmarketing',
    description: 'Messe- & Eventmarketing article: hero and CTA.',
    entries: [
      { id: 'rgba-me-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'MESSE- &' },
      { id: 'rgba-me-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'EVENTMARKETING' },
      { id: 'rgba-me-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie Marken auf Messen und Events maximale Sichtbarkeit und messbare Leads erzielen' },
      { id: 'rgba-me-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Ihr nächster Messeauftritt' },
      { id: 'rgba-me-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'wird Ihr erfolgreichster' },
      { id: 'rgba-me-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Sprechen wir über Ihre Messe- und Eventstrategie. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_field_marketing', label: 'Ratgeber — Field Marketing & Sampling',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/field-marketing-sampling',
    description: 'Field Marketing & Sampling article: hero and CTA.',
    entries: [
      { id: 'rgba-fm-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'FIELD MARKETING' },
      { id: 'rgba-fm-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: '& SAMPLING' },
      { id: 'rgba-fm-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie Produktproben und persönliche Ansprache Neukunden gewinnen und Markentreue aufbauen' },
      { id: 'rgba-fm-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Starten Sie Ihre nächste' },
      { id: 'rgba-fm-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Sampling-Kampagne' },
      { id: 'rgba-fm-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Lassen Sie uns gemeinsam den optimalen Field-Marketing-Plan entwickeln. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_guerilla', label: 'Ratgeber — Guerilla Marketing',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/guerilla-marketing',
    description: 'Guerilla Marketing article: hero and CTA.',
    entries: [
      { id: 'rgba-gm-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'GUERILLA' },
      { id: 'rgba-gm-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'MARKETING' },
      { id: 'rgba-gm-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie unkonventionelle Ideen mit kleinem Budget maximale Aufmerksamkeit und virale Reichweite erzeugen' },
      { id: 'rgba-gm-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Ihre nächste Guerilla-Aktion' },
      { id: 'rgba-gm-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'wird legendär' },
      { id: 'rgba-gm-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Entwickeln Sie mit uns eine Guerilla-Strategie, die Ihre Marke ins Gespräch bringt. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_live_shopping', label: 'Ratgeber — Live Shopping',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/live-shopping',
    description: 'Live Shopping article: hero and CTA.',
    entries: [
      { id: 'rgba-ls-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'LIVE' },
      { id: 'rgba-ls-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'SHOPPING' },
      { id: 'rgba-ls-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie interaktive Video-Beratung den E-Commerce revolutioniert und Conversion-Raten vervielfacht' },
      { id: 'rgba-ls-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Starten Sie Ihr erstes' },
      { id: 'rgba-ls-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Live Shopping Event' },
      { id: 'rgba-ls-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Sprechen Sie mit uns über Ihre Live-Shopping-Strategie. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_erlebnis', label: 'Ratgeber — Erlebnismarketing',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/erlebnismarketing',
    description: 'Erlebnismarketing article: hero and CTA.',
    entries: [
      { id: 'rgba-em-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'ERLEBNISMARKETING' },
      { id: 'rgba-em-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'STRATEGIE' },
      { id: 'rgba-em-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie Marken durch emotionale Erlebnisse messbare Markentreue aufbauen' },
      { id: 'rgba-em-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Bereit für Ihr nächstes' },
      { id: 'rgba-em-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Markenerlebnis?' },
      { id: 'rgba-em-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Sprechen Sie mit uns über Ihre Erlebnismarketing-Strategie. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_nachhaltigkeit', label: 'Ratgeber — Nachhaltigkeitsmarketing',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/nachhaltigkeitsmarketing',
    description: 'Nachhaltigkeitsmarketing article: hero and CTA.',
    entries: [
      { id: 'rgba-nm-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'NACHHALTIGKEITS' },
      { id: 'rgba-nm-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'MARKETING' },
      { id: 'rgba-nm-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie grüne Markenstrategien Glaubwürdigkeit aufbauen und messbare Wettbewerbsvorteile schaffen' },
      { id: 'rgba-nm-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Machen Sie Nachhaltigkeit zum' },
      { id: 'rgba-nm-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Markenvorteil' },
      { id: 'rgba-nm-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Entwickeln Sie mit uns eine Nachhaltigkeitsstrategie, die wirkt und verkauft. Kostenfrei, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_mystery', label: 'Ratgeber — Mystery Shopping',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/mystery-shopping',
    description: 'Mystery Shopping article: hero and CTA.',
    entries: [
      { id: 'rgba-ms-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'MYSTERY' },
      { id: 'rgba-ms-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'SHOPPING' },
      { id: 'rgba-ms-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie verdeckte Testkäufe und objektive Service-Messung Ihre Kundenerfahrung messbar verbessern' },
      { id: 'rgba-ms-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Messen Sie Ihre' },
      { id: 'rgba-ms-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'Service-Qualität' },
      { id: 'rgba-ms-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Entwickeln Sie mit uns ein Mystery-Shopping-Programm. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },
  {
    key: 'ratgeber_verkaufsfoerderung', label: 'Ratgeber — Verkaufsförderung am POS',
    pageGroupId: 'ratgeber', pagePath: '/ratgeber/verkaufsfoerderung-pos',
    description: 'Verkaufsförderung am POS article: hero and CTA.',
    entries: [
      { id: 'rgba-vp-h1', label: 'H1', description: 'H1 first part', type: 'heading', value: 'VERKAUFSFÖRDERUNG' },
      { id: 'rgba-vp-h1-accent', label: 'H1 Accent', description: 'H1 accent', type: 'heading', value: 'AM POS' },
      { id: 'rgba-vp-hero-sub', label: 'Hero Subtitle', description: 'Hero subtitle', type: 'paragraph', value: 'Wie Sie aus Regalplatzierung und Markenaktivierung messbare Umsatzsteigerung machen' },
      { id: 'rgba-vp-cta-headline', label: 'CTA Headline', description: 'CTA headline', type: 'heading', value: 'Ihre POS-Verkaufsförderung auf' },
      { id: 'rgba-vp-cta-accent', label: 'CTA Accent', description: 'CTA accent', type: 'heading', value: 'dem nächsten Level' },
      { id: 'rgba-vp-cta-sub', label: 'CTA Subline', description: 'CTA subline', type: 'paragraph', value: 'Lassen Sie uns Ihre POS-Strategie besprechen. Kostenfrei, unverbindlich, 30 Minuten.' },
    ],
  },

  /* ════════════════════ LEISTUNGEN CONTENT SECTIONS ════════════════════ */
  {
    key: 'leistungen_events_content', label: 'Events & Messen — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/events-messen',
    description: 'Events & Messen: challenge heading, solution heading, process heading.',
    entries: [
      { id: 'events-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'Ein Moment, viele Baustellen.' },
      { id: 'events-challenge-sub', label: 'Challenge Subline', description: 'Challenge section subline', type: 'paragraph', value: 'Warum der Wow-Effekt bei Messen und Events nicht immer eintritt.' },
      { id: 'events-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'MESSE- UND EVENT-FULL SERVICE.' },
      { id: 'events-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Wir setzen alles daran, dass dein Messe- oder Event-Auftritt zur Erfolgsgeschichte wird.' },
      { id: 'events-process-heading', label: 'Process Heading', description: 'Process H2', type: 'heading', value: 'So arbeiten wir' },
      { id: 'events-process-sub', label: 'Process Subline', description: 'Process description', type: 'paragraph', value: 'Von der Planung bis zum Reporting: ideenreich, professionell und zuverlässig.' },
      { id: 'events-cta-btn', label: 'CTA Button', description: 'CTA button text', type: 'cta', value: 'Beratungsgespräch buchen' },
    ],
  },
  {
    key: 'leistungen_pos_content', label: 'POS Full Service — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/pos-full-service',
    description: 'POS Full Service: challenge, solution, assets, process headings.',
    entries: [
      { id: 'pos-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'POS-Qualität sichern ist aufwändig.' },
      { id: 'pos-challenge-sub', label: 'Challenge Subline', description: 'Challenge subline', type: 'paragraph', value: 'Warum es die Big Idea nicht immer bis ins Outlet schafft.' },
      { id: 'pos-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'Dein POS-Komplettpaket.' },
      { id: 'pos-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Von der Kreation bis zum letzten Handgriff übernehmen wir alle Leistungen.' },
      { id: 'pos-assets-heading', label: 'Assets Heading', description: 'Assets H2', type: 'heading', value: 'POS-Materialien & Branding' },
      { id: 'pos-assets-sub', label: 'Assets Subline', description: 'Assets description', type: 'paragraph', value: 'Wir setzen deine Vorstellung vom idealen POS-Auftritt um.' },
      { id: 'pos-process-heading', label: 'Process Heading', description: 'Process H2', type: 'heading', value: 'So arbeiten wir' },
      { id: 'pos-process-sub', label: 'Process Subline', description: 'Process description', type: 'paragraph', value: 'Von der Planung bis zur Umsetzung: professionell und effizient.' },
    ],
  },
  {
    key: 'leistungen_staff_content', label: 'Staff as a Service — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/staff-as-a-service',
    description: 'Staff as a Service: challenge, solution, process, specializations, SOCKS headings.',
    entries: [
      { id: 'staff-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'Staffing flexibilisieren ist komplex.' },
      { id: 'staff-challenge-sub', label: 'Challenge Subline', description: 'Challenge subline', type: 'paragraph', value: 'Im Bereich Sales und Promotion kommt klassisches Recruiting ans Limit.' },
      { id: 'staff-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'PERSONALDIENSTLEISTUNG ALS DIGITALISIERTER SERVICE.' },
      { id: 'staff-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Recruiting Task Force — Auswahl, Betreuung und Abrechnung aus einer Hand.' },
      { id: 'staff-process-heading', label: 'Process Heading', description: 'Process H2', type: 'heading', value: 'So läuft die Personalbeschaffung mit Sonic' },
      { id: 'staff-specs-heading', label: 'Specializations Heading', description: 'Specializations H2', type: 'heading', value: 'ARBEITNEHMERÜBERLASSUNG FÜR DEINE FIELD FORCE.' },
      { id: 'staff-socks-heading', label: 'SOCKS Heading', description: 'SOCKS H2', type: 'heading', value: 'Das S.O.C.K.S.-Prinzip' },
      { id: 'staff-socks-sub', label: 'SOCKS Subline', description: 'SOCKS description', type: 'paragraph', value: 'Unsere Qualitätsstrategie für Planung und Umsetzung von Sell-out-Maßnahmen.' },
    ],
  },
  {
    key: 'leistungen_video_content', label: 'Live Video — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/video',
    description: 'Live Video: challenge, solution, advantages, phygital, formats headings.',
    entries: [
      { id: 'video-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'Bewegtbild ist die Königsklasse.' },
      { id: 'video-challenge-sub', label: 'Challenge Subline', description: 'Challenge subline', type: 'paragraph', value: 'Wenn (Live) Video Shopping einfach wäre, würde es jede Marke machen. Ist es aber nicht.' },
      { id: 'video-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'Sonic (Live) Video im Full Service.' },
      { id: 'video-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Echte Menschen, geschult auf dein Produkt, beraten in Echtzeit.' },
      { id: 'video-advantages-heading', label: 'Advantages Heading', description: 'Advantages H2', type: 'heading', value: 'Darum (Live) Video Promotion' },
      { id: 'video-phygital-heading', label: 'Phygital Heading', description: 'Phygital H2', type: 'heading', value: 'Phygital optimal nutzen' },
      { id: 'video-formats-heading', label: 'Formats Heading', description: 'Formats H2', type: 'heading', value: '6 Formate. Ein Partner.' },
    ],
  },
  {
    key: 'leistungen_kreation_content', label: 'Kreation & Content — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/kreation-content',
    description: 'Kreation & Content: challenge, solution, stats, CTA headings.',
    entries: [
      { id: 'kreation-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'Content aus zu vielen Einzelteilen.' },
      { id: 'kreation-challenge-sub', label: 'Challenge Subline', description: 'Challenge subline', type: 'paragraph', value: 'Assets kommen oft aus verschiedenen Quellen.' },
      { id: 'kreation-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'Content aus einer Hand. Inhouse.' },
      { id: 'kreation-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Von Kampagnenkonzept bis Design und Roll-out, von Fotografie bis zu (Live) Video.' },
      { id: 'kreation-cta-btn', label: 'CTA Button', description: 'CTA button text', type: 'cta', value: 'Content-Beratung buchen' },
    ],
  },
  {
    key: 'leistungen_talentpool_content', label: 'Talentpool — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/talentpool',
    description: 'Talentpool: challenge, solution, profiles, stats headings.',
    entries: [
      { id: 'talentpool-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'Wechselnde Gesichter. Kein Markenwissen. Kein ROI.' },
      { id: 'talentpool-challenge-sub', label: 'Challenge Subline', description: 'Challenge subline', type: 'paragraph', value: 'Das Standardmodell in der Promotion-Branche ist kaputt.' },
      { id: 'talentpool-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'DER SONIC-TALENTEPOOL. KEIN VERGLEICH.' },
      { id: 'talentpool-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Festangestellt, trainiert und live-getrackt — das ist der Unterschied.' },
      { id: 'talentpool-profiles-heading', label: 'Profiles Heading', description: 'Profiles H2', type: 'heading', value: '4 ROLLEN. EIN ANSPRECHPARTNER.' },
      { id: 'talentpool-profiles-sub', label: 'Profiles Subline', description: 'Profiles description', type: 'paragraph', value: 'Jeden Talent-Typ aus einer Hand — koordiniert, geschult und live getrackt.' },
    ],
  },
  {
    key: 'leistungen_forecasting_content', label: 'Forecasting — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/forecasting',
    description: 'Forecasting: challenge, solution, how-it-works, stats headings.',
    entries: [
      { id: 'forecasting-challenge-heading', label: 'Challenge Heading', description: 'Challenge section H2', type: 'heading', value: 'Ohne Prognose fliegt ihr im Blindflug.' },
      { id: 'forecasting-challenge-sub', label: 'Challenge Subline', description: 'Challenge subline', type: 'paragraph', value: 'Zu viele Retail-Projekte starten ohne belastbare Planung.' },
      { id: 'forecasting-solution-heading', label: 'Solution Heading', description: 'Solution H2', type: 'heading', value: 'FORECASTING. DATENBASIERT. BELASTBAR.' },
      { id: 'forecasting-solution-sub', label: 'Solution Subline', description: 'Solution description', type: 'paragraph', value: 'Prognosen auf echten Daten — nicht auf Excel-Tabellen und Bauchgefühl.' },
      { id: 'forecasting-how-heading', label: 'How Heading', description: 'How-it-works H2', type: 'heading', value: 'In 4 Schritten zur belastbaren Prognose' },
      { id: 'forecasting-how-sub', label: 'How Subline', description: 'How description', type: 'paragraph', value: 'Unser Forecasting-Prozess: datenbasiert, transparent und direkt in dein Dashboard integriert.' },
    ],
  },

  /* ════════════════════ LEISTUNGEN SUB-PAGES ADDITIONAL (warehouse-logistik) ════════════════════ */
  {
    key: 'leistungen_warehouse_content', label: 'Warehouse & Logistik — Content',
    pageGroupId: 'leistungen', pagePath: '/leistungen/warehouse-logistik',
    description: 'Warehouse & Logistik: key content headings.',
    entries: [
      { id: 'warehouse-content-heading', label: 'Content Heading', description: 'Main content heading', type: 'heading', value: 'Deine Logistik. Unser Warehouse.' },
      { id: 'warehouse-content-sub', label: 'Content Subline', description: 'Content description', type: 'paragraph', value: 'Full-Service-Logistik mit eigenem Warehouse in Krefeld — für den gesamten DACH-Raum.' },
    ],
  },
];

/* ─────────────────────────────────────────────
   STORAGE — localStorage persistence
───────────────────────────────────────────── */
const STORAGE_KEY = 'sonic_text_store';

/* One-time in-memory normalization: replaces legacy English default copy with German. */
const LEGACY_TEXT_FIXES = [
  { sectionKey: 'about_management_voices', entryId: 'about-voices-badge', from: 'Leadership Perspectives', to: 'Führungsperspektiven' },
  { sectionKey: 'about_management_voices', entryId: 'about-voices-sub', from: 'Strategie, Kreation und Operations — drei Perspektiven, eine Überzeugung.', to: 'Strategie, Kreation und Betrieb — drei Perspektiven, eine Überzeugung.' },
  { sectionKey: 'about_leadership', entryId: 'about-leadership-sub', from: 'Bei Sonic treffen Backgrounds aufeinander, die sich perfekt ergänzen.', to: 'Bei Sonic treffen Expertisen aufeinander, die sich perfekt ergänzen.' },
];

function loadFromStorage(): TextSection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_TEXT_SECTIONS));
    const parsed = JSON.parse(raw) as TextSection[];
    const stored = new Map(parsed.map((s) => [s.key, s]));
    const defaults = JSON.parse(JSON.stringify(DEFAULT_TEXT_SECTIONS)) as TextSection[];
    for (const ds of defaults) {
      if (!stored.has(ds.key)) {
        stored.set(ds.key, ds);
      }
    }
    const sections = Array.from(stored.values());
    for (const fix of LEGACY_TEXT_FIXES) {
      const section = sections.find((s) => s.key === fix.sectionKey);
      if (!section) continue;
      const entry = section.entries.find((e) => e.id === fix.entryId);
      if (entry && entry.value === fix.from) {
        entry.value = fix.to;
      }
    }
    return sections;
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_TEXT_SECTIONS));
  }
}

function saveToStorage(sections: TextSection[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
    window.dispatchEvent(new Event('text-store-update'));
  } catch (e) {
    throw new Error('Failed to save text store');
  }
}

export function getTextSections(): TextSection[] {
  return loadFromStorage();
}

export function getTextSectionsByGroup(pageGroupId: string): TextSection[] {
  return loadFromStorage().filter((s) => s.pageGroupId === pageGroupId);
}

export function getTextSection(key: string): TextSection | undefined {
  return loadFromStorage().find((s) => s.key === key);
}

export function updateTextEntry(sectionKey: string, entryId: string, value: string): void {
  const sections = loadFromStorage();
  const section = sections.find((s) => s.key === sectionKey);
  if (!section) return;
  const entry = section.entries.find((e) => e.id === entryId);
  if (!entry) return;
  entry.value = value;
  saveToStorage(sections);
}

export function resetTextSection(sectionKey: string): void {
  const sections = loadFromStorage();
  const defaults = DEFAULT_TEXT_SECTIONS.find((s) => s.key === sectionKey);
  if (!defaults) return;
  const idx = sections.findIndex((s) => s.key === sectionKey);
  if (idx >= 0) {
    sections[idx] = JSON.parse(JSON.stringify(defaults));
  }
  saveToStorage(sections);
}

export function resetAllText(): void {
  saveToStorage(JSON.parse(JSON.stringify(DEFAULT_TEXT_SECTIONS)));
}

export function getTextSectionCount(groupId: string): number {
  return loadFromStorage().filter((s) => s.pageGroupId === groupId).length;
}

export function getTextEntryCount(groupId: string): number {
  return loadFromStorage()
    .filter((s) => s.pageGroupId === groupId)
    .reduce((sum, s) => sum + s.entries.length, 0);
}

export function getTotalTextCount(): number {
  return loadFromStorage().reduce((sum, s) => sum + s.entries.length, 0);
}

export function getTotalSectionCount(): number {
  return loadFromStorage().length;
}