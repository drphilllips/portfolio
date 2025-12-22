import { PageSchema, type PageContent } from "../schemas/page.schema";

export const ExperiencePageContent: PageContent = PageSchema.parse({
  title: "Experience",
  heroSection: {
    id: "hero",
    content: [
      {
        title: "Building full-stack products from UI to API",
        desc:
          "This page highlights three recent roles where I shipped product features end-to-end.",
        image: {
          label: "Experience hero banner placeholder",
          src: "/images/experience/hero-banner-placeholder.jpg",
        },
      },
    ],
  },
  ctas: [
    {
      shortDesc:
        "Contract web & mobile development for an auto body shop. Enhances communication for customers and employees.",
      link: {
        label: "@ 5280",
        href: "#5280",
      },
    },
    {
      shortDesc:
        "Developed AI-powered assistants using Django, React, and LangGraph. Automated workflows for 10,000+ employees.",
      link: {
        label: "@ Socotec",
        href: "#socotec",
      },
    },
    {
      shortDesc:
        "Create 3 Python automation apps to streamline Excel-based workflows. Improved sales data pipelines.",
      link: {
        label: "@ Taarcom",
        href: "#taarcom",
      },
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
          title: "Mobile App Developer (Contract)",
          date: "Jun 2025 – Present",
          desc:
            "Building a full-stack internal + customer-facing application to streamline repair operations.\n\nI’ve focused on mobile UX, reliable backend APIs, and the data model needed to support quoting, scheduling, and repair task tracking across departments.",
          image: {
            label: "5280 experience cover placeholder",
            src: "/images/experience/5280-cover-placeholder.jpg",
          },
          tags: ["React Native", "Django", "REST APIs", "CI/CD"],
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
          date: "Oct 2024 – Jun 2025",
          desc:
            "Developed AI-powered assistant experiences and supporting web/backend tooling.\n\nThe work emphasized reliable integrations, maintainable workflows, and productizing agent behavior so it could scale to enterprise usage.",
          image: {
            label: "Socotec experience cover placeholder",
            src: "/images/experience/socotec-cover-placeholder.jpg",
          },
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
            {
              title: "Diagrams to collect",
              image: {
                label: "Socotec architecture diagram placeholder",
                src: "/images/experience/socotec-architecture-placeholder.jpg",
              },
              bullets: [
                "Agent graph (nodes, tools, memory, routing)",
                "Integration diagram (services + auth boundaries)",
                "Workflow automation flowchart (trigger → agent → actions → logging / observability)",
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
          date: "2022 – 2024",
          desc:
            "Built internal tools to streamline sales operations and reduce manual Excel-heavy workflows.\n\nThis included designing Python desktop apps and analytics-driven utilities that made reporting faster and more consistent for day-to-day pipeline work.",
          image: {
            label: "TAARCOM experience cover placeholder",
            src: "/images/experience/taarcom-cover-placeholder.jpg",
          },
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