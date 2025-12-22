import Page from "../components/Page"
import { AboutPageContent } from "../content/pages/about.content"
import type { PageType } from "../content/schemas/page.schema"

export default function AboutPage() {
  const { title, sectIcon, heroSection, ctas, sections }: PageType = AboutPageContent

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