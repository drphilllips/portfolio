import View from "./View"

export default function Separator({
  color,
  orientation = "horizontal",
  level = "section",
  thickness = 1,
}: {
  color: string
  orientation?: "horizontal" | "vertical"
  level?: "section" | "content"
  thickness?: number
}) {

  return (
    <View
      className={
        orientation === "horizontal"
          ? "w-full flex justify-center"
          : "h-full flex items-center"
      }
    >
      {level === "section" ? (
        <View
          className={
            orientation === "horizontal"
              ? `w-full ${color}`
              : `h-full ${color}`
          }
          style={{
            height: orientation === "horizontal" ? thickness : "100%",
            width: orientation === "horizontal" ? "100%" : thickness,
          }}
          aria-hidden="true"
        />
      ) : (
        <View
          className={
            orientation === "horizontal"
              ? "flex items-center justify-center gap-3"
              : "flex flex-col items-center justify-center gap-3"
          }
          aria-hidden="true"
        >
          <View className={`w-1.5 h-1.5 rounded-full ${color}`} />
          <View className={`w-1.5 h-1.5 rounded-full ${color}`} />
          <View className={`w-1.5 h-1.5 rounded-full ${color}`} />
        </View>
      )}
    </View>
  )
}