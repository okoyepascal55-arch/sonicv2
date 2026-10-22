/**
 * Karrierepfade — shared data for the section on /karriere and the detail page
 * /karriere/team?path=campus|pos. Everything comes from the dashboard:
 *   • Texte → Karriere → „KarrierepfadeSection — Two Career Paths“ (badge, subline, text, buttons)
 *   • Texte → Karriere → „Karriere — Campus Team & POS Team“ (title, stats, Gehalt/Benefits/Wachsen/Bewerbung)
 *   • Texte → Karriere → „Karrierepfad — Detailseite“ (labels on the detail page)
 *   • Medien → Karriere → „Karrierepfade — Teamfotos“ (photo 1 = Campus, photo 2 = POS)
 */
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useKarrierePath } from './useKarriereText';
import type { PathTab } from './content';
import { IMAGE_PLACEHOLDER } from '@/lib/imagePlaceholder';

export type PathSlug = 'campus' | 'pos';

export interface CareerPath {
  slug: PathSlug;
  id: 'sales' | 'staff';
  badge: string;
  title: string;
  subline: string;
  description: string;
  stats: { value: string; label: string }[];
  tabs: PathTab[];
  image: string;
}

const FALLBACK_IMAGES = [
  IMAGE_PLACEHOLDER,
  IMAGE_PLACEHOLDER,
];

export const JOBS_ANCHOR = 'stellenangebote';
export const INITIATIVE_URL = 'https://jobs.b-ite.com/jobposting/2609253932f3162bc26c08900b87a46579f657e30';

export function useCareerPaths(): CareerPath[] {
  const { images } = useMediaStore('careers_path_images');
  const sales = useKarrierePath('sales');
  const staff = useKarrierePath('staff');
  const t = {
    salesBadge: useText('careers_paths', 'careers-paths-sales-badge', 'Krefeld'),
    salesSub: useText('careers_paths', 'careers-paths-sales-headline', 'Dein Job am Campus in Krefeld'),
    salesDesc: useText('careers_paths', 'careers-paths-sales-desc', 'Projektmanagement, HR, IT, Finance, Kreation: Hier planen und steuern wir die Projekte unserer Kunden. Mit klaren Aufgaben, Mentoring, hybridem Arbeiten und einem Team, das zusammenhält.'),
    staffBadge: useText('careers_paths', 'careers-paths-staff-badge', 'Deutschlandweit'),
    staffSub: useText('careers_paths', 'careers-paths-staff-headline', 'Dein Einsatz am Point of Sale'),
    staffDesc: useText('careers_paths', 'careers-paths-staff-desc', 'Du berätst, verkaufst und präsentierst Marken aus Consumer Electronics, Haushalt und Sport direkt im Handel – deutschlandweit, mit festen Einsatzorten und -zeiten. Vor jedem Projekt wirst du geschult, und im Projektteam hast du einen festen Ansprechpartner.'),
  };
  return [
    { slug: 'campus', id: 'sales', badge: t.salesBadge, title: sales.title, subline: t.salesSub, description: t.salesDesc, stats: sales.stats, tabs: sales.tabs, image: images[0]?.url || FALLBACK_IMAGES[0] },
    { slug: 'pos', id: 'staff', badge: t.staffBadge, title: staff.title, subline: t.staffSub, description: t.staffDesc, stats: staff.stats, tabs: staff.tabs, image: images[1]?.url || FALLBACK_IMAGES[1] },
  ];
}

/** Smooth-scroll to the job list on /karriere, below the sticky main nav + chapter rail. */
export function scrollToJobs(e?: { preventDefault: () => void }) {
  const el = document.getElementById(JOBS_ANCHOR);
  if (!el) return;
  e?.preventDefault();
  const top = el.getBoundingClientRect().top + window.scrollY - 121;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
