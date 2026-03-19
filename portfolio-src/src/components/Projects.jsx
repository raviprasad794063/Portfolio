import { useEffect, useRef } from 'react';
import '../styles/Projects.css';

function MeshCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width || canvas.offsetWidth || 400;
      canvas.height = height || canvas.offsetHeight || 180;
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const W = () => canvas.width;
    const H = () => canvas.height;

    const nodes = Array.from({ length: 14 }, () => ({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 30) + 15,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.5 + 2,
      pulse: Math.random() * Math.PI * 2,
      glow: Math.random() > 0.5,
    }));

    let pkt = { from: 0, to: 1, prog: 0, active: false };
    let pkTimer = 80;
    const threshold = 115;

    function pickEdge() {
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      while (b === a) b = Math.floor(Math.random() * nodes.length);
      const d = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
      if (d < threshold) pkt = { from: a, to: b, prog: 0, active: true };
    }

    let raf;

    function draw() {
      ctx.clearRect(0, 0, W(), H());

      const bg = ctx.createLinearGradient(0, 0, 0, H());
      bg.addColorStop(0, 'rgba(6,30,26,0.9)');
      bg.addColorStop(1, 'rgba(4,15,13,0.95)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W(), H());

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < threshold) {
            const alpha = (1 - d / threshold) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(45,158,110,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (pkt.active) {
        pkt.prog += 0.016;
        if (pkt.prog >= 1) {
          pkt.active = false;
          pkTimer = 55;
        } else {
          const fn = nodes[pkt.from];
          const tn = nodes[pkt.to];
          const px = fn.x + (tn.x - fn.x) * pkt.prog;
          const py = fn.y + (tn.y - fn.y) * pkt.prog;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(212,168,67,0.95)';
          ctx.shadowBlur = 14;
          ctx.shadowColor = 'rgba(212,168,67,0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else {
        pkTimer -= 1;
        if (pkTimer < 0) pickEdge();
      }

      nodes.forEach((node) => {
        node.pulse += 0.038;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 10 || node.x > W() - 10) node.vx *= -1;
        if (node.y < 10 || node.y > H() - 10) node.vy *= -1;
        const glow = 0.5 + 0.5 * Math.sin(node.pulse);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 2.5 + glow * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,158,110,${0.06 + glow * 0.08})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.glow ? 'rgba(212,168,67,0.85)' : 'rgba(45,158,110,0.9)';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} style={{ width: '100%', height: '100%' }} />;
}

function SentryCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width || canvas.offsetWidth || 400;
      canvas.height = height || canvas.offsetHeight || 180;
    };
    setSize();

    const ro = new ResizeObserver(() => setSize());
    ro.observe(canvas);

    const W = () => canvas.width;
    const H = () => canvas.height;
    let scanY = 0;
    let t = 0;

    const getTargets = () => [
      { x: W() * 0.28, y: H() * 0.5, w: 48, h: 64, label: 'TARGET', conf: 0.96, color: '#d4a843' },
      { x: W() * 0.72, y: H() * 0.46, w: 40, h: 38, label: 'OBJECT', conf: 0.83, color: '#2d9e6e' },
    ];

    let raf;

    function draw() {
      ctx.clearRect(0, 0, W(), H());
      ctx.fillStyle = 'rgba(4,15,13,0.92)';
      ctx.fillRect(0, 0, W(), H());

      ctx.strokeStyle = 'rgba(45,158,110,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W(); x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H());
        ctx.stroke();
      }
      for (let y = 0; y < H(); y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }

      scanY = (scanY + 1.4) % H();
      const sg = ctx.createLinearGradient(0, scanY - 28, 0, scanY + 2);
      sg.addColorStop(0, 'rgba(212,168,67,0)');
      sg.addColorStop(0.7, 'rgba(212,168,67,0.08)');
      sg.addColorStop(1, 'rgba(212,168,67,0.22)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 28, W(), 30);

      getTargets().forEach((target, idx) => {
        const pulse = 0.65 + 0.35 * Math.sin(t * 0.05 + idx * 1.8);
        const bx = target.x - target.w / 2;
        const by = target.y - target.h / 2;
        ctx.globalAlpha = pulse;
        ctx.strokeStyle = target.color;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(bx, by, target.w, target.h);
        ctx.globalAlpha = 1;
      });

      ctx.fillStyle = 'rgba(212,168,67,0.4)';
      ctx.font = '8px "DM Mono", monospace';
      ctx.fillText('YOLOv8 / TRACKING', 10, H() - 10);
      ctx.textAlign = 'right';
      ctx.fillText(`${(28 + Math.sin(t * 0.1) * 3).toFixed(0)} FPS`, W() - 10, H() - 10);
      ctx.textAlign = 'left';

      t += 1;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} style={{ width: '100%', height: '100%' }} />;
}

function ProjectCard({
  index,
  title,
  tagline,
  desc,
  highlights,
  stack,
  githubLink,
  VizComponent,
  vizLabel,
  delay,
}) {
  return (
    <div className={`project-card reveal delay-${delay}`}>
      <div className="project-viz">
        <VizComponent />
        <div className="project-viz-label">{vizLabel}</div>
      </div>
      <div className="project-body">
        <div className="project-index">{index}</div>
        <div className="project-title">{title}</div>
        <div className="project-tagline">{tagline}</div>
        <p className="project-desc">{desc}</p>
        <div className="project-highlights">
          {highlights.map((highlight) => (
            <div key={highlight} className="project-highlight">
              <div className="highlight-dot" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
        <div className="project-stack">
          {stack.map((item) => (
            <span key={item} className="stack-tag">
              {item}
            </span>
          ))}
        </div>
        <div className="project-actions">
          <a href={githubLink} target="_blank" rel="noreferrer" className="project-link">
            View on GitHub -&gt;
          </a>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    index: '01 // ANDROID MESH',
    title: 'DisasterMesh',
    tagline: 'Offline emergency communication built for network outages',
    desc: 'A decentralized Android communication system that enables messaging when internet and cellular networks fail, using Google Nearby Connections and a multi-hop relay model.',
    highlights: [
      'Peer-to-peer mesh networking with automatic discovery and relay',
      'Offline maps, live location tracking, and radius-based alerts',
      'Validated across 10 Android devices in offline testing',
    ],
    stack: ['Android', 'MVVM', 'Google Nearby API', 'osmdroid', 'Offline-first'],
    githubLink: 'https://github.com/raviprasad794063',
    VizComponent: MeshCanvas,
    vizLabel: 'Mesh network / live',
    delay: 1,
  },
  {
    index: '02 // CV + EMBEDDED',
    title: 'Automated AI Sentry Gun',
    tagline: 'Real-time object tracking with software-hardware integration',
    desc: 'A computer vision targeting system built with YOLOv8 and OpenCV that tracks objects in real time and integrates with Arduino-controlled pan-tilt hardware.',
    highlights: [
      'Dynamic target selection and low-latency object tracking',
      'Face-recognition training pipeline for identified lock-on',
      'Tkinter-based control interface for modes and hardware flow',
    ],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Arduino', 'PyFirmata2', 'Tkinter'],
    githubLink: 'https://github.com/raviprasad794063',
    VizComponent: SentryCanvas,
    vizLabel: 'Detection feed / live',
    delay: 2,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-inner">
        <div className="section-eyebrow reveal">Thermocline - 500m</div>
        <h2 className="section-heading reveal">
          Resume-Backed <em>Projects</em>
        </h2>
        <p className="section-sub reveal">Work selected directly from the current resume.</p>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
