import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { sound } from '../utils/audio';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import '../styles/projects.css';

const FILTER_OPTIONS = [
  { id: 'all', label: 'ALL BUILDS' },
  { id: 'SDE', label: 'SOFTWARE & FULL-STACK' },
  { id: 'AI', label: 'AI & COMPUTER VISION' }
];

export default function ProjectMine({ activeProjectModal, onOpenModal, onCloseModal }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.profileTags.includes(filter));

  const handleFilterChange = (id) => {
    sound.playClick();
    setFilter(id);
  };

  return (
    <section id="projects" className="projects-section" aria-label="Featured Projects District">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>DISTRICT // PROJECT MINE</span>
          </div>
          <h2 className="section-title">FEATURED ENGINEERING BUILDS</h2>
          <p className="section-subtitle">
            Futuristic voxel structures representing full-stack architectures, autonomous agent workflows, and computer vision anomaly detection research.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="projects-filter-bar" role="tablist" aria-label="Project Categories">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={filter === opt.id}
              className={`projects-filter-btn ${filter === opt.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(opt.id)}
              data-cursor="pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" role="list">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

        {/* Case Study Deep-Dive Modal */}
        {activeProjectModal && (
          <ProjectModal
            project={activeProjectModal}
            onClose={onCloseModal}
          />
        )}
      </div>
    </section>
  );
}
