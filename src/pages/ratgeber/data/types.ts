export type GeoLevel = 'local' | 'regional' | 'national' | 'international';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  title: string;
  content: string;
  highlights?: string[];
}

export interface InternalLink {
  label: string;
  href: string;
  description: string;
}

export interface GeoContextData {
  level: GeoLevel;
  heading: string;
  cities: string[];
  regions: string[];
  countries: string[];
  content: string;
}

export interface AnswerFirstData {
  question: string;
  answer: string;
}

export interface RatgeberPageContent {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  h1Accent: string;
  heroSubtitle: string;
  heroSummary: string;
  heroImageUrl: string;
  category: string;
  answerFirst: AnswerFirstData;
  sections: ContentSection[];
  geoContext: GeoContextData;
  faqs: FAQItem[];
  internalLinks: InternalLink[];
  crossLinks: InternalLink[];
  ctaHeadline: string;
  ctaAccent: string;
  ctaSubline: string;
}

export interface RatgeberHubCard {
  slug: string;
  category: string;
  title: string;
  accent: string;
  description: string;
  geoLevel: GeoLevel;
  imageUrl: string;
}