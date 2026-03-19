import '../styles/AboutMe.css';

const TRAITS = [
  { icon: '\ud83e\udde0', label: 'Problem Solver', desc: 'I like turning complex requirements into practical systems.' },
  { icon: '\u2699\ufe0f', label: 'System Builder', desc: 'I work across software, models, APIs, and hardware.' },
  { icon: '\ud83d\udd2c', label: 'ML Focused', desc: 'I enjoy training, evaluating, and deploying machine learning systems.' },
  { icon: '\ud83c\udf0a', label: 'Backend Mindset', desc: 'I care about reliability, structure, and maintainable engineering.' },
];

const SKILLS = [
  {
    label: 'Programming Languages',
    items: ['Python', 'Java', 'C'],
  },
  {
    label: 'Web Technologies',
    items: ['HTML', 'CSS'],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'OpenCV',
      'Scikit-learn',
      'PyTorch',
      'YOLOv8',
      'MediaPipe',
      'Hugging Face Transformers',
      'Spring Boot',
    ],
  },
  {
    label: 'Backend & APIs',
    items: ['REST APIs', 'Spring Boot REST APIs'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'SQL', 'Spring Data JPA'],
  },
  {
    label: 'Developer Tools',
    items: ['Git', 'VS Code', 'Jupyter Notebook', 'Google Colab', 'Ollama', 'Maven'],
  },
  {
    label: 'Core CS Concepts',
    items: [
      'Data Structures',
      'OOP',
      'DBMS',
      'Computer Networks',
      'Java Collections Framework',
      'Generics',
      'Stream API',
    ],
  },
  {
    label: 'Security',
    items: ['Spring Security', 'JWT Authentication', 'BCrypt'],
  },
  {
    label: 'Testing',
    items: ['JUnit', 'Mockito', 'MockMvc'],
  },
];

export default function AboutMe() {
  return (
    <section id="about" className="aboutme">
      <div className="aboutme-inner">
        <div className="eyebrow-row reveal">
          <span className="eyebrow-line" />
          <span className="eyebrow-text">Sunlit Zone - 200m</span>
        </div>

        <div className="aboutme-top">
          <div className="photo-col reveal">
            <div className="photo-frame">
              <div className="photo-ring photo-ring-1" />
              <div className="photo-ring photo-ring-2" />
              <div className="photo-ring photo-ring-3" />

              <div className="photo-placeholder">
                <img
                  src="/assets/profile.jpg?v=2"
                  alt="Ravi Ranjan Prasad"
                  className="photo-real"
                />
              </div>

              <div className="photo-caustic" />
            </div>

            <div className="photo-namecard">
              <div className="photo-name">Ravi Ranjan Prasad</div>
              <div className="photo-title">B.Tech CSE / Data Science Student</div>
              <div className="photo-location">
                <span className="loc-dot" />
                Roorkee, Uttarakhand
              </div>
            </div>
          </div>

          <div className="bio-col">
            <h2 className="aboutme-heading reveal">
              More than
              <br />
              the <em>resume.</em>
            </h2>

            <p className="aboutme-para reveal delay-1">
              I&apos;m Ravi, a Computer Science student with a strong foundation in
              <strong> data structures, machine learning, and backend development</strong>.
              I enjoy building systems that are practical, testable, and useful outside the demo.
            </p>

            <p className="aboutme-para reveal delay-2">
              My work sits at the intersection of <strong>computer vision, backend APIs,
              and software-hardware integration</strong>. I&apos;ve built decentralized communication systems,
              real-time targeting software, and backend components around modern engineering workflows.
            </p>

            <p className="aboutme-para reveal delay-3">
              I&apos;m most interested in <strong>machine learning, AI systems, and backend engineering roles</strong>
              where I can keep growing through hard, real-world implementation work.
            </p>

            <div className="trait-grid reveal delay-3">
              {TRAITS.map((trait) => (
                <div key={trait.label} className="trait-pill">
                  <span className="trait-icon">{trait.icon}</span>
                  <div>
                    <div className="trait-label">{trait.label}</div>
                    <div className="trait-desc">{trait.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-status reveal delay-4">
              <div className="status-dot" />
              <div className="status-text">
                Status: <strong>Open to opportunities</strong> / ML / Backend / AI Systems
              </div>
            </div>
          </div>
        </div>

        <div className="skills-section reveal delay-2">
          <div className="skills-section-label">Technical Depth</div>
          <div className="skills-stack-grid">
            {SKILLS.map((skill) => (
              <div key={skill.label} className="skill-panel">
                <div className="skill-panel-label">{skill.label}</div>
                <div className="skill-tag-cloud">
                  {skill.items.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
