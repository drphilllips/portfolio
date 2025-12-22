import { useMemo } from "react"
import type { PageContent } from "../content/schemas/page.schema"
import View from "./View"
import Text from "./Text"
import Section from "./Section"
import type { SectionContent } from "../content/schemas/section.schema"
import Separator from "./Separator"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import { useScrollSpyHash } from "../hooks/useScrollSpyHash"
import type { CtaType } from "../content/schemas/cta.schema"
import Cta from "./Cta"

export default function Page({
  title,
  heroSection,
  ctas,
  sections,
}: PageContent) {
  const { pageColors } = useColorPalette()
  const { hasScrolled } = useSmoothScroll()
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const { visibleSection } = useScrollSpyHash(sectionIds, "hero")

  return (
    <View className="relative flex flex-col items-center w-full lg:px-12 px-4 lg:pt-28 pt-20 lg:pb-28 pb-20 gap-8">
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
          <View className="flex flex-row items-end gap-2">
            <Text className={`${pageColors.title} text-start text-4xl font-semibold`}>
              {title}
            </Text>
            {visibleSection && (
              <Text className={`${pageColors.sub} text-2xl mb-px`}>
                @ {visibleSection}
              </Text>
            )}
          </View>
        </View>
      )}
      <View className="flex flex-col gap-0">
        <Section id={heroSection.id} title={heroSection.title} content={heroSection.content} />
        <View className="flex flex-row w-full flex-wrap justify-between lg:gap-6 gap-3">
          {ctas.map(({ shortDesc, link }: CtaType, i) => (
            <Cta key={i} shortDesc={shortDesc} link={link} />
          ))}
        </View>
      </View>
      {sections.map(({ id, title, content }: SectionContent, i) => (
        <>
          {i > 0 && <Separator key={`sep-${i}`} color={pageColors.sep} />}
          <Section key={id} id={id} title={title} content={content}  />
        </>
      ))}
    </View>
  )
}