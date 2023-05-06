import { ref, type Ref } from 'vue';
import { useTaxRates, TaxRate } from '@/composables/useTaxRates';
const { defaultTaxRate, getTaxRatePercentile } = useTaxRates()

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
        total: 1000,
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

const getMaxPaymentId = (): number => {
  const maxPaymentId = payments.value.map((p) => p.id).sort((lhs, rhs) => lhs > rhs ? -1 : 1).at(0)
  if (maxPaymentId) {
    return maxPaymentId + 1;
  } else {
    return 1;
  }
};

const calculateCurrentTotal = (paymentItem: PaymentItem): number => {
  return paymentItem.amount * paymentItem.quantity * (1 + getTaxRatePercentile(paymentItem.taxRate.id) / 100);
};

export const usePayments = () => {
  return {
    payments,
    getMaxPaymentId,
    calculateCurrentTotal
  }
};
