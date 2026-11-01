/* ─────────────────────────────────────────────
   SITE LANGUAGE — DE (default) | EN
   German is always the default. A visitor's choice is remembered in this
   browser; ?lang=en / ?lang=de in the URL also sets it (handy for sharing).
   Switching fires 'text-store-update', so every useText/useTextSection
   re-reads and the page updates in place without a reload.
───────────────────────────────────────────── */
import { useSyncExternalStore } from 'react';

export type Lang = 'de' | 'en';
export const LANGS: readonly Lang[] = ['de', 'en'] as const;

const STORAGE_KEY = 'sonic_lang';

const isLang = (v: unknown): v is Lang => v === 'de' || v === 'en';

function readInitial(): Lang {
  if (typeof window === 'undefined') return 'de';
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (isLang(q)) {
      try { localStorage.setItem(STORAGE_KEY, q); } catch { /* storage blocked */ }
      return q;
    }
  } catch { /* ignore */ }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch { /* storage blocked */ }
  return 'de';
}

let current: Lang = readInitial();

function applyHtmlLang(lang: Lang): void {
  if (typeof document !== 'undefined') document.documentElement.lang = lang;
}
applyHtmlLang(current);

export function getLanguage(): Lang {
  return current;
}

export function setLanguage(lang: Lang): void {
  if (!isLang(lang) || lang === current) return;
  current = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage blocked */ }
  applyHtmlLang(lang);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<Lang>('language-change', { detail: lang }));
    // Text hooks listen to this event and re-read in the new language
    window.dispatchEvent(new Event('text-store-update'));
  }
}

function subscribe(cb: () => void): () => void {
  window.addEventListener('language-change', cb);
  return () => window.removeEventListener('language-change', cb);
}

/** Current site language, re-renders on switch. */
export function useLanguage(): Lang {
  return useSyncExternalStore(subscribe, getLanguage, () => 'de' as Lang);
}
