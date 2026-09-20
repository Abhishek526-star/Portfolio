import { useEffect, useState } from 'react'

export default function SpotlightBackground() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
        setOpacity(1)
      })
    }

    const handleMouseLeave = () => setOpacity(0)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity,
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(37, 99, 235, 0.07), rgba(139, 92, 246, 0.04) 40%, transparent 80%)`,
      }}
      aria-hidden="true"
    />
  )
}
