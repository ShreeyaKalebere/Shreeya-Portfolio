import React, { useState } from 'react';
import { PROFILE } from '../../data/profile';
import { PROJECTS, Project } from '../../data/projects';
import { ACHIEVEMENTS } from '../../data/achievements';
import { TECHNOLOGIES } from '../../data/technologies';
import { FileText, ExternalLink, ArrowRight, X } from 'lucide-react';

interface RecruiterDashboardProps {
  onClose: () => void;
  onSelectProject?: (projId: string) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onClose, onSelectProject }) => {
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'SDE' | 'AI'>('ALL');

  const spotlightProjects: Project[] = (() => {
    if (roleFilter === 'SDE') {
      return PROJECTS.filter(p => ['silent-alarm', 'resumepilot-ai', 'food-safe', 'roadcare-ai'].includes(p.id));
    }
    if (roleFilter === 'AI') {
      return PROJECTS.filter(p => ['roadcare-ai', 'silent-alarm', 'sonic-fingerprints', 'resumepilot-ai'].includes(p.id));
    }
    return PROJECTS;
  })();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '40px 16px' }}>
      <div className="neo-container" style={{ maxWidth: '1080px' }}>
        {/* Top Header Bar */}
        <div 
          className="bento-card"
          style={{
            padding: '16px 20px',
            marginBottom: '28px',
            backgroundColor: 'var(--bg-surface)',
            borderLeft: '3px solid var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-green)', borderRadius: '50%' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              RECRUITER SCAN // 30-SECOND CANDIDATE DOSSIER
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="swiss-btn swiss-btn-primary"
            style={{ fontSize: '0.72rem', padding: '6px 14px' }}
          >
            <X size={13} />
            <span>RETURN TO FULL PORTFOLIO</span>
          </button>
        </div>

        {/* Candidate Profile Summary Card */}
        <div 
          className="bento-card bento-card-featured"
          style={{ padding: '28px', marginBottom: '28px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', borderBottom: 'var(--border-width) solid var(--border-color)', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img
                src={PROFILE.photoUrl || PROFILE.avatar}
                alt={PROFILE.name}
                style={{
                  width: '84px',
                  height: '84px',
                  objectFit: 'cover',
                  border: '1px solid var(--border-color)',
                  display: 'block'
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    {PROFILE.name}
                  </h1>
                  <span className="swiss-badge swiss-badge-green" style={{ fontSize: '0.65rem' }}>
                    AVAILABLE
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                  {PROFILE.primaryRole}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {PROFILE.degree} • {PROFILE.institution} ({PROFILE.graduationYear})
                </p>
              </div>
            </div>

            {/* Academic Standout Box */}
            <div 
              style={{
                padding: '14px 20px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase' }}>
                ACADEMIC STANDING
              </span>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                RANK 2 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 287</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-green)', marginTop: '2px' }}>
                9.6 / 10.0 CGPA (Top 0.7%)
              </div>
            </div>
          </div>

          {/* Action Links Bar */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '20px' }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="swiss-btn swiss-btn-primary"
              style={{ fontSize: '0.75rem' }}
            >
              <FileText size={14} />
              <span>RÉSUMÉ [PDF]</span>
            </a>

            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="swiss-btn"
              style={{ fontSize: '0.75rem' }}
            >
              <span>GITHUB @ShreeyaKalebere</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="swiss-btn"
              style={{ fontSize: '0.75rem' }}
            >
              <span>LINKEDIN</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="swiss-btn"
              style={{ fontSize: '0.75rem', borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}
            >
              <span>DIRECT EMAIL</span>
            </a>
          </div>
        </div>

        {/* Target Role Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            FILTER BY TARGET ROLE:
          </span>

          <div style={{ display: 'flex', gap: '6px' }}>
            {(['ALL', 'SDE', 'AI'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setRoleFilter(mode)}
                className={`swiss-btn ${roleFilter === mode ? 'swiss-btn-primary' : ''}`}
                style={{ fontSize: '0.72rem', padding: '5px 12px' }}
              >
                {mode === 'ALL' ? 'ALL TRACKS' : `${mode} TRACK`}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          {spotlightProjects.map(proj => (
            <div
              key={proj.id}
              className="bento-card"
              style={{
                borderLeft: `3px solid ${proj.accent || 'var(--accent-blue)'}`,
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {proj.title}
                </h3>
                <span className="swiss-badge swiss-badge-blue">
                  {proj.status.toUpperCase()}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '12px 0' }}>
                <div style={{ padding: '10px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block' }}>
                    THE PROBLEM
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    {proj.problem || proj.description}
                  </p>
                </div>

                <div style={{ padding: '10px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block' }}>
                    THE SOLUTION & OUTCOME
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                    {proj.built || proj.approach || "Engineered scalable architecture with clean abstractions."}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {proj.technologies.slice(0, 5).map(t => (
                    <span key={t} className="swiss-badge" style={{ fontSize: '0.65rem' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProject?.(proj.id);
                  }}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>FULL SPECIFICATION</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Tech Stack Summary */}
        <div className="bento-card" style={{ padding: '20px', marginBottom: '28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '12px' }}>
            VERIFIED CORE TECHNICAL STACK
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {TECHNOLOGIES.slice(0, 18).map(t => (
              <span key={t.id} className="swiss-badge" style={{ fontSize: '0.72rem' }}>
                {t.name}
              </span>
            ))}
          </div>
        </div>

        {/* Honors Summary */}
        <div className="bento-card" style={{ padding: '20px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '12px' }}>
            ACADEMIC HONORS & RECOGNITION
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ACHIEVEMENTS.slice(0, 4).map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</span>
                <span className="swiss-badge swiss-badge-green" style={{ fontSize: '0.68rem' }}>{a.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecruiterDashboard;
