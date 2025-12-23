import type { ContentType } from "../content/schemas/content.schema"
import View from "./View"
import Text from "./Text"
import type { CardType } from "../content/schemas/card.schema"
import Card from "./Card"
// import Image from "./Image"
import Link from "./Link"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import Tag from "./Tag"
import { CalendarDays } from "lucide-react"
import Separator from "./Separator"

export default function Content({
  title,
  date,
  desc,
  // image,
  link,
  cards,
  tags,
}: ContentType) {
  const { contentColors } = useColorPalette()

  return (
    <View className={`${contentColors.bg} flex flex-col items-start w-full gap-6`}>
      {(tags || title) && (
        <View className="flex flex-col gap-3 items-start">
          {title && (
            <Text className={`${contentColors.h2} text-start text-2xl leading-tight font-bold`}>
              {title}
            </Text>
          )}
          {tags && (
            <View className="flex flex-row flex-wrap gap-[6px] items-start justify-start">
              {tags.map((tag: string, i) => (
                <Tag key={i} tag={tag} />
              ))}
            </View>
          )}
        </View>
      )}
      {link && <Link label={link.label} href={link.href} />}
      {(date || desc) && (
        <View className="flex flex-col items-start gap-2">
          {date && (
            <View className="flex flex-col gap-2">
              <View className="flex flex-row items-end gap-1 mr-6">
                <CalendarDays className={`${contentColors.h3}`} size={20} />
                <Text className={`${contentColors.h3} font-bold leading-tight`}>
                  {date}
                </Text>
              </View>
              <Separator color={contentColors.sep} />
            </View>
          )}
          {desc && (
            <Text className={`${contentColors.p} text-start font-medium`}>
              {desc}
            </Text>
          )}
        </View>
      )}
      {cards && (
        <View className="flex lg:flex-row flex-col gap-3">
          {cards.map(
            ({title, text, image, link, bullets}: CardType, i) => (
              <Card key={i} title={title} text={text} image={image} link={link} bullets={bullets} />
            )
          )}
        </View>
      )}
    </View>
  )
}