<script setup lang="ts">
import Card from './atoms/Card.vue';
import Button from './atoms/Button.vue';
import PaymentEditSideSheet from './PaymentEditSideSheet.vue';
import PaymentCreateSideSheet from './PaymentCreateSideSheet.vue';
import CalendarCheck from 'vue-material-design-icons/CalendarCheck.vue';
import { Payment, usePayments } from '@/composables/usePayments';
const { payments } = usePayments()

interface Props {
  values: Payment[]
}

const props = defineProps<Props>()

const openSideSheet = (payment: Payment) => {
  isOpenSideSheet.value = true
  selectedPayment.value = payment
}

const closeSideSheet = () => {
  isOpenSideSheet.value = false
}

const isOpenSideSheet = ref(false)
const selectedPayment = ref<Payment>(payments.value[0])
</script>

<template>
  <div>
    <PaymentEditSideSheet :payment="selectedPayment" v-if="isOpenSideSheet" @close="closeSideSheet" />
    <PaymentCreateSideSheet v-if="isOpenSideSheet" @close="closeSideSheet" />
    <Button @click="openSideSheet">行を追加する</Button>
    <div v-for="payment in props.values" :key="payment.id">
      <Card clickable @click="openSideSheet(payment)" class="my-2">
        <div class="grid card-grid">
          <div>
            <h3 class="card-title">
              ¥{{ payment.paymentItems.map((elm) => elm.amount).reduce((lhs, rhs) => lhs + rhs) }}
            </h3>
            <span class="card-id">id: {{ payment.id }}</span>
          </div>
          <div>
            <Card v-for="paymentItem in payment.paymentItems" :key="paymentItem.id">
              <div class="ml-2">
                <p>{{ paymentItem.items }}</p>
                <p class="text-sm">¥ {{ paymentItem.amount }} × {{ paymentItem.quantity }}個</p>
                <div>
                  <p class="text-sm">税 {{ paymentItem.taxRate.value }}</p>
                  <p class="text-sm">
                    <CalendarCheck class="inline-block" /> {{ paymentItem.payedAt }}
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div class="p-3">
            <Button order="secondary" size="small">編集</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="css">
.card-title {
  @apply font-semibold text-lg;
}

.card-id {
  @apply text-sm;
}

.card-grid {
  grid-template-columns: 152px 1fr 80px;
}
</style>
