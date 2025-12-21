import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import View from "./View"
import Text from "./Text"

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
        rounded-xl text-sm
      `}
    >
      <Text className={`${tagColors.label} text-shadow-md font-medium`}>{tag}</Text>
    </View>
  )
}