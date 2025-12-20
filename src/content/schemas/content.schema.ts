import * as z from "zod"
import { ImageSchema } from "./image.schema"
import { LinkSchema } from "./link.schema"

export const ContentSchema = z
  .object({
    title: z.string().min(1).max(50).optional(),
    shortText: z.string().min(1).max(100).optional(),
    longText: z.string().min(1).max(2000).optional(),
    images: z.array(ImageSchema).optional(),
    links: z.array(LinkSchema).optional(),
  })
  .refine(
    (obj) =>
      Object.values(obj).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== undefined
      ),
    { message: "At least one content field must be provided" }
  )

export type ContentType = z.infer<typeof ContentSchema>