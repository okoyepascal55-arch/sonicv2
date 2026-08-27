import { useText } from '@/hooks/useText';

const STATS = [
  { icon: 'ri-refresh-line', value: '<50 ms', label: 'Latenz' },
  { icon: 'ri-shield-keyhole-line', value: 'AES-256', label: 'Verschlüsselung' },
  { icon: 'ri-plug-line', value: '23+', label: 'API-Integrationen' },
  { icon: 'ri-time-line', value: '99,9%', label: 'Verfügbarkeit' },
];

export default function DataPaths() {
  const tBadge = useText('srt_datapaths', 'srt-data-badge', 'Datenfluss');
  const tHeading = useText('srt_datapaths', 'srt-data-heading', 'So fließen die Daten durch das SRT.');
  const tSub = useText('srt_datapaths', 'srt-data-p1', 'Das SRT ist das zentrale Nervensystem — es verbindet Sonic, Kunden, Mitarbeiter und externe Systeme in einer einzigen, synchronen Datenbasis.');

  return (
    <section id="datenfluss" className="sonic-section-lg px-4 md:px-6 bg-foreground-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500)) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="sonic-container relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tBadge}</span></div>
          <h2 className="sonic-h2 text-background-50 uppercase mb-3">{tHeading}</h2>
          <p className="text-background-50/45 text-sm leading-relaxed max-w-2xl">{tSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 items-center mb-10">
          <div className="text-center px-4 py-5 border border-background-50/10 bg-background-50/[0.03]"><i className="ri-global-line text-primary-500/60 text-2xl block mb-2" /><span className="text-[11px] font-black uppercase text-background-50/60">Externe Daten</span></div>
          <div className="hidden md:flex justify-center"><i className="ri-arrow-right-line text-primary-500 text-xl" /></div>
          <div className="text-center px-4 py-7 bg-primary-500 shadow-[0_0_40px_rgba(200,212,0,0.3)]"><i className="ri-cpu-line text-foreground-950 text-[26px] block mb-2" /><span className="text-xs font-black uppercase text-foreground-950">SRT</span></div>
          <div className="hidden md:flex justify-center"><i className="ri-arrow-right-line text-primary-500 text-xl" /></div>
          <div className="text-center px-4 py-5 border border-background-50/10 bg-background-50/[0.03]"><i className="ri-file-list-3-line text-primary-500/60 text-2xl block mb-2" /><span className="text-[11px] font-black uppercase text-background-50/60">Kunde</span></div>
        </div>
        <div className="grid md:grid-cols-2 gap-[3px] mb-10">
          <div className="flex items-center gap-3 px-5 py-4 bg-background-50/[0.03] border border-background-50/[0.08]"><i className="ri-user-star-line text-primary-500 text-base" /><span className="text-xs font-extrabold text-background-50/70">Sonic Agentur → Planung, Kampagnenziele, Briefings</span></div>
          <div className="flex items-center gap-3 px-5 py-4 bg-background-50/[0.03] border border-background-50/[0.08]"><i className="ri-smartphone-line text-primary-500 text-base" /><span className="text-xs font-extrabold text-background-50/70">Mitarbeiter → GPS-Check-in, Verkäufe, Fotos</span></div>
        </div>
        <div className="border-t border-background-50/[0.08] pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => <div key={stat.label} className="flex items-start gap-3"><div className="w-8 h-8 flex items-center justify-center border flex-shrink-0" style={{ borderColor: 'oklch(0.81 0.19 115 / 0.2)' }}><i className={`${stat.icon} text-primary-500 text-sm`} /></div><div><p className="m-0 text-base font-black text-primary-500">{stat.value}</p><p className="m-0 text-[10.5px] text-background-50/40">{stat.label}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}
