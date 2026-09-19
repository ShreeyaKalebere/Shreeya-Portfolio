import React from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Users, 
  Satellite, 
  BookOpen, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';
import '../styles/quest_education.css';

const ICON_MAP = {
  Trophy,
  Award,
  Sparkles,
  Users,
  Satellite,
  BookOpen
};

export default function QuestLog() {
  return (
    <section id="quests" className="quest-section" aria-label="Quest Log & Verified Achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>MILESTONES // QUEST LOG</span>
          </div>
          <h2 className="section-title">VERIFIED HONORS & ACHIEVEMENTS</h2>
          <p className="section-subtitle">
            Gamified quest log cataloging hackathon prizes, national examination qualifications, student leadership, and scientific research.
          </p>
        </div>

        {/* Quest Cards Grid */}
        <div className="quest-log-grid" role="list">
          {ACHIEVEMENTS.map((quest) => {
            const Icon = ICON_MAP[quest.voxelIcon] || Trophy;
            const isInProgress = quest.status.includes('PROGRESS');

            return (
              <div key={quest.id} className="quest-card cyber-corners" role="listitem">
                <div>
                  <div className="quest-card-top">
                    <div className="quest-icon-badge">
                      <Icon size={20} />
                    </div>
                    <span className="quest-xp-tag">{quest.xp}</span>
                  </div>

                  <h3 className="quest-title">{quest.title}</h3>
                  <div className="quest-honor-badge">{quest.badge}</div>

                  <p className="quest-desc">{quest.shortDescription}</p>
                </div>

                <div className="quest-card-footer">
                  <span style={{ color: 'var(--text-muted)' }}>CATEGORY: {quest.category}</span>
                  <div className="quest-status-text">
                    {isInProgress ? (
                      <Clock size={14} color="var(--warning-amber)" />
                    ) : (
                      <CheckCircle2 size={14} color="var(--matrix-green)" />
                    )}
                    <span style={{ color: isInProgress ? 'var(--warning-amber)' : 'var(--matrix-green)' }}>
                      {quest.status}
                    </span>
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
