import type { ColorPalette } from "../../../types/colorPalette";
import { type PageAbbreviation, type SitePage } from "../../../types/pages";
import type { ColorId, PaletteItem } from "../types/colorPalette";

export const NAVIGATE_PRESS_COOL_DOWN_MS = 2400

const pi = (
  page: SitePage,
  abbrev: PageAbbreviation,
  color: ColorId,
  bg: string,
  text: string,
  blendText: string,
): PaletteItem => (
  { page, abbrev, color, bg, text, blendText }
)

export const INIT_PALETTE_ITEMS: PaletteItem[] = [
  pi("", "HOME", "ashbl", "bg-ashbl", "text-ghost", "text-ashbl"),
  pi("about", "ABOU", "roylp", "bg-roylp", "text-ghost", "text-roylp"),
  pi("projects", "PROJ", "chrtr", "bg-chrtr", "text-ashbl", "text-chrtr"),
  pi("experience", "EXPE", "orngc", "bg-orngc", "text-ghost", "text-orngc"),
  pi("services", "SERV", "palbr", "bg-palbr", "text-ghost", "text-palbr"),
  pi("contact", "CONT", "ghost", "bg-ghost", "text-ashbl", "text-ghost"),
]

export const PAGE_COLORS: Record<SitePage, ColorPalette> = (
  INIT_PALETTE_ITEMS.reduce((acc, item) => {
    acc[item.page] = { pageColor: item.bg, textColor: item.text}
    return acc
  }, {} as Record<SitePage, ColorPalette>)
)