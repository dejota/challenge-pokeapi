<script setup lang="ts">
import { ref, type InputHTMLAttributes, type PropType } from 'vue'
/* import type { ErrorObject } from '@vuelidate/core' */

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
  autocomplete: {
    type: String as PropType<InputHTMLAttributes['autocomplete']>,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    required: true
  },
  clear: {
    type: Boolean,
    default: false
  },
  hideErrors: {
    type: Boolean,
    default: false
  },
  maxLength: {
    type: Number,
    default: undefined
  },
  minLength: {
    type: Number,
    default: undefined
  },
  /* errors: {
    type: Array as PropType<ErrorObject[]>,
    default: () => []
  }, */
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
      :autocomplete="autocomplete"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxLength"
      :minlength="minLength"
      @input="handleInput"
    />
    <slot />
    <!-- <div v-if="!hideErrors" class="mt-0.5 h-5 px-2">
      <ErrorMessage :errors="errors" />
    </div> -->
  </div>
</template>
