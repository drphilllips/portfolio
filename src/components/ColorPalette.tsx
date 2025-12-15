import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useColorPalette } from "../contexts/useColorPalette"
import View from "./ui/View"
import MotionButton from "./ui/MotionButton"

type PaletteItem = {
  id: string
  bg: string
  text: string
}

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
  // Allows the user to change the color palette
  const { setColorPalette } = useColorPalette()

  // Expand & close the color palette selector
  const [isOpen, setIsOpen] = useState(false)

  // Data-driven palette items (stable ids are required for layoutId)
  const items: PaletteItem[] = useMemo(
    () => [
      { id: "roylp", bg: "bg-roylp", text: "text-primary" },
      { id: "chrtr", bg: "bg-chrtr", text: "text-secondary" },
      { id: "orngc", bg: "bg-orngc", text: "text-primary" },
      { id: "palbr", bg: "bg-palbr", text: "text-primary" },
      { id: "ghost", bg: "bg-ghost", text: "text-secondary" },
      { id: "ashbl", bg: "bg-ashbl", text: "text-primary" },
    ],
    []
  )


  // Ring geometry
  const ringRadius = 14 // px (tuned for a 48px board)

  const shouldReduceMotion = useReducedMotion()

  // Geometry + sizing
  const dotSizeOpen = 40 // px (matches h-10/w-10)
  const gap = 12 // px spacing between open dots
  const speckScale = 0.25 // closed-state size multiplier

  // Shared motion settings
  const baseSpring = { type: "spring", stiffness: 500, damping: 36 } as const

  return (
    <View className="fixed bottom-4 right-4 z-50">
      {/* Board (always mounted) */}
      <MotionButton
        type="button"
        aria-label={isOpen ? "Close color palette" : "Open color palette"}
        className={`
          relative h-12 w-12 rounded-full border border-secondary/30
          bg-secondary/10 shadow-md backdrop-blur-sm
          flex items-center justify-center
        `}
        onClick={() => setIsOpen((v) => !v)}
        disableMotion={isOpen}
      >
        {/* Single dot layer (dots always exist exactly once) */}
        <View className="absolute inset-0">
          {items.map((item, i) => {
            // Closed ring targets
            const angle = (2 * Math.PI * i) / items.length - Math.PI / 2
            const xClosed = ringRadius * Math.cos(angle)
            const yClosed = ringRadius * Math.sin(angle)

            // Open row targets (extend left of the board)
            const xOpen = -(i + 1) * (dotSizeOpen + gap)
            const yOpen = 0

            const x = isOpen ? xOpen : xClosed
            const y = isOpen ? yOpen : yClosed
            const scale = isOpen ? 1 : speckScale

            // Optional stagger (kept subtle). Disabled for reduced motion.
            const delay = shouldReduceMotion
              ? 0
              : isOpen
                ? i * 0.02
                : (items.length - 1 - i) * 0.02

            // Reduced motion policy: jump instantly (no long travel)
            const transition = shouldReduceMotion
              ? { duration: 0 }
              : { ...baseSpring, delay }

            return (
              <motion.a
                key={item.id}
                type="button"
                aria-label={`Select ${item.id} palette`}
                className={
                  `absolute ${item.bg} ` +
                  "h-10 w-10 rounded-full shadow-md border border-secondary/20 " +
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                }
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
                  setColorPalette(item.bg, item.text)
                  setIsOpen(false)
                }}
                // Hover/tap polish only when open (and not reduced motion)
                whileHover={isOpen && !shouldReduceMotion ? { scale: 1.05 } : undefined}
                whileTap={isOpen && !shouldReduceMotion ? { scale: 0.95 } : undefined}
              />
            )
          })}
        </View>
      </MotionButton>
    </View>
  )
}