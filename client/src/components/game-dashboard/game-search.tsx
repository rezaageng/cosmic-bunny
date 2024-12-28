'use client';

import { useEffect, useState, type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput } from '@/components/form';

export function GameSearch(): ReactElement {
  const [search, setSearch] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (search === '') {
      router.push(`/dashboard/games`);
      return;
    }

    const timeout = setTimeout(() => {
      router.push(`/dashboard/games?search=${search}`);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, search]);

  return (
    <form>
      <TextInput
        className="rounded-lg bg-transparent px-2 py-1 text-sm"
        placeholder="search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
}
