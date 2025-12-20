import Page from "../components/Page"
import { ExperiencePageContent } from "../content/pages/experience.content"
import type { PageContent } from "../content/schemas/page.schema"

export default function ExperiencePage() {
  const { title, sections }: PageContent = ExperiencePageContent

  return (
    <Page
      title={title}
      sections={sections}
    />
  )
}