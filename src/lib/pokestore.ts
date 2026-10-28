import { writable } from "svelte/store";
import { setIntervalX } from "@ultirequiem/six";

export interface PokemonSummary {
  name: string;
  id: number;
  image: string;
}

export const pokemon = writable<PokemonSummary[]>([]);

const pokemonObtained: PokemonSummary[] = [];

let loadedTimes = 0;

function orderNumber(text: string) {
  return text.slice(text.lastIndexOf("s/") + 2, text.lastIndexOf("/"));
}

export const fetchPokemon = async () => {
  if (loadedTimes >= 8) {
    return;
  }

  const url = `https://pokeapi.co/api/v2/generation/${loadedTimes + 1}`;

  const response = await fetch(url);
  const data = await response.json();

  const pokemonList: { name: string; url: string; nr?: string }[] =
    data.pokemon_species;

  for (const pokemon_ of pokemonList) {
    pokemon_.nr = orderNumber(pokemon_.url);
  }

  pokemonList.sort((a, b) => Number(a.nr) - Number(b.nr));

  const loadedPokemon = pokemonList.map((data, index) => ({
    name: data.name,
    id: pokemonObtained.length + index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemonObtained.length + index + 1
    }.png`,
  }));

  pokemonObtained.push(...loadedPokemon);

  pokemon.set(pokemonObtained);

  loadedTimes++;
};

/** Load the next generations in the background. Browser only, returns a cleanup function. */
export const startPolling = () => {
  const timer = setIntervalX(fetchPokemon, 3000, 7);
  return () => {
    if (typeof timer === "number") clearInterval(timer);
  };
};

export interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

const pokemonDetails: Record<string, PokemonDetails> = {};

export const getPokemonById = async (
  id: number | string,
): Promise<PokemonDetails | undefined> => {
  if (pokemonDetails[id]) return pokemonDetails[id];

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);

    if (!response.ok) return undefined;

    const data: PokemonDetails = await response.json();

    pokemonDetails[id] = data;

    return data;
  } catch (error) {
    console.error(error);
  }
};
