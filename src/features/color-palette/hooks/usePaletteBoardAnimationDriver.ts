import { useEffect, useMemo } from "react";
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
  const { linkColors, offClickColors, pageColors } = useColorPalette()

  // ----------
  // While board is open, lock scrolling
  // --------
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
    }
  }, [isOpen])

  // ----------
  // Animation goodies
  // --------
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

  // off-click view animate opacity
  const boardOffClickAnimate = useMemo(() => (
    isOpen ? { opacity: 1 } : { opacity: 0 }
  ), [isOpen])

  // off-click view background color (page-color/20)
  const boardOffClickColor = useMemo(() => (
    offClickColors.bg
  ), [offClickColors])

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

  return {
    boardTransition,
    animateBoard,
    boardColors,
    boardScaleAnimate,
    boardOffClickAnimate,
    boardOffClickColor,
  }
}