import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import View from "./View"


export default function Separator({
  level = "section",
}: {
  level?: "section" | "content"
}) {
  const { colorPalette } = useColorPalette()

  const sepColor = colorPalette.buttonColor

  return (
    <View className="w-full flex justify-center">
      {level === "section" ? (
        <View
          className={`h-px w-full opacity-40 ${sepColor}`}
          aria-hidden="true"
        />
      ) : (
        <View
          className="flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <View className={`w-1.5 h-1.5 rounded-full opacity-50 ${sepColor}`} />
          <View className={`w-1.5 h-1.5 rounded-full opacity-50 ${sepColor}`} />
          <View className={`w-1.5 h-1.5 rounded-full opacity-50 ${sepColor}`} />
        </View>
      )}
    </View>
  )
}