import type { PageContent } from "../content/schemas/page.schema"
import View from "./View"
import Text from "./Text"
import Section from "./Section"
import type { SectionContent } from "../content/schemas/section.schema"

export default function Page({
  title,
  sections,
}: PageContent) {
  return (
    <View>
      {title && <Text className="lg:text-4xl text-2xl">{title}</Text>}
      {sections.map(({ id, title, content }: SectionContent) => (
        <Section key={id} id={id} title={title} content={content}  />
      ))}
    </View>
  )
}