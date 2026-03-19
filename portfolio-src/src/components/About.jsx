import '../styles/About.css';

const SKILLS = [
  { label: 'Domain',     value: 'Machine Learning\nComputer Vision' },
  { label: 'Frameworks', value: 'PyTorch · YOLOv8\nFastAPI · OpenCV' },
  { label: 'Backend',    value: 'Python · REST APIs\nAsync Systems' },
  { label: 'Hardware',   value: 'Arduino · Serial I/O\nEmbedded Systems' },
  { label: 'Networks',   value: 'Mesh Protocol\nP2P · Offline-first' },
  { label: 'Tooling',    value: 'Docker · CUDA\nLinux · Git' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        {/* Left */}
        <div>
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
            Sunlit Zone — 200m
          </div>

          <h2 className="about-heading reveal">
            I build systems<br />at the edge of<br /><em>possibility.</em>
          </h2>

          <p className="about-para reveal delay-1">
            I work at the intersection of <strong>machine intelligence and hardware reality</strong> — where models run on constrained devices, APIs serve real-time decisions, and everything needs to actually work.
          </p>

          <p className="about-para reveal delay-2">
            Not just trained. Not just deployed. <strong>Integrated, end-to-end.</strong> From sensor input to physical output, I own every layer.
          </p>

          <div className="about-status reveal delay-3">
            <div className="status-dot" />
            <div className="status-text">
              Status: <strong>Open to opportunities</strong> · ML Eng · Backend · Research
            </div>
          </div>
        </div>

        {/* Right: skills matrix */}
        <div className="reveal delay-2">
          <div className="skills-matrix">
            {SKILLS.map((s) => (
              <div key={s.label} className="skill-cell">
                <div className="skill-label">{s.label}</div>
                <div className="skill-value" style={{ whiteSpace: 'pre-line' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
