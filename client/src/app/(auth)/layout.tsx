import type { ReactNode } from 'react';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <main>{children}</main>;
}
