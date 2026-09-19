import React, { useState } from 'react';
import { ACHIEVEMENTS, Achievement } from '../../data/achievements';

export const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Academic Excellence', 'Hackathon & Prototyping', 'National Scholarship', 'Leadership & Cohort Liaison'];

  const filteredAchievements = selectedCategory === 'ALL'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory || (selectedCategory === 'National Scholarship' && a.category.includes('National')));

  return (
    <section id="milestones" style={{ padding: '80px 0', position: 'relative' }}>
      <div id="achievements" style={{ position: 'absolute', top: 0 }} />
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>05 / MILESTONES</span>
            </div>
            <span>MODULE_05 // VERIFIED RECOGNITION</span>
          </div>
          <h2 className="swiss-title">
            ENGINEERING MILESTONES.
          </h2>
          <p className="swiss-subtitle">
            Academic rankings, competitive hackathon prizes, national scholarship honors, and cohort leadership.
          </p>
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

        {/* Bento Grid: 7 Verified Milestones */}
        <div className="bento-grid">
          {filteredAchievements.map((item: Achievement, idx) => {
            const isStandout = item.id === 'academic-standing' || item.id === 'eureka-hackathon';
            const colSpan = isStandout ? 'col-span-6' : 'col-span-4';

            return (
              <div
                key={item.id}
                className={`bento-card ${colSpan} ${isStandout ? 'bento-card-featured' : ''}`}
                style={{
                  borderTop: `2px solid ${item.accent || 'var(--border-color)'}`,
                  minHeight: '220px'
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
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.details.slice(0, 75)}...</span>
                  <span style={{ color: 'var(--accent-green)', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    ● VERIFIED
                  </span>
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
