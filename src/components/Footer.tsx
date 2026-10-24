import type { CSSProperties } from 'react'
import { useInView } from '../hooks/useInView'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  const { ref, inView } = useInView<HTMLElement>(0.4)

  return (
    <footer className={`footer${inView ? ' is-in' : ''}`} ref={ref}>
      <div className="ruler" aria-hidden="true" />
      <div className="wrap">
        <div
          className={`foot-top reveal${inView ? ' is-in' : ''}`}
          style={{ '--reveal-delay': '0.2s' } as CSSProperties}
        >
          <div className="foot-brand">
            <Logo label="Duskbit logo" />
            <div>
              <span className="word">Duskbit</span>
              <span className="zh">暮点工作室</span>
            </div>
          </div>

          <div className="foot-links">
            <a href="https://duskbit.dev" rel="noopener">duskbit.dev</a>
            <a href="https://feedra.org" rel="noopener">feedra.org</a>
          </div>
        </div>

        <div
          className={`foot-bottom reveal${inView ? ' is-in' : ''}`}
          style={{ '--reveal-delay': '0.32s' } as CSSProperties}
        >
          <span className="spec-line">Grid 12 · Gutter 24 · Unit 8 · Sans / Mono · Accent #F26B3A</span>
          <span className="mono">© 2026 Duskbit / 暮点工作室</span>
        </div>
      </div>
    </footer>
  )
}
