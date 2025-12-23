import type { CtaType } from "../content/schemas/cta.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import Link from "./Link"
import Text from "./Text"
import View from "./View"

export default function Cta({
  title,
  subtitle,
  link,
}: CtaType) {
  const { ctaColors } = useColorPalette()

  return (
    <Link label={link.label} href={link.href}>
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
    </Link>
  )
}