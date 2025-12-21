import type { CardType } from "../content/schemas/card.schema"
import Text from "./Text"
import Image from "./Image"
import View from "./View"
import Button from "./Button"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"

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
            ${cardColors.bg} ${cardColors.border} border-2
            px-4 pt-4 pb-6 rounded-3xl flex flex-1 flex-col items-center gap-3
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
            <View className={`flex flex-row gap-px mx-2 rounded-xl overflow-hidden ${cardColors.sep}`}>
              {bullets.map((bulletPt: string, i) =>(
                <View key={i} className={`flex flex-1 flex-row items-start ${cardColors.bg} px-3 py-2`}>
                  <Text className={`${cardColors.bulletPt} text-center text-sm`}>
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