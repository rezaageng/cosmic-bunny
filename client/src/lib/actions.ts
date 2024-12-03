'use server';

import { redirect } from 'next/navigation';
import {
  LoginSchema,
  type RegisterResponse,
  RegisterResponseSchema,
  RegisterSchema,
  type RegisterSchemaType,
} from '@/schemas/auth';
import { cookies } from 'next/headers';

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

  if (response.status === 200 && responseParsed.success) {
    cookies().set('token', responseParsed.data!.data!.token);

    redirect('/');
  }

  return responseParsed.data!;
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

  if (response.status === 200 && responseParsed.success) {
    cookies().set('token', responseParsed.data!.data!.token);

    redirect('/');
  }

  return responseParsed.data!;
};
