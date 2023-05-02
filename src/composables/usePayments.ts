import { ref, type Ref } from 'vue';

export interface Payment {
  id: number,
  paymentItems: PaymentItem[]
}

export interface PaymentItem {
  id: number,
  amount: number,
  items: string,
  // TODO: 汎用的な型にする
  taxRate: { id: number, value: string },
  payedAt: string
}

const payments: Ref<Payment[]> = ref([
  {
    id: 1,
    paymentItems: [
      {
        id: 1,
        amount: 1000,
        items: '商品1',
        taxRate: { id: 0, value: '' },
        payedAt: '2023-04-27'
      }
    ]
  },
  {
    id: 2,
    paymentItems: [
      {
        id: 2,
        amount: 5000,
        items: '商品2',
        taxRate: { id: 0, value: '' },
        payedAt: '2023-04-27'
      }
    ]
  },
  {
    id: 3,
    paymentItems: [
      {
        id: 3,
        amount: 500,
        items: '商品3',
        taxRate: { id: 0, value: '' },
        payedAt: '2023-04-27'
      }
    ]
  }
])

export const usePayments = () => {
  return {
    payments: payments
  }
};
