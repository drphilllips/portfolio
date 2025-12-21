import type { SectionContent } from "../content/schemas/section.schema";
import Text from "./Text";
import type { ContentType } from "../content/schemas/content.schema";
import Content from "./Content";
import View from "./View";
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette";

export default function Section({
  id,
  title,
  content,
}: SectionContent) {
  const { sectionColors } = useColorPalette()

  return (
    <section id={id} className={`${sectionColors.bg} flex flex-col w-full items-center gap-6`}>
      {title && (
        <Text className={`${sectionColors.h1} text-3xl`}>
          {title}
        </Text>
      )}
      <View className="w-full flex flex-col items-center gap-4">
        {content.map(({ title, shortText, longText, cards }: ContentType) => (
          <Content
            title={title}
            shortText={shortText}
            longText={longText}
            cards={cards}
          />
        ))}
      </View>
    </section>
  )
}