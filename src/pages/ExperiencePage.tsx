import Page from "../components/Page"
import { ExperiencePageContent } from "../content/pages/experience.content"
import type { PageType } from "../content/schemas/page.schema"

export default function ExperiencePage() {
  const { title, heroSection, ctas, sections }: PageType = ExperiencePageContent

  return (
    <Page
      title={title}
      heroSection={heroSection}
      ctas={ctas}
      sections={sections}
    />
  )
}