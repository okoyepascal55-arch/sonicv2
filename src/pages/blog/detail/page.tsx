import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';

interface WPPostDetail {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    'wp:term'?: Array<Array<{ name: string; id: number }>>;
    author?: Array<{ name: string; avatar_urls?: { '96': string } }>;
  };
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<WPPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: post ? `${post.title.rendered.replace(/<[^>]+>/g, '')} | Sonic Group Blog` : 'Blog | Sonic Group',
    description: post ? post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160) : '',
    ogTitle: post ? post.title.rendered.replace(/<[^>]+>/g, '') : 'Blog | Sonic Group',
  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const envUrl = import.meta.env.VITE_WP_API_URL || 'https://hotpink-walrus-949035.hostingersite.com/wp-json/wp/v2';
        const apiUrl = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
        const response = await fetch(`${apiUrl}/posts/${id}?_embed`);
        if (!response.ok) throw new Error(`Post not found: ${response.status}`);
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Dieser Artikel konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

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

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News';
  const author = post._embedded?.author?.[0]?.name || 'Sonic Group';
  const authorAvatar = post._embedded?.author?.[0]?.avatar_urls?.['96'];

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* ── HERO IMAGE ── */}
      <div className="relative bg-[#1a1a1a] overflow-hidden" style={{ height: 'clamp(300px, 50vw, 560px)' }}>
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={post.title.rendered}
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
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 leading-tight tracking-tight mb-8"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-black/10">
          {authorAvatar && (
            <img src={authorAvatar} alt={author} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
          )}
          <div>
            <div className="text-sm font-black text-foreground-950">{author}</div>
            <div className="text-xs text-foreground-400 font-bold uppercase tracking-wider">{formatDate(post.date)}</div>
          </div>
        </div>

        {/* Content */}
        <div
          className="wp-content text-foreground-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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
            href={post.link}
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
