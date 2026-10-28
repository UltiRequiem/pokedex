<script lang="ts">
  import { fade } from "svelte/transition";
  import { resolve } from "$app/paths";
  import type { PokemonSummary } from "#lib/pokestore.js";

  let { pokemon }: { pokemon: PokemonSummary } = $props();
</script>

<a
  class="flex list-none flex-col items-center rounded-md bg-gray-100 p-6 text-center text-gray-800 shadow-sm hover:bg-blue-100 hover:shadow-md"
  href={resolve("/pokemon/[id]", { id: String(pokemon.id) })}
  transition:fade
>
  <img class="h-64 w-64" src={pokemon.image} alt={pokemon.name} />
  <h2 class="text-2xl uppercase">{pokemon.id}. {pokemon.name}</h2>
</a>
