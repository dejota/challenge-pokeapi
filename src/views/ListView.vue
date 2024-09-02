<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import BackgroundImage from "@/components/BackgroundImage.vue";
import ButtonBase from "@/components/ButtonBase.vue";
import CloseButton from "@/components/CloseButton.vue";
import EmptyMessage from "@/components/EmptyMessage.vue";
import InputField from "@/components/InputField.vue";
import ListImage from "@/components/ListImage.vue";
import LoadingPokeball from "@/components/LoadingPokeball.vue";
import ModalFrame from "@/components/ModalFrame.vue";
import PokemonItem from "@/components/PokemonItem.vue";
import SearchImage from "@/components/SearchImage.vue";
import StarImage from "@/components/StarImage.vue";
import { getPokemon, getPokemonList } from "@/utils/PokemonService";
import { PokemonTypes } from "@/utils/PokemonTypes";
import { SinglePokemon, SinglePokemonExtended } from "@/types/PokemonResponse";
import { useFavoritesStore } from "@/stores";

const favoritesStore = useFavoritesStore();

const toggleFavorite = (name: string) => {
  favoritesStore.toggleFavorite(name);
};

const showLoading = ref(false);

const showError = ref(false);

const text = ref("");

const showFavorites = ref(false);

const pokemon = ref<SinglePokemonExtended[]>([]);

const allPokemon = computed(() => {
  return pokemon.value.filter((p) => {
    if (text.value.length) {
      return p.name.toLowerCase().includes(text.value.toLowerCase());
    } else {
      return p;
    }
  });
});

const allFavorites = computed(() => {
  return pokemon.value.filter((p) => {
    if (text.value.length) {
      return (
        p.favorite && p.name.toLowerCase().includes(text.value.toLowerCase())
      );
    } else {
      return p.favorite;
    }
  });
});

const isFavorite = (name: string) => {
  const fav = allFavorites.value.some((p) => p.name === name);

  return fav;
};

const showAll = () => {
  showFavorites.value = false;
};

const showOnlyFavorites = () => {
  showFavorites.value = true;
};

const reset = () => {
  text.value = "";
};

const showModal = ref(false);

const tempPokemonData = ref<SinglePokemon | null>(null);

const openModal = async (name: string) => {
  const getSinglePokemon = await getPokemon(name);

  if (!getSinglePokemon) {
    showError.value = true;
  } else {
    tempPokemonData.value = {
      name: getSinglePokemon.name,
      height: getSinglePokemon.height,
      weight: getSinglePokemon.weight,
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              getSinglePokemon.sprites.other["official-artwork"]
                .front_default,
          },
        },
      },
      types: [...getSinglePokemon.types],
    };

    showModal.value = true;
  }
};

const closeModal = () => {
  tempPokemonData.value = null;
  showModal.value = false;
};

const copy = async (pokemon: SinglePokemon) => {
  await navigator.clipboard.writeText(`${pokemon.name}, ${pokemon.height}, ${pokemon.weight}, ${PokemonTypes(pokemon.types)}`);
}

onMounted(async () => {
  showLoading.value = true;

  const response = await getPokemonList();

  if (!response) {
    showError.value = true;
  } else {
    pokemon.value = response.results.map((item: any) => {
      return {
        name: item.name,
        height: 0,
        weight: 0,
        sprites: {
          other: {
            "official-artwork": {
              front_default: "",
            },
          },
        },
        types: [],
        favorite: false,
        url: item.url,
      } as SinglePokemonExtended;
    });

    favoritesStore.setPokemonList(pokemon.value);
  }

  // Added 1500 milliseconds of delay to simulate slow response from the API in order to display the pokeball loading
  setTimeout(() => {
    showLoading.value = false;
  }, 1500);
});
</script>

<template>
  <div class="h-dvh relative">
    <div v-if="showLoading" class="flex items-center justify-center h-full">
      <LoadingPokeball class="animate-spin" />
    </div>

    <template v-else>
      <div class="mx-auto max-w-lg w-full px-7">
        <InputField
          id="search-page-input"
          ref="InputComponent"
          v-model="text"
          class="h-12 my-10"
          placeholder="Search"
        >
          <SearchImage
            class="absolute left-3 top-3 z-30 size-5 stroke-tertiary lg:top-3.5"
          />
        </InputField>

        <EmptyMessage
          v-if="
            (!showFavorites && !allPokemon.length) ||
            (showFavorites && !allFavorites.length) ||
            showError
          "
          @reset="reset()"
        />

        <ul v-else class="flex flex-col pb-24 gap-2">
          <PokemonItem
            v-for="(singlePokemon, i) in !showFavorites
              ? allPokemon
              : allFavorites"
            :key="i"
            :name="singlePokemon.name"
            :url="singlePokemon.url"
            :isFav="singlePokemon.favorite"
            @toggleFav="toggleFavorite(singlePokemon.name)"
            @openModal="openModal(singlePokemon.name)"
          />
        </ul>

        <ModalFrame
          v-model:show="showModal"
          class="w-4/5 max-w-[456px]"
          @close="closeModal"
        >
          <div
            v-if="showModal && tempPokemonData"
            class="w-full overflow-x-hidden"
          >
            <div
              class="relative flex *:absolute h-56 justify-center items-center"
            >
              <BackgroundImage class="top-0 left-0 -translate-x-[170px]" />

              <img
                :src="
                  tempPokemonData.sprites.other['official-artwork']
                    .front_default
                "
                class="size-44"
              />
              <CloseButton class="top-4 right-4" @click="closeModal" />
            </div>

            <div
              class="flex flex-col font-medium text-secondary *:border-b *:border-gray *:leading-10 px-7 pt-2 pb-5"
            >
              <div class="capitalize">
                <span class="font-bold">Name:</span> {{ tempPokemonData.name }}
              </div>
              <div class="capitalize">
                <span class="font-bold">Weight:</span>
                {{ tempPokemonData.weight }}
              </div>
              <div class="capitalize">
                <span class="font-bold">Height:</span>
                {{ tempPokemonData.height }}
              </div>
              <div class="capitalize">
                <span class="font-bold">Types:</span>
                {{ PokemonTypes(tempPokemonData.types) }}
              </div>
            </div>

            <div class="flex justify-center md:justify-between items-center gap-4 pb-5 md:px-7">
              <ButtonBase @click="copy(tempPokemonData)">Share to my friends</ButtonBase>

              <div
                class="flex justify-center items-center size-11 bg-soft rounded-full cursor-pointer"
              >
                <StarImage
                  :class="
                    isFavorite(tempPokemonData.name)
                      ? 'fill-favorite'
                      : 'fill-disabled'
                  "
                  @click="toggleFavorite(tempPokemonData.name)"
                />
              </div>
            </div>
          </div>
        </ModalFrame>
      </div>

      <div
        v-if="!showError"
        class="flex justify-center gap-2 *:min-w-[150px] fixed bottom-0 left-0 w-full bg-white h-20 items-center shadow-center"
      >
        <ButtonBase
          class="gap-2"
          :class="{ 'bg-disabled': showFavorites }"
          @click="showAll"
        >
          <ListImage />All
        </ButtonBase>

        <ButtonBase
          class="gap-2"
          :class="{ 'bg-disabled': !showFavorites }"
          @click="showOnlyFavorites"
        >
          <StarImage class="fill-white" />Favorites
        </ButtonBase>
      </div>
    </template>
  </div>
</template>
