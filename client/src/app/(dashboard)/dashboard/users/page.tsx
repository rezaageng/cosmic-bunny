import type { ReactElement } from 'react';
import { Plus, User } from 'lucide-react';
import { cookies } from 'next/headers';
import { Button } from '@/components/button';
import { getUsers } from '@/services';

export default async function UserDashboard(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const { data } = await getUsers({ token });

  return (
    <section className="mx-auto max-w-screen-xl space-y-8 p-4">
      <div className="space-y-4">
        <div className="mb-6 flex items-center justify-end">
          <Button
            variant="text"
            disabled
            className="flex w-auto cursor-not-allowed items-center gap-2 text-sm font-semibold text-indigo-300"
          >
            <Plus /> <span>Add User</span>
          </Button>
        </div>
        {data.length === 0 ? (
          <div className="grid h-[calc(100svh-81px-100px)] w-full place-items-center">
            <User size={256} className="w-full text-zinc-800" />
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((user) => (
              <div
                key={user.id}
                className="flex flex-col justify-between gap-6 rounded-lg bg-zinc-900 p-4 md:flex-row"
              >
                <div className="flex flex-1 items-center gap-x-4 text-white">
                  <h3 className="line-clamp-1 w-full max-w-40">{user.name}</h3>
                  <span className="line-clamp-1 w-full max-w-40 text-gray-400">
                    {user.email}
                  </span>
                  <span className="line-clamp-1 w-full max-w-40 capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-4">
                  {/* Tombol Update */}
                  <Button disabled className="w-auto px-4 py-2 text-sm">
                    Update
                  </Button>

                  {/* Tombol Delete */}
                  <Button disabled variant="danger" className="w-auto text-sm">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
