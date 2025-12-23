import { useMemo } from "react";
import { BASE_SPRING, BOARD_CLOSED_SIZE } from "../constants/colorPalette";
import { useReducedMotion } from "motion/react";


export default function usePaletteBoardAnimationDriver(
  boardCenterShift: number,
  boardOpenSizeScaled: number,
  isOpen: boolean,
) {
  const shouldReduceMotion = useReducedMotion()

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

  return { boardTransition, animateBoard }
}