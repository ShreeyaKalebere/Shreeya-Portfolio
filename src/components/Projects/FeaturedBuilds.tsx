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
  Layers,
  Activity,
  Sparkles,
  Volume2,
  VolumeX,
  Sliders,
  Terminal,
  FileText
} from 'lucide-react';
import DataflowPipeline from './DataflowPipeline';
import { 
  RoadCareSimulator, 
  SilentAlarmSimulator, 
  SonicFingerprintsSimulator, 
  ResumePilotSimulator, 
  FoodSafeSimulator 
} from './ProjectSimulators';
import { sound } from '../../utils/audio';

interface FeaturedBuildsProps {
  activeProjectId?: string | null;
}

const DATAFLOW_METAPHORS: Record<string, string[]> = {
  "roadcare-ai": ["ROAD VIDEO STREAM", "YOLO11 DETECTOR", "BYTETRACK PERSISTENCE", "LEAFLET TRIAGE HUD"],
  "silent-alarm": ["KEYSTROKE KINEMATICS", "ISOLATION FOREST", "LSTM AUTOENCODER", "ZERO-KNOWLEDGE NUDGE"],
  "sonic-fingerprints": ["ACOUSTIC AUDIO STREAM", "SPECTRAL EXTRACTION", "CHROMADB EMBEDDING", "PATTERN RECOGNITION"],
  "resumepilot-ai": ["MASTER RESUME AST", "AGENTIC MATCHER", "TRUTH VALIDATOR", "ATS EXPORT ENGINE"],
  "food-safe": ["PACKAGED FOOD DATA", "OCR NORMALIZER", "TOXICOLOGY MATRIX", "SAFETY HEALTH INDEX"]
};

const SIMULATORS: Record<string, React.FC> = {
  "roadcare-ai": RoadCareSimulator,
  "silent-alarm": SilentAlarmSimulator,
  "sonic-fingerprints": SonicFingerprintsSimulator,
  "resumepilot-ai": ResumePilotSimulator,
  "food-safe": FoodSafeSimulator
};

