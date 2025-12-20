import type { ContentType } from "../content/schemas/content.schema"
import View from "./View"
import Text from "./Text"
import Separator from "./SectionSeparator"
import type { CardType } from "../content/schemas/card.schema"
import Card from "./Card"
import Image from "./Image"
import Button from "./Button"

export default function Content({
  title,
  shortText,
  longText,
  image,
  link,
  cards,
}: ContentType) {
  return (
    <View className="flex flex-col items-center w-full gap-6">
      {title && <Text className="lg:max-w-prose max-w-xs text-xl font-bold">{title}</Text>}
      {image && <Image label={image.label} src={image.src} /> }
      {link && <Button label={link.label} href={link.href} />}
      {shortText && <Text className="max-w-xs">{shortText}</Text>}
      {(shortText && longText) && <Separator level="content" />}
      {longText && <Text className="lg:max-w-prose max-w-xs">{longText}</Text>}
      <View className="grid lg:grid-cols-3 grid-cols-1 justify-center gap-4">
        {cards && cards.map(
          ({title, text, image, link}: CardType, i) => (
            <Card key={i} title={title} text={text} image={image} link={link} />
          )
        )}
      </View>
    </View>
  )
}