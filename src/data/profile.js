export const profile = {
  name: 'Abhishek Kumar',
  role: 'Computer Science & Engineering Student',
  tagline: 'Full-Stack Developer • AI/GenAI Enthusiast',
  subRoles: ['Full-Stack', 'MERN Stack', 'AI Integration', 'C++ / DSA'],
  bio: 'I build scalable web applications, intelligent systems, and practical software solutions using modern technologies.',
  email: 'abhishekkumar63871@gmail.com',
  github: 'https://github.com/Abhishek526-star',
  githubUsername: 'Abhishek526-star',
  linkedin: 'https://www.linkedin.com/in/abhishek-kumar-521446294/',
  socials: {
    github: 'https://github.com/Abhishek526-star',
    linkedin: 'https://www.linkedin.com/in/abhishek-kumar-521446294/',
    leetcode: 'https://leetcode.com/u/Abhishek_2k4/',
    gfg: 'https://www.geeksforgeeks.org/profile/abhishek_2k4',
  },
  location: 'India',
  education: 'B.Tech — Computer Science & Engineering',
  college: 'Madan Mohan Malaviya University of Technology, Gorakhpur, Uttar Pradesh',
  currentlyLearning: 'Generative AI / Agentic AI',
  openToWork: 'Open to Software Engineering Opportunities',
}

export const stats = [
  { label: 'Projects Built', value: '5+' },
  { label: 'Public Repositories', value: '15+' },
  { label: 'Technologies & Tools', value: '15+' },
  { label: 'Internship Experience', value: '1' },
]

export const services = [
  {
    title: 'Full-Stack Applications',
    description: 'Modern web applications using React, Node.js, Express and MongoDB.',
  },
  {
    title: 'AI-Powered Applications',
    description: 'Applications integrating LLMs, Gemini APIs, RAG and intelligent workflows.',
  },
  {
    title: 'Interactive Web Experiences',
    description: 'Modern interfaces using React, Tailwind and animation libraries.',
  },
  {
    title: 'Backend APIs',
    description: 'Secure REST APIs with authentication, authorization and database integration.',
  },
]

export const codingPlatforms = [
  { name: 'GitHub', url: 'https://github.com/Abhishek526-star' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/Abhishek_2k4/' },
  { name: 'CodeChef', url: 'https://www.codechef.com/users/abhishek_2k4' },
]

// Fallback GitHub data when API data is loading or username is unset
export const fallbackGithubActivity = {
  repos: 15,
  mostUsedLanguages: [
    { name: 'JavaScript', percentage: 86, color: '#f1e05a' },
    { name: 'CSS', percentage: 5, color: '#563d7c' },
    { name: 'Python', percentage: 5, color: '#3572A5' },
    { name: 'C++', percentage: 3, color: '#f34b7d' },
    { name: 'HTML', percentage: 1, color: '#e34c26' },
  ],
  recentRepositories: [
    {
      name: 'campus-connect',
      description: 'Production-oriented MERN digital campus platform with real-time chat & QR attendance.',
      language: 'JavaScript',
      stars: 0,
      url: 'https://github.com/Abhishek526-star/Campus-Connect',
    },
    {
      name: 'pharmaplus-mern',
      description: 'Full-stack pharmacy management system with prescription matching via Gemini API.',
      language: 'JavaScript',
      stars: 0,
      url: 'https://github.com/Abhishek526-star/Pharma-Plus',
    },
    {
      name: 'accenture-ready',
      description: 'Interactive technical assessment prep platform with Monaco editor.',
      language: 'JavaScript',
      stars: 0,
      url: 'https://github.com/Abhishek526-star/Accenture-Ready',
    },
  ],
}
