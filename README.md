<div align="center">

# ⚡ Abhishek Kumar — Developer Portfolio & Dashboard

<p align="center">
  <strong>Full-Stack Engineer • MERN Stack Architect • AI/GenAI Enthusiast</strong>
</p>

<p align="center">
  <a href="https://github.com/Abhishek526-star/Portfolio"><img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://github.com/Abhishek526-star/Portfolio"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a>
  <a href="https://github.com/Abhishek526-star/Portfolio"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://github.com/Abhishek526-star/Portfolio"><img src="https://img.shields.io/badge/Node.js-Nodemailer-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="https://github.com/Abhishek526-star/Portfolio"><img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-interactive-developer-dashboard">Developer Dashboard</a> •
  <a href="#-featured-projects">Featured Projects</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-backend--gmail-smtp">Backend & Email</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

</div>

## 🌟 Overview

A modern, high-performance developer portfolio and **Interactive Engineering Dashboard** built for technical recruiters, engineering leaders, and collaborators. Engineered with zero placeholder fluff, grounded in real production applications, verified algorithmic competencies, live GitHub activity, and a secure serverless backend.

---

## ✨ Key Features

- 📊 **Interactive Developer Dashboard**:
  - **Live GitHub Sync**: Real-time repository insights and dynamic programming language breakdown (JavaScript, CSS, Python, C++, HTML).
  - **Multi-Platform DSA Progress Chart**: Verified problem solving metrics across **Striver's A2Z DSA Sheet** (153/1111), **LeetCode** (266 solved via live sync), and **GeeksforGeeks** (120 solved).
  - **Engineering Roadmap**: Verified milestones across MERN architectures, Generative AI agents, and 3D web visualizations.
- 🎨 **Rich Modern Aesthetics & Physics**:
  - **Interactive Particle Background**: Floating ambient canvas particles that react to cursor movement and viewport dynamics.
  - **3D Perspective Tilt Cards**: Physics-based gyro/mouse tilt using `framer-motion`.
  - **Sleek Dark / Light Theme**: Seamless CSS custom variable design system with persistent state.
- ⌨️ **Quick Command Palette (`Ctrl + K` / `Cmd + K`)**:
  - Instant spotlight search for quick navigation to projects, case studies, social profiles, and sections.
- 📬 **Secure Node.js & Nodemailer Backend**:
  - Direct **Gmail SMTP** serverless delivery (`/api/contact`) sending inquiries directly to inbox with client reply-to routing and honeypot spam protection.
- 📈 **Live View Counter**:
  - Dynamic visitor counter with ease-out number count-up animation and privacy-first local storage caching.
- 📱 **100% Responsive & Accessible**:
  - Optimized for desktop, tablet, and mobile screens with touch-friendly pill capsule navigation docks.

---

## 📊 Interactive Developer Dashboard

The portfolio features a dedicated, production-grade **Developer Dashboard** divided into 4 interactive tabs:

