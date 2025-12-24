import { PageSchema, type PageType } from "../schemas/page.schema";

export const AboutPageContent: PageType = PageSchema.parse({
  title: "About",
  sectIcon: "#",
  heroSection: {
    id: "hero",
    title: "Hi — I'm Dylan Phillips,",
    content: [
      {
        title: "Computer Science & Data Science Graduate (BS/MS)",
      },
      {
        title: "Full-Stack Engineer with a Passion for Data + UX Design",
        desc:
          "I love building products end-to-end — from data models and APIs to polished, accessible UI. I'm always looking for opportunities to learn, iterate, and ship impactful software.",
        tags: ["React", "Python", "UX", "Databases", "Deployment"],
      },
    ],
  },
  ctas: [
    {
      sectionHash: "#background",
      label: "Background",
    },
    {
      sectionHash: "#what-i-build",
      label: "What I build",
    },
    {
      sectionHash: "#skills",
      label: "Skills",
    },
    {
      sectionHash: "#how-i-work",
      label: "How I work",
    },
  ],
  sections: [
    {
      id: "background",
      title: "Background",
      content: [
        {
          title: "CS + Data Science at WPI",
          desc:
            "After five years studying Computer Science and Data Science at Worcester Polytechnic Institute, I'm confident in both my technical foundation and my ability to communicate clearly. I've built these skills through constant collaboration, group work, and shipping real projects.",
        },
        {
          title: "Always learning",
          desc:
            "I'm motivated by learning opportunities — that's how I end up loving whatever I'm working on. I enjoy exploring new tools, digging into edge cases, and polishing the last 10% of UX that makes a product feel great.",
        },
      ],
    },
    {
      id: "what-i-build",
      title: "What I build",
      content: [
        {
          title: "Product-focused full-stack work",
          desc:
            "I love building systems where data, UX, and deployment all matter: clean schemas, reliable APIs, intuitive interfaces, and smooth releases.",
          links: [
            {
              internalLink: "/projects#portfolio",
              label: "Portfolio Website",
            },
            {
              internalLink: "/projects#mc-playground",
              label: "Minecraft Playground",
            },
            {
              internalLink: "/projects#monkey-wrench",
              label: "MonkeyWrench",
            },
          ],
        },
      ],
    },
    {
      id: "skills",
      title: "Skills & tools",
      content: [
        {
          title: "Top skills",
          desc:
            "User Experience Design (UED), React.js, Python, relational databases, and software deployment.",
          tags: ["UED", "React", "Python", "Postgres", "CI/CD"],
        },
        {
          title: "What you can expect",
          desc:
            "Clear communication, strong ownership, and pragmatic engineering — I aim to write maintainable code, document decisions, and keep stakeholders aligned.",
        },
      ],
    },
    {
      id: "how-i-work",
      title: "How I work",
      content: [
        {
          title: "Collaboration + craft",
          desc:
            "I'm at my best on teams that value iterative improvement: ship a solid v1, measure what matters, and refine with empathy for the user.",
        },
        {
          title: "Curiosity-driven problem solving",
          desc:
            "When I hit ambiguity, I prototype quickly, validate assumptions, and then harden the solution with tests, types, and good defaults.",
        },
        {
          title: "What I'm looking for",
          desc:
            "A role where I can contribute as a software engineer (and beyond), keep growing, and help build products that people rely on.",
        },
      ],
    },
  ],
})