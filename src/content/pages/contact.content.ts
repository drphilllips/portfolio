import { PageSchema, type PageType } from "../schemas/page.schema";

export const ContactPageContent: PageType = PageSchema.parse({
  title: "Contact",
  sectIcon: "✉",
  heroSection: {
    id: "hero",
    title: "Let's connect",
    content: [
      {
        title: "Open to roles, projects, and collaborations",
        desc:
          "The fastest way to reach me is email. If a phone call is easier, I'm generally available weekdays during business hours (Pacific).",
        tags: ["Email", "Phone", "Pacific Time", "Cupertino"],
      },
      {
        desc: "And I'm always happy to connect on LinkedIn!"
      },
    ],
  },
  ctas: [
    {
      externalLink: "https://www.linkedin.com/in/dylan-phillips-17b3001b5/",
      subtitle: "Network",
      label: "LinkedIn",
    },
    {
      externalLink: "mailto:dphillips072402@gmail.com",
      subtitle: "Email",
      label: "dphillips072402@gmail.com",
    },
    {
      externalLink: "tel:+14089665319",
      subtitle: "Phone",
      label: "(408) 966-5319",
    },
  ],
})