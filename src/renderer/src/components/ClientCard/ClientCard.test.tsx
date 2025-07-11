import { describe, expect, it } from 'vitest'
import { render, screen } from '../../utils/test'
import ClientCard from './ClientCard'
import type { ClientCardProps } from './types'

// Mock data for testing
const mockClientData: ClientCardProps = {
  title: 'Test Client',
  name: 'Test Company Inc.',
  street: '123 Main Street',
  city: 'Test City',
  state: 'TS',
  zip: '12345',
  country: 'Test Country',
  phone: '+1 (555) 123-4567',
  email: 'test@testcompany.com'
}

const mockIcon = (
  <svg data-testid="test-icon" aria-label="Test icon">
    <title>Test Icon</title>
  </svg>
)

describe('ClientCard', () => {
  it('renders with required props', () => {
    render(<ClientCard {...mockClientData} />)

    // Check if title is rendered
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Client')

    // Check if company info is rendered (CompanyInfo component should render these)
    expect(screen.getByText('Test Company Inc.')).toBeInTheDocument()
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
    expect(screen.getByText('Test City')).toBeInTheDocument()
    expect(screen.getByText('TS')).toBeInTheDocument()
    expect(screen.getByText('12345')).toBeInTheDocument()
    expect(screen.getByText('Test Country')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('test@testcompany.com')).toBeInTheDocument()
  })

  it('renders with optional icon', () => {
    render(<ClientCard {...mockClientData} icon={mockIcon} />)

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Client')
  })

  it('renders without icon when not provided', () => {
    render(<ClientCard {...mockClientData} />)

    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Client')
  })

  it('displays correct title', () => {
    const customTitle = 'Custom Client Title'
    render(<ClientCard {...mockClientData} title={customTitle} />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(customTitle)
  })

  it('passes company info props correctly', () => {
    const customCompanyData = {
      ...mockClientData,
      name: 'Different Company',
      email: 'different@company.com',
      phone: '+1 (555) 999-0000'
    }

    render(<ClientCard {...customCompanyData} />)

    expect(screen.getByText('Different Company')).toBeInTheDocument()
    expect(screen.getByText('different@company.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 999-0000')).toBeInTheDocument()
  })

  it('renders within Ant Design Card component', () => {
    const { container } = render(<ClientCard {...mockClientData} />)

    // Check if the component is wrapped in an Ant Design Card
    const cardElement = container.querySelector('.ant-card')
    expect(cardElement).toBeInTheDocument()
  })

  it('renders with Space component for layout', () => {
    const { container } = render(<ClientCard {...mockClientData} icon={mockIcon} />)

    // Check if Space component is present
    const spaceElement = container.querySelector('.ant-space')
    expect(spaceElement).toBeInTheDocument()
  })
})
