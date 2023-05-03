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
  @apply w-1/2 h-full overflow-y-scroll bg-white absolute top-0 right-0 z-50;
}

.sheet-background {
  @apply fixed top-0 left-0 z-30 w-full h-full bg-gray-500 opacity-50;
}
</style>
