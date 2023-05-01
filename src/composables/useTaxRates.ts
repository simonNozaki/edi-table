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

export const useTaxRates = () => {
  return {
    taxRates: taxRates
  }
}
