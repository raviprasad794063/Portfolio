import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Hero.css';

function ResumeModal({ onClose }) {
  const resumeUrl = '/resume.pdf';

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="resume-overlay" onClick={onClose}>
      <div className="resume-modal" onClick={(event) => event.stopPropagation()}>
        <div className="resume-modal-header">
          <span className="resume-modal-title">Ravi Ranjan Prasad - Resume</span>
          <div className="resume-modal-actions">
            <a
              href={resumeUrl}
              download="Ravi_Ranjan_Prasad_Resume.pdf"
              className="resume-btn-download"
            >
              Download
            </a>
            <button className="resume-btn-close" onClick={onClose} aria-label="Close">
              x
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <iframe src={resumeUrl} title="Ravi Ranjan Prasad Resume" className="resume-iframe" />
          <p className="resume-modal-fallback">
            If the preview does not load, use the
            {' '}
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              direct resume link
            </a>
            .
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Hero() {
  const [showResume, setShowResume] = useState(false);
  const resumeUrl = '/resume.pdf';

  const handleResumeClick = () => {
    const shouldOpenDirectly =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    if (shouldOpenDirectly) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setShowResume(true);
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-caustic-core" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Computer Science Student / ML Builder
          </div>

          <h1 className="hero-name">
            Ravi <span className="hero-name-italic">Ranjan</span>
            <br />
            Prasad
          </h1>

          <p className="hero-role">// Machine Learning / Backend APIs / Computer Vision</p>

          <p className="hero-statement">
            "Computer Science student building <strong>machine learning systems, REST APIs, and
            real-time computer vision</strong> that work beyond the demo."
          </p>

          <div className="hero-ctas">
            <button type="button" className="btn-primary" onClick={handleResumeClick}>
              <span>View Resume</span>
              <span className="btn-arrow">-&gt;</span>
            </button>
            <a href="#contact" className="btn-ghost">
              Let&apos;s talk -&gt;
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-orb">
            <div className="hero-orb-ring" />
            <div className="hero-orb-ring" />
            <div className="hero-orb-ring" />
            <div className="hero-orb-core">
              <div className="hero-orb-text">
                ML /
                <br />
                Backend /
                <br />
                Vision
              </div>
            </div>

            <div className="hero-orb-tags">
              <div className="orb-tag" style={{ top: '8%', left: '62%' }}>
                YOLOv8
              </div>
              <div className="orb-tag" style={{ top: '38%', left: '-12%' }}>
                Spring Boot
              </div>
              <div className="orb-tag" style={{ top: '72%', left: '55%' }}>
                Arduino
              </div>
              <div className="orb-tag" style={{ top: '85%', left: '5%' }}>
                OpenCV
              </div>
              <div className="orb-tag" style={{ top: '18%', left: '18%' }}>
                PyTorch
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-label">Descend</span>
        <div className="hero-scroll-line" />
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
}
