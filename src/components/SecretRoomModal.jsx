import React, { useEffect } from 'react';
import { X, Sparkles, Volume2, Github, Terminal, Compass } from 'lucide-react';
import { sound } from '../utils/audio';
import { PERSONAL_INFO, LINKS } from '../data/config';
import confetti from 'canvas-confetti';

export default function SecretRoomModal({ onClose }) {
  useEffect(() => {
    // Fire celebratory purple/emerald confetti on discovering the secret room!
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#00ff66', '#00f0ff']
      });
    } catch (e) {
      // safe fallback
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
      aria-labelledby="secret-room-heading"
    >
      <div className="secret-room-dialog cyber-corners">
        <div className="secret-room-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} color="#c084fc" />
            <h2 id="secret-room-heading" className="secret-room-title">
              THE DEVELOPER'S ROOM // EASTER EGG CHAMBER
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close Secret Room"
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#e9d5ff', lineHeight: 1.6, marginBottom: '16px' }}>
          Welcome to the subterranean obsidian sanctuary of <strong>{PERSONAL_INFO.name}</strong>! You've unlocked the hidden chamber by discovering the dimensional portal or issuing the secret command.
        </p>

        {/* System Telemetry Specs */}
        <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '6px', padding: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginBottom: '20px' }}>
          <div style={{ color: '#c084fc', marginBottom: '8px', fontWeight: 'bold' }}>SYSTEM TELEMETRY:</div>
          <div>• ENGINE: React 19 + Three.js + Web Audio API (Pure Oscillator Synthesizer)</div>
          <div>• ARCHITECTURE: Dual-Layer (SDE/AI Recruiter View + 3D Cyber-Voxel World)</div>
          <div>• SHREEYA CGPA: 9.6 / 10 (Department Rank 2nd / 287 students)</div>
          <div>• STATUS: 0 Fabricated Metrics • 100% Verified Credentials</div>
        </div>

        {/* Mini Audio Soundboard */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#c084fc', marginBottom: '8px' }}>
          INTERACTIVE 8-BIT AUDIO SYNTHESIZER SOUNDBOARD:
        </div>
        <div className="secret-soundboard-grid">
          <button type="button" className="soundboard-btn" onClick={() => sound.playClick()}>
            <Volume2 size={14} />
            <span>UI Click</span>
          </button>
          <button type="button" className="soundboard-btn" onClick={() => sound.playTerminalKey()}>
            <Terminal size={14} />
            <span>Matrix Key</span>
          </button>
          <button type="button" className="soundboard-btn" onClick={() => sound.playInventoryPop()}>
            <Sparkles size={14} />
            <span>Voxel Slot</span>
          </button>
          <button type="button" className="soundboard-btn" onClick={() => sound.playPortalHum()}>
            <Compass size={14} />
            <span>Nether Hum</span>
          </button>
          <button type="button" className="soundboard-btn" onClick={() => sound.playQuestChime()}>
            <Sparkles size={14} />
            <span>Quest Chime</span>
          </button>
          <button type="button" className="soundboard-btn" onClick={() => sound.playModeShift()}>
            <Sparkles size={14} />
            <span>Mode Shift</span>
          </button>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan"
            style={{ borderColor: '#a855f7', color: '#e9d5ff' }}
            onClick={() => sound.playClick()}
          >
            <Github size={16} />
            <span>EXPLORE GITHUB</span>
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
          >
            <span>RETURN TO WORLD</span>
          </button>
        </div>
      </div>
    </div>
  );
}
