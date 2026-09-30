export interface JobPosting {
  hash: string;
  title: string;
  location: string;
  department?: string;
  employmentType?: string;
  publishedAt?: string;
  shortDescription?: string;
  intro?: string;
  tasks?: string;
  requirements?: string;
  benefits?: string;
}

export const mockJobs: JobPosting[] = [
  {
    hash: 'field-promoter-dach',
    title: 'Field Promoter (m/w/d) — DACH',
    location: 'Deutschlandweit',
    department: 'Field',
    employmentType: 'Teilzeit / Minijob',
    publishedAt: '2026-04-15',
    shortDescription:
      'Repräsentiere Top-Marken direkt am Point of Sale. Flexible Einsätze bei Events, Messen und im Retail — deutschlandweit.',
    intro:
      '<p>Als Field Promoter bist du das Gesicht von Sonic Group am Point of Sale. Du repräsentierst namhafte Marken bei Events, Messen und im stationären Handel — direkt vor Ort, direkt beim Kunden.</p><p>Ob Produktpräsentation, Sampling oder Beratung: Du bringst Markenerlebnisse auf die Fläche und sorgst für messbare Ergebnisse. Flexible Einsatzplanung, faire Vergütung und ein starkes Team — das ist Sonic Field.</p>',
    tasks:
      '<ul><li>Produktpräsentationen und Live-Demos am POS</li><li>Kundenberatung und aktiver Verkaufssupport</li><li>Sampling-Aktionen und Markenaktivierung</li><li>Dokumentation von Kampagnenergebnissen</li><li>Enge Zusammenarbeit mit dem Field Management</li></ul>',
    requirements:
      '<ul><li>Mindestens 18 Jahre alt</li><li>Flexibilität für deutschlandweite Einsätze</li><li>Kommunikationsstärke und Kundenorientierung</li><li>Erste Erfahrung im Verkauf oder Service von Vorteil</li><li>Führerschein Klasse B wünschenswert</li></ul>',
    benefits:
      '<ul><li>Faire, leistungsgerechte Vergütung</li><li>Flexible Einsatzplanung über die Sonic App</li><li>Regelmäßige Schulungen und Onboarding</li><li>Karrierepfad zum Teamleiter oder Supervisor</li><li>Community-Events und Teamtreffen</li></ul>',
  },
  {
    hash: 'sales-manager-krefeld',
    title: 'Sales Manager (m/w/d)',
    location: 'Krefeld',
    department: 'Sales',
    employmentType: 'Vollzeit',
    publishedAt: '2026-04-10',
    shortDescription:
      'Führe unser Sales-Team in Krefeld. Akquise, Kundenbindung und strategische Markenentwicklung in der DACH-Region.',
    intro:
      '<p>Als Sales Manager bei Sonic Group in Krefeld bist du verantwortlich für die strategische Weiterentwicklung unserer Kundenbeziehungen und die Akquise neuer Markenpartner in der DACH-Region.</p><p>Du führst ein motiviertes Team, entwickelst maßgeschneiderte Sales-Konzepte und sorgst dafür, dass unsere Kunden messbare Erfolge am Point of Sale erzielen.</p>',
    tasks:
      '<ul><li>Neukundenakquise und Bestandskundenpflege</li><li>Entwicklung individueller POS- und Event-Konzepte</li><li>Führung und Coaching des internen Sales-Teams</li><li>Verhandlung von Rahmenverträgen und Kampagnenbudgets</li><li>Enge Abstimmung mit Operations und Kreation</li></ul>',
    requirements:
      '<ul><li>Mindestens 3 Jahre Erfahrung im B2B-Vertrieb</li><li>Erfahrung in der FMCG-, Retail- oder Event-Branche</li><li>Teamführungserfahrung von Vorteil</li><li>Strategisches Denken und Hands-on-Mentalität</li><li>Fließend Deutsch und Englisch</li></ul>',
    benefits:
      '<ul><li>Attraktives Fixgehalt + erfolgsabhängige Provision</li><li>Firmenwagen auch zur privaten Nutzung</li><li>Weiterbildungsbudget und interne Academy</li><li>Modernes Büro im Herzen von Krefeld</li><li>Regelmäßige Teamevents und Incentives</li></ul>',
  },
  {
    hash: 'event-supervisor-berlin',
    title: 'Event Supervisor (m/w/d)',
    location: 'Berlin',
    department: 'Events',
    employmentType: 'Vollzeit',
    publishedAt: '2026-04-08',
    shortDescription:
      'Leite Events und Aktivierungen für Top-Marken in Berlin. Von der Planung bis zur Live-Execution — alles in deiner Hand.',
    intro:
      '<p>Als Event Supervisor in Berlin bist du die Drehscheibe für unsere Live-Aktivierungen in der Hauptstadtregion. Du planst, koordinierst und führst Events durch — von der ersten Idee bis zum finalen Bericht.</p><p>Ob Messestand, Pop-up-Store oder Roadshow: Du sorgst dafür, dass jedes Event ein voller Erfolg wird.</p>',
    tasks:
      '<ul><li>Komplette Event-Planung und -Durchführung</li><li>Leitung von Promoter-Teams vor Ort</li><li>Qualitätskontrolle und Live-Reporting</li><li>Budgetverantwortung und Ressourcenplanung</li><li>Kundenkommunikation während der Kampagnen</li></ul>',
    requirements:
      '<ul><li>Mindestens 2 Jahre Erfahrung in der Event- oder Promotion-Branche</li><li>Teamleitungserfahrung und Durchsetzungsvermögen</li><li>Organisationstalent und Stressresistenz</li><li>Führerschein Klasse B</li><li>Bereitschaft für flexible Arbeitszeiten und Reisen</li></ul>',
    benefits:
      '<ul><li>Attraktives Gehaltspaket</li><li>Flexible Arbeitszeiten und Home-Office-Optionen</li><li>Regelmäßige Weiterbildungen</li><li>Netzwerk zu Top-Marken und Agenturen</li><li>Teamevents und Incentives</li></ul>',
  },
  {
    hash: 'content-creator-krefeld',
    title: 'Content Creator / Social Media (m/w/d)',
    location: 'Krefeld',
    department: 'Kreation',
    employmentType: 'Vollzeit',
    publishedAt: '2026-04-05',
    shortDescription:
      'Kreiere Content für Marken wie Samsung und Groupe SEB. Von Reels bis CGI — deine Kreativität zählt.',
    intro:
      '<p>Als Content Creator bei Sonic Group bist du für die visuelle Erzählung unserer Marken verantwortlich. Du produzierst Content für Social Media, POS-Materialien und digitale Kampagnen — von der Idee bis zum finalen Asset.</p><p>Reels, CGI-Visualisierungen, Fotoshootings: Bei uns ist keine Idee zu wild.</p>',
    tasks:
      '<ul><li>Konzeption und Produktion von Social-Media-Content</li><li>Reels, TikToks und Short-Form-Video-Produktion</li><li>CGI-Visualisierungen und 3D-Renderings</li><li>Fotografie und Bildbearbeitung für POS-Materialien</li><li>Zusammenarbeit mit Kreation, Sales und Kunden</li></ul>',
    requirements:
      '<ul><li>Abgeschlossenes Studium oder Ausbildung im kreativen Bereich</li><li>Sichere Beherrschung von Adobe Creative Suite</li><li>Erfahrung mit Video-Produktion und Schnitt</li><li>Grundkenntnisse in 3D/CGI von Vorteil</li><li>Portfolio mit relevanten Arbeiten</li></ul>',
    benefits:
      '<ul><li>Modernes Studio-Equipment und Software</li><li>Kreative Freiheit und kurze Entscheidungswege</li><li>Arbeiten für internationale Top-Marken</li><li>Weiterbildungsbudget für Kurse und Workshops</li><li>Hybrid-Arbeit möglich</li></ul>',
  },
  {
    hash: 'warehouse-logistik-mitarbeiter',
    title: 'Warehouse & Logistik Mitarbeiter (m/w/d)',
    location: 'Krefeld',
    department: 'Logistik',
    employmentType: 'Vollzeit',
    publishedAt: '2026-04-01',
    shortDescription:
      'Sorge dafür, dass unsere POS-Materialien, Produkte und Equipment pünktlich am richtigen Ort sind.',
    intro:
      '<p>Als Warehouse & Logistik Mitarbeiter bist du das Rückgrat unserer operativen Exzellenz. Du sorgst dafür, dass Materialien, Produkte und Equipment pünktlich und in perfektem Zustand an den richtigen Standorten ankommen.</p><p>Von der Wareneingangskontrolle bis zur Versandkoordination — du hältst den Takt in unserem Logistikzentrum in Krefeld.</p>',
    tasks:
      '<ul><li>Wareneingang, -lagerung und -kommissionierung</li><li>Versandkoordination und Tracking</li><li>Bestandsmanagement und Inventur</li><li>Qualitätskontrolle von POS-Materialien</li><li>Zusammenarbeit mit Field- und Event-Teams</li></ul>',
    requirements:
      '<ul><li>Erste Erfahrung in der Lager- oder Logistik-Branche</li><li>Gabelstaplerschein von Vorteil</li><li>Sorgfalt und Zuverlässigkeit</li><li>Teamfähigkeit und Belastbarkeit</li><li>Grundkenntnisse in Warenwirtschaftssystemen</li></ul>',
    benefits:
      '<ul><li>Faire Vergütung mit Zulagen</li><li>Regelmäßige Arbeitszeiten</li><li>Modernes Lager mit guter Infrastruktur</li><li>Weiterentwicklungsmöglichkeiten</li><li>Betriebliche Altersvorsorge</li></ul>',
  },
  {
    hash: 'teamleiter-field-nrw',
    title: 'Teamleiter Field (m/w/d) — NRW',
    location: 'Nordrhein-Westfalen',
    department: 'Field',
    employmentType: 'Vollzeit',
    publishedAt: '2026-03-28',
    shortDescription:
      'Führe ein Team von Field Promotern in NRW. Planung, Coaching und Qualitätssicherung vor Ort.',
    intro:
      '<p>Als Teamleiter Field in NRW bist du die Schnittstelle zwischen unserem Field Management und den Promotern vor Ort. Du planst Einsätze, coacht dein Team und sorgst für höchste Qualitätsstandards bei jeder Aktivierung.</p><p>Du kennst die Region, die Märkte und die Menschen — und bringst das Beste aus beiden Seiten zusammen.</p>',
    tasks:
      '<ul><li>Einsatzplanung und Koordination der Promoter-Teams</li><li>Recruiting, Onboarding und Coaching neuer Mitarbeiter</li><li>Qualitätskontrolle und Mystery Shopping</li><li>Live-Reporting und Kundenfeedback</li><li>Enge Zusammenarbeit mit dem Field Management</li></ul>',
    requirements:
      '<ul><li>Mindestens 2 Jahre Erfahrung in der Promotion- oder Event-Branche</li><li>Teamleitungserfahrung und Coaching-Kompetenz</li><li>Regionale Kenntnisse in NRW</li><li>Führerschein Klasse B</li><li>Kommunikationsstärke und Durchsetzungsvermögen</li></ul>',
    benefits:
      '<ul><li>Attraktives Gehalt + Team-Bonus</li><li>Firmenwagen zur privaten Nutzung</li><li>Weiterbildung zum Field Manager</li><li>Flexible Arbeitszeiten</li><li>Teamevents und Incentives</li></ul>',
  },
  {
    hash: 'praktikum-marketing-krefeld',
    title: 'Praktikum Marketing & Kommunikation (m/w/d)',
    location: 'Krefeld',
    department: 'Marketing',
    employmentType: 'Praktikum',
    publishedAt: '2026-03-20',
    shortDescription:
      'Schnupper in die Welt von Sonic Group. Unterstütze unser Marketing-Team bei Kampagnen, Content und Events.',
    intro:
      '<p>Unser Praktikum im Marketing-Team ist der perfekte Einstieg in die Agenturwelt. Du unterstützt bei der Konzeption und Umsetzung von Marketingkampagnen, erstellst Content und lernst alle Facetten der Markenkommunikation kennen.</p><p>Keine Kaffeeküche — echte Projekte, echte Verantwortung, echtes Lernen.</p>',
    tasks:
      '<ul><li>Unterstützung bei Marketingkampagnen und -aktionen</li><li>Content-Erstellung für Social Media und Website</li><li>Recherche und Analyse von Markttrends</li><li>Unterstützung bei Event-Planung und -Durchführung</li><li>Zusammenarbeit mit allen Abteilungen</li></ul>',
    requirements:
      '<ul><li>Immatrikulation an einer Hochschule oder Universität</li><li>Erste Erfahrung in Marketing oder Kommunikation</li><li>Kreativität und Hands-on-Mentalität</li><li>Sichere Deutsch- und Englischkenntnisse</li><li>Mindestens 3 Monate Verfügbarkeit</li></ul>',
    benefits:
      '<ul><li>Praktikumsvergütung</li><li>Flexible Arbeitszeiten (auch neben dem Studium)</li><li>Mentoring durch erfahrene Kollegen</li><li>Übernahmechance nach dem Praktikum</li><li>Teamevents und Networking</li></ul>',
  },
];