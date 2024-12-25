'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import {
  Command,
  User as IUser,
  LibraryBig,
  Search,
  ShoppingCart,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions';
import { cn, detectOS, type OS } from '@/lib/utils';
import { type GamesResponse } from '@/schemas/games';
import { getGames } from '@/services';
import { type NavbarProps } from '@/components/navbar';

export function NavbarActions({ variant }: NavbarProps): ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [os, setOs] = useState<OS>('Unknown');

  const dropdownRef = useRef<HTMLUListElement>(null);
  const modalBackgroundRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    setOs(detectOS());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        setIsSearchOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }

      if (modalBackgroundRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative flex items-center gap-4 sm:gap-6">
      {variant === 'main' ? (
        <>
          <button
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
            }}
            type="button"
            className="flex items-center gap-2 rounded-2xl border-gray-500 sm:border sm:px-4 sm:py-2 sm:text-gray-500"
          >
            <Search />
            <div className="hidden items-center gap-1 sm:flex">
              <span>{os === 'MacOS' ? <Command size={16} /> : 'Ctrl'}</span>
              <span>+ K</span>
            </div>
          </button>
          <Link href="/library">
            <LibraryBig
              className={cn(
                'text-white hover:animate-pulse hover:text-blue-400',
                {
                  'text-blue-400': pathname === '/library',
                },
              )}
            />
          </Link>
          <Link href="/wishlist">
            <Star
              className={cn(
                'text-white hover:animate-pulse hover:text-yellow-500',
                {
                  'text-yellow-400': pathname === '/wishlist',
                },
              )}
            />
          </Link>
          <Link href="/cart">
            <ShoppingCart
              className={cn(
                'text-white hover:animate-pulse hover:text-teal-400',
                {
                  'text-teal-400': pathname === '/cart',
                },
              )}
            />
          </Link>
        </>
      ) : null}

      <button
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        type="button"
      >
        <div className="flex aspect-square w-9 items-center justify-center rounded-full bg-indigo-700">
          <IUser />
        </div>
      </button>
      {isDropdownOpen ? <UserDropdown ref={dropdownRef} /> : null}
      {isSearchOpen ? <SearchModal setIsSearchOpen={setIsSearchOpen} /> : null}
      {isSearchOpen ? (
        <div
          ref={modalBackgroundRef}
          className="fixed left-0 top-0 z-40 h-svh w-full bg-black/75"
        />
      ) : null}
    </div>
  );
}

const UserDropdown = forwardRef<HTMLUListElement>(
  function UserDropdown(_props, ref) {
    return (
      <ul
        ref={ref}
        className="absolute right-0 top-full z-10 mt-2 w-40 rounded-lg border border-gray-800 bg-gray-950 text-left text-sm"
      >
        <li>
          <Link href="/" className="block w-full px-2 py-1 hover:bg-gray-800">
            Account Setting
          </Link>
        </li>
        <li>
          <button
            onClick={async () => {
              await logout();
            }}
            type="button"
            className="w-full px-2 py-1 text-left text-rose-500 hover:bg-gray-800"
          >
            Logout
          </button>
        </li>
      </ul>
    );
  },
);

function SearchModal({
  setIsSearchOpen,
}: {
  setIsSearchOpen: (value: boolean) => void;
}): ReactElement {
  const [data, setData] = useState<GamesResponse | null>(null);
  const [search, setSearch] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const games = await getGames({ search });

      setData(games);
    };

    if (search === '') {
      setData(null);
      return;
    }
    const handler = setTimeout(() => {
      void fetchGames();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed left-0 top-32 z-50 w-screen max-w-2xl translate-x-0 p-4 sm:left-1/2 sm:m-0 sm:-translate-x-1/2">
      <div className="rounded-2xl border border-white/25 bg-background">
        <div className="flex gap-2 p-4">
          <Search />
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="w-full bg-transparent outline-none"
          />
        </div>
        {data && data.data.length !== 0 ? (
          <ul className="max-h-80 overflow-y-auto border-t border-white/25">
            {data.data.map((game) => (
              <li key={`search-result-${game.id.toString()}`}>
                <Link
                  href={`/game/${game.id.toString()}`}
                  onClick={() => {
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-2 p-4 hover:bg-gray-500"
                >
                  <Image
                    src={game.image}
                    alt="cover"
                    width={80}
                    height={40}
                    className="aspect-[2] w-20 rounded object-cover"
                  />
                  <div>
                    <span className="block font-semibold">{game.name}</span>
                    <span className="block text-sm">IDR {game.price}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
