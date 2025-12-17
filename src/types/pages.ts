
export const SITE_PAGES = [
  "",
  "about",
  "projects",
  "experience",
  "services",
  "contact",
] as const

export type SitePage = (typeof SITE_PAGES)[number]