import { useEffect, useState } from 'react';
import { SITE_PAGES, useSitePages, type SitePage } from '@/lib/sitePages';
import { getTextSyncStatus, type TextSyncStatus } from '@/lib/textStore';

/* ── Dashboard → Seiten: switch whole pages on or off (11/2026) ── */

function useSyncStatus(): TextSyncStatus {
  const [status, setStatus] = useState<TextSyncStatus>(getTextSyncStatus);
  useEffect(() => {
    const handler = (e: Event) => setStatus((e as CustomEvent<TextSyncStatus>).detail);
    window.addEventListener('text-store-sync', handler);
    return () => window.removeEventListener('text-store-sync', handler);
  }, []);
  return status;
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (on: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${label}: ${on ? 'an' : 'aus'}`}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 ${
        on ? 'bg-lime-400' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function PagesPanel() {
  const pages = useSitePages();
  const status = useSyncStatus();
  const groups = Array.from(new Set(SITE_PAGES.map((p) => p.group)));
  const parentLabel = (page: SitePage) =>
    page.parent === '/' ? 'Home' : SITE_PAGES.find((p) => p.path === page.parent)?.label ?? page.parent;

  const statusView: Record<TextSyncStatus['state'], { cls: string; icon: string; text: string }> = {
    idle: { cls: 'bg-gray-100 text-gray-500', icon: 'ri-cloud-line', text: 'Änderungen gehen sofort live' },
    saving: { cls: 'bg-amber-50 text-amber-700', icon: 'ri-loader-4-line animate-spin', text: 'Wird veröffentlicht…' },
    saved: { cls: 'bg-lime-50 text-lime-800', icon: 'ri-check-double-line', text: 'Live auf der Website' },
    error: { cls: 'bg-red-50 text-red-700', icon: 'ri-error-warning-line', text: status.message || 'Nicht gespeichert' },
    unconfigured: { cls: 'bg-red-50 text-red-700', icon: 'ri-error-warning-line', text: status.message || 'Supabase nicht konfiguriert' },
  };
  const sv = statusView[status.state];

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-gray-900">Seiten an- und ausschalten</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xl leading-relaxed">
              Eine ausgeschaltete Seite verschwindet aus Menü, Dropdowns und Footer. Wer ihre Adresse öffnet, landet auf der
              übergeordneten Seite. Inhalte, Texte und Bilder bleiben gespeichert — einschalten stellt alles wieder her.
              Home, Kontakt, Impressum und Datenschutz sind immer an.
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-2xs font-semibold px-2.5 py-1 rounded-md ${sv.cls}`}>
            <i className={sv.icon}></i>
            {sv.text}
          </span>
        </div>

        {groups.map((group) => (
          <section key={group} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="px-4 py-2.5 text-2xs font-black uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200">{group}</h3>
            <ul className="divide-y divide-gray-100">
              {SITE_PAGES.filter((p) => p.group === group).map((page) => {
                const on = pages.pageOn(page);
                return (
                  <li key={page.path} className="flex items-center gap-4 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${on ? 'text-gray-900' : 'text-gray-400'}`}>{page.label}</span>
                        {!on && (
                          <span className="text-3xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">aus</span>
                        )}
                      </div>
                      <p className="text-2xs text-gray-400 mt-0.5 truncate">
                        {page.path}
                        {!on && <> · leitet weiter zu {parentLabel(page)}</>}
                      </p>
                    </div>
                    <Switch on={on} label={page.label} onChange={(next) => void pages.setOn(page, next)} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
