'use client';

import { FileDown } from 'lucide-react';
import type { ReactElement } from 'react';
import { getCookies } from '@/lib/utils';

export function ExportButton(): ReactElement {
  const token = decodeURIComponent(getCookies('token'));

  const clickHandler = async (): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/pdf',
      },
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={clickHandler}
        className="flex items-center gap-2 text-sm font-semibold text-indigo-500"
      >
        <FileDown />
        <span>Export PDF</span>
      </button>
    </div>
  );
}
