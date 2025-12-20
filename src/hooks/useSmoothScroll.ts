import { useCallback } from "react"

type EasingFn = (t: number) => number

export function useSmoothScroll() {
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

  return { smoothScrollTo }
}

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}