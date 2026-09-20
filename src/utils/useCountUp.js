import { useState, useEffect } from 'react'

export function useCountUp(targetValue, duration = 1200, startOnView = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startOnView) return

    let start = 0
    const end = parseInt(targetValue, 10)
    if (isNaN(end) || end <= 0) {
      setCount(targetValue || 0)
      return
    }

    const stepTime = 16 // 60 fps
    const steps = Math.max(Math.floor(duration / stepTime), 1)
    const increment = end / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      start += increment
      if (currentStep >= steps) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [targetValue, duration, startOnView])

  return count
}
