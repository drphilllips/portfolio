import type { CardColors, ColorId, ColorPrimary, ComponentColors, ContentColors, CtaColors, LinkColors, PageColors, PaletteItem, SectionColors, TagColors } from "../types/colorPalette";
import { type SitePage } from "../types/pages";

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

const COLOR_TEXTS: Record<ColorId, string> = {
  ashbl: "text-ashbl",
  roylp: "text-roylp",
  chrtr: "text-chrtr",
  orngc: "text-orngc",
  palbr: "text-palbr",
  ghost: "text-ghost",
}

const COLOR_PRIMARIES: Record<ColorId, ColorPrimary> = {
  ashbl: "ghost",
  roylp: "ghost",
  chrtr: "ashbl",
  orngc: "ashbl",
  palbr: "ghost",
  ghost: "ashbl",
}

// Procedurally map each page color -> its primary text class (e.g. "text-ghost")
export const COLOR_PRIMARY_TEXTS: Record<ColorId, string> = {
  ashbl: "text-ghost",
  roylp: "text-ghost",
  chrtr: "text-ashbl",
  orngc: "text-ashbl",
  palbr: "text-ghost",
  ghost: "text-ashbl",
}

export const COLOR_PRIMARY_BGS: Record<ColorId, string> = {
  ashbl: "bg-ghost",
  roylp: "bg-ghost",
  chrtr: "bg-ashbl",
  orngc: "bg-ashbl",
  palbr: "bg-ghost",
  ghost: "bg-ashbl",
}

const COLOR_TAG_BGS: Record<ColorId, string> = {
  ashbl: "bg-ashbl-300",
  roylp: "bg-roylp-300",
  chrtr: "bg-chrtr-300",
  orngc: "bg-orngc-300",
  palbr: "bg-palbr-300",
  ghost: "bg-ghost-300",
}

const componentColors = (pageColorId: ColorId): ComponentColors => ({
  pageColors: pageColors(pageColorId),
  sectionColors: sectionColors(pageColorId),
  contentColors: contentColors(pageColorId),
  cardColors: cardColors(pageColorId),
  linkColors: linkColors(pageColorId),
  tagColors: tagColors(pageColorId),
  ctaColors: ctaColors(pageColorId),
})

const pageColors = (pageColorId: ColorId): PageColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: COLOR_BGS[pageColorId],
    title: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    subBorder: primary === "ghost"
      ? "border-ghost/40"
      : "border-ashbl/40",
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
      ? "text-ghost-300"
      : "text-ashbl-300",
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
    bg: primary === "ghost"
     ? "bg-ashbl/30"
     : "bg-ghost/30",
    border: primary === "ghost"
      ? "border-ghost/30"
      : "border-ashbl/20",
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

const tagColors = (pageColorId: ColorId): TagColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: COLOR_TAG_BGS[pageColorId],
    border: primary === "ghost"
      ? "border-ghost/30"
      : "border-ashbl/20",
    shadow: "shadow-ashbl/10",
    label: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
  }
}

const linkColors = (pageColorId: ColorId): LinkColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    bg: primary === "ghost"
      ? "bg-ghost"
      : "bg-ashbl",
    blendText: primary === "ghost"
      ? "text-ghost"
      : "text-ashbl",
    blendBorder: primary === "ghost"
      ? "border-ghost"
      : "border-ashbl",
    border: primary === "ghost"
      ? "border-ashbl/30"
      : "border-ghost/30",
    h3: primary === "ghost"
      ? "text-ashbl-300"
      : "text-ghost-300",
    h3Bg: primary === "ghost"
      ? "bg-ashbl-300"
      : "bg-ghost-300",
    h3Border: primary === "ghost"
      ? "border-ashbl-300"
      : "border-ghost-300",
  }
}

const ctaColors = (pageColorId: ColorId): CtaColors => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return {
    h4: primary === "ghost"
      ? "text-ashbl-300/80"
      : "text-ghost-300/80",
    h5: primary === "ghost"
      ? "text-ashbl-300/50"
      : "text-ghost-300/50",
  }
}

const colorDotBorder = (pageColorId: ColorId): string => {
  const primary = COLOR_PRIMARIES[pageColorId]
  return (
    primary === "ghost"
      ? "border-ghost shadow-md"
      : "border-ashbl shadow-md"
  )
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
    border: colorDotBorder(color),
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
  pageColors: pageColors("ghost"),
  sectionColors: sectionColors("ghost"),
  contentColors: contentColors("ghost"),
  cardColors: cardColors("ghost"),
  linkColors: linkColors("ghost"),
  tagColors: tagColors("ghost"),
  ctaColors: ctaColors("ghost"),
}