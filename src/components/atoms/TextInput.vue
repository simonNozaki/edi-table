<script setup lang="ts">
interface Props {
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})
</script>

<template>
  <input type="text" v-model="props.modelValue">
</template>

<style scoped>
input {
  @apply px-3 py-2 w-full rounded border border-gray-300 hover:shadow;
}
</style>
