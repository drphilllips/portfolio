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
    ],
  },
  ctas: [
    {
      subtitle: "Email",
      link: { label: "dphillips072402@gmail.com", href: "#email" },
    },
    {
      subtitle: "Phone",
      link: { label: "(408) 966-5319", href: "#phone" },
    },
    {
      subtitle: "Location",
      link: { label: "Cupertino, CA", href: "#location" },
    },
  ],
  sections: [
    {
      id: "email",
      title: "Email",
      content: [
        {
          title: "Email",
          desc:
            "If you're reaching out about a role, a project, or anything collaboration-related, email is best. I respond as quickly as I can.",
          link: { label: "dphillips072402@gmail.com", href: "mailto:dphillips072402@gmail.com" },
          cards: [
            {
              title: "Tips for faster context",
              text:
                "If helpful, include a quick summary of your timeline, the role/project scope, and any relevant links (job post, repo, spec, etc.).",
              bullets: ["Timeline", "Scope", "Links"],
            },
          ],
          tags: ["Email", "Fastest"],
        },
      ],
    },
    {
      id: "phone",
      title: "Phone",
      content: [
        {
          title: "Phone",
          desc:
            "Phone calls work well for quick alignment. I'm typically available for calls Monday–Friday, 9:00 AM – 5:00 PM Pacific Time.",
          link: { label: "(408) 966-5319", href: "tel:+14089665319" },
          cards: [
            {
              title: "Availability",
              text: "M–F, 9–5 PST",
              bullets: ["Pacific Time", "Weekdays", "Business hours"],
            },
          ],
          tags: ["Phone", "PST"],
        },
      ],
    },
    {
      id: "location",
      title: "Location",
      content: [
        {
          title: "Cupertino, CA",
          desc:
            "I'm based in Cupertino, California (Pacific Time). Open to remote opportunities and collaborating with teams across time zones.",
          link: {
            label: "Open in Google Maps",
            href: "https://www.google.com/maps/search/?api=1&query=Cupertino%2C%20CA",
          },
          cards: [
            {
              title: "Time zone",
              text: "Pacific (PST/PDT)",
              bullets: ["M–F", "9–5", "Pacific"],
            },
          ],
          tags: ["Cupertino", "Pacific"],
        },
      ],
    },
  ],
})