export default function FeaturedBuilds({ activeProjectId }: FeaturedBuildsProps = {}) {
  // Global view mode: 'simulators' (crazy dynamic testbeds) or 'dossier' (engineering specifications)
  const [globalMode, setGlobalMode] = useState<'simulators' | 'dossier'>('simulators');
  
  // Card-specific mode overrides: map of projectId -> 'sim' | 'dossier'
  const [cardModes, setCardModes] = useState<Record<string, 'sim' | 'dossier'>>({
    "roadcare-ai": "sim",
    "silent-alarm": "sim",
    "sonic-fingerprints": "sim",
    "resumepilot-ai": "sim",
    "food-safe": "sim"
  });

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Sync activeProjectId if passed from URL or parent
  useEffect(() => {
    if (activeProjectId) {
      setActiveFilter("ALL");
      setCardModes(prev => ({ ...prev, [activeProjectId]: 'sim' }));
      const el = document.getElementById(`proj-${activeProjectId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeProjectId]);

  const handleToggleCardMode = (id: string, mode: 'sim' | 'dossier') => {
    setCardModes(prev => ({ ...prev, [id]: mode }));
    sound.playClick();
  };

  const handleToggleGlobalAudio = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleSelectQuickTab = (id: string) => {
    setCardModes(prev => ({ ...prev, [id]: 'sim' }));
    sound.playRadarPing();
    const el = document.getElementById(`proj-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
            <span>MODULE_02 // APPLIED SYSTEMS & CRAZY DYNAMIC LAB</span>
          </div>
          <h2 className="swiss-title">
            THINGS I'VE BUILT.
          </h2>
          <p className="swiss-subtitle">
            Real software systems, computer vision models, autonomous agent pipelines, and full-stack applications.
          </p>
        </div>

        {/* Dynamic Interactive Lab Control Deck */}
        <div 
          style={{
            background: 'var(--bg-card)',
            border: 'var(--border-width) solid var(--border-color)',
            padding: '16px 20px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Quick Simulator Jump Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
              QUICK LAB JUMP:
            </span>
            {PROJECTS.slice(0, 5).map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectQuickTab(p.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  padding: '4px 10px',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${p.accent || 'var(--border-color)'}66`,
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.accent || 'var(--accent-blue)';
                  e.currentTarget.style.boxShadow = `0 0 10px ${p.accent || 'var(--accent-blue)'}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${p.accent || 'var(--border-color)'}66`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: p.accent || 'var(--accent-blue)' }} />
                <span>{p.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Global View Mode & Cyber Audio SFX Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Audio Deck Toggle */}
            <button
              type="button"
              onClick={handleToggleGlobalAudio}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                padding: '6px 12px',
                background: isAudioMuted ? 'transparent' : 'rgba(56, 189, 248, 0.15)',
                border: `1px solid ${isAudioMuted ? 'var(--border-color)' : '#38BDF8'}`,
                color: isAudioMuted ? 'var(--text-dim)' : '#38BDF8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Toggle Web Audio SFX"
            >
              {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isAudioMuted ? 'SFX: MUTED' : 'SFX: ACTIVE'}</span>
            </button>

            {/* Global View Mode Switcher */}
            <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '2px', border: '1px solid var(--border-color)' }}>
              <button
                type="button"
                onClick={() => {
                  setGlobalMode('simulators');
                  setCardModes({
                    "roadcare-ai": "sim",
                    "silent-alarm": "sim",
                    "sonic-fingerprints": "sim",
                    "resumepilot-ai": "sim",
                    "food-safe": "sim"
                  });
                  sound.playModeShift();
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  padding: '5px 12px',
                  background: globalMode === 'simulators' ? 'var(--text-primary)' : 'transparent',
                  color: globalMode === 'simulators' ? 'var(--bg-primary)' : 'var(--text-dim)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Activity size={12} />
                <span>⚡ CRAZY SIMULATORS</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setGlobalMode('dossier');
                  setCardModes({
                    "roadcare-ai": "dossier",
                    "silent-alarm": "dossier",
                    "sonic-fingerprints": "dossier",
                    "resumepilot-ai": "dossier",
                    "food-safe": "dossier"
                  });
                  sound.playClick();
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  padding: '5px 12px',
                  background: globalMode === 'dossier' ? 'var(--text-primary)' : 'transparent',
                  color: globalMode === 'dossier' ? 'var(--bg-primary)' : 'var(--text-dim)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <FileText size={12} />
                <span>📋 DOSSIERS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {filterOptions.map(f => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  setActiveFilter(f);
                  sound.playClick();
                }}
                className={`swiss-btn ${isActive ? 'swiss-btn-primary' : ''}`}
                style={{ fontSize: '0.72rem', padding: '6px 14px' }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Bento Grid of Projects with Live Simulators & Dossier Switcher */}
        <div className="bento-grid">
          {filteredProjects.map((project, idx) => {
            const currentMode = cardModes[project.id] || globalMode;
            const isFeaturedTier = idx < 4;
            const colSpan = currentMode === 'sim' ? 'col-span-12' : (isFeaturedTier ? 'col-span-6' : 'col-span-4');
            const dataflow = DATAFLOW_METAPHORS[project.id] || ["INPUT", "PROCESSING", "ANALYSIS", "OUTPUT"];
            const SimulatorComponent = SIMULATORS[project.id];

            return (
              <div
                key={project.id}
                id={`proj-${project.id}`}
                className={`bento-card ${colSpan} ${isFeaturedTier ? 'bento-card-featured' : ''}`}
                style={{
                  borderTop: `2px solid ${project.accent || 'var(--border-color)'}`,
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  ['--card-spotlight' as any]: `${project.accent || 'var(--accent-blue)'}1f`,
                  ['--card-border-glow' as any]: `${project.accent || 'var(--accent-blue)'}66`
                }}
              >
                <div>
                  {/* Top Metadata Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

                    {/* Card-Level View Mode Switcher */}
                    <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-elevated)', padding: '2px', border: '1px solid var(--border-color)' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleCardMode(project.id, 'sim')}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          padding: '3px 8px',
                          background: currentMode === 'sim' ? (project.accent || 'var(--accent-blue)') : 'transparent',
                          color: currentMode === 'sim' ? '#000' : 'var(--text-dim)',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Activity size={11} />
                        <span>⚡ LIVE SIMULATOR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleCardMode(project.id, 'dossier')}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          padding: '3px 8px',
                          background: currentMode === 'dossier' ? 'var(--text-primary)' : 'transparent',
                          color: currentMode === 'dossier' ? 'var(--bg-primary)' : 'var(--text-dim)',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Layers size={11} />
                        <span>📋 SPEC DOSSIER</span>
                      </button>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <h3 
                    style={{ 
                      fontSize: currentMode === 'sim' ? '1.65rem' : (isFeaturedTier ? '1.45rem' : '1.2rem'), 
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
                      color: project.accent || 'var(--accent-blue)', 
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {project.category}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {project.description}
                  </p>

                  {/* Interactive Animated Dataflow Pipeline with Live Signal Packets */}
                  <DataflowPipeline
                    projectId={project.id}
                    accent={project.accent || 'var(--accent-blue)'}
                    fallbackSteps={dataflow}
                  />

                  {/* ⚡ CRAZY DYNAMIC INTERACTIVE SIMULATOR (RENDERED DIRECTLY IN CARD) */}
                  {currentMode === 'sim' && SimulatorComponent && (
                    <div 
                      style={{ 
                        marginTop: '18px', 
                        marginBottom: '18px',
                        border: `1px solid ${project.accent || 'var(--accent-blue)'}44`,
                        boxShadow: `0 0 20px ${project.accent || 'var(--accent-blue)'}1a`,
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}
                    >
                      <SimulatorComponent />
                    </div>
                  )}

                  {/* 📋 TECHNICAL SPECIFICATION & CASE STUDY DOSSIER */}
                  {currentMode === 'dossier' && (
                    <div 
                      style={{
                        marginTop: '20px',
                        paddingTop: '20px',
                        borderTop: 'var(--border-width) solid var(--border-color)'
                      }}
                    >
                      <div 
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: project.accent || 'var(--accent-blue)',
                          letterSpacing: '0.08em',
                          marginBottom: '16px'
                        }}
                      >
                        TECHNICAL SPECIFICATION & VERIFIED OUTCOME
                      </div>

                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                          gap: '16px',
                          marginBottom: '16px'
                        }}
                      >
                        {/* Problem */}
                        {project.problem && (
                          <div style={{ padding: '14px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                              01 / THE PROBLEM
                            </span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                              {project.problem}
                            </p>
                          </div>
                        )}

                        {/* What Was Built */}
                        {project.built && (
                          <div style={{ padding: '14px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                              02 / WHAT WAS BUILT
                            </span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                              {project.built}
                            </p>
                          </div>
                        )}

                        {/* Technical Approach */}
                        {project.approach && (
                          <div style={{ padding: '14px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                              03 / TECHNICAL APPROACH
                            </span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                              {project.approach}
                            </p>
                          </div>
                        )}

                        {/* Engineering Challenge */}
                        {project.challenge && (
                          <div style={{ padding: '14px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                              04 / ENGINEERING CHALLENGE
                            </span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                              {project.challenge}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Verified Outcome */}
                      {project.outcome && (
                        <div style={{ padding: '14px', background: 'var(--bg-surface)', border: 'var(--border-width) solid var(--border-color)', marginBottom: '16px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-green)', display: 'block', marginBottom: '6px' }}>
                            05 / VERIFIED OUTCOME
                          </span>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                            {project.outcome}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
                    {project.technologies.slice(0, 5).map(tech => (
                      <span 
                        key={tech}
                        className="swiss-badge"
                        style={{ fontSize: '0.68rem', backgroundColor: 'var(--bg-elevated)' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Code & Live Demonstration Links */}
                <div 
                  style={{ 
                    borderTop: 'var(--border-width) solid var(--border-color)', 
                    paddingTop: '16px',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleCardMode(project.id, currentMode === 'sim' ? 'dossier' : 'sim')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{currentMode === 'sim' ? 'VIEW ARCHITECTURE DOSSIER' : 'LAUNCH LIVE SIMULATOR'}</span>
                    <ArrowRight size={13} />
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
