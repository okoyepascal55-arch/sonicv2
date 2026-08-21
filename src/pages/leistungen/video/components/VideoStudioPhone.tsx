import { useState } from 'react';
import PhoneFrame from '@/components/base/PhoneFrame';

const STUDIO_IMG = 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/f404951b-e9f8-4063-b803-e1145f43d540_DSC02106-Kopie.jpg';

interface Touchpoint {
  icon: string;
  label: string;
  tag: string;
  desc: string;
}

const TOUCHPOINTS: Touchpoint[] = [
  {
    icon: 'ri-global-line',
    label: 'Website-Button',
    tag: 'ONLINE',
    desc: 'Ein Klick auf der Homepage oder im Shop — Besucher verbinden sich direkt mit dem Live-Studio. Kein Download, kein Login. Nur ein Button, und die Beratung beginnt.',
  },
  {
    icon: 'ri-qr-code-line',
    label: 'QR-Codes',
    tag: 'SCAN',
    desc: 'Auf Displays, Flyern, Plakaten, Messeständen — überall scannbar. Die Kamera öffnen, scannen, und in unter 2 Sekunden ist der Kunde live mit einem Berater verbunden.',
  },
  {
    icon: 'ri-store-2-line',
    label: 'POS Material',
    tag: 'RETAIL',
    desc: 'Wobbler, Regalstopper, Aufsteller, Thekendisplays — physische Touchpoints am Point of Sale, die Shopper per QR-Code ins Live-Studio holen. Direkt am Regal.',
  },
  {
    icon: 'ri-layout-grid-line',
    label: 'POS Möbel',
    tag: 'FIXTURE',
    desc: 'Regalschienen, Displays, Theken — fest installierte Touchpoints für dauerhafte Studio-Erreichbarkeit. Die Marke ist immer nur einen Scan entfernt.',
  },
  {
    icon: 'ri-archive-line',
    label: 'Produktverpackung',
    tag: 'PACKAGE',
    desc: 'QR-Code direkt auf der Verpackung — der Kunde scannt das Produkt und wird sofort mit einem Produktexperten verbunden. Auch nach dem Kauf, für Support & Setup.',
  },
];

interface Outcome {
  icon: string;
  label: string;
  tag: string;
  desc: string;
}

const OUTCOMES: Outcome[] = [
  {
    icon: 'ri-ticket-2-line',
    label: 'Coupons',
    tag: 'CONVERT',
    desc: 'Live-Berater erstellen während des Calls personalisierte Rabatt-Codes — direkt aufs Smartphone. Steigert die Conversion-Rate am POS massiv und macht aus Interessenten Käufer.',
  },
  {
    icon: 'ri-customer-service-2-line',
    label: 'Service-Anfragen',
    tag: 'SUPPORT',
    desc: 'Kundenfragen werden live beantwortet oder strukturiert ans Customer Service Team weitergeleitet — in Echtzeit, mit vollständigem Gesprächsprotokoll. Keine Warteschleife, kein Ticket-Chaos.',
  },
  {
    icon: 'ri-bar-chart-box-line',
    label: 'Daten & Insights',
    tag: 'ANALYSE',
    desc: 'Jede Interaktion wird getrackt: Scan-Quelle, Gesprächsdauer, Conversion, Kundenfeedback, Retourenverhalten — alles live im SRT Dashboard. Automatisch. In Echtzeit.',
  },
];

