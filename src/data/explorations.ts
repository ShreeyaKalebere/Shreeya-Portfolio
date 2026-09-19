export type ScrapbookItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  summary: string;
  takeaway: string;
  accent: string;
  tags: string[];
};

export const EXPLORATIONS: ScrapbookItem[] = [
  {
    id: "iitb-techfest",
    title: "IIT Bombay Techfest",
    category: "Technical Exposition",
    location: "IIT Bombay, Mumbai",
    year: "2024",
    summary: "Participated in Asia's largest annual science and technological festival, observing international robotics exhibits, AI demonstrations, and autonomous systems.",
    takeaway: "Directly experienced cutting-edge edge robotics, computer vision applications, and drone telemetry hardware in action.",
    accent: "#4D9DE0",
    tags: ["Techfest", "Robotics", "AI Demos", "Applied Tech"]
  },
  {
    id: "dassault-womens-fest",
    title: "Dassault Systèmes Women's Fest",
    category: "Industry & Engineering Diversity",
    location: "Pune, Maharashtra",
    year: "2024",
    summary: "Selected participant at the Dassault Systèmes technology initiative celebrating women in engineering, CAD, 3D modeling, and software systems.",
    takeaway: "Engaged with senior engineering leads on industrial 3D digital twins, PLM software architectures, and career leadership.",
    accent: "#FF6B9D",
    tags: ["Dassault Systèmes", "3D Modeling", "Women in Tech", "Industrial Systems"]
  },
  {
    id: "baramati-industrial-visit",
    title: "Baramati Industrial & Agri-Tech Visit",
    category: "Industrial Immersion",
    location: "Baramati, Maharashtra",
    year: "2024",
    summary: "Field exploration of automated industrial manufacturing facilities, IoT agricultural telemetry, and large-scale milk and agro-processing plants.",
    takeaway: "Observed real-world PLC automation, industrial sensor networks, and supply-chain quality control in high-throughput factories.",
    accent: "#B7F34A",
    tags: ["Industrial IoT", "Automation", "Factory Telemetry", "Supply Chain"]
  },
  {
    id: "healthcare-mgmt-experience",
    title: "Healthcare Management Project Immersion",
    category: "Applied Domain Systems",
    location: "Kolhapur, Maharashtra",
    year: "2024",
    summary: "Hands-on domain research into hospital patient admission workflows, electronic medical record (EMR) bottlenecks, and diagnostic imaging handoffs.",
    takeaway: "Provided foundational operational insights into clinical data bottlenecks, record interoperability, and automated diagnostic workflows.",
    accent: "#A855F7",
    tags: ["Healthcare IT", "EMR Systems", "Domain Research", "Imaging Workflows"]
  }
];
