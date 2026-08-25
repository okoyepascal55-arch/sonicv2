import { useState, useRef } from 'react';

import VideoStudioPhone from './VideoStudioPhone';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { CONTACT_EMAIL } from '@/lib/contact';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

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
    desc: 'Wie sieht die Kosten-Nutzen-Rechnung bei (Live-)Video-Kanälen aus? Ohne Erfahrungswerte drohen Nicht- bzw. Fehl-Investitionen.',
    trigger: 'Ungewisses Budget?',
  },
  {
    icon: 'ri-global-line',
    title: 'Omnichannel — komplexe Umsetzung',
    desc: '(Live) Video braucht man für E-Commerce, aber auch im Retail performt es stark. Die Umsetzung ist ohne Fach-Expertise schwierig.',
    trigger: 'Klingt bekannt?',
  },
];

const SOLUTIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20shopping%20cart%20ecommerce%20online%20store%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-cart-video-sol-1&orientation=squarish', num: '01', accent: 'Online & E-Commerce', title: 'E-Commerce', desc: 'Live-Video bspw. von 8 bis 20 Uhr, danach Recordings. Kann auf Fokus-Produkte beschränkt werden. Lässt sich besonders gut im eigenen Shop einbinden.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20television%20screen%20display%20retail%20video%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-tv-video-sol-2&orientation=squarish', num: '02', accent: 'Retail Display', title: 'Retail: Video-Display', desc: 'Video-Screen im Handel: Live-Chat am POS mit dem Team im Studio. Plus: Abrufbarkeit von bereits aufgezeichneten Videos und Integration Text-Chatbot.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20QR%20code%20scan%20backup%20retail%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-qr-video-sol-3&orientation=squarish', num: '03', accent: 'QR Backup', title: 'Retail: QR-Code Backup', desc: 'Die Field Force ist bspw. an 2 Tagen pro Woche im Outlet? Per QR-Code am Regal bzw. auf der Packung kann das Studio-Team jeden Tag live erreicht werden.' },
];

const ADVANTAGES = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20purchase%20point%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-pin-video-adv-1&orientation=squarish', num: '01', accent: 'Kaufort', title: 'Am Einkaufsort', desc: 'Video für E-Commerce, Field Force für Retail: Kurz vor dem Kaufabschluss sprichst du mit deinen Kunden. Live.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20signal%20tower%20broadcast%20reach%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-signal-video-adv-2&orientation=squarish', num: '02', accent: 'Reichweite', title: 'Mehr Reichweite', desc: 'Erreiche mit Aufzeichnungen tausende potenzielle Kunden gleichzeitig, unabhängig vom Standort.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20analytics%20measurement%20results%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chart-video-adv-3&orientation=squarish', num: '03', accent: 'Analytics', title: 'Messbare Ergebnisse', desc: 'Echtzeit-Analytics zu Viewern, Engagement und Conversions. Jeder Call wird getrackt: Dauer, Ergebnis, Kundenzufriedenheit.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20magnifying%20glass%20search%20market%20research%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-search-video-adv-4&orientation=squarish', num: '04', accent: 'Marktforschung', title: 'Marktforschung', desc: 'Aus den Fragen der Kunden lässt sich ableiten, wie gut die Kommunikationsstrategie (Ads, Shop) funktioniert.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20chat%20bubble%20interaction%20dialogue%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chat-video-adv-5&orientation=squarish', num: '05', accent: 'Interaktion', title: 'Interaktivität', desc: 'Direkter Dialog mit Kunden durch Live-Chat, Q&A und Produktvorführungen in Echtzeit. Mit menschlicher Qualität.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20loop%20recycle%20reuse%20content%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-loop-video-adv-6&orientation=squarish', num: '06', accent: 'Content', title: 'Wiederverwendbar', desc: 'Aufgezeichnete Sessions können als On-Demand-Content weiterverwendet werden und so bei Beratung und Verkauf laufend unterstützen.' },
];

