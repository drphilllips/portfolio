import { useMemo } from "react";
import { BASE_SPRING, BOARD_CLOSED_SIZE, PALETTE_BOARD_SHRINK_SCALE } from "../constants/colorPalette";
import { useReducedMotion } from "motion/react";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll";
import { useColorPalette } from "../../../contexts/useColorPalette";
import type { PaletteBoardColors } from "../types/paletteAnimation";
import useViewportScaledSizing from "../hooks/useViewportScaledSizing";


export default function usePaletteBoardAnimationDriver(
  isPaletteOpen: boolean,
  isPaletteCooldown: boolean,
) {
  const shouldReduceMotion = useReducedMotion()
  const { atTopOfPage } = useSmoothScroll()
  const { linkColors, offClickColors, pageColors } = useColorPalette()
  const { boardCenterShift, boardOpenSizeScaled } = useViewportScaledSizing()

  // ----------
  // Animation goodies
  // --------
  // define board transition style (base spring)
  const boardTransition =
    shouldReduceMotion
      ? { duration: 0 }
      : {...BASE_SPRING, delay: isPaletteOpen ? 0 : 0.04 }

  // drive board animation
  const animateBoard = useMemo(() => ({
    width: isPaletteOpen ? boardOpenSizeScaled : BOARD_CLOSED_SIZE,
    height: isPaletteOpen ? boardOpenSizeScaled : BOARD_CLOSED_SIZE,
    x: isPaletteOpen ? boardCenterShift : 0,
    y: isPaletteOpen ? boardCenterShift : 0,
  }), [isPaletteOpen, boardOpenSizeScaled, boardCenterShift])

  // off-click view animate opacity
  const boardOffClickAnimate = useMemo(() => (
    isPaletteOpen ? { opacity: 1 } : { opacity: 0 }
  ), [isPaletteOpen])

  // off-click view background color (page-color/20)
  const boardOffClickColor = useMemo(() => (
    offClickColors.bg
  ), [offClickColors])

  // derive board color based on at-top-of-page
  const boardColors: PaletteBoardColors = useMemo(() => {
    const bg =
      atTopOfPage
        ? isPaletteOpen || isPaletteCooldown
          ? "bg-secondary/10"
          : pageColors.bg
        : linkColors.bg

    const border =
      atTopOfPage
        ? pageColors.subBorder
        : linkColors.border

    return { bg, border }
  }, [atTopOfPage, linkColors, pageColors, isPaletteOpen, isPaletteCooldown])

  // board scaling
  const boardScaleAnimate = useMemo(() => (
    atTopOfPage
      ? { scale: 1 }
      : { scale: PALETTE_BOARD_SHRINK_SCALE }
  ), [atTopOfPage])

  return {
    boardTransition,
    animateBoard,
    boardColors,
    boardScaleAnimate,
    boardOffClickAnimate,
    boardOffClickColor,
  }
}