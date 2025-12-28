import * as z from "zod"

export const SitePageSchema = z.enum([
  "",
  "about",
  "projects",
  "projects/portfolio/how-its-made",
  "experience",
  "services",
  "contact",
])

export type SitePage = z.infer<typeof SitePageSchema>