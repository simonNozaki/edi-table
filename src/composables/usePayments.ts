import { ref, type Ref } from 'vue';
import { useTaxRates, TaxRate } from '@/composables/useTaxRates';
const { defaultTaxRate } = useTaxRates()

export interface Payment {
  id: number,
  paymentItems: PaymentItem[]
}

export interface PaymentItem {
  id: number,
  amount: number,
  items: string,
  quantity: number,
  total: number,
  taxRate: TaxRate,
  payedAt: string
}

const payments: Ref<Payment[]> = ref([
  {
    id: 1,
    paymentItems: [
      {
        id: 1,
        amount: 1000,
        quantity: 1,
        total: 1000,
        items: '商品1',
        taxRate: defaultTaxRate,
        payedAt: '2023-04-27'
      },
      {
        id: 2,
        amount: 1000,
        quantity: 1,
        total: 1,
        items: '商品1',
        taxRate: defaultTaxRate,
        payedAt: '2023-04-27'
      },
      {
        id: 3,
        amount: 1000,
        quantity: 1,
        total: 1000,
        items: '商品1',
        taxRate: defaultTaxRate,
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
        quantity: 1,
        total: 5000,
        items: '商品2',
        taxRate: defaultTaxRate,
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
        quantity: 1,
        total: 500,
        items: '商品3',
        taxRate: defaultTaxRate,
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
