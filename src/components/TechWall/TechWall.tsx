import React, { useState } from 'react';
import { TECHNOLOGIES, Technology } from '../../data/technologies';

interface TechWallProps {
  onSelectProject?: (projectName: string) => void;
}

interface StackCategory {
  id: string;
  name: string;
  tag: string;
  skills: { name: string; usedIn: string[] }[];
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    id: "languages",
    name: "LANGUAGES",
    tag: "CORE PARADIGMS",
    skills: [
      { name: "Python", usedIn: ["RoadCare AI", "Silent Alarm", "Sonic Fingerprints", "ResumePilot AI"] },
      { name: "Java", usedIn: ["Object-Oriented Programming", "Enterprise Systems", "Core Computing Curricula"] },
      { name: "C++", usedIn: ["Data Structures & Algorithms", "High-Performance Systems", "Algorithmic Problem Solving"] },
      { name: "JavaScript (ES6+)", usedIn: ["Silent Alarm", "Sonic Fingerprints", "Food Safe", "Portfolio Web App"] },
      { name: "TypeScript", usedIn: ["ResumePilot AI", "Portfolio Web App", "Strongly Typed Client Flows"] },
      { name: "SQL", usedIn: ["Database Management Systems", "Relational Schemas", "ACID Transactions"] }
    ]
  },
  {
    id: "fullstack",
    name: "FULL STACK & WEB",
    tag: "REACT 19 & MERN ARCHITECTURE",
    skills: [
      { name: "React 19", usedIn: ["Silent Alarm", "ResumePilot AI", "Sonic Fingerprints", "Food Safe"] },
      { name: "Node.js & Express", usedIn: ["Silent Alarm", "ResumePilot AI", "Sonic Fingerprints", "Food Safe"] },
      { name: "MongoDB", usedIn: ["Silent Alarm", "RoadCare AI", "Food Safe", "BSON Aggregations"] },
      { name: "RESTful APIs", usedIn: ["Silent Alarm", "ResumePilot AI", "RoadCare AI", "Food Safe"] },
      { name: "Socket.io", usedIn: ["Silent Alarm", "Real-Time Telemetry Streaming"] },
      { name: "Tailwind CSS", usedIn: ["Silent Alarm", "ResumePilot AI", "Responsive Layouts"] }
    ]
  },
  {
    id: "ai-vision",
    name: "AI / ML & COMPUTER VISION",
    tag: "INFERENCE & ACOUSTIC TENSORS",
    skills: [
      { name: "Ultralytics YOLO11", usedIn: ["RoadCare AI", "Edge Vision Object Localization"] },
      { name: "PyTorch", usedIn: ["Silent Alarm", "RoadCare AI", "Sonic Fingerprints", "LSTM Autoencoders"] },
      { name: "OpenCV", usedIn: ["RoadCare AI", "Spatial Filtering", "CLAHE Enhancement"] },
      { name: "Scikit-Learn", usedIn: ["Silent Alarm", "Isolation Forest Anomaly Detection"] },
      { name: "ChromaDB Vector DB", usedIn: ["Sonic Fingerprints", "ResumePilot AI", "Vector Embeddings"] },
      { name: "ByteTrack & Librosa", usedIn: ["RoadCare AI", "Sonic Fingerprints", "Acoustic Signal Processing"] }
    ]
  },
  {
    id: "systems-tools",
    name: "DEVOPS, TOOLS & STORAGE",
    tag: "CONTAINERS & CLOUD MICROSERVICES",
    skills: [
      { name: "FastAPI", usedIn: ["RoadCare AI", "Silent Alarm", "Sonic Fingerprints", "ResumePilot AI"] },
      { name: "Docker", usedIn: ["Sonic Fingerprints", "Containerization", "Reproducible Environments"] },
      { name: "Git & GitHub", usedIn: ["Version Control", "Open Source", "Team Collaboration"] },
      { name: "Postman & Vercel", usedIn: ["API Testing", "Serverless Deployment", "Edge Functions"] },
      { name: "Linux / CLI", usedIn: ["CLI Workstation", "Server Deployment", "Process Automation"] }
    ]
  }
];

export const TechWall: React.FC<TechWallProps> = ({ onSelectProject }) => {
  const [activeSkill, setActiveSkill] = useState<{ name: string; usedIn: string[] }>(STACK_CATEGORIES[0].skills[0]);

  return (
    <section id="stack" style={{ padding: '80px 0', position: 'relative' }}>
      <div id="skills" style={{ position: 'absolute', top: 0 }} />
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>03 / STACK</span>
            </div>
            <span>MODULE_03 // ENGINEERING TOOLBELT</span>
          </div>
          <h2 className="swiss-title">
            ENGINEERING STACK.
          </h2>
          <p className="swiss-subtitle">
            Verified toolbelt tested across production systems, computer vision models, and distributed services. Hover or select any technology to inspect exact project implementations.
          </p>
        </div>

        {/* Live Inspector Callout Banner */}
        <div 
          className="bento-card"
          style={{
            marginBottom: '24px',
            backgroundColor: 'var(--bg-surface)',
            borderLeft: '3px solid var(--accent-blue)',
            padding: '16px 20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                INSPECTOR ACTIVE:
              </span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {activeSkill.name}
              </strong>
            </div>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-blue)' }}>
              {activeSkill.usedIn.length} Direct Implementation{activeSkill.usedIn.length > 1 ? 's' : ''}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              USED IN →
            </span>
            {activeSkill.usedIn.map((proj, pIdx) => (
              <a
                key={pIdx}
                href="#work"
                onClick={() => onSelectProject?.(proj)}
                className="swiss-badge swiss-badge-blue"
                style={{ fontSize: '0.72rem' }}
              >
                {proj} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Bento Grid: 4 Core Categories */}
        <div className="bento-grid">
          {STACK_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="bento-card col-span-6"
              style={{ minHeight: '260px' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span className="swiss-badge">
                    {category.tag}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    CATEGORY // {category.name}
                  </span>
                </div>

                <h3 
                  style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {category.name}
                </h3>

                {/* Skill Chips Grid */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {category.skills.map((skill) => {
                    const isSelected = activeSkill.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setActiveSkill(skill)}
                        onMouseEnter={() => setActiveSkill(skill)}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '8px 12px',
                          border: 'var(--border-width) solid var(--border-color)',
                          backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--bg-surface)',
                          color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
                          transition: 'all 0.12s ease',
                          cursor: 'pointer'
                        }}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div 
                style={{ 
                  borderTop: 'var(--border-width) solid var(--border-color)', 
                  paddingTop: '12px',
                  marginTop: '18px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>{category.skills.length} TECHNOLOGIES VERIFIED</span>
                <span style={{ color: 'var(--accent-green)' }}>● VERIFIED IN CODEBASE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TechWall;
