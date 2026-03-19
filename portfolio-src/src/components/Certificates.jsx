import '../styles/Certificates.css';

const CERTS = [
  {
    id: 'meta-version-control',
    title: 'Version Control',
    issuer: 'Meta / Coursera',
    date: 'March 11, 2025',
    category: 'Certificate',
    color: '#1877f2',
    image: '/assets/meta-version-control.jfif',
    skills: ['Git', 'GitHub', 'Branching', 'Version Control'],
    verified: 'https://coursera.org/verify/FUHYN67OG1RI',
    actionLabel: 'Verify credential',
  },
  {
    id: 'meta-programming-javascript',
    title: 'Programming with JavaScript',
    issuer: 'Meta / Coursera',
    date: 'March 21, 2025',
    category: 'Certificate',
    color: '#1877f2',
    image: '/assets/meta-programming-javascript.jfif',
    skills: ['JavaScript', 'Programming Fundamentals', 'Functions', 'Web Basics'],
    verified: 'https://coursera.org/verify/AE1EXIJ3V6OG',
    actionLabel: 'Verify credential',
  },
  {
    id: 'techsangram-award',
    title: 'Second Winner - TechSangram 2025',
    issuer: 'Haridwar University',
    date: '2025',
    category: 'Award',
    color: '#d4a843',
    image: '/assets/techsangram-award.jfif',
    skills: ['Competition', 'Problem Solving', 'Team Performance'],
    verified: '/assets/techsangram-award.jfif',
    actionLabel: 'Open award image',
  },
  {
    id: 'coursera-60INR602C6RR',
    title: 'Project Management Foundations, Initiation, and Planning',
    issuer: 'SkillUp EdTech / Coursera',
    date: 'March 21, 2025',
    category: 'Certificate',
    color: '#2a73cc',
    image: '/assets/SkillUp_Project_Mgmt.jpeg',
    file: '/assets/SkillUp_Project_Mgmt.jpeg',
    fileType: 'pdf',
    skills: ['Project Management', 'Initiation', 'Planning', 'Course Completion'],
    verified: 'https://coursera.org/verify/60INR602C6RR',
    actionLabel: 'Verify credential',
  },
  {
    id: 'introduction-to-machine-learning',
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
    date: '2025',
    category: 'Certificate',
    color: '#2d9e6e',
    image: '/assets/Nptel.png',
    file: '/assets/introduction-to-machine-learning.pdf',
    fileType: 'pdf',
    skills: ['Machine Learning', 'Foundations', 'NPTEL', 'Course Completion'],
    verified: '/assets/introduction-to-machine-learning.pdf',
    actionLabel: 'Open certificate PDF',
  },
  {
    id: 'iitm-programming-data-science',
    title: 'Programming and Data Science Foundations',
    issuer: 'Indian Institute of Technology Madras',
    date: 'September 15, 2025',
    category: 'Certificate',
    color: '#9c3a30',
    image: '/assets/1758479314097.png',
    skills: ['Programming', 'Data Science', 'Foundational Level', 'Course Completion'],
    verified: '/assets/1758479314097.png',
    actionLabel: 'Open certificate image',
  },
  {
    id: 'ducat-power-bi-workshop',
    title: '1 Day Workshop on Power BI',
    issuer: 'DUCAT / Haridwar University Roorkee',
    date: 'February 27, 2025',
    category: 'Workshop',
    color: '#f28c28',
    image: '/assets/Ducat.jpeg',
    file: '/assets/ducat-power-bi-workshop.pdf',
    fileType: 'pdf',
    skills: ['Power BI', 'Data Visualization', 'Workshop', 'Business Intelligence'],
    verified: '/assets/ducat-power-bi-workshop.pdf',
    actionLabel: 'Open certificate PDF',
  },
];

const CATEGORY_COLORS = {
  Certificate: 'rgba(24,119,242,0.16)',
  Award: 'rgba(212,168,67,0.2)',
  Workshop: 'rgba(242,140,40,0.18)',
};

function CertCard({ cert, index, duplicate = false }) {
  const previewHref = cert.image ?? cert.file;
  const showImagePreview = Boolean(cert.image);

  return (
    <div
      className="cert-card"
      style={{
        '--cert-color': cert.color,
        transitionDelay: `${(index % 3) * 0.1}s`,
      }}
      aria-hidden={duplicate ? 'true' : undefined}
    >
      <div className="cert-top-line" />

      <a
        href={previewHref ?? '#'}
        target={previewHref ? '_blank' : undefined}
        rel={previewHref ? 'noreferrer' : undefined}
        className={`cert-image-wrap ${previewHref ? '' : 'is-static'}`.trim()}
        aria-label={previewHref ? `Open ${cert.title}` : cert.title}
      >
        {showImagePreview ? (
          <img src={cert.image} alt={cert.title} className="cert-image" />
        ) : (
          <div className="cert-pdf-preview">
            <div className="cert-pdf-label">{cert.fileType === 'pdf' ? 'PDF' : cert.category}</div>
            <div className="cert-pdf-title">{cert.title}</div>
            <div className="cert-pdf-subtitle">{cert.issuer}</div>
          </div>
        )}
      </a>

      <div className="cert-header">
        <div className="cert-meta">
          <span
            className="cert-category"
            style={{ background: CATEGORY_COLORS[cert.category] ?? 'rgba(45,158,110,0.15)' }}
          >
            {cert.category}
          </span>
          <span className="cert-date">{cert.date}</span>
        </div>
      </div>

      <div className="cert-title">{cert.title}</div>
      <div className="cert-issuer">{cert.issuer}</div>

      <div className="cert-skills">
        {cert.skills.map((skill) => (
          <span key={skill} className="cert-skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="cert-footer">
        {cert.verified ? (
          <a href={cert.verified} target="_blank" rel="noreferrer" className="cert-verify-link">
            {cert.actionLabel} ->
          </a>
        ) : (
          <span className="cert-verify-pending">{cert.actionLabel}</span>
        )}

        <div className="cert-badge">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="cert-badge-svg">
            <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M6,10 L9,13 L14,7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const rotatingCerts = [...CERTS, ...CERTS];

  return (
    <section id="certificates" className="certs">
      <div className="certs-inner">
        <div className="eyebrow-row reveal">
          <span className="eyebrow-line" />
          <span className="eyebrow-text">Twilight Zone - 800m</span>
        </div>

        <h2 className="certs-heading reveal">
          Certificates &amp; <em>Awards</em>
        </h2>
        <p className="certs-sub reveal">
          Real credentials and competition work, now linked to their actual files.
        </p>

        <div className="certs-carousel reveal">
          <div className="certs-track">
            {rotatingCerts.map((cert, index) => (
              <CertCard
                key={`${cert.id}-${index}`}
                cert={cert}
                index={index}
                duplicate={index >= CERTS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
