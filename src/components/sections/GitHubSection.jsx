import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Code2, FolderGit2, Terminal } from 'lucide-react'
import { profile, codingPlatforms, fallbackGithubActivity } from '../../data/profile.js'
import { isPlaceholder } from '../../utils/helpers.js'

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

export default function GitHubSection() {
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
    if (!username) return // Graceful manual fallback when username is unset

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
            ? reposData.slice(0, 3).map((r) => ({
                name: r.name,
                description: r.description || 'Developer project repository.',
                language: r.language || 'Code',
                stars: r.stargazers_count || 0,
                url: r.html_url,
              }))
            : fallbackGithubActivity.recentRepositories

        // Fetch detailed language breakdown across repositories
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
            // fallback to repo sizes if language endpoints are rate limited
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

  const totalPercentage = ghData.languages.reduce((acc, l) => acc + (Number(l.percentage) || 0), 0) || 100
  const normalizedLanguages = ghData.languages.map((l) => ({
    ...l,
    percentage: Math.round(((Number(l.percentage) || 0) / totalPercentage) * 100),
  }))

  return (
    <section
      id="github"
      className="py-10 sm:py-14 border-y relative"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      aria-labelledby="github-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20">
            Open Source &amp; Algorithms
          </span>
          <h2
            id="github-heading"
            className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Code. Build. <span className="gradient-text">Learn. Repeat.</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            Explore my code repositories, development metrics, and competitive programming profiles.
          </p>
        </motion.div>

        {/* Coding Platforms (GitHub, CodeChef, LeetCode) */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
          {codingPlatforms.map((p, i) => {
            const placeholder = isPlaceholder(p.url)
            return (
              <motion.a
                key={p.name}
                href={placeholder ? undefined : p.url}
                target={placeholder ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`card p-5 flex flex-col items-center justify-center text-center gap-3 transition-all ${
                  placeholder
                    ? 'opacity-60 cursor-default'
                    : 'hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-lg hover:shadow-[#2563eb]/10 cursor-pointer'
                }`}
              >
                <div
                  className="p-3 rounded-xl border flex items-center justify-center text-[#2563eb]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {p.name === 'GitHub' ? (
                    <Github size={24} />
                  ) : p.name === 'LeetCode' ? (
                    <Terminal size={24} />
                  ) : (
                    <Code2 size={24} />
                  )}
                </div>
                <div>
                  <span className="font-bold text-base block">{p.name}</span>
                  <span className="text-xs text-muted font-mono mt-0.5 block">
                    {placeholder ? 'Profile to be linked' : 'View Profile →'}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Most-Used Languages & Public Repos Summary */}
        <div className="mt-8 sm:mt-10 grid gap-8 md:grid-cols-2 items-start max-w-4xl mx-auto text-left">
          {/* Animated Most-Used Languages Card (Dynamically expands when languages are added) */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ layout: { duration: 0.35, ease: 'easeOut' } }}
            className="card p-7 flex flex-col h-auto transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-2 font-mono">
                  <Code2 size={16} /> Most-Used Languages
                </span>
                <span className="text-xs font-mono text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2.5 py-0.5 rounded-full">
                  {ghData.repos}+ Repositories
                </span>
              </div>

              {/* Segmented GitHub Top Ribbon */}
              <div className="mt-5 h-2.5 w-full rounded-full overflow-hidden flex gap-1 bg-white/5 p-0.5 border" style={{ borderColor: 'var(--border)' }}>
                {normalizedLanguages.map((lang, idx) => (
                  <motion.div
                    key={`seg-${lang.name}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Detailed Progress Bars starting from 0 to given percentage */}
              <div className="mt-6 space-y-4">
                {normalizedLanguages.map((lang, idx) => (
                  <motion.div layout key={lang.name} className="group">
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="font-semibold flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full shadow-sm"
                          style={{ backgroundColor: lang.color, boxShadow: `0 0 8px ${lang.color}80` }}
                        />
                        <span className="text-[var(--text-primary)] font-semibold">{lang.name}</span>
                      </span>
                      <span className="text-muted font-bold">{lang.percentage}%</span>
                    </div>

                    {/* Outer track */}
                    <div
                      className="h-3 w-full rounded-full overflow-hidden p-0.5 border"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                    >
                      {/* Inner animated fill bar starting from width: 0 */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                        className="h-full rounded-full relative"
                        style={{
                          background: `linear-gradient(90deg, ${lang.color}bb, ${lang.color})`,
                          boxShadow: `0 0 10px ${lang.color}60`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono text-muted" style={{ borderColor: 'var(--border)' }}>
              <span>Verified codebase distribution</span>
              <span className="text-[#38bdf8]">{normalizedLanguages.length} technologies tracked</span>
            </div>
          </motion.div>

          {/* Recent Repositories Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a855f7] flex items-center gap-2 font-mono">
                  <FolderGit2 size={16} /> Recent Repositories
                </span>
                {ghData.isLive ? (
                  <span className="text-[11px] text-[#22c55e] font-mono bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 rounded-full">
                    Live API
                  </span>
                ) : (
                  <span className="text-[11px] text-muted font-mono">Curated Stacks</span>
                )}
              </div>

              <ul className="mt-5 space-y-3.5">
                {ghData.recentRepos.map((repo) => (
                  <li
                    key={repo.name}
                    className="rounded-xl border p-4 text-xs card-hover transition-all"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#38bdf8] flex items-center gap-1.5">
                        <Terminal size={14} className="text-[#38bdf8]" />
                        {repo.name}
                      </span>
                      <span className="font-mono text-muted flex items-center gap-1 text-[11px]">
                        <Star size={12} className="text-[#eab308]" /> {repo.stars}
                      </span>
                    </div>
                    <p className="mt-2 text-muted text-xs leading-relaxed line-clamp-2">{repo.description}</p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                      <span className="text-[#a855f7] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
                        {repo.language}
                      </span>
                      {!isPlaceholder(repo.url) && (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#38bdf8] hover:underline flex items-center gap-1"
                        >
                          Repo <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono text-muted" style={{ borderColor: 'var(--border)' }}>
              <span>Public repositories &amp; open-source</span>
              <span className="text-[#22c55e]">Actively Maintained</span>
            </div>
          </motion.div>
        </div>

        <p className="mt-10 text-xs text-muted font-mono">
          GitHub configuration: {!isPlaceholder(profile.github) ? profile.github : 'Configurable in src/data/profile.js'}
        </p>
      </div>
    </section>
  )
}