const FORMATS = [
  {
    icon: 'ri-user-voice-line',
    title: 'Live-Video-Beratung',
    desc: '1:1-Calls zwischen Kunde und Produktexperte. Persönlich, als echter Dialog, mit dem Ziel Kaufabschluss bzw. Cross-/Upselling.',
    img: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/9aba7e4f-1f00-4f96-b6fc-90fc615b11b3_1-Kopie.jpg',
    tag: '1:1',
  },
  {
    icon: 'ri-broadcast-line',
    title: 'Sales Broadcast',
    desc: 'Video-Produktpräsentation in Kombination mit Online-Shop. Reichweite trifft Kaufimpuls. Live und/oder Recorded.',
    img: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/a1484e91-882b-498d-b849-e6655b3952c0_2-Kopie.jpg',
    tag: 'Broadcast',
  },
  {
    icon: 'ri-live-line',
    title: 'Live-Streaming',
    desc: 'Besondere, exklusive Shopping-Events als Livestream. Für Product Launches, Limited Editions, VIP-Aktionen, Deep Dives.',
    img: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/ec769083-996f-4f19-a1aa-f82558ce1c27_3-Kopie.jpg',
    tag: 'Live',
  },
  {
    icon: 'ri-instagram-line',
    title: 'Social Commerce',
    desc: 'Angebote auf Social Channels mit direkter Kaufoption. Reichweite und Conversion in einem Kanal.',
    img: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/21a65c0f-e370-4202-875f-8b9858903d15_4-Kopie.jpg',
    tag: 'Social',
  },
  {
    icon: 'ri-group-line',
    title: 'Group Buying',
    desc: 'Gemeinsam, früher, günstiger, exklusiver einkaufen. Interaktive Kauferlebnisse für Gruppen.',
    img: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/6d9e8360-acc8-4646-9d6a-ae6ab41d65e1_5-Kopie.jpg',
    tag: 'Group',
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'After Sales',
    desc: 'Dienstleistung nach dem Kauf: Troubleshooting, Setup-Hilfe, Produktsupport per Video. Kann die Retourenquote senken.',
    img: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/25ab2718-26bf-4db4-b304-22c7d310a3e6_6-Kopie.jpg',
    tag: 'Support',
  },
];

const PHYGITAL_COMPARE = [
  { label: 'Erreicht Online-Shopper', video: true, field: false },
  { label: 'Erreicht Retail-Shopper', video: false, field: true },
  { label: 'Erhöht Conversion Rate', video: true, field: false },
  { label: 'Generiert Leads und Sales', video: true, field: true },
  { label: '24/7 abrufbar (als Aufnahme)', video: true, field: false },
  { label: 'Während Öffnungszeiten', video: false, field: true },
  { label: 'Nutzbar im Retail (QR-Code)', video: true, field: false },
  { label: 'Promoter nutzbar für Videos', video: false, field: true },
];

const FALLBACK_FORMATS = [
  'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/9aba7e4f-1f00-4f96-b6fc-90fc615b11b3_1-Kopie.jpg',
  'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/a1484e91-882b-498d-b849-e6655b3952c0_2-Kopie.jpg',
  'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/ec769083-996f-4f19-a1aa-f82558ce1c27_3-Kopie.jpg',
  'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/21a65c0f-e370-4202-875f-8b9858903d15_4-Kopie.jpg',
  'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/6d9e8360-acc8-4646-9d6a-ae6ab41d65e1_5-Kopie.jpg',
  'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/25ab2718-26bf-4db4-b304-22c7d310a3e6_6-Kopie.jpg',
];

