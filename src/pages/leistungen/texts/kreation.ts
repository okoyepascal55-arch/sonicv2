import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

const P = '/leistungen/kreation-content';

/* Showcase items per tab: [tag, title, subline]. Slot 6 is the wide card below the bento grid. */
export const SHOWCASE_TABS = ['konzeption', 'innovation', 'ci', 'layout', 'pos'] as const;
const SHOWCASE: Record<typeof SHOWCASE_TABS[number], { label: string; tab: string; desc: string; items: [string, string, string][] }> = {
  konzeption: {
    label: 'Konzeption', tab: 'Konzeption',
    desc: 'Von der ersten Idee bis zur fertigen Kampagne — strategisch und verkaufsstark.',
    items: [
      ['Kampagne', 'shower+ — Full Brand Campaign', 'Von Strategie bis Rollout'],
      ['Markenarchitektur', 'Markenarchitektur & Positionierung', 'Warum deine Marke, warum jetzt'],
      ['Kampagnenkonzept', 'Multi-Channel Kampagnenkonzept', 'Eine Idee. Alle Kanäle.'],
      ['Retail-Strategie', 'Retail-Kommunikationsstrategie', 'Was der Handel braucht. Was deine Marke sagt.'],
      ['Content-Strategie', 'Content-Strategie & Redaktionsplan', 'Themenplanung mit Wirkung'],
      ['Content', 'Content-Produktion mit Menschen', 'Unboxing- & How-to-Videos, Shootings, Livestreams, Social Media'],
    ],
  },
  innovation: {
    label: 'Innovation', tab: 'Innovation',
    desc: '#doing new things: KI, interaktive Formate und neues Storytelling.',
    items: [
      ['KI-Konzept', 'KI-gestützte Konzeptentwicklung', 'Schneller von der Idee zum Konzept'],
      ['Livestream', 'Livestreams & Produktvideos', 'Live aus dem Sonic Studio'],
      ['Interaktiv', 'Interaktive Formate & Experiences', 'Marken, die man anfassen kann'],
      ['CGI & Viz', 'CGI-Visualisierungen & Motion', 'Vor dem Bau schon erlebbar'],
      ['New Formats', 'Neue Kommunikationsformate', 'Was morgen funktioniert. Heute entwickelt.'],
      ['Social', 'Social-Media-Formate', 'Nah dran an Zielgruppe und Produkt'],
    ],
  },
  ci: {
    label: 'CI', tab: 'CI',
    desc: 'Markenidentitäten, die standhalten — vom Logo bis zum vollständigen CI-System.',
    items: [
      ['CI-System', 'Corporate Identity Entwicklung', 'Das vollständige Markensystem'],
      ['Logo & Brand', 'Logo-Design & Markenzeichen', 'Erkennbar. Konsistent. Unverwechselbar.'],
      ['Typografie', 'Typografie & Farbsystem', 'Die Stimme deiner Marke — visuell'],
      ['Brand Manual', 'Corporate Design Manual', 'Dein Regelwerk für alle Partner'],
      ['Rollout', 'CI-Rollout auf alle Touchpoints', 'Vom Briefpapier bis zum Messestand'],
      ['Vorlagen', 'Briefings, Vorlagen & Reinzeichnungen', 'Auf Marke, auf Medium.'],
    ],
  },
  layout: {
    label: 'Layout', tab: 'Layout',
    desc: 'Print, Digital, Packaging — Layout-Qualität, die deine Marke trägt.',
    items: [
      ['Print', 'Print-Konzeption & Reinzeichnung', 'Druckfertige Dateien. Sauber umgesetzt.'],
      ['Packaging', 'Packaging Design', 'Regalpräsenz, die verkauft'],
      ['Katalog', 'Katalog- & Prospektgestaltung', 'Komplexes einfach und klar kommuniziert'],
      ['Digital', 'Digital Layout & Screendesign', 'Web, App, Social — konsistentes Design'],
      ['POS-Layout', 'POS-Kommunikation & Werbemittel', 'Preisschilder bis Schaufenstergestaltung'],
      ['Promotion', 'Promotion- & Schulungsmaterial', 'Für Promoter:innen, Handel und Training'],
    ],
  },
  pos: {
    label: 'POS', tab: 'POS',
    desc: 'Displays, Ladenbau, Messe: Markenauftritte am Point of Sale, die verkaufen.',
    items: [
      ['Display', 'Displays & Aufsteller', 'Auffällig. Markenkonform. Verkaufsaktiv.'],
      ['Ladenbau', 'Shopfitting & Ladenbaukonzepte', 'Flächen, die Marken erlebbar machen'],
      ['Messe', 'Messestand-Design & -Bau', 'Von der Skizze bis zum fertigen Stand'],
      ['Shop-in-Shop', 'Shop-in-Shop Konzepte', 'Markenwelt im Handel'],
      ['Rollout', 'Bundesweiter POS-Rollout', 'Einheitlich. Schnell. Skalierbar.'],
      ['Aktionsfläche', 'Promotion-Flächen & Aktionsstände', 'Wo Beratung und Marke zusammenkommen'],
    ],
  },
};

