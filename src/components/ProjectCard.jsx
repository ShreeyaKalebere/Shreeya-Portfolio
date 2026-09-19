import React from 'react';
import { ArrowUpRight, Box, Compass, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProjectCard({ project, onOpenModal }) {
  const isResearch = project.statusType === 'research';

  return (
    <div
      className="project-card cyber-corners"
      onClick={() => {
        sound.playClick();
        onOpenModal(project);
      }}
      data-cursor="project"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          sound.playClick();
          onOpenModal(project);
        }
      }}
      aria-label={`Open case study for ${project.title}`}
    >
      <div>
        <div className="project-card-top">
          <span className="project-codename">{project.codeName}</span>
          <span className="project-badge">{project.badge}</span>
        </div>

        <h3 className="project-card-title">{project.title}</h3>

        <div className="project-voxel-building">
          <Box size={14} />
          <span>STRUCTURE: {project.voxelBuilding}</span>
        </div>

        <p className="project-card-desc">{project.shortDescription}</p>
      </div>

      <div>
        <div className="project-card-techs">
          {project.technologies.slice(0, 5).map((tech, idx) => (
            <span key={idx} className="project-tech-pill">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="project-tech-pill" style={{ color: 'var(--cyber-cyan)' }}>
              +{project.technologies.length - 5} MORE
            </span>
          )}
        </div>

        <div className="project-card-footer">
          <div className="project-status-tag">
            <span className={`status-indicator-dot ${isResearch ? 'research' : ''}`} />
            <span>{project.status}</span>
          </div>

          <div className="project-open-cta">
            <span>CASE STUDY</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
