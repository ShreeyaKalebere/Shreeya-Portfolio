import React from 'react';
import { ShieldCheck, Cpu, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/config';

export default function PlayerProfile() {
  return (
    <div className="player-profile-card cyber-corners">
      {/* Top HUD bar */}
      <div className="profile-hud-header">
        <div style={{ display: 'flex', alignContent: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="var(--matrix-green)" />
          <span>PLAYER PROFILE // OPERATIONAL</span>
        </div>
        <span>LVL. 2027</span>
      </div>

      {/* Dignified Authentic Photograph */}
      <div className="profile-photo-wrapper">
        <img
          src={PERSONAL_INFO.photoUrl}
          alt={`Professional portrait of ${PERSONAL_INFO.name}`}
          className="profile-photo"
          loading="eager"
        />
        <div className="photo-hologram-border" />
      </div>

      {/* System HUD Telemetry Information */}
      <div className="profile-stats-grid">
        <div className="profile-stat-box">
          <div className="stat-box-label">CLASS</div>
          <div className="stat-box-value">COMPUTER SCIENCE</div>
        </div>
        <div className="profile-stat-box">
          <div className="stat-box-label">SPECIALIZATION</div>
          <div className="stat-box-value">AI + SOFTWARE</div>
        </div>
        <div className="profile-stat-box">
          <div className="stat-box-label">CGPA / STANDING</div>
          <div className="stat-box-value">9.6 (RANK 2 / 287)</div>
        </div>
        <div className="profile-stat-box">
          <div className="stat-box-label">SYSTEM STATUS</div>
          <div className="stat-box-value" style={{ color: 'var(--matrix-green)' }}>
            ● ONLINE
          </div>
        </div>
      </div>

      <div className="profile-hud-footer">
        <span>SECURITY: VERIFIED IDENTITY</span>
        <span>DY PATIL CET</span>
      </div>
    </div>
  );
}
