import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../contexts/useColorPalette"
import Text from "./basic/Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Button from "./basic/Button"
import View from "./basic/View"
import { SquareArrowOutUpRight } from "lucide-react"
import useExternalLink from "../hooks/useExternalLink"

export default function Link({
  sectionHash: hash,
  externalLink: href,
  label,
  title,
  subtitle,
}: LinkType) {
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
        ${label && (title || subtitle) ? "pl-3 pr-4 pt-3 pb-4" : "py-2 pl-2 pr-3"}
        flex flex-row items-start gap-3 rounded-lg
      `}
      renderChildren={() => (
        <>
          <View className={`flex flex-col ${label && title ? "gap-3" : "gap-1"}`}>
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
            {label && (
              <Text
                className={`
                  relative inline-block
                  ${linkColors.h3}
                  text-start text-xl font-bold leading-none
                `}
              >
                {label}
              </Text>
            )}
          </View>
          {href && (
            <SquareArrowOutUpRight className={linkColors.h3} size={16} />
          )}
        </>
      )}
    />
  )
}