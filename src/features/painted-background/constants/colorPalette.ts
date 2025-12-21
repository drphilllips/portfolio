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
  orngc: "ghost",
  palbr: "ghost",
  ghost: "ashbl",
}

const COLOR_CARD_BGS: Record<ColorId, string> = {
  ashbl: "bg-ashbl-300",
  roylp: "bg-roylp-300",
  chrtr: "bg-chrtr-300",
  orngc: "bg-orngc-300",
  palbr: "bg-palbr-300",
  ghost: "bg-ghost-300",
}

const COLOR_CARD_BORDERS: Record<ColorId, string> = {
  ashbl: "border-ashbl/30",
  roylp: "border-roylp/30",
  chrtr: "border-chrtr/30",
  orngc: "border-orngc/30",
  palbr: "border-palbr/30",
  ghost: "border-ghost/30",
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
    sep: primary === "ghost"
      ? "bg-ghost"
      : "bg-ashbl",
  }
}

const sectionColors = (pageColorId: ColorId): SectionColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    // bg: COLOR_BGS[pageColorId],
    h1: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
  }
}

const contentColors = (pageColorId: ColorId): ContentColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    // bg: COLOR_BGS[pageColorId],
    h2: primary === "ghost"
      ? "text-ghost-300"
      : "text-ashbl-300",
    h3: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    p: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    sep: primary === "ghost"
      ? "bg-ghost/50"
      : "bg-ashbl/50",
  }
}

const cardColors = (pageColorId: ColorId): CardColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: COLOR_CARD_BGS[pageColorId],
    border: COLOR_CARD_BORDERS[pageColorId],
    h3: primary === "ghost"
      ? "text-ashbl-400"
      : "text-ghost-400",
    p: primary === "ghost"
      ? "text-ashbl-300"
      : "text-ghost-300",
    bulletPt: primary === "ghost"
      ? "text-ashbl-200"
      : "text-ghost-200",
    sep: primary === "ghost"
      ? "bg-ashbl/10"
      : "bg-ghost/10",
  }
}

const buttonColors = (pageColorId: ColorId): ButtonColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: primary === "ghost"
      ? "bg-ghost"
      : "bg-ashbl",
    border: COLOR_CARD_BORDERS[pageColorId],
    label: primary === "ghost"
      ? "text-ashbl"
      : "text-ghost",
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