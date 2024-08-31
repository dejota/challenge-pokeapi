<script setup lang="ts">
import PikachuImage from "./PikachuImage.vue";
import ButtonBase from "./ButtonBase.vue";
</script>

<template>
  <div class="flex flex-col items-center">
    <PikachuImage />
    <h1 class="font-bold text-[26px] mt-14">Welcome to Pokédex</h1>
    <p class="text-lg max-w-[560px] text-center mt-7">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
    <ButtonBase>Get started</ButtonBase>
  </div>
</template>