import { z } from 'zod';

export const SnapResponseSchema = z.object({
  token: z.string(),
  redirect_url: z.string(),
});

export type SnapResponse = z.infer<typeof SnapResponseSchema>;

export const SnapBodySchema = z.object({
  transaction_details: z.object({
    order_id: z.string(),
    gross_amount: z.number(),
  }),
  customer_details: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
  }),
  item_details: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      quantity: z.number(),
      name: z.string(),
    }),
  ),
});

export type SnapBody = z.infer<typeof SnapBodySchema>;
