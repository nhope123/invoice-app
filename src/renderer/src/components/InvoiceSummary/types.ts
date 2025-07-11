interface Summary {
  label: string
  value: number | string
}

interface InvoiceSummaryProps {
  totalValue: number
  totalText: string
  summary: Summary[]
}

export type { InvoiceSummaryProps, Summary }
