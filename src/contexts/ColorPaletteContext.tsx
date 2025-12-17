import { createContext, useCallback, useMemo, useRef, useState } from "react"
import type { ColorPalette } from "../types/colorPalette"

type PalettePair = {
  pageColor: string
  textColor: string
}

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
  requestPaletteChange: (pageColor: string, textColor: string) => void

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
  // Committed palette (what the DOM uses)
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>({
    pageColor: "bg-primary",
    textColor: "text-primary",
  })

  // Pending change requested by the user (used by the canvas overlay)
  const [pendingPaletteChange, setPendingPaletteChange] = useState<PendingPaletteChange | null>(
    null
  )

  const [isTransitioning, setIsTransitioning] = useState(false)

  // Monotonic request id so the canvas can ignore stale completions.
  const requestIdRef = useRef(0)

  const requestPaletteChange = useCallback((pageColor: string, textColor: string) => {
    const nextId = ++requestIdRef.current

    setIsTransitioning(true)
    setPendingPaletteChange({ requestId: nextId, pageColor, textColor })
  }, [])

  const commitPendingPaletteChange = useCallback(
    (requestId: number) => {
      setPendingPaletteChange(prev => {
        // Ignore stale callbacks.
        if (!prev || prev.requestId !== requestId) return prev

        // Commit the DOM palette.
        setColorPaletteState(() => ({ pageColor: prev.pageColor, textColor: prev.textColor }))

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

  return <ColorPaletteContext.Provider value={value}>{children}</ColorPaletteContext.Provider>
}

export default ColorPaletteContext