import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { compressImage } from '@/lib/imageCompress';
import {
  STORAGE_PREFIX, useMediaStore, addSectionImage, updateSectionImage, deleteSectionImage, resolveImageUrl,
} from '@/lib/mediaStore';
import { brandKey } from '@/lib/brandLogos';
import { updateTextEntriesIn, getTextValueIn, getTextSyncStatus, type TextSyncStatus } from '@/lib/textStore';
import { CLIENT_LOGO_SLOT, CLIENT_SLOTS, CLIENT_TEXT_SECTION, useClientSlots, type ClientSlot } from '@/lib/aboutClients';

/* ── Dashboard → Über uns: one place for „Wer mit Sonic erfolgreich ist" (11/2026) ──
   Names / categories / order / show-hide are saved in Text → Über uns „Kundenliste",
   logo files in Medien → Über uns „Kundenlogos" (label = brand name). */

const capKey = (c: string) => brandKey(c || '');
const matches = (cap: string, key: string) => cap.length >= 3 && key.length > 0 && (cap === key || cap.startsWith(key) || key.startsWith(cap));

function useSync(): TextSyncStatus {
  const [s, setS] = useState<TextSyncStatus>(getTextSyncStatus);
  useEffect(() => {
    const h = (e: Event) => setS((e as CustomEvent<TextSyncStatus>).detail);
    window.addEventListener('text-store-sync', h);
    return () => window.removeEventListener('text-store-sync', h);
  }, []);
  return s;
}

