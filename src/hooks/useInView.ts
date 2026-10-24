import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

export function useInView<T extends HTMLElement>(
  threshold = 0.15
): { ref: RefObject<T>; inView: boolean } {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}
