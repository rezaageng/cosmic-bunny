'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { User as IUser } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/lib/actions';

export function NavbarActions(): ReactElement {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        type="button"
        className="flex aspect-square w-9 items-center justify-center rounded-full bg-indigo-700"
      >
        <IUser />
      </button>
      {isDropdownOpen ? <UserDropdown ref={dropdownRef} /> : null}
    </div>
  );
}

const UserDropdown = forwardRef<HTMLUListElement>(
  function UserDropdown(_props, ref) {
    return (
      <ul
        ref={ref}
        className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-gray-800 bg-gray-950 text-left text-sm"
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
