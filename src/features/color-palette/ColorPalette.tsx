import { useEffect, useRef, useState } from "react"
import { type TargetAndTransition, type Transition } from "motion/react"
import { useColorPalette } from "../../contexts/useColorPalette"
import { PALETTE_ITEMS } from "../../styles/colorPalette"
import View from "../../components/basic/View"
import Text from "../../components/basic/Text"
import { useLocation, useNavigate } from "react-router-dom"
import type { SitePage } from "../../types/pages"
import Button from "../../components/basic/Button"
import type { PaletteItem } from "../../types/colorPalette"
import { SELECT_PALETTE_COLOR_COOL_DOWN_MS } from "./constants/colorPalette"
import useViewportScaledSizing from "./hooks/useViewportScaledSizing"
import usePaletteBoardAnimationDriver from "./hooks/usePaletteBoardAnimationDriver"
import usePaletteRingAnimationDriver from "./hooks/usePaletteRingAnimationDriver"



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
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<PaletteItem[]>(PALETTE_ITEMS)

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

  useEffect(() => {
    const sitePage = pathname.split("/")[1] as SitePage
    const pathItem = items.find(item => item.page === sitePage)
    const pathItemIndex = pathItem ? items.indexOf(pathItem) : null
    if (pathItem && pathItemIndex !== 0) {
      setTimeout(() => reorderPalette(pathItem),0)
    }
  }, [pathname, items])

  const {
      boardCenterShift,
      boardOpenSizeScaled,
  } = useViewportScaledSizing()

  const {
    boardTransition,
    animateBoard,
  } = usePaletteBoardAnimationDriver(
    boardCenterShift,
    boardOpenSizeScaled,
    isOpen,
  )

  function handleSelectPaletteColor(item: PaletteItem, itemIndex: number) {
    if (!isOpen) return
    if (isCooldown) return
    if (itemIndex !== 0) {
      reorderPalette(item)
      requestPaletteChange(item.componentColors)
      startCooldown(SELECT_PALETTE_COLOR_COOL_DOWN_MS)
      navigate(`/${item.page}`)
    }
    setIsOpen(false)
  }

  return (
    <View className="fixed bottom-4 right-4 z-50">
      {/* Board (always mounted) */}
      <Button
        aria-label={isOpen ? "Close color palette" : "Open color palette"}
        className={`
          relative rounded-full border border-secondary/30
          bg-secondary/10 shadow-md backdrop-blur-sm
          flex items-center justify-center origin-bottom-right
          ${!(isOpen || isCooldown) && "cursor-pointer"}
        `}
        onClick={() => {
          if (isCooldown && !isOpen) return
          setIsOpen((v) => !v)
        }}
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
    </View>
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
  } = usePaletteRingAnimationDriver(items, isBoardOpen)

  return (
    <View className="absolute inset-0">
      {items.map((item, i) => (
        <PaletteDot
          key={item.page}
          item={item}
          itemIndex={i}
          isBoardOpen={isBoardOpen}
          animate={paletteRingDotAnimations[i]}
          transition={paletteRingDotTransitions[i]}
          onClick={onSelectPaletteColor}
        />
      ))}
    </View>
  )
}

function PaletteDot({
  item,
  itemIndex,
  isBoardOpen,
  animate,
  transition,
  onClick,
}: {
  item: PaletteItem
  itemIndex: number
  isBoardOpen: boolean
  animate: TargetAndTransition
  transition: Transition
  onClick: (item: PaletteItem, itemIndex: number) => void
}) {
  const {
    dotSizeOpenScaled,
  } = useViewportScaledSizing()

  return (
    <Button
      key={item.color}
      aria-label={`Select ${item.color} palette`}
      className={`
        absolute ${item.bg}
        rounded-full shadow-md border border-secondary/20
        flex items-center justify-center
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70
        ${isBoardOpen && "cursor-pointer"}
      `}
      // Anchor at board center x/y are offsets from there
      style={{
        left: "50%",
        top: "50%",
        width: dotSizeOpenScaled,
        height: dotSizeOpenScaled,
        pointerEvents: isBoardOpen ? "auto" : "none",
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
            ${isBoardOpen && itemIndex !== 0
              ? item.text
              : item.blendText
            }
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