import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
