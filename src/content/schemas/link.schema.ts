import * as z from "zod"

export const LinkSchema = z
  .object({
    label: z.string().min(1).max(50).optional(),
    title: z.string().min(1).max(50).optional(),
    subtitle: z.string().min(1).max(50).optional(),
    hash: z.string().regex(/^#[^\s]+$/).optional(),
    href: z.union([
      // Any WHATWG-compatible URL (includes e.g. mailto: per Zod docs)
      z.url(),

      // Internal absolute path on your site
      z.string().regex(/^\/[\s\S]*$/),

      // Explicitly allow tel: links (some runtimes can be picky)
      z.string().regex(/^tel:\+?[0-9().\-\s]+$/i),
    ]).optional(),
  })
  .refine(
    (obj) =>
      [obj.hash, obj.href].some((value) =>
        value !== undefined
      ),
    { message: "At least one of hash or href must be provided" }
  )
  .refine(
    (obj) =>
      [obj.label, obj.title, obj.subtitle].some((value) =>
        value !== undefined
      ),
    { message: "At least one of label, title, or subtitle must be provided" }
  )

export type LinkType = z.infer<typeof LinkSchema>