import React from 'react';
import { EXPLORATIONS, ScrapbookItem } from '../../data/explorations';

export const BeyondTheCode: React.FC = () => {
  return (
    <section id="field-notes" style={{ padding: '80px 0', position: 'relative' }}>
      <div id="explore" style={{ position: 'absolute', top: 0 }} />
      <div id="explorations" style={{ position: 'absolute', top: 0 }} />
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>06 / FIELD NOTES</span>
            </div>
            <span>MODULE_06 // TECHNICAL EXPEDITIONS & FIELDWORK</span>
          </div>
          <h2 className="swiss-title">
            EXPEDITIONS & FIELD NOTES.
          </h2>
          <p className="swiss-subtitle">
            Software does not exist in isolation. Engaging directly with founders, industrial plants, open-source communities, and clinical environments.
          </p>
        </div>

        {/* Bento Grid: 6 Field Notes */}
        <div className="bento-grid">
          {EXPLORATIONS.map((item: ScrapbookItem, idx) => {
            const isWide = idx === 0 || idx === 3;
            const colSpan = isWide ? 'col-span-6' : 'col-span-6';

            return (
              <div
                key={item.id}
                className={`bento-card ${colSpan}`}
                style={{
                  minHeight: '260px',
                  borderLeft: '3px solid var(--border-color-accent)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="swiss-badge swiss-badge-blue">
                        {item.location}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {item.year}
                      </span>
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      LOG 0{idx + 1}
                    </span>
                  </div>

                  <h3 
                    style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {item.title}
                  </h3>

                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.72rem', 
                      color: 'var(--accent-purple)', 
                      marginBottom: '12px' 
                    }}
                  >
                    DOMAIN: {item.category}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {item.summary}
                  </p>

                  {/* Engineering Takeaway Box */}
                  <div 
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-surface)',
                      border: 'var(--border-width) solid var(--border-color)',
                      marginBottom: '14px'
                    }}
                  >
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.68rem', 
                        fontWeight: 700, 
                        color: 'var(--accent-blue)', 
                        display: 'block', 
                        marginBottom: '4px' 
                      }}
                    >
                      KEY ENGINEERING TAKEAWAY:
                    </span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {item.takeaway}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.tags.map(tag => (
                    <span 
                      key={tag}
                      className="swiss-badge"
                      style={{ fontSize: '0.65rem' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default BeyondTheCode;