export default function ClientLogosPanel() {
  const slots = useClientSlots();
  const { images: ownLogos } = useMediaStore(CLIENT_LOGO_SLOT);
  const sync = useSync();
  const [open, setOpen] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEmpty, setShowEmpty] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFor, setUploadFor] = useState<ClientSlot | null>(null);

  const ownLogoFor = (name: string) => ownLogos.find((img) => img.url && matches(capKey(img.caption || ''), capKey(name)));

  const save = (lang: 'de' | 'en', values: Record<string, string>) =>
    updateTextEntriesIn(lang, CLIENT_TEXT_SECTION, values);

  const rename = async (c: ClientSlot, next: string) => {
    const name = next.trim();
    if (name === c.name) return;
    const own = c.name ? ownLogoFor(c.name) : undefined;
    await save('de', { [`c${c.slot}-name`]: name });
    if (own && name) updateSectionImage(CLIENT_LOGO_SLOT, own.url, { caption: name }); // keep the uploaded logo linked
  };

  const swap = async (a: number, b: number) => {
    const fields = ['name', 'category', 'hidden'];
    const de: Record<string, string> = {};
    const en: Record<string, string> = {};
    for (const f of fields) {
      de[`c${a}-${f}`] = getTextValueIn('de', CLIENT_TEXT_SECTION, `c${b}-${f}`);
      de[`c${b}-${f}`] = getTextValueIn('de', CLIENT_TEXT_SECTION, `c${a}-${f}`);
    }
    en[`c${a}-category`] = getTextValueIn('en', CLIENT_TEXT_SECTION, `c${b}-category`);
    en[`c${b}-category`] = getTextValueIn('en', CLIENT_TEXT_SECTION, `c${a}-category`);
    await save('de', de);
    await save('en', en);
  };

  const onFile = async (file: File | undefined) => {
    const c = uploadFor;
    if (!file || !c || !c.name) return;
    setBusy(c.slot); setError(null);
    try {
      if (!supabase) throw new Error('Supabase ist nicht konfiguriert.');
      const optimized = file.type === 'image/svg+xml' ? file : await compressImage(file);
      const safe = optimized.name.toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/--+/g, '-');
      const path = `dashboard/${Date.now()}-${safe}`;
      const { error: err } = await supabase.storage.from('media').upload(path, optimized, { cacheControl: '3600', upsert: false });
      if (err) throw err;
      const url = `${STORAGE_PREFIX}${path}`;
      const own = ownLogoFor(c.name);
      if (own) updateSectionImage(CLIENT_LOGO_SLOT, own.url, { url, caption: c.name });
      else addSectionImage(CLIENT_LOGO_SLOT, url, c.name);
    } catch (e: unknown) {
      setError(`Logo-Upload fehlgeschlagen: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(null); setUploadFor(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const filled = slots.filter((c) => c.name);
  const empty = slots.filter((c) => !c.name);
  const visibleRows = showEmpty ? slots : filled;

  const source = (c: ClientSlot) => {
    if (!c.name) return null;
    if (ownLogoFor(c.name)) return { cls: 'bg-lime-100 text-lime-800', text: 'Eigenes Logo' };
    if (c.logo && c.logo !== c.fallbackLogo) return { cls: 'bg-sky-100 text-sky-800', text: 'Logo aus anderem Logo-Bereich' };
    if (c.logo) return { cls: 'bg-gray-100 text-gray-600', text: 'Standard-Link (extern)' };
    return { cls: 'bg-amber-100 text-amber-800', text: 'Kein Logo — Name wird angezeigt' };
  };

  const syncText: Record<TextSyncStatus['state'], string> = {
    idle: 'Änderungen gehen sofort live', saving: 'Wird veröffentlicht…', saved: 'Live auf der Website',
    error: 'Nicht gespeichert — siehe Hinweis oben', unconfigured: 'Nicht verbunden — nur in diesem Browser',
  };

  return (
    <section className="bg-white border-2 border-lime-400 rounded-lg overflow-hidden mb-4">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-lime-400 text-gray-900 shrink-0"><i className="ri-award-line text-base"></i></span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-black text-gray-900">Kundenlogos — „Wer mit Sonic erfolgreich ist“</div>
          <div className="text-2xs text-gray-500">
            Alles für die Logo-Kacheln auf Über uns an einem Ort: Logo, Marke, Kategorie, Reihenfolge, anzeigen/ausblenden. {filled.filter((c) => !c.hidden).length} Kacheln sichtbar.
          </div>
        </div>
        <span className="hidden md:inline text-2xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">{syncText[sync.state]}</span>
        <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3 space-y-2">
          <input ref={fileRef} type="file" accept="image/*,.svg" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
          {error && <p className="text-2xs text-red-700 bg-red-50 px-2 py-1.5 rounded">{error}</p>}

          {visibleRows.map((c) => {
            const src = source(c);
            const own = c.name ? ownLogoFor(c.name) : undefined;
            const listIndex = slots.findIndex((s) => s.slot === c.slot);
            return (
              <div key={c.slot} className={`flex flex-wrap md:flex-nowrap items-center gap-3 border rounded-md px-3 py-2 ${c.hidden ? 'bg-gray-50 border-gray-200' : 'border-gray-200'}`}>
                <span className="w-6 text-2xs font-black text-gray-400 text-center shrink-0">{c.slot}</span>
                <div className="w-28 h-12 shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded">
                  {c.logo
                    ? <img src={resolveImageUrl(c.logo)} alt={c.name} className={`max-h-8 max-w-[100px] object-contain ${c.hidden ? 'opacity-40' : ''}`} />
                    : <span className="text-2xs font-black text-gray-400 uppercase px-1 text-center">{c.name || '—'}</span>}
                </div>
                <div className="flex-1 min-w-[180px] grid grid-cols-1 md:grid-cols-3 gap-2">
                  <label className="text-3xs font-semibold text-gray-500 uppercase tracking-wider">Marke
                    <input defaultValue={c.name} key={`n${c.slot}-${c.name}`} placeholder="Leer = keine Kachel" onBlur={(e) => void rename(c, e.target.value)}
                      className="mt-0.5 w-full text-xs text-gray-900 normal-case tracking-normal font-semibold border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-lime-400" />
                  </label>
                  <label className="text-3xs font-semibold text-gray-500 uppercase tracking-wider">Kategorie (DE)
                    <input defaultValue={c.category} key={`cd${c.slot}-${c.category}`} disabled={!c.name}
                      onBlur={(e) => e.target.value.trim() !== c.category && void save('de', { [`c${c.slot}-category`]: e.target.value.trim() })}
                      className="mt-0.5 w-full text-xs text-gray-900 normal-case tracking-normal border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-lime-400 disabled:bg-gray-50" />
                  </label>
                  <label className="text-3xs font-semibold text-gray-500 uppercase tracking-wider">Kategorie (EN)
                    <input defaultValue={getTextValueIn('en', CLIENT_TEXT_SECTION, `c${c.slot}-category`)} key={`ce${c.slot}-${getTextValueIn('en', CLIENT_TEXT_SECTION, `c${c.slot}-category`)}`} disabled={!c.name}
                      onBlur={(e) => void save('en', { [`c${c.slot}-category`]: e.target.value.trim() })}
                      className="mt-0.5 w-full text-xs text-gray-900 normal-case tracking-normal border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-lime-400 disabled:bg-gray-50" />
                  </label>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                  {src && <span className={`text-3xs font-bold px-1.5 py-0.5 rounded ${src.cls}`}>{src.text}</span>}
                  <button type="button" disabled={!c.name || busy === c.slot} onClick={() => { setUploadFor(c); fileRef.current?.click(); }}
                    className="text-2xs font-bold px-2 py-1 rounded bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 cursor-pointer">
                    {busy === c.slot ? 'Lädt…' : own ? 'Logo ersetzen' : 'Logo hochladen'}
                  </button>
                  {own && (
                    <button type="button" onClick={() => deleteSectionImage(CLIENT_LOGO_SLOT, own.url)} title="Eigenes Logo entfernen (Standard wird wieder genutzt)"
                      className="text-2xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"><i className="ri-delete-bin-line"></i></button>
                  )}
                  <button type="button" disabled={!c.name} onClick={() => void save('de', { [`c${c.slot}-hidden`]: c.hidden ? '' : 'ja' })}
                    className={`text-2xs font-bold px-2 py-1 rounded cursor-pointer disabled:opacity-40 ${c.hidden ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {c.hidden ? 'Ausgeblendet' : 'Sichtbar'}
                  </button>
                  <button type="button" aria-label="Nach oben" disabled={listIndex <= 0} onClick={() => void swap(c.slot, slots[listIndex - 1].slot)}
                    className="w-7 h-7 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"><i className="ri-arrow-up-line"></i></button>
                  <button type="button" aria-label="Nach unten" disabled={listIndex >= CLIENT_SLOTS - 1} onClick={() => void swap(c.slot, slots[listIndex + 1].slot)}
                    className="w-7 h-7 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 cursor-pointer"><i className="ri-arrow-down-line"></i></button>
                </div>
              </div>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <button type="button" onClick={() => setShowEmpty(!showEmpty)} className="text-2xs font-bold text-lime-800 hover:text-gray-900 cursor-pointer">
              {showEmpty ? 'Leere Kacheln ausblenden' : `+ Kachel hinzufügen (${empty.length} frei)`}
            </button>
            <p className="text-3xs text-gray-400">
              Gespeichert in Text → Über uns „Kundenliste“ und Medien → Über uns „Kundenlogos“. Reihenfolge = Reihenfolge auf der Seite (bis zu {CLIENT_SLOTS} Kacheln).
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
