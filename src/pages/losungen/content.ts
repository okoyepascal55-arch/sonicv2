/**
 * Lösungen — content for the three solution tabs.
 * Single source for the page AND the dashboard (see src/lib/textStoreLosungen.ts):
 * every string field here appears as an editable entry under Dashboard → Text → Lösungen.
 * Figures follow the Sonic Agenturpräsentation 2026.
 */

export type ModuleLevel = 'kern' | 'baustein' | 'optional';
export interface SolutionModule { name: string; level: ModuleLevel }

export const SOLUTIONS = {
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
      { icon: 'ri-user-star-line', title: 'Promoter:innen am POS', desc: 'Geschulte Markenbotschafter:innen aus unserem Team und Talentpool. Trainiert auf dein Produkt, stark im Kundenkontakt.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-presentation-line', title: 'Verkäuferschulungen', desc: 'Deine Handelspartner sollen Fans deiner Marke werden. Wir begeistern sie mit Schulungen, die im Gedächtnis bleiben.', img: 'https://readdy.ai/api/search-image?query=professional%20sales%20training%20workshop%20group%20of%20retail%20staff%20learning%20product%20knowledge%20in%20modern%20conference%20room%20presenter%20at%20whiteboard%20engaged%20audience%20corporate%20training&width=800&height=500&seq=deliv-mkt-2&orientation=landscape' },
      { icon: 'ri-calendar-event-line', title: 'Launch-Events & Promotions', desc: 'Wir inszenieren deinen Auftritt: Roadshows, Instore-Events, Produkt-Demos. Dort, wo deine Zielgruppe einkauft. Konzept, Personal, Logistik: alles aus einer Hand.', img: 'https://readdy.ai/api/search-image?query=exciting%20product%20launch%20event%20in%20retail%20store%20with%20branded%20displays%20crowd%20of%20shoppers%20promotional%20staff%20demonstrating%20new%20product%20vibrant%20atmosphere%20professional%20event%20setup&width=800&height=500&seq=deliv-mkt-3&orientation=landscape' },
      { icon: 'ri-video-line', title: 'Videocontent & Live-Beratung', desc: 'Erklärvideos, Social Content und Live-Video-Calls. Damit dein Produkt auch digital erlebbar ist. Vom Unboxing bis zur persönlichen Kaufberatung.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/3. Bild Kopie.webp' },
      { icon: 'ri-store-2-line', title: 'POS-Design & Aufbau', desc: 'Displays, Shop-in-Shops, Collateral, Give-aways: Wir gestalten und bestücken deine Fläche. End-to-end. Inklusive Lagerung in unserem eigenen Warehouse.', img: 'https://readdy.ai/api/search-image?query=premium%20retail%20point%20of%20sale%20display%20design%20shop%20in%20shop%20setup%20elegant%20branded%20display%20stand%20with%20products%20modern%20retail%20interior%20professional%20merchandising%20clean%20design&width=800&height=500&seq=deliv-mkt-5&orientation=landscape' },
      { icon: 'ri-bar-chart-box-line', title: 'Datenbasierte Planung', desc: 'Mit den Einsatzdaten im SRT planen wir, in welchen Märkten und Outlets dein Launch startet.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-dashboard-line', title: 'Live-Reporting', desc: 'Vom ersten Einsatztag an siehst du in Echtzeit, was passiert: Kontakte, Verkäufe, Feedback, Zielerreichung, Wunsch-KPIs. In deinem persönlichen Dashboard.', img: 'https://readdy.ai/api/search-image?query=real%20time%20reporting%20dashboard%20on%20tablet%20and%20laptop%20showing%20live%20sales%20metrics%20KPI%20charts%20performance%20data%20modern%20business%20analytics%20interface%20clean%20design&width=800&height=500&seq=deliv-mkt-7&orientation=landscape' },
    ],
    steps: [
      { num: '01', title: 'Briefing & Markenverständnis', desc: 'Wir lernen dein Produkt kennen, als wäre es unseres: Positionierung, Zielgruppe, Wettbewerbsumfeld, Retail-Landschaft. Wir verstehen, was dein Produkt besonders macht und warum es gekauft werden soll.', img: 'https://readdy.ai/api/search-image?query=professional%20business%20briefing%20meeting%20team%20around%20table%20with%20brand%20strategy%20documents%20product%20samples%20whiteboard%20notes%20collaborative%20workshop%20modern%20office%20bright%20natural%20light&width=900&height=500&seq=step-mkt-1&orientation=landscape' },
      { num: '02', title: 'Standort- & Einsatzplanung', desc: 'Auf Basis unserer SRT-Daten planen wir gemeinsam: Welche Handelspartner, welche Zeitfenster, welche Personalstärke? Du bekommst einen klaren Rollout-Plan.', img: 'https://readdy.ai/api/search-image?query=strategic%20location%20planning%20map%20on%20large%20screen%20with%20data%20overlays%20retail%20store%20locations%20marked%20team%20analyzing%20deployment%20strategy%20modern%20office%20setting%20professional%20planning%20session&width=900&height=500&seq=step-mkt-2&orientation=landscape' },
      { num: '03', title: 'Team-Aufbau & Schulung', desc: 'Wir stellen dein Launch-Team zusammen – aus unserem Team und unserem Talentpool – und schulen es intensiv auf dein Produkt.', img: 'https://readdy.ai/api/search-image?query=brand%20ambassador%20team%20training%20session%20group%20of%20young%20professionals%20learning%20product%20knowledge%20enthusiastic%20trainer%20modern%20training%20room%20corporate%20environment%20engaged%20participants&width=900&height=500&seq=step-mkt-3&orientation=landscape' },
      { num: '04', title: 'Launch & Aktivierung', desc: 'POS-Aufbau, Promotions, Events, Videoproduktion: Dein Markteintritt, orchestriert über alle Retail-Touchpoints. Koordiniert. Durchgetaktet. Sichtbar.', img: 'https://readdy.ai/api/search-image?query=product%20launch%20activation%20at%20retail%20store%20multiple%20brand%20ambassadors%20at%20branded%20display%20stands%20customers%20engaging%20with%20products%20busy%20retail%20environment%20professional%20execution&width=900&height=500&seq=step-mkt-4&orientation=landscape' },
      { num: '05', title: 'Tracking & Optimierung', desc: 'Live-Dashboards ab Tag 1. Was funktioniert, wird skaliert. Was nicht performt, wird angepasst. Du bekommst laufende Reviews und Handlungsempfehlungen. Nicht erst am Projektende.', img: 'https://readdy.ai/api/search-image?query=performance%20review%20meeting%20team%20analyzing%20live%20dashboard%20data%20on%20large%20screen%20discussing%20optimization%20strategies%20modern%20office%20professional%20business%20review%20session%20charts%20metrics&width=900&height=500&seq=step-mkt-5&orientation=landscape' },
    ],
    stats: [
      { value: '200+', label: 'Promoter:innen im Einsatz' },
      { value: '>15', label: 'Kunden' },
      { value: 'DACH', label: 'Einsatzgebiet' },
      { value: 'Live', label: 'Reporting ab Tag 1' },
    ],
    ctaHeadline: 'Markteintritt geplant?',
    finalCta: 'In 30 Minuten klären wir, wie dein Launch aussehen kann.',
    proof: ['TV-Hersteller: sechs Wochen nach dem Start im Vollbetrieb, +75 % Umsatz im ersten Jahr.'] as string[],
    modules: [
      { name: 'POS Full Service', level: 'kern' },
      { name: 'Schulungen', level: 'kern' },
      { name: 'Events & Messen', level: 'kern' },
      { name: 'SRT', level: 'kern' },
      { name: 'Kreation & Content', level: 'baustein' },
      { name: 'Live Video', level: 'baustein' },
      { name: 'Warehouse & Logistik', level: 'optional' },
    ] as SolutionModule[],
    link: '/losungen?open=markteintritt',
  },
  absatz: {
    id: 'absatz',
    label: 'Absatz steigern',
    icon: 'ri-line-chart-line',
    title: 'Produkt im Regal. Sell-out über Plan',
    subtitle: 'Mit Promotion am POS profitabel Verkaufsziele erreichen.',
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
      { icon: 'ri-user-star-line', title: 'Promotion-Teams auf der Fläche', desc: 'Geschulte Promoter:innen, die dein Produkt kennen und verkaufen – mit Produktwissen, Motivation und Live-Einblick in die eigene Zielerreichung.', img: '/images/losungen/ambassador.webp' },
      { icon: 'ri-bar-chart-2-line', title: 'Daten in der Planung', desc: 'Im SRT sehen wir, welche Outlets, Tage und Zeiten sich lohnen – aus allen dokumentierten Einsätzen. Wir planen Einsätze dort, wo sie den größten Hebel haben.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-dashboard-line', title: 'Transparenz im Dashboard', desc: 'Du siehst jederzeit, welche Einsätze laufen, was verkauft wurde und wie das Team gegen dein Ziel performt – mit GPS-Check-in vor Ort. Live, ohne Excel, ohne Warten auf Reports.', img: 'https://readdy.ai/api/search-image?query=live%20GPS%20tracking%20dashboard%20showing%20field%20force%20locations%20on%20city%20map%20real%20time%20sales%20performance%20metrics%20modern%20business%20intelligence%20interface%20tablet%20and%20desktop%20view&width=800&height=500&seq=deliv-abs-3&orientation=landscape' },
      { icon: 'ri-search-eye-line', title: 'Planung mit Erfahrungswerten', desc: 'Aus vergleichbaren Projekten leiten wir ab, was realistisch ist – bevor der erste Einsatz startet.', img: 'https://readdy.ai/api/search-image?query=sales%20forecasting%20model%20on%20screen%20showing%20predicted%20revenue%20curves%20trend%20analysis%20charts%20professional%20business%20forecasting%20software%20modern%20office%20data%20science%20team&width=800&height=500&seq=deliv-abs-4&orientation=landscape' },
      { icon: 'ri-map-pin-2-line', title: 'Einsatzplanung', desc: 'Standorte, Zeitfenster, Personalstärke – geplant mit Blick auf Saisonalität, Standort-Historie und Team-Performance.', img: 'https://readdy.ai/api/search-image?query=field%20force%20deployment%20planning%20map%20with%20store%20locations%20staffing%20schedule%20calendar%20view%20professional%20operations%20planning%20software%20retail%20coverage%20optimization%20modern%20interface&width=800&height=500&seq=deliv-abs-5&orientation=landscape' },
      { icon: 'ri-file-chart-line', title: 'Performance-Tracking', desc: 'Jeder Einsatz wird im SRT dokumentiert: Kontakte, Verkäufe, Zielerreichung. Tagesaktuell. Als Live-Dashboard, auf das du jederzeit zugreifen kannst.', img: 'https://readdy.ai/api/search-image?query=daily%20performance%20tracking%20report%20on%20tablet%20showing%20sales%20contacts%20achieved%20targets%20green%20metrics%20live%20data%20retail%20field%20force%20performance%20dashboard%20clean%20modern%20design&width=800&height=500&seq=deliv-abs-6&orientation=landscape' },
      { icon: 'ri-store-2-line', title: 'Sell-in-Support', desc: 'Unsere Teams unterstützen auch im Sell-in: Schulungen für Handelspersonal, Regalpflege, Zweitplatzierungen, Warenpräsentation. Damit dein Produkt nicht nur im Regal steht, sondern auch verkauft wird.', img: 'https://readdy.ai/api/search-image?query=retail%20shelf%20merchandising%20professional%20arranging%20products%20on%20store%20shelf%20secondary%20placement%20display%20optimization%20trade%20partner%20training%20modern%20supermarket%20electronics%20store&width=800&height=500&seq=deliv-abs-7&orientation=landscape' },
      { icon: 'ri-refresh-line', title: 'Kontinuierliche Optimierung', desc: 'Laufende Reviews, Schwachstellen-Analyse, Team-Rotation, Standort-Shifts: Wir optimieren laufend, nicht erst am Quartalsende.', img: 'https://readdy.ai/api/search-image?query=continuous%20improvement%20review%20meeting%20team%20analyzing%20performance%20data%20whiteboard%20with%20optimization%20strategies%20professional%20business%20review%20modern%20office%20setting&width=900&height=500&seq=deliv-abs-8&orientation=landscape' },
    ],
    steps: [
      { num: '01', title: 'Analyse & Zielsetzung', desc: 'Wir analysieren deine aktuelle Retail-Situation: Wo stehst du? Wo willst du hin? Gemeinsam definieren wir messbare Ziele wie Sell-out-Stückzahlen, Umsatz, ROI.', img: 'https://readdy.ai/api/search-image?query=retail%20situation%20analysis%20workshop%20team%20reviewing%20current%20market%20position%20data%20charts%20on%20screen%20defining%20measurable%20sales%20goals%20professional%20strategy%20session%20modern%20office&width=900&height=500&seq=step-abs-1&orientation=landscape' },
      { num: '02', title: 'Planung', desc: 'Welche Standorte versprechen den größten Hebel? Wie viele Einsätze und wie viel Personal brauchst du? Du bekommst einen klaren Plan mit realistischen Zielen.', img: 'https://readdy.ai/api/search-image?query=sales%20forecast%20planning%20session%20with%20data%20model%20on%20screen%20showing%20location%20potential%20ROI%20projections%20staffing%20requirements%20professional%20planning%20meeting%20modern%20office%20environment&width=900&height=500&seq=step-abs-2&orientation=landscape' },
      { num: '03', title: 'Team-Aufstellung & Training', desc: 'Wir stellen dein Team zusammen, trainieren es auf dein Produkt und briefen es auf deine Ziele – inklusive Onboarding und laufendem Coaching.', img: 'https://readdy.ai/api/search-image?query=field%20force%20team%20assembly%20and%20product%20training%20session%20group%20of%20motivated%20sales%20promoters%20learning%20brand%20knowledge%20professional%20trainer%20modern%20training%20facility%20corporate%20environment&width=900&height=500&seq=step-abs-3&orientation=landscape' },
      { num: '04', title: 'Rollout & Aktivierung', desc: 'Deine Field Force geht auf die Fläche. Koordiniert über das SRT, getrackt in Echtzeit. Sell-out, Sell-in, Schulungen, Regalpflege – je nach Projektscope.', img: 'https://readdy.ai/api/search-image?query=field%20force%20rollout%20multiple%20brand%20promoters%20at%20different%20retail%20locations%20coordinated%20activation%20sell-out%20campaign%20busy%20retail%20stores%20professional%20execution%20nationwide%20coverage&width=900&height=500&seq=step-abs-4&orientation=landscape' },
      { num: '05', title: 'Live-Tracking & Skalierung', desc: 'Ab Tag 1 läuft das Reporting. Was funktioniert, wird skaliert. Optimierungspotenziale werden erkannt und können genutzt werden. Reviews sorgen für kontinuierliche Verbesserung.', img: 'https://readdy.ai/api/search-image?query=live%20performance%20tracking%20and%20scaling%20review%20meeting%20team%20analyzing%20real%20time%20dashboard%20data%20identifying%20optimization%20opportunities%20professional%20business%20review%20modern%20office%20data%20driven%20decisions&width=900&height=500&seq=step-abs-5&orientation=landscape' },
    ],
    stats: [
      { value: '>2 Mrd. €', label: 'Umsatz für unsere Kunden' },
      { value: '>1,3 Mio.', label: 'Einsätze' },
      { value: '>1.000', label: 'betreute Stores' },
      { value: 'Live', label: 'Transparenz im SRT' },
    ],
    ctaHeadline: 'Absatz steigern?',
    finalCta: 'In 30 Minuten klären wir, wo dein Absatz wachsen kann.',
    proof: ['Wearables-Hersteller: Umsatz pro Einsatztag Jahr für Jahr gesteigert – +20 %, +45 %, +23 %, +21 % seit 2021.', 'Hausgeräte-Hersteller: Umsatz pro Einsatztag seit 2019 um rund 150 % gesteigert.'] as string[],
    modules: [
      { name: 'POS Full Service', level: 'kern' },
      { name: 'SRT', level: 'kern' },
      { name: 'Sell-in & Merchandising', level: 'kern' },
      { name: 'Schulungen', level: 'baustein' },
      { name: 'Live Video', level: 'optional' },
      { name: 'Events & Messen', level: 'optional' },
      { name: 'Warehouse & Logistik', level: 'optional' },
    ] as SolutionModule[],
    link: '/losungen?open=absatz',
  },
  omnichannel: {
    id: 'omnichannel',
    label: 'Omnichannel',
    icon: 'ri-global-line',
    title: 'Human Power in allen Kanälen',
    subtitle: 'Beratung dort, wo gekauft wird – im Laden, am Regal und online.',
    description:
      'Omnichannel heißt bei uns: Deine Kundinnen und Kunden bekommen dieselbe persönliche Beratung – egal ob im Laden, im Online-Shop oder per QR-Code auf der Verpackung. Die Beratung kommt live aus unseren Studios in Krefeld.',
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
      { icon: 'ri-user-star-line', title: 'Geschulte Video-Berater:innen', desc: 'Aus unserem Team, trainiert auf dein Produkt und dein Branding.', img: '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung/VIDEO01 Kopie.webp' },
      { icon: 'ri-customer-service-2-line', title: 'Multitalente', desc: 'Unsere Video-Berater:innen können nicht nur beraten und verkaufen, sie können auch Kundensupport. Eine Video-Hotline, viele Funktionen: Pre-Sales, After-Sales, Service, Troubleshooting.', img: 'https://readdy.ai/api/search-image?query=versatile%20customer%20service%20team%20handling%20multiple%20video%20calls%20pre-sales%20after-sales%20support%20troubleshooting%20modern%20call%20center%20with%20video%20capabilities%20professional%20branded%20environment&width=800&height=500&seq=deliv-omni-5&orientation=landscape' },
      { icon: 'ri-settings-3-line', title: 'Technische Integration', desc: 'QR-Codes, Shop-Widgets, POS-Displays, Einbettung in deine bestehende Infrastruktur: Wir liefern die Anbindung. Keine IT-Projekte auf deiner Seite.', img: 'https://readdy.ai/api/search-image?query=seamless%20technical%20integration%20diagram%20showing%20QR%20code%20shop%20widget%20POS%20display%20connections%20to%20existing%20infrastructure%20clean%20technology%20architecture%20visualization%20modern%20digital%20ecosystem&width=800&height=500&seq=deliv-omni-6&orientation=landscape' },
      { icon: 'ri-bar-chart-line', title: 'Reporting', desc: 'Jeder Call wird getrackt: Dauer, Ergebnis, Kundenzufriedenheit, Kaufabschluss. In deinem persönlichen Dashboard im SRT.', img: '/images/losungen/dashboard.webp' },
      { icon: 'ri-scales-line', title: 'Skalierbarkeit', desc: 'Wir passen Team, Schichtpläne und Technik an deinen Bedarf an – saisonal, für Kampagnen oder dauerhaft.', img: 'https://readdy.ai/api/search-image?query=scalable%20video%20advisory%20team%20growing%20from%20small%20to%20large%20operation%20multiple%20advisors%20in%20modern%20studio%20environment%20flexible%20staffing%20seasonal%20scaling%20professional%20setup&width=800&height=500&seq=deliv-omni-8&orientation=landscape' },
    ],
    steps: [
      { num: '01', title: 'Pilotkonzept & Produktschulung', desc: 'Wir definieren gemeinsam den Scope: Welche Produkte? Welche Zielgruppen? Welches Volumen? Statische Videos, Live-Video oder beides? Dann schulen wir unser Team auf dein Produkt, dein Branding und deine Tonalität.', img: 'https://readdy.ai/api/search-image?query=pilot%20concept%20workshop%20team%20defining%20video%20advisory%20scope%20product%20selection%20target%20audience%20volume%20planning%20modern%20meeting%20room%20collaborative%20strategy%20session%20professional%20environment&width=900&height=500&seq=step-omni-1&orientation=landscape' },
      { num: '02', title: 'Technische Integration', desc: 'QR-Codes für Verpackungen, Widget für den Online-Shop, Anbindung an POS-Displays: Wir richten die Technik ein. Schnelle Integration, kein Overhead auf deiner Seite.', img: 'https://readdy.ai/api/search-image?query=technical%20integration%20setup%20QR%20code%20generation%20shop%20widget%20installation%20POS%20display%20configuration%20fast%20seamless%20technology%20deployment%20professional%20IT%20setup%20modern%20digital%20infrastructure&width=900&height=500&seq=step-omni-2&orientation=landscape' },
      { num: '03', title: 'Go-Live & Pilotphase', desc: 'Dein Live-Video-Kanal geht live. Wir starten mit einem definierten Pilotumfang, sammeln Daten, messen Performance und optimieren in den ersten Wochen.', img: 'https://readdy.ai/api/search-image?query=live%20video%20advisory%20channel%20launch%20first%20customer%20calls%20going%20live%20team%20monitoring%20performance%20data%20pilot%20phase%20launch%20day%20excitement%20professional%20video%20studio%20environment&width=900&height=500&seq=step-omni-3&orientation=landscape' },
      { num: '04', title: 'Tracking, Optimierung & Skalierung', desc: 'Live-Dashboards ab Tag 1. Was funktioniert, wird skaliert. Alles andere wird optimiert.', img: 'https://readdy.ai/api/search-image?query=video%20advisory%20performance%20optimization%20team%20analyzing%20call%20metrics%20scaling%20successful%20channels%20improving%20underperforming%20ones%20live%20dashboard%20review%20modern%20office%20data%20driven%20decisions&width=900&height=500&seq=step-omni-4&orientation=landscape' },
    ],
    stats: [
      { value: '>47.000', label: 'Live-Beratungen' },
      { value: 'Ø 5,5 Min.', label: 'Gesprächsdauer' },
      { value: '>4.200 Std.', label: 'Beratungszeit' },
      { value: 'Komplett', label: 'Managed Service' },
    ],
    ctaHeadline: 'Omnichannel aufbauen?',
    finalCta: 'In 30 Minuten klären wir, wie Beratung in allen Kanälen funktioniert.',
    proof: [] as string[],
    modules: [
      { name: 'Live Video', level: 'kern' },
      { name: 'Shop, Display & QR-Code', level: 'kern' },
      { name: 'SRT', level: 'kern' },
      { name: 'Kreation & Content', level: 'baustein' },
      { name: 'POS Full Service', level: 'baustein' },
      { name: 'Schulungen', level: 'optional' },
    ] as SolutionModule[],
    link: '/leistungen/live-video',
  },
};

