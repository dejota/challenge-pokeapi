<script setup lang="ts">
import { ButtonHTMLAttributes, PropType } from 'vue';

defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :type="type" :disabled="disabled"
    class="font-bold text-lg flex justify-center items-center bg-accent text-white rounded-full h-11 px-5 mt-12 active:bg-accent-pressed disabled:bg-disabled"
  >
    <slot />
  </button>
</template>
