import { error } from "@sveltejs/kit";
import { getPokemonById } from "#lib/pokestore.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const pokemon = await getPokemonById(params.id);

  if (!pokemon) {
    error(404, "Pokemon not found");
  }

  return { pokemon };
};
