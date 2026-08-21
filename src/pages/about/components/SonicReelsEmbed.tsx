import { useCallback, useState } from 'react';
import EraNav from '@/pages/sonic-reels/components/EraNav';
import PhotoAlbum from '@/pages/sonic-reels/components/PhotoAlbum';
import { EraData } from '@/pages/sonic-reels/page';
import { useMediaStore } from '@/lib/mediaStore';

const eras: EraData[] = [
  {
    id: 'era-2007-2015',
    label: '2007–2015',
    years: '2007–2015',
    tagline: 'The Genesis',
    yearTag: ['0', '7'],
    description:
      "What started as a two-person operation in a Cologne backroom became the blueprint for modern retail activation in Germany. Sonic's founding philosophy was radical for 2007: don't just place staff at the shelf — place the right people, trained as brand experts, measured on results. The first three years were a proof of concept. By 2012, the concept had proved itself across three countries.",
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg',
    milestones: ['Founded Cologne, 2007', 'Garmin — first major contract', 'Team grows to 50', 'MediaMarkt & Saturn network', 'First Austria deployment, 2013'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'First retail activation — MediaMarkt Cologne, 2007', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/2.jpg', caption: 'Strategy sessions — HQ Cologne, 2008' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/3.jpg', caption: 'Garmin pilot activation, 2009' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/4.jpg', caption: 'CEBIT Hannover — trade fair activation, 2011', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/5.jpg', caption: 'Team summer celebration — 2013' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/6.jpg', caption: 'Dyson pilot — 2014' },
    ],
  },
  {
    id: 'era-2015-2019',
    label: '2015–2019',
    years: '2015–2019',
    tagline: 'The Momentum',
    yearTag: ['1', '5'],
    description:
      "The mid-decade years brought Sonic's biggest brand wins — and the start of something structural. Samsung's DACH account transformed the business overnight: suddenly Sonic was coordinating 200+ specialists across three countries simultaneously. It forced us to build systems. Standardised training. Tiered certification. Real-time communication protocols. By 2019, those systems had become the agency's competitive moat.",
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
    milestones: ['Samsung DACH partnership, 2015', 'Sonic Training Academy founded', 'Philips & Dyson contracts signed', '500+ active specialists', 'Switzerland coverage completed, 2018'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: 'Samsung Galaxy S7 launch activation, 2016', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Sonic Training Academy launch, 2017' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Philips DACH rollout — Vienna, 2017' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/11.jpg', caption: 'IFA Berlin — largest activation to date, 2018', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg', caption: 'Dyson luxury retail — Zurich, 2018' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/6.jpg', caption: '500 ambassadors milestone dinner, 2019' },
    ],
  },
  {
    id: 'era-2019-2022',
    label: '2019–2022',
    years: '2019–2022',
    tagline: 'The Resilience',
    yearTag: ['1', '9'],
    description:
      '2020 was meant to be our biggest year. Three new brand contracts signed. 300 more specialists in onboarding. Two trade fairs locked in. Then everything closed. The team spent 72 hours building a hybrid activation playbook from scratch. We deployed safe-retail protocols before most agencies had heard the term. When stores reopened, Sonic was already there — and the clients who stayed loyal have stayed ever since.',
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/02/6-1-1024x570.jpg',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/02/5-1-1024x576.jpg',
    milestones: ['Hybrid activation playbook built', 'PPE-safe retail protocols launched', 'PS5 launch — 200 locations, Dec 2020', 'Remote training system built', 'Zero clients lost in crisis year'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/10-1.jpg', caption: 'Adapted retail formats during lockdown, 2020', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2a.jpg', caption: 'Launch of virtual product demos, 2020' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2b.jpg', caption: 'Safe-activation protocol, 2021' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/2-1-1024x706.jpg', caption: 'PS5 launch — Germany wide, Christmas 2020', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2e.jpg', caption: 'Remote training programme rollout, 2021' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2f.jpg', caption: 'First in-person team reunion, Summer 2021' },
    ],
  },
  {
    id: 'era-2022-2023',
    label: '2022–2023',
    years: '2022–2023',
    tagline: 'The Acceleration',
    yearTag: ['2', '2'],
    description:
      "Post-pandemic demand hit all at once. Five global brands were running simultaneous campaigns — Sonic had to coordinate it all without a single metric missed. That pressure accelerated a project that had been in the background for two years: a proprietary reporting and performance-tracking platform. The first internal SRT prototype ran live in Q4 2023. The results made it clear this wasn't just a tool — it was a product.",
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg',
    milestones: ['1,000+ specialists active', 'Five concurrent brand campaigns', 'Groupe SEB partnership added', 'SRT prototype live, Q4 2023', '€2B+ cumulative sales activated'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg', caption: 'Samsung Galaxy S22 nationwide launch, 2022', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LUCID01.jpg', caption: 'Groupe SEB multi-brand rollout, 2022' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/shower.jpg', caption: 'Dyson Airwrap premium activation — Stuttgart, 2022' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/1_NEU.jpg', caption: 'Bosch nationwide POS rollout — 180 locations, 2023', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/OPPOX5Pro_unboxing.jpg', caption: 'First Sonic Ambassador Awards Gala, 2023' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/TPV.jpg', caption: 'SRT prototype goes live — internal testing, 2023' },
    ],
  },
  {
    id: 'era-2024',
    label: '2024',
    years: '2024',
    tagline: 'The Edge',
    yearTag: ['2', '4'],
    description:
      'SRT launched commercially in March 2024 and changed the conversation entirely. For the first time, clients could log in and see exactly what their investment was generating — conversion rates per store, specialist performance rankings, live coverage maps. The data confirmed what the team already knew: the best-trained people, backed by the best data, produce results no competitor can replicate. Philips hit #1 in the German personal care category. Garmin grew DACH revenue by 130%.',
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2022/04/SRT_OPENER.jpg',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg',
    milestones: ['SRT commercial launch, March 2024', 'Philips achieves #1 in Germany', 'Garmin +130% DACH revenue', '122-store Garmin network active', 'IFA Berlin — 8 simultaneous brands'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/2024-qlkw343jjajbp7yuruxndjxesrz4qldhpslvbjoqpy.jpg', caption: 'SRT platform commercial launch event, 2024', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'Garmin 122-location network launch, 2024' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Philips secures #1 in Germany, 2024' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: 'IFA Berlin — SRT-tracked activation, 2024', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: '€2B+ lifetime sales milestone, 2024' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg', caption: 'SRT live performance map — DACH coverage' },
    ],
  },
  {
    id: 'era-2025',
    label: '2025',
    years: '2025',
    tagline: 'The Peak',
    yearTag: ['2', '5'],
    description:
      "By every metric Sonic tracks, 2025 is the best year in the company's history. 2,000+ active specialists. 150+ concurrent campaigns running across DACH. A 98% client retention rate that no agency in the sector comes close to matching. The POPAI Germany award for Best Promotions Agency arrived in September — voted by the brands themselves. The team celebrated for exactly one evening. Then started planning 2026.",
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
    milestones: ['POPAI Best Agency — Germany', '2,000+ active specialists', '150+ concurrent campaigns', '98% client retention rate', 'Six flagship brand partnerships'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Sonic team — 2,000+ active ambassadors, 2025', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Samsung Galaxy flagship launch, 2025' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Philips luxury activation — Galeria, 2025' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: 'Sonic wins POPAI Best Agency — Germany, 2025', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/2023-qlkw335pcgi1dm07xcj0t25y7e3riw9rdnydu9q4x0.jpg', caption: 'New HQ — Cologne, 2025' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/2022-qlkw335pcgi1dm07xcj0t25y7e3riw9rdnydu9q4x0.jpg', caption: 'Year-end celebration, December 2025' },
    ],
  },
  {
    id: 'era-2026',
    label: '2026',
    years: '2026',
    tagline: 'The Horizon',
    yearTag: ['2', '6'],
    description:
      "The DACH market is won. The next question is: what does European retail activation look like when Sonic is the one defining it? SRT 2.0 goes into development with AI-powered performance prediction built in. The first international deployments are being scoped — Paris, Amsterdam, Warsaw. A new brand category is entering the portfolio. The decade ahead starts here.",
    heroImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg',
    accentImage:
      'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg',
    milestones: ['SRT 2.0 in development', 'Paris & Amsterdam pilots scoped', 'AI performance prediction layer', 'Health & Wellness brand category', 'European expansion roadmap active'],
    gallery: [
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LUCID01.jpg', caption: 'Next chapter: Paris expansion concept, 2026', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg', caption: 'SRT 2.0 — AI-powered performance layer' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', caption: 'European expansion strategy — 2026' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/TPV.jpg', caption: 'AR-enhanced product demonstration concept', wide: true },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'First international ambassador cohort' },
      { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/10-1.jpg', caption: 'The mission continues.' },
    ],
  },
];

