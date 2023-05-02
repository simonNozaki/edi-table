<script setup lang="ts">
interface Props {
  order?: string;
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  order: 'primary',
  size: 'medium'
})

const classes = {
  [props.order]: true,
  [props.size]: true
}
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  @apply rounded;
}

.primary {
  @apply bg-yellow-400 text-blue-950 font-semibold hover:bg-yellow-500;
}

.secondary {
  @apply bg-gray-300 hover:bg-gray-400;
}

.medium {
  @apply px-3 py-2;
}

.small {
  @apply px-2 py-1;
}
</style>
