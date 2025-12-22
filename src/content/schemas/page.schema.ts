import * as z from "zod"
import { SectionSchema } from "./section.schema"
import { CtaSchema } from "./cta.schema"

export const PageSchema = z
  .object({
    title: z.string().min(1).max(50).optional(),
    heroSection: SectionSchema,
    ctas: z.array(CtaSchema).min(1),
    sections: z.array(SectionSchema).min(1),
  })
  .refine(
    (obj) => obj.ctas.length === obj.sections.length,
    { message: "There must be the same amount of CTAs as sections" }
  )

export type PageType = z.infer<typeof PageSchema>

/**
type PageType = {
    heroSection: {
        id: string;
        content: {
            title?: string | undefined;
            date?: string | undefined;
            desc?: string | undefined;
            link?: {
                href: string;
                label?: string | undefined;
            } | undefined;
            cards?: {
                title?: string | undefined;
                text?: string | undefined;
                link?: {
                    href: string;
                    label?: string | undefined;
                } | undefined;
                bullets?: string[] | undefined;
            }[] | undefined;
            tags?: string[] | undefined;
        }[];
        title?: string | undefined;
    };
    ctas: {
        link: {
            href: string;
            label?: string | undefined;
        };
        shortDesc?: string | undefined;
    }[];
    sections: {
        id: string;
        content: {
            title?: string | undefined;
            date?: string | undefined;
            desc?: string | undefined;
            link?: {
                href: string;
                label?: string | undefined;
            } | undefined;
            cards?: {
                title?: string | undefined;
                text?: string | undefined;
                link?: {
                    href: string;
                    label?: string | undefined;
                } | undefined;
                bullets?: string[] | undefined;
            }[] | undefined;
            tags?: string[] | undefined;
        }[];
        title?: string | undefined;
    }[];
    title?: string | undefined;
}
 */