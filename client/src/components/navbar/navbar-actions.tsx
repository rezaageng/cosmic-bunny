'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { User as IUser, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '@/lib/actions';
import { getCookies } from '@/lib/utils';
import { type GamesResponse } from '@/schemas/games';
import { getGames } from '@/services';

export function NavbarActions(): ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const modalBackgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }

      if (modalBackgroundRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative flex gap-6">
      <button
        onClick={() => {
          setIsSearchOpen((prev) => !prev);
        }}
        type="button"
        className="flex items-center gap-2 rounded-2xl border border-gray-500 px-4 py-2 text-gray-500"
      >
        <Search />
        <span>Search</span>
      </button>
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
      {isSearchOpen ? <SearchModal /> : null}
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

function SearchModal(): ReactElement {
  const [data, setData] = useState<GamesResponse | null>(null);
  const [search, setSearch] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = decodeURIComponent(getCookies('token'));

    const fetchGames = async (): Promise<void> => {
      const games = await getGames({ token, search });

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
    <div className="fixed left-1/2 top-32 z-50 m-4 w-full max-w-lg -translate-x-1/2 rounded-2xl border border-white/25 bg-background sm:m-0">
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
                className="flex items-center gap-2 p-4 hover:bg-gray-500"
              >
                <Image
                  src="/images/auth-image.jpg"
                  alt="cover"
                  width={80}
                  height={60}
                  className="aspect-[4/3] w-20 rounded-lg"
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
  );
}
