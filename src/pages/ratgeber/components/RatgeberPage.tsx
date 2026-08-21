import { useEffect } from 'react';
import { useText } from '@/hooks/useText';
import type { RatgeberPageContent } from '../data/types';
import RatgeberHero from './RatgeberHero';
import RatgeberAnswerFirst from './RatgeberAnswerFirst';
import RatgeberContent from './RatgeberContent';
import RatgeberGeoContext from './RatgeberGeoContext';
import RatgeberFAQ from './RatgeberFAQ';
import RatgeberInternalLinks from './RatgeberInternalLinks';
import RatgeberCrossLinks from './RatgeberCrossLinks';
import RatgeberCTA from './RatgeberCTA';
import WoodenDivider from '@/components/base/WoodenDivider';
import Breadcrumb from '@/components/base/Breadcrumb';

const PREFIX_MAP: Record<string, string> = {
  markenaktivierung: 'rgba-ma',
  'retail-merchandising': 'rgba-rm',
  promotionspersonal: 'rgba-pp',
  'messe-eventmarketing': 'rgba-me',
  'field-marketing-sampling': 'rgba-fm',
  'guerilla-marketing': 'rgba-gm',
  'live-shopping': 'rgba-ls',
  erlebnismarketing: 'rgba-em',
  nachhaltigkeitsmarketing: 'rgba-nm',
  'mystery-shopping': 'rgba-ms',
  'verkaufsfoerderung-pos': 'rgba-vp',
  'tiktok-shop-live': 'rgba-ts',
  'markteintritt-dach': 'rgba-md',
  'live-video-promotion': 'rgba-lvp',
  'roadshows-aktionen': 'rgba-ra',
  'social-commerce': 'rgba-sc',
  verkaeuferschulungen: 'rgba-vs',
  'shopper-marketing': 'rgba-sm',
  'trade-marketing': 'rgba-tm',
  'influencer-marketing': 'rgba-im',
  'pop-up-stores': 'rgba-ps',
  'instore-media': 'rgba-ism',
  'produkt-launch': 'rgba-pl',
  'customer-experience': 'rgba-cx',
  'community-management': 'rgba-cm',
  'kultur-events': 'rgba-ke',
  'segmentierte-ansprache': 'rgba-sa',
};

interface RatgeberPageProps {
  content: RatgeberPageContent;
  sectionKey: string;
}

export default function RatgeberPage({ content, sectionKey }: RatgeberPageProps) {
  const prefix = PREFIX_MAP[content.slug] || 'rgba-ma';
  const tH1 = useText(sectionKey, `${prefix}-h1`, content.h1);
  const tH1Accent = useText(sectionKey, `${prefix}-h1-accent`, content.h1Accent);
  const tHeroSub = useText(sectionKey, `${prefix}-hero-sub`, content.heroSubtitle);
  const tHeroSummary = useText(sectionKey, `${prefix}-hero-summary`, content.heroSummary);
  const tCtaHeadline = useText(sectionKey, `${prefix}-cta-headline`, content.ctaHeadline);
  const tCtaAccent = useText(sectionKey, `${prefix}-cta-accent`, content.ctaAccent);
  const tCtaSub = useText(sectionKey, `${prefix}-cta-sub`, content.ctaSubline);

  useEffect(() => {
    document.title = content.seoTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.metaDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content.metaDescription;
      document.head.appendChild(meta);
    }
  }, [content.seoTitle, content.metaDescription]);

  return (
    <div className="min-h-[100dvh] bg-white">
      <Breadcrumb
        items={[
          { label: 'Startseite', href: '/' },
          { label: 'Ratgeber', href: '/ratgeber' },
          { label: content.category },
        ]}
      />

      <RatgeberHero
        h1={tH1}
        h1Accent={tH1Accent}
        heroSubtitle={tHeroSub}
        heroSummary={tHeroSummary}
        heroImageUrl={content.heroImageUrl}
        category={content.category}
      />

      <WoodenDivider />

      <RatgeberAnswerFirst data={content.answerFirst} />

      <WoodenDivider />

      <RatgeberContent sections={content.sections} />

      <WoodenDivider />

      <RatgeberGeoContext data={content.geoContext} />

      <WoodenDivider />

      <RatgeberFAQ faqs={content.faqs} />

      <WoodenDivider />

      <RatgeberInternalLinks links={content.internalLinks} />

      <WoodenDivider />

      <RatgeberCrossLinks links={content.crossLinks} />

      <WoodenDivider />

      <RatgeberCTA
        headline={tCtaHeadline}
        headlineAccent={tCtaAccent}
        subline={tCtaSub}
      />
    </div>
  );
}