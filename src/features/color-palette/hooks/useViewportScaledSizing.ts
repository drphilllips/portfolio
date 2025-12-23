import { useResponsiveDesign } from "../../../contexts/useResponsiveDesign";
import { ARC_INNER_RADIUS, ARC_OUTER_RADIUS, BASE_DESIRED_SPECK_SIZE, BASE_DOT_SIZE_OPEN, BOARD_CLOSED_SIZE, BOARD_OPEN_PADDING, BOARD_OPEN_SIZE_UNSCALED, OPEN_VISIBLE_FRACTION, OPEN_VISIBLE_MAX_PX } from "../constants/colorPalette";


export default function useViewportScaledSizing() {
  const { viewport } = useResponsiveDesign()

  // calculate open scale
  const visibleWidthTarget = Math.min(
    Math.min(viewport?.width || 0, viewport?.height || 0) * OPEN_VISIBLE_FRACTION,
    OPEN_VISIBLE_MAX_PX
  )

  const boardOpenDiameterTarget = 2 * visibleWidthTarget

  const openScale = boardOpenDiameterTarget / BOARD_OPEN_SIZE_UNSCALED

  // scale open geometry (ratios)
  const dotSizeOpenScaled = BASE_DOT_SIZE_OPEN * openScale
  const arcInnerRadiusScaled = ARC_INNER_RADIUS * openScale
  const arcOuterRadiusScaled = ARC_OUTER_RADIUS * openScale
  const boardOpenPaddingScaled = BOARD_OPEN_PADDING * openScale

  // calculate dot scaling for "specks" on closed view
  const speckScale = BASE_DESIRED_SPECK_SIZE / dotSizeOpenScaled

  // scale open geometry (outputs)
  const boardOpenSizeScaled = Math.ceil((arcOuterRadiusScaled + dotSizeOpenScaled / 2 + boardOpenPaddingScaled) * 2)
  const boardCenterShift = (boardOpenSizeScaled - BOARD_CLOSED_SIZE) / 2

  return {
    arcInnerRadiusScaled,
    arcOuterRadiusScaled,
    boardCenterShift,
    boardOpenSizeScaled,
    dotSizeOpenScaled,
    speckScale,
  }
}