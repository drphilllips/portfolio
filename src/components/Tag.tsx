import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import View from "./basic/View"
import Text from "./basic/Text"

export default function Tag({
  tag,
}: {
  tag: string,
}) {
  const { tagColors } = useColorPalette()

  return (
    <View
      className={`
        ${tagColors.bg} border ${tagColors.border} shadow-2xs ${tagColors.shadow}
        flex flex-row px-2 py-px items-center justify-center
        rounded-xl text-sm cursor-default
      `}
    >
      <Text className={`${tagColors.label} font-semibold`}>{tag}</Text>
    </View>
  )
}