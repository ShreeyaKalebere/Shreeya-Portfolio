export type Achievement = {
  id: string;
  title: string;
  badge: string;
  category: string;
  description: string;
  details: string;
  accent: string;
  iconType: "trophy" | "award" | "sparkles" | "users" | "satellite" | "book";
  unlockedStatus: string;
  voxelIcon?: string;
  shortDescription?: string;
  status?: string;
  rarity?: string;
  xp?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "academic-standing",
    title: "Department Rank 2 / 287 Students",
    badge: "Top 0.7% • CGPA 9.6 / 10",
    category: "Academic Excellence",
    description: "Ranked 2nd among 287 students in the Computer Science & Engineering department across rigorous semesters.",
    details: "Consistent top-tier academic performance across fundamental coursework including Data Structures, Algorithms, Operating Systems, DBMS, and Mathematics.",
    accent: "#B7F34A",
    iconType: "trophy",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // RANK 2ND",
    voxelIcon: "Trophy",
    shortDescription: "Ranked 2nd among 287 students in the Computer Science & Engineering department across rigorous semesters.",
    status: "QUEST COMPLETED",
    rarity: "legendary",
    xp: "+1000 XP"
  },
  {
    id: "anvation-hackathon-2026",
    title: "ANVATION 2026 — 1st Prize Winner",
    badge: "1st Prize (₹25,000) • AI/ML Track",
    category: "Hackathon & Prototyping",
    description: "Championed 1st Prize among competitive engineering teams in the 24-hour national ANVATION 2026 Hackathon organized by K. S. School of Engineering and Management, Bengaluru (8–9 October 2026).",
    details: "Engineered and pitched an end-to-end Artificial Intelligence & Machine Learning solution within a high-intensity 24-hour hackathon, evaluated on algorithmic robustness, innovation, and real-time execution.",
    accent: "#FFD83D",
    iconType: "trophy",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // 1ST PRIZE (₹25K)",
    voxelIcon: "Trophy",
    shortDescription: "Secured 1st Prize (₹25,000) in the 24-hour national AI/ML Hackathon at KSSEM, Bengaluru.",
    status: "QUEST COMPLETED",
    rarity: "legendary",
    xp: "+1500 XP"
  },
  {
    id: "triwizathon-best-ui",
    title: "Triwizathon — Best UI/UX Design",
    badge: "Best UI/UX Award • 3rd Prize",
    category: "Hackathon & Prototyping",
    description: "Awarded Best UI/UX Design (3rd Prize) in Triwizathon for 'Sahi Supply', an interactive 3D logistics and supply-chain web experience built with Three.js and custom Blender models.",
    details: "Modeled custom 3D spatial logistics assets in Blender and implemented interactive WebGL rendering pipelines using Three.js, delivering high-fidelity interactive user experiences.",
    accent: "#A855F7",
    iconType: "sparkles",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // BEST UI/UX DESIGN",
    voxelIcon: "Sparkles",
    shortDescription: "Won Best UI/UX Design in Triwizathon for Sahi Supply, combining custom Blender 3D models with interactive Three.js WebGL.",
    status: "QUEST COMPLETED",
    rarity: "legendary",
    xp: "+800 XP"
  },
  {
    id: "tech-hunt-runnerup",
    title: "Tech Hunt — 2nd Runner-up",
    badge: "2nd Runner-up • Technical Challenge",
    category: "Hackathon & Prototyping",
    description: "Secured 2nd Runner-up across a multi-stage technical competition evaluating quantitative aptitude, core computer science / coding MCQs, and rapid algorithmic technical hunt rounds.",
    details: "Cleared rigorous Round 1 evaluating quantitative aptitude and core programming MCQs, advancing to Round 2 technical hunt requiring rapid algorithmic problem solving and deductive debugging.",
    accent: "#38BDF8",
    iconType: "award",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // 2ND RUNNER-UP",
    voxelIcon: "Award",
    shortDescription: "Secured 2nd Runner-up in Tech Hunt across multi-tier aptitude, coding MCQs, and technical hunt problem-solving rounds.",
    status: "QUEST COMPLETED",
    rarity: "legendary",
    xp: "+600 XP"
  },
  {
    id: "eureka-hackathon",
    title: "Eureka Hackathon",
    badge: "3rd Prize Winner",
    category: "Hackathon & Prototyping",
    description: "Secured 3rd Prize in the competitive Eureka Hackathon, designing and pitching an innovative technological solution under time constraints.",
    details: "Collaborated with engineering peers to ideate, prototype, and defend an applied technical solution evaluated on feasibility, implementation quality, and presentation clarity.",
    accent: "#FFD83D",
    iconType: "trophy",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // 3RD PRIZE",
    voxelIcon: "Trophy",
    shortDescription: "Secured 3rd Prize in the competitive Eureka Hackathon, designing and pitching an innovative technological solution under time constraints.",
    status: "QUEST COMPLETED",
    rarity: "legendary",
    xp: "+500 XP"
  },
  {
    id: "ntse-national",
    title: "National Talent Search Examination (NTSE)",
    badge: "Level 1 & Level 2 Qualified",
    category: "National Scholarship",
    description: "Successfully qualified both Stage 1 and Stage 2 of India's prestigious National Talent Search Examination.",
    details: "Nationally recognized scholarship program identifying high-aptitude students across India through rigorous Mental Ability Tests (MAT) and Scholastic Aptitude Tests (SAT).",
    accent: "#4D9DE0",
    iconType: "award",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // NTSE QUALIFIED",
    voxelIcon: "Award",
    shortDescription: "Successfully qualified both Stage 1 and Stage 2 of India's prestigious National Talent Search Examination.",
    status: "QUEST COMPLETED",
    rarity: "legendary",
    xp: "+750 XP"
  },
  {
    id: "sof-imo-olympiad",
    title: "SOF / IMO Olympiads",
    badge: "Merit Distinction",
    category: "Mathematics & Science",
    description: "Achieved distinction standings across Science Olympiad Foundation (SOF) and International Mathematics Olympiad (IMO) examinations.",
    details: "Demonstrated early mastery in advanced logical reasoning, proof construction, and quantitative problem-solving.",
    accent: "#FF6B9D",
    iconType: "sparkles",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // MERIT",
    voxelIcon: "Sparkles",
    shortDescription: "Achieved distinction standings across Science Olympiad Foundation (SOF) and International Mathematics Olympiad (IMO) examinations.",
    status: "QUEST COMPLETED",
    rarity: "rare",
    xp: "+300 XP"
  },
  {
    id: "sih-participation",
    title: "Smart India Hackathon (SIH)",
    badge: "National Hackathon Competitor",
    category: "National Innovation",
    description: "Participated in the premier Smart India Hackathon nationwide initiative solving problem statements presented by government ministries.",
    details: "Engineered collaborative technical prototypes addressing national challenges with multidisciplinary engineering workflows.",
    accent: "#A855F7",
    iconType: "award",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // COMPETITOR",
    voxelIcon: "Award",
    shortDescription: "Participated in the premier Smart India Hackathon nationwide initiative solving problem statements presented by government ministries.",
    status: "QUEST COMPLETED",
    rarity: "rare",
    xp: "+400 XP"
  },
  {
    id: "isro-certification",
    title: "ISRO Certification Program",
    badge: "Climate & Aerosols",
    category: "Space Science & Remote Sensing",
    description: "Completed specialized certification with the Indian Space Research Organisation (ISRO) on Climate Change and Aerosol Management.",
    details: "Gained foundational insights into satellite remote sensing, atmospheric aerosol optical depth (AOD), and environmental satellite telemetry.",
    accent: "#4D9DE0",
    iconType: "satellite",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // CERTIFIED",
    voxelIcon: "Satellite",
    shortDescription: "Completed specialized certification with the Indian Space Research Organisation (ISRO) on Climate Change and Aerosol Management.",
    status: "QUEST COMPLETED",
    rarity: "rare",
    xp: "+350 XP"
  },
  {
    id: "class-representative",
    title: "Class Representative",
    badge: "Student Leadership",
    category: "Leadership & Cohort Liaison",
    description: "Elected Class Representative serving as the primary academic liaison for a cohort of 60+ Computer Science Engineering students.",
    details: "Coordinates academic schedules, bridges student feedback with department faculty, leads collaborative study groups, and organizes technical seminars.",
    accent: "#B7F34A",
    iconType: "users",
    unlockedStatus: "ACHIEVEMENT UNLOCKED // LEADERSHIP",
    voxelIcon: "Users",
    shortDescription: "Elected Class Representative serving as the primary academic liaison for a cohort of 60+ Computer Science Engineering students.",
    status: "QUEST COMPLETED",
    rarity: "rare",
    xp: "+250 XP"
  }
];