function PhoneStudio() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <img
        src={STUDIO_IMG}
        alt="LVP Studio"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      {/* LIVE badge */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-red-500 px-2 py-1">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <span className="text-white text-3xs font-black uppercase tracking-widest">LIVE</span>
      </div>
      {/* Signal quality */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        {[3, 5, 7, 9].map((h, i) => (
          <div key={i} className="w-1 bg-[#C8D400]" style={{ height: `${h}px` }} />
        ))}
      </div>
      {/* Advisor info + chat */}
      <div className="absolute bottom-14 left-2.5 right-2.5 bg-black/70 backdrop-blur-sm p-2">
        <div className="text-white/60 text-3xs font-semibold mb-0.5">Berater · Sarah K.</div>
        <div className="text-white text-3xs font-medium leading-tight">
          &ldquo;Willkommen im LVP Studio! Wie kann ich helfen?&rdquo;
        </div>
      </div>
      {/* Outcome pills floating inside phone */}
      <div className="absolute top-12 right-2 flex flex-col gap-1">
        <div className="bg-[#C8D400] text-[#111] text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5">
          <i className="ri-ticket-2-line mr-0.5 text-3xs" />-15% Coupon
        </div>
        <div className="bg-white/20 backdrop-blur-sm text-white text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5">
          <i className="ri-bar-chart-box-line mr-0.5 text-3xs" />Getrackt
        </div>
      </div>
      {/* Call controls */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
        <div className="w-9 h-9 bg-[#333]/90 flex items-center justify-center cursor-pointer rounded-full">
          <i className="ri-mic-line text-white text-sm" />
        </div>
        <div className="w-9 h-9 bg-[#C8D400] flex items-center justify-center cursor-pointer rounded-full">
          <i className="ri-play-fill text-[#111] text-sm ml-0.5" />
        </div>
        <div className="w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer rounded-full">
          <i className="ri-phone-line text-white text-sm" />
        </div>
      </div>
    </div>
  );
}

export default function VideoStudioPhone() {
  const [activeTouchpoint, setActiveTouchpoint] = useState(0);
  const [activeOutcome, setActiveOutcome] = useState(0);

  return (
    <section id="beispiele" className="bg-[#111] py-20 md:py-28 px-4 md:px-6 relative overflow-hidden">
      {/* Ambient glow — single subtle one */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C8D400]/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 bg-[#C8D400]" />
            <span className="text-[#C8D400] text-xs font-black uppercase tracking-[0.25em]">LVP Ökosystem — Unendliche Möglichkeiten</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3 uppercase">
            Ein Scan. Unendlich viele
            <span className="block text-[#C8D400]">Berührungspunkte.</span>
          </h2>
          <p className="text-white/45 text-base max-w-2xl">
            Vom Website-Button über QR-Codes am POS bis zum Code auf der Verpackung — deine Marke ist überall nur einen Scan vom Live-Studio entfernt. Und dort passiert die Magie: Beratung, Coupons, Service, Daten.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-0 border border-white/10">

          {/* LEFT: Phone only — clean, no distractions */}
          <div className="bg-[#1a1a1a] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative min-h-[520px] lg:min-h-[600px]">
            <div className="relative" style={{ width: '280px' }}>
              <PhoneFrame width={280}>
                <div className="bg-[#111] relative" style={{ height: 474 }}>
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-3 pt-2 pb-1 bg-[#0d0d0d] relative z-10">
                    <span className="text-white text-3xs font-bold">9:41</span>
                    <div className="flex items-center gap-1 text-white">
                      <i className="ri-signal-tower-fill text-3xs" />
                      <i className="ri-wifi-fill text-3xs" />
                      <i className="ri-battery-fill text-[#C8D400] text-3xs" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0" style={{ top: '30px' }}>
                    <PhoneStudio />
                  </div>
                </div>
              </PhoneFrame>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="text-white/25 text-2xs font-black uppercase tracking-[0.2em]">LVP Studio — Live in &lt;2s</span>
            </div>
          </div>

          {/* RIGHT: Content — Touchpoints, Studio, Outcomes, CTAs */}
          <div className="p-5 md:p-10 flex flex-col gap-6">

            {/* ── 1. Touchpoints ── */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-[#C8D400]" />
                <span className="text-white/30 text-2xs font-black uppercase tracking-[0.2em]">5 Einstiegspunkte</span>
              </div>

              {/* Touchpoint tabs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {TOUCHPOINTS.map((tp, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTouchpoint(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-2xs font-black uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                      activeTouchpoint === i
                        ? 'bg-[#C8D400] text-[#111]'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    <i className={`${tp.icon} text-xs`} />
                    {tp.label}
                  </button>
                ))}
              </div>

              {/* Active touchpoint detail */}
              <div className="border border-white/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#C8D400]/10 flex items-center justify-center flex-shrink-0 border border-[#C8D400]/25">
                    <i className={`${TOUCHPOINTS[activeTouchpoint].icon} text-base text-[#C8D400]`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#C8D400] text-3xs font-black uppercase tracking-widest">{TOUCHPOINTS[activeTouchpoint].tag}</span>
                      <span className="text-white text-sm font-black">{TOUCHPOINTS[activeTouchpoint].label}</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{TOUCHPOINTS[activeTouchpoint].desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 2. Studio Hub — compact stats card ── */}
            <div className="border border-[#C8D400]/15 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-black uppercase tracking-wider">LVP Studio</span>
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { val: '1 Gbit/s', label: 'Glasfaser' },
                    { val: '99.9%', label: 'Uptime' },
                    { val: '<2s', label: 'Connect' },
                  ].map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[#C8D400] text-2xs font-black">{m.val}</div>
                      <div className="text-white/25 text-3xs uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Geschulte Markenbotschafter antworten in Echtzeit per Video. Vom ersten Scan bis zum Gespräch vergehen unter 2 Sekunden.
              </p>
            </div>

            {/* ── 3. Outcomes ── */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 bg-[#C8D400]" />
                <span className="text-white/30 text-2xs font-black uppercase tracking-[0.2em]">3 Outcomes aus jedem Call</span>
              </div>

              {/* Outcome tabs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {OUTCOMES.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveOutcome(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-2xs font-black uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                      activeOutcome === i
                        ? 'bg-[#C8D400] text-[#111]'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    <i className={`${o.icon} text-xs`} />
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Active outcome detail */}
              <div className="border border-white/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#C8D400]/10 flex items-center justify-center flex-shrink-0 border border-[#C8D400]/25">
                    <i className={`${OUTCOMES[activeOutcome].icon} text-base text-[#C8D400]`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#C8D400] text-3xs font-black uppercase tracking-widest">{OUTCOMES[activeOutcome].tag}</span>
                      <span className="text-white text-sm font-black">{OUTCOMES[activeOutcome].label}</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{OUTCOMES[activeOutcome].desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CTAs ── */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="mailto:info@sonic-promo.de?subject=Live-Demo anfragen"
                className="flex-1 flex items-center justify-center gap-2 bg-[#C8D400] text-[#111] py-3 font-black text-xs uppercase tracking-wider hover:bg-white hover:text-[#111] transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Live-Demo anfragen
                <i className="ri-arrow-right-line" />
              </a>
              <a
                href="/fallbeispiele"
                className="px-6 py-3 border border-white/15 text-white font-black text-xs uppercase tracking-wider hover:border-[#C8D400] hover:text-[#C8D400] transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Case Studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}