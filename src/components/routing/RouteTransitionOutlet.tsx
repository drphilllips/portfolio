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

  // Treat only pathname + search as a "route change".
  // Hash-only changes (e.g. /experience#taarcom) should NOT trigger remount/transition.
  const routeKey = `${location.pathname}${location.search}`

  // Explicit timing knobs (ms)
  const PAUSE_MS = prefersReducedMotion ? 0 : HOLD_OLD_PAGE_MS
  const FADE_IN_MS = prefersReducedMotion ? 0 : FADE_IN_NEW_PAGE_MS

  // Tailwind-ish timing function
  const ease = [0.4, 0, 0.2, 1] as const

  type Phase = "idle" | "appearing" | "pausing" | "fadingIn"

  // What is currently on screen (decoupled from router location)
  const [renderKey, setRenderKey] = useState(routeKey)
  const [renderedOutlet, setRenderedOutlet] = useState<React.ReactNode>(outlet)
  const [phase, setPhase] = useState<Phase>(
    prefersReducedMotion ? "idle" : "appearing"
  )

  // Pending navigation target
  const pendingRef = useRef<{ key: string; outlet: React.ReactNode }>({
    key: routeKey,
    outlet,
  })

  // Cancel stale timers when navigation happens rapidly
  const transitionIdRef = useRef(0)
  const pauseTimerRef = useRef<number | null>(null)
  const fadeDoneTimerRef = useRef<number | null>(null)
  const appearIdRef = useRef<number | null>(null)

  const lastRouteKeyRef = useRef(routeKey)
  const lastHashRef = useRef(location.hash)

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
      pendingRef.current = { key: routeKey, outlet }
      setRenderKey(routeKey)
      setRenderedOutlet(outlet)
      lastRouteKeyRef.current = routeKey
      lastHashRef.current = location.hash

      if (prefersReducedMotion || (PAUSE_MS === 0 && FADE_IN_MS === 0)) {
        // Reduced-motion: show immediately, no delays.
        appearIdRef.current = null
        setPhase("idle")
      } else {
        // First-mount appear animation: first paint is hidden (opacity 0) and
        // the pause is implemented via transition.delay.
        transitionIdRef.current += 1
        appearIdRef.current = transitionIdRef.current
        setPhase("appearing")
      }

      return
    }

    // Navigation detected (or location update)
    const prevRouteKey = lastRouteKeyRef.current
    // const prevHash = lastHashRef.current

    // Update trackers for next run
    lastRouteKeyRef.current = routeKey
    lastHashRef.current = location.hash

    // If pathname + search is unchanged, NEVER run an outlet transition.
    // This covers:
    // - /experience -> /experience#taarcom
    // - /experience#taarcom -> /experience#socotec
    // - /experience#taarcom -> /experience#taarcom (clicking the same hash again)
    // React Router may still generate a new location.key for these navigations,
    // but visually we want zero remount/transition because the routed screen is the same.
    if (routeKey === prevRouteKey) {
      // Keep the current screen mounted and visible.
      // (Do not change renderKey / do not swap outlets.)
      pendingRef.current = { key: routeKey, outlet }
      clearTimers()
      setPhase("idle")
      return
    }

    // Route change: run the normal transition
    transitionIdRef.current += 1
    const id = transitionIdRef.current

    // We are no longer in the initial appear path once a real navigation happens.
    appearIdRef.current = null

    // Update what we're navigating to, but do not render it yet.
    pendingRef.current = { key: routeKey, outlet }

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
  }, [prefersReducedMotion, routeKey, location.hash, outlet, PAUSE_MS, FADE_IN_MS])

  // Render exactly one screen at a time.
  // During pause: old screen stays visible, unchanged.
  // During fade-in: new screen mounts and fades in.

  // Initial mount: hide immediately on first paint, then delay + fade in.
  if (phase === "appearing") {
    const appearId = appearIdRef.current

    return (
      <motion.div
        key={renderKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: PAUSE_MS / 1000,
          duration: FADE_IN_MS / 1000,
          ease,
        }}
        className="w-full"
        style={{ willChange: "opacity" }}
        onAnimationComplete={() => {
          // If a navigation happens mid-appear, the effect will bump transitionIdRef
          // which invalidates this completion handler.
          if (appearId == null) return
          if (transitionIdRef.current !== appearId) return
          setPhase("idle")
        }}
      >
        {renderedOutlet}
      </motion.div>
    )
  }

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
