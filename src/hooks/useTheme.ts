import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'duskbit-theme'
const root = document.documentElement
const mq = window.matchMedia('(prefers-color-scheme: dark)')

/** Explicit choice on <html data-theme>, otherwise the system preference. */
function resolve(): Theme {
  const t = root.getAttribute('data-theme')
  if (t === 'light' || t === 'dark') return t
  return mq.matches ? 'dark' : 'light'
}

/**
 * The saved choice is applied by an inline script in index.html before
 * React mounts; this hook only reads it back and handles changes.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(resolve)

  useEffect(() => {
    // Only follow the system while the user hasn't picked a theme.
    const onChange = () => {
      if (!root.hasAttribute('data-theme')) setTheme(resolve())
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = resolve() === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
