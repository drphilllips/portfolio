import * as z from "zod"
import { SectionSchema } from "./section.schema"

export const PageSchema = z.object({
  title: z.string().min(1).max(50).optional(),
  sections: z.array(SectionSchema).min(1),
})

export type PageContent = z.infer<typeof PageSchema>