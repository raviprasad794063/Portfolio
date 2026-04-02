import BlogPostPage from './BlogPostPage';
import disasterMeshBlogHtml from '../content/disasterMeshBlogHtml';

const publishedTime = '2026-04-02T00:00:00+05:30';
const canonicalUrl = 'https://raviranjanprasad.vercel.app/blog/disastermesh-offline-mesh-networking';
const imageUrl = 'https://raviranjanprasad.vercel.app/assets/profile.jpg';
const title = 'Building DisasterMesh: A Decentralized Offline Communication System for Disaster Scenarios';
const description =
  'Full build walkthrough of DisasterMesh, an Android peer-to-peer mesh networking app that enables emergency communication without internet or cellular infrastructure using Bluetooth and Wi-Fi Direct.';

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

export default function DisasterMeshBlog() {
  return (
    <BlogPostPage
      title={title}
      description={description}
      keywords="DisasterMesh, offline mesh networking, Android peer-to-peer, disaster communication, Google Nearby Connections API, mesh network Android, decentralized communication, emergency messaging app"
      canonicalUrl={canonicalUrl}
      imageUrl={imageUrl}
      publishedTime={publishedTime}
      twitterTitle="Building DisasterMesh: Offline P2P Mesh Networking for Disaster Scenarios"
      twitterDescription="Bluetooth + Wi-Fi Direct + multi-hop relay + OpenStreetMap. How I built an Android app that works when everything else goes down."
      ogDescription="How I built an Android mesh network that lets devices communicate without internet, cellular towers, or central servers and what networking in the real world actually looks like."
      jsonLd={jsonLd}
      html={disasterMeshBlogHtml}
      footerUrl="https://medium.com/@rrk794063/building-disastermesh-a-decentralized-offline-communication-system-for-disaster-scenarios-3ab8de6ec562"
      footerLabel="Ravi Ranjan Prasad at Medium"
    />
  );
}
