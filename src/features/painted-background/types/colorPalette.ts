
export const PALETTE_IDS = [
  "ashbl",
  "roylp",
  "chrtr",
  "orngc",
  "palbr",
  "ghost",
] as const

export type PaletteId = (typeof PALETTE_IDS)[number];

export type PaletteItem = {
  id: PaletteId
  bg: string
  text: string
}