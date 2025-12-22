import { useMemo } from "react"
import type { PageType } from "../content/schemas/page.schema"
import View from "./View"
import Text from "./Text"
import Section from "./Section"
import type { SectionType } from "../content/schemas/section.schema"
import Separator from "./Separator"
import { useColorPalette } from "../features/painted-background/contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import { useScrollSpyHash } from "../hooks/useScrollSpyHash"
import type { CtaType } from "../content/schemas/cta.schema"
import Cta from "./Cta"

export default function Page({
  title,
  sectIcon,
  heroSection,
  ctas,
  sections,
}: PageType) {
  const { pageColors } = useColorPalette()
  const { atTopOfPage, atEndOfPage } = useSmoothScroll()
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const { visibleSection } = useScrollSpyHash([heroSection.id, ...sectionIds], atTopOfPage, atEndOfPage, "hero")

  return (
    <View className="relative flex flex-col items-start w-full lg:pt-24 pt-20 lg:pb-28 pb-20 gap-8">
      {title && (
        <View
          className={`
            ${pageColors.bg}
            fixed top-0 z-30
            lg:px-40 px-4 h-20
            flex flex-row w-full items-center
            ${!atTopOfPage && "shadow-sm"}
          `}
        >
          <View className="flex flex-row items-end gap-2">
            <Text className={`${pageColors.title} text-start text-4xl font-semibold`}>
              {title}
            </Text>
            {visibleSection && (
              <Text className={`${pageColors.sub} text-2xl mb-px`}>
                {sectIcon} {visibleSection}
              </Text>
            )}
          </View>
        </View>
      )}
      <View className="flex lg:px-40 px-4 flex-col gap-4">
        <Section id={heroSection.id} title={heroSection.title} content={heroSection.content} />
        <View className="flex flex-row w-full flex-wrap justify-start gap-3">
          {ctas.map(({ title, subtitle, link }: CtaType, i) => (
            <Cta key={i} title={title} subtitle={subtitle} link={link} />
          ))}
        </View>
      </View>
      <View className="flex flex-row w-full lg:px-40 px-4">
        <Separator color={pageColors.sep} />
      </View>
      <View className="flex flex-col gap-8 lg:px-40 px-4">
        {sections.map(({ id, title, content }: SectionType, i) => (
          <>
            {i > 0 && <Separator key={`sep-${i}`} color={pageColors.sep} />}
            <Section key={id} id={id} title={title} content={content}  />
          </>
        ))}
      </View>
    </View>
  )
}