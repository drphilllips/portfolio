import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import Text from "./basic/Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Button from "./basic/Button"
import View from "./basic/View"
import { Link as LinkIcon } from "lucide-react"

export default function Link({
  href,
  label,
  children,
  className = "",
}: LinkType & {
  children?: React.ReactNode
  className?: string
}) {
  const { linkColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(href)

  return (
    <Button
      activeScaleVariance={0.02}
      aria-label={label}
      onClick={scrollOnClickLink}
      className={`
        ${linkColors.bg} border-2 ${linkColors.border}
        ${children ? "px-3 pt-3 pb-4" : "p-2"}
        flex flex-row items-start gap-3 rounded-lg
        ${className}
      `}
      renderChildren={(isHovering, isPressing) => (
        <>
          <View className="flex flex-col gap-3">
            {children}
            <Text
              className={`
                ${(isHovering || isPressing) && "underline underline-offset-2"}
                ${linkColors.h3} text-start text-xl font-bold leading-none
              `}
            >
              {label}
            </Text>
          </View>
          <LinkIcon className={linkColors.h3} size={16} />
        </>
      )}
    />
  )
}