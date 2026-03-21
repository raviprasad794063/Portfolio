import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import OceanCanvas from '../components/OceanCanvas';
import sentryGunBlogHtml from '../content/sentryGunBlogHtml';
import '../styles/BlogPage.css';

const publishedTime = '2026-03-21T00:00:00+05:30';
const canonicalUrl = 'https://raviranjanprasad.vercel.app/blog/yolov8-arduino-pan-tilt-tracking';
const imageUrl = 'https://raviranjanprasad.vercel.app/assets/profile.jpg';
const mediumUrl = 'https://medium.com/@rrk794063/building-a-yolov8-tracking-system-with-arduino-and-what-it-took-to-make-it-physical-c89c5b8a289e';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Building a Real-Time AI Pan-Tilt Tracking System: YOLOv8 + Arduino',
  description:
    'Full build walkthrough of a real-time AI pan-tilt tracking system using YOLOv8 object tracking, OpenCV face recognition, and Arduino servo control with MG996R servos and laser pointer module. Built by an ML engineer.',
  image: [imageUrl],
  datePublished: publishedTime,
  dateModified: publishedTime,
  author: {
    '@type': 'Person',
    name: 'Ravi Ranjan Prasad',
    url: 'https://raviranjanprasad.vercel.app',
  },
  publisher: {
    '@type': 'Person',
    name: 'Ravi Ranjan Prasad',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': canonicalUrl,
  },
};

export default function SentryGunBlog() {
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
        <title>Building a Real-Time AI Pan-Tilt Tracking System: YOLOv8 + Arduino | Ravi Ranjan Prasad</title>
        <meta
          name="description"
          content="Full build walkthrough of a real-time AI pan-tilt tracking system using YOLOv8 object tracking, OpenCV face recognition, and Arduino servo control with MG996R servos and laser pointer module. Built by an ML engineer."
        />
        <meta
          name="keywords"
          content="YOLOv8 tracking system, Arduino object tracking, pan-tilt computer vision, computer vision hardware integration, PyFirmata2, pan tilt servo, OpenCV face recognition"
        />
        <meta name="author" content="Ravi Ranjan Prasad" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content="Building a Real-Time AI Pan-Tilt Tracking System: YOLOv8 + Arduino" />
        <meta
          property="og:description"
          content="Full build walkthrough: YOLOv8 tracking, OpenCV face recognition, Arduino servo control, laser pointer module. Real hardware, real constraints."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="article:author" content="Ravi Ranjan Prasad" />
        <meta property="article:published_time" content={publishedTime} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Building a Real-Time AI Pan-Tilt Tracking System: YOLOv8 + Arduino" />
        <meta
          name="twitter:description"
          content="YOLOv8 + OpenCV + Arduino + laser pointer. How I built a pan-tilt system that tracks objects and recognises faces in real time."
        />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <OceanCanvas scrollDepth={0} />

      <main className="blog-page-shell">
        <a href="/" className="blog-back-link">Back to portfolio</a>
        <div dangerouslySetInnerHTML={{ __html: sentryGunBlogHtml }} />
        <footer className="blog-page-footer">
          <a href={mediumUrl} target="_blank" rel="noreferrer" className="blog-footer-link">
            Ravi Ranjan Prasad at Medium
          </a>
        </footer>
      </main>
    </>
  );
}

