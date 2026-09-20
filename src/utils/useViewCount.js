import { useState, useEffect } from 'react'

const BASE_COUNTER_URL = 'https://countapi.mileshilliard.com/api/v1/hit/abhishekkumar-portfolio-global-views'
const STORAGE_KEY = 'portfolio_global_view_count'

export function useViewCount() {
  const [views, setViews] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed > 0) return parsed
      }
    } catch {
      // ignore
    }
    return null
  })

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 6000)

    // Call live server hit endpoint to register this visit and get the incremented count
    // Using cache: 'no-store' and a timestamp query parameter to bypass browser/HTTP caches
    const hitUrl = `${BASE_COUNTER_URL}?t=${Date.now()}`

    fetch(hitUrl, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (isMounted && data && typeof data.value === 'number') {
          setViews(data.value)
          try {
            localStorage.setItem(STORAGE_KEY, data.value.toString())
          } catch {
            // ignore
          }
        }
      })
      .catch((err) => {
        console.warn('Live counter API unavailable, using fallback counter:', err)
        if (isMounted) {
          try {
            const stored = localStorage.getItem(STORAGE_KEY)
            const fallbackCount = (stored ? parseInt(stored, 10) || 1 : 1) + 1
            setViews(fallbackCount)
            localStorage.setItem(STORAGE_KEY, fallbackCount.toString())
          } catch {
            setViews((prev) => (prev ? prev + 1 : 1))
          }
        }
      })
      .finally(() => {
        clearTimeout(timeoutId)
      })

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return views
}
