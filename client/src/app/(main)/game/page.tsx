'use client';

import { useRouter } from 'next/navigation';

export default function GamePage(): void {
  const router = useRouter();

  router.back();
}
