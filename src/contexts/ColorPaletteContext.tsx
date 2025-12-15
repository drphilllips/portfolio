import {
  createContext,
  useState,
} from "react"
import type { ColorPalette } from "../types/color"
import { setThemeColor } from "../utils/setThemeColor"

type ColorPaletteContextType = {
  colorPalette: ColorPalette
  setColorPalette: (pageColor: string, textColor: string) => void
}

const ColorPaletteContext = createContext<ColorPaletteContextType | null>(null)

/**
 * Color Palette Provider
 * ----
 * Provider component that supplies color palette context values.
 * Allows user to set color palette and affect page background & text colors.
 *
 * Context shape:
 * - `colorPalette`:
 *    Retrieve colors for a site page's background and text.
 *    defaults to `bg-primary` and `text-primary` if no color
 *    is selected from the color palette.
 *
 * - `setColorPalette`:
 *    Set background and text color for all site pages.
 *    Allows the user to define the site's color palette.
 */
export function ColorPaletteProvider({
  children
}: {
  children: React.ReactNode
}) {
  // Initialize colors to primary values
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>({
    pageColor: "bg-primary",
    textColor: "text-primary",
  })

  function setColorPalette(pageColor: string, textColor: string) {
    setColorPaletteState(prev => {
      setThemeColor(prev.pageColor, pageColor)
      return { pageColor, textColor }
    })
  }

  return (
    <ColorPaletteContext.Provider
      value={{
        colorPalette,
        setColorPalette,
      }}
    >
      {children}
    </ColorPaletteContext.Provider>
  )
}

export default ColorPaletteContext