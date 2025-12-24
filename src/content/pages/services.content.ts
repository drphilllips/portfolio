import { PageSchema, type PageType } from "../schemas/page.schema";

export const ServicesPageContent: PageType = PageSchema.parse({
  title: "Services",
  sectIcon: "🛠",
  heroSection: {
    id: "hero",
    title: "How I can help",
    content: [
      {
        title: "Web & mobile app development",
        desc:
          "I build modern web and mobile experiences that feel great to use — responsive across devices, intuitive to navigate, and designed with accessibility in mind. I’m comfortable owning the full stack: UI/UX, APIs, data models, and deployment.",
        tags: ["React", "TypeScript", "Python", "UX", "Deployment"],
      },
    ],
  },
  ctas: [
    {
      label: "Web Apps",
      subtitle: "Responsive + accessible",
      hash: "#web-apps",
    },
    {
      label: "Mobile Apps",
      subtitle: "iOS + Android",
      hash: "#mobile-apps",
    },
    {
      label: "Employment",
      subtitle: "Contract → full‑time",
      hash: "#engagement",
    },
    {
      title: "Get in touch",
      subtitle: "Contact",
      href: "/contact",
    },
  ],
  sections: [
    {
      id: "web-apps",
      title: "Web app development",
      content: [
        {
          title: "Web apps that work everywhere",
          desc:
            "I build web applications that are responsive, fast, and easy to understand — with layouts and interactions that feel natural on both desktop and mobile.",
          cards: [
            {
              title: "Responsive UI",
              text:
                "Mobile-first layouts with thoughtful breakpoints so the experience stays consistent across screen sizes.",
              bullets: ["Mobile-first", "Clear layout", "Scales well"],
            },
            {
              title: "Intuitive UX",
              text:
                "Information hierarchy, sensible defaults, and interaction design that reduces friction for common tasks.",
              bullets: ["Scannable", "Low friction", "User-centered"],
            },
            {
              title: "Accessible by default",
              text:
                "Keyboard and screen-reader-friendly patterns, clear contrast, and semantic structure — so more people can use what you build.",
              bullets: ["A11y", "Contrast", "Semantics"],
            },
          ],
          tags: ["UED", "React", "Accessibility", "UI"],
        },
      ],
    },
    {
      id: "mobile-apps",
      title: "Mobile app development",
      content: [
        {
          title: "Mobile-first products",
          desc:
            "I build mobile apps with an emphasis on speed, polish, and practical UX — including role-based flows and real-world workflows.",
          cards: [
            {
              title: "Cross-platform delivery",
              text:
                "React Native-based builds that deliver a consistent experience across iOS and Android.",
              bullets: ["iOS", "Android", "Shared UI"],
            },
            {
              title: "Data + APIs",
              text:
                "Clean backend integration, reliable state management, and data modeling that supports growth.",
              bullets: ["APIs", "Schemas", "Relational DB"],
            },
          ],
          tags: ["React Native", "UX", "APIs", "Databases"],
        },
      ],
    },
    {
      id: "engagement",
      title: "Engagement options",
      content: [
        {
          title: "Remote or in-person",
          desc:
            "I’m open to working remotely or in person depending on your team and project needs.",
          tags: ["Remote", "In-person"],
        },
        {
          title: "Contract, part-time, or full-time",
          desc:
            "I’m flexible on engagement style — contract work, part-time, or full-time roles are all on the table.",
          cards: [
            {
              title: "Good fit for",
              text:
                "Teams that value clear communication, ownership, and iterative delivery.",
              bullets: ["Collaboration", "Ownership", "Iteration"],
            },
            {
              title: "Start the conversation",
              text:
                "If you have a project or role in mind, reach out and I’ll respond as quickly as I can.",
              link: {
                label: "Go to Contact",
                href: "/contact",
              },
            },
          ],
          links: [
            {
              label: "Contact section",
              href: "/contact",
            },
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      content: [
        {
          title: "Ready to build?",
          desc:
            "Send me a quick note with what you’re building (or hiring for), your timeline, and any helpful links — and we’ll go from there.",
          links: [
            {
              label: "Contact me",
              href: "/contact",
            },
          ],
        },
      ],
    },
  ],
})