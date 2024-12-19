'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState, type ReactElement } from 'react';
import { cn } from '@/lib/utils';

export function GameDescription({
  description,
}: {
  description: string;
}): ReactElement {
  const [text, setText] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    setText(description.replace(/\\/g, ''));
  }, [description]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold sm:text-2xl">About The Game</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: text,
        }}
        className={cn({
          'h-auto': isShow,
          'h-[32rem] overflow-hidden': !isShow,
        })}
      />
      <button
        type="button"
        onClick={() => {
          setIsShow((prev) => !prev);
        }}
        className="flex text-indigo-500"
      >
        {isShow ? <ChevronUp /> : <ChevronDown />}
        <span>Show {isShow ? 'Less' : 'More'}</span>
      </button>
    </div>
  );
}
