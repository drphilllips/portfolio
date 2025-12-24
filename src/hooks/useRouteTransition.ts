import { useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import type { RouteTransitionPhase } from "../types/routeTransition"
import { FADE_IN_NEW_PAGE_MS, HOLD_OLD_PAGE_MS } from "../constants/routeTransition"


export default function useRouteTransition() {
  // Render exactly one screen at a time.
  // During pause: old screen stays visible, unchanged.
  // During fade-in: new screen mounts and fades in.

  const location = useLocation()
  const outlet = useOutlet()
  const prefersReducedMotion = useReducedMotion()

  const holdOldPageMs = prefersReducedMotion ? 0 : HOLD_OLD_PAGE_MS
  const fadeInNewPageMs = prefersReducedMotion ? 0 : FADE_IN_NEW_PAGE_MS

  // Treat only pathname + search as a "route change".
  // Hash-only changes (e.g. /experience#taarcom) should NOT trigger remount/transition.
  const routeKey = `${location.pathname}${location.search}`

  // What is currently on screen (decoupled from router location)
  const [renderKey, setRenderKey] = useState(routeKey)
  const [renderedOutlet, setRenderedOutlet] = useState<React.ReactNode>(outlet)
  const [phase, setPhase] = useState<RouteTransitionPhase>(
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

  function clearTimers() {
    clearTimer(pauseTimerRef)
    clearTimer(fadeDoneTimerRef)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ----------
  // Skip any pause/fade on initial mount (recommended)
  // --------
  const hasMountedRef = useRef(false)
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      pendingRef.current = { key: routeKey, outlet }
      setRenderKey(routeKey)
      setRenderedOutlet(outlet)
      lastRouteKeyRef.current = routeKey
      lastHashRef.current = location.hash

      if (prefersReducedMotion || (holdOldPageMs === 0 && fadeInNewPageMs === 0)) {
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

    if (holdOldPageMs === 0 && fadeInNewPageMs === 0) {
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
      }, fadeInNewPageMs)
    }, holdOldPageMs)
  }, [prefersReducedMotion, routeKey, location.hash, outlet, holdOldPageMs, fadeInNewPageMs])

  return { phase, setPhase, appearIdRef, renderKey, transitionIdRef, renderedOutlet, holdOldPageMs, fadeInNewPageMs }
}

function clearTimer(ref: React.RefObject<number | null>) {
  if (ref.current != null) {
    window.clearTimeout(ref.current)
    ref.current = null
  }
}