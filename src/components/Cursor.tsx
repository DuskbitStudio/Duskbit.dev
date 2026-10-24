import { useEffect, useRef } from 'react'
import './Cursor.css'

function pad4(n: number): string {
  return String(Math.round(Math.abs(n))).padStart(4, '0')
}

export function Cursor() {
  const elRef = useRef<HTMLDivElement>(null)
  const coordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = elRef.current
    const coord = coordRef.current
    if (!el || !coord) return

    let tx = -20
    let ty = -20
    let cx = -20
    let cy = -20
    let raf = 0

    const loop = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      el.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`
      coord.textContent = `x ${pad4(cx)} / y ${pad4(cy)}`
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.display = ''
    }

    const onLeave = () => {
      el.style.display = 'none'
    }

    document.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="cursor" ref={elRef} aria-hidden="true">
      <span className="cursor-h" />
      <span className="cursor-v" />
      <span className="cursor-bit" />
      <span className="cursor-coord" ref={coordRef} />
    </div>
  )
}
