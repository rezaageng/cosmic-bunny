import { ReactElement } from 'react';
import Link from 'next/link';
import { Plus, User } from 'lucide-react';
import { Button } from '@/components/button';

export default function UserDashboard(): ReactElement {
  const users = [
    { id: 1, name: 'Reza', email: 'reza1@gmail.com' },
    { id: 2, name: 'Fawwas', email: 'fawwas2@gmail.com' },
    { id: 3, name: 'Faris', email: 'faris3@gmail.com' },
  ];

  return (
    <section className="mx-auto max-w-screen-xl space-y-8 p-4">
      <div className="space-y-4">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard/users"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-500"
          >
            <Plus /> <span>Add User</span>
          </Link>
        </div>
        {users.length === 0 ? (
          <div className="grid h-[calc(100svh-81px-100px)] w-full place-items-center">
            <User size={256} className="w-full text-zinc-800" />
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col space-x-6 rounded-lg bg-zinc-900 p-4 sm:flex-row sm:justify-between"
              >
                <div className="flex items-center gap-x-4 text-white">
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {user.name}
                    </h3>
                    <span className="text-gray-400">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Tombol Update */}
                  <Button
                    className="w-auto px-4 py-2 text-sm"
                  >
                    Update
                  </Button>

                  {/* Tombol Delete */}
                  <Button
                    variant="danger"
                    className="w-auto text-sm"
                  >
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
