/* ─────────────────────────────────────────────
   Fallbeispiele — fixed story texts (moved here from page.tsx on 19.11.2026, verbatim)
   so the page and the dashboard share one source. The page shows the dashboard value
   when one is saved (sections case_<brand>_details), otherwise these defaults.
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from '@/lib/textStore';

export const CASE_CONTENT = {
  "garmin": {
    "since": "2021",
    "trendTitle": "Umsatz pro Einsatztag",
    "pills": [
      {
        "label": "Start",
        "value": "2021"
      },
      {
        "label": "Märkte",
        "value": "DE + AT"
      },
      {
        "label": "Bereiche",
        "value": "7"
      }
    ],
    "modules": [
      {
        "title": "Promotions",
        "desc": "Beispiel: Aktivierung am POS per Rabatt-Aktion. Full-Service-Umsetzung durch unsere Field Force.",
        "tags": [
          "POS",
          "Field Force",
          "DACH"
        ]
      },
      {
        "title": "Aktionen",
        "desc": "Beispiel: Smoothie-Verkostungsaktion am POS als niederschwelliger Gesprächseinstieg.",
        "tags": [
          "Live-Aktion",
          "Verkostung",
          "POS"
        ]
      },
      {
        "title": "POS-Möbel",
        "desc": "Eigens entwickeltes, modulares Präsentationsmöbel mit digitalen Elementen.",
        "tags": [
          "Design",
          "Modular",
          "Digital"
        ]
      },
      {
        "title": "Training",
        "desc": "Wir schulen die Sales-Teams, bei uns in Krefeld und mobil in ganz Deutschland.",
        "tags": [
          "Schulung",
          "Krefeld",
          "Zertifizierung"
        ]
      },
      {
        "title": "Lager & Logistik",
        "desc": "POS-Ausstattung wird bei Sonic produziert, gelagert und versendet.",
        "tags": [
          "Lager",
          "Logistik",
          "Versand"
        ]
      }
    ]
  },
  "seb": {
    "campaign": "Multi-Brand Field Force & Live-Video",
    "since": "2019",
    "trendTitle": "Umsatz pro Einsatztag",
    "pills": [
      {
        "label": "Start",
        "value": "2019"
      },
      {
        "label": "Marken",
        "value": "4"
      },
      {
        "label": "Module",
        "value": "6"
      }
    ],
    "modules": [
      {
        "title": "Live-Video-Beratung",
        "desc": "Aus den Sonic-Studios. Digital am POS und im Online-Shop. Für Rowenta, Tefal, Krups und WMF.",
        "tags": [
          "Live-Video",
          "Studio",
          "Digital"
        ]
      },
      {
        "title": "Aktionen",
        "desc": "Beispiel: verkaufsstarkes Live-Cooking am POS, betreut von unseren Foodies in der Field Force.",
        "tags": [
          "Live-Cooking",
          "POS",
          "Field Force"
        ]
      },
      {
        "title": "Roadshow",
        "desc": "Die rollende mehrmarkenfähige Trainings-Roadshow mit Foodtruck-Funktion: Airstream-Trailer als Showmobil.",
        "tags": [
          "Roadshow",
          "Airstream",
          "Mobile"
        ]
      },
      {
        "title": "Verkauf, POS-Pflege, Warenpräsentation",
        "desc": null,
        "tags": [
          "POS-Pflege",
          "Präsentation",
          "Verkauf"
        ]
      },
      {
        "title": "Sales-Training",
        "desc": "Wir schulen Verkäufer der Handelsketten und unsere Field Force an unserem Campus in Krefeld sowie per Video-Webinar.",
        "tags": [
          "Training",
          "Krefeld",
          "Zertifizierung"
        ]
      },
      {
        "title": "Reporting",
        "desc": "Tägliche Einsatzkosten und generierte Umsätze sind tag- und standortgenau auswertbar.",
        "tags": [
          "SRT",
          "Analytics",
          "KPI"
        ]
      }
    ]
  },
  "avoury": {
    "campaign": "Field Force, Recruiting & Datenoptimierung",
    "since": "2021",
    "trendTitle": "Abverkauf pro Einsatztag",
    "pills": [
      {
        "label": "Start",
        "value": "2021"
      },
      {
        "label": "Marke",
        "value": "Melitta"
      },
      {
        "label": "Module",
        "value": "5"
      }
    ],
    "modules": [
      {
        "title": "Recruiting",
        "desc": "Zum Start: Zusammenstellung Field Force Team aus eigenem Pool plus aus Recruiting. Gezieltes Matching auf Profil, Standort und Verkaufsstärke.",
        "tags": [
          "Recruiting",
          "Talentpool",
          "Matching"
        ]
      },
      {
        "title": "Schulungen",
        "desc": null,
        "tags": [
          "Campus Krefeld",
          "Schulung",
          "Zertifizierung"
        ]
      },
      {
        "title": "Sales Promotions",
        "desc": "Nicht Verkauf per Zufall — Verkauf per System. Gerätedemonstration, gezieltes Cross-Selling auf Kapseln und Zubehör, nach unserer Methode.",
        "tags": [
          "POS",
          "Cross-Selling",
          "Methode"
        ]
      },
      {
        "title": "Reporting",
        "desc": "Was gemessen wird, wird besser. Die SRT zeigt tages- und standortgenau: wer verkauft, wo, wie viel — und warum. Das ist der Motor hinter der Kurve.",
        "tags": [
          "SRT",
          "Daten",
          "Analyse"
        ]
      },
      {
        "title": "Laufende Optimierungen",
        "desc": "Personalauswahl, Outlet-Auswahl, Einsatztage — alles datenbasiert optimiert. Das Ergebnis gibt jedes Jahr recht.",
        "tags": [
          "Optimierung",
          "Datenbasiert",
          "Matching"
        ]
      }
    ]
  },
  "tvsound": {
    "campaign": "Field Force, POS-Möbel, Training, Digital & Messen",
    "since": "2009",
    "trendTitle": "Drei Mandate seit 2009",
    "pills": [
      {
        "label": "Seit",
        "value": "2009"
      },
      {
        "label": "Mandate",
        "value": "3"
      },
      {
        "label": "Markt",
        "value": "DE"
      }
    ],
    "modules": [
      {
        "title": "Gründungskunde · 2009–2019",
        "desc": "10 Jahre Partnerschaft: von der Markteinführung zum Peak. 1,72 Mrd. € kumulierter Umsatz. Im Spitzenjahr 2018: 45.380 Einsatztage. Im Projektverlauf übernimmt Sonic sukzessive weitere Produktkategorien.",
        "tags": [
          "Promotion",
          "POS-Möbel",
          "Trainings",
          "Roadshows",
          "Lager"
        ]
      },
      {
        "title": "Europäischer Hersteller · 2020–2024",
        "desc": "Deutschland war nicht Plan A. Vier Jahre später war es der erfolgreichste europäische Markt des Kunden. +61 % Umsatzwachstum 2021→2024. +40 % Absatz 2020→2024. Sonic lieferte Field Force, 3D-Raumplaner-Konzept und laufendes Kampagnenmanagement.",
        "tags": [
          "Field Force",
          "3D-Raumplaner",
          "Digital",
          "Kampagnen",
          "Training"
        ]
      },
      {
        "title": "Laufendes Mandat · Ab 2025",
        "desc": "Von null auf Vollbetrieb in sechs Wochen. Im ersten Projektjahr: +75 % Umsatz, +66 % Absatz, 10 % ISS. Mandat läuft.",
        "tags": [
          "Launch",
          "Rapid Scale",
          "POS",
          "Messen",
          "Digital"
        ]
      }
    ],
    "mandates": [
      {
        "label": "Gründungskunde — 10 Jahre, ein Markt, ein Partner.",
        "headlineValue": "1,72 Mrd. €",
        "headlineLabel": "Kumulierter Umsatz",
        "stats": [
          {
            "value": "45.380",
            "label": "Einsatztage im Spitzenjahr 2018"
          },
          {
            "value": "10 Jahre",
            "label": "Laufzeit der Partnerschaft"
          },
          {
            "value": "+Multi",
            "label": "Produktkategorien im Projektverlauf übernommen"
          }
        ],
        "services": [
          "Promotion",
          "POS-Möbel",
          "Trainings",
          "Roadshows",
          "Lager"
        ]
      },
      {
        "label": "Deutschland war nicht Plan A — bis wir kamen.",
        "headlineValue": "239,8 Mio. €",
        "headlineLabel": "Kumulierter Umsatz",
        "stats": [
          {
            "value": "+61 %",
            "label": "Umsatzwachstum 2021 → 2024"
          },
          {
            "value": "+40 %",
            "label": "Absatzwachstum 2020 → 2024"
          },
          {
            "value": "# 1",
            "label": "Erfolgreichster europ. Markt des Kunden"
          }
        ],
        "services": [
          "Field Force",
          "3D-Raumplaner",
          "Digital",
          "Kampagnen",
          "Training"
        ]
      },
      {
        "label": "Von null auf Vollbetrieb in sechs Wochen.",
        "headlineValue": "+75 %",
        "headlineLabel": "Umsatzwachstum · Jahr 1",
        "stats": [
          {
            "value": "+66 %",
            "label": "Absatzwachstum Jahr 1"
          },
          {
            "value": "10 %",
            "label": "ISS binnen eines Jahres"
          },
          {
            "value": "6 Wochen",
            "label": "Von Briefing bis Vollbetrieb"
          }
        ],
        "services": [
          "Launch",
          "Rapid Scale",
          "POS",
          "Messen",
          "Digital"
        ]
      }
    ]
  }
} as const;

export type CaseKey = keyof typeof CASE_CONTENT;

const e = (id: string, label: string, type: TextEntry['type'], value: string): TextEntry => ({ id, label, description: '', type, value, ...(value.length > 80 ? { multiline: true } : {}) });
const NAMES: Record<CaseKey, string> = {"garmin": "Garmin", "seb": "Groupe SEB", "avoury": "Avoury", "tvsound": "TV & Sound"};

/** One dashboard area per case: „Garmin — Story: Eckdaten, Module & Verlauf“. */
export const CASE_DETAIL_SECTIONS: TextSection[] = (Object.keys(CASE_CONTENT) as CaseKey[]).map((k) => {
  const cc = CASE_CONTENT[k] as unknown as CaseData;
  const entries: TextEntry[] = [];
  if (cc.campaign !== undefined) entries.push(e('campaign', 'Kampagne / Leistungen (Zeile in der Story)', 'label', cc.campaign));
  entries.push(e('since', 'Jahr „Seit …“', 'label', cc.since));
  cc.pills.forEach((p, i) => { entries.push(e(`pill-${i + 1}-label`, `Eckdaten ${i + 1} — Beschriftung`, 'stat-label', p.label)); entries.push(e(`pill-${i + 1}-value`, `Eckdaten ${i + 1} — Wert`, 'stat', p.value)); });
  entries.push(e('trend-title', 'Verlaufskurve — Titel', 'label', cc.trendTitle));
  cc.modules.forEach((m, i) => {
    entries.push(e(`module-${i + 1}-title`, `Modul ${i + 1} — Titel`, 'heading', m.title));
    if (m.desc !== null) entries.push(e(`module-${i + 1}-desc`, `Modul ${i + 1} — Text`, 'paragraph', m.desc));
    entries.push(e(`module-${i + 1}-tags`, `Modul ${i + 1} — Schlagworte (mit | trennen)`, 'label', m.tags.join(' | ')));
  });
  (cc.mandates ?? []).forEach((m, i) => {
    const n = `Mandat ${i + 1}`;
    entries.push(e(`mandate-${i + 1}-label`, `${n} — Zeile`, 'heading', m.label));
    entries.push(e(`mandate-${i + 1}-value`, `${n} — große Zahl`, 'stat', m.headlineValue));
    entries.push(e(`mandate-${i + 1}-value-label`, `${n} — Beschriftung der großen Zahl`, 'stat-label', m.headlineLabel));
    m.stats.forEach((s, j) => { entries.push(e(`mandate-${i + 1}-stat-${j + 1}-value`, `${n} — Kennzahl ${j + 1} Wert`, 'stat', s.value)); entries.push(e(`mandate-${i + 1}-stat-${j + 1}-label`, `${n} — Kennzahl ${j + 1} Beschriftung`, 'stat-label', s.label)); });
    entries.push(e(`mandate-${i + 1}-services`, `${n} — Leistungen (mit | trennen)`, 'label', m.services.join(' | ')));
  });
  return { key: `case_${k}_details`, label: `${NAMES[k]} — Story: Eckdaten, Module & Verlauf`, pageGroupId: 'case_studies', pagePath: '/fallbeispiele',
    description: 'Feste Texte in der aufgeklappten Fallstudie: Eckdaten-Leiste, Titel der Verlaufskurve, Module (Titel, Text, Schlagworte)' + (k === 'tvsound' ? ' und die drei Mandate.' : '.') + ' Bilder der Module: Bilder → Fallbeispiele → „… Modul 1–n“.',
    entries };
});

