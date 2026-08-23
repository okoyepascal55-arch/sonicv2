import { useState } from 'react';

interface VideoClient {
  brand: string;
  logo: string;
  category: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  channel: string;
}

const VIDEO_CLIENTS: VideoClient[] = [
  {
    brand: 'PHILIPS TV & SOUND',
    logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887',
    category: 'Consumer Electronics',
    quote: '„Mit Sonic\'s Live-Video-Beratung konnten wir unsere Online-Conversion Rate signifikant steigern. Die Produktexperten kennen unsere Geräte in- und auswendig — das spüren die Kunden sofort."',
    author: 'Murat Yatkin',
    role: 'Managing Director DACH',
    company: 'Philips TV & Sound @TP Vision',
    metric: '+34%',
    metricLabel: 'Conversion Rate',
    channel: 'E-Commerce + Retail Display',
  },
  {
    brand: 'GARMIN',
    logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    category: 'Sports & Navigation',
    quote: '„Die Live-Video-Calls haben unsere Beratungsqualität auf ein neues Level gehoben. Kunden, die per Video beraten wurden, kaufen häufiger und retournieren seltener."',
    author: 'Dana Eichinger',
    role: 'Director Marketing DACH',
    company: 'Garmin Deutschland GmbH',
    metric: '-28%',
    metricLabel: 'Retourenquote',
    channel: 'Live-Video-Beratung 1:1',
  },
  {
    brand: 'NESPRESSO',
    logo: 'https://cdn.brandfetch.io/idaYSyWs1H/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668078167864',
    category: 'Lifestyle & Food',
    quote: '„Sonic hat für uns ein komplettes Live-Video-Programm aufgebaut — von der Schulung der Presenter bis zur technischen Infrastruktur. Alles aus einer Hand, alles professionell."',
    author: 'Veronika Vriens',
    role: 'B2C Commercial Excellence',
    company: 'Nespresso Deutschland GmbH',
    metric: '>50K',
    metricLabel: 'Live Calls p.a.',
    channel: 'Sales Broadcast + 1:1',
  },
  {
    brand: 'GROUPE SEB',
    logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    category: 'Home Appliances',
    quote: '„Das Phygital-Konzept von Sonic ist genau das, was wir gesucht haben: Video im E-Commerce, Field Force im Retail — perfekt aufeinander abgestimmt."',
    author: 'Ramin Dirinpur',
    role: 'Sales Promotion Manager',
    company: 'Groupe SEB Deutschland GmbH',
    metric: 'Ø 6 Min.',
    metricLabel: 'Beratungsdauer',
    channel: 'Phygital (Video + Field)',
  },
  {
    brand: "L'ORÉAL",
    logo: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    category: 'Beauty & Personal Care',
    quote: '„Unsere Beauty-Advisor im Video-Studio sind echte Markenbotschafter. Die Qualität der Beratung ist auf Augenhöhe mit dem stationären Handel — das ist der Unterschied."',
    author: 'Sophie Müller',
    role: 'Field Sales Manager DACH',
    company: "L'Oréal Deutschland GmbH",
    metric: '4.8/5',
    metricLabel: 'Kundenzufriedenheit',
    channel: 'Live-Video-Beratung',
  },
  {
    brand: 'WMF',
    logo: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    category: 'Premium Kitchenware',
    quote: '„Der QR-Code am Regal, der direkt in unser Video-Studio führt, war ein Game-Changer. Kunden, die sonst keinen Ansprechpartner gefunden hätten, werden jetzt live beraten."',
    author: 'Thomas Becker',
    role: 'Head of Trade Marketing',
    company: 'WMF Group GmbH',
    metric: '3x',
    metricLabel: 'Mehr Beratungskontakte',
    channel: 'Retail QR-Code + Video',
  },
];

