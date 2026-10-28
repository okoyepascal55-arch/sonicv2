import { useEffect, useRef, useState } from 'react';

import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { CONTACT_EMAIL } from '@/lib/contact';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { getYouTubeId, youTubeEmbedUrl } from '@/lib/youtube';
import { isVideoFileUrl } from '@/lib/videoFile';
import { useMotionPaused } from '@/lib/motion';
import { useText } from '@/hooks/useText';
import { useLeistungenText } from '@/hooks/useLeistungenText';

const VIDEO_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-door-lock-line',
    title: 'Hohe Eintrittshürden',
    desc: 'Studio, Equipment, Technik, Presenter im Schichtbetrieb: Hohe Investitionskosten bzw. schwere Dienstleister-Suche.',
    trigger: 'Schon daran gescheitert?',
  },
  {
    icon: 'ri-question-line',
    title: 'Kosten völlig unklar',
    desc: 'Wie sieht die Kosten-Nutzen-Rechnung bei Video- und Live-Video-Kanälen aus? Ohne Erfahrungswerte drohen Nicht- bzw. Fehl-Investitionen.',
    trigger: 'Ungewisses Budget?',
  },
  {
    icon: 'ri-global-line',
    title: 'Omnichannel — komplexe Umsetzung',
    desc: 'Live Video braucht man für E-Commerce, aber auch im Retail performt es stark. Die Umsetzung ist ohne Fach-Expertise schwierig.',
    trigger: 'Klingt bekannt?',
  },
];

const SOLUTIONS = [
  { woodIcon: '', num: '01', accent: 'Online & E-Commerce', title: 'E-Commerce', desc: 'Live-Video bspw. von 8 bis 20 Uhr, danach Recordings. Kann auf Fokus-Produkte beschränkt werden. Lässt sich besonders gut im eigenen Shop einbinden.' },
  { woodIcon: '', num: '02', accent: 'Retail Display', title: 'Retail: Video-Display', desc: 'Video-Screen im Handel: Live-Chat am POS mit dem Team im Studio. Plus: Abrufbarkeit von bereits aufgezeichneten Videos und Integration Text-Chatbot.' },
  { woodIcon: '', num: '03', accent: 'QR Backup', title: 'Retail: QR-Code Backup', desc: 'Die Field Force ist bspw. an 2 Tagen pro Woche im Outlet? Per QR-Code am Regal bzw. auf der Packung kann das Studio-Team jeden Tag live erreicht werden.' },
];

// Card texts: Dashboard → Text → Live Video — Vorteile (leistungen_video_advantages)
const ADVANTAGE_NUMS = ['01', '02', '03', '04', '05', '06'];

const FORMATS = [
  {
    icon: 'ri-user-voice-line',
    title: 'Live-Video-Beratung',
    desc: '1:1-Calls zwischen Kunde und Produktexperte. Persönlich, als echter Dialog, mit dem Ziel Kaufabschluss bzw. Cross-/Upselling.',
    img: '',
    tag: '1:1',
  },
  {
    icon: 'ri-broadcast-line',
    title: 'Sales Broadcast',
    desc: 'Video-Produktpräsentation in Kombination mit Online-Shop. Reichweite trifft Kaufimpuls. Live und/oder Recorded.',
    img: '',
    tag: 'Broadcast',
  },
  {
    icon: 'ri-live-line',
    title: 'Live-Streaming',
    desc: 'Besondere, exklusive Shopping-Events als Livestream. Für Product Launches, Limited Editions, VIP-Aktionen, Deep Dives.',
    img: '',
    tag: 'Live',
  },
  {
    icon: 'ri-instagram-line',
    title: 'Social Commerce',
    desc: 'Angebote auf Social Channels mit direkter Kaufoption — inklusive TikTok Live Shopping aus unserem Studio. Reichweite und Conversion in einem Kanal.',
    img: '',
    tag: 'Social',
  },
  {
    icon: 'ri-group-line',
    title: 'Group Buying',
    desc: 'Gemeinsam, früher, günstiger, exklusiver einkaufen. Interaktive Kauferlebnisse für Gruppen.',
    img: '',
    tag: 'Group',
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'After Sales',
    desc: 'Dienstleistung nach dem Kauf: Troubleshooting, Setup-Hilfe, Produktsupport per Video. Kann die Retourenquote senken.',
    img: '',
    tag: 'Support',
  },
];

