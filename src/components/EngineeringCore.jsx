import React from 'react';
import { 
  Binary, 
  HardDrive, 
  Database, 
  Layers, 
  GitBranch, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Inventory from './Inventory';

const BUILDINGS = [
  {
    id: 'algo-lab',
    code: 'FACILITY // 01',
    title: 'ALGORITHM LAB',
    icon: Binary,
    role: 'Data structures, algorithmic efficiency & computational complexity',
    specs: [
      'Languages: C++, Java, Python problem solving',
      'Structures: Trees, Graphs, Dynamic Programming & Arrays',
      'Analysis: Asymptotic Time & Space Optimization (Big-O)'
    ],
    tags: ['DSA', 'C++', 'Java', 'Python', 'Algorithms']
  },
  {
    id: 'systems-center',
    code: 'FACILITY // 02',
    title: 'SYSTEMS CENTER',
    icon: HardDrive,
    role: 'Operating systems, network protocols & systems concurrency',
    specs: [
      'OS Core: Process Scheduling, Paging & Virtual Memory',
      'Networking: TCP/IP Suite, Sockets & Network Security',
      'Concurrency: Multithreading, Mutex & Deadlock Handling'
    ],
    tags: ['Operating Systems', 'Networks', 'Concurrency', 'Protocols']
  },
  {
    id: 'database-vault',
    code: 'FACILITY // 03',
    title: 'DATABASE VAULT',
    icon: Database,
    role: 'Relational schemas, NoSQL document stores & transactional integrity',
    specs: [
      'Storage: PostgreSQL, MongoDB & Relational SQL',
      'Schema Design: Normalization (1NF–3NF) & B-Tree Indexing',
      'Guarantees: Strict ACID Compliance & Efficient Joins'
    ],
    tags: ['PostgreSQL', 'MongoDB', 'SQL', 'ACID']
  },
  {
    id: 'fullstack-factory',
    code: 'FACILITY // 04',
    title: 'FULL-STACK FACTORY',
    icon: Layers,
    role: 'End-to-end web engineering, reactive UI & asynchronous APIs',
    specs: [
      'Frontend: React Component Architecture & State Management',
      'Backend: Node.js, Express & Stateless RESTful Services',
      'Integration: Full MERN Stack & Asynchronous Event Loop'
    ],
    tags: ['React', 'Node.js', 'Express', 'MERN', 'REST APIs']
  },
  {
    id: 'dev-hub',
    code: 'FACILITY // 05',
    title: 'DEVELOPMENT HUB',
    icon: GitBranch,
    role: 'Modern toolchains, containerization & collaborative workflows',
    specs: [
      'VCS: Git & GitHub Distributed Version Control',
      'Containers: Docker Containerization & Service Isolation',
      'APIs: FastAPI Python Framework & Clean Code Design'
    ],
    tags: ['Git', 'GitHub', 'Docker', 'FastAPI', 'OOP']
  }
];

export default function EngineeringCore() {
  return (
    <section id="engineering" className="engineering-section" aria-label="Software Engineering District">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>DISTRICT // ENGINEERING CORE</span>
          </div>
          <h2 className="section-title">SOFTWARE ENGINEERING CORE</h2>
          <p className="section-subtitle">
            Core computer science competencies, algorithmic problem solving, modern full-stack development, and database architecture.
          </p>
        </div>

        {/* 5 District Buildings */}
        <div className="district-buildings-grid" role="list" aria-label="Engineering District Buildings">
          {BUILDINGS.map((building) => {
            const Icon = building.icon;
            return (
              <div key={building.id} className="district-building-card cyber-corners" role="listitem">
                <div>
                  <div className="building-top-bar">
                    <span className="building-code">{building.code}</span>
                    <span className="building-status">● VERIFIED</span>
                  </div>

                  <div className="building-header">
                    <div className="building-icon-box">
                      <Icon size={20} />
                    </div>
                    <h3 className="building-title">{building.title}</h3>
                  </div>

                  <div className="building-role">{building.role}</div>

                  <ul className="building-specs-list">
                    {building.specs.map((spec, i) => (
                      <li key={i} className="building-spec-item">
                        <span className="building-spec-dot">▸</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="building-tags">
                  {building.tags.map((tag, i) => (
                    <span key={i} className="building-tag">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Minecraft Technical Inventory */}
        <Inventory />
      </div>
    </section>
  );
}
