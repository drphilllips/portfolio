import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import type { ColorPalette } from "../../../types/colorPalette"
import type { SitePage } from "../../../types/pages"
import { PAGE_COLORS } from "../constants/colorPalette"

type PalettePair = ColorPalette

type PendingPaletteChange = PalettePair & {
  requestId: number
}

type ColorPaletteContextType = {
  /**
   * The committed palette that the DOM should currently be using.
   * `Page` consumes this value.
   */
  colorPalette: ColorPalette

  /**
   * Request a palette change. This does NOT immediately change the committed
   * page background class (to avoid Tailwind washing out the canvas reveal).
   *
   * The background is committed only when the canvas transition reports
   * completion.
   */
  requestPaletteChange: (pageColor: string, textColor: string, borderColor: string) => void

  /** True while a canvas transition is running. */
  isTransitioning: boolean

  /**
   * The latest pending change request (if any). Consumed by the canvas layer.
   */
  pendingPaletteChange: PendingPaletteChange | null

  /**
   * Called by the canvas layer when a given request finishes (or is skipped).
   */
  commitPendingPaletteChange: (requestId: number) => void
}

const ColorPaletteContext = createContext<ColorPaletteContextType | null>(null)

/**
 * Color Palette Provider
 * ----
 * Supplies:
 * - `colorPalette` (committed DOM palette)
 * - `requestPaletteChange` (starts a transition)
 * - `pendingPaletteChange` (what the user selected)
 * - `commitPendingPaletteChange` (called by the canvas overlay)
 */
export function ColorPaletteProvider({ children }: { children: React.ReactNode }) {
  // Find out what page we are on
  const { pathname } = useLocation()

  // Committed palette (what the DOM uses)
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>({
    pageColor: "bg-secondary",
    textColor: "text-primary",
    borderColor: "border-ghost",
  })

  // Pending change requested by the user (used by the canvas overlay)
  const [pendingPaletteChange, setPendingPaletteChange] = useState<PendingPaletteChange | null>(
    null
  )

  const [isTransitioning, setIsTransitioning] = useState(false)

  // Monotonic request id so the canvas can ignore stale completions.
  const requestIdRef = useRef(0)

  const requestPaletteChange = useCallback(
    (pageColor: string, textColor: string, borderColor: string) => {
    const nextId = ++requestIdRef.current

    setIsTransitioning(true)
    setPendingPaletteChange({ requestId: nextId, pageColor, textColor, borderColor })
  }, [])

  const commitPendingPaletteChange = useCallback(
    (requestId: number) => {
      setPendingPaletteChange(prev => {
        // Ignore stale callbacks.
        if (!prev || prev.requestId !== requestId) return prev

        // Commit the DOM palette.
        setColorPaletteState(() => ({
          pageColor: prev.pageColor,
          textColor: prev.textColor,
          borderColor: prev.borderColor,
        }))

        setIsTransitioning(false)
        return null
      })
    },
    []
  )

  const value = useMemo(
    () => ({
      colorPalette,
      requestPaletteChange,
      isTransitioning,
      pendingPaletteChange,
      commitPendingPaletteChange,
    }),
    [colorPalette, requestPaletteChange, isTransitioning, pendingPaletteChange, commitPendingPaletteChange]
  )

  useEffect(() => {
    const sitePage = pathname.split("/")[1] as SitePage
    const palette = PAGE_COLORS[sitePage]
    setTimeout(() => requestPaletteChange(palette.pageColor, palette.textColor, palette.borderColor),0)
  }, [pathname, requestPaletteChange])

  return <ColorPaletteContext.Provider value={value}>{children}</ColorPaletteContext.Provider>
}

export default ColorPaletteContext