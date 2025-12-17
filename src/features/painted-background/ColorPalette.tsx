import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useColorPalette } from "./contexts/useColorPalette"
import type { PaletteItem } from "./types/colorPalette"
import { INIT_PALETTE_ITEMS, NAVIGATE_PRESS_COOL_DOWN_MS } from "./constants/colorPalette"
import MotionButton from "../../components/MotionButton"
import View from "../../components/View"
import Text from "../../components/Text"
import { useNavigate } from "react-router-dom"

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
  const { requestPaletteChange } = useColorPalette()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<PaletteItem[]>(INIT_PALETTE_ITEMS)

  const [isCooldown, setIsCooldown] = useState(false)
  const cooldownTimerRef = useRef<number | null>(null)

  const startCooldown = (ms: number) => {
    setIsCooldown(true)
    if (cooldownTimerRef.current !== null) {
      window.clearTimeout(cooldownTimerRef.current)
    }
    cooldownTimerRef.current = window.setTimeout(() => {
      cooldownTimerRef.current = null
      setIsCooldown(false)
    }, ms)
  }

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current)
      }
    }
  }, [])

  function reorderPalette(firstItem: PaletteItem) {
    setItems(prev => {
      const restOfItems = prev.filter(item => item.color !== firstItem.color)
      return [firstItem, ...restOfItems]
    })
  }

  // Ring geometry
  const ringRadius = 14 // px (tuned for a 48px board)

  const shouldReduceMotion = useReducedMotion()

  // Geometry + sizing
  const dotSizeOpen = 40 // px (matches h-10/w-10)
  const gapBetweenArcs = 8 // px spacing between open dots
  const speckScale = 0.25 // closed-state size multiplier

  // Open layout geometry (nested arcs)
  const arcInnerRadius = ringRadius + 40
  const arcOuterRadius = arcInnerRadius + dotSizeOpen + gapBetweenArcs
  const outerArcStartAngle = -Math.PI * 0.92
  const outerArcEndAngle = -Math.PI * 0.58
  const innerArcStartAngle = -Math.PI * 0.9
  const innerArcEndAngle = -Math.PI * 0.6

  // Board sizing (outline should surround all open dots)
  const boardClosedSize = 48 // px (h-12/w-12)
  const boardOpenPadding = 12 // px extra breathing room around dots
  const boardOpenSize = Math.ceil((arcOuterRadius + dotSizeOpen / 2 + boardOpenPadding) * 2)
  const boardCenterShift = (boardOpenSize - boardClosedSize) / 2

  // Shared motion settings
  const baseSpring = { type: "spring", stiffness: 500, damping: 36 } as const

  const boardDelay = shouldReduceMotion
  ? 0
  : isOpen
    ? 0
    : 0.04
  const boardTransition = shouldReduceMotion ? { duration: 0 } : {...baseSpring, delay: boardDelay }

  return (
    <View className="fixed bottom-4 right-4 z-50">
      {/* Board (always mounted) */}
      <motion.div
        className={
          "relative rounded-full border border-secondary/30 " +
          "bg-secondary/10 shadow-md backdrop-blur-sm " +
          "flex items-center justify-center origin-bottom-right"
        }
        animate={{
          width: isOpen ? boardOpenSize : boardClosedSize,
          height: isOpen ? boardOpenSize : boardClosedSize,
          x: isOpen ? boardCenterShift : 0,
          y: isOpen ? boardCenterShift : 0,
        }}
        transition={boardTransition}
      >
        <MotionButton
          type="button"
          aria-label={isOpen ? "Close color palette" : "Open color palette"}
          className={`
            relative h-full w-full rounded-full flex items-center justify-center
          `}
          onClick={() => {
            if (isCooldown && !isOpen) return
            setIsOpen((v) => !v)
          }}
          disableMotion={isOpen || isCooldown}
        >
          {/* Single dot layer (dots always exist exactly once) */}
          <View className="absolute inset-0">
            {items.map((item, i) => {
              // Closed ring targets
              const angle = (2 * Math.PI * i) / items.length + Math.PI / 6
              const xClosed = ringRadius * Math.cos(angle)
              const yClosed = ringRadius * Math.sin(angle)

              // Open targets (nested arcs)
              const getArcTarget = (
                j: number,
                groupSize: number,
                radius: number,
                startAngle: number,
                endAngle: number,
                angleOffset = 0,
              ) => {
                const t = groupSize <= 1 ? 0.5 : j / (groupSize - 1)
                const theta = startAngle + t * (endAngle - startAngle) + angleOffset
                return {
                  xOpen: radius * Math.cos(theta),
                  yOpen: radius * Math.sin(theta),
                }
              }

              let xOpen = 0
              let yOpen = 0
              let arcIndex = 0

              // Open grouping/order (closed-ring order remains the same)
              const innerArcIndices = [1, 5]
              const outerArcIndicesBase = [2, 3, 4]

              // If the palette grows beyond these indices, continue placing extras on the outer arc
              const extraOuterIndices = items
                .map((_, idx) => idx)
                .filter((idx) => idx !== 0 && !innerArcIndices.includes(idx) && !outerArcIndicesBase.includes(idx))
              const outerArcIndices = [...outerArcIndicesBase, ...extraOuterIndices]

              if (i === 0) {
                // Main dot centered on the board
                xOpen = 0
                yOpen = 0
              } else {
                const innerPos = innerArcIndices.indexOf(i)
                if (innerPos !== -1) {
                  // Inner arc: indices 1 and 5
                  const { xOpen: xA, yOpen: yA } = getArcTarget(
                    innerPos,
                    innerArcIndices.length,
                    arcInnerRadius,
                    innerArcStartAngle,
                    innerArcEndAngle,
                  )
                  xOpen = xA
                  yOpen = yA
                  arcIndex = 0
                } else {
                  // Outer arc: indices 2, 3, 4 (and any extras)
                  const outerPos = outerArcIndices.indexOf(i)
                  const j = outerPos === -1 ? 0 : outerPos
                  const groupSize = Math.max(outerArcIndices.length, 1)
                  const { xOpen: xA, yOpen: yA } = getArcTarget(
                    j,
                    groupSize,
                    arcOuterRadius,
                    outerArcStartAngle,
                    outerArcEndAngle,
                  )
                  xOpen = xA
                  yOpen = yA
                  arcIndex = 1
                }
              }

              const x = isOpen ? xOpen : xClosed
              const y = isOpen ? yOpen : yClosed
              const scale = isOpen ? 1 : speckScale

              // Optional stagger (kept subtle). Disabled for reduced motion.
              const delay = shouldReduceMotion || i === 0
                ? 0
                : isOpen
                  ? arcIndex*0.04
                  : arcIndex*0.01

              // Reduced motion policy: jump instantly (no long travel)
              const transition = shouldReduceMotion
                ? { duration: 0 }
                : { ...baseSpring, delay }

              return (
                <motion.a
                  key={item.color}
                  type="button"
                  aria-label={`Select ${item.color} palette`}
                  className={`
                    absolute ${item.bg} h-10 w-10
                    rounded-full shadow-md border border-secondary/20
                    flex items-center justify-center
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70
                    ${isOpen && "cursor-pointer"}
                  `}
                  // Anchor at board center x/y are offsets from there
                  style={{
                    left: "50%",
                    top: "50%",
                    pointerEvents: isOpen ? "auto" : "none",
                  }}
                  transformTemplate={(_, generated) =>
                    `translate(-50%, -50%) ${generated}`
                  }
                  // Drive motion purely via transforms (single element)
                  animate={{ x, y, scale, opacity: 1 }}
                  transition={transition}
                  // Dots should not be focusable specks when closed
                  tabIndex={isOpen ? 0 : -1}
                  // Prevent Motion/DOM pointer events from bubbling to the board
                  onPointerDownCapture={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isOpen) return
                    if (isCooldown) return
                    if (i !== 0) {
                      reorderPalette(item)
                      requestPaletteChange(item.bg, item.text)
                      startCooldown(NAVIGATE_PRESS_COOL_DOWN_MS)
                      navigate(`/${item.page}`)
                    }
                    setIsOpen(false)
                  }}
                  // Hover/tap polish only when open (and not reduced motion)
                  whileHover={isOpen && !shouldReduceMotion ? { scale: 1.05 } : undefined}
                  whileTap={isOpen && !shouldReduceMotion ? { scale: 0.95 } : undefined}
                >
                  <Text
                    as="span"
                    className={`
                      ${isOpen && i !== 0
                        ? item.text
                        : item.blendText
                      }
                      m-0 leading-none font-semibold font-mono text-[12px]
                      transition-colors duration-300
                    `}
                  >
                    <span className="grid grid-cols-2 grid-rows-2">
                      {item.abbrev
                        .slice(0, 4)
                        .split("")
                        .map((ch, idx) => (
                          <span
                            key={idx}
                            className="inline-flex w-[1ch] items-center justify-center text-center"
                            aria-hidden="true"
                          >
                            {ch}
                          </span>
                        ))}
                    </span>
                  </Text>
                </motion.a>
              )
            })}
          </View>
        </MotionButton>
      </motion.div>
    </View>
  )
}