import type { ContentType } from "../content/schemas/content.schema"
import View from "./View"
import Text from "./Text"
import Separator from "./Separator"
import type { CardType } from "../content/schemas/card.schema"
import Card from "./Card"
import Image from "./Image"
import Button from "./Button"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"

export default function Content({
  title,
  shortText,
  longText,
  image,
  link,
  cards,
}: ContentType) {
  const { contentColors } = useColorPalette()

  return (
    <View className={`${contentColors.bg} flex flex-col items-center w-full gap-6`}>
      {title && (
        <Text className={`${contentColors.h2} lg:max-w-prose max-w-xs text-xl font-bold`}>
          {title}
        </Text>
      )}
      {image && <Image label={image.label} src={image.src} /> }
      {link && <Button label={link.label} href={link.href} />}
      {shortText && (
        <Text
          className={`${contentColors.h3} max-w-xs italic`}
        >
          {shortText}
        </Text>)}
      {(shortText && longText || title && longText) && (
        <Separator color={contentColors.sep} level="content" />
      )}
      {longText && (
        <Text className={`${contentColors.p} lg:max-w-prose max-w-xs`}>
          {longText}
        </Text>
      )}
      <View className="grid lg:grid-cols-3 grid-cols-1 justify-center gap-4">
        {cards && cards.map(
          ({title, text, image, link, bullets}: CardType, i) => (
            <Card key={i} title={title} text={text} image={image} link={link} bullets={bullets} />
          )
        )}
      </View>
    </View>
  )
}