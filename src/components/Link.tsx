import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../contexts/useColorPalette"
import Text from "./basic/Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Button from "./basic/Button"
import View from "./basic/View"
import { Link as LinkIcon } from "lucide-react"
import useExternalLink from "../hooks/useExternalLink"

export default function Link({
  hash,
  href,
  label,
  title,
  subtitle,
  children,
  className = "",
}: LinkType & {
  children?: React.ReactNode
  className?: string
}) {
  const { linkColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(hash)
  const { openLinkInNewTab } = useExternalLink(href)

  return (
    <Button
      activeScaleVariance={0.03}
      aria-label={label}
      onClick={hash ? scrollOnClickLink : openLinkInNewTab}
      className={`
        ${linkColors.bg}
        border-2 ${linkColors.border}
        ${children ? "px-3 pt-3 pb-4" : "p-2"}
        flex flex-row items-start gap-3 rounded-lg
        ${className}
      `}
      renderChildren={() => (
        <>
          <View className="flex flex-col gap-3">
            {(subtitle || title) && (
              <View className="flex flex-col gap-1">
                {subtitle && (
                  <Text className={`${linkColors.h5} leading-none text-start`}>
                    {subtitle}
                  </Text>
                )}
                {title && (
                  <Text className={`${linkColors.h4} text-lg leading-none text-start`}>
                    {title}
                  </Text>
                )}
              </View>
            )}
            <Text
              className={`
                relative inline-block
                ${linkColors.h3}
                text-start text-xl font-bold leading-none
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