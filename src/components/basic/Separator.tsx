import View from "./View"

export default function Separator({
  color,
  orientation = "horizontal",
  justify = "center",
  level = "section",
  thickness = 1,
}: {
  color: string
  orientation?: "horizontal" | "vertical"
  justify?: "start" | "center" | "end"
  level?: "section" | "content"
  thickness?: number
}) {

  const justifyClass =
    orientation === "horizontal"
    ? justify === "start"
        ? "justify-start"
        : justify === "end"
          ? "justify-end"
          : "justify-center"
    : justify === "start"
      ? "items-start"
      : justify === "end"
        ? "items-end"
        : "items-center"

  return (
    <View
      className={
        orientation === "horizontal"
          ? `w-full flex ${justifyClass}`
          : `h-full flex ${justifyClass}`
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
              ? `flex ${justifyClass} gap-3`
              : `flex flex-col ${justifyClass} gap-3`
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