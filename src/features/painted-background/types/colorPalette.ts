import type { SitePage } from "../../../types/pages";

export const PALETTE_IDS = [
  "ashbl",
  "roylp",
  "chrtr",
  "orngc",
  "palbr",
  "ghost",
] as const

export type ColorId = (typeof PALETTE_IDS)[number];

export type PaletteItem = {
  page: SitePage
  color: ColorId
  bg: string
  text: string
}