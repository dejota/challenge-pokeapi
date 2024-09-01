<script setup lang="ts">
import ButtonBase from "./ButtonBase.vue";

const emit = defineEmits<{
  (e: "reset"): void;
}>();
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="font-bold text-[36px] mt-14">Uh-oh!</h1>
    <p class="text-xl max-w-[560px] text-center mt-3">You look lost on your journey!</p>
    <ButtonBase @click="emit('reset')" class="mt-6">Go back home</ButtonBase>
  </div>
</template>