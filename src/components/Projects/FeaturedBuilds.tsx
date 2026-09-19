import React, { useState, useEffect } from 'react';
import { PROJECTS, Project } from '../../data/projects';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';

interface FeaturedBuildsProps {
  activeProjectId?: string | null;
}

const DATAFLOW_METAPHORS: Record<string, string[]> = {
  "food-safe": ["PACKAGED FOOD DATA", "OCR PARSER", "HAZARD ANALYSIS", "SAFETY INDEX"],
  "orchestrix": ["TASK INPUT", "REASONING AGENT", "DYNAMIC TOOLS", "VERIFIED OUTPUT"],
  "road-damage": ["VEHICLE CAMERA FEED", "YOLOv8 DETECTOR", "DEFECT SEGMENTATION", "ROAD TELEMETRY"],
  "space-chatbot": ["CELESTIAL QUERY", "NLP INTENT ENGINE", "ORBITAL TELEMETRY", "MISSION INTEL"],
  "ai-clone": ["TRANSCRIPT QUERY", "VECTOR RETRIEVAL", "GROUNDED PERSONA", "AUDIO SYNTH"],
  "3d-printing-startup": ["CAD STL UPLOAD", "MESH TOPOLOGY", "SLICING ESTIMATE", "PROTOTYPE FAB"]
};

export default function FeaturedBuilds({ activeProjectId }: FeaturedBuildsProps = {}) {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("food-safe");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  useEffect(() => {
    if (activeProjectId) {
      setExpandedProjectId(activeProjectId);
      setActiveFilter("ALL");
      const el = document.getElementById(`proj-${activeProjectId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeProjectId]);

  const handleToggleExpand = (id: string) => {
    setExpandedProjectId(prev => (prev === id ? null : id));
  };

  const filteredProjects = activeFilter === "ALL" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.status === activeFilter.toLowerCase());

  const filterOptions = ["ALL", "BUILT", "RESEARCH", "PROTOTYPE", "CONCEPT"];

  return (
    <section id="work" style={{ padding: '80px 0', position: 'relative' }}>
      <div id="builds" style={{ position: 'absolute', top: 0 }} />
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>02 / WORK</span>
            </div>
            <span>MODULE_02 // APPLIED SYSTEMS & RESEARCH</span>
          </div>
          <h2 className="swiss-title">
            THINGS I'VE BUILT.
          </h2>
          <p className="swiss-subtitle">
            Real software systems, computer vision models, autonomous agent pipelines, and full-stack applications.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {filterOptions.map(f => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`swiss-btn ${isActive ? 'swiss-btn-primary' : ''}`}
                style={{ fontSize: '0.72rem', padding: '6px 14px' }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Bento Grid of Projects */}
        <div className="bento-grid">
          {filteredProjects.map((project, idx) => {
            const isExpanded = expandedProjectId === project.id;
            const isFeaturedTier = idx < 4; // Top 4 projects get larger bento cards
            const colSpan = isExpanded ? 'col-span-12' : (isFeaturedTier ? 'col-span-6' : 'col-span-4');
            const dataflow = DATAFLOW_METAPHORS[project.id] || ["INPUT", "PROCESSING", "ANALYSIS", "OUTPUT"];

            return (
              <div
                key={project.id}
                id={`proj-${project.id}`}
                className={`bento-card ${colSpan} ${isFeaturedTier ? 'bento-card-featured' : ''}`}
                style={{
                  borderTop: `2px solid ${project.accent || 'var(--border-color)'}`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  {/* Top Metadata Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      PROJECT // 0{idx + 1}
                    </span>
                    <span 
                      className={`swiss-badge ${
                        project.status === 'built' ? 'swiss-badge-green' : 
                        project.status === 'research' ? 'swiss-badge-purple' : 'swiss-badge-blue'
                      }`}
                    >
                      {project.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 
                    style={{ 
                      fontSize: isFeaturedTier ? '1.45rem' : '1.2rem', 
                      fontWeight: 700, 
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {project.title}
                  </h3>

                  <div 
                    style={{ 
                      fontFamily: 'var(--font-mono)', 
                      fontSize: '0.72rem', 
                      color: 'var(--accent-blue)', 
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {project.category}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {project.description}
                  </p>

                  {/* Abstract Engineering Dataflow Diagram */}
                  <div className="dataflow-strip">
                    {dataflow.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span className="dataflow-node">{step}</span>
                        {sIdx < dataflow.length - 1 && <span className="dataflow-arrow">→</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
                    {project.technologies.slice(0, 4).map(tech => (
                      <span 
                        key={tech}
                        className="swiss-badge"
                        style={{ fontSize: '0.68rem', backgroundColor: 'var(--bg-elevated)' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action: Inline Expansion Trigger */}
                <div 
                  style={{ 
                    borderTop: 'var(--border-width) solid var(--border-color)', 
                    paddingTop: '16px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleExpand(project.id)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{isExpanded ? 'COLLAPSE DOSSIER' : 'VIEW CASE STUDY'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ArrowRight size={14} />}
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="swiss-badge"
                        title="View Source Code"
                        style={{ padding: '4px 8px' }}
                      >
                        CODE ↗
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="swiss-badge swiss-badge-blue"
                        title="Open Live Demonstration"
                        style={{ padding: '4px 8px' }}
                      >
                        LIVE ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* INLINE CASE STUDY ACCORDION EXPANSION (NO POPUP MODALS) */}
                {isExpanded && (
                  <div 
                    style={{
                      marginTop: '24px',
                      paddingTop: '24px',
                      borderTop: 'var(--border-width-thick) solid var(--border-color)'
                    }}
                  >
                    <div 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--accent-blue)',
                        letterSpacing: '0.08em',
                        marginBottom: '16px'
                      }}
                    >
                      TECHNICAL SPECIFICATION & CASE STUDY
                    </div>

                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                        marginBottom: '20px'
                      }}
                    >
                      {/* Problem */}
                      {project.problem && (
                        <div style={{ padding: '16px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                            01 / THE PROBLEM
                          </span>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            {project.problem}
                          </p>
                        </div>
                      )}

                      {/* What Was Built */}
                      {project.built && (
                        <div style={{ padding: '16px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                            02 / WHAT WAS BUILT
                          </span>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            {project.built}
                          </p>
                        </div>
                      )}

                      {/* Technical Approach */}
                      {project.approach && (
                        <div style={{ padding: '16px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                            03 / TECHNICAL APPROACH
                          </span>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            {project.approach}
                          </p>
                        </div>
                      )}

                      {/* Engineering Challenge */}
                      {project.challenge && (
                        <div style={{ padding: '16px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                            04 / ENGINEERING CHALLENGE
                          </span>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            {project.challenge}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Outcome & All Tech Stack */}
                    {project.outcome && (
                      <div style={{ padding: '16px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)', marginBottom: '16px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)', display: 'block', marginBottom: '6px' }}>
                          05 / VERIFIED OUTCOME
                        </span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                          {project.outcome}
                        </p>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {project.technologies.map(t => (
                          <span key={t} className="swiss-badge swiss-badge-blue" style={{ fontSize: '0.68rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleExpand(project.id)}
                        className="swiss-btn"
                        style={{ fontSize: '0.72rem', padding: '6px 12px' }}
                      >
                        CLOSE CASE STUDY ▲
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
