<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputElement = ref<HTMLInputElement | null>(null)
const text = ref('')

const handleInput = () => {
  if (!inputElement.value) return
  text.value = inputElement.value.value.trim()
  emit('update:modelValue', text.value)
}
</script>

<template>
  <div class="relative">
    <input
      :id="id"
      ref="inputElement"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      class="size-full rounded-md pl-12 shadow-input"
    />
    <slot />
  </div>
</template>
