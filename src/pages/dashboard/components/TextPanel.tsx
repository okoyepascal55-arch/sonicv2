import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import {
  getTextSectionsByGroup,
  updateTextEntry,
  resetTextSection,
  resetAllText,
  getTextEntryCount,
  getTextSectionCount,
  type TextSection,
  type TextEntry,
} from '@/lib/textStore';

interface TextPanelProps {
  activeGroup: string;
}

/* ── Entry type icon map ── */
const ENTRY_ICONS: Record<string, string> = {
  heading: 'ri-heading',
  subheading: 'ri-heading',
  paragraph: 'ri-text',
  label: 'ri-price-tag-3-line',
  cta: 'ri-cursor-line',
  badge: 'ri-bookmark-line',
  stat: 'ri-numbers-line',
  'stat-label': 'ri-text-spacing',
  link: 'ri-link',
  'list-item': 'ri-list-check',
  quote: 'ri-double-quotes-l',
  caption: 'ri-image-add-line',
  tag: 'ri-hashtag',
  'nav-label': 'ri-menu-line',
  'footer-heading': 'ri-footprint-line',
  'footer-link': 'ri-external-link-line',
};

const ENTRY_COLORS: Record<string, string> = {
  heading: 'border-l-amber-400 bg-amber-50/50',
  subheading: 'border-l-amber-300 bg-amber-50/30',
  paragraph: 'border-l-blue-400 bg-blue-50/30',
  label: 'border-l-gray-400 bg-gray-50/50',
  cta: 'border-l-lime-400 bg-lime-50/50',
  badge: 'border-l-purple-400 bg-purple-50/30',
  stat: 'border-l-emerald-400 bg-emerald-50/50',
  'stat-label': 'border-l-emerald-300 bg-emerald-50/30',
  link: 'border-l-cyan-400 bg-cyan-50/30',
  'list-item': 'border-l-gray-300 bg-gray-50/30',
  quote: 'border-l-rose-400 bg-rose-50/30',
  caption: 'border-l-gray-300 bg-gray-50/30',
  tag: 'border-l-orange-400 bg-orange-50/30',
  'nav-label': 'border-l-sky-400 bg-sky-50/30',
  'footer-heading': 'border-l-slate-400 bg-slate-50/30',
  'footer-link': 'border-l-slate-300 bg-slate-50/30',
};

/* ── Memoized single text entry row ── */
interface EntryRowProps {
  entry: TextEntry;
  value: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: (value: string) => void;
}

