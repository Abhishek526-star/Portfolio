import Hero from '../components/sections/Hero.jsx'
import QuickStats from '../components/sections/QuickStats.jsx'
import TechMarquee from '../components/ui/TechMarquee.jsx'
import About from '../components/sections/About.jsx'
import Skills from '../components/sections/Skills.jsx'
import Experience from '../components/sections/Experience.jsx'
import Projects from '../components/sections/Projects.jsx'
import DeveloperDashboard from '../components/sections/DeveloperDashboard.jsx'
import Education from '../components/sections/Education.jsx'
import Achievements from '../components/sections/Achievements.jsx'
import Services from '../components/sections/Services.jsx'
import ResumeCTA from '../components/sections/ResumeCTA.jsx'
import Contact from '../components/sections/Contact.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickStats />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <DeveloperDashboard />
      <Education />
      <Achievements />
      <Services />
      <ResumeCTA />
      <Contact />
    </>
  )
}
