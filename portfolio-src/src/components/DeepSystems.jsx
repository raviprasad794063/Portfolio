import '../styles/DeepSystems.css';

const SYSTEMS = [
  {
    icon: '\u26a1',
    name: 'Real-Time ML Inference',
    desc: 'Getting models out of Colab and making them run fast locally. I focus on ONNX exports, quantization, and hitting strict latency budgets on constrained edge hardware.',
  },
  {
    icon: '\ud83d\udd2d',
    name: 'Computer Vision',
    desc: 'Building vision pipelines that hold up outside of a clean dataset. I handle custom dataset curation, object tracking, and the messy edge cases of real-world lighting and occlusions.',
  },
  {
    icon: '\ud83d\udef0',
    name: 'Backend APIs',
    desc: 'Writing clean, reliable REST APIs in Spring Boot. I build the structural glue that connects databases to clients and serves ML models without timing out or dropping connections.',
  },
  {
    icon: '\ud83d\udd27',
    name: 'Hardware Integration',
    desc: 'Making software move things in the physical world. I write the control loops, manage serial communication latency, and handle the noisy realities of integrating Python with microcontrollers like Arduino.',
  },
  {
    icon: '\ud83c\udf10',
    name: 'Decentralized Networks',
    desc: 'Building offline-first, peer-to-peer communication. Navigating the headaches of node discovery, stale states, and multi-hop routing when you do not have a central server to rely on.',
  },
  {
    icon: '\ud83e\udde0',
    name: 'Systems Architecture',
    desc: 'Caring about the whole pipeline. I track down the bottlenecks - whether it is a slow SQL query, a heavy inference model, or hardware latency - and figure out the right technical trade-off to fix it.',
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
          Technical depth - the deeper you go, the harder the constraints get.
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
