import type { SectionContent } from "../content/schemas/section.schema";
import Text from "./Text";
import type { ContentType } from "../content/schemas/content.schema";
import Content from "./Content";

export default function Section({
  id,
  title,
  content,
}: SectionContent) {
  return (
    <section id={id}>
      {title && <Text className="lg:text-2xl text-xl">{title}</Text>}
      {content.map(({ title, shortText, longText, images, links }: ContentType) => (
        <Content
          title={title}
          shortText={shortText}
          longText={longText}
          images={images}
          links={links}
        />
      ))}
    </section>
  )
}