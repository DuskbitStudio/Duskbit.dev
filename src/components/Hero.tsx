import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Hero.css'

interface HeroProps {
  assembled: boolean
}

/**
 * Reads the frame's real width and gutter so the dimension line and the
 * spec table describe the layout as rendered, not as designed at 1440.
 */
function useFrameMetrics() {
  const ref = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ width: 1200, gutter: 24 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      setMetrics({
        width: Math.round(el.clientWidth),
        gutter: Math.round(parseFloat(getComputedStyle(el).columnGap) || 24),
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, ...metrics }
}

export function Hero({ assembled }: HeroProps) {
  const { ref, width, gutter } = useFrameMetrics()
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(width * f))
  const dimWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight)
        dimWrapRef.current?.style.setProperty('--dim-shift', `${(y * -0.06).toFixed(2)}px`)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero" aria-labelledby="wordmark">
      <div className="wrap">
        <div className="colgrid" ref={ref} aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
        </div>

        <div className="hero-top mono">
          <span>Duskbit — 暮点工作室</span>
          <span>Plate 01 / Type specimen</span>
        </div>

        <div className="plate">
          <h1 className="wordmark" id="wordmark">Duskbit</h1>
        </div>

        <div
          ref={dimWrapRef}
          className="dim-parallax-wrap"
          style={{ '--dim-shift': '0px' } as CSSProperties}
        >
          <div className={`dim${assembled ? ' is-assembled' : ''}`} aria-hidden="true">
            <span className="dim-cap l" />
            <span className="dim-line" />
            <span className="dim-tick t25" />
            <span className="dim-tick t50" />
            <span className="dim-tick t75" />
            <span className="dim-cap r" />
          </div>
          <div className="dim-labels" aria-hidden="true">
            {ticks.map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>

        <div className="hero-bottom">
          <dl className="spec mono" aria-label="版面参数">
            <div><dt>Scale</dt><dd>1 : 1</dd></div>
            <div><dt>Columns</dt><dd>12</dd></div>
            <div><dt>Gutter</dt><dd>{gutter}</dd></div>
            <div><dt>Unit</dt><dd>8</dd></div>
          </dl>

          <p className="lede">
            暮色里的一个点。
          </p>
        </div>
      </div>
    </section>
  )
}
