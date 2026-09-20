export const projects = [
  {
    id: 'pharmaplus',
    category: 'MERN',
    title: 'PharmaPlus — Pharmacy Management System',
    shortDescription:
      'A full-stack pharmacy management platform that allows users to browse medicines, manage prescriptions, place orders, and provides administrators with inventory and order management capabilities.',
    problem:
      'Pharmacies struggle with fragmented inventory tracking, manual prescription verification, and slow turnaround times, while customers face friction ordering verified medications.',
    research:
      'Analyzed community pharmacy workflows, regulatory prescription retention rules, and customer drop-off points during online medicine ordering and dosage verification.',
    solution:
      'Engineered an end-to-end MERN web platform featuring role-based portals (Customer & Pharmacist/Admin), automated inventory alerts, Cloudinary prescription uploads, and Gemini AI-assisted medicine recognition.',
    architecture:
      'React (Vite) SPA frontend communicating with a modular Node.js/Express REST API backend. MongoDB handles schema-flexible medicine catalogs and orders. JWT secures user/admin sessions. Cloudinary stores prescription scans, Razorpay manages checkout, and Google Gemini API powers AI prescription matching.',
    implementation:
      'Developed responsive UI with Tailwind CSS and Framer Motion, implemented atomic transactions for medicine stock decrements during checkout, and built webhooks for Razorpay payment confirmations.',
    challenges:
      'Handling OCR and messy handwriting variations in prescription images, ensuring zero inventory race conditions under concurrent cart checkouts, and securing patient health data in transit.',
    results:
      'Successfully automated order workflows, cut manual prescription logging time, and achieved instant catalog search across hundreds of pharmaceuticals.',
    learnings:
      'Mastered ACID-like transaction workflows in MongoDB, safe handling of multipart form data via Cloudinary streams, and structuring prompt engineering for Gemini vision/text endpoints.',
    improvements:
      'Add real-time delivery rider tracking via WebSockets, integrate SMS/WhatsApp order alerts, and add doctor electronic signature verification.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'JWT',
      'Razorpay',
      'Cloudinary',
      'Gemini API',
    ],
    features: [
      'Medicine browsing',
      'Shopping cart',
      'Prescription management',
      'Order management',
      'Admin dashboard',
      'Inventory management',
      'Prescription verification',
      'Payment integration',
      'AI-assisted prescription/medicine matching',
    ],
    image: '/PharmaPlus.png',
    github: 'https://github.com/Abhishek526-star/Pharma-Plus',
    liveDemo: 'https://pharmaplus-frontend.vercel.app/',
    caseStudy: true,
    featured: true,
  },
  {
    id: 'campus-connect',
    category: 'MERN',
    title: 'Campus Connect',
    shortDescription:
      'A production-oriented MERN digital campus platform connecting students, faculty, alumni, and administrators in one centralized ecosystem.',
    problem:
      'Campus life is fragmented across disconnected chat groups, physical bulletin boards, chaotic email chains, and manual paper-based attendance systems.',
    research:
      'Surveyed university peers, faculty coordinators, and alumni to map priority touchpoints: real-time peer messaging, quick verified event attendance, and centralized job/mentorship access.',
    solution:
      'Designed and developed a unified platform integrating role-based authentication (RBAC), Socket.IO live messaging, dynamic QR code attendance generation and scanning, alumni mentorship, and scholarship donation campaigns.',
    architecture:
      'React 19 SPA with Redux Toolkit for centralized client state, Express 5 REST and WebSocket server, MongoDB with Mongoose relations, Cloudinary asset storage, and Razorpay payment checkout.',
    implementation:
      'Constructed responsive multi-role dashboards (Student, Faculty, Alumni, Admin), implemented room-based Socket.IO chat with unread counters, and integrated timed cryptographic tokens into attendance QR codes to prevent proxy check-ins.',
    challenges:
      'Eliminating proxy scans in dynamic QR codes, maintaining WebSocket performance under high concurrent student chat loads, and architecting granular RBAC route guards.',
    results:
      'Unified 10+ disparate student-faculty workflows into a single interface, reducing event registration friction to under 5 seconds per attendee via QR scan.',
    learnings:
      'Deepened expertise in WebSocket lifecycle management, Express 5 async error handling, Redux Toolkit query patterns, and scalable role authorization middleware.',
    improvements:
      'Add push notifications via Service Workers, AI resume parsing for job matches, and automated academic transcript verification.',
    techStack: [
      'React 19',
      'Node.js',
      'Express 5',
      'MongoDB',
      'Socket.IO',
      'Redux Toolkit',
      'Tailwind CSS',
      'JWT',
      'Cloudinary',
      'Razorpay',
    ],
    features: [
      'Secure Authentication & RBAC',
      'Real-Time Chat',
      'Student–Alumni Networking',
      'Events & QR Attendance',
      'Scholarships & Donations',
      'Jobs & Internships',
      'Study Resources',
      'Mentorship & Referrals',
      'Real-Time Notifications',
      'Admin Dashboard & Analytics',
      'Razorpay Payments',
      'Global Search',
    ],
    image: '/Campus Connect.png',
    github: 'https://github.com/Abhishek526-star/Campus-Connect',
    liveDemo: 'https://campus-connect-client-yoxc.vercel.app/',
    caseStudy: true,
    featured: true,
  },
  {
    id: 'accenture-ready',
    category: 'Web App',
    title: 'Accenture Ready',
    shortDescription:
      'An interactive preparation platform designed to help candidates prepare for technical assessments through structured learning resources, DSA practice, Java preparation, and gamified assessments.',
    problem:
      'Students preparing for campus recruitment lack an integrated platform that pairs theoretical pattern reviews directly with an embedded interactive coding editor and timed assessments.',
    research:
      'Reviewed common recruitment assessment formats, cognitive question patterns, core DSA problem classifications, and candidate time-management bottlenecks.',
    solution:
      'Built a modern, responsive web application bundling curated DSA topic cheat sheets, Java review cards, an in-browser Monaco code editor, and gamified challenge modules.',
    architecture:
      'React (Vite) single-page application utilizing Microsoft Monaco Editor for code input, client-side test-runner simulation, and Tailwind CSS for high-contrast syntax themes.',
    implementation:
      'Integrated Monaco Editor with syntax highlighting, dynamic problem loading, progress persistence using browser storage, and modular assessment timers.',
    challenges:
      'Configuring Monaco Editor bundle sizes without degrading initial page load times, and designing an intuitive dual-pane layout that scales down gracefully on tablets.',
    results:
      'Over 100+ structured problems cataloged with sub-second page transitions, providing frictionless offline-capable practice.',
    learnings:
      'Deepened mastery of client-side code editors, web workers for sandboxed evaluation, and UI micro-interactions that keep candidates motivated.',
    improvements:
      'Add full backend judge submission API, collaborative peer mock interviews, and personalized AI weakness analytics.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Monaco Editor', 'JavaScript'],
    features: [
      'Learning Hub',
      'DSA patterns',
      'Java preparation',
      'Practice problems',
      'Online code editor',
      'Gamified assessments',
      'Interactive challenges',
    ],
    image: '/AccenturReady.png',
    github: 'https://github.com/Abhishek526-star/Accenture-Ready',
    liveDemo: 'https://accenturemind.vercel.app/',
    caseStudy: true,
    featured: true,
  },
  {
    id: 'expense-tracker',
    category: 'MERN',
    title: 'MERN Expense Tracker',
    shortDescription:
      'A full-stack expense management application for tracking personal expenses and generating useful financial summaries.',
    problem:
      'Individuals struggle to maintain disciplined personal budgets when recording daily expenses is tedious and financial breakdowns lack actionable visual insights.',
    research:
      'Analyzed budgeting methodologies (such as the 50/30/20 rule) and evaluated visual chart feedback loops that improve consistent logging habits.',
    solution:
      'Developed an intuitive, responsive personal finance tool providing category-based expense creation, recurring monthly filters, and automated visual chart aggregations.',
    architecture:
      'React client utilizing Axios for REST communication, Express.js server with JWT authentication, and MongoDB with aggregation pipelines for fast financial summaries.',
    implementation:
      'Built interactive category breakdowns, monthly spending distribution graphs, and server-side sanitized endpoints for all financial CRUD transactions.',
    challenges:
      'Optimizing MongoDB aggregation queries for date-range grouping and providing zero-lag chart updates as new items are added.',
    results:
      'Delivered instantaneous category insights, reliable multi-month filtering, and responsive mobile logging.',
    learnings:
      'Gained deep familiarity with MongoDB aggregation pipelines (`$group`, `$match`), JWT token expiration handling in Axios interceptors, and chart rendering performance.',
    improvements:
      'Add automated receipt scanning with OCR, multi-currency conversion, and exportable CSV/PDF tax summaries.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Axios', 'Tailwind CSS'],
    features: [
      'Authentication',
      'Add/edit/delete expenses',
      'Monthly expense tracking',
      'Expense categories',
      'Dashboard',
      'Charts',
      'REST API',
    ],
    image: '/ExpenseTracker.png',
    github: 'https://github.com/Abhishek526-star/Expense-Manager',
    liveDemo: 'https://expense-manager-frontend-9wjd.onrender.com/ ',
    caseStudy: false,
    featured: false,
  },
  {
  id: 'tic-tac-toe',
  category: 'Frontend',
  title: 'Tic Tac Toe — Interactive Game',
  shortDescription:
    'A responsive and interactive Tic Tac Toe game built with HTML, CSS, and JavaScript, featuring two-player gameplay, score tracking, sound effects, and a modern user interface.',
  problem:
    'Traditional Tic Tac Toe games often lack an engaging interface, responsive design, score tracking, and interactive feedback for players.',
  research:
    'Analyzed common browser-based game interfaces and focused on creating a simple, responsive, and engaging gameplay experience for both desktop and mobile users.',
  solution:
    'Developed an interactive Tic Tac Toe game with two-player functionality, winner and draw detection, score tracking, reset and new game controls, hover effects, and sound feedback.',
  architecture:
    'A lightweight client-side application built using HTML for the game structure, CSS for styling and responsive layouts, and JavaScript for game state management, player turns, win/draw detection, and score tracking.',
  implementation:
    'Implemented the game board and controls using HTML, designed a responsive interface with CSS animations and hover effects, and developed JavaScript logic for player turns, winning combinations, draw detection, score updates, and game reset functionality.',
  challenges:
    'Managing game state correctly between player turns, detecting all possible winning combinations, preventing moves after the game ends, and maintaining a responsive layout across different screen sizes.',
  results:
    'Successfully developed a fully responsive browser-based Tic Tac Toe game with interactive gameplay, winner/draw notifications, score tracking, and reset functionality.',
  learnings:
    'Strengthened understanding of JavaScript DOM manipulation, event handling, game-state management, conditional logic, responsive CSS, and implementing interactive browser-based applications.',
  improvements:
    'Add a stronger AI opponent with multiple difficulty levels, online multiplayer using WebSockets, player profiles, persistent score history, and additional game themes.',
  techStack: [
    'HTML',
    'CSS',
    'JavaScript',
  ],
  features: [
    'Two-player gameplay',
    'AI single-player mode',
    'Winner detection',
    'Draw detection',
    'Player score tracking',
    'Game reset',
    'New game functionality',
    'Hover effects',
    'Sound effects',
    'Responsive design',
  ],
  image: '/Tic tac toe.png',
  github: 'https://github.com/Abhishek526-star/Tic-Tac-Toe-',
  liveDemo: 'https://abhishek526-star.github.io/Tic-Tac-Toe-/',
  caseStudy: false,
  featured: false,
},
]
