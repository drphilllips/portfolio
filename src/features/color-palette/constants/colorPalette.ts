
export const SELECT_PALETTE_COLOR_COOL_DOWN_MS = 2400

// ----------
// Sizing + Geometry
// --------
export const OPEN_VISIBLE_FRACTION = 0.7
export const OPEN_VISIBLE_MAX_PX = 280
// board sizing
export const BOARD_CLOSED_SIZE = 72
export const BOARD_OPEN_PADDING = 12
// ring sizing
export const BASE_RING_RADIUS = 18
export const BASE_DOT_SIZE_OPEN = 40
export const BASE_GAP_BETWEEN_ARCS = 8
export const BASE_DESIRED_SPECK_SIZE = 13
// ring sizing (lev. 2)
export const ARC_INNER_RADIUS = BASE_GAP_BETWEEN_ARCS + BASE_DOT_SIZE_OPEN
export const ARC_OUTER_RADIUS = ARC_INNER_RADIUS + BASE_DOT_SIZE_OPEN + BASE_GAP_BETWEEN_ARCS
// open layout geometry
export const OUTER_ARC_START_ANGLE = -Math.PI * 0.92
export const OUTER_ARC_END_ANGLE = -Math.PI * 0.58
export const INNER_ARC_START_ANGLE = -Math.PI * 0.9
export const INNER_ARC_END_ANGLE = -Math.PI * 0.6
// board sizing (lev. 2)
export const BOARD_OPEN_SIZE_UNSCALED =
  Math.ceil(
    (ARC_OUTER_RADIUS + BASE_DOT_SIZE_OPEN / 2 + BOARD_OPEN_PADDING) * 2
  )

// ----------
// Palette Animation
// --------
export const BASE_SPRING = { type: "spring", stiffness: 500, damping: 36 } as const
// nested arc positioning
export const INNER_ARC_INDICES = [1, 5]
export const OUTER_ARC_INDICES = [2, 3, 4]