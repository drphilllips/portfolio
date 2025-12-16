
export const SITE_PAGES = [
  "",
  "about",
  "projects",
  "experience",
  "services",
  "contact",
] as const

export type SitePage = (typeof SITE_PAGES)[number]

export type PageAbbreviation =
  | "HOME"
  | "ABOU"
  | "PROJ"
  | "EXPE"
  | "SERV"
  | "CONT"