export type SolutionKey = keyof typeof SOLUTIONS;
export type Solution = (typeof SOLUTIONS)[SolutionKey];
export const KEYS: SolutionKey[] = ['markteintritt', 'absatz', 'omnichannel'];

/* ── Page-level texts (hero, intro, "Was immer gilt", FAQ) ── */
export const LOSUNGEN_PAGE_TEXT = {
  heroBadge: 'Lösungen',
  heroH1Line1: 'Drei Wege',
  heroH1Line2: 'durch die',
  heroH1Line3: 'Retail-Schallmauer.',
  heroSub: 'Die Retail-Schallmauer: der Punkt, an dem dein Produkt im Regal steht, sich aber nicht von selbst verkauft.',
  heroIntro: 'Markteintritt, Absatz steigern oder Omnichannel – wir haben die Menschen, die Daten und die Erfahrung aus dem Handel seit 2007.',
  introBadge: 'Lösungen für den DACH-Markt',
  introText: 'Lösungen beschreiben dein Ziel – die Leistungen sind die Bausteine dafür.',
  cardChip: 'Sonic Group · Drei Wege, ein Partner',
  modulesHeading: 'Module dieser Lösung',
  modulesPill: 'Modular kombinierbar',
  modulesLegendKern: 'Kern',
  modulesLegendBaustein: 'Baustein',
  modulesLegendOptional: 'Optional',
  alwaysBadge: 'Was immer gilt',
  alwaysHeading: 'Ganz gleich, wo du stehst',
  alwaysSub: 'Du bekommst immer',
  always1Title: 'Geschulte Promoter:innen',
  always1Desc: 'Aus unserem Talentpool, auf dein Produkt trainiert. Geschult, motiviert, zuverlässig.',
  always2Title: 'Planung mit Erfahrung',
  always2Desc: 'Das SRT bündelt die Daten aller bisherigen Einsätze – für Standortwahl und Einsatzplanung.',
  always3Title: 'Live-Reporting via SRT',
  always3Desc: 'Dein Dashboard mit allen vereinbarten KPIs – oder als Export für Excel, PowerPoint und SQL.',
};

