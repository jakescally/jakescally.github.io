import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    topics: z.array(z.string()).default([]),
    heroImage: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    legacyPaths: z.array(z.string()).default([]),
    photoSetIds: z.array(z.string()).optional()
  })
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    year: z.number().int(),
    status: z.enum(["building", "shipping", "documenting", "archived"]),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        writeup: z.string().optional()
      })
      .default({}),
    heroImage: z.string(),
    featured: z.boolean().default(false),
    detailMode: z.enum(["card", "case-study"]).default("card")
  })
});

const photoSets = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    location: z.string().optional(),
    camera: z.string().optional(),
    coverImage: z.string(),
    featured: z.boolean().default(false),
    legacyPaths: z.array(z.string()).default([]),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
        exif: z.string().optional()
      })
    )
  })
});

const drinks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    menuSection: z.string(),
    baseSpirit: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    glassware: z.string().optional(),
    garnish: z.string().optional(),
    method: z.string().optional(),
    ingredients: z
      .array(
        z.object({
          amount: z.string(),
          ingredient: z.string(),
          notes: z.string().optional()
        })
      )
      .default([]),
    instructions: z.array(z.string()).default([]),
    searchTerms: z.array(z.string()).default([]),
    sortOrder: z.number().default(100),
    inStock: z.boolean().default(true),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false)
  })
});

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    category: z.string(),
    cuisine: z.string().optional(),
    tags: z.array(z.string()).default([]),
    servings: z.number().positive(),
    prepTime: z.number().nonnegative().optional(),
    cookTime: z.number().nonnegative().optional(),
    totalTime: z.number().nonnegative().optional(),
    heroImage: z.string().optional(),
    ingredients: z
      .array(
        z.object({
          group: z.string().optional(),
          qty: z.union([z.number(), z.string()]).optional(),
          unit: z.string().optional(),
          item: z.string(),
          note: z.string().optional(),
          grams: z.number().positive().optional()
        })
      )
      .default([]),
    steps: z
      .array(
        z.union([
          z.string(),
          z.object({ text: z.string(), timer: z.number().positive().optional() })
        ])
      )
      .default([]),
    source: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog,
  projects,
  photoSets,
  drinks,
  recipes
};
