import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';

// Publii publishes a standard JSON Feed (https://www.jsonfeed.org) when
// "Enable JSON feed" is turned on in Website Settings → RSS/JSON feed.
interface PubliiFeedItem {
  id: string;
  url: string;
  title: string;
  summary?: string;
  content_html: string;
  image?: string;
  banner_image?: string;
  date_published: string;
  tags?: string[];
  authors?: Array<{ name: string; avatar?: string }>;
}

interface PubliiFeed {
  title: string;
  items: PubliiFeedItem[];
}

const POSTS_PER_PAGE = 9;

export function getPostSlug(item: PubliiFeedItem): string {
  const source = item.id || item.url || '';
  const trimmed = source.replace(/\/+$/, '');
  const segments = trimmed.split('/');
  return segments[segments.length - 1] || item.id;
}

export default function BlogPage() {
  useSEO({
    title: 'Blog | Sonic Group',
    description: 'Aktuelle Insights, News und Updates rund um Performance Marketing, Retail und POS-Activation von der Sonic Group.',
    keywords: 'Sonic Group Blog, Retail News, POS Activation, Performance Marketing, DACH',
    canonical: 'https://sonic-group.de/blog',
    ogTitle: 'Blog — Sonic Group',
    ogDescription: 'Insights und Erfolgsgeschichten aus der Welt des Performance Marketings.',
  });

  const { images: blogHeroImages } = useMediaStore('blog_images');
  const heroImage = blogHeroImages[0]?.url
    ? resolveImageUrl(blogHeroImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg';

  const [allPosts, setAllPosts] = useState<PubliiFeedItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        const feedUrl = import.meta.env.VITE_PUBLII_FEED_URL;
        if (!feedUrl) throw new Error('VITE_PUBLII_FEED_URL ist nicht gesetzt');

        const response = await fetch(feedUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
        }

        const data: PubliiFeed = await response.json();
        setAllPosts(data.items || []);
      } catch (err) {
        console.error(err);
        setError('Blogbeiträge konnten nicht geladen werden. Bitte versuche es später noch einmal.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Publii's feed has no categories endpoint — derive them from post tags.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    allPosts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return allPosts;
    return allPosts.filter((post) => post.tags?.includes(activeCategory));
  }, [allPosts, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const posts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (gridRef.current) {
      const yOffset = -100;
      const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('de-DE', options);
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-foreground-950 min-h-[480px] md:min-h-[520px]" style={{ paddingTop: 'clamp(56px, 14vw, 80px)', paddingBottom: '60px' }}>
        <div className="absolute inset-0 opacity-15">
          <img
            src={heroImage}
            alt="Blog Hero Background"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/80 to-[#1a1a1a]" />


        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center h-full">
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-primary-500/20">
              <i className="ri-article-line text-xl text-primary-500"></i>
            </div>
            <span className="text-primary-500 text-xs font-black uppercase tracking-widest">Magazin & Insights</span>
          </div>
          <h1 className="leist-h1-hub text-white mb-4 md:mb-6">
            SONIC<br />
            <span className="text-primary-500">BLOG</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-white/80 max-w-2xl mx-auto leading-relaxed">
            Aktuelle News, Expertenwissen und Best Practices für erfolgreiche Retail-Aktivierung.
          </p>
        </div>
      </section>

      {/* Dark-bg WoodenDivider — hero(dark) exit into content(light) */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      {/* ── BLOG CONTENT ── */}
      <section className="sonic-section-lg md:" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-6 mb-10 md:mb-16">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{activeCategory ? "Gefilterte Beiträge" : "Aktuelle Beiträge"}</span>
          </div>
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 w-full border-y border-black/5 py-8 mt-4">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${
                    activeCategory === null
                      ? 'bg-primary-500 text-[#1a1a1a] border-primary-500 shadow-[0_4px_14px_rgba(200,212,0,0.4)]'
                      : 'bg-transparent text-foreground-500 border-foreground-300 hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-primary-500 hover:shadow-[0_4px_14px_rgba(26,26,26,0.3)]'
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  Alle
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${
                      activeCategory === cat.name
                        ? 'bg-primary-500 text-[#1a1a1a] border-primary-500 shadow-[0_4px_14px_rgba(200,212,0,0.4)]'
                        : 'bg-transparent text-foreground-500 border-foreground-300 hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-primary-500 hover:shadow-[0_4px_14px_rgba(26,26,26,0.3)]'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-white border border-black/5 flex flex-col min-h-[400px]">
                  <div className="h-56 bg-foreground-200"></div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="h-4 bg-foreground-200 w-1/3 mb-4"></div>
                    <div className="h-6 bg-foreground-200 w-full mb-2"></div>
                    <div className="h-6 bg-foreground-200 w-2/3 mb-6"></div>
                    <div className="h-20 bg-foreground-200 w-full mb-6"></div>
                    <div className="h-10 bg-foreground-200 w-1/2 mt-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white p-10 text-center border border-black/10 mb-16">
              <i className="ri-error-warning-line text-4xl text-red-500 mb-4 block"></i>
              <p className="text-black/60 font-bold">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white p-10 text-center border border-black/10 mb-16">
              <p className="text-black/60 font-bold">In dieser Kategorie wurden noch keine Beiträge veröffentlicht.</p>
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {posts.map((post) => {
                  const imageUrl = post.image || post.banner_image;
                  const category = post.tags?.[0] || 'News';
                  const slug = getPostSlug(post);

                  return (
                    <Link
                      key={post.id}
                      to={`/blog/${slug}`}
                      className="group bg-white border border-black/5 flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                    >
                      <div className="relative h-56 md:h-64 overflow-hidden bg-[#1a1a1a]">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                            <i className="ri-image-line text-4xl text-white/20"></i>
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-primary-500 text-[#1a1a1a] text-[10px] font-black uppercase tracking-widest px-3 py-1">
                          {category}
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex-1 flex flex-col">
                        <div className="text-black/40 text-xs font-bold uppercase tracking-wider mb-3">
                          {formatDate(post.date_published)}
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-foreground-950 mb-4 leading-tight tracking-tight group-hover:text-primary-500 transition-colors line-clamp-3">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <div className="text-sm text-foreground-600 leading-relaxed mb-8 line-clamp-3">
                            {post.summary}
                          </div>
                        )}

                        <div className="mt-auto">
                          <span className="inline-flex items-center gap-2 text-sm font-black text-[#1a1a1a] uppercase tracking-wider group-hover:text-primary-500 transition-colors">
                            Weiterlesen
                            <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-16 md:mt-24">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 border ${
                      currentPage === 1
                        ? 'border-foreground-200 text-foreground-300 cursor-not-allowed bg-white'
                        : 'border-black/20 text-[#1a1a1a] bg-white hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-primary-500 hover:shadow-[0_4px_14px_rgba(26,26,26,0.3)]'
                    }`}
                    style={{ borderRadius: 0 }}
                    aria-label="Vorherige Seite"
                  >
                    <i className="ri-arrow-left-line text-xl"></i>
                  </button>

                  {/* Mobile: compact page indicator */}
                  <span className="sm:hidden text-sm font-black text-foreground-500 px-3 tabular-nums">
                    {currentPage} / {totalPages}
                  </span>

                  <div className="hidden sm:flex items-center gap-2 mx-4">
                    {(() => {
                      const getPaginationGroup = () => {
                        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
                        if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
                        if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                      };

                      return getPaginationGroup().map((item, index) => {
                        if (item === '...') {
                          return <span key={`ellipsis-${index}`} className="w-12 text-center text-foreground-400">...</span>;
                        }

                        const pageNum = item as number;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-12 h-12 flex items-center justify-center text-sm font-black transition-all duration-300 border ${
                              currentPage === pageNum
                                ? 'bg-primary-500 text-[#1a1a1a] border-primary-500 shadow-[0_4px_14px_rgba(200,212,0,0.4)]'
                                : 'bg-white text-foreground-500 border-transparent hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-primary-500 hover:shadow-[0_4px_14px_rgba(26,26,26,0.3)]'
                            }`}
                            style={{ borderRadius: 0 }}
                            aria-label={`Seite ${pageNum}`}
                          >
                            {pageNum}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 border ${
                      currentPage === totalPages
                        ? 'border-foreground-200 text-foreground-300 cursor-not-allowed bg-white'
                        : 'border-black/20 text-[#1a1a1a] bg-white hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-primary-500 hover:shadow-[0_4px_14px_rgba(26,26,26,0.3)]'
                    }`}
                    style={{ borderRadius: 0 }}
                    aria-label="Nächste Seite"
                  >
                    <i className="ri-arrow-right-line text-xl"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
