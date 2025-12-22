import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type EasingFn = (t: number) => number

export function useSmoothScroll(href?: string) {
  const [hasScrolled, setHasScrolled] = useState(false)
  const navigate = useNavigate()

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

  const scrollOnClickLink: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    // only navigate if we have a href provided
    if (!href) return
    // Only handle hash navigation
    const hashIndex = href.indexOf("#")
    if (hashIndex === -1) return

    const hash = href.slice(hashIndex) // "#taarcom"
    const id = hash.slice(1) // "taarcom"
    if (!id) return

    // If href includes a path (e.g. "/experience#taarcom") and you're not on it,
    // let the router navigate normally (or handle as a separate case).
    const pathPart = href.slice(0, hashIndex)
    if (pathPart && pathPart !== location.pathname) return

    e.preventDefault()

    const el = document.getElementById(id)
    if (!el) {
      // still update the hash so it can be retried after render if needed
      navigate({ hash }, { replace: true })
      return
    }

    const y =
      el.getBoundingClientRect().top +
      window.scrollY

    smoothScrollTo(y-32, 800) // 👈 slower & more relaxed

    // Update URL hash without causing a remount (your RouteTransitionOutlet ignores hash)
    navigate({ hash }, { replace: true })
  }

  return { scrollOnClickLink, smoothScrollTo, hasScrolled }
}

function easeInOutCubic(t: number) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}