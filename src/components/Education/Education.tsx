import React from 'react';
import { EDUCATION_TIMELINE, COURSEWORK_MODULES, EducationTimelineNode } from '../../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>07 / EDUCATION</span>
            </div>
            <span>MODULE_07 // ACADEMIC RIGOR & FOUNDATIONS</span>
          </div>
          <h2 className="swiss-title">
            ACADEMIC FOUNDATIONS.
          </h2>
          <p className="swiss-subtitle">
            Bachelor of Technology in Computer Science & Engineering (2023 – 2027) at D.Y. Patil College of Engineering & Technology.
          </p>
        </div>

        {/* Top 3 Metric Highlight Banners */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}
        >
          <div className="bento-card" style={{ padding: '20px', borderLeft: '3px solid var(--accent-green)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              CUMULATIVE GRADE POINT
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
              9.6 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 10.0</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Top-tier performance across all completed semesters.
            </p>
          </div>

          <div className="bento-card" style={{ padding: '20px', borderLeft: '3px solid var(--accent-blue)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              DEPARTMENT STANDING
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
              #02 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ 287</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Top 0.7% in Computer Science & Engineering cohort.
            </p>
          </div>

          <div className="bento-card" style={{ padding: '20px', borderLeft: '3px solid var(--accent-purple)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              DEGREE & STATUS
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
              B.TECH CSE
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Class of 2027 • D.Y. Patil CET.
            </p>
          </div>
        </div>

        {/* Swiss Vertical Timeline */}
        <div style={{ marginBottom: '32px' }}>
          <h3 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.85rem', 
              color: 'var(--text-primary)', 
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            UNDERGRADUATE PROGRESSION (2023 → 2027)
          </h3>

          <div 
            style={{
              position: 'relative',
              borderLeft: '1px solid var(--border-color)',
              marginLeft: '12px',
              paddingLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {EDUCATION_TIMELINE.map((item: EducationTimelineNode) => (
              <div key={item.year} style={{ position: 'relative' }}>
                {/* Year Marker Pin */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '-29px',
                    top: '4px',
                    width: '9px',
                    height: '9px',
                    backgroundColor: item.accent || 'var(--accent-blue)',
                    border: '1px solid var(--border-color)'
                  }}
                />

                <div className="bento-card" style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                    <span className="swiss-badge swiss-badge-blue">
                      {item.year} // {item.status}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      {item.institution}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {item.milestone}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Coursework */}
        <div>
          <h3 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.85rem', 
              color: 'var(--text-primary)', 
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            VERIFIED CORE COURSEWORK
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {COURSEWORK_MODULES.map(course => (
              <span 
                key={course}
                className="swiss-badge"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
              >
                ✓ {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Education;
