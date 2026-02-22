import { useState, useEffect } from 'react'

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)

    const handleChange = (e) => setIsMobile(e.matches)

    // Modern browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handleChange)
    } else {
      mql.addListener(handleChange)
    }

    // Sync initial state
    setIsMobile(mql.matches)

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleChange)
      } else {
        mql.removeListener(handleChange)
      }
    }
  }, [breakpoint])

  return isMobile
}
