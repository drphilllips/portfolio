import { motion, useReducedMotion } from "motion/react"
import {
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from "react"
import { useColorPalette } from "../../contexts/useColorPalette"
import { twMerge } from "tailwind-merge"
import useSyncHoverState from "../../hooks/useSyncHoverState"

type ButtonProps = Omit<ComponentProps<typeof motion.div>, "onClick"> & {
  disableMotion?: boolean
  disableHighlight?: boolean
  activeScaleVariance?: number
  highlightColor?: string
  existingScale?: number
  onClick?: (e: MouseEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  renderChildren?:
    (isHovering?: boolean, isPressing?: boolean) => React.ReactNode
}

/**
 * Button
 * ----
 * A reusable motion-enhanced button component built on top of `motion.div`.
 *
 * It provides a consistent set of interaction effects across the app:
 *  - Hover: gently scales up to give visual affordance (desktop / pointer devices)
 *  - Tap / Press: slightly scales down to provide tactile feedback (mouse & touch)
 *
 * Motion effects are automatically disabled when:
 *  - `disableMotion` is set to true, OR
 *  - the user has enabled "reduced motion" preferences
 *
 * All standard `motion.div` props are supported and forwarded through,
 * making this a drop-in replacement for a normal button with polished,
 * accessible interaction feedback.
 */
export default function Button({
  disableMotion = false,
  disableHighlight = false,
  activeScaleVariance = 0.05,
  highlightColor,
  className = "",
  onClick,
  renderChildren,
  ...rest
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const { linkColors } = useColorPalette()

  const rootRef = useRef<HTMLDivElement | null>(null)
  const { isHovering, setIsHovering } = useSyncHoverState(false)
  const [isPressing, setIsPressing] = useState(false)

  const highlightBorder = useMemo(() => (
    !disableHighlight && (isHovering || isPressing)
      ? highlightColor || linkColors.h3Border
      : ""
  ), [isHovering, isPressing, highlightColor, linkColors, disableHighlight])

  return (
    <motion.div
      ref={rootRef}
      className={twMerge(
        !disableHighlight && isHovering && "cursor-pointer",
        "select-none transition-colors",
        className,
        highlightBorder
      )}
      whileHover={!disableMotion && !shouldReduceMotion ? { scale: 1 + activeScaleVariance  } : undefined}
      whileTap={!disableMotion && !shouldReduceMotion ? { scale: 1 - activeScaleVariance } : undefined}
      onClick={onClick as MouseEventHandler}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => {
        setIsHovering(false)
        setIsPressing(false)
      }}
      onTapStart={() => setIsPressing(true)}
      onTapCancel={() => setIsPressing(false)}
      onTap={() => setIsPressing(false)}
      {...rest}
    >
      {renderChildren?.(isHovering, isPressing)}
    </motion.div>
  )
}