import React from 'react';
import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { PROFILE } from '../../data/profile';

interface HeroProps {
  onExploreBuilds: () => void;
  onConnect: () => void;
  onOpenRecruiter?: () => void;
}

export default function Hero({ onExploreBuilds, onConnect, onOpenRecruiter }: HeroProps) {
  return (
    <section 
      id="hero"
      style={{
        minHeight: 'calc(100vh - var(--nav-height))',
        display: 'flex',
        alignItems: 'center',
        padding: '64px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="neo-container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '64px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left: 60% Swiss Editorial Typography & Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Identity Discipline Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span 
                className="swiss-badge swiss-badge-blue"
                style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}
              >
                ● {PROFILE.status}
              </span>

              <span 
                className="swiss-badge"
                style={{ fontSize: '0.72rem' }}
              >
                COMPUTER SCIENCE · SOFTWARE · AI · SYSTEMS
              </span>
            </div>

            {/* Giant Swiss Headline */}
            <div>
              <h1 
                style={{
                  fontSize: 'clamp(2.8rem, 6.2vw, 4.8rem)',
                  lineHeight: 0.98,
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase'
                }}
              >
                I BUILD<br />
                SYSTEMS.<br />
                I EXPLORE<br />
                <span style={{ color: 'var(--accent-blue)' }}>INTELLIGENCE.</span>
              </h1>
            </div>

            {/* Narrative Description */}
            <p 
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.65,
                color: 'var(--text-muted)',
                maxWidth: '560px'
              }}
            >
              {PROFILE.subline}
            </p>

            {/* Minimalist Telemetry Bar */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, auto)',
                gap: '16px 28px',
                padding: '12px 0',
                borderTop: 'var(--border-width) solid var(--border-color)',
                borderBottom: 'var(--border-width) solid var(--border-color)',
                width: 'fit-content',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.65rem' }}>CLASS</span>
                <strong style={{ color: 'var(--text-primary)' }}>B.TECH CSE</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.65rem' }}>CGPA</span>
                <strong style={{ color: 'var(--accent-green)' }}>{PROFILE.cgpa}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.65rem' }}>RANK</span>
                <strong style={{ color: 'var(--text-primary)' }}>2ND / 287</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.65rem' }}>COHORT</span>
                <strong style={{ color: 'var(--accent-blue)' }}>2023–2027</strong>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="swiss-btn swiss-btn-primary"
                onClick={onExploreBuilds}
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="swiss-btn"
                onClick={onConnect}
              >
                <span>CONTACT</span>
                <ArrowUpRight size={15} />
              </button>

              {PROFILE.resumeUrl && (
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-btn"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <FileText size={15} />
                  <span>RÉSUMÉ [PDF]</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: 40% Editorial Portrait & Technical Frame */}
          <div 
            style={{ 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Editorial Frame */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                border: 'var(--border-width) solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-card)',
                padding: '16px'
              }}
            >
              {/* Header Metadata Bar */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-dim)',
                  marginBottom: '12px',
                  borderBottom: 'var(--border-width) solid var(--border-color)',
                  paddingBottom: '8px'
                }}
              >
                <span>SHREEYA KALEBERE</span>
                <span>INDIA // 16.7° N</span>
              </div>

              {/* Photo */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1.15',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-primary)',
                  border: 'var(--border-width) solid var(--border-color)'
                }}
              >
                <img
                  src={PROFILE.photoUrl || PROFILE.avatar}
                  alt={PROFILE.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(15%) contrast(105%)'
                  }}
                />
              </div>

              {/* Footer Metadata */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  marginTop: '12px'
                }}
              >
                <span>CSE · SOFTWARE · AI</span>
                <span style={{ color: 'var(--accent-blue)' }}>SYS_READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
