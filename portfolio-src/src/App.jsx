import './styles/globals.css';
import { useScrollDepth, useReveal } from './hooks/useScroll';
import OceanCanvas   from './components/OceanCanvas';
import Nav           from './components/Nav';
import Hero          from './components/Hero';
import AboutMe       from './components/AboutMe';
import Projects      from './components/Projects';
import Certificates  from './components/Certificates';
import DeepSystems   from './components/DeepSystems';
import Contact       from './components/Contact';

export default function App() {
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
        <Certificates />
        <DeepSystems />
        <Contact />
      </main>
    </>
  );
}