export default function VideoContent() {
  const tChallengeHeading = useText('leistungen_video_content', 'video-challenge-heading', 'Bewegtbild ist die Königsklasse.');
  const tChallengeSub = useText('leistungen_video_content', 'video-challenge-sub', 'Wenn (Live) Video Shopping einfach wäre, würde es jede Marke machen. Ist es aber nicht.');
  const tSolutionHeading = useText('leistungen_video_content', 'video-solution-heading', 'Sonic (Live) Video im Full Service.');
  const tSolutionSub = useText('leistungen_video_content', 'video-solution-sub', 'Echte Menschen, geschult auf dein Produkt, beraten in Echtzeit.');
  const tAdvantagesHeading = useText('leistungen_video_content', 'video-advantages-heading', 'Darum (Live) Video Promotion');
  const tPhygitalHeading = useText('leistungen_video_content', 'video-phygital-heading', 'Phygital optimal nutzen');
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

  const avgCallMin = 6;
  const callsPerHour = 60 / avgCallMin;
  const totalHours = daysPerWeek * hoursPerDay * (campaignDays / 7);
  const maxCalls = Math.round(totalHours * callsPerHour * teamSize);
  const estimatedCostPerCall = 4.5;
  const totalCost = Math.round(maxCalls * estimatedCostPerCall);

  return (
    <>
      <ChallengeSection
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={VIDEO_CHALLENGES}
      />

      <WoodenDivider />

      {/* Solution */}
      <section id="loesung" className="sonic-section-lg bg-white px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full max-w-[500px] h-[500px] bg-primary-500/8 blur-[120px] pointer-events-none" />
        <div className="relative sonic-container">
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Die Lösung</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950">{tSolutionHeading}</h2>
            <p className="text-foreground-950/55 text-base max-w-2xl mx-auto">{tSolutionSub}</p>
          </div>
          <ScrollCardSection data={SOLUTIONS.map((s, i) => ({ ...s, woodIcon: solutionWoodIcons[i]?.url ? resolveImageUrl(solutionWoodIcons[i].url) : s.woodIcon || '' }))} label={`${SOLUTIONS.length} Kanäle — scrollen`} theme="light" variant="wood" cardWidth="clamp(280px, 32vw, 380px)" cardMinHeight="340px" />
        </div>
      </section>

      {/* Live Studio Experience — Phone Mockup */}
      <VideoStudioPhone />


      {/* Advantages */}
      <section id="vorteile" className="sonic-section-lg bg-foreground-950 px-4 md:px-6">
        <div className="sonic-container">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Vorteile</span>
            </div>
            <h2 className="sonic-h2 text-white">{tAdvantagesHeading}</h2>
            <p className="text-white/45 text-sm mt-3">Chancen auf mehr Verkäufe und weniger Retouren.</p>
          </div>
          <ScrollCardSection data={ADVANTAGES.map((a, i) => ({ ...a, woodIcon: advantagesWoodIcons[i]?.url ? resolveImageUrl(advantagesWoodIcons[i].url) : a.woodIcon || '' }))} label={`${ADVANTAGES.length} Vorteile — scrollen`} theme="dark" variant="wood" cardWidth="clamp(260px, 24vw, 320px)" cardMinHeight="300px" />
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="kostenrechner" className="sonic-section-lg bg-white px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Kostenrechner</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950">Live-Video: Kosten pro Jahr</h2>
          </div>

          <div className="border border-foreground-950/15 bg-white p-8 md:p-10">
            <div className="grid md:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {[
                { label: 'Tage pro Woche', value: daysPerWeek, min: 1, max: 7, setter: setDaysPerWeek },
                { label: 'Stunden pro Tag', value: hoursPerDay, min: 1, max: 12, setter: setHoursPerDay },
                { label: 'Teamgröße', value: teamSize, min: 1, max: 10, setter: setTeamSize },
                { label: 'Kampagnendauer (Tage)', value: campaignDays, min: 7, max: 365, setter: setCampaignDays },
              ].map((param, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-foreground-950/70 text-sm font-bold">{param.label}</label>
                    <span className="text-foreground-950 font-black text-lg font-mono">{param.value}</span>
                  </div>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    value={param.value}
                    onChange={(e) => param.setter(Number(e.target.value))}
                    className="w-full h-1.5 appearance-none cursor-pointer"
                    style={{ accentColor: 'oklch(var(--primary-500))', background: `linear-gradient(to right, #C8D400 ${((param.value - param.min) / (param.max - param.min)) * 100}%, rgba(0,0,0,0.1) 0%)` }}
                  />
                  <div className="flex justify-between text-foreground-950/25 text-xs mt-1">
                    <span>{param.min}</span>
                    <span>{param.max}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-foreground-950/10 pt-8 grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-foreground-950/10">
              {[
                { val: maxCalls.toLocaleString('de-DE'), label: 'Max. mögliche Calls' },
                { val: `${avgCallMin} Min.`, label: 'Ø Beratungsdauer' },
                { val: `~${totalCost.toLocaleString('de-DE')} €`, label: 'Geschätzte Kosten' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 text-center ${i < 2 ? 'border-r border-foreground-950/10' : ''}`}>
                  <div className="text-3xl font-black text-foreground-950 font-mono mb-1">{stat.val}</div>
                  <div className="text-foreground-950/45 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a href={`mailto:${CONTACT_EMAIL}?subject=Video-Konzept%20anfragen`} className="inline-flex items-center gap-2 bg-foreground-950 text-white px-8 py-4 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm">
                <i className="ri-send-plane-line"></i>Video-Konzept anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Phygital */}
      <section id="phygital" className="sonic-section-lg bg-foreground-950 px-4 md:px-6">
        <div className="sonic-container">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Ideale Kombination</span>
            </div>
            <h2 className="sonic-h2 text-white">{tPhygitalHeading}</h2>
            <p className="text-white/45 text-sm mt-3 max-w-xl mx-auto">Video und Field Force ergänzen sich wunderbar. Clever eingesetzt wird der ROI beider Maßnahmen im Omnichannel erhöht.</p>
          </div>

          <div className="border border-primary-500/15 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white/5 border-b border-primary-500/15">
              <div className="p-4 text-white/40 text-xs font-black uppercase tracking-wider"></div>
              <div className="p-4 text-center border-l border-primary-500/15">
                <div className="flex items-center justify-center gap-2">
                  <i className="ri-video-line text-primary-500 text-sm"></i>
                  <span className="text-primary-500 text-xs font-black uppercase tracking-wider">Video</span>
                </div>
              </div>
              <div className="p-4 text-center border-l border-primary-500/15">
                <div className="flex items-center justify-center gap-2">
                  <i className="ri-user-line text-white/60 text-sm"></i>
                  <span className="text-white/60 text-xs font-black uppercase tracking-wider">Field Force</span>
                </div>
              </div>
            </div>
            {PHYGITAL_COMPARE.map((row, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
                <div className="p-4 text-white/60 text-xs font-semibold">{row.label}</div>
                <div className="p-4 flex items-center justify-center border-l border-white/5">
                  {row.video
                    ? <div className="w-5 h-5 flex items-center justify-center bg-primary-500"><i className="ri-check-line text-foreground-950 text-xs"></i></div>
                    : <div className="w-5 h-5 flex items-center justify-center bg-white/5"><i className="ri-close-line text-white/20 text-xs"></i></div>
                  }
                </div>
                <div className="p-4 flex items-center justify-center border-l border-white/5">
                  {row.field
                    ? <div className="w-5 h-5 flex items-center justify-center bg-primary-500"><i className="ri-check-line text-foreground-950 text-xs"></i></div>
                    : <div className="w-5 h-5 flex items-center justify-center bg-white/5"><i className="ri-close-line text-white/20 text-xs"></i></div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats — dynamic with image backgrounds */}
      <section id="formate" className="sonic-section-lg bg-white px-4 md:px-6">
        <div className="sonic-container">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Video-Formate</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950">{tFormatsHeading}</h2>
          </div>

          {/* Format selector */}
          <div className="flex gap-0 border border-foreground-950/15 mb-0 overflow-x-auto">
            {FORMATS.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFormat(i)}
                className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap border-r border-foreground-950/15 last:border-r-0 ${
                  activeFormat === i ? 'bg-foreground-950 text-primary-500' : 'bg-white text-foreground-950/50 hover:text-foreground-950 hover:bg-white'
                }`}
              >
                <i className={`${f.icon} text-base`}></i>
                <span className="hidden sm:block">{f.tag}</span>
              </button>
            ))}
          </div>

          <div
            key={activeFormat}
            className="grid lg:grid-cols-12 border border-foreground-950/15 border-t-0"
            style={{ animation: 'fadeSlideIn 0.4s ease-out' }}
          >
            {/* Image — click to open fullscreen lightbox */}
            <div
              className="lg:col-span-7 relative overflow-hidden cursor-pointer group lg:h-[480px] h-[240px]"
              onClick={() => openFormatLightbox(activeFormat)}
              onMouseEnter={() => setFormatHovered(true)}
              onMouseLeave={() => setFormatHovered(false)}
              role="button"
              tabIndex={0}
              aria-label={`Bild vergrößern: ${FORMATS[activeFormat].title}`}
              onKeyDown={(e) => e.key === 'Enter' && openFormatLightbox(activeFormat)}
            >
              <img
                src={resolvedFormats[activeFormat].img}
                alt={FORMATS[activeFormat].title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">{FORMATS[activeFormat].tag}</span>
              </div>
              {/* Expand indicator */}
              <div className={`absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 transition-opacity duration-300 ${formatHovered ? 'opacity-100' : 'opacity-0'}`}>
                <i className="ri-fullscreen-line text-white text-sm"></i>
                <span className="text-white text-xs font-black uppercase tracking-wider">Vollbild</span>
              </div>
              <div className={`absolute inset-0 border-2 border-primary-500 transition-opacity duration-300 pointer-events-none ${formatHovered ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Info */}
            <div className="lg:col-span-5 bg-white p-8 flex flex-col justify-center border-l border-foreground-950/15 lg:h-[480px] overflow-y-auto">
              <div className="w-12 h-12 flex items-center justify-center bg-foreground-950 mb-5">
                <i className={`${FORMATS[activeFormat].icon} text-xl text-primary-500`}></i>
              </div>
              <h3 className="text-2xl font-black text-foreground-950 mb-4 uppercase">{FORMATS[activeFormat].title}</h3>
              <p className="text-foreground-950/65 text-base leading-relaxed mb-8">{FORMATS[activeFormat].desc}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(FORMATS[activeFormat].title + ' anfragen')}`}
                className="inline-flex items-center gap-2 bg-foreground-950 text-white px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer self-start"
              >
                Mehr erfahren <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>

          {/* Format pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {FORMATS.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFormat(i)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeFormat === i ? 'bg-foreground-950 text-primary-500' : 'border border-foreground-950/15 text-foreground-950/50 hover:border-[#111]/40 hover:text-foreground-950'
                }`}
              >
                <i className={`${f.icon} text-sm`}></i>
                {f.title}
              </button>
            ))}
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
