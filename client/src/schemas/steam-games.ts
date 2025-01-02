import { z } from 'zod';

export const SteamGamesResponseSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
    }),
  ),
});

export type SteamGamesResponse = z.infer<typeof SteamGamesResponseSchema>;

export const SteamGameResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.number(),
    name: z.string(),
    header_img: z.string(),
    short_description: z.string(),
    description: z.string(),
    publisher: z.array(z.string()),
    price: z.number(),
    screenshot: z.string(),
  }),
});

export type SteamGameResponse = z.infer<typeof SteamGameResponseSchema>;
