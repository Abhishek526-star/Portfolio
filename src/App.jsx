import { useEffect, useState, createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import CommandPalette from './components/ui/CommandPalette.jsx'
import LoadingScreen from './components/ui/LoadingScreen.jsx'
import SpotlightBackground from './components/ui/SpotlightBackground.jsx'
import GlobalBubblesCanvas from './components/ui/GlobalBubblesCanvas.jsx'

import ProjectDetails from './pages/ProjectDetails.jsx'

const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="min-h-screen flex flex-col relative">
        <GlobalBubblesCanvas />
        <SpotlightBackground />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CommandPalette />
      </div>
    </ThemeContext.Provider>
  )
}
