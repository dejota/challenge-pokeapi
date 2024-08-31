<script setup lang="ts">
import { onMounted, ref } from "vue";
import LoadingPokeball from "../components/LoadingPokeball.vue";
import PokemonItem from "../components/PokemonItem.vue";
import { getPokemonList } from "../utils/PokemonService";
import { PokemonData } from "../types/PokemonResponse";
import ButtonBase from "../components/ButtonBase.vue";
import ListImage from "../components/ListImage.vue";
import StarImage from "../components/StarImage.vue";
import InputField from "../components/InputField.vue";
import SearchImage from "../components/SearchImage.vue";

const showLoading = ref(false);

const showError = ref(false);

const text = ref("");

const showFavorites = ref(false);

const pokemon = ref<PokemonData[]>([]);

onMounted(async () => {
  showLoading.value = true;

  const response = await getPokemonList();

  if (!response) {
    showError.value = true;
  } else {
    pokemon.value = response.data.results;
  }

  setTimeout(() => {
    showLoading.value = false;
  }, 500);
});
</script>

<template>
  <div class="h-dvh relative">
    <div v-if="showLoading" class="flex items-center justify-center h-full">
      <LoadingPokeball class="animate-spin" />
    </div>

    <template v-else>
      <div class="flex justify-center px-7 max-w-xl mx-auto mb-2">
        <InputField
          id="search-page-input"
          ref="InputComponent"
          v-model="text"
          autocomplete="off"
          clear
          hide-errors
          class="relative max-w-lg [&_input]:pl-12"
          placeholder="Search"
        >
        <SearchImage class="absolute left-3 top-1 z-30 size-5 stroke-tertiary lg:top-3.5" />
        </InputField>
      </div>

      <ul class="flex flex-col px-7 pb-24 gap-2 max-w-xl mx-auto">
        <PokemonItem
          v-for="(singlePokemon, i) in pokemon"
          :key="i"
          :name="singlePokemon.name"
          :url="singlePokemon.url"
        />
      </ul>
      <div
        class="flex justify-center gap-2 *:min-w-[150px] fixed bottom-0 left-0 w-full bg-white h-20 items-center shadow-center"
      >
        <ButtonBase
          class="gap-2"
          :class="{ 'bg-disabled': showFavorites }"
          @click="showFavorites = false"
          ><ListImage />All</ButtonBase
        >
        <ButtonBase
          class="gap-2"
          :class="{ 'bg-disabled': !showFavorites }"
          @click="showFavorites = true"
          ><StarImage class="fill-white" />Favorites</ButtonBase
        >
      </div>
    </template>
  </div>
</template>
