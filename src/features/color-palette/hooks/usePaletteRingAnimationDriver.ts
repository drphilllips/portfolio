import { useMemo } from "react";
import type { LinkColors, PageColors, PaletteItem } from "../../../types/colorPalette";
import { BASE_RING_RADIUS, BASE_SPRING, INNER_ARC_END_ANGLE, INNER_ARC_INDICES, INNER_ARC_START_ANGLE, OUTER_ARC_END_ANGLE, OUTER_ARC_INDICES, OUTER_ARC_START_ANGLE } from "../constants/colorPalette";
import type { PaletteDotBorderRadius, PaletteDotColors, PalettePosition } from "../types/paletteAnimation";
import useViewportScaledSizing from "./useViewportScaledSizing";
import { useReducedMotion, type TargetAndTransition, type Transition } from "motion/react";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll";
import useChangedDeps from "../../../hooks/useChangedDeps";
import { useColorPalette } from "../../../contexts/useColorPalette";
import { ROUNDED_B, ROUNDED_FULL, ROUNDED_NONE, ROUNDED_T, ROUNDED_TL } from "../constants/paletteAnimation";


export default function usePaletteRingAnimationDriver(
  items: PaletteItem[],
  isBoardOpen: boolean,
) {
  const {
    arcInnerRadiusScaled,
    arcOuterRadiusScaled,
    speckScale,
  } = useViewportScaledSizing()
  const { atTopOfPage } = useSmoothScroll()
  const shouldReduceMotion = useReducedMotion()
  const { linkColors, pageColors } = useColorPalette()

  // track which dependency changed
  const changedDeps = useChangedDeps({
    items, isBoardOpen, shouldReduceMotion, atTopOfPage
  })

  // dot scaling
  const dotScale = useMemo(() => (
    isBoardOpen ? 1 : speckScale
  ), [isBoardOpen, speckScale])

  // ring dot transitions (delayed based on level)
  const paletteRingDotTransitions: Transition[] = useMemo(() => {
    // if at-top changed, there is no transition delays
    const didAtTopChange = changedDeps?.includes("atTopOfPage")
    return items.map((_, i) => (
      shouldReduceMotion
        ? { duration: 0 }
        : didAtTopChange
          ? BASE_SPRING
          : {...BASE_SPRING,
              delay: getDotRingArcTransitionDelay(i, isBoardOpen, shouldReduceMotion)
            }
    ))
  }, [items, isBoardOpen, shouldReduceMotion, changedDeps])

  // ----------
  // Dot arc <-> ring positioning
  // --------
  const closedRingTargets: PalettePosition[] = useMemo(() => (
    items.map((_, i) => getRingTarget(i, items.length))
  ), [items])

  const openArcTargets: PalettePosition[] = useMemo(() => (
    items.map(
      (_, i) => getNestedArcsTarget(i, arcInnerRadiusScaled, arcOuterRadiusScaled)
    )
  ), [items, arcInnerRadiusScaled, arcOuterRadiusScaled])

  const scrollToTopArrowTargets: PalettePosition[] = useMemo(() => (
    items.map((_, i) => getArrowTarget(i))
  ), [items])

  // dot position animations
  const paletteRingDotAnimations: TargetAndTransition[] = useMemo(() => {
    return items.map((_, i) => {
      const target =
        atTopOfPage
          ? isBoardOpen ? openArcTargets[i] : closedRingTargets[i]
          : scrollToTopArrowTargets[i]
      return { ...target, scale: dotScale, opacity: 1 }
    })
  }, [items, closedRingTargets, openArcTargets, scrollToTopArrowTargets, isBoardOpen, dotScale, atTopOfPage])

  // dot colors (white if forming scroll-to-top arrow)
  const paletteRingDotColors: PaletteDotColors[] = useMemo(() => (
    items.map((item, i) => getRingDotColor(item, i, linkColors, pageColors, atTopOfPage, isBoardOpen))
  ), [items, atTopOfPage, isBoardOpen, linkColors, pageColors])

  // dot rounding (to form solid arrow w/ rounded ends)
  const paletteRingDotBorderRadii: PaletteDotBorderRadius[] = useMemo(() => (
    items.map((_, i) => getRingDotBorderRadius(i, atTopOfPage))
  ), [items, atTopOfPage])

  return { dotScale, paletteRingDotAnimations, paletteRingDotTransitions, paletteRingDotColors, paletteRingDotBorderRadii }
}

// ----------
// Math util functions
// --------

