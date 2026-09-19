import React from 'react';

const BENTO_PILLARS = [
  {
    id: 'curious',
    colSpan: 'col-span-7',
    tag: 'EXPLORATION',
    title: 'CURIOUS BY DEFAULT',
    accent: 'var(--accent-blue)',
    summary: 'Constantly dissecting complex systems from asymptotic complexity in C++ to tensor graph execution in PyTorch.',
    detail: 'I do not treat frameworks as black boxes. I examine how memory is structured, how inference latency is minimized, and how architectures scale under edge constraints.'
  },
  {
    id: 'systems',
    colSpan: 'col-span-5',
    tag: 'ARCHITECTURE',
    title: 'FROM UI TO DISTRIBUTED SYSTEMS',
    accent: 'var(--accent-purple)',
    summary: 'Bridging responsive React client flows with robust distributed backend endpoints and normalized databases.',
    detail: 'Experienced orchestrating complete product lifecycles: strongly-typed state trees, REST microservices, asynchronous task queues, and automated data pipelines.'
  },
  {
    id: 'rigor',
    colSpan: 'col-span-5',
    tag: 'FOUNDATIONS',
    title: 'RIGOROUS ALGORITHMIC FOUNDATIONS',
    accent: 'var(--accent-green)',
    summary: 'Ranked 2nd among 287 students with a 9.6 / 10 CGPA in Computer Science & Engineering.',
    detail: 'Deep grounding in Data Structures, Algorithms, Operating Systems, Database Management Systems, and Computer Networks applied directly to production builds.'
  },
  {
    id: 'leadership',
    colSpan: 'col-span-7',
    tag: 'IMPACT',
    title: 'COLLABORATIVE IMPACT & LEADERSHIP',
    accent: 'var(--text-primary)',
    summary: 'Elected Class Representative serving as the primary academic and administrative liaison for 60+ engineering students.',
    detail: 'Bridging peer feedback with department leadership, coordinating technical seminars, and actively participating in national hackathons and technical summits at IIT Bombay.'
  }
];

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>01 / ABOUT</span>
            </div>
            <span>MODULE_01 // CORE_PHILOSOPHY</span>
          </div>
          <h2 className="swiss-title">
            BUILDING WITH CURIOSITY.<br />
            SOLVING WITH CODE.
          </h2>
          <p className="swiss-subtitle">
            I’m interested in technology when it can turn an idea, complex mathematical principle, or real-world friction into something reliable and useful.
          </p>
        </div>

        {/* 12-Column Swiss Bento Grid */}
        <div className="bento-grid">
          {BENTO_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className={`bento-card ${pillar.colSpan}`}
              style={{
                minHeight: '220px',
                borderLeft: `3px solid ${pillar.accent}`
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="swiss-badge">
                    {pillar.tag}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                    REF // {pillar.id.toUpperCase()}
                  </span>
                </div>

                <h3 
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    marginBottom: '10px',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '14px' }}>
                  {pillar.summary}
                </p>
              </div>

              <div 
                style={{ 
                  borderTop: 'var(--border-width) solid var(--border-color)', 
                  paddingTop: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  lineHeight: 1.5
                }}
              >
                ▸ {pillar.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
