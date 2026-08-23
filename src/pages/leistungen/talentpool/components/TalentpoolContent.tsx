import { useRef, useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const TALENTPOOL_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-user-unfollow-line',
    title: 'Freelancer-Chaos',
    desc: 'Freelancer-Netzwerke liefern wechselnde Gesichter ohne Markenwissen. Jedes Projekt bedeutet neu onboarden, neu schulen — mit unvorhersehbaren Ergebnissen.',
    trigger: 'Auch deine Erfahrung?',
  },
  {
    icon: 'ri-loop-right-line',
    title: 'Hohe Fluktuation',
    desc: 'Motivation sinkt, wenn kein festes Anstellungsverhältnis besteht. Fluktuation kostet Zeit, Geld und Qualität — und hinterlässt Lücken auf der Fläche.',
    trigger: 'Kostet dich das Nerven?',
  },
  {
    icon: 'ri-eye-off-line',
    title: 'Kein Markenverständnis',
    desc: 'Wer heute für Marke A und morgen für Marke B arbeitet, wird kein echter Botschafter. Ohne Identifikation fehlt die Überzeugungskraft am POS.',
    trigger: 'Klingt vertraut?',
  },
];

const SOLUTIONS = [
  {
    number: '01',
    icon: 'ri-shield-check-line',
    title: 'Handverlesen & festangestellt',
    desc: 'Alle Talente sind fest bei Sonic angestellt — keine Zeitarbeit, keine Freelancer. Das bedeutet: Verlässlichkeit, Loyalität und echtes Engagement.',
    accent: 'Anstellung',
    tags: ['Festangestellt', 'Verlässlich'],
  },
  {
    number: '02',
    icon: 'ri-graduation-cap-line',
    title: 'Intensivtraining auf dein Produkt',
    desc: 'Vor jedem Einsatz durchlaufen unsere Talente ein Produkttraining, das wirklich sitzt: Positionierung, USPs, Kaufargumente, Einwandbehandlung.',
    accent: 'Training',
    tags: ['Produktwissen', 'Schulung'],
  },
  {
    number: '03',
    icon: 'ri-dashboard-line',
    title: 'Live-Zielerreichung im SRT',
    desc: 'Jedes Talent sieht seine eigene Performance in Echtzeit: Kontakte, Verkäufe, Zielerreichung. Das motiviert — und macht Coaching präzise.',
    accent: 'Reporting',
    tags: ['Echtzeit', 'Motivation'],
  },
  {
    number: '04',
    icon: 'ri-map-pin-2-line',
    title: 'Deutschlandweit einsatzbereit',
    desc: 'Über 2.000 Talente in allen großen Städten und Regionen. MediaMarkt, Saturn, Douglas, dm, Fachhandel — wir haben Personal, wo du es brauchst.',
    accent: 'Reichweite',
    tags: ['Nationwide', '2.000+ Talente'],
  },
  {
    number: '05',
    icon: 'ri-user-star-line',
    title: 'Spezialisiert nach Kategorie',
    desc: 'Consumer Electronics, Haushaltsgeräte, Kosmetik, Sport: Unsere Talente sind nach Produktkategorie trainiert — kein allgemeines Promoter-Profil.',
    accent: 'Spezialisierung',
    tags: ['Kategorie-Training', 'Expertise'],
  },
  {
    number: '06',
    icon: 'ri-bar-chart-2-line',
    title: 'Performance-getrackt',
    desc: 'Standort-Check-in, GPS-Tracking, Echtzeit-Reporting: Jeder Einsatz ist dokumentiert und transparent. Für dich als Auftraggeber und für das Talent selbst.',
    accent: 'Tracking',
    tags: ['GPS', 'Transparenz'],
  },
];

