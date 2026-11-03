/* ─────────────────────────────────────────────
   EN layer for text written directly in components
   Dashboard texts switch language through the text store. Everything else
   that is hard-coded German (labels, buttons, alt texts, page titles…) is
   swapped here for its English entry in EN_UI while EN is active.
   - German mode: nothing runs, the page is exactly as before.
   - Switching back to DE restores every original text.
   - [data-i18n-skip] keeps a block German (legal texts, Ratgeber articles).
   - Admin pages (dashboard, login) are never translated.
───────────────────────────────────────────── */
import { EN_UI, EN_UI_PATTERNS } from './textEn/ui';
import { getLanguage } from './language';

const ATTRS = ['alt', 'title', 'aria-label', 'placeholder'] as const;
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE']);
const ADMIN_PATH = /^\/(dashboard|media-dashboard|login|auth)(\/|$)/;

const norm = (s: string): string => s.replace(/\s+/g, ' ').trim();
const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Most specific first, so "Schritt {} von {} anzeigen" wins over "Schritt {} von {}".
const PATTERNS: Array<[RegExp, string]> = EN_UI_PATTERNS
  .map(([de, en]) => [norm(de), en] as [string, string])
  .sort((a, b) => b[0].replace(/\{\}/g, '').length - a[0].replace(/\{\}/g, '').length)
  .map(([de, en]) => [new RegExp('^' + de.split('{}').map(escapeRe).join('(.+?)') + '$'), en]);

/* German number formats in hard-coded figures → US: 1.800 → 1,800 · 5,5 → 5.5 · 60 % → 60% */
function usNumber(key: string): string | undefined {
  const m = key.match(/^([<>≈~+Ø]?\s?)(€\s?)?([\d.,]+)(\s?%|\+)?(\s?€)?$/);
  if (!m || !/\d/.test(m[3])) return undefined;
  const num = m[3]
    .replace(/^\d{1,3}(?:\.\d{3})+$/, (n) => n.replace(/\./g, ','))
    .replace(/^(\d+),(\d{1,2})$/, '$1.$2');
  const euro = m[2] || m[5] ? '€' : '';
  const out = m[1] + euro + num + (m[4] ? m[4].trim() : '');
  return out !== key ? out : undefined;
}

const SEPARATORS = [' — ', ' – ', ': ', ' · ', ' | '];

function lookup(raw: string, depth = 0): string | undefined {
  const key = norm(raw);
  if (!key) return undefined;
  if (!/[A-Za-zÄÖÜäöüß]/.test(key)) return usNumber(key);
  const hit = EN_UI[key];
  if (hit !== undefined) return hit;
  if (depth > 2) return undefined;
  for (const [re, en] of PATTERNS) {
    const m = key.match(re);
    if (m) {
      let i = 1;
      return en.replace(/\{\}/g, () => {
        const part = m[i++] ?? '';
        return lookup(part, depth + 1) ?? part;
      });
    }
  }
  // Labels built from parts, e.g. "Rowenta — Haushaltsgeräte"
  for (const sep of SEPARATORS) {
    if (!key.includes(sep)) continue;
    const parts = key.split(sep);
    const tr = parts.map((p) => lookup(p, depth + 1));
    if (tr.some((t) => t !== undefined)) return parts.map((p, i) => tr[i] ?? p).join(sep);
  }
  return undefined;
}

interface Swap { orig: string; tr: string }
const textSwaps = new WeakMap<Text, Swap>();
const attrSwaps = new WeakMap<Element, Map<string, Swap>>();
let titleSwap: Swap | null = null;
let active = false;

const isAdminPage = (): boolean => ADMIN_PATH.test(window.location.pathname);

function skipped(el: Element | null): boolean {
  if (!el) return true;
  if (SKIP_TAGS.has(el.tagName)) return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return el.closest('[data-i18n-skip]') !== null;
}

