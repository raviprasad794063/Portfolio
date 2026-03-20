import { useEffect, useRef, useState } from 'react';
import '../styles/OceanCanvas.css';

/* -- Caustic light rays (inspired by the sunburst in illustration) -- */
const RAYS = [
  { angle: -38, width: 60,  opacity: 0.07, dur: '5.5s', delay: '0s'   },
  { angle: -22, width: 90,  opacity: 0.11, dur: '4.2s', delay: '0.8s' },
  { angle: -10, width: 130, opacity: 0.14, dur: '6s',   delay: '1.6s' },
  { angle:   0, width: 160, opacity: 0.18, dur: '4.8s', delay: '0.3s' },
  { angle:  10, width: 120, opacity: 0.13, dur: '5.2s', delay: '2.1s' },
  { angle:  22, width: 85,  opacity: 0.10, dur: '3.9s', delay: '1.1s' },
  { angle:  38, width: 55,  opacity: 0.07, dur: '5.8s', delay: '0.6s' },
];

/* -- Floating particles (plankton/debris) -- */
function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id:    i,
    x:     Math.random() * 100,
    size:  Math.random() * 3 + 1,
    dur:   12 + Math.random() * 20,
    delay: -(Math.random() * 30),
    color: Math.random() > 0.6
      ? `rgba(212,168,67,${0.1 + Math.random() * 0.2})`
      : `rgba(45,158,110,${0.1 + Math.random() * 0.25})`,
  }));
}

const PARTICLES = makeParticles(55);

export default function OceanCanvas({ scrollDepth = 0 }) {
  const coreRef   = useRef(null);
  const ringRef   = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const rafRef    = useRef(null);
  const [hovering, setHovering] = useState(false);

  /* Custom dot/ring cursor */
  useEffect(() => {
    const onMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    document.addEventListener('mousemove', onMove);
    const hoverEls = Array.from(document.querySelectorAll('a, button, [data-hover]'));
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const tick = () => {
      const c = cursorRef.current;
      c.rx += (c.x - c.rx) * 0.13;
      c.ry += (c.y - c.ry) * 0.13;
      if (coreRef.current) {
        coreRef.current.style.left = c.x + 'px';
        coreRef.current.style.top  = c.y + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = c.rx + 'px';
        ringRef.current.style.top  = c.ry + 'px';
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Scroll-driven depth darkness */
  const veilOpacity = Math.min(scrollDepth * 0.7, 0.65);

  return (
    <>
      {/* -- Custom Cursor -- */}
      <div className="cursor-wrap">
        <div ref={coreRef} className="cursor-core" />
        <div ref={ringRef} className={`cursor-ring ${hovering ? 'hover' : ''}`} />
      </div>

      {/* -- Ocean Background -- */}
      <div className="ocean-canvas-wrap">
        <div className="ocean-layer-base" />

        {/* Canopy silhouette top */}
        <svg className="canopy" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path
            d="M0,200 C0,200 0,60 80,30 C140,8 180,50 260,20 C340,-8 380,40 460,15
               C540,-10 580,55 660,25 C740,-5 790,45 870,18 C950,-8 990,52 1070,22
               C1150,-8 1190,42 1270,16 C1340,-4 1380,38 1440,10 L1440,0 L0,0 Z"
            fill="#1a7a55"
          />
          <path
            d="M0,200 C60,160 100,90 180,60 C240,38 280,80 360,55
               C440,30 480,75 560,48 C640,22 680,72 760,45
               C840,18 880,68 960,42 C1040,16 1080,62 1160,40
               C1240,18 1280,58 1360,35 L1440,20 L1440,0 L0,0 Z"
            fill="#2d9e6e"
            opacity="0.5"
          />
        </svg>

        {/* Caustic light rays */}
        <div className="caustic-rays" aria-hidden="true">
          {RAYS.map((r, i) => (
            <div
              key={i}
              className="ray"
              style={{
                transform:  `rotate(${r.angle}deg)`,
                width:      `${r.width}px`,
                height:     '95%',
                marginLeft: `-${r.width / 2}px`,
                background: `linear-gradient(to bottom,
                  rgba(212,168,67,${r.opacity * 1.4}) 0%,
                  rgba(45,158,110,${r.opacity * 0.8}) 45%,
                  transparent 100%)`,
                '--dur':   r.dur,
                '--delay': r.delay,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left:       `${p.x}%`,
              bottom:     '-10px',
              width:      `${p.size}px`,
              height:     `${p.size}px`,
              background: p.color,
              '--dur':    `${p.dur}s`,
              '--delay':  `${p.delay}s`,
            }}
          />
        ))}

        {/* Seabed SVG silhouette */}
        <svg
          className="seabed"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Back layer – coral/rock shapes */}
          <path
            d="M0,220 L0,160 C40,148 70,155 90,140 C110,125 120,130 140,118
               C180,95 210,110 250,105 C290,100 310,90 360,85
               C420,78 450,95 500,88 C560,80 580,72 640,70
               C710,67 740,82 800,76 C860,70 890,62 950,60
               C1010,58 1050,72 1120,65 C1190,58 1230,50 1300,55
               C1360,60 1400,70 1440,65 L1440,220 Z"
            fill="#061e1a"
          />
          {/* Mid layer – plants / coral */}
          <path
            d="M0,220 L0,180 C30,175 50,185 80,178 C120,170 140,162 180,170
               C220,178 250,168 290,172 C330,176 360,165 400,170
               C460,176 480,162 540,168 C600,174 630,160 690,165
               C760,170 780,158 840,163 C900,168 930,156 980,162
               C1040,168 1070,155 1140,160 C1210,165 1250,152 1320,158
               C1380,163 1410,172 1440,168 L1440,220 Z"
            fill="#072e2a"
          />
          {/* Foreground fronds */}
          {[60, 180, 340, 520, 700, 880, 1060, 1240, 1400].map((x, i) => (
            <g key={i} transform={`translate(${x}, 200)`}>
              <path
                d={`M0,20 C${-8 + (i%3)*4},${-30-(i%2)*15} ${-14+(i%4)*6},${-55-(i%3)*10} 0,${-70-(i%2)*20}`}
                stroke="#1a7a55"
                strokeWidth={1.5 + (i % 2)}
                fill="none"
                style={{ animation: `sway ${3 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}
              />
              <path
                d={`M0,20 C${8-(i%3)*3},${-25-(i%2)*12} ${16-(i%4)*4},${-48-(i%3)*8} 0,${-65-(i%2)*15}`}
                stroke="#2d9e6e"
                strokeWidth={1 + (i % 2) * 0.5}
                fill="none"
                opacity="0.6"
                style={{ animation: `sway ${2.5 + (i % 4)}s ease-in-out infinite reverse`, animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Depth veil — darkens as you scroll */}
        <div
          className="depth-veil"
          style={{ opacity: veilOpacity }}
        />
      </div>
    </>
  );
}
