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

    const nodes = Array.from({ length: 15 }, (_, index) => ({
      x: Math.random() * (canvas.width - 56) + 28,
      y: Math.random() * (canvas.height - 48) + 24,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.2 + 2.2,
      pulse: Math.random() * Math.PI * 2,
      tier: index % 5 === 0 ? 'relay' : index % 4 === 0 ? 'alert' : 'peer',
    }));

    let packet = { from: 0, to: 1, prog: 0, active: false, trail: [] };
    let packetTimer = 36;
    let sweep = 0;
    const threshold = 122;

    function edges() {
      const found = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < threshold) {
            found.push([i, j, d]);
          }
        }
      }
      return found;
    }

    function pickEdge() {
      const liveEdges = edges();
      if (!liveEdges.length) return;
      const [from, to] = liveEdges[Math.floor(Math.random() * liveEdges.length)];
      packet = { from, to, prog: 0, active: true, trail: [] };
    }

    let raf;

    function draw() {
      ctx.clearRect(0, 0, W(), H());

      const bg = ctx.createLinearGradient(0, 0, W(), H());
      bg.addColorStop(0, 'rgba(4, 18, 17, 0.96)');
      bg.addColorStop(0.55, 'rgba(7, 31, 28, 0.98)');
      bg.addColorStop(1, 'rgba(2, 10, 11, 0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W(), H());

      sweep = (sweep + 1.3) % (W() + 120);
      const sweepGradient = ctx.createLinearGradient(sweep - 120, 0, sweep, 0);
      sweepGradient.addColorStop(0, 'rgba(45, 158, 110, 0)');
      sweepGradient.addColorStop(0.55, 'rgba(45, 158, 110, 0.08)');
      sweepGradient.addColorStop(1, 'rgba(45, 158, 110, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.fillRect(sweep - 120, 0, 120, H());

      for (let y = 18; y < H(); y += 24) {
        ctx.strokeStyle = 'rgba(45, 158, 110, 0.05)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }

      const liveEdges = edges();
      liveEdges.forEach(([i, j, distance]) => {
        const alpha = (1 - distance / threshold) * 0.34;
        const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        gradient.addColorStop(0, `rgba(45, 158, 110, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(93, 219, 172, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(45, 158, 110, ${alpha * 0.4})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = distance < 70 ? 1.6 : 0.9;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      });

      if (packet.active) {
        packet.prog += 0.02;
        const start = nodes[packet.from];
        const end = nodes[packet.to];
        const px = start.x + (end.x - start.x) * packet.prog;
        const py = start.y + (end.y - start.y) * packet.prog;
        packet.trail.push({ x: px, y: py, life: 1 });
        packet.trail = packet.trail.slice(-10).map((point) => ({ ...point, life: point.life - 0.08 })).filter((point) => point.life > 0);

        packet.trail.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 168, 67, ${point.life * 0.35})`;
          ctx.fill();
        });

        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 168, 67, 0.96)';
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(212, 168, 67, 0.86)';
        ctx.fill();
        ctx.shadowBlur = 0;

        if (packet.prog >= 1) {
          packet.active = false;
          packetTimer = 24;
        }
      } else {
        packetTimer -= 1;
        if (packetTimer <= 0) pickEdge();
      }

      nodes.forEach((node) => {
        node.pulse += 0.04;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 16 || node.x > W() - 16) node.vx *= -1;
        if (node.y < 16 || node.y > H() - 16) node.vy *= -1;

        const glow = 0.4 + 0.6 * Math.sin(node.pulse);
        const color = node.tier === 'relay'
          ? 'rgba(212, 168, 67, 0.96)'
          : node.tier === 'alert'
            ? 'rgba(145, 241, 208, 0.94)'
            : 'rgba(45, 158, 110, 0.92)';

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3.2 + glow * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 158, 110, ${0.04 + glow * 0.06})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(212, 168, 67, 0.14)';
      ctx.strokeRect(10, 10, W() - 20, H() - 20);
      ctx.fillStyle = 'rgba(214, 255, 239, 0.55)';
      ctx.font = '8px "DM Mono", monospace';
      ctx.fillText('DISCOVERY SWEEP', 16, 22);
      ctx.fillText('MULTI-HOP ROUTING', W() - 108, 22);
      ctx.fillText(`${liveEdges.length.toString().padStart(2, '0')} LINKS`, 16, H() - 12);
      ctx.fillText('OFFLINE READY', W() - 92, H() - 12);

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

function drawBracket(ctx, x, y, width, height, color) {
  const corner = 10;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;

  ctx.beginPath();
  ctx.moveTo(x, y + corner);
  ctx.lineTo(x, y);
  ctx.lineTo(x + corner, y);
  ctx.moveTo(x + width - corner, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + corner);
  ctx.moveTo(x, y + height - corner);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + corner, y + height);
  ctx.moveTo(x + width - corner, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width, y + height - corner);
  ctx.stroke();
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
    let scanX = -60;
    let tick = 0;

    const getTargets = () => [
      {
        x: W() * 0.26 + Math.sin(tick * 0.03) * 8,
        y: H() * 0.52 + Math.cos(tick * 0.025) * 4,
        w: 62,
        h: 74,
        label: 'TARGET-01',
        conf: 0.96,
        color: '#d4a843',
        locked: true,
      },
      {
        x: W() * 0.72 + Math.sin(tick * 0.04) * 10,
        y: H() * 0.42 + Math.sin(tick * 0.02) * 6,
        w: 46,
        h: 42,
        label: 'OBJECT-07',
        conf: 0.82,
        color: '#5de0aa',
        locked: false,
      },
    ];

    let raf;

    function draw() {
      ctx.clearRect(0, 0, W(), H());

      const bg = ctx.createLinearGradient(0, 0, W(), H());
      bg.addColorStop(0, 'rgba(6, 11, 13, 0.98)');
      bg.addColorStop(0.5, 'rgba(12, 20, 22, 0.98)');
      bg.addColorStop(1, 'rgba(3, 8, 10, 0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W(), H());

      ctx.strokeStyle = 'rgba(93, 224, 170, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 18; x < W(); x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H());
        ctx.stroke();
      }
      for (let y = 18; y < H(); y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W(), y);
        ctx.stroke();
      }

      scanX = (scanX + 2.4) % (W() + 80);
      const scanGradient = ctx.createLinearGradient(scanX - 70, 0, scanX + 10, 0);
      scanGradient.addColorStop(0, 'rgba(212, 168, 67, 0)');
      scanGradient.addColorStop(0.5, 'rgba(212, 168, 67, 0.12)');
      scanGradient.addColorStop(1, 'rgba(212, 168, 67, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(scanX - 70, 0, 80, H());

      const targets = getTargets();
      const primary = targets[0];

      ctx.strokeStyle = 'rgba(212, 168, 67, 0.16)';
      ctx.beginPath();
      ctx.arc(primary.x, primary.y, 34 + Math.sin(tick * 0.08) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(primary.x - 50, primary.y);
      ctx.lineTo(primary.x + 50, primary.y);
      ctx.moveTo(primary.x, primary.y - 50);
      ctx.lineTo(primary.x, primary.y + 50);
      ctx.stroke();

      targets.forEach((target) => {
        const bx = target.x - target.w / 2;
        const by = target.y - target.h / 2;
        const pulse = 0.7 + 0.3 * Math.sin(tick * 0.08 + target.x * 0.01);

        ctx.globalAlpha = pulse;
        drawBracket(ctx, bx, by, target.w, target.h, target.color);
        ctx.globalAlpha = 1;

        ctx.fillStyle = target.color;
        ctx.fillRect(bx, by - 12, 48, 8);
        ctx.fillStyle = 'rgba(4, 15, 13, 0.96)';
        ctx.font = '7px "DM Mono", monospace';
        ctx.fillText(target.label, bx + 3, by - 6);

        ctx.strokeStyle = 'rgba(214, 255, 239, 0.35)';
        ctx.strokeRect(bx, by + target.h + 8, 44, 5);
        ctx.fillStyle = target.locked ? 'rgba(212, 168, 67, 0.9)' : 'rgba(93, 224, 170, 0.86)';
        ctx.fillRect(bx + 1, by + target.h + 9, 42 * target.conf, 3);

        ctx.fillStyle = 'rgba(214, 255, 239, 0.78)';
        ctx.fillText(`${Math.round(target.conf * 100)}%`, bx + target.w - 16, by - 6);
      });

      ctx.fillStyle = 'rgba(214, 255, 239, 0.72)';
      ctx.font = '8px "DM Mono", monospace';
      ctx.fillText('YOLOV8 TRACKING', 14, 18);
      ctx.fillText('PAN 043 DEG', 14, H() - 24);
      ctx.fillText('TILT 012 DEG', 14, H() - 12);
      ctx.textAlign = 'right';
      ctx.fillText(`LOCK ${Math.round(primary.conf * 100)}%`, W() - 14, 18);
      ctx.fillText(`${(31 + Math.sin(tick * 0.06) * 2).toFixed(0)} FPS`, W() - 14, H() - 12);
      ctx.textAlign = 'left';

      ctx.strokeStyle = 'rgba(212, 168, 67, 0.14)';
      ctx.strokeRect(10, 10, W() - 20, H() - 20);

      tick += 1;
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
  cardClass,
  metrics,
}) {
  return (
    <div className={`project-card ${cardClass} reveal delay-${delay}`}>
      <div className="project-viz">
        <VizComponent />
        <div className="project-viz-overlay">
          <div className="project-viz-label">{vizLabel}</div>
          <div className="project-viz-metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="viz-metric">
                <span className="viz-metric-label">{metric.label}</span>
                <strong className="viz-metric-value">{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="project-body">
        <div className="project-index">{index}</div>
        <div className="project-title-row">
          <div className="project-title">{title}</div>
          <div className="project-status-pill">Live system feel</div>
        </div>
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
    vizLabel: 'Mesh network / live relay graph',
    metrics: [
      { label: 'Peers', value: '10 online' },
      { label: 'Relay', value: '3 hops' },
      { label: 'Mode', value: 'Offline' },
    ],
    cardClass: 'project-card-mesh',
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
    vizLabel: 'Detection feed / target acquisition',
    metrics: [
      { label: 'Tracking', value: '2 objects' },
      { label: 'Lock', value: '96%' },
      { label: 'Servo', value: 'Active' },
    ],
    cardClass: 'project-card-sentry',
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
