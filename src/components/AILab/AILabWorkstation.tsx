import React, { useState } from 'react';
import { PROFILE } from '../../data/profile';

interface AIPipeline {
  id: string;
  category: string;
  title: string;
  architecture: string[];
  description: string;
  technologies: string[];
  associatedBuild: string;
  telemetry: string;
}

const AI_SYSTEMS: AIPipeline[] = [
  {
    id: "cv-yolo",
    category: "COMPUTER VISION & OBJECT DETECTION",
    title: "YOLOv8 Road Distress & Pothole Segmentation",
    architecture: ["DASHCAM INPUT", "YOLOv8 BACKBONE", "FEATURE PYRAMID", "BOUNDING MASK", "DEFECT SEVERITY"],
    description: "Automated road fracture and surface anomaly localization for vehicular edge computing, analyzing roadway distress across dynamic lighting conditions.",
    technologies: ["YOLOv8", "OpenCV", "Python", "Roboflow"],
    associatedBuild: "Road Damage & Pothole Detection",
    telemetry: "28ms Inference Latency (Edge Benchmark)"
  },
  {
    id: "ai-agents",
    category: "AI AGENTS & WORKFLOW ORCHESTRATION",
    title: "Orchestrix Cognitive Agent Engine",
    architecture: ["TASK SPECIFICATION", "INTENT DECOMPOSITION", "TOOL ROUTING", "REASONING LOOP", "VERIFIED PAYLOAD"],
    description: "Multi-step autonomous workflow coordinator that evaluates computational requirements, dynamically dispatches execution tools, and monitors process state.",
    technologies: ["Python", "FastAPI", "Agent Loops", "Task Queues"],
    associatedBuild: "Orchestrix",
    telemetry: "Modular Asynchronous Dispatch"
  },
  {
    id: "space-telemetry",
    category: "SPACE TELEMETRY & CELESTIAL QUERYING",
    title: "Orbital Mechanics & Mission Telemetry Querying",
    architecture: ["CELESTIAL QUERY", "NLP INTENT ENGINE", "ORBITAL TELEMETRY", "MISSION INTEL"],
    description: "Interactive celestial terminal parsing natural language queries into structured mission parameters, planetary telemetry, and satellite orbits.",
    technologies: ["Python", "FastAPI", "NLP", "Celestial Telemetry"],
    associatedBuild: "AI Space Information Chatbot",
    telemetry: "Real-time Telemetry Normalization"
  },
  {
    id: "nlp-grounding",
    category: "NLP & KNOWLEDGE GROUNDING",
    title: "Context-Grounded Conversational Retrieval",
    architecture: ["NATURAL QUERY", "SEMANTIC EMBEDDINGS", "LOCAL RECORD RETRIEVAL", "BOUNDARY CHECK", "GROUNDED ANSWER"],
    description: "Persona and knowledge-retrieval pipeline constrained to verified documents to eliminate hallucinations and preserve technical accuracy.",
    technologies: ["Python", "Vector Retrieval", "FastAPI", "NLP"],
    associatedBuild: "AI Clone & Space Info Bot",
    telemetry: "Deterministic Hallucination Boundary"
  },
  {
    id: "ocr-parsing",
    category: "OCR & REGULATORY PARSING",
    title: "Automated Ingredient Safety & Label Parser",
    architecture: ["PACKAGING IMAGE", "TEXT LOCALIZATION", "TESSERACT OCR", "REGEX ENTITY PARSER", "SAFETY SCORE"],
    description: "Optical character recognition pipeline designed to extract chemical additive codes, allergen disclosures, and regulatory standards from consumer product packaging.",
    technologies: ["OCR", "Tesseract", "Regex Engine", "JavaScript"],
    associatedBuild: "Food Safe",
    telemetry: "Multi-Lingual Packaging Parsing"
  }
];

