<script setup lang="ts">
import { ButtonHTMLAttributes, PropType } from "vue";

defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes["type"]>,
    default: "button",
  }
});

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    :type="type"
    class="font-bold text-lg flex justify-center items-center bg-accent text-white rounded-full h-11 px-5 active:bg-accent-pressed"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
