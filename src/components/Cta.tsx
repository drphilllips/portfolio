import type { CtaType } from "../content/schemas/cta.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Text from "./Text"
import View from "./View"
import { Link } from "lucide-react"
import MotionButton from "./MotionButton"

export default function Cta({
  title,
  subtitle,
  link,
}: CtaType) {
  const { ctaColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(link.href)

  return (
    <MotionButton
      activeScaleVariance={0.02}
      className={`
        ${ctaColors.bg} border-2 ${ctaColors.border}
        ${(title || subtitle) ? "px-3 pt-3 pb-4" : "p-2"}
        flex flex-row items-start gap-3 rounded-lg
      `}
      onClick={scrollOnClickLink}
      renderChildren={(isHovering, isPressing) => (
        <>
          <View className="flex flex-col gap-3 w-full items-start justify-between">
            {(subtitle || title) && (
              <View className="flex flex-col gap-1">
                {subtitle && (
                  <Text className={`${ctaColors.h5} leading-none text-start`}>
                    {subtitle}
                  </Text>
                )}
                {title && (
                  <Text className={`${ctaColors.h4} text-lg leading-none text-start`}>
                    {title}
                  </Text>
                )}
              </View>
            )}
            <Text
              className={`
                ${(isHovering || isPressing) && "underline underline-offset-2"} ${ctaColors.h3}
                text-start text-xl font-bold leading-none
              `}
            >
              {link.label}
            </Text>
          </View>
          <Link className={ctaColors.h3} size={16} />
        </>
      )}
    />
  )
}