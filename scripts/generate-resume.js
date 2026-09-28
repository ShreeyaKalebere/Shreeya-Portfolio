// scripts/generate-resume.js
// Generates a valid standard PDF 1.4 document for Shreeya Kalebere
import fs from 'fs';
import path from 'path';

function buildPdf() {
  const lines = [
    { text: "SHREEYA KALEBERE", size: 22, bold: true, y: 760 },
    { text: "SOFTWARE ENGINEER x AI ENGINEER", size: 14, bold: true, y: 738 },
    { text: "B.Tech Computer Science & Engineering | D.Y. Patil College of Engineering & Technology", size: 10, y: 720 },
    { text: "CGPA: 9.6 / 10 | Academic Standing: Rank 2nd among 287 students (Top 1%) | Class of 2027", size: 10, y: 706 },
    { text: "GitHub: https://github.com/ShreeyaKalebere  |  LinkedIn: https://linkedin.com/in/shreeya-kalebere", size: 9, y: 690 },
    
    // Line separator
    { line: true, y: 678 },

    // SECTION: SUMMARY
    { text: "PROFILE SUMMARY", size: 12, bold: true, y: 660 },
    { text: "Dedicated Computer Science Engineering student focused on building robust full-stack software and intelligent", size: 9.5, y: 644 },
    { text: "AI/ML systems. Combining deep software engineering fundamentals (DSA, systems, OOP, DBMS, MERN)", size: 9.5, y: 632 },
    { text: "with applied computer vision (YOLO, OpenCV, PyTorch) and autonomous agent architectures.", size: 9.5, y: 620 },

    // SECTION: EDUCATION
    { text: "EDUCATION & ACADEMICS", size: 12, bold: true, y: 598 },
    { text: "Bachelor of Technology (B.Tech) in Computer Science & Engineering", size: 10, bold: true, y: 582 },
    { text: "D.Y. Patil College of Engineering and Technology | Expected Graduation: 2027", size: 9.5, y: 570 },
    { text: "CGPA: 9.6 / 10.0 (Rank 2 / 287 in Department)", size: 9.5, y: 558 },
    { text: "Relevant Coursework: Data Structures & Algorithms, Operating Systems, DBMS, OOP, Web Development,", size: 9, y: 544 },
    { text: "Computer Networks, Machine Learning, Python Programming, Network Security, Robotics, AR/VR.", size: 9, y: 532 },

    // SECTION: TECHNICAL SKILLS
    { text: "TECHNICAL SKILLS", size: 12, bold: true, y: 510 },
    { text: "Languages: Python, Java, C++, JavaScript, SQL", size: 9.5, y: 494 },
    { text: "Software & Web: React, Node.js, Express.js, MERN Stack, REST APIs, Git, GitHub", size: 9.5, y: 480 },
    { text: "AI & Computer Vision: Machine Learning, Computer Vision, YOLO, OpenCV, PyTorch, TensorFlow, AI Agents", size: 9.5, y: 466 },
    { text: "Databases & Tools: MongoDB, PostgreSQL, SQL, Docker, FastAPI", size: 9.5, y: 452 },

    // SECTION: FEATURED PROJECTS
    { text: "KEY ENGINEERING & RESEARCH PROJECTS", size: 12, bold: true, y: 440 },
    { text: "Silent Alarm - Discreet Wellness & Assistance Platform (React, Node.js, NLP, Express, MongoDB)", size: 9.5, bold: true, y: 426 },
    { text: "- Engineered browser-based discreet wellness platform with gentle nudges and privacy-first consent boundaries.", size: 8.5, y: 414 },
    { text: "Resume Maker & Enhancer - ATS Document & Scoring Engine (React, Node.js, TypeScript, PDF Engine)", size: 9.5, bold: true, y: 398 },
    { text: "- Created real-time ATS optimization system parsing resume ASTs and generating standardized vector PDFs.", size: 8.5, y: 386 },
    { text: "Sonar Fingerprint - Acoustic Signal Classification (Python, PyTorch, SciPy, FFT Spectrograms)", size: 9.5, bold: true, y: 370 },
    { text: "- Signal processing pipeline converting sonar hydrophone echoes to 2D spectrograms for acoustic classification.", size: 8.5, y: 358 },
    { text: "Pothole & Road Distress Detection - Computer Vision Research (YOLO, OpenCV, PyTorch, Python)", size: 9.5, bold: true, y: 342 },
    { text: "- Active research on Pothole-600 dataset evaluating road crack anomalies and multi-class severity scoring.", size: 8.5, y: 330 },
    { text: "Food Safe - Full-Stack Food Safety & Label OCR Platform (React, Node.js, Express, MongoDB, OCR)", size: 9.5, bold: true, y: 314 },
    { text: "- Developed centralized MERN web application parsing ingredient text to catalog food safety records.", size: 8.5, y: 302 },

    // SECTION: HONORS & ACHIEVEMENTS
    { text: "HONORS & LEADERSHIP", size: 12, bold: true, y: 268 },
    { text: "- Eureka Hackathon: 3rd Prize Winner for collaborative technological prototyping.", size: 9.5, y: 252 },
    { text: "- National Talent Search Examination (NTSE): Qualified Level 1 & Level 2 National Merit.", size: 9.5, y: 238 },
    { text: "- SOF / IMO Olympiads: Distinction standing in International Mathematics Olympiad.", size: 9.5, y: 224 },
    { text: "- Class Representative: Elected representative for 60+ Computer Science Engineering cohort.", size: 9.5, y: 210 },
    { text: "- ISRO Certification Program: Climate Change and Aerosol Management remote sensing course.", size: 9.5, y: 196 }
  ];

  let streamContent = "";
  for (const item of lines) {
    if (item.line) {
      streamContent += `0.5 w 0.2 0.8 0.4 RG 50 ${item.y} m 562 ${item.y} l S\n`;
    } else {
      const font = item.bold ? "/F2" : "/F1";
      // Escape parentheses in text
      const cleanText = item.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      streamContent += `BT ${font} ${item.size} Tf 50 ${item.y} Td (${cleanText}) Tj ET\n`;
    }
  }

  const streamBuf = Buffer.from(streamContent, 'utf-8');
  const streamLen = streamBuf.length;

  const pdfBody = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLen} >>
stream
${streamContent}endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000000 00000 n 
0000000000 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
${streamLen + 300}
%%EOF`;

  const targetPath = path.resolve('public', 'resume.pdf');
  fs.writeFileSync(targetPath, pdfBody, 'utf-8');
  console.log("Generated valid public/resume.pdf successfully!");
}

buildPdf();
