import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { SinglePokemonExtended } from "@/types/PokemonResponse";

export const useFavoritesStore = defineStore("favorites", () => {
  const pokemonList = ref<SinglePokemonExtended[]>([]);

  const setPokemonList = (pokemon: SinglePokemonExtended[]) => {
    pokemonList.value = pokemon;
  };

  const toggleFavorite = (name: string) => {
    const pokemon = pokemonList.value.find(p => p.name === name);
    if (pokemon) {
      pokemon.favorite = !pokemon.favorite;
    }
  };

  const fetchedPokemon = computed(() => pokemonList.value);

  return {
    setPokemonList,
    toggleFavorite,
    fetchedPokemon,
  };
});
