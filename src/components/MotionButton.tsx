import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

type MotionButtonProps = React.ComponentProps<typeof motion.button> & {
  disableMotion?: boolean
}

/**
 * MotionButton
 * ----
 * A reusable motion-enhanced button component built on top of `motion.button`.
 *
 * It provides a consistent set of interaction effects across the app:
 *  - Hover: gently scales up to give visual affordance (desktop / pointer devices)
 *  - Tap / Press: slightly scales down to provide tactile feedback (mouse & touch)
 *
 * Motion effects are automatically disabled when:
 *  - `disableMotion` is set to true, OR
 *  - the user has enabled "reduced motion" preferences
 *
 * All standard `motion.button` props are supported and forwarded through,
 * making this a drop-in replacement for a normal button with polished,
 * accessible interaction feedback.
 */
const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ disableMotion = false, className = "", ...rest }, ref) => {
    const shouldReduceMotion = useReducedMotion()
    return (
      <motion.button
        ref={ref}
        className={`${!disableMotion && "cursor-pointer"} ${className}`}
        whileHover={!disableMotion && !shouldReduceMotion ? { scale: 1.05 } : undefined}
        whileTap={!disableMotion && !shouldReduceMotion ? { scale: 0.95 } : undefined}
        {...rest}
      />
    )
  }
)

MotionButton.displayName = "MotionButton"

export default MotionButton