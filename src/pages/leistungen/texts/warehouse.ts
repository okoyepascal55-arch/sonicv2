import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

const P = '/leistungen/warehouse-logistik';

export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_warehouse_stats', 'Warehouse & Logistik — Kennzahlen', P, 'Die drei Kennzahlen unter dem Hero-Text. Hero-Button: CTAs — Button-Texte. Nur Zahlen aus der Agenturpräsentation oder Fakten ohne Zahl.', [
    e('stat1-val', 'Kennzahl 1 — Wert', 'stat', 'Eigenes'),
    e('stat1-label', 'Kennzahl 1 — Label', 'stat-label', 'Lager'),
    e('stat2-val', 'Kennzahl 2 — Wert', 'stat', 'Europaweit'),
    e('stat2-label', 'Kennzahl 2 — Label', 'stat-label', 'Versand'),
    e('stat3-val', 'Kennzahl 3 — Wert', 'stat', 'Inhouse'),
    e('stat3-label', 'Kennzahl 3 — Label', 'stat-label', 'Möbelbau & Aufbau'),
  ]),
  section('leistungen_warehouse_solutions', 'Warehouse & Logistik — Lösung (4 Karten)', P, 'Überschrift, Unterzeile und die vier Scroll-Karten im Lösungsblock.', [
    e('eyebrow', 'Eyebrow', 'label', 'Die Lösung'),
    e('heading', 'Überschrift', 'heading', 'Warehousing und Logistik als'),
    e('heading-accent', 'Überschrift — Akzent', 'heading', 'integraler Baustein.'),
    e('sub', 'Unterzeile', 'paragraph', 'Einlagerung, Bereitstellung, Auslagerung, Anlieferung und Aufbau deiner Produkte, Werbematerialien, Messestände etc. Als Teil des Sonic Gesamtpakets: POS-Service, Lager, Möbelbau und Logistik aus einer Hand.'),
    e('card1-accent', 'Karte 1 — Kategorie', 'label', 'Einlagerung & QS'),
    e('card1-title', 'Karte 1 — Titel', 'subheading', 'Wareneingang & Qualitätskontrolle'),
    e('card1-desc', 'Karte 1 — Text', 'paragraph', 'Bei Anlieferung: Qualitäts- und Mengenkontrolle, Einlagerung und Erfassung in unserer Lagersoftware.'),
    e('card2-accent', 'Karte 2 — Kategorie', 'label', 'Lager & Bestand'),
    e('card2-title', 'Karte 2 — Titel', 'subheading', 'Lagermanagement & Verwaltung'),
    e('card2-desc', 'Karte 2 — Text', 'paragraph', 'POS-Werbemittel, Möbel, Pressemuster, Leihgeräte, Technik, Messestände: Alles sauber und sicher eingelagert, jederzeit abrufbar.'),
    e('card3-accent', 'Karte 3 — Kategorie', 'label', 'Versand EU'),
    e('card3-title', 'Karte 3 — Titel', 'subheading', 'Kommissionierung & Versand'),
    e('card3-desc', 'Karte 3 — Text', 'paragraph', 'Abwicklung, Verbuchung, Kommissionierung und Auslieferung. Fristgerecht, europaweit. Mit Versandpartnern und eigenen Fahrern.'),
    e('card4-accent', 'Karte 4 — Kategorie', 'label', 'E-Commerce'),
    e('card4-title', 'Karte 4 — Titel', 'subheading', 'Fulfillment & Webshops'),
    e('card4-desc', 'Karte 4 — Text', 'paragraph', 'Online-(Nach-)Bestellungen von Waren, Mustern und POS-Material wickeln wir komplett ab. Mit Schnittstellen zum E-Commerce, Billing, Bestandsführung, Analytics und Forecasts.'),
  ]),
  section('leistungen_warehouse_fullservice', 'Warehouse & Logistik — Darum Warehouse bei Sonic', P, 'Dunkler Full-Service-Block mit Foto.', [
    e('eyebrow', 'Eyebrow', 'label', 'Full Service'),
    e('heading', 'Überschrift', 'heading', 'Darum Warehouse'),
    e('heading-accent', 'Überschrift — Akzent', 'heading', 'bei Sonic.'),
    e('p1', 'Absatz 1', 'paragraph', 'Unsere Lager- und Logistikleistungen dienen einem Zweck: Dein Projekt erfolgreich realisieren. POS-Material, Give-aways, Möbel und Equipment werden von uns produziert und unterliegen unserer Qualitätskontrolle. Diese gelingt effizient, wenn wir das Lager direkt nebenan haben.'),
    e('p2', 'Absatz 2', 'paragraph', 'Für deine Ware, also Muster etc., ist es ebenfalls ideal, wenn wir ein Auge darauf haben. So stellen wir sicher, dass alle physischen Bausteine deines Projekts zur richtigen Zeit an den richtigen Ort gelangen.'),
    e('photo-caption', 'Foto — Label', 'caption', 'Lager direkt nebenan'),
  ]),
  section('leistungen_warehouse_cta', 'Warehouse & Logistik — Kontaktbox', P, 'Abschluss-Box am Seitenende: kurze Frage, eine Zeile. Button und Zeile darunter: CTAs — Button-Texte.', [
    e('headline', 'Überschrift — Teil 1', 'heading', 'Lager & Logistik'),
    e('headline-accent', 'Überschrift — Teil 2 (lime)', 'heading', 'gesucht?'),
    e('subline', 'Unterzeile', 'paragraph', 'Wir zeigen dir, wie unser Warehouse in dein Projekt passt.'),
  ]),
];
