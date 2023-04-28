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
  @apply p-1 w-full rounded bg-gray-100 hover:shadow;
}
</style>
