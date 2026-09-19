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