const PROFILES = [
  {
    number: '01',
    type: 'Brand Ambassador',
    icon: 'ri-user-star-line',
    accent: 'POS & Verkauf',
    tags: ['POS-Aktivierung', 'Beratung & Verkauf', 'Demo & Erklärung'],
    desc: 'Das Herzstück unseres Talentepool — Live am POS, erklärt, begeistert, verkauft.',
    imgIndex: 0,
  },
  {
    number: '02',
    type: 'Video-Berater',
    icon: 'ri-video-line',
    accent: 'Live-Video & E-Commerce',
    tags: ['Live-Video-Calls', 'Online-Shop-Integration', 'After-Sales'],
    desc: 'Für Live-Video-Promotion im Online-Shop, QR-Code und POS-Display.',
    imgIndex: 1,
  },
  {
    number: '03',
    type: 'Verkaufstrainer',
    icon: 'ri-presentation-line',
    accent: 'Training & Coaching',
    tags: ['Händlerschulungen', 'Produktwissen', 'Retail-Coaching'],
    desc: 'Macht Handelspartner zu echten Fans deiner Marke — mit Schulungen, die wirken.',
    imgIndex: 2,
  },
  {
    number: '04',
    type: 'Event-Crew',
    icon: 'ri-calendar-event-line',
    accent: 'Events & Roadshows',
    tags: ['Instore-Events', 'Roadshows', 'Messen & Promotions'],
    desc: 'Für Launch-Events, Roadshows und Instore-Aktivierungen — erfahren und skalierbar.',
    imgIndex: 3,
  },
];

const FALLBACK_PROFILES = [
  'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg',
];

const STATS = [
  { value: '>2.000', label: 'Talente im Pool' },
  { value: '>15', label: 'Branchen abgedeckt' },
  { value: '100 %', label: 'Festangestellt' },
  { value: 'Ø 4,6/5', label: 'Kundenzufriedenheit' },
];

