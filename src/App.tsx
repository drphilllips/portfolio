import { useState } from "react"
import Text from "./components/Text"
import View from "./components/View"

export default function App() {
  const [bgColor, setBgColor] = useState("bg-primary")
  const [textColor, setTextColor] = useState("text-primary")

  return (
    <View
      className={`
        min-h-screen
        ${bgColor} ${textColor} transition-colors duration-300
        flex flex-col items-center justify-center text-center
        gap-6
      `}
    >
      <Text ic className="text-4xl font-bold">
        Color-inheritance is working 🚀
      </Text>
      <View className="flex flex-row gap-2">
        <View
          className="h-10 w-10 bg-roylp rounded cursor-pointer"
          onClick={() => { setBgColor("bg-roylp"); setTextColor("text-primary") }}
        />
        <View
          className="h-10 w-10 bg-chrtr rounded cursor-pointer"
          onClick={() => { setBgColor("bg-chrtr"); setTextColor("text-secondary") }}
        />
        <View
          className="h-10 w-10 bg-orngc rounded cursor-pointer"
          onClick={() => { setBgColor("bg-orngc"); setTextColor("text-primary") }}
        />
        <View
          className="h-10 w-10 bg-palbr rounded cursor-pointer"
          onClick={() => { setBgColor("bg-palbr"); setTextColor("text-primary") }}
        />
        <View
          className="h-10 w-10 bg-ghost rounded cursor-pointer"
          onClick={() => { setBgColor("bg-ghost"); setTextColor("text-secondary") }}
        />
        <View
          className="h-10 w-10 bg-ashbl rounded cursor-pointer"
          onClick={() => { setBgColor("bg-ashbl"); setTextColor("text-primary") }}
        />
      </View>
    </View>
  )
}