<script setup lang="ts">
import Card from './atoms/Card.vue';
import Button from './atoms/Button.vue';
import SideSheet from '@/components/SideSheet.vue';
import TextInput from './atoms/TextInput.vue';
import NumberInput from './atoms/NumberInput.vue';
import Select from './atoms/Select.vue';
import InputLabel from './atoms/InputLabel.vue';
import { Payment } from '@/composables/usePayments';
import { useSnackBar } from '@/composables/useSnackBar';
import { useTaxRates } from '@/composables/useTaxRates';
const { taxRates } = useTaxRates()
const { snackbar } = useSnackBar()

interface Props {
  payment: Payment
}

interface Emits {
  (e: 'close'): void
  (e: 'submit'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const close = () => {
  emits('close')
}

const onSelectTaxRate = (paymentItemId: number, e: { id: number, value: string }) => {
  const paymentItem = props.payment.paymentItems.filter((item) => item.id === paymentItemId).at(0)
  if (!paymentItem) return
  paymentItem.taxRate = e
};

const savePaymentItems = () => {
  // TODO: 永続化など保存系のアクションをセットする、保存できたらスナックバー

  snackbar.push({ message: '明細を更新しました', type: 'success' })
  close()
}
</script>

<template>
  <SideSheet>
    <div class="p-3">
      <div class="my-5">
        <Button order="secondary" size="small" @click="close">閉じる</Button>
      </div>
      <Card
        v-for="(paymentItem, i) in props.payment?.paymentItems"
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
          <Select v-model="paymentItem.taxRate" :options="taxRates" @select="onSelectTaxRate(paymentItem?.id ?? 0, $event)" id="tax-rate" />
        </div>
      </Card>
      <Button @click="savePaymentItems">更新する</Button>
    </div>
  </SideSheet>
</template>
