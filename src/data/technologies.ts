export type Technology = {
  id: string;
  name: string;
  category: "Language" | "Frontend" | "Backend" | "AI & Vision" | "Database & Tools";
  accent: string;
  usedIn: string[];
};

export const TECHNOLOGIES: Technology[] = [
  {
    id: "python",
    name: "Python",
    category: "Language",
    accent: "#FFD83D",
    usedIn: ["Road Damage & Pothole Detection", "Orchestrix", "AI Space Information Chatbot", "AI Clone"]
  },
  {
    id: "cpp",
    name: "C++",
    category: "Language",
    accent: "#4D9DE0",
    usedIn: ["Data Structures & Algorithms", "High-Performance Systems", "Algorithmic Problem Solving"]
  },
  {
    id: "java",
    name: "Java",
    category: "Language",
    accent: "#FF6B9D",
    usedIn: ["Object-Oriented Programming", "Enterprise Systems", "Core Computing Curricula"]
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "Language",
    accent: "#FFD83D",
    usedIn: ["Food Safe", "Portfolio Workstation", "Full-Stack Architecture"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Language",
    accent: "#4D9DE0",
    usedIn: ["Portfolio Web App", "Strongly Typed Systems", "Client State Flows"]
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    accent: "#4D9DE0",
    usedIn: ["Food Safe", "Portfolio Web App", "Interactive Dashboards"]
  },
  {
    id: "html_css",
    name: "HTML5 & CSS3",
    category: "Frontend",
    accent: "#FF6B9D",
    usedIn: ["Food Safe", "Portfolio Web App", "Responsive UIs"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    accent: "#4D9DE0",
    usedIn: ["Portfolio Design System", "Responsive Utility Layouts"]
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    accent: "#B7F34A",
    usedIn: ["Food Safe", "Asynchronous Backend Services"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    accent: "#B7F34A",
    usedIn: ["Food Safe", "RESTful Microservices", "API Gateways"]
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    accent: "#B7F34A",
    usedIn: ["Orchestrix", "AI Space Information Chatbot", "High-Throughput APIs"]
  },
  {
    id: "streamlit",
    name: "Streamlit",
    category: "Frontend",
    accent: "#FF6B9D",
    usedIn: ["Rapid AI Prototyping", "Data Dashboards"]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database & Tools",
    accent: "#B7F34A",
    usedIn: ["Food Safe", "MERN Stack Platforms", "Document Store Schemas"]
  },
  {
    id: "postgresql",
    name: "PostgreSQL & SQL",
    category: "Database & Tools",
    accent: "#4D9DE0",
    usedIn: ["Relational Database Normalization", "ACID Transactions"]
  },
  {
    id: "yolo",
    name: "YOLO (You Only Look Once)",
    category: "AI & Vision",
    accent: "#FFD83D",
    usedIn: ["Road Damage & Pothole Detection", "Computer Vision Research"]
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "AI & Vision",
    accent: "#4D9DE0",
    usedIn: ["Road Damage & Pothole Detection", "Spatial Filters", "Edge Detection"]
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Vision",
    accent: "#FF6B9D",
    usedIn: ["Road Damage & Pothole Detection", "Neural Network Modeling"]
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & Vision",
    accent: "#FFD83D",
    usedIn: ["Deep Learning Architectures", "Model Training"]
  },
  {
    id: "monai",
    name: "MONAI",
    category: "AI & Vision",
    accent: "#B7F34A",
    usedIn: ["Medical Imaging Research", "Volumetric Tensors"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Database & Tools",
    accent: "#4D9DE0",
    usedIn: ["Containerized Workflows", "Isolated Environments"]
  },
  {
    id: "git_github",
    name: "Git & GitHub",
    category: "Database & Tools",
    accent: "#111111",
    usedIn: ["All Projects", "Open Source Collaboration", "Version Control"]
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "Frontend",
    accent: "#A855F7",
    usedIn: ["Portfolio 3D Visuals", "Interactive Spatial Web"]
  }
];