```
┌────────────────────────────────────────────────────────────────────────┐
│  [ Overview ]  [ GitHub & Repos ]  [ DSA Practice ]  [ Focus Roadmap ] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  • Public Repos: 15+                  • Production Web Apps: 5+        │
│  • Striver DSA Progress: 153 / 1111   • BEL Industrial Internship      │
│                                                                        │
│  • GitHub Language Breakdown (Live % calculation across repos)         │
│  • Multi-Tier Difficulty Rings: Easy (74) | Medium (53) | Hard (26)    │
│  • Platform Switchers: Striver's Sheet | LeetCode | GeeksforGeeks      │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Featured Projects

| Project | Tech Stack | Highlights | Links |
| :--- | :--- | :--- | :--- |
| **PharmaPlus** | `React`, `Node.js`, `Express`, `MongoDB`, `Gemini AI` | Full-stack pharmacy management with automated stock tracking & Gemini AI medicine recognition. | [Live Demo](https://pharmaplus-frontend.vercel.app/) • [Source](https://github.com/Abhishek526-star/Pharma-Plus) |
| **Campus Connect** | `React 19`, `Socket.IO`, `Redux Toolkit`, `Express 5` | Centralized campus ecosystem with real-time room chats and dynamic QR attendance scanning. | [Live Demo](https://campus-connect-client-yoxc.vercel.app/) • [Source](https://github.com/Abhishek526-star/Campus-Connect) |
| **Accenture Ready** | `React`, `Vite`, `Tailwind`, `Monaco Editor` | Recruitment assessment engine with in-browser code compiler simulation & DSA patterns. | [Live Demo](https://accenturemind.vercel.app/) • [Source](https://github.com/Abhishek526-star/Accenture-Ready) |
| **Expense Tracker** | `React`, `Node.js`, `Express`, `MongoDB`, `JWT` | Personal finance tracker with categorical breakdowns, charts, and MongoDB aggregation pipelines. | [Live Demo](https://expense-manager-frontend-9wjd.onrender.com/) • [Source](https://github.com/Abhishek526-star/Expense-Manager) |
| **Tic Tac Toe** | `HTML5`, `CSS3`, `JavaScript`, `Audio API` | Interactive two-player & AI game with win-condition algorithms, score tracking & sound effects. | [Live Demo](https://abhishek526-star.github.io/Tic-Tac-Toe-/) • [Source](https://github.com/Abhishek526-star/Tic-Tac-Toe-) |

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, Vite 5, JavaScript (ESNext)
- **Styling**: Vanilla CSS Variables Design System + Tailwind CSS v4
- **Motion & Interactions**: Framer Motion, HTML5 Canvas 2D
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6) with deep-linked case studies
- **Backend & Serverless**: Node.js, Nodemailer (Gmail SMTP:465)
- **Deployment**: Vercel Edge & Serverless Functions

---

## 📁 Repository Structure

```
Portfolio/
├── api/
│   └── contact.js               # Serverless Gmail SMTP handler (Nodemailer)
├── public/
│   ├── PharmaPlus.png           # Project screenshots
│   ├── Campus Connect.png
│   ├── AccenturReady.png
│   ├── ExpenseTracker.png
│   ├── Tic tac toe.png
│   ├── resume.pdf               # Verified resume document
│   ├── robots.txt & sitemap.xml # SEO configuration
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/              # Navbar (dock pill), Footer
│   │   ├── sections/            # Hero, About, Skills, Experience, Projects,
│   │   │                        # DeveloperDashboard, Education, Contact
│   │   └── ui/                  # DsaInteractiveChart, ProjectCard, ProjectModal,
│   │                            # CommandPalette, GlobalBubblesCanvas, TiltCard
│   ├── data/
│   │   ├── profile.js           # Identity, socials, bio
│   │   ├── dashboard.js         # Verified stats, LeetCode, Striver, milestones
│   │   ├── projects.js          # Detailed project specifications & case studies
│   │   └── skills.js            # Categorized skills matrix
│   ├── hooks/                   # useScrollSpy, useViewCount, useCountUp
│   └── main.jsx                 # App root mounting
├── vercel.json                  # Production SPA & /api serverless routing
└── vite.config.js               # Vite config with local /api/contact dev middleware
```

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Abhishek526-star/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Gmail credentials for the contact form:
```env
GMAIL_USER=abhishekkumar63871@gmail.com
GMAIL_APP_PASS=your_16_digit_app_password
```

### 4. Run development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📬 Backend & Gmail SMTP

The contact form is powered by a serverless backend ([`api/contact.js`](api/contact.js)) using **Nodemailer**:
1. When a visitor submits a message, the client posts to `/api/contact`.
2. In local development, [`vite.config.js`](vite.config.js) dev middleware processes the request.
3. In production on Vercel, the function runs on Vercel's serverless infrastructure.
4. Emails are delivered via SSL (`smtp.gmail.com:465`) with the visitor's email set as `replyTo`.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Sign in to **[Vercel](https://vercel.com/)** and import this repository.
3. In **Settings ➜ Environment Variables**, add:
   - `GMAIL_USER`
   - `GMAIL_APP_PASS`
4. Click **Deploy**. Vercel will automatically build the React bundle and deploy `/api/contact` as a serverless function!

---

<div align="center">
  <p>Designed and engineered by <strong>Abhishek Kumar</strong></p>
  <p>
    <a href="https://github.com/Abhishek526-star">GitHub</a> •
    <a href="https://www.linkedin.com/in/abhishek-kumar-521446294/">LinkedIn</a> •
    <a href="https://leetcode.com/u/Abhishek_2k4/">LeetCode</a>
  </p>
</div>
