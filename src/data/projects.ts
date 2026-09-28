export type ProjectStatus = "built" | "research" | "concept" | "prototype";

export type Project = {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  accent: string;
  technologies: string[];
  profileTags?: string[];

  problem?: string;
  built?: string;
  approach?: string;
  challenge?: string;
  engineering?: string;
  outcome?: string;

  github?: string;
  liveDemo?: string;

  cover: string;
  screenshots?: string[];
  architecture?: string;
  voxelVisual: {
    type: "voxel-grid" | "agent-flow" | "vision-matrix" | "space-orbit" | "heritage-cube";
    primaryBlock: string;
    accentBlock: string;
    subtext: string;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "roadcare-ai",
    title: "RoadCare AI",
    category: "COMPUTER VISION & DEEP LEARNING / EDGE SYSTEMS",
    status: "built",
    description: "End-to-end automated road distress capture and triage system utilizing Ultralytics YOLO11 trained on the RoadDamage20K dataset for real-time cavity and fracture detection.",
    accent: "#FFD83D", // Amber Gold accent
    technologies: ["Python", "Ultralytics YOLO11", "ByteTrack", "OpenCV", "PyTorch", "FastAPI", "Leaflet.js", "GeoJSON", "SQLite / MongoDB Atlas"],
    problem: "Municipal road surface monitoring is slow, hazardous, and reactive, leading to delayed repairs for asphalt cavities (potholes) and fatigue alligator cracking that trigger vehicular accidents.",
    built: "Engineered an edge vision triage platform combining Ultralytics YOLO11 with ByteTrack multi-object tracking to assign persistent defect IDs across camera frames, preventing duplicate logging in municipal databases.",
    approach: "Designed area-based severity categorization heuristics (Low / Medium / High priority) coupled with GPS coordinate telemetry, feeding an interactive dark-mode Leaflet triage dashboard for contractor dispatch.",
    challenge: "Suppression of false positive detections caused by wet asphalt reflections, overhead tree shadows, and non-distress surface variations across dynamic daytime lighting.",
    engineering: "Constructed OpenCV preprocessing pipelines (adaptive CLAHE and spatial contour filters) before feeding frames to the neural backbone, ensuring reliable confidence thresholding.",
    outcome: "Real-time edge detection achieving sub-30ms inference latency with persistent defect tracking and automated geospatial municipal dispatch logging.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/roadcare-ai.png",
    voxelVisual: {
      type: "vision-matrix",
      primaryBlock: "EDGE CAMERA TELEMETRY",
      accentBlock: "YOLO11 DETECTOR",
      subtext: "YOLO11 × ByteTrack × Leaflet Triage Dashboard"
    }
  },
  {
    id: "silent-alarm",
    title: "Silent Alarm",
    category: "MENTAL HEALTH AI & FULL-STACK PLATFORM",
    status: "built",
    description: "Full-stack mental health wellness chat platform that analyzes subtle micro-shifts in student typing cadence (dwell time, flight time, pauses, backspaces) during live chat to identify sustained distress.",
    accent: "#38BDF8", // Cyan / sky blue accent
    technologies: ["React 19", "Tailwind CSS", "Node.js", "Express.js", "Socket.io", "MongoDB", "Python FastAPI", "PyTorch (LSTM Autoencoder)", "Scikit-Learn (Isolation Forest)"],
    problem: "Students experiencing acute emotional distress or anxiety often mask their feelings in explicit text or cannot articulate their state directly, delaying critical supportive intervention.",
    built: "Architected a full-stack wellness chat platform that captures non-verbal typing kinematics without logging keystroke characters, detecting divergence from personalized typing baselines.",
    approach: "Engineered an ensemble Python ML microservice combining per-user Isolation Forest anomaly detection with a PyTorch LSTM sequence autoencoder to identify behavioral distress shifts in real time.",
    challenge: "Guaranteeing absolute zero-knowledge privacy while processing millisecond-level timing telemetry in real-time without introducing chat UI latency.",
    engineering: "Enforced strict zero-knowledge architecture with zero message text capture, 30-day TTL telemetry auto-expiry, automated private wellness nudges, and dual-threshold counselor escalation.",
    outcome: "Privacy-preserving wellness system delivering real-time unobtrusive support nudges with zero keystroke identity capture.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/silent-alarm.png",
    voxelVisual: {
      type: "voxel-grid",
      primaryBlock: "KEYSTROKE KINEMATICS",
      accentBlock: "LSTM AUTOENCODER",
      subtext: "React 19 × PyTorch LSTM × Zero-Knowledge Privacy"
    }
  },
  {
    id: "sonic-fingerprints",
    title: "Sonic Fingerprints & Solar System Acoustic Explorer",
    category: "DUAL-MODE ACOUSTIC AI & VECTOR RETRIEVAL",
    status: "built",
    description: "Dual-mode acoustic intelligence platform combining physical room fingerprinting via ambient impulse responses with real-time vector retrieval across NASA planetary radio frequency sonifications.",
    accent: "#818CF8", // Acoustic violet / indigo accent
    technologies: ["React", "Node.js", "Express.js", "Python FastAPI", "ChromaDB", "Librosa", "Web Audio API", "PyTorch", "Docker"],
    problem: "Acoustic audio contains rich spatial and astronomical information that is difficult to catalog, compare, and query in real-time using conventional time-domain processing.",
    built: "Designed a dual-mode acoustic intelligence platform powered by an Express API gateway and a shared Python FastAPI signal-processing microservice backed by ChromaDB vector embeddings.",
    approach: "Mode 1 extracts acoustic features (MFCCs, spectral centroid, zero-crossing rate, impulse responses) to classify physical rooms via cosine similarity. Mode 2 indexes NASA planetary radio emissions for real-time acoustic pattern matching.",
    challenge: "Normalizing dynamic microphone hardware sensitivities across devices and indexing variable-length planetary wave recordings into fixed-dimension vector spaces.",
    engineering: "Built Librosa feature extraction pipelines generating normalized 2D Mel-spectrogram tensors and ChromaDB vector embeddings with interactive Web Audio API spectrogram visualizers.",
    outcome: "Dual-mode platform achieving reliable physical acoustic room matching and sub-second NASA celestial sonification pattern search.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/sonic-fingerprints.png",
    voxelVisual: {
      type: "space-orbit",
      primaryBlock: "AUDIO SPECTROGRAM",
      accentBlock: "CHROMADB EMBEDDING",
      subtext: "Librosa × ChromaDB × NASA Planetary Sonifications"
    }
  },
  {
    id: "resumepilot-ai",
    title: "ResumePilot AI",
    category: "AGENTIC AI SAAS & DOCUMENT PROCESSING",
    status: "built",
    description: "Production-grade full-stack AI SaaS platform that automatically parses master resumes (PDF/DOCX) and tailors them to target job descriptions while strictly preserving visual formatting.",
    accent: "#4ADE80", // Emerald green accent
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Python FastAPI", "ChromaDB / TF-IDF", "Gemini / OpenAI APIs", "python-docx"],
    problem: "Automated Applicant Tracking Systems (ATS) reject high-qualified candidates due to mismatched terminology, while generic LLMs hallucinate false qualifications when tailoring resumes.",
    built: "Constructed an agentic matching pipeline evaluating skill overlap, bullet-point rewriting with strong action verbs, and an automated Truth Validator that cross-checks claims against source evidence.",
    approach: "Integrated a weighted ATS-scoring engine (Skill Coverage, Keyword Density, Experience Relevance) with dual-stream exports to verified Microsoft Word (.docx) and standardized PDF documents.",
    challenge: "Eliminating generative AI hallucinations during resume bullet-point enhancement and preventing layout degradation across complex typography.",
    engineering: "Implemented deterministic source-sentence grounding checks returning confidence penalties whenever generated phrasing deviates from verified user experience.",
    outcome: "Production AI platform delivering quantifiable ATS score metrics, zero-hallucination bullet point optimization, and instant DOCX/PDF export.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/resumepilot-ai.png",
    voxelVisual: {
      type: "agent-flow",
      primaryBlock: "MASTER RESUME AST",
      accentBlock: "TRUTH VALIDATOR",
      subtext: "Agentic AI × ATS Scoring Engine × DOCX/PDF Export"
    }
  },
  {
    id: "food-safe",
    title: "Food Safe",
    category: "FULL-STACK MERN & OCR SYSTEM",
    status: "built",
    description: "Centralized web platform enabling consumers to catalog food packaging, decode complex additive E-numbers, and highlight potential allergen hazards.",
    accent: "#B7F34A", // Lime green accent
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "MERN Stack", "RESTful APIs", "OCR Text Normalization"],
    problem: "Consumers routinely struggle with ambiguous chemical nomenclature, confusing additive codes, and hidden allergens on packaged food labels, making dietary safety assessment cumbersome.",
    built: "Engineered a centralized web application enabling consumers to catalog food packaging, decode complex additive E-numbers, and highlight potential allergen hazards.",
    approach: "Built regex normalizers and token pipelines to sanitize raw optical character recognition (OCR) text before cross-referencing additive toxicity databases.",
    challenge: "Parsing varied packaging fonts, poor contrast angles, and irregular line breaks into standardized relational ingredient schemas.",
    engineering: "Decoupled frontend component state from backend parsing microservices, delivering sub-second response times using optimized MongoDB query indexing.",
    outcome: "Functional full-stack platform providing transparent food safety information with instant additive hazard alerts.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/food-safe.png",
    voxelVisual: {
      type: "voxel-grid",
      primaryBlock: "VOXEL FOOD PACKAGE",
      accentBlock: "SAFETY DATA BLOCKS",
      subtext: "MERN Stack × Food Transparency Pipeline"
    }
  }
];
