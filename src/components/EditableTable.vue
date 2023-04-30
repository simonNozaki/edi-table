<script setup lang="ts">
import Button from './atoms/Button.vue';
import EditableCell from './EditableCell.vue';
import NumberInput from './atoms/NumberInput.vue';
import TextInput from './atoms/TextInput.vue';
import Select from './atoms/Select.vue';
import EditableHeaderCell from './EditableHeaderCell.vue';
import { usePayments, Payment } from '@/composables/usePayments';
const { payments } = usePayments()

const taxRates: { id: number, value: string }[] = [
  {
    id: 1,
    value: '10%'
  },
  {
    id: 2,
    value: '8%'
  },
  {
    id: 3,
    value: '0%'
  }
]

const onSelectTaxRate = (id: number, e: { id: number, value: string }) => {
  const payment = payments.value.filter((p) => p.id === id).at(0)
  if (payment) {
    payment.taxRate = e
  }
};

const onClickAddLine = () => {
  const maxId = payments.value
    .map((p) => p.id)
    .sort((lhs, rhs) => lhs > rhs ? 1 : -1)
    .at(0) ?? 0
  payments.value.push({
    id: maxId,
    amount: 0,
    items: [],
    taxRate: { id: 0, value: '' },
    payedAt: new Date().toDateString()
  })
};

const getItemNames = (payment: Payment): string => {
  return payment.items.length > 0 ? payment.items.reduce((lhs, rhs) => `${lhs}, ${rhs}`) : ''
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
      <div class="grid table-row" v-for="(payment, i) in payments" :key="i">
        <div class="m-auto">
          <Button order="secondary">-</Button>
        </div>
        <EditableCell>{{ i }}</EditableCell>
        <EditableCell>
          <NumberInput :model-value="payment.amount" />
        </EditableCell>
        <EditableCell>
          <TextInput :model-value="getItemNames(payment)" />
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
