import Page from "../components/Page"
import { ExperiencePageContent } from "../content/pages/experience.content"
import type { PageContent } from "../content/schemas/page.schema"

export default function ExperiencePage() {
  const { title, heroSection, ctas, sections }: PageContent = ExperiencePageContent

  return (
    <Page
      title={title}
      heroSection={heroSection}
      ctas={ctas}
      sections={sections}
    />
  )
}