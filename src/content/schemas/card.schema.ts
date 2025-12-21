import * as z from "zod"
import { ImageSchema } from "./image.schema"
import { LinkSchema } from "./link.schema"

export const CardSchema = z
  .object({
    title: z.string().min(1).max(50).optional(),
    text: z.string().min(1).max(400).optional(),
    image: ImageSchema.optional(),
    link: LinkSchema.optional(),
    bullets: z.array(z.string().min(1).max(100)).max(3).optional()
  })
  .refine(
    (obj) =>
      Object.values(obj).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== undefined
      ),
    { message: "At least one card field must be provided" }
  )

export type CardType = z.infer<typeof CardSchema>