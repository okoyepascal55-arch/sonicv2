import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

export default function TeamCTA() {
  const tBadge = useText('team_cta', 'team-cta-badge', 'Werde Teil des Teams');
  const tHeading = useText('team_cta', 'team-cta-heading', 'BEREIT ANZUPACKEN?');
  const tSub = useText('team_cta', 'team-cta-sub', 'Wenn du Lust hast, bei uns wirklich etwas zu bewegen, dann bewirb dich jetzt.');
  const tBtn1 = useText('team_cta', 'team-cta-btn-1', 'Offene Stellen ansehen');
  const tBtn2 = useText('team_cta', 'team-cta-btn-2', 'Initiativbewerbung');
  return (
    <section className="sonic-section-lg md:bg-foreground-950 relative overflow-hidden">
      {/* Lime ambient glow */}

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
          </div>

        <h2 className="sonic-h2 text-white mb-4">
          {tHeading}
        </h2>

        <p className="text-base md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          {tSub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="/karriere"
            className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-foreground-950 font-black uppercase tracking-wider hover:bg-white transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
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
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-white/50 hover:text-primary-500 transition-colors text-sm cursor-pointer">
            <i className="ri-mail-line"></i>
            info@sonic-group.de
          </a>
          <span className="hidden sm:block w-1 h-1 bg-white/20" />
          <a href="tel:+4921514794440" className="flex items-center gap-2 text-white/50 hover:text-primary-500 transition-colors text-sm cursor-pointer">
            <i className="ri-phone-line"></i>
            +49 2151 479 444 0
          </a>
        </div>
      </div>
    </section>
  );
}
