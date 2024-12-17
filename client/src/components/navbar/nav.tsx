'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactElement } from 'react';
import { cn } from '@/lib/utils';

export function Nav(): ReactElement {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/"
        className={cn(
          'text-gray-300 hover:text-white',
          pathname === '/' ? 'text-white' : 'text-gray-300',
        )}
      >
        Home
      </Link>
      <Link
        href="/library"
        className={cn(
          'text-gray-300 hover:text-white',
          pathname === '/library' ? 'text-white' : 'text-gray-300',
        )}
      >
        Library
      </Link>
      <Link
        href="/wishlist"
        className={cn(
          'text-gray-300 hover:text-white',
          pathname === '/library' ? 'text-white' : 'text-gray-300',
        )}
      >
        Wishlist
      </Link>
    </div>
  );
}
