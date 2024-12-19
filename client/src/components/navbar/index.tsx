'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { Rabbit } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavbarActions } from '@/components/navbar/navbar-actions';

export function Navbar(): ReactElement {
  const pathname = usePathname();

  const renderTitle = (): string | null => {
    if (pathname === '/library') {
      return 'Library';
    } else if (pathname === '/wishlist') {
      return 'Wishlist';
    } else if (pathname === '/cart') {
      return 'Cart';
    }

    return null;
  };

  return (
    <nav className="m-auto flex h-20 max-w-screen-2xl items-center justify-between p-4">
      <h1 className="mr-4 flex items-center gap-2 text-lg font-semibold">
        <Link
          href="/"
          className="rounded-full hover:animate-pulse hover:text-indigo-500"
        >
          <Rabbit size={32} />
        </Link>
        {renderTitle() === null ? (
          <div className="text-sm">
            <span className="block">Cosmic</span>
            <span className="block">Bunny</span>
          </div>
        ) : (
          <span>{renderTitle()}</span>
        )}
      </h1>
      <NavbarActions />
    </nav>
  );
}
