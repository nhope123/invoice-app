import { describe, expect, it, render, screen } from '../../utils/test'
import InvoiceSection from './InvoiceSection'

const defaultProps = {
  id: 123,
  date: '2023-10-01'
}

describe('InvoiceSection', () => {
  it('renders InvoiceSection with basic structure', () => {
    render(<InvoiceSection {...defaultProps} />)

    expect(screen.getByText('Invoice Section')).toBeInTheDocument()
    expect(screen.getByText('Invoice #:')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('Date:')).toBeInTheDocument()
    expect(screen.getByText('2023-10-01')).toBeInTheDocument()
  })

  it('renders correct invoice ID when provided', () => {
    const customProps = { ...defaultProps, id: 456 }
    render(<InvoiceSection {...customProps} />)

    expect(screen.getByText('456')).toBeInTheDocument()
    expect(screen.queryByText('123')).not.toBeInTheDocument()
  })

  it('renders correct date when provided', () => {
    const customProps = { ...defaultProps, date: '2024-12-25' }
    render(<InvoiceSection {...customProps} />)

    expect(screen.getByText('2024-12-25')).toBeInTheDocument()
    expect(screen.queryByText('2023-10-01')).not.toBeInTheDocument()
  })

  it('handles large invoice ID numbers', () => {
    const customProps = { ...defaultProps, id: 999999 }
    render(<InvoiceSection {...customProps} />)

    expect(screen.getByText('999999')).toBeInTheDocument()
  })

  it('handles zero as invoice ID', () => {
    const customProps = { ...defaultProps, id: 0 }
    render(<InvoiceSection {...customProps} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('displays labels with strong formatting', () => {
    render(<InvoiceSection {...defaultProps} />)

    const invoiceLabel = screen.getByText('Invoice #:')
    const dateLabel = screen.getByText('Date:')

    // Check that labels are rendered as strong text (bold)
    expect(invoiceLabel).toBeInTheDocument()
    expect(dateLabel).toBeInTheDocument()
  })

  it('renders with proper heading level', () => {
    render(<InvoiceSection {...defaultProps} />)

    const heading = screen.getByRole('heading', { name: 'Invoice Section' })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
  })

  it('maintains component structure with different date formats', () => {
    const testCases = ['01/01/2024', '2024-01-01', 'January 1, 2024', '01-Jan-2024']

    testCases.forEach((dateFormat) => {
      const { unmount } = render(<InvoiceSection {...defaultProps} date={dateFormat} />)

      expect(screen.getByText('Invoice Section')).toBeInTheDocument()
      expect(screen.getByText('Invoice #:')).toBeInTheDocument()
      expect(screen.getByText('Date:')).toBeInTheDocument()
      expect(screen.getByText(dateFormat)).toBeInTheDocument()

      unmount()
    })
  })

  it('renders all required elements in correct structure', () => {
    render(<InvoiceSection {...defaultProps} />)

    // Check that all required elements are present
    expect(screen.getByRole('heading', { name: 'Invoice Section' })).toBeInTheDocument()
    expect(screen.getByText('Invoice #:')).toBeInTheDocument()
    expect(screen.getByText('Date:')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('2023-10-01')).toBeInTheDocument()
  })
})
