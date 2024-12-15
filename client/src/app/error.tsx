'use client';

import { type ReactElement } from 'react';
import { logout } from '@/lib/actions';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        type="button"
        onClick={async () => {
          if (error.message === '401') {
            await logout();
          }
          reset();
        }}
      >
        Try again
      </button>
    </div>
  );
}
