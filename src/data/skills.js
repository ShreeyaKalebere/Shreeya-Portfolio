// =========================================================================
// TECHNICAL SKILLS & MINECRAFT INVENTORY DATA
// All skills verified from project info and academic background.
// Strictly no fake proficiency bars, ranks, or percentages.
// =========================================================================

export const SKILL_CATEGORIES = [
  { id: "all", name: "All Modules" },
  { id: "languages", name: "Languages" },
  { id: "cs_core", name: "CS Fundamentals" },
  { id: "software", name: "Software Engineering" },
  { id: "databases", name: "Databases" },
  { id: "ai_ml", name: "AI & Computer Vision" },
  { id: "devops", name: "DevOps & Tools" }
];

export const SKILLS = [
  // --- PROGRAMMING LANGUAGES ---
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryLabel: "Programming Language",
    rarity: "legendary", // emerald
    icon: "Terminal",
    minecraftItem: "Emerald Ingot",
    hotbar: true,
    slot: 1,
    description: "Core language used for AI/ML, computer vision pipelines (YOLO, OpenCV), and backend microservices.",
    tags: ["AI/ML", "Backend", "Scripting"]
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    categoryLabel: "Programming Language",
    rarity: "epic", // diamond / cyan
    icon: "Coffee",
    minecraftItem: "Diamond Pickaxe",
    hotbar: true,
    slot: 2,
    description: "Object-oriented software development, enterprise foundations, and robust systems engineering.",
    tags: ["OOP", "Enterprise", "Systems"]
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    categoryLabel: "Programming Language",
    rarity: "epic",
    icon: "Cpu",
    minecraftItem: "Netherite Scrap",
    hotbar: true,
    slot: 3,
    description: "High-performance programming, algorithmic problem solving, memory management, and competitive DSA.",
    tags: ["Performance", "DSA", "Low-Level"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryLabel: "Programming Language",
    rarity: "rare",
    icon: "Code2",
    minecraftItem: "Redstone Dust",
    hotbar: true,
    slot: 4,
    description: "Full-stack asynchronous web engineering, modern ES6+ standards, and dynamic client architectures.",
    tags: ["Full-Stack", "Frontend", "Node.js"]
  },
  {
    id: "sql",
    name: "SQL",
    category: "languages",
    categoryLabel: "Query Language",
    rarity: "rare",
    icon: "Database",
    minecraftItem: "Lapis Lazuli",
    hotbar: true,
    slot: 5,
    description: "Relational database querying, relational algebra, schema normalization, and complex transactional joins.",
    tags: ["Data", "RDBMS", "Queries"]
  },

  // --- COMPUTER SCIENCE CORE ---
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "cs_core",
    categoryLabel: "Computer Science",
    rarity: "legendary",
    icon: "Binary",
    minecraftItem: "Enchanted Book",
    hotbar: false,
    description: "Deep foundation in trees, graphs, dynamic programming, sorting, searching, and algorithmic complexity.",
    tags: ["Problem Solving", "Complexity", "Algorithms"]
  },
  {
    id: "oop",
    name: "Object-Oriented Programming",
    category: "cs_core",
    categoryLabel: "Computer Science",
    rarity: "epic",
    icon: "Boxes",
    minecraftItem: "Anvil",
    hotbar: false,
    description: "Core paradigms: encapsulation, inheritance, polymorphism, abstraction, and clean architectural design patterns.",
    tags: ["Architecture", "Design Patterns", "Clean Code"]
  },
  {
    id: "os",
    name: "Operating Systems",
    category: "cs_core",
    categoryLabel: "Computer Science",
    rarity: "epic",
    icon: "HardDrive",
    minecraftItem: "Redstone Repeater",
    hotbar: false,
    description: "Process synchronization, multithreading, memory virtual paging, CPU scheduling, and file systems.",
    tags: ["Concurrency", "Kernels", "Systems"]
  },
  {
    id: "dbms",
    name: "DBMS",
    category: "cs_core",
    categoryLabel: "Computer Science",
    rarity: "rare",
    icon: "Server",
    minecraftItem: "Chest",
    hotbar: false,
    description: "Database management system internals, ACID guarantees, indexing (B-trees), concurrency control, and transactions.",
    tags: ["ACID", "Transactions", "Storage"]
  },
  {
    id: "networks",
    name: "Computer Networks",
    category: "cs_core",
    categoryLabel: "Computer Science",
    rarity: "rare",
    icon: "Network",
    minecraftItem: "Observer",
    hotbar: false,
    description: "TCP/IP protocol suite, OSI layers, routing algorithms, socket communication, HTTP/HTTPS, and network security.",
    tags: ["TCP/IP", "Protocols", "Sockets"]
  },

  // --- SOFTWARE ENGINEERING & FULL-STACK ---
  {
    id: "react",
    name: "React",
    category: "software",
    categoryLabel: "Frontend Engineering",
    rarity: "legendary",
    icon: "Atom",
    minecraftItem: "Beacon",
    hotbar: true,
    slot: 6,
    description: "Component lifecycle, modern hooks, state management, responsive UI architectures, and interactive SPAs.",
    tags: ["UI/UX", "Components", "Frontend"]
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "software",
    categoryLabel: "Backend Engineering",
    rarity: "epic",
    icon: "FileCode",
    minecraftItem: "Furnace",
    hotbar: false,
    description: "Event-driven, non-blocking I/O runtime for building scalable server-side applications and microservices.",
    tags: ["Backend", "Runtime", "APIs"]
  },
  {
    id: "mern",
    name: "MERN Stack",
    category: "software",
    categoryLabel: "Full-Stack Development",
    rarity: "legendary",
    icon: "Layers",
    minecraftItem: "Crafting Table",
    hotbar: true,
    slot: 7,
    description: "End-to-end full-stack development synthesizing MongoDB, Express.js, React, and Node.js.",
    tags: ["Full-Stack", "Web Apps", "Integration"]
  },
  {
    id: "rest_apis",
    name: "REST APIs",
    category: "software",
    categoryLabel: "API Architecture",
    rarity: "rare",
    icon: "Share2",
    minecraftItem: "Hopper",
    hotbar: false,
    description: "RESTful architecture, stateless communication, standard HTTP methods, JWT authentication, and JSON serialization.",
    tags: ["Endpoints", "HTTP", "Integration"]
  },
  {
    id: "git_github",
    name: "Git & GitHub",
    category: "software",
    categoryLabel: "Version Control",
    rarity: "epic",
    icon: "GitBranch",
    minecraftItem: "Compass",
    hotbar: false,
    description: "Distributed version control, branching workflows, collaborative pull requests, merge conflict resolution, and CI/CD basics.",
    tags: ["VCS", "Collaboration", "DevOps"]
  },

  // --- DATABASES ---
  {
    id: "mongodb",
    name: "MongoDB",
    category: "databases",
    categoryLabel: "NoSQL Database",
    rarity: "epic",
    icon: "Database",
    minecraftItem: "Slime Block",
    hotbar: false,
    description: "Document-oriented NoSQL storage, schema aggregation pipelines, BSON data modeling, and flexible scaling.",
    tags: ["NoSQL", "Document Store", "MERN"]
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    categoryLabel: "Relational Database",
    rarity: "legendary",
    icon: "Server",
    minecraftItem: "End Crystal",
    hotbar: false,
    description: "Advanced open-source relational database with powerful JSON querying, indexing, and strict ACID compliance.",
    tags: ["RDBMS", "ACID", "Enterprise"]
  },

  // --- AI & COMPUTER VISION ---
  {
    id: "machine_learning",
    name: "Machine Learning",
    category: "ai_ml",
    categoryLabel: "Artificial Intelligence",
    rarity: "legendary",
    icon: "Brain",
    minecraftItem: "Eye of Ender",
    hotbar: true,
    slot: 8,
    description: "Supervised and unsupervised learning, feature extraction, model evaluation metrics, and predictive modeling.",
    tags: ["ML", "Modeling", "Algorithms"]
  },
  {
    id: "computer_vision",
    name: "Computer Vision",
    category: "ai_ml",
    categoryLabel: "AI Subdiscipline",
    rarity: "legendary",
    icon: "Eye",
    minecraftItem: "Spyglass",
    hotbar: true,
    slot: 9,
    description: "Image processing, spatial filtering, object segmentation, feature matching, and real-time detection systems.",
    tags: ["CV", "Detection", "Spatial"]
  },
  {
    id: "yolo",
    name: "YOLO (You Only Look Once)",
    category: "ai_ml",
    categoryLabel: "Object Detection",
    rarity: "legendary",
    icon: "Crosshair",
    minecraftItem: "Bow",
    hotbar: false,
    description: "Real-time single-stage object detection architectures, bounding box regression, anchor boxes, and edge inference.",
    tags: ["Object Detection", "Real-Time", "Edge AI"]
  },
  {
    id: "opencv",
    name: "OpenCV",
    category: "ai_ml",
    categoryLabel: "Vision Library",
    rarity: "epic",
    icon: "Scan",
    minecraftItem: "Prismarine Shard",
    hotbar: false,
    description: "Computer vision toolkit for image transformation, thresholding, contour extraction, video streaming, and filtering.",
    tags: ["Image Processing", "Vision", "Filters"]
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai_ml",
    categoryLabel: "Deep Learning Framework",
    rarity: "legendary",
    icon: "Flame",
    minecraftItem: "Blaze Rod",
    hotbar: false,
    description: "Dynamic computational graphs, tensor calculus, neural network architectures, and custom dataset loaders.",
    tags: ["Deep Learning", "Tensors", "Neural Nets"]
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ai_ml",
    categoryLabel: "Deep Learning Framework",
    rarity: "epic",
    icon: "Cpu",
    minecraftItem: "Glowstone Dust",
    hotbar: false,
    description: "Ecosystem for training and deploying machine learning models, computation graphs, and Keras abstractions.",
    tags: ["Deep Learning", "Keras", "Production"]
  },
  {
    id: "ai_agents",
    name: "AI Agents",
    category: "ai_ml",
    categoryLabel: "Autonomous Systems",
    rarity: "legendary",
    icon: "Bot",
    minecraftItem: "Nether Star",
    hotbar: false,
    description: "Intelligent agent architectures combining input parsing, reasoning loops, tool usage, memory, and goal-directed actions.",
    tags: ["Autonomous", "Reasoning", "Workflows"]
  },

  // --- DEVOPS & TOOLS ---
  {
    id: "fastapi",
    name: "FastAPI",
    category: "devops",
    categoryLabel: "API Framework",
    rarity: "epic",
    icon: "Zap",
    minecraftItem: "Golden Apple",
    hotbar: false,
    description: "Modern high-performance Python web framework for serving machine learning models with asynchronous endpoints.",
    tags: ["Python", "Async", "ML Serving"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    categoryLabel: "Containerization",
    rarity: "epic",
    icon: "Box",
    minecraftItem: "Shulker Box",
    hotbar: false,
    description: "Containerization for consistent deployment environments, Dockerfiles, container isolation, and microservice workflows.",
    tags: ["Containers", "DevOps", "Isolation"]
  }
];
