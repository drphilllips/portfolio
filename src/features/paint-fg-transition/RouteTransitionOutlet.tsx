import { motion } from "motion/react"
import { ROUTE_TRANSITION_EASE } from "../../constants/routeTransition"
import useRouteTransition from "../../hooks/useRouteTransition"

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

  const {
    phase,
    setPhase,
    appearIdRef,
    renderKey,
    transitionIdRef,
    renderedOutlet,
    holdOldPageMs,
    fadeInNewPageMs,
  } = useRouteTransition()

  // ----------
  // Initial mount:
  // - Hide immediately on first paint,
  // - Then delay + fade in.
  // --------
  if (phase === "appearing") {
    const appearId = appearIdRef.current

    return (
      <motion.div
        key={renderKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: holdOldPageMs / 1000,
          duration: fadeInNewPageMs / 1000,
          ease: ROUTE_TRANSITION_EASE,
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

  // ----------
  // Once paint-fg-anim completes, fade in new route
  // --------
  if (phase === "fadingIn") {
    return (
      <motion.div
        key={renderKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: fadeInNewPageMs / 1000, ease: ROUTE_TRANSITION_EASE }}
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
