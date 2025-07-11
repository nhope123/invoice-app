import { describe, expect, it } from 'vitest'
import {
  generateSubtotal,
  generateSummaryData,
  generateTableData,
  SUB_TOTAL
} from './invoice'

interface ActualProjectType {
  id: number
  name: string
  description: string
  tasks: Array<{
    id: number
    name: string
    description?: string
    duration: number
    rate: number
    amount: number
  }>
}

describe('Invoice Helper Functions', () => {
  // Mock data for testing
  const mockTaskInput = [
    {
      id: 1,
      name: 'Design Homepage',
      duration: 8,
      rate: 75,
      amount: 600
    },
    {
      id: 2,
      name: 'Implement Authentication',
      duration: 12,
      rate: 80,
      amount: 960
    }
  ]

  const mockProjectType: ActualProjectType[] = [
    {
      id: 1,
      name: 'Website Development',
      description: 'Website project',
      tasks: [
        {
          id: 1,
          name: 'Design Homepage',
          duration: 8,
          rate: 75,
          amount: 600
        },
        {
          id: 2,
          name: 'Implement Authentication',
          duration: 12,
          rate: 80,
          amount: 960
        }
      ]
    },
    {
      id: 2,
      name: 'Mobile App',
      description: 'Mobile app project',
      tasks: [
        {
          id: 3,
          name: 'Setup React Native',
          duration: 6,
          rate: 70,
          amount: 420
        }
      ]
    }
  ]

  describe('SUB_TOTAL constant', () => {
    it('should have the correct value', () => {
      expect(SUB_TOTAL).toBe('Sub Total:')
    })
  })

  describe('generateTableData', () => {
    it('should transform task input data to table data format', () => {
      const result = generateTableData(mockTaskInput)

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        key: '1',
        task: 'Design Homepage',
        hours: 8,
        rate: 75,
        amount: 600
      })
      expect(result[1]).toEqual({
        key: '2',
        task: 'Implement Authentication',
        hours: 12,
        rate: 80,
        amount: 960
      })
    })

    it('should convert id to string for key property', () => {
      const testData = [
        {
          id: 123,
          name: 'Test Task',
          duration: 5,
          rate: 50,
          amount: 250
        }
      ]

      const result = generateTableData(testData)
      expect(result[0].key).toBe('123')
      expect(typeof result[0].key).toBe('string')
    })

    it('should handle empty array', () => {
      const result = generateTableData([])
      expect(result).toEqual([])
    })

    it('should handle string and number ids', () => {
      const testData = [
        {
          id: 'string-id',
          name: 'Task 1',
          duration: 3,
          rate: 60,
          amount: 180
        },
        {
          id: 456,
          name: 'Task 2',
          duration: 4,
          rate: 65,
          amount: 260
        }
      ]

      const result = generateTableData(testData)
      expect(result[0].key).toBe('string-id')
      expect(result[1].key).toBe('456')
    })
  })

  describe('generateSubtotal', () => {
    it('should calculate correct subtotal from multiple projects', () => {
      const result = generateSubtotal(mockProjectType)
      // Project 1: 600 + 960 = 1560
      // Project 2: 420
      // Total: 1980
      expect(result).toBe(1980)
    })

    it('should handle empty projects array', () => {
      const result = generateSubtotal([])
      expect(result).toBe(0)
    })

    it('should handle projects with no tasks', () => {
      const emptyProjectsData: ActualProjectType[] = [
        {
          id: 1,
          name: 'Empty Project',
          description: 'Empty project description',
          tasks: []
        }
      ]

      const result = generateSubtotal(emptyProjectsData)
      expect(result).toBe(0)
    })

    it('should handle non-numeric amounts', () => {
      const projectsWithMixedAmounts: ActualProjectType[] = [
        {
          id: 1,
          name: 'Mixed Project',
          description: 'Mixed project description',
          tasks: [
            {
              id: 1,
              name: 'Valid Amount',
              duration: 5,
              rate: 20,
              amount: 100
            },
            {
              id: 2,
              name: 'Invalid Amount',
              duration: 5,
              rate: 20,
              amount: 'not-a-number' as unknown as number
            },
            {
              id: 3,
              name: 'Undefined Amount',
              duration: 5,
              rate: 20,
              amount: undefined as unknown as number
            }
          ]
        }
      ]

      const result = generateSubtotal(projectsWithMixedAmounts)
      expect(result).toBe(100) // Only the valid numeric amount should be counted
    })

    it('should handle single project with single task', () => {
      const singleProjectData: ActualProjectType[] = [
        {
          id: 1,
          name: 'Single Project',
          description: 'Single project description',
          tasks: [
            {
              id: 1,
              name: 'Single Task',
              duration: 10,
              rate: 50,
              amount: 500
            }
          ]
        }
      ]

      const result = generateSubtotal(singleProjectData)
      expect(result).toBe(500)
    })
  })

  describe('generateSummaryData', () => {
    it('should generate summary data with correct subtotal', () => {
      const result = generateSummaryData(mockProjectType)

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        label: 'Sub Total:',
        value: '$1980.00'
      })
    })

    it('should format currency with two decimal places', () => {
      const projectWithDecimalAmount: ActualProjectType[] = [
        {
          id: 1,
          name: 'Decimal Project',
          description: 'Decimal project description',
          tasks: [
            {
              id: 1,
              name: 'Decimal Task',
              duration: 5,
              rate: 24.691,
              amount: 123.456
            }
          ]
        }
      ]

      const result = generateSummaryData(projectWithDecimalAmount)
      expect(result[0].value).toBe('$123.46')
    })

    it('should handle zero amounts', () => {
      const zeroAmountProject: ActualProjectType[] = [
        {
          id: 1,
          name: 'Zero Project',
          description: 'Zero project description',
          tasks: [
            {
              id: 1,
              name: 'Zero Task',
              duration: 0,
              rate: 0,
              amount: 0
            }
          ]
        }
      ]

      const result = generateSummaryData(zeroAmountProject)
      expect(result[0].value).toBe('$0.00')
    })

    it('should handle empty projects', () => {
      const result = generateSummaryData([])
      expect(result[0].value).toBe('$0.00')
    })

    it('should always return array with one summary item', () => {
      const result = generateSummaryData(mockProjectType)
      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(1)
      expect(result[0]).toHaveProperty('label')
      expect(result[0]).toHaveProperty('value')
    })
  })
})
