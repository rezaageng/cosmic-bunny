'use client';

import { BadgeDollarSign, Gamepad2, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';

export function DashboardNav(): ReactElement {
  const pathname = usePathname();

  return (
    <aside className="sticky bottom-0 flex w-full items-center justify-around border-t border-zinc-800 p-4 sm:w-auto sm:flex-col sm:justify-start sm:gap-8 sm:border-r sm:border-t-0">
      <Link
        href="/dashboard/games"
        className={cn('hover:animate-pulse hover:text-indigo-500', {
          'text-indigo-500': pathname === '/dashboard/games',
        })}
      >
        <Gamepad2 />
      </Link>
      <Link
        href="/dashboard/transactions"
        className={cn('hover:animate-pulse hover:text-yellow-500', {
          'text-yellow-500': pathname === '/dashboard/transactions',
        })}
      >
        <BadgeDollarSign />
      </Link>
      <Link
        href="/dashboard/users"
        className={cn('hover:animate-pulse hover:text-teal-400', {
          'text-teal-400': pathname === '/dashboard/users',
        })}
      >
        <Users />
      </Link>
    </aside>
  );
}
