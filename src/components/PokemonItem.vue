<script setup lang="ts">
import StarImage from './StarImage.vue';

defineProps({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <li>
    <button type="button" class="flex items-center gap-4 justify-between w-full capitalize h-14 text-xl rounded-md bg-white pl-5 pr-3"><span>{{ name }}</span>
      <div class="flex justify-center items-center size-11 bg-soft rounded-full"><StarImage class="fill-disabled" /></div>
    </button>
  </li>
</template>