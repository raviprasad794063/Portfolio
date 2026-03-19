import { useState } from 'react';
import '../styles/Contact.css';

const LINKS = [
  { label: 'Email', value: 'rrk794063@gmail.com', href: 'mailto:rrk794063@gmail.com' },
  { label: 'Phone', value: '+91 9142162772', href: 'tel:+919142162772' },
  { label: 'GitHub', value: 'github.com/raviprasad794063', href: 'https://github.com/raviprasad794063' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ravi-prasad-3b1271281', href: 'https://www.linkedin.com/in/ravi-prasad-3b1271281' },
  { label: 'Location', value: 'Roorkee, Uttarakhand', href: null },
];

const FORM_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mbdzwbrv';

export default function Contact() {
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!FORM_ENDPOINT) {
      setStatus({
        type: 'error',
        message: 'Form endpoint is missing. Add VITE_FORMSPREE_ENDPOINT to restore submissions.',
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ type: 'sending', message: 'Sending your message...' });

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you soon.' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong while sending. Please try again or use the email link below.',
      });
    }
  }

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

          <div className="contact-grid">
            <form className="contact-form reveal delay-3" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label className="contact-field">
                  <span className="contact-field-label">Name</span>
                  <input type="text" name="name" placeholder="Your name" required />
                </label>

                <label className="contact-field">
                  <span className="contact-field-label">Email</span>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
              </div>

              <label className="contact-field">
                <span className="contact-field-label">Message</span>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me a bit about the role, project, or idea."
                  required
                />
              </label>

              <input type="hidden" name="_subject" value="New portfolio contact message" />

              <div className="contact-form-actions">
                <button type="submit" className="contact-submit" disabled={status.type === 'sending'}>
                  {status.type === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                <p className={`contact-status ${status.type !== 'idle' ? `is-${status.type}` : ''}`}>
                  {status.message || 'Powered by Formspree.'}
                </p>
              </div>
            </form>

            <div className="contact-links">
              {LINKS.map((link, index) => {
                const isExternal = link.href?.startsWith('http');
                const Tag = link.href ? 'a' : 'div';
                const delayClass = index > 1 ? 'delay-4' : `delay-${index + 3}`;

                return (
                  <Tag
                    key={link.label}
                    href={link.href || undefined}
                    className={`contact-link reveal ${delayClass}`}
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