// transition delays based on arc index
function getDotRingArcTransitionDelay(itemIndex: number, isBoardOpen: boolean, shouldReduceMotion: boolean | null) {
  const arcIndex = getArcIndex(itemIndex)
  return (
    shouldReduceMotion || itemIndex === 0
      ? 0
      : isBoardOpen
        ? arcIndex*0.04
        : arcIndex*0.01
  )
}

function getArcIndex(itemIndex: number): number {
  return (
    INNER_ARC_INDICES.indexOf(itemIndex) !== -1
      ? 0
      : 1
  )
}

// Open targets (nested arcs)
function getNestedArcsTarget(
  itemIndex: number,
  arcInnerRadiusScaled: number,
  arcOuterRadiusScaled: number,
): PalettePosition {
  if (itemIndex === 0) {
    return { x: 0, y: 0}
  }
  const innerPos = INNER_ARC_INDICES.indexOf(itemIndex)
  if (innerPos !== -1) {
    // Inner arc: indices 1 and 5
    return getArcTarget(
      innerPos,
      INNER_ARC_INDICES.length,
      arcInnerRadiusScaled,
      INNER_ARC_START_ANGLE,
      INNER_ARC_END_ANGLE,
    )
  } else {
    // Outer arc: indices 2, 3, 4 (and any extras)
    const outerPos = OUTER_ARC_INDICES.indexOf(itemIndex)
    const j = outerPos === -1 ? 0 : outerPos
    const groupSize = Math.max(OUTER_ARC_INDICES.length, 1)
    return getArcTarget(
      j,
      groupSize,
      arcOuterRadiusScaled,
      OUTER_ARC_START_ANGLE,
      OUTER_ARC_END_ANGLE,
    )
  }
}

function getArcTarget(
  j: number,
  groupSize: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  angleOffset = 0,
): PalettePosition {
  const t = groupSize <= 1 ? 0.5 : j / (groupSize - 1)
  const theta = startAngle + t * (endAngle - startAngle) + angleOffset
  return {
    x: radius * Math.cos(theta),
    y: radius * Math.sin(theta),
  }
}

// Closed targets (ring)
function getRingTarget(
  itemIndex: number,
  numItems: number,
): PalettePosition {
  const angle = (2 * Math.PI * itemIndex) / numItems + Math.PI / 6
  const x = BASE_RING_RADIUS * Math.cos(angle)
  const y = BASE_RING_RADIUS * Math.sin(angle)
  return { x, y }
}

// Scroll to top arrow targets (right triangle)
function getArrowTarget(itemIndex: number): PalettePosition & { rotate?: number } {
  const arrowYOffset = BASE_RING_RADIUS*0.3
  switch (itemIndex) {
    case 0: return { x: 0, y: BASE_RING_RADIUS }
    case 1: return { x: -BASE_RING_RADIUS, y: arrowYOffset, rotate: 45 }
    case 2: return { x: -BASE_RING_RADIUS/2, y: -BASE_RING_RADIUS/2 + arrowYOffset, rotate: 45 }
    case 3: return { x: 0, y: -BASE_RING_RADIUS + arrowYOffset, rotate: 45 }
    case 4: return { x: BASE_RING_RADIUS/2, y: -BASE_RING_RADIUS/2 + arrowYOffset, rotate: 135 }
    case 5: return { x: BASE_RING_RADIUS, y: arrowYOffset, rotate: 135 }
    default: return { x: 0, y: 0 }
  }
}

function getRingDotBorderRadius(itemIndex: number, atTopOfPage: boolean): PaletteDotBorderRadius {
  if (atTopOfPage) return ROUNDED_FULL
  switch (itemIndex) {
    case 0: return ROUNDED_FULL
    case 1: return ROUNDED_B
    case 2: return ROUNDED_NONE
    case 3: return ROUNDED_TL
    case 4: return ROUNDED_NONE
    case 5: return ROUNDED_T
    default: return ROUNDED_FULL
  }
}

// Top arrow indices 1-5 are white, otherwise standard colors
function getRingDotColor(item: PaletteItem, itemIndex: number, linkColors: LinkColors, pageColors: PageColors, atTopOfPage: boolean, isBoardOpen: boolean): PaletteDotColors {
  const bg =
    atTopOfPage
      ? item.bg
      : itemIndex === 0
        ? linkColors.bg
        : linkColors.h3Bg

  const text =
    atTopOfPage
      ? isBoardOpen
        ? itemIndex === 0
          ? item.blendText
          : item.text
        : item.blendText
      : itemIndex === 0
        ? linkColors.blendText
        : linkColors.h3

  const border =
    atTopOfPage
      ? itemIndex === 0 && isBoardOpen
        ? `border ${pageColors.subBorder}`
        : `border ${item.border}`
      : linkColors.blendBorder

  return { bg, text, border }
}