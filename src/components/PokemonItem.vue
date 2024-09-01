<script setup lang="ts">
import StarImage from "./StarImage.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  isFav: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits<{
  (e: "toggleFav"): void;
  (e: "openModal"): void;
}>();

</script>

<template>
  <li>
    <button
      type="button"
      class="flex items-center gap-4 justify-between w-full capitalize h-14 text-xl rounded-md bg-white pl-5 pr-3"
    >
      <span @click="emit('openModal')">{{ name }}</span>

      <div
        class="flex justify-center items-center size-11 bg-soft rounded-full cursor-pointer"
      >
        <StarImage
          @click="emit('toggleFav')"
          :class="isFav ? 'fill-favorite' : 'fill-disabled'"
        />
      </div>
    </button>
  </li>
</template>
