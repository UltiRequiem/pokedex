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

<div class="m-10 flex flex-col items-center">
  <h1 class="my-8 text-center text-4xl uppercase">{pokemon.name}</h1>
  <p>
    Type: <strong>{pokemonType}</strong> | Height:
    <strong>{pokemon.height}</strong>
    | Weight: <strong>{pokemon.weight}</strong>
  </p>
  <img
    class="card-image h-64 w-64"
    src={pokemon.sprites["front_default"]}
    alt={pokemon.name}
  />
</div>
