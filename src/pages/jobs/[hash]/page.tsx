import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import JobApplicationForm from '../components/JobApplicationForm';
import { mockJobs } from '@/mocks/jobs';

interface JobDetail {
  hash: string;
  title: string;
  location: string;
  department?: string;
  employmentType?: string;
  intro?: string;
  tasks?: string;
  requirements?: string;
  benefits?: string;
  publishedAt?: string;
}

export default function JobDetailPage() {
  const { hash } = useParams<{ hash: string }>();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useSEO({
    title: job ? `${job.title} | Sonic Group Karriere` : 'Stellenangebot | Sonic Group',
    description: job?.intro ? job.intro.replace(/<[^>]*>/g, '').slice(0, 155) : 'Bewirb dich jetzt bei Sonic Group.',
    canonical: `https://sonic-group.de/jobs/${hash}`,
  });

  useEffect(() => {
    if (!hash) return;
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://jobs.b-ite.com/jobposting/${hash}/json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: JobDetail = await res.json();
        setJob(data);
      } catch (err) {
        console.error('BITE detail fetch error:', err);
        // Fallback to mock data
        const mockJob = mockJobs.find((j) => j.hash === hash);
        if (mockJob) {
          setJob(mockJob);
        } else {
          setError('Stelle konnte nicht geladen werden. Bitte versuche es später erneut.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-[#C8D400] rounded-full animate-spin" />
          <p className="text-sm font-bold text-foreground-400 uppercase tracking-widest">Wird geladen…</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white">
            <i className="ri-file-damage-line text-2xl text-foreground-300" />
          </div>
          <p className="text-sm font-bold text-foreground-500 mb-4">{error || 'Stelle nicht gefunden.'}</p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground-950 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-all duration-200"
            style={{ borderRadius: 0 }}
          >
            <i className="ri-arrow-left-line" />
            Alle Stellen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Hero bar */}
      <div className="bg-foreground-950 pt-20 pb-10 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-wide mb-6"
          >
            <i className="ri-arrow-left-line" />
            Alle Stellen
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {job.department && (
              <span className="px-3 py-1 bg-white/10 text-2xs font-black uppercase tracking-[0.2em] text-white/60">
                {job.department}
              </span>
            )}
            {job.employmentType && (
              <span className="px-3 py-1 bg-primary-500/20 text-2xs font-black uppercase tracking-[0.2em] text-primary-500">
                {job.employmentType}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-5">
            {job.location && (
              <span className="flex items-center gap-2 text-sm text-white/60">
                <i className="ri-map-pin-line text-primary-500" />
                {job.location}
              </span>
            )}
            {job.publishedAt && (
              <span className="flex items-center gap-2 text-sm text-white/40">
                <i className="ri-calendar-line" />
                {new Date(job.publishedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Intro */}
            {job.intro && (
              <div className="mb-8">
                <div
                  className="bite-content"
                  dangerouslySetInnerHTML={{ __html: job.intro }}
                />
              </div>
            )}

            {/* Tasks */}
            {job.tasks && (
              <div className="mb-8">
                <h2 className="text-lg font-black text-[#1a1a1a] mb-4 flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary-500">
                    <i className="ri-task-line text-foreground-950 text-sm" />
                  </span>
                  Deine Aufgaben
                </h2>
                <div
                  className="bite-content"
                  dangerouslySetInnerHTML={{ __html: job.tasks }}
                />
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="mb-8">
                <h2 className="text-lg font-black text-[#1a1a1a] mb-4 flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary-500">
                    <i className="ri-shield-check-line text-foreground-950 text-sm" />
                  </span>
                  Dein Profil
                </h2>
                <div
                  className="bite-content"
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="mb-8">
                <h2 className="text-lg font-black text-[#1a1a1a] mb-4 flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary-500">
                    <i className="ri-gift-line text-foreground-950 text-sm" />
                  </span>
                  Was wir bieten
                </h2>
                <div
                  className="bite-content"
                  dangerouslySetInnerHTML={{ __html: job.benefits }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-[120px]">
              {/* Apply CTA card */}
              <div className="bg-foreground-950 p-6 mb-4">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-2">
                  Interessiert?
                </p>
                <h3 className="text-lg font-black text-white mb-4 leading-snug">
                  Jetzt bewerben als<br />
                  <span className="text-primary-500">{job.title}</span>
                </h3>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-widest hover:bg-white transition-all duration-200 cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-file-user-line" />
                  {showForm ? 'Formular schließen' : 'Bewerbung senden'}
                </button>
                <div className="flex items-center gap-2 mt-3">
                  <i className="ri-lock-line text-xs text-white/30" />
                  <span className="text-2xs text-white/30">Deine Daten werden sicher übertragen</span>
                </div>
              </div>

              {/* Quick facts */}
              <div className="border border-foreground-100 p-5">
                <p className="text-2xs font-black uppercase tracking-[0.25em] text-foreground-400 mb-3">Details zur Stelle</p>
                <div className="flex flex-col gap-3">
                  {job.location && (
                    <div className="flex items-start gap-3">
                      <i className="ri-map-pin-line text-primary-500 text-sm mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-2xs uppercase tracking-wide text-foreground-400 font-bold">Standort</p>
                        <p className="text-sm font-black text-[#1a1a1a]">{job.location}</p>
                      </div>
                    </div>
                  )}
                  {job.department && (
                    <div className="flex items-start gap-3">
                      <i className="ri-building-line text-primary-500 text-sm mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-2xs uppercase tracking-wide text-foreground-400 font-bold">Abteilung</p>
                        <p className="text-sm font-black text-[#1a1a1a]">{job.department}</p>
                      </div>
                    </div>
                  )}
                  {job.employmentType && (
                    <div className="flex items-start gap-3">
                      <i className="ri-briefcase-line text-primary-500 text-sm mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-2xs uppercase tracking-wide text-foreground-400 font-bold">Anstellungsart</p>
                        <p className="text-sm font-black text-[#1a1a1a]">{job.employmentType}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Share */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-foreground-100 text-xs font-bold text-foreground-500 hover:border-primary-500 hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer flex-1 justify-center"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-link text-sm" />
                  Link kopieren
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-foreground-100 text-xs font-bold text-foreground-500 hover:border-primary-500 hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer flex-1 justify-center"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-linkedin-line text-sm" />
                  Teilen
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inline application form (shows when button is clicked) */}
        {showForm && hash && (
          <div className="mt-12 pt-8 border-t border-foreground-100" id="bewerbung">
            <JobApplicationForm hash={hash} jobTitle={job.title} onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
