import { type ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer className="mt-auto bg-gray-800 py-4 text-gray-300">
      <div className="container mx-auto text-center">
        <p className="text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Cosmic Bunny. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
