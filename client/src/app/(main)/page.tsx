import Image from 'next/image';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  const featuredGames = [
    'Minecraft',
    'Fortnite',
    'The Legend of Zelda: Breath of the Wild',
    'Among Us',
    'Genshin Impact',
    'The Elder Scrolls V: Skyrim',
    'Animal Crossing: New Horizons',
    'Cyberpunk 2077',
    'Grand Theft Auto V',
    'Overwatch 2',
  ];

  const newlyReleasedGames = [
    'Elden Ring',
    'Hogwarts Legacy',
    'Starfield',
    'Diablo IV',
    "Baldur's Gate 3",
    'Final Fantasy XVI',
    'Street Fighter 6',
    'Dead Space Remake',
    'Forza Motorsport',
    'Star Wars Jedi: Survivor',
  ];

  const multiplayerGames = [
    'Apex Legends',
    'Valorant',
    'League of Legends',
    'Call of Duty: Warzone',
    'Rocket League',
    'Fortnite',
    'Fall Guys',
    'Destiny 2',
    'World of Warcraft',
    'Rainbow Six Siege',
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black py-8 sm:py-16">
      {/* Featured Games Section */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold text-gray-100 sm:text-5xl">
            Our Featured Games
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Discover a selection of popular games for endless fun and adventure.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 py-4 sm:gap-8">
          {featuredGames.map((game, idx) => (
            <div
              key={`featured${idx.toString()}`}
              className="flex h-auto w-36 flex-shrink-0 flex-col items-center sm:w-48 md:w-56 lg:w-64"
            >
              <Image
                src="/images/placeholder.png"
                alt={game}
                width={144}
                height={144}
                className="mx-auto mt-2 h-36 w-36 rounded-md object-cover"
              />
              <h3 className="text-md mt-2 px-2 text-center font-semibold text-gray-100 sm:text-lg md:text-xl">
                {game}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Newly Released Games Section */}
      <div className="mt-16 px-4 py-6">
        <h2 className="mx-4 mb-4 text-left text-3xl font-bold text-gray-100 sm:text-4xl">
          Newly Released Games
        </h2>
        <div className="scrollbar-hide flex gap-4 overflow-x-auto py-4">
          {newlyReleasedGames.map((game, idx) => (
            <div
              key={`newlyReleased${idx.toString()}`}
              className="flex w-32 flex-shrink-0 flex-col items-center sm:w-40 md:w-48 lg:w-56"
            >
              <Image
                src="/images/placeholder.png"
                alt={game}
                width={144}
                height={144}
                className="mx-auto mt-2 h-28 w-28 rounded-md object-cover"
              />
              <h3 className="mt-2 text-center text-sm font-semibold text-gray-100 sm:text-lg">
                {game}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Multiplayer Games Section */}
      <div className="mt-16 px-4 py-6">
        <h2 className="mx-4 mb-4 text-left text-3xl font-bold text-gray-100 sm:text-4xl">
          Multiplayer Games
        </h2>
        <div className="scrollbar-hide flex gap-4 overflow-x-auto py-4">
          {multiplayerGames.map((game, idx) => (
            <div
              key={`multiplayer${idx.toString()}`}
              className="flex w-32 flex-shrink-0 flex-col items-center sm:w-40 md:w-48 lg:w-56"
            >
              <Image
                src="/images/placeholder.png"
                alt={game}
                width={144}
                height={144}
                className="mx-auto mt-2 h-28 w-28 rounded-md object-cover"
              />
              <h3 className="mt-2 text-center text-sm font-semibold text-gray-100 sm:text-lg">
                {game}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
