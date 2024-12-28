'use client';

import { useEffect, useState, type ReactElement } from 'react';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { useShallow } from 'zustand/shallow';
import {
  ErrorMessage,
  InputGroup,
  Label,
  TextArea,
  TextInput,
} from '@/components/form';
import type { SteamGamesResponse } from '@/schemas/steam-games';
import { getSteamGame, getSteamGames } from '@/services';
import { getCookies } from '@/lib/utils';
import { type GameResponse, type GameBody } from '@/schemas/games';
import { addGame } from '@/lib/actions';
import { AddGameAction } from '@/components/game-dashboard/add-game-action';
import { useToastStore } from '@/store/toast';

const initialState: GameResponse = {
  message: '',
  data: null,
};

export function AddGameForm(): ReactElement {
  const [state, formAction] = useFormState(addGame, initialState);

  const [setToastOpen, setMessage] = useToastStore(
    useShallow((toastState) => [toastState.setIsOpen, toastState.setMessage]),
  );

  const [search, setSearch] = useState('');
  const [games, setGames] = useState<SteamGamesResponse['data']>([]);
  const [formValues, setFormValues] = useState<GameBody>({
    name: '',
    publisher: '',
    price: 0,
    short_description: '',
    description: '',
    header_img: '',
    image: '',
  });

  const selectGame = async (id: number): Promise<void> => {
    const token = decodeURIComponent(getCookies('token'));

    const response = await getSteamGame({ id, token });

    setFormValues({
      name: response.data.name,
      publisher: response.data.publisher[0] ?? '',
      price: parseFloat((response.data.price / 100).toFixed(2)),
      short_description: response.data.short_description,
      description: response.data.description,
      header_img: response.data.header_img,
      image: response.data.screenshot,
    });

    setSearch('');
  };

  useEffect(() => {
    if (!search) {
      setGames([]);
      return;
    }

    const fetchSteamGames = async (): Promise<void> => {
      const token = decodeURIComponent(getCookies('token'));

      const response = await getSteamGames({ search, token });

      setGames(response.data);
    };

    const handler = setTimeout(() => {
      void fetchSteamGames();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (state.data) {
      setFormValues({
        name: '',
        publisher: '',
        price: 0,
        short_description: '',
        description: '',
        header_img: '',
        image: '',
      });
      setToastOpen(true);
      setMessage(state.message);
    }
  }, [setMessage, setToastOpen, state.data, state.message]);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <InputGroup className="relative">
            <Label htmlFor="name">Name</Label>
            <TextInput
              onChange={(e) => {
                setSearch(e.target.value);
                setFormValues((prev) => ({ ...prev, name: e.target.value }));
              }}
              value={formValues.name}
              id="name"
              type="text"
              name="name"
            />
            <ErrorMessage>{state.errors?.name?.[0]}</ErrorMessage>
            {games.length > 0 ? (
              <SteamGame onClick={selectGame} games={games} />
            ) : null}
          </InputGroup>
          <InputGroup>
            <Label htmlFor="publisher">Publisher</Label>
            <TextInput
              id="publisher"
              type="text"
              name="publisher"
              value={formValues.publisher}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  publisher: e.target.value,
                }));
              }}
            />
            <ErrorMessage>{state.errors?.publisher?.[0]}</ErrorMessage>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="price">Price</Label>
            <TextInput
              id="price"
              type="text"
              name="price"
              value={formValues.price}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  price: isNaN(parseFloat(e.target.value))
                    ? 0
                    : parseFloat(e.target.value),
                }));
              }}
            />
            <ErrorMessage>{state.errors?.price?.[0]}</ErrorMessage>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="name">Short Description</Label>
            <TextInput
              id="short-description"
              type="text"
              name="short-description"
              value={formValues.short_description}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  shortDescription: e.target.value,
                }));
              }}
            />
            <ErrorMessage>{state.errors?.short_description?.[0]}</ErrorMessage>
          </InputGroup>
        </div>
        <InputGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formValues.description}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <ErrorMessage>{state.errors?.description?.[0]}</ErrorMessage>
        </InputGroup>
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <div className="w-full max-w-96 space-y-2">
            <Label>Header Image</Label>
            {formValues.header_img ? (
              <Image
                src={formValues.header_img}
                alt="cover"
                width={620}
                height={310}
                className="aspect-video w-96 rounded object-cover"
              />
            ) : (
              <div className="aspect-video rounded bg-slate-700" />
            )}
            <ErrorMessage>{state.errors?.header_img?.[0]}</ErrorMessage>
          </div>
          <div className="w-full max-w-96 space-y-2">
            <Label>Image</Label>
            {formValues.image ? (
              <Image
                src={formValues.image}
                alt="cover"
                width={620}
                height={348.75}
                className="aspect-video w-96 rounded object-cover"
              />
            ) : (
              <div className="aspect-video rounded bg-slate-700" />
            )}
            <ErrorMessage>{state.errors?.image?.[0]}</ErrorMessage>
          </div>
        </div>
        <TextInput
          id="header-img"
          name="header-img"
          value={formValues.header_img}
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              headerImg: e.target.value,
            }));
          }}
          className="hidden"
        />
        <TextInput
          id="image"
          name="image"
          value={formValues.image}
          onChange={(e) => {
            setFormValues((prev) => ({
              ...prev,
              image: e.target.value,
            }));
          }}
          className="hidden"
        />
      </div>
      <AddGameAction />
    </form>
  );
}

function SteamGame({
  games,
  onClick,
}: {
  games: SteamGamesResponse['data'];
  onClick: (id: number) => void;
}): ReactElement {
  return (
    <div className="absolute left-0 top-full mt-2 max-h-96 w-full overflow-y-auto rounded-lg bg-zinc-800">
      {games.map((game) => (
        <div
          key={`game-${game.id.toString()}`}
          role="menuitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClick(game.id);
            }
          }}
          onClick={() => {
            onClick(game.id);
          }}
          className="flex cursor-pointer items-center gap-x-4 p-4 hover:bg-zinc-600"
        >
          <Image
            src={game.image}
            alt="cover"
            width={80}
            height={40}
            className="aspect-[2] w-20 rounded object-cover"
          />
          <span className="block truncate font-semibold">{game.name}</span>
        </div>
      ))}
    </div>
  );
}
