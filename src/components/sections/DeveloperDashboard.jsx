import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Code2,
  FolderGit2,
  Terminal,
  Activity,
  Award,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  GitCommit,
  Flame,
  LayoutDashboard,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

import { profile, codingPlatforms, fallbackGithubActivity } from '../../data/profile.js'
import { dashboardConfig } from '../../data/dashboard.js'
import { useCountUp } from '../../utils/useCountUp.js'
import DsaInteractiveChart from '../ui/DsaInteractiveChart.jsx'

// Official GitHub Linguist Colors
const GITHUB_LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  C: '#555555',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  CMake: '#da3434',
  SQL: '#e38c00',
  Go: '#00ADD8',
  Rust: '#dea584',
}

function computeLanguagesFromByteMap(langByteMap) {
  const total = Object.values(langByteMap).reduce((acc, bytes) => acc + bytes, 0)
  if (!total) return null

  const sorted = Object.entries(langByteMap)
    .map(([lang, bytes]) => ({
      name: lang,
      percentage: Math.max(Math.round((bytes / total) * 100), 1),
      color: GITHUB_LANGUAGE_COLORS[lang] || '#38bdf8',
      bytes,
    }))
    .filter((l) => l.bytes > 500)
    .sort((a, b) => b.bytes - a.bytes)

  return sorted.slice(0, 6)
}

