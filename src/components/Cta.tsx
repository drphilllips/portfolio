import { useState } from "react"
import type { CtaType } from "../content/schemas/cta.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Text from "./Text"
import { motion, useReducedMotion } from "motion/react"
import View from "./View"
import { SquareArrowOutUpRight } from "lucide-react"

export default function Cta({
  shortDesc,
  link,
}: CtaType) {
  const { ctaColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(link.href)
  const shouldReduceMotion = useReducedMotion()

  const [active, setActive] = useState(false)

  return (
    <motion.button
      className={`
        ${ctaColors.bg} border-2 ${ctaColors.border}
        flex flex-row items-start gap-3
        p-2 rounded-lg
        cursor-pointer
      `}
      whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
      whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
      onTap={(e: MouseEvent) => scrollOnClickLink(e)}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTapStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      <View className="flex flex-col gap-1 w-full items-start justify-between">
        <Text
          className={`
            ${ctaColors.h3} ${active && "underline underline-offset-2"}
            text-start text-xl font-bold leading-none
          `}
        >
          {link.label}
        </Text>
        <Text className={`${ctaColors.h4} text-lg leading-tight text-start`}>{shortDesc}</Text>
      </View>
      <SquareArrowOutUpRight className={ctaColors.h3} size={16} />
    </motion.button>
  )
}