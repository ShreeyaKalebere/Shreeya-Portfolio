import React from 'react';
import { PROFILE } from '../../data/profile';
import { ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        borderTop: 'var(--border-width) solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
        padding: '64px 0 40px',
        color: 'var(--text-primary)'
      }}
    >
      <div className="neo-container">
        {/* Large Swiss Editorial Footer Title */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '48px'
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            ENGINEERING DOSSIER // COLOPHON
          </div>

          <h2 
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)'
            }}
          >
            SHREEYA<br />
            <span style={{ color: 'var(--accent-blue)' }}>KALEBERE</span>
          </h2>

          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginTop: '8px',
              letterSpacing: '0.04em'
            }}
          >
            SOFTWARE · AI · SYSTEMS · COMPUTER SCIENCE
          </div>
        </div>

        {/* Minimal Middle Navigation & Links */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            borderTop: 'var(--border-width) solid var(--border-color)',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            padding: '28px 0',
            marginBottom: '32px'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
              ACADEMIC CREDENTIALS
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              B.Tech in Computer Science & Engineering<br />
              D.Y. Patil CET (2023–2027)<br />
              Rank 2 / 287 Students • CGPA 9.6
            </p>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
              DIRECT ACCESS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              <a href="#about" style={{ color: 'var(--text-muted)' }}>01 // ABOUT ME</a>
              <a href="#work" style={{ color: 'var(--text-muted)' }}>02 // APPLIED WORK</a>
              <a href="#stack" style={{ color: 'var(--text-muted)' }}>03 // STACK MATRIX</a>
              <a href="#lab" style={{ color: 'var(--text-muted)' }}>04 // AI LAB</a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
              CHANNELS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              <a href={PROFILE.social.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                GITHUB ↗
              </a>
              <a href={PROFILE.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                LINKEDIN ↗
              </a>
              <a href={`mailto:${PROFILE.email}`} style={{ color: 'var(--text-muted)' }}>
                EMAIL ↗
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>
                RÉSUMÉ [PDF] ↗
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <button
              type="button"
              onClick={scrollToTop}
              className="swiss-btn"
              style={{ fontSize: '0.72rem' }}
            >
              <span>RETURN TO TOP</span>
              <ArrowUp size={13} />
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '16px' }}>
              STATUS: ALL SYSTEMS NOMINAL
            </span>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            © 2026 SHREEYA KALEBERE. SWISS BENTO × NEO-FUTURIST ARCHITECTURE.
          </div>
          <div>
            BUILT WITH REACT + TYPESCRIPT + VANILLA CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
