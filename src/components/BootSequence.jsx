import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/config';
import { sound } from '../utils/audio';
import MatrixRain from './MatrixRain';
import '../styles/boot.css';

const BOOT_LINES = [
  { text: "SHREEYA_OS v2.0", isHeader: true },
  { text: "INITIALIZING SYSTEM...", isHeader: false },
  { text: "LOADING USER PROFILE........", status: "OK" },
  { text: "LOADING SOFTWARE ENGINEERING CORE.....", status: "OK" },
  { text: "LOADING AI ENGINEERING CORE...........", status: "OK" },
  { text: "LOADING COMPUTER VISION MODULE.......", status: "OK" },
  { text: "LOADING PROJECT DATABASE.............", status: "OK" },
  { text: "LOADING QUEST DATABASE...............", status: "OK" },
  { text: "LOADING WORLD........................", status: "OK" },
  { text: "PLAYER DETECTED", isHeader: false },
  { text: "IDENTITY:", isHeader: false, playerIdentity: true },
  { text: "SYSTEM STATUS:", status: "ONLINE" }
];

export default function BootSequence({ onComplete, onSelectRecruiterView }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [rememberSkip, setRememberSkip] = useState(false);

  useEffect(() => {
    // Check if user has requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayedLines(BOOT_LINES);
      setIsFinished(true);
      return;
    }

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < BOOT_LINES.length) {
        setDisplayedLines(prev => [...prev, BOOT_LINES[lineIndex]]);
        sound.playTerminalKey();
        lineIndex++;
      } else {
        clearInterval(interval);
        setIsFinished(true);
        sound.playBlip(880, 0.1, "sine");
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const handleEnterWorld = () => {
    sound.playClick();
    if (rememberSkip) {
      localStorage.setItem('shreeya_os_skip_boot', 'true');
    }
    onComplete();
  };

  const handleRecruiterView = () => {
    sound.playModeShift();
    if (rememberSkip) {
      localStorage.setItem('shreeya_os_skip_boot', 'true');
    }
    onSelectRecruiterView();
  };

  const handleSkipIntro = () => {
    sound.playClick();
    if (rememberSkip) {
      localStorage.setItem('shreeya_os_skip_boot', 'true');
    }
    onComplete();
  };

  return (
    <div className="boot-container" role="dialog" aria-modal="true" aria-label="System Boot Sequence">
      <MatrixRain opacity={0.25} isNight={true} />

      <div className="boot-window cyber-corners">
        <div className="boot-topbar">
          <div className="boot-topbar-title">
            <span>[ SYSTEM KERNEL INITIALIZATION ]</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="btn-cyan"
              style={{ padding: '4px 10px', fontSize: '0.7rem' }}
              onClick={handleRecruiterView}
              title="Switch directly to Recruiter View"
            >
              [ RECRUITER VIEW ]
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '4px 10px', fontSize: '0.7rem' }}
              onClick={handleEnterWorld}
              title="Enter world immediately"
            >
              [ ENTER WORLD ]
            </button>
          </div>
        </div>

        <div className="boot-body">
          <div className="boot-terminal-lines">
            {displayedLines.map((line, idx) => (
              <div
                key={idx}
                className={`boot-line ${line.isHeader ? 'highlight' : ''}`}
              >
                <span className="boot-line-text">
                  {line.text}
                  {line.playerIdentity && (
                    <span className="boot-line player-name">
                      {" "}{PERSONAL_INFO.name.toUpperCase()}
                    </span>
                  )}
                </span>
                {line.status && (
                  <span className="boot-line-status">
                    {line.status}
                  </span>
                )}
              </div>
            ))}
            {!isFinished && <span className="boot-cursor" />}
          </div>

          {isFinished && (
            <div className="boot-complete-panel">
              <div className="boot-welcome-label">
                ENTER THE DIGITAL WORLD
              </div>

              <div className="boot-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleEnterWorld}
                  autoFocus
                >
                  <span>[ ENTER WORLD ]</span>
                </button>

                <button
                  type="button"
                  className="btn-cyan"
                  onClick={handleRecruiterView}
                >
                  <span>[ RECRUITER VIEW ]</span>
                </button>
              </div>

              <div className="boot-skip-control">
                <button
                  type="button"
                  className="boot-skip-btn"
                  onClick={handleSkipIntro}
                >
                  [ SKIP INTRO ]
                </button>

                <label className="boot-remember-label">
                  <input
                    type="checkbox"
                    checked={rememberSkip}
                    onChange={(e) => setRememberSkip(e.target.checked)}
                  />
                  <span>Don't show boot screen again</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
