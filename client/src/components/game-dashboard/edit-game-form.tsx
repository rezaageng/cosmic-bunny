'use client';

import { useEffect, useState, type ReactElement } from 'react';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { useShallow } from 'zustand/shallow';
import { ImageUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  ErrorMessage,
  InputGroup,
  Label,
  TextArea,
  TextInput,
} from '@/components/form';
import type { SteamGamesResponse } from '@/schemas/steam-games';
import { getCategories, getSteamGame, getSteamGames } from '@/services';
import { getCookies } from '@/lib/utils';
import { type GameResponse, type GameBody } from '@/schemas/games';
import { updateGame } from '@/lib/actions';
import { AddGameAction } from '@/components/game-dashboard/add-game-action';
import { useToastStore } from '@/store/toast';
import { type CategoriesResponse } from '@/schemas/categories';

interface UpdateGameFormProps {
  game: GameResponse['data'];
}

const initialState: GameResponse = {
  message: '',
  data: null,
};

export function EditGameForm({ game }: UpdateGameFormProps): ReactElement {
  const token = decodeURIComponent(getCookies('token'));

  const [state, formAction] = useFormState(updateGame, initialState);

  const [setToastOpen, setMessage] = useToastStore(
    useShallow((toastState) => [toastState.setIsOpen, toastState.setMessage]),
  );

  const [tempCategories, setTempCategories] = useState<
    CategoriesResponse['data']
  >([]);
  const [search, setSearch] = useState('');
  const [categoriesSearch, setCategoriesSearch] = useState('');
  const [games, setGames] = useState<SteamGamesResponse['data']>([]);
  const [categories, setCategories] = useState<CategoriesResponse['data']>([]);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [localImage, setLocalImage] = useState({
    header_img: '',
    image: '',
  });
  const [formValues, setFormValues] = useState<GameBody>({
    name: '',
    publisher: '',
    price: 0,
    short_description: '',
    description: '',
    header_img: '',
    image: '',
    categories: [],
    new_categories: [],
  });

  const selectGame = async (id: number): Promise<void> => {
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

  const selectCategory = ({
    id,
    name,
  }: {
    id?: number;
    name?: string;
  }): void => {
    if (id && name) {
      setFormValues((prev) => ({
        ...prev,
        categories: [...(prev.categories ?? []), id],
      }));

      setCategoriesSearch('');
      setCategoryNames((prev) => [...prev, name]);

      return;
    }

    setFormValues((prev) => ({
      ...prev,
      new_categories: [...(prev.new_categories ?? []), categoriesSearch],
    }));

    setCategoriesSearch('');
    setCategoryNames((prev) => [...prev, categoriesSearch]);
  };

  useEffect(() => {
    if (!search) {
      setGames([]);
      return;
    }

    const fetchSteamGames = async (): Promise<void> => {
      const response = await getSteamGames({ search, token });

      setGames(response.data);
    };

    const handler = setTimeout(() => {
      void fetchSteamGames();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, token]);

  useEffect(() => {
    if (!categoriesSearch) {
      setCategories([]);
      return;
    }

    const fetchCategories = async (): Promise<void> => {
      const { data } = await getCategories({ token, search: categoriesSearch });

      setCategories(data);
    };

    const handler = setTimeout(() => {
      void fetchCategories();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [categoriesSearch, token]);

  useEffect(() => {
    if (state.data) {
      setToastOpen(true);
      setMessage(state.message);
    }
  }, [setMessage, setToastOpen, state.data, state.message]);

  useEffect(() => {
    if (!game) {
      notFound();
    }

    if (tempCategories.length === 0) {
      void (async (): Promise<void> => {
        const response = await getCategories({ token });
        setTempCategories(response.data);
      })();
    }

    setFormValues({
      name: game.name,
      publisher: game.publisher,
      price: game.price,
      short_description: game.short_description,
      description: game.description,
      header_img: game.header_img,
      image: game.image,
      categories: game.categories_list
        .map(
          (category) => tempCategories.find((cat) => cat.name === category)?.id,
        )
        .filter((id): id is number => id !== undefined),
    });

    if (game.categories_list.length > 0) {
      setCategoryNames(
        game.categories_list.filter(
          (category): category is string => category !== undefined,
        ),
      );
    }
  }, [game, tempCategories, token]);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <InputGroup className="relative">
            <Label htmlFor="name">Name</Label>
            <TextInput
              onChange={(e) => {
                setSearch(e.target.value);
                setFormValues((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
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
            <Label htmlFor="short-description">Short Description</Label>
            <TextInput
              id="short-description"
              type="text"
              name="short-description"
              value={formValues.short_description}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  short_description: e.target.value,
                }));
              }}
            />
            <ErrorMessage>{state.errors?.short_description?.[0]}</ErrorMessage>
          </InputGroup>
          <InputGroup className="relative">
            <Label htmlFor="categories-search">Categories</Label>
            <TextInput
              id="categories-search"
              name="categories-search"
              onChange={(e) => {
                setCategoriesSearch(e.target.value);
              }}
              value={categoriesSearch}
            />
            {categoriesSearch ? (
              <Categories categories={categories} onClick={selectCategory} />
            ) : null}
            <div className="mt-1 flex gap-2">
              {categoryNames.map((category) => (
                <span
                  key={`category-${category.toString()}`}
                  className="inline-block rounded-full bg-indigo-500 px-2 py-1 text-xs text-white"
                >
                  {category}
                </span>
              ))}
            </div>
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
            <div className="relative overflow-clip rounded">
              <label
                htmlFor="header-img-local"
                className="absolute left-0 top-0 grid h-full w-full cursor-pointer place-content-center bg-indigo-500 bg-opacity-50 opacity-0 transition hover:opacity-100"
              >
                <ImageUp />
              </label>
              {formValues.header_img || localImage.header_img ? (
                <Image
                  src={
                    !localImage.header_img
                      ? formValues.header_img
                      : localImage.header_img
                  }
                  alt="cover"
                  width={620}
                  height={310}
                  className="aspect-video w-96 rounded object-cover"
                />
              ) : (
                <div className="aspect-video rounded bg-background" />
              )}
            </div>
            <ErrorMessage>{state.errors?.header_img?.[0]}</ErrorMessage>
          </div>
          <div className="w-full max-w-96 space-y-2">
            <Label>Image</Label>
            <div className="relative overflow-clip rounded">
              <label
                htmlFor="image-local"
                className="absolute left-0 top-0 grid h-full w-full cursor-pointer place-content-center bg-indigo-500 bg-opacity-50 opacity-0 transition hover:opacity-100"
              >
                <ImageUp />
              </label>
              {formValues.image || localImage.image ? (
                <Image
                  src={!localImage.image ? formValues.image : localImage.image}
                  alt="cover"
                  width={620}
                  height={310}
                  className="aspect-video w-96 rounded object-cover"
                />
              ) : (
                <div className="aspect-video rounded bg-background" />
              )}
            </div>
            <ErrorMessage>{state.errors?.image?.[0]}</ErrorMessage>
          </div>
        </div>
        <input
          type="text"
          name="id"
          id="id"
          value={game?.id}
          className="hidden"
        />
        {formValues.categories?.map((category, i) => (
          <input
            key={`category-${category.toString()}-${i.toString()}`}
            name="categories"
            type="hidden"
            value={category}
          />
        ))}
        {formValues.new_categories?.map((category, i) => (
          <input
            key={`new-category-${category}-${i.toString()}`}
            name="new_categories"
            type="hidden"
            value={category}
          />
        ))}
        <input
          type="file"
          accept="image/*"
          id="header-img-local"
          name="header-img-local"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            const reader = new FileReader();

            reader.onload = () => {
              setLocalImage((prev) => ({
                ...prev,
                header_img: reader.result as string,
              }));
            };

            if (file?.type.startsWith('image/')) {
              reader.readAsDataURL(file);
              return;
            }

            setToastOpen(true);
            setMessage('File is not an image');
          }}
        />
        <input
          type="file"
          accept="image/*"
          id="image-local"
          name="image-local"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            const reader = new FileReader();

            reader.onload = () => {
              setLocalImage((prev) => ({
                ...prev,
                image: reader.result as string,
              }));
            };

            if (file?.type.startsWith('image/')) {
              reader.readAsDataURL(file);
              return;
            }

            setToastOpen(true);
            setMessage('File is not an image');
          }}
        />
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
    <div className="absolute left-0 top-full z-20 mt-2 max-h-96 w-full overflow-y-auto rounded-lg bg-zinc-800">
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

function Categories({
  categories,
  onClick,
}: {
  categories: CategoriesResponse['data'];
  onClick: ({ id, name }: { id?: number; name?: string }) => void;
}): ReactElement {
  return (
    <div className="absolute left-0 top-full z-20 mt-2 max-h-96 w-full overflow-y-auto rounded-lg bg-zinc-800">
      {categories.map((category) => (
        <div
          key={`category-${category.id.toString()}`}
          role="menuitem"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClick({ id: category.id, name: category.name });
            }
          }}
          onClick={() => {
            onClick({ id: category.id, name: category.name });
          }}
          className="cursor-pointer items-center gap-x-4 p-4 hover:bg-zinc-600"
        >
          <span className="block truncate font-semibold">{category.name}</span>
        </div>
      ))}
      <div
        role="menuitem"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClick({});
          }
        }}
        onClick={() => {
          onClick({});
        }}
        className="cursor-pointer items-center gap-x-4 p-4 hover:bg-zinc-600"
      >
        <span className="block truncate font-semibold">Add Category</span>
      </div>
    </div>
  );
}
