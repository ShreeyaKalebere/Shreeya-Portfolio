import React, { useState } from 'react';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';
import { ExternalLink, Rocket, Trophy, Sparkles, Award } from 'lucide-react';

export const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Academic Excellence', 'Hackathon & Prototyping', 'National Scholarship', 'Leadership & Cohort Liaison'];

  const filteredAchievements = selectedCategory === 'ALL'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory || (selectedCategory === 'National Scholarship' && a.category.includes('National')));

  return (
    <section id="milestones" style={{ padding: '80px 0', position: 'relative' }}>
      <div id="achievements" style={{ position: 'absolute', top: 0 }} />
      <div id="hackathon-wins" style={{ position: 'absolute', top: 0 }} />
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>05 / MILESTONES & WINS</span>
            </div>
            <span>MODULE_05 // COMPETITIVE WINS & VERIFIED RECOGNITION</span>
          </div>
          <h2 className="swiss-title">
            ENGINEERING MILESTONES & HACKATHON WINS.
          </h2>
          <p className="swiss-subtitle">
            Verified competitive hackathon victories, live deployed server systems, academic merit rankings, and cohort leadership.
          </p>
        </div>

        {/* =========================================================================
            SPOTLIGHT: LIVE DEPLOYED AWARD-WINNING BUILDS
           ========================================================================= */}
        <div style={{ marginBottom: '40px' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '16px', 
              flexWrap: 'wrap', 
              gap: '8px',
              borderBottom: 'var(--border-width) solid var(--border-color)',
              paddingBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rocket size={16} color="var(--accent-green)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
                SPOTLIGHT // LIVE DEPLOYED HACKATHON APPLICATIONS
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)' }}>
                PRODUCTION ENDPOINTS ONLINE
              </span>
            </div>
          </div>

          <div className="bento-grid">
            {/* Spotlight 1: Rail Marga (1st Prize Winner, ANVATION 2026) */}
            <div 
              className="bento-card col-span-6 bento-card-featured"
              style={{
                borderTop: '3px solid #FFD83D',
                background: 'linear-gradient(180deg, rgba(255, 216, 61, 0.05) 0%, var(--bg-card) 100%)',
                padding: '24px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trophy size={16} color="#FFD83D" />
                    <span className="swiss-badge swiss-badge-green" style={{ background: '#FFD83D', color: '#000', fontWeight: 700 }}>
                      1ST PRIZE — ₹25,000 CASH PRIZE
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)' }}>
                    ● LIVE ON VERCEL
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#FFD83D', marginBottom: '4px', letterSpacing: '0.05em' }}>
                  ANVATION 2026 (24-HR NATIONAL HACKATHON)
                </div>

                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                  Rail Marga
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  End-to-end AI/ML railway assistance & server platform engineered under high-intensity 24-hour constraints at K. S. School of Engineering and Management, Bengaluru. Evaluated on real-time inference, algorithmic robustness, and production deployment.
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {["AI/ML Track", "24-Hour Hackathon", "Live Server", "FastAPI / Node", "KSSEM Bengaluru"].map((tag, i) => (
                    <span key={i} className="swiss-badge" style={{ fontSize: '0.65rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div 
                style={{ 
                  borderTop: 'var(--border-width) solid var(--border-color)', 
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  ENDPOINT: <span style={{ color: 'var(--text-primary)' }}>rail-marga-server.vercel.app</span>
                </div>

                <a
                  href="https://rail-marga-server.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-btn swiss-btn-primary"
                  style={{
                    fontSize: '0.75rem',
                    padding: '8px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  <Rocket size={13} />
                  <span>LAUNCH RAIL MARGA</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Spotlight 2: Sahi Supply (Best UI/UX Design, Triwizathon) */}
            <div 
              className="bento-card col-span-6 bento-card-featured"
              style={{
                borderTop: '3px solid #A855F7',
                background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, var(--bg-card) 100%)',
                padding: '24px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#A855F7" />
                    <span className="swiss-badge swiss-badge-purple" style={{ background: '#A855F7', color: '#FFF', fontWeight: 700 }}>
                      BEST UI/UX DESIGN — 3RD PRIZE
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)' }}>
                    ● LIVE ON RENDER
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#A855F7', marginBottom: '4px', letterSpacing: '0.05em' }}>
                  TRIWIZATHON (UI/UX & INNOVATION SPRINT)
                </div>

                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                  Sahi Supply
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Immersive 3D interactive supply chain and logistics web platform. Combines custom 3D spatial logistics models crafted in Blender with real-time WebGL rendering pipelines in Three.js, delivering an award-winning user experience.
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {["Three.js", "Blender 3D", "WebGL", "Supply Chain", "Interactive UI"].map((tag, i) => (
                    <span key={i} className="swiss-badge" style={{ fontSize: '0.65rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div 
                style={{ 
                  borderTop: 'var(--border-width) solid var(--border-color)', 
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  ENDPOINT: <span style={{ color: 'var(--text-primary)' }}>sahisupply.onrender.com</span>
                </div>

                <a
                  href="https://sahisupply.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-btn swiss-btn-primary"
                  style={{
                    fontSize: '0.75rem',
                    padding: '8px 16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    fontWeight: 700
                  }}
                >
                  <Sparkles size={13} />
                  <span>LAUNCH SAHI SUPPLY</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {['ALL', 'Academic', 'Hackathons', 'National Honors', 'Leadership'].map((f) => {
            const isActive = 
              (f === 'ALL' && selectedCategory === 'ALL') ||
              (f === 'Academic' && selectedCategory === 'Academic Excellence') ||
              (f === 'Hackathons' && selectedCategory === 'Hackathon & Prototyping') ||
              (f === 'National Honors' && selectedCategory === 'National Scholarship') ||
              (f === 'Leadership' && selectedCategory === 'Leadership & Cohort Liaison');

            return (
              <button
                key={f}
                onClick={() => {
                  if (f === 'ALL') setSelectedCategory('ALL');
                  else if (f === 'Academic') setSelectedCategory('Academic Excellence');
                  else if (f === 'Hackathons') setSelectedCategory('Hackathon & Prototyping');
                  else if (f === 'National Honors') setSelectedCategory('National Scholarship');
                  else if (f === 'Leadership') setSelectedCategory('Leadership & Cohort Liaison');
                }}
                className={`swiss-btn ${isActive ? 'swiss-btn-primary' : ''}`}
                style={{ fontSize: '0.72rem', padding: '6px 14px' }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Bento Grid: Verified Milestones */}
        <div className="bento-grid">
          {filteredAchievements.map((item: Achievement, idx) => {
            const isStandout = item.id === 'academic-standing' || item.id === 'anvation-hackathon-2026' || item.id === 'eureka-hackathon' || item.id === 'triwizathon-best-ui';
            const colSpan = isStandout ? 'col-span-6' : 'col-span-4';

            return (
              <div
                key={item.id}
                className={`bento-card ${colSpan} ${isStandout ? 'bento-card-featured' : ''}`}
                style={{
                  borderTop: `2px solid ${item.accent || 'var(--border-color)'}`,
                  minHeight: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="swiss-badge swiss-badge-blue">
                      {item.badge}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      0{idx + 1} // {item.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 
                    style={{ 
                      fontSize: isStandout ? '1.3rem' : '1.15rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '14px' }}>
                    {item.description}
                  </p>
                </div>

                <div 
                  style={{ 
                    borderTop: 'var(--border-width) solid var(--border-color)', 
                    paddingTop: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <span>{item.details.slice(0, 65)}...</span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.liveDemo && (
                      <a
                        href={item.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="swiss-btn"
                        style={{
                          fontSize: '0.65rem',
                          padding: '3px 8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--accent-blue)',
                          borderColor: 'var(--accent-blue)',
                          textDecoration: 'none'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>LIVE APP</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    <span style={{ color: 'var(--accent-green)', whiteSpace: 'nowrap' }}>
                      ● VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Achievements;
