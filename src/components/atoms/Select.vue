<script setup lang="ts">
interface Option {
  id: number
  value: string
}

interface Props<T> {
  options: T[]
}

interface Emits {
  (e: 'select', id: number): () => void
}

const props = withDefaults(defineProps<Props<Option>>(), {
  options: () => []
})
const emits = defineEmits<Emits>()

// TODO: 本当は型をちゃんとつけたい
const onChange = (e: any) => {
  const option = props.options.filter((o) => o.value === e.target.value).at(0)
  if (option) {
    emits('select', option.id);
  }
}
</script>

<template>
  <select @change="onChange">
    <option v-for="option in props.options" :key="option.id" :value="option.id">
      {{ option.value }}
    </option>
  </select>
</template>

<style scoped>
select {
  @apply px-3 py-2 rounded border border-gray-300 h-full w-full hover:shadow;
}
</style>
