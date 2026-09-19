import React, { useState, useEffect } from 'react';
import { PROJECTS } from './data/projects';

// Swiss Bento Neo-Futurist Components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import FeaturedBuilds from './components/Projects/FeaturedBuilds';
import TechWall from './components/TechWall/TechWall';
import AILabWorkstation from './components/AILab/AILabWorkstation';
import Achievements from './components/Achievements/Achievements';
import BeyondTheCode from './components/Explorations/BeyondTheCode';
import Education from './components/Education/Education';
import GithubActivity from './components/GithubActivity/GithubActivity';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import RecruiterDashboard from './components/Recruiter/RecruiterDashboard';
import CustomCursor from './components/CustomCursor';

export default function App() {
  // Theme state: Dark mode is the primary default visual experience (#0A0A0A)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('shreeya_theme');
    if (saved) return saved === 'dark';
    return true; // Primary Default: Dark Mode (#0A0A0A)
  });

  const [isRecruiterView, setIsRecruiterView] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Sync theme to <html> tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('shreeya_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('shreeya_theme', 'light');
    }
  }, [isDark]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();
      if (key === 'r') {
        e.preventDefault();
        setIsRecruiterView(prev => !prev);
      } else if (key === 'd') {
        e.preventDefault();
        setIsDark(prev => !prev);
      } else if (key === 'escape') {
        if (isRecruiterView) {
          setIsRecruiterView(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecruiterView]);

  // Section Tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'work', 'stack', 'lab', 'milestones', 'field-notes', 'education', 'github', 'contact'];
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.25 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [isRecruiterView]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleToggleRecruiterView = () => {
    setIsRecruiterView(prev => !prev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId) => {
    if (isRecruiterView) {
      setIsRecruiterView(false);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  const handleSelectProject = (projectIdentifier) => {
    const target = projectIdentifier.toLowerCase();
    const matched = PROJECTS.find(p => 
      p.id.toLowerCase() === target || 
      p.title.toLowerCase() === target ||
      p.title.toLowerCase().includes(target)
    );

    if (matched) {
      setActiveProjectId(matched.id);
    }

    handleNavigate('work');
  };

  return (
    <div className="app-shell" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Precision Reticle Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Recruiter View Mode */}
      {isRecruiterView ? (
        <RecruiterDashboard
          onClose={() => setIsRecruiterView(false)}
          onSelectProject={(projId) => {
            setIsRecruiterView(false);
            setActiveProjectId(projId);
            setTimeout(() => handleNavigate('work'), 50);
          }}
        />
      ) : (
        <>
          {/* Top Sticky Swiss Editorial Navbar */}
          <Navbar
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            isRecruiterView={isRecruiterView}
            onToggleRecruiterView={handleToggleRecruiterView}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />

          {/* Main Content Landmark */}
          <main id="main-content">
            {/* Hero Section */}
            <Hero
              onExploreBuilds={() => handleNavigate('work')}
              onConnect={() => handleNavigate('contact')}
              onOpenRecruiter={() => handleToggleRecruiterView()}
            />

            {/* Section 01: About Matrix (12-Column Bento Grid) */}
            <About />

            {/* Section 02: Featured Builds (Bento Grid + Dataflows + Inline Expansion) */}
            <FeaturedBuilds
              activeProjectId={activeProjectId}
            />

            {/* Section 03: Engineering Stack (Modular Cards + Project Inspector) */}
            <TechWall
              onSelectProject={handleSelectProject}
            />

            {/* Section 04: AI & Experimental Systems (Pipelines + CLI Drawer) */}
            <AILabWorkstation />

            {/* Section 05: Engineering Milestones (Clean Swiss Recognition) */}
            <Achievements />

            {/* Section 06: Field Notes (Technical Expeditions & Takeaways) */}
            <BeyondTheCode />

            {/* Section 07: Academic Foundations (Timeline & Rigor) */}
            <Education />

            {/* Section 08: GitHub Activity (Live Telemetry & Signals) */}
            <GithubActivity />

            {/* Section 09: Contact Dispatch (Minimalist CTA & Verified Form) */}
            <Contact />
          </main>

          {/* Closing Editorial Poster Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
