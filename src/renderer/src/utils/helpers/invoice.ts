import type { Summary } from '../../components/InvoiceSummary/types'
import type { TableData } from '../../components/ProjectBreakdown/types'

const SUB_TOTAL = 'Sub Total:'

interface TaskInput {
  id: string | number
  name: string
  description?: string
  duration: number
  rate: number
  amount: number
}

const generateTableData = (project: TaskInput[]): TableData[] => {
  return project.map((i) => ({
    key: String(i.id),
    task: i.name,
    hours: i.duration,
    rate: i.rate,
    amount: i.amount
  }))
}

interface ActualProjectType {
  id: number
  name: string
  description: string
  tasks: TaskInput[]
}

const generateSubtotal = (project: ActualProjectType[]): number => {
  return project.reduce((total, proj) => {
    return (
      total +
      proj.tasks.reduce((subTotal, task) => {
        const amount = typeof task.amount === 'number' ? task.amount : 0
        return subTotal + amount
      }, 0)
    )
  }, 0)
}

const generateSummaryData = (project: ActualProjectType[]): Summary[] => {
  const subTotal = {
    label: SUB_TOTAL,
    value: `$${generateSubtotal(project).toFixed(2)}`
  }
  return [subTotal]
}

export { generateSubtotal, generateSummaryData, generateTableData, SUB_TOTAL }

