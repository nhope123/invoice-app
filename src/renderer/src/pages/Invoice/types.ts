import type { TableData } from '../../components/ProjectBreakdown/types'

interface ProjectType {
  id: number | string
  name: string
  tasks: TableData[]
}



export type { ProjectType }

