# SHREEYA KALEBERE — ENGINEERING PORTFOLIO
> **Software Engineer × AI/ML Engineer × Full Stack**  
> **Academic Standing**: B.Tech in Computer Science & Engineering | D.Y. Patil College of Engineering & Technology  
> **Metrics**: CGPA 9.6 / 10.0 | Department Rank 2nd / 287 students (Top 0.7%) | Class of 2027  
> **Live Website**: [https://shreeyakalebere.vercel.app](https://github.com/ShreeyaKalebere)

---

## ⚡ Overview

A high-performance personal engineering portfolio built for serious technical evaluation across **Software Engineering (SDE)**, **AI/ML**, **Computer Vision**, and **Full-Stack Systems**. Designed with a **Neo-Futurist × Bento Grid × Swiss Typography × Neo-Brutalism** aesthetic, delivering dense information hierarchy, micro-interactions, real system telemetry, and a production-grade backend.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, TypeScript, HTML5
- **Styling Architecture**: Vanilla CSS with curated design tokens, Swiss Bento 12-column layouts, and dark mode foundation (`#0A0A0A` default)
- **Icons**: Lucide React
- **Build Tooling**: Vite 6 with optimized vendor chunking
- **Serverless Backend**: Vercel Serverless Functions (`api/contact.ts`)
- **Transactional Email**: Resend SDK (`resend`) with automated delivery & reply-to routing
- **Deployment Platform**: Vercel (`vercel.json`) with strict security headers

---

## 🏗️ Production Architecture

```
VISITOR (Browser)
       │
       ▼  [Submits Name, Email, Subject, Message]
   Contact Form (Client Validation + Anti-Spam Honeypot)
       │
       ▼  POST /api/contact
Vercel Serverless API (Node.js runtime)
       │
       ├─► 1. Rate Limiting Check (Max 5 requests / 10 min / IP)
       ├─► 2. Honeypot Bot Trap (_gotcha check)
       ├─► 3. Server-Side Validation (RFC regex, length limits)
       ├─► 4. Input Sanitization (Strip HTML tags)
       │
       ▼
   Resend API
       │
       ├─► To: CONTACT_RECEIVER_EMAIL (Shreeya's Inbox)
       │   Reply-To: visitor's email
       │
       └─► To: visitor (Optional auto-acknowledgment)
```

---

## 📁 Repository Structure

```
Shreeya-Portfolio/
├── api/
│   └── contact.ts            # Production Vercel Serverless Function (POST /api/contact)
├── public/
│   ├── favicon.svg           # Custom SVG brand favicon
│   ├── resume.pdf            # Verified official resume PDF
│   └── images/
│       └── profile.jpg       # Authentic professional portrait
├── scripts/
│   └── test-contact-api.js   # Automated API validation & rate-limiting test suite
├── src/
│   ├── components/
│   │   ├── Navbar/           # Brand monograms, section anchors, recruiter mode toggle
│   │   ├── Hero/             # 60/40 Split layout, verified telemetry HUD, photo card
│   │   ├── About/            # 4-card Swiss Bento core philosophy
│   │   ├── Projects/         # Featured builds, dataflow metaphors, case study dossiers
│   │   ├── TechWall/         # Verified toolbelt with interactive project inspector
│   │   ├── AILab/            # Pipeline telemetry HUD & interactive CLI workstation
│   │   ├── Achievements/     # Academic rank, hackathons, and national honors
│   │   ├── Explorations/     # Industrial visits, techfests, and domain field notes
│   │   ├── Education/        # B.Tech CSE timeline & core coursework
│   │   ├── GithubActivity/   # Live GitHub repository telemetry with fallback cache
│   │   ├── Contact/          # Production async contact form with live status states
│   │   ├── Recruiter/        # 30-second recruiter dossier scanner (SDE / AI filters)
│   │   └── Footer/           # Telemetry status, verified channels, PDF resume
│   ├── data/
│   │   ├── profile.ts        # Single source of truth for personal data
│   │   ├── projects.ts       # 6 core active projects with full specifications
│   │   ├── technologies.ts   # Categorized toolbelt items
│   │   ├── achievements.ts   # Verified milestones and awards
│   │   └── explorations.ts   # Field notes & expeditions
│   ├── styles/
│   │   ├── index.css         # Swiss Bento typography, palette tokens, utilities
│   │   └── brutalism.css     # Hard shadows, borders, badges, buttons
│   ├── App.jsx               # Master application coordinator
│   └── main.jsx              # DOM entry point
├── .env.example              # Environment variable documentation template
├── .gitignore                # Safeguards secrets, node_modules, and build output
├── index.html                # SEO metadata, OpenGraph, Twitter cards, Space Grotesk font
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment configuration & security headers
└── vite.config.js            # Vite build configuration with local API dev middleware
```

---

## 🔒 Security & Anti-Spam Measures

1. **Zero Secret Leaks**: No API keys or credentials are built into frontend JavaScript or committed to git.
2. **Honeypot Field**: An invisible field (`_gotcha`) catches automated bots. If populated, the API silently returns `200 OK` without sending emails.
3. **Sliding-Window Rate Limiting**: Restricts submissions to 5 requests per 10-minute window per IP address.
4. **Input Sanitization**: HTML tags and script injections are stripped server-side.
5. **Strict Security Headers** (`vercel.json`):
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` for local development:

```env
# Transactional Email API Key (Obtain free from https://resend.com/)
RESEND_API_KEY=re_your_api_key_here

# Destination email for inquiries
CONTACT_RECEIVER_EMAIL=shreeyakalebere11@gmail.com

# Verified sender email address
EMAIL_FROM_ADDRESS=Portfolio Contact <onboarding@resend.dev>

# Enable/disable auto-reply confirmation to visitors (true / false)
ENABLE_AUTO_REPLY=true
```

> **Note**: If `RESEND_API_KEY` is omitted, the API automatically runs in **simulated mode**, logging inquiries to the console while returning `200 OK` so development and staging remain uninterrupted.

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173/`. Local calls to `/api/contact` are automatically handled by the embedded Vite development API middleware.

### 3. Run Automated API Tests
```bash
node scripts/test-contact-api.js
```
Runs 5 automated validation tests against the local endpoint (valid payload, missing fields, invalid email format, minimum message length, and honeypot bot trap).

### 4. Build for Production
```bash
npm run build
```
Generates production assets in `dist/`.

---

## 🌐 Vercel Deployment Instructions

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Production release with serverless contact API"
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/):
   - Click **Add New Project** and select your GitHub repository.
   - Framework Preset: **Vite**
   - Root Directory: `./`
3. Under **Environment Variables**, add:
   - `RESEND_API_KEY` = your Resend API key
   - `CONTACT_RECEIVER_EMAIL` = `shreeyakalebere11@gmail.com`
   - `EMAIL_FROM_ADDRESS` = `Portfolio Contact <onboarding@resend.dev>` (or your custom domain)
   - `ENABLE_AUTO_REPLY` = `true`
4. Click **Deploy**. Vercel will automatically compile the frontend into `dist/` and mount `/api/contact.ts` as a serverless function.

---

## 📄 License
MIT © Shreeya Kalebere
