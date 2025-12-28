import * as z from "zod"

export const ImageSchema = z.object({
  label: z.string().min(1).max(50).optional(),
  src: z.union([
    z.url(),
    z.string().regex(
      /^(\/images\/.+|\/assets\/.+|src\/assets\/.+|\/src\/assets\/.+)$/,
      "src must be a valid public or src/assets path"
    ),
  ]),
})

export type ImageType = z.infer<typeof ImageSchema>