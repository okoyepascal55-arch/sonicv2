import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { submitContactForm } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';
import ClientProof from '../../components/feature/ClientProof';
import WoodenDivider from '../../components/base/WoodenDivider';
import { CONTACT_EMAIL } from '@/lib/contact';
import WoodenButton from '@/components/base/WoodenButton';

const SURVEY_FORM_URL = 'https://readdy.ai/api/form/d9vdom6th95mubjtu6q0';

/* ─────────────────────────────────────────
   SOLUTION DATA — exact content from brief
───────────────────────────────────────── */
const SOLUTIONS = {
  markteintritt: {
    id: 'markteintritt',
    label: 'Markteintritt',
    icon: 'ri-rocket-line',
    title: 'Neu im Markt. Maximale Sichtbarkeit',
    subtitle: 'Wir machen Erklärungsbedürftiges erlebbar',
    description:
      'Dein Produkt ist kaufbereit, aber noch unbekannt? Wir ändern das und bereichern deine Go-to-Market-Strategie: Mit Menschen, die deine Marke verstehen und sie am Point of Sale, per Video und bei Events zum Leben erwecken. Datenbasiert geplant, live reportet, messbar erfolgreich.',
    challenges: [
      {
        icon: 'ri-shield-cross-line',
        title: 'Kein Vertrauen',
        desc: 'Konsumenten greifen zu dem, was sie kennen. Neue Marken müssen Vertrauen erst aufbauen: persönlich, erklärend, überzeugend.',
      },
      {
        icon: 'ri-eye-off-line',
        title: 'Kein Regalplatz im Kopf',
        desc: 'Sichtbarkeit im Regal garantiert keinen Abverkauf. Neue Marken und Produkte sind nicht im Relevant Set der Konsumenten. Noch nicht.',
      },
      {
        icon: 'ri-feedback-line',
        title: 'Keine Feedback-Schleife',
        desc: 'Wer beim Launch am POS nicht misst, welche Argumentationen in welchen Outlets und bei welchen Käufergruppen funktionieren, arbeitet im Blindflug.',
      },
    ],
    deliverables: [
      { icon: 'ri-user-star-line', title: 'Brand Ambassadors am POS', desc: 'Geschulte Markenbotschafter aus unserem Talentepool. Festangestellt, keine Freelancer. Trainiert auf dein Produkt, leidenschaftlich im Kundenkontakt.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-presentation-line', title: 'Verkäuferschulungen', desc: 'Deine Handelspartner sollen Fans deiner Marke werden. Wir begeistern sie mit Schulungen, die im Gedächtnis bleiben.', img: 'https://readdy.ai/api/search-image?query=professional%20sales%20training%20workshop%20group%20of%20retail%20staff%20learning%20product%20knowledge%20in%20modern%20conference%20room%20presenter%20at%20whiteboard%20engaged%20audience%20corporate%20training&width=800&height=500&seq=deliv-mkt-2&orientation=landscape' },
      { icon: 'ri-calendar-event-line', title: 'Launch-Events & Promotions', desc: 'Wir inszenieren deinen Auftritt: Roadshows, Instore-Events, Produkt-Demos. Dort, wo deine Zielgruppe einkauft. Konzept, Personal, Logistik: alles aus einer Hand.', img: 'https://readdy.ai/api/search-image?query=exciting%20product%20launch%20event%20in%20retail%20store%20with%20branded%20displays%20crowd%20of%20shoppers%20promotional%20staff%20demonstrating%20new%20product%20vibrant%20atmosphere%20professional%20event%20setup&width=800&height=500&seq=deliv-mkt-3&orientation=landscape' },
      { icon: 'ri-video-line', title: 'Videocontent & Live-Beratung', desc: 'Erklärvideos, Social Content und Live-Video-Calls. Damit dein Produkt auch digital erlebbar ist. Vom Unboxing bis zur persönlichen Kaufberatung.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/3. Bild Kopie.webp' },
      { icon: 'ri-store-2-line', title: 'POS-Design & Aufbau', desc: 'Displays, Shop-in-Shops, Collateral, Give-aways: Wir gestalten und bestücken deine Fläche. End-to-end. Inklusive Lagerung in unserem eigenen Warehouse.', img: 'https://readdy.ai/api/search-image?query=premium%20retail%20point%20of%20sale%20display%20design%20shop%20in%20shop%20setup%20elegant%20branded%20display%20stand%20with%20products%20modern%20retail%20interior%20professional%20merchandising%20clean%20design&width=800&height=500&seq=deliv-mkt-5&orientation=landscape' },
      { icon: 'ri-bar-chart-box-line', title: 'Datenbasierte Planung', desc: 'Über das Sonic Reporting Tool (SRT) identifizieren wir Märkte und Standorte mit dem größten Potenzial für deinen Launch. Keine Bauchentscheidungen, sondern Daten.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-dashboard-line', title: 'Live-Reporting', desc: 'Vom ersten Einsatztag an siehst du in Echtzeit, was passiert: Kontakte, Verkäufe, Feedback, Zielerreichung, Wunsch-KPIs. In deinem persönlichen Dashboard.', img: 'https://readdy.ai/api/search-image?query=real%20time%20reporting%20dashboard%20on%20tablet%20and%20laptop%20showing%20live%20sales%20metrics%20KPI%20charts%20performance%20data%20modern%20business%20analytics%20interface%20clean%20design&width=800&height=500&seq=deliv-mkt-7&orientation=landscape' },
    ],
    steps: [
      { num: '01', title: 'Briefing & Markenverständnis', desc: 'Wir lernen dein Produkt kennen, als wäre es unseres: Positionierung, Zielgruppe, Wettbewerbsumfeld, Retail-Landschaft. Wir verstehen, was dein Produkt besonders macht und warum es gekauft werden soll.', img: 'https://readdy.ai/api/search-image?query=professional%20business%20briefing%20meeting%20team%20around%20table%20with%20brand%20strategy%20documents%20product%20samples%20whiteboard%20notes%20collaborative%20workshop%20modern%20office%20bright%20natural%20light&width=900&height=500&seq=step-mkt-1&orientation=landscape' },
      { num: '02', title: 'Standort- & Einsatzplanung', desc: 'Das SRT liefert die Datenbasis: Wo ist das Potenzial am größten? Welche Handelspartner passen? Welche Zeitfenster? Welche Personalstärke? Du bekommst einen datenbasierten Rollout-Plan.', img: 'https://readdy.ai/api/search-image?query=strategic%20location%20planning%20map%20on%20large%20screen%20with%20data%20overlays%20retail%20store%20locations%20marked%20team%20analyzing%20deployment%20strategy%20modern%20office%20setting%20professional%20planning%20session&width=900&height=500&seq=step-mkt-2&orientation=landscape' },
      { num: '03', title: 'Team-Aufbau & Schulung', desc: 'Wir rekrutieren und schulen dein Launch-Team aus unserem Pool von 2.000 Talenten. Festangestellt, motiviert und mit Intensivtraining auf dein Produkt.', img: 'https://readdy.ai/api/search-image?query=brand%20ambassador%20team%20training%20session%20group%20of%20young%20professionals%20learning%20product%20knowledge%20enthusiastic%20trainer%20modern%20training%20room%20corporate%20environment%20engaged%20participants&width=900&height=500&seq=step-mkt-3&orientation=landscape' },
      { num: '04', title: 'Launch & Aktivierung', desc: 'POS-Aufbau, Promotions, Events, Videoproduktion: Dein Markteintritt, orchestriert über alle Retail-Touchpoints. Koordiniert. Durchgetaktet. Sichtbar.', img: 'https://readdy.ai/api/search-image?query=product%20launch%20activation%20at%20retail%20store%20multiple%20brand%20ambassadors%20at%20branded%20display%20stands%20customers%20engaging%20with%20products%20busy%20retail%20environment%20professional%20execution&width=900&height=500&seq=step-mkt-4&orientation=landscape' },
      { num: '05', title: 'Tracking & Optimierung', desc: 'Live-Dashboards ab Tag 1. Was funktioniert, wird skaliert. Was nicht performt, wird angepasst. Du bekommst laufende Reviews und Handlungsempfehlungen. Nicht erst am Projektende.', img: 'https://readdy.ai/api/search-image?query=performance%20review%20meeting%20team%20analyzing%20live%20dashboard%20data%20on%20large%20screen%20discussing%20optimization%20strategies%20modern%20office%20professional%20business%20review%20session%20charts%20metrics&width=900&height=500&seq=step-mkt-5&orientation=landscape' },
    ],
    stats: [
      { value: '>120', label: 'Produktlaunches begleitet' },
      { value: '>2.000', label: 'Talente im Pool' },
      { value: '>30', label: 'Marken erfolgreich eingeführt' },
      { value: '100 %', label: 'Live-Transparenz ab Tag 1' },
    ],
    testimonial: {
      quote: 'Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter.',
      author: 'Dana Eichinger',
      role: 'Director Marketing DACH, Garmin Deutschland GmbH',
      brand: 'Garmin',
      img: 'https://readdy.ai/api/search-image?query=Garmin%20GPS%20smartwatch%20fitness%20tracker%20retail%20display%20in%20modern%20electronics%20store%20professional%20brand%20ambassador%20demonstrating%20device%20features%20to%20customer%20premium%20retail%20environment%20bright%20lighting&width=1200&height=700&seq=testimonial-garmin-v2&orientation=landscape',
    },
    finalCta: 'Bereit für deinen Markteintritt? Lass uns in 30 Minuten klären, wie dein Launch aussehen kann.',
    ctaLabel: 'Markteintritt planen',
    link: '/losungen?open=markteintritt',
  },
  absatz: {
    id: 'absatz',
    label: 'Absatz steigern',
    icon: 'ri-line-chart-line',
    title: 'Produkt im Regal. Sell-out über Plan',
    subtitle: 'Profitabel Verkaufsziele erreichen.',
    description:
      'Unsere Field-Force-Teams sind deine verlängerte Vertriebsmannschaft am POS: Sie beraten, überzeugen und verkaufen. Daten- und ROI-getrieben geplant, lückenlos reportet. Du weißt vorher, was du erwarten kannst. Und siehst in Echtzeit, was passiert.',
    challenges: [
      {
        icon: 'ri-store-line',
        title: 'Fläche ohne Wirkung',
        desc: 'Unterbesetzte Flächen, Mitbewerber mit mehr Präsenz, Handelspartner, die dein Produkt nicht priorisieren. Präsenz allein verkauft nicht.',
      },
      {
        icon: 'ri-eye-off-line',
        title: 'Blindflug ohne Daten',
        desc: 'Quartalsberichte kommen zu spät. Saisonale Schwankungen erkennt man erst im Rückspiegel. Was heute auf der Fläche passiert, erfährst du in Wochen.',
      },
      {
        icon: 'ri-money-euro-circle-line',
        title: 'WKZ ohne ROI',
        desc: 'Budget fließt in Werbekostenzuschüsse und Promotions. Aber was kommt dabei raus? Ohne Echtzeit-Tracking kennt man die ROI-Zahlen zu spät.',
      },
    ],
    deliverables: [
      { icon: 'ri-user-star-line', title: 'Menschen auf der Fläche', desc: 'Festangestellte Promoter, die dein Produkt kennen und lieben. Echte Markenbotschafter, mit Motivation, Produktwissen und Live-Einblick in ihre eigene Zielerreichung.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-bar-chart-2-line', title: 'Daten in der Planung', desc: 'Mit dem Sonic Reporting Tool (SRT) analysieren wir Marktpotenziale, Standort-Performance und historische Sell-out-Daten. Einsätze werden dort geplant, wo sie den größten ROI liefern.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-dashboard-line', title: 'Transparenz im Dashboard', desc: 'Du siehst jederzeit: Wo sind unsere Leute, mit GPS-genauem Standort. Was haben sie heute verkauft. Wie performen sie gegen dein Ziel. Live. Ohne Excel. Ohne Warten auf Reports.', img: 'https://readdy.ai/api/search-image?query=live%20GPS%20tracking%20dashboard%20showing%20field%20force%20locations%20on%20city%20map%20real%20time%20sales%20performance%20metrics%20modern%20business%20intelligence%20interface%20tablet%20and%20desktop%20view&width=800&height=500&seq=deliv-abs-3&orientation=landscape' },
      { icon: 'ri-search-eye-line', title: 'Forecasting', desc: 'Auf Basis unserer historischen Daten prognostizieren wir Sell-out-Ergebnisse. Bevor der erste Einsatz startet. Du weißt vorher, was du erwarten kannst.', img: 'https://readdy.ai/api/search-image?query=sales%20forecasting%20model%20on%20screen%20showing%20predicted%20revenue%20curves%20trend%20analysis%20charts%20professional%20business%20forecasting%20software%20modern%20office%20data%20science%20team&width=800&height=500&seq=deliv-abs-4&orientation=landscape' },
      { icon: 'ri-map-pin-2-line', title: 'Einsatzplanung', desc: 'Standorte, Zeitfenster, Personalstärke: Alles datenbasiert optimiert. Skalierbar von 10 auf 500 Einsätze pro Woche. Das SRT berücksichtigt Saisonalität, Standort-Historie und Team-Performance.', img: 'https://readdy.ai/api/search-image?query=field%20force%20deployment%20planning%20map%20with%20store%20locations%20staffing%20schedule%20calendar%20view%20professional%20operations%20planning%20software%20retail%20coverage%20optimization%20modern%20interface&width=800&height=500&seq=deliv-abs-5&orientation=landscape' },
      { icon: 'ri-file-chart-line', title: 'Performance-Tracking', desc: 'Jeder Einsatz wird im SRT dokumentiert: Kontakte, Verkäufe, Zielerreichung. Tagesaktuell. Als Live-Dashboard, auf das du jederzeit zugreifen kannst.', img: 'https://readdy.ai/api/search-image?query=daily%20performance%20tracking%20report%20on%20tablet%20showing%20sales%20contacts%20achieved%20targets%20green%20metrics%20live%20data%20retail%20field%20force%20performance%20dashboard%20clean%20modern%20design&width=800&height=500&seq=deliv-abs-6&orientation=landscape' },
      { icon: 'ri-store-2-line', title: 'Sell-in-Support', desc: 'Unsere Teams unterstützen auch im Sell-in: Schulungen für Handelspersonal, Regalpflege, Zweitplatzierungen, Warenpräsentation. Damit dein Produkt nicht nur im Regal steht, sondern auch verkauft wird.', img: 'https://readdy.ai/api/search-image?query=retail%20shelf%20merchandising%20professional%20arranging%20products%20on%20store%20shelf%20secondary%20placement%20display%20optimization%20trade%20partner%20training%20modern%20supermarket%20electronics%20store&width=800&height=500&seq=deliv-abs-7&orientation=landscape' },
      { icon: 'ri-refresh-line', title: 'Kontinuierliche Optimierung', desc: 'Laufende Reviews, Schwachstellen-Analyse, Team-Rotation, Standort-Shifts: Wir optimieren laufend, nicht erst am Quartalsende.', img: 'https://readdy.ai/api/search-image?query=continuous%20improvement%20review%20meeting%20team%20analyzing%20performance%20data%20whiteboard%20with%20optimization%20strategies%20professional%20business%20review%20modern%20office%20setting&width=900&height=500&seq=deliv-abs-8&orientation=landscape' },
    ],
    steps: [
      { num: '01', title: 'Analyse & Zielsetzung', desc: 'Wir analysieren deine aktuelle Retail-Situation: Wo stehst du? Wo willst du hin? Gemeinsam definieren wir messbare Ziele wie Sell-out-Stückzahlen, Umsatz, ROI.', img: 'https://readdy.ai/api/search-image?query=retail%20situation%20analysis%20workshop%20team%20reviewing%20current%20market%20position%20data%20charts%20on%20screen%20defining%20measurable%20sales%20goals%20professional%20strategy%20session%20modern%20office&width=900&height=500&seq=step-abs-1&orientation=landscape' },
      { num: '02', title: 'Forecasting & Planung', desc: 'Das SRT liefert die Prognose: Welche Standorte versprechen den größten Hebel? Wie viele Einsätze brauchst du? Welche Personalstärke? Du bekommst einen belastbaren Plan mit erwartbarem Ergebnis.', img: 'https://readdy.ai/api/search-image?query=sales%20forecast%20planning%20session%20with%20data%20model%20on%20screen%20showing%20location%20potential%20ROI%20projections%20staffing%20requirements%20professional%20planning%20meeting%20modern%20office%20environment&width=900&height=500&seq=step-abs-2&orientation=landscape' },
      { num: '03', title: 'Team-Aufstellung & Training', desc: 'Wir stellen dein Team aus unserem Pool zusammen. Festangestellte Talente, trainiert auf dein Produkt, gebrieft auf deine Ziele. Inklusive Onboarding, Produktschulung und laufendem Coaching.', img: 'https://readdy.ai/api/search-image?query=field%20force%20team%20assembly%20and%20product%20training%20session%20group%20of%20motivated%20sales%20promoters%20learning%20brand%20knowledge%20professional%20trainer%20modern%20training%20facility%20corporate%20environment&width=900&height=500&seq=step-abs-3&orientation=landscape' },
      { num: '04', title: 'Rollout & Aktivierung', desc: 'Deine Field Force geht auf die Fläche. Koordiniert über das SRT, getrackt in Echtzeit. Sell-out, Sell-in, Schulungen, Regalpflege – je nach Projektscope.', img: 'https://readdy.ai/api/search-image?query=field%20force%20rollout%20multiple%20brand%20promoters%20at%20different%20retail%20locations%20coordinated%20activation%20sell-out%20campaign%20busy%20retail%20stores%20professional%20execution%20nationwide%20coverage&width=900&height=500&seq=step-abs-4&orientation=landscape' },
      { num: '05', title: 'Live-Tracking & Skalierung', desc: 'Ab Tag 1 läuft das Reporting. Was funktioniert, wird skaliert. Optimierungspotenziale werden erkannt und können genutzt werden. Reviews sorgen für kontinuierliche Verbesserung.', img: 'https://readdy.ai/api/search-image?query=live%20performance%20tracking%20and%20scaling%20review%20meeting%20team%20analyzing%20real%20time%20dashboard%20data%20identifying%20optimization%20opportunities%20professional%20business%20review%20modern%20office%20data%20driven%20decisions&width=900&height=500&seq=step-abs-5&orientation=landscape' },
    ],
    stats: [
      { value: '>3,7 Mio.', label: 'Produkte verkauft' },
      { value: '>2 Mrd. €', label: 'Umsatz generiert' },
      { value: '>1,35 Mio.', label: 'Einsätze durchgeführt' },
      { value: '100 %', label: 'Live-Transparenz via SRT' },
    ],
    testimonial: {
      quote: 'The Sonic team didn\'t just meet our ambitious targets — they redefined what\'s possible in retail activation. Exceptional execution across every channel.',
      author: 'Dr. Sarah Mitchell',
      role: 'Director of Retail Strategy EMEA, Samsung Electronics',
      brand: 'Samsung',
      img: 'https://readdy.ai/api/search-image?query=Samsung%20premium%20smartphone%20display%20in%20modern%20electronics%20retail%20store%20professional%20brand%20ambassador%20demonstrating%20latest%20mobile%20device%20to%20customer%20sleek%20display%20tables%20bright%20lighting%20contemporary%20retail%20environment&width=1200&height=700&seq=testimonial-samsung-v2&orientation=landscape',
    },
    finalCta: 'Bereit, deinen Absatz zu steigern? Lass uns in 30 Minuten klären, wie dein Projekt aussehen kann.',
    ctaLabel: 'Absatz steigern planen',
    link: '/losungen?open=absatz',
  },
  omnichannel: {
    id: 'omnichannel',
    label: 'Omnichannel',
    icon: 'ri-global-line',
    title: 'Human Power in allen Kanälen',
    subtitle: 'Conversions steigern. Retouren vermeiden. Kunden begeistern.',
    description:
      'Die größte Schwachstelle im Omnichannel? Beratung. Unsere Lösung: (Live-)Video-Kaufberatung, erreichbar im Online-Shop oder per QR-Code auf der Verpackung am POS-Display. Echte Menschen. Echte Beratung. Auch in Echtzeit.',
    challenges: [
      {
        icon: 'ri-chat-off-line',
        title: 'Online fehlt das Gespräch',
        desc: 'Produkttexte und Rezensionen ersetzen kein Verkaufsgespräch. Ein Gegenüber, das Fragen live beantwortet, erleichtert den Kauf.',
      },
      {
        icon: 'ri-user-unfollow-line',
        title: 'Am POS fehlt das Personal',
        desc: 'Nicht jeder Markt hat geschultes Fachpersonal. In vielen Outlets steht kein Berater für dein Produkt. Die Kaufentscheidung fällt ohne dich.',
      },
      {
        icon: 'ri-arrow-go-back-line',
        title: 'Retouren fressen die Marge',
        desc: 'Wer online ohne Beratung kauft, kauft öfter falsch. Die Folge: Retouren, Unzufriedenheit, Margenverlust. Beratung managt Erwartungen.',
      },
    ],
    deliverables: [
      { icon: 'ri-shopping-cart-line', title: 'Im Online-Shop', desc: 'Ein Button oder Widget im Shop startet die Live-Video-Beratung oder Verkaufsvideos. Wie im Laden, nur digital. Die Conversion steigt, die Retourenquote sinkt. Plus Cross- und Upselling-Potenzial.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/3. Bild Kopie.webp' },
      { icon: 'ri-qr-code-line', title: 'Auf der Verpackung', desc: 'QR-Code scannen, Live-Video-Call mit einem Produktexperten starten. Beratung genau dort, wo die Kaufentscheidung fällt. Der direkteste Weg von der Verpackung zum Verkaufsgespräch.', img: 'https://readdy.ai/api/search-image?query=customer%20scanning%20QR%20code%20on%20product%20packaging%20with%20smartphone%20connecting%20to%20live%20video%20advisor%20product%20expert%20consultation%20at%20point%20of%20purchase%20modern%20retail%20packaging%20design&width=800&height=500&seq=deliv-omni-2&orientation=landscape' },
      { icon: 'ri-tablet-line', title: 'Am POS-Display', desc: 'Kein Berater vor Ort? Kein Problem. Über Displays, Tablets oder QR-Codes am Regal verbinden sich Kunden live mit unseren Video-Experten. Fachberatung auf Knopfdruck.', img: 'https://readdy.ai/api/search-image?query=interactive%20tablet%20display%20at%20retail%20shelf%20customer%20using%20touchscreen%20to%20connect%20with%20live%20video%20product%20expert%20modern%20retail%20technology%20digital%20advisory%20kiosk%20in%20store&width=800&height=500&seq=deliv-omni-3&orientation=landscape' },
      { icon: 'ri-user-star-line', title: 'Geschulte Video-Berater', desc: 'Aus unserem Talentepool, trainiert auf dein Produkt, dein Branding. Festangestellt, keine Freelancer.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/VIDEO01 Kopie.webp' },
      { icon: 'ri-customer-service-2-line', title: 'Multitalente', desc: 'Unsere Talente können nicht nur beraten und verkaufen, sie können auch Kundensupport. Eine Video-Hotline, viele Funktionen: Pre-Sales, After-Sales, Service, Troubleshooting.', img: 'https://readdy.ai/api/search-image?query=versatile%20customer%20service%20team%20handling%20multiple%20video%20calls%20pre-sales%20after-sales%20support%20troubleshooting%20modern%20call%20center%20with%20video%20capabilities%20professional%20branded%20environment&width=800&height=500&seq=deliv-omni-5&orientation=landscape' },
      { icon: 'ri-settings-3-line', title: 'Technische Integration', desc: 'QR-Codes, Shop-Widgets, POS-Displays, Einbettung in deine bestehende Infrastruktur: Wir liefern die Anbindung. Keine IT-Projekte auf deiner Seite.', img: 'https://readdy.ai/api/search-image?query=seamless%20technical%20integration%20diagram%20showing%20QR%20code%20shop%20widget%20POS%20display%20connections%20to%20existing%20infrastructure%20clean%20technology%20architecture%20visualization%20modern%20digital%20ecosystem&width=800&height=500&seq=deliv-omni-6&orientation=landscape' },
      { icon: 'ri-bar-chart-line', title: 'Reporting', desc: 'Jeder Call wird getrackt: Dauer, Ergebnis, Kundenzufriedenheit, Kaufabschluss. In deinem persönlichen Dashboard im SRT.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-scales-line', title: 'Skalierbarkeit', desc: 'Von 100 auf 10.000 Calls pro Monat. Wir skalieren das Team, die Schichtpläne und die Technik mit deinem Bedarf. Saisonal, kampagnengetrieben oder dauerhaft.', img: 'https://readdy.ai/api/search-image?query=scalable%20video%20advisory%20team%20growing%20from%20small%20to%20large%20operation%20multiple%20advisors%20in%20modern%20studio%20environment%20flexible%20staffing%20seasonal%20scaling%20professional%20setup&width=800&height=500&seq=deliv-omni-8&orientation=landscape' },
    ],
    steps: [
      { num: '01', title: 'Pilotkonzept & Produktschulung', desc: 'Wir definieren gemeinsam den Scope: Welche Produkte? Welche Zielgruppen? Welches Volumen? Statische Videos, Live-Video oder beides? Dann schulen wir unser Team auf dein Produkt, dein Branding und deine Tonalität.', img: 'https://readdy.ai/api/search-image?query=pilot%20concept%20workshop%20team%20defining%20video%20advisory%20scope%20product%20selection%20target%20audience%20volume%20planning%20modern%20meeting%20room%20collaborative%20strategy%20session%20professional%20environment&width=900&height=500&seq=step-omni-1&orientation=landscape' },
      { num: '02', title: 'Technische Integration', desc: 'QR-Codes für Verpackungen, Widget für den Online-Shop, Anbindung an POS-Displays: Wir richten die Technik ein. Schnelle Integration, kein Overhead auf deiner Seite.', img: 'https://readdy.ai/api/search-image?query=technical%20integration%20setup%20QR%20code%20generation%20shop%20widget%20installation%20POS%20display%20configuration%20fast%20seamless%20technology%20deployment%20professional%20IT%20setup%20modern%20digital%20infrastructure&width=900&height=500&seq=step-omni-2&orientation=landscape' },
      { num: '03', title: 'Go-Live & Pilotphase', desc: 'Dein Live-Video-Kanal geht live. Wir starten mit einem definierten Pilotumfang, sammeln Daten, messen Performance und optimieren in den ersten Wochen.', img: 'https://readdy.ai/api/search-image?query=live%20video%20advisory%20channel%20launch%20first%20customer%20calls%20going%20live%20team%20monitoring%20performance%20data%20pilot%20phase%20launch%20day%20excitement%20professional%20video%20studio%20environment&width=900&height=500&seq=step-omni-3&orientation=landscape' },
      { num: '04', title: 'Tracking, Optimierung & Skalierung', desc: 'Live-Dashboards ab Tag 1. Was funktioniert, wird skaliert. Alles andere wird optimiert.', img: 'https://readdy.ai/api/search-image?query=video%20advisory%20performance%20optimization%20team%20analyzing%20call%20metrics%20scaling%20successful%20channels%20improving%20underperforming%20ones%20live%20dashboard%20review%20modern%20office%20data%20driven%20decisions&width=900&height=500&seq=step-omni-4&orientation=landscape' },
    ],
    stats: [
      { value: '>50.000', label: '1:1 Live Video Calls absolviert' },
      { value: 'Ø 12 Min.', label: 'Durchschnittliche Beratungsdauer' },
      { value: '4,7/5', label: 'Kundenzufriedenheit' },
      { value: '100 %', label: 'Managed Service – du brauchst nichts Eigenes' },
    ],
    testimonial: {
      quote: 'Sonic hat unsere Live-Video-Beratung auf ein neues Level gebracht. Das Team lieferte von Tag eins messbare Conversion-Steigerungen — genau das, was wir gebraucht haben.',
      author: 'Head of E-Commerce',
      role: 'Avoury – Tea Experience Brand',
      brand: 'Avoury',
      img: 'https://readdy.ai/api/search-image?query=premium%20tea%20brand%20live%20video%20consultation%20customer%20connecting%20with%20tea%20expert%20advisor%20elegant%20product%20display%20sophisticated%20lifestyle%20brand%20experience%20modern%20digital%20advisory%20setup&width=1200&height=700&seq=testimonial-avoury-v2&orientation=landscape',
    },
    finalCta: 'Bereit, deine Omnichannel-Lücke zu schließen? Lass uns in 30 Minuten klären, wie Video deine Conversion steigert.',
    ctaLabel: 'Omnichannel-Strategie planen',
    link: '/leistungen/live-video',
  },
};

