import { PageSchema, type PageType } from "../schemas/page.schema";

export const ProjectsPageContent: PageType = PageSchema.parse({
  title: "Projects",
  sectIcon: "⚡",
  heroSection: {
    id: "hero",
    title: "My favorite selection of...",
    content: [
      {
        title: "Product-driven, full-stack builds",
        desc:
          "A selection of recent work that reflects how I like to build: clear data models, thoughtful UX, and systems that ship cleanly. These projects span front-end interactions, backend APIs, and pragmatic deployment choices.",
        tags: ["React", "TypeScript", "Python", "UX", "Deployment"],
      },
    ],
  },
  ctas: [
    {
      hash: "#portfolio",
      subtitle: "2025",
      title: "React, UI/UX, Framer Motion",
      label: "My Online Portfolio",
    },
    {
      hash: "#mc-playground",
      subtitle: "2025",
      title: "React, Vercel, Algorithms",
      label: "Minecraft Playground",
    },
    {
      hash: "#monkey-wrench",
      subtitle: "2025",
      title: "React Native, Django, Contract Work",
      label: "MonkeyWrench Auto Shop App",
    },
  ],
  sections: [
    {
      id: "portfolio",
      title: "Portfolio Website",
      content: [
        {
          title: "A content-driven site designed for clarity",
          desc:
            "This portfolio is built to be easy to navigate and fast to maintain. I use a schema-first content layer so each page is consistent, type-safe, and easy to evolve over time.",
          cards: [
            {
              title: "Schema-first content",
              text:
                "Pages, sections, cards, and links are validated with Zod so content stays reliable and structured as the site grows.",
              bullets: [
                "Typed content objects",
                "Consistent page structure",
                "Easy iteration",
              ],
            },
            {
              title: "UX-focused presentation",
              text:
                "Designed to highlight projects quickly while still letting visitors drill into details without friction.",
              bullets: ["Clear hierarchy", "Scannable cards", "Accessible patterns"],
            },
          ],
          tags: ["UED", "React", "Zod", "Design"],
        },
      ],
    },
    {
      id: "mc-playground",
      title: "Minecraft Playground",
      content: [
        {
          title: "Procedural tools for Minecraft builders",
          desc:
            "A creative coding playground for generating Minecraft-style circle and dome layouts, plus utilities for mapping and summarizing blocks. Built with a TypeScript-first approach and interactive controls.",
          cards: [
            {
              title: "Procedural generation",
              text:
                "Algorithmic grid generation for circles/domes with predictable output and configurable parameters.",
              bullets: [
                "Deterministic layouts",
                "Builder-friendly controls",
                "Fast iteration",
              ],
            },
            {
              title: "Interactive UI",
              text:
                "A responsive interface that makes experimenting with parameters and previews feel immediate.",
              bullets: ["Live previews", "Sliders/inputs", "TypeScript components"],
            },
          ],
          tags: ["TypeScript", "React", "Algorithms", "UI"],
        },
      ],
    },
    {
      id: "monkey-wrench",
      title: "MonkeyWrench",
      content: [
        {
          title: "Mobile app for 5280 Auto Body Shop",
          desc:
            "A mobile-first platform for auto repair operations. The goal is to make shop workflows easier to manage with role-based views, clear status tracking, and a UI that stays fast even as data grows.",
          cards: [
            {
              title: "Full-stack foundation",
              text:
                "React Native on the front end with a Django/DRF backend and a relational database backbone.",
              bullets: ["React Native", "Django/DRF", "Relational DB"],
            },
            {
              title: "Operational UX",
              text:
                "Interfaces designed around real shop workflows: visibility, speed, and reducing friction for common actions.",
              bullets: ["Role-based flows", "Status visibility", "Mobile usability"],
            },
          ],
          tags: ["React Native", "Python", "Postgres", "UX"],
        },
      ],
    },
  ],
})