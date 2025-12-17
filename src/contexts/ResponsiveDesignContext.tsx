import {
  createContext,
  useState,
  useMemo,
  useEffect,
} from "react"
import type { NavigatorWithStandalone, NavigatorWithUAData, ViewportDimensions } from "../types/responsiveDesign"

type ResponsiveDesignContextType = {
  viewport: ViewportDimensions | null
  onMobile: boolean
  onMobileUpright: boolean | null
  onMobileSideways: boolean | null
  isStandaloneApp: boolean
}

const ResponsiveDesignContext = createContext<ResponsiveDesignContextType | null>(null)

/**
 * Responsive Design Provider
 * ----
 * Provider component that supplies responsive design context values.
 * Tracks viewport size changes, detects standalone app mode, and derives mobile orientation flags.
 *
 * Context shape:
 * - `viewportWidth/Height`: current window dimensions or `null` if unavailable
 * - `onMobileUpright`: `true` if viewport width is below mobile threshold (portrait)
 * - `onMobileSideways`: `true` if viewport height is below mobile threshold (landscape)
 * - `isStandaloneApp`: `true` if running as a standalone PWA or installed app
 */
export function ResponsiveDesignProvider({
  children
}: {
  children: React.ReactNode
}) {
  // Initialize viewport width and height state with SSR safety checks
  const [viewport, setViewport] = useState<ViewportDimensions | null>(() => {
    if (typeof window === "undefined") return null
    return { width: window.innerWidth, height: window.innerHeight }
  })

  // Detect if running as a standalone app (PWA), with SSR safety
  const [isStandaloneApp, setIsStandaloneApp] = useState<boolean>(() => {
    if (typeof window === "undefined") return false

    const nav = window.navigator as NavigatorWithStandalone

    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true
    )
  })

  // --- Standalone (PWA) detection ---
  useEffect(() => {
    if (typeof window === "undefined") return

    const mq = window.matchMedia("(display-mode: standalone)")

    // Update standalone state on media query changes
    const handler = (e: MediaQueryListEvent) => {
      setIsStandaloneApp(e.matches)
    }

    mq.addEventListener("change", handler)
    // Cleanup listener on unmount
    return () => mq.removeEventListener("change", handler)
  }, [])

  // --- Viewport size tracking ---
  // Update viewport dimensions only if changed to avoid redundant renders
  const updateWidthHeight = () => {
    if (typeof window === "undefined") return

    const w = window.innerWidth
    const h = window.innerHeight

    setViewport((prev) => (
      prev?.width === w && prev?.height === h
      ? prev : { width: w, height: h }
    ))
  }
  useEffect(() => {
    if (typeof window === "undefined") return

    // Attach resize listener to update viewport size
    window.addEventListener("resize", updateWidthHeight)
    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateWidthHeight)
  }, [])

  // --- Derived responsive flags ---
  // Determine if device is mobile
  const onMobile = useMemo(() => {
    // 1) Best signal when available
    const uaData = (navigator as NavigatorWithUAData).userAgentData
    if (typeof uaData?.mobile === "boolean") return uaData.mobile

    // 2) Input-capability heuristic
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false
    const noHover = window.matchMedia?.("(hover: none)")?.matches ?? false
    const touchPoints = navigator.maxTouchPoints ?? 0

    // Typical "phone-ish" environment
    if (coarsePointer && noHover) return true

    // Touch-only / mostly-touch devices
    if (touchPoints > 0 && (coarsePointer || noHover)) return true

    return false
  }, [])

  // Determine if device is upright (portrait)
  const onMobileUpright = useMemo(() => {
    if (viewport == null) return null
    return onMobile && viewport.width < viewport.height
  }, [onMobile, viewport])

  // Determine if device is sideways (landscape)
  const onMobileSideways = useMemo(() => {
    if (onMobileUpright == null) return null
    return onMobile && !onMobileUpright
  }, [onMobile, onMobileUpright])

  return (
    <ResponsiveDesignContext.Provider
      value={{
        onMobile,
        onMobileUpright,
        onMobileSideways,
        isStandaloneApp,
        viewport,
      }}
    >
      {children}
    </ResponsiveDesignContext.Provider>
  )
}

export default ResponsiveDesignContext