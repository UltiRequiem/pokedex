import { writable } from "svelte/store";
import setIntervalX from "@ultirequiem/six";

export const pokemon = writable([]);

const pokemonObtained = [];

let loadedTimes = 0;

function orderNumber(text: string) {
  // eslint-disable-next-line unicorn/prefer-string-slice
  return text.substring(text.lastIndexOf("s/") + 2, text.lastIndexOf("/"));
}

export const fetchPokemon = async () => {
  if (loadedTimes >= 8) {
    return;
  }

  const url = `https://pokeapi.co/api/v2/generation/${loadedTimes + 1}`;

  const response = await fetch(url);
  const data = await response.json();

  const pokemonList = data.pokemon_species;

  for (const pokemon_ of pokemonList) {
    pokemon_.nr = orderNumber(pokemon_.url);
  }

  pokemonList.sort((a, b) => a.nr - b.nr);

  const loadedPokemon = data.pokemon_species.map((data, index: number) => ({
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

setIntervalX(fetchPokemon, 3000, 7);

const pokemonDetails = {};

export const getPokemonById = async (id: number | string) => {
  if (pokemonDetails[id]) return pokemonDetails[id];

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);
    const data = await response.json();

    pokemonDetails[id] = data;

    return data;
  } catch (error) {
    console.error(error);
  }
};