// Row labels: Dashboard → Text → Live Video — Phygital (leistungen_video_phygital); checkmarks stay here
const PHYGITAL_COMPARE = [
  { key: 'row1', video: true, field: false },
  { key: 'row2', video: false, field: true },
  { key: 'row3', video: true, field: false },
  { key: 'row4', video: true, field: true },
  { key: 'row5', video: true, field: false },
  { key: 'row6', video: false, field: true },
  { key: 'row7', video: true, field: false },
  { key: 'row8', video: false, field: true },
];

const FALLBACK_FORMATS = [
  '',
  '',
  '',
  '',
  '',
  '',
];

export default function VideoContent() {
  const tChallengeHeading = useText('leistungen_video_content', 'video-challenge-heading', 'Bewegtbild ist die Königsklasse.');
  const tChallengeSub = useText('leistungen_video_content', 'video-challenge-sub', 'Wenn Live Video Shopping einfach wäre, würde es jede Marke machen. Ist es aber nicht.');
  const tSolutionHeading = useText('leistungen_video_content', 'video-solution-heading', 'Sonic Live Video im Full Service.');
  const tSolutionSub = useText('leistungen_video_content', 'video-solution-sub', 'Echte Menschen, geschult auf dein Produkt, beraten in Echtzeit. All in One: Regisseur, Moderator, Verkäufer.');
  const tAdvantagesHeading = useText('leistungen_video_content', 'video-advantages-heading', 'Darum Live Video');
  const tPhygitalHeading = useText('leistungen_video_content', 'video-phygital-heading', 'Phygital optimal nutzen');
  // Showcase video from MEDIA dashboard (Live Video slot): an uploaded video file (autoplays muted, looped)
  // or, as fallback, a YouTube link (URL or caption field).
  const { images: ytSection } = useMediaStore('leistungen_video_youtube');
  const videoFileUrl = isVideoFileUrl(ytSection[0]?.url) ? resolveImageUrl(ytSection[0].url) : '';
  const ytId = videoFileUrl ? '' : (getYouTubeId(ytSection[0]?.url) || getYouTubeId(ytSection[0]?.caption));
  const hasShowcase = !!(videoFileUrl || ytId);
  const tTik = useLeistungenText('leistungen_video_tiktok');
  // Texts of the video block: Dashboard → Text → Live Video — Video-Block
  const tVid = useLeistungenText('leistungen_video_showcase');
  const tYoutubeTitle = tVid['title'];
  const tAdv = useLeistungenText('leistungen_video_advantages');
  const tCalc = useLeistungenText('leistungen_video_calculator');
  const tPhy = useLeistungenText('leistungen_video_phygital');
  const ADVANTAGES = ADVANTAGE_NUMS.map((num, i) => ({
    woodIcon: '', num,
    accent: tAdv[`a${i + 1}-accent`], title: tAdv[`a${i + 1}-title`], desc: tAdv[`a${i + 1}-desc`],
  }));
  const tFormatsHeading = useText('leistungen_video_content', 'video-formats-heading', '6 Formate. Ein Partner.');
  const { images: formatImages } = useMediaStore('leistungen_video_format_photos');
  const { images: solutionWoodIcons } = useMediaStore('leistungen_video_solution_wood_icons');
  const { images: advantagesWoodIcons } = useMediaStore('leistungen_video_advantages_wood_icons');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [teamSize, setTeamSize] = useState(2);
  const [campaignDays, setCampaignDays] = useState(30);
  const [activeFormat, setActiveFormat] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formatHovered, setFormatHovered] = useState(false);

  const getFormatImg = (index: number) => {
    const item = formatImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_FORMATS[index];
  };

  // Resolve FORMATS images
  const resolvedFormats = FORMATS.map((f, i) => ({ ...f, img: getFormatImg(i) }));

  const lightboxItems: LightboxItem[] = resolvedFormats.map((f) => ({
    image: f.img,
    title: f.title,
    category: f.tag,
    description: f.desc,
  }));

  const openFormatLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const handleLbNext = () => setLightboxIndex((p) => (p + 1) % lightboxItems.length);
  const handleLbPrev = () => setLightboxIndex((p) => (p - 1 + lightboxItems.length) % lightboxItems.length);

  // Ø call duration from the dashboard (presentation: Ø 5,5 Min.) — drives the number of possible calls
  const avgCallRaw = (tCalc['stat-avg-value'] || '').replace(',', '.').replace(/[^0-9.]/g, '');
  const avgCallParsed = parseFloat(avgCallRaw);
  const avgCallMin = Number.isFinite(avgCallParsed) && avgCallParsed > 0 ? avgCallParsed : 5.5;
  const avgCallDisplay = avgCallMin.toLocaleString('de-DE', { maximumFractionDigits: 1 });
  const callsPerHour = 60 / avgCallMin;
  const totalHours = daysPerWeek * hoursPerDay * (campaignDays / 7);
  const maxCalls = Math.round(totalHours * callsPerHour * teamSize);
  // Cost estimate unchanged: same basis as before (10 Beratungseinheiten/Std. je Person à 4,50 € = 45 €/Std.),
  // independent of the Ø call duration, so the € figures stay exactly as they were.
  const COST_UNITS_PER_HOUR = 10;
  const estimatedCostPerUnit = 4.5;
  const totalCost = Math.round(Math.round(totalHours * COST_UNITS_PER_HOUR * teamSize) * estimatedCostPerUnit);

  const DARK = 'oklch(0.13 0.005 118)';

  return (
    <>
      {/* ═══ Block 1 (dark): Herausforderung — follows the dark hero ═══ */}
      <ChallengeSection
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={VIDEO_CHALLENGES}
      />

      <div style={{ background: DARK }}><WoodenDivider /></div>

      {/* ═══ Block 2 (white): Lösung → Formate — what we do, then in which formats ═══ */}
      <section id="loesung" className="sonic-section-md bg-white px-4 md:px-6">
        <div className="sonic-container">
          <SectionHead eyebrow="Die Lösung" heading={tSolutionHeading} sub={tSolutionSub} />
          <ScrollCardSection data={SOLUTIONS.map((s, i) => ({ ...s, woodIcon: solutionWoodIcons[i]?.url ? resolveImageUrl(solutionWoodIcons[i].url) : s.woodIcon || '' }))} label={`${SOLUTIONS.length} Kanäle — scrollen`} theme="light" variant="wood" cardWidth="clamp(220px, 32vw, 380px)" cardMinHeight="340px" />
        </div>
      </section>

      <section id="formate" className="sonic-section-md bg-white px-4 md:px-6" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
        <div className="sonic-container">
          <SectionHead eyebrow="Video-Formate" heading={tFormatsHeading} />

          {/* Same card language as the Events Formate block: tab strip → image + dark info panel */}
          <div style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            <div className="grid grid-cols-3 lg:grid-cols-6" style={{ borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)' }} role="tablist" aria-label="Video-Formate">
              {resolvedFormats.map((f, i) => {
                const isActive = activeFormat === i;
                return (
                  <button
                    key={f.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFormat(i)}
                    className="group flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
                    style={{
                      background: isActive ? 'oklch(var(--foreground-950))' : '#fff',
                      borderRight: '1px solid oklch(var(--foreground-950) / 0.08)',
                      borderBottom: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-black tabular-nums leading-none text-[12px]" style={{ color: isActive ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-300))' }}>{String(i + 1).padStart(2, '0')}</span>
                      <i className={`${f.icon} text-base leading-none ${isActive ? 'text-primary-500' : 'text-foreground-400 group-hover:text-foreground-950'}`} aria-hidden="true" />
                    </span>
                    <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] text-center leading-tight ${isActive ? 'text-white' : 'text-foreground-600 group-hover:text-foreground-950'}`}>{f.title}</span>
                  </button>
                );
              })}
            </div>

            <div key={activeFormat} className="grid lg:grid-cols-12" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
              <button
                type="button"
                onClick={() => openFormatLightbox(activeFormat)}
                onMouseEnter={() => setFormatHovered(true)}
                onMouseLeave={() => setFormatHovered(false)}
                className="lg:col-span-8 relative overflow-hidden bg-foreground-950 group h-[260px] sm:h-[360px] lg:h-[480px] cursor-zoom-in text-left"
                aria-label={`Bild vergrößern: ${FORMATS[activeFormat].title}`}
              >
                <img src={resolvedFormats[activeFormat].img} alt={FORMATS[activeFormat].title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">{FORMATS[activeFormat].tag}</span>
                <span className="absolute top-4 right-4 bg-black/55 backdrop-blur-sm text-white text-[10px] font-black tracking-[0.2em] tabular-nums px-2.5 py-1">
                  {String(activeFormat + 1).padStart(2, '0')} / {String(FORMATS.length).padStart(2, '0')}
                </span>
                <span className={`absolute inset-0 border-2 border-primary-500 pointer-events-none transition-opacity duration-300 ${formatHovered ? 'opacity-100' : 'opacity-0'}`} />
                <p className="absolute bottom-0 left-0 right-0 px-5 pb-5 md:px-7 md:pb-6 font-black text-white leading-none uppercase tracking-tight" style={{ fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '-0.025em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{FORMATS[activeFormat].title}</p>
              </button>

              <div className="lg:col-span-4 bg-foreground-950 text-white flex flex-col p-6 md:p-8 lg:h-[480px]" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500 text-foreground-950 mb-6">
                  <i className={`${FORMATS[activeFormat].icon} text-xl`} aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-4">{FORMATS[activeFormat].title}</h3>
                <p className="text-white/65 text-[15px] leading-relaxed mb-8">{FORMATS[activeFormat].desc}</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(FORMATS[activeFormat].title + ' anfragen')}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 px-6 py-3 font-black text-xs uppercase tracking-[0.14em] hover:bg-white transition-colors whitespace-nowrap self-start"
                  style={{ minHeight: '44px' }}
                >
                  Mehr erfahren <i className="ri-arrow-right-line" aria-hidden="true" />
                </a>
                <div className="flex items-center gap-1.5 mt-6">
                  {FORMATS.map((f, i) => (
                    <button key={f.title} type="button" onClick={() => setActiveFormat(i)} aria-label={f.title} className="tap-target h-1 cursor-pointer transition-all duration-300" style={{ width: i === activeFormat ? 28 : 10, background: i === activeFormat ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.2)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* ═══ Block 3 (dark): Video (+ TikTok Live Shopping) → Vorteile → Phygital ═══ */}
      <div style={{ background: DARK }}>
        {(hasShowcase || tTik['heading']) && (
          <section id="video" className="sonic-section-md px-4 md:px-6">
            <div className="sonic-container">
              {hasShowcase && (
                <>
                  <SectionHead dark eyebrow={tVid['eyebrow']} heading={tYoutubeTitle} sub={tVid['subline']} />
                  <ShowcasePlayer fileUrl={videoFileUrl} ytId={ytId} title={tYoutubeTitle} />
                </>
              )}
              {/* TikTok Live Shopping — attached to the studio video. Texts: Dashboard → Text → Live Video — TikTok Live Shopping */}
              <div className={hasShowcase ? 'mt-4' : ''}>
                <TikTokLiveHint t={tTik} />
              </div>
            </div>
          </section>
        )}

        <section id="vorteile" className="sonic-section-md px-4 md:px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="sonic-container">
            <SectionHead dark eyebrow={tAdv['eyebrow']} heading={tAdvantagesHeading} sub={tAdv['sub']} />
            <ScrollCardSection data={ADVANTAGES.map((a, i) => ({ ...a, woodIcon: advantagesWoodIcons[i]?.url ? resolveImageUrl(advantagesWoodIcons[i].url) : a.woodIcon || '' }))} label={`${ADVANTAGES.length} Vorteile — scrollen`} theme="dark" variant="wood" cardWidth="clamp(260px, 24vw, 320px)" cardMinHeight="300px" />
          </div>
        </section>

        <section id="phygital" className="sonic-section-md px-4 md:px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="sonic-container">
            <SectionHead dark eyebrow={tPhy['eyebrow']} heading={tPhygitalHeading} sub={tPhy['sub']} />

            <div className="border border-white/10 overflow-hidden">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.04] border-b border-white/10">
                <div className="p-4" />
                <div className="p-4 text-center border-l border-white/10">
                  <div className="flex items-center justify-center gap-2">
                    <i className="ri-video-line text-primary-500 text-sm" aria-hidden="true"></i>
                    <span className="text-primary-500 text-xs font-black uppercase tracking-wider">{tPhy['col-video']}</span>
                  </div>
                </div>
                <div className="p-4 text-center border-l border-white/10">
                  <div className="flex items-center justify-center gap-2">
                    <i className="ri-user-line text-white/60 text-sm" aria-hidden="true"></i>
                    <span className="text-white/60 text-xs font-black uppercase tracking-wider">{tPhy['col-field']}</span>
                  </div>
                </div>
              </div>
              {PHYGITAL_COMPARE.map((row, i) => (
                <div key={i} className={`grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/[0.06] last:border-b-0 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                  <div className="p-4 text-white/70 text-xs sm:text-sm font-semibold">{tPhy[row.key]}</div>
                  <div className="p-4 flex items-center justify-center border-l border-white/[0.06]">
                    {row.video
                      ? <div className="w-5 h-5 flex items-center justify-center bg-primary-500"><i className="ri-check-line text-foreground-950 text-xs" aria-label="ja"></i></div>
                      : <div className="w-5 h-5 flex items-center justify-center bg-white/5"><i className="ri-close-line text-white/25 text-xs" aria-label="nein"></i></div>}
                  </div>
                  <div className="p-4 flex items-center justify-center border-l border-white/[0.06]">
                    {row.field
                      ? <div className="w-5 h-5 flex items-center justify-center bg-primary-500"><i className="ri-check-line text-foreground-950 text-xs" aria-label="ja"></i></div>
                      : <div className="w-5 h-5 flex items-center justify-center bg-white/5"><i className="ri-close-line text-white/25 text-xs" aria-label="nein"></i></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div style={{ background: DARK }}><WoodenDivider /></div>

      {/* ═══ Block 4 (white): Kostenrechner → (page) Kundenstimmen → Kontakt ═══ */}
      <section id="kostenrechner" className="sonic-section-md bg-white px-4 md:px-6">
        <div className="sonic-container">
          <SectionHead eyebrow={tCalc['eyebrow']} heading={tCalc['heading']} />

          <div className="grid lg:grid-cols-12" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            {/* Sliders */}
            <div className="lg:col-span-7 p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9 content-center">
              {[
                { label: tCalc['slider-days'], value: daysPerWeek, min: 1, max: 7, setter: setDaysPerWeek },
                { label: tCalc['slider-hours'], value: hoursPerDay, min: 1, max: 12, setter: setHoursPerDay },
                { label: tCalc['slider-team'], value: teamSize, min: 1, max: 10, setter: setTeamSize },
                { label: tCalc['slider-campaign'], value: campaignDays, min: 7, max: 365, setter: setCampaignDays },
              ].map((param, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between mb-3">
                    <label htmlFor={`kostenrechner-slider-${i}`} className="text-foreground-700 text-sm font-bold">{param.label}</label>
                    <span className="text-foreground-950 font-black text-xl tabular-nums">{param.value}</span>
                  </div>
                  <input
                    id={`kostenrechner-slider-${i}`}
                    type="range"
                    min={param.min}
                    max={param.max}
                    value={param.value}
                    onChange={(e) => param.setter(Number(e.target.value))}
                    className="sonic-range w-full appearance-none cursor-pointer"
                    style={{ accentColor: 'oklch(var(--primary-500))', background: `linear-gradient(to right, #C8D400 ${((param.value - param.min) / (param.max - param.min)) * 100}%, rgba(0,0,0,0.1) 0%)` }}
                  />
                  <div className="flex justify-between text-foreground-400 text-xs mt-1.5 tabular-nums">
                    <span>{param.min}</span>
                    <span>{param.max}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-foreground-950 text-white p-6 md:p-10 flex flex-col">
              <dl className="flex flex-col">
                {[
                  { val: maxCalls.toLocaleString('de-DE'), label: tCalc['stat-calls-label'], accent: true },
                  { val: `${avgCallDisplay} Min.`, label: tCalc['stat-avg-label'], accent: false },
                  { val: `~${totalCost.toLocaleString('de-DE')} €`, label: tCalc['stat-cost-label'], accent: false },
                ].map((stat, i) => (
                  <div key={i} className="py-5 first:pt-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <dt className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1.5">{stat.label}</dt>
                    <dd className={`font-black tabular-nums leading-none ${stat.accent ? 'text-primary-500' : 'text-white'}`} style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', letterSpacing: '-0.02em' }}>{stat.val}</dd>
                  </div>
                ))}
              </dl>
              {tCalc['estimate-note'] && (
                <p className="mt-5 text-white/50 text-xs md:text-sm">{tCalc['estimate-note']}</p>
              )}
              <a href={`mailto:${CONTACT_EMAIL}?subject=Video-Konzept%20anfragen`} className="mt-8 inline-flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 px-7 py-3.5 font-black text-sm hover:bg-white transition-colors whitespace-nowrap self-start">
                <i className="ri-send-plane-line" aria-hidden="true"></i>{tCalc['button']}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox — all 6 format images, keyboard nav + Esc to close */}
      <Lightbox
        items={lightboxItems}
        activeIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleLbNext}
        onPrev={handleLbPrev}
      />
    </>
  );
}

/* ── Section header — one style for the whole page (28.10.2026):
     eyebrow, heading left, subline right (as on SRT, Kreation, Events) ── */
function SectionHead({ eyebrow, heading, sub, dark = false }: { eyebrow?: string; heading: string; sub?: string; dark?: boolean }) {
  return (
    <div className="mb-10 md:mb-12">
      {eyebrow && (
        <div className="flex items-center gap-3 mb-5">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: dark ? 'oklch(var(--primary-500))' : 'oklch(0.55 0.08 115)' }}>{eyebrow}</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <h2 className={`sonic-h2 ${dark ? 'text-white' : 'text-foreground-950'}`}>{heading}</h2>
        {sub && <p className={`text-[15px] md:text-[16px] leading-relaxed max-w-md ${dark ? 'text-white/55' : 'text-foreground-500'}`}>{sub}</p>}
      </div>
    </div>
  );
}

/* ── Showcase player — framed like the SRT "app window" ─────────────────── */
function ShowcasePlayer({ fileUrl, ytId, title }: { fileUrl: string; ytId: string; title: string }) {
  const motionPaused = useMotionPaused();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Autoplay only while on screen (saves bandwidth/CPU), never when motion is paused.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !fileUrl) return;
    if (motionPaused) { v.pause(); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => { /* autoplay blocked — controls remain */ });
      else v.pause();
    }, { threshold: 0.25 });
    obs.observe(v);
    return () => obs.disconnect();
  }, [fileUrl, motionPaused]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full srt-live-dot" aria-hidden="true" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Live aus dem Studio</span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35 hidden sm:inline">Sonic Live Video</span>
      </div>

      <div className="relative w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
        {fileUrl ? (
          <>
            <video
              ref={videoRef}
              src={fileUrl}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay={!motionPaused}
              muted
              loop
              playsInline
              preload="metadata"
              controls={motionPaused}
              aria-label={title}
            />
            <button
              type="button"
              onClick={toggleMute}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-colors cursor-pointer"
              aria-label={muted ? 'Ton an' : 'Ton aus'}
            >
              <i className={muted ? 'ri-volume-mute-line text-sm' : 'ri-volume-up-line text-sm'} aria-hidden="true" />
              {muted ? 'Ton an' : 'Ton aus'}
            </button>
          </>
        ) : (
          <iframe
            src={`${youTubeEmbedUrl(ytId)}?autoplay=1&mute=1&loop=1&playlist=${ytId}&playsinline=1&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

/* ── TikTok Live Shopping hint — slim dark band, not a full section ─────── */
function TikTokLiveHint({ t }: { t: Record<string, string> }) {
  if (!t['heading']) return null;
  return (
    <div id="tiktok-live" className="scroll-mt-32">
        <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center gap-5 md:gap-8 p-5 md:p-7" style={{ border: '1px solid oklch(0.81 0.19 115 / 0.35)', background: 'linear-gradient(100deg, oklch(0.81 0.19 115 / 0.08), transparent 60%)' }}>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-primary-500 text-foreground-950">
              <i className="ri-tiktok-fill text-2xl md:text-[28px]" aria-hidden="true" />
            </div>
            {t['badge'] && (
              <span className="inline-flex items-center gap-2 border border-primary-500/40 px-2.5 py-1">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full srt-live-dot" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500">{t['badge']}</span>
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-tight leading-tight mb-1.5">{t['heading']}</h3>
            {t['text'] && <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{t['text']}</p>}
          </div>
          {t['button'] && (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('TikTok Live Shopping anfragen')}`}
              className="inline-flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 px-6 py-3 font-black text-xs uppercase tracking-[0.14em] hover:bg-white transition-colors whitespace-nowrap cursor-pointer flex-shrink-0 self-start md:self-center"
              style={{ minHeight: '44px' }}
            >
              {t['button']}
              <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          )}
        </div>
    </div>
  );
}
