import SectionBadge from '@/components/base/SectionBadge';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

export default function TeamCTA() {
  const tBadge = useText('team_cta', 'team-cta-badge', 'Werde Teil des Teams');
  const tHeading = useText('team_cta', 'team-cta-heading', 'BEREIT ANZUPACKEN?');
  const tSub = useText('team_cta', 'team-cta-sub', 'Wenn du Lust hast, bei uns wirklich etwas zu bewegen, dann bewirb dich jetzt.');
  const tBtn1 = useText('team_cta', 'team-cta-btn-1', 'Offene Stellen ansehen');
  const tBtn2 = useText('team_cta', 'team-cta-btn-2', 'Initiativbewerbung');
  return (
    <section className="py-20 md:py-28 bg-[#111] relative overflow-hidden">
      {/* Lime ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#C8D400]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <SectionBadge text={tBadge} variant="light" className="mb-8" />

        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          {tHeading}
        </h2>

        <p className="text-base md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          {tSub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="/karriere"
            className="w-full sm:w-auto px-8 py-4 bg-[#C8D400] text-[#111] font-black uppercase tracking-wider hover:bg-white transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
            style={{ borderRadius: 0 }}
          >
            {tBtn1}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-black uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
            style={{ borderRadius: 0 }}
          >
            {tBtn2}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-white/50 hover:text-[#C8D400] transition-colors text-sm cursor-pointer">
            <i className="ri-mail-line"></i>
            info@sonic-group.de
          </a>
          <span className="hidden sm:block w-1 h-1 bg-white/20" />
          <a href="tel:+4921514794440" className="flex items-center gap-2 text-white/50 hover:text-[#C8D400] transition-colors text-sm cursor-pointer">
            <i className="ri-phone-line"></i>
            +49 2151 479 444 0
          </a>
        </div>
      </div>
    </section>
  );
}
