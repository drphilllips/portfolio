import Page from "../components/Page"
import { ServicesPageContent } from "../content/pages/services.content"
import type { PageType } from "../content/schemas/page.schema"

export default function ProjectsPage() {
  const { title, sectIcon, heroSection, ctas, sections }: PageType = ServicesPageContent

  return (
    <Page
      title={title}
      sectIcon={sectIcon}
      heroSection={heroSection}
      ctas={ctas}
      sections={sections}
    />
  )
}