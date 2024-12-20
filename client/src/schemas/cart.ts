import { z } from 'zod';

export const CartResponseSchema = z.object({
  data: z.object({
    items: z.array(
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
    amount: z.number(),
  }),
});

export type CartResponse = z.infer<typeof CartResponseSchema>;
