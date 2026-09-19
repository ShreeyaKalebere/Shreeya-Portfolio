import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { PROFILE } from '../../data/profile';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isRecruiterView: boolean;
  onToggleRecruiterView: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'stack', label: 'STACK' },
  { id: 'lab', label: 'LAB' },
  { id: 'milestones', label: 'MILESTONES' },
  { id: 'field-notes', label: 'FIELD NOTES' },
  { id: 'contact', label: 'CONTACT' }
];

export default function Navbar({
  isDark,
  onToggleTheme,
  isRecruiterView,
  onToggleRecruiterView,
  activeSection,
  onNavigate
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: 'var(--bg-primary)',
        backdropFilter: 'blur(12px)',
        borderBottom: 'var(--border-width) solid var(--border-color)',
        transition: 'all 0.2s ease',
        height: isScrolled ? '56px' : '64px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div 
        className="neo-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        {/* Brand: Swiss Editorial Monogram */}
        <div 
          onClick={() => handleLinkClick('hero')}
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            userSelect: 'none'
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            SHREEYA
          </span>
          <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            / 2026
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2px' 
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '6px 10px',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  borderBottom: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                  transition: 'color 0.15s ease, border-color 0.15s ease'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Recruiter Scan Button */}
          <button
            type="button"
            className="swiss-btn"
            style={{ 
              padding: '6px 12px', 
              fontSize: '0.72rem',
              border: 'var(--border-width) solid var(--accent-blue)',
              color: 'var(--text-primary)'
            }}
            onClick={onToggleRecruiterView}
            title="Toggle 30-Second Recruiter Dossier"
          >
            <Briefcase size={13} color="var(--accent-blue)" />
            <span>{isRecruiterView ? "FULL SITE" : "RECRUITER SCAN"}</span>
          </button>

          {/* External Social Shortcuts */}
          <a
            href={PROFILE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-nav"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              padding: '6px 8px',
              color: 'var(--text-dim)',
              border: 'var(--border-width) solid transparent'
            }}
            title="GitHub Profile"
          >
            <span>GH</span>
            <ExternalLink size={11} />
          </a>

          {/* Theme Toggle (Dark Mode Default) */}
          <button
            type="button"
            className="swiss-btn"
            style={{ padding: '6px', width: '32px', height: '32px' }}
            onClick={onToggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Color Theme"
          >
            {isDark ? <Sun size={15} color="#F5F5F0" /> : <Moon size={15} color="#111111" />}
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="swiss-btn mobile-toggle"
            style={{ padding: '6px', width: '32px', height: '32px' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-primary)',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '10px 12px',
                color: 'var(--text-primary)',
                border: 'var(--border-width) solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{link.label}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>→</span>
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
        @media (min-width: 961px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
