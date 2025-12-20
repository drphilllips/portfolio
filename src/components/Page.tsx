import type { PageContent } from "../content/schemas/page.schema"
import View from "./View"
import Text from "./Text"
import Section from "./Section"
import type { SectionContent } from "../content/schemas/section.schema"
import Separator from "./SectionSeparator"

export default function Page({
  title,
  sections,
}: PageContent) {
  return (
    <View className="flex flex-col items-center w-full p-4 gap-8">
      {title && <Text className="text-start text-4xl font-semibold">{title}</Text>}
      {sections.map(({ id, title, content }: SectionContent, i) => (
        <>
          {i > 0 && <Separator />}
          <Section key={id} id={id} title={title} content={content}  />
        </>
      ))}
    </View>
  )
}