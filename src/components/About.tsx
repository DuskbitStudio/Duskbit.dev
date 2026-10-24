import { useInView } from '../hooks/useInView'
import { people } from '../content/people'
import { Section } from './Section'
import './About.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function About() {
  const bodyView = useInView<HTMLDivElement>()
  const railView = useInView<HTMLElement>()

  return (
    <Section id="about" index={2} title="关于" en="About" meta="Studio / 工作室">
      <div className="about-grid">
        <aside ref={railView.ref} className={`rail${railView.inView ? ' is-in' : ''}`}>
          <span className="mono">Col. 01—03</span>
          <p className="rail-zh">关于工作室</p>
          <div className="rail-scale" aria-hidden="true" />
          <span className="rail-foot mono">
            Predecessor — <a href="https://feedra.org" rel="noopener">feedra.org</a>
          </span>
        </aside>

        <div ref={bodyView.ref} className={`about-body reveal${bodyView.inView ? ' is-in' : ''}`}>
          <p>暮点工作室（Duskbit）是一家独立软件工作室。</p>
          <p>
            Duskbit 的前身是 <span className="dim-word">Feedra</span>（<a href="https://feedra.org" rel="noopener">feedra.org</a>），一个独立运营的软件项目。
          </p>
          <p>产品数量不多，持续维护。</p>

          <div className="people" aria-label="成员">
            <div className="people-head mono" aria-hidden="true">
              <span>No.</span>
              <span>成员</span>
              <span>链接</span>
            </div>
            {people.map((person, i) => (
              <div className="person-row" key={person.name}>
                <span className="person-idx mono">{pad(i + 1)}</span>
                <div className="person-info">
                  <span className="person-name">{person.name}</span>
                  {person.role && <span className="person-role mono">{person.role}</span>}
                </div>
                <div className="person-links">
                  {person.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="person-link mono"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
