'use server';

import { v2 as cloudinary } from 'cloudinary';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';
import {
  LoginSchema,
  type RegisterResponse,
  RegisterResponseSchema,
  RegisterSchema,
  type RegisterSchemaType,
} from '@/schemas/auth';
import { getCurrentUser } from '@/services';
import { GameUserBodySchema } from '@/schemas/global';
import {
  GameBodySchema,
  type GameResponse,
  GameResponseSchema,
} from '@/schemas/games';

export const register = async (
  _prevState: unknown,
  formData: FormData,
): Promise<RegisterResponse> => {
  const data: RegisterSchemaType = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    role: 'user',
    password: formData.get('password') as string,
    password_confirmation: formData.get('password_confirmation') as string,
    terms: formData.get('terms') === 'on',
  };

  if (!data.terms) {
    return {
      message: 'Validation failed',
      errors: {
        terms: ['You must agree to the terms and conditions'],
      },
    };
  }

  const parsed = RegisterSchema.safeParse(data);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      message: 'Validation failed',
      errors: {
        name: errors.name,
        email: errors.email,
        password: errors.password,
        password_confirmation: errors.password_confirmation,
        terms: errors.terms,
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    },
  );

  const responseParsed = RegisterResponseSchema.safeParse(
    await response.json(),
  );

  if (
    response.status === 200 &&
    responseParsed.success &&
    responseParsed.data.data
  ) {
    cookies().set('token', responseParsed.data.data.token);

    redirect('/');
  }

  return responseParsed.data ?? { message: 'An error occurred' };
};

export const login = async (
  _prevState: unknown,
  formData: FormData,
): Promise<RegisterResponse> => {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      message: 'Validation failed',
      errors: {
        email: errors.email,
        password: errors.password,
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    },
  );

  const responseParsed = RegisterResponseSchema.safeParse(
    await response.json(),
  );

  if (
    response.status === 200 &&
    responseParsed.success &&
    responseParsed.data.data
  ) {
    cookies().set('token', responseParsed.data.data.token);

    if (responseParsed.data.data.user.role === 'admin') {
      redirect('/dashboard');
    }
    redirect('/');
  }

  return responseParsed.data ?? { message: 'An error occurred' };
};

export const logout = async (): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  cookies().delete('token');
  redirect('/login');
};

export const addToWishlist = async (id: number): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });

  if (!user.data) {
    redirect('/login');
  }

  const body = GameUserBodySchema.safeParse({
    gameId: id,
    userId: user.data.id,
  });

  if (!body.success) {
    throw new Error('Failed to parse wishlist body');
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlists`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      game_id: body.data.gameId,
      user_id: body.data.userId,
    }),
  });

  revalidatePath('/wishlist');
};

export const deleteFromWishlist = async (id: number): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });

  if (!user.data) {
    redirect('/login');
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/wishlists/${id.toString()}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  revalidatePath('/wishlist');
};

export const addToLibrary = async (id: number): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });

  if (!user.data) {
    redirect('/login');
  }

  const body = GameUserBodySchema.safeParse({
    gameId: id,
    userId: user.data.id,
  });

  if (!body.success) {
    throw new Error('Failed to parse wishlist body');
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/libraries`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      game_id: body.data.gameId,
      user_id: body.data.userId,
    }),
  });

  revalidatePath('/library');
};

export const addToCart = async (id: number): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });

  if (!user.data) {
    redirect('/login');
  }

  const body = GameUserBodySchema.safeParse({
    gameId: id,
    userId: user.data.id,
  });

  if (!body.success) {
    throw new Error('Failed to parse wishlist body');
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      game_id: body.data.gameId,
      user_id: body.data.userId,
    }),
  });

  revalidatePath('/cart');
};

export const deleteFromCart = async (id: number): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });

  if (!user.data) {
    redirect('/login');
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts/${id.toString()}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath('/cart');
};

export const deleteGames = async (id: number): Promise<void> => {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });

  if (!user.data) {
    redirect('/login');
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/${id.toString()}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag('games');
};

export const addGame = async (
  _prevState: unknown,
  formData: FormData,
): Promise<GameResponse> => {
  const token = cookies().get('token')?.value ?? '';

  if (!token) {
    redirect('/login');
  }

  const data = {
    name: formData.get('name') as string,
    publisher: formData.get('publisher') as string,
    price: Number(formData.get('price')),
    short_description: formData.get('short-description') as string,
    description: formData.get('description') as string,
    header_img: formData.get('header-img') as string,
    header_img_local: formData.get('header-img-local') as string,
    image: formData.get('image') as string,
    image_local: formData.get('image-local') as string,
  };

  const parsed = GameBodySchema.safeParse(data);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      message: 'Validation failed',
      data: null,
      errors: {
        name: errors.name,
        publisher: errors.publisher,
        price: errors.price,
        short_description: errors.short_description,
        description: errors.description,
        header_img: errors.header_img,
        image: errors.image,
      },
    };
  }

  if (parsed.data.image_local && parsed.data.image_local.size !== 0) {
    const file = parsed.data.image_local;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const response = await cloudinary.uploader.upload(base64, {
      use_filename: true,
    });

    parsed.data.image = response.secure_url;
  }

  if (parsed.data.header_img_local && parsed.data.header_img_local.size !== 0) {
    const file = parsed.data.header_img_local;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const response = await cloudinary.uploader.upload(base64, {
      use_filename: true,
    });

    parsed.data.header_img = response.secure_url;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parsed.data),
  });

  const responseParsed = GameResponseSchema.safeParse(await response.json());

  revalidateTag('games');

  return responseParsed.data ?? { message: 'An error occurred', data: null };
};
