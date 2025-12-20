import * as z from "zod"
import { ContentSchema } from "./content.schema"

export const SectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(50).optional(),
  content: z.array(ContentSchema).min(1),
})

export type SectionContent = z.infer<typeof SectionSchema>