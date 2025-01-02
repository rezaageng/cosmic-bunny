import { z } from 'zod';

export const CategoriesResponseSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      games: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          short_description: z.string(),
          description: z.string(),
          publisher: z.string(),
          price: z.number(),
          header_img: z.string(),
          image: z.string(),
          created_at: z.string(),
          updated_at: z.string(),
          categories_list: z.array(z.string()),
        }),
      ),
    }),
  ),
});

export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;

export const CategoryBodySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type CategoryBody = z.infer<typeof CategoryBodySchema>;

export const CategoryResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    name: z.string(),
    updated_at: z.string(),
    created_at: z.string(),
    id: z.number(),
  }),
});
