import { useState } from "react"
import { motion, type TargetAndTransition, type Transition } from "motion/react"
import { PALETTE_ITEMS } from "../../styles/colorPalette"
import Text from "../../components/basic/Text"
import Button from "../../components/basic/Button"
import type { PaletteItem } from "../../types/colorPalette"
import useViewportScaledSizing from "./hooks/useViewportScaledSizing"
import usePaletteBoardAnimationDriver from "./hooks/usePaletteBoardAnimationDriver"
import usePaletteRingAnimationDriver from "./hooks/usePaletteRingAnimationDriver"
import useSelectPaletteColor from "./hooks/useSelectPaletteColor"
import { useSmoothScroll } from "../../hooks/useSmoothScroll"
import type { PaletteDotBorderRadius, PaletteDotColors } from "./types/paletteAnimation"
import useRouteTransition from "../../hooks/useRouteTransition"
import { BASE_SPRING } from "./constants/colorPalette"

/**
 * ColorPalette
 * ----
 * A floating, interactive color palette selector that allows the user to
 * switch the application’s active color palette at runtime.
 *
 * `ColorPalette` integrates directly with the `useColorPalette` context and
 * provides a compact, animated UI for selecting predefined background/text
 * color pairings. It is designed to be always available, unobtrusive, and
 * visually expressive while remaining accessible and motion-aware.
 *
 * Behavior:
 * - Renders as a fixed-position control in the bottom-right corner of the viewport.
 * - Toggles between a closed “speck” state and an expanded horizontal palette.
 * - Uses a circular ring layout when closed and a linear row layout when open.
 * - Updates the global color palette via `setColorPalette(bg, text)` when a
 *   palette option is selected.
 *
 * Animation & Motion:
 * - Built with `motion` primitives for smooth, spring-based animations.
 * - Uses shared layout geometry so each color dot exists exactly once and
 *   transitions purely via transforms.
 * - Respects user motion preferences via `useReducedMotion`, disabling
 *   staggered and travel animations when reduced motion is requested.
 *
 * Accessibility:
 * - Uses semantic `button` elements for all interactive controls.
 * - Applies appropriate `aria-label`s for screen reader clarity.
 * - Prevents focus and pointer interaction with palette items when closed.
 *
 * Design notes:
 * - Palette items are data-driven and require stable `id`s to support
 *   animation layout consistency.
 * - Background and text colors are intentionally paired to ensure sufficient
 *   contrast and predictable inheritance throughout the app.
 * - This component is intended to be mounted once at the application level.
 */
export default function ColorPalette() {
  const [items, setItems] = useState<PaletteItem[]>(PALETTE_ITEMS)
  const [isOpen, setIsOpen] = useState(false)

  const {
      boardCenterShift,
      boardOpenSizeScaled,
  } = useViewportScaledSizing()

  const {
    isCooldown,
    handleSelectPaletteColor
  } = useSelectPaletteColor(
    items, setItems, isOpen, setIsOpen,
  )

  const {
    boardColors,
    animateBoard,
    boardTransition,
    boardScaleAnimate,
  } = usePaletteBoardAnimationDriver(
    boardCenterShift, boardOpenSizeScaled, isOpen, isCooldown,
  )

  const { atTopOfPage, smoothScrollTo } = useSmoothScroll()

  const { phase: routeTransitionPhase } = useRouteTransition()

  function handleBoardClick() {
    if (atTopOfPage) {
      if (isCooldown && !isOpen) return
      setIsOpen((v) => !v)
    } else {
      smoothScrollTo(0)
    }
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      animate={boardScaleAnimate}
      transition={BASE_SPRING}
    >
      {/* Board (always mounted) */}
      <Button
        aria-label={isOpen ? "Close color palette" : "Open color palette"}
        className={`
          relative rounded-full border-2 ${boardColors.border}
          ${boardColors.bg} shadow-md
          transition-colors backdrop-blur-sm
          flex items-center justify-center origin-bottom-right
          ${!(isOpen || isCooldown) && "cursor-pointer"}
        `}
        style={{
          transitionProperty: "background-color, border-color",
          transitionDuration:
            atTopOfPage
              ? isOpen
                ? "400ms, 400ms"
                : routeTransitionPhase === "pausing"
                  ? "0ms, 1800ms"
                  : "300ms, 300ms"
              : "300ms, 300ms",
          transitionTimingFunction: "var(--default-transition-timing-function), var(--default-transition-timing-function)",
        }}
        disableMotion={isOpen}
        onClick={handleBoardClick}
        animate={animateBoard}
        transition={boardTransition} // Single dot layer (dots always exist exactly once)
        renderChildren={() => (
          <PaletteRing
            items={items}
            isBoardOpen={isOpen}
            onSelectPaletteColor={handleSelectPaletteColor}
          />
        )}
      />
    </motion.div>
  )
}

