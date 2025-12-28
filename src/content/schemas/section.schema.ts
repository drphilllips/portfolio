import * as z from "zod"
import { ContentSchema } from "./content.schema"
import { ImageSchema } from "./image.schema"

export const SectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(50).optional(),
  image: ImageSchema.optional(),
  content: z.array(ContentSchema).min(1),
})

export type SectionType = z.infer<typeof SectionSchema>