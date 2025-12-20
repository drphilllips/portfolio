import type { LinkType } from "../content/schemas/link.schema";
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette";
import Text from "./Text"

export default function Button({
  href,
  label,
}: LinkType) {
  const { colorPalette } = useColorPalette()

  const bg: string = colorPalette.primaryColor
  const border: string = colorPalette.borderColor
  const text: string = colorPalette.secondaryTextColor

  return (
    <a
      href={href}
      aria-label={label}
      className={`inline-flex items-center justify-center px-4 py-2 border ${bg} ${border} ${text} rounded-md`}
    >
      <Text>{label}</Text>
    </a>
  )
}