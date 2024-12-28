import type { ReactElement, ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { DashboardNav } from '@/components/navbar/dashboard-nav';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <>
      <Navbar variant="dashboard" />
      <main className="relative flex min-h-[calc(100svh-81px)] flex-col-reverse sm:flex-row">
        <DashboardNav />
        <div className="mx-auto w-full max-w-screen-2xl flex-1">{children}</div>
      </main>
    </>
  );
}
