import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { dashboardConfig } from '../../data/dashboard.js'


export default function DsaInteractiveChart() {
  // Default to striver sheet as requested by user
  const [platform, setPlatform] = useState('striver') // 'striver' | 'leetcode' | 'gfg' | 'all'
  const [hoveredTier, setHoveredTier] = useState(null)

  const [dsaData, setDsaData] = useState(() => {
    return {
      striver: dashboardConfig.problemSolving.striver,
      leetcode: dashboardConfig.problemSolving.leetcode,
      gfg: dashboardConfig.problemSolving.gfg,
      isLiveLc: false,
    }
  })

  // Live LeetCode Sync
  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    fetch('https://alfa-leetcode-api.onrender.com/userProfile/Abhishek_2k4', {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.totalSolved === 'number') {
          setDsaData((prev) => ({
            ...prev,
            leetcode: {
              ...prev.leetcode,
              totalSolved: data.totalSolved,
              easy: data.easySolved ?? prev.leetcode.easy,
              medium: data.mediumSolved ?? prev.leetcode.medium,
              hard: data.hardSolved ?? prev.leetcode.hard,
              ranking: data.ranking ? Number(data.ranking).toLocaleString() : prev.leetcode.ranking,
            },
            isLiveLc: true,
          }))
        }
      })
      .catch(() => {
        // Fallback cleanly to verified stats
      })
      .finally(() => clearTimeout(timeoutId))

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  const striver = dsaData.striver
  const lc = dsaData.leetcode
  const gfg = dsaData.gfg

  // Get active platform stats
  const activeStats = (() => {
    if (platform === 'striver') {
      return {
        name: "Striver's A2Z DSA Sheet",
        tag: 'takeUforward',
        totalSolved: striver.totalSolved,
        totalQuestions: striver.totalQuestions,
        easy: striver.easy,
        totalEasy: striver.totalEasy,
        medium: striver.medium,
        totalMedium: striver.totalMedium,
        hard: striver.hard,
        totalHard: striver.totalHard,
        link: striver.url,
      }
    }
    if (platform === 'leetcode') {
      return {
        name: 'LeetCode Profile',
        tag: `@${lc.username}`,
        totalSolved: lc.totalSolved,
        totalQuestions: 4055,
        easy: lc.easy,
        totalEasy: 965,
        medium: lc.medium,
        totalMedium: 2115,
        hard: lc.hard,
        totalHard: 975,
        link: lc.profileUrl,
      }
    }
    if (platform === 'gfg') {
      return {
        name: 'GeeksforGeeks Profile',
        tag: `@${gfg.username}`,
        totalSolved: gfg.totalSolved,
        totalQuestions: 1500,
        easy: gfg.easy,
        totalEasy: 600,
        medium: gfg.medium,
        totalMedium: 650,
        hard: gfg.hard,
        totalHard: 250,
        link: gfg.profileUrl,
      }
    }
    // 'all'
    const totalS = striver.totalSolved + lc.totalSolved + gfg.totalSolved
    return {
      name: 'Combined Problem Solving Footprint',
      tag: 'All Platforms',
      totalSolved: totalS,
      totalQuestions: 5000,
      easy: striver.easy + lc.easy + gfg.easy,
      totalEasy: striver.totalEasy + 965 + 600,
      medium: striver.medium + lc.medium + gfg.medium,
      totalMedium: striver.totalMedium + 2115 + 650,
      hard: striver.hard + lc.hard + gfg.hard,
      totalHard: striver.totalHard + 975 + 250,
      link: lc.profileUrl,
    }
  })()

  // Circular progress calculations for the portfolio-native donut ring
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const gap = 8
  const availableCircumference = circumference - 3 * gap

  const totalSolved = activeStats.totalSolved || 1
  const easyDash = Math.max((activeStats.easy / totalSolved) * availableCircumference, 6)
  const mediumDash = Math.max((activeStats.medium / totalSolved) * availableCircumference, 6)
  const hardDash = Math.max((activeStats.hard / totalSolved) * availableCircumference, 6)

  const offsetEasy = 0
  const offsetMedium = -(easyDash + gap)
  const offsetHard = -(easyDash + gap + mediumDash + gap)

  const tiers = [
    {
      key: 'easy',
      label: 'Easy',
      count: activeStats.easy,
      total: activeStats.totalEasy,
      percentage: Math.round((activeStats.easy / (activeStats.totalEasy || 1)) * 100),
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      dasharray: `${easyDash} ${circumference}`,
      offset: offsetEasy,
    },
    {
      key: 'medium',
      label: 'Medium',
      count: activeStats.medium,
      total: activeStats.totalMedium,
      percentage: Math.round((activeStats.medium / (activeStats.totalMedium || 1)) * 100),
      color: '#facc15',
      bg: 'rgba(250, 204, 21, 0.1)',
      border: 'rgba(250, 204, 21, 0.3)',
      dasharray: `${mediumDash} ${circumference}`,
      offset: offsetMedium,
    },
    {
      key: 'hard',
      label: 'Hard',
      count: activeStats.hard,
      total: activeStats.totalHard,
      percentage: Math.round((activeStats.hard / (activeStats.totalHard || 1)) * 100),
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.3)',
      dasharray: `${hardDash} ${circumference}`,
      offset: offsetHard,
    },
  ]

  return (
    <div className="card p-5 sm:p-7 space-y-6">
      {/* Top Header with Platform Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border p-2.5 bg-[#2563eb]/10 border-[#2563eb]/30 text-[#38bdf8]">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[var(--text-primary)]">
                {activeStats.name}
              </span>
              {platform === 'striver' && (
                <span className="text-[10px] font-mono font-semibold text-[#ec4899] bg-[#ec4899]/10 border border-[#ec4899]/30 px-1.5 py-0.5 rounded">
                  takeUforward
                </span>
              )}
              {platform === 'leetcode' && dsaData.isLiveLc && (
                <span className="text-[10px] font-mono font-semibold text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-1.5 py-0.5 rounded">
                  Live Synced
                </span>
              )}
            </div>
            <p className="text-xs text-muted font-mono mt-0.5">
              Verified problem solving progress &amp; difficulty distribution
            </p>
          </div>
        </div>

        {/* Platform Selection Dock */}
        <div className="flex items-center gap-1 p-1 rounded-xl border bg-[var(--bg)] flex-wrap" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setPlatform('striver')}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              platform === 'striver'
                ? 'bg-[#ec4899] text-white font-bold shadow-md shadow-[#ec4899]/30'
                : 'text-muted hover:text-[var(--text-primary)]'
            }`}
          >
            Striver&apos;s Sheet
          </button>
          <button
            onClick={() => setPlatform('leetcode')}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              platform === 'leetcode'
                ? 'bg-[#f59e0b] text-slate-950 font-bold shadow-md shadow-[#f59e0b]/30'
                : 'text-muted hover:text-[var(--text-primary)]'
            }`}
          >
            LeetCode
          </button>
          <button
            onClick={() => setPlatform('gfg')}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              platform === 'gfg'
                ? 'bg-[#22c55e] text-slate-950 font-bold shadow-md shadow-[#22c55e]/30'
                : 'text-muted hover:text-[var(--text-primary)]'
            }`}
          >
            GeeksforGeeks
          </button>
          <button
            onClick={() => setPlatform('all')}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              platform === 'all'
                ? 'bg-[#2563eb] text-white font-bold shadow-md shadow-[#2563eb]/30'
                : 'text-muted hover:text-[var(--text-primary)]'
            }`}
          >
            All Platforms
          </button>
        </div>
      </div>

      {/* Main Visual Progress Area: Cohesive Portfolio Theme */}
      <div className="grid md:grid-cols-12 gap-6 items-center">
        {/* Left: Portfolio Native Circular Progress Ring (5 cols) */}
        <div
          className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border transition-all"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
        >
          {/* Header Label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">
              {platform === 'striver' ? 'Striver Sheet Progress' : 'Problem Distribution'}
            </span>
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="11"
                className="text-black/5 dark:text-white/10"
              />

              {/* Glowing Tier Segments */}
              {tiers.map((tier) => {
                const isHovered = hoveredTier?.key === tier.key
                return (
                  <circle
                    key={tier.key}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={tier.color}
                    strokeWidth={isHovered ? '14' : '11'}
                    strokeDasharray={tier.dasharray}
                    strokeDashoffset={tier.offset}
                    strokeLinecap="round"
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 8px ${tier.color})`
                        : `drop-shadow(0 0 3px ${tier.color}40)`,
                    }}
                    onMouseEnter={() => setHoveredTier(tier)}
                    onMouseLeave={() => setHoveredTier(null)}
                  />
                )
              })}
            </svg>

            {/* Center Content: Big Count + Total Target */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-2">
              <span className="text-4xl font-extrabold font-mono text-[var(--text-primary)] leading-none tracking-tight">
                {hoveredTier ? hoveredTier.count : activeStats.totalSolved}
              </span>
              <div className="w-10 h-[1.5px] bg-[var(--text-primary)]/20 my-1.5" />
              <span className="text-xs font-mono text-muted">
                {hoveredTier ? `out of ${hoveredTier.total}` : `${activeStats.totalQuestions} Questions`}
              </span>
            </div>
          </div>

          {/* Quick Interactive Legend Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 w-full">
            {tiers.map((tier) => {
              const isHovered = hoveredTier?.key === tier.key
              return (
                <div
                  key={tier.key}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                    isHovered
                      ? 'border-[var(--text-primary)]/40 shadow-sm'
                      : 'border-[var(--border)]'
                  }`}
                  style={{
                    backgroundColor: isHovered ? tier.bg : 'var(--card)',
                  }}
                  onMouseEnter={() => setHoveredTier(tier)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span className="text-muted">{tier.label}</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {tier.count}/{tier.total}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Detailed Progress Cards & Sub-breakdowns (7 cols) */}
        <div className="md:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span className="font-semibold uppercase tracking-wider">
              {platform === 'striver' ? "Striver's Sheet Breakdown" : 'Difficulty Breakdown'}
            </span>
            <span>Completion Rate</span>
          </div>

          {tiers.map((tier) => {
            const isHovered = hoveredTier?.key === tier.key
            return (
              <div
                key={tier.key}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-white/5 border-[var(--text-primary)]/30 shadow-md'
                    : 'border-[var(--border)] hover:bg-white/5'
                }`}
                onMouseEnter={() => setHoveredTier(tier)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded font-bold text-xs"
                      style={{
                        backgroundColor: tier.bg,
                        color: tier.color,
                        border: `1px solid ${tier.border}`,
                      }}
                    >
                      {tier.label}
                    </span>
                    <span className="text-[var(--text-primary)] font-bold">
                      {tier.count} / {tier.total} Solved
                    </span>
                  </div>
                  <span className="font-bold text-[var(--text-primary)] font-mono">{tier.percentage}%</span>
                </div>

                {/* Progress Bar with animated fill */}
                <div className="h-2.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tier.percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                </div>

                {platform === 'striver' && (
                  <p className="text-[11px] text-muted font-mono mt-2">
                    {tier.key === 'easy' && '★ Mastered fundamentals: Arrays, Strings, Sorting & Binary Search basics.'}
                    {tier.key === 'medium' && '★ Active focus: Two Pointers, Dynamic Programming, Trees & Recursion.'}
                    {tier.key === 'hard' && '★ Advanced challenges: Graph Traversals, Hard DP & Segmented Algorithms.'}
                  </p>
                )}
              </div>
            )
          })}

          {/* Direct Link to Sheet / Profile */}
          <div className="pt-2">
            <a
              href={activeStats.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/30 px-4 py-2.5 text-xs font-semibold text-[#38bdf8] hover:bg-[#2563eb] hover:text-white transition-all w-full justify-center shadow-sm"
            >
              <span>Explore {activeStats.name}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

