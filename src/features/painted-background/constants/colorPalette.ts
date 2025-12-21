import { type SitePage } from "../../../types/pages";
import { COLOR_IDS, type ButtonColors, type CardColors, type ColorId, type ColorPrimary, type ComponentColors, type ContentColors, type PageColors, type PaletteItem, type SectionColors, type TagColors } from "../types/colorPalette";

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

const COLOR_TEXTS: Record<ColorId, string> = Object.fromEntries(
  COLOR_IDS.map(colorId => [colorId, `text-${colorId}`])
) as Record<ColorId, string>

const COLOR_PRIMARIES: Record<ColorId, ColorPrimary> = {
  ashbl: "ghost",
  roylp: "ghost",
  chrtr: "ashbl",
  orngc: "ashbl",
  palbr: "ghost",
  ghost: "ashbl",
}

// Procedurally map each page color -> its primary text class (e.g. "text-ghost")
const COLOR_PRIMARY_TEXTS: Record<ColorId, string> = Object.fromEntries(
  (Object.entries(COLOR_PRIMARIES) as [ColorId, ColorPrimary][])
    .map(([colorId, primary]) => [colorId, `text-${primary}`])
) as Record<ColorId, string>

const COLOR_TAG_BGS: Record<ColorId, string> = {
  ashbl: "bg-ashbl-400",
  roylp: "bg-roylp-400",
  chrtr: "bg-chrtr-400",
  orngc: "bg-orngc-400",
  palbr: "bg-palbr-400",
  ghost: "bg-ghost-400",
}

const componentColors = (pageColorId: ColorId): ComponentColors => ({
  pageColors: pageColors(pageColorId),
  sectionColors: sectionColors(pageColorId),
  contentColors: contentColors(pageColorId),
  cardColors: cardColors(pageColorId),
  buttonColors: buttonColors(pageColorId),
  tagColors: tagColors(pageColorId),
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
      ? "bg-ghost/20"
      : "bg-ashbl/20",
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
      ? "bg-ghost/10"
      : "bg-ashbl/10",
  }
}

const cardColors = (pageColorId: ColorId): CardColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: "bg-ghost/30",
    border: "border-ghost/30",
    shadow: "shadow-ashbl/20",
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

const tagColors = (pageColorId: ColorId): TagColors => {
  return {
    bg: COLOR_TAG_BGS[pageColorId],
    border: "border-ghost/30",
    shadow: "shadow-ashbl/10",
    label: "text-ghost/90",
  }
}

// ----------
// Mass-export colors
// --------
const pi = (
  color: ColorId, page: SitePage, name: string,
): PaletteItem => (
  { color, page, name,
    bg: COLOR_BGS[color],
    text: COLOR_PRIMARY_TEXTS[color],
    blendText: COLOR_TEXTS[color],
    componentColors: componentColors(color),
  }
)

export const PALETTE_ITEMS: PaletteItem[] = [
  pi("ashbl", "", "Home"),
  pi("roylp", "about", "About"),
  pi("chrtr", "projects", "Projects"),
  pi("orngc", "experience", "Experience"),
  pi("palbr", "services", "Services"),
  pi("ghost", "contact", "Contact"),
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
  tagColors: tagColors("ashbl"),
}