import '../styles/Blogs.css';

const BLOGS = [
  {
    title: 'Building a Real-Time AI Pan-Tilt Tracking System: YOLOv8 + Arduino',
    category: 'Embedded CV',
    date: 'Featured Post',
    readTime: '12 min read',
    href: '/blog/yolov8-arduino-pan-tilt-tracking',
    summary:
      'A full project walkthrough of the real-time pan-tilt tracking build: YOLOv8 detection, OpenCV face recognition, Arduino servo control, hardware tradeoffs, and the real-world problems that show up when computer vision leaves the screen.',
    highlights: [
      'YOLOv8 tracking + Arduino pan-tilt integration',
      'Face recognition, laser pointer activation, and control-loop lessons',
      'Standalone long-form writeup with updated pan-tilt framing',
    ],
    tags: ['YOLOv8', 'Arduino', 'Computer Vision', 'OpenCV'],
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="blogs">
      <div className="blogs-inner">
        <div className="section-eyebrow reveal">Field Notes - Live Builds</div>
        <h2 className="section-heading reveal">
          Technical <em>Blogs</em>
        </h2>
        <p className="section-sub reveal">
          Long-form writeups from projects that moved beyond the prototype stage.
        </p>

        <div className="blogs-grid">
          {BLOGS.map((blog, index) => (
            <article key={blog.title} className={`blog-card reveal delay-${index + 1}`}>
              <div className="blog-meta-row">
                <span className="blog-category">{blog.category}</span>
                <span className="blog-readtime">{blog.readTime}</span>
              </div>

              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-summary">{blog.summary}</p>

              <div className="blog-highlights">
                {blog.highlights.map((item) => (
                  <div key={item} className="blog-highlight">
                    <span className="blog-highlight-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="blog-footer">
                <div className="blog-tags">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <a href={blog.href} className="blog-link" target="_blank" rel="noreferrer">
                  Read article -&gt;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

