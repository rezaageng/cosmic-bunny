'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { formatCurrency } from '@/lib/utils';

interface Game {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface Transaction {
  id: number;
  game: Game;
  status: string;
  type: string;
  channel: string;
  account: string;
  amount: number;
  dateCreated: string;
}

const transactionsData: Transaction[] = [
  {
    id: 1,
    game: {
      id: 101,
      name: 'The Witcher 3: Wild Hunt',
      image: '/images/placeholder.png',
      price: 199000,
    },
    status: 'Success',
    type: 'Purchase',
    channel: 'Online',
    account: '12345',
    amount: 199000,
    dateCreated: '2024-12-25',
  },
  {
    id: 2,
    game: {
      id: 102,
      name: 'Cyberpunk 2077',
      image: '/images/placeholder.png',
      price: 299000,
    },
    status: 'Pending',
    type: 'Purchase',
    channel: 'Online',
    account: '67890',
    amount: 199000,
    dateCreated: '2024-12-20',
  },
  {
    id: 3,
    game: {
      id: 104,
      name: 'Red Dead Redemption 2',
      image: '/images/placeholder.png',
      price: 249000,
    },
    status: 'Success',
    type: 'Purchase',
    channel: 'Online',
    account: '67888',
    amount: 179000,
    dateCreated: '2024-12-10',
  },
];

function TransactionCard({
  transaction,
}: {
  transaction: Transaction;
}): ReactElement {
  return (
    <div className="flex flex-col space-y-6 rounded-lg bg-zinc-900 p-4 sm:flex-row sm:justify-between sm:space-x-6 sm:space-y-0">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap items-center gap-x-56 text-sm font-semibold text-gray-400">
          <p
            className={`text-sm ${
              transaction.status === 'Success'
                ? 'text-green-500'
                : 'text-orange-500'
            }`}
          >
            Status: {transaction.status}
          </p>
          <p className="text-gray-300">Date: {transaction.dateCreated}</p>
          <p className="text-gray-300">Account: {transaction.account}</p>
          <span className="text-gray-300">
            {formatCurrency(transaction.game.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TransactionsDashboard(): ReactElement {
  return (
    <div className="p-6">
      <section className="space-y-4">
        {transactionsData.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          transactionsData.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </section>
    </div>
  );
}
