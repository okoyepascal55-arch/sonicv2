import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hubCards from './data/hub-cards';
import type { RatgeberHubCard, GeoLevel } from './data/types';
import SectionBadge from '@/components/base/SectionBadge';
import SectionReveal from '@/components/feature/SectionReveal';
import WoodenDivider from '@/components/base/WoodenDivider';
import Breadcrumb from '@/components/base/Breadcrumb';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const GEO_LABELS: Record<GeoLevel, string> = {
  local: 'Lokal',
  regional: 'Regional',
  national: 'National',
  international: 'International',
};

const GEO_STYLES: Record<GeoLevel, string> = {
  local: 'bg-lime-100 text-lime-800',
  regional: 'bg-amber-100 text-amber-800',
  national: 'bg-sky-100 text-sky-800',
  international: 'bg-emerald-100 text-emerald-800',
};

const STATS = [
  { value: '27', label: 'Ratgeber-Artikel' },
  { value: '4', label: 'Geo-Ebenen' },
  { value: '77+', label: 'FAQ-Antworten' },
  { value: '19+', label: 'Jahre Expertise' },
];

function HubCard({ card, onClick }: { card: RatgeberHubCard; onClick: (slug: string) => void }) {
  return (
    <article
      onClick={() => onClick(card.slug)}
      className="group cursor-pointer border border-foreground-950/10 bg-white hover:border-primary-500/40 transition-all duration-300 flex flex-col"
      style={{ borderRadius: 0 }}
    >
      <div className="relative overflow-hidden h-36 md:h-44">
        <img
          src={card.imageUrl}
          alt={card.title + ' ' + card.accent}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${GEO_STYLES[card.geoLevel]}`} style={{ borderRadius: 0 }}>
            {GEO_LABELS[card.geoLevel]}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="mb-2 md:mb-3">
          <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">{card.category}</span>
        </div>
        <h3 className="text-base md:text-lg font-black text-foreground-950 group-hover:text-primary-500 transition-colors duration-200 leading-tight mb-2">
          {card.title}<br />
          <span className="text-primary-500">{card.accent}</span>
        </h3>
        <p className="text-foreground-950/55 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 flex-1">
          {card.description}
        </p>
        <div className="flex items-center gap-2 text-primary-500 text-xs font-bold mt-auto pt-3 border-t border-foreground-950/5">
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">Zum Ratgeber</span>
          <i className="ri-arrow-right-line text-xs group-hover:translate-x-1 transition-transform duration-200"></i>
        </div>
      </div>
    </article>
  );
}

export default function RatgeberHubPage() {
  const navigate = useNavigate();
  const { images: ratgeberHeroImages } = useMediaStore('ratgeber_hero');
  const heroImage = ratgeberHeroImages[0]?.url || 'https://readdy.ai/api/search-image?query=modern%20knowledge%20hub%20content%20library%20concept%20with%20organized%20floating%20article%20cards%20abstract%20representation%20of%20marketing%20expertise%20and%20strategic%20knowledge%20warm%20ambient%20lighting%20with%20subtle%20lime%20green%20accent%20highlights%20clean%20minimalist%20architectural%20space%20professional%20editorial%20atmosphere%20knowledge%20management%20visualization&width=1920&height=1080&seq=ratgeber-hub-hero-v1&orientation=landscape';

  useEffect(() => {
    document.title = 'Sonic Group Ratgeber — Praxiswissen für Markenaktivierung & Vertrieb | Sonic Group';

    const metaDesc = document.querySelector('meta[name="description"]');
    const desc = 'Der Sonic Group Ratgeber-Hub vereint 27 praxisorientierte Fachartikel zu Erlebnismarketing, Verkaufsförderung, Messen, Field Marketing, TikTok Shop, Live Video Promotion, Markteintritt DACH und mehr. 19+ Jahre Markenaktivierungs-Know-how aus Krefeld für Deutschland und DACH.';
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, []);

  const handleCardClick = (slug: string) => {
    navigate(`/ratgeber/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Text Store hooks ──
  const tHeroBadge = useText('ratgeber_hero', 'ratgeber-hero-badge', 'Content Hub');
  const tHeroH1_1 = useText('ratgeber_hero', 'ratgeber-hero-h1-1', 'SONIC GROUP');
  const tHeroH1Accent = useText('ratgeber_hero', 'ratgeber-hero-h1-accent', 'RATGEBER');
  const tHeroSub1 = useText('ratgeber_hero', 'ratgeber-hero-sub1', 'Praxiswissen für Markenaktivierung, Vertrieb und Kundenerlebnis');
  const tHeroSub2 = useText('ratgeber_hero', 'ratgeber-hero-sub2', '');
  const tStat1Val = useText('ratgeber_intro', 'ratgeber-stat-1-value', '27');
  const tStat1Lab = useText('ratgeber_intro', 'ratgeber-stat-1-label', 'Ratgeber-Artikel');
  const tStat2Val = useText('ratgeber_intro', 'ratgeber-stat-2-value', '4');
  const tStat2Lab = useText('ratgeber_intro', 'ratgeber-stat-2-label', 'Geo-Ebenen');
  const tStat3Val = useText('ratgeber_intro', 'ratgeber-stat-3-value', '77+');
  const tStat3Lab = useText('ratgeber_intro', 'ratgeber-stat-3-label', 'FAQ-Antworten');
  const tStat4Val = useText('ratgeber_intro', 'ratgeber-stat-4-value', '19+');
  const tStat4Lab = useText('ratgeber_intro', 'ratgeber-stat-4-label', 'Jahre Expertise');
  const tIntroBadge = useText('ratgeber_intro', 'ratgeber-intro-badge', 'Expertenwissen');
  const tIntroHeading = useText('ratgeber_intro', 'ratgeber-intro-heading', '');
  const tIntroText = useText('ratgeber_intro', 'ratgeber-intro-text', '');
  const tGeoBadge = useText('ratgeber_geo', 'ratgeber-geo-badge', 'Reichweite');
  const tGeoHeading = useText('ratgeber_geo', 'ratgeber-geo-heading', 'Lokal, regional, national, international');
  const tGeoText = useText('ratgeber_geo', 'ratgeber-geo-text', '');
  const tGeoLocal = useText('ratgeber_geo', 'ratgeber-geo-local', 'Lokal');
  const tGeoLocalD = useText('ratgeber_geo', 'ratgeber-geo-local-desc', '');
  const tGeoReg = useText('ratgeber_geo', 'ratgeber-geo-regional', 'Regional');
  const tGeoRegD = useText('ratgeber_geo', 'ratgeber-geo-regional-desc', '');
  const tGeoNat = useText('ratgeber_geo', 'ratgeber-geo-national', 'National');
  const tGeoNatD = useText('ratgeber_geo', 'ratgeber-geo-national-desc', '');
  const tGeoInt = useText('ratgeber_geo', 'ratgeber-geo-international', 'International');
  const tGeoIntD = useText('ratgeber_geo', 'ratgeber-geo-international-desc', '');
  const tCtaBadge = useText('ratgeber_cta', 'ratgeber-cta-badge', 'Kontakt');
  const tCtaHeading = useText('ratgeber_cta', 'ratgeber-cta-heading', '');
  const tCtaDesc = useText('ratgeber_cta', 'ratgeber-cta-desc', '');
  const tCtaBtn = useText('ratgeber_cta', 'ratgeber-cta-btn', 'Jetzt anfragen');
  const tCtaFooter = useText('ratgeber_cta', 'ratgeber-cta-footer', 'Kostenfreies Erstgespräch');

  const STATS = [
    { value: tStat1Val, label: tStat1Lab },
    { value: tStat2Val, label: tStat2Lab },
    { value: tStat3Val, label: tStat3Lab },
    { value: tStat4Val, label: tStat4Lab },
  ];

  const GEO_DESCS: Record<GeoLevel, string> = {
    local: tGeoLocalD,
    regional: tGeoRegD,
    national: tGeoNatD,
    international: tGeoIntD,
  };

  const GEO_LABELS_RT: Record<GeoLevel, string> = {
    local: tGeoLocal,
    regional: tGeoReg,
    national: tGeoNat,
    international: tGeoInt,
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      <Breadcrumb
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'Ratgeber' },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Sonic Group Ratgeber Hub"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
          </div>

          <div className="absolute top-0 left-1/4 w-full max-w-[500px] h-[250px] bg-primary-500/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-4 py-1.5 mb-6 mx-auto">
              <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
              <span className="text-xs font-black text-primary-500 uppercase tracking-[0.2em]">{tHeroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              {tHeroH1_1}<br />
              <span className="text-primary-500">{tHeroH1Accent}</span>
            </h1>
            <p className="text-lg text-primary-500 font-bold mb-3 drop-shadow-lg max-w-2xl mx-auto">
              {tHeroSub1}
            </p>
            <p className="text-base text-white/70 leading-relaxed drop-shadow max-w-2xl mx-auto">
              {tHeroSub2}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div style={{ background: 'linear-gradient(180deg, oklch(var(--background-100)) 0%, white 100%)' }} className="border-y border-foreground-950/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-black text-primary-500 font-mono mb-1 leading-tight">{stat.value}</div>
                <div className="text-foreground-950/45 text-xs font-bold uppercase tracking-wider leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WoodenDivider />

      {/* Intro */}
      <section className="sonic-section-md md:bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <SectionReveal>
            <SectionBadge text={tIntroBadge} variant="dark" />
            <h2 className="sonic-h2 text-foreground-950 mb-5">
              {tIntroHeading}
            </h2>
            <p className="text-base text-foreground-950/60 leading-relaxed max-w-3xl mx-auto">
              {tIntroText}
            </p>
          </SectionReveal>
        </div>
      </section>

      <WoodenDivider />

      {/* Card Grid */}
      <section className="sonic-section-lg md:bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubCards.map((card, index) => (
              <SectionReveal key={card.slug} delay={index * 50}>
                <HubCard card={card} onClick={handleCardClick} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* Geo Context */}
      <section className="sonic-section-lg md:bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <SectionReveal>
            <SectionBadge text={tGeoBadge} variant="dark" />
            <h2 className="sonic-h2 text-foreground-950 mb-5">
              {tGeoHeading}
            </h2>
            <p className="text-base text-foreground-950/60 leading-relaxed max-w-3xl mx-auto mb-10">
              {tGeoText}
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-4 gap-5">
            {(['local', 'regional', 'national', 'international'] as GeoLevel[]).map((level, idx) => (
              <SectionReveal key={level} delay={idx * 80}>
                <div className="border border-foreground-950/10 bg-[#fafaf8] p-6 text-center hover:border-primary-500/30 transition-all duration-300" style={{ borderRadius: 0 }}>
                  <div className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center`} style={{ backgroundColor: 'rgba(200,212,0,0.08)' }}>
                    <i className={`${level === 'local' ? 'ri-map-pin-line' : level === 'regional' ? 'ri-road-map-line' : level === 'national' ? 'ri-flag-line' : 'ri-global-line'} text-primary-500 text-xl`}></i>
                  </div>
                  <h4 className="text-sm font-black text-foreground-950 uppercase tracking-wider mb-2">{GEO_LABELS_RT[level]}</h4>
                  <p className="text-foreground-950/50 text-xs leading-relaxed">
                    {GEO_DESCS[level]}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* CTA */}
      <section className="sonic-section-lg bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border border-foreground-950/15 bg-white p-10 md:p-14 relative overflow-hidden" style={{ borderRadius: 0 }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-3xl pointer-events-none translate-x-16 -translate-y-16" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C8D400]/60 via-[#C8D400]/20 to-transparent" />

            <div className="relative grid md:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-foreground-950/12 px-3 py-1 mb-5" style={{ borderRadius: 0 }}>
                  <i className="ri-mail-send-line text-foreground-950/50 text-xs"></i>
                  <span className="text-xs font-black text-foreground-950/50 uppercase tracking-widest">{tCtaBadge}</span>
                </div>

                <h2 className="sonic-h2 text-foreground-950 mb-4">
                  {tCtaHeading.split('\n').map((line, i) => i === 1 ? <span key={i}><span className="text-primary-500">{line}</span></span> : <span key={i}>{line}<br /></span>)}
                </h2>

                <p className="text-foreground-950/55 text-base leading-relaxed">
                  {tCtaDesc}
                </p>
              </div>

              <div className="text-center md:text-right">
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-3 bg-foreground-950 text-white px-10 py-5 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm uppercase tracking-wider"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-mail-line text-base"></i>
                  {tCtaBtn}
                </a>
                <p className="text-foreground-950/30 text-xs mt-3 font-semibold">
                  {tCtaFooter}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WoodenDivider />
    </div>
  );
}