<script setup lang="ts">
interface Option {
  id: number
  value: string
}

interface Props<T> {
  options: T[]
}

interface Emits {
  (e: 'select', v: Option): () => void
}

const props = withDefaults(defineProps<Props<Option>>(), {
  options: () => []
})
const emits = defineEmits<Emits>()

// TODO: 本当は型をちゃんとつけたい
const onChange = (e: any) => {
  const option = props.options.filter((o) => o.value === e.target.value).at(0)
  if (option) {
    emits('select', option);
  }
}
</script>

<template>
  <select @change="onChange">
    <option :value="null"></option>
    <option v-for="option in props.options" :key="option.id">
      {{ option.value }}
    </option>
  </select>
</template>

<style scoped>
select, option {
  @apply w-full;
}

select {
  @apply bg-gray-100 rounded h-full w-full hover:shadow;
}
</style>
