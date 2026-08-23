import { useState, useEffect } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const BITE_LISTING_KEY = 'sonic-sales-support-gmbh:main-listing';

export default function KarriereJobs() {
  const [open, setOpen] = useState(false);
  const { images: stellenImages } = useMediaStore('careers_stellenangebote_image');

  const tBadge = useText('careers_jobs', 'careers-jobs-badge', 'Aktuelle Stellenangebote');
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
    <section id="stellenangebote" className="py-10 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* ── Heading ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="sonic-h2 text-foreground-950">
            {headingFirst}{' '}
            <span className="text-primary-500">{headingRest}</span>
          </h2>
        </div>

        {/* ── Drop toggle ── */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="stellenangebote-panel"
          className="group w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-foreground-950 p-6 md:p-8 text-left cursor-pointer"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-1 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-widest ">
                Live
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
                Krefeld &amp; DACH-weit
              </span>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase leading-[1.1] tracking-tight">
              Jetzt durchstarten
            </div>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              {open
                ? 'Alle offenen Positionen auf einen Blick — klick auf eine Stelle für Details.'
                : 'Aufklappen, um alle offenen Stellen zu sehen.'}
            </p>
          </div>

          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-primary-500 text-primary-500 group-hover:bg-primary-500 group-hover:text-foreground-950 transition-all duration-300 self-start sm:self-center ">
            <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* ── Expandable B-ite widget ── */}
        <div
          id="stellenangebote-panel"
          className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="border border-t-0 border-[#E7E4D4] bg-white p-4 md:p-8 min-h-[400px] ">
              <div className="jobWrapper-block" data-bite-jobs-api-listing={BITE_LISTING_KEY}>
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <div className="w-10 h-10 border-4 border-primary-500/30 border-t-[#C8D400] animate-spin " />
                  <p className="text-xs font-black text-foreground-400 uppercase tracking-widest">
                    Stellenangebote werden geladen…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tanja CTA bar ── */}
        <div className="mt-4 bg-foreground-950 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 flex-shrink-0 overflow-hidden  border-2 border-primary-500/30">
              <img
                src={tanjaPortrait}
                alt="Tanja — HR Team"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">{tTanjaHeading}</h3>
              <p className="text-xs text-white/50 max-w-lg leading-relaxed">{tTanjaDesc}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href="https://calendly.com/sonic-group/tanja-15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary-500 text-foreground-950 font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-200 whitespace-nowrap cursor-pointer "
            >
              <i className="ri-calendar-line text-sm" />
              {tTanjaCta}
            </a>
            <a
              href="mailto:karriere@sonic-group.de?subject=Initiativbewerbung"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border-[1.5px] border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-primary-500/50 transition-all duration-200 whitespace-nowrap cursor-pointer "
            >
              <i className="ri-send-plane-line text-sm" />
              {tInitiativCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}