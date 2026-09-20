# Abhishek Kumar — Portfolio

A premium, recruiter-friendly personal developer portfolio built with **React + Vite + Tailwind CSS v4**, strictly adhering to the 42 rules defined in the "Personal Portfolio Website — Complete Development Prompt" specification.

## Quick Start

```bash
npm install
npm run dev       # start Vite dev server
npm run build     # production build to /dist
npm run preview   # preview production bundle locally
```

## Technology Stack

- **React 18** + **Vite 5** + **JavaScript (JSX)**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — smooth micro-interactions (respects `prefers-reduced-motion`)
- **Lucide React** — clean developer iconography
- **React Router** — client-side routing (Home, Project Case Studies `/project/:id`, 404)

## Architecture & File Structure

```
src/
├── data/
│   ├── profile.js           # Identity, bio, stats, services, social links, GitHub fallback
│   ├── projects.js          # Project cards & 9-step case study content (PharmaPlus, Campus Connect, etc.)
│   ├── skills.js            # Categorized skills (Languages, Frontend, Backend, Databases, AI, Tools)
│   ├── experience.js        # BEL internship details & 202X tree timeline
│   ├── education.js         # B.Tech CSE & relevant coursework
│   └── achievements.js      # Verified certifications and achievements
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Hero, QuickStats, About, Skills, Experience, Projects,
│   │                        # GitHubSection, Education, Achievements, Services, ResumeCTA, Contact
│   └── ui/                  # ProjectCard, ProjectModal, CommandPalette, LoadingScreen
├── pages/
│   ├── Home.jsx             # Ordered homepage structure matching Section 37
│   ├── ProjectDetails.jsx   # Dedicated 9-step case study view with architecture topology
│   └── NotFound.jsx         # Custom developer 404 page
├── hooks/
│   └── useScrollSpy.js      # Active section detection
├── utils/
│   └── helpers.js           # Placeholder validation and title formatting
public/                      # resume.pdf, robots.txt, sitemap.xml, og-image.png, favicon.svg
vercel.json / _redirects     # SPA rewrite rules for production deployment
```

## Editing & Customizing Content

All portfolio information is editable from the `src/data/` files without modifying UI components:

- `src/data/profile.js`: Update your name, contact info, bio, and social URLs.
- `src/data/projects.js`: Add or modify projects, live URLs, GitHub repositories, and 9-step case studies.
- `src/data/skills.js`: Add or reorder technical skills across categories.
- `src/data/experience.js`: Update internship and work experience details.
- `src/data/education.js`: Update graduation years and coursework.
- `src/data/achievements.js`: Add verified awards and certifications (empty state shown by default).

## Resume PDF

The resume PDF is located at **`public/resume.pdf`**. Replace this placeholder file with your actual resume PDF when ready to deploy.

## Deployment (Vercel / Netlify)

1. **Vercel**: Deploy directly by importing the GitHub repository. Build command: `npm run build`, Output directory: `dist`. Single-page rewrites are pre-configured in `vercel.json`.
2. **Netlify**: Deploy using `dist` directory. Redirect rules are pre-configured in `public/_redirects`.
