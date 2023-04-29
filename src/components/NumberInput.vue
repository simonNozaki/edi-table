<script setup lang="ts">
interface Props {
  modelValue: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0
})
</script>

<template>
  <input type="number" v-model="props.modelValue">
</template>

<style scoped>
/* ブラウザ固有の見た目消す */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] { 
  -moz-appearance: textfield; 
}
input {
  @apply p-1 w-full rounded border border-gray-300 hover:shadow;
}
</style>
