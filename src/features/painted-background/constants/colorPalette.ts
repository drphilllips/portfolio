import type { ColorPalette } from "../../../types/colorPalette";
import { type SitePage } from "../../../types/pages";
import type { ColorId, PaletteItem } from "../types/colorPalette";

export const NAVIGATE_PRESS_COOL_DOWN_MS = 2400

const pi = (
  page: SitePage,
  name: string,
  color: ColorId,
  bg: string,
  text: string,
  blendText: string,
): PaletteItem => (
  { page, name, color, bg, text, blendText }
)

export const INIT_PALETTE_ITEMS: PaletteItem[] = [
  pi("", "Home", "ashbl", "bg-ashbl", "text-ghost", "text-ashbl"),
  pi("about", "About", "roylp", "bg-roylp", "text-ghost", "text-roylp"),
  pi("projects", "Projects", "chrtr", "bg-chrtr", "text-ashbl", "text-chrtr"),
  pi("experience", "Experience", "orngc", "bg-orngc", "text-ghost", "text-orngc"),
  pi("services", "Services", "palbr", "bg-palbr", "text-ghost", "text-palbr"),
  pi("contact", "Contact", "ghost", "bg-ghost", "text-ashbl", "text-ghost"),
]

export const PAGE_COLORS: Record<SitePage, ColorPalette> = (
  INIT_PALETTE_ITEMS.reduce((acc, item) => {
    acc[item.page] = { pageColor: item.bg, textColor: item.text}
    return acc
  }, {} as Record<SitePage, ColorPalette>)
)