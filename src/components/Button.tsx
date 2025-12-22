import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import Text from "./Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"

export default function Button({
  href,
  label,
  className = "",
}: LinkType & {
  className?: string
}) {
  const { buttonColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(href)

  return (
    <a
      href={href}
      aria-label={label}
      onClick={scrollOnClickLink}
      className={`
        ${buttonColors.bg} border ${buttonColors.border}
        inline-flex items-center justify-center
        px-4 py-2 rounded-lg
        ${className}
      `}
    >
      <Text className={`${buttonColors.label} text-md tracking-wide font-medium`}>
        {label?.toLocaleUpperCase()}
      </Text>
    </a>
  )
}