import { useEffect, useState, type CSSProperties } from 'react'
import './Intro.css'

/** Logo module: total width 9.5u, bracket 2.5u, bit 3u, gap 0.75u. */
const LOGO_W = 160
const U = LOGO_W / 9.5
const BIT = 3 * U

/**
 * Motion budget, mirrored in Intro.css. There is a 0.30s hold before anything
 * moves; that dead time is excluded from the budget, so motion itself runs
 * 0.30s → 1.47s (1.17s) and stays inside the 1.5s ceiling.
 */
const END_MS = 1470

interface IntroProps {
  onComplete: () => void
}

export function Intro({ onComplete }: IntroProps) {
  // Scale that makes the 3u bit square cover the whole viewport diagonal.
  const [coverScale] = useState(() =>
    Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) / BIT) + 1,
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete()
      return
    }
    const t = setTimeout(onComplete, END_MS)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div
      className="intro"
      style={{ '--cover-scale': coverScale } as CSSProperties}
      aria-hidden="true"
    >
      <div className="intro-mark">
        <svg className="intro-bracket" viewBox="0 0 2.5 7">
          <path fill="currentColor" d="M0 0H2.5V1H1V6H2.5V7H0Z" />
        </svg>

        <div className="intro-bit" />

        <svg className="intro-bracket" viewBox="0 0 2.5 7">
          <path fill="currentColor" d="M2.5 0H0V1H1.5V6H0V7H2.5Z" />
        </svg>
      </div>
    </div>
  )
}
