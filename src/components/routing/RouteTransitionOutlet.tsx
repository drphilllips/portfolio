import { useLocation, useOutlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { FADE_IN_NEW_PAGE_MS, HOLD_OLD_PAGE_MS } from "../../constants/routeTransition"

/**
 * RouteTransitionOutlet
 * ---
 * Animates only the routed page content (the <Outlet />), leaving always-on layers
 * (ColorPalette, CanvasBackgroundTransition, AppShell) mounted and unaffected.
 *
 * Behavior:
 * - On navigation, the current route fades out over 300ms.
 * - After exit completes, there is a 500ms pause (background-only).
 * - Then the next route fades in over 500ms (no overlap) via mode="wait".
 */
export default function RouteTransitionOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  const prefersReducedMotion = useReducedMotion()

  // Explicit timing knobs (ms)
  const PAUSE_MS = prefersReducedMotion ? 0 : HOLD_OLD_PAGE_MS
  const FADE_IN_MS = prefersReducedMotion ? 0 : FADE_IN_NEW_PAGE_MS

  // Tailwind-ish timing function
  const ease = [0.4, 0, 0.2, 1] as const

  type Phase = "idle" | "pausing" | "fadingIn"

  // What is currently on screen (decoupled from router location)
  const [renderKey, setRenderKey] = useState(location.key)
  const [renderedOutlet, setRenderedOutlet] = useState<React.ReactNode>(outlet)
  const [phase, setPhase] = useState<Phase>("idle")

  // Pending navigation target
  const pendingRef = useRef<{ key: string; outlet: React.ReactNode }>({
    key: location.key,
    outlet,
  })

  // Cancel stale timers when navigation happens rapidly
  const transitionIdRef = useRef(0)
  const pauseTimerRef = useRef<number | null>(null)
  const fadeDoneTimerRef = useRef<number | null>(null)

  const clearTimers = () => {
    if (pauseTimerRef.current != null) {
      window.clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
    if (fadeDoneTimerRef.current != null) {
      window.clearTimeout(fadeDoneTimerRef.current)
      fadeDoneTimerRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Skip any pause/fade on initial mount (recommended)
  const hasMountedRef = useRef(false)
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      pendingRef.current = { key: location.key, outlet }
      setRenderKey(location.key)
      setRenderedOutlet(outlet)
      setPhase("idle")
      return
    }

    // Navigation detected
    transitionIdRef.current += 1
    const id = transitionIdRef.current

    // Update what we're navigating to, but do not render it yet.
    pendingRef.current = { key: location.key, outlet }

    clearTimers()

    if (PAUSE_MS === 0 && FADE_IN_MS === 0) {
      // Reduced-motion: swap immediately, no delays.
      setRenderKey(pendingRef.current.key)
      setRenderedOutlet(pendingRef.current.outlet)
      setPhase("idle")
      return
    }

    // Phase 1: pause while keeping the old page fully visible.
    setPhase("pausing")

    pauseTimerRef.current = window.setTimeout(() => {
      if (transitionIdRef.current !== id) return

      // Phase 2: swap in the new page, then fade it in.
      setRenderKey(pendingRef.current.key)
      setRenderedOutlet(pendingRef.current.outlet)
      setPhase("fadingIn")

      fadeDoneTimerRef.current = window.setTimeout(() => {
        if (transitionIdRef.current !== id) return
        setPhase("idle")
      }, FADE_IN_MS)
    }, PAUSE_MS)
  }, [location.key, outlet, PAUSE_MS, FADE_IN_MS])

  // Render exactly one screen at a time.
  // During pause: old screen stays visible, unchanged.
  // During fade-in: new screen mounts and fades in.
  if (phase === "fadingIn") {
    return (
      <motion.div
        key={renderKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: FADE_IN_MS / 1000, ease }}
        className="w-full"
        style={{ willChange: "opacity" }}
      >
        {renderedOutlet}
      </motion.div>
    )
  }

  return (
    <div key={renderKey} className="w-full" style={{ willChange: "opacity" }}>
      {renderedOutlet}
    </div>
  )
}