function PaletteRing({
  items,
  isBoardOpen,
  onSelectPaletteColor,
}: {
  items: PaletteItem[]
  isBoardOpen: boolean
  onSelectPaletteColor: (item: PaletteItem, itemIndex: number) => void
}) {
  const {
    paletteRingDotAnimations,
    paletteRingDotTransitions,
    paletteRingDotBorderRadii,
    paletteRingDotColors,
    paletteRingScaleAnimate,
  } = usePaletteRingAnimationDriver(items, isBoardOpen)

  return (
    <motion.div
      className="absolute inset-0"
      animate={paletteRingScaleAnimate}
      transition={BASE_SPRING}
    >
      {items.map((item, i) => (
        <PaletteDot
          key={item.page}
          item={item}
          colors={paletteRingDotColors[i]}
          borderRadius={paletteRingDotBorderRadii[i]}
          itemIndex={i}
          isBoardOpen={isBoardOpen}
          animate={paletteRingDotAnimations[i]}
          transition={paletteRingDotTransitions[i]}
          onClick={onSelectPaletteColor}
        />
      ))}
    </motion.div>
  )
}

function PaletteDot({
  item,
  colors,
  borderRadius,
  itemIndex,
  isBoardOpen,
  animate,
  transition,
  onClick,
}: {
  item: PaletteItem
  colors: PaletteDotColors
  borderRadius: PaletteDotBorderRadius
  itemIndex: number
  isBoardOpen: boolean
  animate: TargetAndTransition
  transition: Transition
  onClick: (item: PaletteItem, itemIndex: number) => void
}) {
  const { dotSizeOpenScaled } = useViewportScaledSizing()

  return (
    <Button
      key={item.color}
      aria-label={`Select ${item.color} palette`}
      className={`
        absolute ${colors.bg}
        ${colors.border}
        flex items-center justify-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70
        ${isBoardOpen && "cursor-pointer"}
        transition-[background-color,border-color,border-width,color,border-radius] duration-300
      `}
      // Anchor at board center x/y are offsets from there
      style={{
        left: "50%",
        top: "50%",
        width: dotSizeOpenScaled,
        height: dotSizeOpenScaled,
        pointerEvents: isBoardOpen ? "auto" : "none",
        ...borderRadius
      }}
      transformTemplate={(_, generated) =>
        `translate(-50%, -50%) ${generated}`
      }
      // Drive motion purely via transforms (single element)
      animate={animate}
      disableMotion={!isBoardOpen}
      transition={transition}
      // Dots should not be focusable specks when closed
      tabIndex={isBoardOpen ? 0 : -1}
      // Prevent Motion/DOM pointer events from bubbling to the board
      onPointerDownCapture={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        onClick(item, itemIndex)
      }}
      renderChildren={() => (
        <Text
          as="span"
          className={`
            ${colors.text}
            m-0 leading-none font-semibold font-mono text-[12px]
            transition-colors duration-300
          `}
        >
          {item.name}
        </Text>
      )}
    />
  )
}