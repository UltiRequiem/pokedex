<script>
  import { fade } from "svelte/transition";

  export let pokemon;
</script>

<a
  class="flex list-none flex-col items-center rounded-md bg-gray-100 p-6 text-center text-gray-800 shadow-sm hover:bg-blue-100 hover:shadow-md"
  href={`/pokemon/${pokemon.id}`}
  transition:fade
>
  <img class="h-64 w-64" src={pokemon.image} alt={pokemon.name} />
  <h2 class="text-2xl uppercase">{pokemon.id}. {pokemon.name}</h2>
</a>
