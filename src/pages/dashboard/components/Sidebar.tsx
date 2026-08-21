import { memo, useMemo, useState, useEffect, useCallback } from 'react';
import {
  PAGE_GROUPS,
  getCategoriesByPageGroup,
  getTotalImageCount,
  invalidateCategoryCache,
} from '@/lib/mediaStore';
import { getTextSectionCount, getTextEntryCount, getTotalTextCount, getTotalSectionCount } from '@/lib/textStore';

interface SidebarProps {
  activeGroup: string;
  onGroupSelect: (groupId: string) => void;
  variant: 'desktop' | 'mobile';
  onClose?: () => void;
  activeTab: 'media' | 'text';
}

interface GroupCounts {
  sections: number;
  images: number;
  recommended: number;
}

function buildGroupCounts(): Record<string, GroupCounts> {
  const byGroup = getCategoriesByPageGroup();
  const counts: Record<string, GroupCounts> = {};
  for (const [gid, cats] of Object.entries(byGroup)) {
    counts[gid] = {
      sections: cats.length,
      images: cats.reduce((sum, c) => sum + c.imageCount, 0),
      recommended: cats.reduce((sum, c) => sum + c.recommendedCount, 0),
    };
  }
  return counts;
}

const SidebarGroupButton = memo(function SidebarGroupButton({
  group,
  isActive,
  counts,
  textSections,
  textEntries,
  activeTab,
  onSelect,
}: {
  group: { id: string; label: string; icon: string };
  isActive: boolean;
  counts: GroupCounts;
  textSections: number;
  textEntries: number;
  activeTab: 'media' | 'text';
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(group.id)}
      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors whitespace-nowrap cursor-pointer group ${
        isActive
          ? 'bg-lime-400 text-gray-900 font-semibold'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <i className={`${group.icon} text-base w-5 h-5 flex items-center justify-center`}></i>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate">{group.label}</div>
        <div className={`text-[10px] leading-tight ${isActive ? 'text-gray-700' : 'text-gray-600'}`}>
          {activeTab === 'media' ? (
            <>{counts.sections} Abschnitte · {counts.images}/{counts.recommended} Bilder</>
          ) : (
            <>{textSections} Bereiche · {textEntries} Texte</>
          )}
        </div>
      </div>
      {isActive && (
        <i className="ri-arrow-right-s-line text-gray-700"></i>
      )}
    </button>
  );
});

export default memo(function Sidebar({ activeGroup, onGroupSelect, variant, onClose, activeTab }: SidebarProps) {
  const [groupCounts, setGroupCounts] = useState<Record<string, GroupCounts>>(buildGroupCounts);
  const [totalImages, setTotalImages] = useState(getTotalImageCount);
  const [totalTextEntries, setTotalTextEntries] = useState(getTotalTextCount);
  const [totalTextSections, setTotalTextSections] = useState(getTotalSectionCount);

  // Compute text counts per group
  const textCounts = useMemo(() => {
    const result: Record<string, { sections: number; entries: number }> = {};
    const groupIds = PAGE_GROUPS.map((g) => g.id);
    for (const gid of groupIds) {
      result[gid] = {
        sections: getTextSectionCount(gid),
        entries: getTextEntryCount(gid),
      };
    }
    return result;
  }, []);

  const refresh = useCallback(() => {
    invalidateCategoryCache();
    setGroupCounts(buildGroupCounts());
    setTotalImages(getTotalImageCount());
    setTotalTextEntries(getTotalTextCount());
    setTotalTextSections(getTotalSectionCount());
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('media-store-update', handler);
    window.addEventListener('text-store-update', handler);
    return () => {
      window.removeEventListener('media-store-update', handler);
      window.removeEventListener('text-store-update', handler);
    };
  }, [refresh]);

  const totalSections = useMemo(
    () => Object.values(groupCounts).reduce((s, g) => s + g.sections, 0),
    [groupCounts],
  );

  const navItems = useMemo(
    () =>
      PAGE_GROUPS.map((group) => {
        const tc = textCounts[group.id] || { sections: 0, entries: 0 };
        return (
          <SidebarGroupButton
            key={group.id}
            group={group}
            isActive={activeGroup === group.id}
            counts={groupCounts[group.id] || { sections: 0, images: 0, recommended: 0 }}
            textSections={tc.sections}
            textEntries={tc.entries}
            activeTab={activeTab}
            onSelect={onGroupSelect}
          />
        );
      }),
    [activeGroup, groupCounts, textCounts, activeTab, onGroupSelect],
  );

  return (
    <aside className="w-64 h-full min-h-0 bg-gray-900 text-white flex flex-col shrink-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {activeTab === 'media' ? 'Medien-Dashboard' : 'Text-Dashboard'}
            </span>
          </div>
          {variant === 'mobile' && onClose && (
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer rounded-md"
            >
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {activeTab === 'media' ? (
            <>
              <span className="flex items-center gap-1">
                <i className="ri-image-line text-[10px]"></i>
                {totalImages}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-folder-line text-[10px]"></i>
                {totalSections}
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <i className="ri-file-text-line text-[10px]"></i>
                {totalTextEntries}
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-folder-line text-[10px]"></i>
                {totalTextSections}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Page Groups */}
      <nav className="flex-1 overflow-y-auto py-2" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
        {navItems}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-800">
        <a
          href="/"
          className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
        >
          <i className="ri-arrow-left-line text-xs"></i>
          Zurück zur Website
        </a>
      </div>
    </aside>
  );
});