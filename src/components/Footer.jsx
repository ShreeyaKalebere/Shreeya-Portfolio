import React from 'react';
import { Github, Linkedin, FileText, Mail } from 'lucide-react';
import { PERSONAL_INFO, LINKS } from '../data/config';
import { sound } from '../utils/audio';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site Footer">
      <div className="container footer-inner">
        <div className="footer-top-row">
          <div className="footer-identity-col">
            <h2 className="footer-name">{PERSONAL_INFO.name.toUpperCase()}</h2>
            <div className="footer-role">{PERSONAL_INFO.title}</div>
            <div className="footer-disciplines">
              AI/ML • COMPUTER VISION • FULL-STACK • IoT • INTELLIGENT SYSTEMS
            </div>
          </div>

          <div className="footer-links-col">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
              onClick={() => sound.playClick()}
              aria-label="GitHub Profile"
            >
              <Github size={16} />
              <span>GITHUB</span>
            </a>

            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
              onClick={() => sound.playClick()}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
              <span>LINKEDIN</span>
            </a>

            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-nav-link"
              onClick={() => sound.playClick()}
              aria-label="Download Resume PDF"
            >
              <FileText size={16} />
              <span>RESUME</span>
            </a>

            <a
              href={`mailto:${LINKS.hasRealEmail ? LINKS.emailPlaceholder : 'contact@shreeyakalebere.dev'}?subject=${encodeURIComponent(LINKS.mailtoSubject)}`}
              className="footer-nav-link"
              onClick={() => sound.playClick()}
              aria-label="Email Inquiry"
            >
              <Mail size={16} />
              <span>EMAIL</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </div>

          <div className="footer-system-telemetry">
            <span className="footer-status-blip" />
            <span>SYSTEM STATUS: ONLINE // SHREEYA_OS v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
