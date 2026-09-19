import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  Bot, 
  Cpu, 
  Compass, 
  Activity, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/audio';
import '../styles/ailab.css';

const AI_LAB_MODULES = [
  {
    id: 'vision-lab',
    title: 'COMPUTER VISION LAB',
    badge: 'ACTIVE MODULE',
    icon: Eye,
    desc: 'Real-time spatial perception pipelines investigating bounding box detection, image thresholding, and contour filtering.',
    techs: ['YOLO', 'OpenCV', 'Python', 'Pothole-600', 'Edge Vision'],
    pipeline: [
      { step: 'STAGE 01', label: 'Video Frame Ingestion' },
      { step: 'STAGE 02', label: 'OpenCV Spatial Normalization' },
      { step: 'STAGE 03', label: 'YOLO Anchor Regression' },
      { step: 'STAGE 04', label: 'Severity Classification' },
      { step: 'STAGE 05', label: 'GPS Geotag Telemetry' }
    ]
  },
  {
    id: 'agent-lab',
    title: 'AI AGENT LAB',
    badge: 'COGNITIVE ENGINE',
    icon: Bot,
    desc: 'Autonomous multi-step orchestration modeling contextual reasoning, action tool dispatch, and state tracking.',
    techs: ['AI Agents', 'Reasoning Loops', 'FastAPI', 'Python', 'State Machines'],
    pipeline: [
      { step: 'INPUT', label: 'Task Prompt Signal' },
      { step: 'AGENT', label: 'Cognitive Controller' },
      { step: 'REASONING', label: 'Workflow Decomposition' },
      { step: 'ACTION', label: 'Tool Dispatcher' },
      { step: 'OUTPUT', label: 'Synthesized Solution' }
    ]
  },
  {
    id: 'ml-systems-lab',
    title: 'ML SYSTEMS LAB',
    badge: 'TENSOR PIPELINES',
    icon: Cpu,
    desc: 'Deep learning neural models, tensor manipulations, data loading pipelines, and gradient optimization workflows.',
    techs: ['PyTorch', 'TensorFlow', 'Python', 'Docker', 'FastAPI'],
    pipeline: [
      { step: 'INPUT', label: 'Raw Multi-Feature Tensors' },
      { step: 'PROCESS', label: 'Batch Normalization' },
      { step: 'LAYERS', label: 'Dynamic Graph Convolution' },
      { step: 'LOSS', label: 'Gradient Backpropagation' },
      { step: 'INFERENCE', label: 'Asynchronous API Endpoint' }
    ]
  },
  {
    id: 'space-ai-lab',
    title: 'SPACE AI LAB',
    badge: 'ASTRONOMY HUD',
    icon: Compass,
    desc: 'Space-inspired intelligence terminal exploring planetary telemetry, orbital mechanics, and lunar terrain features.',
    techs: ['Space AI', 'Orbital Telemetry', 'FastAPI', 'Python', 'Lunar Vision'],
    pipeline: [
      { step: 'SIGNAL', label: 'Orbiter Sensor Telemetry' },
      { step: 'FILTER', label: 'Shadow Terminator Extraction' },
      { step: 'ANALYSIS', label: 'Topography & Crater Mapping' },
      { step: 'COMPUTE', label: 'Orbital Path Trajectory' },
      { step: 'TELEMETRY', label: 'Mission Control HUD' }
    ]
  },
  {
    id: 'medical-ai-lab',
    title: 'MEDICAL AI LAB',
    badge: 'RESEARCH CONCEPT',
    icon: Activity,
    desc: 'Exploration of multi-modal medical imaging architectures across X-ray, MRI, and CT scans. Strictly academic research concept; non-clinical.',
    techs: ['MONAI', 'PyTorch', 'YOLO', 'OpenCV', 'FastAPI', 'Docker'],
    pipeline: [
      { step: 'SCAN', label: 'Volumetric Imaging Slice' },
      { step: 'GATEWAY', label: 'FastAPI Ingestion Microservice' },
      { step: 'CV', label: 'OpenCV Contrast Windowing' },
      { step: 'SEGMENT', label: 'MONAI / PyTorch Model' },
      { step: 'WORKSPACE', label: 'Diagnostic UI Concept' }
    ]
  }
];

