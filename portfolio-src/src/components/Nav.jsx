import { useEffect, useState } from 'react';
import '../styles/Nav.css';

const DEPTH_LABELS = [
  { at: 0, label: '0m - Surface' },
  { at: 0.18, label: '200m - Sunlit Zone' },
  { at: 0.4, label: '800m - Twilight Zone' },
  { at: 0.65, label: '2000m - Midnight Zone' },
  { at: 0.85, label: '6000m - The Abyss' },
];

const NAV_ITEMS = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Certificates', '#certificates'],
  ['Systems', '#systems'],
  ['Contact', '#contact'],
];

export default function Nav({ scrollDepth = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const depthLabel =
    [...DEPTH_LABELS].reverse().find((depth) => scrollDepth >= depth.at)?.label ?? '0m - Surface';

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <span className="nav-logo-dot" />
        Ravi Ranjan Prasad
      </a>

      <ul className="nav-links">
        {NAV_ITEMS.map(([label, href]) => (
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

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-header">Navigate</div>
        <ul className="nav-mobile-links">
          {NAV_ITEMS.map(([label, href]) => (
            <li key={label}>
              <a href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="nav-mobile-resume"
          onClick={() => setMenuOpen(false)}
        >
          Open Resume
        </a>
        <div className="nav-mobile-depth">{depthLabel}</div>
      </div>
    </nav>
  );
}
