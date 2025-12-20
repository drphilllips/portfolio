import * as z from "zod"

export const LinkSchema = z.object({
  label: z.string().min(1).max(50).optional(),
  href: z.union([
    z.url(),
    z.string().regex(/^\/[^\s]*$/),
    z.string().regex(/^#[^\s]+$/),
  ]),
})

export type LinkType = z.infer<typeof LinkSchema>