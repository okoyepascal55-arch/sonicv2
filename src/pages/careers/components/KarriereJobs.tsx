import { useEffect } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { ChapterNumeral, ChapterEyebrow } from './ChapterKit';

const BITE_LISTING_KEY = 'sonic-sales-support-gmbh:main-listing';

export default function KarriereJobs() {
  const { images: stellenImages } = useMediaStore('careers_stellenangebote_image');

  const tHeading = useText('careers_jobs', 'careers-jobs-heading', 'Dein nächster Karriereschritt');
  const tTanjaHeading = useText('careers_jobs', 'careers-jobs-tanja-heading', 'Unsicher, welche Stelle zu dir passt?');
  const tTanjaDesc = useText('careers_jobs', 'careers-jobs-tanja-desc', 'Tanja aus unserem HR-Team nimmt sich gerne Zeit für ein unverbindliches Gespräch.');
  const tTanjaCta = useText('careers_jobs', 'careers-jobs-tanja-cta', 'Mit Tanja sprechen');
  const tInitiativCta = useText('careers_jobs', 'careers-jobs-initiativ-cta', 'Initiativbewerbung');

  const headingFirst = tHeading.split(' ').slice(0, 2).join(' ');
  const headingRest = tHeading.split(' ').slice(2).join(' ');

  const tanjaPortrait =
    stellenImages[0]?.url ||
    'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20recruiter%20warm%20authentic%20smile%20modern%20office%20creative%20agency%20bright%20natural%20environment%20editorial%20portrait%20photography%20natural%20light%20clean%20background%20sharp%20detail%20professional%20yet%20approachable&width=96&height=96&seq=tanja-headshot-stellen&orientation=squarish';

  // Load the official B-ite Jobs API widget.
  useEffect(() => {
    if (document.querySelector('script[src*="api-loader-v1.min.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://static.b-ite.com/jobs-api/loader-v1/api-loader-v1.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="stellenangebote" className="py-20 md:py-[104px] px-5 md:px-10" style={{ background: 'oklch(0.13 0.005 118)' }}>
      <div className="sonic-container">
        <div className="flex items-start gap-8 md:gap-16 mb-12 md:mb-14">
          <ChapterNumeral n="06" dark />
          <div className="flex-1 max-w-[700px]">
            <ChapterEyebrow dark>Aktuelle Stellenangebote</ChapterEyebrow>
            <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.875rem, 3.4vw, 3.5rem)', lineHeight: 1.02, letterSpacing: '-0.035em' }}>
              {headingFirst} <span className="text-primary-500">{headingRest}</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">Krefeld &amp; DACH-weit</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]" style={{ border: '1px solid rgba(255,255,255,0.14)' }}>
          {/* Jobs widget — permanently open */}
          <div className="p-8 md:p-12" style={{ borderRight: '1px solid rgba(255,255,255,0.14)' }}>
            <p className="text-2xl md:text-[34px] font-black leading-[1.06] tracking-[-0.03em] text-white mb-3">Jetzt durchstarten</p>
            <p className="text-[15px] leading-[1.7] text-white/50 mb-10">Alle offenen Positionen auf einen Blick — klick auf eine Stelle für Details.</p>
            <div className="jobWrapper-block" data-bite-jobs-api-listing={BITE_LISTING_KEY}>
              <div className="flex flex-col items-center justify-center gap-3.5 py-16 border-t border-white/10">
                <span className="w-9 h-9 rounded-full border-[3px] border-primary-500/30 animate-spin" style={{ borderTopColor: 'oklch(var(--primary-500))' }} />
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/40">Stellenangebote werden geladen…</p>
              </div>
            </div>
          </div>

          {/* Tanja panel */}
          <div className="p-8 md:p-10 flex flex-col justify-between" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}>
            <div>
              <div className="w-16 h-16 overflow-hidden mb-6" style={{ border: '2px solid oklch(var(--primary-500) / 0.45)' }}>
                <img src={tanjaPortrait} alt="Tanja — HR Team" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
              </div>
              <p className="text-[22px] font-black leading-[1.2] tracking-[-0.02em] text-white mb-3">{tTanjaHeading}</p>
              <p className="text-[15px] leading-[1.7] text-white/55">{tTanjaDesc}</p>
            </div>
            <div className="flex flex-col gap-2.5 mt-10">
              <a
                href="https://calendly.com/sonic-group/tanja-15min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-4 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.14em] hover:bg-white transition-colors duration-200 cursor-pointer"
              >
                <i className="ri-calendar-line text-[15px]" />
                {tTanjaCta}
              </a>
              <a
                href="mailto:karriere@sonic-group.de?subject=Initiativbewerbung"
                className="flex items-center justify-center gap-2.5 px-6 py-4 text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                style={{ border: '1px solid rgba(255,255,255,0.28)' }}
              >
                <i className="ri-send-plane-line text-[15px]" />
                {tInitiativCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
