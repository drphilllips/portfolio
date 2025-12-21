import type { PageContent } from "../content/schemas/page.schema"
import View from "./View"
import Text from "./Text"
import Section from "./Section"
import type { SectionContent } from "../content/schemas/section.schema"
import Separator from "./Separator"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"

export default function Page({
  title,
  sections,
}: PageContent) {
  const { pageColors } = useColorPalette()
  const { hasScrolled } = useSmoothScroll()

  return (
    <View className="relative flex flex-col items-center w-full lg:px-12 px-4 pt-28 lg:pb-28 pb-20 gap-8">
      {title && (
        <View
          className={`
            ${pageColors.bg}
            fixed top-0 z-30
            lg:px-12 px-4 h-20
            flex flex-row w-full items-center
            ${hasScrolled && "shadow-sm"}
          `}
        >
          <Text className={`${pageColors.title} text-start text-4xl font-semibold`}>
            {title}
          </Text>
        </View>
      )}
      {sections.map(({ id, title, content }: SectionContent, i) => (
        <>
          {i > 0 && <Separator key={`sep-${i}`} color={pageColors.sep} />}
          <Section key={id} id={id} title={title} content={content}  />
        </>
      ))}
    </View>
  )
}