const CAROUSEL_LABELS = [
  'Produktfotografie', 'Brand Design', 'Video Produktion', 'CGI & 3D',
  'Social Content', 'POS & Events', 'Print & Packaging', 'Beauty', 'Food & Lifestyle',
];

export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_kreation_hero_stats', 'Kreation & Content — Hero Kennzahlen & Button', P,
    'Die drei Kennzahlen im Hero (reine Zahlen wie „>47.000“ zählen hoch, Text wie „Seit 2007“ oder „Inhouse“ steht fest) und der zweite Hero-Button.', [
      e('s1-value', 'Kennzahl 1 — Wert', 'stat', 'Seit 2007'),
      e('s1-label', 'Kennzahl 1 — Label', 'stat-label', 'Marken erlebbar machen'),
      e('s2-value', 'Kennzahl 2 — Wert', 'stat', 'Inhouse'),
      e('s2-label', 'Kennzahl 2 — Label', 'stat-label', 'Konzept bis Rollout'),
      e('s3-value', 'Kennzahl 3 — Wert', 'stat', '>47.000'),
      e('s3-label', 'Kennzahl 3 — Label', 'stat-label', 'Live-Beratungen aus dem Studio'),
      e('btn-secondary', 'Hero — Zweiter Button (Link zu Live Video)', 'cta', 'Live Video'),
    ]),

  section('leistungen_kreation_carousel', 'Kreation & Content — 3D-Karussell', P,
    'Beschriftungen der 9 Karussell-Kacheln (Bilder: Media → Kreation — Carousel Tiles) und die Zeile darunter.', [
      ...CAROUSEL_LABELS.map((v, i) => e(`tile${i + 1}`, `Kachel ${i + 1} — Beschriftung`, 'caption', v)),
      e('caption', 'Zeile unter dem Karussell', 'caption', 'Einblicke in unsere Kreation'),
    ]),

  section('leistungen_kreation_solutions', 'Kreation & Content — Lösung (Karten)', P,
    'Eyebrow und die 4 Lösungs-Karten (Überschrift/Subline: Kreation & Content — Content). Tags mit „|“ trennen.', [
      e('eyebrow', 'Lösung — Eyebrow', 'label', 'Die Lösung'),
      e('c1-title', 'Karte 1 — Titel', 'subheading', '(Kampagnen-)Konzeption'),
      e('c1-desc', 'Karte 1 — Text', 'paragraph', 'Wir arbeiten heraus, wofür deine Marke steht und wie begeisternder Content aussehen könnte. From scratch oder adaptiert von deiner globalen Strategie.'),
      e('c1-tags', 'Karte 1 — Tags (mit | trennen)', 'tag', 'Strategie | Konzept | Kampagne'),
      e('c2-title', 'Karte 2 — Titel', 'subheading', 'CI, Layout & Design'),
      e('c2-desc', 'Karte 2 — Text', 'paragraph', 'Vom Corporate Identity System über Packaging bis zum POS-Display: Wir gestalten kohärente Markenwelten. Briefings, Vorlagen, Reinzeichnungen — auf Marke, auf Medium.'),
      e('c2-tags', 'Karte 2 — Tags (mit | trennen)', 'tag', 'CI | Layout | Brand'),
      e('c3-title', 'Karte 3 — Titel', 'subheading', 'POS & Markensysteme'),
      e('c3-desc', 'Karte 3 — Text', 'paragraph', 'Displays, Ladenbau-Elemente, Regalkonzepte und Promotionmaterial: Wir entwickeln die Verkaufsflächengestaltung, die deine Marke am Point of Sale stark macht.'),
      e('c3-tags', 'Karte 3 — Tags (mit | trennen)', 'tag', 'POS | Display | Ladenbau'),
      e('c4-title', 'Karte 4 — Titel', 'subheading', 'Innovation & neue Formate'),
      e('c4-desc', 'Karte 4 — Text', 'paragraph', 'KI-gestützte Konzeptentwicklung, interaktive Formate und neue Storytelling-Ansätze: Wir probieren Neues aus und setzen um, was funktioniert.'),
      e('c4-tags', 'Karte 4 — Tags (mit | trennen)', 'tag', 'Innovation | KI | Neue Formate'),
    ]),

  section('leistungen_kreation_showcase', 'Kreation & Content — Showcase (Rahmen)', P,
    'Showcase-Block: Überschrift, Tab-Namen, Tab-Beschreibungen, CGI-Vergleich (nur im Tab POS) und die Leiste unten. Die Karten je Tab stehen in eigenen Abschnitten.', [
      e('eyebrow', 'Showcase — Eyebrow', 'label', 'Showcase'),
      e('heading', 'Showcase — Überschrift', 'heading', 'Unsere Arbeit.'),
      e('heading-accent', 'Showcase — Überschrift (Akzent)', 'heading', 'Deine Wirkung.'),
      ...SHOWCASE_TABS.flatMap((k) => [
        e(`tab-${k}`, `Tab „${SHOWCASE[k].label}“ — Name`, 'label', SHOWCASE[k].tab),
        e(`desc-${k}`, `Tab „${SHOWCASE[k].label}“ — Beschreibung`, 'paragraph', SHOWCASE[k].desc),
      ]),
      e('ba-eyebrow', 'CGI-Vergleich — Eyebrow', 'label', 'CGI → Reality Vergleich'),
      e('ba-title', 'CGI-Vergleich — Überschrift', 'heading', 'CGI-Render vs. gebauter Stand'),
      e('ba-hint', 'CGI-Vergleich — Hinweis', 'caption', 'Ziehe den Regler — vom CGI-Render zum gebauten Messestand'),
      e('ba-label-cgi', 'CGI-Vergleich — Label links', 'label', 'CGI Render'),
      e('ba-label-real', 'CGI-Vergleich — Label rechts', 'label', 'Gebauter Stand'),
      e('ba-button', 'CGI-Vergleich — Button', 'cta', 'Portfolio anfragen'),
      e('strip-text', 'Leiste unten — Text', 'paragraph', 'Alle Beispiele auf Anfrage verfügbar'),
      e('strip-button', 'Leiste unten — Button', 'cta', 'Portfolio anfragen'),
    ]),

  ...SHOWCASE_TABS.map((k) => section(`leistungen_kreation_showcase_${k}`, `Kreation & Content — Showcase: ${SHOWCASE[k].label}`, P,
    `Die 6 Karten im Showcase-Tab „${SHOWCASE[k].label}“ (Karte 6 = breite Karte unter dem Raster). Bilder: Media → Kreation Showcase.`,
    SHOWCASE[k].items.flatMap(([tag, title, sub], i) => [
      e(`i${i + 1}-tag`, `Karte ${i + 1} — Tag`, 'tag', tag),
      e(`i${i + 1}-title`, `Karte ${i + 1} — Titel`, 'subheading', title),
      e(`i${i + 1}-sub`, `Karte ${i + 1} — Unterzeile`, 'caption', sub),
    ]))),

  section('leistungen_kreation_cta', 'Kreation & Content — Kontakt-Box', P,
    'Abschluss-Box am Seitenende: kurze Frage, eine Zeile. Button und Zeile darunter: CTAs — Button-Texte.', [
      e('headline', 'Kontakt — Überschrift', 'heading', 'Content für'),
      e('headline-accent', 'Kontakt — Überschrift (Akzent)', 'heading', 'deine Marke?'),
      e('subline', 'Kontakt — Subline', 'paragraph', 'Wir zeigen dir, wie wir Kreation und Content umsetzen.'),
    ]),
];
