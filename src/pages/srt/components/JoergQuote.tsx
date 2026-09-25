import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

export default function JoergQuote() {
  const tName    = useText('srt_developer', 'srt-joerg-name',    'Jörg');
  const tTitle   = useText('srt_developer', 'srt-joerg-title',   'Entwickler der Sonic Retail Technology');
  const tQuote   = useText('srt_developer', 'srt-joerg-quote',   'Das SRT ist kein Tool — es ist der direkte Draht zwischen dem, was am POS passiert, und der Entscheidung, die daraus folgen muss. Wir haben es so gebaut, dass Promoter damit arbeiten wollen, nicht müssen.');
  const tVideo   = useText('srt_developer', 'srt-joerg-video',   '');
  const tBadge   = useText('srt_developer', 'srt-joerg-badge',   'Ein Wort vom Entwickler');

  const { images: photoImages } = useMediaStore('srt_joerg_photo');
  const photoUrl = photoImages[0]?.url ? resolveImageUrl(photoImages[0].url) : '';

  // If no quote and no video, render nothing
  if (!tQuote && !tVideo) return null;

  return (
    <section className="sonic-section-md bg-foreground-950 px-4 md:px-6">
      <div className="sonic-container max-w-4xl">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" />
          <span
            className="text-[11px] font-black uppercase tracking-[0.24em]"
            style={{ color: 'oklch(0.55 0.08 115)' }}
          >
            {tBadge}
          </span>
        </div>

        {/* Video embed — shown if URL is set */}
        {tVideo && (
          <div className="relative w-full mb-10" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${
                tVideo.includes('youtu')
                  ? tVideo.split(/[/?=v]/).filter(Boolean).slice(-1)[0]
                  : tVideo
              }`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${tName} — ${tTitle}`}
              loading="lazy"
            />
          </div>
        )}

        {/* Quote block */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Photo */}
          {photoUrl && (
            <div className="flex-shrink-0">
              <div
                className="w-20 h-20 md:w-24 md:h-24 overflow-hidden"
                style={{ border: '2px solid oklch(var(--primary-500) / 0.4)' }}
              >
                <img
                  src={photoUrl}
                  alt={tName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Quote content */}
          <div className="flex-1">
            <div className="mb-5">
              <i
                className="ri-double-quotes-l text-primary-500 text-4xl leading-none block mb-4"
                aria-hidden="true"
              />
              <p className="text-white text-lg md:text-xl font-semibold leading-relaxed">
                {tQuote}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-primary-500" />
              <div>
                <p className="text-white font-black text-sm">{tName}</p>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: 'oklch(0.55 0.08 115)' }}
                >
                  {tTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
