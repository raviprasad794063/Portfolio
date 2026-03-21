const sentryGunBlogHtml = String.raw`<style>
    /* ── Reset & Base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:          #ffffff;
      --bg-secondary:#f6f5f0;
      --bg-info:     #e8f1fb;
      --bg-warn:     #fdf3e0;
      --bg-danger:   #fdeaea;
      --bg-success:  #eaf5ee;
      --text:        #1a1a18;
      --text-sec:    #5a5a56;
      --text-ter:    #9a9890;
      --text-info:   #1060a8;
      --text-warn:   #8a5000;
      --text-danger: #9a2020;
      --text-success:#1a6a30;
      --border:      rgba(26,26,24,0.12);
      --border-sec:  rgba(26,26,24,0.22);
      --border-info: rgba(16,96,168,0.30);
      --border-warn: rgba(138,80,0,0.30);
      --border-danger:rgba(154,32,32,0.30);
      --border-success:rgba(26,106,48,0.30);
      --radius-md:   8px;
      --radius-lg:   12px;
      --font-sans:   'DM Sans', sans-serif;
      --font-serif:  'Playfair Display', serif;
      --font-mono:   'JetBrains Mono', monospace;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg:          #1a1a18;
        --bg-secondary:#242420;
        --bg-info:     #0c2240;
        --bg-warn:     #2a1e00;
        --bg-danger:   #2a0c0c;
        --bg-success:  #0c2416;
        --text:        #e8e6dc;
        --text-sec:    #9a9890;
        --text-ter:    #6a6864;
        --text-info:   #6aadec;
        --text-warn:   #f0b84a;
        --text-danger: #f08080;
        --text-success:#6acf8a;
        --border:      rgba(232,230,220,0.10);
        --border-sec:  rgba(232,230,220,0.20);
        --border-info: rgba(106,173,236,0.25);
        --border-warn: rgba(240,184,74,0.25);
        --border-danger:rgba(240,128,128,0.25);
        --border-success:rgba(106,207,138,0.25);
      }
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-sans);
      font-weight: 400;
      font-size: 16px;
      line-height: 1.8;
      color: var(--text);
      background: var(--bg);
    }

    /* ── Layout ── */
    .page-wrap {
      max-width: 760px;
      margin: 0 auto;
      padding: 3rem 1.5rem 6rem;
    }

    /* ── Progress bar ── */
    #progress-bar {
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      width: 0%;
      background: #378ADD;
      z-index: 100;
      transition: width 0.1s linear;
    }

    /* ── Author strip ── */
    .author-strip {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 1rem 1.25rem;
      background: var(--bg-secondary);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-lg);
      margin-bottom: 2rem;
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-info);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 500;
      color: var(--text-info);
      flex-shrink: 0;
    }

    .author-meta { flex: 1; }

    .author-name {
      font-size: 15px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 3px;
    }

    .author-role {
      font-size: 12.5px;
      color: var(--text-sec);
      line-height: 1.4;
    }

    .author-link {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 4px;
      background: var(--bg);
      border: 0.5px solid var(--border-sec);
      color: var(--text-sec);
      text-decoration: none;
      white-space: nowrap;
      transition: color 0.15s, border-color 0.15s;
    }

    .author-link:hover { color: var(--text); border-color: var(--border-sec); }

    /* ── Post tag ── */
    .post-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-info);
      background: var(--bg-info);
      border: 0.5px solid var(--border-info);
      border-radius: 4px;
      padding: 4px 10px;
      margin-bottom: 1.5rem;
    }

    /* ── Hero ── */
    .hero-title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      line-height: 1.18;
      color: var(--text);
      margin-bottom: 1.25rem;
    }

    .hero-title em {
      font-style: italic;
      color: var(--text-sec);
    }

    .lede {
      font-family: var(--font-serif);
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.75;
      color: var(--text-sec);
      margin-bottom: 2.5rem;
      padding-bottom: 2.5rem;
      border-bottom: 0.5px solid var(--border);
    }

    /* ── Body text ── */
    .body-text {
      font-size: 16px;
      line-height: 1.85;
      color: var(--text);
      margin-bottom: 1.25rem;
    }

    /* ── Section headings ── */
    .section-heading {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.25;
      color: var(--text);
      margin-top: 3rem;
      margin-bottom: 0.85rem;
    }

    /* ── Mode cards ── */
    .mode-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin: 1.5rem 0;
    }

    .mode-card {
      background: var(--bg);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.1rem 1.1rem 1rem;
    }

    .mode-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 10px;
      background: var(--bg-secondary);
      color: var(--text-ter);
      border: 0.5px solid var(--border);
    }

    .mode-title {
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 5px;
    }

    .mode-desc {
      font-size: 12.5px;
      color: var(--text-sec);
      line-height: 1.55;
    }

    /* ── Loop diagram ── */
    .loop-wrap {
      margin: 1.75rem 0;
      background: var(--bg-secondary);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.5rem 1rem 1.25rem;
      overflow-x: auto;
    }

    .loop-svg { display: block; width: 100%; }

    /* SVG node styles — injected inline for portability */

    /* ── Code blocks ── */
    .code-wrap {
      background: var(--bg-secondary);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-md);
      margin: 1.5rem 0;
      overflow: hidden;
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      border-bottom: 0.5px solid var(--border);
    }

    .code-lang {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--text-ter);
    }

    .code-file {
      font-family: var(--font-mono);
      font-size: 10.5px;
      color: var(--text-ter);
    }

    .code-body {
      padding: 1.1rem 1.25rem;
      overflow-x: auto;
    }

    .code-body pre {
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.85;
      color: var(--text);
      white-space: pre;
      margin: 0;
    }

    .cm { color: var(--text-ter); }
    .ck { color: var(--text-info); }
    .cs { color: var(--text-success); }
    .cn { color: var(--text-warn); }

    /* ── Callouts ── */
    .callout {
      border-left: 2px solid var(--border-info);
      background: var(--bg-info);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 1rem 1.25rem;
      margin: 1.5rem 0;
    }

    .callout p {
      font-size: 14.5px;
      line-height: 1.7;
      color: var(--text-info);
      margin: 0;
    }

    .callout.warn {
      border-left-color: var(--border-warn);
      background: var(--bg-warn);
    }
    .callout.warn p { color: var(--text-warn); }

    .callout.danger {
      border-left-color: var(--border-danger);
      background: var(--bg-danger);
    }
    .callout.danger p { color: var(--text-danger); }

    .callout.success {
      border-left-color: var(--border-success);
      background: var(--bg-success);
    }
    .callout.success p { color: var(--text-success); }

    /* ── Wiring table ── */
    .wiring-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.25rem 0;
      font-size: 13.5px;
    }

    .wiring-table th {
      text-align: left;
      font-weight: 500;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-sec);
      padding: 0 12px 10px 0;
      border-bottom: 0.5px solid var(--border);
    }

    .wiring-table td {
      padding: 10px 12px 10px 0;
      border-bottom: 0.5px solid var(--border);
      color: var(--text);
      vertical-align: middle;
    }

    .wiring-table tr:last-child td { border-bottom: none; }

    .pin-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      background: var(--bg-secondary);
      border: 0.5px solid var(--border-sec);
      border-radius: 4px;
      padding: 2px 8px;
      color: var(--text-sec);
    }

    /* ── Servo comparison ── */
    .servo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 1.5rem 0;
    }

    .servo-card {
      background: var(--bg);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1rem 1.25rem;
    }

    .servo-card.bad  { border-top: 2px solid #E24B4A; }
    .servo-card.good { border-top: 2px solid #1D9E75; }

    .servo-verdict {
      font-family: var(--font-mono);
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .servo-card.bad  .servo-verdict { color: #E24B4A; }
    .servo-card.good .servo-verdict { color: #1D9E75; }

    .servo-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 10px;
    }

    .servo-traits {
      list-style: none;
      font-size: 13px;
      color: var(--text-sec);
      line-height: 2;
    }

    .trait-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }

    .bad-dot  { background: #E24B4A; }
    .good-dot { background: #1D9E75; }

    /* ── Problem grid ── */
    .problem-grid { display: grid; gap: 10px; margin: 1.5rem 0; }

    .problem-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .problem-card {
      background: var(--bg-secondary);
      border: 0.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 14px 16px;
    }

    .problem-title {
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-sec);
      margin-bottom: 6px;
    }

    .problem-body {
      font-size: 13.5px;
      color: var(--text);
      line-height: 1.6;
    }

    /* ── Pull quote ── */
    .pull-quote {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-style: italic;
      line-height: 1.55;
      color: var(--text-sec);
      border-top: 0.5px solid var(--border);
      border-bottom: 0.5px solid var(--border);
      padding: 1.75rem 0;
      margin: 3rem 0;
      text-align: center;
    }

    /* ── Tags ── */
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 0.5px solid var(--border);
    }

    .tag {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 3px 9px;
      border-radius: 4px;
      background: var(--bg-secondary);
      border: 0.5px solid var(--border);
      color: var(--text-sec);
    }

    /* ── Responsive ── */
    @media (max-width: 560px) {
      .mode-grid, .servo-grid, .problem-row {
        grid-template-columns: 1fr;
      }
      .author-link { display: none; }
      .hero-title  { font-size: 1.85rem; }
    }
  </style>

<div id="progress-bar"></div>

  <main class="page-wrap">

    <!-- ── Author strip ── -->
    <div class="author-strip">
      <div class="author-avatar">RR</div>
      <div class="author-meta">
        <div class="author-name">Ravi Ranjan Prasad</div>
        <div class="author-role">ML Engineer &nbsp;&middot;&nbsp; Real-time intelligent systems &nbsp;&middot;&nbsp; YOLOv8 &nbsp;&middot;&nbsp; Arduino &nbsp;&middot;&nbsp; Embedded CV</div>
      </div>
      <a class="author-link" href="https://github.com/raviprasad794063/automated-sentry-gun" target="_blank" rel="noopener">View on GitHub &rarr;</a>
    </div>

    <!-- ── Post tag ── -->
    <div class="post-tag">Project writeup &nbsp;&middot;&nbsp; Embedded Systems &nbsp;&middot;&nbsp; Computer Vision</div>

    <!-- ── Hero ── -->
    <h1 class="hero-title">
      Building a real-time AI pan-tilt tracking system with Arduino &mdash;
      <em>and what it took to make it physical</em>
    </h1>

    <p class="lede">
      A real-time AI pan-tilt tracking system that detects objects, recognises faces, and physically follows a subject using pan&ndash;tilt servos and a laser pointer module. Full build walkthrough &mdash; hardware decisions, software integration, and every mistake in between.
    </p>

    <!-- ── Intro ── -->
    <p class="body-text">
      This is a project about computer vision hardware integration done for real &mdash; not a screen demo, but a physical system that moves. The core idea: combine a YOLOv8 real-time object tracking pipeline with an Arduino-controlled servo rig, add OpenCV face recognition, wire in a laser pointer module, and build a pan-tilt system that physically reacts to the world. Two weeks, one pan&ndash;tilt mount, and more jitter than expected.
    </p>
    <p class="body-text">
      Most CV tutorials stop at the bounding box. This one starts there and goes all the way to hardware responding in real time to a detected and centred subject. Here is everything, in the order it actually happened.
    </p>

    <!-- ── Modes ── -->
    <h2 class="section-heading">What this pan-tilt tracking system actually does</h2>

    <p class="body-text">Three distinct operating modes, each doing something meaningfully different:</p>

    <div class="mode-grid">
      <div class="mode-card">
        <span class="mode-badge">Mode 01</span>
        <div class="mode-title">Face Training</div>
        <div class="mode-desc">Capture face images and train a custom recogniser. Enter a name, look at the camera, and the system learns that person.</div>
      </div>
      <div class="mode-card">
        <span class="mode-badge">Mode 02</span>
        <div class="mode-title">Object Tracking</div>
        <div class="mode-desc">YOLOv8 follows any object class &mdash; person, cup, phone. The pan-tilt mount physically follows. Laser pointer activates when centred.</div>
      </div>
      <div class="mode-card">
        <span class="mode-badge">Mode 03</span>
        <div class="mode-title">Face Tracking</div>
        <div class="mode-desc">Face recognition mode. Follows a specific trained subject, ignoring everyone else in the frame.</div>
      </div>
    </div>

    <p class="body-text">
      YOLOv8 gives class-level detection. Face recognition gives identity-level following. They are different problems, different pipelines, coexisting in one system.
    </p>

    <!-- ── Feedback loop ── -->
    <h2 class="section-heading">The real-time feedback loop</h2>

    <p class="body-text">
      Both tracking modes share one continuous control loop. Every component feeds the next, cycling in real time until error reaches zero. Every delay anywhere in this loop shows up as a physical problem: lag, jitter, or overshoot. You are not debugging code &mdash; you are tuning a physical control system.
    </p>

    <div class="loop-wrap">
      <svg class="loop-svg" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </marker>
          <style>
            .n-rect { fill: var(--bg); stroke: var(--border-sec); stroke-width: 0.5; rx: 8; }
            .n-rect-blue   { fill: var(--bg-info);    stroke: var(--border-info);    stroke-width: 0.5; }
            .n-rect-purple { fill: #EEEDFE;            stroke: #AFA9EC;               stroke-width: 0.5; }
            .n-rect-amber  { fill: var(--bg-warn);     stroke: var(--border-warn);    stroke-width: 0.5; }
            @media (prefers-color-scheme: dark) {
              .n-rect-purple { fill: #26215C; stroke: #534AB7; }
            }
            .n-title { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; fill: var(--text); }
            .n-sub   { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 400; fill: var(--text-sec); }
            .n-title-blue   { fill: var(--text-info); }
            .n-title-purple { fill: #3C3489; }
            .n-title-amber  { fill: var(--text-warn); }
            @media (prefers-color-scheme: dark) {
              .n-title-purple { fill: #CECBF6; }
            }
            .connector { fill: none; stroke: var(--border-sec); stroke-width: 0.5; marker-end: url(#arr); }
            .connector-ret { fill: none; stroke: var(--border-sec); stroke-width: 0.5; stroke-dasharray: 5 4; marker-end: url(#arr); }
            .layer-line { stroke-width: 0.5; stroke-dasharray: 3 3; }
            .layer-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          </style>
        </defs>

        <!-- Row 1: Camera → YOLOv8 → Error → Arduino -->

        <!-- Camera feed -->
        <rect class="n-rect" x="20" y="30" width="130" height="56" rx="8"/>
        <text class="n-title" x="85" y="53" text-anchor="middle" dominant-baseline="central">Camera feed</text>
        <text class="n-sub"   x="85" y="72" text-anchor="middle" dominant-baseline="central">Webcam, live frames</text>
        <line class="connector" x1="150" y1="58" x2="188" y2="58"/>

        <!-- YOLOv8 Detection -->
        <rect class="n-rect-blue" x="190" y="30" width="145" height="56" rx="8"/>
        <text class="n-title n-title-blue" x="262" y="53" text-anchor="middle" dominant-baseline="central">YOLOv8 detection</text>
        <text class="n-sub"                x="262" y="72" text-anchor="middle" dominant-baseline="central">Bounding box per frame</text>
        <line class="connector" x1="335" y1="58" x2="373" y2="58"/>

        <!-- Error calculation -->
        <rect class="n-rect-blue" x="375" y="30" width="145" height="56" rx="8"/>
        <text class="n-title n-title-blue" x="447" y="53" text-anchor="middle" dominant-baseline="central">Error calculation</text>
        <text class="n-sub"                x="447" y="72" text-anchor="middle" dominant-baseline="central">Center offset X &amp; Y</text>
        <line class="connector" x1="520" y1="58" x2="558" y2="58"/>

        <!-- Arduino -->
        <rect class="n-rect-purple" x="560" y="30" width="100" height="56" rx="8"/>
        <text class="n-title n-title-purple" x="610" y="58" text-anchor="middle" dominant-baseline="central">Arduino</text>

        <!-- Arduino down to row 2 -->
        <line class="connector" x1="610" y1="86" x2="610" y2="174"/>

        <!-- Row 2 (right to left): Servos → Laser → Re-aim -->

        <!-- Servos move -->
        <rect class="n-rect-purple" x="460" y="176" width="150" height="56" rx="8"/>
        <text class="n-title n-title-purple" x="535" y="199" text-anchor="middle" dominant-baseline="central">Servos move</text>
        <text class="n-sub"                  x="535" y="218" text-anchor="middle" dominant-baseline="central">Pan and tilt axes</text>
        <line class="connector" x1="460" y1="204" x2="398" y2="204"/>

        <!-- Laser pointer -->
        <rect class="n-rect-amber" x="248" y="176" width="148" height="56" rx="8"/>
        <text class="n-title n-title-amber" x="322" y="199" text-anchor="middle" dominant-baseline="central">Laser activates</text>
        <text class="n-sub"                 x="322" y="218" text-anchor="middle" dominant-baseline="central">Relay triggers on centre</text>
        <line class="connector" x1="248" y1="204" x2="186" y2="204"/>

        <!-- Re-aim -->
        <rect class="n-rect" x="86" y="176" width="98" height="56" rx="8"/>
        <text class="n-title" x="135" y="204" text-anchor="middle" dominant-baseline="central">Re-aim</text>

        <!-- Return loop dashed path -->
        <path class="connector-ret" d="M135 232 L135 285 L340 285 L340 232"/>

        <!-- Loop label -->
        <text class="n-sub" x="340" y="308" text-anchor="middle" dominant-baseline="central">loop repeats every frame</text>

        <!-- Layer divider labels -->
        <line class="layer-line" x1="30"  y1="326" x2="340" y2="326" stroke="#185FA5"/>
        <line class="layer-line" x1="400" y1="326" x2="650" y2="326" stroke="#534AB7"/>
        <text class="layer-label" x="30"  y="338" fill="#185FA5">Software layer</text>
        <text class="layer-label" x="400" y="338" fill="#534AB7">Hardware layer</text>
      </svg>
    </div>

    <!-- ── Detection logic ── -->
    <h2 class="section-heading">YOLOv8 tracking system: the detection logic</h2>

    <p class="body-text">
      YOLOv8 returns bounding boxes. The center of each box is extracted and compared against the frame center. The difference is the error &mdash; and the servos exist to drive that error to zero every frame.
    </p>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang">Python</span>
        <span class="code-file">track.py &mdash; error calculation</span>
      </div>
      <div class="code-body"><pre><span class="cm"># Extract bounding box center from YOLOv8 result</span>
x1, y1, x2, y2 = box.xyxy[<span class="cn">0</span>]
target_x = (x1 + x2) / <span class="cn">2</span>
target_y = (y1 + y2) / <span class="cn">2</span>

<span class="cm"># Compare against frame center</span>
frame_cx = frame_width  / <span class="cn">2</span>
frame_cy = frame_height / <span class="cn">2</span>

<span class="cm"># Error = how far off-center the subject is</span>
error_x = target_x - frame_cx
error_y = target_y - frame_cy

<span class="cm"># System goal: drive both errors to zero</span></pre></div>
    </div>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang">Python</span>
        <span class="code-file">track.py &mdash; Arduino servo control via PyFirmata2</span>
      </div>
      <div class="code-body"><pre><span class="ck">from</span> pyfirmata2 <span class="ck">import</span> Arduino

<span class="cm"># Connect to Arduino — change port to match your system</span>
board    = Arduino(<span class="cs">'COM7'</span>)
pan_pin  = board.get_pin(<span class="cs">'d:9:s'</span>)    <span class="cm"># X-axis servo</span>
tilt_pin = board.get_pin(<span class="cs">'d:10:s'</span>)   <span class="cm"># Y-axis servo</span>
laser    = board.get_pin(<span class="cs">'d:11:o'</span>)   <span class="cm"># laser pointer module</span>

<span class="cm"># Only update servo when error exceeds the dead zone</span>
<span class="ck">if</span> abs(error_x) > dead_zone:
    pan_angle += step_x <span class="ck">if</span> error_x > <span class="cn">0</span> <span class="ck">else</span> -step_x
    pan_angle  = max(<span class="cn">0</span>, min(<span class="cn">180</span>, pan_angle))
    pan_pin.write(pan_angle)

<span class="ck">if</span> abs(error_y) > dead_zone:
    tilt_angle += step_y <span class="ck">if</span> error_y > <span class="cn">0</span> <span class="ck">else</span> -step_y
    tilt_angle  = max(<span class="cn">0</span>, min(<span class="cn">180</span>, tilt_angle))
    tilt_pin.write(tilt_angle)

<span class="cm"># Activate laser pointer when subject is centred</span>
laser.write(<span class="cn">1</span> <span class="ck">if</span> centred <span class="ck">else</span> <span class="cn">0</span>)</pre></div>
    </div>

    <div class="callout">
      <p>Do not write to the servos every frame. This floods the Arduino with commands and causes constant jitter. Only update when the error exceeds a threshold, and add a short delay between writes. The smoothness difference is dramatic.</p>
    </div>

    <!-- ── Face recognition ── -->
    <h2 class="section-heading">OpenCV face recognition: identity-level tracking</h2>

    <p class="body-text">
      The LBPH recogniser is trained directly in the app &mdash; no cloud, no API, entirely offline. You capture face images, assign a name, and the model distinguishes that person from everyone else. Fast and private, but sensitive to lighting changes between training and deployment.
    </p>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang">Python</span>
        <span class="code-file">face_recognition.py &mdash; training the LBPH model</span>
      </div>
      <div class="code-body"><pre><span class="ck">import</span> cv2
<span class="ck">import</span> numpy <span class="ck">as</span> np

<span class="cm"># Create and train the recogniser on captured face samples</span>
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.train(face_samples, np.array(labels))

<span class="cm"># Save trained model to disk</span>
recognizer.save(<span class="cs">'trained_model.yml'</span>)

<span class="cm"># At runtime: predict identity from a detected face region</span>
label_id, confidence = recognizer.predict(face_roi)

<span class="ck">if</span> confidence &lt; <span class="cn">70</span>:     <span class="cm"># lower value = more confident match</span>
    name    = label_map[label_id]
    centred = <span class="ck">True</span>
<span class="ck">else</span>:
    name    = <span class="cs">"Unknown"</span>
    centred = <span class="ck">False</span></pre></div>
    </div>

    <div class="callout warn">
      <p>LBPH accuracy drops significantly when lighting differs between training and deployment. Recapture training images in the same room, under the same light, where the system will actually run.</p>
    </div>

    <!-- ── Laser ── -->
    <h2 class="section-heading">Laser pointer and relay activation</h2>

    <p class="body-text">
      A laser pointer module wired to Arduino pin 11 through a relay activates when the subject is centred within the dead zone. Manual keypress override also works. Requiring N consecutive centred frames before activating prevents false triggers entirely.
    </p>

    <div class="code-wrap">
      <div class="code-header">
        <span class="code-lang">Python</span>
        <span class="code-file">track.py &mdash; consecutive-frame check before activation</span>
      </div>
      <div class="code-body"><pre><span class="cm"># Require N stable frames before activating the laser pointer</span>
CENTRE_THRESHOLD = <span class="cn">5</span>
centre_counter   = <span class="cn">0</span>

<span class="ck">if</span> abs(error_x) &lt; dead_zone <span class="ck">and</span> abs(error_y) &lt; dead_zone:
    centre_counter += <span class="cn">1</span>
<span class="ck">else</span>:
    centre_counter = <span class="cn">0</span>    <span class="cm"># reset if subject moves out of zone</span>

centred = centre_counter &gt;= CENTRE_THRESHOLD
laser.write(<span class="cn">1</span> <span class="ck">if</span> centred <span class="ck">else</span> <span class="cn">0</span>)</pre></div>
    </div>

    <div class="callout danger">
      <p>Even a low-power laser pointer causes eye discomfort at close range. Always test pointing at a wall or paper surface. Confirm StandardFirmataPlus is uploaded to the Arduino before connecting PyFirmata2.</p>
    </div>

    <!-- ── Wiring table ── -->
    <h2 class="section-heading">Hardware wiring for Arduino object tracking</h2>

    <table class="wiring-table">
      <thead>
        <tr>
          <th>Component</th>
          <th>Arduino pin</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Pan servo (X-axis)</td>
          <td><span class="pin-badge">D9</span></td>
          <td>MG996R recommended</td>
        </tr>
        <tr>
          <td>Tilt servo (Y-axis)</td>
          <td><span class="pin-badge">D10</span></td>
          <td>MG996R recommended</td>
        </tr>
        <tr>
          <td>Laser pointer module</td>
          <td><span class="pin-badge">D11</span></td>
          <td>Digital output, relay switches load</td>
        </tr>
        <tr>
          <td>Arduino sketch</td>
          <td>&mdash;</td>
          <td>StandardFirmataPlus via Arduino IDE</td>
        </tr>
      </tbody>
    </table>

    <!-- ── Servo selection ── -->
    <h2 class="section-heading">Servo selection: the part nobody tells you</h2>

    <p class="body-text">
      SG90 micro servos are in every tutorial. They are also wrong for this build the moment you add any real load to the rig.
    </p>

    <div class="servo-grid">
      <div class="servo-card bad">
        <div class="servo-verdict">Avoid</div>
        <div class="servo-name">SG90 micro servo</div>
        <ul class="servo-traits">
          <li><span class="trait-dot bad-dot"></span>Low torque</li>
          <li><span class="trait-dot bad-dot"></span>Cannot handle real load</li>
          <li><span class="trait-dot bad-dot"></span>High jitter under stress</li>
          <li><span class="trait-dot bad-dot"></span>Platform shakes constantly</li>
        </ul>
      </div>
      <div class="servo-card good">
        <div class="servo-verdict">Use this instead</div>
        <div class="servo-name">MG996R servo</div>
        <ul class="servo-traits">
          <li><span class="trait-dot good-dot"></span>Higher torque rating</li>
          <li><span class="trait-dot good-dot"></span>Handles real load well</li>
          <li><span class="trait-dot good-dot"></span>Smooth controlled motion</li>
          <li><span class="trait-dot good-dot"></span>Minimum viable for this build</li>
        </ul>
      </div>
    </div>

    <!-- ── Problems ── -->
    <h2 class="section-heading">Four real-time problems solved</h2>

    <div class="problem-grid">
      <div class="problem-row">
        <div class="problem-card">
          <div class="problem-title">Latency</div>
          <div class="problem-body">Keep the detection loop lean. Profile face recognition overhead separately from the servo update loop &mdash; they run at different cadences.</div>
        </div>
        <div class="problem-card">
          <div class="problem-title">Jitter</div>
          <div class="problem-body">Apply a moving average to bounding box centers. Motors should not react to pixel-level fluctuations between consecutive frames.</div>
        </div>
      </div>
      <div class="problem-row">
        <div class="problem-card">
          <div class="problem-title">Overcorrection</div>
          <div class="problem-body">Dead zone plus step limit. Ignore errors smaller than the threshold and cap how far the servo moves per frame. Stops oscillation.</div>
        </div>
        <div class="problem-card">
          <div class="problem-title">False activations</div>
          <div class="problem-body">Confidence threshold plus N consecutive centred frames before the laser pointer activates. Fixed premature triggering completely.</div>
        </div>
      </div>
    </div>

    <!-- ── Pull quote ── -->
    <blockquote class="pull-quote">
      &ldquo;Machine learning coursework trains you to optimise a model. Nobody teaches you to think about the system around it &mdash; the hardware, the latency, the control loop. That is where the real problems live.&rdquo;
    </blockquote>

    <!-- ── What next ── -->
    <h2 class="section-heading">What to improve next</h2>

    <p class="body-text">
      PID control to replace the threshold-based servo logic and eliminate residual oscillation. A faster inference pipeline &mdash; model quantisation or a Jetson Nano. FaceNet instead of LBPH for lighting-robust face recognition. The full code is on GitHub if you want to build on it.
    </p>

    <div class="callout success">
      <p>Starting fresh: use MG996R servos, wire the laser pointer through a relay rather than directly to the Arduino pin, upload StandardFirmataPlus before touching PyFirmata2, and capture face training images in your actual operating environment. In that order.</p>
    </div>

    <!-- ── Tags ── -->
    <div class="tag-list">
      <span class="tag">yolov8-tracking-system</span>
      <span class="tag">arduino-object-tracking</span>
      <span class="tag">pan-tilt-cv-system</span>
      <span class="tag">computer-vision-hardware</span>
      <span class="tag">opencv-face-recognition</span>
      <span class="tag">pyfirmata2</span>
      <span class="tag">pan-tilt-servo</span>
      <span class="tag">laser-pointer-module</span>
      <span class="tag">tkinter</span>
      <span class="tag">real-time-detection</span>
    </div>

  </main>`;

export default sentryGunBlogHtml;
