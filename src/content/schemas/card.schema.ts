import * as z from "zod"
import { ImageSchema } from "./image.schema"
import { LinkSchema } from "./link.schema"

export const CardSchema = z
  .object({
    title: z.string().min(1).max(50).optional(),
    text: z.string().min(1).max(400).optional(),
    image: ImageSchema.optional(),
    bullets: z.array(z.string().min(1).max(100)).max(3).optional(),
    link: LinkSchema.optional(),
  })
  .refine(
    (obj) =>
      [obj.title, obj.text, obj.image, obj.bullets].some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== undefined
      ),
    { message: "At least one of title, text, image, or bullets must be provided" }
  )

export type CardType = z.infer<typeof CardSchema>