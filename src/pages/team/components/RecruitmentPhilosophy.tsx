import { useText } from '@/hooks/useText';

export default function RecruitmentPhilosophy() {
  const tHeading = useText('team_recruitment', 'team-recruit-heading', 'EINSTELLUNG ÜBER ALLES');
  const tP1 = useText('team_recruitment', 'team-recruit-p1', '');
  const tCard1 = useText('team_recruitment', 'team-recruit-card-1', 'Leidenschaft');
  const tCard2 = useText('team_recruitment', 'team-recruit-card-2', 'Teamgeist');
  const tCard3 = useText('team_recruitment', 'team-recruit-card-3', 'Ambition');
  return (
    <section className="sonic-section-lg md:px-4 md:px-6 bg-white" id="philosophy">
      <div className="sonic-container">
        <div className="text-center mb-14">
          <div className="w-12 h-0.5 bg-primary-500 mx-auto mb-6" />
          <h2 className="sonic-h2 text-foreground-950 mb-4">
            {tHeading}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-base md:text-lg leading-relaxed text-foreground-700 mb-5">
            Wir suchen Leute, die zusammen mit uns anpacken wollen. Dabei ist uns{' '}
            <strong className="text-foreground-950">{tP1 ? tP1.split('.')[0] : 'deine Einstellung zum Job wichtiger als die Aufstellung deiner beruflichen Stationen'}</strong>.
            Was du erreichen willst ist entscheidender, als was in deinem Zeugnis steht – und die Lücke in deinem
            Lebenslauf egal, wenn du der perfekte Baustein für unser Team bist.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-foreground-700 mb-5">
            Zur Sonic passen energiegeladene Persönlichkeiten, die gerne die Ärmel hochkrempeln und mit anpacken –
            denn wir lieben und leben Marken. Ob am Point of Sale, auf Messen oder Events: Wir bieten namhaften
            Kunden die Bühne für einen beeindruckenden Auftritt.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-foreground-700 mb-14">
            Wenn du also Lust hast, bei uns wirklich etwas zu bewegen und du für deine Kunden und Projekte brennst –{' '}
            <strong className="text-foreground-950">willkommen bei der Sonic!</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: 'ri-heart-3-line', title: tCard1, desc: 'Für die Marke brennen ist wichtiger als perfekte Zeugnisse' },
            { icon: 'ri-team-line', title: tCard2, desc: 'Gemeinsam anpacken und Herausforderungen meistern' },
            { icon: 'ri-rocket-line', title: tCard3, desc: 'Was du erreichen willst zählt mehr als deine Vergangenheit' },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-8 bg-white border border-foreground-100 hover:border-primary-500/40 transition-all duration-300"
              style={{ borderRadius: 0 }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary-500/15 mx-auto mb-5" style={{ borderRadius: 0 }}>
                <i className={`${item.icon} text-2xl text-primary-500`}></i>
              </div>
              <h3 className="text-base font-black text-foreground-950 mb-2 uppercase tracking-wide leading-tight">{item.title}</h3>
              <p className="text-sm text-foreground-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
