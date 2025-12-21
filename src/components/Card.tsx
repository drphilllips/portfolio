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
}: CardType) {
  const { cardColors } = useColorPalette()

  return (
    <>
      {(title || text || image) && (
        <View
          className={`
            ${cardColors.bg} ${cardColors.border} border-2
            p-4 rounded-3xl flex flex-1 flex-col items-center gap-4
          `}
        >
          {title && (
            <Text
              className={`
                ${cardColors.h3}
                text-xl font-bold
              `}
            >
              {title}
            </Text>
          )}
          {image && <Image label={image.label} src={image.src} /> }
          {text && (
            <Text
              className={`
                ${cardColors.p}
              `}
            >
              {text}
            </Text>
          )}
          {link && <Button label={link.label} href={link.href} />}
        </View>
      )}
      {(link && !(title || text || image)) && (
        <Button label={link.label} href={link.href} />
      )}
    </>
  )
}