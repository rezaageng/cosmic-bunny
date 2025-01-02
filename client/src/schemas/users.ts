import { z } from 'zod';

export const UsersResponseSchema = z.object({
  messages: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      image: z.string().nullable(),
      role: z.enum(['user', 'admin']),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  ),
});

export type UsersResponse = z.infer<typeof UsersResponseSchema>;
