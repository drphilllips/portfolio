import * as z from "zod"
import { CardSchema } from "./card.schema"
import { ImageSchema } from "./image.schema"
import { LinkSchema } from "./link.schema"

export const ContentSchema = z
  .object({
    title: z.string().min(1).max(70).optional(),
    date: z.string().min(1).max(100).optional(),
    desc: z.string().min(1).max(2000).optional(),
    image: ImageSchema.optional(),
    links: z.array(LinkSchema).min(1).optional(),
    cards: z.array(CardSchema).optional(),
    tags: z.array(z.string().min(1).max(20)).max(5).optional()
  })
  .refine(
    (obj) =>
      Object.values(obj).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== undefined
      ),
    { message: "At least one content field must be provided" }
  )

export type ContentType = z.infer<typeof ContentSchema>