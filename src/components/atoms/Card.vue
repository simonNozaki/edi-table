<script setup lang="ts">
interface Props {
  clickable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  clickable: false
})
const classes = {
  clickable: props.clickable
}
</script>

<template>
  <div class="card" :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped lang="css">
.card {
  @apply bg-white border border-gray-300 rounded p-2;
}

.clickable {
  @apply hover:bg-gray-100 cursor-pointer;
}
</style>
