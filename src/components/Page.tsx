import type { PageContent } from "../content/schemas/page.schema"
import View from "./View"
import Text from "./Text"
import Section from "./Section"
import type { SectionContent } from "../content/schemas/section.schema"
import Separator from "./SectionSeparator"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"

export default function Page({
  title,
  sections,
}: PageContent) {
  const { colorPalette } = useColorPalette()

  return (
    <View className="relative flex flex-col items-center w-full pt-28 lg:px-12 lg:pb-6 px-4 pb-4 gap-8">
      {title && (
        <View
          className={`
            lg:px-12 px-4 h-20
            fixed top-0 z-30
            flex flex-row w-full items-center
            ${colorPalette.pageColor} shadow-sm
          `}
        >
          <Text className="text-start text-4xl font-semibold">
            {title}
          </Text>
        </View>
      )}
      {sections.map(({ id, title, content }: SectionContent, i) => (
        <>
          {i > 0 && <Separator />}
          <Section key={id} id={id} title={title} content={content}  />
        </>
      ))}
    </View>
  )
}