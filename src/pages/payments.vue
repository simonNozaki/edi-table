<script setup lang="ts">
import PaymentsList from '@/components/PaymentsList.vue';
import { usePayments } from '@/composables/usePayments';
const { payments } = usePayments()
</script>

<template>
  <PaymentsList :values="payments" />
</template>
