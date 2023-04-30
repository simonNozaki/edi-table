<template>
  <div>
    <div class="sheet-background" />
    <div class="sheet">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="css">
.sheet {
  @apply w-1/2 h-full bg-white absolute right-0 z-50;
}

.sheet-background {
  @apply fixed top-0 left-0 z-30 w-full h-full bg-gray-500 opacity-50;
}
</style>
