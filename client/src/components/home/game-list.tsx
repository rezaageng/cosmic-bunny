'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimate } from 'motion/react';
import Link from 'next/link';
import { useResponsive } from '@/hooks/use-responsive';

interface GameListProps {
  title: string;
}

export function GameList({ title }: GameListProps): ReactElement {
  const games = [
    'Elden Ring Lord of ther rings special edition',
    'Hogwarts Legacy',
    'Starfield',
    'Diablo IV',
    "Baldur's Gate 3",
    'Final Fantasy XVI',
    'Street Fighter 6',
    'Dead Space Remake',
    'Forza Motorsport',
    'Star Wars Jedi: Survivor',
    'Star Wars Jedi: Survivorsdfsdf',
  ];

  const [itemWidth, setItemWidth] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [currPos, setCurrPos] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isSm = useResponsive(640);
  const isMd = useResponsive(768);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isSm && !isMd) {
      setTotalItem(3);
    } else if (isMd) {
      setTotalItem(4);
    } else {
      setTotalItem(2);
    }
  }, [isSm, isMd]);

  const updateItemWidth = useCallback(() => {
    if (wrapperRef.current) {
      setItemWidth(wrapperRef.current.clientWidth / totalItem - 16);
    }
  }, [totalItem]);

  useEffect(() => {
    updateItemWidth();

    window.addEventListener('resize', () => {
      updateItemWidth();
      setCurrPos(0);
      void animate(scope.current, {
        x: 0,
      });
    });

    return () => {
      window.removeEventListener('resize', updateItemWidth);
    };
  }, [animate, scope, updateItemWidth]);

  const nextItem = (): void => {
    const lastPos = Math.floor(games.length / totalItem - 1);
    const lastItem = games.length % totalItem;

    if (
      (lastItem === 0 && currPos === lastPos) ||
      (lastItem !== 0 && currPos === lastPos + 1)
    )
      return;

    void animate(
      scope.current,
      {
        x:
          currPos !== lastPos
            ? -(itemWidth + 16) * totalItem * (currPos + 1)
            : -(itemWidth + 16) * totalItem * currPos -
              (itemWidth + 16) * lastItem,
      },
      {
        ease: 'easeOut',
      },
    );

    setCurrPos((prev) => prev + 1);
  };

  const prevItem = (): void => {
    if (currPos === 0) return;

    void animate(
      scope.current,
      {
        x: -(itemWidth + 16) * totalItem * (currPos - 1),
      },
      {
        ease: 'easeOut',
      },
    );

    setCurrPos((prev) => prev - 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-left text-2xl font-bold text-gray-100">{title}</h2>
        <div className="space-x-2">
          <button
            type="button"
            onClick={prevItem}
            className="rounded-full bg-gray-700 p-1"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={nextItem}
            className="rounded-full bg-gray-700 p-1"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div ref={wrapperRef} className="w-full overflow-clip">
        <div ref={scope} className="flex gap-4">
          {games.map((game, idx) => (
            <Link
              key={`newlyReleased${idx.toString()}`}
              href={game}
              className="group space-y-2"
            >
              <div
                style={{ width: itemWidth }}
                key={`newlyReleased${idx.toString()}`}
                className="relative aspect-[3/2] flex-shrink-0 overflow-clip rounded-2xl"
              >
                <Image
                  src="/images/placeholder.png"
                  alt={game}
                  fill
                  className="object-cover group-hover:brightness-125"
                />
              </div>
              <h3 className="line-clamp-2 font-semibold text-gray-100 sm:text-lg">
                {game}
              </h3>
              <span className="block">IDR 560,000</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
