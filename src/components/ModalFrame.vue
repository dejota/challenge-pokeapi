<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
  },
});
const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "close"): void;
}>();

const dialogElement = ref<HTMLDialogElement | null>(null);

const open = () => {
  emit("update:show", true);
  dialogElement.value?.showModal();
};
const close = () => {
  emit("update:show", false);
  emit("close");
  dialogElement.value?.close();
};

const handleClick = (payload: MouseEvent) => {
  if (payload.target === payload.currentTarget) close();
};

watch(
  () => props.show,
  (show) => {
    if (show) open();
    else close();
  }
);

onMounted(() => {
  dialogElement.value?.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") close();
  });
});
</script>

<template>
  <dialog
    ref="dialogElement"
    class="rounded-xl shadow-md outline-none backdrop:bg-[black] backdrop:bg-opacity-50 backdrop:backdrop-blur-sm"
    @click="handleClick"
  >
    <slot :close="close" />
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  inset-inline-start: 0px;
  inset-inline-end: 0px;
  height: fit-content;
  margin: auto;
}
</style>
