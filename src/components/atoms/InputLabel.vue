<script setup lang="ts">
interface Props {
  id: string
}
const props = defineProps<Props>()
</script>

<template>
  <label :for="props.id"> <slot></slot> </label>
</template>

<style scoped>
label {
  @apply text-sm text-gray-500;
}
</style>
