import { Fragment, useMemo } from "react"
import type { PageType } from "../content/schemas/page.schema"
import View from "./basic/View"
import Text from "./basic/Text"
import Section from "./Section"
import type { SectionType } from "../content/schemas/section.schema"
import { useColorPalette } from "../contexts/useColorPalette"
import { useSmoothScroll } from "../hooks/useSmoothScroll"
import { useScrollSpyHash } from "../hooks/useScrollSpyHash"
import Separator from "./basic/Separator"
import { useResponsiveDesign } from "../contexts/useResponsiveDesign"
import type { LinkType } from "../content/schemas/link.schema"
import Link from "./Link"

export default function Page({
  title,
  sectIcon,
  heroSection,
  ctas,
  sections,
}: PageType) {
  const { onMobileSideways } = useResponsiveDesign()
  const { pageColors } = useColorPalette()
  const { atTopOfPage } = useSmoothScroll()
  const sectionIds = useMemo(() => (sections || []).map((s) => s.id), [sections])
  const { visibleSection } = useScrollSpyHash([heroSection.id, ...sectionIds], atTopOfPage, "hero")

  const responsivePadding = useMemo(() => (
    onMobileSideways ? "px-12" : "lg:px-40 px-4"
  ), [onMobileSideways])

  return (
    <View
      className={`
        relative flex flex-col items-start w-full
        ${onMobileSideways ? "pt-18" : "pt-20"}
        lg:pb-28 pb-20 lg:gap-12 gap-6
      `}
    >
      {title && (
        <View
          className={`
            ${pageColors.bg}
            fixed top-0 z-30 ${responsivePadding}
            ${onMobileSideways ? "h-16" : "h-20"}
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
      <View className={`flex flex-col gap-4 ${responsivePadding}`}>
        <Section id={heroSection.id} title={heroSection.title} content={heroSection.content} />
        {ctas && (
          <View className="flex flex-row w-full flex-wrap justify-start gap-3">
            {ctas.map(({ label, title, subtitle, hash, href }: LinkType, i) => (
              <Link key={i} label={label} title={title} subtitle={subtitle} hash={hash} href={href} />
            ))}
          </View>
        )}
      </View>
      {sections && (
        <>
          <View className={`flex flex-row w-full ${responsivePadding}`}>
            <Separator color={pageColors.sep} />
          </View>
          <View className={`flex flex-col lg:gap-12 gap-6 ${responsivePadding}`}>
            {sections.map(({ id, title, content }: SectionType, i) => (
              <Fragment key={id}>
                {i > 0 && <Separator color={pageColors.sep} />}
                <Section
                  id={id}
                  title={title}
                  content={content}
                  lastSection={i === sections.length - 1}
                />
              </Fragment>
            ))}
          </View>
        </>
      )}
    </View>
  )
}