'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimate } from 'motion/react';
import { useResponsive } from '@/hooks/use-responsive';
import type { GamesResponse } from '@/schemas/games';
import { GameCard } from '@/components/game-card';

interface GameListProps {
  title: string;
  games: GamesResponse['data'];
}

export function GameList({ title, games }: GameListProps): ReactElement {
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

      if (!scope.current) return;

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
          {games.length !== 0
            ? games.map((game) => (
                <GameCard
                  key={`new-release-${game.id.toString()}`}
                  gameId={game.id}
                  image={game.image}
                  name={game.name}
                  price={game.price}
                  width={itemWidth}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
