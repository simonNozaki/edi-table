<script setup lang="ts">
import Card from './atoms/Card.vue';
import Button from './atoms/Button.vue';
import SideSheet from '@/components/SideSheet.vue';
import TextInput from './atoms/TextInput.vue';
import NumberInput from './atoms/NumberInput.vue';
import Select from './atoms/Select.vue';
import InputLabel from './atoms/InputLabel.vue';
import Minus from 'vue-material-design-icons/Minus.vue'
import { PaymentItem, usePayments } from '@/composables/usePayments';
import { useSnackBar } from '@/composables/useSnackBar';
import { useTaxRates } from '@/composables/useTaxRates';
const { taxRates, defaultTaxRate, getTaxRatePercentile, getTaxRateOrDefault } = useTaxRates()
const { snackbar } = useSnackBar()
const { payments, getMaxPaymentId, calculateCurrentTotal } = usePayments()

interface Emits {
  (e: 'close'): void
  (e: 'submit'): void
}

const emits = defineEmits<Emits>()

const close = () => {
  emits('close')
}

const savePaymentItems = () => {
  newPaymentItems.value.forEach((item) => {
    const taxRate = getTaxRatePercentile(item.taxRate.id) / 100
    item.total = item.amount * item.quantity * (1 + taxRate);
  });

  payments.value.push({
    id: getMaxPaymentId(),
    paymentItems: newPaymentItems.value
  });

  snackbar.push({ message: '明細を更新しました', type: 'success' })
  close()
}

// idは最後に裁判するのでOmitした他のプロパティのみ
const newPaymentItems = ref<PaymentItem[]>([
  {
    id: 1,
    amount: 0,
    quantity: 0,
    taxRate: defaultTaxRate,
    items: '',
    payedAt: '',
    total: 0
  }
])

const addPaymentItem = (id: number) => {
  newPaymentItems.value.push({
    id: id,
    amount: 0,
    quantity: 0,
    taxRate: defaultTaxRate,
    items: '',
    payedAt: '',
    total: 0
  })
}

const deletePaymentItem = (id :number) => {
  // 1つ以上保存させる
  if (newPaymentItems.value.length === 1) return
  const items = newPaymentItems.value.filter((item) => item.id !== id)
  if (items) {
    newPaymentItems.value = items
  }
}

const onSelectTaxRate = (id: number, e: any) => {
  const item = newPaymentItems.value.filter((item) => item.id === id).at(0)
  if (item) {
    item.taxRate = getTaxRateOrDefault(Number.parseInt(e.target.value));
  }
};
</script>

<template>
  <SideSheet>
    <div class="p-3">
      <div class="my-5">
        <Button order="secondary" size="small" @click="close">閉じる</Button>
      </div>
      <div class="my-5">
        <Button size="small" @click="addPaymentItem(newPaymentItems.length + 1)">明細を追加する</Button>
      </div>
      <Card
        v-for="(paymentItem, i) in newPaymentItems"
        :key="i"
        class="mb-5">
        <div class="flex flex-row justify-between">
          <h3>
            {{ i + 1 }}つ目の商品
          </h3>
          <Button order="secondary" size="small" @click="deletePaymentItem(paymentItem.id)">
            <Minus />
          </Button>
        </div>
        <div class="my-2">
          <InputLabel id="item-names">商品名</InputLabel>
          <TextInput v-model="paymentItem.items" id="item-names" />
        </div>
        <div class="my-2">
          <InputLabel id="amount">単価</InputLabel>
          <NumberInput v-model="paymentItem.amount" id="amount" />
        </div>
        <div class="my-2">
          <InputLabel id="quantity">数量</InputLabel>
          <NumberInput v-model="paymentItem.quantity" id="quantity" />
        </div>
        <div class="my-2">
          <InputLabel id="tax-rate">適用税率</InputLabel>
          <Select :options="taxRates" id="tax-rate" @change="onSelectTaxRate(paymentItem.id, $event)" />
        </div>
        <div class="my-2">
          <span>
            合計(税込) ¥ {{ calculateCurrentTotal(paymentItem) }}
          </span>
        </div>
      </Card>
      <Button @click="savePaymentItems">更新する</Button>
    </div>
  </SideSheet>
</template>
