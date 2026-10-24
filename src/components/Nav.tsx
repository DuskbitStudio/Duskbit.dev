import { CSSProperties, useLayoutEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './Logo'
import './Nav.css'

interface NavProps {
  /** False while the intro plays; the nav fades in once it ends. */
  visible: boolean
}

export function Nav({ visible }: NavProps) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  const active = useActiveSection(['products', 'about'])
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const linksContainerRef = useRef<HTMLElement | null>(null)
  const navBitRef = useRef<HTMLSpanElement | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (!active) return
    const el = linkRefs.current[active]
    const container = linksContainerRef.current
    if (!el || !container) return
    const containerLeft = container.getBoundingClientRect().left
    const elLeft = el.getBoundingClientRect().left
    const bitX = elLeft - containerLeft - 12
    if (navBitRef.current) {
      navBitRef.current.style.setProperty('--bit-x', `${bitX}px`)
      navBitRef.current.style.setProperty('--bit-op', '1')
    }
  }, [active])

  function handleToggle() {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      btnRef.current?.classList.add('is-pressed')
      setTimeout(() => btnRef.current?.classList.remove('is-pressed'), 180)
    }
    toggle()
  }

  return (
    <header className={`nav${visible ? ' nav--visible' : ''}`}>
      <div className="nav-in">
        <a className="brand" href="#top" aria-label="Duskbit 暮点工作室 首页">
          <Logo />
          <span className="brand-name">Duskbit</span>
          <span className="brand-zh">暮点工作室</span>
        </a>

        <div className="nav-right">
          <nav
            className="nav-links"
            aria-label="主导航"
            ref={(el) => { linksContainerRef.current = el }}
          >
            <span
              className="nav-bit"
              aria-hidden="true"
              ref={navBitRef}
              style={{ '--bit-x': '-20px', '--bit-op': 0 } as CSSProperties}
            />
            <a
              href="#products"
              ref={(el) => { linkRefs.current['products'] = el }}
            >
              <span className="n">01</span>产品
            </a>
            <a
              href="#about"
              ref={(el) => { linkRefs.current['about'] = el }}
            >
              <span className="n">02</span>关于
            </a>
          </nav>
          <span className="nav-sep" aria-hidden="true" />
          <button
            className={`theme-btn${dark ? ' is-dark' : ''}`}
            type="button"
            onClick={handleToggle}
            aria-label={dark ? '切换到浅色主题' : '切换到深色主题'}
            aria-pressed={dark}
            ref={btnRef}
          >
            <span className="sw" aria-hidden="true" />
            <span>{dark ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
