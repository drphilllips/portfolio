import type { SitePage } from "../../../types/pages"

export const PALETTE_IDS = [
  "ashbl",
  "roylp",
  "chrtr",
  "orngc",
  "palbr",
  "ghost",
] as const

export type ColorId = (typeof PALETTE_IDS)[number]

export type ColorPrimary = "ghost" | "ashbl"

export type PaletteItem = {
  // id info
  color: ColorId
  page: SitePage
  name: string
  // palette dot styling
  bg: string
  text: string
  blendText: string
  // component-based-styling
  componentColors: ComponentColors
}

// ----------
// Component-based styling
// --------
export type ComponentColors = {
  pageColors: PageColors
  sectionColors: SectionColors
  contentColors: ContentColors
  cardColors: CardColors
  buttonColors: ButtonColors
  tagColors: TagColors
}

export type PageColors = {
  bg: string
  title: string
  sub: string
  sep: string
}

export type SectionColors = {
  bg?: string
  h1: string
}

export type ContentColors = {
  bg?: string
  h2: string
  h3: string
  p: string
  sep: string
}

export type CardColors = {
  bg: string
  border: string
  shadow: string
  h3: string
  p: string
  bulletPt: string
  sep: string
}

export type ButtonColors = {
  bg: string
  border: string
  label: string
}

export type TagColors = {
  bg: string
  border: string
  shadow: string
  label: string
}