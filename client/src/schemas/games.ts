import { z } from 'zod';

export const GamesResponseSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
      header_img: z.string(),
      description: z.string(),
      short_description: z.string(),
      publisher: z.string(),
      price: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
    }),
  ),
});

export type GamesResponse = z.infer<typeof GamesResponseSchema>;

export const GameResponseSchema = z.object({
  message: z.string(),
  data: z
    .object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
      header_img: z.string(),
      description: z.string(),
      short_description: z.string(),
      publisher: z.string(),
      price: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
    })
    .nullable(),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      description: z.array(z.string()).optional(),
      short_description: z.array(z.string()).optional(),
      publisher: z.array(z.string()).optional(),
      price: z.array(z.string()).optional(),
      image: z.array(z.string()).optional(),
      header_img: z.array(z.string()).optional(),
    })
    .optional(),
});

export type GameResponse = z.infer<typeof GameResponseSchema>;

export const GameBodySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  short_description: z
    .string()
    .min(1, { message: 'Short description is required' }),
  publisher: z.string().min(1, { message: 'Publisher is required' }),
  price: z.number().max(9999999, { message: 'Max price is 9999999' }).min(0),
  image: z.string().min(1, { message: 'Image is required' }),
  image_local: z.instanceof(File).optional(),
  header_img: z.string().min(1, { message: 'Header image is required' }),
  header_img_local: z.instanceof(File).optional(),
});

export type GameBody = z.infer<typeof GameBodySchema>;
