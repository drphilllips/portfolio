import Page from "../../../components/Page"
import { ProjectsPortfolioHowItsMadePageContent } from "../../../content/pages/projects/portfolio/projects.portfolio.how-its-made.content"
import type { PageType } from "../../../content/schemas/page.schema"


export default function ProjectsPortfolioHowItsMadePage() {
  const { title, sectIcon, heroSection, ctas, sections }: PageType = ProjectsPortfolioHowItsMadePageContent

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