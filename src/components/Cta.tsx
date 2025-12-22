import type { CtaType } from "../content/schemas/cta.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Text from "./Text"
import View from "./View"

export default function Cta({
  shortDesc,
  link,
}: CtaType) {
  const { cardColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(link.href)

  return (
    <View
      className={`
        ${cardColors.bg} border ${cardColors.border}
        flex flex-col items-start
        p-2 rounded-lg
        cursor-pointer
      `}
      onClick={scrollOnClickLink}
    >
      <Text className={`${cardColors.h3} text-start text-xl font-semibold`}>{link.label}</Text>
      <Text className="text-start max-w-xs">{shortDesc}</Text>
    </View>
  )
}