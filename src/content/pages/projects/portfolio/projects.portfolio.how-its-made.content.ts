import { PAGE_EMOJIS, PAGE_NAMES } from "../../../../constants/page";
import { PageSchema, type PageType } from "../../../schemas/page.schema";

export const ProjectsPortfolioHowItsMadePageContent: PageType = PageSchema.parse({
  title: PAGE_NAMES["projects/portfolio/how-its-made"],
  sectIcon: PAGE_EMOJIS["projects/portfolio/how-its-made"],
  heroSection: {
    id: "hero",
    title: "How this portfolio site is made",
    content: [
      {
        title: "A playful UI built on a structured content system",
        desc:
          "This site is intentionally simple to update but fun to explore — a schema-first content layer for consistency, plus custom motion and visual systems that make navigation feel like painting across pages.",
        tags: ["UX", "Motion", "Type-safe", "Tailwind", "React"],
        links: [
          {
            label: "Back to Projects",
            internalLink: {
              page: "projects",
            },
          },
        ],
      },
    ],
  },
  ctas: [
    {
      label: "Site Colors",
      subtitle: "Tailwind + procedural text",
      sectionHash: "#colors",
    },
    {
      label: "Color Palette",
      subtitle: "FLIP navigation tool",
      sectionHash: "#palette",
    },
    {
      label: "Paint Transition",
      subtitle: "Canvas brush strokes",
      sectionHash: "#brush",
    },
  ],
  sections: [
    {
      id: "colors",
      title: "Site Colors",
      content: [
        {
          title: "Six distinct page palettes",
          desc:
            "Each page maps to a bold, distinct color — designed to feel like a bright paint set. All colors are defined as custom Tailwind colors and then referenced through a small styling system that computes semantic classes (background, text, borders, etc.).",
          cards: [
            {
              title: "Tailwind custom colors",
              text:
                "Each palette color is defined in Tailwind so it can be used consistently across layout, components, and transitions.",
              bullets: ["Single source of truth", "Consistent classes", "Easy to extend"],
            },
            {
              title: "Procedural primary pairing",
              text:
                "For each palette, the system chooses a ‘primary’ foreground (ghost or ashbl) so text stays readable — then derives related semantic classes for headings, borders, separators, and tags.",
              bullets: ["Readable contrast", "Computed semantics", "Less manual styling"],
            },
          ],
          tags: ["Tailwind", "Design tokens", "Contrast", "Semantics"],
          links: [
            {
              title: "Tailwind Custom Colors",
              subtitle: "tailwindcss.com/docs/theme#extending-the-default-theme",
              externalLink: "https://tailwindcss.com/docs/theme#extending-the-default-theme",
            },
          ],
        },
      ],
    },
    {
      id: "palette",
      title: "Color Palette Navigation",
      content: [
        {
          title: `Navigation as "palette paint dots"`,
          desc:
            "The color palette is both a playful nav tool and a fast way to jump between pages. It opens and closes with FLIP-style motion (layout-driven transforms), and each dot doubles as a page selector.",
          cards: [
            {
              title: "FLIP open/close",
              text:
                "Dots animate via transforms (scale/position) so the DOM stays stable and motion stays smooth.",
              bullets: ["Transforms only", "Spring motion", "Stable layout"],
              link: {
                externalLink: "https://motion.dev/docs/react-layout-animations",
                title: "Framer FLIP Animations",
                subtitle: "motion.dev/docs/react-layout-animations",
              },
            },
            {
              title: "Scroll-to-top morph",
              text:
                "The same control can transition between a navigation palette and a scroll-to-top affordance with coordinated scale, rotation, and color transitions.",
              bullets: ["Shared geometry", "Coordinated easing", "Clear affordance"],
            },
            {
              title: "Animation drivers",
              text:
                "Complex motion logic is extracted into dedicated hooks (‘drivers’) so the main component reads clearly and stays maintainable.",
              bullets: ["Separation of concerns", "Reusable motion logic", "Cleaner component"],
            },
          ],
          tags: ["Motion", "Framer Motion", "FLIP", "Hooks"],
        },
      ],
    },
    {
      id: "brush",
      title: "Paint-Foreground Transition",
      content: [
        {
          title: "Page navigation as brush strokes",
          desc:
            "When you navigate between pages, the next page color is ‘painted in’ using a canvas overlay. The stroke effect is built from multiple diagonal bands that sweep across the viewport with a Tailwind-like easing curve for a more natural feel.",
          cards: [
            {
              title: "Band-based strokes",
              text:
                "Instead of a single wipe, several overlapping bands animate in alternating directions — reducing visible seams and feeling more like real brush passes.",
              bullets: ["Multiple bands", "Intentional overlap", "Diagonal sweep"],
            },
            {
              title: "Easing that feels organic",
              text:
                "A cubic-bezier solver (matching Tailwind’s default easing) drives stroke progress so the motion accelerates and settles naturally.",
              bullets: ["Tailwind easing", "Smooth progression", "Natural timing"],
            },
            {
              title: "Status bar blending on mobile",
              text:
                "The overlay fades in while the theme color updates in sync, so the mobile status bar transitions smoothly with the page — a small detail that makes the whole effect feel seamless.",
              bullets: ["Synced fade", "Theme color update", "Mobile polish"],
            },
          ],
          tags: ["Canvas", "Transitions", "Mobile", "Polish"],
        },
      ],
    },
    {
      id: "",
      content: [
        {
          links: [
            {
              label: "Back to Projects",
              internalLink: {
                page: "projects",
              },
            },
          ],
        },
      ],
    },
  ],
})