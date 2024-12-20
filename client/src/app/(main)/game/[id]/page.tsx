'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';

export default function GamePage(): ReactElement {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = (): void => {
    setShowMore(!showMore);
  };

  const openPopup = (): void => {
    setIsPopupVisible(true);
  };

  const closePopup = (): void => {
    setIsPopupVisible(false);
  };

  const products = [
    {
      image: '/images/Lego-1.jpg',
      title: 'LEGO Star Wars',
      formattedPrice: `IDR ${new Intl.NumberFormat('id-ID').format(620000)}`,
      rating: '⭐ 4.9',
    },
    {
      image: '/images/thehunter.jpg',
      title: 'The Hunter',
      formattedPrice: `IDR ${new Intl.NumberFormat('id-ID').format(45000)}`,
      rating: '⭐ 4.3',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col text-white">
      <div className="flex-grow p-8">
        <div className="">
          <div className="mb-6">
            <h2 className="text-4xl font-bold">
              LEGO® Star Wars™: The Skywalker Saga
            </h2>
            <div className="mt-2 flex space-x-2 text-sm text-gray-400">
              <span>Rate ⭐⭐⭐⭐⭐ 4.9</span>
              <span>Great for Beginners 🐣</span>
              <span>Great Boss Battles 🦖</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-6 text-white md:flex-row">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-300">
                Genre
              </h2>
              <div className="flex gap-2">
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Action
                </span>
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Adventure
                </span>
              </div>
            </div>
            <div className="hidden border-l border-gray-600 md:block" />
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-300">
                Fitur
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Achievements
                </span>
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Cloud Saves
                </span>
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Co-op
                </span>
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Multiplayer
                </span>
                <span className="rounded bg-gray-700 px-3 py-1 text-xs">
                  Single Player
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <nav className="flex space-x-4">
            <div className="border-b-2 border-blue-500 pb-2 text-blue-500">
              Overview
            </div>
          </nav>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl">
              <div className="mb-5 text-lg font-semibold text-white">
                LEGO® Star Wars™: The Skywalker Saga
              </div>
              <div className="mb-5 text-sm text-gray-400">
                <p>
                  The galaxy is yours in LEGO® Star Wars™: The Skywalker Saga.
                  Experience memorable moments and nonstop action from all nine
                  Skywalker saga films reimagined with signature LEGO humor. The
                  digital edition includes an exclusive classic Obi-Wan Kenobi
                  playable character.
                </p>
              </div>
            </div>
            <div>
              {showMore ? (
                <>
                  <div className="mb-5 text-lg font-semibold text-white">
                    Explore the Trilogies in Any Order
                  </div>
                  <div className="mb-5 text-sm text-gray-400">
                    Players will relive the epic story of all nine films in the
                    Skywalker Saga, and it all starts with picking the trilogy
                    of their choice to begin the journey.
                  </div>
                  <div className="mb-5 text-lg font-semibold text-white">
                    Play as Iconic Heroes and Villains
                  </div>
                  <div className="mb-5 text-sm text-gray-400">
                    More than 300 playable characters from throughout the
                    galaxy.
                  </div>
                  <div className="mb-5 text-lg font-semibold text-white">
                    Discover Legendary Locales
                  </div>
                  <div className="mb-5 text-sm text-gray-400">
                    Players can visit well-known locales from their favorite
                    Skywalker saga films. They can unlock and have the freedom
                    to seamlessly travel to 23 planets as they play through the
                    saga or explore and discover exciting quests.
                  </div>
                </>
              ) : null}
              <button
                type="button"
                onClick={toggleShowMore}
                className="mt-4 text-white transition-all duration-300 hover:opacity-80"
              >
                {showMore ? (
                  <span>
                    Show less <span>&#8593;</span>
                  </span>
                ) : (
                  <span>
                    Show more <span>&#8595;</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-bold">IDR 622,000</h4>
            <button
              type="button"
              className="w-full rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={openPopup}
            >
              Buy Now
            </button>
            <button
              type="button"
              className="w-full rounded-md bg-gray-800 px-6 py-3 font-bold text-gray-300 hover:bg-gray-700"
            >
              Add To Cart
            </button>
            <button
              type="button"
              className="w-full rounded-md bg-gray-800 px-6 py-3 font-bold text-gray-300 hover:bg-gray-700"
            >
              Add to Wishlist
            </button>
            <div className="flex flex-col gap-3 p-6 text-white md:flex-row">
              <div className="flex flex-wrap gap-2">
                <span className="flex-1 rounded bg-gray-700 px-4 py-1 text-center text-xs">
                  Developer : TI games
                </span>
                <span className="flex-1 rounded bg-gray-700 px-4 py-1 text-center text-xs">
                  Platform : Windows
                </span>
                <span className="flex-1 rounded bg-gray-700 px-4 py-1 text-center text-xs">
                  Release Date : 04/06/22
                </span>
              </div>
            </div>
          </div>
        </div>

        {isPopupVisible ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-sm rounded-lg bg-white p-6 text-black">
              <p>
                Are you sure you want to purchase LEGO® Star Wars™: The
                Skywalker Saga?
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                  onClick={closePopup}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mb-4 mt-7 border-b border-gray-700" />
        <h2 className="text-4xl font-bold">Adventure</h2>
        <div className="relative mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-8">
          {products.map((product) => (
            <div
              key={product.title}
              className="h-29 relative w-32 overflow-hidden rounded-lg p-2 transition-transform duration-200 hover:scale-95"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={128}
                height={128}
                className="h-32 w-32 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-sm text-white">
                  <Link href="/">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-400">
                  {product.formattedPrice}
                </p>
              </div>
              <p className="mt-1 text-sm text-white">{product.rating}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="space-y-2 border-gray-700 p-4 text-center text-gray-400">
        <p>COSMIC-BUNNY</p>
        <div className="flex justify-center space-x-4">
          <a href="https://instagram.com" className="hover:text-blue-500">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
