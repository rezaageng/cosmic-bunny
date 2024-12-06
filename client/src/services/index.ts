import { type UserResponse, UserResponseSchema } from '@/schemas/auth';

export const getCurrentUser = async ({
  token,
}: {
  token: string;
}): Promise<UserResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = UserResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse user response');
  }

  return data.data;
};
