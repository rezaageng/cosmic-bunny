import { z } from 'zod';

export const WishlistResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      game: z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
        price: z.number(),
      }),
    }),
  ),
});

export type WishlistResponse = z.infer<typeof WishlistResponseSchema>;
