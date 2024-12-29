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
});

export type SnapBody = z.infer<typeof SnapBodySchema>;
