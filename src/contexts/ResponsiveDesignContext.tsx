import {
  createContext,
  useState,
  useMemo,
  useEffect,
} from "react"
import { MOBILE_DEVICE_WIDTH_THRESHOLD } from "../constants/responsiveDesign"

// Extend Navigator to include optional standalone property for iOS PWA detection
type NavigatorWithStandalone = Navigator & {
  standalone?: boolean
}

type ResponsiveDesignContextType = {
  viewportWidth: number | null
  viewportHeight: number | null
  onMobileUpright: boolean
  onMobileSideways: boolean
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
  const [viewportWidth, setViewportWidth] = useState<number | null>(() => {
    if (typeof window === "undefined") return null
    return window.innerWidth
  })
  const [viewportHeight, setViewportHeight] = useState<number | null>(() => {
    if (typeof window === "undefined") return null
    return window.innerHeight
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

    setViewportWidth((prev) => (prev === w ? prev : w))
    setViewportHeight((prev) => (prev === h ? prev : h))
  }
  useEffect(() => {
    if (typeof window === "undefined") return

    // Attach resize listener to update viewport size
    window.addEventListener("resize", updateWidthHeight)
    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateWidthHeight)
  }, [])

  // --- Derived responsive flags ---
  // Determine if device is mobile in upright (portrait) orientation
  const onMobileUpright = useMemo(() => {
    if (viewportWidth == null) return false

    if (viewportWidth < MOBILE_DEVICE_WIDTH_THRESHOLD) {
      return true
    }

    return false
  }, [viewportWidth])

  // Determine if device is mobile in sideways (landscape) orientation
  const onMobileSideways = useMemo(() => {
    if (viewportHeight == null) return false

    if (viewportHeight < MOBILE_DEVICE_WIDTH_THRESHOLD) {
      return true
    }

    return false
  }, [viewportHeight])

  return (
    <ResponsiveDesignContext.Provider
      value={{
        onMobileUpright,
        onMobileSideways,
        isStandaloneApp,
        viewportWidth,
        viewportHeight,
      }}
    >
      {children}
    </ResponsiveDesignContext.Provider>
  )
}

export default ResponsiveDesignContext