<script setup lang="ts">
import Card from '@/components/atoms/Card.vue';
import PaymentsList from '@/components/PaymentsList.vue';
import { usePayments } from '@/composables/usePayments';
const { payments } = usePayments()
</script>

<template>
  <Card>
    <h1 class="title">支払明細</h1>
    <PaymentsList :values="payments" />
  </Card>
</template>

<style lang="css" scoped>
.title {
  @apply my-4 text-2xl font-bold;
}
</style>
