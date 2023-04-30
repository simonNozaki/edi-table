import { ref, type Ref } from 'vue';

export interface Payment {
  id: number,
  amount: number,
  items: string[],
  // TODO: 汎用的な型にする
  taxRate: { id: number, value: string },
  payedAt: string
}

const payments: Ref<Payment[]> = ref([
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

const getItemNamesById = (id: number): string => {
  const payment = payments.value.filter((p) => p.id === id)?.at(0);
  if (!payment) {
    return '';
  }
  return payment.items.length > 0 ? payment.items.reduce((lhs, rhs) => `${lhs}, ${rhs}`) : ''
}

export const usePayments = () => {
  return {
    payments: payments,
    getItemNamesById: getItemNamesById
  }
};
