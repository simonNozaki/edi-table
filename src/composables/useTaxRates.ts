export interface TaxRate {
  id :number,
  value: string,
  description?: string
}

const taxRates: TaxRate[] = [
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

const defaultTaxRate = taxRates[0]

export const useTaxRates = () => {
  return {
    taxRates: taxRates,
    defaultTaxRate: defaultTaxRate
  }
}
