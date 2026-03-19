import '../styles/DeepSystems.css';

const SYSTEMS = [
  {
    icon: '\u26a1',
    name: 'Real-Time ML Inference',
    desc: 'Optimized pipelines for sub-100ms inference on edge hardware. ONNX export, quantization, and hardware-aware model design.',
  },
  {
    icon: '\ud83d\udd2d',
    name: 'Computer Vision',
    desc: 'Object detection, tracking, segmentation. From dataset curation to deployment-ready models that hold in production.',
  },
  {
    icon: '\ud83d\udef0',
    name: 'Backend APIs',
    desc: 'Async-first, high-throughput API design. RESTful services built to serve ML models at scale with minimal latency.',
  },
  {
    icon: '\ud83d\udd27',
    name: 'Hardware Integration',
    desc: 'Bridging software intelligence to physical actuators. Serial comms, GPIO control, embedded system interfaces.',
  },
  {
    icon: '\ud83c\udf10',
    name: 'Decentralized Networks',
    desc: 'Resilient mesh architectures that self-heal and self-route. Designed for zero-infrastructure environments.',
  },
  {
    icon: '\ud83e\udde0',
    name: 'Systems Thinking',
    desc: 'Full-stack view of complex systems. From sensor input to decision output - every layer, every bottleneck, every tradeoff.',
  },
];

export default function DeepSystems() {
  return (
    <section id="systems" className="deep">
      <div className="deep-inner">
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
          Midnight Zone - 2000m
        </div>

        <h2
          className="section-heading reveal"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-surface)',
            marginBottom: '0.5rem',
          }}
        >
          Core <em style={{ fontStyle: 'italic', color: 'var(--caustic-pale)' }}>Capabilities</em>
        </h2>

        <p
          className="section-sub reveal"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: '3rem',
            fontWeight: 300,
          }}
        >
          Technical depth - the deeper you go, the more complex it gets.
        </p>

        <div className="deep-grid reveal delay-1">
          {SYSTEMS.map((system) => (
            <div key={system.name} className="deep-cell">
              <span className="deep-icon">{system.icon}</span>
              <div className="deep-name">{system.name}</div>
              <div className="deep-desc">{system.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
