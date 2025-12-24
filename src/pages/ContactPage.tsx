import Page from "../components/Page"
import { ContactPageContent } from "../content/pages/contact.content"
import type { PageType } from "../content/schemas/page.schema"

export default function ContactPage() {
  const { title, sectIcon, heroSection, ctas, sections }: PageType = ContactPageContent

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