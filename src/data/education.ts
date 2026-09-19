export type EducationTimelineNode = {
  year: string;
  milestone: string;
  institution: string;
  status: string;
  details: string;
  accent: string;
};

export const EDUCATION_TIMELINE: EducationTimelineNode[] = [
  {
    year: "2023",
    milestone: "Commenced B.Tech in Computer Science & Engineering",
    institution: "D.Y. Patil College of Engineering & Technology",
    status: "ENROLLED",
    details: "Initiated undergraduate engineering journey with a focus on fundamental computing, programming paradigms, and mathematics.",
    accent: "#4D9DE0"
  },
  {
    year: "2024",
    milestone: "CS Core Foundations & Algorithmic Specialization",
    institution: "D.Y. Patil College of Engineering & Technology",
    status: "COMPLETED",
    details: "Mastered Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Discrete Mathematics, and Computer Architecture.",
    accent: "#B7F34A"
  },
  {
    year: "2025",
    milestone: "Systems, Databases & Machine Learning Immersion",
    institution: "D.Y. Patil College of Engineering & Technology",
    status: "COMPLETED",
    details: "Completed Operating Systems, Database Management Systems, Computer Networks, and applied Machine Learning / Computer Vision pipelines.",
    accent: "#FFD83D"
  },
  {
    year: "2026",
    milestone: "7th Semester & Advanced Intelligent Systems",
    institution: "D.Y. Patil College of Engineering & Technology",
    status: "IN PROGRESS (7th SEM)",
    details: "Maintaining 9.6 / 10 CGPA (Rank 2nd among 287 students). Leading autonomous agent architectures, computer vision research, and full-stack projects.",
    accent: "#A855F7"
  },
  {
    year: "2027",
    milestone: "Expected Graduation (B.Tech CSE)",
    institution: "D.Y. Patil College of Engineering & Technology",
    status: "EXPECTED DEGREE CONFERRAL",
    details: "Completion of Bachelor of Technology in Computer Science & Engineering with distinction standing.",
    accent: "#B7F34A"
  }
];

export const COURSEWORK_MODULES = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Database Management Systems",
  "Machine Learning & AI",
  "Computer Vision & Image Processing",
  "Object-Oriented Programming",
  "Full-Stack Web Development",
  "Computer Networks",
  "Network Security",
  "Robotics & Embedded Systems"
];

export const EDUCATION_DATA = {
  degree: "Bachelor of Technology (B.Tech)",
  major: "Computer Science & Engineering",
  institution: "D.Y. Patil College of Engineering and Technology",
  location: "Maharashtra, India",
  cgpa: "9.6 / 10",
  academicStanding: "Rank 2nd among 287 students (Top 0.7%)",
  graduationYear: "2027",
  status: "In Progress",
  coursework: COURSEWORK_MODULES.map((name, i) => ({
    name,
    code: `CS-${i + 1}`,
    focus: name,
    mastery: "Core Competency"
  }))
};

