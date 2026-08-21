import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import JobCard from './components/JobCard';
import JobsHero from './components/JobsHero';
import JobsFilter from './components/JobsFilter';
import WoodenDivider from '@/components/base/WoodenDivider';
import { mockJobs } from '@/mocks/jobs';

export interface JobPosting {
  hash: string;
  title: string;
  location: string;
  department?: string;
  employmentType?: string;
  publishedAt?: string;
  shortDescription?: string;
}

const BITE_KEY = 'sonic-sales-support-gmbh:main-listing';

export default function JobsPage() {
  useSEO({
    title: 'Stellenangebote | Sonic Group — Jobs in Sales & Field Promotion',
    description: 'Alle offenen Stellen bei Sonic Group. Interne Sales-Karriere in Krefeld oder flexible Field-Promoter-Jobs im DACH-Raum.',
    keywords: 'Stellenangebote Sonic, Jobs Sales DACH, Field Promoter Jobs, Karriere Krefeld',
    canonical: 'https://sonic-group.de/jobs',
  });

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filtered, setFiltered] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('https://jobs.b-ite.com/api/v1/postings/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobListingKey: BITE_KEY }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // BITE API may return array directly or nested in a results/postings key
        const postings: JobPosting[] = Array.isArray(data)
          ? data
          : data.postings ?? data.results ?? data.data ?? [];
        setJobs(postings);
        setFiltered(postings);
      } catch (err) {
        console.error('BITE API error:', err);
        // Fallback to mock data so the page always renders
        setJobs(mockJobs);
        setFiltered(mockJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = jobs;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.location?.toLowerCase().includes(q) ||
          j.department?.toLowerCase().includes(q)
      );
    }
    if (locationFilter) {
      result = result.filter((j) => j.location?.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    setFiltered(result);
  }, [search, locationFilter, jobs]);

  const locations = Array.from(new Set(jobs.map((j) => j.location).filter(Boolean)));

  return (
    <div className="min-h-[100dvh] bg-white">
      <JobsHero jobCount={jobs.length} />

      <WoodenDivider />

      <section className="py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Filter bar */}
          <JobsFilter
            search={search}
            onSearch={setSearch}
            locationFilter={locationFilter}
            onLocationFilter={setLocationFilter}
            locations={locations}
            totalCount={filtered.length}
          />

          {/* States */}
          {loading && (
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-foreground-100 overflow-hidden" style={{ borderRadius: 0 }}>
                    <div className="h-[3px] w-full bg-foreground-100" />
                    <div className="p-5 space-y-3">
                      <div className="flex gap-2">
                        <div className="h-5 w-20 bg-foreground-100 animate-pulse" />
                        <div className="h-5 w-16 bg-foreground-100 animate-pulse" />
                      </div>
                      <div className="h-5 w-3/4 bg-foreground-100 animate-pulse" />
                      <div className="h-4 w-full bg-foreground-100 animate-pulse" />
                      <div className="h-4 w-2/3 bg-foreground-100 animate-pulse" />
                      <div className="pt-4 border-t border-foreground-50 flex justify-between">
                        <div className="h-4 w-24 bg-foreground-100 animate-pulse" />
                        <div className="h-4 w-16 bg-foreground-100 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="mt-12 text-center py-20 px-4 bg-[#fafaf8] border border-foreground-100">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-5 bg-white border-2 border-[#C8D400]/30">
                <i className="ri-wifi-off-line text-3xl text-[#C8D400]" />
              </div>
              <p className="text-base font-black text-[#1a1a1a] mb-2">Unser Stellenportal ist momentan nicht erreichbar.</p>
              <p className="text-sm text-foreground-500 mb-6 max-w-md mx-auto leading-relaxed">
                Wir entschuldigen uns für die Unannehmlichkeiten. Sie können uns direkt eine Initiativbewerbung senden.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-[#111] text-white text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-[#111] transition-all duration-200 cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  Erneut versuchen
                </button>
                <a
                  href="mailto:bewerbung@sonic-group.de?subject=Initiativbewerbung"
                  className="px-8 py-3 bg-white text-[#111] text-xs font-black uppercase tracking-widest border-2 border-[#111] hover:border-[#C8D400] hover:bg-primary-500/10 transition-all duration-200 cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-mail-send-line mr-1.5"></i>
                  Initiativbewerbung senden
                </a>
              </div>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="mt-12 text-center py-20 px-4 bg-[#fafaf8] border border-foreground-100">
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-5 bg-white border-2 border-[#C8D400]/30">
                <i className="ri-search-line text-3xl text-[#C8D400]" />
              </div>
              <p className="text-base font-black text-[#1a1a1a] mb-2">Keine passenden Stellen gefunden</p>
              <p className="text-sm text-foreground-500 mb-6 max-w-md mx-auto leading-relaxed">
                Versuche andere Suchbegriffe oder Filter. Wir haben ständig neue Positionen — schau später wieder vorbei.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button onClick={() => { setSearch(''); setLocationFilter(''); }} className="px-8 py-3 bg-primary-500 text-white text-xs font-black uppercase tracking-widest hover:bg-[#111] transition-all duration-200 cursor-pointer" style={{ borderRadius: 0 }}>
                  <i className="ri-restart-line mr-1.5"></i>
                  Filter zurücksetzen
                </button>
                <a
                  href="mailto:bewerbung@sonic-group.de?subject=Initiativbewerbung"
                  className="px-8 py-3 bg-white text-[#111] text-xs font-black uppercase tracking-widest border-2 border-[#111] hover:border-[#C8D400] hover:bg-primary-500/10 transition-all duration-200 cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-mail-send-line mr-1.5"></i>
                  Initiativ bewerben
                </a>
              </div>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((job) => (
                <JobCard key={job.hash} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-12 px-4 md:px-6 bg-[#111] mt-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C8D400] mb-1">Keine passende Stelle dabei?</p>
            <h3 className="text-xl font-black text-white uppercase">Initiativbewerbung jederzeit willkommen.</h3>
          </div>
          <a
            href="mailto:bewerbung@sonic-group.de?subject=Initiativbewerbung"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-3.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all duration-200 whitespace-nowrap cursor-pointer"
            style={{ borderRadius: 0 }}
          >
            <i className="ri-mail-send-line" />
            Initiativ bewerben
          </a>
        </div>
      </section>
    </div>
  );
}
