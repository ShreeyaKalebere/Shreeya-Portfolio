import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, LINKS } from '../data/config';
import { PROJECTS } from '../data/projects';
import { SKILLS } from '../data/skills';
import { ACHIEVEMENTS } from '../data/achievements';
import { EDUCATION_DATA } from '../data/education';
import { sound } from '../utils/audio';
import '../styles/terminal.css';

export default function Terminal({ 
  isOpen, 
  onClose, 
  onOpenProjectModal, 
  onToggleRecruiterView, 
  onOpenSecretRoom 
}) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `SHREEYA_OS v2.0 KERNEL TERMINAL [TTY-1]\nType 'help' for a list of available system commands.`
    }
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    sound.playTerminalKey();
    const cmd = rawCmd.toLowerCase();
    const args = cmd.split(' ');
    const root = args[0];

    const newHistory = [...history, { type: 'input', text: rawCmd }];

    switch (root) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  whoami          Display identity and core specializations
  about           Display detailed personal biography
  projects        List all 7 featured software & AI builds
  skills          List categorized technical inventory competencies
  education       View academic degree, CGPA, and coursework
  achievements    List verified honors and completed quests
  recruiter       Switch immediately to Recruiter View
  resume          Open / Download official PDF resume
  github          Visit Shreeya's authentic GitHub profile
  linkedin        Visit Shreeya's LinkedIn profile
  secret          Teleport to the Developer's Hidden Room
  clear           Clear the terminal display screen
  help            Show this command reference list`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `SHREEYA KALEBERE
COMPUTER SCIENCE ENGINEERING
SOFTWARE × AI × COMPUTER VISION × IOT
D.Y. Patil College of Engineering & Technology
CGPA: 9.6 / 10 | Rank: 2nd among 287 students (Top 1%)`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `${PERSONAL_INFO.bioExtended}`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `FEATURED ENGINEERING BUILDS:
${PROJECTS.map((p, i) => `  [${i + 1}] ${p.title} (${p.category}) -> Status: ${p.status}`).join('\n')}

Tip: Type 'github' to view the code repository.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `TECHNICAL CORE SKILLS:
  Languages: Python, Java, C++, JavaScript, SQL
  CS Core: Data Structures & Algorithms, Operating Systems, DBMS, Networks
  Software: React, Node.js, MERN Stack, REST APIs, Git, GitHub
  Databases: MongoDB, PostgreSQL, SQL
  AI / ML: Machine Learning, Computer Vision, YOLO, OpenCV, PyTorch, TensorFlow, AI Agents
  DevOps / Tools: Docker, FastAPI, Git`
        });
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          text: `ACADEMIC PROFILE:
  Degree: ${EDUCATION_DATA.degree} in ${EDUCATION_DATA.major}
  Institution: ${EDUCATION_DATA.institution}
  CGPA: ${EDUCATION_DATA.cgpa} (Rank: ${EDUCATION_DATA.academicStanding})
  Expected Graduation: ${EDUCATION_DATA.graduationYear}`
        });
        break;

      case 'achievements':
      case 'quests':
        newHistory.push({
          type: 'output',
          text: `VERIFIED QUESTS & MILESTONES:
${ACHIEVEMENTS.map(a => `  • ${a.title} - ${a.badge} (${a.xp})`).join('\n')}`
        });
        break;

      case 'github':
        window.open(LINKS.github, '_blank', 'noopener,noreferrer');
        newHistory.push({
          type: 'output',
          text: `Navigating to GitHub: ${LINKS.github}`
        });
        break;

      case 'linkedin':
        window.open(LINKS.linkedin, '_blank', 'noopener,noreferrer');
        newHistory.push({
          type: 'output',
          text: `Navigating to LinkedIn: ${LINKS.linkedin}`
        });
        break;

      case 'resume':
        window.open(LINKS.resume, '_blank', 'noopener,noreferrer');
        newHistory.push({
          type: 'output',
          text: `Opening official resume: ${LINKS.resume}`
        });
        break;

      case 'recruiter':
        onToggleRecruiterView();
        newHistory.push({
          type: 'output',
          text: `Switching to Recruiter Dashboard view...`
        });
        break;

      case 'secret':
        onOpenSecretRoom();
        newHistory.push({
          type: 'output',
          text: `Accessing hidden obsidian developer sanctuary...`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      // Easter Eggs explicitly requested in prompt
      case 'sudo':
        if (args.includes('make-me-famous')) {
          newHistory.push({
            type: 'output',
            text: `ACCESS DENIED 😭 (Tip: Train more computer vision models first!)`
          });
        } else {
          newHistory.push({
            type: 'output',
            text: `shreeya is not in the sudoers file. This incident will be reported to the AI Core.`
          });
        }
        break;

      case 'minecraft':
        newHistory.push({
          type: 'output',
          text: `WORLD LOADED. Diamonds detected at Y=-58. Nether portal active.`
        });
        break;

      case '42':
        newHistory.push({
          type: 'output',
          text: `THE ANSWER EXISTS SOMEWHERE IN THE CODE.`
        });
        break;

      default:
        newHistory.push({
          type: 'output',
          text: `command not found: ${rawCmd}. Type 'help' for available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      className="terminal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Matrix Terminal CLI"
    >
      <div className="terminal-window cyber-corners">
        {/* Top bar */}
        <div className="terminal-topbar">
          <div className="terminal-topbar-left">
            <TerminalIcon size={16} />
            <span>visitor@shreeya-os:~ (Matrix Bash)</span>
          </div>
          <div className="terminal-topbar-buttons">
            <button
              type="button"
              className="term-btn close"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              title="Close Terminal"
              aria-label="Close"
            />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {history.map((item, idx) => {
            if (item.type === 'input') {
              return (
                <div key={idx} className="terminal-prompt-line">
                  <span className="terminal-prompt-symbol">visitor@shreeya:~$</span>
                  <span>{item.text}</span>
                </div>
              );
            }
            return (
              <div key={idx} className="terminal-output-text">
                {item.text}
              </div>
            );
          })}

          {/* Active Input Line */}
          <form onSubmit={handleCommand} className="terminal-input-form">
            <span className="terminal-prompt-symbol">visitor@shreeya:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input-field"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. 'help', 'projects', 'skills')..."
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" style={{ display: 'none' }}>Submit</button>
          </form>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
