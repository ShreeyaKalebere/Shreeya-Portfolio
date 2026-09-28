import React, { useState } from 'react';

export interface PipelineStageInfo {
  label: string;
  detail: string;
}

export const DETAILED_DATAFLOWS: Record<string, PipelineStageInfo[]> = {
  "roadcare-ai": [
    { label: "ROAD VIDEO STREAM", detail: "Streams continuous vehicular dashcam footage across variable weather and daylight lighting conditions." },
    { label: "YOLO11 DETECTOR", detail: "Ultralytics YOLO11 single-stage neural backbone localizes asphalt cavities (potholes) and alligator fatigue cracking." },
    { label: "BYTETRACK PERSISTENCE", detail: "ByteTrack multi-object tracking assigns persistent defect IDs across camera frames to prevent duplicate logging." },
    { label: "LEAFLET TRIAGE HUD", detail: "Calculates area-based severity (Low/Med/High) and routes GPS coordinate telemetry to an interactive municipal dashboard." }
  ],
  "silent-alarm": [
    { label: "KEYSTROKE KINEMATICS", detail: "Measures millisecond typing cadence (dwell time, flight time, pause durations, backspace rate) during live chat." },
    { label: "ISOLATION FOREST", detail: "Per-user anomaly detection identifies subtle statistical deviations from individual typing baselines." },
    { label: "LSTM AUTOENCODER", detail: "PyTorch sequence autoencoder reconstructs cadence vectors to identify sustained behavioral distress shifts." },
    { label: "ZERO-KNOWLEDGE NUDGE", detail: "Dispatches automated private wellness nudges with 30-day TTL auto-expiry and zero keystroke identity capture." }
  ],
  "sonic-fingerprints": [
    { label: "ACOUSTIC AUDIO STREAM", detail: "Ingests ambient room microphone recordings or NASA planetary radio frequency wave sonifications." },
    { label: "SPECTRAL EXTRACTION", detail: "Librosa pipeline extracts MFCCs, spectral centroid, zero-crossing rates, and impulse response matrices." },
    { label: "CHROMADB EMBEDDING", detail: "Indexes 2D Mel-spectrogram feature tensors into ChromaDB vector embeddings for cosine similarity search." },
    { label: "PATTERN RECOGNITION", detail: "Renders real-time acoustic physical room classification and interactive celestial spectrogram visualizers." }
  ],
  "resumepilot-ai": [
    { label: "MASTER RESUME AST", detail: "Parses PDF and DOCX master resumes into a normalized Abstract Syntax Tree while preserving visual typography." },
    { label: "AGENTIC MATCHER", detail: "Evaluates target job description skill overlap and suggests quantifiable bullet points with strong action verbs." },
    { label: "TRUTH VALIDATOR", detail: "Automated verification agent cross-checks every generated claim against source evidence to eliminate hallucinations." },
    { label: "ATS EXPORT ENGINE", detail: "Computes weighted ATS compatibility scores with instant export to verified Microsoft Word (.docx) and PDF files." }
  ],
  "food-safe": [
    { label: "PACKAGED FOOD DATA", detail: "Scans raw consumer packaging imagery, ingredient declarations, barcodes, and nutritional panels." },
    { label: "OCR NORMALIZER", detail: "Tesseract OCR engine localizes irregular text polygons, removes font skew, and strips contrast noise." },
    { label: "TOXICOLOGY MATRIX", detail: "Regex tokenization pipeline matches chemical additive E-numbers against international toxicology databases." },
    { label: "SAFETY HEALTH INDEX", detail: "Generates instant deterministic safety scores and highlights allergen risk factors for consumers." }
  ]
};

interface DataflowPipelineProps {
  projectId: string;
  accent?: string;
  fallbackSteps?: string[];
}

export const DataflowPipeline: React.FC<DataflowPipelineProps> = ({
  projectId,
  accent = 'var(--accent-blue)',
  fallbackSteps = ["INPUT", "TRANSFORM", "ANALYZE", "OUTPUT"]
}) => {
  const stageData: PipelineStageInfo[] = DETAILED_DATAFLOWS[projectId] || 
    fallbackSteps.map(step => ({
      label: step,
      detail: `Data processing pipeline stage: ${step}.`
    }));

  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);

  const handleStageClick = (index: number) => {
    setActiveStageIndex(prev => (prev === index ? null : index));
  };

  return (
    <div 
      className="interactive-pipeline"
      style={{ '--pipeline-accent': accent } as React.CSSProperties}
    >
      {/* Telemetry Status Strip */}
      <div className="pipeline-status-bar">
        <div className="pipeline-telemetry">
          <span className="pipeline-pulse-dot" />
          <span>DATAFLOW PIPELINE // STREAM_ACTIVE · 60Hz</span>
        </div>
        <span className="pipeline-hint">
          {activeStageIndex !== null ? 'CLICK TO DESELECT' : 'CLICK NODE TO INSPECT'}
        </span>
      </div>

      {/* Horizontal Flow Track with Signal Packets */}
      <div className="pipeline-track">
        {stageData.map((stage, idx) => {
          const isActive = activeStageIndex === idx;

          return (
            <React.Fragment key={stage.label}>
              {/* Stage Node Chip */}
              <button
                type="button"
                onClick={() => handleStageClick(idx)}
                className={`pipeline-node ${isActive ? 'active' : ''}`}
                title={`Inspect stage: ${stage.label}`}
                aria-pressed={isActive}
              >
                <span className="pipeline-node-num">0{idx + 1}</span>
                <span>{stage.label}</span>
              </button>

              {/* Connecting Bus with Live Traveling Signal Packets */}
              {idx < stageData.length - 1 && (
                <div className="pipeline-wire">
                  {/* Packet 1 */}
                  <span className="pipeline-packet" />
                  {/* Packet 2 (offset) */}
                  <span className="pipeline-packet" />
                  {/* End arrowhead */}
                  <span className="pipeline-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Stage Technical Inspection Banner */}
      {activeStageIndex !== null && (
        <div className="pipeline-detail-banner">
          <div className="pipeline-detail-title">
            <span>
              STAGE 0{activeStageIndex + 1} // {stageData[activeStageIndex].label}
            </span>
            <button
              type="button"
              onClick={() => setActiveStageIndex(null)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--text-dim)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 4px'
              }}
            >
              [✕ CLOSE]
            </button>
          </div>
          <p className="pipeline-detail-text">
            {stageData[activeStageIndex].detail}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataflowPipeline;