type SolutionKey = keyof typeof SOLUTIONS;
const KEYS: SolutionKey[] = ['markteintritt', 'absatz', 'omnichannel'];

/* ─────────────────────────────────────────
   EXPANDED PANEL
───────────────────────────────────────── */
function ExpandedPanel({ sKey, onClose, carouselRef, heroBgImages, woodTextures, deliverableImages, stepImages, testimonialImages, iconImages }: { sKey: SolutionKey; onClose: () => void; carouselRef: React.RefObject<HTMLDivElement>; heroBgImages: import('@/lib/mediaStore').MediaItem[]; woodTextures: import('@/lib/mediaStore').MediaItem[]; deliverableImages: import('@/lib/mediaStore').MediaItem[]; stepImages: import('@/lib/mediaStore').MediaItem[]; testimonialImages: import('@/lib/mediaStore').MediaItem[]; iconImages: import('@/lib/mediaStore').MediaItem[] }) {
  const s = SOLUTIONS[sKey];
  const [activeDeliverable, setActiveDeliverable] = useState(0);
  const [delivFade, setDelivFade] = useState(true);

  // ── Dashboard-managed image overrides ──
  // Deliverable base offsets: Markteintritt starts at 0 (7 slots), Absatz at 7 (8 slots), Omnichannel at 15 (8 slots) → 23 total
  const dBase = { markteintritt: 0, absatz: 7, omnichannel: 15 };
  const sBase = { markteintritt: 0, absatz: 5, omnichannel: 10 };

  // Icon override map — use dashboard-managed icons when available
  const iconOverrides: Record<string, string> = {};
  if (iconImages[0]) iconOverrides['ambassador'] = iconImages[0].url;
  if (iconImages[1]) iconOverrides['dashboard'] = iconImages[1].url;
  if (iconImages[2]) iconOverrides['video'] = iconImages[2].url;

  // Testimonial override — use dashboard-managed testimonial image when available
  const testimonialIdx = sKey === 'markteintritt' ? 0 : sKey === 'absatz' ? 1 : 2;
  const testimonialOverride = testimonialImages[testimonialIdx];

  const overriddenDeliverables = s.deliverables.map((d, i) => {
    const override = deliverableImages[dBase[sKey] + i];
    if (override) return { ...d, img: override.url };
    // Check icon overrides for local file paths
    if (d.img.includes('/images/losungen/ambassador') && iconOverrides['ambassador'])
      return { ...d, img: iconOverrides['ambassador'] };
    if (d.img.includes('/images/losungen/dashboard') && iconOverrides['dashboard'])
      return { ...d, img: iconOverrides['dashboard'] };
    return d;
  });
  const overriddenSteps = s.steps.map((st, i) => {
    const override = stepImages[sBase[sKey] + i];
    return override ? { ...st, img: override.url } : st;
  });
  // Override testimonial image
  const testimonialImg = testimonialOverride ? testimonialOverride.url : s.testimonial.img;

  const heroImages: Record<SolutionKey, string> = {
    markteintritt: (heroBgImages[1] && heroBgImages[1].url) || '',
    absatz: (heroBgImages[2] && heroBgImages[2].url) || '',
    omnichannel: (heroBgImages[3] && heroBgImages[3].url) || '',
  };

  const handleDeliverableChange = (idx: number) => {
    setDelivFade(false);
    setTimeout(() => {
      setActiveDeliverable(idx);
      setDelivFade(true);
    }, 200);
  };

  const scrollToCarousel = () => {
    onClose();
    setTimeout(() => {
      carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div style={{ animation: 'expandIn 0.5s ease-out' }}>

      {/* ── FULL-WIDTH DARK HERO BANNER — exact Case Studies style ── */}
      <div className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          {(woodTextures[1] && woodTextures[1].url) ? (
            <img
              src={woodTextures[1].url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-14">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/70 hover:text-primary-500 transition-colors font-bold text-sm cursor-pointer"
            >
              <i className="ri-arrow-up-line text-lg"></i>
              <span className="hidden sm:inline">Zurück zur Übersicht</span>
              <span className="sm:hidden">Zurück</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:scale-110 transition-all cursor-pointer"
            >
              <i className="ri-close-line text-xl text-white"></i>
            </button>
          </div>

          {/* Hero content */}
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-500/20" style={{ borderRadius: 0 }}>
                  <i className={`${s.icon} text-xl text-primary-500`}></i>
                </div>
                <div>
                  <p className="text-white font-black text-sm">{s.label}</p>
                  <p className="text-white/60 text-xs font-medium">Sonic Lösung</p>
                </div>
              </div>
              <h2 className="leist-h2 text-foreground-950">
                {s.title}
              </h2>
              <p className="text-base md:text-xl text-white/75 font-bold leading-relaxed mb-3 md:mb-6">{s.subtitle}</p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">{s.description}</p>
            </div>

            {/* Hero stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {s.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/[0.04] backdrop-blur-[2px] p-4 md:p-5 border border-white/[0.06]">
                  <div className="text-xl md:text-3xl font-black text-primary-500 font-sans tabular-nums mb-1">{stat.value}</div>
                  <div className="text-white/70 text-2xs md:text-xs font-bold uppercase tracking-wide leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STORY BODY ── */}
      <div className="bg-white">

        {/* ── Herausforderungen ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-black text-foreground-400 uppercase tracking-widest mb-2">Deine Herausforderung</p>
            <h3 className="text-2xl md:text-4xl font-black text-foreground-950">
              {sKey === 'markteintritt' ? 'Drei typische Markteintritts-Hürden' :
               sKey === 'absatz' ? 'Der Retail-Alltag frisst Potenzial' :
               'Die Lücke, die kein Algorithmus schließt'}
            </h3>
          </div>
          <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {s.challenges.map((ch, i) => (
              <div key={i} className="bg-white p-6 md:p-10 border border-foreground-100 hover:border-primary-500/30 hover:-translate-y-1 transition-all duration-300 group" style={{ borderRadius: 0 }}>
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-primary-500/10 border border-primary-500/20 mb-4 md:mb-6 group-hover:bg-primary-500/20 transition-colors" style={{ borderRadius: 0 }}>
                  <i className={`${ch.icon} text-xl md:text-2xl text-primary-500`}></i>
                </div>
                <h4 className="font-black text-lg md:text-xl text-foreground-950 mb-2 md:mb-4">{ch.title}</h4>
                <p className="text-sm md:text-base text-foreground-600 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Compact Mid CTA ── */}
        <div className="border-t border-foreground-100 py-3 md:py-4 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-foreground-500 font-medium">Bereit für messbaren Erfolg?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch%20anfragen`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-500 hover:text-primary-500 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-calendar-line text-sm"></i>Beratungsgespräch
            </a>
          </div>
        </div>

        <WoodenDivider />

        {/* ── Deliverables ── */}
        <div className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-black text-foreground-400 uppercase tracking-widest mb-2">
              {sKey === 'omnichannel' ? 'Unsere Antwort' : 'Unser Komplettpaket'}
            </p>
            <h3 className="text-2xl md:text-4xl font-black text-foreground-950">
              {sKey === 'markteintritt' ? 'Wir machen deinen Markteintritt messbar erlebbar' :
               sKey === 'absatz' ? 'Sell-out-Steigerung als System' :
               'Video: drei Touchpoints, ein Studio'}
            </h3>
          </div>

          {/* Editorial split: left list + right image */}
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[360px_1fr] border border-foreground-100">

              {/* Left: vertical selector list */}
              <div className="lg:border-r border-foreground-100 divide-y divide-foreground-100 flex flex-col">
                {overriddenDeliverables.map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDeliverableChange(idx)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 cursor-pointer group border-l-4 ${
                      activeDeliverable === idx
                        ? 'bg-foreground-950 border-primary-500'
                        : 'bg-white border-transparent hover:bg-primary-50 hover:border-primary-500/30'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <span className={`text-2xs font-black tabular-nums flex-shrink-0 w-5 ${
                      activeDeliverable === idx ? 'text-primary-500' : 'text-foreground-300 group-hover:text-primary-500/50'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div
                      className={`w-7 h-7 flex items-center justify-center flex-shrink-0 transition-colors ${
                        activeDeliverable === idx ? 'bg-primary-500/20' : 'bg-foreground-100 group-hover:bg-primary-500/10'
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <i className={`${d.icon} text-xs ${
                        activeDeliverable === idx ? 'text-primary-500' : 'text-foreground-400'
                      }`}></i>
                    </div>
                    <span className={`text-xs font-bold leading-snug flex-1 min-w-0 ${
                      activeDeliverable === idx ? 'text-white' : 'text-foreground-950'
                    }`}>
                      {d.title}
                    </span>
                    {activeDeliverable === idx && (
                      <i className="ri-arrow-right-s-line text-primary-500 text-sm flex-shrink-0"></i>
                    )}
                  </button>
                ))}
              </div>

              {/* Right: image + content panel */}
              <div
                className="relative overflow-hidden"
                style={{ transition: 'opacity 0.2s', opacity: delivFade ? 1 : 0 }}
              >
                <img
                  src={overriddenDeliverables[activeDeliverable].img}
                  alt={overriddenDeliverables[activeDeliverable].title}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div
                  className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-primary-500/20 border border-primary-500/40"
                      style={{ borderRadius: 0 }}
                    >
                      <i className={`${overriddenDeliverables[activeDeliverable].icon} text-lg md:text-xl text-primary-500`}></i>
                    </div>
                    <h4 className="text-xl md:text-3xl font-black text-white drop-shadow-lg">
                      {overriddenDeliverables[activeDeliverable].title}
                    </h4>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base max-w-2xl">
                    {overriddenDeliverables[activeDeliverable].desc}
                  </p>
                  {/* Progress indicator */}
                  <div className="flex items-center gap-1.5 mt-5">
                    {overriddenDeliverables.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDeliverableChange(idx)}
                        className={`h-1 transition-all duration-300 cursor-pointer ${
                          activeDeliverable === idx ? 'bg-primary-500 w-6' : 'bg-white/[0.12] w-3 hover:bg-primary-500/60'
                        }`}
                        style={{ borderRadius: 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <WoodenDivider />

        {/* ── Process Steps ── */}
        <div className="bg-white py-12 md:py-20 px-4 md:px-8">
          <div className="sonic-container">
            <div className="mb-8 md:mb-14">
              <p className="text-xs md:text-sm font-black text-foreground-400 uppercase tracking-widest mb-2">Der Weg zum Erfolg</p>
              <h3 className="text-2xl md:text-4xl font-black text-foreground-950">
                {sKey === 'markteintritt' ? 'So läuft dein Markteintritt mit Sonic' :
                 sKey === 'absatz' ? 'Das Sonic-System mit fünf Schritten' :
                 'So führen wir Video ein'}
              </h3>
              {/* ── Compact stats pills ── */}
              <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-6">
                {s.stats.map((stat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-500/6 border border-primary-500/15 text-xs font-bold">
                    <span className="text-primary-500 tabular-nums">{stat.value}</span>
                    <span className="text-foreground-400 font-medium">{stat.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Alternating editorial grid */}
            <div className="space-y-0 border border-foreground-200">
              {overriddenSteps.map((st, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="group grid md:grid-cols-1 md:grid-cols-2 border-b border-foreground-200 last:border-b-0 hover:border-b-gray-200 transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    {/* Image panel */}
                    <div className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}
                      style={{ minHeight: 'clamp(200px, 25vw, 340px)' }}
                    >
                      <img
                        src={st.img}
                        alt={st.title}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent" />
                      {/* Step number watermark */}
                      <div className="absolute top-3 left-4 md:top-5 md:left-6">
                        <span
                          className="text-6xl md:text-8xl font-black leading-none select-none"
                          style={{ color: 'rgba(200,212,0,0.55)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                        >
                          {st.num}
                        </span>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div
                      className={`flex flex-col justify-center px-7 py-8 md:px-10 md:py-12 bg-white group-hover:bg-foreground-950 transition-colors duration-300 ${
                        isEven ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xs font-black text-foreground-300 group-hover:text-primary-500/50 uppercase tracking-widest transition-colors">
                          {st.num}
                        </span>
                        <div className="h-px flex-1 bg-foreground-100 group-hover:bg-white/10 transition-colors" />
                      </div>
                      <h4 className="font-black text-xl md:text-2xl text-foreground-950 group-hover:text-white transition-colors duration-300 mb-3 leading-snug">
                        {st.title}
                      </h4>
                      <p className="text-foreground-500 group-hover:text-white/75 leading-relaxed text-sm md:text-base transition-colors duration-300">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Compact bottom bar ── */}
        <div className="border-t border-foreground-100 py-5 md:py-7 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-foreground-500 text-center sm:text-left max-w-lg leading-relaxed">{s.finalCta}</p>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={scrollToCarousel}
                className="text-xs font-bold text-foreground-400 hover:text-foreground-950 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-arrow-up-line mr-1"></i>Zurück
              </button>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch%20anfragen`}
                className="inline-flex items-center gap-2 bg-foreground-950 text-white px-5 py-2.5 font-black text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap"
                style={{ borderRadius: 0 }}
              >
                <i className="ri-calendar-line text-sm"></i>Beratungsgespräch
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('nachricht') as HTMLTextAreaElement)?.value || '';
    if (message.length > 500) return;

    setFormStatus('sending');

    try {
      const formEl = e.currentTarget;
      const fd = new FormData(formEl);
      const data: Record<string, string> = {};
      fd.forEach((val, key) => { data[key] = val as string; });
      data['_subject'] = `Lösungen Kontaktanfrage von ${data.vorname || ''} ${data.nachname || ''}`;

      await submitContactForm(data);
      setFormStatus('success');
      formEl.reset();
      setCharCount(0);
    } catch {
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 flex items-center justify-center bg-primary-500/20 mx-auto mb-5">
          <i className="ri-check-double-line text-3xl text-primary-500"></i>
        </div>
        <h3 className="text-2xl font-black text-foreground-950 mb-2 uppercase">Nachricht gesendet!</h3>
        <p className="text-foreground-500 text-sm leading-relaxed">
          Vielen Dank für deine Anfrage. Wir melden uns innerhalb von 24 Stunden bei dir.
        </p>
        <button
          onClick={() => setFormStatus('idle')}
          className="mt-6 text-primary-500 font-black text-sm hover:underline cursor-pointer"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form
      id="losungen-kontakt-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Vorname *</label>
          <input
            type="text"
            name="vorname"
            required
            placeholder="Max"
            className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Nachname *</label>
          <input
            type="text"
            name="nachname"
            required
            placeholder="Mustermann"
            className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">E-Mail *</label>
        <input
          type="email"
          name="email"
          required
          placeholder="max@unternehmen.de"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Unternehmen</label>
        <input
          type="text"
          name="unternehmen"
          placeholder="Dein Unternehmen GmbH"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Telefon</label>
        <input
          type="tel"
          name="telefon"
          placeholder="+49 2151 479 444 0"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Ich interessiere mich für</label>
        <select
          name="interesse"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors bg-white cursor-pointer"
        >
          <option value="">Bitte wählen...</option>
          <option value="Markteintritt">Markteintritt</option>
          <option value="Absatz steigern">Absatz steigern</option>
          <option value="Omnichannel / Live-Video">Omnichannel / Live-Video</option>
          <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">
          Deine Nachricht *
          <span className={`ml-2 font-normal normal-case ${charCount > 480 ? 'text-red-400' : 'text-foreground-400'}`}>
            {charCount}/500
          </span>
        </label>
        <textarea
          name="nachricht"
          required
          rows={4}
          maxLength={500}
          placeholder="Beschreibe kurz dein Projekt oder deine Frage..."
          onChange={(e) => setCharCount(e.target.value.length)}
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors resize-none"
        />
      </div>

      {formStatus === 'error' && (
        <p className="text-red-500 text-sm font-semibold">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}

      <button
        type="submit"
        disabled={formStatus === 'sending' || charCount > 500}
        className="w-full flex items-center justify-center gap-3 bg-primary-500 text-foreground-950 py-4 font-black hover:bg-foreground-950 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {formStatus === 'sending' ? (
          <>
            <i className="ri-loader-4-line animate-spin text-lg"></i>
            Wird gesendet...
          </>
        ) : (
          <>
            <i className="ri-send-plane-line text-lg"></i>
            Anfrage absenden
          </>
        )}
      </button>

      <p className="text-foreground-400 text-xs text-center">
        Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────
   WOOD CARD
───────────────────────────────────────── */
function WoodCard({
  sKey,
  isExpanded,
  onToggle,
  woodTextures,
}: {
  sKey: SolutionKey;
  isExpanded: boolean;
  onToggle: () => void;
  woodTextures: import('@/lib/mediaStore').MediaItem[];
}) {
  const s = SOLUTIONS[sKey];
  const heroStat = s.stats[0];
  const factStats = s.stats.slice(1, 4);
  const barHeights = [42, 58, 72, 88];

  return (
    <div className="w-full relative overflow-hidden" style={{ borderRadius: 0, border: '1px solid oklch(0.885 0.004 110)' }}>
      {/* Wood texture — actual image, dark diagonal overlay, no shadow/glow */}
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,11,9,0.86), rgba(10,11,9,0.78), rgba(10,11,9,0.88))' }} />
      </div>

      {/* Fine grain overlay */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 2px, transparent 4px)' }} />

      <div className="relative z-10 p-6 md:p-12">
        {/* 1. Card header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-7">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-primary-500/15 border border-primary-500/40 flex-shrink-0">
              <i className={`${s.icon} text-xl md:text-2xl text-primary-500`}></i>
            </div>
            <div className="min-w-0">
              <p className="text-primary-500 text-2xs font-black uppercase tracking-widest">Sonic Lösung</p>
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight">{s.label}</h2>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-none border border-white/15 bg-white/5 px-4 py-2">
            <span className="text-white/75 text-xs font-bold whitespace-nowrap">Sonic Group · Seit 2007</span>
          </div>
        </div>

        {/* 2. Two-column hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: big stat + label + description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-500 font-sans tabular-nums leading-none drop-shadow-lg">{heroStat.value}</div>
            <p className="text-white/75 text-sm md:text-base font-bold uppercase tracking-wide mt-3">{heroStat.label}</p>
            <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-md">{s.description}</p>
          </div>

          {/* Right: chart panel */}
          <div className="lg:col-span-7 bg-black/30 border border-white/10 backdrop-blur-[2px] p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/85 text-xs font-black uppercase tracking-wide">Performance-Trend</span>
              <span className="text-primary-500 text-xs font-sans tabular-nums font-black bg-white/10 rounded-none px-3 py-1">2021–2024</span>
            </div>
            <div className="flex-1 flex items-end gap-1.5 md:gap-2 min-h-[120px]">
              {s.stats.map((_, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <div className="w-full bg-gradient-to-t from-primary-500/60 to-primary-500 transition-all duration-700" style={{ height: `${barHeights[i]}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {s.stats.map((st, i) => (
                <span key={i} className="text-white/40 flex-1 text-center text-[10px] md:text-xs">{st.label.split(' ').slice(0, 2).join(' ')}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Fact row — 3 compact tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-6">
          {factStats.map((stat, i) => (
            <div key={i} className="bg-black/25 border border-white/10 p-4 md:p-5 text-center">
              <div className="text-primary-500 font-sans tabular-nums font-black text-lg md:text-2xl mb-1">{stat.value}</div>
              <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 4. CTA row */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-none bg-primary-500 text-foreground-950 px-7 py-3 font-black uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap text-xs md:text-sm"
          >
            {isExpanded ? 'Schließen' : 'Mehr dazu'}
            <i className={`ri-arrow-down-line text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
          </button>
          <button
            onClick={onToggle}
            className="w-11 h-11 md:w-12 md:h-12 rounded-none flex items-center justify-center border border-white/25 text-white hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer"
            aria-label={isExpanded ? 'Schließen' : 'Mehr dazu'}
          >
            <i className={`ri-arrow-down-line text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function LosungenPage() {
  useSEO({
    title: 'Lösungen | Sonic Group — Markteintritt, Absatz & Omnichannel DACH',
    description: 'Drei Retail-Lösungen von Sonic Group: Markteintritt im DACH-Raum, Absatzsteigerung am POS und Omnichannel-Strategie mit Live Video. Datenbasiert, messbar, skalierbar.',
    keywords: 'Markteintritt DACH, Absatz steigern Retail, Omnichannel Strategie, Retail Lösungen Deutschland',
    canonical: 'https://sonic-group.de/losungen',
    ogTitle: 'Lösungen — Sonic Group DACH',
    ogDescription: 'Markteintritt, Absatzsteigerung & Omnichannel: Drei datenbasierte Retail-Lösungen für den DACH-Markt.',
  });
  // ── Dashboard-managed media ──
  const { images: heroBgImages } = useMediaStore('losungen_hero_backgrounds');
  const { images: woodTextures } = useMediaStore('losungen_wood_textures');
  const { images: testimonialImages } = useMediaStore('losungen_testimonial_images');
  const { images: deliverableImages } = useMediaStore('losungen_deliverable_images');
  const { images: stepImages } = useMediaStore('losungen_step_images');
  const { images: iconImages } = useMediaStore('/images/losungen');

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<SolutionKey>('markteintritt');
  const [expandedKey, setExpandedKey] = useState<SolutionKey | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [surveyExpanded, setSurveyExpanded] = useState(false);
  const [showSurveyContact, setShowSurveyContact] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);
  const [surveyName, setSurveyName] = useState('');
  const [surveyLastName, setSurveyLastName] = useState('');
  const [surveyEmail, setSurveyEmail] = useState('');
  const [surveyPhone, setSurveyPhone] = useState('');
  const [surveyCompany, setSurveyCompany] = useState('');
  const [surveyRole, setSurveyRole] = useState('');
  const [surveyBudget, setSurveyBudget] = useState('');
  const [surveyNotes, setSurveyNotes] = useState('');
  const [surveySubmitting, setSurveySubmitting] = useState(false);
  const [surveyError, setSurveyError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openParam = searchParams.get('open') as SolutionKey | null;
    if (openParam && KEYS.includes(openParam)) {
      setActiveTab(openParam);
      setExpandedKey(openParam);
      setTimeout(() => {
        carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [searchParams]);

  const handleTabClick = (key: SolutionKey) => {
    setActiveTab(key);
    setExpandedKey(null);
  };

  const handleToggle = (key: SolutionKey) => {
    const next = expandedKey === key ? null : key;
    setExpandedKey(next);
    if (next) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const surveyQuestions = [
    { question: 'In welcher Branche bist du aktiv?', options: ['Consumer Electronics', 'Haushaltsgeräte', 'Sport & Outdoor', 'Kosmetik & Beauty', 'Food & Beverages', 'Pharma & Healthcare', 'Fashion & Lifestyle', 'Sonstiges'] },
    { question: 'Was ist dein primäres Ziel?', options: ['Markteintritt', 'Absatzsteigerung', 'Omnichannel-Strategie', 'Markenbekanntheit', 'Kundenbindung', 'POS-Optimierung', 'Live-Video-Beratung', 'Sales-Training & Enablement'] },
    { question: 'Wie viele POS-Standorte planst du?', options: ['1–10', '11–50', '51–100', '100–500', '500+', 'Noch unklar'] },
    { question: 'Wann möchtest du starten?', options: ['Sofort', 'In 1–3 Monaten', 'In 3–6 Monaten', 'In 6–12 Monaten', 'Noch in Planung'] },
    { question: 'Hast du bereits Erfahrung mit Field-Marketing-Agenturen?', options: ['Ja, aktuell in Zusammenarbeit', 'Ja, aber unzufrieden', 'Nein, erstes Mal', 'Bereits probiert, abgebrochen', 'Evaluiere verschiedene Anbieter'] },
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSurveyContact(true);
    }
  };

  const handleSurveySubmit = async () => {
    if (!surveyEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(surveyEmail)) {
      setSurveyError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    setSurveySubmitting(true);
    setSurveyError('');

    try {
      const form = document.getElementById('losungen-survey-form') as HTMLFormElement;
      const formData = new FormData(form);
      // Add survey answers as hidden fields
      formData.append('branche', answers[0] || '');
      formData.append('ziel', answers[1] || '');
      formData.append('standorte', answers[2] || '');
      formData.append('start', answers[3] || '');
      formData.append('erfahrung', answers[4] || '');

      const response = await fetch(SURVEY_FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Array.from(formData.entries()) as [string, string][]).toString(),
      });
      const responseText = await response.text();
      let parsed;
      try { parsed = JSON.parse(responseText); } catch { /* ignore */ }

      const serverMsg = parsed?.meta?.message || parsed?.meta?.detail || parsed?.message || responseText;
      if (response.ok && parsed?.code === 'OK') {
        setSurveyDone(true);
        setShowSurveyContact(false);
      } else if (serverMsg?.toLowerCase().includes('spam') || serverMsg?.toLowerCase().includes('form data is spam')) {
        setSurveyError('Deine Anfrage konnte nicht verarbeitet werden. Bitte versuche es später erneut.');
      } else {
        setSurveyError(serverMsg || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      }
    } catch {
      setSurveyError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setSurveySubmitting(false);
    }
  };

  const faqItems = [
    {
      question: 'Für welche Branchen arbeitet Sonic?',
      answer: 'Wir sind spezialisiert auf erklärungsbedürftige Produkte im Retail: Consumer Electronics, Haushaltsgeräte, Sport & Outdoor, Kosmetik, Pharma, Food & Beverages und B2B. Unsere Markenbotschafter sind in allen großen Handelsketten Deutschlands im Einsatz – von MediaMarkt und Saturn über Douglas und dm bis hin zu Fachhandel und Sportfachgeschäften. Wir haben in über 15 Jahren Erfahrung aufgebaut, wie man komplexe Produkte am POS erklärt, Vertrauen aufbaut und Kaufentscheidungen beschleunigt. Egal ob du ein globaler Konzern oder ein aufstrebendes Scale-up bist – wenn dein Produkt erklärt werden muss, sind wir die richtige Wahl.',
    },
    {
      question: 'Was unterscheidet Sonic von anderen Vertriebsagenturen?',
      answer: 'Vier Dinge: Erstens arbeiten unsere Promoter festangestellt – keine Freelancer, keine Zeitarbeit. Das bedeutet höhere Motivation, bessere Schulbarkeit und echte Markenbotschafter statt austauschbarer Gesichter. Zweitens planen wir datenbasiert: Unser eigenes ERP-System, das Sonic Reporting Tool (SRT), liefert Forecasts, bevor der erste Einsatz startet. Du weißt vorher, was du erwarten kannst. Drittens bekommst du Live-Transparenz: Du siehst in Echtzeit, was auf der Fläche passiert – Verkäufe, Kontakte, Standort-Performance. Keine Quartalsberichte, kein Excel-Blindflug. Viertens kennt unser Agenturteam auch die Kundenseite: Wir verstehen Konzernstrukturen, Budgetprozesse und die Anforderungen von Marketing- und Vertriebsverantwortlichen aus eigener Erfahrung.',
    },
    {
      question: 'Was ist das Sonic Reporting Tool (SRT)?',
      answer: 'Das SRT ist unsere selbst entwickelte Software – das Herzstück unserer Arbeit. Es vereint Marktforschung, Forecasting, Einsatzplanung, Einsatztracking, Zielerreichung, Abrechnung und Dashboards in einem System. Es dockt an deine bestehende Software an und gibt dir jederzeit vollen Einblick in die Performance deiner Projekte. Unsere Promoter nutzen das SRT täglich: Sie checken ein, dokumentieren Verkäufe und Kontakte, sehen ihre eigene Zielerreichung in Echtzeit und erhalten Coaching-Impulse direkt im Tool. Für dich als Auftraggeber bedeutet das: Du hast ein persönliches Dashboard, das du jederzeit aufrufen kannst – ohne auf Reports warten zu müssen.',
    },
    {
      question: 'Wie groß ist der Talentepool?',
      answer: 'Aktuell umfasst unser Pool rund 2.000 Talente deutschlandweit, die wir projektbezogen fest anstellen. Alle sind handverlesen, geschult und haben Live-Zugriff auf ihre eigene Zielerreichung im SRT. Für neue Projekte rekrutieren und trainieren wir gezielt aus diesem Pool oder bauen ihn für dich aus. Unsere Talente sind keine Studenten, die nebenbei jobben – sie sind Profis, die Retail lieben, Produkte verstehen und Kunden begeistern können. Viele arbeiten seit Jahren exklusiv für Sonic und kennen die Handelsflächen, die Händler und die Kaufmuster in ihren Regionen wie ihre Westentasche.',
    },
    {
      question: 'Wie funktioniert die Live-Video-Beratung?',
      answer: 'Kunden klicken einen Button im Shop, aktivieren den Videochat am POS-Display oder scannen einen QR-Code auf einem Aufsteller oder der Produktverpackung. Dann werden sie sofort mit einem geschulten Video-Berater verbunden. Der Berater kennt dein Produkt, trägt dein Branding und berät in Echtzeit – genau wie ein Verkäufer im Laden, nur digital. Jeder Call wird getrackt: Dauer, Ergebnis, Kundenzufriedenheit, Kaufabschluss. Du brauchst keine eigene Infrastruktur, keine eigene Technik, keine eigenen Berater. Wir liefern alles: die Technologie, die Integration in deinen Shop oder dein POS-System, die geschulten Berater und das Reporting. Skalierbar von 100 bis 10.000 Calls pro Monat.',
    },
    {
      question: 'Was kostet eine Zusammenarbeit mit Sonic?',
      answer: 'Unsere Projekte werden individuell kalkuliert, abhängig von Umfang, Laufzeit, Anzahl der Einsätze und gewünschten Leistungen. Es gibt kein Einheitspaket – weil jede Marke, jedes Produkt und jeder Markt anders ist. Was wir dir im Erstgespräch immer liefern: eine transparente Kostenstruktur und eine ROI-Prognose auf Basis unserer Daten. Du weißt also nicht nur, was es kostet, sondern auch, was es bringt – bevor du unterschreibst. Viele unserer Kunden starten mit einem Pilotprojekt, um die Zusammenarbeit kennenzulernen und erste Daten zu sammeln. Danach skalieren wir gemeinsam.',
    },
    {
      question: 'Wie messe ich den Erfolg?',
      answer: 'Über das SRT hast du Zugriff auf Echtzeit-Dashboards mit allen relevanten KPIs: Verkäufe, Kontakte, Zielerreichung, Standort-Performance, Mitarbeiter-Performance. Wir definieren zu Projektbeginn gemeinsam, welche KPIs für dich entscheidend sind – und messen genau diese. Keine Bauchgefühl-Reports, keine nachträglichen Interpretationen. Tagesaktuell. Und wir starten jedes Projekt mit einem gemeinsam definierten Ziel, gegen das wir messen. Wenn etwas nicht performt, sehen wir es sofort und können gegensteuern – nicht erst am Quartalsende.',
    },
    {
      question: 'Wie schnell kann ein Projekt starten?',
      answer: 'Das hängt vom Umfang ab. Kleinere Projekte mit bestehendem Talentepool können innerhalb von 2–3 Wochen live gehen. Größere Rollouts mit Recruiting, intensivem Training und POS-Aufbau brauchen in der Regel 4–8 Wochen Vorlaufzeit. Im Erstgespräch klären wir deinen Zeitplan und geben dir eine realistische Einschätzung. Wir sind bekannt dafür, schnell zu sein – aber nie auf Kosten der Qualität.',
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '480px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          {(heroBgImages[0] && heroBgImages[0].url) && (
            <img
              src={heroBgImages[0].url}
              alt="Lösungen Hero"
              className="w-full h-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* Lime ambient glow */}

        {/* Content — left-aligned, bottom-anchored */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6">
              <span className="w-1.5 h-1.5 bg-foreground-950" />
              Lösungen
            </div>

            {/* Main headline — editorial split type */}
            <h1 className="leist-h1-hub text-white mb-5 md:mb-6">
              Drei Wege<br />
              <span className="text-primary-500">durch die</span><br />
              Retail-Schallmauer.
            </h1>

            {/* Divider + subtitle */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-1 h-14 bg-primary-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-black text-base md:text-lg mb-1">
                  Die richtige Lösung für jede Phase deiner Retail-Strategie.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Markteintritt, Absatzsteigerung oder Omnichannel — Wir haben die Menschen, die Daten
                  und die Erfolgslösungen für den DACH-Markt.
                </p>
              </div>
            </div>

            {/* Three solution nav buttons — REMOVED, users scroll to carousel tabs */}
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
      </section>

      {/* ── WOODEN CAROUSEL ── */}
      <section ref={carouselRef} id="losungen-carousel" className="sonic-section-md relative bg-white overflow-visible">

        <div className="relative z-10 px-6 max-w-7xl mx-auto">
          {/* Intro — unified eyebrow + paragraph (redundant stat-grid removed: the wood card below already carries these stats) */}
          <div className="mb-8 md:mb-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Lösungen für den DACH-Markt</span>
            </div>
            <p className="text-sm md:text-base text-foreground-700 leading-relaxed">
              Ganz gleich ob du neu im Markt bist, deinen Absatz skalieren willst oder deine Omnichannel-Strategie zum Fliegen bringen musst: Wir haben die Menschen, die Daten und die Erfolgslösungen.
            </p>
          </div>

          {/* Tab switcher — framed hairline row, joins directly into the wood card below.
              Mobile: natural width + horizontal scroll (labels don't get crushed).
              md+: equal-width flex-1, there's room. */}
          <div
            className="flex overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden"
            style={{ border: '1px solid oklch(0.885 0.004 110)', borderBottom: 'none', scrollbarWidth: 'none' }}
          >
            {KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`flex-shrink-0 md:flex-1 px-4 md:px-8 py-3 md:py-3.5 font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === key
                    ? 'bg-foreground-950 text-primary-500'
                    : 'bg-white text-foreground-500 hover:text-foreground-950'
                }`}
              >
                {SOLUTIONS[key].label}
              </button>
            ))}
          </div>

          {/* Wood card */}
          <WoodCard
            sKey={activeTab}
            isExpanded={expandedKey === activeTab}
            onToggle={() => handleToggle(activeTab)}
            woodTextures={woodTextures}
          />

          {/* Nav dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {KEYS.map((key, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(key)}
                className={`h-2 rounded-none transition-all cursor-pointer hover:scale-110 ${
                  activeTab === key ? 'bg-primary-500 w-6 shadow-lg' : 'bg-foreground-300 w-2 hover:bg-primary-500/60'
                }`}
                aria-label={`View ${SOLUTIONS[key].label}`}
              />
            ))}
          </div>

        </div>

        {/* Expanded panel — full-bleed, outside the max-w container (no 100vw hack) */}
        <div ref={expandedRef} className="relative z-10">
          {expandedKey && expandedKey === activeTab && (
            <ExpandedPanel sKey={expandedKey} onClose={() => setExpandedKey(null)} carouselRef={carouselRef} heroBgImages={heroBgImages} woodTextures={woodTextures} deliverableImages={deliverableImages} stepImages={stepImages} testimonialImages={testimonialImages} iconImages={iconImages} />
          )}
        </div>
      </section>

      <WoodenDivider />

      {/* ── THREE PILLARS ── */}
      <section className="sonic-section-lg md:px-4 md:px-6 bg-foreground-950">
        <div className="sonic-container">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>Was immer gilt</span>
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            </div>
            <h2 className="leist-h2 text-white mb-2">Ganz gleich, wo du stehst</h2>
            <p className="text-base md:text-xl text-white/50 font-semibold">Du bekommst immer</p>
          </div>
          <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: 'ri-team-line', title: 'Festangestellte Talente', desc: 'Aus unserem Pool von 2.000 Markenbotschaftern. Geschult, motiviert, zuverlässig.' },
              { icon: 'ri-bar-chart-box-line', title: 'Datenbasierte Planung', desc: 'Das Sonic Reporting Tool (SRT) liefert Forecasts, Standortanalysen und ROI-Prognosen.' },
              { icon: 'ri-dashboard-line', title: 'Live-Reporting via SRT', desc: 'Echtzeit-Dashboards, angedockt an deine Software. Volle Transparenz.' },
            ].map((item, i) => (
              <div key={i} className="relative bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.06] hover:border-primary-500/50 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                {/* lime corner accent */}
                <div className="absolute top-0 left-0 w-[2px] h-16 bg-gradient-to-b from-primary-500 to-transparent" />
                <div className="pt-10 pb-8 px-8 text-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-primary-500/15 border border-primary-500/30 mx-auto mb-5 group-hover:bg-primary-500/25 transition-colors">
                    <i className={`${item.icon} text-2xl text-primary-500`}></i>
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* ── SURVEY ── inline block, not a standalone section ── */}
      <div className="py-10 md:py-14 px-4 md:px-6 bg-background-50">
        <div className="max-w-3xl mx-auto">
          {!surveyExpanded ? (
            /* ── Collapsed teaser ── */
            <div
              onClick={() => setSurveyExpanded(true)}
              className="relative bg-white border border-background-200 overflow-hidden cursor-pointer group hover:border-primary-500/40 transition-all duration-300"
              style={{ borderRadius: 0 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSurveyExpanded(true); }}
            >
              {/* Subtle lime corner accent */}
              <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-primary-500 to-transparent" />

              <div className="relative z-10 p-5 md:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary-500/10 border border-primary-500/25">
                    <i className="ri-flashlight-line text-lg text-primary-500"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] mb-0.5">Schnell-Check</p>
                    <h3 className="text-sm md:text-base font-black text-foreground-950 leading-snug">Finde die passende Sonic-Lösung für dein Projekt</h3>
                    <p className="text-xs text-foreground-500 mt-0.5 hidden sm:block">5 Fragen · 60 Sekunden · Maßgeschneidertes Ergebnis</p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-wider group-hover:bg-foreground-950 group-hover:text-white transition-all duration-300">
                  <span className="hidden sm:inline">Loslegen</span>
                  <i className="ri-arrow-right-line text-sm"></i>
                </div>
              </div>
            </div>
          ) : (
            /* ── Expanded survey card ── */
            <div
              className="relative bg-foreground-950 overflow-hidden"
              style={{ borderRadius: 0, animation: 'expandIn 0.3s ease-out' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-[2px] h-16 bg-gradient-to-b from-primary-500 to-transparent" />
              <div className="absolute bottom-0 right-0 w-[2px] h-16 bg-gradient-to-t from-primary-500 to-transparent" />

              {/* Close button */}
              <button
                onClick={() => {
                  setSurveyExpanded(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowSurveyContact(false);
                  setSurveyDone(false);
                  setSurveyEmail('');
                  setSurveyPhone('');
                  setSurveyCompany('');
                  setSurveyName('');
                  setSurveyLastName('');
                  setSurveyRole('');
                  setSurveyBudget('');
                  setSurveyNotes('');
                  setSurveyError('');
                }}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:scale-110 transition-all cursor-pointer"
                aria-label="Schließen"
              >
                <i className="ri-close-line text-lg text-white"></i>
              </button>

              <div className="relative z-10 p-6 md:p-8 pt-12 md:pt-10">
                {!surveyDone && !showSurveyContact ? (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-3 py-1 mb-3">
                        <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
                        <span className="text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Schnell-Check</span>
                      </div>
                      <h2 className="sonic-h3 text-white leading-tight">Finde deine Sonic-Lösung</h2>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-6">
                      <p className="text-xs font-black text-primary-500/70 uppercase tracking-widest whitespace-nowrap">
                        {currentQuestion + 1} / {surveyQuestions.length}
                      </p>
                      <div className="flex-1 h-px bg-white/10">
                        <div
                          className="h-full bg-primary-500 transition-all duration-500"
                          style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-1.5">
                        {surveyQuestions.map((_, qi) => (
                          <div
                            key={qi}
                            className="h-1 transition-all duration-300"
                            style={{ width: qi <= currentQuestion ? '24px' : '8px', background: qi <= currentQuestion ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.15)' }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Question */}
                    <h3 className="text-base md:text-lg font-black text-white mb-4 leading-snug">{surveyQuestions[currentQuestion].question}</h3>

                    <div className="space-y-2">
                      {surveyQuestions[currentQuestion].options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => handleAnswer(opt)}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.06] text-left font-semibold text-white/80 hover:bg-primary-500/15 hover:border-primary-500/50 hover:text-white transition-all duration-200 cursor-pointer text-sm group"
                        >
                          <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center border border-white/20 group-hover:border-primary-500/60 group-hover:bg-primary-500/15 transition-all text-2xs font-black text-white/40 group-hover:text-primary-500">
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="min-w-0">{opt}</span>
                          <i className="ri-arrow-right-line ml-auto opacity-0 group-hover:opacity-80 transition-all text-sm text-primary-500 flex-shrink-0" />
                        </button>
                      ))}
                    </div>

                    {/* Back button (except first question) */}
                    {currentQuestion > 0 && (
                      <button
                        onClick={() => {
                          setCurrentQuestion(currentQuestion - 1);
                          setAnswers(answers.slice(0, -1));
                        }}
                        className="mt-4 text-xs font-bold text-white/40 hover:text-white/70 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <i className="ri-arrow-left-line"></i>
                        Zurück
                      </button>
                    )}
                  </>
                ) : showSurveyContact && !surveyDone ? (
                  /* ── Contact + data collection step ── */
                  <div>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-3 py-1 mb-3">
                        <span className="text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Kontakt</span>
                      </div>
                      <h2 className="sonic-h3 text-white leading-tight">Fast geschafft!</h2>
                      <p className="text-white/50 text-sm mt-1">Hinterlasse deine Daten — wir erstellen dein persönliches Ergebnis.</p>
                    </div>

                    <form data-readdy-form id="losungen-survey-form" onSubmit={(e) => { e.preventDefault(); handleSurveySubmit(); }} className="space-y-4">
                      {/* Honeypot */}
                      <input
                        id="survey-company-alt"
                        name="company_alt"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        readOnly
                        className="survey-hp-field"
                      />

                      {/* Name row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Vorname <span className="text-white/60">*</span></label>
                          <input
                            type="text"
                            name="vorname"
                            required
                            value={surveyName}
                            onChange={(e) => setSurveyName(e.target.value)}
                            placeholder="Max"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Nachname <span className="text-white/60">*</span></label>
                          <input
                            type="text"
                            name="nachname"
                            required
                            value={surveyLastName}
                            onChange={(e) => setSurveyLastName(e.target.value)}
                            placeholder="Mustermann"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">E-Mail <span className="text-white/60">*</span></label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={surveyEmail}
                            onChange={(e) => setSurveyEmail(e.target.value)}
                            placeholder="max@unternehmen.de"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Telefon</label>
                          <input
                            type="tel"
                            name="phone"
                            value={surveyPhone}
                            onChange={(e) => setSurveyPhone(e.target.value)}
                            placeholder="+49 000 000000"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Company + Role */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Unternehmen</label>
                          <input
                            type="text"
                            name="unternehmen"
                            value={surveyCompany}
                            onChange={(e) => setSurveyCompany(e.target.value)}
                            placeholder="Dein Unternehmen GmbH"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Position</label>
                          <input
                            type="text"
                            name="position"
                            value={surveyRole}
                            onChange={(e) => setSurveyRole(e.target.value)}
                            placeholder="z. B. Marketing Manager"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Budget-Range (optional)</label>
                        <select
                          name="budget"
                          value={surveyBudget}
                          onChange={(e) => setSurveyBudget(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
                        >
                          <option value="" className="bg-foreground-950 text-white">Bitte wählen...</option>
                          <option value="< 10.000 €" className="bg-foreground-950 text-white">&lt; 10.000 €</option>
                          <option value="10.000 – 50.000 €" className="bg-foreground-950 text-white">10.000 – 50.000 €</option>
                          <option value="50.000 – 100.000 €" className="bg-foreground-950 text-white">50.000 – 100.000 €</option>
                          <option value="100.000 – 250.000 €" className="bg-foreground-950 text-white">100.000 – 250.000 €</option>
                          <option value="250.000 €+" className="bg-foreground-950 text-white">250.000 €+</option>
                          <option value="Noch unklar" className="bg-foreground-950 text-white">Noch unklar</option>
                        </select>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">
                          Zusätzliche Anmerkungen
                          <span className={`ml-2 font-normal normal-case ${surveyNotes.length > 400 ? 'text-red-400' : 'text-white/40'}`}>
                            {surveyNotes.length}/500
                          </span>
                        </label>
                        <textarea
                          name="notizen"
                          rows={3}
                          maxLength={500}
                          value={surveyNotes}
                          onChange={(e) => setSurveyNotes(e.target.value)}
                          placeholder="Erzähle uns kurz von deinem Projekt, deinen Zielen oder offenen Fragen..."
                          className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        />
                      </div>

                      {/* Survey answers summary (hidden) */}
                      <input type="hidden" name="branche" value={answers[0] || ''} />
                      <input type="hidden" name="ziel" value={answers[1] || ''} />
                      <input type="hidden" name="standorte" value={answers[2] || ''} />
                      <input type="hidden" name="start" value={answers[3] || ''} />
                      <input type="hidden" name="erfahrung" value={answers[4] || ''} />

                      {surveyError && (
                        <p className="text-red-400 text-xs font-semibold flex items-center gap-1"><i className="ri-error-warning-line"></i>{surveyError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={surveySubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-500 text-foreground-950 font-black text-sm uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                        style={{ borderRadius: 0 }}
                      >
                        {surveySubmitting ? <><i className="ri-loader-4-line animate-spin"></i> Wird gesendet...</> : <><i className="ri-send-plane-line"></i> Ergebnis anfordern</>}
                      </button>
                      <p className="text-white/30 text-xs text-center">Kein Spam. Nur relevant für dein Projekt.</p>
                    </form>
                  </div>
                ) : (
                  /* ── Thank you state ── */
                  <div className="text-center py-6">
                    <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 border border-primary-500/40 mx-auto mb-4" style={{ borderRadius: 0 }}>
                      <i className="ri-check-double-line text-2xl text-primary-500"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase">Vielen Dank!</h3>
                    <p className="text-white/50 mb-6 text-sm max-w-md mx-auto">Wir melden uns innerhalb von 24 Stunden bei dir mit einem maßgeschneiderten Ergebnis.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch%20anfragen`}
                        className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 px-6 py-3 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap text-xs uppercase tracking-wider"
                        style={{ borderRadius: 0 }}
                      >
                        <i className="ri-calendar-line"></i>
                        Beratungsgespräch buchen
                      </a>
                      <button
                        onClick={() => {
                          setSurveyExpanded(false);
                          setCurrentQuestion(0);
                          setAnswers([]);
                          setShowSurveyContact(false);
                          setSurveyDone(false);
                          setSurveyEmail('');
                          setSurveyPhone('');
                          setSurveyCompany('');
                          setSurveyName('');
                          setSurveyLastName('');
                          setSurveyRole('');
                          setSurveyBudget('');
                          setSurveyNotes('');
                          setSurveyError('');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.10] text-white font-black text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all duration-300 cursor-pointer whitespace-nowrap"
                        style={{ borderRadius: 0 }}
                      >
                        <i className="ri-restart-line"></i>
                        Neu starten
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CLIENT PROOF ── */}
      <ClientProof />

      <WoodenDivider />

      {/* ── FAQ ── */}
      <section className="sonic-section-lg px-6 bg-white">
        <div className="sonic-container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>FAQ</span>
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            </div>
            <h2 className="leist-h2 text-foreground-950">Häufig gestellte <span className="v3-marker">Fragen</span></h2>
            <p className="text-foreground-500 text-base max-w-xl mx-auto leading-relaxed">Alles, was du über unsere Lösungen, unsere Arbeitsweise und den Start einer Zusammenarbeit wissen musst.</p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border-2 overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: 0,
                  borderColor: openFaq === index ? 'oklch(var(--primary-500))' : 'oklch(var(--background-200))',
                  boxShadow: openFaq === index ? '0 6px 30px rgba(200,212,0,0.12)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer bg-white hover:bg-primary-50 transition-colors duration-200"
                >
                  <span className="text-lg font-black text-foreground-950 pr-6">{item.question}</span>
                  <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-primary-500' : 'bg-foreground-100'}`} style={{ borderRadius: 0 }}>
                    <i className={`${openFaq === index ? 'ri-subtract-line text-foreground-950' : 'ri-add-line text-foreground-500'} text-xl`} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: openFaq === index ? '600px' : '0' }}
                >
                  <div className="px-8 pb-7 bg-white border-t border-foreground-100">
                    <p className="text-foreground-600 leading-relaxed text-base pt-5">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 py-5 px-5 border border-foreground-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs md:text-sm text-foreground-500 text-center sm:text-left">Noch Fragen offen? Wir beantworten sie gerne persönlich.</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Frage%20zu%20Sonic%20L%C3%B6sungen`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-500 hover:text-primary-500 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-line text-sm"></i>Frage stellen
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .survey-hp-field {
          position: absolute;
          left: -9999px;
          top: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