const eraNavItems = eras.map((e) => ({ id: e.id, label: e.label }));

export default function SonicReelsEmbed() {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [showHighlights, setShowHighlights] = useState(false);

  // ── Dashboard-managed era hero/accent images ──
  const { images: sonicreelsAccent } = useMediaStore('about_sonicreels_hero_accent');
  const overriddenEras = eras.map((era, i) => ({
    ...era,
    heroImage: (sonicreelsAccent[i * 2] && sonicreelsAccent[i * 2].url) || era.heroImage,
    accentImage: (sonicreelsAccent[i * 2 + 1] && sonicreelsAccent[i * 2 + 1].url) || era.accentImage,
  }));

  const handleEraChange = useCallback((index: number) => {
    setActiveEraIndex(index);
  }, []);

  const handleEraNavClick = (id: string) => {
    const idx = eras.findIndex((e) => e.id === id);
    if (idx >= 0) setActiveEraIndex(idx);
  };

  const activeEraId = eras[activeEraIndex]?.id ?? eras[0].id;

  return (
    <div className="bg-foreground-950 overflow-x-hidden">
      {/* Intro strip */}
      <div className="relative py-10 px-6 text-center overflow-hidden" style={{ background: '#1A1A1A' }}>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,212,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C8D400]/50" />
            <span className="text-[#C8D400] text-xs font-black uppercase tracking-[0.4em]">2007 — Present</span>
            <div className="h-px w-8 bg-[#C8D400]/50" />
          </div>
          <h2 className="font-black text-white leading-none uppercase mb-2" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
            Sonic <span style={{ color: '#C8D400' }}>Reels</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Nearly two decades of retail activation across Europe — told through the moments that defined us.
          </p>
        </div>
      </div>

      {/* Era Nav */}
      <EraNav
        eras={eraNavItems}
        activeEra={activeEraId}
        activeIndex={activeEraIndex}
        totalEras={eras.length}
        onEraClick={handleEraNavClick}
        onHighlightsClick={() => setShowHighlights(true)}
      />

      {/* Photo Album */}
      <PhotoAlbum
        eras={overriddenEras}
        activeEraIndex={activeEraIndex}
        onEraChange={handleEraChange}
        showHighlights={showHighlights}
        onHighlightsClose={() => setShowHighlights(false)}
      />
    </div>
  );
}
