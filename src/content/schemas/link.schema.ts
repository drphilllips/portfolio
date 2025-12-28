import * as z from "zod"
import { InternalLinkSchema } from "./internal-link.schema"

export const LinkSchema = z
  .object({
    label: z.string().min(1).max(50).optional(),
    title: z.string().min(1).max(50).optional(),
    subtitle: z.string().min(1).max(100).optional(),
    sectionHash: z.string().regex(/^#[^\s]+$/).optional(),
    internalLink: InternalLinkSchema.optional(),
    externalLink: z.union([
      // Any WHATWG-compatible URL (includes e.g. mailto: per Zod docs)
      z.url(),
      // Explicitly allow tel: links (some runtimes can be picky)
      z.string().regex(/^tel:\+?[0-9().\-\s]+$/i),
    ]).optional(),
  })
  .refine(
    (obj) =>
      [obj.sectionHash, obj.externalLink, obj.internalLink].filter((value) =>
        value !== undefined
      ).length === 1,
    { message: "Exactly one of sectionHash, internalLink, or externalLink must be provided" }
  )
  .refine(
    (obj) =>
      [obj.label, obj.title, obj.subtitle].some((value) =>
        value !== undefined
      ),
    { message: "At least one of label, title, or subtitle must be provided" }
  )

export type LinkType = z.infer<typeof LinkSchema>