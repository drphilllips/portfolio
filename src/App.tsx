import { useState } from "react"
import Text from "./components/Text"

export default function App() {
  const [bgColor, setBgColor] = useState("bg-primary")

  return (
    <div
      className={`
        min-h-screen
        ${bgColor} transition-colors duration-300
        flex flex-col items-center justify-center text-center
        gap-6
      `}
    >
      <Text className="text-4xl font-bold">
        Tailwind v4 is working 🚀
      </Text>
      <div className="flex flex-row gap-2">
        <div
          className="h-10 w-10 bg-roylp rounded cursor-pointer"
          onClick={() => setBgColor("bg-roylp")}
        />
        <div
          className="h-10 w-10 bg-chrtr rounded cursor-pointer"
          onClick={() => setBgColor("bg-chrtr")}
        />
        <div
          className="h-10 w-10 bg-orngc rounded cursor-pointer"
          onClick={() => setBgColor("bg-orngc")}
        />
        <div
          className="h-10 w-10 bg-palbr rounded cursor-pointer"
          onClick={() => setBgColor("bg-palbr")}
        />
        <div
          className="h-10 w-10 bg-ghost rounded cursor-pointer"
          onClick={() => setBgColor("bg-ghost")}
        />
        <div
          className="h-10 w-10 bg-ashbl rounded cursor-pointer"
          onClick={() => setBgColor("bg-ashbl")}
        />
      </div>
    </div>
  )
}