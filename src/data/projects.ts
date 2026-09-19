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
    id: "food-safe",
    title: "Food Safe",
    category: "FULL STACK / MERN / FOOD SAFETY",
    status: "built",
    description: "Food safety and quality monitoring platform focused on analyzing food records, label transparency, and ingredient health indicators.",
    accent: "#B7F34A", // Green accent
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "MERN Stack", "OCR Concepts", "REST APIs"],
    problem: "Consumers routinely struggle with chemical nomenclature, confusing additive codes, and hidden allergens on packaged food labels, making dietary safety assessment cumbersome.",
    built: "Engineered a centralized MERN web application integrating optical character recognition (OCR) and text parsing concepts to catalog food records, parse ingredient text, and flag potential safety hazards.",
    approach: "Decoupled frontend component state from backend parsing microservices, utilizing MongoDB for dynamic product schemas and Express REST endpoints for fast response delivery.",
    challenge: "Parsing varied packaging fonts, poor contrast angles, and irregular line breaks into standardized relational ingredient schemas.",
    engineering: "Constructed regex normalizers and token pipelines to sanitize raw OCR text before matching against food additive databases.",
    outcome: "Functional full-stack platform providing transparent food information records with instant hazard concept alerts.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/food-safe.png",
    voxelVisual: {
      type: "voxel-grid",
      primaryBlock: "VOXEL FOOD PACKAGE",
      accentBlock: "SAFETY DATA BLOCKS",
      subtext: "MERN Stack × Food Transparency Pipeline"
    }
  },
  {
    id: "orchestrix",
    title: "Orchestrix",
    category: "AI AGENTS / SOFTWARE ENGINEERING",
    status: "prototype",
    description: "Autonomous AI agent system modeling multi-stage reasoning loops, automated workflow decomposition, and dynamic tool execution.",
    accent: "#A855F7", // Purple accent
    technologies: ["Python", "FastAPI", "AI Agents", "Reasoning Loops", "Workflow Orchestration", "AsyncIO"],
    problem: "Monolithic AI setups struggle with complex multi-stage tasks requiring structured decomposition, adaptive replanning, and verified tool executions.",
    built: "Designed a modular cognitive agent controller that breaks user tasks into step-by-step action graphs with structured tool-calling boundaries.",
    approach: "Structured explicit cognitive state machines: INPUT → AGENT → REASONING / WORKFLOW → ACTION → OUTPUT, ensuring deterministic tool execution and state preservation.",
    challenge: "Handling infinite recursive deliberation loops and ensuring reliable session state recovery across multi-turn workflows.",
    engineering: "Implemented strict timeout checkpoints and fallback handlers for external API action dispatches.",
    outcome: "Functional architecture prototype demonstrating autonomous reasoning and tool execution without hallucinated side-effects.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/orchestrix.png",
    voxelVisual: {
      type: "agent-flow",
      primaryBlock: "AGENT NODES",
      accentBlock: "ORCHESTRATION CORE",
      subtext: "Input → Agent → Tool → Output"
    }
  },
  {
    id: "road-damage",
    title: "Road Damage & Pothole Detection",
    category: "COMPUTER VISION / DEEP LEARNING",
    status: "research",
    description: "Applied computer vision research leveraging YOLO and OpenCV on the Pothole-600 dataset to detect asphalt cavities and alligator cracking with distress severity mapping.",
    accent: "#FFD83D", // Yellow accent
    technologies: ["Python", "YOLO", "OpenCV", "Pothole-600 Dataset", "PyTorch", "Spatial Filters"],
    problem: "Manual road surface inspection is hazardous, slow, and expensive, leading to delayed repairs for potholes and structural alligator cracks that cause vehicular accidents.",
    built: "Investigating real-time single-stage object detection architectures paired with OpenCV image enhancement to classify road anomalies and estimate structural distress severity.",
    approach: "Trained on Pothole-600 dataset, pairing bounding box regression with spatial contour filters to differentiate genuine potholes from surface water and shadows. Associated research paper currently in progress.",
    challenge: "Handling high variance in natural sunlight, wet road reflections, and tree shadow occlusions without generating false positive cavity detections.",
    engineering: "Evaluated adaptive histogram equalization (CLAHE) and edge thresholding in OpenCV prior to passing frames to the neural backbone.",
    outcome: "Active research prototypes achieving multi-class distress tagging (Low / Medium / High severity) with GPS/timestamp schema logging.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/road-damage.png",
    voxelVisual: {
      type: "vision-matrix",
      primaryBlock: "VOXEL ROAD GRID",
      accentBlock: "SEVERITY BLOCKS",
      subtext: "YOLO + OpenCV • Pothole-600 Dataset"
    }
  },
  {
    id: "space-chatbot",
    title: "AI Space Information Chatbot",
    category: "AI / INFORMATION SYSTEM",
    status: "built",
    description: "Interactive space exploration terminal delivering celestial telemetry, planetary metrics, and orbital mission intelligence.",
    accent: "#4D9DE0", // Blue accent
    technologies: ["Python", "FastAPI", "NLP", "Astronomy Telemetry", "Modern Web UI"],
    problem: "Public access to astronomical missions and orbital mechanics is fragmented across disparate, dense academic repositories and legacy databases.",
    built: "Built an interactive mission-control terminal powered by an intelligent querying engine that delivers planetary parameters, mission data, and satellite orbits.",
    approach: "Created asynchronous FastAPI endpoints connected to curated celestial catalogs with an intuitive terminal HUD interface.",
    challenge: "Optimizing query resolution speeds while ensuring strict scientific parameter accuracy.",
    engineering: "Utilized client-side caching and intent parsing algorithms to deliver sub-second responses for planetary telemetry requests.",
    outcome: "Deployed terminal application delivering accurate astronomical data in an engaging mission-control interface.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/space-chatbot.png",
    voxelVisual: {
      type: "space-orbit",
      primaryBlock: "COSMIC TELEMETRY",
      accentBlock: "ORBITAL RUNES",
      subtext: "Planetary Telemetry & Mission Intelligence"
    }
  },
  {
    id: "ai-clone",
    title: "AI Clone",
    category: "AI / APPLICATION DEVELOPMENT",
    status: "prototype",
    description: "Experimental conversational digital twin modeling technical expertise retrieval, domain-specific query parsing, and adaptive persona responses.",
    accent: "#FF6B9D", // Pink accent
    technologies: ["Python", "NLP", "Vector Embeddings", "FastAPI", "Prompt Architecture"],
    problem: "Standard generic conversational models lack personalized context regarding individual engineering portfolios, specific codebase architectures, and academic backgrounds.",
    built: "Engineered an experimental conversational retrieval pipeline grounded strictly in verified personal projects, coursework, and technical skills.",
    approach: "Indexed structured JSON documents into a contextual prompt pipeline to prevent hallucinated qualifications and maintain truthful responses.",
    challenge: "Preventing semantic drift and hallucinations during out-of-domain conversational queries.",
    engineering: "Implemented strict boundary checks returning graceful fallback messages whenever inquiries exceed verified portfolio records.",
    outcome: "Functional persona prototype delivering accurate project walkthroughs and technical background context.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/ai-clone.png",
    voxelVisual: {
      type: "voxel-grid",
      primaryBlock: "NEURAL TWIN",
      accentBlock: "GROUNDED MEMORY",
      subtext: "Verified Portfolio Knowledge Base"
    }
  },
  {
    id: "3d-printing-startup",
    title: "Affordable 3D Models (Startup Idea)",
    category: "ENTREPRENEURSHIP / PRODUCT BUILDING",
    status: "concept",
    description: "Startup venture concept focused on making customized, high-precision 3D printed educational and engineering models accessible and affordable in India.",
    accent: "#FF6B9D",
    technologies: ["3D Printing Concept", "CAD / STL Pipelines", "Additive Manufacturing", "Product Strategy"],
    problem: "High equipment costs, imported filaments, and lack of localized rapid prototyping services create severe barriers for Indian students and hardware startups.",
    built: "Conceptualized a distributed micro-fab service model linking localized 3D printing hubs with automated online mesh validation and instant pricing.",
    approach: "Evaluated additive manufacturing cost models, FDM filament sourcing, and automated cloud slicing for student-friendly pricing. Clearly marked as an entrepreneurship startup idea.",
    challenge: "Optimizing print batch scheduling and material utilization to achieve low unit costs for small custom batches.",
    engineering: "Modeled cloud-based STL topology verification to detect manifold errors before routing print jobs.",
    outcome: "Structured entrepreneurship product roadmap and unit economics framework for affordable decentralized 3D manufacturing in India.",
    github: "https://github.com/ShreeyaKalebere",
    cover: "/images/projects/3d-printing.png",
    voxelVisual: {
      type: "voxel-grid",
      primaryBlock: "CAD TOPOLOGY",
      accentBlock: "ADDITIVE FABRICATION",
      subtext: "Entrepreneurship & Manufacturing Concept"
    }
  }
];
