import { z } from 'zod';

export const GameUserBodySchema = z.object({
  gameId: z.number(),
  userId: z.number(),
});

export type WishlistBody = z.infer<typeof GameUserBodySchema>;