export default function AILab() {
  const [selectedLabId, setSelectedLabId] = useState('vision-lab');

  const currentLab = AI_LAB_MODULES.find(m => m.id === selectedLabId) || AI_LAB_MODULES[0];

  const handleSelectLab = (id) => {
    sound.playClick();
    setSelectedLabId(id);
  };

  return (
    <section id="ailab" className="ai-lab-section" aria-label="AI Engineering District">
      <div className="container ai-lab-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>DISTRICT // AI LAB & NEURAL CORE</span>
          </div>
          <h2 className="section-title">INTELLIGENT SYSTEMS & COMPUTER VISION</h2>
          <p className="section-subtitle">
            Exploration of deep learning architectures, computer vision object detection, autonomous reasoning agents, and specialized domain pipelines.
          </p>
        </div>

        {/* Master Control Deck: Neural Visualizer + Module Selector */}
        <div className="ai-deck-grid">
          {/* Left Column: Neural Network Visualizer & System Telemetry */}
          <div className="neural-visualizer-panel cyber-corners">
            <div className="neural-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Brain size={18} color="var(--matrix-green)" />
                <span>AI_CORE // NEURAL GRAPH INTERFACE</span>
              </div>
              <span style={{ color: 'var(--cyber-cyan)' }}>WEIGHTS: COMPILED</span>
            </div>

            {/* Interactive Decorative Neural Network SVG */}
            <div className="neural-canvas-wrap">
              <svg className="neural-svg" viewBox="0 0 500 200" preserveAspectRatio="none">
                {/* Synapse Lines */}
                {/* Input Layer to Hidden Layer 1 */}
                {[40, 80, 120, 160].map((y1, i) =>
                  [30, 65, 100, 135, 170].map((y2, j) => (
                    <line
                      key={`in-h1-${i}-${j}`}
                      x1="60"
                      y1={y1}
                      x2="180"
                      y2={y2}
                      className={`synapse-line ${i === 1 || j === 2 ? 'active' : ''}`}
                    />
                  ))
                )}

                {/* Hidden Layer 1 to Hidden Layer 2 */}
                {[30, 65, 100, 135, 170].map((y1, i) =>
                  [45, 85, 125, 165].map((y2, j) => (
                    <line
                      key={`h1-h2-${i}-${j}`}
                      x1="180"
                      y1={y1}
                      x2="320"
                      y2={y2}
                      className="synapse-line"
                    />
                  ))
                )}

                {/* Hidden Layer 2 to Output Layer */}
                {[45, 85, 125, 165].map((y1, i) =>
                  [60, 100, 140].map((y2, j) => (
                    <line
                      key={`h2-out-${i}-${j}`}
                      x1="320"
                      y1={y1}
                      x2="440"
                      y2={y2}
                      className={`synapse-line ${j === 1 ? 'active' : ''}`}
                    />
                  ))
                )}

                {/* Nodes: Input Layer */}
                {[40, 80, 120, 160].map((y, i) => (
                  <circle
                    key={`in-${i}`}
                    cx="60"
                    cy={y}
                    r="6"
                    fill="#10b981"
                    className="neural-node"
                  />
                ))}

                {/* Nodes: Hidden Layer 1 */}
                {[30, 65, 100, 135, 170].map((y, i) => (
                  <circle
                    key={`h1-${i}`}
                    cx="180"
                    cy={y}
                    r="6.5"
                    fill="#00f0ff"
                    className="neural-node"
                  />
                ))}

                {/* Nodes: Hidden Layer 2 */}
                {[45, 85, 125, 165].map((y, i) => (
                  <circle
                    key={`h2-${i}`}
                    cx="320"
                    cy={y}
                    r="6.5"
                    fill="#00ff66"
                    className="neural-node"
                  />
                ))}

                {/* Nodes: Output Layer */}
                {[60, 100, 140].map((y, i) => (
                  <circle
                    key={`out-${i}`}
                    cx="440"
                    cy={y}
                    r="7"
                    fill="#ffffff"
                    stroke="#00ff66"
                    strokeWidth="2"
                    className="neural-node"
                  />
                ))}
              </svg>
            </div>

            {/* Diagnostic Terminal Status requested in prompt */}
            <div className="ai-telemetry-box" role="status" aria-label="AI Core System Diagnostics">
              <div className="telemetry-row">
                <span>AI_CORE STATUS:</span>
                <span className="telemetry-val">ONLINE</span>
              </div>
              <div className="telemetry-row">
                <span>VISION MODULE:</span>
                <span className="telemetry-val">ACTIVE (YOLO / OpenCV)</span>
              </div>
              <div className="telemetry-row">
                <span>AGENT MODULE:</span>
                <span className="telemetry-val">ACTIVE (Orchestration)</span>
              </div>
              <div className="telemetry-row">
                <span>MODEL PIPELINE:</span>
                <span className="telemetry-val">READY</span>
              </div>
              <div className="telemetry-row">
                <span>SYSTEM STATUS:</span>
                <span className="telemetry-val" style={{ color: 'var(--cyber-cyan)' }}>
                  EXPERIMENTAL // NON-FABRICATED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Lab Module Selectors */}
          <div className="ai-modules-panel" role="tablist" aria-label="AI Lab Modules">
            {AI_LAB_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isSelected = selectedLabId === mod.id;
              return (
                <div
                  key={mod.id}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                  className={`ai-module-card ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectLab(mod.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectLab(mod.id)}
                  data-cursor="pointer"
                >
                  <div className="ai-module-header">
                    <div className="ai-module-title">
                      <Icon size={16} color={isSelected ? "var(--matrix-green)" : "var(--cyber-cyan)"} />
                      <span>{mod.title}</span>
                    </div>
                    <span className="ai-module-badge">{mod.badge}</span>
                  </div>
                  <p className="ai-module-desc">{mod.desc}</p>
                  <div className="ai-module-techs">
                    {mod.techs.map((t, i) => (
                      <span key={i} className="ai-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Pipeline Flow Diagram for Current Selected Lab */}
        <div className="ai-active-pipeline-box cyber-corners">
          <div className="pipeline-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--cyber-cyan)" />
              <span>ACTIVE ARCHITECTURE PIPELINE // {currentLab.title}</span>
            </div>
            <span>STEP-BY-STEP DATA FLOW</span>
          </div>

          <div className="pipeline-flow-row" role="list">
            {currentLab.pipeline.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="pipeline-node-box" role="listitem">
                  <div className="pipeline-node-step">{step.step}</div>
                  <div className="pipeline-node-label">{step.label}</div>
                </div>
                {idx < currentLab.pipeline.length - 1 && (
                  <ArrowRight className="pipeline-arrow" size={18} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
