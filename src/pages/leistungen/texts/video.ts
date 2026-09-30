import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

const P = '/leistungen/live-video';

export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_video_hero_buttons', 'Live Video — Hero-Buttons', P, 'Der zweite Button im Hero (Button 1: CTAs — Button-Texte).', [
    e('secondary', 'Button 2 (Link POS Full Service)', 'cta', 'POS Full Service'),
  ]),
  section('leistungen_video_showcase', 'Live Video — Video-Block', P,
    'Video-Block unter der Lösung. Das Video selbst kommt aus Media → Live Video (YouTube-Link). Ohne Link wird der ganze Block ausgeblendet.', [
      e('eyebrow', 'Video — Eyebrow', 'label', 'Video'),
      e('title', 'Video — Überschrift', 'heading', 'Sonic Live Video — Erlebe es in Aktion'),
      e('subline', 'Video — Subline', 'paragraph', 'Der Weg zur Kaufklarheit: So sieht Live-Video-Beratung aus — vom Studio bis zum Abverkauf.'),
    ]),

  section('leistungen_video_advantages', 'Live Video — Vorteile', P,
    'Vorteile-Block: Eyebrow, Subline und die 6 Vorteil-Karten (Überschrift des Blocks: Live Video — Content → Advantages Heading).', [
      e('eyebrow', 'Vorteile — Eyebrow', 'label', 'Vorteile'),
      e('sub', 'Vorteile — Subline', 'paragraph', 'Chancen auf mehr Verkäufe und weniger Retouren.'),
      e('a1-accent', 'Vorteil 1 — Kategorie', 'label', 'Kaufort'),
      e('a1-title', 'Vorteil 1 — Titel', 'subheading', 'Am Einkaufsort'),
      e('a1-desc', 'Vorteil 1 — Text', 'paragraph', 'Video für E-Commerce, Field Force für Retail: Kurz vor dem Kaufabschluss sprichst du mit deinen Kunden. Live.'),
      e('a2-accent', 'Vorteil 2 — Kategorie', 'label', 'Reichweite'),
      e('a2-title', 'Vorteil 2 — Titel', 'subheading', 'Mehr Reichweite'),
      e('a2-desc', 'Vorteil 2 — Text', 'paragraph', 'Mit Aufzeichnungen erreichst du viele potenzielle Kunden gleichzeitig, unabhängig vom Standort.'),
      e('a3-accent', 'Vorteil 3 — Kategorie', 'label', 'Analytics'),
      e('a3-title', 'Vorteil 3 — Titel', 'subheading', 'Messbare Ergebnisse'),
      e('a3-desc', 'Vorteil 3 — Text', 'paragraph', 'Jeder Call wird getrackt: Dauer, Ergebnis, Kundenzufriedenheit. Bisher über 47.000 Live-Beratungen und über 4.200 Stunden Beratungszeit.'),
      e('a4-accent', 'Vorteil 4 — Kategorie', 'label', 'Marktforschung'),
      e('a4-title', 'Vorteil 4 — Titel', 'subheading', 'Marktforschung'),
      e('a4-desc', 'Vorteil 4 — Text', 'paragraph', 'Aus den Fragen der Kunden lässt sich ableiten, wie gut die Kommunikationsstrategie (Ads, Shop) funktioniert.'),
      e('a5-accent', 'Vorteil 5 — Kategorie', 'label', 'Interaktion'),
      e('a5-title', 'Vorteil 5 — Titel', 'subheading', 'Interaktivität'),
      e('a5-desc', 'Vorteil 5 — Text', 'paragraph', 'Direkter Dialog mit Kunden durch Live-Chat, Q&A und Produktvorführungen in Echtzeit. Mit menschlicher Qualität.'),
      e('a6-accent', 'Vorteil 6 — Kategorie', 'label', 'Content'),
      e('a6-title', 'Vorteil 6 — Titel', 'subheading', 'Wiederverwendbar'),
      e('a6-desc', 'Vorteil 6 — Text', 'paragraph', 'Aufgezeichnete Sessions können als On-Demand-Content weiterverwendet werden und so bei Beratung und Verkauf laufend unterstützen.'),
    ]),

  section('leistungen_video_calculator', 'Live Video — Kostenrechner', P,
    'Texte des Kostenrechners. Die Ø Gesprächsdauer fließt in die Berechnung der möglichen Calls ein (Zahl mit Komma, z. B. 5,5). Die Kostenschätzung selbst bleibt unverändert.', [
      e('eyebrow', 'Kostenrechner — Eyebrow', 'label', 'Kostenrechner'),
      e('heading', 'Kostenrechner — Überschrift', 'heading', 'Live-Video: Kosten für deine Kampagne'),
      e('slider-days', 'Regler 1 — Label', 'label', 'Tage pro Woche'),
      e('slider-hours', 'Regler 2 — Label', 'label', 'Stunden pro Tag'),
      e('slider-team', 'Regler 3 — Label', 'label', 'Teamgröße'),
      e('slider-campaign', 'Regler 4 — Label', 'label', 'Kampagnendauer (Tage)'),
      e('stat-calls-label', 'Ergebnis 1 — Label', 'stat-label', 'Max. mögliche Calls'),
      e('stat-avg-value', 'Ergebnis 2 — Ø Gesprächsdauer in Min. (Zahl)', 'stat', '5,5'),
      e('stat-avg-label', 'Ergebnis 2 — Label', 'stat-label', 'Ø Beratungsdauer'),
      e('stat-cost-label', 'Ergebnis 3 — Label', 'stat-label', 'Geschätzte Kosten'),
      e('estimate-note', 'Hinweis unter der Schätzung', 'caption', 'Richtwert – die finale Kalkulation machen wir im Erstgespräch.'),
      e('button', 'Kostenrechner — Button', 'cta', 'Video-Konzept anfragen'),
    ]),

  section('leistungen_video_phygital', 'Live Video — Phygital', P,
    'Phygital-Block: Eyebrow, Subline, Spaltenköpfe und die 8 Vergleichszeilen (die Häkchen sind fest im Code). Überschrift: Live Video — Content → Phygital Heading.', [
      e('eyebrow', 'Phygital — Eyebrow', 'label', 'Ideale Kombination'),
      e('sub', 'Phygital — Subline', 'paragraph', 'Online für Convenience & Information, offline für Erlebnis & Vertrauen. Clever kombiniert, zahlen Video und Field Force im Omnichannel aufeinander ein.'),
      e('col-video', 'Spalte 1 — Kopf', 'label', 'Video'),
      e('col-field', 'Spalte 2 — Kopf', 'label', 'Field Force'),
      e('row1', 'Zeile 1', 'list-item', 'Erreicht Online-Shopper'),
      e('row2', 'Zeile 2', 'list-item', 'Erreicht Retail-Shopper'),
      e('row3', 'Zeile 3', 'list-item', 'Erhöht Conversion Rate'),
      e('row4', 'Zeile 4', 'list-item', 'Generiert Leads und Sales'),
      e('row5', 'Zeile 5', 'list-item', '24/7 abrufbar (als Aufnahme)'),
      e('row6', 'Zeile 6', 'list-item', 'Während Öffnungszeiten'),
      e('row7', 'Zeile 7', 'list-item', 'Nutzbar im Retail (QR-Code)'),
      e('row8', 'Zeile 8', 'list-item', 'Promoter:innen nutzbar für Videos'),
    ]),

  section('leistungen_video_cta', 'Live Video — Kontakt-Box', P,
    'Abschluss-Box am Seitenende: kurze Frage, eine Zeile. Button und Zeile darunter: CTAs — Button-Texte.', [
      e('headline', 'Kontakt — Überschrift', 'heading', 'Live-Video'),
      e('headline-accent', 'Kontakt — Überschrift (Akzent)', 'heading', 'testen?'),
      e('subline', 'Kontakt — Subline', 'paragraph', 'Wir zeigen dir, wie Live-Beratung für dein Produkt aussieht.'),
    ]),
];
