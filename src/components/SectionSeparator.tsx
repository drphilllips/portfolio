import View from "./View"


export default function Separator({
  level = "section",
  color,
}: {
  level?: "section" | "content"
  color: string
}) {

  return (
    <View className="w-full flex justify-center">
      {level === "section" ? (
        <View
          className={`h-px w-full opacity-40 ${color}`}
          aria-hidden="true"
        />
      ) : (
        <View
          className="flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <View className={`w-1.5 h-1.5 rounded-full opacity-50 ${color}`} />
          <View className={`w-1.5 h-1.5 rounded-full opacity-50 ${color}`} />
          <View className={`w-1.5 h-1.5 rounded-full opacity-50 ${color}`} />
        </View>
      )}
    </View>
  )
}