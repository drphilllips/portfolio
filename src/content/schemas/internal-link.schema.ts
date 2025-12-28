import * as z from "zod"
import { SitePageSchema } from "./site-page.schema"

export const InternalLinkSchema = z
  .object({
    page: SitePageSchema,
    sectionHash: z.string().regex(/^#[^\s]+$/).optional(),
  })

export type InternalLinkType = z.infer<typeof InternalLinkSchema>