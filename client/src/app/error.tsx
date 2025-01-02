'use client';

import { type ReactElement } from 'react';
import { removeCookie } from '@/lib/utils';

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
        onClick={() => {
          if (error.message === '401') {
            removeCookie('token');
          }
          reset();
        }}
      >
        Try again
      </button>
    </div>
  );
}
