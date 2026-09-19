import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  FileText, 
  Github, 
  Linkedin, 
  Menu, 
  X,
  Briefcase,
  Compass
} from 'lucide-react';
import { PERSONAL_INFO, LINKS } from '../data/config';
import { sound } from '../utils/audio';
import '../styles/hud.css';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'engineering', label: 'ENGINEERING' },
  { id: 'ailab', label: 'AI LAB' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'quests', label: 'QUESTS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONTACT' }
];

export default function HUD({
  activeSection,
  onNavigate,
  isRecruiterView,
  onToggleRecruiterView,
  onToggleTerminal,
  dayCycle,
  onCycleDay,
  isMuted,
  onToggleMute
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    sound.playClick();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const getDayIcon = () => {
    if (dayCycle === 'day') return <Sun size={17} title="Day Lighting (Click to toggle Sunset/Night)" />;
    if (dayCycle === 'sunset') return <Sun size={17} style={{ color: '#f59e0b' }} title="Sunset Lighting" />;
    return <Moon size={17} title="Night Matrix Mode" />;
  };

  return (
    <>
      <header className={`hud-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container hud-inner">
          {/* Brand & System Status */}
          <div 
            className="hud-brand" 
            role="button" 
            tabIndex={0} 
            onClick={() => handleNavClick('hero')}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('hero')}
            style={{ cursor: 'pointer' }}
          >
            <div className="hud-brand-icon">§</div>
            <div>
              <span>{PERSONAL_INFO.systemName}</span>
            </div>
            <div className="hud-status-badge">
              <span className="hud-status-dot" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hud-nav" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`hud-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Quick Resume Link in Nav */}
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-nav-link"
              onClick={() => sound.playClick()}
              aria-label="Download Resume PDF"
            >
              RESUME
            </a>
          </nav>

          {/* Right Controls */}
          <div className="hud-controls">
            {/* Recruiter View Toggle */}
            <button
              type="button"
              className={`hud-btn-recruiter ${isRecruiterView ? 'active-mode' : ''}`}
              onClick={() => {
                sound.playModeShift();
                onToggleRecruiterView();
              }}
              title="Switch to Recruiter Dashboard (Shortcut: R)"
              aria-label="Toggle Recruiter View"
            >
              <Briefcase size={15} />
              <span>{isRecruiterView ? "WORLD VIEW" : "RECRUITER VIEW"}</span>
            </button>

            {/* Matrix Terminal CLI Trigger */}
            <button
              type="button"
              className="hud-icon-btn"
              onClick={() => {
                sound.playTerminalKey();
                onToggleTerminal();
              }}
              title="Open Matrix Terminal CLI (Shortcut: T)"
              aria-label="Open Terminal"
            >
              <TerminalIcon size={17} />
            </button>

            {/* Day / Sunset / Night Lighting Cycle */}
            <button
              type="button"
              className="hud-icon-btn"
              onClick={() => {
                sound.playClick();
                onCycleDay();
              }}
              title={`Current Lighting: ${dayCycle.toUpperCase()}. Click to cycle.`}
              aria-label="Toggle Day / Night Lighting"
            >
              {getDayIcon()}
            </button>

            {/* Sound Mute / Unmute */}
            <button
              type="button"
              className="hud-icon-btn"
              onClick={() => {
                onToggleMute();
              }}
              title={isMuted ? "Unmute Synthesizer Audio" : "Mute Audio"}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            {/* Quick GitHub */}
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-icon-btn"
              title="Shreeya's GitHub Profile"
              aria-label="GitHub Profile"
              onClick={() => sound.playClick()}
            >
              <Github size={17} />
            </a>

            {/* Quick LinkedIn */}
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-icon-btn"
              title="Shreeya's LinkedIn Profile"
              aria-label="LinkedIn Profile"
              onClick={() => sound.playClick()}
            >
              <Linkedin size={17} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="hud-icon-btn hud-mobile-toggle"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <button
            type="button"
            className="btn-cyan"
            style={{ width: '100%', padding: '12px', justifyContent: 'center', marginBottom: '8px' }}
            onClick={() => {
              sound.playModeShift();
              setMobileMenuOpen(false);
              onToggleRecruiterView();
            }}
          >
            <Briefcase size={18} />
            <span>{isRecruiterView ? "SWITCH TO WORLD VIEW" : "SWITCH TO RECRUITER VIEW"}</span>
          </button>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              <span>{item.label}</span>
              <Compass size={16} />
            </a>
          ))}

          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
          >
            <span>DOWNLOAD RESUME (PDF)</span>
            <FileText size={16} />
          </a>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
