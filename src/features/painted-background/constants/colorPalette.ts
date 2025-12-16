import { type SitePage } from "../../../types/pages";
import type { ColorId, PaletteItem } from "../types/colorPalette";

const pi = (
  page: SitePage, color: ColorId, bg: string, text: string
): PaletteItem => (
  { page, color, bg, text }
)

export const INIT_PALETTE_ITEMS: PaletteItem[] = [
  pi("", "ashbl", "bg-ashbl", "text-ghost"),
  pi("about", "roylp", "bg-roylp", "text-ghost"),
  pi("projects", "chrtr", "bg-chrtr", "text-ashbl"),
  pi("experience", "orngc", "bg-orngc", "text-ghost"),
  pi("services", "palbr", "bg-palbr", "text-ghost"),
  pi("contact", "ghost", "bg-ghost", "text-ashbl"),
]