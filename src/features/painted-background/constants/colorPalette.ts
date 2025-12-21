import { type SitePage } from "../../../types/pages";
import type { ButtonColors, CardColors, ColorId, ColorPrimary, ComponentColors, ContentColors, PageColors, PaletteItem, SectionColors } from "../types/colorPalette";

export const NAVIGATE_PRESS_COOL_DOWN_MS = 2400

// -----------
// Component-based styling
// --------
const COLOR_BGS: Record<ColorId, string> = {
  ashbl: "bg-ashbl",
  roylp: "bg-roylp",
  chrtr: "bg-chrtr",
  orngc: "bg-orngc",
  palbr: "bg-palbr",
  ghost: "bg-ghost",
}

const COLOR_PRIMARIES: Record<ColorId, ColorPrimary> = {
  ashbl: "ghost",
  roylp: "ghost",
  chrtr: "ashbl",
  orngc: "ashbl",
  palbr: "ghost",
  ghost: "ashbl",
}

const COLOR_CARD_BORDERS: Record<ColorId, string> = {
  ashbl: "border-ashbl-400",
  roylp: "border-roylp-400",
  chrtr: "border-chrtr-400",
  orngc: "border-orngc-400",
  palbr: "border-palbr-400",
  ghost: "border-ghost-400",
}

const componentColors = (pageColorId: ColorId): ComponentColors => ({
  pageColors: pageColors(pageColorId),
  sectionColors: sectionColors(pageColorId),
  contentColors: contentColors(pageColorId),
  cardColors: cardColors(pageColorId),
  buttonColors: buttonColors(pageColorId),
})

const pageColors = (pageColorId: ColorId): PageColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: COLOR_BGS[pageColorId],
    title: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    sub: primary === "ghost"
      ? "text-ghost/40"
      : "text-ashbl/40",
    sep: primary === "ghost"
      ? "bg-ghost/40"
      : "bg-ashbl/40",
  }
}

const sectionColors = (pageColorId: ColorId): SectionColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    // bg: COLOR_BGS[pageColorId],
    h1: primary === "ghost"
      ? "text-ghost/40"
      : "text-ashbl/40",
  }
}

const contentColors = (pageColorId: ColorId): ContentColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    // bg: COLOR_BGS[pageColorId],
    h2: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    h3: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    p: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    sep: primary === "ghost"
      ? "bg-ghost/40"
      : "bg-ashbl/40",
  }
}

const cardColors = (pageColorId: ColorId): CardColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: primary === "ghost"
      ? "bg-ashbl/20"
      : "bg-ghost/20",
    border: COLOR_CARD_BORDERS[pageColorId],
    h3: primary === "ghost"
      ? "text-ghost-400"
      : "text-ashbl-400",
    p: primary === "ghost"
      ? "text-ghost-500"
      : "text-ashbl-500",
    bulletPt: primary === "ghost"
      ? "text-ghost-400"
      : "text-ashbl-400",
    sep: primary === "ghost"
      ? "bg-ghost/10"
      : "bg-ashbl/10",
  }
}

const buttonColors = (pageColorId: ColorId): ButtonColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: primary === "ghost"
      ? "bg-ghost"
      : "bg-ashbl",
    border: primary === "ghost"
      ? "border-ashbl/30"
      : "border-ghost/30",
    label: primary === "ghost"
      ? "text-ashbl/80"
      : "text-ghost/80",
  }
}

// ----------
// Mass-export colors
// --------
const pi = (
  color: ColorId, page: SitePage, name: string, bg: string, text: string, blendText: string, componentColors: ComponentColors
): PaletteItem => (
  { color, page, name, bg, text, blendText, componentColors }
)

export const PALETTE_ITEMS: PaletteItem[] = [
  pi("ashbl", "", "Home", "bg-ashbl", "text-ghost", "text-ashbl", componentColors("ashbl")),
  pi("roylp", "about", "About", "bg-roylp", "text-ghost", "text-roylp", componentColors("roylp")),
  pi("chrtr", "projects", "Projects", "bg-chrtr", "text-ashbl", "text-chrtr", componentColors("chrtr")),
  pi("orngc", "experience", "Experience", "bg-orngc", "text-ghost", "text-orngc", componentColors("orngc")),
  pi("palbr", "services", "Services", "bg-palbr", "text-ghost", "text-palbr", componentColors("palbr")),
  pi("ghost", "contact", "Contact", "bg-ghost", "text-ashbl", "text-ghost", componentColors("ghost")),
]

export const PAGE_COMPONENT_COLORS: Record<SitePage, ComponentColors> = (
  PALETTE_ITEMS.reduce((acc, item) => {
    acc[item.page] = item.componentColors
    return acc
  }, {} as Record<SitePage, ComponentColors>)
)

// ----------
// Init values
// --------
export const INIT_COMPONENT_COLORS: ComponentColors = {
  pageColors: pageColors("ashbl"),
  sectionColors: sectionColors("ashbl"),
  contentColors: contentColors("ashbl"),
  cardColors: cardColors("ashbl"),
  buttonColors: buttonColors("ashbl"),
}