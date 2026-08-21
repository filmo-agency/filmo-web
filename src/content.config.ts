import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schools = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/schools' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    priority: z.number().int(),
    logo: z.string(),
    cover: z.string(),
    published: z.boolean().default(true),
    featuredPromId: z.number().int().nullable(),
    promIds: z.array(z.number().int()),
  }),
});

const proms = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/proms' }),
  schema: z.object({
    schoolSlug: z.string(),
    promId: z.number().int(),
    cover: z.string(),
    mediaPath: z.string(),
    published: z.boolean().default(true),
    text: z.string().nullable().optional(),
    subText: z.string().nullable().optional(),
    videoId: z.string().nullable().optional(),
  }),
});

export const collections = { schools, proms };
