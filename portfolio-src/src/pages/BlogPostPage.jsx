import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import OceanCanvas from '../components/OceanCanvas';
import '../styles/BlogPage.css';

export default function BlogPostPage({
  title,
  description,
  keywords,
  canonicalUrl,
  imageUrl,
  publishedTime,
  twitterTitle,
  twitterDescription,
  ogDescription,
  jsonLd,
  html,
  footerUrl,
  footerLabel,
}) {
  useEffect(() => {
    const bar = document.getElementById('progress-bar');
    if (!bar) return undefined;

    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)) * 100;
      bar.style.width = `${pct}%`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>{title} | Ravi Ranjan Prasad</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Ravi Ranjan Prasad" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={ogDescription ?? description} />
        <meta property="og:url" content={canonicalUrl} />
        {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
        <meta property="article:author" content="Ravi Ranjan Prasad" />
        {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={twitterTitle ?? title} />
        <meta name="twitter:description" content={twitterDescription ?? description} />
        {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

        {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
      </Helmet>

      <OceanCanvas scrollDepth={0} />

      <main className="blog-page-shell">
        <a href="/" className="blog-back-link">Back to portfolio</a>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {footerUrl && footerLabel ? (
          <footer className="blog-page-footer">
            <a href={footerUrl} target="_blank" rel="noreferrer" className="blog-footer-link">
              {footerLabel}
            </a>
          </footer>
        ) : null}
      </main>
    </>
  );
}
