import * as z from "zod"
import { SectionSchema } from "./section.schema"
import { LinkSchema } from "./link.schema"

export const PageSchema = z
  .object({
    title: z.string().min(1).max(50).optional(),
    sectIcon: z.string().max(2),
    heroSection: SectionSchema,
    ctas: z.array(LinkSchema).min(1).optional(),
    sections: z.array(SectionSchema).min(1).optional(),
  })

export type PageType = z.infer<typeof PageSchema>