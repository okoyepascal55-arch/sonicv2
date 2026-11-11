/* ─────────────────────────────────────────────
   SITE PAGES — on/off switches (Dashboard → Seiten, 11/2026)
   A page that is switched off disappears from the menu, the dropdowns and
   the footer, and its address forwards to the parent page. The page itself
   and its dashboard content stay in place, so switching it on restores it.
   Home, Kontakt and the legal pages are always on and are not listed here.
───────────────────────────────────────────── */
import { useEffect, useState } from 'react';
import { getSitePageSettings, setSitePageEnabled } from './textStore';

export interface SitePage {
  path: string;
  label: string;
  group: string;
  /** Where the address forwards to while the page is off (if that page is on; otherwise Home). */
  parent: string;
  /** Other addresses that belong to this page (detail pages, old aliases). */
  alsoMatches?: string[];
  /** Built-in state when nothing was set in the dashboard. */
  defaultOn: boolean;
}

export const SITE_PAGES: SitePage[] = [
  { path: '/losungen', label: 'Lösungen', group: 'Hauptseiten', parent: '/', defaultOn: true },
  { path: '/leistungen', label: 'Leistungen (Übersicht)', group: 'Hauptseiten', parent: '/', defaultOn: true },
  { path: '/ueber-uns', label: 'Über uns', group: 'Hauptseiten', parent: '/', alsoMatches: ['/about', '/team'], defaultOn: true },
  { path: '/fallbeispiele', label: 'Fallbeispiele', group: 'Hauptseiten', parent: '/', alsoMatches: ['/case-studies'], defaultOn: true },
  { path: '/blog', label: 'Blog', group: 'Hauptseiten', parent: '/', defaultOn: true },
  { path: '/karriere', label: 'Karriere (inkl. Team-Seite)', group: 'Hauptseiten', parent: '/', alsoMatches: ['/careers', '/jobs'], defaultOn: true },
  { path: '/ratgeber', label: 'Ratgeber (alle Artikel)', group: 'Hauptseiten', parent: '/', defaultOn: true },
  { path: '/sonic-reels', label: 'Sonic Reels', group: 'Über uns', parent: '/ueber-uns', defaultOn: false },
  { path: '/leistungen/pos-full-service', label: 'POS Full Service', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/live-video', label: 'Live Video', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/events-messen', label: 'Events & Messen', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/staff-as-a-service', label: 'Staff as a Service', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/talentpool', label: 'Talentpool', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/warehouse-logistik', label: 'Warehouse & Logistik', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/srt', label: 'SRT', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/forecasting', label: 'Forecasting', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  { path: '/leistungen/kreation-content', label: 'Kreation & Content', group: 'Leistungen', parent: '/leistungen', defaultOn: true },
  // Versteckt — nie im Menü/Footer, nur per Link (PPTs). Aus = Link leitet auf Home weiter.
  { path: '/film', label: 'Film-Seite (nur per Link, /film)', group: 'Versteckte Seiten', parent: '/', defaultOn: true },
];

const matches = (pathname: string, base: string) => pathname === base || pathname.startsWith(base + '/');

/** The switchable page an address belongs to (most specific match), if any. */
export function pageForPath(pathname: string): SitePage | undefined {
  const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  let best: SitePage | undefined;
  let bestLen = -1;
  for (const page of SITE_PAGES) {
    for (const base of [page.path, ...(page.alsoMatches ?? [])]) {
      if (matches(clean, base) && base.length > bestLen) { best = page; bestLen = base.length; }
    }
  }
  return best;
}

function enabledIn(settings: Record<string, string>, page: SitePage): boolean {
  const v = settings[page.path];
  return v === 'on' ? true : v === 'off' ? false : page.defaultOn;
}

/** Is the page behind this address switched on? Addresses that aren't switchable are always on. */
export function isPathEnabled(pathname: string, settings: Record<string, string> = getSitePageSettings()): boolean {
  const page = pageForPath(pathname);
  return page ? enabledIn(settings, page) : true;
}

/** Where to send a visitor who opens a switched-off page: its parent if that is on, else Home. */
export function redirectTargetFor(pathname: string, settings: Record<string, string> = getSitePageSettings()): string {
  let page = pageForPath(pathname);
  const seen = new Set<string>();
  while (page && !enabledIn(settings, page) && !seen.has(page.path)) {
    seen.add(page.path);
    const parent = page.parent;
    if (parent === '/') return '/';
    const next = pageForPath(parent);
    if (!next || enabledIn(settings, next)) return parent;
    page = next;
  }
  return '/';
}

/** Re-renders when the dashboard publishes a change. Returns a checker for addresses. */
export function useSitePages() {
  const [settings, setSettings] = useState<Record<string, string>>(getSitePageSettings);
  useEffect(() => {
    const update = () => setSettings(getSitePageSettings());
    window.addEventListener('text-store-update', update);
    return () => window.removeEventListener('text-store-update', update);
  }, []);
  return {
    settings,
    isOn: (pathname: string) => isPathEnabled(pathname, settings),
    redirectFor: (pathname: string) => redirectTargetFor(pathname, settings),
    pageOn: (page: SitePage) => enabledIn(settings, page),
    setOn: (page: SitePage, on: boolean) => setSitePageEnabled(page.path, on),
  };
}
