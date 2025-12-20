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
  primary: string,
  secondaryText: string,
  border: string,
): PaletteItem => (
  { page, name, color, bg, text, blendText, primary, secondaryText, border }
)

export const INIT_PALETTE_ITEMS: PaletteItem[] = [
  pi("", "Home", "ashbl", "bg-ashbl", "text-ghost", "text-ashbl", "bg-ghost", "text-ashbl", "border-ghost/30"),
  pi("about", "About", "roylp", "bg-roylp", "text-ghost", "text-roylp", "bg-ghost", "text-ashbl", "border-ghost/30"),
  pi("projects", "Projects", "chrtr", "bg-chrtr", "text-ashbl", "text-chrtr", "bg-ashbl", "text-ghost", "border-ashbl/30"),
  pi("experience", "Experience", "orngc", "bg-orngc", "text-ghost", "text-orngc", "bg-ghost", "text-ashbl", "border-ghost/30"),
  pi("services", "Services", "palbr", "bg-palbr", "text-ghost", "text-palbr", "bg-ghost", "text-ashbl", "border-ghost/30"),
  pi("contact", "Contact", "ghost", "bg-ghost", "text-ashbl", "text-ghost", "bg-ashbl", "text-ghost", "border-ashbl/30"),
]

export const PAGE_COLORS: Record<SitePage, ColorPalette> = (
  INIT_PALETTE_ITEMS.reduce((acc, item) => {
    acc[item.page] = { pageColor: item.bg, textColor: item.text, primaryColor: item.primary, secondaryTextColor: item.secondaryText, borderColor: item.border}
    return acc
  }, {} as Record<SitePage, ColorPalette>)
)