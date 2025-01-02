import { z } from 'zod';

export const LibraryResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      game: z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
      }),
    }),
  ),
});

export type LibraryResponse = z.infer<typeof LibraryResponseSchema>;
