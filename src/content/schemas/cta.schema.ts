import * as z from "zod"
import { LinkSchema } from "./link.schema"

export const CtaSchema = z.object({
  shortDesc: z.string().min(1).max(150).optional(),
  link: LinkSchema,
})

export type CtaType = z.infer<typeof CtaSchema>