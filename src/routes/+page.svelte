<script lang="ts">
  import { onMount } from "svelte";
  import PokemonCard from "#lib/components/pokecard.svelte";
  import { pokemon, fetchPokemon, startPolling } from "#lib/pokestore.js";

  let searchTerm = $state("");

  const filteredPokemon = $derived(
    searchTerm
      ? $pokemon.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [...$pokemon],
  );

  onMount(() => {
    fetchPokemon();
    return startPolling();
  });
</script>

<svelte:head>
  <title>Pokedex</title>
</svelte:head>

<main>
  <h1
    class="my-8 bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text text-center
    text-4xl text-5xl font-extrabold uppercase text-transparent"
  >
    <a href="https://ultirequiem.com/">UltiRequiem</a> Pokedex
  </h1>
  <input
    class="w-full rounded-md border-2 border-gray-200 p-4 text-lg"
    bind:value={searchTerm}
    placeholder="Search Pokemon"
  />
  <div class="grid grid-cols-1 gap-4 py-4 lg:grid-cols-2">
    {#each filteredPokemon as pokemon (pokemon.id)}
      <PokemonCard {pokemon} />
    {/each}
  </div>

  {#if !searchTerm}
    <button
      onclick={fetchPokemon}
      class="mb-4 mt-2 rounded bg-blue-500 px-4 py-2 text-lg font-bold text-white hover:bg-blue-700"
    >
      Load More Pokemon
    </button>
  {/if}
</main>
