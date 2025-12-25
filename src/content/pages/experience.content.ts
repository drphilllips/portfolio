import { PageSchema, type PageType } from "../schemas/page.schema";

export const ExperiencePageContent: PageType = PageSchema.parse({
  title: "Experience",
  sectIcon: "@",
  heroSection: {
    id: "hero",
    title: "My recent ventures...",
    content: [
      {
        title: "Building full-stack products from UI to API",
        desc:
          "This page highlights three recent roles where I shipped product features end-to-end.",
      },
    ],
  },
  ctas: [
    {
      sectionHash: "#5280",
      subtitle: "2025",
      title: "5280 Auto Body Shop",
      label: "Contract App Developer",
    },
    {
      sectionHash: "#socotec",
      subtitle: "2024 – 2025",
      title: "Socotec",
      label: "UX Lead & AI Engineer",
    },
    {
      sectionHash: "#taarcom",
      subtitle: "2022 – 2024",
      title: "Taarcom",
      label: "Python Automation Engineer",
    },
  ],
  sections: [
    // ---------------------------------------------
    // 5280
    // ---------------------------------------------
    {
      id: "5280",
      title: "5280 Auto Hail Repair",
      content: [
        {
          title: "Contract App Developer",
          date: "Jun 2025 – Present",
          desc:
            "Building a full-stack internal + customer-facing application to streamline repair operations.\n\nI’ve focused on mobile UX, reliable backend APIs, and the data model needed to support quoting, scheduling, and repair task tracking across departments.",
          tags: ["React Native", "Django", "REST APIs", "CI/CD"],
          links: [
            {
              internalLink: "/projects#monkey-wrench",
              subtitle: "#monkey-wrench",
              title: "MonkeyWrench Auto Shop App",
            },
          ],
          cards: [
            {
              title: "Highlights",
              bullets: [
                "Designed a full-stack app connecting employees and customers",
                "Built REST APIs and database models",
                "Built CI/CD pipelines for repair scheduling and quoting",
              ],
            },
            // {
            //   title: "Screenshots to collect",
            //   bullets: [
            //     "Quote flow (create/edit, line items, approvals)",
            //     "Scheduling view (calendar / timeline / assignments)",
            //     "Admin/employee dashboards (task groups, departments, workload)",
            //   ],
            // },
          ],
        },
      ],
    },

    // ---------------------------------------------
    // Socotec
    // ---------------------------------------------
    {
      id: "socotec",
      title: "Socotec",
      content: [
        {
          title: "UX Lead & AI Engineer",
          date: "Oct 2024 – Jun 2025",
          desc:
            "Developed AI-powered assistant experiences and supporting web/backend tooling.\n\nThe work emphasized reliable integrations, maintainable workflows, and productizing agent behavior so it could scale to enterprise usage.",
          tags: ["Django", "React", "LangGraph", "NodeJS"],
          cards: [
            {
              title: "Highlights",
              bullets: [
                "Developed AI-powered assistants using Django, React, LangGraph, and NodeJS",
                "Automated workflows for 10,000+ employees",
                "Improved efficiency across business operations",
              ],
            },
            // {
            //   title: "Diagrams to collect",
            //   bullets: [
            //     "Agent graph (nodes, tools, memory, routing)",
            //     "Integration diagram (services + auth boundaries)",
            //     "Workflow automation flowchart (trigger → agent → actions → logging / observability)",
            //   ],
            // },
          ],
        },
      ],
    },

    // ---------------------------------------------
    // TAARCOM
    // ---------------------------------------------
    {
      id: "taarcom",
      title: "TAARCOM, Inc.",
      content: [
        {
          title: "Python Automation Engineer",
          date: "2022 – 2024",
          desc:
            "Built internal tools to streamline sales operations and reduce manual Excel-heavy workflows.\n\nThis included designing Python desktop apps and analytics-driven utilities that made reporting faster and more consistent for day-to-day pipeline work.",
          tags: ["Python", "PyQT", "Pandas", "Excel Automation"],
          cards: [
            {
              title: "Highlights",
              bullets: [
                "Created 3 integrated Python automation apps streamlining Excel workflows",
                "Redesigned company website",
                "Improved sales pipeline with analytics-driven tools",
              ],
            },
            // {
            //   title: "Screenshots to collect",
            //   bullets: [
            //     "GUI screenshots (main flows + edge cases)",
            //     "Report export view (inputs → generated outputs)",
            //     "Before/after workflow comparison (manual steps eliminated)",
            //   ],
            // },
          ],
        },
      ],
    },
  ],
});