import { describe, expect, it } from 'vitest'
import { render, screen } from '../../utils/test'
import ProjectBreakdown from './ProjectBreakdown'
import type { ProjectBreakdownProps } from './types'

// Mock data for testing
const mockColumns = [
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { title: 'Hours', dataIndex: 'hours', key: 'hours' },
  { title: 'Rate', dataIndex: 'rate', key: 'rate' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' }
]

const mockData = [
  {
    key: '1',
    description: 'Frontend Development',
    hours: 40,
    rate: 75,
    amount: 3000
  },
  {
    key: '2',
    description: 'Backend Development',
    hours: 30,
    rate: 80,
    amount: 2400
  },
  {
    key: '3',
    description: 'Testing',
    hours: 10,
    rate: 60,
    amount: 600
  }
]

const mockPropsWithData: ProjectBreakdownProps = {
  title: 'Project Development',
  data: mockData,
  columns: mockColumns
}

const mockPropsMinimal: ProjectBreakdownProps = {
  title: 'Empty Project'
}

describe('ProjectBreakdown', () => {
  it('renders with required title prop', () => {
    render(<ProjectBreakdown title="Test Project" />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Test Project'
    )
  })

  it('renders with complete data and columns', () => {
    render(<ProjectBreakdown {...mockPropsWithData} />)

    // Check title
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Project Development'
    )

    // Check if table data is rendered
    expect(screen.getByText('Frontend Development')).toBeInTheDocument()
    expect(screen.getByText('Backend Development')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()

    // Check column headers
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Hours')).toBeInTheDocument()
    expect(screen.getByText('Rate')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
  })

  it('calculates and displays correct subtotal', () => {
    render(<ProjectBreakdown {...mockPropsWithData} />)

    // Check if subtotal is displayed
    expect(screen.getByText('Sub Total')).toBeInTheDocument()

    // Check if the calculated total (3000 + 2400 + 600 = 6000) is displayed
    expect(screen.getByText('6000')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    render(<ProjectBreakdown {...mockPropsMinimal} />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Empty Project'
    )
    expect(screen.getByText('Sub Total')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument() // Should show 0 for empty data
  })

  it('handles data with non-numeric amounts', () => {
    const dataWithInvalidAmounts = [
      { key: '1', description: 'Task 1', amount: 100 },
      { key: '2', description: 'Task 2', amount: 'invalid' },
      { key: '3', description: 'Task 3', amount: 200 }
    ]

    render(
      <ProjectBreakdown
        title="Mixed Data"
        data={dataWithInvalidAmounts}
        columns={mockColumns}
      />
    )

    // Should calculate total as 100 + 0 + 200 = 300 (ignoring invalid amount)
    expect(screen.getByText('300')).toBeInTheDocument()
  })

  it('handles missing amount property', () => {
    const dataWithoutAmounts = [
      { key: '1', description: 'Task 1' },
      { key: '2', description: 'Task 2' }
    ]

    render(
      <ProjectBreakdown
        title="No Amounts"
        data={dataWithoutAmounts}
        columns={mockColumns}
      />
    )

    // Should show 0 when no amount properties exist
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders within Flex component with correct props', () => {
    const { container } = render(<ProjectBreakdown {...mockPropsWithData} />)

    // Check if Flex component is present with vertical layout
    const flexElement = container.querySelector('.ant-flex')
    expect(flexElement).toBeInTheDocument()
    expect(flexElement).toHaveClass('ant-flex-vertical')
  })

  it('renders Ant Design Table component', () => {
    const { container } = render(<ProjectBreakdown {...mockPropsWithData} />)

    // Check if Table component is present
    const tableElement = container.querySelector('.ant-table')
    expect(tableElement).toBeInTheDocument()
  })

  it('disables pagination on table', () => {
    const { container } = render(<ProjectBreakdown {...mockPropsWithData} />)

    // Check that pagination is not present
    const paginationElement = container.querySelector('.ant-pagination')
    expect(paginationElement).not.toBeInTheDocument()
  })

  it('renders table summary row', () => {
    const { container } = render(<ProjectBreakdown {...mockPropsWithData} />)

    // Check if summary row is present
    const summaryElement = container.querySelector('.ant-table-summary')
    expect(summaryElement).toBeInTheDocument()
  })

  it('handles different column counts for subtotal span', () => {
    const twoColumnSetup = [
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Amount', dataIndex: 'amount', key: 'amount' }
    ]

    render(
      <ProjectBreakdown
        title="Two Columns"
        data={mockData}
        columns={twoColumnSetup}
      />
    )

    expect(screen.getByText('Sub Total')).toBeInTheDocument()
    expect(screen.getByText('6000')).toBeInTheDocument()
  })
})
