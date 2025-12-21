import type { ContentType } from "../content/schemas/content.schema"
import View from "./View"
import Text from "./Text"
import Separator from "./Separator"
import type { CardType } from "../content/schemas/card.schema"
import Card from "./Card"
// import Image from "./Image"
import Button from "./Button"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import Tag from "./Tag"

export default function Content({
  title,
  shortText,
  longText,
  // image,
  link,
  cards,
  tags,
}: ContentType) {
  const { contentColors } = useColorPalette()

  return (
    <View className={`${contentColors.bg} flex flex-col items-center w-full gap-6`}>
      {(tags || title) && (
        <View className="flex flex-col gap-3 items-center">
          {title && (
            <Text className={`${contentColors.h2} lg:max-w-prose max-w-xs text-2xl leading-tight font-bold`}>
              {title}
            </Text>
          )}
          {tags && (
            <View className="flex flex-row flex-wrap gap-2 items-center justify-center">
              {tags.map((tag: string, i) => (
                <Tag key={i} tag={tag} />
              ))}
            </View>
          )}
        </View>
      )}
      {link && <Button label={link.label} href={link.href} />}
      {(shortText || longText) && (
        <View className="flex flex-col items-center gap-2">
          {shortText && (
            <Text
              className={`${contentColors.h3} max-w-xs italic`}
            >
              {shortText}
            </Text>)}
          {(shortText && longText) && (
            <Separator color={contentColors.sep} level="content" />
          )}
          {longText && (
            <Text className={`${contentColors.p} lg:max-w-prose max-w-xs`}>
              {longText}
            </Text>
          )}
        </View>
      )}
      <View className="flex lg:flex-row flex-col gap-4">
        {cards && cards.map(
          ({title, text, image, link, bullets}: CardType, i) => (
            <Card key={i} title={title} text={text} image={image} link={link} bullets={bullets} />
          )
        )}
      </View>
    </View>
  )
}