<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  modelValue: string
}
interface Emits {
  (e: 'update:modelValue', newValue: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})
const emits = defineEmits<Emits>()

const value = computed<string>({
  get: () => props.modelValue,
  set: (newValue: string) => {
    emits('update:modelValue', newValue)
  }
})
</script>

<template>
  <input type="text" v-model="value">
</template>

<style scoped>
input {
  @apply px-3 py-2 w-full rounded border border-gray-300 hover:shadow;
}
</style>
