import Page from "../components/Page"
import { ProjectsPageContent } from "../content/pages/projects.content"
import type { PageType } from "../content/schemas/page.schema"

export default function ProjectsPage() {
  const { title, sectIcon, heroSection, ctas, sections }: PageType = ProjectsPageContent

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