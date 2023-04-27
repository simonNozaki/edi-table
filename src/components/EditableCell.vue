<template>
  <div class="inline-block cell">
    <slot></slot>
  </div>
</template>

<style scoped>
.cell {
  @apply w-24 h-max border;
}
</style>
