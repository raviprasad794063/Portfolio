import '../styles/Contact.css';

const LINKS = [
  { label: 'Email', value: 'rrk794063@gmail.com', href: 'mailto:rrk794063@gmail.com' },
  { label: 'Phone', value: '+91 9142162772', href: 'tel:+919142162772' },
  { label: 'GitHub', value: 'github.com/raviprasad794063', href: 'https://github.com/raviprasad794063' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ravi-prasad-3b1271281', href: 'https://www.linkedin.com/in/ravi-prasad-3b1271281' },
  { label: 'Location', value: 'Roorkee, Uttarakhand', href: null },
];

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact">
        <div className="contact-inner">
          <div
            className="section-eyebrow reveal"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--caustic-gold)',
              marginBottom: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            <span
              style={{
                display: 'block',
                width: 28,
                height: 1,
                background: 'linear-gradient(90deg, var(--caustic-gold), transparent)',
              }}
            />
            The Abyss - 6000m
          </div>

          <h2 className="contact-heading reveal">
            Let&apos;s build
            <br />
            something <em>real.</em>
          </h2>

          <p className="contact-sub reveal delay-1">
            Looking for opportunities in machine learning, AI systems, and backend engineering.
          </p>

          <div className="contact-divider reveal delay-2" />

          <div className="contact-links">
            {LINKS.map((link, index) => {
              const isExternal = link.href?.startsWith('http');
              const Tag = link.href ? 'a' : 'div';

              return (
                <Tag
                  key={link.label}
                  href={link.href || undefined}
                  className={`contact-link reveal delay-${index + 2}`}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                >
                  <span className="contact-link-label">{link.label}</span>
                  <span className="contact-link-value">{link.value}</span>
                  <span className="contact-link-arrow">{link.href ? '-&gt;' : ''}</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-copy">(c) 2026 Ravi Ranjan Prasad</span>
        <a
          href="https://www.linkedin.com/in/ravi-prasad-3b1271281"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-copy"
        >
          Ravi Ranjan Prasad on LinkedIn
        </a>
        <a
          href="https://github.com/raviprasad794063"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-copy"
        >
          Ravi Ranjan Prasad on GitHub
        </a>
        <span className="footer-depth">DEPTH: INFINITE</span>
      </footer>
    </>
  );
}