export const LOSUNGEN_FAQ: { question: string; answer: string }[] = [
  {
    question: 'Für welche Branchen arbeitet Sonic?',
    answer: 'Wir sind spezialisiert auf erklärungsbedürftige Produkte: Consumer Electronics, Haushalts- und Küchengeräte, Sport & Outdoor, Kosmetik, Pharma, Food & Beverages und B2B. Unsere Teams sind in allen großen Handelsketten im Einsatz – von großen Elektronikfachmärkten über Parfümerien und Drogerien bis zum Fachhandel und zu Sportfachgeschäften. Wir wissen, wie man komplexe Produkte am POS erklärt und Kaufentscheidungen erleichtert – für globale Konzerne genauso wie für neue Marken.',
  },
  {
    question: 'Was unterscheidet Sonic von anderen Vertriebsagenturen?',
    answer: 'Vier Dinge: Erstens rekrutieren, schulen und steuern wir unsere Teams selbst – je nach Projekt in kurzfristiger Beschäftigung, befristeter Teil- oder Vollzeit oder per Arbeitnehmerüberlassung. Du hast einen Ansprechpartner statt vieler Dienstleister. Zweitens arbeiten wir mit eigener Software: Das Sonic Reporting Tool (SRT) steuert seit 2008 Einsätze, Kontrolle, Abrechnung und Reporting. Drittens bekommst du Live-Transparenz: Du siehst, was auf der Fläche passiert – Einsätze, Verkäufe, Zielerreichung. Viertens kennt unser Team auch die Kundenseite: Wir wissen, wie Budgets, Freigaben und Vertriebsziele in Marken funktionieren.',
  },
  {
    question: 'Was ist das Sonic Reporting Tool (SRT)?',
    answer: 'Das SRT ist unsere eigene Software – seit 2008 im Einsatz und in über 21 Versionen weiterentwickelt. Es verbindet Kunden-, Sonic-, Mitarbeiter- und Handelsdaten: von der Aufgabe über Kontrolle und Abrechnung bis zum Reporting. Unser Team nutzt es täglich per App – mit Aufgaben, GPS-Check-in und eigener Zielerreichung. Du bekommst ein Dashboard mit den KPIs, die wir gemeinsam festlegen, oder die Daten als Excel-, PowerPoint- oder SQL-Report.',
  },
  {
    question: 'Wie groß ist der Talentpool?',
    answer: 'Unser Talentpool umfasst über 1.800 aktive Menschen deutschlandweit. Aus diesem Pool – und bei Bedarf über gezieltes Recruiting – stellen wir das Team für dein Projekt zusammen. Allein im ersten Halbjahr 2026 haben wir 40 neue Kolleginnen und Kollegen eingestellt. Im Schnitt sind unsere Promoter:innen 2,9 Jahre bei uns, viele kennen Handel, Flächen und Kaufverhalten in ihrer Region genau.',
  },
  {
    question: 'Wie funktioniert die Live-Video-Beratung?',
    answer: 'Kunden klicken einen Button im Shop, aktivieren den Videochat am POS-Display oder scannen einen QR-Code auf einem Aufsteller oder der Produktverpackung. Dann werden sie sofort mit einem geschulten Video-Berater verbunden. Der Berater kennt dein Produkt, trägt dein Branding und berät in Echtzeit – genau wie ein Verkäufer im Laden, nur digital. Jeder Call wird getrackt: Dauer, Ergebnis, Kundenzufriedenheit, Kaufabschluss. Du brauchst keine eigene Infrastruktur, keine eigene Technik, keine eigenen Berater. Wir liefern alles: die Technologie, die Integration in deinen Shop oder dein POS-System, die geschulten Berater und das Reporting.',
  },
  {
    question: 'Was kostet eine Zusammenarbeit mit Sonic?',
    answer: 'Unsere Projekte werden individuell kalkuliert, abhängig von Umfang, Laufzeit, Anzahl der Einsätze und gewünschten Leistungen. Es gibt kein Einheitspaket – weil jede Marke, jedes Produkt und jeder Markt anders ist. Was wir dir im Erstgespräch immer liefern: eine transparente Kostenstruktur und eine erste Einschätzung, was du erwarten kannst. Viele unserer Kunden starten mit einem Pilotprojekt, um die Zusammenarbeit kennenzulernen und erste Daten zu sammeln. Danach skalieren wir gemeinsam.',
  },
  {
    question: 'Wie messe ich den Erfolg?',
    answer: 'Über das SRT hast du Zugriff auf Echtzeit-Dashboards mit allen relevanten KPIs: Verkäufe, Kontakte, Zielerreichung, Standort-Performance, Mitarbeiter-Performance. Wir definieren zu Projektbeginn gemeinsam, welche KPIs für dich entscheidend sind – und messen genau diese. Keine Bauchgefühl-Reports, keine nachträglichen Interpretationen. Tagesaktuell. Und wir starten jedes Projekt mit einem gemeinsam definierten Ziel, gegen das wir messen. Wenn etwas nicht performt, sehen wir es sofort und können gegensteuern – nicht erst am Quartalsende.',
  },
  {
    question: 'Wie schnell kann ein Projekt starten?',
    answer: 'Das hängt vom Umfang ab. Wenn wir auf ein bestehendes Team zurückgreifen können, geht es schnell. Mit Recruiting, Training und POS-Aufbau planen wir in der Regel 4 bis 8 Wochen. Ein Beispiel: Bei einem aktuellen TV-Projekt waren wir sechs Wochen nach dem Start im Vollbetrieb. Im Erstgespräch bekommst du eine realistische Einschätzung für dein Projekt.',
  },
];
