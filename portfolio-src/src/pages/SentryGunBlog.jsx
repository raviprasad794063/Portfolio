import BlogPostPage from './BlogPostPage';
import sentryGunBlogHtml from '../content/sentryGunBlogHtml';

const publishedTime = '2026-03-21T00:00:00+05:30';
const canonicalUrl = 'https://raviranjanprasad.vercel.app/blog/yolov8-arduino-pan-tilt-tracking';
const imageUrl = 'https://raviranjanprasad.vercel.app/assets/profile.jpg';
const mediumUrl = 'https://medium.com/@rrk794063/building-a-yolov8-tracking-system-with-arduino-and-what-it-took-to-make-it-physical-c89c5b8a289e';
const title = 'Building a Real-Time AI Pan-Tilt Tracking System: YOLOv8 + Arduino';
const description =
  'Full build walkthrough of a real-time AI pan-tilt tracking system using YOLOv8 object tracking, OpenCV face recognition, and Arduino servo control with MG996R servos and laser pointer module. Built by an ML engineer.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
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
  return (
    <BlogPostPage
      title={title}
      description={description}
      keywords="YOLOv8 tracking system, Arduino object tracking, pan-tilt computer vision, computer vision hardware integration, PyFirmata2, pan tilt servo, OpenCV face recognition"
      canonicalUrl={canonicalUrl}
      imageUrl={imageUrl}
      publishedTime={publishedTime}
      twitterDescription="YOLOv8 + OpenCV + Arduino + laser pointer. How I built a pan-tilt system that tracks objects and recognises faces in real time."
      ogDescription="Full build walkthrough: YOLOv8 tracking, OpenCV face recognition, Arduino servo control, laser pointer module. Real hardware, real constraints."
      jsonLd={jsonLd}
      html={sentryGunBlogHtml}
      footerUrl={mediumUrl}
      footerLabel="Ravi Ranjan Prasad at Medium"
    />
  );
}
