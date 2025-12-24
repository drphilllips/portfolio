import type { PaletteDotBorderRadius } from "../types/paletteAnimation";

const FULL_ROUND_PX = 50

export const ROUNDED_FULL: PaletteDotBorderRadius = {
  borderBottomLeftRadius: FULL_ROUND_PX,
  borderBottomRightRadius: FULL_ROUND_PX,
  borderTopLeftRadius: FULL_ROUND_PX,
  borderTopRightRadius: FULL_ROUND_PX,
}

export const ROUNDED_NONE: PaletteDotBorderRadius = {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}

export const ROUNDED_T: PaletteDotBorderRadius = {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: FULL_ROUND_PX,
  borderTopRightRadius: FULL_ROUND_PX,
}

export const ROUNDED_B: PaletteDotBorderRadius = {
  borderBottomLeftRadius: FULL_ROUND_PX,
  borderBottomRightRadius: FULL_ROUND_PX,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}

export const ROUNDED_TL: PaletteDotBorderRadius = {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: FULL_ROUND_PX,
  borderTopRightRadius: 0,
}