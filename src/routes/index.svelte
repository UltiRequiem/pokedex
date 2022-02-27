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
    class="text-4xl text-center my-8 uppercase text-5xl font-extrabold
    text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600"
  >
    <a href="https://ultirequiem.com/">UltiRequiem</a> Pokedex
  </h1>
  <input
    class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
    bind:value={searchTerm}
    placeholder="Search Pokemon"
  />
  <div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    {#each filteredPokemon as pokemon}
      <PokemonCard {pokemon} />
    {/each}
  </div>

  {#if !searchTerm}
    <button
      on:click={fetchPokemon}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg mt-2 mb-4"
    >
      Load More Pokemon
    </button>
  {/if}
</main>
