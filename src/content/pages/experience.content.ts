import { PageSchema, type PageContent } from "../schemas/page.schema";

export const ExperiencePageContent: PageContent = PageSchema.parse({
  title: "Experience",
  sections: [
    // ---------------------------------------------
    // Hero
    // ---------------------------------------------
    {
      id: "hero",
      content: [
        {
          title: "Building full-stack products from UI to API",
          longText:
            "This page highlights three recent roles where I shipped product features end-to-end.\n\nUse the quick links below to jump into each experience section.\nEach section includes an overview, highlights, tech stack, and media placeholders for screenshots/diagrams to collect.",
          image: {
            label: "Experience hero banner placeholder",
            src: "/images/experience/hero-banner-placeholder.jpg",
          },
          cards: [
            {
              link: {
                label: "5280 Auto Hail Repair",
                href: "#5280",
              },
            },
            {
              link: {
                label: "Socotec",
                href: "#socotec",
              },
            },
            {
              link: {
                label: "TAARCOM, Inc.",
                href: "#taarcom",
              },
            },
          ],
        },
      ],
    },

    // ---------------------------------------------
    // 5280
    // ---------------------------------------------
    {
      id: "5280",
      title: "5280 Auto Hail Repair",
      content: [
        {
          title: "Mobile App Developer (Contract)",
          shortText: "Jun 2025 – Present",
          longText:
            "Building a full-stack internal + customer-facing application to streamline repair operations.\n\nI’ve focused on mobile UX, reliable backend APIs, and the data model needed to support quoting, scheduling, and repair task tracking across departments.",
          image: {
            label: "5280 experience cover placeholder",
            src: "/images/experience/5280-cover-placeholder.jpg",
          },
          cards: [
            {
              title: "Highlights",
              bullets: [
                "Designed a full-stack app connecting employees and customers",
                "Built REST APIs and database models",
                "Built CI/CD pipelines for repair scheduling and quoting",
              ],
            },
            {
              title: "Tech",
              text: "React Native, Django, REST APIs, CI/CD",
            },
            {
              title: "Screenshots to collect",
              image: {
                label: "5280 app screenshot placeholder",
                src: "/images/experience/5280-app-screenshot-placeholder.jpg",
              },
              bullets: [
                "Quote flow (create/edit, line items, approvals)",
                "Scheduling view (calendar / timeline / assignments)",
                "Admin/employee dashboards (task groups, departments, workload)",
              ],
            },
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
          title: "Full-Stack Chatbot Engineer",
          shortText: "Oct 2024 – Jun 2025",
          longText:
            "Developed AI-powered assistant experiences and supporting web/backend tooling.\n\nThe work emphasized reliable integrations, maintainable workflows, and productizing agent behavior so it could scale to enterprise usage.",
          image: {
            label: "Socotec experience cover placeholder",
            src: "/images/experience/socotec-cover-placeholder.jpg",
          },
          cards: [
            {
              title: "Highlights",
              bullets: [
                "Developed AI-powered assistants using Django, React, LangGraph, and NodeJS",
                "Automated workflows for 10,000+ employees",
                "Improved efficiency across business operations",
              ],
            },
            {
              title: "Tech",
              text: "Django, React, LangGraph, NodeJS",
            },
            {
              title: "Diagrams to collect",
              image: {
                label: "Socotec architecture diagram placeholder",
                src: "/images/experience/socotec-architecture-placeholder.jpg",
              },
              bullets: [
                "Agent graph (nodes, tools, memory, routing)",
                "Integration diagram (services + auth boundaries)",
                "Workflow automation flowchart (trigger → agent → actions → logging/observability)",
              ],
            },
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
          title: "Sales Ops Intern & Python App Developer",
          shortText: "2022 – 2024",
          longText:
            "Built internal tools to streamline sales operations and reduce manual Excel-heavy workflows.\n\nThis included designing Python desktop apps and analytics-driven utilities that made reporting faster and more consistent for day-to-day pipeline work.",
          image: {
            label: "TAARCOM experience cover placeholder",
            src: "/images/experience/taarcom-cover-placeholder.jpg",
          },
          cards: [
            {
              title: "Highlights",
              bullets: [
                "Created 3 integrated Python automation apps streamlining Excel workflows",
                "Redesigned company website",
                "Improved sales pipeline with analytics-driven tools",
              ],
            },
            {
              title: "Tech",
              text: "Python, PyQt, Pandas, Excel automation",
            },
            {
              title: "Screenshots to collect",
              image: {
                label: "TAARCOM tool screenshot placeholder",
                src: "/images/experience/taarcom-tool-screenshot-placeholder.jpg",
              },
              bullets: [
                "GUI screenshots (main flows + edge cases)",
                "Report export view (inputs → generated outputs)",
                "Before/after workflow comparison (manual steps eliminated)",
              ],
            },
          ],
        },
      ],
    },
  ],
});