const LOGO_STRIP = [
  { brand: 'PHILIPS', logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887' },
  { brand: 'GARMIN', logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { brand: 'NESPRESSO', logo: 'https://cdn.brandfetch.io/idaYSyWs1H/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668078167864' },
  { brand: 'GROUPE SEB', logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { brand: "L'ORÉAL", logo: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { brand: 'WMF', logo: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
];

const AGGREGATE_STATS = [
  { val: '>50.000', label: 'Live Video Calls', icon: 'ri-video-line' },
  { val: 'Ø 4.8/5', label: 'Kundenzufriedenheit', icon: 'ri-star-line' },
  { val: '-28%', label: 'Retourenquote', icon: 'ri-arrow-down-line' },
  { val: '+34%', label: 'Conversion Rate', icon: 'ri-arrow-up-line' },
];

export default function VideoReferenzen() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="referenzen" className="bg-white py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8D400]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8D400]/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#111]/10 border border-[#111]/15 px-4 py-1.5 mb-5">
            <i className="ri-chat-quote-line text-[#111] text-sm"></i>
            <span className="text-xs font-black text-[#111] uppercase tracking-widest">Referenzen</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#111] leading-tight mb-3 uppercase">
                Marken, die mit<br />
                <span className="text-[#C8D400]">Live Video</span> wachsen.
              </h2>
              <p className="text-[#111]/55 text-base max-w-xl">
                Echte Ergebnisse. Echte Kunden. Echte Zahlen aus laufenden Live-Video-Projekten.
              </p>
            </div>
            <a
              href="/fallbeispiele"
              className="inline-flex items-center gap-2 border border-[#111]/20 text-[#111]/70 px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer self-start lg:self-auto"
            >
              Alle Case Studies
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>

        {/* Aggregate stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[#111]/12 bg-white mb-12">
          {AGGREGATE_STATS.map((stat, i) => (
            <div
              key={i}
              className={`p-6 flex items-center gap-4 ${i < 3 ? 'border-r border-[#111]/10' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-[#111]/10' : ''}`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#C8D400]/15 border border-[#C8D400]/25 flex-shrink-0">
                <i className={`${stat.icon} text-base text-[#111]`}></i>
              </div>
              <div>
                <div className="text-2xl font-black text-[#111] leading-none">{stat.val}</div>
                <div className="text-[#111]/45 text-xs font-bold uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main testimonial layout — split panel */}
        <div className="grid lg:grid-cols-12 gap-0 border border-[#111]/12 bg-white mb-8">

          {/* Left: client list */}
          <div className="lg:col-span-4 border-r border-[#111]/10">
            {VIDEO_CLIENTS.map((client, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                className={`w-full flex items-center gap-4 p-5 text-left transition-all duration-200 cursor-pointer border-b border-[#111]/8 last:border-b-0 group ${
                  activeCard === i
                    ? 'bg-[#111]'
                    : 'bg-white hover:bg-white'
                }`}
              >
                {/* Active indicator */}
                <div
                  className={`w-1 h-10 flex-shrink-0 transition-all duration-200 ${
                    activeCard === i ? 'bg-[#C8D400]' : 'bg-transparent group-hover:bg-[#111]/15'
                  }`}
                />
                {/* Logo */}
                <div className={`w-12 h-10 flex items-center justify-center flex-shrink-0 p-1.5 border transition-all duration-200 ${
                  activeCard === i ? 'bg-white/10 border-white/20' : 'bg-white border-[#111]/8'
                }`}>
                  <img
                    src={client.logo}
                    alt={client.brand}
                    className={`w-full h-full object-contain transition-all duration-200 ${activeCard === i ? 'brightness-0 invert' : ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-black uppercase tracking-wider truncate transition-colors duration-200 ${activeCard === i ? 'text-white' : 'text-[#111]'}`}>
                    {client.brand}
                  </div>
                  <div className={`text-xs font-semibold mt-0.5 truncate transition-colors duration-200 ${activeCard === i ? 'text-[#C8D400]' : 'text-[#111]/40'}`}>
                    {client.category}
                  </div>
                </div>
                {/* Metric pill */}
                <div className={`flex-shrink-0 text-right transition-all duration-200 ${activeCard === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                  <div className={`text-sm font-black ${activeCard === i ? 'text-[#C8D400]' : 'text-[#111]'}`}>
                    {client.metric}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: active testimonial detail */}
          <div
            key={activeCard}
            className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-between"
            style={{ animation: 'fadeInRight 0.35s ease-out', minHeight: '420px' }}
          >
            {/* Top: brand + channel tag */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-14 flex items-center justify-center bg-white border border-[#111]/8 p-2 flex-shrink-0">
                  <img
                    src={VIDEO_CLIENTS[activeCard].logo}
                    alt={VIDEO_CLIENTS[activeCard].brand}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <div className="text-sm font-black text-[#111] uppercase tracking-wider">
                    {VIDEO_CLIENTS[activeCard].brand}
                  </div>
                  <div className="text-xs text-[#111]/45 font-semibold mt-0.5">
                    {VIDEO_CLIENTS[activeCard].category}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 bg-[#111] px-3 py-1.5">
                <span className="text-[#C8D400] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                  {VIDEO_CLIENTS[activeCard].channel}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1 mb-8">
              <i className="ri-double-quotes-l text-4xl text-[#C8D400]/30 block mb-3"></i>
              <p className="text-[#111]/75 text-lg leading-relaxed font-medium italic">
                {VIDEO_CLIENTS[activeCard].quote}
              </p>
            </div>

            {/* Bottom: author + metric */}
            <div className="flex items-end justify-between gap-6 pt-6 border-t border-[#111]/8">
              <div>
                <div className="font-black text-[#111] text-sm">{VIDEO_CLIENTS[activeCard].author}</div>
                <div className="text-xs text-[#111]/50 mt-0.5">{VIDEO_CLIENTS[activeCard].role}</div>
                <div className="text-xs text-[#C8D400] font-bold mt-0.5">{VIDEO_CLIENTS[activeCard].company}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-4xl font-black text-[#111] leading-none">
                  {VIDEO_CLIENTS[activeCard].metric}
                </div>
                <div className="text-xs font-black text-[#111]/40 uppercase tracking-widest mt-1">
                  {VIDEO_CLIENTS[activeCard].metricLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="border border-[#111]/10 bg-white">
          <div className="px-8 py-3 border-b border-[#111]/8">
            <span className="text-xs font-black text-[#111]/30 uppercase tracking-[0.25em]">
              Vertrauen von führenden Marken
            </span>
          </div>
          <div className="flex items-center justify-around flex-wrap gap-0 px-4 py-5">
            {LOGO_STRIP.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-6 py-3 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-default"
                style={{ minWidth: '100px' }}
              >
                <img
                  src={item.logo}
                  alt={item.brand}
                  className="h-7 w-auto object-contain grayscale"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
