<script setup lang="ts">
import Card from './atoms/Card.vue';
import Button from './atoms/Button.vue';
import SideSheet from '@/components/SideSheet.vue';
import TextInput from './atoms/TextInput.vue';
import NumberInput from './atoms/NumberInput.vue';
import Select from './atoms/Select.vue';
import InputLabel from './atoms/InputLabel.vue';
import { Payment, usePayments } from '@/composables/usePayments';
import { useTaxRates } from '@/composables/useTaxRates';
const { getItemNamesById, payments } = usePayments()
const { taxRates } = useTaxRates()

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

const onSelectTaxRate = (id: number, e: { id: number, value: string }) => {
  const payment = payments.value.filter((p) => p.id === id).at(0)
  if (payment) {
    payment.taxRate = e
  }
};

const isOpenSideSheet = ref(false)
const selectedPayment = ref<Payment>()
</script>

<template>
  <div>
    <SideSheet v-if="isOpenSideSheet">
      <div class="p-3">
        <div class="">
          <Button order="secondary" @click="closeSideSheet">閉じる</Button>
        </div>
        <div class="m-5 grid grid-rows-3 gap-5">
          <div>
            <InputLabel id="item-names">商品名</InputLabel>
            <TextInput :model-value="getItemNamesById(selectedPayment?.id ?? 0)" id="item-names" />
          </div>
          <div>
            <InputLabel id="amount">支払金額</InputLabel>
            <NumberInput :model-value="selectedPayment?.amount ?? 0" id="amount" />
          </div>
          <div>
            <InputLabel id="tax-rate">適用税率</InputLabel>
            <Select :options="taxRates" @select="onSelectTaxRate(selectedPayment?.id ?? 0, $event)" id="tax-rate" />
          </div>
        </div>
        <Button>更新する</Button>
      </div>
    </SideSheet>
    <div v-for="payment in props.values" :key="payment.id">
      <Card clickable @click="openSideSheet(payment)">
        <div class="grid card-grid">
          <div>
            <h3 class="card-title">
              {{ getItemNamesById(payment.id) }}
            </h3>
            <span class="card-id">{{ payment.id }}</span>
          </div>
          <div class="ml-2">
            <p>¥ {{ payment.amount }}</p>
            <p>税 {{ payment.taxRate.value }}</p>
            <p>支払日 {{ payment.payedAt }}</p>
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
  grid-template-columns: 152px 1fr;
}
</style>
