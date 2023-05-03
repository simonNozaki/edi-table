<script setup lang="ts">
import Button from './atoms/Button.vue';
import EditableCell from './EditableCell.vue';
import NumberInput from './atoms/NumberInput.vue';
import TextInput from './atoms/TextInput.vue';
import Select from './atoms/Select.vue';
import EditableHeaderCell from './EditableHeaderCell.vue';
import { usePayments } from '@/composables/usePayments';
import { useTaxRates } from '@/composables/useTaxRates';
const { payments } = usePayments()
const { taxRates } = useTaxRates()

const onSelectTaxRate = (id: number, e: { id: number, value: string }) => {
  const payment = payments.value[0].paymentItems.filter((p) => p.id === id).at(0)
  if (payment) {
    payment.taxRate = e
  }
};

const onClickAddLine = () => {
  const maxId = payments.value
    .map((p) => p.id)
    .sort((lhs, rhs) => lhs > rhs ? 1 : -1)
    .at(0) ?? 0
  payments.value[0].paymentItems.push({
    id: maxId,
    amount: 0,
    quantity: 0,
    total: 0,
    items: '',
    taxRate: { id: 0, value: '' },
    payedAt: new Date().toDateString()
  })
};
</script>

<template>
  <div>
    <Button @click="onClickAddLine">行を追加 +</Button>
    <div class="w-full">
      <div class="grid table-row">
        <div></div>
        <EditableHeaderCell>#</EditableHeaderCell>
        <EditableHeaderCell>支払金額</EditableHeaderCell>
        <EditableHeaderCell>商品名</EditableHeaderCell>
        <EditableHeaderCell>税率</EditableHeaderCell>
        <EditableHeaderCell>支払日</EditableHeaderCell>
      </div>
      <!--親要素いっぱいに-->
      <div class="grid table-row" v-for="(payment, i) in payments[0].paymentItems" :key="i">
        <div class="m-auto">
          <Button order="secondary">-</Button>
        </div>
        <EditableCell>{{ i }}</EditableCell>
        <EditableCell>
          <NumberInput v-model="payment.amount" />
        </EditableCell>
        <EditableCell>
          <TextInput v-model="payment.items" />
        </EditableCell>
        <EditableCell>
          <Select :options="taxRates" @select="onSelectTaxRate(payment.id, $event)" />
        </EditableCell>
        <EditableCell>
          <p>{{ payment.payedAt }}</p>
        </EditableCell>
      </div>
    </div>
  </div>
</template>

<style>
/* 行はホバーで位置を明示する: https://m2.material.io/components/data-tables#anatomy */
.table-row {
  @apply hover:bg-gray-100;
  grid-template-columns: 52px 52px repeat(4, minmax(0, 1fr));
}
</style>
