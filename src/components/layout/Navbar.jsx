import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Github, Linkedin, FileText } from 'lucide-react'
import { useTheme } from '../../App.jsx'
import { profile } from '../../data/profile.js'
import { isPlaceholder } from '../../utils/helpers.js'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [location.pathname])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const targetId = href.slice(1)

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md shadow-sm border-b' : 'bg-transparent'
      }`}
      style={
        scrolled
          ? {
              backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
              borderColor: 'var(--border)',
            }
          : {}
      }
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="font-bold text-lg tracking-tight text-[var(--text-primary)]"
            aria-label="Abhishek Kumar portfolio home"
          >
            <span className="text-[#2563eb] font-mono">&gt;_</span> {profile.name}
          </Link>

          {/* Desktop nav with modern glassmorphic capsule dock */}
          <ul className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#111827]/80 backdrop-blur-xl shadow-xs">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1) && location.pathname === '/'

              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative z-10 block px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-[#2563eb] dark:text-[#38bdf8] font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>

                  {/* Active floating indicator pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#2563eb]/10 dark:bg-[#2563eb]/25 border border-[#2563eb]/30 shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-2.5">
            {!isPlaceholder(profile.github) && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#111827]/80 text-slate-700 dark:text-slate-300 hover:text-[#2563eb] dark:hover:text-[#38bdf8] hover:border-[#2563eb]/40 transition-all"
                aria-label="GitHub profile"
              >
                <Github size={17} />
              </a>
            )}
            {!isPlaceholder(profile.linkedin) && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#111827]/80 text-slate-700 dark:text-slate-300 hover:text-[#2563eb] dark:hover:text-[#38bdf8] hover:border-[#2563eb]/40 transition-all"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={17} />
              </a>
            )}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#111827]/80 text-slate-700 dark:text-slate-300 hover:text-[#2563eb] dark:hover:text-[#38bdf8] hover:border-[#2563eb]/40 transition-all cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 rounded-full bg-[#2563eb] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1d4ed8] shadow-md shadow-[#2563eb]/20 hover:scale-105 transition-all"
            >
              <FileText size={14} />
              Resume
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted hover:text-[var(--text-primary)] p-1.5"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[var(--text-primary)] p-1.5"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer with smooth Framer Motion animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t overflow-hidden"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          >
            <ul className="px-4 py-4 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1) && location.pathname === '/'
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#2563eb]/10 text-[#2563eb] dark:text-[#38bdf8] font-semibold border border-[#2563eb]/20'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-[#2563eb]/20"
                >
                  <FileText size={16} /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
