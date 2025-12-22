import type { CardType } from "../content/schemas/card.schema"
import Text from "./Text"
import Image from "./Image"
import View from "./View"
import Button from "./Button"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { Component } from "lucide-react"
import Separator from "./Separator"

export default function Card({
  title,
  text,
  image,
  link,
  bullets,
}: CardType) {
  const { cardColors } = useColorPalette()

  return (
    <>
      {(title || text || image || bullets) && (
        <View
          className={`
            ${cardColors.bg} ${cardColors.border} border
            ${cardColors.shadow} shadow-sm
            px-4 pt-4 pb-6 rounded-2xl flex flex-1 flex-col items-start gap-2
          `}
        >
          {title && (
            <Text className={`${cardColors.h3} text-start text-xl font-semibold`}>
              {title}
            </Text>
          )}
          {image && <Image label={image.label} src={image.src} /> }
          {text && (
            <Text className={`${cardColors.p} text-start`}>
              {text}
            </Text>
          )}
          {(text && bullets) && <Separator color={cardColors.sep} />}
          {bullets && (
            <View className={`flex flex-col gap-2 rounded-xl overflow-hidden`}>
              {bullets.map((bulletPt: string, i) =>(
                <View key={i} className={`flex flex-row items-start gap-1`}>
                  <Component className={`${cardColors.h3} shrink-0 mt-[5px]`} size={12} strokeWidth={2.5} />
                  <Text className={`${cardColors.bulletPt} text-left leading-snug`}>
                    {bulletPt}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {link && <Button label={link.label} href={link.href} />}
        </View>
      )}
      {(link && !(title || text || image || bullets)) && (
        <Button label={link.label} href={link.href} />
      )}
    </>
  )
}