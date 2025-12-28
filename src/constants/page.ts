import type { SitePage } from "../content/schemas/site-page.schema"

export const START_OF_PAGE_PX = 10
export const END_OF_PAGE_PX = 60
export const PAGE_LAST_SECTION_MIN_HEIGHT =
  "lg:min-h-[calc(100dvh-148px)] min-h-[calc(100dvh-112px)]"

export const PAGE_NAMES: Record<SitePage, string> = {
  "": "Home",
  about: "About",
  projects: "Projects",
  experience: "Experience",
  services: "Services",
  contact: "Contact",
  "projects/portfolio/how-its-made": "How It's Made",
}

export const PAGE_EMOJIS: Record<SitePage, string> = {
  "": "🏠",
  about: "👋",
  projects: "🚀",
  experience: "🛠️",
  services: "🧰",
  contact: "✉️",
  "projects/portfolio/how-its-made": "🎨",
}