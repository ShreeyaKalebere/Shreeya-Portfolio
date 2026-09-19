import React from 'react';
import { 
  Compass, 
  FolderGit2, 
  FileDown, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO, LINKS } from '../data/config';
import { sound } from '../utils/audio';
import PlayerProfile from './PlayerProfile';
import '../styles/hero.css';

export default function Hero({ onExploreWorld, onViewProjects, onToggleRecruiterView }) {
  const handleDownloadResume = () => {
    sound.playClick();
    window.open(LINKS.resume, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="hero-section" aria-label="Hero Introduction">
      <div className="container hero-grid">
        {/* Left: Professional Introduction */}
        <div className="hero-content">
          <div className="hero-system-status">
            <CheckCircle2 size={15} />
            <span>SHREEYA_OS v2.0 // SOFTWARE × AI CORE ONLINE</span>
          </div>

          <div className="hero-title-group">
            <h1 className="hero-name">{PERSONAL_INFO.name.toUpperCase()}</h1>
            <div className="hero-title-highlight">
              {PERSONAL_INFO.title}
            </div>
            <div className="hero-subdiscipline">
              {PERSONAL_INFO.subtitle} • {PERSONAL_INFO.institution}
            </div>
          </div>

          <div className="hero-focus-tags" aria-label="Core Specializations">
            {PERSONAL_INFO.focusAreas.map((tag, idx) => (
              <span key={idx} className="focus-pill">
                {tag}
              </span>
            ))}
          </div>

          <p className="hero-description">
            {PERSONAL_INFO.bioHero}
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                sound.playClick();
                onExploreWorld();
              }}
              data-cursor="pointer"
            >
              <Compass size={17} />
              <span>EXPLORE WORLD</span>
            </button>

            <button
              type="button"
              className="btn-cyan"
              onClick={() => {
                sound.playModeShift();
                if (onToggleRecruiterView) onToggleRecruiterView();
              }}
              data-cursor="pointer"
              title="Switch directly to Recruiter View"
            >
              <Briefcase size={17} />
              <span>RECRUITER VIEW</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                sound.playClick();
                onViewProjects();
              }}
              data-cursor="pointer"
            >
              <FolderGit2 size={17} />
              <span>VIEW PROJECTS</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleDownloadResume}
              data-cursor="pointer"
            >
              <FileDown size={17} />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Professional Social & Contact Row */}
          <div className="hero-social-row">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              onClick={() => sound.playClick()}
              aria-label="GitHub Profile (opens in new tab)"
            >
              <Github size={17} />
              <span>GITHUB</span>
            </a>

            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              onClick={() => sound.playClick()}
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <Linkedin size={17} />
              <span>LINKEDIN</span>
            </a>

            <a
              href={`mailto:${LINKS.hasRealEmail ? LINKS.emailPlaceholder : 'contact@shreeyakalebere.dev'}?subject=${encodeURIComponent(LINKS.mailtoSubject)}`}
              className="hero-social-link"
              onClick={() => sound.playClick()}
              aria-label="Send Email Inquiry"
            >
              <Mail size={17} />
              <span>EMAIL</span>
            </a>
          </div>
        </div>

        {/* Right: Authentic Photograph & HUD presentation */}
        <div className="hero-profile-col">
          <PlayerProfile />
        </div>
      </div>
    </section>
  );
}
