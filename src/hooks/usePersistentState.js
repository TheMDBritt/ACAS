import { useEffect, useState } from 'react'

// Like useState, but saves the value to the browser's localStorage so
// your practice work (ticket status, POA&M changes, checklist ticks)
// survives a page refresh. Still no server — data lives only in your
// browser. Clearing site data resets the simulator to its defaults.
export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked — the app still works, just won't persist.
    }
  }, [key, value])

  return [value, setValue]
}
