import { writable } from "svelte/store";

export const pokemon = writable([]);
const pokemonDetails = {};

let loaded = false;

export const fetchPokemon = async () => {
  if (loaded) return;

  const url = `https://pokeapi.co/api/v2/pokemon?limit=898`;

  const response = await fetch(url);
  const data = await response.json();

  const loadedPokemon = data.results.map((data, index) => ({
    name: data.name,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  pokemon.set(loadedPokemon);

  loaded = true;
};

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
