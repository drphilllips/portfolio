import type { SectionType } from "../content/schemas/section.schema";
import Text from "./Text";
import type { ContentType } from "../content/schemas/content.schema";
import Content from "./Content";
import View from "./View";
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette";

export default function Section({
  id,
  title,
  content,
}: SectionType) {
  const { sectionColors } = useColorPalette()

  return (
    <section id={id} className={`${sectionColors.bg} flex flex-col w-full items-start gap-6`}>
      {title && (
        <Text className={`${sectionColors.h1} text-3xl`}>
          {title}
        </Text>
      )}
      <View className="w-full flex flex-col items-start gap-6">
        {content.map(({ title, date: shortText, desc: longText, image, link, cards, tags }: ContentType) => (
          <Content
            title={title}
            date={shortText}
            desc={longText}
            image={image}
            link={link}
            cards={cards}
            tags={tags}
          />
        ))}
      </View>
    </section>
  )
}