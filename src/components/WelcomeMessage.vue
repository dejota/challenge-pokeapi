<script setup lang="ts">
import PikachuImage from "./PikachuImage.vue";
import ButtonBase from "./ButtonBase.vue";
import router from "../router";

const goToListView = () => {
  router.push({ name: 'list' })
}
</script>

<template>
  <div class="flex flex-col items-center">
    <PikachuImage />
    <h1 class="font-bold text-[26px] mt-14">Welcome to Pokédex</h1>
    <p class="text-lg max-w-[560px] text-center mt-7">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    <ButtonBase @click="goToListView">Get started</ButtonBase>
  </div>
</template>