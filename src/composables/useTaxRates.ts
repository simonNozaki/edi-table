import { ref, type Ref } from 'vue'

export interface TaxRate {
  id :number,
  value: string,
  description?: string
}

const taxRates: Ref<TaxRate[]> = ref([
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
])

const defaultTaxRate = taxRates.value[0]

const getTaxRatePercentile = (id: number): number => {
  const tr = taxRates.value.filter((rate) => rate.id === id).at(0)
  // valueの一文字目を取り出して数値として返す
  return tr ? Number.parseInt(tr.value.replace("%", "")) : 10
}

const getTaxRateOrDefault = (id: number): TaxRate => {
  const tr = taxRates.value.filter((tr) => tr.id === id).at(0)
  return tr ? tr : defaultTaxRate;
};

export const useTaxRates = () => {
  return {
    taxRates,
    defaultTaxRate,
    getTaxRateOrDefault,
    getTaxRatePercentile
  }
}
