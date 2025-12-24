import { useMemo } from "react";
import { BASE_SPRING, BOARD_CLOSED_SIZE, PALETTE_BOARD_SHRINK_SCALE } from "../constants/colorPalette";
import { useReducedMotion } from "motion/react";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll";
import { useColorPalette } from "../../../contexts/useColorPalette";
import type { PaletteBoardColors } from "../types/paletteAnimation";


export default function usePaletteBoardAnimationDriver(
  boardCenterShift: number,
  boardOpenSizeScaled: number,
  isOpen: boolean,
  isCooldown: boolean,
) {
  const shouldReduceMotion = useReducedMotion()
  const { atTopOfPage } = useSmoothScroll()
  const { linkColors, pageColors } = useColorPalette()

  // define board transition style (base spring)
  const boardDelay = shouldReduceMotion
    ? 0
    : isOpen
      ? 0
      : 0.04
  const boardTransition = shouldReduceMotion ? { duration: 0 } : {...BASE_SPRING, delay: boardDelay }

  // drive board animation
  const animateBoard = useMemo(() => ({
    width: isOpen ? boardOpenSizeScaled : BOARD_CLOSED_SIZE,
    height: isOpen ? boardOpenSizeScaled : BOARD_CLOSED_SIZE,
    x: isOpen ? boardCenterShift : 0,
    y: isOpen ? boardCenterShift : 0,
  }), [isOpen, boardOpenSizeScaled, boardCenterShift])

  // derive board color based on at-top-of-page
  const boardColors: PaletteBoardColors = useMemo(() => {
    const bg =
      atTopOfPage
        ? isOpen || isCooldown
          ? "bg-secondary/10"
          : pageColors.bg
        : linkColors.bg

    const border =
      atTopOfPage
        ? pageColors.subBorder
        : linkColors.border

    return { bg, border }
  }, [atTopOfPage, linkColors, pageColors, isOpen, isCooldown])

  // board scaling
  const boardScaleAnimate = useMemo(() => (
    atTopOfPage
      ? { scale: 1 }
      : { scale: PALETTE_BOARD_SHRINK_SCALE }
  ), [atTopOfPage])

  return { boardTransition, animateBoard, boardColors, boardScaleAnimate }
}