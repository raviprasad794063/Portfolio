import { useEffect, useState } from 'react';
import '../styles/Nav.css';

const DEPTH_LABELS = [
  { at: 0, label: '0m - Surface' },
  { at: 0.18, label: '200m - Sunlit Zone' },
  { at: 0.4, label: '800m - Twilight Zone' },
  { at: 0.65, label: '2000m - Midnight Zone' },
  { at: 0.85, label: '6000m - The Abyss' },
];

export default function Nav({ scrollDepth = 0 }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const depthLabel =
    [...DEPTH_LABELS].reverse().find((depth) => scrollDepth >= depth.at)?.label ?? '0m - Surface';

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        <span className="nav-logo-dot" />
        Ravi Ranjan Prasad
      </a>

      <ul className="nav-links">
        {[
          ['About', '#about'],
          ['Projects', '#projects'],
          ['Certificates', '#certificates'],
          ['Systems', '#systems'],
          ['Contact', '#contact'],
        ].map(([label, href]) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-meta">
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-resume">
          Resume
        </a>
        <div className="nav-depth">// {depthLabel}</div>
      </div>
    </nav>
  );
}
