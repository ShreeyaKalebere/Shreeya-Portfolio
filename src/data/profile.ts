export type Profile = {
  name: string;
  location: string;
  degree: string;
  college: string;
  institution: string;
  graduationYear: string;
  expectedGraduation: string;
  cgpa: string;
  academicRank: string;
  semester: string;
  primaryRole: string;
  tagline: string;
  headline: string;
  subline: string;
  status: string;
  email: string;
  hasRealEmail: boolean;
  resumeUrl: string;
  avatar: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export const PROFILE: Profile = {
  name: "SHREEYA KALEBERE",
  location: "Maharashtra, India",
  degree: "B.Tech in Computer Science & Engineering",
  college: "D.Y. Patil College of Engineering & Technology",
  institution: "D.Y. Patil College of Engineering & Technology",
  graduationYear: "2027",
  expectedGraduation: "2027",
  cgpa: "9.6 / 10",
  academicRank: "Rank 2 / 287 students (Top 0.7%)",
  semester: "7th Semester",
  primaryRole: "SOFTWARE ENGINEER × AI ENGINEER",
  tagline: "I BUILD SYSTEMS. I EXPLORE INTELLIGENCE.",
  headline: "I BUILD SYSTEMS. I EXPLORE INTELLIGENCE.",
  subline: "From full-stack applications to computer vision and AI systems, I enjoy turning complex problems into software that works.",
  status: "OPEN TO OPPORTUNITIES",
  email: "shreeyakalebere11@gmail.com",
  hasRealEmail: true,
  resumeUrl: "/resume.pdf",
  avatar: "/images/profile.jpg",
  photoUrl: "/images/profile.jpg",
  github: "https://github.com/ShreeyaKalebere",
  linkedin: "https://linkedin.com/in/shreeya-kalebere",
  social: {
    github: "https://github.com/ShreeyaKalebere",
    linkedin: "https://linkedin.com/in/shreeya-kalebere",
    email: "shreeyakalebere11@gmail.com"
  }
};
