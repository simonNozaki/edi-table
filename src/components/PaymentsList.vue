<script setup lang="ts">
import Card from './atoms/Card.vue';
import Button from './atoms/Button.vue';
import PaymentEditSideSheet from './PaymentEditSideSheet.vue';
import PaymentCreateSideSheet from './PaymentCreateSideSheet.vue';
import Chip from './atoms/Chip.vue';
import CalendarCheck from 'vue-material-design-icons/CalendarCheck.vue';
import { Payment, usePayments } from '@/composables/usePayments';
const { payments, calculateCurrentTotal } = usePayments()

interface Props {
  values: Payment[]
}

const props = defineProps<Props>()

const openEditSideSheet = (payment: Payment) => {
  closeSideSheet()
  selectedPayment.value = payment
  isOpenEditSideSheet.value = true
}

const openCreateSideSheet = () => {
  closeSideSheet()
  isOpenCreateSideSheet.value = true
}

const closeSideSheet = () => {
  isOpenEditSideSheet.value = false
  isOpenCreateSideSheet.value = false
}

const isOpenEditSideSheet = ref(false)
const isOpenCreateSideSheet = ref(false)
const selectedPayment = ref<Payment>(payments.value[0])
</script>

<template>
  <div>
    <PaymentEditSideSheet :payment="selectedPayment" v-if="isOpenEditSideSheet" @close="closeSideSheet" />
    <PaymentCreateSideSheet v-if="isOpenCreateSideSheet" @close="closeSideSheet" />
    <Button @click="openCreateSideSheet">行を追加する</Button>
    <div v-for="payment in props.values" :key="payment.id">
      <Card clickable @click="openEditSideSheet(payment)" class="my-2">
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
                <p>
                  {{ paymentItem.items }} ¥{{ calculateCurrentTotal(paymentItem) }}
                </p>
                <p class="text-sm my-1">
                  ¥ {{ paymentItem.amount }} × 数量 {{ paymentItem.quantity }}
                </p>
                <div class="flex flex-row my-1">
                  <p class="text-sm mr-2">
                    <Chip>税率</Chip>
                    <span class="ml-1">
                      {{ paymentItem.taxRate.value }}
                    </span>
                  </p>
                  <p class="text-sm">
                    <CalendarCheck class="inline-block" />
                    <span class="ml-1">
                      {{ paymentItem.payedAt }}
                    </span>
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
