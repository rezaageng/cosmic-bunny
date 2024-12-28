import { type UserResponse, UserResponseSchema } from '@/schemas/auth';
import { type CartResponse, CartResponseSchema } from '@/schemas/cart';
import {
  type GameResponse,
  GameResponseSchema,
  type GamesResponse,
  GamesResponseSchema,
} from '@/schemas/games';
import { type LibraryResponse, LibraryResponseSchema } from '@/schemas/library';
import {
  type SteamGameResponse,
  SteamGameResponseSchema,
  type SteamGamesResponse,
  SteamGamesResponseSchema,
} from '@/schemas/steam-games';
import {
  type WishlistResponse,
  WishlistResponseSchema,
} from '@/schemas/wishlist';

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

  if (response.status === 401) {
    throw new Error('401');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = UserResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse user response');
  }

  return data.data;
};

export const getGames = async ({
  search,
}: {
  search?: string;
}): Promise<GamesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games?search=${search ?? ''}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: { tags: ['games'] },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  const data = GamesResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse games response');
  }

  return data.data;
};

export const getGame = async (id: string): Promise<GameResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 404) {
    const data = GameResponseSchema.safeParse({
      message: 'Game not found',
      data: null,
    });

    if (!data.success) {
      throw new Error('Failed to parse game response');
    }

    return data.data;
  }

  const data = GameResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse game response');
  }

  return data.data;
};

export const getLibrary = async ({
  token,
}: {
  token: string;
}): Promise<LibraryResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/libraries`,
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
    throw new Error('Failed to fetch games');
  }

  const data = LibraryResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse games response');
  }

  return data.data;
};

export const getWishlist = async ({
  token,
}: {
  token: string;
}): Promise<WishlistResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/wishlists`,
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
    throw new Error('Failed to fetch games');
  }

  const data = WishlistResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse games response');
  }

  return data.data;
};

export const getCart = async ({
  token,
}: {
  token: string;
}): Promise<CartResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  const data = CartResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse games response');
  }

  return data.data;
};

export const getSteamGames = async ({
  token,
  search,
}: {
  token: string;
  search?: string;
}): Promise<SteamGamesResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/steam-games?search=${search ?? ''}`,
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
    throw new Error('Failed to fetch games');
  }

  const data = SteamGamesResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse games response');
  }

  return data.data;
};

export const getSteamGame = async ({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<SteamGameResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/steam-games/${id.toString()}`,
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
    throw new Error('Failed to fetch games');
  }

  const data = SteamGameResponseSchema.safeParse(await response.json());

  if (!data.success) {
    throw new Error('Failed to parse games response');
  }

  return data.data;
};
