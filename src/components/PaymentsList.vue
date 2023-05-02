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
const { payments } = usePayments()
const { taxRates } = useTaxRates()

interface Props {
  values: Payment[]
}

const props = defineProps<Props>()

const openSideSheet = (payment: Payment) => {
  isOpenSideSheet.value = true
  selectedPayment.value = payment
  console.log(selectedPayment)
}

const closeSideSheet = () => {
  isOpenSideSheet.value = false
}

const onSelectTaxRate = (id: number, paymentItemId: number, e: { id: number, value: string }) => {
  const payment = payments.value.filter((p) => p.id === id).at(0)
  if (!payment) return
  const paymentItem = payment.paymentItems.filter((item) => item.id === paymentItemId).at(0)
  if (!paymentItem) return
  paymentItem.taxRate = e
};

const savePaymentItems = () => {
  // TODO: 永続化など保存系のアクションをセットする、保存できたらスナックバー

  closeSideSheet()
}

const isOpenSideSheet = ref(false)
const selectedPayment = ref<Payment>()
</script>

<template>
  <div>
    <SideSheet v-if="isOpenSideSheet">
      <div class="p-3">
        <div class="my-5">
          <Button order="secondary" size="small" @click="closeSideSheet">閉じる</Button>
        </div>
        <Card
          v-for="(paymentItem, i) in selectedPayment?.paymentItems"
          :key="paymentItem.id"
          class="mb-5">
          <div>
            {{ i + 1 }}つ目の商品 (id: {{ paymentItem.id }})
          </div>
          <div class="my-3">
            <InputLabel id="item-names">商品名</InputLabel>
            <TextInput v-model="paymentItem.items" id="item-names" />
          </div>
          <div class="my-3">
            <InputLabel id="amount">支払金額</InputLabel>
            <NumberInput v-model="paymentItem.amount" id="amount" />
          </div>
          <div class="my-3">
            <InputLabel id="tax-rate">適用税率</InputLabel>
            <Select :options="taxRates" @select="onSelectTaxRate(selectedPayment?.id ?? 0, paymentItem?.id ?? 0, $event)" id="tax-rate" />
          </div>
        </Card>
        <Button @click="savePaymentItems">更新する</Button>
      </div>
    </SideSheet>
    <div v-for="payment in props.values" :key="payment.id">
      <Card clickable @click="openSideSheet(payment)" class="my-2">
        <div class="grid card-grid">
          <div>
            <h3 class="card-title">
              ¥{{ payment.paymentItems.map((elm) => elm.amount).reduce((lhs, rhs) => lhs + rhs) }}
            </h3>
            <span class="card-id">id: {{ payment.id }}</span>
          </div>
          <Card v-for="paymentItem in payment.paymentItems" :key="paymentItem.id">
            <div class="ml-2">
              <p>{{ paymentItem.items }}</p>
              <p>¥ {{ paymentItem.amount }}</p>
              <p>税 {{ paymentItem.taxRate.value }}</p>
              <p>支払日 {{ paymentItem.payedAt }}</p>
            </div>
          </Card>
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
