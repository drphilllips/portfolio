import { useCallback, useEffect, useState } from "react"

type EasingFn = (t: number) => number

export function useSmoothScroll() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY >= 10)
    }

    onScroll() // initialize on mount
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const smoothScrollTo = useCallback(
    (
      targetY: number,
      duration = 700,
      easing: EasingFn = easeInOutCubic
    ) => {
      const startY = window.scrollY
      const delta = targetY - startY
      const startTime = performance.now()

      function tick(now: number) {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easing(progress)

        window.scrollTo(0, startY + delta * eased)

        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }

      requestAnimationFrame(tick)
    },
    []
  )

  return { smoothScrollTo, hasScrolled }
}

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}