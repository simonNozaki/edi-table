<script setup lang="ts">
interface Props {
  textAlign?: string
}

const props = withDefaults(defineProps<Props>(), {
  textAlign: 'center'
})

const classes = {
  [props.textAlign]: true
};
</script>

<template>
  <div class="inline-block cell" :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped>
.cell {
  @apply w-full bg-teal-200 text-gray-800 p-1 font-semibold;
}

.center {
  @apply text-center;
}

.left {
  @apply text-left;
}
</style>
