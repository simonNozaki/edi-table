<script setup lang="ts">
import Button from './Button.vue';
import EditableCell from './EditableCell.vue';
import NumberInput from './NumberInput.vue';
import TextInput from './TextInput.vue';
import Select from './Select.vue';
import EditableHeaderCell from './EditableHeaderCell.vue';
import { ref, type Ref } from 'vue';

interface Payments {
  id: number,
  amount: number,
  items: string[],
  // TODO: 汎用的な型にする
  taxRate: { id: number, value: string },
  payedAt: string
}

const payments: Ref<Payments[]> = ref([
  {
    id: 1,
    amount: 1000,
    items: ['商品1'],
    taxRate: { id: 0, value: '' },
    payedAt: '2023-04-27'
  },
  {
    id: 2,
    amount: 5000,
    items: ['商品1', '商品2'],
    taxRate: { id: 0, value: '' },
    payedAt: '2023-04-27'
  },
  {
    id: 3,
    amount: 500,
    items: ['商品3'],
    taxRate: { id: 0, value: '' },
    payedAt: '2023-04-27'
  }
])

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

const getItemNames = (payment: Payments): string => {
  return payment.items.length > 0 ? payment.items.reduce((lhs, rhs) => `${lhs}, ${rhs}`) : ''
};
</script>

<template>
  <div>
    <Button @click="onClickAddLine">行を追加 +</Button>
    <div class="w-full">
      <div class="grid grid-cols-6">
        <div>
          <span>行を消すボタン追加する</span>
        </div>
        <EditableHeaderCell>#</EditableHeaderCell>
        <EditableHeaderCell>支払金額</EditableHeaderCell>
        <EditableHeaderCell>商品名</EditableHeaderCell>
        <EditableHeaderCell>税率</EditableHeaderCell>
        <EditableHeaderCell>支払日</EditableHeaderCell>
      </div>
      <!--親要素いっぱいに-->
      <div class="grid grid-cols-6 table-row" v-for="(payment, i) in payments" :key="i">
        <div>
          <!-- 行を消すボタン -->
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
}
</style>
