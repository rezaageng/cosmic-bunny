import type { ReactElement } from 'react';
import { cookies } from 'next/headers';
import { ExportButton } from '@/components/transaction';
import { getOrder } from '@/services';
import { Rabbit } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

export default async function TransactionDashboard(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const { data } = await getOrder({ token });

  return (
    <section className="mx-auto max-w-screen-xl space-y-8 p-4">
      <ExportButton />
      {data.length === 0 ? (
        <div className="grid h-[calc(100svh-81px-100px)] w-full place-items-center">
          <Rabbit size={256} className="w-full text-zinc-800" />
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((order) => (
            <div
              key={order.id}
              className="flex flex-row gap-6 rounded-lg bg-zinc-900 p-4"
            >
              <span className="inline-block w-full max-w-4">{order.id}</span>
              <span
                className={cn('inline-block w-full max-w-20 capitalize', {
                  'text-rose-600': order.status === 'failed',
                  'text-teal-500': order.status === 'succeed',
                  'text-yellow-600': order.status === 'pending',
                })}
              >
                {order.status}
              </span>
              <span className="inline-block w-full max-w-40">
                {order.user.email}
              </span>
              <span className="inline-block flex-1 text-right">
                {formatCurrency(order.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