function computeLanguagesFromRepos(repos) {
  const map = {}
  repos.forEach((r) => {
    if (r.language) {
      map[r.language] = (map[r.language] || 0) + (r.size || 1)
    }
  })
  return computeLanguagesFromByteMap(map)
}

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [hoveredLang, setHoveredLang] = useState(null)

  const [ghData, setGhData] = useState(() => {
    let cachedLanguages = fallbackGithubActivity.mostUsedLanguages
    try {
      const username = profile.githubUsername
      if (username) {
        const stored = localStorage.getItem(`gh_languages_${username}`)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            cachedLanguages = parsed
          }
        }
      }
    } catch {
      // ignore
    }

    return {
      repos: fallbackGithubActivity.repos,
      languages: cachedLanguages,
      recentRepos: fallbackGithubActivity.recentRepositories,
      isLive: false,
    }
  })

  useEffect(() => {
    const username = profile.githubUsername
    if (!username) return

    const controller = new AbortController()

    async function fetchGitHubProfile() {
      try {
        const [userData, reposData] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }).then((r) =>
            r.ok ? r.json() : Promise.reject()
          ),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
          }).then((r) => (r.ok ? r.json() : Promise.reject())),
        ])

        const recentRepos =
          Array.isArray(reposData) && reposData.length > 0
            ? reposData.slice(0, 6).map((r) => ({
                name: r.name,
                description: r.description || 'Developer project repository.',
                language: r.language || 'Code',
                stars: r.stargazers_count || 0,
                url: r.html_url,
              }))
            : fallbackGithubActivity.recentRepositories

        let languages = null
        if (Array.isArray(reposData) && reposData.length > 0) {
          try {
            const langByteMap = {}
            const nonForkRepos = reposData.filter((r) => !r.fork && r.languages_url)

            const results = await Promise.allSettled(
              nonForkRepos.map((r) =>
                fetch(r.languages_url, { signal: controller.signal }).then((res) => (res.ok ? res.json() : {}))
              )
            )

            results.forEach((res) => {
              if (res.status === 'fulfilled' && res.value) {
                Object.entries(res.value).forEach(([lang, bytes]) => {
                  langByteMap[lang] = (langByteMap[lang] || 0) + bytes
                })
              }
            })

            languages = computeLanguagesFromByteMap(langByteMap)
          } catch {
            languages = computeLanguagesFromRepos(reposData)
          }

          if (!languages || languages.length === 0) {
            languages = computeLanguagesFromRepos(reposData)
          }
        }

        const finalLanguages = languages || fallbackGithubActivity.mostUsedLanguages

        try {
          if (finalLanguages && finalLanguages.length > 0) {
            localStorage.setItem(`gh_languages_${username}`, JSON.stringify(finalLanguages))
          }
        } catch {
          // ignore
        }

        setGhData({
          repos: userData.public_repos ?? fallbackGithubActivity.repos,
          languages: finalLanguages,
          recentRepos,
          isLive: true,
        })
      } catch {
        // Retain fallback configuration if rate limited or network issue
      }
    }

    fetchGitHubProfile()

    return () => controller.abort()
  }, [])

  // Language calculations
  const totalPercentage = ghData.languages.reduce((acc, l) => acc + (Number(l.percentage) || 0), 0) || 100
  const normalizedLanguages = ghData.languages.map((l) => ({
    ...l,
    percentage: Math.round(((Number(l.percentage) || 0) / totalPercentage) * 100),
  }))

  // Animated counters for verified metrics
  const animatedRepos = useCountUp(ghData.repos, 1000)
  const animatedProjects = useCountUp(dashboardConfig.experienceSummary.projectsCount, 800)

  // Interactive Donut Chart Geometry (Circumference calculation)
  const radius = 64
  const circumference = 2 * Math.PI * radius
  let cumulativeOffset = 0
  const donutSlices = normalizedLanguages.map((lang) => {
    const strokeDash = (lang.percentage / 100) * circumference
    const offset = cumulativeOffset
    cumulativeOffset += strokeDash
    return {
      ...lang,
      strokeDasharray: `${strokeDash} ${circumference}`,
      strokeDashoffset: -offset,
    }
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'github', label: 'GitHub & Repositories', icon: Github },
    { id: 'dsa', label: 'DSA & Algorithmic Practice', icon: Code2 },
    { id: 'learning', label: 'Engineering Focus & Roadmap', icon: Flame },
  ]

  return (
    <section
      id="dashboard"
      className="py-10 sm:py-14 border-y relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      aria-labelledby="dashboard-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-medium shadow-xs"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" aria-hidden="true" />
            <Activity size={14} className="text-[#38bdf8]" />
            <span className="text-[#38bdf8] font-bold">Developer Command Center</span>
            {ghData.isLive && (
              <span className="text-[10px] uppercase font-semibold text-[#22c55e] bg-[#22c55e]/10 px-1.5 py-0.5 rounded">
                Live GitHub
              </span>
            )}
          </div>

          <h2 id="dashboard-heading" className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Engineering &amp; <span className="gradient-text">Activity Dashboard</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            Real-time GitHub statistics, verified software applications, algorithmic competencies, and active learning roadmap.
          </p>
        </div>

        {/* Top KPI Metrics Cards (100% Genuine Metrics) */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Public Repositories (Live) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="card p-4 sm:p-5 flex flex-col justify-between group hover:border-[#38bdf8]/50 transition-all"
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Public Repos</span>
              <FolderGit2 size={18} className="text-[#38bdf8] group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono">
                {animatedRepos}
                <span className="text-base sm:text-xl font-normal text-[#38bdf8]">+</span>
              </div>
              <p className="mt-1 text-xs text-muted">Active open-source repositories</p>
            </div>
          </motion.div>

          {/* Card 2: Completed Web Applications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="card p-4 sm:p-5 flex flex-col justify-between group hover:border-[#22c55e]/50 transition-all"
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Web Apps Built</span>
              <Layers size={18} className="text-[#22c55e] group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono">
                {animatedProjects}
                <span className="text-base sm:text-xl font-normal text-[#22c55e]">+</span>
              </div>
              <p className="mt-1 text-xs text-muted">Deployed full-stack software</p>
            </div>
          </motion.div>

          {/* Card 3: Striver DSA Sheet Progress */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="card p-4 sm:p-5 flex flex-col justify-between group hover:border-[#ec4899]/50 transition-all cursor-pointer"
            onClick={() => setActiveTab('dsa')}
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Striver DSA Sheet</span>
              <BookOpen size={18} className="text-[#ec4899] group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono">
                153
                <span className="text-sm sm:text-base font-normal text-muted ml-1 font-sans">/ 1111</span>
              </div>
              <p className="mt-1 text-xs text-muted truncate">74 Easy • 53 Med • 26 Hard</p>
            </div>
          </motion.div>

          {/* Card 4: Industrial Experience */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="card p-4 sm:p-5 flex flex-col justify-between group hover:border-[#f59e0b]/50 transition-all"
          >
            <div className="flex items-center justify-between text-muted">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Internship</span>
              <Award size={18} className="text-[#f59e0b] group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-3">
              <div className="text-base sm:text-lg font-bold text-[var(--text-primary)] truncate font-mono">
                BEL Intern
              </div>
              <p className="mt-1 text-xs text-muted truncate">Bharat Electronics Limited</p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Tab Navigation Dock */}
        <div className="mt-8 flex justify-center">
          <div
            className="inline-flex p-1.5 rounded-2xl border shadow-sm backdrop-blur-xl flex-wrap justify-center gap-1"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
            role="tablist"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-muted hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDashboardTab"
                      className="absolute inset-0 bg-[#2563eb] rounded-xl shadow-md shadow-[#2563eb]/25"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon size={15} />
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-6 sm:mt-8">
          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 lg:grid-cols-12 items-start"
              >
                {/* Left Column: Interactive Language Donut & Breakdown (7 cols) */}
                <div className="lg:col-span-7 card p-5 sm:p-7 flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-2 font-mono">
                        <Code2 size={16} /> Programming Language Distribution
                      </span>
                      <p className="text-xs text-muted mt-0.5">Live calculation across your public GitHub repositories</p>
                    </div>
                    <span className="text-xs font-mono text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2.5 py-0.5 rounded-full">
                      {ghData.repos} Repositories
                    </span>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-12 gap-6 items-center">
                    {/* SVG Donut Chart */}
                    <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
                      <div className="relative w-44 h-44 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                          <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="18"
                            className="text-white/5"
                          />
                          {donutSlices.map((lang) => {
                            const isHovered = hoveredLang?.name === lang.name
                            return (
                              <circle
                                key={lang.name}
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="transparent"
                                stroke={lang.color}
                                strokeWidth={isHovered ? '22' : '18'}
                                strokeDasharray={lang.strokeDasharray}
                                strokeDashoffset={lang.strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-200 cursor-pointer"
                                onMouseEnter={() => setHoveredLang(lang)}
                                onMouseLeave={() => setHoveredLang(null)}
                              />
                            )
                          })}
                        </svg>

                        {/* Center Hover Label */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-2">
                          <span className="text-xs font-mono text-muted">
                            {hoveredLang ? hoveredLang.name : 'Primary'}
                          </span>
                          <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
                            {hoveredLang ? `${hoveredLang.percentage}%` : `${normalizedLanguages[0]?.percentage || 0}%`}
                          </span>
                          <span className="text-[10px] text-muted font-mono">
                            {hoveredLang?.bytes
                              ? `${(hoveredLang.bytes / 1024).toFixed(0)} KB`
                              : normalizedLanguages[0]?.name || 'Code'}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] text-muted font-mono">Hover slices for details</p>
                    </div>

                    {/* Language Bars List */}
                    <div className="sm:col-span-7 space-y-3">
                      {normalizedLanguages.map((lang) => {
                        const isHovered = hoveredLang?.name === lang.name
                        return (
                          <div
                            key={lang.name}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              isHovered ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'
                            }`}
                            onMouseEnter={() => setHoveredLang(lang)}
                            onMouseLeave={() => setHoveredLang(null)}
                          >
                            <div className="flex justify-between items-center text-xs font-mono mb-1">
                              <span className="font-semibold flex items-center gap-2">
                                <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ backgroundColor: lang.color }}
                                />
                                <span className="text-[var(--text-primary)]">{lang.name}</span>
                              </span>
                              <span className="font-bold text-muted">{lang.percentage}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${lang.percentage}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: lang.color }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Verified Project Milestones & Platforms (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Verified Projects Timeline */}
                  <div className="card p-5 sm:p-6">
                    <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#22c55e] flex items-center gap-2 font-mono">
                          <CheckCircle2 size={15} /> Engineered Software
                        </span>
                        <p className="text-xs text-muted mt-0.5">Verified applications &amp; systems</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#22c55e]">
                        5 Live Apps
                      </span>
                    </div>

                    {/* Milestones List */}
                    <div className="mt-4 space-y-2.5">
                      {dashboardConfig.projectMilestones.map((pm) => (
                        <div
                          key={pm.name}
                          className="p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs"
                          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[var(--text-primary)] truncate">{pm.name}</span>
                              <span className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-1.5 py-0.5 rounded">
                                {pm.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted truncate mt-0.5">{pm.highlight}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <a
                              href={pm.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-lg text-muted hover:text-[var(--text-primary)] transition-colors"
                              title="Source Code"
                            >
                              <Github size={14} />
                            </a>
                            <a
                              href={pm.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-lg text-muted hover:text-[#22c55e] transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platforms Quick Access */}
                  <div className="card p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted font-mono block mb-3">
                      Connected Developer Profiles
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {codingPlatforms.map((cp) => (
                        <a
                          key={cp.name}
                          href={cp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-all text-xs font-medium group"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          {cp.name === 'GitHub' ? (
                            <Github size={18} className="text-[#38bdf8] group-hover:scale-110 transition-transform" />
                          ) : cp.name === 'LeetCode' ? (
                            <Terminal size={18} className="text-[#f59e0b] group-hover:scale-110 transition-transform" />
                          ) : (
                            <Code2 size={18} className="text-[#8b5cf6] group-hover:scale-110 transition-transform" />
                          )}
                          <span className="font-semibold text-[var(--text-primary)]">{cp.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: GITHUB & REPOSITORIES */}
            {activeTab === 'github' && (
              <motion.div
                key="tab-github"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="card p-5 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Github size={20} className="text-[#38bdf8]" />
                        GitHub Repository Showcase: @{profile.githubUsername}
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        Active repositories, algorithms, full-stack applications, and live source repositories.
                      </p>
                    </div>

                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/30 px-4 py-2 text-xs font-semibold text-[#38bdf8] hover:bg-[#2563eb] hover:text-white transition-all w-fit"
                    >
                      <Github size={14} /> Open GitHub Profile <ArrowUpRight size={14} />
                    </a>
                  </div>

                  {/* Repository Grid */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {ghData.recentRepos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border p-4 flex flex-col justify-between hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-all group"
                        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[#38bdf8] transition-colors flex items-center gap-1.5 truncate">
                              <FolderGit2 size={15} className="text-[#38bdf8] shrink-0" />
                              <span className="truncate">{repo.name}</span>
                            </span>
                            <ArrowUpRight size={14} className="text-muted group-hover:text-[#38bdf8] shrink-0" />
                          </div>
                          <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed">
                            {repo.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono text-muted" style={{ borderColor: 'var(--border)' }}>
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: GITHUB_LANGUAGE_COLORS[repo.language] || '#38bdf8',
                              }}
                            />
                            {repo.language}
                          </span>
                          <span className="flex items-center gap-1">
                            ★ {repo.stars}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: DSA & ALGORITHMIC PRACTICE */}
            {activeTab === 'dsa' && (
              <motion.div
                key="tab-dsa"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Interactive DSA Problems Solved Chart (LeetCode + GFG) */}
                <DsaInteractiveChart />

                <div className="grid gap-6 lg:grid-cols-12">
                {/* Academic Foundation & Profiles (5 cols) */}
                <div className="lg:col-span-5 card p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#22c55e] font-mono flex items-center gap-2">
                      <GraduationCap size={16} /> Algorithmic Foundation
                    </span>
                    <h3 className="text-xl font-bold mt-1">Computer Science &amp; DSA</h3>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Rigorous coursework and problem-solving practice in C++, Data Structures, and Algorithmic Analysis at MMMUT Gorakhpur.
                    </p>
                  </div>

                  {/* Academic Highlight Box */}
                  <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-[#38bdf8]">B.Tech CSE (2023–2027)</span>
                      <span className="text-xs font-mono font-bold text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full">
                        8.33 CGPA
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-primary)] font-medium">
                      Madan Mohan Malaviya University of Technology
                    </p>
                    <p className="text-[11px] text-muted">
                      Coursework: Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, and OOP.
                    </p>
                  </div>

                  {/* Platform Verified Profiles */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted font-mono block">
                      Coding Profiles
                    </span>
                    {dashboardConfig.problemSolving.platforms.map((p) => (
                      <a
                        key={p.name}
                        href={p.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl border flex items-center justify-between hover:border-[#2563eb] transition-all group"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[var(--text-primary)]">{p.name}</span>
                            <span className="text-[10px] font-mono text-[#38bdf8]">{p.handle}</span>
                          </div>
                          <p className="text-[11px] text-muted mt-0.5">{p.focus}</p>
                        </div>
                        <ArrowUpRight size={14} className="text-muted group-hover:text-[#2563eb] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Core Competencies Grid (7 cols) */}
                <div className="lg:col-span-7 card p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8b5cf6] font-mono flex items-center gap-2 mb-2">
                      <Cpu size={16} /> Algorithmic Competency Areas
                    </span>
                    <h3 className="text-xl font-bold">Core Software &amp; Problem Solving Concepts</h3>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Fundamental concepts practiced across LeetCode, GeeksforGeeks, and academic computer science projects.
                    </p>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {dashboardConfig.problemSolving.coreCompetencies.map((c) => (
                      <div
                        key={c.name}
                        className="p-3.5 rounded-xl border flex flex-col justify-between space-y-1"
                        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                      >
                        <span className="font-bold text-xs text-[var(--text-primary)] flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-[#22c55e]" />
                          {c.name}
                        </span>
                        <p className="text-[11px] text-muted font-mono">{c.focus}</p>
                      </div>
                    ))}
                  </div>

                  {/* Primary Language for DSA */}
                  <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono text-muted" style={{ borderColor: 'var(--border)' }}>
                    <span>Primary Problem Solving Language:</span>
                    <span className="font-bold text-[#f34b7d] bg-[#f34b7d]/10 px-2.5 py-1 rounded-lg border border-[#f34b7d]/30">
                      C++ (Modern STL &amp; Algorithms)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            )}

            {/* TAB 4: ENGINEERING ROADMAP & FOCUS */}
            {activeTab === 'learning' && (
              <motion.div
                key="tab-learning"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  {dashboardConfig.learningRoadmap.map((item) => (
                    <div key={item.id} className="card p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-muted">
                            {item.category}
                          </span>
                          <span
                            className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border"
                            style={{
                              borderColor: `${item.statusColor}50`,
                              backgroundColor: `${item.statusColor}15`,
                              color: item.statusColor,
                            }}
                          >
                            {item.status}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-[var(--text-primary)] mt-2">{item.title}</h4>
                        <p className="mt-2 text-xs text-muted leading-relaxed">{item.details}</p>
                      </div>

                      <div className="pt-3 border-t text-xs font-mono space-y-1" style={{ borderColor: 'var(--border)' }}>
                        <span className="text-muted block text-[11px] uppercase tracking-wider font-semibold">Evidence &amp; Implementation:</span>
                        <p className="text-[var(--text-primary)] font-medium">{item.evidence}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verified Industrial Experience & Postman Certification */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Card 1: BEL Internship */}
                  <div className="card p-6 border border-[#2563eb]/40" style={{ backgroundColor: 'var(--card)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#22c55e] font-mono flex items-center gap-1.5">
                      <CheckCircle2 size={16} /> Verified Industrial Internship
                    </span>
                    <h4 className="text-lg font-bold mt-2 text-[var(--text-primary)]">
                      {dashboardConfig.experienceSummary.internshipDetail.role}
                    </h4>
                    <p className="text-xs text-[#38bdf8] font-mono mt-0.5 font-semibold">
                      {dashboardConfig.experienceSummary.internshipDetail.company}
                    </p>
                    <p className="text-xs text-muted mt-2">
                      {dashboardConfig.experienceSummary.internshipDetail.period} • {dashboardConfig.experienceSummary.internshipDetail.focus}
                    </p>
                  </div>

                  {/* Card 2: Postman Certification */}
                  <div className="card p-6 border border-[#8b5cf6]/40" style={{ backgroundColor: 'var(--card)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8b5cf6] font-mono flex items-center gap-1.5">
                      <ShieldCheck size={16} /> Official Industry Certification
                    </span>
                    <h4 className="text-lg font-bold mt-2 text-[var(--text-primary)]">
                      {dashboardConfig.experienceSummary.certification.title}
                    </h4>
                    <p className="text-xs text-[#8b5cf6] font-mono mt-0.5 font-semibold">
                      {dashboardConfig.experienceSummary.certification.organization} • {dashboardConfig.experienceSummary.certification.date}
                    </p>
                    <div className="mt-3">
                      <a
                        href={dashboardConfig.experienceSummary.certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#38bdf8] hover:underline font-mono"
                      >
                        View Verified Certificate <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
