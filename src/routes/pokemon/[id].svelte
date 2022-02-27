<script context="module" lang="ts">
  import { getPokemonById } from "../../pokestore";

  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ params }) => {
    const pokemon = await getPokemonById(params.id);
    return { props: { pokemon } };
  };
</script>

<script>
  export let pokemon;
  const pokemonType = pokemon.types[0].type.name;
</script>

<svelte:head>
  <title>Pokedex - {pokemon.name}</title>
</svelte:head>

<div class="flex flex-col items-center m-10">
  <h1 class="text-4xl text-center my-8 uppercase">{pokemon.name}</h1>
  <p>
    Type: <strong>{pokemonType}</strong> | Height:
    <strong>{pokemon.height}</strong>
    | Weight: <strong>{pokemon.weight}</strong>
  </p>
  <img
    class="card-image w-64 h-64"
    src={pokemon.sprites["front_default"]}
    alt={pokemon.name}
  />
</div>
