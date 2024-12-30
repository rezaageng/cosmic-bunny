import { z } from 'zod';

export const OrderResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    status: z.enum(['pending', 'succeed', 'failed']),
    amount: z.number(),
    user: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
    games: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        image: z.string(),
      }),
    ),
  }),
});

export type OrderResponse = z.infer<typeof OrderResponseSchema>;

export const OrderBodySchema = z.object({
  userId: z.number(),
  gameIds: z.array(z.number()),
  status: z.enum(['pending', 'succeed', 'failed']),
});

export type OrderBody = z.infer<typeof OrderBodySchema>;

export const OrdersResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      status: z.enum(['pending', 'succeed', 'failed']),
      amount: z.number(),
      user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
      }),
      games: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          price: z.number(),
          image: z.string(),
        }),
      ),
    }),
  ),
});

export type OrdersResponse = z.infer<typeof OrdersResponseSchema>;
