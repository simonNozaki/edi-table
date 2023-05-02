<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  modelValue: number
}
interface Emits {
  (e: 'update:modelValue', newValue: number): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0
})
const emits = defineEmits<Emits>()

const value = computed<number>({
  get: () => props.modelValue,
  set: (newValue: number) => {
    emits('update:modelValue', newValue)
  }
})
</script>

<template>
  <input type="number" v-model="value">
</template>

<style scoped>
/* ブラウザ固有の見た目消す */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] { 
  -moz-appearance: textfield; 
}
input {
  @apply px-3 py-2 w-full rounded border border-gray-300 hover:shadow;
}
</style>