function ScrollSection({
  scrollRef,
  onLeft,
  onRight,
  label,
  children,
  dots,
  activeIdx,
  onDot,
  theme = 'light',
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onLeft: () => void;
  onRight: () => void;
  label: string;
  children: React.ReactNode;
  dots: number;
  activeIdx: number | null;
  onDot: (i: number) => void;
  theme?: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';
  return (
    <>
      <div className="flex items-center mb-6 gap-3">
        <span className={`text-[11px] font-black uppercase tracking-widest flex-grow ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          {label}
        </span>
        <button onClick={onLeft} className={`w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer ${isDark ? 'border-white/15 text-white/40' : 'border-black/15 text-black/40'} hover:border-primary-500/60 hover:text-primary-500`} aria-label="links">
          <i className="ri-arrow-left-s-line text-xl" />
        </button>
        <button onClick={onRight} className={`w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer ${isDark ? 'border-white/15 text-white/40' : 'border-black/15 text-black/40'} hover:border-primary-500/60 hover:text-primary-500`} aria-label="rechts">
          <i className="ri-arrow-right-s-line text-xl" />
        </button>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {children}
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {Array.from({ length: dots }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            className="cursor-pointer transition-all duration-300"
            style={{
              width: i === (activeIdx ?? 0) ? '22px' : '6px',
              height: '3px',
              background: i === (activeIdx ?? 0) ? '#C8D400' : 'rgba(200,212,0,0.3)',
              border: 'none',
              padding: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function TalentpoolContent() {
  const [challengeHover, setChallengeHover] = useState<number | null>(null);
  const { images: profileImages } = useMediaStore('leistungen_talentpool_profiles_images');
  const tChallengeHeading = useText('leistungen_talentpool_content', 'talentpool-challenge-heading', 'Wechselnde Gesichter. Kein Markenwissen. Kein ROI.');
  const tChallengeSub = useText('leistungen_talentpool_content', 'talentpool-challenge-sub', 'Das Standardmodell in der Promotion-Branche ist kaputt. Freelancer-Netzwerke liefern keine echten Markenbotschafter.');
  const tSolutionHeading = useText('leistungen_talentpool_content', 'talentpool-solution-heading', 'DER SONIC-TALENTEPOOL. KEIN VERGLEICH.');
  const tSolutionSub = useText('leistungen_talentpool_content', 'talentpool-solution-sub', 'Festangestellt, trainiert und live-getrackt — das ist der Unterschied.');
  const tProfilesHeading = useText('leistungen_talentpool_content', 'talentpool-profiles-heading', '4 ROLLEN. EIN ANSPRECHPARTNER.');
  const tProfilesSub = useText('leistungen_talentpool_content', 'talentpool-profiles-sub', 'Jeden Talent-Typ aus einer Hand — koordiniert, geschult und live getrackt.');

  const getProfileImg = (index: number) => {
    const item = profileImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_PROFILES[index];
  };

  const profScrollRef = useRef<HTMLDivElement>(null);
  const [profActive, setProfActive] = useState<number | null>(null);
  const scrollProf = (dir: 'left' | 'right') => {
    profScrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };
  const dotProf = (i: number) => {
    setProfActive(i);
    profScrollRef.current?.scrollTo({ left: i * 396, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Challenge Section — shared component with black bg ── */}
      <ChallengeSection
        id="herausforderung"
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={TALENTPOOL_CHALLENGES}
      />

      <WoodenDivider />

      {/* ── Solution Section (light warm bg — directly after dark ChallengeSection) ── */}
      <section id="loesung" className="sonic-section-lg bg-white px-4 md:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute top-0 right-0 w-full max-w-[500px] h-[500px] bg-primary-500/8 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-[#111]/15 px-4 py-1.5 mb-5">
                <i className="ri-check-double-line text-foreground-950 text-sm" />
                <span className="text-xs font-black text-foreground-950 uppercase tracking-widest">Die Sonic-Lösung</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 leading-tight tracking-tight uppercase">
                {tSolutionHeading}
              </h2>
            </div>
            <p className="text-foreground-950/40 text-sm leading-relaxed max-w-xs lg:text-right">
              {tSolutionSub}
            </p>
          </div>

          <ScrollCardSection data={SOLUTIONS.map(s => ({ ...s, num: s.number, woodIcon: undefined, icon: s.icon }))} label={`${SOLUTIONS.length} Leistungsmerkmale — scrollen`} theme="light" variant="remix" cardWidth="clamp(300px, 28vw, 370px)" cardMinHeight="420px" showWoodIcon={false} />
        </div>
      </section>

      {/* ── Talent Profiles (horizontal scroll, dark bg — intentional alternation) ── */}
      <section id="talentprofile" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/4 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-4 py-1.5 mb-5">
                <i className="ri-focus-3-line text-primary-500 text-sm" />
                <span className="text-xs font-black text-primary-500 uppercase tracking-widest">Talentprofile</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight uppercase">{tProfilesHeading}</h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:text-right">
              {tProfilesSub}
            </p>
          </div>

          <ScrollSection theme="dark" scrollRef={profScrollRef} onLeft={() => scrollProf('left')} onRight={() => scrollProf('right')} label={`${PROFILES.length} Talentprofile — scrollen`} dots={PROFILES.length} activeIdx={profActive} onDot={dotProf}>
            {PROFILES.map((p, idx) => {
              const isA = profActive === idx;
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 snap-start relative overflow-hidden cursor-default"
                  style={{
                    width: 'clamp(300px, 28vw, 370px)',
                    minHeight: '500px',
                    background: isA ? '#ffffff' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isA ? 'rgba(200,212,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.3s ease',
                    transform: isA ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isA ? '0 0 0 1px rgba(200,212,0,0.35), 0 24px 48px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={() => setProfActive(idx)}
                  onMouseLeave={() => setProfActive(null)}
                >
                  <div className="absolute top-0 left-0 right-0 z-20" style={{ height: isA ? '3px' : '2px', background: isA ? '#C8D400' : 'rgba(200,212,0,0.2)', boxShadow: isA ? '0 0 14px rgba(200,212,0,0.45)' : 'none', transition: 'all 0.3s ease' }} />
                  <div className="absolute top-0 left-0 bottom-0 z-20 w-0.5" style={{ background: isA ? '#C8D400' : 'transparent', transition: 'background 0.3s ease' }} />
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 z-30" style={{ borderColor: isA ? 'rgba(200,212,0,0.5)' : 'transparent', transition: 'border-color 0.3s ease' }} />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 z-30" style={{ borderColor: isA ? 'rgba(200,212,0,0.5)' : 'transparent', transition: 'border-color 0.3s ease' }} />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 z-10" style={{ borderColor: isA ? 'rgba(200,212,0,0.5)' : 'transparent', transition: 'border-color 0.3s ease' }} />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 z-10" style={{ borderColor: isA ? 'rgba(200,212,0,0.5)' : 'transparent', transition: 'border-color 0.3s ease' }} />
                  <div className="absolute bottom-4 right-4 font-black leading-none select-none pointer-events-none z-0" style={{ fontSize: '6rem', color: isA ? 'rgba(200,212,0,0.07)' : 'rgba(255,255,255,0.04)', lineHeight: 1, transition: 'color 0.3s ease' }}>{p.number}</div>

                  <div className="relative overflow-hidden" style={{ height: '180px' }}>
                    <img src={getProfileImg(idx)} alt={p.type} className="w-full h-full object-cover object-top transition-transform duration-700" style={{ transform: isA ? 'scale(1.05)' : 'scale(1)' }} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1" style={{ background: '#C8D400', color: '#111' }}>{p.type}</span>
                    </div>
                  </div>

                  <div className="relative z-10 p-7 flex flex-col">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1.5 h-1.5" style={{ background: isA ? '#C8D400' : 'rgba(200,212,0,0.4)', transition: 'background 0.3s ease' }} />
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: isA ? '#C8D400' : 'rgba(200,212,0,0.5)', transition: 'color 0.3s ease' }}>{p.accent}</span>
                    </div>
                    <div className="w-[56px] h-[56px] flex items-center justify-center mb-5 flex-shrink-0" style={{ background: isA ? 'linear-gradient(145deg, #d4e100, #C8D400)' : 'linear-gradient(145deg, #1c1c1c, #111)', boxShadow: isA ? '0 10px 24px rgba(200,212,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)' : '0 8px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)', transition: 'all 0.35s ease' }}>
                      <i className={`${p.icon} text-xl`} style={{ color: isA ? '#111' : '#C8D400', transition: 'color 0.35s ease' }} />
                    </div>
                    <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: isA ? '#555' : 'rgba(255,255,255,0.55)', transition: 'color 0.3s ease' }}>{p.desc}</p>
                    <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${isA ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.3s ease' }}>
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: isA ? '#999' : 'rgba(255,255,255,0.25)' }}>{p.number} / {String(PROFILES.length).padStart(2, '0')}</span>
                      <div className="w-7 h-7 flex items-center justify-center" style={{ background: isA ? '#C8D400' : 'rgba(255,255,255,0.06)', transform: isA ? 'translateX(3px)' : 'translateX(0)', transition: 'all 0.25s ease' }}>
                        <i className="ri-arrow-right-line text-sm" style={{ color: isA ? '#111' : 'rgba(255,255,255,0.4)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollSection>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="sonic-section-lg bg-white px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-2 md:grid-cols-4 gap-px bg-foreground-950/10 border border-[#111]/10 overflow-hidden">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white p-6 md:p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-colors duration-300" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-2xl md:text-4xl font-black text-foreground-950 mb-1.5 relative z-10">{s.value}</div>
              <div className="text-foreground-950/40 text-xs font-bold uppercase tracking-wider leading-snug relative z-10">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
