import * as z from "zod"
import { SectionSchema } from "./section.schema"
import { CtaSchema } from "./cta.schema"

export const PageSchema = z
  .object({
    title: z.string().min(1).max(50).optional(),
    heroSection: SectionSchema,
    ctas: z.array(CtaSchema).min(1),
    sections: z.array(SectionSchema).min(1),
  })
  .refine(
    (obj) => obj.ctas.length === obj.sections.length,
    { message: "There must be the same amount of CTAs as sections" }
  )

export type PageContent = z.infer<typeof PageSchema>