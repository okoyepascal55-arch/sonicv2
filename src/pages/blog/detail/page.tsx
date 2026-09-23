import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import WoodenButton from '@/components/base/WoodenButton';
import { getPostSlug } from '../page';

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
  date_modified?: string;
  tags?: string[];
  authors?: Array<{ name: string; avatar?: string }>;
}

interface PubliiFeed {
  title: string;
  items: PubliiFeedItem[];
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PubliiFeedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: post ? `${post.title} | Sonic Group Blog` : 'Blog | Sonic Group',
    description: post?.summary ? post.summary.slice(0, 160) : '',
    ogTitle: post ? post.title : 'Blog | Sonic Group',
  });

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const feedUrl = import.meta.env.VITE_PUBLII_FEED_URL;
        if (!feedUrl) throw new Error('VITE_PUBLII_FEED_URL ist nicht gesetzt');

        const response = await fetch(feedUrl);
        if (!response.ok) throw new Error(`Failed to fetch feed: ${response.status}`);

        const data: PubliiFeed = await response.json();
        const found = (data.items || []).find(
          (item) => getPostSlug(item) === slug || item.id === slug
        );
        if (!found) throw new Error('Post not found');
        setPost(found);
      } catch (err) {
        console.error(err);
        setError('Dieser Artikel konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('de-DE', options);
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-white">
        {/* Hero skeleton */}
        <div className="animate-pulse bg-foreground-300 h-[50vh] w-full"></div>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="h-4 bg-foreground-200 w-1/4 mb-6 animate-pulse"></div>
          <div className="h-10 bg-foreground-200 w-3/4 mb-4 animate-pulse"></div>
          <div className="h-10 bg-foreground-200 w-1/2 mb-12 animate-pulse"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-foreground-200 w-full mb-4 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center gap-6 px-4">
        <i className="ri-error-warning-line text-6xl text-foreground-300"></i>
        <p className="text-black/50 font-bold text-lg">{error || 'Artikel nicht gefunden.'}</p>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a1a1a] text-primary-500 text-sm font-black uppercase tracking-widest hover:bg-primary-500 hover:text-[#1a1a1a] transition-all duration-300"
          style={{ borderRadius: 0 }}
        >
          <i className="ri-arrow-left-line"></i>
          Zurück zum Blog
        </button>
      </div>
    );
  }

  const featuredImage = post.image || post.banner_image;
  const category = post.tags?.[0] || 'News';
  const author = post.authors?.[0]?.name || 'Sonic Group';
  const authorAvatar = post.authors?.[0]?.avatar;

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* ── HERO IMAGE ── */}
      <div className="relative bg-[#1a1a1a] overflow-hidden" style={{ height: 'clamp(300px, 50vw, 560px)' }}>
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
            <i className="ri-article-line text-6xl text-white/10"></i>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-[#1a1a1a] hover:border-primary-500 transition-all duration-300"
          style={{ borderRadius: 0 }}
        >
          <i className="ri-arrow-left-line"></i>
          Blog
        </button>

        {/* Category badge */}
        <div className="absolute bottom-8 left-6 md:left-1/2 md:-translate-x-1/2 w-auto md:w-full md:max-w-4xl px-0 md:px-4">
          <span className="inline-block bg-primary-500 text-[#1a1a1a] text-[10px] font-black uppercase tracking-widest px-3 py-1 mb-4">
            {category}
          </span>
        </div>
      </div>

      <WoodenDivider />

      {/* ── ARTICLE BODY ── */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 leading-tight tracking-tight mb-8">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-black/10">
          {authorAvatar && (
            <img src={authorAvatar} alt={author} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
          )}
          <div>
            <div className="text-sm font-black text-foreground-950">{author}</div>
            <div className="text-xs text-foreground-400 font-bold uppercase tracking-wider">{formatDate(post.date_published)}</div>
          </div>
        </div>

        {/* Content */}
        <div
          className="wp-content text-foreground-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        {/* Footer nav */}
        <div className="mt-16 pt-10 border-t border-black/10 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a1a] text-primary-500 text-sm font-black uppercase tracking-widest hover:bg-primary-500 hover:text-[#1a1a1a] transition-all duration-300"
            style={{ borderRadius: 0 }}
          >
            <i className="ri-arrow-left-line"></i>
            Zurück zum Blog
          </button>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-black text-foreground-400 uppercase tracking-widest hover:text-primary-500 transition-colors"
          >
            Original ansehen
            <i className="ri-external-link-line"></i>
          </a>
        </div>
      </article>
    </div>
  );
}
