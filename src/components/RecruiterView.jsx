import React, { useState } from 'react';
import { 
  FileDown, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Brain, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  ExternalLink,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { PERSONAL_INFO, LINKS } from '../data/config';
import { PROJECTS } from '../data/projects';
import { SKILLS } from '../data/skills';
import { ACHIEVEMENTS } from '../data/achievements';
import { EDUCATION_DATA } from '../data/education';
import { sound } from '../utils/audio';
import ProjectModal from './ProjectModal';
import '../styles/recruiter.css';

export default function RecruiterView({ onReturnToWorld }) {
  const [profileMode, setProfileMode] = useState('all'); // 'all', 'sde', 'ai'
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter skills based on SDE vs AI focus
  const sdeKeywords = ['cpp', 'java', 'python', 'javascript', 'sql', 'dsa', 'oop', 'os', 'dbms', 'networks', 'react', 'nodejs', 'mern', 'rest_apis', 'git_github', 'mongodb', 'postgresql'];
  const aiKeywords = ['python', 'machine_learning', 'computer_vision', 'yolo', 'opencv', 'pytorch', 'tensorflow', 'ai_agents', 'fastapi', 'docker'];

  // Project filtering & sorting based on mode
  const displayedProjects = [...PROJECTS].sort((a, b) => {
    if (profileMode === 'sde') {
      const aIsSde = a.profileTags.includes('SDE') ? 1 : 0;
      const bIsSde = b.profileTags.includes('SDE') ? 1 : 0;
      return bIsSde - aIsSde;
    }
    if (profileMode === 'ai') {
      const aIsAi = a.profileTags.includes('AI') ? 1 : 0;
      const bIsAi = b.profileTags.includes('AI') ? 1 : 0;
      return bIsAi - aIsAi;
    }
    return 0;
  });

  const handleRoleChange = (mode) => {
    sound.playClick();
    setProfileMode(mode);
  };

  const isSkillHighlighted = (skillId) => {
    if (profileMode === 'sde') return sdeKeywords.includes(skillId);
    if (profileMode === 'ai') return aiKeywords.includes(skillId);
    return false;
  };

  return (
    <div className="recruiter-view-container container" role="region" aria-label="Recruiter Professional Dashboard">
      {/* 1. Candidate Hero Anchor Card */}
      <div className="recruiter-hero-card cyber-corners">
        <div className="recruiter-photo-box">
          <img
            src={PERSONAL_INFO.photoUrl}
            alt={`Portrait of ${PERSONAL_INFO.name}`}
            className="recruiter-photo"
          />
        </div>

        <div className="recruiter-bio-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-voxel">CANDIDATE DOSSIER</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--matrix-green)' }}>
              ● AVAILABLE FOR INTERNSHIPS & SDE / AI ROLES
            </span>
          </div>

          <h1 className="recruiter-candidate-name">{PERSONAL_INFO.name.toUpperCase()}</h1>
          <div className="recruiter-title-badge">{PERSONAL_INFO.title}</div>
          <div className="recruiter-academic-line">
            {PERSONAL_INFO.degree} • {PERSONAL_INFO.institution} • <strong>CGPA: {PERSONAL_INFO.cgpa} (Rank: 2nd / 287)</strong>
          </div>

          <p className="recruiter-summary-p">
            {PERSONAL_INFO.bioExtended}
          </p>

          <div className="recruiter-actions-row">
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => sound.playClick()}
            >
              <FileDown size={16} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              onClick={() => sound.playClick()}
            >
              <Github size={16} />
              <span>GITHUB</span>
            </a>

            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              onClick={() => sound.playClick()}
            >
              <Linkedin size={16} />
              <span>LINKEDIN</span>
            </a>

            <a
              href={`mailto:${LINKS.hasRealEmail ? LINKS.emailPlaceholder : 'contact@shreeyakalebere.dev'}?subject=${encodeURIComponent(LINKS.mailtoSubject)}`}
              className="btn-cyan"
              onClick={() => sound.playClick()}
            >
              <Mail size={16} />
              <span>CONTACT EMAIL</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Role Filter Navigation Bar */}
      <div className="recruiter-role-nav">
        <div className="role-pills-group" role="tablist" aria-label="Candidate Focus Profiles">
          <button
            type="button"
            role="tab"
            aria-selected={profileMode === 'all'}
            className={`role-filter-btn ${profileMode === 'all' ? 'active' : ''}`}
            onClick={() => handleRoleChange('all')}
          >
            <Layers size={16} />
            <span>ALL OVERVIEW</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={profileMode === 'sde'}
            className={`role-filter-btn ${profileMode === 'sde' ? 'active' : ''}`}
            onClick={() => handleRoleChange('sde')}
          >
            <Code2 size={16} />
            <span>SDE PROFILE</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={profileMode === 'ai'}
            className={`role-filter-btn ai ${profileMode === 'ai' ? 'active' : ''}`}
            onClick={() => handleRoleChange('ai')}
          >
            <Brain size={16} />
            <span>AI ENGINEER PROFILE</span>
          </button>
        </div>

        <button
          type="button"
          className="recruiter-world-toggle-btn"
          onClick={() => {
            sound.playModeShift();
            onReturnToWorld();
          }}
        >
          ← Return to 3D Voxel World View
        </button>
      </div>

      {/* 3. Categorized Technical Competencies (No fake percentages) */}
      <div className="recruiter-section-block">
        <div className="recruiter-block-header">
          <h2 className="recruiter-block-title">
            <Code2 size={20} color="var(--matrix-green)" />
            <span>TECHNICAL CORE COMPETENCIES</span>
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {profileMode === 'sde' ? 'FILTERED: SDE STACK' : profileMode === 'ai' ? 'FILTERED: AI STACK' : 'ALL CORE SKILLS'}
          </span>
        </div>

        <div className="recruiter-skills-grid">
          {/* Languages */}
          <div className="recruiter-skill-group-card">
            <div className="skill-group-title">Languages</div>
            <div className="skill-pills-wrap">
              {SKILLS.filter(s => s.category === 'languages').map(s => (
                <span key={s.id} className={`recruiter-skill-pill ${isSkillHighlighted(s.id) ? 'highlighted' : ''}`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Computer Science Core */}
          <div className="recruiter-skill-group-card">
            <div className="skill-group-title">Computer Science Core</div>
            <div className="skill-pills-wrap">
              {SKILLS.filter(s => s.category === 'cs_core').map(s => (
                <span key={s.id} className={`recruiter-skill-pill ${isSkillHighlighted(s.id) ? 'highlighted' : ''}`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Software & Full-Stack */}
          <div className="recruiter-skill-group-card">
            <div className="skill-group-title">Software Engineering & Web</div>
            <div className="skill-pills-wrap">
              {SKILLS.filter(s => s.category === 'software').map(s => (
                <span key={s.id} className={`recruiter-skill-pill ${isSkillHighlighted(s.id) ? 'highlighted' : ''}`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* AI & Computer Vision */}
          <div className="recruiter-skill-group-card">
            <div className="skill-group-title">AI & Computer Vision</div>
            <div className="skill-pills-wrap">
              {SKILLS.filter(s => s.category === 'ai_ml').map(s => (
                <span key={s.id} className={`recruiter-skill-pill ${isSkillHighlighted(s.id) ? 'highlighted' : ''}`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Databases & DevOps */}
          <div className="recruiter-skill-group-card">
            <div className="skill-group-title">Databases & DevOps</div>
            <div className="skill-pills-wrap">
              {SKILLS.filter(s => ['databases', 'devops'].includes(s.category)).map(s => (
                <span key={s.id} className={`recruiter-skill-pill ${isSkillHighlighted(s.id) ? 'highlighted' : ''}`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Projects Showcase */}
      <div className="recruiter-section-block">
        <div className="recruiter-block-header">
          <h2 className="recruiter-block-title">
            <Briefcase size={20} color="var(--matrix-green)" />
            <span>FEATURED PROJECTS & CASE STUDIES</span>
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            CLICK TO EXPAND SYSTEM ARCHITECTURE
          </span>
        </div>

        <div className="projects-grid">
          {displayedProjects.map((p) => (
            <div
              key={p.id}
              className="project-card cyber-corners"
              onClick={() => {
                sound.playClick();
                setSelectedProject(p);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="project-card-top">
                  <span className="project-codename">{p.category}</span>
                  <span className="project-badge">{p.badge}</span>
                </div>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.shortDescription}</p>
              </div>

              <div>
                <div className="project-card-techs">
                  {p.technologies.map((t, idx) => (
                    <span key={idx} className="project-tech-pill">{t}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <span className="project-status-tag">Status: {p.status}</span>
                  <div className="project-open-cta">
                    <span>CASE STUDY</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Education & Verified Credentials Summary */}
      <div className="recruiter-section-block">
        <div className="recruiter-block-header">
          <h2 className="recruiter-block-title">
            <GraduationCap size={20} color="var(--matrix-green)" />
            <span>EDUCATION & ACADEMICS</span>
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--matrix-green)' }}>
            TOP 1% MERIT STANDING
          </span>
        </div>

        <div style={{ background: 'rgba(10, 18, 14, 0.85)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '4px' }}>
            {EDUCATION_DATA.degree} in {EDUCATION_DATA.major}
          </h3>
          <div style={{ color: 'var(--matrix-green)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '14px' }}>
            {EDUCATION_DATA.institution} • Expected 2027
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <span className="badge-voxel">CGPA: {EDUCATION_DATA.cgpa}</span>
            <span className="badge-voxel">Standing: {EDUCATION_DATA.academicStanding}</span>
          </div>
        </div>
      </div>

      {/* 6. Verified Achievements & Leadership */}
      <div className="recruiter-section-block">
        <div className="recruiter-block-header">
          <h2 className="recruiter-block-title">
            <Trophy size={20} color="var(--matrix-green)" />
            <span>HONORS, LEADERSHIP & VERIFIED CERTIFICATIONS</span>
          </h2>
        </div>

        <div className="quest-log-grid">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.id} className="quest-card" style={{ padding: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyber-cyan)' }}>
                    {a.category}
                  </span>
                  <span className="badge-voxel" style={{ fontSize: '0.7rem' }}>{a.status}</span>
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '4px' }}>{a.title}</h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--matrix-green)', marginBottom: '8px' }}>
                  {a.badge}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{a.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