function translateText(node: Text): void {
  const value = node.nodeValue ?? '';
  const prev = textSwaps.get(node);
  if (prev && value === prev.tr) return;
  if (skipped(node.parentElement)) return;
  const en = lookup(value);
  if (en === undefined) return;
  const lead = value.match(/^\s*/)?.[0] ?? '';
  const trail = value.match(/\s*$/)?.[0] ?? '';
  const tr = lead + en + trail;
  textSwaps.set(node, { orig: value, tr });
  node.nodeValue = tr;
}

function translateAttr(el: Element, name: string): void {
  const value = el.getAttribute(name);
  if (value === null) return;
  const swaps = attrSwaps.get(el);
  const prev = swaps?.get(name);
  if (prev && value === prev.tr) return;
  const en = lookup(value);
  if (en === undefined) return;
  const map = swaps ?? new Map<string, Swap>();
  map.set(name, { orig: value, tr: en });
  attrSwaps.set(el, map);
  el.setAttribute(name, en);
}

function translateElement(el: Element): void {
  // Placeholders of text areas still get translated; only their typed content is left alone.
  if (el.tagName === 'TEXTAREA' ? skipped(el.parentElement) : skipped(el)) return;
  for (const a of ATTRS) if (el.hasAttribute(a)) translateAttr(el, a);
  if (el instanceof HTMLInputElement && (el.type === 'submit' || el.type === 'button')) translateAttr(el, 'value');
}

function walk(root: Node): void {
  if (root.nodeType === Node.TEXT_NODE) { translateText(root as Text); return; }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (skipped(el)) return;
  translateElement(el);
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let n: Node | null = tw.nextNode();
  while (n) {
    if (n.nodeType === Node.TEXT_NODE) translateText(n as Text);
    else translateElement(n as Element);
    n = tw.nextNode();
  }
}

function translateTitle(): void {
  const t = document.title;
  if (titleSwap && t === titleSwap.tr) return;
  const en = lookup(t);
  if (en === undefined) return;
  titleSwap = { orig: t, tr: en };
  document.title = en;
}

const bodyObserver = new MutationObserver((records) => {
  if (!active || isAdminPage()) return;
  for (const r of records) {
    if (r.type === 'childList') r.addedNodes.forEach(walk);
    else if (r.type === 'characterData') translateText(r.target as Text);
    else if (r.type === 'attributes' && r.attributeName) {
      const el = r.target as Element;
      if (!(el.tagName === 'TEXTAREA' ? skipped(el.parentElement) : skipped(el))) translateAttr(el, r.attributeName);
    }
  }
});

const headObserver = new MutationObserver(() => {
  if (active && !isAdminPage()) translateTitle();
});

function restore(): void {
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let n: Node | null = tw.nextNode();
  while (n) {
    if (n.nodeType === Node.TEXT_NODE) {
      const s = textSwaps.get(n as Text);
      if (s && n.nodeValue === s.tr) n.nodeValue = s.orig;
      textSwaps.delete(n as Text);
    } else {
      const el = n as Element;
      const map = attrSwaps.get(el);
      if (map) {
        map.forEach((s, name) => { if (el.getAttribute(name) === s.tr) el.setAttribute(name, s.orig); });
        attrSwaps.delete(el);
      }
    }
    n = tw.nextNode();
  }
  if (titleSwap && document.title === titleSwap.tr) document.title = titleSwap.orig;
  titleSwap = null;
}

function apply(): void {
  const en = getLanguage() === 'en';
  if (en && !active) {
    active = true;
    bodyObserver.observe(document.body, {
      subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: [...ATTRS, 'value'],
    });
    headObserver.observe(document.head, { subtree: true, childList: true, characterData: true });
    if (!isAdminPage()) { walk(document.body); translateTitle(); }
  } else if (!en && active) {
    active = false;
    bodyObserver.disconnect();
    headObserver.disconnect();
    restore();
  }
}

export function startUiTranslation(): void {
  if (typeof window === 'undefined') return;
  window.addEventListener('language-change', () => apply());
  apply();
}