export const AILabWorkstation: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<AIPipeline>(AI_SYSTEMS[0]);
  const [commandInput, setCommandInput] = useState<string>('');
  const [commandLogs, setCommandLogs] = useState<Array<{ text: string; isOutput: boolean }>>([
    { text: "SHREEYA_ENGINEERING_CORE // AI WORKSTATION INITIALIZED", isOutput: true },
    { text: "Type 'help' to inspect commands or 'projects' to list verified builds.", isOutput: true }
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...commandLogs, { text: `$ ${commandInput}`, isOutput: false }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          text: "COMMANDS: 'about', 'skills', 'projects', 'rank', 'contact', 'status', 'clear'",
          isOutput: true
        });
        break;
      case 'about':
        newLogs.push({
          text: `SHREEYA KALEBERE // ${PROFILE.tagline}. Rank 2/287 CSE student at D.Y. Patil CET.`,
          isOutput: true
        });
        break;
      case 'rank':
        newLogs.push({
          text: "ACADEMIC STANDING: Rank 2 / 287 Students • CGPA 9.6 / 10.0 • Class of 2027.",
          isOutput: true
        });
        break;
      case 'skills':
        newLogs.push({
          text: "STACK: Python, C++, Java, React, TypeScript, YOLOv8, OpenCV, MediaPipe, Node.js, Git, Docker.",
          isOutput: true
        });
        break;
      case 'projects':
        newLogs.push({
          text: "BUILDS: Road Damage YOLO, Orchestrix, Food Safe, AI Clone, Space Information Bot, 3D Printing Startup Idea.",
          isOutput: true
        });
        break;
      case 'contact':
        newLogs.push({
          text: `EMAIL: ${PROFILE.email} | GITHUB: ${PROFILE.social.github} | LINKEDIN: ${PROFILE.social.linkedin}`,
          isOutput: true
        });
        break;
      case 'status':
        newLogs.push({
          text: "SYSTEM STATE: ALL PIPELINES ACTIVE. Available for SDE and AI/ML engineering internships.",
          isOutput: true
        });
        break;
      case 'clear':
        setCommandLogs([]);
        setCommandInput('');
        return;
      default:
        newLogs.push({
          text: `Command not recognized: '${cmd}'. Type 'help' for supported instructions.`,
          isOutput: true
        });
    }

    setCommandLogs(newLogs);
    setCommandInput('');
  };

  return (
    <section id="lab" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>04 / LAB</span>
            </div>
            <span>MODULE_04 // AI & EXPERIMENTAL SYSTEMS</span>
          </div>
          <h2 className="swiss-title">
            APPLIED AI & EXPERIMENTAL SYSTEMS.
          </h2>
          <p className="swiss-subtitle">
            Practical computer vision models, agentic workflow loops, kinematic feature extraction, and grounded intelligence architectures.
          </p>
        </div>

        {/* Bento Grid: Pipelines & CLI Drawer */}
        <div className="bento-grid">
          {/* Left: Interactive Pipeline Selector */}
          <div className="col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {AI_SYSTEMS.map((sys) => {
              const isSelected = activeSystem.id === sys.id;
              return (
                <div
                  key={sys.id}
                  onClick={() => setActiveSystem(sys)}
                  className={`bento-card ${isSelected ? 'bento-card-featured' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '18px 20px',
                    borderLeft: isSelected ? '3px solid var(--accent-blue)' : 'var(--border-width) solid var(--border-color)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: isSelected ? 'var(--accent-blue)' : 'var(--text-dim)' }}>
                      {sys.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)' }}>
                      {sys.telemetry}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {sys.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {sys.description}
                  </p>

                  {/* Flow Strip */}
                  <div className="dataflow-strip" style={{ margin: '6px 0 10px' }}>
                    {sys.architecture.map((node, nIdx) => (
                      <React.Fragment key={nIdx}>
                        <span className="dataflow-node">{node}</span>
                        {nIdx < sys.architecture.length - 1 && <span className="dataflow-arrow">→</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {sys.technologies.map(t => (
                        <span key={t} className="swiss-badge" style={{ fontSize: '0.65rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <a 
                      href="#work"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-blue)' }}
                    >
                      VIEW BUILD →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Engineering Terminal / CLI Drawer */}
          <div className="col-span-5" style={{ display: 'flex', flexDirection: 'column' }}>
            <div 
              className="bento-card"
              style={{
                height: '100%',
                minHeight: '440px',
                backgroundColor: '#000000',
                borderColor: 'var(--border-color)',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '18px'
              }}
            >
              {/* Terminal Title Bar */}
              <div>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #222222',
                    paddingBottom: '10px',
                    marginBottom: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%' }} />
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#F59E0B', borderRadius: '50%' }} />
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }} />
                    <span style={{ color: '#888888', fontSize: '0.72rem', marginLeft: '8px' }}>
                      shreeya@engineering-core: ~
                    </span>
                  </div>
                  <span style={{ color: '#555555', fontSize: '0.68rem' }}>BASH // v2.4</span>
                </div>

                {/* Command Output Stream */}
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: '0.78rem',
                    maxHeight: '320px',
                    overflowY: 'auto'
                  }}
                >
                  {commandLogs.map((log, idx) => (
                    <div 
                      key={idx}
                      style={{
                        color: log.isOutput ? '#D4D4D4' : '#4D9DE0',
                        lineHeight: 1.5,
                        borderLeft: log.isOutput ? '2px solid #2A2A2A' : 'none',
                        paddingLeft: log.isOutput ? '8px' : '0'
                      }}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Input Form */}
              <form 
                onSubmit={handleCommandSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderTop: '1px solid #222222',
                  paddingTop: '12px',
                  marginTop: '16px'
                }}
              >
                <span style={{ color: '#4D9DE0', fontWeight: 'bold' }}>$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="type 'help', 'projects', 'rank'..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#F5F5F0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="swiss-btn swiss-btn-primary"
                  style={{ padding: '4px 10px', fontSize: '0.68rem' }}
                >
                  RUN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AILabWorkstation;
