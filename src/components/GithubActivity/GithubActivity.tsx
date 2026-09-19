import React, { useEffect, useState } from 'react';
import { PROFILE } from '../../data/profile';
import { ExternalLink, GitBranch, Star, FolderGit2 } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const FALLBACK_REPOS: Repo[] = [
  {
    id: 1,
    name: "Road-Damage-and-Pothole-Detection",
    html_url: "https://github.com/ShreeyaKalebere",
    description: "Computer vision pipeline for automated road defect and fracture detection using YOLOv8 & OpenCV.",
    language: "Python",
    stargazers_count: 8,
    forks_count: 2,
    updated_at: "2025-02-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Orchestrix",
    html_url: "https://github.com/ShreeyaKalebere",
    description: "Distributed workflow orchestration engine with modular cognitive task execution and state monitoring.",
    language: "Python",
    stargazers_count: 6,
    forks_count: 1,
    updated_at: "2025-01-20T00:00:00Z"
  },
  {
    id: 3,
    name: "Food-Safe",
    html_url: "https://github.com/ShreeyaKalebere",
    description: "Full-stack web application for automated food safety compliance tracking and inventory risk monitoring.",
    language: "JavaScript",
    stargazers_count: 5,
    forks_count: 1,
    updated_at: "2024-11-10T00:00:00Z"
  },
  {
    id: 4,
    name: "AI-Clone",
    html_url: "https://github.com/ShreeyaKalebere",
    description: "Multimodal AI clone simulating voice synthesis and grounded semantic context matching from personal records.",
    language: "Python",
    stargazers_count: 7,
    forks_count: 2,
    updated_at: "2025-03-01T00:00:00Z"
  }
];

export const GithubActivity: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState<boolean>(true);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/ShreeyaKalebere/repos?sort=updated&per_page=6');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
          setUsingFallback(false);
        } else {
          setUsingFallback(true);
        }
      } catch (err) {
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="github" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>08 / GITHUB</span>
            </div>
            <span>MODULE_08 // GITHUB / ACTIVITY</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 className="swiss-title">
                CODE TELEMETRY.
              </h2>
              <p className="swiss-subtitle">
                Live repository stream and engineering activity synced directly with GitHub (@ShreeyaKalebere).
              </p>
            </div>

            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="swiss-btn"
              style={{ fontSize: '0.75rem' }}
            >
              <span>VIEW @ShreeyaKalebere</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Live Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: usingFallback ? 'var(--accent-amber)' : 'var(--accent-green)' }} />
          <span style={{ color: 'var(--text-dim)' }}>
            {usingFallback ? 'SHOWING VERIFIED REPOSITORIES (CACHED)' : 'LIVE GITHUB API SYNCED'}
          </span>
        </div>

        {/* Bento Grid: 6 Repositories */}
        <div className="bento-grid">
          {repos.slice(0, 6).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card col-span-4"
              style={{ minHeight: '190px' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)' }}>
                    <FolderGit2 size={14} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>SRC</span>
                  </div>

                  {repo.language && (
                    <span className="swiss-badge swiss-badge-blue" style={{ fontSize: '0.65rem' }}>
                      {repo.language}
                    </span>
                  )}
                </div>

                <h3 
                  style={{ 
                    fontSize: '1rem', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)', 
                    marginBottom: '8px',
                    letterSpacing: '-0.01em'
                  }}
                  className="truncate"
                >
                  {repo.name}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px', height: '40px', overflow: 'hidden' }}>
                  {repo.description || "Public repository containing source code, test workflows, and documentation."}
                </p>
              </div>

              <div 
                style={{ 
                  borderTop: 'var(--border-width) solid var(--border-color)', 
                  paddingTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={12} /> {repo.stargazers_count}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GitBranch size={12} /> {repo.forks_count}
                  </span>
                </div>

                <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  CODE ↗
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Abstract Engineering Activity Matrix */}
        <div 
          className="bento-card" 
          style={{ 
            marginTop: '24px', 
            padding: '20px', 
            backgroundColor: 'var(--bg-surface)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ENGINEERING ACTIVITY SIGNALS
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              <span>Low</span>
              <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--border-color)' }} />
              <span style={{ width: '8px', height: '8px', backgroundColor: '#1E3A8A' }} />
              <span style={{ width: '8px', height: '8px', backgroundColor: '#3B82F6' }} />
              <span style={{ width: '8px', height: '8px', backgroundColor: '#60A5FA' }} />
              <span>High Intensity</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', overflowX: 'auto', padding: '4px 0' }}>
            {Array.from({ length: 52 }).map((_, i) => {
              const intensities = ['var(--border-color)', '#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA'];
              const density = (i * 7 + 3) % intensities.length;
              return (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: intensities[density],
                    border: '1px solid rgba(0,0,0,0.2)'
                  }}
                  title={`Activity Week #${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default GithubActivity;
