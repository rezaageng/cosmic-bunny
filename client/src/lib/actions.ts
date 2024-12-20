'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  LoginSchema,
  type RegisterResponse,
  RegisterResponseSchema,
  RegisterSchema,
  type RegisterSchemaType,
} from '@/schemas/auth';
import { getCurrentUser } from '@/services';
import { GameUserBodySchema } from '@/schemas/global';

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
};