const EntryRow = memo(function EntryRow({
  entry, value, isEditing, onStartEdit, onCancelEdit, onSave,
}: EntryRowProps) {
  const [draft, setDraft] = useState(value);
  const icon = ENTRY_ICONS[entry.type] || 'ri-text';
  const colorClass = ENTRY_COLORS[entry.type] || 'border-l-gray-400 bg-gray-50/30';

  useEffect(() => { setDraft(value); }, [value]);

  const handleSave = useCallback(() => {
    onSave(draft);
  }, [draft, onSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !entry.multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancelEdit();
    }
  }, [handleSave, onCancelEdit, entry.multiline]);

  return (
    <div className={`border-l-2 rounded-md px-3 py-2.5 transition-colors ${colorClass}`}>
      <div className="flex items-start gap-3">
        <span className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
          <i className={`${icon} text-gray-500 text-sm`}></i>
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-800 truncate">{entry.label}</span>
            <span className="text-3xs font-medium text-gray-400 uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded shrink-0">
              {entry.type}
            </span>
          </div>
          {entry.description && (
            <p className="text-2xs text-gray-400 mb-1.5 leading-tight">{entry.description}</p>
          )}

          {isEditing ? (
            <div className="space-y-2">
              {entry.multiline ? (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-lime-400 transition-colors resize-y min-h-[80px]"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:border-lime-400 transition-colors"
                  autoFocus
                />
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-lime-400 text-gray-900 hover:bg-lime-300 text-2xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-check-line mr-1"></i>
                  Speichern
                </button>
                <button
                  onClick={onCancelEdit}
                  className="px-2 py-1.5 text-2xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Abbrechen
                </button>
                <span className="text-2xs text-gray-400">
                  {entry.multiline ? 'Enter für neue Zeile' : 'Enter = Speichern, Esc = Abbrechen'}
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={onStartEdit}
              className={`cursor-pointer rounded-md px-2 py-1.5 -ml-2 hover:bg-white/80 transition-colors group ${
                entry.multiline ? '' : ''
              }`}
              title="Klicken zum Bearbeiten"
            >
              <p className={`text-xs text-gray-700 ${entry.multiline ? 'whitespace-pre-wrap' : 'truncate'}`}>
                {value || <span className="text-gray-400 italic">(leer)</span>}
              </p>
              <span className="text-3xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 inline-block">
                <i className="ri-pencil-line mr-0.5"></i>Klicken zum Bearbeiten
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/* ── Section accordion ── */
interface SectionRowProps {
  section: TextSection;
  isExpanded: boolean;
  onToggle: () => void;
}

const SectionRow = memo(function SectionRow({ section, isExpanded, onToggle }: SectionRowProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [localEntries, setLocalEntries] = useState<Map<string, string>>(() => {
    const map = new Map<string, string>();
    section.entries.forEach((e) => map.set(e.id, e.value));
    return map;
  });

  useEffect(() => {
    const map = new Map<string, string>();
    section.entries.forEach((e) => map.set(e.id, e.value));
    setLocalEntries(map);
  }, [section.entries]);

  const handleSave = useCallback((entryId: string, value: string) => {
    updateTextEntry(section.key, entryId, value);
    setLocalEntries((prev) => {
      const next = new Map(prev);
      next.set(entryId, value);
      return next;
    });
    setEditingId(null);
  }, [section.key]);

  const handleReset = useCallback(() => {
    resetTextSection(section.key);
    setShowResetConfirm(false);
  }, [section.key]);

  return (
    <div className={`bg-white border rounded-lg transition-all ${
      isExpanded ? 'border-lime-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer group"
      >
        <span className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors shrink-0 ${
          isExpanded ? 'bg-lime-400 text-gray-900' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
        }`}>
          <i className={`${isExpanded ? 'ri-folders-line' : 'ri-folder-line'} text-base`}></i>
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">{section.label}</div>
          <div className="text-2xs text-gray-400 flex items-center gap-2">
            <span>{section.entries.length} Texte</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 truncate">{section.pagePath}</span>
          </div>
        </div>
        <i className={`ri-arrow-down-s-line text-gray-400 transition-transform shrink-0 ${
          isExpanded ? 'rotate-180' : ''
        }`}></i>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center">
                <i className="ri-information-line text-gray-400 text-sm"></i>
              </span>
              <p className="text-2xs text-gray-500 max-w-lg leading-relaxed">{section.description}</p>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 text-2xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
            >
              <i className="ri-refresh-line text-xs"></i>
              Zurücksetzen
            </button>
          </div>

          <div className="space-y-2">
            {section.entries.map((entry) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                value={localEntries.get(entry.id) || entry.value}
                isEditing={editingId === entry.id}
                onStartEdit={() => setEditingId(entry.id)}
                onCancelEdit={() => setEditingId(null)}
                onSave={(v) => handleSave(entry.id, v)}
              />
            ))}
          </div>

          {section.entries.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <i className="ri-file-text-line text-2xl block mb-2 opacity-30"></i>
              <p className="text-xs">Keine Texteinträge in diesem Bereich</p>
            </div>
          )}
        </div>
      )}

      {/* Reset confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowResetConfirm(false)}></div>
          <div className="relative bg-white rounded-xl p-5 max-w-sm w-full shadow-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Bereich zurücksetzen?</h3>
            <p className="text-xs text-gray-500 mb-4">
              Alle Texte in &quot;{section.label}&quot; werden auf die Originalwerte zurückgesetzt.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
              >
                Abbrechen
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

/* ── Main Panel ── */
export default function TextPanel({ activeGroup }: TextPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showResetAll, setShowResetAll] = useState(false);

  const sections = useMemo(() => getTextSectionsByGroup(activeGroup), [activeGroup]);
  const entryCount = useMemo(() => getTextEntryCount(activeGroup), [activeGroup]);
  const sectionCount = useMemo(() => getTextSectionCount(activeGroup), [activeGroup]);

  // Refresh on store updates
  const [, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener('text-store-update', handler);
    return () => window.removeEventListener('text-store-update', handler);
  }, []);

  // Reset expanded state when group changes
  useEffect(() => {
    setExpandedSection(null);
    setSearch('');
  }, [activeGroup]);

  const groupLabel = useMemo(() => {
    const labels: Record<string, string> = {
      home: 'Home', losungen: 'Lösungen', leistungen: 'Leistungen', about: 'Über uns',
      case_studies: 'Fallbeispiele', blog: 'Blog', careers: 'Karriere', kontakt: 'Kontakt',
      team: 'Team', industries: 'Industries', lvp: 'Live Video Promotion',
      jobs: 'Jobs', ratgeber: 'Ratgeber', srt: 'SRT', common: 'Common Components',
    };
    return labels[activeGroup] || activeGroup;
  }, [activeGroup]);

  const groupIcon = useMemo(() => {
    const icons: Record<string, string> = {
      home: 'ri-home-line', losungen: 'ri-lightbulb-line', leistungen: 'ri-stack-line',
      about: 'ri-building-line', case_studies: 'ri-file-chart-line', blog: 'ri-article-line',
      careers: 'ri-briefcase-line', kontakt: 'ri-mail-send-line', team: 'ri-team-line',
      industries: 'ri-building-2-line', lvp: 'ri-live-line', jobs: 'ri-briefcase-4-line',
      ratgeber: 'ri-book-open-line', srt: 'ri-pie-chart-2-line', common: 'ri-puzzle-line',
    };
    return icons[activeGroup] || 'ri-folder-line';
  }, [activeGroup]);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections.filter((s) => {
      if (s.label.toLowerCase().includes(q)) return true;
      if (s.description.toLowerCase().includes(q)) return true;
      return s.entries.some(
        (e) =>
          e.label.toLowerCase().includes(q) ||
          e.value.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    });
  }, [sections, search]);

  const handleResetAll = useCallback(() => {
    resetAllText();
    setShowResetAll(false);
  }, []);

  if (sections.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50">
        <div className="text-center px-4">
          <i className="ri-file-text-line text-5xl mb-3 block opacity-30"></i>
          <p className="text-sm">Wähle eine Seitengruppe aus der Seitenleiste</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 overflow-hidden">
      {/* Group Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 flex items-center justify-center bg-gray-900 text-lime-400 rounded-md shrink-0">
              <i className={`${groupIcon} text-lg`}></i>
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">{groupLabel}</h2>
              <p className="text-xs text-gray-500">
                {sectionCount} Textbereiche · {entryCount} Texteinträge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400 text-xs"></i>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Texte durchsuchen…"
                className="pl-7 pr-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:border-lime-400 transition-colors w-48"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xs"></i>
                </button>
              )}
            </div>

            {/* Reset all */}
            <button
              onClick={() => setShowResetAll(true)}
              className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-transparent text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
            >
              <i className="ri-restart-line text-sm"></i>
              Alle zurücksetzen
            </button>
          </div>
        </div>

        {search && (
          <p className="text-2xs text-gray-400 mt-2">
            {filteredSections.length} von {sections.length} Bereichen gefunden
          </p>
        )}
      </div>

      {/* Sections List */}
      <div
        className="flex-1 overflow-y-auto min-h-0 px-6 py-4"
        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="max-w-5xl space-y-2">
          {filteredSections.map((section) => (
            <SectionRow
              key={section.key}
              section={section}
              isExpanded={expandedSection === section.key}
              onToggle={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
            />
          ))}

          {filteredSections.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <i className="ri-search-line text-4xl block mb-3 opacity-30"></i>
              <p className="text-sm">Keine Textbereiche gefunden</p>
              <p className="text-xs mt-1">Versuche einen anderen Suchbegriff</p>
            </div>
          )}
        </div>
      </div>

      {/* Reset all confirmation */}
      {showResetAll && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowResetAll(false)}></div>
          <div className="relative bg-white rounded-xl p-6 max-w-sm w-full shadow-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg shrink-0">
                <i className="ri-alert-line text-red-500 text-lg"></i>
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-900">Alle Texte zurücksetzen?</h3>
                <p className="text-xs text-gray-500">Diese Aktion betrifft ALLE Seiten</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Sämtliche Texte auf der gesamten Website werden auf die ursprünglichen Werte zurückgesetzt.
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowResetAll(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
              >
                Abbrechen
              </button>
              <button
                onClick={handleResetAll}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 text-sm font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Alle zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}