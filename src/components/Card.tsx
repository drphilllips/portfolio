import type { CardType } from "../content/schemas/card.schema"
import Text from "./Text"
import Image from "./Image"
import View from "./View"
import Button from "./Button"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { Component } from "lucide-react"

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
            ${cardColors.bg} ${cardColors.border} border-3
            px-4 pt-4 pb-6 rounded-3xl flex flex-1 flex-col items-center gap-2
          `}
        >
          {title && (
            <Text className={`${cardColors.h3} text-xl font-bold`}>
              {title}
            </Text>
          )}
          {image && <Image label={image.label} src={image.src} /> }
          {text && (
            <Text className={`${cardColors.p}`}>
              {text}
            </Text>
          )}
          {bullets && (
            <View className={`flex flex-col gap-px mx-2 rounded-xl overflow-hidden ${cardColors.sep}`}>
              {bullets.map((bulletPt: string, i) =>(
                <View key={i} className={`flex flex-row items-start ${cardColors.bg} px-4 py-[10px] gap-3`}>
                  <Component className={`${cardColors.h3} shrink-0 mt-1`} size={12} strokeWidth={2.5} />
                  <Text className={`${cardColors.bulletPt} text-justify text-sm`}>
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