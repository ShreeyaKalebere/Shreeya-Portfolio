import React, { useEffect } from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  ShieldAlert,
  Cpu
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="modal-dialog cyber-corners">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-subtitle">
              <span>{project.codeName}</span>
              <span>//</span>
              <span>{project.category}</span>
            </div>
            <h2 id="modal-project-title" className="modal-title">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close Case Study (Escape)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-content">
          {/* Animated Architecture Pipeline Visualization */}
          {project.architectureNodes && (
            <div className="modal-architecture-box" aria-label="System Architecture Pipeline">
              <div className="arch-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} color="var(--matrix-green)" />
                  <span>ARCHITECTURE DATA-FLOW PIPELINE</span>
                </div>
                <span style={{ color: 'var(--cyber-cyan)' }}>ANIMATED DATA TRANSMISSION</span>
              </div>

              <div className="arch-pipeline-track" role="list">
                {project.architectureNodes.map((node, idx) => (
                  <React.Fragment key={node.id}>
                    <div className={`arch-node ${node.type === 'ai' ? 'ai-node' : ''}`} role="listitem">
                      <div className="arch-node-type">{node.type}</div>
                      <div className="arch-node-label">{node.label}</div>
                    </div>
                    {idx < project.architectureNodes.length - 1 && (
                      <ArrowRight className="arch-arrow" size={16} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Problem & Approach Grid */}
          <div className="modal-grid-two">
            <div className="modal-section-box">
              <div className="modal-section-title">
                <AlertCircle size={16} color="var(--warning-amber)" />
                <span>THE ENGINEERING PROBLEM</span>
              </div>
              <p className="modal-section-p">{project.problem}</p>
            </div>

            <div className="modal-section-box">
              <div className="modal-section-title">
                <Cpu size={16} color="var(--matrix-green)" />
                <span>TECHNICAL APPROACH</span>
              </div>
              <p className="modal-section-p">{project.approach}</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="modal-section-box">
            <div className="modal-section-title">
              <CheckCircle2 size={16} color="var(--cyber-cyan)" />
              <span>KEY CAPABILITIES & IMPLEMENTATION CONCEPTS</span>
            </div>
            <ul className="modal-feature-list">
              {project.keyFeatures.map((feat, i) => (
                <li key={i} className="modal-feature-item">
                  <span style={{ color: 'var(--matrix-green)', marginTop: '2px' }}>▸</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Challenges */}
          {project.engineeringChallenges && (
            <div className="modal-section-box">
              <div className="modal-section-title">
                <Flame size={16} color="var(--danger-crimson)" />
                <span>ENGINEERING CHALLENGES & RESOLUTION</span>
              </div>
              <p className="modal-section-p">{project.engineeringChallenges}</p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="modal-section-box">
            <div className="modal-section-title">
              <Layers size={16} color="var(--matrix-green)" />
              <span>VERIFIED TECH STACK</span>
            </div>
            <div className="project-card-techs" style={{ marginBottom: 0 }}>
              {project.technologies.map((t, idx) => (
                <span key={idx} className="project-tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Links */}
        <div className="modal-footer">
          <div className="modal-footer-status">
            <span>STATUS: </span>
            <strong style={{ color: project.statusType === 'research' ? 'var(--warning-amber)' : 'var(--matrix-green)' }}>
              {project.status.toUpperCase()}
            </strong>
          </div>

          <div className="modal-footer-actions">
            {/* Real GitHub Link */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => sound.playClick()}
                aria-label="View Source on GitHub"
              >
                <Github size={16} />
                <span>GITHUB REPO</span>
              </a>
            )}

            {/* Real Demo Link (only if exists; never invent fake links) */}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => sound.playClick()}
                aria-label="Launch Live Demonstration"
              >
                <ExternalLink size={16} />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
