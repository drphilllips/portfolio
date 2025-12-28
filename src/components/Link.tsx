import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../contexts/useColorPalette"
import Text from "./basic/Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Button from "./basic/Button"
import View from "./basic/View"
import { SquareArrowOutUpRight } from "lucide-react"
import useExternalLink from "../hooks/useExternalLink"
import useInternalLink from "../hooks/useInternalLink"
import { PAGE_EMOJIS } from "../constants/page"

export default function Link({
  sectionHash,
  externalLink,
  internalLink,
  label,
  title,
  subtitle,
}: LinkType) {
  const { linkColors } = useColorPalette()
  const { scrollToSection } = useSmoothScroll(sectionHash)
  const { openLinkInNewTab } = useExternalLink(externalLink)
  const { navigateToPageSection } = useInternalLink(internalLink)

  const type: "sec" | "ext" | "int" | null =
    sectionHash ? "sec" : externalLink ? "ext" : internalLink ? "int" : null

  function handleClickLink(e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault()
    switch (type) {
      case "sec": scrollToSection(); break;
      case "ext": openLinkInNewTab(); break;
      case "int": navigateToPageSection(); break;
    }
  }

  return (
    <Button
      activeScaleVariance={0.03}
      aria-label={label}
      onClick={handleClickLink}
      className={`
        ${linkColors.bg}
        border-2 ${linkColors.border}
        ${label && title && subtitle ? "pl-3 pr-4 pt-2 pb-4" : "pb-2 pt-1 px-2"}
        flex flex-row items-center gap-2 rounded-lg
      `}
      renderChildren={() => (
        <>
          <View className={`flex flex-col pt-1 ${label && title ? "gap-3" : "gap-1"}`}>
            {(subtitle || title) && (
              <View className="flex flex-col gap-1">
                <View className="flex flex-row gap-0 items-center">
                  {(subtitle && internalLink) && (
                    <Text className="w-6 leading-none text-center text-sm">
                      {internalLink && PAGE_EMOJIS[internalLink.page]}
                    </Text>
                  )}
                  {subtitle && (
                    <Text className={`${linkColors.h5} leading-none text-start`}>
                      {subtitle}
                    </Text>
                  )}
                </View>
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
          {externalLink && (
            <SquareArrowOutUpRight className={`mt-1 ${linkColors.h3}`} size={16} />
          )}
          {(internalLink && !subtitle) && (
            <Text>{PAGE_EMOJIS[internalLink.page]}</Text>
          )}
        </>
      )}
    />
  )
}