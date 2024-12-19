import { z } from 'zod';

export const GamesResponseSchema = z.object({
  messages: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
      description: z.string(),
      publisher: z.string(),
      price: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  ),
});

export type GamesResponse = z.infer<typeof GamesResponseSchema>;
