<script setup lang="ts">
import Button from './Button.vue';
import EditableCell from './EditableCell.vue';
import { ref, type Ref } from 'vue'

interface Payments {
  id: number,
  amount: number,
  items: string[],
  payedAt: string
}

const payments: Ref<Payments[]> = ref([
  {
    id: 1,
    amount: 1000,
    items: ['商品1'],
    payedAt: '2023-04-27'
  },
  {
    id: 2,
    amount: 5000,
    items: ['商品1', '商品2'],
    payedAt: '2023-04-27'
  },
  {
    id: 3,
    amount: 500,
    items: ['商品3'],
    payedAt: '2023-04-27'
  }
])
</script>

<template>
  <div>
    <Button>行を追加 +</Button>
    <div>
      <div class="w-full">
        <EditableCell>#</EditableCell>
        <EditableCell>支払金額</EditableCell>
        <EditableCell>商品名</EditableCell>
        <EditableCell>支払日</EditableCell>
      </div>
      <!--親要素いっぱいに-->
      <div class="w-full" v-for="(payment, i) in payments" :key="i">
        <EditableCell>{{ i }}</EditableCell>
        <EditableCell>
          <p contenteditable="true" class="amount">{{ payment.amount }}</p>
        </EditableCell>
        <EditableCell>
          <p class="itemNames">{{ payment.items.reduce((lhs, rhs) => `${lhs}, ${rhs}`) }}</p>
        </EditableCell>
        <EditableCell>
          <p class="payedAt">{{ payment.payedAt }}</p>
        </EditableCell>
      </div>
    </div>
  </div>
</template>
