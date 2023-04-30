<script setup lang="ts">
interface Props {
  order?: string;
}

const props = withDefaults(defineProps<Props>(), {
  order: 'primary'
})

const classes = {
  [props.order]: true
}
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  @apply px-2 py-1 rounded;
}

.primary {
  @apply bg-teal-600 text-white font-semibold hover:bg-teal-700;
}

.secondary {
  @apply bg-gray-300 hover:bg-gray-400;
}
</style>
