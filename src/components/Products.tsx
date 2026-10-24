import { products } from '../content/products'
import { Section } from './Section'
import './Products.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function Products() {
  return (
    <Section
      id="products"
      index={1}
      title="产品"
      en="Products"
      meta={`${pad(products.length)} entries`}
    >
      <div className="table">
        <div className="tr th" aria-hidden="true">
          <span>No.</span>
          <span>Project</span>
          <span>Platform</span>
          <span>Status</span>
        </div>

        {products.map((p, i) => (
          <article className="tr" key={p.name}>
            <div className="p-idx">{pad(i + 1)}</div>
            <div>
              {p.url
                ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="p-name-link"><h3 className="p-name">{p.name}</h3></a>
                : <h3 className="p-name">{p.name}</h3>
              }
              <p className="p-desc">{p.desc}</p>
              {p.url && <span className="p-tag">↗ open</span>}
            </div>
            <div className="p-meta">{p.platform}</div>
            <div className="p-status">
              <i aria-hidden="true" />
              {p.status}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
