interface Props {
  search: string;
  onSearch: (v: string) => void;
  locationFilter: string;
  onLocationFilter: (v: string) => void;
  locations: string[];
  totalCount: number;
}

export default function JobsFilter({ search, onSearch, locationFilter, onLocationFilter, locations, totalCount }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 w-full">
        <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Stelle oder Abteilung suchen…"
          className="w-full pl-9 pr-4 py-3 bg-white border border-foreground-100 text-sm text-[#1a1a1a] font-medium placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-offset-2 focus:border-[#C8D400] transition-colors"
          style={{ borderRadius: 0 }}
        />
      </div>

      {/* Location filter */}
      {locations.length > 0 && (
        <div className="relative">
          <i className="ri-map-pin-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm pointer-events-none" />
          <select
            value={locationFilter}
            onChange={(e) => onLocationFilter(e.target.value)}
            className="pl-9 pr-8 py-3 bg-white border border-foreground-100 text-sm font-medium text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-offset-2 focus:border-[#C8D400] transition-colors appearance-none cursor-pointer min-w-[160px]"
            style={{ borderRadius: 0 }}
          >
            <option value="">Alle Standorte</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm pointer-events-none" />
        </div>
      )}

      {/* Count badge */}
      <div className="flex-shrink-0 px-4 py-3 bg-[#111] text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
        {totalCount} {totalCount === 1 ? 'Stelle' : 'Stellen'}
      </div>
    </div>
  );
}
