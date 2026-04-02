import './styles/globals.css';
import { useScrollDepth, useReveal } from './hooks/useScroll';
import OceanCanvas from './components/OceanCanvas';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Blogs from './components/Blogs';
import Certificates from './components/Certificates';
import DeepSystems from './components/DeepSystems';
import Contact from './components/Contact';
import SentryGunBlog from './pages/SentryGunBlog';
import DisasterMeshBlog from './pages/DisasterMeshBlog';

const BLOG_ROUTES = {
  '/blog/yolov8-arduino-pan-tilt-tracking': SentryGunBlog,
  '/blog/yolov8-arduino-ai-sentry-gun': SentryGunBlog,
  '/blog/yolov8-arduino-ai-sentry-gun-computer-vision': SentryGunBlog,
  '/blog/disastermesh-offline-mesh-networking': DisasterMeshBlog,
};

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';

  const BlogPage = BLOG_ROUTES[pathname];

  if (BlogPage) {
    return <BlogPage />;
  }

  const scrollDepth = useScrollDepth();
  useReveal();

  return (
    <>
      <OceanCanvas scrollDepth={scrollDepth} />
      <Nav scrollDepth={scrollDepth} />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Blogs />
        <Certificates />
        <DeepSystems />
        <Contact />
      </main>
    </>
  );
}
