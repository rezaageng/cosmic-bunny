import { z } from 'zod';

export const WishlistBodySchema = z.object({
  gameId: z.number(),
  userId: z.number(),
});

export type WishlistBody = z.infer<typeof WishlistBodySchema>;
