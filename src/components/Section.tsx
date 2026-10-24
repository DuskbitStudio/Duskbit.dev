import type { CSSProperties, ReactNode } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'
import './Section.css'

interface SectionProps {
  id: string
  /** Section number, shown as "§ 01". Matches the nav numbering. */
  index: number
  title: string
  en: string
  meta: string
  children: ReactNode
}

const pad = (n: number) => String(n).padStart(2, '0')

export function Section({ id, index, title, en, meta, children }: SectionProps) {
  const titleId = `${id}-title`
  const { ref, inView } = useInView<HTMLElement>()
  const displayIdx = useCountUp(index, inView)

  return (
    <section
      className={`section${inView ? ' is-in' : ''}`}
      id={id}
      aria-labelledby={titleId}
      ref={ref}
    >
      <div className="wrap">
        <div className="sect-head">
          <span className="sect-idx mono">§ {pad(displayIdx)}</span>
          <h2 className="sect-title" id={titleId}>
            {title}
            <span className="en">{en}</span>
          </h2>
          <span className="sect-meta mono">{meta}</span>
        </div>

        <div className="colticks" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {pad(i + 1)}
            </span>
          ))}
        </div>

        {children}
      </div>
    </section>
  )
}
