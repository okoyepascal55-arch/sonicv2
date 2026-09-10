
// Detect what type of media a URL is so we render the right element
function getMediaType(url: string | null): 'youtube' | 'video' | 'image' | null {
  if (!url) return null;
  const u = url.toLowerCase();
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.match(/\.(mp4|webm|mov|ogg)(\?|$)/)) return 'video';
  return 'image';
}

function extractYouTubeId(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m?.[1] ?? '';
}

// Renders the right element for the screen content (image, video, or YouTube)
function ScreenMedia({ src, alt, objectPosition = 'object-top' }: { src: string | null; alt: string; objectPosition?: string }) {
  const type = getMediaType(src);
  if (!src || !type) return null;
  if (type === 'youtube') {
    const id = extractYouTubeId(src);
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1`}
        title={alt}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ pointerEvents: 'none' }}
      />
    );
  }
  if (type === 'video') {
    return (
      <video
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
      />
    );
  }
  return (
    <img src={src} alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${objectPosition}`}
      loading="lazy" />
  );
}

import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

/** Laptop frame — pure CSS, no external deps. Screen fills with dashboard content. */
function LaptopMockup({ src }: { src: string | null }) {
  return (
    <div className="relative w-full select-none" style={{ maxWidth: 660 }}>
      {/* Screen unit */}
      <div className="relative w-full" style={{ paddingBottom: '64%' }}>
        {/* Outer bezel */}
        <div className="absolute inset-0 overflow-hidden"
          style={{ background: 'oklch(0.14 0.005 118)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}>
          {/* Inner screen area */}
          <div className="absolute" style={{ inset: 10, background: 'oklch(0.09 0.004 118)', overflow: 'hidden' }}>
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-3 flex-shrink-0"
              style={{ height: 28, background: 'oklch(0.10 0.004 118)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex gap-1.5">
                {['bg-red-500/50', 'bg-yellow-500/50', 'bg-green-500/50'].map((c, i) => (
                  <div key={i} className={`w-[9px] h-[9px] rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 mx-4 h-[16px] rounded-sm flex items-center px-2"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <span className="text-[8px] text-white/25">app.sonic-srt.de/dashboard</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[7px] h-[7px] rounded-full bg-green-400/70 animate-pulse" />
                <span className="text-[7px] text-white/30">Live</span>
              </div>
            </div>
            {/* Screen content */}
            <div className="relative" style={{ height: 'calc(100% - 28px)', background: 'oklch(0.10 0.004 118)' }}>
              {src ? (
                <ScreenMedia src={src} alt="SRT Desktop Dashboard" objectPosition="object-top" />
              ) : (
                <DesktopPlaceholder />
              )}
            </div>
          </div>
          {/* Camera */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[5px] w-2 h-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>
      </div>
      {/* Hinge + base */}
      <div className="relative mt-[-1px]">
        <div className="h-[10px] mx-[3%]" style={{ background: 'oklch(0.17 0.005 118)', borderRadius: '0 0 3px 3px', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }} />
        <div className="h-[5px] mx-[-2%]" style={{ background: 'oklch(0.13 0.004 118)', borderRadius: '0 0 4px 4px' }} />
      </div>
    </div>
  );
}

/** Built-in desktop placeholder — a mini but believable analytics UI */
function DesktopPlaceholder() {
  return (
    <div className="absolute inset-0 flex overflow-hidden" style={{ fontSize: '7px' }}>
      {/* Sidebar */}
      <div className="flex-shrink-0 flex flex-col py-3 gap-1" style={{ width: 44, background: 'oklch(0.09 0.004 118)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-center h-9 mb-3">
          <div className="w-5 h-5 bg-primary-500/80 flex items-center justify-center">
            <i className="ri-lightning-fill text-foreground-950" style={{ fontSize: 9 }} />
          </div>
        </div>
        {[
          { ic: 'ri-dashboard-line', active: true },
          { ic: 'ri-map-pin-2-line', active: false },
          { ic: 'ri-team-line', active: false },
          { ic: 'ri-bar-chart-grouped-line', active: false },
          { ic: 'ri-file-chart-line', active: false },
        ].map(({ ic, active }, i) => (
          <div key={i} className="flex items-center justify-center h-8"
            style={{ background: active ? 'oklch(0.81 0.19 115 / 0.12)' : 'transparent', borderLeft: active ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}>
            <i className={ic} style={{ color: active ? 'oklch(0.81 0.19 115)' : 'rgba(255,255,255,0.25)', fontSize: 11 }} />
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 flex-shrink-0"
          style={{ height: 32, background: 'oklch(0.10 0.004 118)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Leistungsübersicht · KW 16</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Live · 14:32 Uhr</span>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 p-3 grid grid-rows-[auto_1fr_auto] gap-2 overflow-hidden">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { l: 'Umsatz heute', v: '€ 24.180', d: '+6,4 %', up: true },
              { l: 'Aktive Einsätze', v: '147', d: '+12', up: true },
              { l: 'Ziel-Erreichung', v: '91,2 %', d: '−2.1%', up: false },
              { l: 'Offene Aufgaben', v: '23', d: '−5', up: true },
            ].map((k, i) => (
              <div key={i} className="p-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>{k.l}</div>
                <div style={{ color: '#fff', fontWeight: 900, fontSize: 12 }}>{k.v}</div>
                <div style={{ color: k.up ? 'oklch(0.81 0.19 115)' : '#f87171', fontWeight: 700 }}>{k.d}</div>
              </div>
            ))}
          </div>
          {/* Chart + map row */}
          <div className="grid grid-cols-3 gap-1.5 min-h-0">
            <div className="col-span-2 p-2 flex flex-col" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Tages-Umsatz</div>
              <div className="flex-1 flex items-end gap-px">
                {[42,58,35,72,88,65,90,78,55,82,75,95].map((h, i) => (
                  <div key={i} className="flex-1" style={{ height: `${h}%`, background: i === 11 ? 'oklch(0.81 0.19 115)' : 'oklch(0.81 0.19 115 / 0.25)', transition: 'height 0.3s' }} />
                ))}
              </div>
            </div>
            <div className="p-2 flex flex-col" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Top-Standorte</div>
              {['Berlin Mitte', 'Hamburg Alster', 'München Max'].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>{s}</span>
                  <div style={{ height: 4, width: `${[80, 65, 50][i]}%`, background: 'oklch(0.81 0.19 115 / 0.5)', maxWidth: 40 }} />
                </div>
              ))}
            </div>
          </div>
          {/* Table */}
          <div style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="grid grid-cols-4 px-2 py-1" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
              {['Mitarbeiter', 'Standort', 'Status', 'Umsatz'].map(h => <span key={h}>{h}</span>)}
            </div>
            {[['S. Müller', 'Berlin Mitte', 'Aktiv', '€890'], ['K. Weber', 'Hamburg', 'Check-in', '€720'], ['M. Fischer', 'München', 'Aktiv', '€660']].map(([n,l,s,v], i) => (
              <div key={i} className="grid grid-cols-4 px-2 py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{n}</span>
                <span>{l}</span>
                <span style={{ color: s === 'Aktiv' ? 'oklch(0.81 0.19 115)' : 'rgba(255,255,255,0.4)' }}>{s}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Phone mockup — clean CSS device */
function PhoneMockup({ src }: { src: string | null }) {
  return (
    <div className="relative mx-auto" style={{ width: 200 }}>
      <div className="relative w-full" style={{ paddingBottom: '214%' }}>
        <div className="absolute inset-0 overflow-hidden"
          style={{ background: 'oklch(0.13 0.005 118)', borderRadius: 28, border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 z-20" style={{ height: 28 }}>
            <span className="text-[8px] font-bold text-white/60">9:41</span>
            <div className="w-14 h-4 rounded-full" style={{ background: 'oklch(0.09 0.004 118)' }} />
            <div className="flex items-center gap-1">
              <i className="ri-wifi-line text-white/50" style={{ fontSize: 9 }} />
              <i className="ri-battery-2-charge-line text-white/50" style={{ fontSize: 9 }} />
            </div>
          </div>
          {/* Screen */}
          <div className="absolute" style={{ top: 28, bottom: 8, left: 2, right: 2, overflow: 'hidden', background: 'oklch(0.10 0.004 118)' }}>
            {src ? (
              <ScreenMedia src={src} alt="SRT Mobile App" objectPosition="object-top" />
            ) : (
              <MobilePlaceholder />
            )}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    </div>
  );
}

function MobilePlaceholder() {
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ fontSize: '7px' }}>
      {/* App nav bar */}
      <div className="flex items-center justify-between px-3 py-2 flex-shrink-0" style={{ background: 'oklch(0.12 0.005 118)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ color: 'oklch(0.81 0.19 115)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>SRT</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Live</span>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden p-2.5 flex flex-col gap-2">
        <div style={{ color: 'oklch(0.81 0.19 115)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 2 }}>Meine Einsätze</div>
        {/* Active shift card */}
        <div className="relative overflow-hidden p-2.5" style={{ background: 'oklch(0.15 0.005 118)', border: '1px solid oklch(0.81 0.19 115 / 0.35)', borderLeft: '2px solid oklch(0.81 0.19 115)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 flex items-center justify-center" style={{ background: 'oklch(0.81 0.19 115 / 0.15)' }}>
                <i className="ri-store-2-line" style={{ color: 'oklch(0.81 0.19 115)', fontSize: 8 }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>MediaMarkt Berlin</span>
            </div>
            <span style={{ color: 'oklch(0.81 0.19 115)', fontWeight: 900 }}>10–18 Uhr</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            <span className="px-1.5 py-0.5" style={{ background: 'oklch(0.81 0.19 115 / 0.15)', color: 'oklch(0.81 0.19 115)', fontWeight: 700 }}>Samsung S25</span>
            <span className="px-1.5 py-0.5" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>Brand-Promoter</span>
            <span className="px-1.5 py-0.5 ml-auto" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', fontWeight: 700 }}>Heute</span>
          </div>
        </div>
        {/* Mini KPI row */}
        <div className="grid grid-cols-2 gap-1.5">
          {[{ l: 'Ziel', v: '24 Stk', p: 75 }, { l: 'Verkauft', v: '18 Stk', p: 60 }].map((k) => (
            <div key={k.l} className="p-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ color: 'rgba(255,255,255,0.35)' }}>{k.l}</div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 10, marginTop: 2 }}>{k.v}</div>
              <div className="mt-1" style={{ height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}>
                <div style={{ height: '100%', width: `${k.p}%`, background: 'oklch(0.81 0.19 115)', borderRadius: 1 }} />
              </div>
            </div>
          ))}
        </div>
        {/* GPS check-in button */}
        <button className="w-full py-2 font-black text-foreground-950 uppercase tracking-wider" style={{ background: 'oklch(0.81 0.19 115)', fontSize: 8 }}>
          <i className="ri-map-pin-2-line mr-1" />GPS Check-in
        </button>
      </div>
      {/* Bottom tabs */}
      <div className="flex-shrink-0 flex" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'oklch(0.11 0.005 118)' }}>
        {[{ ic: 'ri-calendar-check-line', l: 'Einsätze', a: true }, { ic: 'ri-focus-3-line', l: 'Ziele', a: false }, { ic: 'ri-money-euro-circle-line', l: 'Abrechnung', a: false }].map(({ ic, l, a }) => (
          <div key={l} className="flex-1 flex flex-col items-center py-2 gap-0.5" style={{ opacity: a ? 1 : 0.4 }}>
            <i className={ic} style={{ color: a ? 'oklch(0.81 0.19 115)' : 'rgba(255,255,255,0.5)', fontSize: 12 }} />
            <span style={{ color: a ? 'oklch(0.81 0.19 115)' : 'rgba(255,255,255,0.4)', fontWeight: a ? 700 : 400 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const { images: desktopImages } = useMediaStore('srt_product_desktop');
  const { images: mobileImages } = useMediaStore('srt_product_mobile');

  const desktopSrc = desktopImages[0]?.url ? resolveImageUrl(desktopImages[0].url) : null;
  const mobileSrc  = mobileImages[0]?.url  ? resolveImageUrl(mobileImages[0].url)  : null;

  const tBadge   = useText('srt_showcase', 'srt-showcase-badge',   'Das Produkt');
  const tHeading = useText('srt_showcase', 'srt-showcase-heading', 'Desktop & Mobile — eine Plattform.');
  const tSub     = useText('srt_showcase', 'srt-showcase-sub',     'Das SRT läuft vollständig im Browser und als native App — mit identischer Datenbasis und synchronem Status in Echtzeit.');

  return (
    <section id="produkt" className="relative overflow-hidden bg-foreground-950 py-20 md:py-28">
      {/* Subtle data grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(oklch(0.81 0.19 115) 1px, transparent 1px), linear-gradient(90deg, oklch(0.81 0.19 115) 1px, transparent 1px)', backgroundSize: '56px 56px' }}
        aria-hidden="true" />

      {/* Radial lime glow — center background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '70%', height: '60%', background: 'radial-gradient(ellipse, oklch(0.81 0.19 115 / 0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
        aria-hidden="true" />

      <div className="sonic-container relative z-10 px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
            <span className="w-7 h-0.5 bg-primary-500" />
          </div>
          <h2 className="sonic-h2 text-white uppercase mb-4">{tHeading}</h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">{tSub}</p>
        </div>

        {/* Device showcase */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-6">

          {/* Desktop mockup — main */}
          <div className="w-full lg:w-[65%] xl:w-[62%]">
            <LaptopMockup src={desktopSrc} />
            <div className="flex items-center gap-2 mt-4 justify-center">
              <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" style={{ borderRadius: '50%' }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Desktop · Web-Browser</span>
            </div>
          </div>

          {/* Divider line desktop */}
          <div className="hidden lg:block w-px self-stretch" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />

          {/* Phone mockup */}
          <div className="w-full lg:w-[28%] xl:w-[26%] max-w-[220px] lg:max-w-none mx-auto">
            <PhoneMockup src={mobileSrc} />
            <div className="flex items-center gap-2 mt-4 justify-center">
              <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" style={{ borderRadius: '50%', animationDelay: '0.5s' }} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Mobil · iOS & Android</span>
            </div>
          </div>
        </div>


        {/* App capabilities strip — content from EmployeeApp, merged here */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] mt-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {[
            { number: '01', icon: 'ri-calendar-check-line', title: 'Aufgaben einsehen',        desc: 'Einsätze, Zeiten und Standort — auf einen Blick im Smartphone.' },
            { number: '02', icon: 'ri-map-pin-2-line',       title: 'GPS Check-in',             desc: 'Eincheckung nur vor Ort möglich. Zeiterfassung startet automatisch.' },
            { number: '03', icon: 'ri-focus-3-line',          title: 'Zielerreichung tracken', desc: 'Ziele und Verkaufstaktiken live einsehen und direkt handeln.' },
            { number: '04', icon: 'ri-money-euro-circle-line',title: 'Abrechnung erhalten',    desc: 'Transparente Gehaltsabrechnung mit Provisionen direkt in der App.' },
          ].map((step) => (
            <div key={step.number} className="p-5 flex flex-col gap-3" style={{ background: 'oklch(0.14 0.005 118)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'oklch(0.81 0.19 115 / 0.12)', border: '1px solid oklch(0.81 0.19 115 / 0.25)' }}>
                  <i className={`${step.icon} text-sm text-primary-500`} />
                </div>
                <span className="text-[9px] font-black text-white/20">{step.number}</span>
              </div>
              <h4 className="text-[12px] font-black text-white uppercase leading-snug">{step.title}</h4>
              <p className="text-[11px] text-white/35 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Platform badges */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-1.5" style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <i className="ri-apple-line text-white/60 text-sm" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">iOS</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5" style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
            <i className="ri-android-line text-white/60 text-sm" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">Android</span>
          </div>
          <span className="text-[10px] text-white/25 font-bold">· Offline-fähig</span>
        </div>

        {/* CTA below devices */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <div className="text-center sm:text-left">
            <p className="text-white font-black text-sm">Bereit, das SRT live zu sehen?</p>
            <p className="text-white/35 text-xs">Wir richten einen Demo-Zugang in 48 Stunden ein.</p>
          </div>
          <a href="#preise-zugang"
            onClick={(e) => { e.preventDefault(); document.getElementById('preise-zugang')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-widest whitespace-nowrap hover:bg-white transition-colors">
            Demo anfragen <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}
