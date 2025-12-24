import type { SectionType } from "../content/schemas/section.schema";
import Text from "./basic/Text";
import type { ContentType } from "../content/schemas/content.schema";
import View from "./basic/View";
import { useColorPalette } from "../contexts/useColorPalette";
import { PAGE_LAST_SECTION_MIN_HEIGHT } from "../constants/pageSections";
import Content from "./Content";

export default function Section({
  id,
  title,
  content,
  lastSection = false,
}: SectionType & {
  lastSection?: boolean
}) {
  const { sectionColors } = useColorPalette()

  return (
    <section
      id={id}
      className={`
        ${lastSection && PAGE_LAST_SECTION_MIN_HEIGHT}
        ${sectionColors.bg} flex flex-col w-full items-start gap-4
      `}
    >
      {title && (
        <Text className={`${sectionColors.h1} text-3xl`}>
          {title}
        </Text>
      )}
      <View className="w-full flex flex-col items-start gap-4">
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