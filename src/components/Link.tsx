import type { LinkType } from "../content/schemas/link.schema"
import { useColorPalette } from "../contexts/useColorPalette"
import Text from "./basic/Text"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import Button from "./basic/Button"
import View from "./basic/View"
import { SquareArrowOutUpRight, Link as LinkIcon } from "lucide-react"
import useExternalLink from "../hooks/useExternalLink"
import { useNavigate } from "react-router-dom"

export default function Link({
  sectionHash,
  externalLink,
  internalLink,
  label,
  title,
  subtitle,
}: LinkType) {
  const { linkColors } = useColorPalette()
  const { scrollOnClickLink } = useSmoothScroll(sectionHash)
  const { openLinkInNewTab } = useExternalLink(externalLink)
  const navigate = useNavigate()

  const type: "sec" | "ext" | "int" | null =
    sectionHash ? "sec" : externalLink ? "ext" : internalLink ? "int" : null

  function handleClickLink(e: MouseEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent> ) {
    switch (type) {
      case "sec": scrollOnClickLink(e); break;
      case "ext": openLinkInNewTab(); break;
      case "int": navigate(`${internalLink}`); break;
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
        ${label && title && subtitle ? "pl-3 pr-4 pt-3 pb-4" : "py-2 pl-2 pr-3"}
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
          {externalLink && (
            <SquareArrowOutUpRight className={linkColors.h3} size={16} />
          )}
          {internalLink && (
            <LinkIcon className={linkColors.h3} size={16} />
          )}
        </>
      )}
    />
  )
}