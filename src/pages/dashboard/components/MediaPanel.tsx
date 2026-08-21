import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import {
  PAGE_GROUPS,
  getCategoriesByPageGroup,
  getSectionImages,
  addSectionImage,
  addSectionImagesBulk,
  deleteSectionImagesBulk,
  updateSectionImage,
  deleteSectionImage,
  resetSection,
  reorderSectionImages,
  STORAGE_PREFIX,
  resolveImageUrl,
  markStoragePathAsFresh,
  getSyncStatus,
  retrySync,
  type MediaItem,
  type DesignSpec,
  type SyncStatus,
} from '@/lib/mediaStore';
import { supabase } from '@/lib/supabase';
import { compressImage } from '@/lib/imageCompress';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

interface MediaPanelProps {
  activeGroup: string;
}

/* ── Memoized image card ── */
interface ImageCardProps {
  item: MediaItem;
  idx: number;
  selected: boolean;
  onToggleSelect: (url: string) => void;
  onEdit: (item: MediaItem) => void;
  onDelete: (url: string) => void;
  onReplace: (url: string) => void;
  onDragStart: (idx: number) => void;
  onDragOver: (e: React.DragEvent, idx: number) => void;
  onDrop: (idx: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}

const ImageCard = memo(function ImageCard({
  item, idx, selected, onToggleSelect, onEdit, onDelete, onReplace,
  onDragStart, onDragOver, onDrop, onDragEnd,
  isDragging, isDragOver,
}: ImageCardProps) {
  const [errored, setErrored] = useState(false);
  const displayUrl = resolveImageUrl(item.url);

  const previewClass = useMemo(() => {
    try {
      if (item.url.endsWith('.svg')) return 'bg-gray-100 p-4';
    } catch { /* ignore */ }
    if (item.url.includes('search-image')) return 'bg-gray-50';
    return 'bg-gray-100';
  }, [item.url]);

  // ── Errored state ──
  if (errored) {
    return (
      <div
        className={`group/img border rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-all ${isDragging ? 'opacity-30 scale-95' : ''} ${isDragOver ? 'border-lime-400 border-2 bg-lime-50/50 scale-[1.02] shadow-sm' : ''} ${selected ? 'border-lime-400 ring-2 ring-lime-400/30' : 'border-gray-200'}`}
        draggable
        onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart(idx); }}
        onDragOver={(e) => { e.preventDefault(); onDragOver(e, idx); }}
        onDrop={(e) => { e.preventDefault(); onDrop(idx); }}
        onDragEnd={onDragEnd}
      >
        <div className="relative h-28 md:h-36 w-full bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <i className="ri-error-warning-line text-3xl opacity-40"></i>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSelect(item.url); }}
            className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors z-10 ${selected ? 'bg-lime-400 border-lime-400 text-gray-900' : 'bg-white/80 border-gray-300 text-transparent hover:border-gray-400'}`}
            title={selected ? 'Abwählen' : 'Auswählen'}
          >
            {selected && <i className="ri-check-line text-xs"></i>}
          </button>
          {item.wide && (
            <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 bg-gray-900/70 text-white text-3xs px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
              Wide
            </span>
          )}
          <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 flex gap-1 md:gap-1.5">
            <div
              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-900/80 text-gray-300 rounded-md cursor-grab active:cursor-grabbing"
              title="Ziehen zum Neusortieren"
            >
              <i className="ri-draggable text-2xs md:text-xs"></i>
            </div>
            <button
              onClick={() => onEdit(item)}
              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-900/80 text-white rounded-md cursor-pointer hover:bg-gray-900"
              title="Bild bearbeiten"
            >
              <i className="ri-pencil-line text-2xs md:text-xs"></i>
            </button>
            <button
              onClick={() => onReplace(item.url)}
              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-900/80 text-white rounded-md cursor-pointer hover:bg-lime-500 hover:text-gray-900"
              title="Bild ersetzen"
            >
              <i className="ri-image-edit-line text-2xs md:text-xs"></i>
            </button>
            <button
              onClick={() => onDelete(item.url)}
              className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
              title="Bild löschen"
            >
              <i className="ri-delete-bin-line text-2xs md:text-xs"></i>
            </button>
          </div>
        </div>
        <div className="px-2 md:px-3 py-1.5 md:py-2">
          <p className="text-2xs md:text-xs font-medium text-red-600 truncate mb-0.5 md:mb-1">
            {item.caption || `Image ${idx + 1}`} — (Kaputtes Bild)
          </p>
          <p className="text-3xs md:text-2xs text-gray-400 truncate font-mono">{item.url}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group/img border rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-all ${isDragging ? 'opacity-30 scale-95 shadow-none' : ''} ${isDragOver ? 'border-lime-400 border-2 bg-lime-50/50 scale-[1.02] shadow-sm' : ''} ${selected ? 'border-lime-400 ring-2 ring-lime-400/30' : 'border-gray-200'}`}
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart(idx); }}
      onDragOver={(e) => { e.preventDefault(); onDragOver(e, idx); }}
      onDrop={(e) => { e.preventDefault(); onDrop(idx); }}
      onDragEnd={onDragEnd}
    >
      <div className={`relative h-28 md:h-36 w-full ${previewClass}`}>
        <img
          key={displayUrl}
          src={displayUrl}
          alt={item.caption || `Image ${idx + 1}`}
          loading={item.url.startsWith('__storage__:') ? 'eager' : 'lazy'}
          className={`w-full h-full ${item.url.endsWith('.svg') ? 'object-contain p-3' : 'object-cover'}`}
          onError={() => setErrored(true)}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSelect(item.url); }}
          className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors z-10 ${selected ? 'bg-lime-400 border-lime-400 text-gray-900' : 'bg-white/80 border-gray-300 text-transparent hover:border-gray-400'}`}
          title={selected ? 'Abwählen' : 'Auswählen'}
        >
          {selected && <i className="ri-check-line text-xs"></i>}
        </button>
        {item.wide && (
          <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 bg-gray-900/70 text-white text-3xs px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
            Wide
          </span>
        )}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 flex gap-1 md:gap-1.5 md:opacity-0 md:group-hover/img:opacity-100 transition-opacity">
          <div
            className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-900/80 text-gray-300 rounded-md cursor-grab active:cursor-grabbing hover:bg-gray-700 hover:text-white"
            title="Ziehen zum Neusortieren"
          >
            <i className="ri-draggable text-2xs md:text-xs"></i>
          </div>
          <button
            onClick={() => onEdit(item)}
            className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-900/80 text-white rounded-md cursor-pointer hover:bg-gray-900"
            title="Bild bearbeiten"
          >
            <i className="ri-pencil-line text-2xs md:text-xs"></i>
          </button>
          <button
            onClick={() => onReplace(item.url)}
            className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-gray-900/80 text-white rounded-md cursor-pointer hover:bg-lime-500 hover:text-gray-900"
            title="Bild ersetzen (neue Datei hochladen)"
          >
            <i className="ri-image-edit-line text-2xs md:text-xs"></i>
          </button>
          <button
            onClick={() => onDelete(item.url)}
            className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
            title="Bild löschen"
          >
            <i className="ri-delete-bin-line text-2xs md:text-xs"></i>
          </button>
        </div>
      </div>
      <div className="px-2 md:px-3 py-1.5 md:py-2">
        {item.caption && (
          <p className="text-2xs md:text-xs font-medium text-gray-700 truncate mb-0.5 md:mb-1">{item.caption}</p>
        )}
        <p className="text-3xs md:text-2xs text-gray-400 truncate font-mono">{item.url}</p>
      </div>
    </div>
  );
});

/* ── Section row ── */
interface SectionRowProps {
  cat: { key: string; label: string; imageCount: number; recommendedCount: number; designSpec: DesignSpec | null };
  isExpanded: boolean;
  sectionImages: MediaItem[];
  selectedUrls: Set<string>;
  dragIndex: number | null;
  dragOverIndex: number | null;
  onToggle: (key: string) => void;
  onOpenAddModal: (mode: 'url' | 'upload') => void;
  onBulkUpload: () => void;
  onResetSection: () => void;
  onEdit: (item: MediaItem) => void;
  onDelete: (url: string) => void;
  onReplace: (url: string) => void;
  onToggleSelect: (url: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDragStart: (idx: number) => void;
  onDragOver: (e: React.DragEvent, idx: number) => void;
  onDrop: (idx: number) => void;
  onDragEnd: () => void;
}

const SectionRow = memo(function SectionRow({
  cat, isExpanded, sectionImages, selectedUrls, dragIndex, dragOverIndex,
  onToggle, onOpenAddModal, onBulkUpload, onResetSection, onEdit, onDelete, onReplace,
  onToggleSelect, onSelectAll, onDeselectAll,
  onDragStart, onDragOver, onDrop, onDragEnd,
}: SectionRowProps) {
  return (
    <div
      className={`bg-white border rounded-lg transition-all ${
        isExpanded ? 'border-lime-400 shadow-sm' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <button
        onClick={() => onToggle(cat.key)}
        className="w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 text-left cursor-pointer group"
      >
        <span
          className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md transition-colors shrink-0 ${
            isExpanded ? 'bg-lime-400 text-gray-900' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
          }`}
        >
          <i className={`${isExpanded ? 'ri-folder-open-line' : 'ri-folder-line'} text-xs md:text-base`}></i>
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-xs md:text-sm font-semibold text-gray-900 truncate">{cat.label}</div>
          <div className="text-2xs text-gray-400 flex items-center gap-2">
            <span>{cat.imageCount} Bilder</span>
            {cat.recommendedCount > 0 && (
              <>
                {cat.imageCount > cat.recommendedCount ? (
                  <span className="text-2xs text-red-400 font-medium">
                    Design: {cat.recommendedCount} (zu viele)
                  </span>
                ) : cat.imageCount === cat.recommendedCount ? (
                  <span className="text-2xs text-green-500 font-medium">
                    Design: {cat.recommendedCount} ✓
                  </span>
                ) : (
                  <span className="text-2xs text-amber-500 font-medium">
                    Design: {cat.recommendedCount}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <i
          className={`ri-arrow-down-s-line text-gray-400 transition-transform shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        ></i>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 px-3 md:px-4 py-3 md:py-4">
          {/* ── Design Spec Guidance ── */}
          {cat.designSpec && (
            <div className="mb-3 px-2.5 md:px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                <i className="ri-ruler-line text-amber-600 text-sm"></i>
              </span>
              <span className="text-2xs md:text-xs font-bold text-amber-800 whitespace-nowrap">
                Ideal: {cat.designSpec.dimensions}
              </span>
              <span className="text-2xs md:text-xs font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                {cat.designSpec.orientation === 'icon' ? '□ 1:1' :
                 cat.designSpec.orientation === 'landscape' ? '▭ quer' :
                 cat.designSpec.orientation === 'portrait' ? '▯ hoch' :
                 cat.designSpec.orientation === 'ultrawide' ? '▬ ultrabreit' :
                 cat.designSpec.orientation === 'logo' ? 'SVG Logo' :
                 cat.designSpec.orientation === 'flexible' ? '↔ variabel' : '□ 1:1'}
              </span>
              <span className="text-2xs md:text-xs text-amber-600/80 leading-tight hidden sm:inline">
                {cat.designSpec.tip}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex items-center">
              <button
                onClick={() => onOpenAddModal('url')}
                className="inline-flex items-center gap-1 px-2.5 md:px-3 py-1.5 bg-lime-400 text-gray-900 hover:bg-lime-300 text-2xs md:text-xs font-bold uppercase tracking-wider rounded-l-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-link text-xs md:text-sm"></i>
                <span className="hidden sm:inline">URL</span>
              </button>
              <button
                onClick={() => onOpenAddModal('upload')}
                className="inline-flex items-center gap-1 px-2.5 md:px-3 py-1.5 bg-lime-500 text-gray-900 hover:bg-lime-400 text-2xs md:text-xs font-bold uppercase tracking-wider rounded-r-md transition-colors cursor-pointer whitespace-nowrap border-l border-lime-600/20"
              >
                <i className="ri-upload-cloud-line text-xs md:text-sm"></i>
                <span className="hidden sm:inline">Upload</span>
              </button>
            </div>
            <button
              onClick={onBulkUpload}
              className="inline-flex items-center gap-1 px-2.5 md:px-3 py-1.5 bg-amber-500 text-gray-900 hover:bg-amber-400 text-2xs md:text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-stack-line text-xs md:text-sm"></i>
              <span className="hidden sm:inline">Bulk</span>
            </button>
            <button
              onClick={onResetSection}
              className="inline-flex items-center gap-1 px-2.5 md:px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 text-2xs md:text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line text-xs md:text-sm"></i>
              <span className="hidden sm:inline">Zurücksetzen</span>
            </button>
            <span className="text-2xs text-gray-400 sm:ml-auto">
              {sectionImages.length} Bilder
              {dragIndex !== null && (
                <span className="text-lime-600 ml-1">— Ziehe Bild {dragIndex + 1}…</span>
              )}
            </span>
            <button
              onClick={onSelectAll}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-2xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-checkbox-multiple-line text-xs"></i>
              Alle
            </button>
            {selectedUrls.size > 0 && (
              <button
                onClick={onDeselectAll}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-500 hover:bg-gray-200 text-2xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-close-line text-xs"></i>
                Keine
              </button>
            )}
          </div>

          {sectionImages.length === 0 ? (
            <div className="text-center py-8 md:py-10 text-gray-400">
              <i className="ri-image-add-line text-2xl md:text-3xl block mb-2 opacity-30"></i>
              <p className="text-xs">Keine Bilder in diesem Abschnitt</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
              {sectionImages.map((item, idx) => (
                <ImageCard
                  key={item.url}
                  item={item}
                  idx={idx}
                  selected={selectedUrls.has(item.url)}
                  onToggleSelect={onToggleSelect}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onReplace={onReplace}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragEnd={onDragEnd}
                  isDragging={dragIndex === idx}
                  isDragOver={dragOverIndex === idx}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default function MediaPanel({ activeGroup }: MediaPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sectionImages, setSectionImages] = useState<MediaItem[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addMode, setAddMode] = useState<'url' | 'upload'>('url');
  const [addUrl, setAddUrl] = useState('');
  const [addCaption, setAddCaption] = useState('');
  const [addWide, setAddWide] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<MediaItem | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editWide, setEditWide] = useState(false);
  const [storeError, setStoreError] = useState<string | null>(null);

  // ── Selection state ──
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false);

  // ── Drag state ──
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // ── Replace state ──
  const [replaceTargetUrl, setReplaceTargetUrl] = useState<string | null>(null);
  const [replacing, setReplacing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // ── Bulk upload state ──
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkCaptionPrefix, setBulkCaptionPrefix] = useState('');
  const [bulkWide, setBulkWide] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ total: number; done: number; errors: string[] }>({ total: 0, done: 0, errors: [] });
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  // ── Store version trigger ──
  const [storeVersion, setStoreVersion] = useState(0);

  // ── Publish (Supabase sync) status — separate from local save success ──
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => getSyncStatus());

  // ── Local preview ObjectURL for single upload ──
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);

  const group = useMemo(() => PAGE_GROUPS.find((g) => g.id === activeGroup), [activeGroup]);
  const groupedCategories = useMemo(() => getCategoriesByPageGroup(), [storeVersion]);
  const categories = useMemo(() => groupedCategories[activeGroup] || [], [groupedCategories, activeGroup]);

  const refreshSection = useCallback((key: string) => {
    setSectionImages(getSectionImages(key));
  }, []);

  useEffect(() => {
    if (expandedSection) {
      refreshSection(expandedSection);
    }
    const handler = () => {
      if (expandedSection) {
        refreshSection(expandedSection);
      }
    };
    window.addEventListener('media-store-update', handler);
    return () => window.removeEventListener('media-store-update', handler);
  }, [expandedSection, refreshSection]);

  useEffect(() => {
    const handler = () => setStoreVersion((v) => v + 1);
    window.addEventListener('media-store-update', handler);
    return () => window.removeEventListener('media-store-update', handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setSyncStatus((e as CustomEvent<SyncStatus>).detail);
    window.addEventListener('media-sync-status', handler);
    return () => window.removeEventListener('media-sync-status', handler);
  }, []);

  useEffect(() => {
    setExpandedSection(null);
    setSectionImages([]);
    setAddModalOpen(false);
    setAddUrl('');
    setAddCaption('');
    setAddWide(false);
    setUploadFile(null);
    setUploading(false);
    setUploadError('');
    setDeleteConfirm(null);
    setEditTarget(null);
    setStoreError(null);
    setDragIndex(null);
    setDragOverIndex(null);
    setReplaceTargetUrl(null);
    setReplacing(false);
    setBulkUploadOpen(false);
    setBulkFiles([]);
    setBulkCaptionPrefix('');
    setBulkWide(false);
    setBulkUploading(false);
    setBulkProgress({ total: 0, done: 0, errors: [] });
    setSelectedUrls(new Set());
    setBulkDeleteConfirmOpen(false);
  }, [activeGroup]);

  const handleSectionClick = useCallback((key: string) => {
    if (expandedSection === key) {
      setExpandedSection(null);
      setSectionImages([]);
      setDragIndex(null);
      setDragOverIndex(null);
    } else {
      setExpandedSection(key);
      setSectionImages(getSectionImages(key));
      setDragIndex(null);
      setDragOverIndex(null);
      setSelectedUrls(new Set());
    }
  }, [expandedSection]);

  /* ── Drag handlers ── */
  const handleDragStart = useCallback((idx: number) => {
    setDragIndex(idx);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIndex(idx);
  }, []);

  const handleDrop = useCallback((idx: number) => {
    if (dragIndex !== null && dragIndex !== idx && expandedSection) {
      setStoreError(null);
      try {
        reorderSectionImages(expandedSection, dragIndex, idx);
        refreshSection(expandedSection);
      } catch (err: any) {
        setStoreError(err?.message || 'Failed to reorder images');
      }
    }
    setDragIndex(null);
    setDragOverIndex(null);
  }, [dragIndex, expandedSection, refreshSection]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  /* ── Replace handler ── */
  const handleReplaceClick = useCallback((url: string) => {
    setReplaceTargetUrl(url);
    replaceFileInputRef.current?.click();
  }, []);

  const handleReplaceFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replaceTargetUrl || !expandedSection) {
      setReplaceTargetUrl(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setStoreError(`Datei zu groß (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximale Größe: 10 MB.`);
      setReplaceTargetUrl(null);
      if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
      return;
    }

    setReplacing(true);
    setStoreError(null);

    try {
      const optimized = await compressImage(file);
      const safeName = optimized.name
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/--+/g, '-');
      const timestamp = Date.now();
      const path = `dashboard/${timestamp}-${safeName}`;

      const { error: uploadErr } = await supabase.storage
        .from('media')
        .upload(path, optimized, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadErr) throw uploadErr;

      // Mark as fresh for cache-busting
      markStoragePathAsFresh(path);

      const storageUrl = `${STORAGE_PREFIX}${path}`;

      updateSectionImage(expandedSection, replaceTargetUrl, { url: storageUrl });
      refreshSection(expandedSection);
      setReplaceTargetUrl(null);
    } catch (err: any) {
      const msg = err?.message || 'Replace failed';
      setStoreError(msg);
      setReplaceTargetUrl(null);
    } finally {
      setReplacing(false);
      if (replaceFileInputRef.current) {
        replaceFileInputRef.current.value = '';
      }
    }
  }, [replaceTargetUrl, expandedSection, refreshSection]);

  const openAddModal = useCallback((mode: 'url' | 'upload') => {
    setAddMode(mode);
    setAddUrl('');
    setAddCaption('');
    setAddWide(false);
    setUploadFile(null);
    // Revoke any lingering ObjectURL from a previous session
    setUploadPreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    setUploadError('');
    setStoreError(null);
    setAddModalOpen(true);
  }, []);

  /* ── Selection handlers ── */
  const handleToggleSelect = useCallback((url: string) => {
    setSelectedUrls((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!expandedSection) return;
    const images = getSectionImages(expandedSection);
    setSelectedUrls(new Set(images.map((img) => img.url)));
  }, [expandedSection]);

  const handleDeselectAll = useCallback(() => {
    setSelectedUrls(new Set());
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (!expandedSection || selectedUrls.size === 0) return;
    setStoreError(null);
    try {
      const deletedCount = deleteSectionImagesBulk(expandedSection, Array.from(selectedUrls));
      setSelectedUrls(new Set());
      setBulkDeleteConfirmOpen(false);
      refreshSection(expandedSection);
      if (deletedCount === 0) {
        setStoreError('Keine der ausgewählten Bilder konnte gelöscht werden.');
      }
    } catch (err: any) {
      setStoreError(err?.message || 'Failed to delete images');
      setBulkDeleteConfirmOpen(false);
    }
  }, [expandedSection, selectedUrls, refreshSection]);

  /* ── Bulk upload handlers ── */
  const openBulkModal = useCallback(() => {
    setBulkUploadOpen(true);
    setBulkFiles([]);
    setBulkCaptionPrefix('');
    setBulkWide(false);
    setBulkUploading(false);
    setBulkProgress({ total: 0, done: 0, errors: [] });
    setStoreError(null);
  }, []);

  const closeBulkModal = useCallback(() => {
    setBulkUploadOpen(false);
    setBulkFiles([]);
    setBulkCaptionPrefix('');
    setBulkWide(false);
    setBulkProgress({ total: 0, done: 0, errors: [] });
  }, []);

  const handleBulkFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const oversized: string[] = [];
    const valid = files.filter((f) => {
      if (f.size > MAX_FILE_SIZE) {
        oversized.push(`${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`);
        return false;
      }
      return true;
    });
    if (oversized.length > 0) {
      setStoreError(`Übersprungen (zu groß, max 10 MB): ${oversized.join(', ')}`);
    }
    if (valid.length === 0) {
      if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
      return;
    }
    setBulkFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name + f.size));
      const unique = valid.filter((f) => !existingNames.has(f.name + f.size));
      return [...prev, ...unique];
    });
    if (!bulkCaptionPrefix.trim()) {
      const firstName = valid[0].name.replace(/\.[^/.]+$/, '');
      setBulkCaptionPrefix(firstName);
    }
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = '';
    setBulkProgress({ total: 0, done: 0, errors: [] });
  }, [bulkCaptionPrefix]);

  const handleBulkDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;
    const oversizedDrop: string[] = [];
    const validDrop = files.filter((f) => {
      if (f.size > MAX_FILE_SIZE) {
        oversizedDrop.push(`${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`);
        return false;
      }
      return true;
    });
    if (oversizedDrop.length > 0) {
      setStoreError(`Übersprungen (zu groß, max 10 MB): ${oversizedDrop.join(', ')}`);
    }
    if (validDrop.length === 0) return;
    setBulkFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name + f.size));
      const unique = validDrop.filter((f) => !existingNames.has(f.name + f.size));
      return [...prev, ...unique];
    });
    if (!bulkCaptionPrefix.trim()) {
      const firstName = validDrop[0].name.replace(/\.[^/.]+$/, '');
      setBulkCaptionPrefix(firstName);
    }
    setBulkProgress({ total: 0, done: 0, errors: [] });
  }, [bulkCaptionPrefix]);

  const removeBulkFile = useCallback((index: number) => {
    setBulkFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleBulkUpload = useCallback(async () => {
    if (bulkFiles.length === 0 || !expandedSection) return;

    setBulkUploading(true);
    setBulkProgress({ total: bulkFiles.length, done: 0, errors: [] });
    const errors: string[] = [];
    const newItems: MediaItem[] = [];

    for (let i = 0; i < bulkFiles.length; i++) {
      const file = bulkFiles[i];
      try {
        const optimized = await compressImage(file);
        const safeName = optimized.name
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, '-')
          .replace(/--+/g, '-');
        const timestamp = Date.now();
        const path = `dashboard/${timestamp}-${i}-${safeName}`;

        const { error: uploadErr } = await supabase.storage
          .from('media')
          .upload(path, optimized, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadErr) throw uploadErr;

        // Mark as fresh for cache-busting so image renders immediately
        markStoragePathAsFresh(path);

        const storageUrl = `${STORAGE_PREFIX}${path}`;
        const num = bulkFiles.length > 1 ? ` ${i + 1}` : '';
        const caption = bulkCaptionPrefix.trim() ? `${bulkCaptionPrefix.trim()}${num}` : file.name.replace(/\.[^/.]+$/, '');

        newItems.push({ url: storageUrl, caption, wide: bulkWide });
        setBulkProgress((prev) => ({ ...prev, done: prev.done + 1 }));
      } catch (err: any) {
        const msg = err?.message || 'Upload failed';
        errors.push(`${file.name}: ${msg}`);
        setBulkProgress((prev) => ({ ...prev, done: prev.done + 1, errors: [...prev.errors, `${file.name}: ${msg}`] }));
      }
    }

    // Add all successful uploads in one batch
    if (newItems.length > 0) {
      addSectionImagesBulk(expandedSection, newItems);
    }

    setBulkUploading(false);
    refreshSection(expandedSection);

    if (errors.length === 0 && newItems.length > 0) {
      closeBulkModal();
    } else if (errors.length === bulkFiles.length) {
      setStoreError(`Alle ${bulkFiles.length} Uploads fehlgeschlagen.`);
    }
  }, [bulkFiles, expandedSection, bulkCaptionPrefix, bulkWide, refreshSection, closeBulkModal]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`Datei zu groß (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximale Größe: 10 MB.`);
      return;
    }
    // Revoke previous ObjectURL to avoid memory leaks
    if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
    const preview = URL.createObjectURL(file);
    setUploadPreviewUrl(preview);
    setUploadFile(file);
    setUploadError('');
    if (!addCaption.trim()) {
      setAddCaption(file.name.replace(/\.[^/.]+$/, ''));
    }
  }, [addCaption, uploadPreviewUrl]);

  const handleUploadAndAdd = useCallback(async () => {
    if (!uploadFile || !expandedSection) return;

    setUploading(true);
    setUploadError('');
    setStoreError(null);

    try {
      const optimized = await compressImage(uploadFile);
      const safeName = optimized.name
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/--+/g, '-');
      const timestamp = Date.now();
      const path = `dashboard/${timestamp}-${safeName}`;

      const { error: uploadErr } = await supabase.storage
        .from('media')
        .upload(path, optimized, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadErr) throw uploadErr;

      // Mark as fresh so resolveImageUrl appends a cache-busting timestamp
      markStoragePathAsFresh(path);

      const storageUrl = `${STORAGE_PREFIX}${path}`;

      const added = addSectionImage(expandedSection, storageUrl, addCaption.trim(), addWide);
      if (!added) {
        setUploadError('Diese Bild-URL existiert bereits in diesem Abschnitt.');
        setUploading(false);
        return;
      }

      setAddModalOpen(false);
      setUploadFile(null);
      // Revoke ObjectURL now that the real URL is in the store
      if (uploadPreviewUrl) {
        URL.revokeObjectURL(uploadPreviewUrl);
        setUploadPreviewUrl(null);
      }
      refreshSection(expandedSection);
    } catch (err: any) {
      const msg = err?.message || 'Upload failed';
      setUploadError(msg);
      if (msg.includes('storage') || msg.includes('localStorage')) {
        setStoreError(msg);
      }
    } finally {
      setUploading(false);
    }
  }, [uploadFile, expandedSection, addCaption, addWide, uploadPreviewUrl, refreshSection]);

  const handleAddUrl = useCallback(() => {
    if (!addUrl.trim() || !expandedSection) return;
    setStoreError(null);
    try {
      const added = addSectionImage(expandedSection, addUrl.trim(), addCaption.trim(), addWide);
      if (!added) {
        setUploadError('Diese Bild-URL existiert bereits in diesem Abschnitt.');
        return;
      }
      setAddUrl('');
      setAddCaption('');
      setAddWide(false);
      setAddModalOpen(false);
      refreshSection(expandedSection);
    } catch (err: any) {
      const msg = err?.message || 'Failed to save image';
      setStoreError(msg);
      setUploadError(msg);
    }
  }, [addUrl, addCaption, addWide, expandedSection, refreshSection]);

  const handleDeleteImage = useCallback((url: string) => {
    if (!expandedSection) return;
    setStoreError(null);
    try {
      deleteSectionImage(expandedSection, url);
      setDeleteConfirm(null);
      refreshSection(expandedSection);
    } catch (err: any) {
      const msg = err?.message || 'Failed to delete image';
      setStoreError(msg);
      setDeleteConfirm(null);
    }
  }, [expandedSection, refreshSection]);

  const handleResetSection = useCallback(() => {
    if (!expandedSection) return;
    setStoreError(null);
    try {
      resetSection(expandedSection);
      refreshSection(expandedSection);
    } catch (err: any) {
      setStoreError(err?.message || 'Failed to reset section');
    }
  }, [expandedSection, refreshSection]);

  const openEditModal = useCallback((item: MediaItem) => {
    setEditTarget(item);
    setEditCaption(item.caption || '');
    setEditUrl(item.url);
    setEditWide(item.wide || false);
    setStoreError(null);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!editTarget || !expandedSection) return;
    setStoreError(null);
    try {
      updateSectionImage(expandedSection, editTarget.url, {
        url: editUrl.trim() || editTarget.url,
        caption: editCaption.trim(),
        wide: editWide,
      });
      setEditTarget(null);
      refreshSection(expandedSection);
    } catch (err: any) {
      setStoreError(err?.message || 'Failed to save changes');
      setEditTarget(null);
    }
  }, [editTarget, expandedSection, editUrl, editCaption, editWide, refreshSection]);

  const sectionRows = useMemo(() => {
    return categories.map((cat) => {
      const isExpanded = expandedSection === cat.key;
      return (
        <SectionRow
          key={cat.key}
          cat={cat}
          isExpanded={isExpanded}
          sectionImages={isExpanded ? sectionImages : []}
          selectedUrls={isExpanded ? selectedUrls : new Set()}
          dragIndex={dragIndex}
          dragOverIndex={dragOverIndex}
          onToggle={handleSectionClick}
          onOpenAddModal={openAddModal}
          onBulkUpload={openBulkModal}
          onResetSection={handleResetSection}
          onEdit={openEditModal}
          onDelete={(url: string) => setDeleteConfirm(url)}
          onReplace={handleReplaceClick}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        />
      );
    });
  }, [
    categories, expandedSection, sectionImages, selectedUrls,
    dragIndex, dragOverIndex,
    handleSectionClick, openAddModal, openBulkModal, handleResetSection,
    openEditModal, handleReplaceClick,
    handleToggleSelect, handleSelectAll, handleDeselectAll,
    handleDragStart, handleDragOver, handleDrop, handleDragEnd,
  ]);

  if (!group) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center px-4">
          <i className="ri-image-line text-5xl mb-3 block opacity-30"></i>
          <p className="text-sm">Wähle eine Seitengruppe aus der Seitenleiste</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 overflow-hidden">
      {/* Hidden file input for image replacement */}
      <input
        ref={replaceFileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleReplaceFileSelect}
        className="hidden"
      />

      {/* Replacing overlay */}
      {replacing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl px-6 py-5 shadow-xl border border-gray-200 flex items-center gap-3">
            <i className="ri-loader-4-line animate-spin text-lime-500 text-xl"></i>
            <span className="text-sm font-semibold text-gray-700">Bild wird ersetzt…</span>
          </div>
        </div>
      )}

      {/* Group Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center bg-gray-900 text-lime-400 rounded-md shrink-0">
            <i className={`${group.icon} text-sm md:text-lg`}></i>
          </span>
          <div className="min-w-0">
            <h2 className="text-sm md:text-lg font-bold text-gray-900 truncate">{group.label}</h2>
            <p className="text-2xs md:text-xs text-gray-500">
              {categories.length} Abschnitte ·{' '}
              {categories.reduce((sum, c) => sum + c.imageCount, 0)} Bilder
            </p>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div
        className="flex-1 overflow-y-auto min-h-0 px-3 md:px-6 py-3 md:py-4"
        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
      >
        {/* ── Floating bulk action bar ── */}
        {selectedUrls.size > 0 && expandedSection && (
          <div className="sticky top-0 z-20 mb-3 bg-gray-900 text-white rounded-xl px-3 md:px-4 py-2.5 flex items-center gap-3 shadow-lg">
            <span className="w-7 h-7 flex items-center justify-center bg-lime-400 text-gray-900 rounded-lg shrink-0">
              <i className="ri-check-double-line text-sm"></i>
            </span>
            <span className="text-xs md:text-sm font-semibold flex-1 whitespace-nowrap">
              {selectedUrls.size} Bild{selectedUrls.size !== 1 ? 'er' : ''} ausgewählt
            </span>
            <button
              onClick={handleDeselectAll}
              className="px-2.5 md:px-3 py-1.5 text-2xs md:text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap rounded-md"
            >
              Abwählen
            </button>
            <button
              onClick={() => setBulkDeleteConfirmOpen(true)}
              className="px-3 md:px-4 py-1.5 bg-red-500 hover:bg-red-400 text-white text-2xs md:text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
            >
              <i className="ri-delete-bin-line text-xs"></i>
              Löschen
            </button>
          </div>
        )}

        <div className="max-w-5xl space-y-2">
          {/* Publish (Supabase sync) error banner — local save succeeded but
              visitors/other browsers won't see the change until this resolves */}
          {syncStatus.lastError && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4 mb-3 flex items-start gap-2">
              <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ri-cloud-off-line text-amber-500 text-sm"></i>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-semibold text-amber-800 mb-0.5">
                  Nicht veröffentlicht
                </p>
                <p className="text-2xs md:text-xs text-amber-700 break-words">
                  Änderungen sind in diesem Browser gespeichert, aber auf der Live-Seite noch nicht sichtbar: {syncStatus.lastError}
                </p>
              </div>
              <button
                onClick={() => retrySync()}
                disabled={syncStatus.inFlight}
                className="px-2.5 md:px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-2xs md:text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {syncStatus.inFlight ? 'Versuche…' : 'Erneut versuchen'}
              </button>
            </div>
          )}

          {/* Storage error banner */}
          {storeError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4 mb-3 flex items-start gap-2">
              <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                <i className="ri-error-warning-line text-red-500 text-sm"></i>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-semibold text-red-700 mb-0.5">
                  Speicherfehler
                </p>
                <p className="text-2xs md:text-xs text-red-600 break-words">{storeError}</p>
              </div>
              <button
                onClick={() => setStoreError(null)}
                className="w-5 h-5 flex items-center justify-center text-red-400 hover:text-red-600 shrink-0 cursor-pointer"
                title="Fehler ausblenden"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          )}

          {sectionRows}

          {categories.length === 0 && (
            <div className="text-center py-16 md:py-20 text-gray-400">
              <i className="ri-folder-open-line text-4xl md:text-5xl block mb-3 opacity-30"></i>
              <p className="text-xs md:text-sm">Keine Abschnitte in dieser Gruppe</p>
            </div>
          )}
        </div>
      </div>

      {/* ────────── Delete Confirmation Modal ────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteConfirm(null)}></div>
          <div className="relative bg-white rounded-xl p-4 md:p-6 max-w-sm w-full shadow-xl border border-gray-200">
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2">Bild löschen?</h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4">
              Dieses Bild wird aus dem Abschnitt entfernt. Du kannst es mit &quot;Zurücksetzen&quot;
              wiederherstellen.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleDeleteImage(deleteConfirm)}
                className="px-3 md:px-4 py-2 bg-red-500 text-white hover:bg-red-600 text-xs md:text-sm font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────── Bulk Delete Confirmation Modal ────────── */}
      {bulkDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setBulkDeleteConfirmOpen(false)}></div>
          <div className="relative bg-white rounded-xl p-4 md:p-6 max-w-sm w-full shadow-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-lg shrink-0">
                <i className="ri-delete-bin-line text-red-500 text-base"></i>
              </span>
              <h3 className="text-sm md:text-base font-bold text-gray-900">
                {selectedUrls.size} Bild{selectedUrls.size !== 1 ? 'er' : ''} löschen?
              </h3>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mb-5">
              Diese Bilder werden aus dem Abschnitt entfernt. Du kannst sie mit &quot;Zurücksetzen&quot;
              wiederherstellen.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setBulkDeleteConfirmOpen(false)}
                className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
              >
                Abbrechen
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 md:px-4 py-2 bg-red-500 text-white hover:bg-red-600 text-xs md:text-sm font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                {selectedUrls.size} löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────── Add Image Modal ────────── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 pt-16 md:pt-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl p-4 md:p-6 max-w-lg w-full shadow-xl border border-gray-200 max-h-[85vh] overflow-y-auto">
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-4">Bild hinzufügen</h3>

            <div className="flex items-center gap-1 mb-4 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setAddMode('url')}
                className={`flex-1 py-1.5 md:py-2 text-2xs md:text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  addMode === 'url'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="ri-link mr-1"></i>
                URL einfügen
              </button>
              <button
                onClick={() => setAddMode('upload')}
                className={`flex-1 py-1.5 md:py-2 text-2xs md:text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  addMode === 'upload'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="ri-upload-cloud-line mr-1"></i>
                Datei hochladen
              </button>
            </div>

            {addMode === 'url' ? (
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-2xs md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Bild-URL
                  </label>
                  <input
                    type="text"
                    value={addUrl}
                    onChange={(e) => setAddUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs md:text-sm focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-2xs md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Beschriftung (optional)
                  </label>
                  <input
                    type="text"
                    value={addCaption}
                    onChange={(e) => setAddCaption(e.target.value)}
                    placeholder="z.B. Hero Background"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs md:text-sm focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addWide}
                    onChange={(e) => setAddWide(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-lime-400 focus:ring-lime-400"
                  />
                  <span className="text-xs md:text-sm text-gray-600">Breitbild (Wide)</span>
                </label>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-5 md:p-8 text-center cursor-pointer transition-colors ${
                    uploadFile
                      ? 'border-lime-400 bg-lime-50'
                      : 'border-gray-300 hover:border-lime-400 hover:bg-gray-50'
                  }`}
                >
                  {uploadFile ? (
                    <div className="space-y-1">
                      {uploadPreviewUrl && (
                        <div className="mx-auto w-24 h-24 rounded-lg overflow-hidden mb-2 ring-2 ring-lime-400 shadow-md">
                          <img
                            src={uploadPreviewUrl}
                            alt="Vorschau"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <i className="ri-file-image-line text-2xl md:text-3xl text-lime-500 block"></i>
                      <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">{uploadFile.name}</p>
                      <p className="text-2xs md:text-xs text-gray-400">
                        {(uploadFile.size / 1024).toFixed(1)} KB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadFile(null);
                          if (uploadPreviewUrl) { URL.revokeObjectURL(uploadPreviewUrl); setUploadPreviewUrl(null); }
                        }}
                        className="text-2xs md:text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer mt-1 whitespace-nowrap"
                      >
                        Entfernen
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 md:space-y-2">
                      <i className="ri-upload-cloud-2-line text-2xl md:text-3xl text-gray-400 block"></i>
                      <p className="text-xs md:text-sm text-gray-500">
                        Klicke hier oder ziehe eine Datei hierher
                      </p>
                      <p className="text-2xs md:text-xs text-gray-400">PNG, JPG, WebP, SVG — max 10 MB · große Bilder werden automatisch komprimiert</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-2xs md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Beschriftung (optional)
                  </label>
                  <input
                    type="text"
                    value={addCaption}
                    onChange={(e) => setAddCaption(e.target.value)}
                    placeholder="z.B. Hero Background"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs md:text-sm focus:outline-none focus:border-lime-400 transition-colors"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addWide}
                    onChange={(e) => setAddWide(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-lime-400 focus:ring-lime-400"
                  />
                  <span className="text-xs md:text-sm text-gray-600">Breitbild (Wide)</span>
                </label>
                {uploadError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 text-2xs md:text-xs rounded-md">
                    {uploadError}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-end mt-5 md:mt-6">
              <button
                onClick={() => setAddModalOpen(false)}
                className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
              >
                Abbrechen
              </button>
              {addMode === 'url' ? (
                <button
                  onClick={handleAddUrl}
                  disabled={!addUrl.trim()}
                  className="px-3 md:px-4 py-2 bg-lime-400 text-gray-900 hover:bg-lime-300 text-xs md:text-sm font-bold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                >
                  Hinzufügen
                </button>
              ) : (
                <button
                  onClick={handleUploadAndAdd}
                  disabled={!uploadFile || uploading}
                  className="px-3 md:px-4 py-2 bg-lime-400 text-gray-900 hover:bg-lime-300 text-xs md:text-sm font-bold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                >
                  {uploading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-1"></i>
                      Upload…
                    </>
                  ) : (
                    'Hochladen & Hinzufügen'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ────────── Edit Image Modal ────────── */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 pt-16 md:pt-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditTarget(null)}></div>
          <div className="relative bg-white rounded-xl p-4 md:p-6 max-w-lg w-full shadow-xl border border-gray-200">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-100 rounded-md shrink-0">
                <i className="ri-pencil-line text-gray-600 text-sm"></i>
              </span>
              <h3 className="text-sm md:text-base font-bold text-gray-900">Bild bearbeiten</h3>
            </div>

            <div className="h-24 md:h-32 bg-gray-100 rounded-lg mb-3 md:mb-4 overflow-hidden">
              <img
                src={resolveImageUrl(editTarget.url)}
                alt={editTarget.caption || 'Preview'}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'text-gray-400');
                    parent.innerHTML = '<i class="ri-image-line text-3xl opacity-40"></i>';
                  }
                }}
              />
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-2xs md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Bild-URL
                </label>
                <input
                  type="text"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs md:text-sm font-mono focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-2xs md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Beschriftung
                </label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs md:text-sm focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editWide}
                  onChange={(e) => setEditWide(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-lime-400 focus:ring-lime-400"
                />
                <span className="text-xs md:text-sm text-gray-600">Breitbild (Wide)</span>
              </label>

              <button
                onClick={() => {
                  handleReplaceClick(editTarget.url);
                  setEditTarget(null);
                }}
                className="w-full py-2 md:py-2.5 bg-gray-100 hover:bg-lime-50 text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-lime-400 text-xs md:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <i className="ri-image-edit-line text-sm"></i>
                Neue Datei hochladen (Bild ersetzen)
              </button>
            </div>

            <div className="flex gap-2 justify-between mt-5 md:mt-6">
              <button
                onClick={() => {
                  setDeleteConfirm(editTarget.url);
                  setEditTarget(null);
                }}
                className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap rounded-md"
              >
                <i className="ri-delete-bin-line mr-1"></i>
                Löschen
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditTarget(null)}
                  className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 md:px-4 py-2 bg-lime-400 text-gray-900 hover:bg-lime-300 text-xs md:text-sm font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Speichern
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────── Bulk Upload Modal ────────── */}
      {bulkUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 pt-16 md:pt-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeBulkModal}></div>
          <div className="relative bg-white rounded-xl p-4 md:p-6 max-w-xl w-full shadow-xl border border-gray-200 max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 shrink-0">
              <span className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-amber-100 rounded-md shrink-0">
                <i className="ri-stack-line text-amber-600 text-sm"></i>
              </span>
              <div>
                <h3 className="text-sm md:text-base font-bold text-gray-900">Bulk Upload</h3>
                <p className="text-2xs text-gray-400">
                  Mehrere Bilder auf einmal hochladen
                </p>
              </div>
              {!bulkUploading && (
                <button
                  onClick={closeBulkModal}
                  className="ml-auto w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer rounded-md"
                >
                  <i className="ri-close-line text-sm md:text-base"></i>
                </button>
              )}
            </div>

            {/* Drop zone */}
            {!bulkUploading && (
              <>
                <div
                  onDragOver={(e) => { e.preventDefault(); }}
                  onDrop={handleBulkDrop}
                  onClick={() => bulkFileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-5 md:p-8 text-center cursor-pointer transition-colors shrink-0 ${
                    bulkFiles.length > 0
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-gray-300 hover:border-amber-400 hover:bg-gray-50'
                  }`}
                >
                  {bulkFiles.length > 0 ? (
                    <div className="space-y-1">
                      <i className="ri-stack-line text-2xl md:text-3xl text-amber-500 block"></i>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">
                        {bulkFiles.length} Datei{bulkFiles.length !== 1 ? 'en' : ''} ausgewählt
                      </p>
                      <p className="text-2xs md:text-xs text-gray-400">
                        {(bulkFiles.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(1)} MB gesamt
                      </p>
                      <p className="text-2xs text-amber-600 font-medium">
                        Klicke für weitere Dateien oder ziehe sie hierher
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 md:space-y-2">
                      <i className="ri-upload-cloud-2-line text-2xl md:text-3xl text-gray-400 block"></i>
                      <p className="text-xs md:text-sm text-gray-500">
                        Klicke hier oder ziehe Dateien hierher
                      </p>
                      <p className="text-2xs md:text-xs text-gray-400">
                        PNG, JPG, WebP, SVG — mehrere Dateien möglich · automatisch komprimiert
                      </p>
                    </div>
                  )}
                  <input
                    ref={bulkFileInputRef}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleBulkFileSelect}
                    className="hidden"
                  />
                </div>

                {/* File list preview */}
                {bulkFiles.length > 0 && (
                  <div className="mt-3 space-y-3 md:space-y-4 flex-1 overflow-y-auto min-h-0">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {bulkFiles.map((file, i) => (
                        <div key={`${file.name}-${file.size}-${i}`} className="relative group/file">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                              onLoad={(e) => {
                                const img = e.target as HTMLImageElement;
                                URL.revokeObjectURL(img.src);
                              }}
                            />
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeBulkFile(i); }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover/file:opacity-100 transition-opacity shadow-sm"
                            title="Entfernen"
                          >
                            <i className="ri-close-line text-3xs"></i>
                          </button>
                          <p className="text-3xs md:text-3xs text-gray-500 truncate mt-0.5 leading-tight">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Caption & options */}
                    <div className="space-y-2 md:space-y-3 pt-2 border-t border-gray-100 shrink-0">
                      <div>
                        <label className="block text-2xs md:text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                          Beschriftungs-Präfix (optional)
                        </label>
                        <input
                          type="text"
                          value={bulkCaptionPrefix}
                          onChange={(e) => setBulkCaptionPrefix(e.target.value)}
                          placeholder="z.B. Hero Background"
                          className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs md:text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                        {bulkFiles.length > 1 && bulkCaptionPrefix.trim() && (
                          <p className="text-3xs text-gray-400 mt-0.5">
                            Bilder werden nummeriert: &quot;{bulkCaptionPrefix.trim()} 1&quot;, &quot;{bulkCaptionPrefix.trim()} 2&quot;, …
                          </p>
                        )}
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bulkWide}
                          onChange={(e) => setBulkWide(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-amber-400 focus:ring-amber-400"
                        />
                        <span className="text-xs md:text-sm text-gray-600">Alle als Breitbild (Wide)</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 justify-end mt-4 md:mt-5 pt-3 border-t border-gray-100 shrink-0">
                  <button
                    onClick={closeBulkModal}
                    className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap rounded-md"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleBulkUpload}
                    disabled={bulkFiles.length === 0}
                    className="px-3 md:px-4 py-2 bg-amber-500 text-gray-900 hover:bg-amber-400 text-xs md:text-sm font-bold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-upload-cloud-line mr-1"></i>
                    {bulkFiles.length} Datei{bulkFiles.length !== 1 ? 'en' : ''} hochladen
                  </button>
                </div>
              </>
            )}

            {/* Uploading progress */}
            {bulkUploading && (
              <div className="flex-1 flex flex-col items-center justify-center py-8 md:py-12 min-h-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-amber-100 border-t-amber-500 animate-spin mb-4"></div>
                <p className="text-sm md:text-base font-bold text-gray-900 mb-1">
                  {bulkProgress.done} / {bulkProgress.total} hochgeladen
                </p>
                <div className="w-48 md:w-64 bg-gray-200 rounded-full h-1.5 md:h-2 mb-3 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${bulkProgress.total > 0 ? (bulkProgress.done / bulkProgress.total) * 100 : 0}%` }}
                  ></div>
                </div>
                {bulkProgress.errors.length > 0 && (
                  <div className="w-full max-h-32 overflow-y-auto mt-3 px-2">
                    <p className="text-2xs md:text-xs font-semibold text-red-600 mb-1">
                      {bulkProgress.errors.length} Fehler:
                    </p>
                    {bulkProgress.errors.map((err, i) => (
                      <p key={i} className="text-3xs md:text-2xs text-red-500 truncate">{err}</p>
                    ))}
                  </div>
                )}
                {bulkProgress.done === bulkProgress.total && bulkProgress.errors.length > 0 && (
                  <button
                    onClick={closeBulkModal}
                    className="mt-4 px-3 md:px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs md:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Schließen
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}