export interface CaseData {
  campaign?: string; since: string; trendTitle: string;
  pills: { label: string; value: string }[];
  modules: { title: string; desc: string | null; tags: string[] }[];
  mandates?: { label: string; headlineValue: string; headlineLabel: string; stats: { value: string; label: string }[]; services: string[] }[];
}

const list = (v: string | undefined, fb: readonly string[]) => (v === undefined ? [...fb] : v.split('|').map((s) => s.trim()).filter(Boolean));

/** Merge one case's defaults with its dashboard texts (t = section record). */
export function mergeCase(k: CaseKey, t: Record<string, string>): CaseData {
  const d = CASE_CONTENT[k] as unknown as CaseData;
  const v = (id: string, fb: string) => (t[id] !== undefined && t[id] !== '' ? t[id] : fb);
  return {
    campaign: d.campaign === undefined ? undefined : v('campaign', d.campaign),
    since: v('since', d.since),
    trendTitle: v('trend-title', d.trendTitle),
    pills: d.pills.map((p, i) => ({ label: v(`pill-${i + 1}-label`, p.label), value: v(`pill-${i + 1}-value`, p.value) })),
    modules: d.modules.map((m, i) => ({ title: v(`module-${i + 1}-title`, m.title), desc: m.desc === null ? null : v(`module-${i + 1}-desc`, m.desc), tags: list(t[`module-${i + 1}-tags`], m.tags) })),
    mandates: d.mandates?.map((m, i) => ({
      label: v(`mandate-${i + 1}-label`, m.label), headlineValue: v(`mandate-${i + 1}-value`, m.headlineValue), headlineLabel: v(`mandate-${i + 1}-value-label`, m.headlineLabel),
      stats: m.stats.map((s, j) => ({ value: v(`mandate-${i + 1}-stat-${j + 1}-value`, s.value), label: v(`mandate-${i + 1}-stat-${j + 1}-label`, s.label) })),
      services: list(t[`mandate-${i + 1}-services`], m.services),
    })),
  };
}
