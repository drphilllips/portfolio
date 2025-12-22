import { PageSchema, type PageType } from "../schemas/page.schema";

export const AboutPageContent: PageType = PageSchema.parse({
  title: "About",
  sectIcon: "#",
  heroSection: {
    id: "hero",
    title: "Hi — I'm Dylan Phillips",
    content: [
      {
        title: "Computer Science & Data Science Graduate (BS/MS)",
        desc: "...And...",
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
      label: "Background",
      href: "#background",
      link: { label: "Background", href: "#background" },
    },
    {
      label: "What I build",
      href: "#what-i-build",
      link: { label: "What I build", href: "#what-i-build" },
    },
    {
      label: "Skills",
      href: "#skills",
      link: { label: "Skills", href: "#skills" },
    },
    {
      label: "How I work",
      href: "#how-i-work",
      link: { label: "How I work", href: "#how-i-work" },
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
            "I like building systems where data, UX, and deployment all matter: clean schemas, reliable APIs, intuitive interfaces, and smooth releases.",
          cards: [
            {
              title: "The-5280-App",
              text:
                "A mobile/web platform for an auto repair operation — built with React Native + Django + Supabase. Focused on role-based flows, operations visibility, and a fast, usable UI.",
              bullets: [
                "React Native (Expo Router) + modern UI patterns",
                "Django/DRF models & APIs",
                "Postgres/Supabase storage + auth",
              ],
            },
            {
              title: "Minecraft Playground",
              text:
                "A creative coding playground that generates Minecraft-style circle/dome pixel art and block-mapping utilities — built with Vite + React + TypeScript.",
              bullets: [
                "Algorithmic grid generation",
                "Interactive UI controls",
                "TypeScript-first architecture",
              ],
            },
            {
              title: "Dylan's Dog-Walking & Pet-Sitting",
              text:
                "A lightweight marketing site with clean UX and scheduling integration.",
              bullets: [
                "Single-page, responsive design",
                "Calendly integration",
                "Brand/visual asset iteration",
              ],
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