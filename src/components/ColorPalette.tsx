import { useColorPalette } from "../contexts/useColorPalette";
import View from "./ui/View";

export default function ColorPalette() {
  // Allows us to change the color palette
  const { setColorPalette } = useColorPalette()

  return (
    <View className="flex flex-row gap-2">
      <View
        className="h-10 w-10 bg-roylp rounded cursor-pointer"
        onClick={() => { setColorPalette("bg-roylp", "text-primary") }}
      />
      <View
        className="h-10 w-10 bg-chrtr rounded cursor-pointer"
        onClick={() => { setColorPalette("bg-chrtr", "text-secondary") }}
      />
      <View
        className="h-10 w-10 bg-orngc rounded cursor-pointer"
        onClick={() => { setColorPalette("bg-orngc", "text-primary") }}
      />
      <View
        className="h-10 w-10 bg-palbr rounded cursor-pointer"
        onClick={() => { setColorPalette("bg-palbr", "text-primary") }}
      />
      <View
        className="h-10 w-10 bg-ghost rounded cursor-pointer"
        onClick={() => { setColorPalette("bg-ghost", "text-secondary") }}
      />
      <View
        className="h-10 w-10 bg-ashbl rounded cursor-pointer"
        onClick={() => { setColorPalette("bg-ashbl", "text-primary") }}
      />
    </View>
  )
}