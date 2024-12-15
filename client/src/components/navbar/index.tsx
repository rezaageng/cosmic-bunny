import { cookies } from 'next/headers';
import type { ReactElement } from 'react';
import { getCurrentUser } from '@/services';
import { NavbarActions } from '@/components/navbar/navbar-actions';

export async function Navbar(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const currentUser = await getCurrentUser({ token });

  return (
    <nav className="m-auto flex max-w-screen-2xl items-center justify-between p-4">
      <h1 className="text-2xl font-semibold">Hello {currentUser.data.name}</h1>
      <NavbarActions />
    </nav>
  );
}
