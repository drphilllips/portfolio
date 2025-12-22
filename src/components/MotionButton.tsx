import { motion, useReducedMotion } from "motion/react"
import { useState, type ComponentProps, type MouseEventHandler } from "react"

type MotionButtonProps = Omit<ComponentProps<typeof motion.div>, "onClick"> & {
  disableMotion?: boolean
  activeScaleVariance?: number
  existingScale?: number
  onClick?: (e: MouseEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  renderChildren?:
    (isHovering?: boolean, isPressing?: boolean) => React.ReactNode
}

/**
 * MotionButton
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
export default function MotionButton({
  disableMotion = false,
  activeScaleVariance = 0.05,
  className = "",
  onClick,
  renderChildren,
  ...rest
}: MotionButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  const [isHovering, setIsHovering] = useState(false)
  const [isPressing, setIsPressing] = useState(false)

  return (
    <motion.div
      className={`${!disableMotion && "cursor-pointer"} select-none ${className}`}
      whileHover={!disableMotion && !shouldReduceMotion ? { scale: 1 + activeScaleVariance } : undefined}
      whileTap={!disableMotion && !shouldReduceMotion ? { scale: 1 - activeScaleVariance } : undefined}
      onClick={onClick as MouseEventHandler}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onTapStart={() => setIsPressing(true)}
      onTouchEnd={() => setIsPressing(false)}
      onMouseLeave={() => { setIsHovering(false); setIsPressing(false) }}
      {...rest}
    >
      {renderChildren?.(isHovering, isPressing)}
    </motion.div>
  )
}