'use client'; // Error boundaries must be Client Components

import { type ReactElement } from 'react';
import { removeToken } from '@/lib/actions';

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
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            if (error.message === '401') {
              removeToken();
            }
            reset();
          }
        }
      >
        Try again
      </button>
    </div>
  );
}
