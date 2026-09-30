import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

const P = '/leistungen/talentpool';

export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_talentpool_challenges', 'Talentpool — Herausforderungen (3 Punkte)', P,
    'Die drei Herausforderungs-Punkte (Titel, Text, Hover-Frage). Überschrift und Subline liegen in „Talentpool — Content“.', [
      e('c1-title', 'Punkt 1 — Titel', 'subheading', 'Ständig neue Gesichter'),
      e('c1-desc', 'Punkt 1 — Text', 'paragraph', 'Wer für jedes Projekt neu bucht, fängt jedes Mal von vorn an: neu onboarden, neu schulen — mit schwer planbaren Ergebnissen.'),
      e('c1-trigger', 'Punkt 1 — Hover-Frage', 'label', 'Auch deine Erfahrung?'),
      e('c2-title', 'Punkt 2 — Titel', 'subheading', 'Hohe Fluktuation'),
      e('c2-desc', 'Punkt 2 — Text', 'paragraph', 'Ohne feste Ansprechpartner und echte Bindung ans Projekt sinkt die Motivation. Fluktuation kostet Zeit, Geld und Qualität — und hinterlässt Lücken auf der Fläche.'),
      e('c2-trigger', 'Punkt 2 — Hover-Frage', 'label', 'Kostet dich das Nerven?'),
      e('c3-title', 'Punkt 3 — Titel', 'subheading', 'Kein Markenverständnis'),
      e('c3-desc', 'Punkt 3 — Text', 'paragraph', 'Wer ohne Briefing von Marke zu Marke springt, wird kein echter Botschafter. Ohne Identifikation fehlt die Überzeugungskraft am POS.'),
      e('c3-trigger', 'Punkt 3 — Hover-Frage', 'label', 'Klingt vertraut?'),
    ]),

  section('leistungen_talentpool_solution', 'Talentpool — Lösung (6 Karten)', P,
    'Eyebrow und die sechs Lösungs-Karten. Überschrift und Subline liegen in „Talentpool — Content“. Nie „festangestellt“ oder „GPS-Tracking“ schreiben.', [
      e('eyebrow', 'Lösung — Eyebrow', 'label', 'Die Sonic-Lösung'),
      e('s1-accent', 'Karte 1 — Kategorie', 'label', 'Anstellung'),
      e('s1-title', 'Karte 1 — Titel', 'subheading', 'Handverlesen & bei Sonic angestellt'),
      e('s1-desc', 'Karte 1 — Text', 'paragraph', 'Jedes Talent lernen wir vorab im Interview kennen. Im Einsatz sind alle bei Sonic angestellt und haben feste Ansprechpartner im Projektteam. Das bedeutet: Verlässlichkeit und echtes Engagement.'),
      e('s2-accent', 'Karte 2 — Kategorie', 'label', 'Training'),
      e('s2-title', 'Karte 2 — Titel', 'subheading', 'Intensivtraining auf dein Produkt'),
      e('s2-desc', 'Karte 2 — Text', 'paragraph', 'Vor jedem Einsatz durchlaufen unsere Talente ein Produkttraining, das wirklich sitzt: Positionierung, USPs, Kaufargumente, Einwandbehandlung.'),
      e('s3-accent', 'Karte 3 — Kategorie', 'label', 'Reporting'),
      e('s3-title', 'Karte 3 — Titel', 'subheading', 'Live-Zielerreichung im SRT'),
      e('s3-desc', 'Karte 3 — Text', 'paragraph', 'Unsere Promoter:innen sehen ihre eigene Performance in Echtzeit: Kontakte, Verkäufe, Zielerreichung. Das motiviert — und macht Coaching präzise.'),
      e('s4-accent', 'Karte 4 — Kategorie', 'label', 'Reichweite'),
      e('s4-title', 'Karte 4 — Titel', 'subheading', 'Deutschlandweit einsatzbereit'),
      e('s4-desc', 'Karte 4 — Text', 'paragraph', 'Von Nord bis Süd, in der Großstadt wie in der Region: MediaMarkt, Saturn, Douglas, dm, Fachhandel — wir haben Personal, wo du es brauchst.'),
      e('s5-accent', 'Karte 5 — Kategorie', 'label', 'Spezialisierung'),
      e('s5-title', 'Karte 5 — Titel', 'subheading', 'Spezialisiert nach Kategorie'),
      e('s5-desc', 'Karte 5 — Text', 'paragraph', 'Consumer Electronics, Haushaltsgeräte, Kosmetik, Sport: Unsere Talente sind nach Produktkategorie trainiert — kein allgemeines Promoter-Profil.'),
      e('s6-accent', 'Karte 6 — Kategorie', 'label', 'Tracking'),
      e('s6-title', 'Karte 6 — Titel', 'subheading', 'Performance-getrackt'),
      e('crosslink-text', 'Querverweis unter den Karten — Text', 'paragraph', 'Wie wir Verträge, Einsatzplanung und Abrechnung für dich organisieren, zeigt Staff as a Service.'),
      e('crosslink-link', 'Querverweis — Linktext (führt zu Staff as a Service)', 'cta', 'Zu Staff as a Service'),
      e('s6-desc', 'Karte 6 — Text', 'paragraph', 'Standort-Check-in, Fotos, Echtzeit-Reporting im SRT: Jeder Einsatz ist dokumentiert und transparent. Für dich als Auftraggeber und für die Promoter:innen selbst.'),
    ]),

  section('leistungen_talentpool_stats', 'Talentpool — Kennzahlen (4 Werte)', P,
    'Die vier Kennzahlen im dunklen Zahlen-Streifen. Nur Zahlen aus der Agenturpräsentation verwenden; die Talentpool-Größe (>1.800) steht schon in der Hero-Überschrift.', [
      e('stat-1-value', 'Kennzahl 1 — Wert', 'stat', 'Ø 2,9 J.'),
      e('stat-1-label', 'Kennzahl 1 — Label', 'stat-label', 'Zugehörigkeit im POS-Team'),
      e('stat-2-value', 'Kennzahl 2 — Wert', 'stat', '200+'),
      e('stat-2-label', 'Kennzahl 2 — Label', 'stat-label', 'Promoter:innen im Einsatz'),
      e('stat-3-value', 'Kennzahl 3 — Wert', 'stat', '>15'),
      e('stat-3-label', 'Kennzahl 3 — Label', 'stat-label', 'Kunden'),
      e('stat-4-value', 'Kennzahl 4 — Wert', 'stat', '>1.000'),
      e('stat-4-label', 'Kennzahl 4 — Label', 'stat-label', 'Stores'),
    ]),

  section('leistungen_talentpool_profiles', 'Talentpool — Talentprofile (4 Karten)', P,
    'Eyebrow und die vier Talentprofil-Karten (Rolle, Bereich, Text). Überschrift und Subline liegen in „Talentpool — Content“.', [
      e('eyebrow', 'Talentprofile — Eyebrow', 'label', 'Talentprofile'),
      e('p1-type', 'Profil 1 — Rolle', 'badge', 'Promoter:in'),
      e('p1-accent', 'Profil 1 — Bereich', 'label', 'POS & Verkauf'),
      e('p1-desc', 'Profil 1 — Text', 'paragraph', 'Das Herzstück unseres Talentpools — live am POS: erklärt, begeistert, verkauft.'),
      e('p2-type', 'Profil 2 — Rolle', 'badge', 'Video-Berater'),
      e('p2-accent', 'Profil 2 — Bereich', 'label', 'Live-Video & E-Commerce'),
      e('p2-desc', 'Profil 2 — Text', 'paragraph', 'All in One: Regisseur, Moderator, Verkäufer — für Live-Video-Beratung im Online-Shop, per QR-Code und am POS-Display.'),
      e('p3-type', 'Profil 3 — Rolle', 'badge', 'Verkaufstrainer'),
      e('p3-accent', 'Profil 3 — Bereich', 'label', 'Training & Coaching'),
      e('p3-desc', 'Profil 3 — Text', 'paragraph', 'Macht Handelspartner zu echten Fans deiner Marke — mit Schulungen, die wirken.'),
      e('p4-type', 'Profil 4 — Rolle', 'badge', 'Event-Crew'),
      e('p4-accent', 'Profil 4 — Bereich', 'label', 'Events & Roadshows'),
      e('p4-desc', 'Profil 4 — Text', 'paragraph', 'Für Launch-Events, Roadshows und Instore-Aktivierungen — erfahren und skalierbar.'),
    ]),

  section('leistungen_talentpool_cta', 'Talentpool — Kontakt-Box', P,
    'Abschluss-Box am Seitenende: kurze Frage, eine Zeile. Button und Zeile darunter: CTAs — Button-Texte.', [
      e('headline', 'Kontakt — Überschrift', 'heading', 'Talente für'),
      e('headline-accent', 'Kontakt — Überschrift (Akzent)', 'heading', 'dein Projekt?'),
      e('subline', 'Kontakt — Subline', 'paragraph', 'Wir klären, wie viele Promoter:innen du brauchst und wo sie eingesetzt werden.'),
    ]),
];
