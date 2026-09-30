/**
 * Karriere — content for ticker, the two career paths (incl. tabs), awards and event stats.
 * Single source for the page AND the dashboard (see src/lib/textStoreKarriere.ts).
 * Figures follow the Sonic Agenturpräsentation 2026 (Campus = Sonic Sales Support, POS = Sonic Staff Service).
 */

export const KARRIERE_TICKER = [
  { icon: 'ri-star-fill', value: '4,2 kununu', label: '92 % Weiterempfehlung' },
  { icon: 'ri-google-fill', value: '4,8 Google', label: 'Bewertungen' },
  { icon: 'ri-time-line', value: 'Ø 5,4 J.', label: 'im Campus-Team' },
  { icon: 'ri-time-line', value: 'Ø 2,9 J.', label: 'im POS-Team' },
  { icon: 'ri-user-star-line', value: '200+', label: 'Promoter:innen im Einsatz' },
  { icon: 'ri-user-community-line', value: '1.700+', label: 'im Talentpool' },
  { icon: 'ri-user-add-line', value: '40', label: 'Neueinstellungen im ersten Halbjahr 2026' },
];

export type PathTab =
  | { id: 'gehalt'; label: string; heading: string; rows: { title: string; text: string }[]; note: string }
  | { id: 'benefits'; label: string; items: string[] }
  | { id: 'wachsen'; label: string; rows: { title: string; text: string }[] }
  | { id: 'bewerbung'; label: string; steps: string[] };

const WACHSEN_ROWS = [
  { title: 'Von anderen lernen', text: 'Kolleg:innen teilen ihr Wissen in internen Sessions.' },
  { title: 'Job Rotation', text: 'Zeitweise in ein anderes Team wechseln.' },
  { title: 'Mentoring', text: 'Gemeinsam mit erfahrenen Kolleg:innen Themen erarbeiten.' },
  { title: 'Neue Aufgaben', text: 'Schritt für Schritt mehr Verantwortung übernehmen.' },
  { title: 'Weiterbildung', text: 'Individuelle externe Weiterbildungen.' },
];

export const KARRIERE_PATHS: Record<'sales' | 'staff', {
  title: string;
  headline: string;
  tagline: string;
  stats: { value: string; label: string }[];
  tabs: PathTab[];
}> = {
  sales: {
    title: 'Campus Team',
    headline: 'Dein Job am Campus in Krefeld',
    tagline: 'Projektmanagement, HR, IT, Finance, Kreation: Hier planen und steuern wir die Projekte unserer Kunden. Mit klaren Aufgaben, Mentoring, hybridem Arbeiten und einem Team, das zusammenhält.',
    stats: [
      { value: 'Ø 5,4 J.', label: 'Zugehörigkeit' },
      { value: 'Krefeld', label: 'Arbeitsort' },
      { value: 'Hybrid', label: 'Arbeitsmodell' },
      { value: 'Dual', label: 'Studium' },
    ],
    tabs: [
      { id: 'benefits', label: 'Benefits', items: ['Homeoffice', 'Kaffee & Getränke', 'Obst & Gemüse', 'Mittagessen vom Koch', 'Jobrad', 'Betriebliche Altersvorsorge', 'Kita-Zuschuss', 'Poolfahrzeuge', 'Teamevents', 'Einarbeitung mit Buddy'] },
      { id: 'wachsen', label: 'Wachsen', rows: WACHSEN_ROWS },
      { id: 'bewerbung', label: 'Bewerbung', steps: ['Bewerbung', 'Rückmeldung von unserem HR-Team', 'Erstes Gespräch', 'Gespräch mit dem Team', 'Zusage & digitaler Vertrag'] },
    ],
  },
  staff: {
    title: 'POS Team',
    headline: 'Dein Einsatz am Point of Sale',
    tagline: 'Du berätst, verkaufst und präsentierst Marken aus Consumer Electronics, Haushalt und Sport direkt im Handel – deutschlandweit, mit festen Einsatzorten und -zeiten. Vor jedem Projekt wirst du geschult, und im Projektteam hast du einen festen Ansprechpartner.',
    stats: [
      { value: 'Ø 2,9 J.', label: 'Zugehörigkeit' },
      { value: 'DACH', label: 'Einsatzgebiet' },
      { value: 'Fest geplant', label: 'Einsatzzeiten' },
      { value: '200+', label: 'Promoter:innen' },
    ],
    tabs: [
      {
        id: 'gehalt', label: 'Gehalt', heading: 'Fair. Transparent. Nachvollziehbar.',
        rows: [
          { title: 'Fix', text: 'Ein fester Stundenlohn als verlässliche Basis.' },
          { title: 'Variabel', text: 'Provision nach deinen individuellen Zielen – je nach Projekt.' },
          { title: 'Qualitätsbonus', text: 'Zusätzlich für die Qualität deiner Arbeit.' },
        ],
        note: 'Deine Einsätze, Zeiten und Abrechnungen siehst du jederzeit in der Sonic-App.',
      },
      { id: 'benefits', label: 'Benefits', items: ['Bonusprogramm', 'Verkaufs-Contests', 'Qualitätsbonus', 'Schulungen vor jedem Projekt', 'Onboarding', 'Zusätzliche freie Tage', 'Wellpass (Sport & Fitness)', 'Vorführgeräte', 'Team- & Promoter-Events'] },
      { id: 'wachsen', label: 'Wachsen', rows: WACHSEN_ROWS },
      { id: 'bewerbung', label: 'Bewerbung', steps: ['Bewerbung', 'Rückmeldung von unserem HR-Team', 'Erstes Gespräch', 'Gespräch zu Team & Projekt', 'Bei manchen Projekten: Kennenlernen mit dem Kunden', 'Zusage & digitaler Vertrag'] },
    ],
  },
};

export const KARRIERE_AWARDS = {
  kununuSub: 'Top Company 2022–2026 · 92 % Weiterempfehlung',
  kununuRating: '4,2 ★',
  googleSub: '49 Bewertungen',
  googleRating: '4,8 ★',
};

export const KARRIERE_EVENT_STATS = {
  content: 'Shootings & Videos für unsere Kunden',
  team: 'Sommerfest, Grillen, gemeinsame Mittagessen',
  promoter: 'Kick-offs, Trainings & Contests',
  roadshow: 'Über 200 Events',
};
