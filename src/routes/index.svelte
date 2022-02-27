<script lang="ts">
  import PokemonCard from "../components/pokecard.svelte";
  import { pokemon, fetchPokemon } from "../pokestore";

  let searchTerm = "",
    filteredPokemon = [];

  $: {
    filteredPokemon = searchTerm
      ? $pokemon.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [...$pokemon];
  }

  fetchPokemon();
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
    {#each filteredPokemon as pokemon}
      <PokemonCard {pokemon} />
    {/each}
  </div>

  {#if !searchTerm}
    <button
      on:click={fetchPokemon}
      class="mt-2 mb-4 rounded bg-blue-500 py-2 px-4 text-lg font-bold text-white hover:bg-blue-700"
    >
      Load More Pokemon
    </button>
  {/if}
</main>
