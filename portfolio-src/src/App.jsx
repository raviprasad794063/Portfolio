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

const BLOG_PATHS = new Set([
  '/blog/yolov8-arduino-pan-tilt-tracking',
  '/blog/yolov8-arduino-ai-sentry-gun',
  '/blog/yolov8-arduino-ai-sentry-gun-computer-vision',
]);

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';

  if (BLOG_PATHS.has(pathname)) {
    return <SentryGunBlog />;
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
