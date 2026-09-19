import React from 'react';
import { BookOpen, GraduationCap, Award, BookCheck } from 'lucide-react';
import { EDUCATION_DATA } from '../data/education';
import '../styles/quest_education.css';

export default function KnowledgeArchive() {
  return (
    <section id="education" className="education-section" aria-label="Knowledge Archive & Academics">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>ARCHIVE // KNOWLEDGE REPOSITORY</span>
          </div>
          <h2 className="section-title">ACADEMIC FOUNDATIONS & COURSEWORK</h2>
          <p className="section-subtitle">
            Enchanted technical tome archiving rigorous computer science degree metrics, top-tier institutional standing, and specialized technical curricula.
          </p>
        </div>

        {/* The Enchanted Technical Tome */}
        <div className="enchanted-tome-wrapper cyber-corners">
          {/* Top Academic Degree Banner */}
          <div className="tome-academic-banner">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--matrix-green)', marginBottom: '8px' }}>
                <GraduationCap size={20} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>
                  UNDERGRADUATE DEGREE // IN PROGRESS
                </span>
              </div>

              <h3 className="academic-degree-title">{EDUCATION_DATA.degree}</h3>
              <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Major: {EDUCATION_DATA.major}
              </div>
              <div className="academic-institution">
                {EDUCATION_DATA.institution} • {EDUCATION_DATA.location}
              </div>

              <div className="academic-rank-pill">
                <Award size={16} />
                <span>ACADEMIC STANDING: {EDUCATION_DATA.academicStanding}</span>
              </div>
            </div>

            {/* Academic Highlight Metrics */}
            <div className="academic-stat-cards">
              <div className="academic-stat-box">
                <div className="academic-stat-val">{EDUCATION_DATA.cgpa}</div>
                <div className="academic-stat-lbl">Cumulative CGPA</div>
              </div>
              <div className="academic-stat-box">
                <div className="academic-stat-val">2nd / 287</div>
                <div className="academic-stat-lbl">Department Rank</div>
              </div>
              <div className="academic-stat-box">
                <div className="academic-stat-val">{EDUCATION_DATA.graduationYear}</div>
                <div className="academic-stat-lbl">Class Of</div>
              </div>
              <div className="academic-stat-box">
                <div className="academic-stat-val" style={{ color: 'var(--cyber-cyan)' }}>10+</div>
                <div className="academic-stat-lbl">Core CS Subjects</div>
              </div>
            </div>
          </div>

          {/* Core Technical Coursework Grid */}
          <div>
            <div className="coursework-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#ffffff' }}>
                <BookCheck size={18} color="var(--matrix-green)" />
                <span>COMPUTING CURRICULUM & SPECIALIZED MODULES</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                10 VERIFIED MODULES
              </span>
            </div>

            <div className="coursework-grid" role="list">
              {EDUCATION_DATA.coursework.map((course, idx) => (
                <div key={idx} className="course-card" role="listitem">
                  <div className="course-card-top">
                    <span className="course-code">{course.code}</span>
                    <span className="course-mastery">{course.mastery}</span>
                  </div>
                  <h4 className="course-name">{course.name}</h4>
                  <p className="course-focus">{course.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
